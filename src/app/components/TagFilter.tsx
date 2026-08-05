import React, { useState } from 'react';

export interface TagFilterOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TagFilterSection {
  id: string;
  title: string;
  options: TagFilterOption[];
}

export interface TagFilterProps {
  /** Array of filter sections */
  sections: TagFilterSection[];
  /** Array of currently selected option IDs */
  selectedOptions?: string[];
  /** Callback when selection changes */
  onSelectionChange?: (selectedOptions: string[]) => void;
  /** Whether the filter is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
}

export function TagFilter({
  sections,
  selectedOptions = [],
  onSelectionChange,
  disabled = false,
  className = '',
}: TagFilterProps) {
  const [internalSelection, setInternalSelection] = useState<string[]>(selectedOptions);
  const currentSelection = selectedOptions.length > 0 ? selectedOptions : internalSelection;

  const handleToggleOption = (optionId: string) => {
    if (disabled) return;

    const newSelection = currentSelection.includes(optionId)
      ? currentSelection.filter(id => id !== optionId)
      : [...currentSelection, optionId];

    if (selectedOptions.length === 0) {
      setInternalSelection(newSelection);
    }
    onSelectionChange?.(newSelection);
  };

  const handleRemoveOption = (optionId: string) => {
    if (disabled) return;

    const newSelection = currentSelection.filter(id => id !== optionId);
    
    if (selectedOptions.length === 0) {
      setInternalSelection(newSelection);
    }
    onSelectionChange?.(newSelection);
  };

  const isOptionSelected = (optionId: string) => currentSelection.includes(optionId);

  const getOptionLabel = (optionId: string) => {
    for (const section of sections) {
      const option = section.options.find(opt => opt.id === optionId);
      if (option) return option.label;
    }
    return optionId;
  };

  const getOptionDisabled = (optionId: string) => {
    for (const section of sections) {
      const option = section.options.find(opt => opt.id === optionId);
      if (option) return option.disabled || false;
    }
    return false;
  };

  return (
    <>
      <style>{`
        .tag-filter {
          /* Tag Filter Design Tokens */
          --tag-filter-bg: transparent;
          --tag-filter-font-family: var(--font-family);
          --tag-filter-font-size: var(--type-scale-m-size);
          --tag-filter-font-weight: var(--type-scale-m-weight);
          --tag-filter-line-height: var(--type-scale-m-line-height);
          --tag-filter-letter-spacing: var(--type-scale-m-letter-spacing);
          --tag-filter-transition: var(--btn-transition);

          /* Section tokens */
          --tag-filter-section-gap: var(--spacing-8);
          --tag-filter-section-title-font-size: var(--type-scale-l-size);
          --tag-filter-section-title-font-weight: var(--type-scale-l-weight);
          --tag-filter-section-title-line-height: var(--type-scale-l-line-height);
          --tag-filter-section-title-letter-spacing: var(--type-scale-l-letter-spacing);
          --tag-filter-section-title-color: var(--foreground);
          --tag-filter-section-title-margin-bottom: var(--spacing-4);

          /* Tag tokens */
          --tag-filter-tag-gap: var(--spacing-3);
          --tag-filter-tag-padding: 4px 8px;
          --tag-filter-tag-border-radius: var(--radius-md);
          --tag-filter-tag-transition: var(--btn-transition);

          /* Unselected tag tokens */
          --tag-filter-tag-bg: transparent;
          --tag-filter-tag-text: var(--foreground);
          --tag-filter-tag-border: 1px solid var(--border-default);
          --tag-filter-tag-hover-bg: transparent;
          --tag-filter-tag-hover-text: var(--foreground);
          --tag-filter-tag-hover-border: 1px solid var(--border-focus);

          /* Selected tag tokens */
          --tag-filter-tag-selected-bg: #3d63dd;
          --tag-filter-tag-selected-text: #fff;
          --tag-filter-tag-selected-border: 1px solid var(--border-focus);
          --tag-filter-tag-selected-hover-bg: #244cce;
          --tag-filter-tag-selected-hover-border: 1px solid var(--border-focus);

          /* Disabled tag tokens */
          --tag-filter-tag-disabled-bg: transparent;
          --tag-filter-tag-disabled-text: var(--muted-foreground);
          --tag-filter-tag-disabled-border: 1px solid var(--muted);

          /* Remove button tokens */
          --tag-filter-remove-btn-size: 16px;
          --tag-filter-remove-btn-margin-left: 8px;
          --tag-filter-remove-btn-hover-bg: rgba(255, 255, 255, 0.2);
          --tag-filter-remove-btn-border-radius: 2px;

