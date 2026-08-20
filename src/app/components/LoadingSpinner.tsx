import React from 'react';
import './LoadingSpinner.css';

export type LoadingSpinnerSize = 'sm' | 'md' | 'lg';
export type LoadingSpinnerTone = 'default' | 'inherit';

export interface LoadingSpinnerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  size?: LoadingSpinnerSize;
  tone?: LoadingSpinnerTone;
  label?: string;
  decorative?: boolean;
}

/** Indeterminate progress for a local action or a small pending region. */
export function LoadingSpinner({ size = 'md', tone = 'default', label = 'Loading', decorative = false, className = '', ...props }: LoadingSpinnerProps) {
  return (
    <span
      {...props}
      className={['cvp-loading-spinner', `cvp-loading-spinner--${size}`, `cvp-loading-spinner--${tone}`, className].filter(Boolean).join(' ')}
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : 'status'}
    >
      <span className="cvp-loading-spinner__visual" aria-hidden="true" />
      {!decorative && <span className="cvp-loading-spinner__label">{label}</span>}
    </span>
  );
}
