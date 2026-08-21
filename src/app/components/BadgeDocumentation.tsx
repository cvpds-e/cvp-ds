import React from 'react';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import { Badge } from './Badge';
import './TextInputDocumentation.css';
import './MetadataDocumentation.css';

const tokenRows: ComponentTokenContractRow[] = [
  { role: 'Metadata surface', token: '--cvp-badge-bg / --cvp-badge-border', source: '--cvp-color-surface-subtle / --cvp-color-border-default', contract: 'Quiet categorical container', activation: 'All Badges' },
  { role: 'Category foreground', token: '--cvp-badge-text-*', source: 'Semantic muted, link, accent, success, warning text', contract: 'Neutral, Info, Accent, Success, Warning', activation: 'tone' },
  { role: 'Dense geometry', token: '--cvp-badge-height / --cvp-badge-padding-x', source: '--cvp-space-6 / --cvp-space-2', contract: '24px compact table metadata', activation: 'All Badges' },
];

export function BadgeDocumentation() {
  return <main className="cvp-input-doc cvp-metadata-doc">
    <header className="cvp-input-doc__hero"><div><span>Component 16 · Standardized</span><h1>Badge</h1></div><div><p>A compact, non-interactive label for categorical metadata such as rail type, collection, or classification.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>
    <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Semantic color baseline</h2><p>Badges preserve dense table scanning without implying selection, removal, or an action. Use neutral for open-ended identities such as collections; choose a tone only when it expresses a shared meaning.</p></div></header><div className="cvp-metadata-doc__live"><Badge>Home</Badge><Badge>Drama</Badge><Badge tone="info">Recommended</Badge><Badge tone="accent">Editorial</Badge><Badge tone="warning">Needs review</Badge></div></section>
    <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Theme parity</h2><p>Neutral identity badges and semantic foregrounds resolve consistently in both themes.</p></div></header><div className="cvp-metadata-doc__themes"><article data-theme="dark"><span>Dark</span><div><Badge>Documentary</Badge><Badge tone="info">Recommended</Badge><Badge tone="accent">Editorial</Badge><Badge tone="warning">Needs review</Badge></div></article><article data-theme="light"><span>Light</span><div><Badge>Documentary</Badge><Badge tone="info">Recommended</Badge><Badge tone="accent">Editorial</Badge><Badge tone="warning">Needs review</Badge></div></article></div></section>
    <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Token contract</h2><p>Badge owns taxonomy presentation; parents supply the category and never override its visual roles.</p></div></header><ComponentTokenContract label="Badge token contract" rows={tokenRows} /></section>
    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>04</b><div><h2>Accessibility contract</h2></div></header><ul><li>Render the category as text; color is supplementary.</li><li>Do not add button, link, selection, or removal behavior.</li><li>Use a concise label and allow the parent table cell to provide context.</li></ul></article><article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Usage decisions</h2></div></header><ul><li>Use neutral for collection identity, including catalogs with many collections.</li><li>Use semantic tones only for stable, shared meanings—for example Info for Recommended and Accent for Editorial.</li><li>Use Pill for selected input values, Tag Filter for filtering, and Status for lifecycle, availability, and health.</li></ul></article></section>
    <footer className="cvp-input-doc__footer"><span>CVP categorical metadata foundation</span><p>Badge · Table · Rail Type · Theme parity</p></footer>
  </main>;
}
