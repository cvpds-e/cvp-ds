import React, { useId } from 'react';
import { Search, X } from 'lucide-react';
import { IconButton } from './IconButton';
import './SearchField.css';

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  onClear?: () => void;
}

export function SearchField({ label = 'Search', value, defaultValue, onClear, className = '', id, ...props }: SearchFieldProps) {
  const generatedId = useId().replace(/:/g, '');
  const inputId = id ?? `search-field-${generatedId}`;
  const hasValue = String(value ?? defaultValue ?? '').length > 0;
  return <div className={['cvp-search-field', className].filter(Boolean).join(' ')}>
    <label className="cvp-search-field__label" htmlFor={inputId}>{label}</label>
    <Search className="cvp-search-field__icon" size={20} aria-hidden="true" />
    <input {...props} id={inputId} type="search" value={value} defaultValue={defaultValue} className="cvp-search-field__input" />
    {hasValue && onClear && <IconButton size="small" variant="ghost" aria-label={`Clear ${label.toLowerCase()}`} onClick={onClear}><X size={15} /></IconButton>}
  </div>;
}
