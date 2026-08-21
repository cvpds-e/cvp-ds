import React from 'react';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import { Status } from './Status';
import './TextInputDocumentation.css';
import './MetadataDocumentation.css';

const tokenRows: ComponentTokenContractRow[] = [
  { role: 'Lifecycle text', token: '--cvp-status-text', source: '--cvp-color-text-muted', contract: 'Neutral inactive or unknown state', activation: 'tone="neutral"' },
  { role: 'Semantic state text', token: '--cvp-status-text-success / warning / danger', source: '--cvp-color-text-success / warning / danger', contract: 'Color supplements the explicit state label', activation: 'Semantic tone' },
  { role: 'Dense typography', token: '--cvp-status-font-*', source: '--cvp-font-family-mono / --cvp-font-size-xs', contract: 'Compact uppercase operational metadata', activation: 'All Status values' },
];

export function StatusDocumentation() {
  return <main className="cvp-input-doc cvp-metadata-doc">
    <header className="cvp-input-doc__hero"><div><span>Component 17 · Standardized</span><h1>Status</h1></div><div><p>A compact, non-interactive lifecycle or health indicator for operational data.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>
    <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Rail status baseline</h2><p>Status carries its meaning in text first, with semantic color providing a fast scanning cue.</p></div></header><div className="cvp-metadata-doc__live"><Status tone="success">Active</Status><Status>Inactive</Status><Status tone="warning">Pending</Status><Status tone="danger">Failed</Status></div></section>
    <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Theme parity</h2><p>Semantic foregrounds retain contrast in light and dark contexts without adding an unnecessary container.</p></div></header><div className="cvp-metadata-doc__themes"><article data-theme="dark"><span>Dark</span><div><Status tone="success">Active</Status><Status>Inactive</Status></div></article><article data-theme="light"><span>Light</span><div><Status tone="success">Active</Status><Status>Inactive</Status></div></article></div></section>
    <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Token contract</h2><p>Status owns lifecycle treatment and remains separate from selectable values and categorical Tags.</p></div></header><ComponentTokenContract label="Status token contract" rows={tokenRows} /></section>
    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>04</b><div><h2>Accessibility contract</h2></div></header><ul><li>Always include the visible state text.</li><li>Do not depend on color, icons, or placement alone.</li><li>Use non-interactive markup unless an action is explicitly required elsewhere.</li></ul></article><article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Usage decisions</h2></div></header><ul><li>Use for lifecycle, availability, validation, or health.</li><li>Use Tag for categories such as Editorial or Recommended.</li><li>Use a notification or banner for an actionable system event.</li></ul></article></section>
    <footer className="cvp-input-doc__footer"><span>CVP operational state foundation</span><p>Status · Table · Rail lifecycle · Theme parity</p></footer>
  </main>;
}
