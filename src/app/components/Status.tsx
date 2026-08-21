import React from 'react';
import './Status.css';

export type StatusTone = 'neutral' | 'success' | 'warning' | 'danger';

export interface StatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
}

/** A compact, non-interactive lifecycle or health indicator. */
export function Status({ children, tone = 'neutral', className = '', ...props }: StatusProps) {
  return <span {...props} className={`cvp-status cvp-status--${tone} ${className}`.trim()}>{children}</span>;
}
