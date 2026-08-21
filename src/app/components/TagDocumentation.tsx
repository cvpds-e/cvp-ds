import React from 'react';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import { Tag } from './Tag';
import './TextInputDocumentation.css';
import './MetadataDocumentation.css';

const tokenRows: ComponentTokenContractRow[] = [
  { role: 'Metadata surface', token: '--cvp-tag-bg / --cvp-tag-border', source: '--cvp-color-surface-subtle / --cvp-color-border-default', contract: 'Quiet categorical container', activation: 'All Tags' },
  { role: 'Category foreground', token: '--cvp-tag-text-*', source: 'Semantic muted, link, accent, success, warning text', contract: 'Neutral, Info, Accent, Success, Warning', activation: 'tone' },
  { role: 'Dense geometry', token: '--cvp-tag-height / --cvp-tag-padding-x', source: '--cvp-space-6 / --cvp-space-2', contract: '24px compact table metadata', activation: 'All Tags' },
];

export function TagDocumentation() {
  return <main className="cvp-input-doc cvp-metadata-doc">
    <header className="cvp-input-doc__hero"><div><span>Component 16 · Standardized</span><h1>Tag</h1></div><div><p>A compact, non-interactive label for categorical metadata such as rail type, collection, or classification.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>
    <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Semantic color baseline</h2><p>Tags preserve dense table scanning without implying selection, removal, or an action. Use neutral for open-ended identities such as collections; choose a tone only when it expresses a shared meaning.</p></div></header><div className="cvp-metadata-doc__live"><Tag>Home</Tag><Tag>Drama</Tag><Tag tone="info">Recommended</Tag><Tag tone="accent">Editorial</Tag><Tag tone="warning">Needs review</Tag></div></section>
    <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Theme parity</h2><p>Neutral identity tags and semantic foregrounds resolve consistently in both themes.</p></div></header><div className="cvp-metadata-doc__themes"><article data-theme="dark"><span>Dark</span><div><Tag>Documentary</Tag><Tag tone="info">Recommended</Tag><Tag tone="accent">Editorial</Tag><Tag tone="warning">Needs review</Tag></div></article><article data-theme="light"><span>Light</span><div><Tag>Documentary</Tag><Tag tone="info">Recommended</Tag><Tag tone="accent">Editorial</Tag><Tag tone="warning">Needs review</Tag></div></article></div></section>
    <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Token contract</h2><p>Tag owns taxonomy presentation; parents supply the category and never override its visual roles.</p></div></header><ComponentTokenContract label="Tag token contract" rows={tokenRows} /></section>
    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>04</b><div><h2>Accessibility contract</h2></div></header><ul><li>Render the category as text; color is supplementary.</li><li>Do not add button, link, selection, or removal behavior.</li><li>Use a concise label and allow the parent table cell to provide context.</li></ul></article><article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Usage decisions</h2></div></header><ul><li>Use neutral for collection identity, including catalogs with many collections.</li><li>Use semantic tones only for stable, shared meanings—for example Info for Recommended and Accent for Editorial.</li><li>Use Pill for selected input values and Status for lifecycle, availability, and health.</li></ul></article></section>
    <footer className="cvp-input-doc__footer"><span>CVP categorical metadata foundation</span><p>Tag · Table · Rail Type · Theme parity</p></footer>
  </main>;
}
