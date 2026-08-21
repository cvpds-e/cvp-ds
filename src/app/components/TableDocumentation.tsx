import React, { useMemo, useState } from 'react';
import { Database, Rows3, SlidersHorizontal } from 'lucide-react';
import { Table, TableRow } from './Table';
import { Tag } from './Tag';
import { createSampleData, sampleColumns } from './TableSampleData';
import './TableDocumentation.css';

const groupedRows: TableRow[] = [
  { id: 'group-home', kind: 'group', groupLabel: 'Home', groupCount: 3 },
  ...createSampleData().slice(0, 3),
  { id: 'group-drama', kind: 'group', groupLabel: 'Drama', groupCount: 3 },
  ...createSampleData().slice(3, 6).map((row, index) => ({
    ...row,
    id: `drama-${row.id}`,
    title: ['Drama Collection 1', 'Drama Collection 2', 'Drama Collection 3'][index],
    collection: 'DRAMA',
    updated: 'Aug 4, 2026',
  })),
];

const tokenRows = [
  ['Surface', '--cvp-table-row-bg', '--cvp-color-surface-default', 'Theme resolved', 'Base rows'],
  ['Header', '--cvp-table-header-bg', '--cvp-color-surface-raised', 'Theme resolved', 'Sticky header'],
  ['Subtle boundary', '--cvp-table-row-border', '--cvp-color-border-subtle', '1px divider', 'Rows / footer'],
  ['Row hover', '--cvp-table-row-bg-hover', '--cvp-color-surface-hover', 'Theme resolved', ':hover'],
  ['Selected row', '--cvp-table-row-bg-selected', '--cvp-color-surface-active', 'Neutral selection surface', 'Selection present'],
  ['Row count tag', '--cvp-table-count-bg', '--cvp-color-surface-subtle', 'Muted metadata tag', 'Toolbar summary'],
  ['Categorical Tag', '--cvp-tag-*', '--cvp-color-surface-subtle / semantic foregrounds', 'Neutral identity; semantic meanings', 'Collection and Rail Type columns'],
  ['Control gap', '--cvp-table-control-gap', '--cvp-space-100', '2px', 'Toolbar and pagination controls'],
  ['Rows-per-page menu', '--cvp-select-*', 'Shared Select dropdown styling', '10 / 20 / 50 rows; standard selected-option treatment', 'Rows-per-page trigger'],
  ['Viewport-safe popup', '--cvp-table-menu-viewport-inset', '5px documented table exception', 'At least 5px from every viewport edge', 'Rows-per-page menu'],
  ['Column resize', '--cvp-table-resize-handle-*', '--cvp-color-border-strong / --cvp-color-brand-default', 'Subtle divider; brand while dragging', 'resizable=true'],
  ['Sort indicator', '--cvp-table-sort-icon-*', '--cvp-button-icon-glyph-size', '16px / strong stroke', 'sortable=true'],
  ['Expanded content', '--cvp-table-expanded-*', '--cvp-color-surface-subtle / --cvp-space-*', 'Contained preview surface', 'row.expandedContent + expandable'],
  ['Loading rows', '--cvp-skeleton-*', 'Shared Skeleton component contract', 'Neutral animated placeholders', 'loading=true'],
  ['Frozen leading columns', '--cvp-table-sticky-*', '--cvp-color-border-subtle', 'Pinned scan-path boundary and stack order', 'freezeLeadingColumns'],
  ['Overflow scrollbar', '--cvp-table-scrollbar-*', '--cvp-color-surface-subtle / --cvp-color-border-strong', 'Thin, theme-aware manual scroll affordance', 'Horizontally overflowing tables'],
  ['Primary text', '--cvp-table-cell-text', '--cvp-color-text-primary', '14px / 20px', 'Primary cells'],
  ['Muted text', '--cvp-table-cell-text-muted', '--cvp-color-text-muted', 'AA pairing', 'Secondary cells'],
  ['Selection control', '--cvp-checkbox-border', '--cvp-input-border', 'Shared Checkbox contract', 'selectable=true'],
  ['Focus', '--cvp-table-focus-ring', '--cvp-border-focus-ring', 'Border + halo', ':focus-visible'],
  ['Compact row', '--cvp-table-row-height-compact', '--cvp-space-900', '48px', 'density="compact"'],
  ['Comfortable row', '--cvp-table-row-height-comfortable', '--cvp-space-900 + --cvp-space-2', '56px', 'density="comfortable"'],
];

