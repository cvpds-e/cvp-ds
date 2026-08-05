import React, { useState } from 'react';
import { FolderTree, Gauge, ListTree } from 'lucide-react';
import { Tree, TreeItem } from './Tree';
import './TreeDocumentation.css';

const railTree: TreeItem[] = [
  {
    id: 'home', label: 'Home', type: 'category', count: 6, children: [
      { id: 'spotlight', label: 'Spotlight', type: 'item', status: 'active', tag: 'RECOMMENDED' },
      { id: 'trending', label: 'Trending', type: 'item', status: 'inactive', tag: 'EDITORIAL' },
      { id: 'because-you-watched', label: 'Because You Watched', type: 'item', status: 'inactive', tag: 'RECOMMENDED' },
      { id: 'new-releases', label: 'New Releases', type: 'item', status: 'active', tag: 'EDITORIAL' },
      { id: 'continue-watching', label: 'Continue Watching', type: 'item', status: 'inactive', tag: 'RECOMMENDED' },
      { id: 'trending-now', label: 'Trending Now', type: 'item', status: 'inactive', tag: 'EDITORIAL' },
    ],
  },
  {
    id: 'drama', label: 'Drama', type: 'category', count: 5, children: [
      { id: 'drama-1', label: 'Drama Collection 1', type: 'item', status: 'inactive', tag: 'EDITORIAL' },
      { id: 'drama-2', label: 'Drama Collection 2', type: 'item', status: 'active', tag: 'RECOMMENDED' },
      { id: 'drama-3', label: 'Drama Collection 3', type: 'item', status: 'inactive', tag: 'EDITORIAL' },
      { id: 'drama-4', label: 'Drama Collection 4', type: 'item', status: 'inactive', tag: 'RECOMMENDED' },
      { id: 'drama-5', label: 'Drama Collection 5', type: 'item', status: 'active', tag: 'EDITORIAL' },
    ],
  },
  {
    id: 'kids', label: 'Kids', type: 'category', count: 4, children: [
      { id: 'kids-1', label: 'Kids Collection 1', type: 'item', status: 'inactive', tag: 'RECOMMENDED' },
      { id: 'kids-2', label: 'Kids Collection 2', type: 'item', status: 'inactive', tag: 'EDITORIAL' },
      { id: 'kids-3', label: 'Kids Collection 3', type: 'item', status: 'active', tag: 'RECOMMENDED' },
      { id: 'kids-4', label: 'Kids Collection 4', type: 'item', status: 'inactive', tag: 'EDITORIAL' },
    ],
  },
];

const nestedTree: TreeItem[] = [{
  id: 'content', label: 'Content', type: 'category', count: 2, children: [
    { id: 'collections', label: 'Collections', type: 'subcategory', count: 2, children: [
      { id: 'featured', label: 'Featured', type: 'item', status: 'active' },
      { id: 'archive', label: 'Archive', type: 'item', status: 'inactive' },
    ] },
    { id: 'disabled', label: 'Unavailable source', type: 'item', disabled: true },
  ],
}];

const tokens = [
  ['Row hover', '--cvp-tree-row-bg-hover', '--cvp-color-surface-hover', 'Theme resolved', ':hover'],
  ['Selection surface', '--cvp-tree-row-bg-selected', '--cvp-color-surface-active', 'Theme resolved', 'aria-selected="true"'],
  ['Primary text', '--cvp-tree-text', '--cvp-color-text-primary', '14px / 20px', 'Node labels'],
  ['Muted text', '--cvp-tree-text-muted', '--cvp-color-text-muted', 'AA pairing', 'Counts / metadata'],
  ['Active status', '--cvp-tree-status-active', '--cvp-color-icon-success', 'Theme resolved green', 'status="active"'],
  ['Editorial tag', '--cvp-tree-tag-editorial', '--cvp-color-brand-accent', 'Theme resolved purple', 'tag="EDITORIAL"'],
  ['Focus ring', '--cvp-tree-focus-ring', '--cvp-border-focus-ring', 'Border + halo', ':focus-visible'],
  ['Indent', '--cvp-tree-indent', '--cvp-space-4', '16px per level', 'Nested nodes'],
  ['Compact row', '--cvp-tree-row-height-compact', '--cvp-space-8', '32px', 'density="compact"'],
];

