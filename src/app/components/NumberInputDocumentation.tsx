import React, { useState } from 'react';
import { NumberInput } from './NumberInput';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import './TextInputDocumentation.css';

const tokenRows: ComponentTokenContractRow[] = [
  { role:'Field surface', token:'--cvp-input-bg', source:'--cvp-color-surface-default', contract:'Theme resolved', activation:'Read/write' },
  { role:'Text and value', token:'--cvp-input-text', source:'--cvp-color-text-primary', contract:'14px / 20px', activation:'Value present' },
  { role:'Boundary', token:'--cvp-input-border', source:'--cvp-color-input-border', contract:'1px base', activation:'Default' },
  { role:'Focus', token:'--cvp-input-focus-ring', source:'--cvp-border-focus-ring', contract:'Visible border + halo', activation:':focus-visible' },
  { role:'Disabled', token:'--cvp-input-text-disabled', source:'--cvp-color-text-disabled', contract:'Opaque semantic contrast', activation:':disabled' },
  { role:'Default height', token:'--cvp-input-height', source:'--cvp-space-800', contract:'40px', activation:'size="default"' },
  { role:'Compact height', token:'--cvp-input-height-compact', source:'--cvp-space-8', contract:'32px', activation:'size="compact"' },
];

export function NumberInputDocumentation() {
  const [slots, setSlots] = useState<number | ''>(10);
  return <main className="cvp-input-doc">
    <header className="cvp-input-doc__hero"><div><span>Component 03 · Standardized</span><h1>Number Input</h1></div><div><p>A numeric field with native number semantics and compact step controls for quantities, positions, and limits.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>
    <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Anatomy and live behavior</h2><p>Use it when a value is numerical and step changes are useful.</p></div></header><div className="cvp-input-doc__anatomy"><div className="cvp-input-doc__live"><NumberInput label="Content slots" min={1} max={24} value={slots} onValueChange={setSlots} helperText="Choose between 1 and 24 slots." /></div><ol><li><b>1</b><span><strong>Label</strong> States the quantity and unit.</span></li><li><b>2</b><span><strong>Native numeric field</strong> Supports keyboard entry and native validation.</span></li><li><b>3</b><span><strong>Step controls</strong> Provide precise incremental changes without replacing typing.</span></li></ol></div></section>
    <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Complete state model</h2><p>Number Input inherits the shared input contract, including contrast-safe disabled states.</p></div></header><div className="cvp-input-doc__states"><NumberInput label="Default" placeholder="Enter a position" min={1}/><NumberInput label="Hover" defaultValue={10} data-preview-state="hover"/><NumberInput label="Focus" defaultValue={10} data-preview-state="focus"/><NumberInput label="Required" required min={1} helperText="Set the number of visible content slots."/><NumberInput label="Invalid" defaultValue={0} error="Enter a value of at least 1." min={1}/><NumberInput label="Disabled" value={24} disabled helperText="This value is managed by the rail collection."/><NumberInput label="Read only" value={10} readOnly/></div></section>
    <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Theme parity</h2><p>Disabled text, boundaries, and icons use opaque semantic tokens in both themes.</p></div></header><div className="cvp-input-doc__themes"><article data-theme="dark"><span>Dark</span><NumberInput label="Rail position" value={2} disabled /></article><article data-theme="light"><span>Light</span><NumberInput label="Rail position" value={2} disabled /></article></div></section>
    <section className="cvp-input-doc__panel"><header><b>04</b><div><h2>Token contract</h2><p>Number Input extends the shared input contract; it does not introduce a parallel colour or spacing system.</p></div></header><ComponentTokenContract label="Number Input token contract" rows={tokenRows}/></section>
    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Accessibility contract</h2></div></header><ul><li>Use the native numeric input for numeric values.</li><li>Keep a visible label and describe the unit in helper text where needed.</li><li>Disable both typing and step controls together.</li><li>Disabled states retain readable semantic text and icon contrast without opacity reduction.</li></ul></article><article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Usage decisions</h2></div></header><ul><li>Use for counts, positions, limits, and other quantities.</li><li>Set sensible <code>min</code>, <code>max</code>, and <code>step</code> values.</li><li>Use Text Input for identifiers that only look numeric.</li><li>Do not use it for dates, phone numbers, or account codes.</li></ul></article></section>
    <footer className="cvp-input-doc__footer"><span>CVP form-control family</span><p>Native number semantics · Step controls · Shared field tokens</p></footer>
  </main>;
}
