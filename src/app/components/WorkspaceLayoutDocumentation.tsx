import React, { useRef, useState } from 'react';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import './WorkspaceLayoutDocumentation.css';
import './WorkspaceLayoutDemo.css';
import './WorkspaceLayoutConnectivity.css';

const rows: ComponentTokenContractRow[] = [
  { role: 'Canvas', token: '--cvp-color-surface-page', source: 'Semantic surface token', contract: 'Shared workspace background', activation: 'All slots' },
  { role: 'Divider', token: '--cvp-color-border-subtle', source: 'Semantic border token', contract: 'Separates panels and toolbars', activation: 'Adjacent slots' },
  { role: 'Spacing', token: '--cvp-space-*', source: 'Primitive spacing scale', contract: 'Page-specific inset and gap values', activation: 'Page content' },
  { role: 'Layering', token: '--cvp-z-sticky', source: 'Elevation contract', contract: 'Sticky action and table controls', activation: 'Footer or table' },
];

const quickRows: ComponentTokenContractRow[] = [
  { role: 'Global header', token: '48px', source: 'WorkspaceLayout.GlobalHeader', contract: 'Fixed page header height', activation: 'Always' },
  { role: 'Rails List side panel', token: '32vw · 320–640px', source: 'WorkspaceLayout.Body', contract: 'Reference collection-panel range; resizable', activation: 'Rails List' },
  { role: 'Rail Details side panel', token: '344px', source: 'WorkspaceLayout.Body', contract: 'Reference configuration-panel width; resizable', activation: 'Rail Details' },
  { role: 'Panel divider', token: '1px line · 8px hit area', source: '--cvp-workspace-divider-{color,hit-area}', contract: 'Subtle by default; brand on hover or focus', activation: 'Desktop' },
  { role: 'Panel inset', token: '--cvp-space-4 · 16px', source: 'Page styles', contract: 'Default inset for panel content and toolbars', activation: 'Inside a panel' },
  { role: 'Control stack', token: '--cvp-space-3 · 12px', source: 'Page styles', contract: 'Related controls; use 16px between groups', activation: 'Inside a panel' },
  { role: 'Responsive', token: '≤720px', source: 'WorkspaceLayout', contract: 'Panels stack and the resize divider is hidden', activation: 'Small screens' },
];

const compositionExample = ['<WorkspaceLayout>', '  <WorkspaceLayout.GlobalHeader>…</WorkspaceLayout.GlobalHeader>', '  <WorkspaceLayout.Body sidePanelWidth="344px">', '    <WorkspaceLayout.SidePanel>…</WorkspaceLayout.SidePanel>', '    <WorkspaceLayout.ResizeHandle />', '    <WorkspaceLayout.Main>', '      <WorkspaceLayout.PageHeader>…</WorkspaceLayout.PageHeader>', '      <WorkspaceLayout.Toolbar>…</WorkspaceLayout.Toolbar>', '      …', '    </WorkspaceLayout.Main>', '  </WorkspaceLayout.Body>', '  <WorkspaceLayout.Footer>…</WorkspaceLayout.Footer>', '</WorkspaceLayout>'].join('\n');

function DynamicWorkspacePreview() {
  const [page, setPage] = useState<'list' | 'details'>('list');
  const [sideWidth, setSideWidth] = useState(420);
  const frameRef = useRef<HTMLDivElement>(null);
  const limits = page === 'list' ? { min: 320, max: 640 } : { min: 280, max: 480 };
  const selectPage = (next: 'list' | 'details') => { setPage(next); setSideWidth(next === 'list' ? 420 : 344); };
  const startResize = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const frame = frameRef.current;
    if (!frame) return;
    const origin = event.clientX;
    const initial = sideWidth;
    const onMove = (moveEvent: PointerEvent) => setSideWidth(Math.max(limits.min, Math.min(limits.max, initial + moveEvent.clientX - origin)));
    const onEnd = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onEnd); };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onEnd, { once: true });
  };
  const isList = page === 'list';
  return <div className="cvp-workspace-demo">
    <div className="cvp-workspace-demo__controls"><div className="cvp-workspace-demo__switch" aria-label="Workspace example"><button type="button" aria-pressed={isList} onClick={() => selectPage('list')}>Rails List</button><button type="button" aria-pressed={!isList} onClick={() => selectPage('details')}>Rail Details</button></div><span className="cvp-workspace-demo__width">Left panel: {sideWidth}px · drag divider</span></div>
    <div ref={frameRef} className="cvp-workspace-demo__frame" style={{ gridTemplateColumns: `${sideWidth}px var(--cvp-border-base-width) minmax(0, 1fr)` }}>
      <aside className="cvp-workspace-demo__side"><div className="cvp-workspace-demo__side-title">{isList ? 'Overview' : 'Rail Manager'}</div><div className="cvp-workspace-demo__side-body">{isList ? <><div className="cvp-workspace-demo__side-action">＋ Add new rail collection</div><div className="cvp-workspace-demo__tree"><span>⌄ ◫ Home (6)</span><span>　Spotlight</span><span>　Trending</span><span>　Drama (5)</span></div></> : <><div className="cvp-workspace-demo__side-action">Base · Content Query</div><div className="cvp-workspace-demo__tree"><span>Rail name</span><span>Rail status</span><span>Media format</span><span>Query notes</span></div></>}</div></aside>
      <button type="button" className="cvp-workspace-demo__resize" aria-label="Resize left panel" title="Drag to resize the left panel" onPointerDown={startResize}><span aria-hidden="true" /></button>
      <section className="cvp-workspace-demo__main"><div className="cvp-workspace-demo__main-header"><span>{isList ? '☷  Rails List' : '◧  Content Preview'}</span><span>{isList ? '＋ Create rail' : 'Trending'}</span></div><div className="cvp-workspace-demo__toolbar">{isList ? <><span className="cvp-workspace-demo__pill">⌕ Add filter</span><span>38 rows</span></> : <><span>← Rails List / Trending</span><span className="cvp-workspace-demo__pill">Editorial</span></>}</div><div className="cvp-workspace-demo__content">{isList ? <div className="cvp-workspace-demo__rows"><span>Home · 6 items</span><span>　Spotlight　　　 Home　　 1　　 Recommended</span><span>　Trending　　　 Home　　 2　　 Editorial</span><span>Drama · 5 items</span></div> : <div className="cvp-workspace-demo__preview"><span /><span /><span /><span /><span /><span /></div>}</div><div className="cvp-workspace-demo__footer">{isList ? 'Page 1 of 1' : 'Duplicate　 Preview　 Save changes'}</div></section>
    </div>
  </div>;
}

