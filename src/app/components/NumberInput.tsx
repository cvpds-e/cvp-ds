import React, { forwardRef, useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import './NumberInput.css';

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  /** Component density. Default is the standard 40px CVP field. */
  size?: 'compact' | 'default';
  /** Visible, programmatically associated label. */
  label?: string;
  /** Supplementary clarification shown beside the label. */
  labelTooltip?: React.ReactNode;
  /** Text shown beside the label, for example “Optional”. */
  optionalText?: string;
  /** Persistent guidance displayed when there is no error. */
  helperText?: string;
  /** Visible validation message. Providing it activates the invalid state. */
  error?: string;
  /** Current numeric value. Use an empty string for no value. */
  value?: number | '';
  /** Initial value when the field is uncontrolled. */
  defaultValue?: number;
  /** Called with the parsed numeric value, or an empty string when cleared. */
  onValueChange?: (value: number | '') => void;
  /** Native change event, retained for form integration. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function asNumber(value: number | string | undefined) {
  if (value === undefined || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({
  size = 'default',
  label,
  labelTooltip,
  optionalText,
  helperText,
  error,
  value,
  defaultValue,
  onValueChange,
  onChange,
  className,
  id,
  required = false,
  disabled = false,
  readOnly = false,
  min,
  max,
  step = 1,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...props
}, ref) => {
  const generatedId = useId().replace(/:/g, '');
  const inputId = id ?? `number-input-${generatedId}`;
  const [uncontrolledValue, setUncontrolledValue] = useState<number | ''>(defaultValue ?? '');
  const currentValue = value === undefined ? uncontrolledValue : value;
  const minValue = asNumber(min);
  const maxValue = asNumber(max);
  const stepValue = asNumber(step) ?? 1;
  const hasError = Boolean(error);
  const supportId = error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined;
  const describedBy = [ariaDescribedBy, supportId].filter(Boolean).join(' ') || undefined;
  const fieldDisabled = disabled || readOnly;

  const commit = (next: number | '', event?: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setUncontrolledValue(next);
    onValueChange?.(next);
    if (event) onChange?.(event);
  };

  const changeBy = (direction: -1 | 1) => {
    const baseline = currentValue === '' ? (minValue ?? 0) : currentValue;
    const unclamped = baseline + (stepValue * direction);
    const next = Math.min(maxValue ?? Infinity, Math.max(minValue ?? -Infinity, unclamped));
    commit(Number.isInteger(next) ? next : Number(next.toFixed(8)));
  };

  const canDecrease = !fieldDisabled && (minValue === undefined || currentValue === '' || currentValue > minValue);
  const canIncrease = !fieldDisabled && (maxValue === undefined || currentValue === '' || currentValue < maxValue);

  return (
    <div className={['cvp-number-input', `cvp-number-input--${size}`, className].filter(Boolean).join(' ')} data-invalid={hasError || undefined} data-disabled={disabled || undefined}>
      {label && <div className="cvp-number-input__label-row"><div className="cvp-number-input__label-group"><label htmlFor={inputId} className="cvp-number-input__label">{label}{required && <span className="cvp-number-input__required" aria-hidden="true">*</span>}</label>{labelTooltip}</div>{optionalText && <span className="cvp-number-input__optional">{optionalText}</span>}</div>}
      <div className="cvp-number-input__shell">
        <input
          {...props}
          ref={ref}
          id={inputId}
          type="number"
          value={currentValue}
          min={min}
          max={max}
          step={step}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          aria-required={required || undefined}
          aria-invalid={hasError ? true : ariaInvalid}
          aria-describedby={describedBy}
          className="cvp-number-input__control"
          onChange={(event) => {
            const raw = event.target.value;
            commit(raw === '' ? '' : Number(raw), event);
          }}
        />
        <span className="cvp-number-input__controls">
          <button type="button" className="cvp-number-input__step" onClick={() => changeBy(-1)} disabled={!canDecrease} aria-label={`Decrease ${label ?? 'value'}`}><Minus size={14} aria-hidden="true" /></button>
          <button type="button" className="cvp-number-input__step" onClick={() => changeBy(1)} disabled={!canIncrease} aria-label={`Increase ${label ?? 'value'}`}><Plus size={14} aria-hidden="true" /></button>
        </span>
      </div>
      {error ? <p id={supportId} className="cvp-number-input__support cvp-number-input__support--error" role="alert">{error}</p> : helperText ? <p id={supportId} className="cvp-number-input__support">{helperText}</p> : null}
    </div>
  );
});

NumberInput.displayName = 'NumberInput';
