import React, { useState } from 'react';
import { Grid3X3, ListVideo, MousePointer2, Move } from 'lucide-react';
import { RailContentGallery, RailContentItem } from './RailContentGallery';
import './RailContentGalleryDocumentation.css';

const items: RailContentItem[] = [
  { id: '1', title: 'Spotlight', year: '2026', thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=480&q=80', position: 1, metadata: { category: 'Editorial', duration: '6 items', status: 'pinned' } },
  { id: '2', title: 'Trending Now', year: '2026', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=480&q=80', position: 2, metadata: { category: 'Recommended', duration: '8 items', status: 'active' } },
  { id: '3', title: 'Because You Watched', year: '2025', thumbnail: '', position: 3, metadata: { category: 'Personalised', duration: '12 items', status: 'active' } },
  { id: '4', title: 'New Releases', year: '2026', thumbnail: 'https://images.unsplash.com/photo-1478720568477-b0c8b7e0e518?auto=format&fit=crop&w=480&q=80', position: 4, metadata: { category: 'Editorial', duration: '10 items', status: 'active' } },
  { id: '5', title: 'Continue Watching', year: '2024', thumbnail: '', position: 5, metadata: { category: 'Personalised', duration: '5 items', status: 'inactive' } },
  { id: '6', title: 'Drama Collection', year: '2025', thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=480&q=80', position: 6, metadata: { category: 'Editorial', duration: '7 items', status: 'active' } },
  { id: '7', title: 'Kids Collection', year: '2026', thumbnail: '', position: 7, metadata: { category: 'Recommended', duration: '9 items', status: 'active' } },
];

const tokens = [
  ['Text', '--cvp-gallery-text', '--cvp-color-text-primary', 'Theme-resolved foreground', 'Header / item title'],
  ['Metadata', '--cvp-gallery-meta-color', '--cvp-color-text-muted', 'Theme-resolved secondary text', 'Count / item metadata'],
  ['Item boundary', '--cvp-gallery-item-border', '--cvp-color-border-subtle', 'Subtle 1px boundary', 'Media container'],
  ['Selection', '--cvp-gallery-item-border-selected', '--cvp-color-brand-default', 'Brand boundary + focus halo', 'Selected item'],
  ['Checkbox', '--cvp-checkbox-border', '--cvp-input-border', 'Shared form boundary', 'Selectable grid'],
  ['Overlay', '--cvp-gallery-overlay-bg', '--cvp-color-gallery-overlay', 'Theme-safe media scrim', 'Position / controls'],
  ['Placeholder', '--cvp-gallery-placeholder-bg', '--cvp-color-surface-sunken', 'Theme-resolved fallback', 'Missing thumbnail'],
  ['Focus', '--cvp-gallery-focus-ring', '--cvp-border-focus-ring', 'Border + halo', 'Item :focus-visible'],
  ['Radius', '--cvp-gallery-item-radius', '--cvp-radius-md', '8px', 'Media container'],
  ['Motion', '--cvp-gallery-motion-easing', '--cvp-motion-easing-standard', 'Reduced-motion aware', 'Image hover / loading'],
];

export function RailContentGalleryDocumentation() {
  const [selected, setSelected] = useState<string[]>(['2']);
  const [event, setEvent] = useState('Ready for interaction');
  return <main className="rail-gallery-docs documentation-container">
    <header className="rail-gallery-docs__hero"><span className="rail-gallery-docs__eyebrow">Complex</span><h1>Rail Content Gallery</h1><p>A responsive content collection for browsing, selecting, and managing ordered rail items. It combines shared media, checkbox, icon-button, focus, and motion contracts.</p></header>

    <section className="rail-gallery-docs__section" aria-labelledby="gallery-management"><div className="rail-gallery-docs__section-heading"><div><span>01</span><h2 id="gallery-management">Management rail</h2></div><p>Ordered content exposes edit, pin, drag, and horizontal navigation without obscuring titles. Place the count beside navigation when it describes the whole rail.</p></div><div className="rail-gallery-docs__preview"><RailContentGallery title="Home rail" items={items} variant="management" itemCountPlacement="navigation" headerStatus="Editorial" headerDate="Updated today" onEdit={(item) => setEvent(`Editing ${item.title}`)} onPin={(item) => setEvent(`Pin toggled for ${item.title}`)} onDrag={(id, position) => setEvent(`Moved ${id} to position ${position + 1}`)} onItemClick={(item) => setEvent(`Opened ${item.title}`)} /><p className="rail-gallery-docs__event" aria-live="polite">{event}</p></div></section>

    <section className="rail-gallery-docs__section" aria-labelledby="gallery-selectable"><div className="rail-gallery-docs__section-heading"><div><span>02</span><h2 id="gallery-selectable">Selectable grid</h2></div><p>Selection uses the canonical Checkbox and remains synchronized with the card’s pressed state.</p></div><div className="rail-gallery-docs__preview"><RailContentGallery title="Choose collections" items={items.slice(0, 6)} variant="display-grid-selectable" selectedItems={selected} onSelectionChange={setSelected} /><p className="rail-gallery-docs__event" aria-live="polite">{selected.length} selected</p></div></section>

    <section className="rail-gallery-docs__section" aria-labelledby="gallery-states"><div className="rail-gallery-docs__section-heading"><div><span>03</span><h2 id="gallery-states">Variants and states</h2></div></div><div className="rail-gallery-docs__behavior"><article><ListVideo size={20} /><strong>Display rail</strong><p>Compact horizontal browsing with responsive navigation.</p></article><article><Grid3X3 size={20} /><strong>Display grid</strong><p>Fluid columns for broader comparison and scanning.</p></article><article><MousePointer2 size={20} /><strong>Selectable grid</strong><p>Checked, pressed, and callback state stay aligned.</p></article><article><Move size={20} /><strong>Management</strong><p>Edit, pin, and reorder controls are scoped to each item.</p></article></div><div className="rail-gallery-docs__state-grid"><RailContentGallery title="Empty rail" items={[]} variant="display-grid" /><RailContentGallery title="Loading rail" items={[]} variant="display-grid" loading /></div></section>

    <section className="rail-gallery-docs__section" aria-labelledby="gallery-token-contract"><div className="rail-gallery-docs__section-heading"><div><span>04</span><h2 id="gallery-token-contract">Token contract</h2></div><p>Gallery CSS consumes Tier 3 aliases; shared child components retain their own canonical contracts.</p></div><div className="rail-gallery-docs__contract-wrap"><table className="rail-gallery-docs__contract"><thead><tr><th>Role</th><th>Tier 3 token</th><th>Canonical source</th><th>Resolved contract</th><th>Activation</th></tr></thead><tbody>{tokens.map(([role, token, source, resolved, activation]) => <tr key={token}><td>{role}</td><td><code>{token}</code></td><td><code>{source}</code></td><td>{resolved}</td><td>{activation}</td></tr>)}</tbody></table></div><p className="rail-gallery-docs__handoff">Engineering guidance: <code>RAIL_CONTENT_GALLERY_DEV_HANDOFF.md</code></p></section>
  </main>;
}
