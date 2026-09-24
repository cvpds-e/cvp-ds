import React from 'react';
import './Loader.css';

export type LoaderSize = 'sm' | 'md' | 'lg';
export type LoaderTone = 'default' | 'inherit';

export interface LoaderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  size?: LoaderSize;
  tone?: LoaderTone;
  label?: string;
  decorative?: boolean;
}

/** Indeterminate progress for a local action or a small pending region. */
export function Loader({ size = 'md', tone = 'default', label = 'Loading', decorative = false, className = '', ...props }: LoaderProps) {
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
