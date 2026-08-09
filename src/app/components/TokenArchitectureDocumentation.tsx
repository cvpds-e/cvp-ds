import React from 'react';
import './TokenArchitectureDocumentation.css';

const layers = [
  { tier: 'Tier 1', title: 'Primitives', prefix: '--cvp-primitive-*', description: 'Raw, immutable values: colour ramps, 4px spacing scale, radii, font metrics, opacity, and motion.', examples: ['--cvp-primitive-blue-600', '--cvp-primitive-space-4', '--cvp-primitive-font-size-md'], rule: 'Never use these in component CSS.' },
  { tier: 'Tier 2', title: 'Semantic roles', prefix: '--cvp-color-* / --cvp-space-*', description: 'Intent-based roles that adapt to light and dark themes. This is the shared language for surfaces, text, borders, focus, states, type, and layout.', examples: ['--cvp-color-surface-default', '--cvp-color-text-muted', '--cvp-border-focus-ring'], rule: 'Use only when a shared component contract does not already exist.' },
  { tier: 'Tier 3', title: 'Component contracts', prefix: '--cvp-[component]-*', description: 'The public and internal API for a component. It maps the design role to its element, state, geometry, and accessibility treatment.', examples: ['--cvp-button-primary-bg', '--cvp-table-row-bg-selected', '--cvp-gallery-meta-color'], rule: 'Use this tier inside component CSS.' },
];

const applicationRows = [
  ['Surface', 'A page, panel, or selected row needs a background role.', '--cvp-color-surface-page / default / active', '--cvp-table-row-bg-selected'],
  ['Text & icons', 'Choose meaning and hierarchy before choosing a colour.', '--cvp-color-text-primary / muted; --cvp-color-icon-*', '--cvp-gallery-meta-color'],
  ['Space & layout', 'Use the 4px scale; choose stack, inline, inset, gap, or layout intent.', '--cvp-space-*; --cvp-spacing-*; --cvp-layout-*', '--cvp-table-control-gap'],
  ['Shape & border', 'Use shared control/surface geometry and role-based borders.', '--cvp-shape-*; --cvp-border-*', '--cvp-button-outline-radius'],
  ['Interaction', 'Every interactive control receives hover, active, disabled, and focus tokens.', '--cvp-color-surface-hover; --cvp-border-focus-ring', '--cvp-button-primary-focus-ring'],
  ['State', 'Communicate success, warning, error, or info with paired background, border, and text roles.', '--cvp-color-state-*-{bg,border,text}', '--cvp-notification-banner-current-*'],
];

const decisions = [
  ['Building a shared component?', 'Define or extend Tier 3 component tokens, then consume them in that component’s CSS.'],
  ['Building page composition?', 'Use Tier 2 semantic, spacing, and layout tokens. Do not introduce a page-local colour scale.'],
  ['Need a new value?', 'Add a primitive only when the value is reusable; otherwise select an existing semantic role.'],
  ['Need partner theming?', 'Expose the documented public Tier 3 tokens. Do not override primitives from product code.'],
];

const implementationRules = [
  ['Primitive', 'Raw, reusable values: colour ramps, spacing units, radii, type metrics.', 'Semantic-token definitions.'],
  ['Semantic role', 'Meaning and intent: a surface, text hierarchy, border, focus, or state.', 'Component contracts and page composition.'],
  ['Component contract', 'A component’s stable visual API, such as its selected-row background.', 'That component’s CSS only.'],
];

const practicalExamples = {
  primitives: ['--cvp-primitive-space-4: 16px;', '--cvp-primitive-neutral-500: #2a2a32;', '--cvp-primitive-radius-2: 4px;'].join('\n'),
  semantic: ['--cvp-color-surface-active:', '  var(--cvp-primitive-neutral-500);', '', '--cvp-space-control-inset:', '  var(--cvp-primitive-space-2);'].join('\n'),
  contract: ['--cvp-table-row-bg-selected:', '  var(--cvp-color-surface-active);', '', '--cvp-input-border-focus:', '  var(--cvp-border-focus-ring);'].join('\n'),
  avoid: ['/* Usually unnecessary */', '--cvp-button-primary-icon-gap:', '  var(--cvp-space-2);'].join('\n'),
};

