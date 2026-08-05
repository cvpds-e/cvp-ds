import React, { useState } from 'react';
import { Select, SelectOption } from './Select';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import './TextInputDocumentation.css';

const options:SelectOption[]=[{value:'audience',label:'Audience insights'},{value:'content',label:'Content performance'},{value:'revenue',label:'Revenue reporting'},{value:'legacy',label:'Legacy workspace',disabled:true}];

const selectTokenRows: ComponentTokenContractRow[] = [
  { role:'Trigger surface', token:'--cvp-select-bg', source:'--cvp-input-bg', contract:'Theme resolved', activation:'Base' },
  { role:'Trigger boundary', token:'--cvp-select-border', source:'--cvp-input-border', contract:'1px base', activation:'Base' },
  { role:'Focus', token:'--cvp-select-focus-ring', source:'--cvp-input-focus-ring', contract:'Border + outer halo', activation:':focus-visible' },
  { role:'Default height', token:'--cvp-select-height', source:'--cvp-input-height', contract:'40px', activation:'size="default"' },
  { role:'Compact height', token:'--cvp-select-height-compact', source:'--cvp-input-height-compact', contract:'32px', activation:'size="compact"' },
  { role:'Popup surface', token:'--cvp-select-popup-bg', source:'--cvp-menu-bg', contract:'Overlay plane', activation:'aria-expanded="true"' },
  { role:'Popup elevation', token:'--cvp-select-popup-shadow', source:'--cvp-menu-shadow', contract:'Elevation 3', activation:'Popup open' },
  { role:'Option hover', token:'--cvp-select-option-hover', source:'--cvp-menu-item-bg-hover', contract:'Interactive surface', activation:'[data-active]' },
  { role:'Option selected', token:'--cvp-select-option-selected', source:'--cvp-menu-item-bg-active', contract:'Selected surface', activation:'[data-selected]' },
];

export function SelectDocumentation(){
  const [value,setValue]=useState('');
  return <main className="cvp-input-doc">
    <header className="cvp-input-doc__hero"><div><span>Component 03 · Standardized</span><h1>Select</h1></div><div><p>A single-selection combobox with predictable keyboard navigation, explicit option states, and a theme-aware popup.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>
    <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Anatomy and live behavior</h2><p>The trigger retains focus while the active option is communicated to assistive technology.</p></div></header><div className="cvp-input-doc__anatomy"><div className="cvp-input-doc__live"><Select label="Default report" optionalText="Optional" options={options} value={value} onChange={setValue} placeholder="Choose a report" helperText="Use Arrow keys to explore and Enter to choose." name="report"/></div><ol><li><b>1</b><span><strong>Label</strong> Persistent name and requirement status.</span></li><li><b>2</b><span><strong>Combobox trigger</strong> Current value, placeholder, and disclosure state.</span></li><li><b>3</b><span><strong>Listbox</strong> Active, selected, and unavailable options.</span></li></ol></div></section>
    <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>States and density</h2><p>Disabled options remain visible but cannot receive selection.</p></div></header><div className="cvp-input-doc__states"><Select label="Placeholder" options={options}/><Select label="Selected" options={options} defaultValue="content"/><Select label="Required" options={options} required helperText="Choose one report to continue."/><Select label="Invalid" options={options} error="Select a report before continuing."/><Select label="Disabled" options={options} defaultValue="audience" disabled/><Select label="Compact" options={options} defaultValue="revenue" size="compact"/></div></section>
    <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Theme parity</h2><p>The trigger and popup use component tokens over shared menu roles.</p></div></header><div className="cvp-input-doc__themes"><article data-theme="dark"><span>Dark</span><Select label="Workspace" options={options} defaultValue="audience"/></article><article data-theme="light"><span>Light</span><Select label="Workspace" options={options} defaultValue="audience"/></article></div></section>
    <section className="cvp-input-doc__panel"><header><b>04</b><div><h2>Token contract</h2><p>Select composes the shared input and menu contracts through registered Tier 3 tokens.</p></div></header><ComponentTokenContract label="Select token contract" rows={selectTokenRows}/></section>
    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Keyboard contract</h2></div></header><ul><li><code>Enter</code> or <code>Space</code> opens and selects.</li><li>Arrow keys move through enabled options.</li><li><code>Home</code> and <code>End</code> move to boundaries.</li><li><code>Escape</code> closes without changing value.</li><li><code>Tab</code> closes and continues naturally.</li></ul></article><article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Accessibility contract</h2></div></header><ul><li>Combobox, listbox, and option roles form one named control.</li><li><code>aria-activedescendant</code> exposes virtual focus.</li><li>Selected and disabled options expose explicit states.</li><li>A hidden named value participates in form submission.</li><li>Use native Select when custom presentation is unnecessary.</li></ul></article></section>
    <footer className="cvp-input-doc__footer"><span>CVP form-control family</span><p>Canonical tokens · Combobox · Keyboard · Form value · Themes</p></footer>
  </main>;
}
