import React from 'react';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import { MultiSelect } from './MultiSelect';
import { Pill } from './Pill';
import './TextInputDocumentation.css';
import './PillDocumentation.css';

const options = [
  { value: 'editorial', label: 'Editorial' },
  { value: 'featured', label: 'Featured' },
];

const tokenRows: ComponentTokenContractRow[] = [
  { role: 'Selected-value surface', token: '--cvp-pill-bg', source: '--cvp-color-brand-default', contract: 'Brand selected-value surface', activation: 'All pills' },
  { role: 'Selected-value text', token: '--cvp-pill-text', source: '--cvp-color-text-on-brand', contract: '4.5:1 minimum', activation: 'All pills' },
  { role: 'Multi Select surface alias', token: '--cvp-multi-select-tag-bg', source: '--cvp-pill-bg', contract: 'Uses the Pill foundation', activation: 'Selected Multi Select value' },
  { role: 'Multi Select text alias', token: '--cvp-multi-select-tag-text', source: '--cvp-pill-text', contract: 'Uses the Pill foundation', activation: 'Selected Multi Select value' },
  { role: 'Removal affordance', token: '--cvp-pill-remove-*', source: '--cvp-color-interactive-overlay-*', contract: 'Compact, keyboard-focusable removal action', activation: 'When onRemove is supplied' },
];

export function PillDocumentation() {
  return (
    <main className="cvp-input-doc cvp-pill-doc">
      <header className="cvp-input-doc__hero">
        <div><span>Component 14 · Standardized</span><h1>Pill</h1></div>
        <div><p>The shared selected-value treatment used by Multi Select and available as a standalone primitive for other composed controls.</p><span className="cvp-input-doc__status">Ready for implementation</span></div>
      </header>

      <section className="cvp-input-doc__panel">
        <header><b>01</b><div><h2>Shared anatomy</h2><p>Pill owns a visible value and an optional named removal action; its parent owns all selection behaviour.</p></div></header>
        <div className="cvp-input-doc__anatomy">
          <div className="cvp-input-doc__live cvp-pill-doc__live"><Pill onRemove={() => undefined} removeLabel="Remove Editorial">Editorial</Pill></div>
          <ol><li><b>1</b><span><strong>Value label</strong> Truncates within its available width without changing the selected value.</span></li><li><b>2</b><span><strong>Remove action</strong> Appears only when the parent provides <code>onRemove</code> and has a specific accessible name.</span></li><li><b>3</b><span><strong>Composition boundary</strong> Search, menus, limits, validation, and announcements stay with the parent control.</span></li></ol>
        </div>
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>02</b><div><h2>Multi Select baseline</h2><p>The standalone representation and the selected value in Multi Select use the same Pill markup, CSS, and base tokens.</p></div></header>
        <div className="cvp-pill-doc__comparison">
          <article><span className="cvp-pill-doc__caption">Standalone Pill</span><Pill onRemove={() => undefined} removeLabel="Remove Editorial">Editorial</Pill></article>
          <article><span className="cvp-pill-doc__caption">Multi Select selected value</span><MultiSelect label="Content labels" options={options} defaultValue={['editorial']} allowCreate={false} /></article>
        </div>
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>03</b><div><h2>Theme parity</h2><p>The shared semantic tokens keep the selected value legible in both themes.</p></div></header>
        <div className="cvp-input-doc__themes">
          <article data-theme="dark"><span>Dark</span><div><Pill onRemove={() => undefined} removeLabel="Remove Editorial">Editorial</Pill></div></article>
          <article data-theme="light"><span>Light</span><div><Pill onRemove={() => undefined} removeLabel="Remove Editorial">Editorial</Pill></div></article>
        </div>
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>04</b><div><h2>Token contract</h2><p>Multi Select retains documented aliases, but each selected-value role resolves from the shared Pill foundation.</p></div></header>
        <ComponentTokenContract label="Pill token contract" rows={tokenRows} />
      </section>

      <section className="cvp-input-doc__grid">
        <article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Accessibility contract</h2></div></header><ul><li>Use a specific accessible name for every removal action.</li><li>Keep the value in text; color only adds emphasis.</li><li>Removal uses a native button and retains visible keyboard focus.</li><li>Do not render a removal action when the parent cannot remove the value.</li></ul></article>
        <article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Usage decisions</h2></div></header><ul><li>Use for a compact, persistent selected value in a composed control.</li><li>Use Multi Select when values need search, a menu, limits, or form semantics.</li><li>Do not use as a primary action, toggle, status-only badge, or tag filter option.</li><li>Keep it intrinsic-width; its parent may impose a maximum width when needed.</li></ul></article>
      </section>

      <footer className="cvp-input-doc__footer"><span>CVP selected-value foundation</span><p>Pill · Multi Select · Tokens · Keyboard · Theme parity</p></footer>
    </main>
  );
}
