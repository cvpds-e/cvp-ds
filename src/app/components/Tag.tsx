import React from 'react';
import './Tag.css';

export type TagTone = 'neutral' | 'info' | 'accent' | 'success' | 'warning';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
}

/** A compact, non-interactive label for categorical metadata. */
export function Tag({ children, tone = 'neutral', className = '', ...props }: TagProps) {
  return <span {...props} className={`cvp-tag cvp-tag--${tone} ${className}`.trim()}>{children}</span>;
}
