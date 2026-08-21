import React, { KeyboardEvent, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
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
  { id: 'pagination', label: 'Pagination', category: 'Navigation' },
  { id: 'badge', label: 'Badge', category: 'Navigation' },
  { id: 'segmented', label: 'Segmented', category: 'Navigation' },
  { id: 'accordion', label: 'Accordion', category: 'Navigation' },
  { id: 'tag-filter', label: 'Tag Filter', category: 'Navigation' },
  
  // Overlays & Feedback
  { id: 'modal', label: 'Modal', category: 'Overlays' },
  { id: 'content-browser-modal', label: 'Content Browser Modal', category: 'Overlays' },
  { id: 'tooltip', label: 'Tooltip', category: 'Overlays' },
  { id: 'skeleton', label: 'Skeleton', category: 'Feedback' },
  { id: 'loading-spinner', label: 'Loading Spinner', category: 'Feedback' },
  { id: 'status', label: 'Status', category: 'Feedback' },
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
  const [query, setQuery] = useState('');
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return NAV_ITEMS;
    return NAV_ITEMS.filter((item) => `${item.label} ${item.category}`.toLocaleLowerCase().includes(normalizedQuery));
  }, [query]);

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setQuery('');
      event.currentTarget.blur();
    }
    if (event.key === 'Enter' && filteredItems[0]) {
      onItemClick(filteredItems[0].id);
      setQuery('');
    }
  };

  return (
    <nav className="design-system-nav" aria-label="Design system navigation">
      <div className="design-system-nav__search">
        <Search size={16} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search components"
          aria-label="Search design system navigation"
          aria-controls="design-system-nav-results"
        />
        {query && <button type="button" className="design-system-nav__clear" aria-label="Clear navigation search" onClick={() => setQuery('')}><X size={14} aria-hidden="true" /></button>}
      </div>
      <div id="design-system-nav-results" className="design-system-nav__results">
        {filteredItems.map((item, index) => {
          const prevItem = filteredItems[index - 1];
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
        {!filteredItems.length && <p className="design-system-nav__empty" role="status">No components found.</p>}
      </div>
    </nav>
  );
}
