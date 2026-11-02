import React from 'react';
import { ListFilter, Maximize2, PanelLeft, RadioTower, Rows3, Sparkles } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { OutlineButton } from './OutlineButton';
import './RailDetailsDocumentation.css';

export function RailDetailsDocumentation() {
  const openFullPage = (theme: 'dark' | 'light', variant?: 'empty' | 'locked') => window.open(`${window.location.pathname}?page=rail-details-full&theme=${theme}${variant === 'empty' ? '&empty=1' : variant === 'locked' ? '&locked=1' : ''}`, '_blank');
  const openPersonalizedPage = (theme: 'dark' | 'light') => window.open(`${window.location.pathname}?page=personalized-rail-details-full&theme=${theme}`, '_blank');
  const openStationPage = (theme: 'dark' | 'light') => window.open(`${window.location.pathname}?page=rail-details-full&railEntityType=Station&theme=${theme}`, '_blank', 'noopener,noreferrer');
  return <main className="rail-details-docs documentation-container">
    <header className="rail-details-docs__hero">
      <span className="rail-details-docs__eyebrow">Pages</span><h1>Rail Details</h1>
      <p>One integration workspace for editorial, personalized, and station rails. Configure a rail in the side pane and review a horizontal content preview that mirrors the consumer screen.</p>
      <div className="rail-details-docs__preview-actions">
        <PrimaryButton onClick={() => openFullPage('dark')}><Maximize2 size={15} /> Open rail details · dark</PrimaryButton>
        <OutlineButton onClick={() => openFullPage('light')}><Maximize2 size={15} /> Open rail details · light</OutlineButton>
        <OutlineButton onClick={() => openPersonalizedPage('dark')}><Maximize2 size={15} /> Open personalized · dark</OutlineButton>
        <OutlineButton onClick={() => openPersonalizedPage('light')}><Maximize2 size={15} /> Open personalized · light</OutlineButton>
        <OutlineButton onClick={() => openStationPage('dark')}><Maximize2 size={15} /> Open station · dark</OutlineButton>
        <OutlineButton onClick={() => openStationPage('light')}><Maximize2 size={15} /> Open station · light</OutlineButton>
        <OutlineButton onClick={() => openFullPage('dark', 'empty')}><Maximize2 size={15} /> Open empty rail · dark</OutlineButton>
        <OutlineButton onClick={() => openFullPage('light', 'empty')}><Maximize2 size={15} /> Open empty rail · light</OutlineButton>
        <OutlineButton onClick={() => openFullPage('dark', 'locked')}><Maximize2 size={15} /> Open query locked · dark</OutlineButton>
        <OutlineButton onClick={() => openFullPage('light', 'locked')}><Maximize2 size={15} /> Open query locked · light</OutlineButton>
      </div>
    </header>
    <section className="rail-details-docs__section" aria-labelledby="rail-details-composition"><div className="rail-details-docs__section-heading"><span>Integration composition</span><h2 id="rail-details-composition">Built from the system</h2></div><div className="rail-details-docs__grid"><article><PanelLeft size={20} /><strong>Configuration pane</strong><p>Tabs, Text Input, Number Input, Select, Checkbox, Search Field, Sort Control, and a confirmed destructive action share one compact form rhythm. A shared panel footer appears only for unsaved edits and keeps Save changes and Cancel in view.</p></article><article><Rows3 size={20} /><strong>Content Query</strong><p>Tag Filter and Multi Select support program type, tags, media availability, release year, and subscription-package criteria; each contextual label uses the shared Tooltip pattern.</p></article><article><Sparkles size={20} /><strong>Personalized rail</strong><p>The recommended variant combines base rail settings with reusable personalizer configurations, editable recommendation parameters, and an end-user content preview.</p></article><article><ListFilter size={20} /><strong>Empty rail choices</strong><p>The elevated empty state routes algorithmic curation to Content Query and manual curation to Content Browser Modal.</p></article></div></section>
    <section className="rail-details-docs__section rail-details-docs__note"><strong>Query locked pattern</strong><p>When every available slot is occupied by manual content, preserve the standard Content Query underneath a scoped overlay rather than turning each control into a separate disabled state. An inline information banner explains the condition and when filters become available again.</p></section>
    <section className="rail-details-docs__section rail-details-docs__note"><RadioTower size={20} aria-hidden="true" /><h2>Station rail</h2><p>The station variant uses the same Rail Details shell, with Base and Content Query tabs. Its horizontal consumer preview uses sample station logos, channel numbers, station names, and shared previous/next navigation. Select a logo to inspect a station; manual ordering and pinning remain below the preview.</p><p>Station-only filters support location, language (en or us), HD, pay per view, and listing time. Sort by channel number, title, or call sign. Entity type and generic behavior are immutable, and personalization is unavailable. ChannelSchedule GUIDs follow the current CRUD contract pending LiveStation alignment.</p><p>Sample data and browser-local saves only. RMS/RAS rendering is not connected. Location overrides are preview-only; location:any matches exactly, and stations without active listings are excluded.</p></section>
    <section className="rail-details-docs__section rail-details-docs__note"><strong>Review intent</strong><p>This page intentionally has no additional token contract. It is the natural integration audit for the component contracts already documented on their individual pages.</p></section>
  </main>;
}
