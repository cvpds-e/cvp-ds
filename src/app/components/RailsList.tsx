import React, { useState } from 'react';
import { ChevronLeft, ListFilter, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { Filter, ActiveFilter } from './Filter';
import { HeaderNavigation } from './HeaderNavigation';
import { IconButton } from './IconButton';
import { Modal } from './Modal';
import { PrimaryButton } from './PrimaryButton';
import { Segmented } from './Segmented';
import { Table, TableColumn, TableRow } from './Table';
import { TextButton } from './TextButton';
import { TextArea } from './TextArea';
import { TextInput } from './TextInput';
import { NumberInput } from './NumberInput';
import { Select } from './Select';
import { OutlineButton } from './OutlineButton';
import { Tree, TreeItem } from './Tree';
import { WorkspaceLayout } from './WorkspaceLayout';
import './RailsList.css';

const collections: TreeItem[] = [
  { id: 'home', label: 'Home', count: 6, type: 'category', children: [
    { id: 'spotlight', label: 'Spotlight', type: 'item', status: 'active', tag: 'RECOMMENDED' },
    { id: 'trending', label: 'Trending', type: 'item', status: 'inactive', tag: 'EDITORIAL' },
    { id: 'because-you-watched', label: 'Because You Watched', type: 'item', status: 'inactive', tag: 'RECOMMENDED' },
    { id: 'new-releases', label: 'New Releases', type: 'item', status: 'active', tag: 'EDITORIAL' },
    { id: 'continue-watching', label: 'Continue Watching', type: 'item', status: 'inactive', tag: 'RECOMMENDED' },
    { id: 'trending-now', label: 'Trending Now', type: 'item', status: 'inactive', tag: 'EDITORIAL' },
  ] },
  { id: 'drama', label: 'Drama', count: 5, type: 'category', children: Array.from({ length: 5 }, (_, index) => ({ id: `drama-${index + 1}`, label: `Drama Collection ${index + 1}`, type: 'item' as const, status: index === 1 || index === 4 ? 'active' as const : 'inactive' as const, tag: index % 2 ? 'RECOMMENDED' : 'EDITORIAL' })) },
  { id: 'kids', label: 'Kids', count: 6, type: 'category', children: Array.from({ length: 6 }, (_, index) => ({ id: `kids-${index + 1}`, label: `Kids Collection ${index + 1}`, type: 'item' as const, status: 'inactive' as const, tag: index % 2 ? 'EDITORIAL' : 'RECOMMENDED' })) },
];

const columns: TableColumn[] = [
  { id: 'title', label: 'Title', width: '210px', sortable: true },
  { id: 'collection', label: 'Collection', width: '140px', sortable: true },
  { id: 'order', label: 'Order', width: '80px', sortable: true },
  { id: 'type', label: 'Type', width: '140px', sortable: true },
  { id: 'updated', label: 'Updated', width: '130px', sortable: true },
];

const collectionRows = (collection: string, titles: string[]): TableRow[] => [
  { id: `${collection}-group`, kind: 'group', groupLabel: collection === 'Home' ? 'Home' : collection, groupCount: titles.length },
  ...titles.map((title, index) => ({ id: `${collection}-${index + 1}`, title, collection, order: index + 1, type: index % 2 ? 'Editorial' : 'Recommended', updated: 'Aug 6, 2026', expandable: true })),
];

const rows = [
  ...collectionRows('Home', ['Spotlight', 'Trending', 'Because You Watched', 'New Releases', 'Continue Watching', 'Trending Now']),
  ...collectionRows('Drama', ['Drama Collection 1', 'Drama Collection 2', 'Drama Collection 3', 'Drama Collection 4', 'Drama Collection 5']),
];

export function RailsList() {
  const [filters, setFilters] = useState<ActiveFilter[]>([]);
  const [rails, setRails] = useState<TableRow[]>(rows);
  const [matchAllFilters, setMatchAllFilters] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState('home');
  const [editingCollection, setEditingCollection] = useState<string | null>(null);
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [collectionStatus, setCollectionStatus] = useState('enabled');
  const [collectionReference, setCollectionReference] = useState('');
  const [collectionLabels, setCollectionLabels] = useState<Record<string, string>>({});
  const [createRailOpen, setCreateRailOpen] = useState(false);
  const [newRailName, setNewRailName] = useState('New Editorial Rail');
  const [newRailType, setNewRailType] = useState<'editorial' | 'recommended'>('editorial');
  const [newRailCollection, setNewRailCollection] = useState('home');
  const [newRailSlots, setNewRailSlots] = useState('10');
  const [newRailReference, setNewRailReference] = useState('');
  const [personalizerConfiguration, setPersonalizerConfiguration] = useState('general-recommendations');
  const toggleTheme = () => {
    const root = document.documentElement;
    root.setAttribute('data-theme', root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  };
  const openCollectionEditor = (item?: TreeItem) => {
    const isNew = !item;
    setEditingCollection(isNew ? 'new' : item.id);
    setCollectionName(isNew ? '' : collectionLabels[item.id] ?? item.label);
    setCollectionDescription(isNew ? '' : `${item.label} rail collection for curated programming.`);
    setCollectionStatus('enabled');
    setCollectionReference(isNew ? '' : `65cdc98c9-e1fdcc7931968-${item.id}`);
  };
  const tree = <Tree data={collections.map((item) => ({ ...item, label: collectionLabels[item.id] ?? item.label }))} selectedId={selectedCollection} initialExpanded={['home', 'drama', 'kids']} ariaLabel="Rail collections" onSelect={(item) => { setSelectedCollection(item.id); if (item.type === 'category') openCollectionEditor(item); }} renderActions={(item) => item.type === 'category' ? <IconButton variant="ghost" size="small" aria-label={`Edit ${item.label} rail collection`} onClick={(event) => { event.stopPropagation(); openCollectionEditor(item); }}><Pencil size={15} /></IconButton> : null} />;
  const isNewCollection = editingCollection === 'new';
  const saveCollection = () => {
    if (editingCollection && editingCollection !== 'new' && collectionName.trim()) setCollectionLabels((current) => ({ ...current, [editingCollection]: collectionName.trim() }));
    setEditingCollection(null);
  };
  const resetCreateRail = () => {
    setNewRailName('New Editorial Rail');
    setNewRailType('editorial');
    setNewRailCollection('home');
    setNewRailSlots('10');
    setNewRailReference('');
    setPersonalizerConfiguration('general-recommendations');
  };
  const closeCreateRail = () => {
    setCreateRailOpen(false);
    resetCreateRail();
  };
  const createRail = () => {
    const name = newRailName.trim();
    if (!name) return;
    const collection = collections.find((item) => item.id === newRailCollection)?.label ?? 'Home';
    const newRail: TableRow = {
      id: `created-${Date.now()}`,
      title: name,
      collection,
      order: 1,
      type: newRailType === 'editorial' ? 'Editorial' : 'Recommended',
      updated: 'Just now',
      expandable: true,
      contentSlots: Number(newRailSlots) || 10,
      externalReferenceId: newRailReference || undefined,
      personalizerConfiguration: newRailType === 'recommended' ? personalizerConfiguration : undefined,
    };
    setRails((current) => {
      const groupIndex = current.findIndex((row) => row.kind === 'group' && row.groupLabel === collection);
      if (groupIndex < 0) return [...current, newRail];
      let groupEnd = groupIndex + 1;
      while (groupEnd < current.length && current[groupEnd].kind !== 'group') groupEnd += 1;
      const collectionRails = current.slice(groupIndex + 1, groupEnd);
      newRail.order = collectionRails.length + 1;
      const group = current[groupIndex];
      return [
        ...current.slice(0, groupIndex),
        { ...group, groupCount: (group.groupCount ?? collectionRails.length) + 1 },
        ...collectionRails,
        newRail,
        ...current.slice(groupEnd),
      ];
    });
    closeCreateRail();
  };
  const collectionEditor = <div className="rails-list-page__collection-editor">
    <div className="rails-list-page__collection-editor-body">
      <TextButton variant="secondary" className="rails-list-page__back-to-collections" icon={<ChevronLeft size={16} />} onClick={() => setEditingCollection(null)}>Back to Rail Collections</TextButton>
      <div className="rails-list-page__collection-form">
        <TextInput label="Title" value={collectionName} onChange={(event) => setCollectionName(event.target.value)} required />
        <TextArea label="Description" value={collectionDescription} onChange={(event) => setCollectionDescription(event.target.value)} rows={4} resize="vertical" />
        <Select label="Status" value={collectionStatus} onChange={setCollectionStatus} options={[{ value: 'enabled', label: 'Enabled' }, { value: 'disabled', label: 'Disabled' }]} />
        <TextInput label="External Reference ID" optionalText="Advanced" value={collectionReference} onChange={(event) => setCollectionReference(event.target.value)} />
      </div>
    </div>
    <footer className="rails-list-page__collection-editor-footer">
      {!isNewCollection && <IconButton variant="danger" size="small" aria-label={`Delete ${collectionName || 'rail collection'}`} onClick={() => setEditingCollection(null)}><Trash2 size={16} /></IconButton>}
      <div><OutlineButton onClick={() => setEditingCollection(null)}>Cancel</OutlineButton><PrimaryButton onClick={saveCollection} disabled={!collectionName.trim()}>Save</PrimaryButton></div>
    </footer>
  </div>;

  return <WorkspaceLayout className="rails-list-page">
    <WorkspaceLayout.GlobalHeader><HeaderNavigation variant="static" brandName="Rail Manager" userName="Jane Doe" userEmail="jane@cvp.example" teams={[{ id: 'content-team', name: 'Content Team' }]} selectedTeamId="content-team" onThemeSwitch={toggleTheme} /></WorkspaceLayout.GlobalHeader>
    <WorkspaceLayout.Body className="rails-list-page__workspace" sidePanelWidth="clamp(320px, 32vw, 640px)" maxSidePanelWidth={640}>
      <WorkspaceLayout.SidePanel className="rails-list-page__sidebar" aria-label="Rail collections navigation">
        <div className="rails-list-page__sidebar-label">Overview</div>
        {editingCollection ? collectionEditor : <div className="rails-list-page__tree-panel"><div className="rails-list-page__tree-actions"><TextButton variant="secondary" className="rails-list-page__add-collection" icon={<Plus size={18} />} onClick={() => openCollectionEditor()}>Add new rail collection</TextButton><IconButton variant="ghost" size="small" aria-label="Search rail collections"><Search size={16} /></IconButton></div>{tree}</div>}
      </WorkspaceLayout.SidePanel>
      <WorkspaceLayout.ResizeHandle />
      <WorkspaceLayout.Main className="rails-list-page__main">
        <WorkspaceLayout.PageHeader className="rails-list-page__titlebar"><div><ListFilter size={20} aria-hidden="true" /><h1>Rails List</h1></div><PrimaryButton onClick={() => setCreateRailOpen(true)}><Plus size={16} /> Create rail</PrimaryButton></WorkspaceLayout.PageHeader>
        <WorkspaceLayout.Toolbar className="rails-list-page__filters"><Filter triggerVariant="icon-seamless" options={[{ id: 'title', label: 'Title', type: 'text' }, { id: 'rail-type', label: 'Rail type', type: 'multiselect', options: [{ value: 'editorial', label: 'Editorial' }, { value: 'recommended', label: 'Recommended' }] }, { id: 'collection', label: 'Collection', type: 'select', options: [{ value: 'home', label: 'Home' }, { value: 'drama', label: 'Drama' }, { value: 'kids', label: 'Kids' }] }]} activeFilters={filters} onChange={(nextFilters) => { setFilters(nextFilters); if (nextFilters.length <= 2) setMatchAllFilters(true); }} placeholder="Add filter" />{filters.length > 2 && <div className="rails-list-page__match"><span>Match</span><TextButton variant="contextual" aria-label={`Switch to match ${matchAllFilters ? 'any' : 'all'} filters`} onClick={() => setMatchAllFilters((value) => !value)}>{matchAllFilters ? 'all filters' : 'any filter'}</TextButton></div>}</WorkspaceLayout.Toolbar>
        <Table className="rails-list-page__table" ariaLabel="Rails list" columns={columns} data={rails} selectable expandable sortable showActions={false} totalItems={rails.filter((row) => row.kind !== 'group').length} pageSize={38} height="calc(100dvh - 246px)" renderCell={(column, value) => {
          if (column === 'collection') return <span className="rails-list-page__collection-tag">{value}</span>;
          if (column === 'type') {
            const railType = String(value).toLowerCase();
            return <span className={`cvp-table__rail-type-tag cvp-table__rail-type-tag--${railType}`}>{value}</span>;
          }
          return value;
        }} />
      </WorkspaceLayout.Main>
    </WorkspaceLayout.Body>
    <Modal
      isOpen={createRailOpen}
      onClose={closeCreateRail}
      title="Create rail"
      size="medium"
      className="rails-list-page__create-rail-modal"
      footer={<><OutlineButton onClick={closeCreateRail}>Cancel</OutlineButton><PrimaryButton onClick={createRail} disabled={!newRailName.trim()}>Create</PrimaryButton></>}
    >
      <div className="rails-list-page__create-rail-form">
        <TextInput label="Rail name" value={newRailName} onChange={(event) => setNewRailName(event.target.value)} required autoFocus />
        <div className="rails-list-page__create-rail-field">
          <span className="rails-list-page__create-rail-label">Rail type</span>
          <Segmented ariaLabel="Rail type" size="small" variant="color" fullWidth value={newRailType} onChange={(value) => setNewRailType(value as 'editorial' | 'recommended')} options={[{ value: 'editorial', label: 'Editorial' }, { value: 'recommended', label: 'Recommended' }]} />
        </div>
        {newRailType === 'recommended' && <div className="rails-list-page__create-rail-configuration">
          <Select label="Personalizer configuration" value={personalizerConfiguration} onChange={setPersonalizerConfiguration} options={[{ value: 'general-recommendations', label: 'General recommendations' }, { value: 'continue-watching', label: 'Continue watching' }, { value: 'popular-now', label: 'Popular now' }]} />
          <TextButton onClick={() => setPersonalizerConfiguration('general-recommendations')}><Plus size={16} aria-hidden="true" />Create new configuration</TextButton>
        </div>}
        <Select label="Rail collection" value={newRailCollection} onChange={setNewRailCollection} options={collections.map((collection) => ({ value: collection.id, label: collectionLabels[collection.id] ?? collection.label }))} />
        <NumberInput label="Number of content slots" min={1} value={newRailSlots === '' ? '' : Number(newRailSlots)} onValueChange={(value) => setNewRailSlots(String(value))} />
        <TextInput label="External reference ID" optionalText="Advanced" value={newRailReference} onChange={(event) => setNewRailReference(event.target.value)} placeholder="Enter external reference ID" />
      </div>
    </Modal>
  </WorkspaceLayout>;
}
