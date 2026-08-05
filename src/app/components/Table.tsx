import React, { useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Eye,
  GripVertical,
  MoreHorizontal,
  Settings,
  Trash2,
} from 'lucide-react';
import './Table.css';
import { Checkbox, CheckboxState } from './Checkbox';

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
  showPagination?: boolean;
  showActions?: boolean;
  pageSize?: number;
  currentPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  renderCell?: (columnId: string, value: any, row: TableRow) => React.ReactNode;
}

export function Table({
  columns,
  data,
  caption,
  ariaLabel = 'Data table',
  selectable = false,
  expandable = false,
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
  showPagination = true,
  showActions = true,
  pageSize = 10,
  currentPage = 1,
  totalItems,
  onPageChange,
  renderCell,
}: TableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [draggedRow, setDraggedRow] = useState<string | null>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  const selectableRows = useMemo(
    () => data.filter((row) => row.kind !== 'group' && !row.disabled),
    [data],
  );
  const totalPages = Math.max(1, Math.ceil((totalItems ?? selectableRows.length) / pageSize));
  const pagedData = totalItems
    ? data
    : data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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

  const toggleExpanded = (rowId: string) => {
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
    const move = (moveEvent: PointerEvent) => {
      setColumnWidths((current) => ({ ...current, [column.id]: Math.max(80, startWidth + moveEvent.clientX - startX) }));
    };
    const stop = () => {
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
      className={`cvp-table cvp-table--${density} ${className}`}
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
            <button className="cvp-table__icon-button" type="button" aria-label="Table settings" onClick={() => onRowAction?.('more', { id: 'table-settings' })}>
              <Settings size={16} aria-hidden="true" />
            </button>
            <button className="cvp-table__icon-button" type="button" aria-label="Change table view" onClick={() => onRowAction?.('open', { id: 'table-view' })}>
              <Eye size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <div className="cvp-table__scroll-region" role="region" tabIndex={0} aria-label="Scrollable table content">
        <table>
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
                <th className="cvp-table__utility-cell" scope="col">
                  <Checkbox
                    className="cvp-table__checkbox"
                    aria-label="Select all rows"
                    checked={selectedRows.size > 0 && selectedRows.size < selectableRows.length ? 'indeterminate' : selectableRows.length > 0 && selectedRows.size === selectableRows.length}
                    onChange={(checked: CheckboxState) => handleSelectAll(checked === true)}
                  />
                </th>
              )}
              {expandable && <th className="cvp-table__utility-cell" scope="col"><span className="cvp-visually-hidden">Expand</span></th>}
              {draggable && <th className="cvp-table__utility-cell" scope="col"><span className="cvp-visually-hidden">Reorder</span></th>}
              {columns.map((column) => {
                const canSort = sortable && column.sortable !== false;
                const active = sortColumn === column.id;
                return (
                  <th
                    key={column.id}
                    scope="col"
                    className={`cvp-table__header-cell cvp-table__cell--${column.align ?? 'start'}`}
                    aria-sort={active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined}
                  >
                    {canSort ? (
                      <button className="cvp-table__sort-button" type="button" onClick={() => handleSort(column)}>
                        <span>{column.label}</span>
                        {active ? (sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />) : <span className="cvp-table__sort-neutral" aria-hidden="true">↕</span>}
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
            {loading && (
              <tr><td className="cvp-table__status" colSpan={columnCount}>Loading table data…</td></tr>
            )}
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
                      <td className="cvp-table__utility-cell">
                        <Checkbox className="cvp-table__checkbox" aria-label={`Select ${row.title ?? `row ${index + 1}`}`} checked={isSelected} disabled={row.disabled} onChange={(checked: CheckboxState) => handleSelectRow(row.id, checked === true)} />
                      </td>
                    )}
                    {expandable && (
                      <td className="cvp-table__utility-cell">
                        {row.expandable && <button className="cvp-table__icon-button cvp-table__icon-button--small" type="button" aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${row.title ?? 'row'}`} aria-expanded={isExpanded} onClick={() => toggleExpanded(row.id)}>{isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</button>}
                      </td>
                    )}
                    {draggable && <td className="cvp-table__utility-cell"><span className="cvp-table__drag-handle" aria-hidden="true"><GripVertical size={15} /></span></td>}
                    {columns.map((column, columnIndex) => (
                      <td key={column.id} className={`cvp-table__cell cvp-table__cell--${column.align ?? 'start'} ${columnIndex ? 'cvp-table__cell--muted' : ''}`}>
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
        <nav className="cvp-table__pagination" aria-label="Table pagination">
          <span>Page {currentPage} of {totalPages}</span>
          <div>
            <button className="cvp-table__pagination-button" type="button" aria-label="Previous page" disabled={currentPage <= 1} onClick={() => onPageChange?.(currentPage - 1)}><ChevronLeft size={16} /></button>
            <span className="cvp-table__page-current" aria-current="page">{currentPage}</span>
            <button className="cvp-table__pagination-button" type="button" aria-label="Next page" disabled={currentPage >= totalPages} onClick={() => onPageChange?.(currentPage + 1)}><ChevronRight size={16} /></button>
          </div>
        </nav>
      )}
    </section>
  );
}
