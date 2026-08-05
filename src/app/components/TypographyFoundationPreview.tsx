import React from 'react';
import './TypographyFoundationPreview.css';

const roles = [
  { role: 'Display', token: 'type.display.lg.strong', sample: 'Shape the next viewing experience', use: 'Rare product-level statements' },
  { role: 'Headline', token: 'type.headline.md.strong', sample: 'Configure spotlight rail', use: 'Page and primary section titles' },
  { role: 'Title', token: 'type.title.md.strong', sample: 'Personalizer configuration', use: 'Panels, cards and grouped content' },
  { role: 'Body', token: 'type.body.md.base', sample: 'Choose the content rules, audience and schedule applied to this rail.', use: 'Instructions and continuous content' },
  { role: 'Label', token: 'type.label.md.strong', sample: 'Rail collection', use: 'Controls, actions and interface labels' },
  { role: 'Caption', token: 'type.caption.md.base', sample: 'Updated 2 minutes ago · 24 items', use: 'Supporting metadata and helper text' },
  { role: 'Mono', token: 'type.mono.md.base', sample: 'rail_id: spotlight-024', use: 'Identifiers, values and technical content' },
];

const compactRows = [
  ['Spotlight', 'Editorial', '24 items', 'Published'],
  ['Recommended', 'Personalized', '18 items', 'Draft'],
  ['Continue watching', 'Behavioral', '12 items', 'Published'],
];

export function TypographyFoundationPreview() {
  return (
    <main className="cvp-type-preview">
      <header className="cvp-type-hero">
        <div>
          <span className="cvp-type-eyebrow">Foundation 02 · Approval preview</span>
          <h1>Typography,<br />with purpose.</h1>
        </div>
        <div className="cvp-type-hero__summary">
          <p>A role-based system that preserves CVP’s compact operational density while making hierarchy, reading rhythm and responsive behaviour explicit.</p>
          <dl><div><dt>Primary</dt><dd>Inter</dd></div><div><dt>Technical</dt><dd>Inconsolata</dd></div><div><dt>UI base</dt><dd>14 / 20</dd></div></dl>
        </div>
      </header>

      <section className="cvp-type-panel">
        <header className="cvp-type-panel__header"><span>01</span><div><h2>Semantic roles</h2><p>Choose typography by communication purpose—not by visual size alone.</p></div></header>
        <div className="cvp-type-roles">
          {roles.map(item => (
            <article className={`cvp-type-role cvp-type-role--${item.role.toLowerCase()}`} key={item.role}>
              <div className="cvp-type-role__meta"><strong>{item.role}</strong><code>{item.token}</code></div>
              <p>{item.sample}</p>
              <small>{item.use}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="cvp-type-grid">
        <article className="cvp-type-panel">
          <header className="cvp-type-panel__header"><span>02</span><div><h2>Operational density</h2><p>Dense data remains legible without becoming visually loud.</p></div></header>
          <div className="cvp-data-table" role="table" aria-label="Typography density example">
            <div className="cvp-data-table__row cvp-data-table__row--head" role="row"><span role="columnheader">Rail</span><span role="columnheader">Strategy</span><span role="columnheader">Inventory</span><span role="columnheader">Status</span></div>
            {compactRows.map(row => <div className="cvp-data-table__row" role="row" key={row[0]}>{row.map((cell, i) => <span role="cell" key={cell} className={i === 3 ? `is-${cell.toLowerCase()}` : ''}>{cell}</span>)}</div>)}
          </div>
        </article>

        <article className="cvp-type-panel">
          <header className="cvp-type-panel__header"><span>03</span><div><h2>Interface hierarchy</h2><p>One compact form demonstrates label, value, help and action roles.</p></div></header>
          <div className="cvp-type-form">
            <div><span className="cvp-type-form__title">Rail configuration</span><span className="cvp-type-form__meta">Required fields</span></div>
            <label><span>Rail name</span><input value="Spotlight" readOnly /><small>Shown to editors in the rail manager.</small></label>
            <button>Save configuration</button>
          </div>
        </article>
      </section>

      <section className="cvp-type-panel cvp-type-responsive">
        <header className="cvp-type-panel__header"><span>04</span><div><h2>Responsive scale</h2><p>Large expressive roles adapt; core interface roles remain stable.</p></div></header>
        <div className="cvp-type-responsive__scale">
          <div><span>Large workspace</span><strong>40</strong><small>Headline lg</small></div>
          <i />
          <div><span>Transitional</span><strong>36</strong><small>Headline lg</small></div>
          <i />
          <div><span>Compact viewport</span><strong>32</strong><small>Headline lg</small></div>
        </div>
        <p className="cvp-type-reading">Core UI text stays at a readable 14px with a 20px line height across viewport modes. Responsive compression is reserved for display and headline roles, preventing dense tools from becoming inconsistent between screens.</p>
      </section>

      <footer className="cvp-type-footer"><span>Decision gate</span><p>Approve role hierarchy, family direction and compact density before component migration.</p></footer>
    </main>
  );
}
