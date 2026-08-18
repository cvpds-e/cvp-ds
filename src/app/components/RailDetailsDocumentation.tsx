import React from 'react';
import { ListFilter, Maximize2, PanelLeft, Rows3 } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { OutlineButton } from './OutlineButton';
import './RailDetailsDocumentation.css';

export function RailDetailsDocumentation() {
  const openFullPage = (theme: 'dark' | 'light', empty = false) => window.open(`${window.location.pathname}?page=rail-details-full&theme=${theme}${empty ? '&empty=1' : ''}`, '_blank');
  return <main className="rail-details-docs documentation-container">
    <header className="rail-details-docs__hero"><span className="rail-details-docs__eyebrow">Pages</span><h1>Rail Details</h1><p>An integration workspace for configuring a content rail and reviewing its live composition. This page demonstrates how the standardized foundations and components behave together under production-like density.</p><div className="rail-details-docs__preview-actions"><PrimaryButton onClick={() => openFullPage('dark')}><Maximize2 size={15} /> Open dark preview</PrimaryButton><OutlineButton onClick={() => openFullPage('light')}><Maximize2 size={15} /> Open light preview</OutlineButton><OutlineButton onClick={() => openFullPage('dark', true)}><Maximize2 size={15} /> Open empty rail</OutlineButton></div></header>
    <section className="rail-details-docs__section" aria-labelledby="rail-details-composition"><div className="rail-details-docs__section-heading"><span>Integration composition</span><h2 id="rail-details-composition">Built from the system</h2></div><div className="rail-details-docs__grid"><article><PanelLeft size={20} /><strong>Configuration pane</strong><p>Tabs, Text Input, Select, Text Area, Checkbox, Search Field, and Sort Control share one compact form rhythm.</p></article><article><Rows3 size={20} /><strong>Content workspace</strong><p>Header Navigation, Breadcrumbs, Rail Content Gallery and Notification Banner establish the page hierarchy.</p></article><article><ListFilter size={20} /><strong>Empty rail choices</strong><p>The elevated empty state routes algorithmic curation to Content Query and manual curation to Content Browser Modal.</p></article></div></section>
    <section className="rail-details-docs__section rail-details-docs__note"><strong>Review intent</strong><p>This page intentionally has no additional token contract. It is the natural integration audit for the component contracts already documented on their individual pages.</p></section>
  </main>;
}
