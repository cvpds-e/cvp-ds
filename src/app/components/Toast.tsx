import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Toast {
  id: string;
  title?: string;
  description: string;
  variant: 'success' | 'warning' | 'danger' | 'info';
  duration?: number;
  dismissible?: boolean;
}

export interface ToastProps extends Omit<Toast, 'id'> {
  id?: string;
  onDismiss?: (id: string) => void;
  className?: string;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      duration: 5000,
      dismissible: true,
      ...toast,
    };
    
    setToasts(prev => [...prev, newToast]);
    
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
    
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAll }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <>
      <style>{`
        .toast-container {
          /* Toast Container Design Tokens */
          --toast-container-position: fixed;
          --toast-container-top: var(--spacing-6);
          --toast-container-right: var(--spacing-6);
          --toast-container-z-index: 9999;
          --toast-container-pointer-events: none;
          --toast-container-max-width: 400px;
          --toast-container-gap: var(--spacing-3);

          /* Component Styles */
          position: var(--toast-container-position);
          top: var(--toast-container-top);
          right: var(--toast-container-right);
          z-index: var(--toast-container-z-index);
          pointer-events: var(--toast-container-pointer-events);
          max-width: var(--toast-container-max-width);
          display: flex;
          flex-direction: column;
          gap: var(--toast-container-gap);
        }

        @media (max-width: 640px) {
          .toast-container {
            left: var(--spacing-4);
            right: var(--spacing-4);
            max-width: none;
          }
        }
      `}</style>

      <div 
        className="toast-container"
        role="region" 
        aria-label="Notifications" 
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} {...toast} />
        ))}
      </div>
    </>
  );
}

