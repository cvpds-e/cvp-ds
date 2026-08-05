import React, { useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconColor?: 'default' | 'primary';
}

export interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Type of accordion - single allows only one open at a time, multiple allows multiple */
  type?: 'single' | 'multiple';
  /** Initially expanded items (IDs) */
  defaultExpanded?: string[];
  /** Callback when accordion item is expanded/collapsed */
  onExpandedChange?: (expandedItems: string[]) => void;
  /** Whether the accordion is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
}

export function Accordion({
  items,
  type = 'single',
  defaultExpanded = [],
  onExpandedChange,
  disabled = false,
  className = '',
}: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

  const handleToggle = (itemId: string) => {
    if (disabled) return;

    const item = items.find(item => item.id === itemId);
    if (item?.disabled) return;

    let newExpandedItems: string[];

    if (type === 'single') {
      // Single type: only one item can be expanded at a time
      newExpandedItems = expandedItems.includes(itemId) ? [] : [itemId];
    } else {
      // Multiple type: multiple items can be expanded
      newExpandedItems = expandedItems.includes(itemId)
        ? expandedItems.filter(id => id !== itemId)
        : [...expandedItems, itemId];
    }

    setExpandedItems(newExpandedItems);
    onExpandedChange?.(newExpandedItems);
  };

  return (
    <>
      <style>{`
        .accordion {
          /* Design System Tokens */
          --accordion-item-radius: 0;
          --accordion-header-padding: 12px 15px;
          --accordion-content-padding: 16px;
          --accordion-border-width: 1px;
          --accordion-transition-duration: 0.2s;
          --accordion-icon-size: 16px;

          /* Accordion Styles */
          background-color: var(--background);
          border-radius: var(--accordion-item-radius);
          font-family: var(--font-family);
          width: 100%;
          overflow: hidden;
        }

        .accordion--disabled {
          opacity: 0.6;
          pointer-events: none;
        }

        .accordion-item {
          border-bottom: var(--accordion-border-width) solid var(--border-default);
        }

        .accordion-item:last-child {
          border-bottom: none;
        }

        .accordion-item:first-child .accordion-header {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }

        .accordion-item:last-child .accordion-header {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }

        .accordion-item:first-child .accordion-content {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }

        .accordion-item:last-child .accordion-content {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }

        .accordion-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--accordion-header-padding);
          background-color: var(--card);
          border: none;
          cursor: pointer;
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-weight);
          color: var(--foreground);
          transition: background-color var(--accordion-transition-duration) var(--default-transition-timing-function);
          width: 100%;
          text-align: left;
          user-select: none;
        }

        .accordion-header:hover:not(.accordion-header--disabled) {
          background-color: var(--muted);
        }

        .accordion-header:focus-visible {
          outline: 2px solid var(--focus-ring);
          outline-offset: -2px;
        }

        .accordion-header--disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .accordion-title {
          flex: 1;
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-weight);
          color: var(--foreground);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .accordion-title-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          color: var(--foreground);
        }

        .accordion-title-icon--primary {
          color: var(--primary);
        }

        .accordion-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--accordion-icon-size);
          height: var(--accordion-icon-size);
          transition: transform var(--accordion-transition-duration) var(--default-transition-timing-function);
          color: var(--muted-foreground);
        }

        .accordion-icon--expanded {
          transform: rotate(180deg);
        }

        .accordion-content {
          overflow: hidden;
          background-color: var(--card);
          transition: height var(--accordion-transition-duration) var(--default-transition-timing-function);
        }

        .accordion-content--expanded {
          height: auto;
        }

        .accordion-content--collapsed {
          height: 0;
        }

        .accordion-content-inner {
          padding: var(--accordion-content-padding);
          color: var(--foreground);
        }

        .accordion-content-inner > *:first-child {
          margin-top: 0;
        }

        .accordion-content-inner > *:last-child {
          margin-bottom: 0;
        }

        /* Full width support for panel layouts */
        .accordion.panel-full-width-horizontal {
          width: 100%;
        }
      `}</style>

      <div className={`accordion ${disabled ? 'accordion--disabled' : ''} ${className}`}>
        {items.map((item) => {
          const isExpanded = expandedItems.includes(item.id);
          const isDisabled = disabled || item.disabled;

          return (
            <div key={item.id} className="accordion-item">
              <button
                className={`accordion-header ${isDisabled ? 'accordion-header--disabled' : ''}`}
                onClick={() => handleToggle(item.id)}
                disabled={isDisabled}
                aria-expanded={isExpanded}
                aria-controls={`accordion-content-${item.id}`}
                id={`accordion-header-${item.id}`}
              >
                <span className="accordion-title">
                  {item.icon && <span className={`accordion-title-icon ${item.iconColor === 'primary' ? 'accordion-title-icon--primary' : ''}`}>{item.icon}</span>}
                  {item.title}
                </span>
                <span className={`accordion-icon ${isExpanded ? 'accordion-icon--expanded' : ''}`}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              
              <div
                className={`accordion-content ${isExpanded ? 'accordion-content--expanded' : 'accordion-content--collapsed'}`}
                id={`accordion-content-${item.id}`}
                aria-labelledby={`accordion-header-${item.id}`}
                role="region"
                style={{
                  display: isExpanded ? 'block' : 'none'
                }}
              >
                <div className="accordion-content-inner">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}