import React, { useState } from 'react';
import { AlertCircle, KeyRound, ShieldCheck, UserPlus } from 'lucide-react';
import { LoginSignUp } from './LoginSignUp';
import { Segmented } from './Segmented';
import './LoginSignUpDocumentation.css';

const tokenRows = [
  ['Page surface', '--cvp-login-page-bg', '--login-bg-gradient-start / end', 'Original product gradient', 'Always'],
  ['Card surface', '--cvp-login-card-bg', '--cvp-modal-bg', 'Shared dialog surface', 'Always'],
  ['Card boundary', '--cvp-login-card-border', '--cvp-modal-border', 'Shared dialog perimeter', 'Always'],
  ['Card elevation', '--cvp-login-card-shadow', '--cvp-modal-shadow', 'Shared dialog elevation', 'Always'],
  ['Primary text', '--cvp-login-title', '--cvp-color-text-primary', 'Heading and content', 'Always'],
  ['Supporting text', '--cvp-login-muted', '--cvp-color-text-muted', 'Context and footer', 'Always'],
  ['Link text', '--cvp-login-link', '--cvp-color-text-link-default', 'Legal and recovery links', 'Interactive'],
  ['Page spacing', '--cvp-login-page-padding', '--cvp-spacing-container-md', 'Responsive canvas inset', 'Always'],
  ['Card shape', '--cvp-login-card-radius', '--cvp-shape-overlay-base', 'Card corners', 'Always']
];

export function LoginSignUpDocumentation() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [scenario, setScenario] = useState<'default' | 'error' | 'loading'>('default');
  return <main className="login-docs documentation-container">
    <header className="login-docs__hero"><span>Pages</span><h1>Login / Sign Up</h1><p>A unified, theme-aware authentication page composed from canonical CVP form, action, feedback, and dialog-surface contracts.</p></header>

    <section className="login-docs__section" aria-labelledby="login-live"><div className="login-docs__section-heading"><div><span>01</span><h2 id="login-live">Interactive preview</h2></div><p>Switch the flow and service state; use the global theme control to audit the same component in light and dark.</p></div>
      <div className="login-docs__toolbar"><Segmented ariaLabel="Authentication flow" value={mode} onChange={value => setMode(value as typeof mode)} options={[{value:'sign-in',label:'Sign in'},{value:'sign-up',label:'Sign up'}]} /><Segmented ariaLabel="Preview state" value={scenario} onChange={value => setScenario(value as typeof scenario)} options={[{value:'default',label:'Default'},{value:'error',label:'Error'},{value:'loading',label:'Loading'}]} /></div>
      <div className="login-docs__preview"><LoginSignUp key={`${mode}-${scenario}`} initialMode={mode} allowModeSwitch={false} loading={scenario === 'loading'} error={scenario === 'error' ? 'The email or password does not match our records. Check the details and try again.' : undefined} /></div>
    </section>

    <section className="login-docs__section" aria-labelledby="login-anatomy"><div className="login-docs__section-heading"><div><span>02</span><h2 id="login-anatomy">Composition and states</h2></div><p>Product layout owns the page shell; child components retain their established contracts.</p></div><div className="login-docs__grid">
      <article><KeyRound /><strong>Credential flow</strong><p>Persistent labels, correct autocomplete hints, visibility control, recovery action and native form submission.</p></article>
      <article><UserPlus /><strong>Account creation</strong><p>The same component introduces name and password guidance without forking theme or layout code.</p></article>
      <article><AlertCircle /><strong>Service feedback</strong><p>Error feedback uses the shared Notification Banner; loading remains associated with the current action.</p></article>
      <article><ShieldCheck /><strong>Enterprise access</strong><p>Single sign-on remains a visually distinct secondary path and the selected CVP product is explicit.</p></article>
    </div></section>

    <section className="login-docs__section" aria-labelledby="login-contract"><div className="login-docs__section-heading"><div><span>03</span><h2 id="login-contract">Token contract</h2></div><p>Page CSS consumes Tier 3 aliases; color and theme changes resolve through the canonical semantic layer.</p></div><div className="login-docs__contract-wrap"><table className="login-docs__contract"><thead><tr><th>Role</th><th>Tier 3 token</th><th>Canonical source</th><th>Resolved contract</th><th>Activation</th></tr></thead><tbody>{tokenRows.map(row => <tr key={row[1]}>{row.map(cell => <td key={cell}>{cell.startsWith('--') ? <code>{cell}</code> : cell}</td>)}</tr>)}</tbody></table></div><p className="login-docs__handoff">Engineering guidance: <code>LOGIN_SIGN_UP_DEV_HANDOFF.md</code>. The former <code>LoginSignUpLight</code> export is a deprecated compatibility wrapper; new work uses <code>LoginSignUp</code>.</p></section>
  </main>;
}
