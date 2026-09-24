import React from 'react';
import { X } from 'lucide-react';
import './Pills.css';

export interface PillsProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  removeLabel?: string;
}

/** The selected-value primitive used by MultiSelect and composed controls. */
export function Pills({
  children,
  onRemove,
  removeLabel = 'Remove value',
  className = '',
  ...props
}: PillsProps) {
  return (
    <span
      {...props}
      className={[
        'cvp-pill',
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className="cvp-pill__label">{children}</span>
      {onRemove ? (
        <button
          type="button"
          className="cvp-pill__remove"
          aria-label={removeLabel}
          onClick={(event) => {
            event.stopPropagation();
            onRemove(event);
          }}
        >
          <X aria-hidden="true" />
        </button>
      ) : null}
    </span>
  );
}
