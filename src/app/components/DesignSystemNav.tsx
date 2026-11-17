import React, { KeyboardEvent, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { filterCatalog } from '../designSystemCatalog';
import './DesignSystemNav.css';

export interface DesignSystemNavProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export function DesignSystemNav({ activeItem, onItemClick }: DesignSystemNavProps) {
  const [query, setQuery] = useState('');
  const filteredItems = useMemo(() => filterCatalog(query), [query]);

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
          placeholder="Search the design system"
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
                type="button"
                aria-current={isActive ? 'page' : undefined}
                className={`design-system-nav__item ${isActive ? 'design-system-nav__item--active' : ''}`}
                onClick={() => onItemClick(item.id)}
              >
                {item.label}
                {item.availability && <span className="design-system-nav__availability">{item.availability}</span>}
              </button>
            </div>
          );
        })}
        {!filteredItems.length && <p className="design-system-nav__empty" role="status">No design system entries found.</p>}
      </div>
    </nav>
  );
}
