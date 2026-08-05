import React, { useState } from 'react';
import { BellRing, Sparkles } from 'lucide-react';
import { NotificationBanner } from './NotificationBanner';
import { OutlineButton } from './OutlineButton';
import './NotificationBannerDocumentation.css';

const tokens = [
  ['Info surface', '--cvp-notification-banner-info-bg', '--cvp-color-state-info-bg', 'Theme-resolved status surface', 'variant="info"'],
  ['Success surface', '--cvp-notification-banner-success-bg', '--cvp-color-state-success-bg', 'Theme-resolved status surface', 'variant="success"'],
  ['Warning surface', '--cvp-notification-banner-warning-bg', '--cvp-color-state-warning-bg', 'Theme-resolved status surface', 'variant="warning"'],
  ['Error surface', '--cvp-notification-banner-error-bg', '--cvp-color-state-error-bg', 'Theme-resolved status surface', 'variant="error"'],
  ['Boundary', '--cvp-notification-banner-*-border', '--cvp-color-state-*-border', '1px semantic boundary', 'All variants'],
  ['Text', '--cvp-notification-banner-*-text', '--cvp-color-state-*-text', 'WCAG-audited semantic text', 'Title / message / action'],
  ['Focus', '--cvp-notification-banner-focus-ring', '--cvp-border-focus-ring', 'Border + halo', 'Controls :focus-visible'],
  ['Radius', '--cvp-notification-banner-radius', '--cvp-radius-md', '8px', 'Banner surface'],
  ['Spacing', '--cvp-notification-banner-gap', '--cvp-space-3', '12px', 'Icon / content / dismiss'],
];

export function NotificationBannerDocumentation() {
  const [dismissible, setDismissible] = useState(true);
  const [actionUsed, setActionUsed] = useState(false);
  return (
    <main className="notification-banner-docs documentation-container">
      <header className="notification-banner-docs__hero"><span className="notification-banner-docs__eyebrow">Feedback</span><h1>Notification Banner</h1><p>Persistent, in-flow feedback that keeps important context visible near the content it affects. Use it for guidance, status, warnings, and recoverable errors.</p></header>

      <section className="notification-banner-docs__section" aria-labelledby="notification-variants"><div className="notification-banner-docs__section-heading"><div><span>01</span><h2 id="notification-variants">Semantic variants</h2></div><p>All colors resolve from the same state semantics as Toast while retaining an inline layout.</p></div><div className="notification-banner-docs__examples"><NotificationBanner title="Localized fields available" message="Switch languages without leaving the current collection." variant="info" icon={Sparkles} /><NotificationBanner title="Changes saved" message="Your rail configuration is now live." variant="success" /><NotificationBanner title="Review required" message="Two collections need content before publishing." variant="warning" /><NotificationBanner title="Unable to sync" message="Check the provider connection and try again." variant="error" /></div></section>

      <section className="notification-banner-docs__section" aria-labelledby="notification-actions"><div className="notification-banner-docs__section-heading"><div><span>02</span><h2 id="notification-actions">Actions and dismissal</h2></div><p>Actions stay concise and relevant; dismissal is optional because some guidance must remain visible.</p></div><div className="notification-banner-docs__interaction">{dismissible ? <NotificationBanner title="Content approval required" message={actionUsed ? 'Approval queue opened for review.' : 'Three items are waiting in the approval queue.'} variant="warning" actionLabel="Review approvals" onAction={() => setActionUsed(true)} onDismiss={() => setDismissible(false)} /> : <div className="notification-banner-docs__restore"><BellRing size={20} /><span>Banner dismissed</span><OutlineButton onClick={() => { setDismissible(true); setActionUsed(false); }}>Restore banner</OutlineButton></div>}</div></section>

      <section className="notification-banner-docs__section" aria-labelledby="notification-behavior"><div className="notification-banner-docs__section-heading"><div><span>03</span><h2 id="notification-behavior">Behavior contract</h2></div></div><div className="notification-banner-docs__behavior"><article><strong>Inline placement</strong><p>Place immediately before the region or task the message describes.</p></article><article><strong>Announcement priority</strong><p>Info and success use status; warning and error use alert.</p></article><article><strong>One clear action</strong><p>Link directly to resolution. Avoid multiple competing controls.</p></article><article><strong>No timeout</strong><p>The banner persists until its context changes or the user dismisses it.</p></article></div></section>

      <section className="notification-banner-docs__section" aria-labelledby="notification-token-contract"><div className="notification-banner-docs__section-heading"><div><span>04</span><h2 id="notification-token-contract">Token contract</h2></div><p>Component CSS consumes Tier 3 aliases only; light and dark values resolve through canonical CVP sources.</p></div><div className="notification-banner-docs__contract-wrap"><table className="notification-banner-docs__contract"><thead><tr><th>Role</th><th>Tier 3 token</th><th>Canonical source</th><th>Resolved contract</th><th>Activation</th></tr></thead><tbody>{tokens.map(([role, token, source, resolved, activation]) => <tr key={token}><td>{role}</td><td><code>{token}</code></td><td><code>{source}</code></td><td>{resolved}</td><td>{activation}</td></tr>)}</tbody></table></div><p className="notification-banner-docs__handoff">Engineering guidance: <code>NOTIFICATION_BANNER_DEV_HANDOFF.md</code></p></section>
    </main>
  );
}
