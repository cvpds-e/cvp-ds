import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Select.css';

export interface SelectOption { value: string; label: string; disabled?: boolean; }
export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean | string;
  helperText?: string;
  label?: string;
  /** Supplementary, non-essential clarification shown beside the label. */
  labelTooltip?: React.ReactNode;
  optionalText?: string;
  name?: string;
  id?: string;
  size?: 'compact' | 'default';
  variant?: 'default' | 'button';
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function Select({ options, value, defaultValue = '', onChange, placeholder = 'Select an option…', disabled = false,
  required = false, error = false, helperText, label, labelTooltip, optionalText, name, id, size = 'default', variant = 'default', icon: Icon, className = '' }: SelectProps) {
  const generatedId = useId().replace(/:/g, '');
  const selectId = id ?? `select-${generatedId}`;
  const listboxId = `${selectId}-listbox`;
  const labelId = label ? `${selectId}-label` : undefined;
  const errorMessage = typeof error === 'string' ? error : undefined;
  const supportId = errorMessage ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const currentValue = value !== undefined ? value : internalValue;
  const selectedIndex = options.findIndex(option => option.value === currentValue);
  const selectedOption = options[selectedIndex];
  const enabledIndices = options.map((option, index) => option.disabled ? -1 : index).filter(index => index >= 0);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0, width: 0, maxHeight: 0 });
  const positionPopup = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const viewportInset = 8;
    const gap = 4;
    const spaceAbove = Math.max(0, rect.top - viewportInset - gap);
    const spaceBelow = Math.max(0, window.innerHeight - rect.bottom - viewportInset - gap);
    const popupHeight = popupRef.current?.getBoundingClientRect().height || 280;
    const openUpward = spaceBelow < Math.min(popupHeight, 240) && spaceAbove > spaceBelow;
    const availableHeight = Math.max(96, openUpward ? spaceAbove : spaceBelow);
    const renderedHeight = Math.min(popupHeight, availableHeight);

    setPopupPosition({
      top: openUpward ? rect.top - gap - renderedHeight : rect.bottom + gap,
      left: rect.left,
      width: rect.width,
      maxHeight: availableHeight,
    });
  };

  const open = () => {
    if (disabled) return;
    positionPopup();
    setIsOpen(true);
    setActiveIndex(selectedIndex >= 0 && !options[selectedIndex]?.disabled ? selectedIndex : (enabledIndices[0] ?? -1));
  };
  const commit = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    if (value === undefined) setInternalValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
    triggerRef.current?.focus();
  };
  const move = (direction: 1 | -1) => {
    if (!enabledIndices.length) return;
    const position = enabledIndices.indexOf(activeIndex);
    const nextPosition = position < 0 ? 0 : (position + direction + enabledIndices.length) % enabledIndices.length;
    setActiveIndex(enabledIndices[nextPosition]);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') { setIsOpen(false); return; }
    if (event.key === 'Tab') { setIsOpen(false); return; }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); if (!isOpen) open(); else move(event.key === 'ArrowDown' ? 1 : -1); return; }
    if (event.key === 'Home' && isOpen) { event.preventDefault(); setActiveIndex(enabledIndices[0] ?? -1); return; }
    if (event.key === 'End' && isOpen) { event.preventDefault(); setActiveIndex(enabledIndices.at(-1) ?? -1); return; }
    if ((event.key === 'Enter' || event.key === ' ') && isOpen) { event.preventDefault(); commit(activeIndex); return; }
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); return; }
    if (event.key.length === 1 && /\S/.test(event.key)) {
      const match = options.findIndex(option => !option.disabled && option.label.toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()));
      if (match >= 0) { event.preventDefault(); if (isOpen) setActiveIndex(match); else commit(match); }
    }
  };

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node) && !popupRef.current?.contains(event.target as Node)) setIsOpen(false); };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    positionPopup();
    const frame = window.requestAnimationFrame(positionPopup);
    window.addEventListener('resize', positionPopup);
    window.addEventListener('scroll', positionPopup, true);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('resize', positionPopup); window.removeEventListener('scroll', positionPopup, true); };
  }, [isOpen]);

  return <div ref={rootRef} className={['cvp-select', `cvp-select--${size}`, variant === 'button' && 'cvp-select--button', className].filter(Boolean).join(' ')} data-invalid={Boolean(error) || undefined} data-disabled={disabled || undefined}>
    {label && <div className="cvp-select__label-row"><div className="cvp-select__label-group"><label id={labelId} htmlFor={selectId} className="cvp-select__label">{label}{required && <span aria-hidden="true">*</span>}</label>{labelTooltip}</div>{optionalText && <span>{optionalText}</span>}</div>}
    {name && <input type="hidden" name={name} value={currentValue} />}
    <button ref={triggerRef} id={selectId} type="button" className="cvp-select__trigger" disabled={disabled} onClick={() => isOpen ? setIsOpen(false) : open()} onKeyDown={handleKeyDown}
      role="combobox" aria-controls={isOpen ? listboxId : undefined} aria-expanded={isOpen} aria-haspopup="listbox" aria-labelledby={labelId} aria-label={label ? undefined : selectedOption?.label ?? placeholder}
      aria-activedescendant={isOpen && activeIndex >= 0 ? `${selectId}-option-${activeIndex}` : undefined} aria-invalid={Boolean(error) || undefined} aria-required={required || undefined} aria-describedby={supportId}>
      {variant === 'button' && Icon && <Icon className="cvp-select__icon" />}
      <span className={selectedOption ? 'cvp-select__value' : 'cvp-select__placeholder'}>{selectedOption?.label ?? placeholder}</span>
      <svg className="cvp-select__chevron" aria-hidden="true" viewBox="0 0 12 12"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
    {isOpen && typeof document !== 'undefined' && createPortal(<div ref={popupRef} className="cvp-select__popup" style={{ position: 'fixed', top: popupPosition.top, left: popupPosition.left, width: popupPosition.width, maxHeight: popupPosition.maxHeight }}><ul id={listboxId} className="cvp-select__listbox" role="listbox" aria-labelledby={labelId}>
      {options.length ? options.map((option, index) => <li id={`${selectId}-option-${index}`} key={option.value} role="option" aria-selected={index === selectedIndex} aria-disabled={option.disabled || undefined}
        className="cvp-select__option" data-active={index === activeIndex || undefined} data-selected={index === selectedIndex || undefined} data-disabled={option.disabled || undefined}
        onMouseEnter={() => !option.disabled && setActiveIndex(index)} onMouseDown={event => { event.preventDefault(); commit(index); }}>
        <span>{option.label}</span>{index === selectedIndex && <span aria-hidden="true">✓</span>}
      </li>) : <li className="cvp-select__empty">No options available</li>}
    </ul></div>, document.body)}
    {errorMessage ? <p id={supportId} className="cvp-select__support cvp-select__support--error" role="alert">{errorMessage}</p>
      : helperText ? <p id={supportId} className="cvp-select__support">{helperText}</p> : null}
  </div>;
}
