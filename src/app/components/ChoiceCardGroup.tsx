import React, { KeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import './ChoiceCardGroup.css';

export interface ChoiceCardOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface ChoiceCardGroupProps {
  label: string;
  options: ChoiceCardOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  columns?: 2 | 3;
  className?: string;
}

export function ChoiceCardGroup({
  label,
  options,
  value,
  defaultValue,
  onChange,
  helperText,
  required = false,
  disabled = false,
  columns = 2,
  className = '',
}: ChoiceCardGroupProps) {
  const groupId = useId().replace(/:/g, '');
  const labelId = `${groupId}-label`;
  const helperId = helperText ? `${groupId}-helper` : undefined;
  const firstEnabled = options.find((option) => !option.disabled)?.value ?? '';
  const [internalValue, setInternalValue] = useState(defaultValue && options.some((option) => option.value === defaultValue && !option.disabled) ? defaultValue : firstEnabled);
  const currentValue = value ?? internalValue;
  const optionRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (value !== undefined || options.some((option) => option.value === internalValue && !option.disabled)) return;
    setInternalValue(firstEnabled);
  }, [firstEnabled, internalValue, options, value]);

  const select = (nextValue: string) => {
    const option = options.find((item) => item.value === nextValue);
    if (disabled || !option || option.disabled) return;
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, optionIndex: number) => {
    const enabledOptions = options.filter((option) => !disabled && !option.disabled);
    if (!enabledOptions.length) return;
    const currentIndex = enabledOptions.findIndex((option) => option.value === options[optionIndex]?.value);
    let targetIndex: number | undefined;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') targetIndex = (currentIndex + 1) % enabledOptions.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') targetIndex = (currentIndex - 1 + enabledOptions.length) % enabledOptions.length;
    else if (event.key === 'Home') targetIndex = 0;
    else if (event.key === 'End') targetIndex = enabledOptions.length - 1;
    else return;
    event.preventDefault();
    const nextOption = enabledOptions[targetIndex];
    optionRefs.current[nextOption.value]?.focus();
    select(nextOption.value);
  };

  if (!options.length) return null;
  return <div className={`cvp-choice-card-group cvp-choice-card-group--columns-${columns} ${className}`.trim()} data-disabled={disabled || undefined}>
    <div className="cvp-choice-card-group__label-row">
      <span id={labelId} className="cvp-choice-card-group__label">{label}{required && <span className="cvp-choice-card-group__required" aria-hidden="true">*</span>}</span>
      {helperText && <span id={helperId} className="cvp-choice-card-group__helper">{helperText}</span>}
    </div>
    <div className="cvp-choice-card-group__options" role="radiogroup" aria-labelledby={labelId} aria-describedby={helperId} aria-required={required || undefined} aria-disabled={disabled || undefined}>
      {options.map((option, index) => {
        const selected = currentValue === option.value;
        const unavailable = disabled || option.disabled;
        return <button
          key={option.value}
          ref={(node) => { optionRefs.current[option.value] = node; }}
          type="button"
          role="radio"
          aria-checked={selected}
          disabled={unavailable}
          tabIndex={selected || (!currentValue && option.value === firstEnabled) ? 0 : -1}
          className="cvp-choice-card-group__option"
          onClick={() => select(option.value)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          <span className="cvp-choice-card-group__option-top">
            {option.icon && <span className="cvp-choice-card-group__icon" aria-hidden="true">{option.icon}</span>}
            {option.badge && <span className="cvp-choice-card-group__badge">{option.badge}</span>}
            {selected && <CheckCircle2 className="cvp-choice-card-group__check" size={18} aria-hidden="true" />}
          </span>
          <strong>{option.label}</strong>
          {option.description && <span className="cvp-choice-card-group__description">{option.description}</span>}
        </button>;
      })}
    </div>
  </div>;
}