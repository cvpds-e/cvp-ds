import React from 'react';
import './Badge.css';

export type BadgeTone = 'neutral' | 'info' | 'accent' | 'success' | 'warning';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

/** A compact, non-interactive label for categorical metadata. */
export function Badge({ children, tone = 'neutral', className = '', ...props }: BadgeProps) {
  return <span {...props} className={`cvp-badge cvp-badge--${tone} ${className}`.trim()}>{children}</span>;
}
