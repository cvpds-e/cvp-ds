import React from 'react';
import './Badge.css';

export type BadgeTone = 'neutral' | 'info' | 'accent' | 'success' | 'warning' | 'algorithmic' | 'manual';
export type BadgeVariant = 'default' | 'content-source';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Use `content-source` for how an item entered a rail: Algorithmic or Manual. */
  variant?: BadgeVariant;
}

/** A compact, non-interactive label for categorical metadata. */
export function Badge({ children, tone = 'neutral', variant = 'default', className = '', ...props }: BadgeProps) {
  return <span {...props} className={`cvp-badge cvp-badge--${variant} cvp-badge--${tone} ${className}`.trim()}>{children}</span>;
}
