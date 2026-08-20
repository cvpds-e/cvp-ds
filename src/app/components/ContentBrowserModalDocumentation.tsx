import React, { useState } from 'react';
import { CheckSquare, Filter, Grid3X3, Search } from 'lucide-react';
import { ContentBrowserModal, ContentItem } from './ContentBrowserModal';
import { PrimaryButton } from './PrimaryButton';
import './ContentBrowserModalDocumentation.css';

const sampleItems: ContentItem[] = [
  { id: '1', title: 'Spotlight', year: '2026', programType: 'movie', tags: ['Action', 'Editorial'], rating: 'PG-13', thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=640&q=80' },
  { id: '2', title: 'Trending Now', year: '2026', programType: 'series', tags: ['Drama', 'Editorial'], rating: 'PG', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=640&q=80' },
  { id: '3', title: 'Because You Watched', year: '2025', programType: 'movie', tags: ['Drama'], rating: 'PG-13', thumbnail: 'https://images.unsplash.com/photo-1489599317593-3b62f9a61c5b?auto=format&fit=crop&w=640&q=80' },
  { id: '4', title: 'New Releases', year: '2026', programType: 'movie', tags: ['Action'], rating: 'R', thumbnail: 'https://images.unsplash.com/photo-1478720568477-b0c8b7e0e518?auto=format&fit=crop&w=640&q=80' },
  { id: '5', title: 'Continue Watching', year: '2024', programType: 'series', tags: ['Drama'], rating: 'PG', thumbnail: '' },
  { id: '6', title: 'Drama Collection', year: '2025', programType: 'series', tags: ['Drama'], rating: 'PG-13', thumbnail: '' },
  { id: '7', title: 'Kids Collection', year: '2026', programType: 'movie', tags: ['Family'], rating: 'U', thumbnail: '' },
  { id: '8', title: 'Documentary Focus', year: '2024', programType: 'movie', tags: ['Documentary'], rating: 'PG', thumbnail: '' },
];

const tokens = [
  ['Control border', '--cvp-content-browser-control-border', '--cvp-input-border', 'Shared form boundary', 'Search / selects'],
  ['Filter region', '--cvp-content-browser-filter-bg', '--cvp-color-surface-sunken', 'Section / color.bg.base.section', 'Expanded filters'],
  ['Filter controls', '--cvp-sort-control-* / --cvp-select-* / --cvp-multi-select-* / --cvp-tag-filter-*', 'Canonical component contracts', 'No local control styling', 'Sort and editorial criteria'],
  ['Focus', '--cvp-content-browser-focus-ring', '--cvp-border-focus-ring', 'Border + halo', ':focus-visible'],
  ['Checkbox', '--cvp-checkbox-border', '--cvp-input-border', 'Shared input boundary', 'Selection controls'],
  ['Result tile', '--cvp-gallery-*', 'Rail Content Gallery', 'Shared compact poster tile', 'Search results'],
  ['Divider', '--cvp-content-browser-divider', '--cvp-modal-divider', 'Shared overlay divider', 'Regions'],
  ['Modal surface', '--cvp-modal-bg', '--cvp-color-surface-default', 'Theme-resolved overlay surface', 'Container / footer'],
  ['Radius', '--cvp-content-browser-item-radius', '--cvp-radius-md', '8px', 'Result item'],
  ['Spacing', '--cvp-content-browser-gap', '--cvp-space-3', '12px', 'Controls / layout'],
];

export function ContentBrowserModalDocumentation() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(['2']);
  const [lastAdded, setLastAdded] = useState(0);

  return (
    <main className="content-browser-docs documentation-container">
      <header className="content-browser-docs__hero">
        <span className="content-browser-docs__eyebrow">Overlays</span>
        <h1>Content Browser Modal</h1>
        <p>A task-focused browser for finding, filtering, comparing, and selecting content without leaving the current editorial workflow.</p>
      </header>

      <section className="content-browser-docs__section" aria-labelledby="content-browser-preview">
        <div className="content-browser-docs__section-heading"><div><span>01</span><h2 id="content-browser-preview">Interactive preview</h2></div><p>The live component composes the canonical Modal, Checkbox, Button, and form-control contracts.</p></div>
        <div className="content-browser-docs__preview">
          <div><strong>Selection persists while filtering</strong><p>{selected.length} selected{lastAdded ? ` · ${lastAdded} last added` : ''}</p></div>
          <PrimaryButton onClick={() => setOpen(true)}>Open content browser</PrimaryButton>
        </div>
      </section>

      <section className="content-browser-docs__section" aria-labelledby="content-browser-anatomy">
        <div className="content-browser-docs__section-heading"><div><span>02</span><h2 id="content-browser-anatomy">Anatomy and behavior</h2></div><p>Search remains primary; filters and view controls stay secondary to content selection.</p></div>
        <div className="content-browser-docs__anatomy">
          <article><Search size={20} /><strong>Search first</strong><p>One shared search field finds titles, tags, and years without nesting controls.</p></article>
          <article><Filter size={20} /><strong>Progressive filters</strong><p>Sort by includes an ascending/descending control; Program type, Tags, and Year reuse canonical field controls. Program type values stay on one row when space permits, then the filter grid reflows at narrower widths.</p></article>
          <article><Grid3X3 size={20} /><strong>Shared gallery</strong><p>Search results reuse the selectable Rail Content Gallery in its compact portrait-poster layout, preserving selection, pagination, and metadata. Browse results are independent content, so placement-source labels are intentionally hidden.</p></article>
          <article><CheckSquare size={20} /><strong>Quiet selection</strong><p>Checkboxes indicate the selected items; the confirmation button is the single selection count.</p></article>
        </div>
      </section>

      <section className="content-browser-docs__section" aria-labelledby="content-browser-states">
        <div className="content-browser-docs__section-heading"><div><span>03</span><h2 id="content-browser-states">State contract</h2></div></div>
        <div className="content-browser-docs__states">
          <div><strong>Default</strong><span>Search, browse, paginate</span></div>
          <div><strong>Filtered</strong><span>Active criteria + clear action; sorting stays independent</span></div>
          <div><strong>Selected</strong><span>Checkboxes and confirmation count agree</span></div>
          <div><strong>Empty / loading</strong><span>Purposeful status and recovery</span></div>
        </div>
      </section>

      <section className="content-browser-docs__section" aria-labelledby="content-browser-token-contract">
        <div className="content-browser-docs__section-heading"><div><span>04</span><h2 id="content-browser-token-contract">Token contract</h2></div><p>Component CSS consumes Tier 3 aliases; light and dark values resolve through the canonical CVP source.</p></div>
        <div className="content-browser-docs__contract-wrap"><table className="content-browser-docs__contract"><thead><tr><th>Role</th><th>Tier 3 token</th><th>Canonical source</th><th>Resolved contract</th><th>Activation</th></tr></thead><tbody>{tokens.map(([role, token, source, resolved, activation]) => <tr key={token}><td>{role}</td><td><code>{token}</code></td><td><code>{source}</code></td><td>{resolved}</td><td>{activation}</td></tr>)}</tbody></table></div>
        <p className="content-browser-docs__handoff">Engineering guidance: <code>CONTENT_BROWSER_MODAL_DEV_HANDOFF.md</code></p>
      </section>

      <ContentBrowserModal
        isOpen={open}
        onClose={() => setOpen(false)}
        items={sampleItems}
        selectedItems={selected}
        onSelectionChange={setSelected}
        onConfirm={(ids) => setLastAdded(ids.length)}
        filterOptions={{ programTypes: ['movie', 'series'], tags: ['Action', 'Drama', 'Editorial', 'Family', 'Documentary'], years: ['2026', '2025', '2024'] }}
      />
    </main>
  );
}
