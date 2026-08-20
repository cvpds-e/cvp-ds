import React from 'react';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import { RailContentGallery } from './RailContentGallery';
import { Skeleton, SkeletonRailCards } from './Skeleton';
import { Table } from './Table';
import './TextInputDocumentation.css';
import './SkeletonDocumentation.css';

const tokenRows: ComponentTokenContractRow[] = [
  { role: 'Base surface', token: '--cvp-skeleton-bg', source: '--cvp-color-surface-subtle', contract: 'Low-emphasis placeholder surface', activation: 'All loading states' },
  { role: 'Shimmer highlight', token: '--cvp-skeleton-highlight', source: '--cvp-color-surface-active', contract: 'Subtle moving contrast layer', activation: 'Motion allowed' },
  { role: 'Shape', token: '--cvp-skeleton-radius', source: '--cvp-radius-sm', contract: 'Default placeholder corner treatment', activation: 'Base primitive' },
  { role: 'Motion', token: '--cvp-skeleton-motion-{duration,easing}', source: '--cvp-motion-*', contract: 'Shared motion contract; disabled for reduced motion', activation: 'Motion allowed' },
  { role: 'Composition', token: '--cvp-skeleton-{gap,line-height,table-row-height}', source: '--cvp-space-*', contract: 'Density-aligned table and rail patterns', activation: 'Composite patterns' },
];

const tableColumns = [
  { id: 'title', label: 'Title', width: '42%' },
  { id: 'collection', label: 'Collection', width: '32%' },
  { id: 'updated', label: 'Updated', width: '26%' },
];

export function SkeletonDocumentation() {
  return <main className="cvp-input-doc cvp-skeleton-doc">
    <header className="cvp-input-doc__hero"><div><span>Component · Standardized</span><h1>Skeleton</h1></div><div><p>A shared, theme-aware placeholder for content that is loading in tables, rails, galleries, and other structured content areas.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>

    <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Primitive and composition</h2><p>Use the base primitive for a single unknown shape; use a matching composition when the pending layout is already known.</p></div></header><div className="cvp-skeleton-doc__primitives"><article><span>Text</span><Skeleton width="68%" height="var(--cvp-skeleton-line-height)" /><Skeleton width="44%" height="var(--cvp-skeleton-line-height)" /></article><article><span>Control</span><Skeleton height="var(--cvp-space-8)" radius="md" /></article><article><span>Avatar</span><Skeleton width="var(--cvp-space-8)" height="var(--cvp-space-8)" radius="pill" /></article></div></section>

    <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Rail and gallery loading</h2><p>Keep the intended card geometry, count, and spacing visible while titles, imagery, and metadata resolve.</p></div></header><SkeletonRailCards count={6} /></section>

    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>03</b><div><h2>Table loading</h2><p>Rows preserve the table structure, including column alignment and density.</p></div></header><Table columns={tableColumns} data={[]} loading showActions={false} showSettings={false} showViewControl={false} showPagination={false} height="260px" ariaLabel="Skeleton table example" /></article><article className="cvp-input-doc__panel"><header><b>04</b><div><h2>Rail gallery loading</h2><p>The gallery uses the same card composition in its loading state.</p></div></header><RailContentGallery title="Trending" items={[]} loading showNavigation={false} /></article></section>

    <section className="cvp-input-doc__panel"><header><b>05</b><div><h2>Token contract</h2><p>Skeleton aliases remain role-based, so both themes resolve their own surface and motion values.</p></div></header><ComponentTokenContract label="Skeleton token contract" rows={tokenRows} /></section>

    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Implementation rules</h2></div></header><ul><li>Show skeletons only while content is actively loading.</li><li>Match the layout users will receive; do not invent a different loading layout.</li><li>Replace the skeleton with an empty state only after loading completes without results.</li></ul></article><article className="cvp-input-doc__panel"><header><b>07</b><div><h2>Accessibility</h2></div></header><ul><li>Mark decorative shapes as hidden from assistive technology.</li><li>Provide one concise loading status for the containing region.</li><li>Respect reduced-motion preferences by removing the shimmer animation.</li></ul></article></section>
  </main>;
}
