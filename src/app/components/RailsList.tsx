import React, { useState } from 'react';
import { ChevronLeft, FolderTree, List, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { Filter, ActiveFilter } from './Filter';
import { HeaderNavigation } from './HeaderNavigation';
import { IconButton } from './IconButton';
import { Modal } from './Modal';
import { PrimaryButton } from './PrimaryButton';
import { Segmented } from './Segmented';
import { Table, TableColumn, TableRow } from './Table';
import { Badge } from './Badge';
import { Status } from './Status';
import { TextButton } from './TextButton';
import { TextArea } from './TextArea';
import { TextInput } from './TextInput';
import { NumberInput } from './NumberInput';
import { Select } from './Select';
import { OutlineButton } from './OutlineButton';
import { Tree, TreeItem } from './Tree';
import { WorkspaceLayout } from './WorkspaceLayout';
import { RailContentGallery, RailContentItem } from './RailContentGallery';
import { UnsavedChangesFooter } from './UnsavedChangesFooter';
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
  { id: 'title', label: 'Title', width: '250px', minWidth: '200px', sortable: true },
  { id: 'railId', label: 'ID', width: '112px', sortable: true },
  { id: 'status', label: 'Rail status', width: '132px', sortable: true },
    { id: 'collection', label: 'Collection', width: '180px', minWidth: '150px', sortable: true },
  { id: 'type', label: 'Type', width: '142px', sortable: true },
  { id: 'updated', label: 'Updated', width: '164px', sortable: true },
  { id: 'controls', label: 'Controls', width: '82px', align: 'end', sortable: false },
];

