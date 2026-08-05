import React from 'react';
import './ColorFoundationPreview.css';

type Theme = 'dark' | 'light';

const themes: Array<{ id: Theme; label: string; note: string }> = [
  { id: 'dark', label: 'Dark operations', note: 'Primary CVP working environment' },
  { id: 'light', label: 'Light operations', note: 'High-clarity daylight environment' },
];

const surfaces = [
  ['Canvas', 'canvas', 'Application shell and workspace'],
  ['Section', 'section', 'Navigation and grouped regions'],
  ['Surface', 'surface', 'Cards, forms and contained content'],
  ['Raised', 'raised', 'Prominent panels and side sheets'],
  ['Overlay', 'overlay', 'Menus and temporary surfaces'],
  ['Elevated', 'elevated', 'Dialogs and focused tasks'],
] as const;

const intents = [
  ['Accent', 'accent', 'Selected and primary action'],
  ['Positive', 'positive', 'Completed and healthy'],
  ['Warning', 'warning', 'Review and caution'],
  ['Negative', 'negative', 'Failure and destructive'],
  ['Info', 'info', 'Guidance and system status'],
] as const;

const darkNeutrals = [
  ['900', '#0a0a10', '--cvp-primitive-neutral-900'],
  ['850', '#0d0d14', '--cvp-primitive-neutral-850'],
  ['800', '#14141a', '--cvp-primitive-neutral-800'],
  ['750', '#19191b', '--cvp-primitive-neutral-750'],
  ['700', '#1a1a24', '--cvp-primitive-neutral-700'],
  ['650', '#1f1f28', '--cvp-primitive-neutral-650'],
  ['500', '#2a2a36', '--cvp-primitive-neutral-500'],
] as const;

const accentFamilies = [
  { name: 'Danger', role: 'Error and destructive', swatches: [['700', '#991b1b', '--cvp-primitive-red-700'], ['400', '#f87171', '--cvp-primitive-red-400'], ['200', '#fee2e2', '--cvp-primitive-red-200']] },
  { name: 'Success', role: 'Healthy and complete', swatches: [['700', '#14532d', '--cvp-primitive-green-700'], ['400', '#3dc155', '--cvp-primitive-green-400'], ['200', '#86efac', '--cvp-primitive-green-200']] },
  { name: 'Warning', role: 'Caution and review', swatches: [['700', '#92400e', '--cvp-primitive-yellow-700'], ['400', '#f4983b', '--cvp-primitive-yellow-400'], ['200', '#fcd34d', '--cvp-primitive-yellow-200']] },
  { name: 'Info', role: 'Guidance and links', swatches: [['700', '#1e40af', '--cvp-primitive-sky-700'], ['400', '#60a5fa', '--cvp-primitive-sky-400'], ['200', '#bfdbfe', '--cvp-primitive-sky-200']] },
  { name: 'Special', role: 'Limited accent callouts', swatches: [['800', '#1f3566', '--cvp-primitive-blue-800'], ['400', '#c084fc', '--cvp-primitive-purple-400'], ['200', '#e9d5ff', '--cvp-primitive-purple-200']] },
] as const;

