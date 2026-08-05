import React, { useState } from 'react';
import { TextInput } from './TextInput';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import './TextInputDocumentation.css';

const tokenRows: ComponentTokenContractRow[] = [
  { role:'Surface', token:'--cvp-input-bg', source:'--cvp-color-surface-default', contract:'Theme resolved', activation:'Base / read-write' },
  { role:'Text', token:'--cvp-input-text', source:'--cvp-color-text-primary', contract:'14px / 20px', activation:'Value present' },
  { role:'Placeholder', token:'--cvp-input-placeholder', source:'--cvp-color-text-placeholder', contract:'AA in both themes', activation:'::placeholder' },
  { role:'Boundary', token:'--cvp-input-border', source:'--cvp-color-input-border', contract:'1px base', activation:'Base' },
  { role:'Hover', token:'--cvp-input-border-hover', source:'--cvp-focus-border-color', contract:'Stronger boundary', activation:':hover:not(:disabled)' },
  { role:'Focus', token:'--cvp-input-focus-ring', source:'--cvp-border-focus-ring', contract:'Border + outer halo', activation:':focus-visible' },
  { role:'Invalid', token:'--cvp-input-error-ring', source:'--cvp-border-error-ring', contract:'Error border + halo', activation:'[data-invalid]' },
  { role:'Default height', token:'--cvp-input-height', source:'--cvp-space-800', contract:'40px', activation:'size="default"' },
  { role:'Compact height', token:'--cvp-input-height-compact', source:'--cvp-space-8', contract:'32px', activation:'size="compact"' },
  { role:'Shape', token:'--cvp-input-radius', source:'--cvp-shape-control-base', contract:'6px', activation:'All states' },
  { role:'Inline inset', token:'--cvp-input-padding-x', source:'--cvp-space-3', contract:'12px', activation:'Default density' },
  { role:'Motion', token:'--cvp-input-transition', source:'--cvp-motion-duration-fast', contract:'150ms standard easing', activation:'State transition' },
];

function StateSet() {
  return (
    <div className="cvp-input-doc__states">
      <TextInput label="Default" placeholder="Enter a project name" helperText="Use a clear, recognisable name." />
      <TextInput label="Hover" placeholder="Pointer is over the control" data-preview-state="hover" />
      <TextInput label="Focus" defaultValue="Quarterly planning" data-preview-state="focus" />
      <TextInput label="Filled" defaultValue="Customer value proposition" />
      <TextInput label="Read only" value="Published configuration" readOnly />
      <TextInput label="Required" placeholder="name@example.com" required helperText="Required fields retain the native constraint." />
      <TextInput label="Invalid" defaultValue="invalid-email" error="Enter an email address in the format name@example.com." />
      <TextInput label="Disabled" value="Unavailable value" disabled helperText="Explain why a field is unavailable nearby." />
    </div>
  );
}

export function TextInputDocumentation() {
  const [value, setValue] = useState('');

  return (
    <main className="cvp-input-doc">
      <header className="cvp-input-doc__hero">
        <div>
          <span>Component 01 · Standardized</span>
          <h1>Text Input</h1>
        </div>
        <div>
          <p>A theme-aware field pattern for collecting short-form text with persistent labels, clear validation, and native form semantics.</p>
          <span className="cvp-input-doc__status">Ready for implementation</span>
        </div>
      </header>

      <section className="cvp-input-doc__panel">
        <header><b>01</b><div><h2>Anatomy</h2><p>Label, native control, and support message remain one programmatic field.</p></div></header>
        <div className="cvp-input-doc__anatomy">
          <div className="cvp-input-doc__live">
            <TextInput
              label="Workspace name"
              optionalText="Optional"
              placeholder="For example, Acme UK"
              helperText="Shown to collaborators throughout the workspace."
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <ol>
            <li><b>1</b><span><strong>Label</strong> Never replaced by placeholder text.</span></li>
            <li><b>2</b><span><strong>Control</strong> Native input preserves platform interaction.</span></li>
            <li><b>3</b><span><strong>Support</strong> Helper or error is associated using <code>aria-describedby</code>.</span></li>
          </ol>
        </div>
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>02</b><div><h2>Complete state model</h2><p>Interaction and validation states use the same anatomy in both themes.</p></div></header>
        <StateSet />
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>03</b><div><h2>Theme parity</h2><p>Component tokens resolve through semantic light and dark values.</p></div></header>
        <div className="cvp-input-doc__themes">
          <article data-theme="dark"><span>Dark</span><TextInput label="Email address" defaultValue="alex@example.com" helperText="We will only use this for account access." /></article>
          <article data-theme="light"><span>Light</span><TextInput label="Email address" defaultValue="alex@example.com" helperText="We will only use this for account access." /></article>
        </div>
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>04</b><div><h2>Density</h2><p>Default is the product standard; compact is reserved for dense data tooling.</p></div></header>
        <div className="cvp-input-doc__density">
          <TextInput label="Default · 40px" placeholder="Standard forms and workflows" />
          <TextInput size="compact" label="Compact · 32px" placeholder="Dense tables and filters only" />
        </div>
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>05</b><div><h2>Token contract</h2><p>No component value reaches directly into a raw color primitive.</p></div></header>
        <ComponentTokenContract label="Text Input token contract" rows={tokenRows} />
      </section>

      <section className="cvp-input-doc__grid">
        <article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Accessibility contract</h2></div></header><ul><li>Use a persistent visible label.</li><li>Native <code>required</code>, <code>disabled</code>, and <code>readOnly</code> semantics are preserved.</li><li>Errors set <code>aria-invalid</code> and announce through <code>role="alert"</code>.</li><li>Focus is visible without relying on color alone.</li><li>Instructions appear before submission whenever possible.</li></ul></article>
        <article className="cvp-input-doc__panel"><header><b>07</b><div><h2>Usage decisions</h2></div></header><ul><li>Use Text Area for multi-line answers.</li><li>Do not encode formatting rules only in a placeholder.</li><li>Validate on blur or submission, not on every keystroke.</li><li>Keep the entered value when validation fails.</li><li>Explain disabled fields in surrounding content.</li></ul></article>
      </section>

      <footer className="cvp-input-doc__footer"><span>CVP component architecture</span><p>Canonical tokens · Light/dark · Keyboard · Validation · Responsive</p></footer>
    </main>
  );
}
