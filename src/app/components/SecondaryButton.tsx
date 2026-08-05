import React from 'react';
import './SecondaryButton.css';

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'compact';
  loading?: boolean;
  loadingText?: string;
}

export function SecondaryButton({
  children,
  size = 'medium',
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
    `cvp-secondary-button--${size}`,
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
      <span className="cvp-secondary-button__spinner" />
      <span>{loadingText}</span>
    </span>}
  </button>;
}