export function WorkspaceLayoutDocumentation() {
  return <main className="cvp-workspace-doc">
    <header className="cvp-workspace-doc__hero"><div><span>Application pattern · Standardized</span><h1>Workspace Layout</h1></div><p>A compositional shell for operational pages with a shared header, optional side panel, focused main area, and contextual footer.</p></header>
    <section className="cvp-workspace-doc__panel"><header><b>01</b><div><h2>Implementation reference</h2><p>A practical reference for the Rails List and Rail Details workspace structure. Adapt page content while retaining the shared layout principles.</p></div></header><ComponentTokenContract label="Workspace Layout reference" rows={quickRows} /></section>
    <section className="cvp-workspace-doc__panel"><header><b>02</b><div><h2>Interactive reference</h2><p>Switch between the two pages and drag the divider to explore their shared shell structure and side-panel range.</p></div></header><DynamicWorkspacePreview /></section>
<section className="cvp-workspace-doc__panel"><header><b>03</b><div><h2>Panel spacing</h2><p>Panel boundaries are tokenized. Apply inset spacing inside a panel; use dividers—not arbitrary gaps—between persistent panels.</p></div></header><div className="cvp-workspace-doc__spacing"><article><div className="cvp-workspace-doc__spacing-panel"><span>Panel content</span></div><strong>Panel inset</strong><code>--cvp-space-4</code><p>Reference 16px inset for operational side panels and toolbars.</p></article><article><div className="cvp-workspace-doc__spacing-split"><span>Left panel</span><i aria-hidden="true" /><span>Main area</span></div><strong>Resizable divider</strong><code>--cvp-workspace-divider-*</code><p>A continuous subtle 1px divider with an invisible 8px drag target; it uses the brand divider color on hover or focus.</p></article><article><div className="cvp-workspace-doc__spacing-stack"><span>Heading</span><i aria-hidden="true" /><span>Controls</span></div><strong>Internal stack</strong><code>--cvp-space-3</code><p>Reference 12px between related controls; use 16px for distinct groups.</p></article></div><p className="cvp-workspace-doc__implementation-note"><strong>Reference widths:</strong> Rails List begins at 32vw (320–640px) to give collections more working room. Rail Details begins at 344px. Adjust either with the shared divider when the task needs it.</p></section>
    <section className="cvp-workspace-doc__panel"><header><b>04</b><div><h2>Composition rule</h2><p>The shell owns canvas, pane boundaries, responsive stacking, and structural sizing. The consuming page owns its controls, content, and task-specific sticky behaviour.</p></div></header><pre>{compositionExample}</pre></section>
    <section className="cvp-workspace-doc__panel"><header><b>05</b><div><h2>Token contract</h2><p>Use semantic tokens in page styles; do not introduce page-local canvas, divider, or layering values.</p></div></header><ComponentTokenContract label="Workspace Layout token contract" rows={rows} /></section>
    <section className="cvp-workspace-doc__decisions"><article><strong>Use it for</strong><p>Full-height operational pages with persistent navigation or configuration alongside a work area.</p></article><article><strong>Do not use it for</strong><p>Standalone forms, lightweight documentation pages, or a one-column detail view without workspace behaviour.</p></article></section>
  </main>;
}
