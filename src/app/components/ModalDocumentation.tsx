import React, { useState } from 'react';
import { AlertTriangle, FileText, LayoutPanelTop, SlidersHorizontal } from 'lucide-react';
import { Modal } from './Modal';
import { PrimaryButton } from './PrimaryButton';
import { OutlineButton } from './OutlineButton';
import { TextInput } from './TextInput';
import { Checkbox } from './Checkbox';
import './ModalDocumentation.css';

type Demo = 'default' | 'confirm' | 'tabbed' | 'long' | null;

const modalTokens = [
  ['Surface', '--cvp-modal-bg', '--cvp-color-surface-default', 'Theme resolved', 'Dialog surface / footer'],
  ['Boundary', '--cvp-modal-border', '--cvp-color-border-default', '1px container boundary', 'Dialog container'],
  ['Backdrop', '--cvp-modal-backdrop-bg', '--cvp-color-overlay-scrim', 'Theme resolved scrim', 'isOpen=true'],
  ['Title', '--cvp-modal-header-text', '--cvp-color-text-primary', '18px / relaxed', 'Title present'],
  ['Body', '--cvp-modal-body-text', '--cvp-color-text-secondary', '14px / normal', 'Body content'],
  ['Divider', '--cvp-modal-divider', '--cvp-color-border-subtle', '1px divider', 'Header / tabs / footer'],
  ['Danger title', '--cvp-modal-danger-title', '--cvp-color-text-danger', 'Theme resolved danger', 'tone="danger"'],
  ['Focus', '--cvp-modal-focus-ring', '--cvp-border-focus-ring', 'Border + halo', ':focus-visible'],
  ['Elevation', '--cvp-modal-shadow', '--cvp-shadow-modal', 'Modal elevation', 'Dialog container'],
  ['Radius', '--cvp-modal-radius', '--cvp-shape-overlay-base', '12px', 'Dialog container'],
  ['Motion', '--cvp-modal-easing', '--cvp-motion-easing-standard', 'Standard easing', 'Open transition'],
];