function ThemePreview({ id, label, note }: (typeof themes)[number]) {
  return (
    <article className={`cvp-color-theme cvp-color-theme--${id}`} data-theme={id} aria-label={`${label} color preview`}>
      <header className="cvp-color-theme__header">
        <div>
          <span className="cvp-color-theme__eyebrow">Theme preview</span>
          <h2>{label}</h2>
          <p>{note}</p>
        </div>
        <span className="cvp-color-theme__mode">{id}</span>
      </header>

      <section className="cvp-color-section">
        <div className="cvp-color-section__heading">
          <span>01</span>
          <div><h3>Surface hierarchy</h3><p>Six layers with visible but restrained depth.</p></div>
        </div>
        <div className="cvp-surface-stack">
          {surfaces.map(([name, token, description], index) => (
            <div className={`cvp-surface-card cvp-surface-card--${token}`} key={token}>
              <span className="cvp-surface-card__depth">0{index}</span>
              <strong>{name}</strong>
              <small>{description}</small>
              <code>color.bg.base.{token}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="cvp-color-section">
        <div className="cvp-color-section__heading">
          <span>02</span>
          <div><h3>Foreground pairing</h3><p>Text and icons remain predictable on every working surface.</p></div>
        </div>
        <div className="cvp-pairing-grid">
          <div className="cvp-pairing-card">
            <span className="cvp-kicker">Recommended</span>
            <h4>Configure spotlight rail</h4>
            <p>Primary content uses the strongest neutral foreground.</p>
            <small>Secondary metadata · Updated 2 minutes ago</small>
          </div>
          <div className="cvp-pairing-card cvp-pairing-card--inverse">
            <span className="cvp-kicker">Inverse surface</span>
            <h4>24 items ready</h4>
            <p>On-colour content uses an explicit foreground pairing.</p>
          </div>
        </div>
      </section>

      <section className="cvp-color-section">
        <div className="cvp-color-section__heading">
          <span>03</span>
          <div><h3>Intent families</h3><p>Subtle context and strong emphasis share one meaning.</p></div>
        </div>
        <div className="cvp-intent-list">
          {intents.map(([name, token, description]) => (
            <div className={`cvp-intent cvp-intent--${token}`} key={token}>
              <span className="cvp-intent__dot" />
              <div><strong>{name}</strong><small>{description}</small></div>
              <span className="cvp-intent__badge">{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cvp-color-section">
        <div className="cvp-color-section__heading">
          <span>04</span>
          <div><h3>Controls and states</h3><p>A practical check of action, boundary and focus decisions.</p></div>
        </div>
        <div className="cvp-control-demo">
          <label>
            <span>Rail name</span>
            <input defaultValue="Spotlight" readOnly />
            <small>Visible boundary and supporting text</small>
          </label>
          <label>
            <span>Collection</span>
            <select defaultValue="home"><option value="home">Home</option></select>
          </label>
          <div className="cvp-control-demo__actions">
            <button className="cvp-button cvp-button--secondary">Cancel</button>
            <button className="cvp-button cvp-button--primary">Save changes</button>
          </div>
          <div className="cvp-focus-sample" tabIndex={0}>Keyboard focus preview</div>
        </div>
      </section>
    </article>
  );
}

export function ColorFoundationPreview() {
  return (
    <main className="cvp-color-preview">
      <header className="cvp-color-preview__hero">
        <div>
          <span className="cvp-color-preview__phase">Foundation 01 · Approval preview</span>
          <h1>Color, clarified.</h1>
          <p>
            A proposed semantic color direction built from the existing CVP project. Royal Blue,
            Periwinkle and the operational neutral character are preserved; roles, pairings and
            theme behaviour are made explicit.
          </p>
        </div>
        <div className="cvp-color-preview__legend" role="list" aria-label="Change classification">
          <span role="listitem"><i className="is-preserve" />Preserve identity</span>
          <span role="listitem"><i className="is-standardise" />Standardise roles</span>
          <span role="listitem"><i className="is-fix" />Fix accessibility</span>
          <span role="listitem"><i className="is-elevate" />Elevate hierarchy</span>
        </div>
      </header>

      <section className="cvp-brand-ramp" aria-labelledby="brand-ramp-title">
        <div>
          <span className="cvp-color-preview__phase">Shared brand primitives</span>
          <h2 id="brand-ramp-title">Royal Blue × Periwinkle</h2>
          <p>The brand ramp stays recognisably CVP across both themes; semantic use changes by context.</p>
        </div>
        <div className="cvp-brand-ramp__swatches">
          {[
            ['#b4c7ff', '--cvp-primitive-royal-100'], ['#9cb3ff', '--cvp-primitive-royal-200'],
            ['#7287db', '--cvp-primitive-royal-300'], ['#4b76ff', '--cvp-primitive-royal-400'],
            ['#3d63dd', '--cvp-primitive-royal-500'], ['#274ddb', '--cvp-primitive-royal-600'],
            ['#1f3566', '--cvp-primitive-royal-800'],
          ].map(([color, token], index) => (
            <div key={color} style={{ backgroundColor: `var(${token})` }}>
              <span>{[100, 200, 300, 400, 500, 600, 800][index]}</span>
              <code>{color}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="cvp-palette-section" aria-labelledby="dark-palette-title">
        <header className="cvp-palette-section__header">
          <div>
            <span className="cvp-color-preview__phase">Core dark primitives</span>
            <h2 id="dark-palette-title">Operational neutrals</h2>
          </div>
          <p>Canvas-to-raised values used to construct the CVP dark workspace hierarchy.</p>
        </header>
        <div className="cvp-dark-ramp">
          {darkNeutrals.map(([step, color, token]) => (
            <div key={step} style={{ backgroundColor: `var(${token})` }}>
              <span>{step}</span>
              <code>{color}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="cvp-palette-section" aria-labelledby="accent-palette-title">
        <header className="cvp-palette-section__header">
          <div>
            <span className="cvp-color-preview__phase">Operational accents</span>
            <h2 id="accent-palette-title">Intent families</h2>
          </div>
          <p>Dark, active, and soft values preserve meaning across both CVP themes.</p>
        </header>
        <div className="cvp-accent-families">
          {accentFamilies.map(family => (
            <article key={family.name}>
              <header><strong>{family.name}</strong><small>{family.role}</small></header>
              <div>
                {family.swatches.map(([step, color, token], index) => (
                  <span className={index > 0 ? 'is-light' : ''} key={color} style={{ backgroundColor: `var(${token})` }}>
                    <b>{step}</b><code>{color}</code>
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="cvp-color-preview__themes">
        {themes.map(theme => <ThemePreview key={theme.id} {...theme} />)}
      </div>

      <footer className="cvp-color-preview__footer">
        <span>Decision gate</span>
        <p>Approve the direction before tokens are migrated through the component library.</p>
      </footer>
    </main>
  );
}
