import React from 'react';
import './LayoutFoundationPreview.css';

const modes=[['SM','320–599','4'],['MD','600–1023','8'],['LG','1024–1439','12'],['XL','1440+','12']];
const panes=[['Fixed','Navigation','Holds, then overlays'],['Flexible','Main work','Never collapses'],['Constrained','Supporting','Stacks before compression'],['Independent','Temporary tools','Lives above base flow']];

function GridSpec({mode,cols}:{mode:string;cols:string}){return <article className={`cvp-layout-grid cvp-layout-grid--${mode.toLowerCase()}`}><header><strong>{mode}</strong><code>{cols} columns</code></header><div>{Array.from({length:Number(cols)},(_,i)=><i key={i}/>)}</div></article>}

export function LayoutFoundationPreview(){return <main className="cvp-layout-preview">
  <header className="cvp-layout-hero"><div><span>Foundation 07 · Implemented preview</span><h1>Structure protects<br/>the task.</h1></div><p>A responsive grid, bounded content widths, and explicit pane priorities keep CVP stable as content and viewport conditions change.</p></header>
  <section className="cvp-layout-panel"><header><b>01</b><div><h2>Responsive grid</h2><p>Column structure expands through defined modes; alignment remains shared.</p></div></header><div className="cvp-layout-grids">{modes.map(([name,range,cols])=><div key={name}><GridSpec mode={name} cols={cols}/><strong>{range}px</strong></div>)}</div></section>
  <section className="cvp-layout-panel"><header><b>02</b><div><h2>Region hierarchy</h2><p>Main content keeps priority while secondary structure adapts around it.</p></div></header><div className="cvp-layout-shell"><header>Top region</header><nav>Navigation</nav><aside>Side tools</aside><main><strong>Main content</strong><span>Flexible · highest priority</span></main><section><strong>Supporting</strong><span>Constrained · stacks first</span></section></div></section>
  <section className="cvp-layout-panel"><header><b>03</b><div><h2>Pane behavior</h2><p>Every pane declares how it responds under width pressure.</p></div></header><div className="cvp-layout-panes">{panes.map(([name,use,response])=><article key={name}><i/><strong>{name}</strong><span>{use}</span><small>{response}</small></article>)}</div></section>
  <section className="cvp-layout-panel"><header><b>04</b><div><h2>Content width modes</h2><p>Wide viewports do not automatically mean wide reading measures.</p></div></header><div className="cvp-layout-widths"><article className="is-full"><i/><strong>Full / Data</strong><small>Uses available grid width</small></article><article className="is-constrained"><i/><strong>Constrained</strong><small>Forms and task flows</small></article><article className="is-reading"><i/><strong>Reading</strong><small>Text-first comprehension</small></article></div></section>
  <footer className="cvp-layout-footer"><span>Implementation status</span><p>Responsive page, pane, and content tokens are active in the canonical CVP graph.</p></footer>
</main>}
