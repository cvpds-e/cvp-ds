import React from 'react';
import { PrimaryButton } from './PrimaryButton';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import './TextInputDocumentation.css';
import './PrimaryButtonDocumentation.css';

const tokenRows: ComponentTokenContractRow[] = [
  { role:'Background', token:'--cvp-button-primary-bg', source:'--cvp-color-brand-default', contract:'Royal Blue', activation:'Base' },
  { role:'Hover', token:'--cvp-button-primary-bg-hover', source:'--cvp-color-brand-hover', contract:'Darker brand fill', activation:':hover' },
  { role:'Pressed', token:'--cvp-button-primary-bg-active', source:'--cvp-color-brand-active', contract:'Active brand fill + 1px offset', activation:':active' },
  { role:'Label', token:'--cvp-button-primary-text', source:'--cvp-color-text-on-brand', contract:'AA/AAA pairing', activation:'Available' },
  { role:'Focus', token:'--cvp-button-primary-focus-ring', source:'--cvp-border-focus-ring', contract:'Border + outer halo', activation:':focus-visible' },
  { role:'Disabled surface', token:'--cvp-button-primary-bg-disabled', source:'--cvp-color-surface-disabled', contract:'Theme resolved', activation:':disabled' },
  { role:'Default height', token:'--cvp-button-primary-height', source:'--cvp-space-800', contract:'40px', activation:'size="medium"' },
  { role:'Small height', token:'--cvp-button-primary-height-small', source:'--cvp-space-8', contract:'32px', activation:'size="small"' },
  { role:'Large height', token:'--cvp-button-primary-height-large', source:'--cvp-space-900', contract:'48px', activation:'size="large"' },
  { role:'Shape', token:'--cvp-button-primary-radius', source:'--cvp-shape-control-compact', contract:'4px', activation:'Small / medium' },
  { role:'Motion', token:'--cvp-motion-duration-fast', source:'--cvp-primitive-duration-fast', contract:'150ms standard easing', activation:'Interactive state change' },
  { role:'Loading indicator', token:'--cvp-button-primary-spinner-size', source:'--cvp-space-4', contract:'16px / 2px stroke', activation:'loading={true}' },
];

const states = [
  ['Default', undefined, false, false],
  ['Hover', 'hover', false, false],
  ['Pressed', 'active', false, false],
  ['Focus', 'focus', false, false],
  ['Loading', undefined, false, true],
  ['Disabled', undefined, true, false],
] as const;

export function PrimaryButtonDocumentation() {
  return <main className="cvp-input-doc cvp-button-doc">
    <header className="cvp-input-doc__hero">
      <div><span>Component 04 · Standardized</span><h1>Primary Button</h1></div>
      <div><p>The single highest-emphasis action within a page, panel, or dialog—now governed by the shared CVP button contract.</p><span className="cvp-input-doc__status">Ready for implementation</span></div>
    </header>

    <section className="cvp-input-doc__panel">
      <header><b>01</b><div><h2>Anatomy and live behavior</h2><p>A native button, concise label, optional inline icon content, and reserved loading layer.</p></div></header>
      <div className="cvp-input-doc__anatomy">
        <div className="cvp-input-doc__live cvp-button-doc__live"><PrimaryButton>Save changes</PrimaryButton></div>
        <ol><li><b>1</b><span><strong>Root</strong> Native <code>button</code> preserves activation and disabled behavior.</span></li><li><b>2</b><span><strong>Label</strong> Short, imperative content supplies the accessible name.</span></li><li><b>3</b><span><strong>Loading layer</strong> Preserves width while exposing <code>aria-busy</code>.</span></li></ol>
      </div>
    </section>

    <section className="cvp-input-doc__panel">
      <header><b>02</b><div><h2>Complete state model</h2><p>Preview-only attributes expose otherwise transient pointer and focus states for review.</p></div></header>
      <div className="cvp-button-doc__states">{states.map(([label,state,disabled,loading])=><article key={label}><span>{label}</span><PrimaryButton disabled={disabled} loading={loading} data-preview-state={state}>Publish rail</PrimaryButton></article>)}</div>
    </section>

    <section className="cvp-input-doc__panel">
      <header><b>03</b><div><h2>Sizes and density</h2><p>Medium is the default; small and compact are reserved for dense desktop tooling.</p></div></header>
      <div className="cvp-button-doc__sizes"><article><span>Small · 32px</span><PrimaryButton size="small">Add item</PrimaryButton></article><article><span>Medium · 40px</span><PrimaryButton>Save changes</PrimaryButton></article><article><span>Large · 48px</span><PrimaryButton size="large">Continue</PrimaryButton></article><article><span>Compact · 32px</span><PrimaryButton variant="compact">Apply</PrimaryButton></article></div>
    </section>

    <section className="cvp-input-doc__panel">
      <header><b>04</b><div><h2>Theme parity</h2><p>The same component contract resolves against each semantic theme.</p></div></header>
      <div className="cvp-input-doc__themes"><article data-theme="dark"><span>Dark</span><PrimaryButton>Publish rail</PrimaryButton></article><article data-theme="light"><span>Light</span><PrimaryButton>Publish rail</PrimaryButton></article></div>
    </section>

    <section className="cvp-input-doc__panel">
      <header><b>05</b><div><h2>Token contract</h2><p>Every visual decision resolves through a registered Tier 3 button token.</p></div></header>
      <ComponentTokenContract label="Primary Button token contract" rows={tokenRows}/>
    </section>

    <section className="cvp-input-doc__grid">
      <article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Accessibility contract</h2></div></header><ul><li>Use a native button and a meaningful visible label.</li><li>Keyboard activation remains native with Enter and Space.</li><li>Focus uses the shared non-color-only ring.</li><li>Loading sets <code>aria-busy</code> and prevents repeat activation.</li><li>Reduced motion slows the spinner and removes state transitions.</li></ul></article>
      <article className="cvp-input-doc__panel"><header><b>07</b><div><h2>Usage decisions</h2></div></header><ul><li>Use once per action group or major surface.</li><li>Use Secondary or Outline for supporting actions.</li><li>Do not use Primary for destructive confirmation.</li><li>Prefer short imperative labels such as “Save changes”.</li><li>Use Icon Button when no visible text label is appropriate.</li></ul></article>
    </section>

    <footer className="cvp-input-doc__footer"><span>CVP button family reference</span><p>Native button · Canonical tokens · Loading · Themes · States</p></footer>
  </main>;
}
