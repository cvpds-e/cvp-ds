import React from 'react';
import { ListFilter, Maximize2, PanelLeft, TableProperties } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { OutlineButton } from './OutlineButton';
import './RailDetailsDocumentation.css';

export function RailsListDocumentation() {
  const openFullPage = (theme: 'dark' | 'light') => window.open(`${window.location.pathname}?page=rails-list-full&theme=${theme}`, '_blank');
  return <main className="rail-details-docs documentation-container">
    <header className="rail-details-docs__hero"><span className="rail-details-docs__eyebrow">Pages</span><h1>Rails List</h1><p>A management workspace for navigating rail collections, editing their metadata, and scanning the rails they contain. It demonstrates the system’s dense, split-pane application patterns.</p><div className="rail-details-docs__preview-actions"><PrimaryButton onClick={() => openFullPage('dark')}><Maximize2 size={15} /> Open dark preview</PrimaryButton><OutlineButton onClick={() => openFullPage('light')}><Maximize2 size={15} /> Open light preview</OutlineButton></div></header>
    <section className="rail-details-docs__section" aria-labelledby="rails-list-composition"><div className="rail-details-docs__section-heading"><span>Integration composition</span><h2 id="rails-list-composition">Built from the system</h2></div><div className="rail-details-docs__grid"><article><PanelLeft size={20} /><strong>Collection navigation</strong><p>Tabs, Tree, Text Button, Icon Button, and form fields support rail collection browse and edit workflows.</p></article><article><ListFilter size={20} /><strong>Query controls</strong><p>Filter and Query Controls support compact, responsive search and sort workflows.</p></article><article><TableProperties size={20} /><strong>Rail inventory</strong><p>Table provides grouped rows, sorting, selection, and a contained scrolling region with persistent pagination.</p></article></div></section>
    <section className="rail-details-docs__section rail-details-docs__note"><strong>Review intent</strong><p>This page is an integration showcase. Its behavior is governed by the individual component contracts it composes.</p></section>
  </main>;
}
