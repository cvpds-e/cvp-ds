import React from 'react';
import './SpacingFoundationPreview.css';

const scale = [
  ['0', 0], ['100', 2], ['200', 4], ['300', 8], ['400', 12], ['500', 16], ['600', 24],
  ['700', 32], ['800', 40], ['900', 48], ['1000', 64], ['1100', 80], ['1200', 96], ['1300', 128],
] as const;
const families = [
  ['Stack', 'Vertical content flow', 'stack'], ['Inline', 'Horizontal relationships', 'inline'],
  ['Inset', 'Internal boundaries', 'inset'], ['Gap', 'Repeated structures', 'gap'],
  ['Section', 'Macro vertical rhythm', 'section'], ['Container', 'Layout boundaries', 'container'],
] as const;

function DensityCard({ mode, note }: { mode: 'compact'|'default'|'comfortable'; note: string }) {
  return <article className="cvp-spacing-density" data-density={mode}>
    <header><div><span>Density</span><h3>{mode}</h3></div><small>{note}</small></header>
    <div className="cvp-spacing-density__panel">
      <div className="cvp-spacing-density__title"><strong>Spotlight rail</strong><span>24 items</span></div>
      <div className="cvp-spacing-density__fields"><label>Rail name<input value="Spotlight" readOnly /></label><label>Collection<input value="Home" readOnly /></label></div>
      <div className="cvp-spacing-density__actions"><button>Cancel</button><button>Save</button></div>
    </div>
  </article>;
}

export function SpacingFoundationPreview() {
  return <main className="cvp-spacing-preview">
    <header className="cvp-spacing-hero"><div><span className="cvp-spacing-eyebrow">Foundation 03 · Implemented preview</span><h1>Space defines<br/>relationships.</h1></div><p>One spatial language for dense operator tools, balanced workflows and comfortable content—without arbitrary component values.</p></header>
    <section className="cvp-spacing-panel"><header className="cvp-spacing-panel__head"><span>01</span><div><h2>Primitive scale</h2><p>A 4px-oriented core with micro precision and macro layout steps.</p></div></header><div className="cvp-spacing-scale">{scale.map(([step,value])=><div key={step}><span style={{height:`var(--cvp-space-${step === '0' ? '100' : step})`}}/><strong>{value}</strong><code>{step}</code></div>)}</div></section>
    <section className="cvp-spacing-panel"><header className="cvp-spacing-panel__head"><span>02</span><div><h2>Semantic families</h2><p>Meaning is encoded before magnitude is selected.</p></div></header><div className="cvp-spacing-families">{families.map(([name,desc,token])=><article key={name}><div className={`cvp-spacing-demo cvp-spacing-demo--${token}`}><i/><i/><i/></div><strong>{name}</strong><small>{desc}</small><code>spacing.{token}.md</code></article>)}</div></section>
    <section className="cvp-spacing-panel"><header className="cvp-spacing-panel__head"><span>03</span><div><h2>Density modes</h2><p>The same relationships remap coherently by product context.</p></div></header><div className="cvp-spacing-densities"><DensityCard mode="compact" note="Data-rich consoles"/><DensityCard mode="default" note="General workflows"/><DensityCard mode="comfortable" note="Content-first tasks"/></div><p className="cvp-spacing-a11y">Interactive targets retain a minimum 44px target area and at least 8px separation even when visual density is compact.</p></section>
    <footer className="cvp-spacing-footer"><span>Implementation status</span><p>Canonical tokens and legacy aliases are active. Component-specific migration follows during component review.</p></footer>
  </main>;
}
