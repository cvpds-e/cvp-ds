import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface PageSideNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}

export interface PageSideNavSection {
  title: string;
  items: PageSideNavItem[];
}

export interface PageSideNavProps {
  sections: PageSideNavSection[];
  className?: string;
}

export function PageSideNav({ sections, className = '' }: PageSideNavProps) {
  return (
    <>
      <style>{`
        .page-side-nav {
          /* Design System Tokens */
          --page-side-nav-width: 224px;
          --page-side-nav-bg: var(--bg-base);
          --page-side-nav-border: 1px solid var(--border-default);
          --page-side-nav-padding: 16px;
          --page-side-nav-section-gap: 24px;
          
          /* Section Title */
          --page-side-nav-section-title-size: 10px;
          --page-side-nav-section-title-weight: 600;
          --page-side-nav-section-title-color: var(--text-tertiary);
          --page-side-nav-section-title-spacing: 0.05em;
          --page-side-nav-section-title-margin: 12px;
          --page-side-nav-section-title-padding: 0 8px;
          
          /* Nav Item */
          --page-side-nav-item-padding: 6px 8px;
          --page-side-nav-item-size: 14px;
          --page-side-nav-item-radius: 6px;
          --page-side-nav-item-gap: 2px;
          --page-side-nav-item-color: var(--text-secondary);
          --page-side-nav-item-hover-bg: var(--bg-hover);
          --page-side-nav-item-hover-color: var(--text-primary);
          --page-side-nav-item-active-bg: rgba(111, 139, 230, 0.08);
          --page-side-nav-item-active-color: #6f8be6;
          --page-side-nav-item-transition: all 150ms ease;
          
          /* Icon */
          --page-side-nav-icon-color: var(--icon-muted);
          --page-side-nav-icon-active-color: #6f8be6;
          --page-side-nav-icon-hover-color: var(--icon-strong);
          --page-side-nav-icon-size: 16px;
          
          /* Badge */
          --page-side-nav-badge-size: 10px;
          --page-side-nav-badge-weight: 500;
          --page-side-nav-badge-bg: var(--bg-surface-raised);
          --page-side-nav-badge-color: var(--text-secondary);
          --page-side-nav-badge-padding: 2px 6px;
          --page-side-nav-badge-radius: 4px;
          
          /* Active Indicator */
          --page-side-nav-indicator-size: 14px;
          --page-side-nav-indicator-color: #6f8be6;
          
          /* Component Styles */
          width: var(--page-side-nav-width);
          border-right: var(--page-side-nav-border);
          background-color: var(--page-side-nav-bg);
          flex-shrink: 0;
          overflow-y: auto;
          height: 100%;
        }
        
        .page-side-nav__inner {
          padding: var(--page-side-nav-padding);
          display: flex;
          flex-direction: column;
          gap: var(--page-side-nav-section-gap);
        }
        
        .page-side-nav__section {
          display: flex;
          flex-direction: column;
        }
        
        .page-side-nav__section-title {
          font-size: var(--page-side-nav-section-title-size);
          font-weight: var(--page-side-nav-section-title-weight);
          color: var(--page-side-nav-section-title-color);
          text-transform: uppercase;
          letter-spacing: var(--page-side-nav-section-title-spacing);
          margin-bottom: var(--page-side-nav-section-title-margin);
          padding: var(--page-side-nav-section-title-padding);
        }
        
        .page-side-nav__items {
          display: flex;
          flex-direction: column;
          gap: var(--page-side-nav-item-gap);
        }
        
        .page-side-nav__item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--page-side-nav-item-padding);
          font-size: var(--page-side-nav-item-size);
          border-radius: var(--page-side-nav-item-radius);
          transition: var(--page-side-nav-item-transition);
          color: var(--page-side-nav-item-color);
          background: transparent;
          border: none;
          cursor: pointer;
          text-decoration: none;
          width: 100%;
          text-align: left;
          font-family: var(--font-family);
        }
        
        .page-side-nav__item:hover:not(.page-side-nav__item--active) {
          background-color: var(--page-side-nav-item-hover-bg);
          color: var(--page-side-nav-item-hover-color);
        }
        
        .page-side-nav__item:hover:not(.page-side-nav__item--active) .page-side-nav__icon {
          color: var(--page-side-nav-icon-hover-color);
        }
        
        .page-side-nav__item--active {
          background-color: var(--page-side-nav-item-active-bg);
          color: var(--page-side-nav-item-active-color);
        }
        
        .page-side-nav__item--active .page-side-nav__icon {
          color: var(--page-side-nav-icon-active-color);
        }
        
        .page-side-nav__item-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 0;
        }
        
        .page-side-nav__item-right {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }
        
        .page-side-nav__icon {
          flex-shrink: 0;
          color: var(--page-side-nav-icon-color);
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--page-side-nav-icon-size);
          height: var(--page-side-nav-icon-size);
        }
        
        .page-side-nav__icon svg {
          width: 100%;
          height: 100%;
        }
        
        .page-side-nav__label {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        
        .page-side-nav__badge {
          flex-shrink: 0;
          font-size: var(--page-side-nav-badge-size);
          font-weight: var(--page-side-nav-badge-weight);
          background-color: var(--page-side-nav-badge-bg);
          color: var(--page-side-nav-badge-color);
          padding: var(--page-side-nav-badge-padding);
          border-radius: var(--page-side-nav-badge-radius);
          line-height: 1;
        }
        
        .page-side-nav__indicator {
          flex-shrink: 0;
          width: var(--page-side-nav-indicator-size);
          height: var(--page-side-nav-indicator-size);
          color: var(--page-side-nav-indicator-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .page-side-nav__indicator svg {
          width: 100%;
          height: 100%;
        }
      `}</style>
      
      <nav className={`page-side-nav ${className}`}>
        <div className="page-side-nav__inner">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="page-side-nav__section">
              <h3 className="page-side-nav__section-title">{section.title}</h3>
              <div className="page-side-nav__items">
                {section.items.map((item) => {
                  const ItemTag = item.href ? 'a' : 'button';
                  const itemProps = item.href ? { href: item.href } : {};
                  
                  return (
                    <ItemTag
                      key={item.id}
                      className={`page-side-nav__item ${item.active ? 'page-side-nav__item--active' : ''}`}
                      onClick={item.onClick}
                      {...itemProps}
                    >
                      <div className="page-side-nav__item-left">
                        {item.icon && (
                          <span className="page-side-nav__icon">
                            {item.icon}
                          </span>
                        )}
                        <span className="page-side-nav__label">{item.label}</span>
                      </div>
                      <div className="page-side-nav__item-right">
                        {item.badge !== undefined && (
                          <span className="page-side-nav__badge">{item.badge}</span>
                        )}
                        {item.active && (
                          <span className="page-side-nav__indicator">
                            <ChevronRight size={14} />
                          </span>
                        )}
                      </div>
                    </ItemTag>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}