export function TableDocumentation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortState, setSortState] = useState('No active sort');
  const [selection, setSelection] = useState<string[]>([]);
  const rows = useMemo(() => groupedRows, []);

  const renderCell = (columnId: string, value: unknown) => {
    if (columnId === 'collection') {
      return <Tag>{String(value)}</Tag>;
    }
    if (columnId === 'type') {
      return <Tag tone={String(value).toLowerCase() === 'recommended' ? 'info' : 'accent'}>{String(value)}</Tag>;
    }
    return String(value ?? '');
  };

  return (
    <main className="table-docs documentation-container">
      <header className="table-docs__hero">
        <span className="table-docs__eyebrow">Navigation & data display</span>
        <h1>Table</h1>
        <p>
          A dense operator table for scanning, sorting, selecting, grouping, and acting on structured records.
          It preserves the CVP Rails List character while making states, semantics, and token ownership explicit.
        </p>
      </header>

      <section className="table-docs__section" aria-labelledby="table-product-example">
        <div className="table-docs__section-heading">
          <div><span>01</span><h2 id="table-product-example">Product example</h2></div>
          <p>Compact by default for operational interfaces; drag the subtle header separators to resize columns. Data rows can expose contained content with <code>expandedContent</code>; set <code>singleExpand</code> when one open preview is the intended workflow. Use <code>freezeLeadingColumns</code> only for consecutive leading utility cells and the primary data column. Everything after that scan path remains in the same table and scrolls horizontally with a thin, theme-aware scrollbar. Sort indicators use the shared 16px icon size. The compact numeric rows trigger remains in place, while its option list follows the shared Select keyboard, selected-option, and viewport-safe popup contract.</p>
        </div>
        <div className="table-docs__example-shell">
          <div className="table-docs__context-bar">
            <div><Database size={16} /><strong>Rails list</strong></div>
            <span>{sortState} · {selection.length ? `${selection.length} selected` : 'No selection'}</span>
          </div>
          <Table
            ariaLabel="Rails list"
            caption="Rails grouped by collection"
            columns={sampleColumns}
            data={rows}
            selectable
            expandable
            freezeLeadingColumns
            sortable
            resizable
            density="compact"
            height="480px"
            pageSize={pageSize}
            pageSizeOptions={[10, 20, 50]}
            onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onSelectionChange={setSelection}
            onSort={(column, direction) => setSortState(`${column}: ${direction}`)}
            renderCell={renderCell}
          />
        </div>
      </section>

      <section className="table-docs__section" aria-labelledby="table-variants">
        <div className="table-docs__section-heading">
          <div><span>02</span><h2 id="table-variants">Density and system states</h2></div>
          <p>Density changes geometry only. Color, hierarchy, focus, and interaction behavior remain stable.</p>
        </div>
        <div className="table-docs__variant-grid">
          <article>
            <div className="table-docs__card-heading"><Rows3 size={17} /><div><h3>Compact</h3><p>High-volume management views</p></div></div>
            <Table columns={sampleColumns.slice(0, 3)} data={createSampleData().slice(0, 3)} density="compact" height="220px" showSettings={false} showPagination={false} showActions={false} sortable renderCell={renderCell} />
          </article>
          <article>
            <div className="table-docs__card-heading"><SlidersHorizontal size={17} /><div><h3>Comfortable</h3><p>Lower-density review workflows</p></div></div>
            <Table columns={sampleColumns.slice(0, 3)} data={createSampleData().slice(0, 3)} density="comfortable" height="240px" showSettings={false} showPagination={false} showActions={false} selectable renderCell={renderCell} />
          </article>
        </div>
        <div className="table-docs__state-strip">
          <div><span className="table-docs__state-swatch" /><strong>Default</strong><small>Quiet surface and subtle divider</small></div>
          <div><span className="table-docs__state-swatch table-docs__state-swatch--hover" /><strong>Hover</strong><small>Row affordance without border noise</small></div>
          <div><span className="table-docs__state-swatch table-docs__state-swatch--selected" /><strong>Selected</strong><small>Surface cue plus native checkbox</small></div>
          <div><span className="table-docs__focus-demo" tabIndex={0}>Focus target</span><strong>Focus</strong><small>Shared CVP focus ring</small></div>
        </div>
      </section>

      <section className="table-docs__section" aria-labelledby="table-contract">
        <div className="table-docs__section-heading">
          <div><span>03</span><h2 id="table-contract">Token contract</h2></div>
          <p>Component CSS consumes Tier 3 table tokens only; themes resolve through Tier 2 semantic aliases.</p>
        </div>
        <div className="table-docs__contract-wrap">
          <table className="table-docs__contract">
            <thead><tr><th>Role</th><th>Tier 3 token</th><th>Canonical source</th><th>Resolved contract</th><th>Activation</th></tr></thead>
            <tbody>{tokenRows.map(([role, token, source, resolved, activation]) => <tr key={token}><td>{role}</td><td><code>{token}</code></td><td><code>{source}</code></td><td>{resolved}</td><td>{activation}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="table-docs__section" aria-labelledby="table-implementation">
        <div className="table-docs__section-heading">
          <div><span>04</span><h2 id="table-implementation">Implementation contract</h2></div>
        </div>
        <div className="table-docs__implementation-grid">
          <article><strong>Use native semantics</strong><p>The component renders table, thead, tbody, th, caption, and aria-sort. Keep interactive behavior inside buttons and inputs.</p></article>
          <article><strong>Preserve scan paths</strong><p>Do not wrap cell values by default. Use explicit widths and horizontal scrolling for dense operational content. If needed, freeze only the consecutive leading controls and primary column; do not freeze trailing metadata or actions.</p></article>
          <article><strong>Expose real actions</strong><p>Wire onSort, onSelectionChange, onRowAction, and onPageChange. Do not ship controls that only appear actionable.</p></article>
          <article><strong>Handle every data state</strong><p>Set <code>loading</code> to render shared Skeleton rows, then provide empty states, disabled rows where needed, and an accessible label or visible caption.</p></article>
        </div>
        <p className="table-docs__handoff-note">Full engineering guidance: <code>TABLE_COMPONENT_DEV_HANDOFF.md</code></p>
      </section>
    </main>
  );
}
