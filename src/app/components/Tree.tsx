import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Layers3 } from 'lucide-react';
import './Tree.css';

export interface TreeItem {
  id: string;
  label: string;
  children?: TreeItem[];
  type?: 'category' | 'subcategory' | 'item';
  status?: 'active' | 'inactive' | 'warning';
  tag?: 'RECOMMENDED' | 'EDITORIAL' | string;
  count?: number;
  disabled?: boolean;
}

export interface TreeProps {
  data: TreeItem[];
  onSelect?: (item: TreeItem) => void;
  selectedId?: string;
  initialExpanded?: string[];
  ariaLabel?: string;
  density?: 'compact' | 'comfortable';
  showStatus?: boolean;
  showTags?: boolean;
  className?: string;
  style?: React.CSSProperties;
  renderActions?: (item: TreeItem) => React.ReactNode;
}

interface BranchProps {
  item: TreeItem;
  level: number;
  expandedIds: Set<string>;
  selectedId?: string;
  showStatus: boolean;
  showTags: boolean;
  onToggle: (id: string) => void;
  onSelect?: (item: TreeItem) => void;
  renderActions?: (item: TreeItem) => React.ReactNode;
}

function TreeBranch({ item, level, expandedIds, selectedId, showStatus, showTags, onToggle, onSelect, renderActions }: BranchProps) {
  const hasChildren = Boolean(item.children?.length);
  const isExpanded = hasChildren && expandedIds.has(item.id);
  const isSelected = selectedId === item.id;
  const isCategory = item.type === 'category' || item.type === 'subcategory' || hasChildren;
  const tagTone = item.tag === 'EDITORIAL' ? 'editorial' : item.tag === 'RECOMMENDED' ? 'recommended' : 'neutral';
  const actions = renderActions?.(item);

  const activate = () => {
    if (item.disabled) return;
    onSelect?.(item);
  };

  return (
    <li className="cvp-tree__branch">
      <div
        className={`cvp-tree__row ${isSelected ? 'cvp-tree__row--selected' : ''} ${item.disabled ? 'cvp-tree__row--disabled' : ''}`}
        style={{ '--cvp-tree-level': hasChildren ? level : Math.max(0, level - 1) } as React.CSSProperties}
      >
        {hasChildren ? (
          <button
            className="cvp-tree__toggle"
            type="button"
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
            aria-expanded={isExpanded}
            onClick={() => onToggle(item.id)}
            disabled={item.disabled}
          >
            {isExpanded ? <ChevronDown size={14} aria-hidden="true" /> : <ChevronRight size={14} aria-hidden="true" />}
          </button>
        ) : <span className="cvp-tree__toggle-spacer" aria-hidden="true" />}

        <button
          className="cvp-tree__content"
          type="button"
          aria-current={isSelected ? 'page' : undefined}
          disabled={item.disabled}
          onClick={activate}
          onDoubleClick={() => hasChildren && onToggle(item.id)}
        >
          <span className="cvp-tree__leading">
            {showStatus && !isCategory && item.status && <span className={`cvp-tree__status cvp-tree__status--${item.status}`} aria-label={`${item.status} status`} />}
            <span className="cvp-tree__icon" aria-hidden="true">{isCategory ? <Layers3 size={14} /> : <FileText size={14} />}</span>
          </span>
          <span className="cvp-tree__label" title={item.label}>{item.label}</span>
          {typeof item.count === 'number' && <span className="cvp-tree__count">({item.count})</span>}
          {showTags && item.tag && <span className={`cvp-tree__tag cvp-tree__tag--${tagTone}`}>{item.tag}</span>}
        </button>
        {actions && <span className="cvp-tree__actions">{actions}</span>}
      </div>
      {hasChildren && isExpanded && (
        <ul className="cvp-tree__group">
          {item.children!.map((child) => (
            <TreeBranch key={child.id} item={child} level={level + 1} expandedIds={expandedIds} selectedId={selectedId} showStatus={showStatus} showTags={showTags} onToggle={onToggle} onSelect={onSelect} renderActions={renderActions} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Tree({
  data,
  onSelect,
  selectedId,
  initialExpanded = [],
  ariaLabel = 'Navigation tree',
  density = 'compact',
  showStatus = true,
  showTags = true,
  className = '',
  style,
  renderActions,
}: TreeProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(initialExpanded));
  const handleToggle = (id: string) => setExpandedIds((current) => {
    const next = new Set(current);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <div className={`cvp-tree cvp-tree--${density} ${className}`} style={style}>
      {data.length ? (
        <ul className="cvp-tree__root" aria-label={ariaLabel}>
          {data.map((item) => <TreeBranch key={item.id} item={item} level={0} expandedIds={expandedIds} selectedId={selectedId} showStatus={showStatus} showTags={showTags} onToggle={handleToggle} onSelect={onSelect} renderActions={renderActions} />)}
        </ul>
      ) : <div className="cvp-tree__empty">No items</div>}
    </div>
  );
}
