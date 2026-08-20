import React, { useState } from 'react';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import { Pagination } from './Pagination';
import './TextInputDocumentation.css';
import './PaginationDocumentation.css';

const tokenRows: ComponentTokenContractRow[] = [
  { role: 'Summary text', token: '--cvp-pagination-summary-font-size / --cvp-pagination-text-muted', source: '--cvp-font-size-md / --cvp-color-text-muted', contract: 'Explicit 14px secondary context with an AA pairing', activation: 'Result-range summary' },
  { role: 'Navigation icon', token: '--cvp-pagination-control-color', source: '--cvp-color-icon-subtle', contract: 'Quiet at rest, stronger on hover', activation: 'Enabled controls' },
  { role: 'Current page field', token: '--cvp-pagination-page-field-*', source: '--cvp-color-surface-default / --cvp-color-border-default', contract: 'Editable, bounded page value', activation: 'All page navigators' },
  { role: 'Navigation unit', token: '--cvp-pagination-navigation-unit-gap', source: '--cvp-space-2', contract: 'Page/Row toggle and adjacent value groups share an 8px rhythm', activation: 'Page and Row modes' },
  { role: 'Keyboard focus', token: '--cvp-pagination-focus-ring', source: '--cvp-border-focus-ring', contract: 'Shared visible focus treatment', activation: ':focus-visible' },
  { role: 'Shared footer geometry', token: '--cvp-pagination-height', source: '--cvp-space-900', contract: 'Table composes the same 48px navigation foundation', activation: 'Table footer' },
];

export function PaginationDocumentation() {
  const [page, setPage] = useState(3);
  const [compactPage, setCompactPage] = useState(1);

  return (
    <main className="cvp-input-doc cvp-pagination-doc">
      <header className="cvp-input-doc__hero">
        <div><span>Component 15 · Standardized</span><h1>Pagination</h1></div>
        <div><p>A controlled navigator for moving through dense operational collections while keeping position, range, and reachability clear.</p><span className="cvp-input-doc__status">Ready for implementation</span></div>
      </header>

      <section className="cvp-input-doc__panel">
        <header><b>01</b><div><h2>Rails management baseline</h2><p>Use a result range for scan confidence. Page is the default navigation unit; the contextual Page control switches to Row when operators need single-row traversal.</p></div></header>
        <div className="cvp-pagination-doc__live"><Pagination currentPage={page} totalItems={243} pageSize={20} onPageChange={setPage} itemLabel="rails" /></div>
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>02</b><div><h2>Component boundary</h2><p>Pagination owns page navigation. Its parent owns the data set, filters, sorting, rows-per-page, and loading state.</p></div></header>
        <div className="cvp-pagination-doc__comparison">
          <article><span className="cvp-pagination-doc__caption">Short collection</span><Pagination currentPage={compactPage} totalItems={9} pageSize={10} onPageChange={setCompactPage} itemLabel="rails" /></article>
          <article><span className="cvp-pagination-doc__caption">Empty collection</span><Pagination currentPage={1} totalItems={0} pageSize={20} itemLabel="rails" /></article>
        </div>
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>03</b><div><h2>Theme parity</h2><p>Semantic surfaces and foregrounds keep the editable page field and controls legible in either theme.</p></div></header>
        <div className="cvp-pagination-doc__themes">
          <article data-theme="dark"><span>Dark</span><Pagination currentPage={3} totalItems={243} pageSize={20} itemLabel="rails" /></article>
          <article data-theme="light"><span>Light</span><Pagination currentPage={3} totalItems={243} pageSize={20} itemLabel="rails" /></article>
        </div>
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>04</b><div><h2>Token contract</h2><p>Pagination has a focused Tier 3 contract and Tables consume the same foundation rather than redefining controls.</p></div></header>
        <ComponentTokenContract label="Pagination token contract" rows={tokenRows} />
      </section>

      <section className="cvp-input-doc__grid">
        <article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Accessibility contract</h2></div></header><ul><li>Use a navigation landmark with an item-specific accessible name.</li><li>Use native buttons with clear first, previous, next, and last labels.</li><li>Expose the current Page or Row as an editable numeric input and announce the active navigation unit.</li><li>Disable unavailable navigation rather than hiding it, preserving layout and discoverability.</li></ul></article>
        <article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Usage decisions</h2></div></header><ul><li>Use for paged tables, dense content browsers, and management lists.</li><li>Page is the default unit; expose Row only when one-record traversal meaningfully supports the workflow.</li><li>Pass a singular/plural neutral item label such as “rails” or “results”.</li><li>Keep rows-per-page with the parent’s table controls; it changes the data view, not page navigation.</li></ul></article>
      </section>

      <footer className="cvp-input-doc__footer"><span>CVP operational navigation foundation</span><p>Pagination · Table · Rails List · Tokens · Keyboard · Theme parity</p></footer>
    </main>
  );
}
