import React from 'react';
import { TreeItem as TreeItemType } from './Tree';
import { TreeGroupHeader } from './TreeGroupHeader';
import { TreeItem } from './TreeItem';
import { TreeGroup } from './TreeGroup';

interface TreeNodeProps {
  item: TreeItemType;
  level: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onSelect?: (item: TreeItemType) => void;
  selectedId?: string;
}

export function TreeNode({ item, level, expandedIds, onToggle, onSelect, selectedId }: TreeNodeProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedId === item.id;
  const isExpanded = expandedIds.has(item.id);
  const isCategory = item.type === 'category' || (hasChildren && item.type !== 'item');

  const handleToggle = () => {
    onToggle(item.id);
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  if (isCategory) {
    return (
      <>
        <TreeGroupHeader
          label={item.label}
          count={item.count}
          level={level}
          isExpanded={isExpanded}
          isSelected={isSelected}
          onToggle={handleToggle}
          onSelect={handleSelect}
        />
        <TreeGroup isExpanded={isExpanded} level={level + 1}>
          {item.children?.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              level={level + 1}
              expandedIds={expandedIds}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </TreeGroup>
      </>
    );
  }

  return (
    <TreeItem
      id={item.id}
      label={item.label}
      status={item.status}
      tag={item.tag}
      level={level}
      isSelected={isSelected}
      onSelect={handleSelect}
    />
  );
}