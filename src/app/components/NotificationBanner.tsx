import React from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle, Sparkles, X } from 'lucide-react';

export interface NotificationBannerProps {
  title: string;
  message: string;
  variant?: 'info' | 'warning' | 'success' | 'error';
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  onDismiss?: () => void;
}

export function NotificationBanner({
  title,
  message,
  variant = 'info',
  icon: CustomIcon,
  onDismiss
}: NotificationBannerProps) {
  const getDefaultIcon = () => {
    if (CustomIcon) return CustomIcon;

    switch (variant) {
      case 'info':
        return Info;
      case 'warning':
        return AlertTriangle;
      case 'success':
        return CheckCircle;
      case 'error':
        return XCircle;
      default:
        return Info;
    }
  };

  const Icon = getDefaultIcon();

  return (
    <>
      <style>{`
        .notification-banner {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 12px;
          border-radius: 8px;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          border: 1px solid;
        }

        /* Info variant - Dark theme */
        .notification-banner--info {
          background: linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          border-color: rgba(59, 130, 246, 0.3);
        }

        .notification-banner--info .notification-banner__icon {
          color: #60a5fa !important;
        }

        .notification-banner--info .notification-banner__title {
          color: #60a5fa !important;
        }

        .notification-banner--info .notification-banner__message {
          color: oklch(80.9% .105 251.813) !important;
        }

        /* Success variant - Dark theme */
        .notification-banner--success {
          background: linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
          border-color: rgba(16, 185, 129, 0.3);
        }

        .notification-banner--success .notification-banner__icon {
          color: #6ee7b7;
        }

        .notification-banner--success .notification-banner__title {
          color: #6ee7b7;
        }

        .notification-banner--success .notification-banner__message {
          color: #d1fae5;
        }

        /* Warning variant - Dark theme */
        .notification-banner--warning {
          background: linear-gradient(to right, rgba(245, 158, 11, 0.1), rgba(251, 146, 60, 0.1));
          border-color: rgba(245, 158, 11, 0.3);
        }

        .notification-banner--warning .notification-banner__icon {
          color: #fcd34d;
        }

        .notification-banner--warning .notification-banner__title {
          color: #fcd34d;
        }

        .notification-banner--warning .notification-banner__message {
          color: #fef3c7;
        }

        /* Error variant - Dark theme */
        .notification-banner--error {
          background: linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1));
          border-color: rgba(239, 68, 68, 0.3);
        }

        .notification-banner--error .notification-banner__icon {
          color: #fca5a5;
        }

        .notification-banner--error .notification-banner__title {
          color: #fca5a5;
        }

        .notification-banner--error .notification-banner__message {
          color: #fee2e2;
        }

        .notification-banner__icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .notification-banner__content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .notification-banner__title {
          font-size: 12px;
          font-weight: 500;
          line-height: 16px;
          margin: 0 0 2px 0;
        }

        .notification-banner__message {
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
          margin: 0;
        }

        .notification-banner__dismiss {
          flex-shrink: 0;
          background: transparent;
          border: none;
          padding: 0;
          margin-top: 0;
          cursor: pointer;
          color: inherit;
          opacity: 0.6;
          transition: opacity 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-banner__dismiss:hover {
          opacity: 1;
        }

        .notification-banner__dismiss:focus-visible {
          outline: 2px solid #6f8be6;
          outline-offset: 2px;
        }

        /* Light theme adjustments */
        @media (prefers-color-scheme: light) {
          .notification-banner--info {
            background: linear-gradient(to right, rgba(59, 130, 246, 0.08), rgba(147, 51, 234, 0.08));
            border-color: rgba(59, 130, 246, 0.2);
          }

          .notification-banner--info .notification-banner__icon {
            color: #3b82f6;
          }

          .notification-banner--info .notification-banner__title {
            color: #3b82f6;
          }

          .notification-banner--info .notification-banner__message {
            color: #1e40af;
          }

          .notification-banner--success {
            background: linear-gradient(to right, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.08));
            border-color: rgba(16, 185, 129, 0.2);
          }

          .notification-banner--success .notification-banner__icon {
            color: #10b981;
          }

          .notification-banner--success .notification-banner__title {
            color: #059669;
          }

          .notification-banner--success .notification-banner__message {
            color: #047857;
          }

          .notification-banner--warning {
            background: linear-gradient(to right, rgba(245, 158, 11, 0.08), rgba(251, 146, 60, 0.08));
            border-color: rgba(245, 158, 11, 0.2);
          }

          .notification-banner--warning .notification-banner__icon {
            color: #f59e0b;
          }

          .notification-banner--warning .notification-banner__title {
            color: #d97706;
          }

          .notification-banner--warning .notification-banner__message {
            color: #b45309;
          }

          .notification-banner--error {
            background: linear-gradient(to right, rgba(239, 68, 68, 0.08), rgba(220, 38, 38, 0.08));
            border-color: rgba(239, 68, 68, 0.2);
          }

          .notification-banner--error .notification-banner__icon {
            color: #ef4444;
          }

          .notification-banner--error .notification-banner__title {
            color: #dc2626;
          }

          .notification-banner--error .notification-banner__message {
            color: #b91c1c;
          }
        }
      `}</style>

      <div className={`notification-banner notification-banner--${variant}`}>
        <Icon size={16} className="notification-banner__icon" />
        <div className="notification-banner__content">
          <div className="notification-banner__title">{title}</div>
          <div className="notification-banner__message">{message}</div>
        </div>
        {onDismiss && (
          <button
            className="notification-banner__dismiss"
            onClick={onDismiss}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </>
  );
}
