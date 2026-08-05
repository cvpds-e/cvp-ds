import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronRight, Search, Calendar, User, Clock, Ban, Hash, Layers, Type } from 'lucide-react';

export interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  type: 'text' | 'select' | 'date' | 'multiselect' | 'boolean';
  options?: { value: string; label: string }[];
}

export interface ActiveFilter {
  id: string;
  label: string;
  value: string;
  displayValue: string;
}

export interface FilterProps {
  /** Available filter options */
  options?: FilterOption[];
  /** Active filters */
  activeFilters?: ActiveFilter[];
  /** Callback when filters change */
  onChange?: (filters: ActiveFilter[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Additional CSS class */
  className?: string;
}

export function Filter({
  options = [],
  activeFilters = [],
  onChange,
  placeholder = 'Filter...',
  className = ''
}: FilterProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState<FilterOption | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setSelectedOption(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const removeFilter = (filterId: string) => {
    const newFilters = activeFilters.filter(f => f.id !== filterId);
    onChange?.(newFilters);
  };

  const addFilter = (option: FilterOption, value: string, displayValue: string) => {
    const newFilter: ActiveFilter = {
      id: option.id,
      label: option.label,
      value,
      displayValue
    };
    onChange?.([...activeFilters, newFilter]);
    setIsMenuOpen(false);
    setSelectedOption(null);
    setSearchQuery('');
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <style>{`
        .filter {
          /* Theme-aware Design Tokens - Dark theme as default with light theme overrides */
          --surface-raised: var(--filter-menu-bg, #14141a);
          --surface-darker: var(--filter-search-bg, #1f1f28);
          --surface-overlay: var(--filter-option-hover-bg, #292a2e);
          --text-primary: var(--input-text, #ffffff);
          --text-quaternary: var(--input-placeholder, #AFAFB5);
          --primary-600: #3d63dd;
          --radius-md: 6px;
          --radius-lg: 8px;
          --transition-fast: 150ms;
          
          --type-scale-m-size: 14px;
          --type-scale-m-weight: 400;
          --type-scale-m-line-height: 20px;
          --type-scale-m-letter-spacing: 0.15px;
          
          --filter-font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          --filter-font-size: var(--type-scale-m-size);
          --filter-font-weight: var(--type-scale-m-weight);
          --filter-line-height: var(--type-scale-m-line-height);
          --filter-letter-spacing: var(--type-scale-m-letter-spacing);
          
          /* Filter specific tokens - theme-aware */
          --filter-chip-bg: var(--filter-active-chip-bg, #35373d);
          --filter-shortcut-bg: var(--filter-shortcut-key-bg, #35373d);
          --filter-option-selected-bg: var(--filter-option-selected-bg, #35373d);
          
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--filter-font-family);
        }

        .filter__bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background-color: var(--surface-raised);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          min-height: 36px;
          cursor: pointer;
          transition: all var(--transition-fast) ease;
        }

        .filter__bar:hover {
          border-color: var(--border-focus);
        }

        .filter__bar:focus-visible {
          outline: none;
          border: 2px solid var(--border-focus);
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
        }

        .filter__active-filters {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .filter__active-filter {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background-color: var(--filter-chip-bg);
          border-radius: 4px;
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          line-height: var(--filter-line-height);
          letter-spacing: var(--filter-letter-spacing);
          color: var(--text-primary);
        }

        .filter__active-filter-icon {
          display: flex;
          align-items: center;
          color: var(--text-quaternary);
        }

        .filter__active-filter-text {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .filter__active-filter-label {
          color: var(--text-quaternary);
        }

        .filter__active-filter-value {
          color: var(--text-primary);
        }

        .filter__active-filter-remove {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: var(--text-quaternary);
          transition: color var(--transition-fast) ease;
        }

        .filter__active-filter-remove:hover {
          color: var(--text-primary);
        }

        .filter__placeholder {
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          color: var(--text-quaternary);
        }

        .filter__menu {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          width: 380px;
          max-height: 480px;
          background-color: var(--surface-raised);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-lg);
          box-shadow: var(--cvp-elevation-3);
          overflow: hidden;
          z-index: var(--cvp-z-dropdown);
          display: flex;
          flex-direction: column;
          animation: filterDropdownIn var(--transition-fast) ease-out;
        }

        @keyframes filterDropdownIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .filter__search {
          padding: 12px;
          border-bottom: 1px solid var(--border-default);
        }

        .filter__search-input-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background-color: var(--surface-darker);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast) ease;
        }

        .filter__search-input-wrapper:focus-within {
          border: 2px solid var(--border-focus);
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
        }

        .filter__search-icon {
          color: var(--text-quaternary);
          flex-shrink: 0;
        }

        .filter__search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-family: var(--filter-font-family);
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          line-height: var(--filter-line-height);
          letter-spacing: var(--filter-letter-spacing);
          color: var(--text-primary);
        }

        .filter__search-input::placeholder {
          color: var(--text-quaternary);
        }

        .filter__search-shortcut {
          padding: 2px 6px;
          background-color: var(--filter-shortcut-bg);
          border-radius: 4px;
          font-size: 12px;
          color: var(--text-quaternary);
        }

        .filter__options {
          flex: 1;
          overflow-y: auto;
          padding: 4px 0;
        }

        .filter__option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          cursor: pointer;
          transition: background-color var(--transition-fast);
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          line-height: var(--filter-line-height);
          letter-spacing: var(--filter-letter-spacing);
          color: var(--text-primary);
        }

        .filter__option:hover {
          background-color: var(--surface-overlay);
        }

        .filter__option:focus-visible {
          background-color: var(--surface-overlay);
          outline: 2px solid #6f8be6;
          outline-offset: -2px;
        }

        .filter__option-icon {
          display: flex;
          align-items: center;
          color: var(--text-quaternary);
          width: 16px;
          height: 16px;
        }

        .filter__option-label {
          flex: 1;
        }

        .filter__option-chevron {
          display: flex;
          align-items: center;
          color: var(--text-quaternary);
          width: 16px;
          height: 16px;
        }

        .filter__submenu {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--surface-raised);
          display: flex;
          flex-direction: column;
          animation: slideInRight 0.2s ease;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(10px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .filter__submenu-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-bottom: 1px solid var(--border-default);
          cursor: pointer;
        }

        .filter__submenu-header:hover .filter__submenu-back {
          color: var(--text-primary);
        }

        .filter__submenu-back {
          display: flex;
          align-items: center;
          color: var(--text-quaternary);
          transition: color var(--transition-fast) ease;
        }

        .filter__submenu-title {
          font-size: 15px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .filter__submenu-options {
          flex: 1;
          overflow-y: auto;
          padding: 4px 0;
        }

        .filter__submenu-option {
          padding: 8px 12px;
          cursor: pointer;
          transition: background-color var(--transition-fast);
          font-size: var(--filter-font-size);
          font-weight: var(--filter-font-weight);
          line-height: var(--filter-line-height);
          letter-spacing: var(--filter-letter-spacing);
          color: var(--text-primary);
        }

        .filter__submenu-option:hover {
          background-color: var(--surface-overlay);
        }

        .filter__submenu-option:focus-visible {
          background-color: var(--surface-overlay);
          outline: 2px solid #6f8be6;
          outline-offset: -2px;
        }
      `}</style>

      <div className={`filter ${className}`}>
        <div
          ref={buttonRef}
          className="filter__bar"
          onClick={(e) => {
            // Only open menu if clicking the bar itself, not the remove buttons
            if ((e.target as HTMLElement).closest('.filter__active-filter-remove')) {
              return;
            }
            setIsMenuOpen(!isMenuOpen);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsMenuOpen(!isMenuOpen);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Open filter menu"
          aria-expanded={isMenuOpen}
        >
          {activeFilters.length > 0 ? (
            <div className="filter__active-filters">
              {activeFilters.map((filter) => (
                <div key={filter.id} className="filter__active-filter">
                  <div className="filter__active-filter-text">
                    <span className="filter__active-filter-label">{filter.label}</span>
                    <span className="filter__active-filter-value">{filter.displayValue}</span>
                  </div>
                  <button
                    className="filter__active-filter-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFilter(filter.id);
                    }}
                    aria-label={`Remove ${filter.label} filter`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="filter__placeholder">{placeholder}</div>
          )}
        </div>

        {isMenuOpen && (
          <div ref={menuRef} className="filter__menu">
            {!selectedOption ? (
              <>
                <div className="filter__search">
                  <div className="filter__search-input-wrapper">
                    <Search size={16} className="filter__search-icon" />
                    <input
                      type="text"
                      className="filter__search-input"
                      placeholder={placeholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <span className="filter__search-shortcut">F</span>
                  </div>
                </div>
                <div className="filter__options">
                  {filteredOptions.map((option) => (
                    <div
                      key={option.id}
                      className="filter__option"
                      onClick={() => {
                        if (option.type === 'boolean') {
                          addFilter(option, 'true', 'enabled');
                        } else {
                          setSelectedOption(option);
                        }
                      }}
                    >
                      {option.icon && (
                        <div className="filter__option-icon">{option.icon}</div>
                      )}
                      <div className="filter__option-label">{option.label}</div>
                      {option.type !== 'boolean' && (
                        <div className="filter__option-chevron">
                          <ChevronRight size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <FilterSubmenu
                option={selectedOption}
                onBack={() => setSelectedOption(null)}
                onSelect={addFilter}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

interface FilterSubmenuProps {
  option: FilterOption;
  onBack: () => void;
  onSelect: (option: FilterOption, value: string, displayValue: string) => void;
}

function FilterSubmenu({ option, onBack, onSelect }: FilterSubmenuProps) {
  if (option.type === 'date') {
    return <DateFilterSubmenu option={option} onBack={onBack} onSelect={onSelect} />;
  }

  if (option.type === 'select' || option.type === 'multiselect') {
    return (
      <div className="filter__submenu">
        <div className="filter__submenu-header" onClick={onBack}>
          <div className="filter__submenu-back">
            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
          </div>
          <div className="filter__submenu-title">{option.label}</div>
        </div>
        <div className="filter__submenu-options">
          {option.options?.map((opt) => (
            <div
              key={opt.value}
              className="filter__submenu-option"
              onClick={() => onSelect(option, opt.value, opt.label)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function DateFilterSubmenu({ option, onBack, onSelect }: FilterSubmenuProps) {
  const dateOptions = [
    { value: '1d', label: '1 day ago' },
    { value: '3d', label: '3 days ago' },
    { value: '1w', label: '1 week ago' },
    { value: '1m', label: '1 month ago' },
    { value: '3m', label: '3 months ago' },
    { value: '6m', label: '6 months ago' },
    { value: '1y', label: '1 year ago' },
    { value: 'custom', label: 'Custom date or timeframe...' }
  ];

  return (
    <div className="filter__submenu">
      <div className="filter__submenu-header" onClick={onBack}>
        <div className="filter__submenu-back">
          <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
        </div>
        <div className="filter__submenu-title">{option.label}</div>
      </div>
      <div className="filter__submenu-options">
        {dateOptions.map((opt) => (
          <div
            key={opt.value}
            className="filter__submenu-option"
            onClick={() => onSelect(option, opt.value, opt.label)}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}
