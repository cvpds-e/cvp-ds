import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown, ArrowLeft } from 'lucide-react';

export interface DropdownItemOption {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  onClick?: () => void;
  href?: string;
  separator?: boolean;
}

export interface BreadcrumbItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  onClick?: () => void;
  href?: string;
  dropdown?: DropdownItemOption[];
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator element */
  separator?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

export function Breadcrumbs({
  items,
  separator,
  className = ''
}: BreadcrumbsProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  if (!items || items.length === 0) {
    return null;
  }

  const defaultSeparator = <ChevronRight className="breadcrumbs__separator-icon" />;

  const handleDropdownToggle = (itemId: string) => {
    setOpenDropdownId(openDropdownId === itemId ? null : itemId);
  };

  const handleDropdownItemClick = (item: DropdownItemOption) => {
    if (item.onClick) {
      item.onClick();
    }
    setOpenDropdownId(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId) {
        const dropdownRef = dropdownRefs.current[openDropdownId];
        if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
          setOpenDropdownId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdownId]);

  return (
    <>
      <style>{`
        .breadcrumbs {
          /* Design System Tokens */
          --breadcrumbs-font-family: var(--font-family);
          --breadcrumbs-font-size: 14px;
          --breadcrumbs-font-weight: 400;
          --breadcrumbs-line-height: var(--type-scale-m-line-height);
          --breadcrumbs-letter-spacing: var(--type-scale-m-letter-spacing);
          --breadcrumbs-gap: 8px;
          --breadcrumbs-item-gap: 8px;
          --breadcrumbs-padding: 12px 24px;
          --breadcrumbs-margin: 0;

          /* Container */
          --breadcrumbs-background: var(--breadcrumb-bg);
          --breadcrumbs-border-bottom: 1px solid var(--border-default);

          /* Colors */
          --breadcrumbs-default-text: var(--breadcrumb-text);
          --breadcrumbs-current-text: var(--breadcrumb-active);
          --breadcrumbs-hover-text: var(--text-primary);
          --breadcrumbs-separator-text: var(--breadcrumb-sep);

          /* Interactive States */
          --breadcrumbs-transition: all 150ms ease;
          --breadcrumbs-cursor: pointer;
          --breadcrumbs-focus-outline: 2px solid #6f8be6;
          --breadcrumbs-focus-outline-offset: 2px;

          /* Icon */
          --breadcrumbs-icon-size: 16px;
          --breadcrumbs-separator-icon-size: 16px;
          --breadcrumbs-dropdown-icon-size: 12px;

          /* Dropdown - Using Select component styling */
          --breadcrumbs-dropdown-trigger-bg: transparent;
          --breadcrumbs-dropdown-trigger-hover-bg: var(--muted);
          --breadcrumbs-dropdown-trigger-border-radius: 4px;
          --breadcrumbs-dropdown-trigger-padding: 2px 4px;
          --breadcrumbs-dropdown-trigger-margin: -2px -4px;
          --breadcrumbs-dropdown-bg: #292a2e;
          --breadcrumbs-dropdown-shadow: 0 1px 1px #000;
          --breadcrumbs-dropdown-border-radius: var(--input-border-radius);
          --breadcrumbs-dropdown-max-height: 300px;
          --breadcrumbs-dropdown-option-padding: 8px 12px;
          --breadcrumbs-dropdown-option-hover-bg: #333333;

          /* Component Styles */
          font-family: var(--breadcrumbs-font-family);
          font-size: var(--breadcrumbs-font-size);
          font-weight: var(--breadcrumbs-font-weight);
          line-height: var(--breadcrumbs-line-height);
          letter-spacing: var(--breadcrumbs-letter-spacing);
          padding: var(--breadcrumbs-padding);
          margin: var(--breadcrumbs-margin);
          background: var(--breadcrumbs-background);
          border-bottom: var(--breadcrumbs-border-bottom);
          list-style: none;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--breadcrumbs-gap);
        }

        .breadcrumbs__list {
          display: flex;
          align-items: center;
          gap: var(--breadcrumbs-gap);
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .breadcrumbs__item {
          display: inline-flex;
          align-items: center;
          gap: var(--breadcrumbs-item-gap);
          color: var(--cvp-color-text-muted);
          position: relative;
          line-height: 1;
        }

        .breadcrumbs__item--first {
          color: var(--cvp-color-text-muted);
        }

        .breadcrumbs__item--first:hover {
          color: var(--cvp-color-text-primary);
        }

        .breadcrumbs__item--current {
          color: var(--cvp-color-text-primary);
        }

        .breadcrumbs__link {
          display: inline-flex;
          align-items: center;
          gap: var(--breadcrumbs-item-gap);
          color: inherit;
          text-decoration: none;
          cursor: var(--breadcrumbs-cursor);
          transition: var(--breadcrumbs-transition);
          outline: none;
          border-radius: 2px;
          background: transparent;
          border: none;
          padding: 0;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          line-height: 1;
          letter-spacing: inherit;
        }

        .breadcrumbs__link:hover {
          color: var(--breadcrumbs-hover-text);
        }

        /* Override hover for first item - goes from #bbb to white */
        .breadcrumbs__item--first .breadcrumbs__link:hover {
          color: var(--cvp-color-text-primary);
        }

        /* Override hover for non-first items - goes from white to #bbb */
        .breadcrumbs__item:not(.breadcrumbs__item--first) .breadcrumbs__link:hover {
          color: var(--cvp-color-text-muted);
        }

        .breadcrumbs__link:hover .breadcrumbs__icon--back {
          transform: translateX(-2px);
        }

        .breadcrumbs__link:focus-visible {
          outline: var(--breadcrumbs-focus-outline);
          outline-offset: var(--breadcrumbs-focus-outline-offset);
        }

        .breadcrumbs__text {
          display: inline-flex;
          align-items: center;
          gap: var(--breadcrumbs-item-gap);
          line-height: 1;
        }

        .breadcrumbs__icon {
          width: var(--breadcrumbs-icon-size);
          height: var(--breadcrumbs-icon-size);
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .breadcrumbs__icon--back {
          transition: transform 150ms ease;
          color: #bbb;
        }

        .breadcrumbs__item--first .breadcrumbs__link:hover .breadcrumbs__icon--back {
          color: #ffffff;
        }

        .breadcrumbs__item--first .breadcrumbs__dropdown-trigger:hover .breadcrumbs__icon--back {
          color: #ffffff;
        }

        .breadcrumbs__separator {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--breadcrumbs-separator-text);
          user-select: none;
          pointer-events: none;
          line-height: 1;
        }

        .breadcrumbs__separator-icon {
          width: var(--breadcrumbs-separator-icon-size);
          height: var(--breadcrumbs-separator-icon-size);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .breadcrumbs__dropdown-container {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .breadcrumbs__dropdown-trigger {
          display: inline-flex;
          align-items: center;
          gap: var(--breadcrumbs-item-gap);
          color: inherit;
          background: var(--breadcrumbs-dropdown-trigger-bg);
          border: none;
          cursor: var(--breadcrumbs-cursor);
          transition: var(--breadcrumbs-transition);
          outline: none;
          border-radius: var(--breadcrumbs-dropdown-trigger-border-radius);
          padding: var(--breadcrumbs-dropdown-trigger-padding);
          margin: var(--breadcrumbs-dropdown-trigger-margin);
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          line-height: 1;
          letter-spacing: inherit;
        }

        .breadcrumbs__dropdown-trigger:hover {
          color: var(--breadcrumbs-hover-text);
          background: var(--breadcrumbs-dropdown-trigger-hover-bg);
        }

        /* Override hover for first item dropdown - goes from #bbb to white */
        .breadcrumbs__item--first .breadcrumbs__dropdown-trigger:hover {
          color: #ffffff;
          background: var(--breadcrumbs-dropdown-trigger-hover-bg);
        }

        /* Override hover for non-first item dropdown - goes from white to #bbb */
        .breadcrumbs__item:not(.breadcrumbs__item--first) .breadcrumbs__dropdown-trigger:hover {
          color: #bbb;
          background: var(--breadcrumbs-dropdown-trigger-hover-bg);
        }

        .breadcrumbs__dropdown-trigger:focus-visible {
          outline: var(--breadcrumbs-focus-outline);
          outline-offset: var(--breadcrumbs-focus-outline-offset);
        }

        .breadcrumbs__dropdown-trigger--open {
          color: var(--breadcrumbs-hover-text);
          background: var(--breadcrumbs-dropdown-trigger-hover-bg);
        }

        .breadcrumbs__dropdown-icon {
          width: var(--breadcrumbs-dropdown-icon-size);
          height: var(--breadcrumbs-dropdown-icon-size);
          flex-shrink: 0;
          transition: transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .breadcrumbs__dropdown-icon--open {
          transform: rotate(180deg);
        }

        .breadcrumbs__dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 9999;
          margin-top: 4px;
          background-color: var(--breadcrumbs-dropdown-bg);
          border-radius: var(--breadcrumbs-dropdown-border-radius);
          box-shadow: var(--breadcrumbs-dropdown-shadow);
          max-height: var(--breadcrumbs-dropdown-max-height);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-width: 160px;
        }

        .breadcrumbs__dropdown-list {
          list-style: none;
          margin: 0;
          padding: 0;
          overflow-y: auto;
          max-height: var(--breadcrumbs-dropdown-max-height);
        }

        .breadcrumbs__dropdown-separator {
          height: 1px;
          background-color: var(--border-default);
          margin: 4px 0;
        }

        .breadcrumbs__dropdown-option {
          padding: var(--breadcrumbs-dropdown-option-padding);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: var(--breadcrumbs-transition);
          color: var(--foreground);
          font-size: var(--breadcrumbs-font-size);
        }

        .breadcrumbs__dropdown-option:hover {
          background-color: var(--breadcrumbs-dropdown-option-hover-bg);
        }

        .breadcrumbs__dropdown-option:focus-visible {
          background-color: var(--breadcrumbs-dropdown-option-hover-bg);
          outline: 2px solid var(--focus-ring) !important;
          outline-offset: -2px !important;
          box-shadow: none !important;
        }

        /* Ensure dropdown option buttons inherit hover styles */
        .breadcrumbs__dropdown-option button:hover {
          background-color: transparent;
        }

        .breadcrumbs__dropdown-option-icon {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .breadcrumbs {
            --breadcrumbs-gap: 6px;
            --breadcrumbs-item-gap: 4px;
          }
        }
      `}</style>

      <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumb navigation">
        <ol className="breadcrumbs__list">
          {items.flatMap((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;
            const IconComponent = item.icon;
            const hasDropdown = item.dropdown && item.dropdown.length > 0;
            const isDropdownOpen = openDropdownId === item.id;

            const elements = [
              <li
                key={`item-${item.id}`}
                className={`breadcrumbs__item ${isFirst ? 'breadcrumbs__item--first' : ''} ${isLast ? 'breadcrumbs__item--current' : ''}`}
                {...(isLast && { 'aria-current': 'page' })}
              >
                  {hasDropdown ? (
                    <div 
                      className="breadcrumbs__dropdown-container"
                      ref={(el) => {
                        dropdownRefs.current[item.id] = el;
                      }}
                    >
                      <button 
                        className={`breadcrumbs__dropdown-trigger ${isDropdownOpen ? 'breadcrumbs__dropdown-trigger--open' : ''}`}
                        onClick={() => handleDropdownToggle(item.id)}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                      >
                        {isFirst ? (
                          <ArrowLeft 
                            size={16} 
                            className="breadcrumbs__icon breadcrumbs__icon--back" 
                          />
                        ) : IconComponent ? (
                          <IconComponent 
                            size={16} 
                            className="breadcrumbs__icon" 
                          />
                        ) : null}
                        <span>{item.label}</span>
                        <ChevronDown 
                          className={`breadcrumbs__dropdown-icon ${isDropdownOpen ? 'breadcrumbs__dropdown-icon--open' : ''}`} 
                        />
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="breadcrumbs__dropdown-menu">
                          <ul className="breadcrumbs__dropdown-list">
                            {item.dropdown.flatMap((dropdownItem, dropdownIndex) => {
                              const dropElements = [];

                              if (dropdownItem.separator && dropdownIndex > 0) {
                                dropElements.push(
                                  <li key={`${dropdownItem.id}-sep`} className="breadcrumbs__dropdown-separator" role="separator" />
                                );
                              }

                              dropElements.push(
                                <li key={dropdownItem.id}>
                                  {dropdownItem.href ? (
                                    <a
                                      href={dropdownItem.href}
                                      className="breadcrumbs__dropdown-option"
                                      onClick={(e) => {
                                        if (dropdownItem.onClick) {
                                          e.preventDefault();
                                          handleDropdownItemClick(dropdownItem);
                                        }
                                      }}
                                    >
                                      {dropdownItem.icon && (
                                        <dropdownItem.icon
                                          size={14}
                                          className="breadcrumbs__dropdown-option-icon"
                                        />
                                      )}
                                      {dropdownItem.label}
                                    </a>
                                  ) : (
                                    <button
                                      className="breadcrumbs__dropdown-option"
                                      onClick={() => handleDropdownItemClick(dropdownItem)}
                                      style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        border: 'none',
                                        background: 'none',
                                        font: 'inherit'
                                      }}
                                    >
                                      {dropdownItem.icon && (
                                        <dropdownItem.icon
                                          size={14}
                                          className="breadcrumbs__dropdown-option-icon"
                                        />
                                      )}
                                      {dropdownItem.label}
                                    </button>
                                  )}
                                </li>
                              );

                              return dropElements;
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : item.onClick || item.href ? (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                      }}
                      className="breadcrumbs__link"
                      tabIndex={0}
                    >
                      {isFirst ? (
                        <ArrowLeft 
                          size={16} 
                          className="breadcrumbs__icon breadcrumbs__icon--back" 
                        />
                      ) : IconComponent ? (
                        <IconComponent 
                          size={16} 
                          className="breadcrumbs__icon" 
                        />
                      ) : null}
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <span className="breadcrumbs__text">
                      {isFirst ? (
                        <ArrowLeft 
                          size={16} 
                          className="breadcrumbs__icon breadcrumbs__icon--back" 
                        />
                      ) : IconComponent ? (
                        <IconComponent 
                          size={16} 
                          className="breadcrumbs__icon" 
                        />
                      ) : null}
                      <span>{item.label}</span>
                    </span>
                  )}
                </li>
            ];

            if (!isLast) {
              elements.push(
                <li key={`sep-${item.id}`} className="breadcrumbs__separator" role="presentation" aria-hidden="true">
                  {separator || defaultSeparator}
                </li>
              );
            }

            return elements;
          })}
        </ol>
      </nav>
    </>
  );
}
