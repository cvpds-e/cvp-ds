import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Eye,
  GripVertical,
  MoreHorizontal,
  RefreshCw,
  Settings,
  Trash2,
} from 'lucide-react';
import './Table.css';
import './Select.css';
import { Checkbox, CheckboxState } from './Checkbox';
import { SkeletonTableRows } from './Skeleton';
import { Pagination } from './Pagination';

export interface TableColumn {
  id: string;
  label: string;
  width?: string;
  minWidth?: string;
  align?: 'start' | 'center' | 'end';
  sortable?: boolean;
  resizable?: boolean;
}

export interface TableRow {
  id: string;
  [key: string]: any;
  kind?: 'data' | 'group';
  groupLabel?: string;
  groupCount?: number;
  expandable?: boolean;
  expandedContent?: React.ReactNode;
  disabled?: boolean;
}

export interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  caption?: string;
  ariaLabel?: string;
  selectable?: boolean;
  expandable?: boolean;
  /** Keep only one expanded data row open at a time. */
  singleExpand?: boolean;
  /** Keep selection, expansion and the first data column visible while the rest of the table scrolls. */
  freezeLeadingColumns?: boolean;
  sortable?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  density?: 'compact' | 'comfortable';
  loading?: boolean;
  emptyMessage?: string;
  onSort?: (columnId: string, direction: 'asc' | 'desc') => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  onRowReorder?: (fromIndex: number, toIndex: number) => void;
  onRowAction?: (action: 'open' | 'more' | 'delete', row: TableRow) => void;
  className?: string;
  height?: string;
  showSettings?: boolean;
  showViewControl?: boolean;
  toolbarActions?: React.ReactNode;
  showPagination?: boolean;
  showActions?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  currentPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onRefresh?: () => void;
  renderCell?: (columnId: string, value: any, row: TableRow) => React.ReactNode;
}

