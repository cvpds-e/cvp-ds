import React from 'react';
import './DesignSystemNav.css';

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
  { id: 'token-architecture', label: 'Token Architecture', category: 'Foundations' },

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
  { id: 'number-input', label: 'Number Input', category: 'Forms' },
  { id: 'text-area', label: 'Text Area', category: 'Forms' },
  { id: 'misc-input', label: 'Misc Input', category: 'Forms' },
  { id: 'checkbox', label: 'Checkbox', category: 'Forms' },
  { id: 'select', label: 'Select', category: 'Forms' },
  { id: 'multi-select', label: 'Multi Select', category: 'Forms' },
  { id: 'pill', label: 'Pill', category: 'Forms' },
  { id: 'filter', label: 'Filter', category: 'Forms' },
  { id: 'query-controls', label: 'Query Controls', category: 'Forms' },
  { id: 'date-picker', label: 'Date Picker', category: 'Forms' },
  
  // Navigation & Layout
  { id: 'breadcrumbs', label: 'Breadcrumbs', category: 'Navigation' },
  { id: 'header-navigation', label: 'Header Navigation', category: 'Navigation' },
  { id: 'tabs', label: 'Tabs', category: 'Navigation' },
  { id: 'tree', label: 'Tree', category: 'Navigation' },
  { id: 'table', label: 'Table', category: 'Navigation' },
  { id: 'segmented', label: 'Segmented', category: 'Navigation' },
  { id: 'accordion', label: 'Accordion', category: 'Navigation' },
  { id: 'tag-filter', label: 'Tag Filter', category: 'Navigation' },
  
  // Overlays & Feedback
  { id: 'modal', label: 'Modal', category: 'Overlays' },
  { id: 'content-browser-modal', label: 'Content Browser Modal', category: 'Overlays' },
  { id: 'tooltip', label: 'Tooltip', category: 'Overlays' },
  { id: 'skeleton', label: 'Skeleton', category: 'Feedback' },
  { id: 'loading-spinner', label: 'Loading Spinner', category: 'Feedback' },
  { id: 'toast', label: 'Toast', category: 'Feedback' },
  { id: 'notification-banner', label: 'Notification Banner', category: 'Feedback' },

  // Complex Components
  { id: 'rail-content-gallery', label: 'Rail Content Gallery', category: 'Complex' },
  { id: 'workspace-layout', label: 'Workspace Layout', category: 'Complex' },
  
  // Pages
  { id: 'login-signup', label: 'Login / Sign Up', category: 'Pages' },
  { id: 'rails-list', label: 'Rails List', category: 'Pages' },
  { id: 'rail-details', label: 'Rail Details', category: 'Pages' }
];

export function DesignSystemNav({ activeItem, onItemClick }: DesignSystemNavProps) {
  return (
    <div>
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
