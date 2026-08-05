import React from 'react';
import './RadiusFoundationPreview.css';

const scale = [
  ['none', '0'], ['xs', '2'], ['sm', '4'], ['md', '6'], ['lg', '8'],
  ['xl', '12'], ['2xl', '16'], ['3xl', '24'], ['full', '∞'],
];

const roles = [
  ['Edge', 'Structural seams', 'edge-soft'],
  ['Control', 'Repeatable interaction', 'control-base'],
  ['Surface', 'Bounded containment', 'surface-base'],
  ['Overlay', 'Detached layers', 'overlay-base'],
  ['Rounded', 'Pills and avatars', 'rounded'],
];

function WorkflowCard({ theme }: { theme: 'dark' | 'light' }) {
  return <article className={`cvp-radius-workflow cvp-radius-workflow--${theme}`} data-theme={theme}>
    <header><div><span>CONTENT RAIL</span><strong>Editorial spotlight</strong></div><button aria-label="More options">•••</button></header>
    <div className="cvp-radius-workflow__joined"><button>Overview</button><button className="is-active">Rules</button><button>History</button></div>
    <label>Collection name<input value="Weekend essentials" readOnly /></label>
    <div className="cvp-radius-workflow__tags"><span>Editorial</span><span>Scheduled</span></div>
    <footer><button>Cancel</button><button className="is-primary">Save changes</button></footer>
  </article>;
}

export function RadiusFoundationPreview() {
  return <main className="cvp-radius-preview">
    <header className="cvp-radius-hero"><div><span>Foundation 04 · Implemented preview</span><h1>Shape signals<br/>structure.</h1></div><p>CVP keeps its precise, compact character. Radius now describes an element’s role—not a one-off aesthetic choice.</p></header>

    <section className="cvp-radius-panel"><header><b>01</b><div><h2>Canonical scale</h2><p>Nine governed steps, tuned to CVP’s existing geometry.</p></div></header><div className="cvp-radius-scale">{scale.map(([name,value]) => <article key={name}><i style={{borderRadius: `var(--cvp-radius-${name})`}}/><strong>{name}</strong><code>{value === '∞' ? 'full' : `${value}px`}</code></article>)}</div></section>

    <section className="cvp-radius-panel"><header><b>02</b><div><h2>Semantic shape roles</h2><p>Each family communicates a different structural purpose.</p></div></header><div className="cvp-radius-roles">{roles.map(([name,note,token]) => <article key={name}><i className={`cvp-radius-shape cvp-radius-shape--${token}`}/><div><strong>{name}</strong><small>{note}</small><code>shape.{token.replace('-', '.')}</code></div></article>)}</div></section>

    <section className="cvp-radius-panel"><header><b>03</b><div><h2>Applied to CVP</h2><p>The same component geometry remains coherent across both themes.</p></div></header><div className="cvp-radius-themes"><WorkflowCard theme="dark"/><WorkflowCard theme="light"/></div></section>

    <section className="cvp-radius-panel"><header><b>04</b><div><h2>Structural rules</h2><p>Shape relationships matter more than isolated corner values.</p></div></header><div className="cvp-radius-rules"><article><div className="cvp-radius-connected"><i/><i/><i/></div><strong>Connected corners</strong><p>Shared seams stay square; only the exposed perimeter is rounded.</p></article><article><div className="cvp-radius-nested"><i><i/></i></div><strong>Nested hierarchy</strong><p>Inner geometry is tighter than its containing surface.</p></article><article><div className="cvp-radius-focus"><button>Focused control</button></div><strong>State consistency</strong><p>Hover, active and focus never change the component radius.</p></article></div></section>

    <footer className="cvp-radius-footer"><span>Implementation status</span><p>Canonical roles and legacy bridges are active. Off-scale local values will be retired as each component is reviewed.</p></footer>
  </main>;
}
