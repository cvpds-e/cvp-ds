import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, CircleAlert, Info, X } from 'lucide-react';
import './Toast.css';

export type ToastVariant = 'success' | 'warning' | 'danger' | 'info';

export interface Toast {
  id: string;
  title?: string;
  description: string;
  variant: ToastVariant;
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
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}

let toastSequence = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const removeToast = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((input: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${toastSequence++}`;
    const toast: Toast = { duration: 5000, dismissible: true, ...input, id };
    setToasts((current) => [...current, toast]);
    if (toast.duration && toast.duration > 0) {
      timers.current.set(id, setTimeout(() => removeToast(id), toast.duration));
    }
    return id;
  }, [removeToast]);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
    setToasts([]);
  }, []);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);

  return <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAll }}>{children}<ToastContainer /></ToastContext.Provider>;
}

function ToastContainer() {
  const { toasts } = useToast();
  return (
    <div className="cvp-toast-region" role="region" aria-label="Notifications">
      {toasts.map((toast) => <ToastComponent key={toast.id} {...toast} />)}
    </div>
  );
}

const icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: CircleAlert,
  info: Info,
};

function ToastComponent({ id = 'toast', title, description, variant, dismissible = true, onDismiss, className = '' }: ToastProps) {
  const context = useContext(ToastContext);
  const Icon = icons[variant];
  const dismiss = () => onDismiss ? onDismiss(id) : context?.removeToast(id);
  const urgent = variant === 'danger' || variant === 'warning';

  return (
    <div className={`cvp-toast cvp-toast--${variant} ${className}`.trim()} role={urgent ? 'alert' : 'status'} aria-atomic="true">
      <Icon className="cvp-toast__icon" size={18} aria-hidden="true" />
      <div className="cvp-toast__content">
        {title && <strong className="cvp-toast__title">{title}</strong>}
        <p className="cvp-toast__description">{description}</p>
      </div>
      {dismissible && <button className="cvp-toast__dismiss" type="button" aria-label="Dismiss notification" onClick={dismiss}><X size={14} aria-hidden="true" /></button>}
    </div>
  );
}

export { ToastComponent as Toast };
