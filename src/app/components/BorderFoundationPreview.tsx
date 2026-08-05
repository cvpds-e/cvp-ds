import React from 'react';
import './BorderFoundationPreview.css';

const widths = [
  ['none','0','none'],['xs','0.5','subtle'],['sm','1','base'],['md','2','strong'],['lg','4','heavy'],
];
const roles = [
  ['Subtle','Dense row separation','subtle'],['Base','Standard component edge','base'],
  ['Divider','Adjacent content','divider'],['Container','Bounded group','container'],
  ['Strong','Structural emphasis','strong'],['Section','Major region break','section'],
  ['Selected','Active choice','selected'],['Focus','Keyboard position','focus'],
];

function StatePanel({ theme }: { theme: 'dark'|'light' }) {
  return <article className={`cvp-border-state cvp-border-state--${theme}`} data-theme={theme}>
    <header><div><span>RAIL SETTINGS</span><strong>Boundary and state</strong></div><small>{theme}</small></header>
    <div className="cvp-border-state__rows">
      <label><span>Default</span><input value="Editorial rail" readOnly /></label>
      <label><span>Hover</span><input className="is-hover" value="Editorial rail" readOnly /></label>
      <label><span>Focused</span><input className="is-focus" value="Editorial rail" readOnly /></label>
      <label><span>Error</span><input className="is-error" value="Required value" readOnly aria-invalid="true" /></label>
      <label><span>Disabled</span><input value="Unavailable" readOnly disabled /></label>
    </div>
    <footer><button>Cancel</button><button className="is-selected">Selected item</button></footer>
  </article>;
}

export function BorderFoundationPreview() {
  return <main className="cvp-border-preview">
    <header className="cvp-border-hero"><div><span>Foundation 05 · Implemented preview</span><h1>Boundaries clarify<br/>state.</h1></div><p>Quiet structure for everyday scanning; unmistakable emphasis for keyboard focus, selection, and validation.</p></header>
    <section className="cvp-border-panel"><header><b>01</b><div><h2>Width scale</h2><p>Five governed weights, from absence to exceptional emphasis.</p></div></header><div className="cvp-border-widths">{widths.map(([name,value,token])=><article key={name}><i style={{height:`var(--cvp-border-${token}-width)`}}/><strong>{name}</strong><code>{value}px</code></article>)}</div></section>
    <section className="cvp-border-panel"><header><b>02</b><div><h2>Functional roles</h2><p>Border weight follows structural purpose, not decoration.</p></div></header><div className="cvp-border-roles">{roles.map(([name,note,role])=><article className={`is-${role}`} key={name}><i/><div><strong>{name}</strong><small>{note}</small><code>border.{role}</code></div></article>)}</div></section>
    <section className="cvp-border-panel"><header><b>03</b><div><h2>Component states</h2><p>The same state grammar remains legible in dark and light themes.</p></div></header><div className="cvp-border-themes"><StatePanel theme="dark"/><StatePanel theme="light"/></div></section>
    <section className="cvp-border-panel"><header><b>04</b><div><h2>Choose the lightest tool</h2><p>Not every separation needs another line.</p></div></header><div className="cvp-border-decisions"><article><div className="is-space"><i/><i/></div><strong>Whitespace</strong><p>Separate content when distance already makes the relationship clear.</p></article><article><div className="is-surface"><i/><i/></div><strong>Surface</strong><p>Use a background shift when the plane itself changes.</p></article><article><div className="is-boundary"><i/><i/></div><strong>Border</strong><p>Add an explicit edge when adjacency or state would otherwise be ambiguous.</p></article></div></section>
    <footer className="cvp-border-footer"><span>Implementation status</span><p>Shared boundary and focus contracts are active. Local overrides migrate during component review.</p></footer>
  </main>;
}
