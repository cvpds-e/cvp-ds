import React, { useState } from 'react';
import { CheckSquare, Filter, Grid3X3, Search } from 'lucide-react';
import { ContentBrowserModal, ContentItem } from './ContentBrowserModal';
import { PrimaryButton } from './PrimaryButton';
import './ContentBrowserModalDocumentation.css';

const sampleItems: ContentItem[] = [
  { id: '1', title: 'Spotlight', year: '2026', genre: 'Editorial', rating: 'PG-13', provider: 'CVP', thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=640&q=80' },
  { id: '2', title: 'Trending Now', year: '2026', genre: 'Recommended', rating: 'PG', provider: 'CVP', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=640&q=80' },
  { id: '3', title: 'Because You Watched', year: '2025', genre: 'Recommended', rating: 'PG-13', provider: 'Partner', thumbnail: 'https://images.unsplash.com/photo-1489599317593-3b62f9a61c5b?auto=format&fit=crop&w=640&q=80' },
  { id: '4', title: 'New Releases', year: '2026', genre: 'Editorial', rating: 'R', provider: 'CVP', thumbnail: 'https://images.unsplash.com/photo-1478720568477-b0c8b7e0e518?auto=format&fit=crop&w=640&q=80' },
  { id: '5', title: 'Continue Watching', year: '2024', genre: 'Personalised', rating: 'PG', provider: 'Partner', thumbnail: '' },
  { id: '6', title: 'Drama Collection', year: '2025', genre: 'Drama', rating: 'PG-13', provider: 'CVP', thumbnail: '' },
  { id: '7', title: 'Kids Collection', year: '2026', genre: 'Kids', rating: 'U', provider: 'Partner', thumbnail: '' },
  { id: '8', title: 'Documentary Focus', year: '2024', genre: 'Documentary', rating: 'PG', provider: 'CVP', thumbnail: '' },
];

const tokens = [
  ['Surface', '--cvp-content-browser-item-bg', '--cvp-color-surface-default', 'Theme-resolved surface', 'Result item'],
  ['Control border', '--cvp-content-browser-control-border', '--cvp-input-border', 'Shared form boundary', 'Search / selects'],
  ['Focus', '--cvp-content-browser-focus-ring', '--cvp-border-focus-ring', 'Border + halo', ':focus-visible'],
  ['Selection', '--cvp-content-browser-item-bg-selected', '--cvp-color-menu-item-active-bg', 'Theme-resolved selected surface', 'aria-pressed=true'],
  ['Selected border', '--cvp-content-browser-item-border-selected', '--cvp-color-brand-default', 'Brand boundary', 'aria-pressed=true'],
  ['Checkbox', '--cvp-checkbox-border', '--cvp-input-border', 'Shared input boundary', 'Selection controls'],
  ['Placeholder', '--cvp-content-browser-placeholder-bg', '--cvp-color-surface-sunken', 'Theme-resolved media fallback', 'Missing thumbnail'],
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
          <article><Search size={20} /><strong>Search first</strong><p>One field searches title, genre, and provider without nesting controls.</p></article>
          <article><Filter size={20} /><strong>Progressive filters</strong><p>Optional filters expand in place and expose a clear reset action.</p></article>
          <article><Grid3X3 size={20} /><strong>Two views</strong><p>Grid and list modes preserve selection, pagination, and metadata.</p></article>
          <article><CheckSquare size={20} /><strong>Visible selection</strong><p>Selected items remain removable and are summarized before confirmation.</p></article>
        </div>
      </section>

      <section className="content-browser-docs__section" aria-labelledby="content-browser-states">
        <div className="content-browser-docs__section-heading"><div><span>03</span><h2 id="content-browser-states">State contract</h2></div></div>
        <div className="content-browser-docs__states">
          <div><strong>Default</strong><span>Search, browse, paginate</span></div>
          <div><strong>Filtered</strong><span>Active indicator + clear action</span></div>
          <div><strong>Selected</strong><span>Cards, chips, and footer agree</span></div>
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
        filterOptions={{ genres: ['Editorial', 'Recommended', 'Personalised', 'Drama', 'Kids', 'Documentary'], years: ['2026', '2025', '2024'], providers: ['CVP', 'Partner'] }}
      />
    </main>
  );
}
