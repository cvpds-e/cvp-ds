import React from 'react';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import { LoadingSpinner } from './LoadingSpinner';
import './TextInputDocumentation.css';
import './LoadingSpinnerDocumentation.css';

const tokenRows: ComponentTokenContractRow[] = [
  { role: 'Indicator', token: '--cvp-loading-spinner-indicator', source: '--cvp-color-brand-default', contract: 'Visible indeterminate progress', activation: 'Loading is in progress' },
  { role: 'Track', token: '--cvp-loading-spinner-track', source: '--cvp-color-border-default', contract: 'Low-emphasis motion track', activation: 'All spinner sizes' },
  { role: 'Size', token: '--cvp-loading-spinner-size-*', source: '--cvp-space-4 / 5 / 6', contract: '16px, 20px, or 24px', activation: 'size="sm" / "md" / "lg"' },
  { role: 'Contextual tone', token: 'currentColor', source: 'Parent foreground color', contract: 'Contrast-safe on a button or colored surface', activation: 'tone="inherit"' },
  { role: 'Motion', token: '--cvp-loading-spinner-duration', source: '--cvp-motion-duration-slow', contract: 'Shared indeterminate cadence', activation: 'Motion allowed; static fallback for reduced motion' },
];

export function LoadingSpinnerDocumentation() {
  return (
    <main className="cvp-input-doc cvp-loading-spinner-doc">
      <header className="cvp-input-doc__hero">
        <div><span>Component 15 · Standardized</span><h1>Loading Spinner</h1></div>
        <div><p>Indeterminate progress for a local action or compact pending region, with an accessible status label and reduced-motion fallback.</p><span className="cvp-input-doc__status">Ready for implementation</span></div>
      </header>

      <section className="cvp-input-doc__panel">
        <header><b>01</b><div><h2>Anatomy</h2><p>The visual indicator is paired with a concise, visually hidden status label for assistive technology.</p></div></header>
        <div className="cvp-input-doc__anatomy">
          <div className="cvp-input-doc__live cvp-loading-spinner-doc__live"><LoadingSpinner label="Refreshing rail content" /><span>Refreshing rail content</span></div>
          <ol><li><b>1</b><span><strong>Indicator</strong> Shows indeterminate local activity without promising a completion percentage.</span></li><li><b>2</b><span><strong>Accessible label</strong> Provides concise context through the native status role.</span></li><li><b>3</b><span><strong>Motion fallback</strong> Uses a static partial indicator when reduced motion is preferred.</span></li></ol>
        </div>
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>02</b><div><h2>Sizes</h2><p>Use the smallest size that remains legible in the surrounding control or pending region.</p></div></header>
        <div className="cvp-loading-spinner-doc__sizes">
          <article><span className="cvp-loading-spinner-doc__caption">Small · 16px</span><div><LoadingSpinner size="sm" label="Loading compact control" /></div></article>
          <article><span className="cvp-loading-spinner-doc__caption">Medium · 20px</span><div><LoadingSpinner size="md" label="Loading content" /></div></article>
          <article><span className="cvp-loading-spinner-doc__caption">Large · 24px</span><div><LoadingSpinner size="lg" label="Loading region" /></div></article>
        </div>
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>03</b><div><h2>Theme parity</h2><p>Track and indicator roles resolve through the active theme without local color overrides.</p></div></header>
        <div className="cvp-input-doc__themes">
          <article data-theme="dark"><span>Dark</span><div><LoadingSpinner label="Loading dark theme content" /></div></article>
          <article data-theme="light"><span>Light</span><div><LoadingSpinner label="Loading light theme content" /></div></article>
        </div>
      </section>

      <section className="cvp-input-doc__panel">
        <header><b>04</b><div><h2>Token contract</h2><p>Spinner color, scale, stroke, and motion use registered component tokens.</p></div></header>
        <ComponentTokenContract label="Loading spinner token contract" rows={tokenRows} />
      </section>

      <section className="cvp-input-doc__grid">
        <article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Accessibility contract</h2></div></header><ul><li>Provide a concise label that describes the pending action or region.</li><li>The component exposes <code>role="status"</code> while hiding duplicate visual text.</li><li>Set <code>decorative</code> when the parent already exposes its busy state, such as a loading button.</li><li>Respect <code>prefers-reduced-motion</code> with a static partial indicator.</li></ul></article>
        <article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Usage decisions</h2></div></header><ul><li>Use for local, indeterminate work such as refreshing a small region or pending control action.</li><li>Use <code>tone="inherit"</code> when the spinner sits on a button or another colored surface.</li><li>Loading may prevent repeat activation, but it remains visually distinct from an unavailable disabled state.</li><li>Use Skeleton when the eventual layout is already known.</li></ul></article>
      </section>

      <footer className="cvp-input-doc__footer"><span>CVP feedback foundation</span><p>Spinner · Status · Motion · Theme parity · Reduced motion</p></footer>
    </main>
  );
}
