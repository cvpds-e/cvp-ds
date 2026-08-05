import React, { useState, useRef, useEffect } from 'react';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  /** Array of available options */
  options: MultiSelectOption[];
  /** Array of currently selected values */
  value?: string[];
  /** Default selected values */
  defaultValue?: string[];
  /** Callback when selection changes */
  onChange?: (values: string[]) => void;
  /** Placeholder text when no options are selected */
  placeholder?: string;
  /** Maximum number of options that can be selected */
  maxSelection?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Allow creating new options */
  allowCreate?: boolean;
  /** Callback when a new option is created */
  onCreateOption?: (newOption: MultiSelectOption) => void;
}

export function MultiSelect({
  options,
  value,
  defaultValue = [],
  onChange,
  placeholder = 'Select options...',
  maxSelection,
  disabled = false,
  error = false,
  className = '',
  allowCreate = true,
  onCreateOption,
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const [internalOptions, setInternalOptions] = useState<MultiSelectOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const currentValue = value !== undefined ? value : internalValue;
  
  // Deduplicate options to prevent key conflicts
  const deduplicateOptions = (opts: MultiSelectOption[]): MultiSelectOption[] => {
    const seen = new Set<string>();
    return opts.filter(option => {
      if (seen.has(option.value)) {
        return false;
      }
      seen.add(option.value);
      return true;
    });
  };

  // Initialize and update internal options with deduplication
  useEffect(() => {
    setInternalOptions(deduplicateOptions(options));
  }, [options]);

  const currentOptions = internalOptions;
  
  const filteredOptions = currentOptions.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const canCreateNewOption = allowCreate && 
    searchQuery.trim() !== '' && 
    !currentOptions.some(option => 
      option.label.toLowerCase() === searchQuery.toLowerCase()
    ) &&
    !currentValue.includes(searchQuery.trim());

  const isInCreateMode = canCreateNewOption;

  const handleToggleOption = (optionValue: string) => {
    if (disabled) return;
    
    const newValue = currentValue.includes(optionValue)
      ? currentValue.filter(v => v !== optionValue)
      : maxSelection && currentValue.length >= maxSelection
      ? currentValue
      : [...currentValue, optionValue];
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleCreateOption = () => {
    if (!canCreateNewOption || disabled) return;

    const newOption: MultiSelectOption = {
      value: searchQuery.trim(),
      label: searchQuery.trim(),
    };

    // Add to internal options with deduplication
    setInternalOptions(prev => {
      const newOptions = [...prev, newOption];
      return deduplicateOptions(newOptions);
    });
    
    // Add to selection
    const newValue = [...currentValue, newOption.value];
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    onCreateOption?.(newOption);

    // Clear search
    setSearchQuery('');
  };

  const handleSelectAll = () => {
    if (disabled) return;
    
    const availableOptions = filteredOptions.filter(option => !option.disabled);
    const newValue = [...new Set([...currentValue, ...availableOptions.map(option => option.value)])];
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleClearAll = () => {
    if (disabled) return;
    
    const newValue: string[] = [];
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleRemoveOption = (optionValue: string) => {
    if (disabled) return;
    
    const newValue = currentValue.filter(v => v !== optionValue);
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleTriggerClick = () => {
    if (disabled) return;
    if (!isOpen) {
      setIsOpen(true);
      setIsSearchMode(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } else {
      setIsOpen(false);
      setIsSearchMode(false);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setIsSearchMode(false);
      setSearchQuery('');
      triggerRef.current?.focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (!isSearchMode) {
        event.preventDefault();
        handleTriggerClick();
      }
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setIsSearchMode(false);
      setSearchQuery('');
      triggerRef.current?.focus();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (canCreateNewOption) {
        handleCreateOption();
      } else if (filteredOptions.length === 1 && !filteredOptions[0].disabled) {
        handleToggleOption(filteredOptions[0].value);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const firstOption = listboxRef.current?.querySelector('[role="option"]:not(.multi-select__option--disabled)') as HTMLElement;
      firstOption?.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsSearchMode(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get selected options with proper deduplication
  const selectedOptions = currentOptions.filter(option => currentValue.includes(option.value));
  const canSelectMore = !maxSelection || currentValue.length < maxSelection;
  const availableOptionsCount = filteredOptions.filter(option => !option.disabled).length;
  const hasSelectedValues = currentValue.length > 0;
  const hasNoSelectedValues = currentValue.length === 0;

  return (
    <>
      <style>{`
        .multi-select {
          /* Theme-aware Design Tokens - Dark theme as default with light theme overrides */
          --surface-raised: var(--multi-select-bg, #14141a);
          --surface-overlay: var(--multi-select-option-hover-bg, #292a2e);
          --text-primary: var(--input-text, #ffffff);
          --text-secondary: var(--multi-select-text-secondary, #b4b4ba);
          --text-tertiary: var(--multi-select-text-tertiary, #8f8f95);
          --text-quaternary: var(--input-placeholder, #AFAFB5);
          --text-disabled: var(--input-disabled-text, #A1A1A8);
          --primary-600: #3d63dd;
          --radius-md: 6px;
          --radius-lg: 8px;
          --transition-fast: 150ms;
          
          --type-scale-m-size: 14px;
          --type-scale-m-weight: 400;
          --type-scale-m-line-height: 20px;
          --type-scale-m-letter-spacing: 0.15px;
          
          --type-scale-s-size: 13px;
          --type-scale-s-weight: 500;
          --type-scale-s-line-height: 20px;
          --type-scale-s-letter-spacing: 0.1px;
          
          --destructive: #ef4444;
          --font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

          /* Tag specific tokens - theme-aware */
          --multi-select-tag-bg: var(--multi-select-tag-background, #3d63dd);
          --multi-select-tag-text: var(--multi-select-tag-text-color, #ffffff);
          --multi-select-tag-border-radius: 4px;
          --multi-select-tag-padding: 1px 8px;
          --multi-select-tag-gap: 4px;
          --multi-select-tag-font-size: var(--type-scale-m-size);
          --multi-select-tag-font-weight: var(--type-scale-m-weight);
          --multi-select-tag-line-height: var(--type-scale-m-line-height);
          --multi-select-tag-letter-spacing: var(--type-scale-m-letter-spacing);

          /* Action button tokens - theme-aware */
          --multi-select-action-btn-color: var(--multi-select-action-color, #5374e6);
          --multi-select-action-btn-hover-color: var(--multi-select-action-hover-color, #3d63dd);

          /* Icon tokens */
          --multi-select-tag-remove-size: 16px;
          --multi-select-tag-remove-hover-bg: var(--multi-select-tag-remove-hover, rgba(255, 255, 255, 0.2));
          --multi-select-chevron-size: 16px;
          --multi-select-clear-icon-size: 16px;
          
          /* Dropdown specific tokens - theme-aware */
          --multi-select-dropdown-bg: var(--select-dropdown-bg, #ffffff);
          --multi-select-dropdown-border: var(--select-dropdown-border, var(--border-default));
          --multi-select-option-hover-bg: var(--select-option-hover-bg, #f5f5f7);
          --multi-select-option-selected-bg: var(--select-option-selected-bg, #e8e8ea);
          --multi-select-header-border: var(--multi-select-header-border-color, var(--border-default));
          --multi-select-count-text: var(--multi-select-count-color, #6b6b78);

          /* Component Styles */
          position: relative;
          display: inline-block;
          width: 100%;
          font-family: var(--font-family);
          box-sizing: border-box;
        }

        .multi-select__trigger {
          width: 100%;
          min-height: 40px;
          padding: 4px 36px 4px 12px;
          background-color: var(--surface-raised);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-weight);
          line-height: var(--type-scale-m-line-height);
          letter-spacing: var(--type-scale-m-letter-spacing);
          cursor: pointer;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast), padding var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          outline: none;
          box-sizing: border-box;
          position: relative;
        }

        .multi-select__trigger:hover:not(.multi-select__trigger--disabled) {
          border-color: var(--border-focus);
        }

        .multi-select__trigger:focus-visible {
          border: 2px solid var(--border-focus);
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
          padding: 3px 35px 3px 11px;
          outline: none;
        }

        .multi-select__trigger--open {
          border: 1px solid rgba(61, 99, 221, 0.5);
        }

        .multi-select__trigger--error {
          border-color: var(--destructive);
        }

        .multi-select__trigger--disabled {
          cursor: not-allowed;
          background-color: var(--input-disabled-bg);
          color: var(--text-disabled);
        }

        .multi-select__search-input {
          border: none;
          outline: none;
          background: transparent;
          color: var(--text-primary);
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-weight);
          line-height: var(--type-scale-m-line-height);
          letter-spacing: var(--type-scale-m-letter-spacing);
          flex: 1;
          min-width: 120px;
          max-width: 100%;
        }

        .multi-select__search-input::placeholder {
          color: var(--text-quaternary);
        }

        .multi-select__content {
          display: flex;
          flex-wrap: wrap;
          gap: var(--multi-select-tag-gap);
          align-items: center;
          flex: 1;
          min-width: 0;
          max-width: 100%;
        }

        .multi-select__placeholder {
          color: var(--text-quaternary);
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .multi-select__tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: var(--multi-select-tag-padding);
          background-color: var(--multi-select-tag-bg);
          color: var(--multi-select-tag-text);
          border-radius: var(--multi-select-tag-border-radius);
          font-size: var(--multi-select-tag-font-size);
          font-weight: var(--multi-select-tag-font-weight);
          line-height: var(--multi-select-tag-line-height);
          letter-spacing: var(--multi-select-tag-letter-spacing);
          white-space: nowrap;
          flex-shrink: 0;
          max-width: 200px;
        }

        .multi-select__tag-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .multi-select__tag-remove {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--multi-select-tag-remove-size);
          height: var(--multi-select-tag-remove-size);
          border-radius: 2px;
          transition: background-color var(--transition-fast);
          flex-shrink: 0;
        }

        .multi-select__tag-remove:hover {
          background-color: var(--multi-select-tag-remove-hover-bg);
        }

        .multi-select__tag-remove:focus-visible {
          outline: 1px solid #6f8be6;
          outline-offset: 1px;
        }

        .multi-select__controls {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
        }

        .multi-select__clear-btn {
          background: none;
          border: none;
          color: var(--multi-select-action-btn-color);
          cursor: pointer;
          padding: 0;
          text-decoration: none;
          transition: color var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--multi-select-clear-icon-size);
          height: var(--multi-select-clear-icon-size);
        }

        .multi-select__clear-btn:hover {
          color: var(--multi-select-action-btn-hover-color);
        }

        .multi-select__clear-btn:focus-visible {
          outline: 1px solid #6f8be6;
          outline-offset: 2px;
        }

        .multi-select__chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
          color: var(--text-quaternary);
          flex-shrink: 0;
          pointer-events: none;
          width: var(--multi-select-chevron-size);
          height: var(--multi-select-chevron-size);
        }

        .multi-select__chevron--open {
          transform: rotate(180deg);
        }

        .multi-select__dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 9999;
          margin-top: 4px;
          background-color: var(--multi-select-dropdown-bg);
          border: 1px solid var(--multi-select-dropdown-border);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          max-height: 350px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: multiSelectDropdownIn var(--transition-fast) ease-out;
        }

        @keyframes multiSelectDropdownIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .multi-select__header {
          padding: 8px 12px;
          border-bottom: 1px solid var(--multi-select-header-border);
          background-color: var(--surface-raised);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: var(--type-scale-s-size);
          color: var(--text-primary);
        }

        .multi-select__count {
          color: var(--multi-select-count-text);
        }

        .multi-select__actions {
          display: flex;
          gap: 8px;
        }

        .multi-select__action-btn {
          background: none;
          border: none;
          color: var(--multi-select-action-btn-color);
          cursor: pointer;
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-weight);
          line-height: var(--type-scale-m-line-height);
          letter-spacing: var(--type-scale-m-letter-spacing);
          padding: 0;
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .multi-select__action-btn:hover {
          color: var(--multi-select-action-btn-hover-color);
        }

        .multi-select__action-btn:focus-visible {
          outline: 1px solid #6f8be6;
          outline-offset: 2px;
        }

        .multi-select__action-btn:disabled {
          color: var(--text-quaternary);
          cursor: not-allowed;
          opacity: 0.5;
        }

        .multi-select__action-btn:disabled:hover {
          color: var(--text-quaternary);
        }

        .multi-select__create-value {
          padding: 8px 12px;
          border-bottom: 1px solid var(--border-default);
          background-color: var(--surface-raised);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: var(--type-scale-m-size);
          color: var(--text-primary);
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }

        .multi-select__create-value:hover {
          background-color: var(--surface-overlay);
        }

        .multi-select__create-value-text {
          color: var(--text-primary);
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-weight);
          line-height: var(--type-scale-m-line-height);
          letter-spacing: var(--type-scale-m-letter-spacing);
        }

        .multi-select__listbox {
          list-style: none;
          margin: 0;
          padding: 0;
          overflow-y: auto;
          max-height: calc(350px - 100px);
        }

        .multi-select__option {
          padding: 8px 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background-color var(--transition-fast);
          color: var(--text-primary);
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-weight);
          line-height: var(--type-scale-m-line-height);
          letter-spacing: var(--type-scale-m-letter-spacing);
        }

        .multi-select__option:hover:not(.multi-select__option--disabled) {
          background-color: var(--multi-select-option-hover-bg);
        }

        .multi-select__option:focus-visible {
          background-color: var(--multi-select-option-hover-bg);
          outline: 2px solid #6f8be6;
          outline-offset: -2px;
        }

        .multi-select__option--selected {
          background-color: var(--multi-select-option-selected-bg);
          color: var(--text-primary);
        }

        .multi-select__option--disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .multi-select__option-icon {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
          flex-shrink: 0;
          color: var(--text-primary);
        }

        .multi-select__empty {
          padding: 8px 12px;
          color: var(--text-quaternary);
          font-style: italic;
          text-align: center;
        }

        .multi-select__error {
          margin-top: 6px;
          font-size: var(--type-scale-s-size);
          color: var(--destructive);
        }
      `}</style>

      <div 
        className={`multi-select ${className}`}
        ref={containerRef}
      >
        <div
          ref={triggerRef}
          className={`multi-select__trigger ${isOpen ? 'multi-select__trigger--open' : ''} ${error ? 'multi-select__trigger--error' : ''} ${disabled ? 'multi-select__trigger--disabled' : ''}`}
          onClick={handleTriggerClick}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : isSearchMode ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby="multi-select-label"
          aria-describedby={error ? "multi-select-error" : undefined}
          {...(disabled && { 'aria-disabled': 'true' })}
        >
          <div className="multi-select__content">
            {selectedOptions.length === 0 && !isSearchMode ? (
              <span className="multi-select__placeholder">{placeholder}</span>
            ) : (
              <>
                {selectedOptions.map((option, index) => (
                  <div key={`selected-${option.value}-${index}`} className="multi-select__tag">
                    <span className="multi-select__tag-text">{option.label}</span>
                    <button
                      type="button"
                      className="multi-select__tag-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveOption(option.value);
                      }}
                      aria-label={`Remove ${option.label}`}
                      tabIndex={-1}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
                
                {isSearchMode && (
                  <input
                    ref={inputRef}
                    type="text"
                    className="multi-select__search-input"
                    placeholder={selectedOptions.length === 0 ? placeholder : ''}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    disabled={disabled}
                  />
                )}
              </>
            )}
          </div>
          
          <div className="multi-select__controls">
            {hasSelectedValues && (
              <button
                type="button"
                className="multi-select__clear-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearAll();
                }}
                aria-label="Clear all selections"
                tabIndex={-1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            
            <div className={`multi-select__chevron ${isOpen ? 'multi-select__chevron--open' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="multi-select__dropdown">
            {!isInCreateMode && (
              <div className="multi-select__header">
                <span className="multi-select__count">
                  {currentValue.length} of {currentOptions.length} selected
                </span>
                <div className="multi-select__actions">
                  {hasNoSelectedValues && availableOptionsCount > 0 && (
                    <button
                      type="button"
                      className="multi-select__action-btn"
                      onClick={handleSelectAll}
                      disabled={disabled}
                    >
                      Select All
                    </button>
                  )}
                  {hasSelectedValues && (
                    <button
                      type="button"
                      className="multi-select__action-btn"
                      onClick={handleClearAll}
                      disabled={disabled}
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            )}

            {isInCreateMode && (
              <div 
                className="multi-select__create-value"
                onClick={handleCreateOption}
              >
                <span className="multi-select__create-value-text">
                  {searchQuery}
                </span>
                <div className="multi-select__actions">
                  <button
                    type="button"
                    className="multi-select__action-btn"
                    onClick={handleCreateOption}
                    disabled={disabled}
                  >
                    + Create Value
                  </button>
                </div>
              </div>
            )}
            
            <ul className="multi-select__listbox" ref={listboxRef} role="listbox" aria-multiselectable="true">
              {filteredOptions.length === 0 && !canCreateNewOption ? (
                <li className="multi-select__empty">No options found</li>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = currentValue.includes(option.value);
                  const isDisabled = option.disabled || (!isSelected && !canSelectMore);
                  
                  return (
                    <li
                      key={`option-${option.value}-${index}`}
                      className={`multi-select__option ${isSelected ? 'multi-select__option--selected' : ''} ${isDisabled ? 'multi-select__option--disabled' : ''}`}
                      onClick={() => !isDisabled && handleToggleOption(option.value)}
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={isDisabled ? -1 : 0}
                    >
                      <span>{option.label}</span>
                      <div className="multi-select__option-icon">
                        {isSelected ? (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 2.5V9.5M2.5 6H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}