export function Table({
  columns,
  data,
  caption,
  ariaLabel = 'Data table',
  selectable = false,
  expandable = false,
  singleExpand = false,
  freezeLeadingColumns = false,
  sortable = false,
  resizable = false,
  draggable = false,
  density = 'compact',
  loading = false,
  emptyMessage = 'No results found',
  onSort,
  onSelectionChange,
  onRowReorder,
  onRowAction,
  className = '',
  height = '500px',
  showSettings = true,
  showViewControl = true,
  toolbarActions,
  showPagination = true,
  showActions = true,
  pageSize = 10,
  pageSizeOptions,
  onPageSizeChange,
  currentPage = 1,
  totalItems,
  onPageChange,
  onRefresh,
  renderCell,
}: TableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [draggedRow, setDraggedRow] = useState<string | null>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [isPageSizeMenuOpen, setIsPageSizeMenuOpen] = useState(false);
  const [activePageSizeIndex, setActivePageSizeIndex] = useState(-1);
  const pageSizeControlId = useId().replace(/:/g, '');
  const pageSizeMenuId = `${pageSizeControlId}-listbox`;
  const pageSizeTriggerRef = useRef<HTMLButtonElement>(null);
  const pageSizeMenuRef = useRef<HTMLDivElement>(null);
  const [pageSizeMenuPosition, setPageSizeMenuPosition] = useState({ top: 0, left: 0, maxHeight: 0 });

  const selectableRows = useMemo(
    () => data.filter((row) => row.kind !== 'group' && !row.disabled),
    [data],
  );
  const totalPages = Math.max(1, Math.ceil((totalItems ?? selectableRows.length) / pageSize));
  const pagedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const updateSelection = (next: Set<string>) => {
    setSelectedRows(next);
    onSelectionChange?.([...next]);
  };

  const handleSelectAll = (checked: boolean) => {
    updateSelection(checked ? new Set(selectableRows.map((row) => row.id)) : new Set());
  };

  const handleSelectRow = (rowId: string, checked: boolean) => {
    const next = new Set(selectedRows);
    checked ? next.add(rowId) : next.delete(rowId);
    updateSelection(next);
  };

  const handleSort = (column: TableColumn) => {
    if (!sortable || column.sortable === false) return;
    const direction = sortColumn === column.id && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column.id);
    setSortDirection(direction);
    onSort?.(column.id, direction);
  };

  const positionPageSizeMenu = () => {
    const trigger = pageSizeTriggerRef.current;
    if (!trigger) return;
    const menuStyles = window.getComputedStyle(trigger);
    const inset = Number.parseFloat(menuStyles.getPropertyValue('--cvp-table-menu-viewport-inset')) || 5;
    const gap = Number.parseFloat(menuStyles.getPropertyValue('--cvp-table-menu-gap')) || 4;
    const triggerRect = trigger.getBoundingClientRect();
    const fallbackWidth = Number.parseFloat(menuStyles.getPropertyValue('--cvp-table-menu-fallback-width')) || 112;
    const fallbackHeight = Number.parseFloat(menuStyles.getPropertyValue('--cvp-table-menu-fallback-height')) || 160;
    const menuWidth = Math.max(triggerRect.width, pageSizeMenuRef.current?.getBoundingClientRect().width ?? fallbackWidth);
    const menuHeight = pageSizeMenuRef.current?.getBoundingClientRect().height ?? fallbackHeight;
    const spaceAbove = Math.max(0, triggerRect.top - inset - gap);
    const spaceBelow = Math.max(0, window.innerHeight - triggerRect.bottom - inset - gap);
    const openUpward = spaceBelow < Math.min(menuHeight, 240) && spaceAbove > spaceBelow;
    const maxHeight = Math.max(triggerRect.height * 3, openUpward ? spaceAbove : spaceBelow);
    const renderedHeight = Math.min(menuHeight, maxHeight);
    setPageSizeMenuPosition({
      top: openUpward ? triggerRect.top - gap - renderedHeight : triggerRect.bottom + gap,
      left: Math.max(inset, Math.min(triggerRect.right - menuWidth, window.innerWidth - menuWidth - inset)),
      maxHeight,
    });
  };

  const openPageSizeMenu = () => {
    if (!pageSizeOptions?.length) return;
    positionPageSizeMenu();
    setActivePageSizeIndex(Math.max(0, pageSizeOptions.indexOf(pageSize)));
    setIsPageSizeMenuOpen(true);
  };

  const commitPageSize = (size: number) => {
    onPageSizeChange?.(size);
    setIsPageSizeMenuOpen(false);
    pageSizeTriggerRef.current?.focus();
  };

  const handlePageSizeKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!pageSizeOptions?.length) return;
    if (event.key === 'Escape') { setIsPageSizeMenuOpen(false); return; }
    if (event.key === 'Tab') { setIsPageSizeMenuOpen(false); return; }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isPageSizeMenuOpen) { openPageSizeMenu(); return; }
      setActivePageSizeIndex((index) => (index + (event.key === 'ArrowDown' ? 1 : -1) + pageSizeOptions.length) % pageSizeOptions.length);
      return;
    }
    if (event.key === 'Home' && isPageSizeMenuOpen) { event.preventDefault(); setActivePageSizeIndex(0); return; }
    if (event.key === 'End' && isPageSizeMenuOpen) { event.preventDefault(); setActivePageSizeIndex(pageSizeOptions.length - 1); return; }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (isPageSizeMenuOpen) commitPageSize(pageSizeOptions[Math.max(0, activePageSizeIndex)]);
      else openPageSizeMenu();
    }
  };

  useEffect(() => {
    if (!isPageSizeMenuOpen) return;
    positionPageSizeMenu();
    const frame = window.requestAnimationFrame(positionPageSizeMenu);
    window.addEventListener('resize', positionPageSizeMenu);
    window.addEventListener('scroll', positionPageSizeMenu, true);
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!pageSizeTriggerRef.current?.contains(target) && !pageSizeMenuRef.current?.contains(target)) setIsPageSizeMenuOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('resize', positionPageSizeMenu); window.removeEventListener('scroll', positionPageSizeMenu, true); document.removeEventListener('pointerdown', closeOutside); };
  }, [isPageSizeMenuOpen]);

  const toggleExpanded = (rowId: string) => {
    if (singleExpand) {
      setExpandedRows((current) => current.has(rowId) ? new Set() : new Set([rowId]));
      return;
    }
    const next = new Set(expandedRows);
    next.has(rowId) ? next.delete(rowId) : next.add(rowId);
    setExpandedRows(next);
  };

  const toggleGroup = (rowId: string) => {
    const next = new Set(collapsedGroups);
    next.has(rowId) ? next.delete(rowId) : next.add(rowId);
    setCollapsedGroups(next);
  };

  const startResize = (event: React.PointerEvent<HTMLButtonElement>, column: TableColumn) => {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startWidth = event.currentTarget.parentElement?.getBoundingClientRect().width ?? 120;
    setResizingColumn(column.id);
    const move = (moveEvent: PointerEvent) => {
      setColumnWidths((current) => ({ ...current, [column.id]: Math.max(80, startWidth + moveEvent.clientX - startX) }));
    };
    const stop = () => {
      setResizingColumn(null);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', stop);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', stop);
  };

  const visibleData: TableRow[] = [];
  let groupIsCollapsed = false;
  pagedData.forEach((row) => {
    if (row.kind === 'group') {
      groupIsCollapsed = collapsedGroups.has(row.id);
      visibleData.push(row);
    } else if (!groupIsCollapsed) {
      visibleData.push(row);
    }
  });

  const utilityColumnCount = Number(selectable) + Number(expandable) + Number(draggable) + Number(showActions);
  const columnCount = columns.length + utilityColumnCount;

  return (
    <section
      className={`cvp-table cvp-table--${density} ${resizingColumn ? 'cvp-table--resizing' : ''} ${freezeLeadingColumns ? 'cvp-table--freeze-leading' : ''} ${selectable ? 'cvp-table--selectable' : ''} ${expandable ? 'cvp-table--expandable' : ''} ${className}`}
      style={{ '--cvp-table-container-height': height } as React.CSSProperties}
      aria-label={ariaLabel}
    >
      {showSettings && (
        <div className="cvp-table__toolbar" role="toolbar" aria-label="Table controls">
          <div className="cvp-table__toolbar-summary" aria-live="polite">
            <span className="cvp-table__count">
              {selectedRows.size ? `${selectedRows.size} selected` : `${totalItems ?? selectableRows.length} rows`}
            </span>
            {selectedRows.size > 0 && (
              <button className="cvp-table__text-action" type="button" onClick={() => updateSelection(new Set())}>
                Clear selection
              </button>
            )}
          </div>
          <div className="cvp-table__toolbar-actions">
            {toolbarActions}
            {pageSizeOptions && onPageSizeChange && (
              <div className="cvp-table__page-size-control">
                <button
                  ref={pageSizeTriggerRef}
                  className="cvp-table__icon-button"
                  type="button"
                  aria-label="Rows per page"
                  aria-controls={isPageSizeMenuOpen ? pageSizeMenuId : undefined}
                  aria-expanded={isPageSizeMenuOpen}
                  aria-haspopup="listbox"
                  aria-activedescendant={isPageSizeMenuOpen && activePageSizeIndex >= 0 ? `${pageSizeControlId}-option-${activePageSizeIndex}` : undefined}
                  onClick={() => isPageSizeMenuOpen ? setIsPageSizeMenuOpen(false) : openPageSizeMenu()}
                  onKeyDown={handlePageSizeKeyDown}
                >
                  <span aria-hidden="true">{pageSize}</span>
                </button>
                {isPageSizeMenuOpen && (
                  <div ref={pageSizeMenuRef} className="cvp-table__page-size-menu cvp-select__popup" role="presentation" style={{ top: pageSizeMenuPosition.top, left: pageSizeMenuPosition.left, maxHeight: pageSizeMenuPosition.maxHeight }}>
                    <ul id={pageSizeMenuId} className="cvp-select__listbox" role="listbox" aria-label="Rows per page">
                      {pageSizeOptions.map((size, index) => (
                        <li
                          id={`${pageSizeControlId}-option-${index}`}
                          key={size}
                          className="cvp-table__page-size-option cvp-select__option"
                          role="option"
                          aria-selected={size === pageSize}
                          data-active={index === activePageSizeIndex || undefined}
                          data-selected={size === pageSize || undefined}
                          onMouseEnter={() => setActivePageSizeIndex(index)}
                          onMouseDown={(event) => { event.preventDefault(); commitPageSize(size); }}
                        >
                          <span>{size} rows</span>{size === pageSize && <span aria-hidden="true">✓</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            <button className="cvp-table__icon-button" type="button" aria-label="Table settings" onClick={() => onRowAction?.('more', { id: 'table-settings' })}>
              <Settings size={16} aria-hidden="true" />
            </button>
            {onRefresh && <button className="cvp-table__icon-button" type="button" aria-label="Refresh table" onClick={onRefresh}>
              <RefreshCw size={16} aria-hidden="true" />
            </button>}
            {showViewControl && <button className="cvp-table__icon-button" type="button" aria-label="Change table view" onClick={() => onRowAction?.('open', { id: 'table-view' })}>
              <Eye size={16} aria-hidden="true" />
            </button>}
          </div>
        </div>
      )}

      <div className="cvp-table__scroll-region" role="region" tabIndex={0} aria-label="Scrollable table content">
        <table aria-busy={loading || undefined}>
          {caption && <caption>{caption}</caption>}
          <colgroup>
            {selectable && <col className="cvp-table__col-select" />}
            {expandable && <col className="cvp-table__col-control" />}
            {draggable && <col className="cvp-table__col-control" />}
            {columns.map((column) => (
              <col key={column.id} style={{ width: columnWidths[column.id] ? `${columnWidths[column.id]}px` : column.width, minWidth: column.minWidth }} />
            ))}
            {showActions && <col className="cvp-table__col-actions" />}
          </colgroup>
          <thead>
            <tr>
              {selectable && (
                <th className="cvp-table__utility-cell cvp-table__utility-cell--select" scope="col">
                  <Checkbox
                    className="cvp-table__checkbox"
                    aria-label="Select all rows"
                    checked={selectedRows.size > 0 && selectedRows.size < selectableRows.length ? 'indeterminate' : selectableRows.length > 0 && selectedRows.size === selectableRows.length}
                    onChange={(checked: CheckboxState) => handleSelectAll(checked === true)}
                  />
                </th>
              )}
              {expandable && <th className="cvp-table__utility-cell cvp-table__utility-cell--expand" scope="col"><span className="cvp-visually-hidden">Expand</span></th>}
              {draggable && <th className="cvp-table__utility-cell" scope="col"><span className="cvp-visually-hidden">Reorder</span></th>}
              {columns.map((column, columnIndex) => {
                const canSort = sortable && column.sortable !== false;
                const active = sortColumn === column.id;
                return (
                  <th
                    key={column.id}
                    scope="col"
                    className={`cvp-table__header-cell cvp-table__cell--${column.align ?? 'start'} ${freezeLeadingColumns && columnIndex === 0 ? 'cvp-table__cell--frozen-primary' : ''}`}
                    aria-sort={active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined}
                  >
                    {canSort ? (
                      <button className="cvp-table__sort-button" type="button" onClick={() => handleSort(column)}>
                        <span>{column.label}</span>
                        {active ? (sortDirection === 'asc' ? <ChevronUp className="cvp-table__sort-icon" aria-hidden="true" /> : <ChevronDown className="cvp-table__sort-icon" aria-hidden="true" />) : <ArrowUpDown className="cvp-table__sort-icon cvp-table__sort-neutral" aria-hidden="true" />}
                      </button>
                    ) : column.label}
                    {resizable && column.resizable !== false && (
                      <button className="cvp-table__resize-handle" type="button" aria-label={`Resize ${column.label} column`} onPointerDown={(event) => startResize(event, column)} />
                    )}
                  </th>
                );
              })}
              {showActions && <th className="cvp-table__actions-heading" scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading && <SkeletonTableRows columns={columnCount} />}
            {!loading && visibleData.length === 0 && (
              <tr><td className="cvp-table__status" colSpan={columnCount}>{emptyMessage}</td></tr>
            )}
            {!loading && visibleData.map((row, index) => {
              if (row.kind === 'group') {
                const collapsed = collapsedGroups.has(row.id);
                return (
                  <tr className="cvp-table__group-row" key={row.id}>
                    <th colSpan={columnCount} scope="rowgroup">
                      <button type="button" className="cvp-table__group-button" aria-expanded={!collapsed} onClick={() => toggleGroup(row.id)}>
                        {collapsed ? <ChevronRight size={15} /> : <ChevronDown size={15} />}
                        <span>{row.groupLabel ?? row.id}</span>
                        {typeof row.groupCount === 'number' && <span className="cvp-table__group-count">({row.groupCount} items)</span>}
                      </button>
                    </th>
                  </tr>
                );
              }
              const isExpanded = expandedRows.has(row.id);
              const isSelected = selectedRows.has(row.id);
              return (
                <React.Fragment key={row.id}>
                  <tr
                    className={`${isSelected ? 'cvp-table__row--selected' : ''} ${draggedRow === row.id ? 'cvp-table__row--dragging' : ''}`}
                    draggable={draggable && !row.disabled}
                    onDragStart={() => setDraggedRow(row.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => {
                      if (draggedRow && draggedRow !== row.id) onRowReorder?.(data.findIndex((item) => item.id === draggedRow), data.findIndex((item) => item.id === row.id));
                      setDraggedRow(null);
                    }}
                  >
                    {selectable && (
                      <td className="cvp-table__utility-cell cvp-table__utility-cell--select">
                        <Checkbox className="cvp-table__checkbox" aria-label={`Select ${row.title ?? `row ${index + 1}`}`} checked={isSelected} disabled={row.disabled} onChange={(checked: CheckboxState) => handleSelectRow(row.id, checked === true)} />
                      </td>
                    )}
                    {expandable && (
                      <td className="cvp-table__utility-cell cvp-table__utility-cell--expand">
                        {row.expandable && <button className="cvp-table__icon-button cvp-table__icon-button--small" type="button" aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${row.title ?? 'row'}`} aria-expanded={isExpanded} onClick={() => toggleExpanded(row.id)}>{isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</button>}
                      </td>
                    )}
                    {draggable && <td className="cvp-table__utility-cell"><span className="cvp-table__drag-handle" aria-hidden="true"><GripVertical size={15} /></span></td>}
                    {columns.map((column, columnIndex) => (
                      <td key={column.id} className={`cvp-table__cell cvp-table__cell--${column.align ?? 'start'} ${columnIndex ? 'cvp-table__cell--muted' : ''} ${freezeLeadingColumns && columnIndex === 0 ? 'cvp-table__cell--frozen-primary' : ''}`}>
                        {renderCell ? renderCell(column.id, row[column.id], row) : row[column.id]}
                      </td>
                    ))}
                    {showActions && (
                      <td className="cvp-table__actions-cell">
                        <button className="cvp-table__icon-button cvp-table__icon-button--small" type="button" aria-label={`More actions for ${row.title ?? 'row'}`} onClick={() => onRowAction?.('more', row)}><MoreHorizontal size={15} /></button>
                        <button className="cvp-table__icon-button cvp-table__icon-button--small cvp-table__icon-button--danger" type="button" aria-label={`Delete ${row.title ?? 'row'}`} onClick={() => onRowAction?.('delete', row)}><Trash2 size={15} /></button>
                      </td>
                    )}
                  </tr>
                  {expandable && isExpanded && row.expandedContent && (
                    <tr className="cvp-table__expanded-row"><td colSpan={columnCount}>{row.expandedContent}</td></tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <Pagination className="cvp-table__pagination" currentPage={currentPage} totalItems={totalItems ?? selectableRows.length} pageSize={pageSize} onPageChange={onPageChange} itemLabel="rows" />
      )}
    </section>
  );
}
