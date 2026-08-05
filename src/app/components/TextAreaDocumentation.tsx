import React, { useState } from 'react';
import { TextArea } from './TextArea';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import './TextInputDocumentation.css';

const textAreaTokenRows: ComponentTokenContractRow[] = [
  { role:'Surface', token:'--cvp-input-bg', source:'--cvp-color-surface-default', contract:'Theme resolved', activation:'Base / read-write' },
  { role:'Boundary', token:'--cvp-input-border', source:'--cvp-color-input-border', contract:'1px base', activation:'Base' },
  { role:'Focus', token:'--cvp-input-focus-ring', source:'--cvp-border-focus-ring', contract:'Border + outer halo', activation:':focus-visible' },
  { role:'Invalid', token:'--cvp-input-error-ring', source:'--cvp-border-error-ring', contract:'Error border + halo', activation:'[data-invalid]' },
  { role:'Minimum height', token:'--cvp-textarea-min-height', source:'--cvp-space-1200', contract:'96px', activation:'All resize modes' },
  { role:'Inset', token:'--cvp-textarea-padding', source:'--cvp-space-3', contract:'12px', activation:'Control content' },
  { role:'Typography', token:'--cvp-input-font-size', source:'--cvp-font-size-md', contract:'14px / 20px', activation:'Value and placeholder' },
  { role:'Support text', token:'--cvp-input-support-size', source:'--cvp-font-size-xs', contract:'12px / 16px', activation:'Helper, error, counter' },
];

export function TextAreaDocumentation() {
  const [value,setValue]=useState('');
  return <main className="cvp-input-doc">
    <header className="cvp-input-doc__hero"><div><span>Component 02 · Standardized</span><h1>Text Area</h1></div><div><p>Multi-line input that inherits the CVP field contract while protecting long-form entry, resizing, and character limits.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>
    <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Anatomy and live behavior</h2><p>The counter supplements—but never replaces—clear length guidance.</p></div></header><div className="cvp-input-doc__anatomy"><div className="cvp-input-doc__live"><TextArea label="Internal note" optionalText="Optional" placeholder="Add context for collaborators" helperText="Do not include sensitive personal information." maxLength={240} showCharacterCount value={value} onChange={e=>setValue(e.target.value)}/></div><ol><li><b>1</b><span><strong>Label row</strong> Label, requirement status, and optional character count.</span></li><li><b>2</b><span><strong>Input area</strong> Native textarea with vertical resizing by default.</span></li><li><b>3</b><span><strong>Support</strong> Guidance or actionable validation message.</span></li></ol></div></section>
    <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Complete state model</h2><p>Text Area shares field states with Text Input.</p></div></header><div className="cvp-input-doc__states"><TextArea label="Default" placeholder="Enter supporting context"/><TextArea label="Hover" data-preview-state="hover" defaultValue="Pointer state"/><TextArea label="Focus" data-preview-state="focus" defaultValue="Keyboard focus"/><TextArea label="Read only" readOnly value="Approved copy cannot be edited."/><TextArea label="Required" required helperText="Add a reason before continuing."/><TextArea label="Invalid" defaultValue="Too short" error="Provide at least 20 characters of useful context."/><TextArea label="Disabled" disabled value="Unavailable content"/><TextArea label="Fixed resize" resize="none" defaultValue="Resize is intentionally disabled in constrained layouts."/></div></section>
    <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Theme parity</h2><p>Surface, text, boundary, focus, and validation all resolve semantically.</p></div></header><div className="cvp-input-doc__themes"><article data-theme="dark"><span>Dark</span><TextArea label="Summary" defaultValue="Theme-resolved content" helperText="Vertical resize remains available."/></article><article data-theme="light"><span>Light</span><TextArea label="Summary" defaultValue="Theme-resolved content" helperText="Vertical resize remains available."/></article></div></section>
    <section className="cvp-input-doc__panel"><header><b>04</b><div><h2>Token contract</h2><p>Text Area extends the shared field contract without bypassing semantic roles.</p></div></header><ComponentTokenContract label="Text Area token contract" rows={textAreaTokenRows}/></section>
    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Accessibility contract</h2></div></header><ul><li>Native textarea and resize behavior are preserved.</li><li>Label, helper, error, and counter IDs are composed.</li><li>Character limits use native <code>maxLength</code>.</li><li>Errors are announced and retain entered content.</li><li>Instructions precede the point of failure.</li></ul></article><article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Usage decisions</h2></div></header><ul><li>Use Text Input for short, single-line values.</li><li>Keep vertical resizing unless layout constraints prohibit it.</li><li>Do not impose arbitrary short limits.</li><li>Describe content expectations, not only character count.</li><li>Never clear content after validation fails.</li></ul></article></section>
    <footer className="cvp-input-doc__footer"><span>CVP form-control family</span><p>Canonical tokens · Long-form entry · Resize · Character limits</p></footer>
  </main>;
}
