import React, { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { IconButton } from './IconButton';
import './SearchField.css';

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  onClear?: () => void;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(({ label = 'Search', value, defaultValue, onClear, onChange, disabled = false, readOnly = false, className = '', id, ...props }, ref) => {
  const generatedId = useId().replace(/:/g, '');
  const inputId = id ?? `search-field-${generatedId}`;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uncontrolledHasValue, setUncontrolledHasValue] = useState(() => String(defaultValue ?? '').length > 0);
  const hasValue = value === undefined ? uncontrolledHasValue : String(value).length > 0;
  useEffect(() => {
    const form = inputRef.current?.form;
    const reset = () => setUncontrolledHasValue(String(defaultValue ?? '').length > 0);
    form?.addEventListener('reset', reset);
    return () => form?.removeEventListener('reset', reset);
  }, [defaultValue]);

  const clear = () => {
    if (value === undefined && inputRef.current) {
      inputRef.current.value = '';
      setUncontrolledHasValue(false);
    }
    onClear?.();
    inputRef.current?.focus();
  };
  return <div className={['cvp-search-field', className].filter(Boolean).join(' ')}>
    <label className="cvp-search-field__label" htmlFor={inputId}>{label}</label>
    <Search className="cvp-search-field__icon" size={20} aria-hidden="true" />
    <input {...props} ref={node => { inputRef.current = node; if (typeof ref === 'function') ref(node); else if (ref) ref.current = node; }}
      id={inputId} type="search" value={value} defaultValue={defaultValue} disabled={disabled} readOnly={readOnly}
      onChange={event => { setUncontrolledHasValue(event.currentTarget.value.length > 0); onChange?.(event); }} className="cvp-search-field__input" />
    {hasValue && onClear && <IconButton size="small" variant="ghost" aria-label={`Clear ${label.toLowerCase()}`} disabled={disabled || readOnly} onClick={clear}><X size={15} /></IconButton>}
  </div>;
});
SearchField.displayName = 'SearchField';
