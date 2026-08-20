import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import './SecondaryButton.css';

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'compact';
  loading?: boolean;
  loadingText?: string;
}

export function SecondaryButton({
  children,
  variant = 'default',
  loading = false,
  loadingText = 'Loading',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}: SecondaryButtonProps) {
  const unavailable = disabled || loading;
  const classNames = [
    'secondary-button',
    'cvp-secondary-button',
    `cvp-secondary-button--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return <button
    {...props}
    type={type}
    className={classNames}
    disabled={unavailable}
    aria-busy={loading || undefined}
    aria-label={loading ? loadingText : props['aria-label']}
    data-loading={loading || undefined}
    data-disabled={unavailable || undefined}
  >
    <span className="cvp-secondary-button__label">{children}</span>
    {loading && <span className="cvp-secondary-button__loading" aria-hidden="true">
      <LoadingSpinner size="sm" tone="inherit" decorative />
      <span>{loadingText}</span>
    </span>}
  </button>;
}
