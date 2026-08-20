import React from 'react';
import { SecondaryButton } from './SecondaryButton';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import './TextInputDocumentation.css';
import './PrimaryButtonDocumentation.css';

const tokenRows: ComponentTokenContractRow[] = [
  { role:'Background', token:'--cvp-button-secondary-bg', source:'--cvp-color-secondary-default', contract:'Secondary emphasis', activation:'Base' },
  { role:'Hover', token:'--cvp-button-secondary-bg-hover', source:'--cvp-color-secondary-hover', contract:'Stronger secondary fill', activation:':hover' },
  { role:'Pressed', token:'--cvp-button-secondary-bg-active', source:'--cvp-color-secondary-active', contract:'Active fill + 1px offset', activation:':active' },
  { role:'Label', token:'--cvp-button-secondary-text', source:'--cvp-color-text-on-brand', contract:'AA pairing', activation:'Available' },
  { role:'Focus', token:'--cvp-button-secondary-focus-ring', source:'--cvp-border-focus-ring', contract:'Border + outer halo', activation:':focus-visible' },
  { role:'Disabled surface', token:'--cvp-button-secondary-bg-disabled', source:'--cvp-color-surface-disabled', contract:'Theme resolved', activation:':disabled' },
  { role:'Standard height', token:'--cvp-button-secondary-height', source:'--cvp-space-8', contract:'32px', activation:'All Secondary Buttons' },
  { role:'Shape', token:'--cvp-button-secondary-radius', source:'--cvp-radius-sm', contract:'4px', activation:'Small / medium' },
  { role:'Motion', token:'--cvp-motion-duration-fast', source:'--cvp-primitive-duration-fast', contract:'150ms standard easing', activation:'Interactive state change' },
  { role:'Loading indicator', token:'--cvp-button-secondary-spinner-size', source:'--cvp-space-4', contract:'16px / 2px stroke', activation:'loading={true}' },
];

const states = [['Default',undefined,false,false],['Hover','hover',false,false],['Pressed','active',false,false],['Focus','focus',false,false],['Loading',undefined,false,true],['Disabled',undefined,true,false]] as const;

export function SecondaryButtonDocumentation() {
  return <main className="cvp-input-doc cvp-button-doc">
    <header className="cvp-input-doc__hero"><div><span>Component 05 · Standardized</span><h1>Secondary Button</h1></div><div><p>A supporting action with less visual emphasis than Primary, governed by the same shared CVP interaction contract.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>
    <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Anatomy and live behavior</h2><p>A native button, concise label, optional inline icon content, and reserved loading layer.</p></div></header><div className="cvp-input-doc__anatomy"><div className="cvp-input-doc__live cvp-button-doc__live"><SecondaryButton>View details</SecondaryButton></div><ol><li><b>1</b><span><strong>Root</strong> Native <code>button</code> preserves activation and disabled behavior.</span></li><li><b>2</b><span><strong>Label</strong> Short, imperative content supplies the accessible name.</span></li><li><b>3</b><span><strong>Loading layer</strong> Preserves width while exposing <code>aria-busy</code>.</span></li></ol></div></section>
    <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Complete state model</h2><p>Preview-only attributes expose otherwise transient pointer and focus states for review.</p></div></header><div className="cvp-button-doc__states">{states.map(([label,state,disabled,loading])=><article key={label}><span>{label}</span><SecondaryButton disabled={disabled} loading={loading} data-preview-state={state}>View details</SecondaryButton></article>)}</div></section>
    <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Standard size</h2><p>Secondary Button has one 32px size. Additional sizes will be introduced only when a distinct need is established.</p></div></header><div className="cvp-button-doc__sizes"><article><span>Standard · 32px</span><SecondaryButton>View details</SecondaryButton></article></div></section>
    <section className="cvp-input-doc__panel"><header><b>04</b><div><h2>Theme parity</h2><p>The same secondary hierarchy resolves consistently in each semantic theme.</p></div></header><div className="cvp-input-doc__themes"><article data-theme="dark"><span>Dark</span><SecondaryButton>Preview</SecondaryButton></article><article data-theme="light"><span>Light</span><SecondaryButton>Preview</SecondaryButton></article></div></section>
    <section className="cvp-input-doc__panel"><header><b>05</b><div><h2>Token contract</h2><p>Every visual decision resolves through a registered Tier 3 secondary-button token.</p></div></header><ComponentTokenContract label="Secondary Button token contract" rows={tokenRows}/></section>
    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Accessibility contract</h2></div></header><ul><li>Use a native button and a meaningful visible label.</li><li>Keyboard activation remains native with Enter and Space.</li><li>Focus uses the shared non-color-only ring.</li><li>Loading sets <code>aria-busy</code> and prevents repeat activation without adopting disabled visual styling.</li><li>Reduced motion uses the spinner’s static partial-indicator fallback.</li></ul></article><article className="cvp-input-doc__panel"><header><b>07</b><div><h2>Usage decisions</h2></div></header><ul><li>Use for supporting actions beside or below Primary.</li><li>Multiple Secondary actions may appear when hierarchy remains clear.</li><li>Do not use it to compete visually with the main action.</li><li>Prefer short imperative labels such as “View details”.</li><li>Use Outline or Text when even less emphasis is needed.</li></ul></article></section>
    <footer className="cvp-input-doc__footer"><span>CVP button family reference</span><p>Native button · Canonical tokens · Loading · Themes · States</p></footer>
  </main>;
}