export function TokenArchitectureDocumentation() {
  return <section className="token-architecture-docs">
    <header className="token-architecture-docs__hero">
      <span>Foundations · engineering guide</span>
      <h1>Token architecture</h1>
      <p>A practical map of how visual decisions move from an approved raw value to a component implementation. The goal is predictable theming, accessible states, and fewer one-off styling decisions.</p>
    </header>

    <section className="token-architecture-docs__section" aria-labelledby="token-flow-title">
      <header><div><h2 id="token-flow-title">The token flow</h2><p>Tokens move in one direction. Each tier narrows a general system decision into a reusable implementation decision.</p></div></header>
      <div className="token-architecture-docs__flow">
        {layers.map((layer, index) => <React.Fragment key={layer.tier}>
          <article className="token-architecture-docs__layer">
            <span>{layer.tier}</span><h3>{layer.title}</h3><code>{layer.prefix}</code><p>{layer.description}</p>
            <ul>{layer.examples.map(example => <li key={example}><code>{example}</code></li>)}</ul>
            <strong>{layer.rule}</strong>
          </article>
          {index < layers.length - 1 && <div className="token-architecture-docs__arrow" aria-hidden="true">→</div>}
        </React.Fragment>)}
      </div>
    </section>

    <section className="token-architecture-docs__section" aria-labelledby="application-title">
      <header><div><h2 id="application-title">How to apply tokens in a component</h2><p>Start from the user-facing role, then select the narrowest appropriate token tier.</p></div></header>
      <div className="token-architecture-docs__table-wrap"><table><thead><tr><th>Decision area</th><th>Start with</th><th>Shared semantic role</th><th>Component contract</th></tr></thead><tbody>{applicationRows.map(row => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index > 1 ? <code>{cell}</code> : cell}</td>)}</tr>)}</tbody></table></div>
    </section>

    <section className="token-architecture-docs__section token-architecture-docs__resolution" aria-labelledby="resolution-title">
      <header><div><h2 id="resolution-title">How tokens resolve in code</h2><p>A component contract is the only token a component implementation should need. It resolves through a semantic role to an approved primitive value.</p></div></header>
      <div className="token-architecture-docs__resolution-grid">
        <div>
          <pre aria-label="Token resolution CSS example"><code>{`/* 1. Raw value */
--cvp-primitive-neutral-500: #2a2a32;

/* 2. Intent */
--cvp-color-surface-active:
  var(--cvp-primitive-neutral-500);

/* 3. Table contract */
--cvp-table-row-bg-selected:
  var(--cvp-color-surface-active);

/* Component implementation */
.cvp-table__row--selected {
  background: var(--cvp-table-row-bg-selected);
}`}</code></pre>
        </div>
        <aside>
          <h3>Why this matters</h3>
          <p>The Table never selects a grey value itself. A theme can change the semantic selection surface, while a product can intentionally override the documented Table contract without rewriting Table CSS.</p>
          <pre aria-label="Component contract override CSS example"><code>{`.theme-partner {
  --cvp-button-primary-bg:
    var(--cvp-color-brand-primary);
}`}</code></pre>
        </aside>
      </div>
      <div className="token-architecture-docs__table-wrap token-architecture-docs__table-wrap--rules"><table><thead><tr><th>Layer</th><th>What it defines</th><th>Who uses it directly</th></tr></thead><tbody>{implementationRules.map(row => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>)}</tbody></table></div>
    </section>

    <section className="token-architecture-docs__section" aria-labelledby="practical-title">
      <header><div><h2 id="practical-title">The practical model</h2><p>Each tier has one job. Keeping that distinction clear makes the system easier to implement, theme, and maintain.</p></div></header>
      <div className="token-architecture-docs__practical-grid">
        <article><h3>1. Primitives are the inventory</h3><p>Store raw colour, spacing, radius, type, and motion values here. They establish consistency but never describe a user-interface purpose, so they remain private to token definitions.</p><pre><code>{practicalExamples.primitives}</code></pre></article>
        <article><h3>2. Semantic tokens describe intent</h3><p>Use these names for reusable roles such as active surface, muted text, control inset, or focus ring. Themes change here, not in individual components.</p><pre><code>{practicalExamples.semantic}</code></pre></article>
        <article><h3>3. Component contracts apply intent</h3><p>Use these for a named component element or state. Create them only for a documented component API, an accessible state, or an independently controlled visual decision.</p><pre><code>{practicalExamples.contract}</code></pre></article>
      </div>
    </section>

    <section className="token-architecture-docs__section token-architecture-docs__section--split">
      <div><h2>Implementation decisions</h2><div className="token-architecture-docs__decisions">{decisions.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></div>
      <aside><h2>Guardrails</h2><ul><li>Do not place hex, px, or one-off rgba values in component CSS.</li><li>Do not consume primitives directly outside Tier 2 definitions.</li><li>Do not add a component token when an established component contract already covers the need.</li><li>Every new interactive token set includes rest, hover, active, disabled, and focus behavior.</li><li>Validate both themes and documented contrast pairings before release.</li></ul></aside>
    </section>

    <section className="token-architecture-docs__section token-architecture-docs__section--split" aria-labelledby="scope-title">
      <div><h2 id="scope-title">When to create a component contract</h2><p className="token-architecture-docs__section-intro">Add one only when it is a stable, intentional decision.</p><ul className="token-architecture-docs__criteria"><li>The visual decision is specific to that component.</li><li>It represents focus, selected, disabled, error, or another accessible state.</li><li>Engineering needs a stable, documented override point.</li><li>It must be controlled independently from the broader semantic role.</li></ul></div>
      <aside><h2>Keep the API lean</h2><p>Do not expose every icon gap, label line-height, or border width as a public token. Components should use established semantic spacing, type, and border roles internally unless a separate override is genuinely needed.</p><pre><code>{practicalExamples.avoid}</code></pre></aside>
    </section>

    <section className="token-architecture-docs__example" aria-labelledby="worked-example-title"><div><span>Worked example</span><h2 id="worked-example-title">A selected table row</h2><p>The page asks for a subtle selection treatment. The table does not pick a grey value: it consumes a component contract that resolves through the semantic selection surface and changes safely with theme.</p></div><div className="token-architecture-docs__chain"><code>--cvp-primitive-neutral-500</code><b>→</b><code>--cvp-color-surface-active</code><b>→</b><code>--cvp-table-row-bg-selected</code><b>→</b><span>Table CSS</span></div></section>
  </section>;
}
