import React, { useState } from 'react';

export interface SegmentedOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedProps {
  /** Array of options for the segmented control */
  options: SegmentedOption[];
  /** Currently selected value */
  value?: string;
  /** Default selected value */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Visual variant */
  variant?: 'default' | 'color';
  /** Additional CSS class name */
  className?: string;
}

export function Segmented({
  options,
  value,
  defaultValue,
  onChange,
  size = 'medium',
  variant = 'default',
  className = '',
}: SegmentedProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || options[0]?.value || '');
  
  const currentValue = value !== undefined ? value : internalValue;
  
  const handleSegmentClick = (optionValue: string, optionDisabled?: boolean) => {
    if (optionDisabled) return;
    
    if (value === undefined) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
  };

  return (
    <>
      <style>{`
        .segmented {
          /* Segmented Control Styles */
          color: var(--foreground);
          font-family: var(--font-family);
          box-sizing: border-box;
          display: flex;
          gap: var(--segmented-gap);
          /* Remove overflow: hidden to allow focus outline to show */
          border-radius: var(--segmented-container-radius);
          background-color: var(--background);
          width: fit-content;
          /* Add padding to accommodate focus outline with 2px offset */
          padding: 4px;
          margin: -4px;
          -webkit-text-size-adjust: 100%;
          tab-size: 4;
          font-feature-settings: normal;
          font-variation-settings: normal;
          -webkit-tap-highlight-color: transparent;
        }

        /* Color variant container background */
        .segmented--color {
          background-color: var(--segmented-color-container-bg);
        }
        
        .segmented--small {
          --segmented-segment-padding: var(--segmented-small-padding);
          --segmented-segment-font-size: var(--type-scale-s-size);
          --segmented-segment-line-height: var(--type-scale-s-line-height);
        }
        
        .segmented--medium {
          --segmented-segment-padding: var(--segmented-medium-padding);
          --segmented-segment-font-size: var(--type-scale-m-size);
          --segmented-segment-line-height: var(--type-scale-m-line-height);
        }
        
        .segmented--large {
          --segmented-segment-padding: var(--segmented-large-padding);
          --segmented-segment-font-size: var(--type-scale-l-size);
          --segmented-segment-line-height: var(--type-scale-l-line-height);
        }

        /* Full width support for panel layouts */
        .segmented.panel-full-width-horizontal {
          width: 100%;
          margin-left: 0;
          margin-right: 0;
        }

        /* Navigation segmented styling */
        .segmented.panel-nav-segmented {
          width: 100%;
          margin: 0;
        }
        
        .segmented-segment {
          background-color: transparent;
          color: var(--segmented-default-text);
          border: none;
          padding: var(--segmented-segment-padding);
          font-size: var(--segmented-segment-font-size);
          line-height: var(--segmented-segment-line-height);
          font-weight: var(--type-scale-m-weight);
          letter-spacing: var(--type-scale-m-letter-spacing);
          font-family: inherit;
          cursor: pointer;
          transition: var(--segmented-transition);
          white-space: nowrap;
          user-select: none;
          outline: none;
          position: relative;
          flex: 1;
          min-width: 0;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--segmented-item-radius);
          /* Ensure no additional borders or outlines */
          box-shadow: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        .segmented-segment:hover:not(.segmented-segment--disabled):not(.segmented-segment--selected) {
          background-color: var(--segmented-hover-bg);
          border-radius: var(--segmented-item-radius);
        }

        .segmented-segment:active:not(.segmented-segment--disabled) {
          background-color: var(--segmented-hover-bg);
          border-radius: var(--segmented-item-radius);
        }
        
        /* Focus state - outline with 2px offset for accessibility */
        .segmented-segment:focus-visible {
          z-index: 1;
          outline: 2px solid var(--focus-ring) !important;
          outline-offset: 2px !important;
          border-radius: var(--segmented-item-radius);
          /* Explicitly remove any default browser focus styles */
          border: none !important;
          box-shadow: none !important;
        }
        
        /* Remove any default focus styles for all focus states */
        .segmented-segment:focus:not(:focus-visible) {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }
        
        /* Default variant selected state */
        .segmented-segment--selected {
          background-color: var(--segmented-selected-bg);
          color: var(--foreground);
          font-weight: var(--type-scale-m-weight);
          border-radius: var(--segmented-item-radius);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
          transform: translateZ(0);
        }

        /* Color variant selected state */
        .segmented-segment--selected.segmented-segment--color {
          background-color: var(--segmented-color-selected-bg);
          color: var(--segmented-color-selected-text);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
        }

        /* Color variant hover state */
        .segmented--color .segmented-segment:hover:not(.segmented-segment--disabled):not(.segmented-segment--selected) {
          background-color: var(--segmented-color-hover-bg);
        }

        /* Color variant active state */
        .segmented--color .segmented-segment:active:not(.segmented-segment--disabled) {
          background-color: var(--segmented-color-hover-bg);
        }
        
        /* Selected + focused state maintains both outline and drop shadow */
        .segmented-segment--selected:focus-visible {
          outline: 2px solid var(--focus-ring) !important;
          outline-offset: 2px !important;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
        }
        
        .segmented-segment--disabled {
          color: var(--segmented-disabled-text);
          cursor: not-allowed;
        }
      `}</style>
      
      <div 
        className={`segmented segmented--${size} ${variant === 'color' ? 'segmented--color' : ''} ${className}`}
        role="tablist"
        aria-orientation="horizontal"
      >
        {options.map((option) => {
          const isSelected = currentValue === option.value;
          const isDisabled = option.disabled;
          
          return (
            <button
              key={option.value}
              type="button"
              className={`segmented-segment ${isSelected ? 'segmented-segment--selected' : ''} ${isDisabled ? 'segmented-segment--disabled' : ''} ${variant === 'color' ? 'segmented-segment--color' : ''}`}
              onClick={() => handleSegmentClick(option.value, option.disabled)}
              disabled={isDisabled}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${option.value}`}
              id={`tab-${option.value}`}
              tabIndex={isSelected ? 0 : -1}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </>
  );
}