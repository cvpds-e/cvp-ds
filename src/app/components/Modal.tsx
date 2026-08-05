import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import './Modal.css';

export interface ModalTab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  maxWidth?: string;
  size?: 'small' | 'medium' | 'large';
  tone?: 'default' | 'danger';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'tabbed';
  tabs?: ModalTab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  bodyClassName?: string;
}

const focusableSelector = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])', 'select:not([disabled])',
  'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])',
].join(',');

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth,
  size = 'medium',
  tone = 'default',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  ariaLabel,
  header,
  footer,
  variant = 'default',
  tabs = [],
  defaultActiveTab,
  onTabChange,
  className = '',
  bodyClassName = '',
}: ModalProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id || '');
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const tabIdBase = useId();

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusDialog = window.requestAnimationFrame(() => {
      const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(focusableSelector);
      (firstFocusable ?? dialogRef.current)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)];
      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusDialog);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [closeOnEscape, isOpen, onClose]);

  useEffect(() => {
    if (defaultActiveTab) setActiveTab(defaultActiveTab);
  }, [defaultActiveTab]);

  useEffect(() => {
    if (tabs.length && !tabs.some((tab) => tab.id === activeTab && !tab.disabled)) {
      setActiveTab(tabs.find((tab) => !tab.disabled)?.id ?? '');
    }
  }, [activeTab, tabs]);

  if (!isOpen || typeof document === 'undefined') return null;
  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;
  const width = maxWidth ?? `var(--cvp-modal-width-${size})`;

  return createPortal(
    <div className="cvp-modal-layer">
      <div className="cvp-modal__backdrop" aria-hidden="true" onMouseDown={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) onClose();
      }} />
      <div className="cvp-modal__positioner" role="presentation">
        <div
          ref={dialogRef}
          className={`cvp-modal cvp-modal--${size} cvp-modal--${tone} ${className}`}
          style={{ '--cvp-modal-instance-width': width } as React.CSSProperties}
          role="dialog"
          aria-modal="true"
          aria-label={!title && !header ? ariaLabel ?? 'Dialog' : ariaLabel}
          aria-labelledby={title && !ariaLabel ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          tabIndex={-1}
        >
          {(title || description || header) && (
            <header className="cvp-modal__header">
              {header ?? (
                <div className="cvp-modal__heading">
                  {title && <h2 id={titleId} className="cvp-modal__title">{title}</h2>}
                  {description && <p id={descriptionId} className="cvp-modal__description">{description}</p>}
                </div>
              )}
            </header>
          )}

          {showCloseButton && (
            <button className="cvp-modal__close" type="button" aria-label="Close dialog" onClick={onClose}>
              <X size={16} aria-hidden="true" />
            </button>
          )}

          {variant === 'tabbed' && tabs.length > 0 && (
            <div className="cvp-modal__tabs" role="tablist" aria-label={`${title ?? 'Dialog'} sections`}>
              {tabs.map((tab) => {
                const selected = tab.id === activeTab;
                const tabDomId = `${tabIdBase}-tab-${tab.id}`;
                const panelDomId = `${tabIdBase}-panel-${tab.id}`;
                return (
                  <button key={tab.id} id={tabDomId} className="cvp-modal__tab" type="button" role="tab" aria-selected={selected} aria-controls={panelDomId} tabIndex={selected ? 0 : -1} disabled={tab.disabled} onClick={() => { setActiveTab(tab.id); onTabChange?.(tab.id); }}>
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className={`cvp-modal__body ${bodyClassName}`}>
            {variant === 'tabbed' ? (
              <div id={`${tabIdBase}-panel-${activeTab}`} role="tabpanel" aria-labelledby={`${tabIdBase}-tab-${activeTab}`} tabIndex={0}>{activeTabContent}</div>
            ) : children}
          </div>

          {footer && <footer className="cvp-modal__footer">{footer}</footer>}
        </div>
      </div>
    </div>,
    document.body,
  );
}