const railPreviewItems: RailContentItem[] = [
  { id: 'dark-knight', title: 'The Dark Knight', year: '2008', thumbnail: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=480&q=80', metadata: { category: 'Action' } },
  { id: 'inception', title: 'Inception', year: '2010', thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=480&q=80', metadata: { category: 'Sci-Fi' } },
  { id: 'interstellar', title: 'Interstellar', year: '2014', thumbnail: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=480&q=80', metadata: { category: 'Sci-Fi' } },
  { id: 'oppenheimer', title: 'Oppenheimer', year: '2023', thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=480&q=80', metadata: { category: 'Drama' } },
  { id: 'tenet', title: 'Tenet', year: '2020', thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=480&q=80', metadata: { category: 'Sci-Fi' } },
  { id: 'batman-begins', title: 'Batman Begins', year: '2005', thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=480&q=80', metadata: { category: 'Action' } },
];

const railPreview = (title: string, seed: string) => (
  <div className="rails-list-page__rail-preview">
    <RailContentGallery
      title={title}
      items={railPreviewItems.map((item, index) => ({ ...item, id: `${seed}-${item.id}`, position: index + 1 }))}
      itemCountPlacement="navigation"
      showSourceLabels={false}
      size="compact"
    />
  </div>
);

const collectionRows = (collection: string, titles: string[], startId: number): TableRow[] => [
  { id: `${collection}-group`, kind: 'group', groupLabel: collection === 'Home' ? 'Home' : collection, groupCount: titles.length },
  ...titles.map((title, index) => ({
    id: `${collection}-${index + 1}`,
    railId: String(startId + index),
    status: index === 0 || index === 3 ? 'Active' : 'Inactive',
    title,
    collection,
    type: index % 2 ? 'Editorial' : 'Recommended',
    updated: `Aug ${17 - Math.min(index, 4)}, 2026 · ${String(11 - index).padStart(2, '0')}:2${index}`,
    expandable: true,
    expandedContent: railPreview(title, `${collection}-${index + 1}`),
  })),
];

const rows = [
  ...collectionRows('Home', ['Spotlight', 'Trending', 'Because You Watched', 'New Releases', 'Continue Watching', 'Trending Now'], 1550862),
  ...collectionRows('Drama', ['Drama Collection 1', 'Drama Collection 2', 'Drama Collection 3', 'Drama Collection 4', 'Drama Collection 5'], 1544865),
  ...collectionRows('Kids', Array.from({ length: 6 }, (_, index) => `Kids Collection ${index + 1}`), 1544876),
  ...collectionRows('Documentary', Array.from({ length: 5 }, (_, index) => `Documentary ${index + 1}`), 1544882),
];

export function RailsList() {
  const [filters, setFilters] = useState<ActiveFilter[]>([]);
  const [rails, setRails] = useState<TableRow[]>(rows);
  const [tableView, setTableView] = useState<'list' | 'grouped'>('list');
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [matchAllFilters, setMatchAllFilters] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState('home');
  const [editingCollection, setEditingCollection] = useState<string | null>(null);
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [collectionStatus, setCollectionStatus] = useState('enabled');
  const [collectionReference, setCollectionReference] = useState('');
  const [collectionInitialValues, setCollectionInitialValues] = useState({ name: '', description: '', status: 'enabled', reference: '' });
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
    const nextValues = {
      name: isNew ? '' : collectionLabels[item.id] ?? item.label,
      description: isNew ? '' : `${item.label} rail collection for curated programming.`,
      status: 'enabled',
      reference: isNew ? '' : `65cdc98c9-e1fdcc7931968-${item.id}`,
    };
    setEditingCollection(isNew ? 'new' : item.id);
    setCollectionInitialValues(nextValues);
    setCollectionName(nextValues.name);
    setCollectionDescription(nextValues.description);
    setCollectionStatus(nextValues.status);
    setCollectionReference(nextValues.reference);
  };
  const tree = <Tree data={collections.map((item) => ({ ...item, label: collectionLabels[item.id] ?? item.label }))} selectedId={selectedCollection} initialExpanded={['home', 'drama', 'kids']} ariaLabel="Rail collections" onSelect={(item) => { setSelectedCollection(item.id); if (item.type === 'category') openCollectionEditor(item); }} renderActions={(item) => item.type === 'category' ? <IconButton variant="ghost" size="small" aria-label={`Edit ${item.label} rail collection`} onClick={(event) => { event.stopPropagation(); openCollectionEditor(item); }}><Pencil size={15} /></IconButton> : null} />;
  const isNewCollection = editingCollection === 'new';
  const hasCollectionChanges = Boolean(editingCollection) && (collectionName !== collectionInitialValues.name || collectionDescription !== collectionInitialValues.description || collectionStatus !== collectionInitialValues.status || collectionReference !== collectionInitialValues.reference);
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
      railId: String(Date.now()).slice(-7),
      status: 'Active',
      title: name,
      collection,
      type: newRailType === 'editorial' ? 'Editorial' : 'Recommended',
      updated: 'Just now',
      expandable: true,
      expandedContent: railPreview(name, `created-${name}`),
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
  const removeRail = (railId: string) => {
    setRails((current) => {
      const deletedIndex = current.findIndex((row) => row.id === railId);
      const groupIndex = current.slice(0, deletedIndex).reduce((latest, row, index) => row.kind === 'group' ? index : latest, -1);
      return current
        .filter((row) => row.id !== railId)
        .map((row, index) => index === groupIndex && row.kind === 'group'
          ? { ...row, groupCount: Math.max(0, (row.groupCount ?? 1) - 1) }
          : row);
    });
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
      {!isNewCollection && <TextButton variant="secondary" className="rails-list-page__collection-delete" icon={<Trash2 size={15} />} onClick={() => setEditingCollection(null)}>Delete rail collection</TextButton>}
    </div>
    {hasCollectionChanges && <UnsavedChangesFooter onSave={saveCollection} onCancel={() => setEditingCollection(null)} saveDisabled={!collectionName.trim()} />}
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
        <WorkspaceLayout.PageHeader className="rails-list-page__titlebar"><div><List size={20} aria-hidden="true" /><h1>Rails List</h1></div><PrimaryButton onClick={() => setCreateRailOpen(true)}><Plus size={16} /> Create rail</PrimaryButton></WorkspaceLayout.PageHeader>
        <WorkspaceLayout.Toolbar className="rails-list-page__filters"><Filter triggerVariant="icon-seamless" options={[{ id: 'title', label: 'Title', type: 'text' }, { id: 'rail-type', label: 'Rail type', type: 'multiselect', options: [{ value: 'editorial', label: 'Editorial' }, { value: 'recommended', label: 'Recommended' }] }, { id: 'collection', label: 'Collection', type: 'select', options: [{ value: 'home', label: 'Home' }, { value: 'drama', label: 'Drama' }, { value: 'kids', label: 'Kids' }] }]} activeFilters={filters} onChange={(nextFilters) => { setFilters(nextFilters); if (nextFilters.length <= 2) setMatchAllFilters(true); }} placeholder="Add filter" />{filters.length > 2 && <div className="rails-list-page__match"><span>Match</span><TextButton variant="contextual" aria-label={`Switch to match ${matchAllFilters ? 'any' : 'all'} filters`} onClick={() => setMatchAllFilters((value) => !value)}>{matchAllFilters ? 'all filters' : 'any filter'}</TextButton></div>}</WorkspaceLayout.Toolbar>
        <Table className="rails-list-page__table" ariaLabel="Rails list" columns={columns} data={tableView === 'grouped' ? rails : rails.filter((row) => row.kind !== 'group')} selectable expandable singleExpand={tableView === 'list'} freezeLeadingColumns sortable resizable showActions={false} showViewControl={false} totalItems={rails.filter((row) => row.kind !== 'group').length} pageSize={pageSize} pageSizeOptions={[10, 20, 50]} currentPage={currentPage} onPageChange={setCurrentPage} onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }} onRefresh={() => setRails((current) => [...current])} height="calc(100dvh - 246px)" toolbarActions={<div className="rails-list-page__view-controls" role="group" aria-label="Table view"><IconButton variant={tableView === 'list' ? 'outline' : 'ghost'} size="medium" aria-label="List view" aria-pressed={tableView === 'list'} onClick={() => { setTableView('list'); setCurrentPage(1); }}><List size={16} /></IconButton><IconButton variant={tableView === 'grouped' ? 'outline' : 'ghost'} size="medium" aria-label="Grouped view" aria-pressed={tableView === 'grouped'} onClick={() => { setTableView('grouped'); setCurrentPage(1); }}><FolderTree size={16} /></IconButton></div>} renderCell={(column, value, row) => {
          if (column === 'railId') return <span className="rails-list-page__rail-id">{value}</span>;
          if (column === 'status') return <Status tone={String(value).toLowerCase() === 'active' ? 'success' : 'neutral'}>{value}</Status>;
          if (column === 'title') return <span className="rails-list-page__rail-title">{value}</span>;
          if (column === 'collection') return <Badge>{value}</Badge>;
          if (column === 'type') {
            return <Badge tone={String(value).toLowerCase() === 'recommended' ? 'info' : 'accent'}>{value}</Badge>;
          }
          if (column === 'controls') return <div className="rails-list-page__row-controls"><IconButton variant="ghost" size="small" aria-label={`Edit ${row.title}`} onClick={() => window.location.assign(`${window.location.pathname}?page=rail-details`)}><Pencil size={15} /></IconButton><IconButton variant="danger" size="small" aria-label={`Delete ${row.title}`} onClick={() => removeRail(row.id)}><Trash2 size={15} /></IconButton></div>;
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