export function ModalDocumentation() {
  const [demo, setDemo] = useState<Demo>(null);

  return (
    <main className="modal-docs documentation-container">
      <header className="modal-docs__hero">
        <span className="modal-docs__eyebrow">Overlays</span>
        <h1>Modal</h1>
        <p>A focused task surface for decisions and workflows that must temporarily interrupt the underlying page. Use it deliberately and keep the action hierarchy obvious.</p>
      </header>

      <section className="modal-docs__section" aria-labelledby="modal-examples">
        <div className="modal-docs__section-heading"><div><span>01</span><h2 id="modal-examples">Variants</h2></div><p>Each trigger opens the production component with real focus, dismissal, scrolling, and theme behavior.</p></div>
        <div className="modal-docs__variant-grid">
          <article><LayoutPanelTop size={20} /><h3>Default task</h3><p>Form or configuration work with a clear primary action.</p><OutlineButton onClick={() => setDemo('default')}>Open default modal</OutlineButton></article>
          <article><AlertTriangle size={20} /><h3>Destructive confirmation</h3><p>A concise warning with an irreversible action.</p><OutlineButton onClick={() => setDemo('confirm')}>Open confirmation</OutlineButton></article>
          <article><SlidersHorizontal size={20} /><h3>Tabbed workflow</h3><p>Related settings separated within one focused context.</p><OutlineButton onClick={() => setDemo('tabbed')}>Open tabbed modal</OutlineButton></article>
          <article><FileText size={20} /><h3>Scrollable content</h3><p>A fixed header and footer around a contained body region.</p><OutlineButton onClick={() => setDemo('long')}>Open long modal</OutlineButton></article>
        </div>
      </section>

      <section className="modal-docs__section" aria-labelledby="modal-anatomy">
        <div className="modal-docs__section-heading"><div><span>02</span><h2 id="modal-anatomy">Anatomy and behavior</h2></div><p>The hierarchy remains stable across sizes and content types.</p></div>
        <div className="modal-docs__anatomy">
          <div className="modal-docs__anatomy-preview">
            <div className="modal-docs__mock-header"><div><strong>Modal title</strong><small>Optional supporting description</small></div><span>×</span></div>
            <div className="modal-docs__mock-tabs"><span className="modal-docs__mock-tab--active">General</span><span>Settings</span></div>
            <div className="modal-docs__mock-body"><span>Content remains independently scrollable.</span></div>
            <div className="modal-docs__mock-footer"><span>Secondary</span><strong>Primary action</strong></div>
          </div>
          <ol>
            <li><span>1</span><div><strong>Header</strong><p>Names the task and explains only what is necessary.</p></div></li>
            <li><span>2</span><div><strong>Dismissal</strong><p>Escape, close button, and optional backdrop dismissal share one callback.</p></div></li>
            <li><span>3</span><div><strong>Body</strong><p>Owns vertical overflow so context and actions remain visible.</p></div></li>
            <li><span>4</span><div><strong>Footer</strong><p>Places the primary action last and separates it from body content.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="modal-docs__section" aria-labelledby="modal-sizes">
        <div className="modal-docs__section-heading"><div><span>03</span><h2 id="modal-sizes">Size contract</h2></div></div>
        <div className="modal-docs__size-grid">
          <div><span className="modal-docs__size modal-docs__size--small" /><strong>Small · 400px</strong><small>Confirmations and short notices</small></div>
          <div><span className="modal-docs__size modal-docs__size--medium" /><strong>Medium · 600px</strong><small>Default forms and focused tasks</small></div>
          <div><span className="modal-docs__size modal-docs__size--large" /><strong>Large · 800px</strong><small>Tabbed and complex configuration</small></div>
        </div>
      </section>

      <section className="modal-docs__section" aria-labelledby="modal-token-contract">
        <div className="modal-docs__section-heading"><div><span>04</span><h2 id="modal-token-contract">Token contract</h2></div><p>Modal CSS consumes Tier 3 tokens only; light and dark values resolve at the semantic tier.</p></div>
        <div className="modal-docs__contract-wrap"><table className="modal-docs__contract"><thead><tr><th>Role</th><th>Tier 3 token</th><th>Canonical source</th><th>Resolved contract</th><th>Activation</th></tr></thead><tbody>{modalTokens.map(([role, token, source, resolved, activation]) => <tr key={token}><td>{role}</td><td><code>{token}</code></td><td><code>{source}</code></td><td>{resolved}</td><td>{activation}</td></tr>)}</tbody></table></div>
        <p className="modal-docs__handoff">Engineering guidance: <code>MODAL_COMPONENT_DEV_HANDOFF.md</code></p>
      </section>

      <Modal isOpen={demo === 'default'} onClose={() => setDemo(null)} title="Create collection" description="Add a collection to the current rail configuration." footer={<><OutlineButton onClick={() => setDemo(null)}>Cancel</OutlineButton><PrimaryButton onClick={() => setDemo(null)}>Create collection</PrimaryButton></>}>
        <div className="modal-docs__form"><TextInput id="modal-collection-name" label="Collection name" placeholder="Enter a descriptive name" /><Checkbox id="modal-publish" label="Publish immediately" description="The collection will be visible after creation." /></div>
      </Modal>

      <Modal isOpen={demo === 'confirm'} onClose={() => setDemo(null)} title="Delete collection?" description="This removes the collection from the rail and cannot be undone." size="small" tone="danger" footer={<><OutlineButton onClick={() => setDemo(null)}>Cancel</OutlineButton><button className="modal-docs__danger-button" type="button" onClick={() => setDemo(null)}>Delete collection</button></>}>
        <div className="modal-docs__warning"><AlertTriangle size={20} aria-hidden="true" /><p><strong>Drama Collection 2</strong> and its current ordering will be permanently removed.</p></div>
      </Modal>

      <Modal isOpen={demo === 'tabbed'} onClose={() => setDemo(null)} title="Collection settings" description="Manage presentation and delivery behavior." size="large" variant="tabbed" tabs={[{ id: 'general', label: 'General', content: <div className="modal-docs__form"><TextInput id="modal-display-name" label="Display name" defaultValue="Spotlight" /><Checkbox id="modal-recommended" label="Recommended collection" /></div> }, { id: 'delivery', label: 'Delivery', content: <div className="modal-docs__form"><Checkbox id="modal-home" label="Show on Home" description="Include this collection in the Home experience." /><Checkbox id="modal-kids" label="Show for Kids profiles" /></div> }, { id: 'advanced', label: 'Advanced', content: <p className="modal-docs__body-copy">Advanced configuration should remain concise. Move full-page workflows out of a modal.</p> }]} footer={<><OutlineButton onClick={() => setDemo(null)}>Cancel</OutlineButton><PrimaryButton onClick={() => setDemo(null)}>Save changes</PrimaryButton></>} />

      <Modal isOpen={demo === 'long'} onClose={() => setDemo(null)} title="Collection activity" description="Review recent changes without losing page context." size="medium" footer={<PrimaryButton onClick={() => setDemo(null)}>Done</PrimaryButton>}>
        <div className="modal-docs__activity">{Array.from({ length: 12 }, (_, index) => <article key={index}><strong>Collection update {index + 1}</strong><p>Ordering and editorial metadata were updated for this rail collection.</p></article>)}</div>
      </Modal>
    </main>
  );
}
