import React, { useState } from 'react';
import { Database, FileText, Folder, Home, Play, Rss, Settings, Shield, Users } from 'lucide-react';
import { BreadcrumbItem, Breadcrumbs } from './Breadcrumbs';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import './TextInputDocumentation.css';
import './BreadcrumbsDocumentation.css';

const tokenRows: ComponentTokenContractRow[] = [
  { role:'Surface', token:'--cvp-breadcrumb-bg', source:'--cvp-color-breadcrumb-bg', contract:'Theme-resolved navigation strip', activation:'Base' },
  { role:'Ancestor text', token:'--cvp-breadcrumb-text', source:'--cvp-color-text-muted', contract:'4.5:1 minimum', activation:'Base' },
  { role:'Current text', token:'--cvp-breadcrumb-text-active', source:'--cvp-color-text-primary', contract:'Highest hierarchy emphasis', activation:'aria-current=page' },
  { role:'Ancestor hover', token:'--cvp-breadcrumb-text-hover', source:'--cvp-color-text-primary', contract:'Text-only hierarchy inversion', activation:'Interactive ancestor :hover' },
  { role:'Current hover', token:'--cvp-breadcrumb-text-current-hover', source:'--cvp-color-text-muted', contract:'Text-only hierarchy inversion', activation:'Current item :hover' },
  { role:'Focus', token:'--cvp-breadcrumb-focus-ring', source:'--cvp-border-focus-ring', contract:'Canonical visible ring', activation:':focus-visible' },
  { role:'Popup surface', token:'--cvp-breadcrumb-menu-bg', source:'--cvp-menu-bg', contract:'Shared menu surface', activation:'Dropdown open' },
  { role:'Popup elevation', token:'--cvp-breadcrumb-menu-shadow', source:'--cvp-menu-shadow', contract:'Shared menu elevation', activation:'Dropdown open' },
  { role:'Target height', token:'--cvp-breadcrumb-target-height', source:'--cvp-space-8', contract:'32px compact navigation target', activation:'Interactive ancestors' },
];

const basicItems: BreadcrumbItem[] = [
  { id:'feeds', label:'Feeds List', icon:Rss, href:'#feeds' },
  { id:'feed', label:'Feed Name 4' },
];

export function BreadcrumbsDocumentation() {
  const [destination, setDestination] = useState('Current page');
  const dropdownItems: BreadcrumbItem[] = [
    { id:'settings', label:'Settings', icon:Settings, dropdown:[
      { id:'general', label:'General settings', icon:Settings, onClick:()=>setDestination('General settings') },
      { id:'system', label:'System settings', icon:Database, onClick:()=>setDestination('System settings') },
      { id:'security', label:'Security settings', icon:Shield, separator:true, onClick:()=>setDestination('Security settings') },
      { id:'archive', label:'Archived settings', icon:FileText, disabled:true },
    ]},
    { id:'users', label:'User management', icon:Users, href:'#users' },
    { id:'permissions', label:'Permissions' },
  ];

  return <main className="cvp-input-doc cvp-breadcrumb-doc">
    <header className="cvp-input-doc__hero"><div><span>Navigation 01 · Standardized</span><h1>Breadcrumbs</h1></div><div><p>A compact location trail for hierarchical CVP workflows, with predictable ancestor navigation and optional related-destination menus.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>

    <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Anatomy and live behavior</h2><p>Ancestor, separator, and current-page roles remain visually and semantically distinct.</p></div></header><div className="cvp-input-doc__anatomy"><div className="cvp-input-doc__live"><Breadcrumbs items={dropdownItems}/><p className="cvp-breadcrumb-doc__result">Selected destination: <strong>{destination}</strong></p></div><ol><li><b>1</b><span><strong>Back ancestor</strong> Returns to the parent collection.</span></li><li><b>2</b><span><strong>Separator</strong> Communicates hierarchy without receiving focus.</span></li><li><b>3</b><span><strong>Ancestor menu</strong> Offers sibling destinations when the hierarchy warrants it.</span></li><li><b>4</b><span><strong>Current page</strong> Uses <code>aria-current="page"</code> and is not interactive.</span></li></ol></div></section>

    <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Variants and states</h2><p>Examples cover the supported hierarchy patterns without inventing parallel styling.</p></div></header><div className="cvp-breadcrumb-doc__states"><article><span>Two levels</span><Breadcrumbs items={basicItems}/></article><article><span>Rail Details canvas</span><Breadcrumbs surface="canvas" items={[{id:'rails-list',label:'Rails List',href:'#rails-list'},{id:'trending',label:'Trending'}]}/></article><article><span>Long hierarchy</span><Breadcrumbs items={[{id:'home',label:'Home',icon:Home,href:'#home'},{id:'library',label:'Content library',icon:Folder,href:'#library'},{id:'series',label:'Series',icon:Play,href:'#series'},{id:'episode',label:'A deliberately long episode title that truncates safely'}]}/></article><article><span>Custom separator</span><Breadcrumbs separator={<span>/</span>} items={[{id:'docs',label:'Documents',href:'#docs'},{id:'reports',label:'Reports',href:'#reports'},{id:'q3',label:'Q3 report'}]}/></article><article><span>Single location</span><Breadcrumbs items={[{id:'dashboard',label:'Dashboard',icon:Home}]}/></article></div></section>

    <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Theme parity</h2><p>Hierarchy and menu layers resolve from the same semantic contract in both themes.</p></div></header><div className="cvp-input-doc__themes"><article data-theme="dark"><span>Dark</span><Breadcrumbs items={basicItems}/></article><article data-theme="light"><span>Light</span><Breadcrumbs items={basicItems}/></article></div></section>

    <section className="cvp-input-doc__panel"><header><b>04</b><div><h2>Token contract</h2><p>Breadcrumbs owns a registered Tier 3 contract and composes the shared menu foundation for dropdowns.</p></div></header><ComponentTokenContract label="Breadcrumbs token contract" rows={tokenRows}/></section>

    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Accessibility contract</h2></div></header><ul><li>The landmark has a configurable accessible label.</li><li>The current item uses <code>aria-current="page"</code>.</li><li>Separators are hidden from assistive technology.</li><li>Dropdowns expose menu relationships and expanded state.</li><li>Arrow keys, Home, End, and Escape operate the open menu.</li><li>Focus indicators use the canonical CVP ring.</li></ul></article><article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Usage decisions</h2></div></header><ul><li>Use for genuine hierarchical location, not sequential progress.</li><li>Keep labels concise and match destination titles.</li><li>Do not make the current page interactive.</li><li>Use a dropdown only for meaningful sibling destinations.</li><li>Allow horizontal overflow instead of wrapping hierarchy into ambiguous rows.</li></ul></article></section>
    <footer className="cvp-input-doc__footer"><span>CVP navigation family</span><p>Hierarchy · Shared menu contract · Theme parity · Keyboard model</p></footer>
  </main>;
}
