import React from 'react';
import { FileText } from 'lucide-react';

export interface TreeItemProps {
  id: string;
  label: string;
  status?: 'active' | 'inactive';
  tag?: 'RECOMMENDED' | 'EDITORIAL';
  level: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function TreeItem({ 
  label, 
  status, 
  tag, 
  level, 
  isSelected = false, 
  onSelect 
}: TreeItemProps) {
  const isTopLevel = level === 0;
  const iconSize = isTopLevel ? 16 : 14;

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

  const getStatusDotColor = () => {
    if (status === 'active') {
      return 'var(--a11y-status-active)';
    }
    return 'var(--a11y-status-inactive)';
  };

  const getTagColor = () => {
    if (tag === 'RECOMMENDED') {
      return 'var(--a11y-rail-recommended)';
    }
    if (tag === 'EDITORIAL') {
      return 'var(--a11y-rail-editorial)';
    }
    return 'var(--cvp-color-text-muted)';
  };

  return (
    <>
      <style>{`
        .tree-item {
          /* Design System Tokens */
          --tree-item-padding-left: ${paddingLeft}px;
          --tree-item-padding-right: 16px;
          --tree-item-padding-vertical: 4px;
          --tree-item-font-size: var(--cvp-font-size-md);
          --tree-item-font-family: var(--cvp-font-family-sans);
          --tree-item-font-weight: var(--cvp-font-weight-regular);
          --tree-item-line-height: var(--cvp-line-height-snug);
          --tree-item-min-height: 28px;
          --tree-item-transition: all var(--default-transition-duration) var(--default-transition-timing-function);
          --tree-item-bg-selected: var(--cvp-color-surface-active);
          --tree-item-bg-hover: var(--cvp-color-surface-hover);
          --tree-item-text-color: var(--cvp-color-text-primary);
          --tree-item-icon-size: ${iconSize}px;
          --tree-item-status-dot-size: 8px;
          --tree-item-icon-spacing: 8px;
          --tree-item-tag-font-size: var(--cvp-font-size-sm);
          --tree-item-tag-font-family: var(--cvp-font-family-mono);
          --tree-item-tag-font-weight: var(--cvp-font-weight-regular);
          --tree-item-tag-line-height: var(--cvp-line-height-snug);
          --tree-item-tag-letter-spacing: var(--cvp-letter-spacing-normal);
          --tree-item-tag-margin-left: 16px;

          /* Component Styles */
          display: flex;
          align-items: center;
          padding-left: var(--tree-item-padding-left);
          padding-right: var(--tree-item-padding-right);
          padding-top: var(--tree-item-padding-vertical);
          padding-bottom: var(--tree-item-padding-vertical);
          cursor: pointer;
          font-size: var(--tree-item-font-size);
          font-family: var(--tree-item-font-family);
          font-weight: var(--tree-item-font-weight);
          line-height: var(--tree-item-line-height);
          background-color: ${isSelected ? 'var(--tree-item-bg-selected)' : 'transparent'};
          color: var(--tree-item-text-color);
          transition: var(--tree-item-transition);
          user-select: none;
          min-height: var(--tree-item-min-height);
          border-radius: 4px;
          margin: 2px 0;
        }

        .tree-item:hover:not(.tree-item--selected) {
          background-color: var(--tree-item-bg-hover);
        }

        .tree-item--selected {
          background-color: var(--tree-item-bg-selected);
        }

        .tree-item__status-container {
          width: var(--tree-item-icon-size);
          height: var(--tree-item-icon-size);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: var(--tree-item-icon-spacing);
        }

        .tree-item__status-dot {
          width: var(--tree-item-status-dot-size);
          height: var(--tree-item-status-dot-size);
          border-radius: 50%;
        }

        .tree-item__icon-container {
          width: var(--tree-item-icon-size);
          height: var(--tree-item-icon-size);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: var(--tree-item-icon-spacing);
          color: var(--cvp-color-text-muted);
        }

        .tree-item__label {
          flex: 1;
        }

        .tree-item__tag {
          margin-left: var(--tree-item-tag-margin-left);
          font-size: var(--tree-item-tag-font-size);
          font-family: var(--tree-item-tag-font-family);
          font-weight: var(--tree-item-tag-font-weight);
          line-height: var(--tree-item-tag-line-height);
          letter-spacing: var(--tree-item-tag-letter-spacing);
          text-transform: uppercase;
        }
      `}</style>

      <div
        className={`tree-item ${isSelected ? 'tree-item--selected' : ''}`}
        onClick={onSelect}
      >
        {/* Status Dot */}
        <div className="tree-item__status-container">
          <div 
            className="tree-item__status-dot" 
            style={{ backgroundColor: getStatusDotColor() }}
          />
        </div>
        
        {/* Document Icon */}
        <div className="tree-item__icon-container">
          <FileText size={iconSize} />
        </div>
        
        {/* Item Label */}
        <span className="tree-item__label">
          {label}
        </span>
        
        {/* Tag */}
        {tag && (
          <div 
            className="tree-item__tag"
            style={{ color: getTagColor() }}
          >
            {tag}
          </div>
        )}
      </div>
    </>
  );
}
