import React from 'react';
import { ChevronRight, ChevronDown, Layers } from 'lucide-react';

export interface TreeGroupHeaderProps {
  label: string;
  count?: number;
  level: number;
  isExpanded: boolean;
  isSelected?: boolean;
  onToggle: () => void;
  onSelect?: () => void;
}

export function TreeGroupHeader({ 
  label, 
  count, 
  level, 
  isExpanded, 
  isSelected = false, 
  onToggle,
  onSelect 
}: TreeGroupHeaderProps) {
  const isTopLevel = level === 0;
  const iconSize = isTopLevel ? 16 : 14;
  const chevronSize = isTopLevel ? 16 : 14;

  // Calculate proper padding based on specifications:
  // Level 0: 8px, Level 1: 33px (8 + 25), Level 2: 52px (8 + 22 + 22)
  const getPaddingLeft = (level: number) => {
    switch (level) {
      case 0: return 8;
      case 1: return 33;
      case 2: return 52;
      default: return 8 + level * 25; // Fallback for deeper levels
    }
  };

  const paddingLeft = getPaddingLeft(level);

  const handleClick = () => {
    onToggle();
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <>
      <style>{`
        .tree-group-header {
          /* Design System Tokens */
          --tree-group-header-padding-left: ${paddingLeft}px;
          --tree-group-header-padding-right: 16px;
          --tree-group-header-padding-vertical: 4px;
          --tree-group-header-font-size: var(--cvp-font-size-md);
          --tree-group-header-font-family: var(--cvp-font-family-sans);
          --tree-group-header-font-weight: var(--cvp-font-weight-regular);
          --tree-group-header-line-height: var(--cvp-line-height-snug);
          --tree-group-header-min-height: 28px;
          --tree-group-header-transition: all var(--default-transition-duration) var(--default-transition-timing-function);
          --tree-group-header-bg-selected: var(--cvp-color-surface-active);
          --tree-group-header-bg-hover: var(--cvp-color-surface-hover);
          --tree-group-header-text-color: var(--cvp-color-text-primary);
          --tree-group-header-icon-size: ${iconSize}px;
          --tree-group-header-chevron-size: ${chevronSize}px;
          --tree-group-header-icon-spacing: 8px;
          --tree-group-header-count-color: var(--cvp-color-text-muted);
          --tree-group-header-count-font-size: var(--cvp-font-size-md);
          --tree-group-header-count-font-weight: var(--cvp-font-weight-regular);
          --tree-group-header-count-margin-left: 8px;

          /* Component Styles */
          display: flex;
          align-items: center;
          padding-left: var(--tree-group-header-padding-left);
          padding-right: var(--tree-group-header-padding-right);
          padding-top: var(--tree-group-header-padding-vertical);
          padding-bottom: var(--tree-group-header-padding-vertical);
          cursor: pointer;
          font-size: var(--tree-group-header-font-size);
          font-family: var(--tree-group-header-font-family);
          font-weight: var(--tree-group-header-font-weight);
          line-height: var(--tree-group-header-line-height);
          background-color: ${isSelected ? 'var(--tree-group-header-bg-selected)' : 'transparent'};
          color: var(--tree-group-header-text-color);
          transition: var(--tree-group-header-transition);
          user-select: none;
          min-height: var(--tree-group-header-min-height);
          border-radius: 4px;
          margin: 2px 0;
        }

        .tree-group-header:hover:not(.tree-group-header--selected) {
          background-color: var(--tree-group-header-bg-hover);
        }

        .tree-group-header--selected {
          background-color: var(--tree-group-header-bg-selected);
        }

        .tree-group-header--expanded {
          /* Additional styles for expanded state if needed */
        }

        .tree-group-header__chevron-container {
          width: var(--tree-group-header-icon-size);
          height: var(--tree-group-header-icon-size);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: var(--tree-group-header-icon-spacing);
          color: var(--cvp-color-text-primary);
        }

        .tree-group-header__icon-container {
          width: var(--tree-group-header-icon-size);
          height: var(--tree-group-header-icon-size);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: var(--tree-group-header-icon-spacing);
          color: var(--cvp-color-text-primary);
        }

        .tree-group-header__content {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .tree-group-header__label {
          /* Label styles are inherited from parent */
        }

        .tree-group-header__count {
          margin-left: var(--tree-group-header-count-margin-left);
          color: var(--tree-group-header-count-color);
          font-size: var(--tree-group-header-count-font-size);
          font-weight: var(--tree-group-header-count-font-weight);
        }
      `}</style>

      <div
        className={`tree-group-header ${isSelected ? 'tree-group-header--selected' : ''} ${isExpanded ? 'tree-group-header--expanded' : ''}`}
        onClick={handleClick}
      >
        {/* Chevron Icon */}
        <div className="tree-group-header__chevron-container">
          {isExpanded ? (
            <ChevronDown size={chevronSize} />
          ) : (
            <ChevronRight size={chevronSize} />
          )}
        </div>
        
        {/* Category Icon */}
        <div className="tree-group-header__icon-container">
          <Layers size={iconSize} />
        </div>
        
        {/* Label and Count */}
        <span className="tree-group-header__content">
          <span className="tree-group-header__label">{label}</span>
          {count && (
            <span className="tree-group-header__count">
              ({count})
            </span>
          )}
        </span>
      </div>
    </>
  );
}
