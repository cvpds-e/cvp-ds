import React, { useState } from 'react';

export interface ToggleProps {
  /** Unique identifier for the toggle */
  id?: string;
  /** The checked state of the toggle */
  checked?: boolean;
  /** Default checked state (for uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onChange?: (checked: boolean) => void;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Label text for the toggle */
  label?: string;
  /** Additional description text */
  description?: string;
  /** Additional CSS class name */
  className?: string;
  /** Name attribute for form submission */
  name?: string;
  /** Value attribute for form submission */
  value?: string;
  /** Size variant */
  size?: 'default' | 'small';
  /** Intermediate state */
  indeterminate?: boolean;
}

export function Toggle({
  id,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  description,
  className = '',
  name,
  value,
  size = 'default',
  indeterminate = false,
}: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);
  const [isAnimating, setIsAnimating] = useState(false);
  const isControlled = checked !== undefined;
  const currentState = isControlled ? checked : internalChecked;

  const handleChange = () => {
    if (disabled) return;

    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);

    // When in indeterminate state, always transition to enabled (true) on click
    const newState = indeterminate ? true : !currentState;
    
    if (!isControlled) {
      setInternalChecked(newState);
    }
    
    onChange?.(newState);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleChange();
    }
  };

  return (
    <>
      <style>{`
        .toggle {
          /* Toggle Design Tokens */
          --toggle-font-family: var(--font-family);
          --toggle-font-size: var(--type-scale-m-size);
          --toggle-font-weight: var(--type-scale-m-weight);
          --toggle-line-height: var(--type-scale-m-line-height);
          --toggle-letter-spacing: var(--type-scale-m-letter-spacing);
          --toggle-transition: var(--btn-transition);
          
          /* Toggle switch tokens - default size */
          --toggle-width: 36px;
          --toggle-height: 20px;
          --toggle-thumb-size: 16px;
          --toggle-thumb-offset: 2px;
          --toggle-border-radius: 10px;
          --toggle-gap: 8px;
          
          /* Toggle states */
          --toggle-bg: #45454a;
          --toggle-border: var(--border-strong);
          --toggle-thumb-bg: #fff;
          --toggle-hover-bg: #6f8be6;
          --toggle-hover-border: var(--border-focus);
          --toggle-checked-bg: #3d63dd;
          --toggle-checked-border: var(--border-focus);
          --toggle-checked-thumb-bg: #fff;
          --toggle-disabled-bg: #4a4a4a;
          --toggle-disabled-border: #4a4a4a;
          --toggle-disabled-thumb-bg: #A1A1A8;
          --toggle-disabled-checked-bg: #A1A1A8;
          --toggle-disabled-checked-border: #A1A1A8;
          --toggle-disabled-checked-thumb-bg: #333;
          
          /* Focus styles */
          --toggle-focus-ring: 0 0 0 2px var(--focus-ring);
          
          /* Cursor styles */
          --toggle-cursor: pointer;
          --toggle-disabled-cursor: not-allowed;
          
          /* Label tokens */
          --toggle-label-color: var(--foreground);
          --toggle-description-color: var(--muted-foreground);
          --toggle-description-font-size: var(--type-scale-s-size);
          --toggle-description-line-height: var(--type-scale-s-line-height);
          --toggle-description-margin-top: 2px;
          
          /* Component styles */
          display: flex;
          align-items: flex-start;
          gap: var(--toggle-gap);
          font-family: var(--toggle-font-family);
          cursor: var(--toggle-cursor);
          user-select: none;
          position: relative;
        }

        .toggle--small {
          --toggle-width: 28px;
          --toggle-height: 16px;
          --toggle-thumb-size: 12px;
          --toggle-border-radius: 8px;
        }

        .toggle--disabled {
          cursor: var(--toggle-disabled-cursor);
        }

        .toggle__input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          margin: 0;
        }

        .toggle__switch {
          width: var(--toggle-width);
          height: var(--toggle-height);
          border-radius: var(--toggle-border-radius);
          background-color: var(--toggle-bg);
          border: 1px solid var(--toggle-border);
          position: relative;
          transition: var(--toggle-transition);
          flex-shrink: 0;
          margin-top: 2px; /* Align with text baseline */
        }

        /* Subtle click animation */
        @keyframes toggle-pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }

        .toggle--animating .toggle__switch {
          animation: toggle-pulse 0.2s ease-out;
        }

        .toggle:hover:not(.toggle--disabled) .toggle__switch {
          background-color: var(--toggle-hover-bg);
          border-color: var(--toggle-hover-border);
        }

        .toggle__input:focus-visible + .toggle__switch {
          box-shadow: var(--toggle-focus-ring);
          outline: none;
        }

        .toggle--checked .toggle__switch {
          background-color: var(--toggle-checked-bg);
          border-color: var(--toggle-checked-border);
        }

        .toggle--disabled .toggle__switch {
          background-color: var(--toggle-disabled-bg);
          border-color: var(--toggle-disabled-border);
        }

        .toggle--disabled.toggle--checked .toggle__switch {
          background-color: var(--toggle-disabled-checked-bg);
          border-color: var(--toggle-disabled-checked-border);
        }

        /* Indeterminate state styles */
        .toggle--indeterminate .toggle__switch {
          background-color: var(--toggle-checked-bg);
          border-color: var(--toggle-checked-border);
        }

        .toggle--disabled.toggle--indeterminate .toggle__switch {
          background-color: var(--toggle-disabled-checked-bg);
          border-color: var(--toggle-disabled-checked-border);
        }

        /* Hide thumb in indeterminate state */
        .toggle--indeterminate .toggle__thumb {
          display: none;
        }

        /* Indeterminate icon (dash) */
        .toggle__indeterminate-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 2px;
          background-color: #fff;
          border-radius: 1px;
        }

        .toggle--disabled .toggle__indeterminate-icon {
          background-color: var(--toggle-disabled-checked-thumb-bg);
        }

        .toggle__thumb {
          width: var(--toggle-thumb-size);
          height: var(--toggle-thumb-size);
          border-radius: 50%;
          background-color: var(--toggle-thumb-bg);
          position: absolute;
          top: 50%;
          left: var(--toggle-thumb-offset);
          transform: translateY(-50%);
          transition: var(--toggle-transition);
        }

        .toggle--checked .toggle__thumb {
          transform: translateX(calc(var(--toggle-width) - var(--toggle-thumb-size) - 2 * var(--toggle-thumb-offset))) translateY(-50%);
          background-color: var(--toggle-checked-thumb-bg);
        }

        .toggle--disabled .toggle__thumb {
          background-color: var(--toggle-disabled-thumb-bg);
        }

        .toggle--disabled.toggle--checked .toggle__thumb {
          background-color: var(--toggle-disabled-checked-thumb-bg);
        }

        /* Indeterminate state thumb position - centered */
        .toggle--indeterminate .toggle__thumb {
          transform: translateX(calc((var(--toggle-width) - var(--toggle-thumb-size)) / 2 - var(--toggle-thumb-offset))) translateY(-50%);
          background-color: var(--toggle-checked-thumb-bg);
        }

        .toggle--disabled.toggle--indeterminate .toggle__thumb {
          background-color: var(--toggle-disabled-checked-thumb-bg);
        }

        .toggle__content {
          display: flex;
          flex-direction: column;
          gap: var(--toggle-description-margin-top);
          min-width: 0;
          flex: 1;
        }

        .toggle__label {
          font-size: var(--toggle-font-size);
          font-weight: var(--toggle-font-weight);
          line-height: var(--toggle-line-height);
          letter-spacing: var(--toggle-letter-spacing);
          color: var(--toggle-label-color);
          margin: 0;
        }

        .toggle--disabled .toggle__label {
          color: var(--toggle-disabled-thumb-bg);
        }

        .toggle__description {
          font-size: var(--toggle-description-font-size);
          line-height: var(--toggle-description-line-height);
          color: var(--toggle-description-color);
          margin: 0;
        }

        .toggle--disabled .toggle__description {
          color: var(--toggle-disabled-thumb-bg);
        }
      `}</style>

      <label
        className={`toggle ${currentState ? 'toggle--checked' : ''} ${disabled ? 'toggle--disabled' : ''} ${size === 'small' ? 'toggle--small' : ''} ${indeterminate ? 'toggle--indeterminate' : ''} ${isAnimating ? 'toggle--animating' : ''} ${className}`}
        onClick={handleChange}
      >
        <input
          type="checkbox"
          className="toggle__input"
          id={id}
          checked={currentState}
          disabled={disabled}
          name={name}
          value={value}
          onChange={() => {}} // Controlled by label click
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          aria-describedby={description ? `${id}-description` : undefined}
          aria-checked={indeterminate ? 'mixed' : currentState}
        />
        
        <div className="toggle__switch">
          <div className="toggle__thumb" />
          {indeterminate && (
            <div className="toggle__indeterminate-icon" />
          )}
        </div>

        {(label || description) && (
          <div className="toggle__content">
            {label && (
              <span className="toggle__label">{label}</span>
            )}
            {description && (
              <span 
                className="toggle__description"
                id={id ? `${id}-description` : undefined}
              >
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    </>
  );
}