          /* Component styles */
          background-color: var(--tag-filter-bg);
          font-family: var(--tag-filter-font-family);
          display: flex;
          flex-direction: column;
          gap: var(--tag-filter-section-gap);
          width: 100%;
          box-sizing: border-box;
        }

        .tag-filter--disabled {
          opacity: 0.6;
          pointer-events: none;
        }

        .tag-filter__section {
          display: flex;
          flex-direction: column;
          gap: var(--tag-filter-section-title-margin-bottom);
        }

        .tag-filter__section-title {
          font-size: var(--tag-filter-section-title-font-size);
          font-weight: var(--tag-filter-section-title-font-weight);
          line-height: var(--tag-filter-section-title-line-height);
          letter-spacing: var(--tag-filter-section-title-letter-spacing);
          color: var(--tag-filter-section-title-color);
          margin: 0;
        }

        .tag-filter__tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--tag-filter-tag-gap);
        }

        .tag-filter__tag {
          display: inline-flex;
          align-items: center;
          padding: var(--tag-filter-tag-padding);
          border: var(--tag-filter-tag-border);
          border-radius: var(--tag-filter-tag-border-radius);
          background-color: var(--tag-filter-tag-bg);
          color: var(--tag-filter-tag-text);
          font-size: var(--tag-filter-font-size);
          font-weight: var(--tag-filter-font-weight);
          line-height: var(--tag-filter-line-height);
          letter-spacing: var(--tag-filter-letter-spacing);
          cursor: pointer;
          transition: var(--tag-filter-tag-transition);
          white-space: nowrap;
          user-select: none;
          outline: none;
          box-sizing: border-box;
        }

        .tag-filter__tag:hover:not(.tag-filter__tag--disabled) {
          background-color: var(--tag-filter-tag-hover-bg);
          color: var(--tag-filter-tag-hover-text);
          border: var(--tag-filter-tag-hover-border);
        }

        .tag-filter__tag:focus-visible {
          box-shadow: 0 0 0 2px var(--focus-ring);
        }

        .tag-filter__tag--selected {
          background-color: var(--tag-filter-tag-selected-bg);
          color: var(--tag-filter-tag-selected-text);
          border: var(--tag-filter-tag-selected-border);
        }

        .tag-filter__tag--selected:hover:not(.tag-filter__tag--disabled) {
          background-color: var(--tag-filter-tag-selected-hover-bg);
          border: var(--tag-filter-tag-selected-hover-border);
        }

        .tag-filter__tag--disabled {
          background-color: var(--tag-filter-tag-disabled-bg);
          color: var(--tag-filter-tag-disabled-text);
          border: var(--tag-filter-tag-disabled-border);
          cursor: not-allowed;
        }

        .tag-filter__tag-text {
          flex: 1;
        }

        .tag-filter__remove-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--tag-filter-remove-btn-size);
          height: var(--tag-filter-remove-btn-size);
          margin-left: var(--tag-filter-remove-btn-margin-left);
          border: none;
          background: none;
          color: inherit;
          cursor: pointer;
          border-radius: var(--tag-filter-remove-btn-border-radius);
          transition: var(--tag-filter-tag-transition);
          padding: 0;
          outline: none;
          flex-shrink: 0;
        }

        .tag-filter__remove-btn:hover {
          background-color: var(--tag-filter-remove-btn-hover-bg);
        }

        .tag-filter__remove-btn:focus-visible {
          box-shadow: 0 0 0 1px var(--focus-ring);
        }

        .tag-filter__remove-btn svg {
          width: 12px;
          height: 12px;
        }
      `}</style>

      <div className={`tag-filter ${disabled ? 'tag-filter--disabled' : ''} ${className}`}>
        {sections.map((section) => (
          <div key={section.id} className="tag-filter__section">
            <h3 className="tag-filter__section-title">{section.title}</h3>
            <div className="tag-filter__tags">
              {section.options.map((option) => {
                const isSelected = isOptionSelected(option.id);
                const isDisabled = option.disabled || disabled;
                
                return (
                  <div
                    key={option.id}
                    className={`tag-filter__tag ${isSelected ? 'tag-filter__tag--selected' : ''} ${isDisabled ? 'tag-filter__tag--disabled' : ''}`}
                    onClick={() => !isDisabled && handleToggleOption(option.id)}
                    onKeyDown={(e) => {
                      if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleToggleOption(option.id);
                      }
                    }}
                    tabIndex={isDisabled ? -1 : 0}
                    role="button"
                    aria-pressed={isSelected}
                    aria-disabled={isDisabled}
                  >
                    <span className="tag-filter__tag-text">{option.label}</span>
                    {isSelected && (
                      <button
                        type="button"
                        className="tag-filter__remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveOption(option.id);
                        }}
                        aria-label={`Remove ${option.label}`}
                        tabIndex={-1}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}