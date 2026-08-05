import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal, Trash2, Check, Move, Grip, GripVertical, Settings, Group, Ungroup, Eye } from 'lucide-react';

export interface TableColumn {
  id: string;
  label: string;
  width?: string;
  sortable?: boolean;
  resizable?: boolean;
}

export interface TableRow {
  id: string;
  [key: string]: any;
  expandable?: boolean;
  expandedContent?: React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  selectable?: boolean;
  expandable?: boolean;
  sortable?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  onSort?: (columnId: string, direction: 'asc' | 'desc') => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  onRowReorder?: (fromIndex: number, toIndex: number) => void;
  className?: string;
  height?: string;
  showSettings?: boolean;
  showPagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  renderCell?: (columnId: string, value: any, row: TableRow) => React.ReactNode;
}

export function Table({
  columns,
  data,
  selectable = false,
  expandable = false,
  sortable = false,
  resizable = false,
  draggable = false,
  onSort,
  onSelectionChange,
  onRowReorder,
  className = '',
  height = '500px',
  showSettings = true,
  showPagination = true,
  pageSize = 10,
  currentPage = 1,
  totalItems,
  onPageChange,
  renderCell
}: TableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [draggedRow, setDraggedRow] = useState<string | null>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [resizeStartX, setResizeStartX] = useState<number>(0);
  const [resizeStartWidth, setResizeStartWidth] = useState<number>(0);
  const [isGrouped, setIsGrouped] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? new Set(data.map(row => row.id)) : new Set();
    setSelectedRows(newSelection);
    onSelectionChange?.(Array.from(newSelection));
  };

  const handleSelectRow = (rowId: string, checked: boolean) => {
    const newSelection = new Set(selectedRows);
    if (checked) {
      newSelection.add(rowId);
    } else {
      newSelection.delete(rowId);
    }
    setSelectedRows(newSelection);
    onSelectionChange?.(Array.from(newSelection));
  };

  const handleExpandRow = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (columnId: string) => {
    if (!sortable) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    if (sortColumn === columnId && sortDirection === 'asc') {
      direction = 'desc';
    }
    
    setSortColumn(columnId);
    setSortDirection(direction);
    onSort?.(columnId, direction);
  };

  const handleDragStart = (e: React.DragEvent, rowId: string) => {
    setDraggedRow(rowId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetRowId: string) => {
    e.preventDefault();
    if (!draggedRow || draggedRow === targetRowId) return;
    
    const fromIndex = data.findIndex(row => row.id === draggedRow);
    const toIndex = data.findIndex(row => row.id === targetRowId);
    
    onRowReorder?.(fromIndex, toIndex);
    setDraggedRow(null);
  };

  const handleClearAll = () => {
    setSelectedRows(new Set());
    onSelectionChange?.([]);
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
    // Settings functionality can be implemented here
  };

  const handleGroupToggle = () => {
    setIsGrouped(!isGrouped);
    console.log('Group toggle:', !isGrouped);
    // Group/ungroup functionality can be implemented here
  };

  const handleViewClick = () => {
    console.log('View clicked');
    // View functionality can be implemented here
  };

  // Column resizing handlers
  const handleResizeStart = (e: React.MouseEvent, columnId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const headerCell = e.currentTarget.parentElement;
    if (!headerCell) return;
    
    const currentWidth = headerCell.getBoundingClientRect().width;
    
    setResizingColumn(columnId);
    setResizeStartX(e.clientX);
    setResizeStartWidth(currentWidth);
    
    // Add global mouse move and mouse up listeners
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizingColumn) return;
    
    const deltaX = e.clientX - resizeStartX;
    const newWidth = Math.max(80, resizeStartWidth + deltaX); // Minimum width of 80px
    
    setColumnWidths(prev => ({
      ...prev,
      [resizingColumn]: newWidth
    }));
  };

  const handleResizeEnd = () => {
    setResizingColumn(null);
    setResizeStartX(0);
    setResizeStartWidth(0);
    
    // Remove global listeners
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, []);

  const totalPages = totalItems ? Math.ceil(totalItems / pageSize) : Math.ceil(data.length / pageSize);
  const displayedData = totalItems ? data : data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <style>{`
        .data-table-container {
          /* Design System Tokens */
          --table-fixed-height: ${height};
          --table-settings-height: 52px;

          --table-pagination-height: 56px;
          --table-row-min-height: 40px;
          
          /* Table Colors - Default Dark Theme */
          --table-bg: #14141a;
          --table-header-bg: #0a0a0f;
          --table-row-hover: #1f1f28;
          --table-border-color: var(--border-default);
          --table-text: #ffffff;
          --table-muted-text: #9b9ba5;
          --table-selected-row-bg: rgba(61, 99, 221, 0.1);
          --table-selected-row-border: var(--border-focus);
          
          /* Interactive Element Colors - Dark Theme */
          --table-primary-btn: var(--border-focus);
          --table-primary-btn-hover: #244cce;
          --table-icon-btn-hover: #1f1f28;
          --table-delete-icon: #e6494e;
          --table-delete-icon-hover: #e6494e;
          
          /* Component Styles */
          height: var(--table-fixed-height);
          background: var(--table-bg);
          border: 1px solid var(--table-border-color);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* Light Theme Overrides */
        [data-theme="light"] .data-table-container {
          --table-bg: #ffffff;
          --table-header-bg: #f8f9fa;
          --table-row-hover: #f3f4f6;
          --table-border-color: var(--border-default);
          --table-text: #111827;
          --table-muted-text: #6b7280;
          --table-selected-row-bg: rgba(37, 99, 235, 0.1);
          --table-selected-row-border: var(--border-focus);
          
          --table-primary-btn: var(--border-focus);
          --table-primary-btn-hover: #1d4ed8;
          --table-icon-btn-hover: #f3f4f6;
        }

        .table-settings-row {
          height: var(--table-settings-height);
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--table-border-color);
          background: var(--table-bg);
          position: sticky;
          top: 0;
          z-index: 3;
        }

        .table-settings-row__left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .table-settings-row__right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .table-settings-row__count {
          font-size: 13px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.1px;
          color: var(--table-muted-text);
        }

        .table-scroll-container {
          flex: 1;
          overflow: auto;
          position: relative;
        }

        .data-table-header-row {
          height: var(--table-header-height);
          background: var(--table-header-bg);
          border-bottom: 1px solid var(--table-border-color);
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 2;
        }

        .data-table-header-cell {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          line-height: 20px;
          letter-spacing: 0.05em;
          color: var(--table-muted-text);
          text-transform: uppercase;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.2s ease;
          position: relative;
        }

        .data-table-header-cell--resizable .table-resize-handle {
          position: absolute;
          right: 0;
          top: 20%;
          bottom: 20%;
          width: 1px;
          cursor: col-resize;
          background: #bbb;
          border: none;
          opacity: 0;
          transition: all 0.2s ease;
          z-index: 10;
          border-radius: 0;
        }

        .data-table-header-cell--resizable:hover .table-resize-handle,
        .table-resize-handle--active {
          opacity: 1;
        }

        .table-resize-handle:hover {
          background: #fff;
        }

        .table-resize-handle--active {
          background: #fff !important;
       }



        .data-table-header-cell--sortable {
          cursor: pointer;
        }

        .data-table-header-cell--checkbox {
          width: 48px;
          justify-content: center;
          cursor: default;
        }

        .data-table-header-cell--expand {
          width: 40px;
          cursor: default;
        }

        .data-table-header-cell--actions {
          width: 80px;
          cursor: default;
        }

        .table-body-container {
          flex: 1;
        }

        .data-table-row {
          min-height: var(--table-row-min-height);
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--table-border-color);
          transition: background-color 0.2s ease;
          cursor: default;
        }

        .data-table-row:hover {
          background: var(--table-row-hover);
        }

        .data-table-row--dragging {
          opacity: 0.5;
        }

        .data-table-row--expanded {
          border-bottom: none;
        }

        .data-table-cell {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.15px;
          color: var(--table-text);
          min-height: var(--table-row-min-height);
          vertical-align: middle;
          box-sizing: border-box;
        }

        .data-table-cell--secondary {
          color: var(--text-muted);
        }

        .data-table-cell--checkbox {
          width: 48px;
          justify-content: center;
        }

        .data-table-cell--expand {
          width: 40px;
          justify-content: center;
        }

        .data-table-cell--actions {
          width: 80px;
          justify-content: center;
          gap: 4px;
        }

        .data-table-expanded-content {
          background: var(--bg-surface-raised);
          border-bottom: 1px solid var(--table-border-color);
          padding: 16px;
          font-size: 13px;
          color: var(--table-muted-text);
        }

        .table-pagination-footer {
          height: var(--table-pagination-height);
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--table-border-color);
          background: var(--table-bg);
          position: sticky;
          bottom: 0;
          z-index: 3;
        }

        .table-pagination-info {
          font-size: 13px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.1px;
          color: var(--table-muted-text);
        }

        .table-pagination-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Button Styles */
        .table-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          outline: none;
        }

        .table-btn--primary {
          height: 32px;
          padding: 0 16px;
          background: var(--table-primary-btn);
          color: white;
          font-size: 13px;
          font-weight: 500;
          line-height: 20px;
          letter-spacing: 0.1px;
        }

        .table-btn--primary:hover {
          background: var(--table-primary-btn-hover);
        }

        .table-btn--primary:active {
          transform: scale(0.95);
        }

        .table-btn--icon {
          width: 28px;
          height: 28px;
          background: transparent;
          color: var(--table-muted-text);
          border-radius: 4px;
        }

        .table-btn--icon:hover {
          background: var(--table-icon-btn-hover);
          color: var(--table-text);
        }

        .table-btn--icon:active {
          transform: scale(0.95);
        }

        .table-btn--pagination {
          height: 32px;
          padding: 0 8px;
          background: transparent;
          color: var(--table-text);
          font-size: 13px;
          font-weight: 500;
          line-height: 20px;
          letter-spacing: 0.1px;
          border: 1px solid var(--table-border-color);
        }

        .table-btn--pagination:hover {
          background: var(--table-icon-btn-hover);
        }

        .table-btn--pagination:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .table-btn--delete {
          color: var(--table-delete-icon);
        }

        .table-btn--delete:hover {
          background: var(--table-icon-btn-hover);
          color: var(--table-delete-icon-hover);
        }

        /* Input Styles */
        .table-input {
          height: 32px;
          padding: 6px 10px;
          background: var(--input-bg);
          border: 1px solid var(--input-border);
          border-radius: 0.2rem;
          color: var(--table-text);
          font-size: 15px;
          font-weight: 400;
          line-height: 22px;
          letter-spacing: 0px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .table-input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 1px var(--border-focus), 0 0 0 3px rgba(111, 139, 230, 0.25);
        }

        .table-input::placeholder {
          color: var(--table-muted-text);
        }

        /* Checkbox Styles - Following Checkbox Component Design */
        .table-checkbox {
          width: 16px;
          height: 16px;
          border: 1px solid var(--input-border);
          border-radius: 3px;
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          flex-shrink: 0;
          appearance: none;
          outline: none;
          position: relative;
        }

        .table-checkbox:hover {
          border-color: var(--border-focus);
        }

        .table-checkbox:focus-visible {
          box-shadow: 0 0 0 2px #67b3fb;
        }

        .table-checkbox:checked {
          background-color: var(--border-focus);
          border-color: var(--border-focus);
        }

        .table-checkbox:checked::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10 3L4.5 8.5L2 6' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          opacity: 1;
          transform: scale(1);
        }

        /* Sort indicator - Icon Small Button Style */
        .table-sort-icon {
          width: 24px;
          height: 24px;
          background-color: transparent;
          color: var(--icon-muted);
          border: none;
          border-radius: 4px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          user-select: none;
          outline: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          box-sizing: border-box;
          opacity: 1;
        }

        .table-sort-icon--active {
          color: var(--icon-strong);
        }

        .table-sort-icon:hover {
          background-color: var(--bg-hover);
          color: var(--icon-strong);
        }

        .table-sort-icon:focus-visible {
          background-color: var(--bg-hover);
          color: var(--icon-strong);
          box-shadow: 0 0 0 2px #67b3fb;
        }

        .table-sort-icon:active {
          background-color: var(--bg-active);
          transform: scale(0.9);
        }

        /* Expand arrow - Icon Small Button Style */
        .table-expand-icon {
          width: 24px;
          height: 24px;
          background-color: transparent;
          color: var(--icon-muted);
          border: none;
          border-radius: 4px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          user-select: none;
          outline: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          box-sizing: border-box;
        }

        .table-expand-icon:hover {
          background-color: var(--bg-hover);
          color: var(--icon-strong);
        }

        .table-expand-icon:focus-visible {
          background-color: var(--bg-hover);
          color: var(--icon-strong);
          box-shadow: 0 0 0 2px #67b3fb;
        }

        .table-expand-icon:active {
          background-color: var(--bg-active);
          transform: scale(0.9);
        }

        /* Drag handle */
        .table-drag-handle {
          cursor: grab;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .table-drag-handle:active {
          cursor: grabbing;
        }

        .data-table-row:hover .table-drag-handle {
          opacity: 1;
        }

        /* Collection Tag Styles */
        .table-collection-tag {
          font-family: var(--collection-tag-font-family);
          font-size: var(--collection-tag-font-size);
          font-weight: var(--collection-tag-font-weight);
          line-height: var(--collection-tag-line-height);
          letter-spacing: var(--collection-tag-letter-spacing);
          color: var(--collection-tag-text-color);
          background-color: var(--collection-tag-bg-color);
          border: var(--collection-tag-border);
          border-radius: var(--collection-tag-border-radius);
          padding: var(--collection-tag-padding);
          display: inline-block;
        }

        /* Clear All Text Button */
        .table-btn--clear-all {
          background: transparent;
          border: none;
          color: #97a9de;
          font-family: var(--font-family);
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-medium-weight);
          line-height: var(--type-scale-m-line-height);
          letter-spacing: var(--type-scale-m-letter-spacing);
          padding: 6px 0;
          cursor: pointer;
          transition: color 0.2s ease;
          text-decoration: none;
          outline: none;
        }

        .table-btn--clear-all:hover {
          color: #cdd7f6;
        }

        .table-btn--clear-all:focus-visible {
          box-shadow: 0 0 0 2px var(--focus-ring);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .data-table-container {
            font-size: 12px;
          }
          
          .table-settings-row,
          .table-pagination-footer {
            padding: 0 8px;
          }
          
          .data-table-cell,
          .data-table-header-cell {
            padding: 6px 8px;
          }
        }
      `}</style>

      <div className={`data-table-container ${className}`} ref={tableRef}>
        {/* Settings Row */}
        {showSettings && (
          <div className="table-settings-row">
            <div className="table-settings-row__left">
              <span className="table-settings-row__count">
                {selectedRows.size > 0 
                  ? `${selectedRows.size} selected`
                  : `${totalItems || data.length} rows`
                }
              </span>
              {selectedRows.size > 0 && (
                <button 
                  className="table-btn--clear-all"
                  onClick={handleClearAll}
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="table-settings-row__right">
              <button 
                className="table-btn table-btn--icon"
                onClick={handleSettingsClick}
                title="Settings"
              >
                <Settings size={16} />
              </button>
              <button 
                className="table-btn table-btn--icon"
                onClick={handleGroupToggle}
                title={isGrouped ? "Ungroup" : "Group"}
              >
                {isGrouped ? <Ungroup size={16} /> : <Group size={16} />}
              </button>
              <button 
                className="table-btn table-btn--icon"
                onClick={handleViewClick}
                title="View"
              >
                <Eye size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="table-scroll-container">
          {/* Header */}
          <div className="data-table-header-row">
            {selectable && (
              <div className="data-table-header-cell data-table-header-cell--checkbox">
                <input
                  type="checkbox"
                  className="table-checkbox"
                  checked={selectedRows.size === data.length && data.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </div>
            )}
            {expandable && (
              <div className="data-table-header-cell data-table-header-cell--expand" />
            )}
            {draggable && (
              <div className="data-table-header-cell data-table-header-cell--expand" />
            )}
            {columns.map((column) => {
              const columnWidth = columnWidths[column.id] || (column.width ? parseInt(column.width) : undefined);
              const isResizable = resizable !== false && column.resizable !== false;
              
              return (
                <div
                  key={column.id}
                  className={`data-table-header-cell ${sortable ? 'data-table-header-cell--sortable' : ''} ${isResizable ? 'data-table-header-cell--resizable' : ''}`}
                  style={{ 
                    width: columnWidth ? `${columnWidth}px` : (column.width || 'auto'), 
                    flex: columnWidth || column.width ? 'none' : '1',
                    minWidth: columnWidth ? `${columnWidth}px` : undefined
                  }}
                  onClick={() => sortable && handleSort(column.id)}
                >
                  {column.label}
                  {sortable && (
                    <button 
                      className={`table-sort-icon ${sortColumn === column.id ? 'table-sort-icon--active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSort(column.id);
                      }}
                    >
                      {sortColumn === column.id ? (
                        sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                  )}
                  {isResizable && (
                    <div
                      className={`table-resize-handle ${resizingColumn === column.id ? 'table-resize-handle--active' : ''}`}
                      onMouseDown={(e) => handleResizeStart(e, column.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </div>
              );
            })}
            <div className="data-table-header-cell data-table-header-cell--actions">
              Actions
            </div>
          </div>

          {/* Body */}
          <div className="table-body-container">
            {displayedData.map((row, index) => (
              <div key={row.id}>
                <div
                  className={`data-table-row ${draggedRow === row.id ? 'data-table-row--dragging' : ''} ${expandedRows.has(row.id) ? 'data-table-row--expanded' : ''}`}
                  draggable={draggable}
                  onDragStart={(e) => handleDragStart(e, row.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, row.id)}
                >
                  {selectable && (
                    <div className="data-table-cell data-table-cell--checkbox">
                      <input
                        type="checkbox"
                        className="table-checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                      />
                    </div>
                  )}
                  {expandable && (
                    <div className="data-table-cell data-table-cell--expand">
                      {row.expandable && (
                        <button
                          className="table-expand-icon"
                          onClick={() => handleExpandRow(row.id)}
                        >
                          {expandedRows.has(row.id) ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      )}
                    </div>
                  )}
                  {draggable && (
                    <div className="data-table-cell data-table-cell--expand">
                      <div className="table-drag-handle">
                        <Grip size={14} />
                      </div>
                    </div>
                  )}
                  {columns.map((column, columnIndex) => {
                    const columnWidth = columnWidths[column.id] || (column.width ? parseInt(column.width) : undefined);
                    
                    return (
                      <div
                        key={column.id}
                        className={`data-table-cell ${columnIndex !== 0 ? 'data-table-cell--secondary' : ''}`}
                        style={{ 
                          width: columnWidth ? `${columnWidth}px` : (column.width || 'auto'), 
                          flex: columnWidth || column.width ? 'none' : '1',
                          minWidth: columnWidth ? `${columnWidth}px` : undefined
                        }}
                      >
                        {renderCell ? renderCell(column.id, row[column.id], row) : row[column.id]}
                      </div>
                    );
                  })}
                  <div className="data-table-cell data-table-cell--actions">
                    <button className="table-btn table-btn--icon">
                      <MoreHorizontal size={14} />
                    </button>
                    <button className="table-btn table-btn--icon table-btn--delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                {expandable && expandedRows.has(row.id) && row.expandedContent && (
                  <div className="data-table-expanded-content">
                    {row.expandedContent}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Footer */}
        {showPagination && (
          <div className="table-pagination-footer">
            <div className="table-pagination-info">
              Page {currentPage} of {totalPages}
            </div>
            <div className="table-pagination-controls">
              <button 
                className="table-btn table-btn--pagination"
                disabled={currentPage === 1}
                onClick={() => onPageChange?.(currentPage - 1)}
              >
                Previous
              </button>
              <button 
                className="table-btn table-btn--pagination"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange?.(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}