export function TreeDocumentation() {
  const [selected, setSelected] = useState<TreeItem>(railTree[0].children![0]);
  const [nestedSelected, setNestedSelected] = useState<TreeItem | undefined>();

  return (
    <main className="tree-docs documentation-container">
      <header className="tree-docs__hero">
        <span className="tree-docs__eyebrow">Navigation & hierarchy</span>
        <h1>Tree</h1>
        <p>A compact hierarchy for navigating collections and nested resources. It keeps deep structure legible without competing with the main workspace.</p>
      </header>

      <section className="tree-docs__section" aria-labelledby="tree-product-example">
        <div className="tree-docs__section-heading"><div><span>01</span><h2 id="tree-product-example">Product example</h2></div><p>Based on the Rail Collections panel: dense rows, quiet metadata, and immediate expansion feedback.</p></div>
        <div className="tree-docs__product-shell">
          <div className="tree-docs__panel">
            <div className="tree-docs__panel-header"><div><FolderTree size={15} /><strong>Rail collections</strong></div><span>{selected.label}</span></div>
            <div className="tree-docs__panel-action">＋ Add new rail collection</div>
            <Tree data={railTree} ariaLabel="Rail collections" selectedId={selected.id} initialExpanded={['home', 'drama']} onSelect={setSelected} />
          </div>
          <aside className="tree-docs__anatomy">
            <h3>Scan hierarchy</h3>
            <ol>
              <li><span>1</span><div><strong>Disclosure</strong><p>A dedicated toggle changes expansion without changing selection.</p></div></li>
              <li><span>2</span><div><strong>Node identity</strong><p>Collection icon, label, count, and hierarchy depth remain aligned.</p></div></li>
              <li><span>3</span><div><strong>Operational status</strong><p>Status dots and trailing metadata are supplementary, never the only label.</p></div></li>
              <li><span>4</span><div><strong>Selection</strong><p>A restrained surface preserves the scan path without adding a decorative border.</p></div></li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="tree-docs__section" aria-labelledby="tree-variants">
        <div className="tree-docs__section-heading"><div><span>02</span><h2 id="tree-variants">Depth and density</h2></div><p>Indentation communicates hierarchy; density affects geometry without changing behavior.</p></div>
        <div className="tree-docs__variant-grid">
          <article><div className="tree-docs__card-heading"><ListTree size={17} /><div><h3>Compact nested tree</h3><p>Default for side panels</p></div></div><Tree data={nestedTree} selectedId={nestedSelected?.id} initialExpanded={['content', 'collections']} onSelect={setNestedSelected} /></article>
          <article><div className="tree-docs__card-heading"><Gauge size={17} /><div><h3>Comfortable tree</h3><p>Review and lower-volume contexts</p></div></div><Tree data={railTree.slice(0, 2)} density="comfortable" initialExpanded={['home']} showTags={false} /></article>
        </div>
      </section>

      <section className="tree-docs__section" aria-labelledby="tree-states">
        <div className="tree-docs__section-heading"><div><span>03</span><h2 id="tree-states">State contract</h2></div></div>
        <div className="tree-docs__states">
          <div><span className="tree-docs__state-row">Default node</span><strong>Default</strong><small>Transparent within its panel</small></div>
          <div><span className="tree-docs__state-row tree-docs__state-row--hover">Hover node</span><strong>Hover</strong><small>Subtle surface feedback</small></div>
          <div><span className="tree-docs__state-row tree-docs__state-row--selected">Selected node</span><strong>Selected</strong><small>Quiet surface without an edge border</small></div>
          <div><span className="tree-docs__state-row tree-docs__state-row--disabled">Disabled node</span><strong>Disabled</strong><small>Unavailable and non-interactive</small></div>
        </div>
      </section>

      <section className="tree-docs__section" aria-labelledby="tree-token-contract">
        <div className="tree-docs__section-heading"><div><span>04</span><h2 id="tree-token-contract">Token contract</h2></div><p>Tree CSS consumes Tier 3 tokens; theme differences resolve through semantic aliases.</p></div>
        <div className="tree-docs__contract-wrap"><table className="tree-docs__contract"><thead><tr><th>Role</th><th>Tier 3 token</th><th>Canonical source</th><th>Resolved contract</th><th>Activation</th></tr></thead><tbody>{tokens.map(([role, token, source, resolved, activation]) => <tr key={token}><td>{role}</td><td><code>{token}</code></td><td><code>{source}</code></td><td>{resolved}</td><td>{activation}</td></tr>)}</tbody></table></div>
        <p className="tree-docs__handoff">Engineering guidance: <code>TREE_COMPONENT_DEV_HANDOFF.md</code></p>
      </section>
    </main>
  );
}
