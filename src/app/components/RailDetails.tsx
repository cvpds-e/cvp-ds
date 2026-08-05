import React, { useState } from 'react';
import { Copy, Eye, PanelLeftClose, PanelLeftOpen, Save, Sparkles } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { Checkbox } from './Checkbox';
import { ContentBrowserModal } from './ContentBrowserModal';
import { HeaderNavigation } from './HeaderNavigation';
import { IconButton } from './IconButton';
import { NotificationBanner } from './NotificationBanner';
import { OutlineButton } from './OutlineButton';
import { PrimaryButton } from './PrimaryButton';
import { RailContentGallery, RailContentItem } from './RailContentGallery';
import { Segmented } from './Segmented';
import { Select } from './Select';
import { Tabs } from './Tabs';
import { TextArea } from './TextArea';
import { TextInput } from './TextInput';
import { ToastProvider, useToast } from './Toast';
import './RailDetails.css';

interface RailDetailsProps { railName?: string; totalLabels?: number; }

const initialItems: RailContentItem[] = [
  { id: '1', title: 'The Dark Knight', year: '2008', thumbnail: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=480&q=80', position: 1, metadata: { category: 'Action', status: 'active' } },
  { id: '2', title: 'Inception', year: '2010', thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=480&q=80', position: 2, metadata: { category: 'Sci-Fi', status: 'active' } },
  { id: '3', title: 'Interstellar', year: '2014', thumbnail: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=480&q=80', position: 3, metadata: { category: 'Sci-Fi', status: 'active' } },
  { id: '4', title: 'Oppenheimer', year: '2023', thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=480&q=80', position: 4, metadata: { category: 'Drama', status: 'active' } },
  { id: '5', title: 'Tenet', year: '2020', thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=480&q=80', position: 5, metadata: { category: 'Sci-Fi', status: 'pinned' } },
  { id: '6', title: 'Batman Begins', year: '2005', thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=480&q=80', position: 6, metadata: { category: 'Action', status: 'active' } },
  { id: '7', title: 'The Prestige', year: '2006', thumbnail: 'https://images.unsplash.com/photo-1478720568477-b0c8b7e0e518?auto=format&fit=crop&w=480&q=80', position: 7, metadata: { category: 'Drama', status: 'active' } },
  { id: '8', title: 'Memento', year: '2000', thumbnail: '', position: 8, metadata: { category: 'Thriller', status: 'inactive' } },
];

function RailDetailsWorkspace({ railName = 'Trending' }: RailDetailsProps) {
  const { addToast } = useToast();
  const [name, setName] = useState(railName);
  const [status, setStatus] = useState('active');
  const [collection, setCollection] = useState('home');
  const [queryMode, setQueryMode] = useState('base');
  const [mediaFormat, setMediaFormat] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [browserOpen, setBrowserOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [candidateSelection, setCandidateSelection] = useState<string[]>([]);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.setAttribute('data-theme', root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  };
  const save = () => addToast({ variant: 'success', title: 'Rail saved', description: `${name} and its ${items.length} content items are up to date.` });
  const duplicate = () => addToast({ variant: 'info', title: 'Rail duplicated', description: `A draft copy of ${name} was created.` });
  const queriedItems = mediaFormat === 'movie' ? [] : items;
  const hasEmptyQuery = mediaFormat === 'movie';

  const basePanel = <div className="rail-details__form">
    <div className="rail-details__form-section"><span>Settings</span><TextInput label="Rail name" value={name} onChange={(event) => setName(event.target.value)} /><Select label="Rail status" value={status} onChange={setStatus} options={[{ value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }, { value: 'inactive', label: 'Inactive' }]} /><Select label="Rail collection" value={collection} onChange={setCollection} options={[{ value: 'home', label: 'Home' }, { value: 'drama', label: 'Drama' }, { value: 'kids', label: 'Kids' }]} /><div className="rail-details__form-grid"><TextInput label="Rail position" type="number" defaultValue="2" min="1" /><TextInput label="Content slots" type="number" defaultValue="24" min="1" /></div><Select label="Assign to page" defaultValue="home" options={[{ value: 'home', label: 'Home' }, { value: 'discover', label: 'Discover' }, { value: 'kids', label: 'Kids' }]} /></div>
    <div className="rail-details__form-section"><span>Personalisation</span><Select label="Configuration" defaultValue="general" options={[{ value: 'general', label: 'General recommendations' }, { value: 'genre', label: 'Genre affinity' }, { value: 'recent', label: 'Recent activity' }]} helperText="The recommendation model used to populate this rail." /><Checkbox checked={autoRefresh} onChange={() => setAutoRefresh((value) => !value)} label="Automatically refresh content" /></div>
  </div>;
  const queryPanel = <div className="rail-details__form"><div className="rail-details__form-section"><span>Content query</span><Segmented fullWidth size="small" ariaLabel="Query mode" value={queryMode} onChange={setQueryMode} options={[{ value: 'base', label: 'Base' }, { value: 'segment', label: 'Segment' }, { value: 'group', label: 'Group' }]} /><TextInput label="Search filters" placeholder="Title, genre or provider…" /><Select label="Airing type" defaultValue="all" options={[{ value: 'all', label: 'All airing types' }, { value: 'new', label: 'New' }, { value: 'repeat', label: 'Repeat' }, { value: 'live', label: 'Live' }]} /><Select label="Media format" value={mediaFormat} onChange={setMediaFormat} placeholder="Select format…" options={[{ value: 'movie', label: 'Movie' }, { value: 'series', label: 'Series' }, { value: 'clip', label: 'Clip' }]} /><TextArea label="Query notes" placeholder="Optional notes for editors…" /></div></div>;

  return <div className="rail-details-page">
    <HeaderNavigation variant="static" brandName="Rail Manager" userName="Jane Doe" userEmail="jane@cvp.example" teams={[{ id: 'editorial', name: 'Editorial Team' }]} selectedTeamId="editorial" onThemeSwitch={toggleTheme} />
    <div className="rail-details__crumbs"><Breadcrumbs surface="canvas" items={[{ id: 'rails-list', label: 'Rails List' }, { id: 'current', label: name }]} /></div>
    <div className="rail-details__workspace">
      <aside className={`rail-details__sidebar ${sidebarOpen ? '' : 'rail-details__sidebar--closed'}`} aria-label="Rail configuration"><div className="rail-details__panel-title"><strong>Rail Manager</strong></div><Tabs ariaLabel="Rail settings" defaultTab="base" tabs={[{ id: 'base', label: 'Base', content: basePanel }, { id: 'query', label: 'Content Query', content: queryPanel }]} /></aside>
      <main className="rail-details__main">
        <div className="rail-details__preview-bar"><IconButton aria-label={sidebarOpen ? 'Collapse configuration' : 'Open configuration'} aria-expanded={sidebarOpen} onClick={() => setSidebarOpen((value) => !value)}>{sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}</IconButton><strong>Content Preview</strong><div><span className="rail-details__type">Editorial</span><span>{name}</span></div></div>
        <div className="rail-details__content">
          {hasEmptyQuery && <NotificationBanner title="No content found" message="No content matches the current query criteria for Movie media format." variant="warning" />}
          <RailContentGallery title={name} showItemCount={false} items={queriedItems} variant="management" emptyMessage={hasEmptyQuery ? 'Try a different media format or adjust the query criteria.' : undefined} emptySlotCount={hasEmptyQuery ? 10 : 0} onAddToEmptySlot={() => setBrowserOpen(true)} onEdit={(item) => addToast({ variant: 'info', title: 'Edit content', description: item.title })} onPin={(item) => addToast({ variant: 'info', title: 'Pin updated', description: item.title })} onDrag={(id, position) => addToast({ variant: 'info', title: 'Order changed', description: `Item ${id} moved to position ${position + 1}.` })} />
          <NotificationBanner title="Preview guide" message="This preview reflects the current rail configuration. Reorder or pin content, then save to publish your changes." variant="info" icon={Sparkles} actionLabel="Review query" onAction={() => setSidebarOpen(true)} />
        </div>
      </main>
    </div>
    <footer className="rail-details__footer"><OutlineButton onClick={duplicate}><Copy size={15} /> Duplicate</OutlineButton><OutlineButton onClick={() => setPreviewOpen((value) => !value)}><Eye size={15} /> {previewOpen ? 'Close preview' : 'Preview'}</OutlineButton><PrimaryButton onClick={save}><Save size={15} /> Save changes</PrimaryButton></footer>
    <ContentBrowserModal isOpen={browserOpen} onClose={() => setBrowserOpen(false)} items={initialItems} selectedItems={candidateSelection} onSelectionChange={setCandidateSelection} onConfirm={(ids) => { setItems(initialItems.filter((item) => ids.includes(item.id))); addToast({ variant: 'success', title: 'Content updated', description: `${ids.length} items are now in the rail.` }); }} />
    {previewOpen && <div className="rail-details__preview-mode" role="status">Preview mode is active</div>}
  </div>;
}

export function RailDetails(props: RailDetailsProps) { return <ToastProvider><RailDetailsWorkspace {...props} /></ToastProvider>; }