function ToastComponent({ 
  id, 
  title, 
  description, 
  variant, 
  dismissible = true, 
  onDismiss,
  className = '' 
}: ToastProps & { id: string }) {
  const { removeToast } = useToast();
  
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss(id);
    } else {
      removeToast(id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleDismiss();
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'warning':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L15 15H1L8 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8" cy="12" r="1" fill="currentColor"/>
          </svg>
        );
      case 'danger':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M5.5 5.5L10.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'info':
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="8" cy="5" r="1" fill="currentColor"/>
          </svg>
        );
    }
  };

  return (
    <>
      <style>{`
        .toast {
          /* Toast Design Tokens */
          --toast-bg: var(--toast-default-bg);
          --toast-border: var(--toast-default-border);
          --toast-text: var(--toast-default-text);
          --toast-icon-color: var(--toast-default-icon);
          --toast-border-radius: var(--radius-md);
          --toast-padding: var(--spacing-4);
          --toast-box-shadow: var(--cvp-elevation-3);
          --toast-backdrop-filter: blur(8px);
          --toast-min-width: 320px;
          --toast-pointer-events: auto;
          --toast-font-family: var(--font-family);
          --toast-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          --toast-animation: toast-slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);

          /* Component Styles */
          background: var(--toast-bg);
          border: 1px solid var(--toast-border);
          color: var(--toast-text);
          border-radius: var(--toast-border-radius);
          padding: var(--toast-padding);
          box-shadow: var(--toast-box-shadow);
          backdrop-filter: var(--toast-backdrop-filter);
          min-width: var(--toast-min-width);
          pointer-events: var(--toast-pointer-events);
          font-family: var(--toast-font-family);
          transition: var(--toast-transition);
          animation: var(--toast-animation);
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-3);
          position: relative;
        }

        @keyframes toast-slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .toast:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        /* Success variant */
        .toast--success {
          --toast-bg: var(--toast-success-bg);
          --toast-border: var(--toast-success-border);
          --toast-text: var(--toast-success-text);
          --toast-icon-color: var(--toast-success-icon);
        }

        /* Warning variant */
        .toast--warning {
          --toast-bg: var(--toast-warning-bg);
          --toast-border: var(--toast-warning-border);
          --toast-text: var(--toast-warning-text);
          --toast-icon-color: var(--toast-warning-icon);
        }

        /* Danger variant */
        .toast--danger {
          --toast-bg: var(--toast-danger-bg);
          --toast-border: var(--toast-danger-border);
          --toast-text: var(--toast-danger-text);
          --toast-icon-color: var(--toast-danger-icon);
        }

        /* Info variant (default) */
        .toast--info {
          --toast-bg: var(--toast-info-bg);
          --toast-border: var(--toast-info-border);
          --toast-text: var(--toast-info-text);
          --toast-icon-color: var(--toast-info-icon);
        }

        .toast__icon {
          /* Toast Icon Design Tokens */
          --toast-icon-size: 16px;
          --toast-icon-flex-shrink: 0;
          --toast-icon-margin-top: 2px;

          /* Component Styles */
          width: var(--toast-icon-size);
          height: var(--toast-icon-size);
          flex-shrink: var(--toast-icon-flex-shrink);
          color: var(--toast-icon-color);
          margin-top: var(--toast-icon-margin-top);
        }

        .toast__content {
          /* Toast Content Design Tokens */
          --toast-content-flex: 1;
          --toast-content-min-width: 0;

          /* Component Styles */
          flex: var(--toast-content-flex);
          min-width: var(--toast-content-min-width);
        }

        .toast__title {
          /* Toast Title Design Tokens */
          --toast-title-font-size: var(--type-scale-m-size);
          --toast-title-font-weight: var(--type-scale-m-medium-weight);
          --toast-title-line-height: var(--type-scale-m-line-height);
          --toast-title-letter-spacing: var(--type-scale-m-letter-spacing);
          --toast-title-margin: 0 0 4px 0;
          --toast-title-color: inherit;

          /* Component Styles */
          font-size: var(--toast-title-font-size);
          font-weight: var(--toast-title-font-weight);
          line-height: var(--toast-title-line-height);
          letter-spacing: var(--toast-title-letter-spacing);
          margin: var(--toast-title-margin);
          color: var(--toast-title-color);
        }

        .toast__description {
          /* Toast Description Design Tokens */
          --toast-description-font-size: var(--type-scale-s-size);
          --toast-description-font-weight: var(--type-scale-s-weight);
          --toast-description-line-height: var(--type-scale-s-line-height);
          --toast-description-letter-spacing: var(--type-scale-s-letter-spacing);
          --toast-description-margin: 0;
          --toast-description-opacity: 0.9;

          /* Component Styles */
          font-size: var(--toast-description-font-size);
          font-weight: var(--toast-description-font-weight);
          line-height: var(--toast-description-line-height);
          letter-spacing: var(--toast-description-letter-spacing);
          margin: var(--toast-description-margin);
          opacity: var(--toast-description-opacity);
        }

        .toast__dismiss {
          /* Toast Dismiss Design Tokens */
          --toast-dismiss-size: 20px;
          --toast-dismiss-bg: transparent;
          --toast-dismiss-hover-bg: rgba(255, 255, 255, 0.1);
          --toast-dismiss-border: none;
          --toast-dismiss-color: inherit;
          --toast-dismiss-cursor: pointer;
          --toast-dismiss-border-radius: var(--radius-sm);
          --toast-dismiss-transition: var(--btn-transition);
          --toast-dismiss-flex-shrink: 0;
          --toast-dismiss-margin-left: var(--spacing-2);
          --toast-dismiss-margin-top: -2px;

          /* Component Styles */
          width: var(--toast-dismiss-size);
          height: var(--toast-dismiss-size);
          background: var(--toast-dismiss-bg);
          border: var(--toast-dismiss-border);
          color: var(--toast-dismiss-color);
          cursor: var(--toast-dismiss-cursor);
          border-radius: var(--toast-dismiss-border-radius);
          transition: var(--toast-dismiss-transition);
          flex-shrink: var(--toast-dismiss-flex-shrink);
          margin-left: var(--toast-dismiss-margin-left);
          margin-top: var(--toast-dismiss-margin-top);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          opacity: 0.7;
        }

        .toast__dismiss:hover {
          background: var(--toast-dismiss-hover-bg);
          opacity: 1;
        }

        .toast__dismiss:focus-visible {
          outline: 2px solid var(--focus-ring) !important;
          outline-offset: 2px !important;
          box-shadow: none !important;
        }

        .toast__dismiss svg {
          width: 12px;
          height: 12px;
        }

        @media (max-width: 640px) {
          .toast {
            min-width: auto;
            width: 100%;
          }
        }
      `}</style>

      <div 
        className={`toast toast--${variant} ${className}`}
        role="alert"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="toast__icon">
          {getIcon()}
        </div>
        
        <div className="toast__content">
          {title && <div className="toast__title">{title}</div>}
          <div className="toast__description">{description}</div>
        </div>

        {dismissible && (
          <button 
            className="toast__dismiss"
            onClick={handleDismiss}
            aria-label="Dismiss notification"
            type="button"
          >
            <svg viewBox="0 0 12 12" fill="none">
              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </>
  );
}

export { ToastComponent as Toast };
