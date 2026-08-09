import React from 'react';
import { ArrowDownUp } from 'lucide-react';
import { OutlineButton } from './OutlineButton';
import { Select, SelectOption } from './Select';
import './SortControl.css';

export interface SortControlProps {
  options: SelectOption[];
  value: string;
  direction: 'asc' | 'desc';
  onChange: (value: string) => void;
  onDirectionChange: (direction: 'asc' | 'desc') => void;
  label?: string;
  className?: string;
}

export function SortControl({ options, value, direction, onChange, onDirectionChange, label = 'Sort by', className = '' }: SortControlProps) {
  const directionLabel = direction.toUpperCase();
  return <div className={['cvp-sort-control', className].filter(Boolean).join(' ')}>
    <span className="cvp-sort-control__label">{label}</span>
    <Select className="cvp-sort-control__select" value={value} onChange={onChange} options={options} aria-label={label} />
    <OutlineButton className="cvp-sort-control__direction" aria-label={`Sort direction: ${directionLabel}. Activate to switch.`} aria-pressed={direction === 'desc'} onClick={() => onDirectionChange(direction === 'asc' ? 'desc' : 'asc')}><ArrowDownUp size={16} /> {directionLabel}</OutlineButton>
  </div>;
}
