import React from 'react';
import { Info } from 'lucide-react';
import { Toast, ToastProvider, useToast } from './Toast';
import { OutlineButton } from './OutlineButton';
import './ToastDocumentation.css';

const toastTokens = [
  ['Success surface', '--cvp-toast-success-bg', '--cvp-color-state-success-bg', 'Theme-resolved status surface', 'variant="success"'],
  ['Warning surface', '--cvp-toast-warning-bg', '--cvp-color-state-warning-bg', 'Theme-resolved status surface', 'variant="warning"'],
  ['Danger surface', '--cvp-toast-error-bg', '--cvp-color-state-error-bg', 'Theme-resolved status surface', 'variant="danger"'],
  ['Info surface', '--cvp-toast-info-bg', '--cvp-color-state-info-bg', 'Theme-resolved status surface', 'variant="info"'],
  ['Info icon', '--cvp-toast-info-icon', '--cvp-color-state-info-text', 'Matches the localized-field available blue', 'variant="info"'],
  ['Boundary', '--cvp-toast-*-border', '--cvp-color-state-*-border', '1px semantic boundary', 'All variants'],
  ['Text', '--cvp-toast-*-text', '--cvp-color-state-*-text', 'WCAG-audited semantic text', 'Title / description'],
  ['Focus', '--cvp-toast-focus-ring', '--cvp-border-focus-ring', 'Border + halo', 'Dismiss :focus-visible'],
  ['Elevation', '--cvp-toast-shadow', '--cvp-shadow-lg', 'Overlay elevation', 'Toast surface'],
  ['Radius', '--cvp-toast-radius', '--cvp-shape-overlay-base', '12px', 'Toast surface'],
  ['Motion', '--cvp-toast-motion-easing', '--cvp-motion-easing-standard', 'Reduced-motion aware', 'Toast entry'],
];

function ToastExamples() {
  const { addToast, clearAll } = useToast();
  const show = (variant: 'success' | 'warning' | 'danger' | 'info') => addToast({
    variant,
    title: variant === 'danger' ? 'Unable to save' : `${variant[0].toUpperCase()}${variant.slice(1)}`,
    description: variant === 'success' ? 'Rail changes were saved successfully.' : variant === 'warning' ? 'Review the collection order before publishing.' : variant === 'danger' ? 'Check your connection and try again.' : 'The content sync is running in the background.',
  });

  return (
    <main className="toast-docs documentation-container">
      <header className="toast-docs__hero"><span className="toast-docs__eyebrow">Feedback</span><h1>Toast</h1><p>Brief, non-blocking feedback for the result or status of an action. Messages stay concise, use semantic status colour, and never replace validation next to the affected field.</p></header>

      <section className="toast-docs__section" aria-labelledby="toast-preview"><div className="toast-docs__section-heading"><div><span>01</span><h2 id="toast-preview">Interactive preview</h2></div><p>Triggers use the production provider, queue, timing, announcement, and dismissal behavior.</p></div><div className="toast-docs__actions"><OutlineButton onClick={() => show('success')}>Show success</OutlineButton><OutlineButton onClick={() => show('warning')}>Show warning</OutlineButton><OutlineButton onClick={() => show('danger')}>Show danger</OutlineButton><OutlineButton onClick={() => show('info')}>Show information</OutlineButton><OutlineButton onClick={clearAll}>Clear all</OutlineButton></div></section>

      <section className="toast-docs__section" aria-labelledby="toast-variants"><div className="toast-docs__section-heading"><div><span>02</span><h2 id="toast-variants">Visual variants</h2></div><p>Static examples expose the complete light and dark visual contract without timers. The information icon uses the same semantic blue as the information text.</p></div><div className="toast-docs__variants"><Toast id="static-success" variant="success" title="Changes saved" description="Your rail configuration is up to date." onDismiss={() => undefined} /><Toast id="static-warning" variant="warning" title="Review required" description="Two collections are missing content." onDismiss={() => undefined} /><Toast id="static-danger" variant="danger" title="Unable to publish" description="Resolve the validation errors and try again." onDismiss={() => undefined} /><Toast id="static-info" variant="info" title="Sync in progress" description="New content will appear automatically." onDismiss={() => undefined} /></div></section>

      <section className="toast-docs__section" aria-labelledby="toast-behavior"><div className="toast-docs__section-heading"><div><span>03</span><h2 id="toast-behavior">Behavior contract</h2></div></div><div className="toast-docs__behavior"><article><Info size={20} /><strong>Polite by default</strong><p>Success and information use status announcements; warnings and errors use alerts.</p></article><article><strong>5 seconds</strong><p>Default timeout. Use duration 0 only when the user must dismiss the message.</p></article><article><strong>Top end</strong><p>A fixed, responsive region keeps notifications discoverable without blocking work.</p></article><article><strong>Reduced motion</strong><p>The entry transition is removed when the operating system requests it.</p></article></div></section>

      <section className="toast-docs__section" aria-labelledby="toast-token-contract"><div className="toast-docs__section-heading"><div><span>04</span><h2 id="toast-token-contract">Token contract</h2></div><p>Toast CSS consumes Tier 3 aliases only; both themes resolve at the canonical semantic layer.</p></div><div className="toast-docs__contract-wrap"><table className="toast-docs__contract"><thead><tr><th>Role</th><th>Tier 3 token</th><th>Canonical source</th><th>Resolved contract</th><th>Activation</th></tr></thead><tbody>{toastTokens.map(([role, token, source, resolved, activation]) => <tr key={token}><td>{role}</td><td><code>{token}</code></td><td><code>{source}</code></td><td>{resolved}</td><td>{activation}</td></tr>)}</tbody></table></div><p className="toast-docs__handoff">Engineering guidance: <code>TOAST_COMPONENT_DEV_HANDOFF.md</code></p></section>
    </main>
  );
}

export function ToastDocumentation() { return <ToastProvider><ToastExamples /></ToastProvider>; }
