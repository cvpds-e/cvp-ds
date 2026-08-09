import React from 'react';
import './PrimaryButton.css';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'compact';
  loading?: boolean;
  loadingText?: string;
}

export function PrimaryButton({
  children,
  variant = 'default',
  loading = false,
  loadingText = 'Loading',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}: PrimaryButtonProps) {
  const unavailable = disabled || loading;
  const classNames = [
    'primary-button',
    'cvp-primary-button',
    `cvp-primary-button--${variant}`,
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
    <span className="cvp-primary-button__label">{children}</span>
    {loading && <span className="cvp-primary-button__loading" aria-hidden="true">
      <span className="cvp-primary-button__spinner" />
      <span>{loadingText}</span>
    </span>}
  </button>;
}
