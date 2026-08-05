import React, { useState } from 'react';
import { Table, TableRow } from './Table';
import { User, Calendar, Star, Eye, ChevronDown, Settings } from 'lucide-react';
import { sampleColumns, createSampleData } from './TableSampleData';
import { TableSpecifications } from './TableSpecifications';

export function TableDocumentation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const sampleData = createSampleData();

  const handleSort = (columnId: string, direction: 'asc' | 'desc') => {
    console.log(`Sorting ${columnId} in ${direction} direction`);
  };

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedRows(selectedIds);
  };

  const renderCell = (columnId: string, value: any, row: TableRow) => {
    switch (columnId) {
      case 'collection':
        return (
          <span className="table-collection-tag">
            {value}
          </span>
        );
      case 'type':
        return value;
      default:
        return value;
    }
  };

  return (
    <>
      <style>{`
        .table-docs {
          --table-docs-padding: var(--doc-padding);
          --table-docs-max-width: var(--doc-max-width);
          --table-docs-font-family: var(--doc-font-family);
          --table-docs-section-spacing: var(--doc-section-spacing);
          --table-docs-item-spacing: var(--doc-item-spacing);

          padding: var(--table-docs-padding);
          max-width: var(--table-docs-max-width);
          margin: 0 auto;
          font-family: var(--table-docs-font-family);
          box-sizing: border-box;
        }

        .table-docs__title {
          font-size: var(--text-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--foreground);
          margin-bottom: var(--table-docs-section-spacing);
        }

        .table-docs__section {
          margin-bottom: var(--table-docs-section-spacing);
        }

        .table-docs__section-title {
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-semibold);
          color: var(--foreground);
          margin-bottom: var(--table-docs-item-spacing);
          border-bottom: 1px solid var(--border-default);
          padding-bottom: 8px;
        }

        .table-docs__subsection-title {
          font-size: var(--text-xl);
          font-weight: var(--font-weight-medium);
          color: var(--foreground);
          margin-bottom: 16px;
          margin-top: 32px;
        }

        .table-docs__description {
          font-size: var(--text-base);
          color: var(--muted-foreground);
          margin-bottom: var(--table-docs-item-spacing);
          line-height: var(--leading-relaxed);
        }

        .table-docs__example {
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: var(--table-docs-item-spacing);
          margin-bottom: var(--table-docs-item-spacing);
        }

        .table-docs__example-title {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-medium);
          color: var(--foreground);
          margin-bottom: 12px;
        }

        .table-docs__example-description {
          font-size: var(--text-sm);
          color: var(--muted-foreground);
          margin-bottom: 16px;
        }

        .table-docs__table {
          width: 100%;
          border-collapse: collapse;
          border: var(--table-border);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: var(--table-docs-item-spacing);
        }

        .table-docs__table th {
          background: var(--table-header-bg);
          padding: var(--table-header-padding);
          text-align: left;
          font-weight: var(--table-header-font-weight);
          font-size: var(--table-font-size);
          color: var(--foreground);
          border-bottom: var(--table-border);
        }

        .table-docs__table td {
          padding: var(--table-cell-padding);
          font-size: var(--table-font-size);
          color: var(--foreground);
          border-bottom: var(--table-border);
          vertical-align: top;
        }

        .table-docs__table tr:last-child td {
          border-bottom: none;
        }

        .table-docs__feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--table-docs-item-spacing);
          margin-bottom: var(--table-docs-item-spacing);
        }

        .table-docs__feature {
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 20px;
        }

        .table-docs__feature-title {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-medium);
          color: var(--foreground);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .table-docs__feature-description {
          font-size: var(--text-sm);
          color: var(--muted-foreground);
          line-height: var(--leading-relaxed);
        }

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

        .table-docs__todo-block {
          background: var(--color-blue-950);
          border: 1px solid var(--color-blue-800);
          border-radius: 8px;
          padding: var(--table-docs-item-spacing);
          margin-bottom: var(--table-docs-section-spacing);
          border-left: 4px solid var(--color-blue-600);
        }

        .table-docs__todo-title {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-blue-300);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .table-docs__todo-title::before {
          content: "📋";
          font-size: 16px;
        }

        .table-docs__todo-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .table-docs__todo-item {
          font-size: var(--text-sm);
          color: var(--color-blue-200);
          line-height: var(--leading-relaxed);
          padding-left: 16px;
          position: relative;
        }

        .table-docs__todo-item::before {
          content: "•";
          color: var(--color-blue-300);
          font-size: 16px;
          position: absolute;
          left: 0;
          top: 0;
        }

        .table-docs__todo-item strong {
          color: var(--color-blue-100);
          font-weight: var(--font-weight-medium);
        }
      `}</style>

      <div className="table-docs documentation-container">
        <h1 className="table-docs__title">Table</h1>
        
        <p className="table-docs__description">
          The Table component provides a comprehensive data display solution with sticky headers, 
          pagination, sorting, selection, and expandable rows. Designed for complex data management 
          interfaces with full keyboard navigation and accessibility support.
        </p>

        {/* Todo Info Block */}
        <div className="table-docs__todo-block">
          <h3 className="table-docs__todo-title">To Do</h3>
          <div className="table-docs__todo-content">
            <div className="table-docs__todo-item">
              <strong>Pagination Component:</strong> The current pagination implementation is a sample.
            </div>
            <div className="table-docs__todo-item">
              <strong>Row Grouping:</strong> Table row grouping functionality will be added in a future release to support hierarchical data organization.
            </div>
          </div>
        </div>

        {/* Variants */}
        <section className="table-docs__section">
          <h2 className="table-docs__section-title">Variants</h2>
          
          <div className="table-docs__example">
            <h3 className="table-docs__example-title">Basic Table</h3>
            <p className="table-docs__example-description">
              Simple data display with sorting and pagination functionality.
            </p>
            <Table
              columns={sampleColumns}
              data={sampleData}
              sortable={true}
              resizable={true}
              height="300px"
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onSort={handleSort}
            />
          </div>

          <div className="table-docs__example">
            <h3 className="table-docs__example-title">Selectable Table</h3>
            <p className="table-docs__example-description">
              Table with row selection, bulk actions, and selection counter.
            </p>
            <Table
              columns={sampleColumns}
              data={sampleData}
              selectable={true}
              sortable={true}
              resizable={true}
              height="300px"
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onSelectionChange={handleSelectionChange}
              renderCell={renderCell}
            />
          </div>

          <div className="table-docs__example">
            <h3 className="table-docs__example-title">Expandable Table</h3>
            <p className="table-docs__example-description">
              Table with expandable rows showing additional details and custom content.
            </p>
            <Table
              columns={sampleColumns}
              data={sampleData}
              expandable={true}
              selectable={true}
              sortable={true}
              resizable={true}
              height="400px"
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              renderCell={renderCell}
            />
          </div>
        </section>

        {/* Features */}
        <section className="table-docs__section">
          <h2 className="table-docs__section-title">Features</h2>
          
          <div className="table-docs__feature-grid">
            <div className="table-docs__feature">
              <h3 className="table-docs__feature-title">
                <Calendar size={20} />
                Dynamic Layout
              </h3>
              <p className="table-docs__feature-description">
                Adapts to container size with sticky header and footer, scrollable body, and flexible column sizing.
              </p>
            </div>

            <div className="table-docs__feature">
              <h3 className="table-docs__feature-title">
                <User size={20} />
                Row Selection
              </h3>
              <p className="table-docs__feature-description">
                Multi-select with checkboxes, select all functionality, and batch actions support.
              </p>
            </div>

            <div className="table-docs__feature">
              <h3 className="table-docs__feature-title">
                <ChevronDown size={20} />
                Expandable Rows
              </h3>
              <p className="table-docs__feature-description">
                Collapsible row details with custom content for additional information display.
              </p>
            </div>

            <div className="table-docs__feature">
              <h3 className="table-docs__feature-title">
                <Star size={20} />
                Column Sorting
              </h3>
              <p className="table-docs__feature-description">
                Click-to-sort headers with visual indicators for ascending and descending order.
              </p>
            </div>

            <div className="table-docs__feature">
              <h3 className="table-docs__feature-title">
                <Eye size={20} />
                Responsive Design
              </h3>
              <p className="table-docs__feature-description">
                Mobile-friendly layout with touch interactions and optimized spacing for smaller screens.
              </p>
            </div>

            <div className="table-docs__feature">
              <h3 className="table-docs__feature-title">
                <User size={20} />
                Column Resizing
              </h3>
              <p className="table-docs__feature-description">
                Interactive column width adjustment with slim line indicators and visual feedback during resize operations.
              </p>
            </div>

            <div className="table-docs__feature">
              <h3 className="table-docs__feature-title">
                <Settings size={20} />
                Table Controls
              </h3>
              <p className="table-docs__feature-description">
                Settings, group/ungroup toggle, and view action buttons provide comprehensive table management options.
              </p>
            </div>

            <div className="table-docs__feature">
              <h3 className="table-docs__feature-title">
                <User size={20} />
                Advanced Features
              </h3>
              <p className="table-docs__feature-description">
                Drag & drop reordering, virtual scrolling, and custom cell renderers for complex data presentation.
              </p>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="table-docs__section">
          <h2 className="table-docs__section-title">States</h2>
          
          <div className="doc-grid-states">
            <div className="table-docs__example">
              <h3 className="table-docs__example-title">Default</h3>
              <div style={{ padding: '16px', background: '#19191a', borderRadius: '6px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  minHeight: '40px',
                  padding: '8px 12px',
                  borderBottom: '1px solid rgba(212, 228, 254, 0.1)',
                  color: '#fff',
                  fontSize: '14px'
                }}>
                  Spotlight
                </div>
              </div>
            </div>

            <div className="table-docs__example">
              <h3 className="table-docs__example-title">Hover</h3>
              <div style={{ padding: '16px', background: '#19191a', borderRadius: '6px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  minHeight: '40px',
                  padding: '8px 12px',
                  borderBottom: '1px solid rgba(212, 228, 254, 0.1)',
                  background: '#292a2e',
                  color: '#fff',
                  fontSize: '14px'
                }}>
                  Spotlight
                </div>
              </div>
            </div>

            <div className="table-docs__example">
              <h3 className="table-docs__example-title">Selected</h3>
              <div style={{ padding: '16px', background: '#19191a', borderRadius: '6px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  minHeight: '40px',
                  padding: '8px 12px',
                  borderBottom: '1px solid rgba(212, 228, 254, 0.1)',
                  color: '#fff',
                  fontSize: '14px',
                  gap: '12px'
                }}>
                  <input 
                    type="checkbox" 
                    checked 
                    readOnly
                    style={{
                      width: '16px',
                      height: '16px',
                      background: '#3d63dd',
                      border: '1px solid #3d63dd',
                      borderRadius: '3px'
                    }}
                  />
                  Spotlight
                </div>
              </div>
            </div>

            <div className="table-docs__example">
              <h3 className="table-docs__example-title">Expanded</h3>
              <div style={{ padding: '16px', background: '#19191a', borderRadius: '6px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  minHeight: '40px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontSize: '14px',
                  gap: '8px'
                }}>
                  <ChevronDown size={14} />
                  Spotlight
                </div>
                <div style={{
                  background: '#292a2e',
                  padding: '16px',
                  fontSize: '13px',
                  color: '#bbb'
                }}>
                  Featured content highlighting the best recommendations
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="table-docs__section">
          <h2 className="table-docs__section-title">Specifications</h2>
          <TableSpecifications />
        </section>
      </div>
    </>
  );
}