import React, { forwardRef, useId, useState } from 'react';
import './TextArea.css';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'error';
  error?: string;
  helperText?: string;
  label?: string;
  optionalText?: string;
  showCharacterCount?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  textareaClassName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  variant = 'default', error, helperText, label, optionalText,
  showCharacterCount = false, resize = 'vertical', rows = 4,
  className, textareaClassName, id, required = false, disabled = false,
  value, defaultValue, maxLength, onChange, 'aria-describedby': externalDescription,
  'aria-invalid': ariaInvalid, ...props
}, ref) => {
  const generatedId = useId().replace(/:/g, '');
  const textareaId = id ?? `textarea-${generatedId}`;
  const hasError = variant === 'error' || Boolean(error);
  const [uncontrolledLength, setUncontrolledLength] = useState(() => String(defaultValue ?? '').length);
  const content = value ?? defaultValue ?? '';
  const currentLength = typeof content === 'string' || typeof content === 'number' ? String(content).length : 0;
  const displayedLength = value === undefined ? uncontrolledLength : currentLength;
  const supportId = error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined;
  const countId = showCharacterCount && maxLength ? `${textareaId}-count` : undefined;
  const describedBy = [externalDescription, supportId, countId].filter(Boolean).join(' ') || undefined;

  return <div className={['cvp-textarea', className].filter(Boolean).join(' ')} data-invalid={hasError || undefined} data-disabled={disabled || undefined}>
    {(label || countId) && <div className="cvp-textarea__label-row">
      {label && <label htmlFor={textareaId} className="cvp-textarea__label">{label}{required && <span aria-hidden="true">*</span>}</label>}
      {optionalText && <span className="cvp-textarea__meta">{optionalText}</span>}
      {countId && <span id={countId} className="cvp-textarea__meta" aria-live="polite">{displayedLength} / {maxLength}</span>}
    </div>}
    <textarea {...props} ref={ref} id={textareaId} rows={rows} maxLength={maxLength} value={value} defaultValue={defaultValue}
      required={required} disabled={disabled} aria-required={required || undefined} aria-invalid={hasError ? true : ariaInvalid}
      aria-describedby={describedBy} onChange={event => { setUncontrolledLength(event.currentTarget.value.length); onChange?.(event); }} className={['cvp-textarea__control', `cvp-textarea__control--resize-${resize}`, textareaClassName].filter(Boolean).join(' ')} />
    {error ? <p id={supportId} className="cvp-textarea__support cvp-textarea__support--error" role="alert">{error}</p>
      : helperText ? <p id={supportId} className="cvp-textarea__support">{helperText}</p> : null}
  </div>;
});
TextArea.displayName = 'TextArea';
