import React, { useState } from 'react';
import { Film, Layers3, ListChecks, Radio, Sparkles, Tv } from 'lucide-react';
import { Badge } from './Badge';
import { ChoiceCardGroup } from './ChoiceCardGroup';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import './TextInputDocumentation.css';

const tokenRows: ComponentTokenContractRow[] = [
  { role: 'Card surface', token: '--cvp-choice-card-bg', source: '--cvp-color-surface-page', contract: 'Neutral selectable surface', activation: 'Default' },
  { role: 'Selected surface', token: '--cvp-choice-card-bg-selected', source: '--cvp-color-state-info-bg', contract: 'Persistent selected cue', activation: 'aria-checked=true' },
  { role: 'Selected border', token: '--cvp-choice-card-border-selected', source: '--cvp-color-border-brand', contract: 'Non-color-only selection boundary', activation: 'aria-checked=true' },
  { role: 'Supporting text', token: '--cvp-choice-card-description', source: '--cvp-color-text-muted', contract: 'Readable secondary detail', activation: 'All states' },
  { role: 'Focus', token: '--cvp-choice-card-focus-ring', source: '--cvp-border-focus-ring', contract: 'Canonical visible ring', activation: ':focus-visible' },
];

export function ChoiceCardGroupDocumentation() {
  const [value, setValue] = useState('generic');
  const options = [
    { value: 'generic', label: 'Generic', description: 'Manually curated editorial content', icon: <ListChecks />, badge: <Badge>Default</Badge> },
    { value: 'personalized', label: 'Personalized', description: 'Tailored to each viewer', icon: <Sparkles /> },
    { value: 'hybrid', label: 'Hybrid', description: 'Editorial and personalization signals', icon: <Layers3 /> },
  ];
  return <main className="cvp-input-doc">
    <header className="cvp-input-doc__hero"><div><span>Forms · Standardized</span><h1>Choice Card Group</h1></div><div><p>A single-selection control for options that need supporting descriptions, icons, or status badges.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>
    <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Anatomy and live behavior</h2><p>Choose an option with pointer, arrow keys, Home, or End.</p></div></header><div className="cvp-input-doc__live"><ChoiceCardGroup label="Rail type" helperText="Choose how content is selected." required columns={3} options={options} value={value} onChange={setValue} /></div></section>
    <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Variants and states</h2><p>Layouts adapt to the number and density of available choices.</p></div></header><div className="cvp-input-doc__states"><ChoiceCardGroup label="Content type" helperText="The semantic Live badge uses a red foreground for immediate event recognition." options={[{ value: 'program', label: 'Program Rail', description: 'VOD / On-Demand', icon: <Film /> }, { value: 'live', label: 'Live Now', description: 'Currently airing', icon: <Radio />, badge: <Badge tone="live">Live</Badge> }, { value: 'live-program', label: 'Live Now + Program', description: 'Live and VOD combined', icon: <Tv /> }, { value: 'disabled', label: 'Unavailable choice', description: 'Disabled state', icon: <Film />, disabled: true }]} defaultValue="live" /><ChoiceCardGroup label="Disabled group" disabled options={options.slice(0, 2)} defaultValue="generic" /></div></section>
    <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Token contract</h2><p>Choice cards use a dedicated Tier 3 contract for theme parity and interaction states.</p></div></header><ComponentTokenContract label="Choice Card Group token contract" rows={tokenRows} /></section>
    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>04</b><div><h2>Accessibility contract</h2></div></header><ul><li>The container exposes a named <code>radiogroup</code>.</li><li>Helper text is associated with the group through <code>aria-describedby</code>; required groups expose <code>aria-required</code>.</li><li>Every card exposes its selected state with <code>aria-checked</code>.</li><li>Arrow keys move and select; Home and End jump to boundaries.</li><li>Only one enabled option participates in the tab order.</li></ul></article><article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Usage decisions</h2></div></header><ul><li>Use when descriptions or badges help users compare choices.</li><li>Use Segmented for compact labels and immediate view changes.</li><li>Keep choices mutually exclusive and descriptions parallel.</li><li>Prefer two or three columns; the component reflows on narrow screens.</li></ul></article></section>
  </main>;
}