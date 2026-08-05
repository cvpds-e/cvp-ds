import React, { forwardRef, useId } from 'react';
import './TextInput.css';

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Validation presentation. Providing `error` also activates the error state. */
  variant?: 'default' | 'error';
  /** Component density. Default remains the standard 40px CVP control. */
  size?: 'compact' | 'default';
  /** Visible validation message associated with the control. */
  error?: string;
  /** Persistent guidance displayed when there is no error. */
  helperText?: string;
  /** Visible, programmatically associated label. */
  label?: string;
  /** Text shown beside the label, for example “Optional”. */
  optionalText?: string;
  /** Class applied to the native input; `className` applies to the field wrapper. */
  inputClassName?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  variant = 'default',
  size = 'default',
  error,
  helperText,
  label,
  optionalText,
  inputClassName,
  className,
  id,
  required = false,
  disabled = false,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...props
}, ref) => {
  const generatedId = useId().replace(/:/g, '');
  const inputId = id ?? `text-input-${generatedId}`;
  const hasError = variant === 'error' || Boolean(error);
  const supportId = error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined;
  const describedBy = [ariaDescribedBy, supportId].filter(Boolean).join(' ') || undefined;

  return (
    <div
      className={['cvp-text-input', `cvp-text-input--${size}`, className].filter(Boolean).join(' ')}
      data-invalid={hasError || undefined}
      data-disabled={disabled || undefined}
    >
      {label && (
        <div className="cvp-text-input__label-row">
          <label htmlFor={inputId} className="cvp-text-input__label">
            {label}
            {required && <span className="cvp-text-input__required" aria-hidden="true">*</span>}
          </label>
          {optionalText && <span className="cvp-text-input__optional">{optionalText}</span>}
        </div>
      )}

      <input
        {...props}
        ref={ref}
        id={inputId}
        className={['cvp-text-input__control', inputClassName].filter(Boolean).join(' ')}
        required={required}
        disabled={disabled}
        aria-required={required || undefined}
        aria-invalid={hasError ? true : ariaInvalid}
        aria-describedby={describedBy}
      />

      {error ? (
        <p id={supportId} className="cvp-text-input__support cvp-text-input__support--error" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={supportId} className="cvp-text-input__support">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

TextInput.displayName = 'TextInput';
