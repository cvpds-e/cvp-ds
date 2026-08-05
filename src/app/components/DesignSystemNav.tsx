import React from 'react';

export interface DesignSystemNavProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', category: 'System' },
  { id: 'colors', label: 'Colors', category: 'Foundations' },
  { id: 'typography', label: 'Typography', category: 'Foundations' },
  { id: 'spacing', label: 'Spacing', category: 'Foundations' },
  { id: 'radius', label: 'Radius', category: 'Foundations' },
  { id: 'border', label: 'Border', category: 'Foundations' },
  { id: 'elevation', label: 'Elevation', category: 'Foundations' },
  { id: 'layout-foundation', label: 'Layout', category: 'Foundations' },

  // Core Components
  { id: 'primary-button', label: 'Primary Button', category: 'Buttons' },
  { id: 'secondary-button', label: 'Secondary Button', category: 'Buttons' },
  { id: 'outline-button', label: 'Outline Button', category: 'Buttons' },
  { id: 'icon-button', label: 'Icon Button', category: 'Buttons' },
  { id: 'icon-small-button', label: 'Icon Small Button', category: 'Buttons' },
  { id: 'icon-button-with-text', label: 'Icon Button with Text', category: 'Buttons' },
  { id: 'text-button', label: 'Text Button', category: 'Buttons' },
  
  // Form Components
  { id: 'text-input', label: 'Text Input', category: 'Forms' },
  { id: 'text-area', label: 'Text Area', category: 'Forms' },
  { id: 'misc-input', label: 'Misc Input', category: 'Forms' },
  { id: 'checkbox', label: 'Checkbox', category: 'Forms' },
  { id: 'toggle', label: 'Toggle', category: 'Forms' },
  { id: 'select', label: 'Select', category: 'Forms' },
  { id: 'multi-select', label: 'Multi Select', category: 'Forms' },
  { id: 'filter', label: 'Filter', category: 'Forms' },
  { id: 'filter-group', label: 'Filter Group', category: 'Forms' },
  
  // Navigation & Layout
  { id: 'breadcrumbs', label: 'Breadcrumbs', category: 'Navigation' },
  { id: 'header-navigation', label: 'Header Navigation', category: 'Navigation' },
  { id: 'tabs', label: 'Tabs', category: 'Navigation' },
  { id: 'tree', label: 'Tree', category: 'Navigation' },
  { id: 'table', label: 'Table', category: 'Navigation' },
  { id: 'layout', label: 'Layout', category: 'Navigation' },
  { id: 'segmented', label: 'Segmented', category: 'Navigation' },
  { id: 'accordion', label: 'Accordion', category: 'Navigation' },
  { id: 'tag-filter', label: 'Tag Filter', category: 'Navigation' },
  { id: 'page-side-nav', label: 'Page Side Nav', category: 'Navigation' },
  
  // Overlays & Feedback
  { id: 'modal', label: 'Modal', category: 'Overlays' },
  { id: 'content-browser-modal', label: 'Content Browser Modal', category: 'Overlays' },
  { id: 'toast', label: 'Toast', category: 'Feedback' },
  { id: 'notification-banner', label: 'Notification Banner', category: 'Feedback' },

  // Complex Components
  { id: 'segment-query-config', label: 'Segment Query Config', category: 'Complex' },
  { id: 'rail-content-gallery', label: 'Rail Content Gallery', category: 'Complex' },
  
  // Pages
  { id: 'login-signup', label: 'Login / Sign Up', category: 'Pages' },
  { id: 'rail-details', label: 'Rail Details', category: 'Pages' }
];

export function DesignSystemNav({ activeItem, onItemClick }: DesignSystemNavProps) {
  return (
    <div>
      <style>{`
        .design-system-nav {
          /* Design System Tokens */
          --nav-width: 240px;
          --nav-bg: var(--background);
          --nav-border-right: 1px solid var(--border-default);
          --nav-padding: var(--spacing-6) 0;
          --nav-z-index: 100;

          /* Item Tokens */
          --nav-item-padding: var(--spacing-3) var(--spacing-6);
          --nav-item-font-size: var(--type-scale-s-size);
          --nav-item-font-weight: var(--type-scale-s-weight);
          --nav-item-line-height: var(--type-scale-s-line-height);
          --nav-item-letter-spacing: var(--type-scale-s-letter-spacing);
          --nav-item-color: var(--muted-foreground);
          --nav-item-hover-bg: var(--muted);
          --nav-item-hover-color: var(--foreground);
          --nav-item-active-bg: var(--accent);
          --nav-item-active-color: var(--accent-foreground);
          --nav-item-border-radius: var(--radius-sm);
          --nav-item-margin: 0 var(--spacing-4);
          --nav-item-transition: all 0.2s ease;

          /* Category Tokens */
          --nav-category-margin: var(--spacing-6) 0 var(--spacing-3) 0;
          --nav-category-padding: 0 var(--spacing-6);
          --nav-category-font-size: var(--type-scale-xs-size);
          --nav-category-font-weight: var(--font-weight-medium);
          --nav-category-color: var(--muted-foreground);
          --nav-category-transform: uppercase;
          --nav-category-letter-spacing: 0.5px;

          /* Component Styles */
          position: fixed;
          top: 0;
          left: 0;
          width: var(--nav-width);
          height: 100vh;
          background: var(--nav-bg);
          border-right: var(--nav-border-right);
          overflow-y: auto;
          z-index: var(--nav-z-index);
          padding: var(--nav-padding);
          box-sizing: border-box;
        }

        .design-system-nav__item {
          display: flex;
          align-items: center;
          padding: var(--nav-item-padding);
          margin: var(--nav-item-margin);
          color: var(--nav-item-color);
          text-decoration: none;
          font-size: var(--nav-item-font-size);
          font-weight: var(--nav-item-font-weight);
          line-height: var(--nav-item-line-height);
          letter-spacing: var(--nav-item-letter-spacing);
          border-radius: var(--nav-item-border-radius);
          transition: var(--nav-item-transition);
          cursor: pointer;
          border: none;
          background: none;
          width: calc(100% - 2 * var(--spacing-4));
          box-sizing: border-box;
        }

        .design-system-nav__item:hover {
          background: var(--nav-item-hover-bg);
          color: var(--nav-item-hover-color);
        }

        .design-system-nav__item--active {
          background: var(--nav-item-active-bg);
          color: var(--nav-item-active-color);
        }

        .design-system-nav__category {
          margin: var(--nav-category-margin);
          padding: var(--nav-category-padding);
          font-size: var(--nav-category-font-size);
          font-weight: var(--nav-category-font-weight);
          color: var(--nav-category-color);
          text-transform: var(--nav-category-transform);
          letter-spacing: var(--nav-category-letter-spacing);
        }

        .design-system-nav__category:first-of-type {
          margin-top: 0;
        }
      `}</style>

      <nav className="design-system-nav">
        {NAV_ITEMS.map((item, index) => {
          const prevItem = NAV_ITEMS[index - 1];
          const shouldShowCategory = item.category && 
            (!prevItem || prevItem.category !== item.category);
          
          const isActive = activeItem === item.id;

          return (
            <div key={item.id}>
              {shouldShowCategory && (
                <div className="design-system-nav__category">
                  {item.category}
                </div>
              )}
              <button
                className={`design-system-nav__item ${isActive ? 'design-system-nav__item--active' : ''}`}
                onClick={() => onItemClick(item.id)}
              >
                {item.label}
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
