import React from 'react';
import { AlertTriangle, CheckCircle2, CircleAlert, Info, X } from 'lucide-react';
import './NotificationBanner.css';

export type NotificationBannerVariant = 'info' | 'warning' | 'success' | 'error';

export interface NotificationBannerProps {
  title: string;
  message: string;
  variant?: NotificationBannerVariant;
  icon?: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>;
  onDismiss?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const icons = { info: Info, warning: AlertTriangle, success: CheckCircle2, error: CircleAlert };

export function NotificationBanner({ title, message, variant = 'info', icon: CustomIcon, onDismiss, actionLabel, onAction, className = '' }: NotificationBannerProps) {
  const Icon = CustomIcon ?? icons[variant];
  const urgent = variant === 'warning' || variant === 'error';
  return (
    <section className={`cvp-notification-banner cvp-notification-banner--${variant} ${className}`.trim()} role={urgent ? 'alert' : 'status'} aria-atomic="true">
      <Icon size={18} className="cvp-notification-banner__icon" aria-hidden={true} />
      <div className="cvp-notification-banner__content">
        <strong className="cvp-notification-banner__title">{title}</strong>
        <p className="cvp-notification-banner__message">{message}</p>
        {actionLabel && onAction && <button className="cvp-notification-banner__action" type="button" onClick={onAction}>{actionLabel}</button>}
      </div>
      {onDismiss && <button className="cvp-notification-banner__dismiss" type="button" onClick={onDismiss} aria-label="Dismiss notification"><X size={14} aria-hidden="true" /></button>}
    </section>
  );
}
