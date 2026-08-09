import React, { useState } from 'react';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import { SearchField } from './SearchField';
import { SortControl } from './SortControl';
import './TextInputDocumentation.css';

const rows: ComponentTokenContractRow[] = [
  { role: 'Search surface', token: '--cvp-input-bg', source: 'semantic input token', contract: 'Shared field surface', activation: 'Search Field base' },
  { role: 'Search focus', token: '--cvp-input-focus-ring', source: 'semantic input token', contract: 'Visible keyboard focus', activation: ':focus-within' },
  { role: 'Sort label', token: '--cvp-color-text-muted', source: 'semantic text token', contract: 'Quiet utility label', activation: 'Sort Control base' },
  { role: 'Sort actions', token: '--cvp-button-outline-height', source: 'button component token', contract: '32px direction toggle', activation: 'Sort Control direction' },
];

export function QueryControlsDocumentation() {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('title');
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');
  return <main className="cvp-input-doc">
    <header className="cvp-input-doc__hero"><div><span>Component 20 · Standardized</span><h1>Query Controls</h1></div><div><p>Reusable search and sorting controls for content and collection workflows.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>
    <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Search Field</h2><p>A named search input with leading icon and an optional clear action.</p></div></header><div className="cvp-input-doc__live"><SearchField value={query} onChange={(event) => setQuery(event.target.value)} onClear={() => setQuery('')} placeholder="Search filters…" /></div></section>
    <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Sort Control</h2><p>Choose a field and toggle ascending or descending order in one quiet, responsive inline control.</p></div></header><div className="cvp-input-doc__live"><SortControl value={field} direction={direction} onChange={setField} onDirectionChange={setDirection} options={[{ value: 'title', label: 'Title' }, { value: 'year', label: 'Release year' }, { value: 'updated', label: 'Last updated' }]} /></div></section>
    <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Token contract</h2><p>Both controls compose existing input, button, and semantic surface roles.</p></div></header><ComponentTokenContract label="Query controls token contract" rows={rows} /></section>
    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>04</b><div><h2>Accessibility</h2></div></header><ul><li>Search retains an associated visible or programmatic label.</li><li>Clear has a specific accessible name.</li><li>Sort direction exposes its current pressed state and action.</li><li>Field selection retains the Select combobox behavior.</li></ul></article><article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Usage</h2></div></header><ul><li>Use Search Field for a single free-text query.</li><li>Use Sort Control when field and direction are changed together.</li><li>Keep advanced filters in Filter rather than extending search.</li></ul></article></section>
    <footer className="cvp-input-doc__footer"><span>CVP query-control family</span><p>Search · Sort · Existing input and button tokens</p></footer>
  </main>;
}
