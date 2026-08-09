import React from 'react';

const checks = [
  ['Tokens', 'Use semantic --cvp-* tokens for colour, type, spacing, shape, motion, and focus decisions.'],
  ['Contrast', 'Verify 4.5:1 for normal text, 3:1 for large text and non-text controls, in both themes.'],
  ['Interaction', 'Confirm keyboard flow, programmatic names, visible focus, and status or error announcements.'],
  ['Responsive', 'Review reflow, zoom, touch targets, and overflow at every supported breakpoint.'],
];

export function AccessibilityDocumentation() {
  return (
    <section style={{ maxWidth: '960px', padding: 'var(--cvp-space-8) 0', color: 'var(--cvp-color-text-primary)' }}>
      <header style={{ marginBottom: 'var(--cvp-space-6)' }}>
        <p style={{ margin: '0 0 var(--cvp-space-2)', color: 'var(--cvp-color-text-brand)', fontSize: 'var(--cvp-font-size-sm)', fontWeight: 'var(--cvp-font-weight-semibold)', letterSpacing: 'var(--cvp-letter-spacing-wide)', textTransform: 'uppercase' }}>Quality standard</p>
        <h1 style={{ margin: '0 0 var(--cvp-space-3)', fontSize: 'var(--cvp-font-size-2xl)', lineHeight: 'var(--cvp-line-height-tight)' }}>Accessibility audit</h1>
        <p style={{ margin: 0, color: 'var(--cvp-color-text-muted)', lineHeight: 'var(--cvp-line-height-relaxed)' }}>The system targets WCAG 2.2 AA. Conformance is recorded route by route, state by state, and in both themes; it is never inferred from token usage alone.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 'var(--cvp-space-3)', marginBottom: 'var(--cvp-space-6)' }}>
        {checks.map(([title, description]) => <article key={title} style={{ padding: 'var(--cvp-space-4)', background: 'var(--cvp-color-surface-default)', border: 'var(--cvp-border-container)', borderRadius: 'var(--cvp-shape-surface-subtle)' }}>
          <h2 style={{ margin: '0 0 var(--cvp-space-2)', fontSize: 'var(--cvp-font-size-md)' }}>{title}</h2>
          <p style={{ margin: 0, color: 'var(--cvp-color-text-muted)', fontSize: 'var(--cvp-font-size-sm)', lineHeight: 'var(--cvp-line-height-snug)' }}>{description}</p>
        </article>)}
      </div>

      <section style={{ padding: 'var(--cvp-space-4)', background: 'var(--cvp-color-surface-subtle)', border: 'var(--cvp-border-container)', borderRadius: 'var(--cvp-shape-surface-subtle)' }}>
        <h2 style={{ margin: '0 0 var(--cvp-space-2)', fontSize: 'var(--cvp-font-size-md)' }}>Release gate</h2>
        <p style={{ margin: 0, color: 'var(--cvp-color-text-secondary)', lineHeight: 'var(--cvp-line-height-snug)' }}>Run the automated scan with <code>?audit=1</code> on every supported route, then complete manual keyboard, screen-reader, contrast, zoom, and responsive checks. Disabled controls remain a WCAG contrast exception and must not be the only indicator of essential information.</p>
      </section>
    </section>
  );
}
