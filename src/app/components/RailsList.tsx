import React, { useState } from 'react';
import { ChevronLeft, Film, FolderPlus, FolderTree, Layers3, List, ListChecks, Pencil, Plus, Radio, RadioTower, Search, Sparkles, Trash2, Tv } from 'lucide-react';
import { Filter, ActiveFilter } from './Filter';
import { HeaderNavigation } from './HeaderNavigation';
import { IconButton } from './IconButton';
import { Modal } from './Modal';
import { PrimaryButton } from './PrimaryButton';
import { ChoiceCardGroup } from './ChoiceCardGroup';
import { Table, TableColumn, TableRow } from './Table';
import { Badge } from './Badge';
import { Status } from './Status';
import { TextButton } from './TextButton';
import { TextArea } from './TextArea';
import { TextInput } from './TextInput';
import { NumberInput } from './NumberInput';
import { Select } from './Select';
import { MultiSelect } from './MultiSelect';
import { OutlineButton } from './OutlineButton';
import { TagFilter } from './TagFilter';
import { Tree, TreeItem } from './Tree';
import { Tooltip } from './Tooltip';
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

interface PersonalizerConfiguration {
  value: string;
  label: string;
  strategy: string;
  contentTypes: string[];
  genres: string[];
  castMembers: string[];
  audienceRatings: string[];
  keywords: string[];
  languages: string[];
  minimumRuntime: string;
  maximumRuntime: string;
}

const defaultPersonalizerConfigurations: PersonalizerConfiguration[] = [
  { value: 'general-recommendations', label: 'General recommendations', strategy: 'general-recommendations', contentTypes: ['movie', 'series'], genres: [], castMembers: [], audienceRatings: [], keywords: [], languages: [], minimumRuntime: '', maximumRuntime: '' },
  { value: 'continue-watching', label: 'Continue watching', strategy: 'continue-watching', contentTypes: ['series'], genres: [], castMembers: [], audienceRatings: [], keywords: [], languages: [], minimumRuntime: '', maximumRuntime: '' },
  { value: 'popular-now', label: 'Popular now', strategy: 'popular-now', contentTypes: ['movie', 'series'], genres: [], castMembers: [], audienceRatings: [], keywords: [], languages: [], minimumRuntime: '', maximumRuntime: '' },
];

export type RailsListInitialState = 'populated' | 'empty';
type RailContentType = 'program' | 'station' | 'live' | 'live-program';
type RailType = 'generic' | 'personalized' | 'hybrid';

interface RailsListProps {
  initialState?: RailsListInitialState;
}

export function RailsList({ initialState = 'populated' }: RailsListProps) {
  const [filters, setFilters] = useState<ActiveFilter[]>([]);
  const [rails, setRails] = useState<TableRow[]>(initialState === 'populated' ? rows : []);
  const [collectionItems, setCollectionItems] = useState<TreeItem[]>(initialState === 'empty' ? [] : collections);
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
  const [newRailName, setNewRailName] = useState('');
  const [newRailContentType, setNewRailContentType] = useState<RailContentType>('program');
  const [newRailType, setNewRailType] = useState<RailType>('generic');
  const [newRailCollection, setNewRailCollection] = useState('');
  const [newRailSlots, setNewRailSlots] = useState('10');
  const [personalizerConfiguration, setPersonalizerConfiguration] = useState('general-recommendations');
  const [personalizerConfigurations, setPersonalizerConfigurations] = useState<PersonalizerConfiguration[]>(defaultPersonalizerConfigurations);
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [configurationName, setConfigurationName] = useState('');
  const [configurationStrategy, setConfigurationStrategy] = useState('general-recommendations');
  const [configurationContentTypes, setConfigurationContentTypes] = useState<string[]>(['movie', 'series']);
  const [configurationGenres, setConfigurationGenres] = useState<string[]>([]);
  const [configurationCastMembers, setConfigurationCastMembers] = useState<string[]>([]);
  const [configurationAudienceRatings, setConfigurationAudienceRatings] = useState<string[]>([]);
  const [configurationKeywords, setConfigurationKeywords] = useState<string[]>([]);
  const [configurationLanguages, setConfigurationLanguages] = useState<string[]>([]);
  const [configurationMinimumRuntime, setConfigurationMinimumRuntime] = useState('');
  const [configurationMaximumRuntime, setConfigurationMaximumRuntime] = useState('');
  const [newCollectionOpen, setNewCollectionOpen] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [newCollectionStatus, setNewCollectionStatus] = useState('enabled');
  const [newCollectionReference, setNewCollectionReference] = useState('');
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
  const hasCollections = collectionItems.length > 0;
  const hasRails = rails.some((row) => row.kind !== 'group');
  const tree = <Tree data={collectionItems.map((item) => ({ ...item, label: collectionLabels[item.id] ?? item.label }))} selectedId={selectedCollection} initialExpanded={['home', 'drama', 'kids']} ariaLabel="Rail collections" onSelect={(item) => { setSelectedCollection(item.id); if (item.type === 'category') openCollectionEditor(item); }} renderActions={(item) => item.type === 'category' ? <IconButton variant="ghost" size="small" aria-label={`Edit ${item.label} rail collection`} onClick={(event) => { event.stopPropagation(); openCollectionEditor(item); }}><Pencil size={15} /></IconButton> : null} />;
  const isNewCollection = editingCollection === 'new';
  const hasCollectionChanges = Boolean(editingCollection) && (collectionName !== collectionInitialValues.name || collectionDescription !== collectionInitialValues.description || collectionStatus !== collectionInitialValues.status || collectionReference !== collectionInitialValues.reference);
  const saveCollection = () => {
    const label = collectionName.trim();
    if (!label || !editingCollection) return;
    if (editingCollection === 'new') {
      const id = `collection-${Date.now()}`;
      setCollectionItems((current) => [...current, { id, label, count: 0, type: 'category', children: [] }]);
      setSelectedCollection(id);
      setNewRailCollection(id);
    } else {
      setCollectionLabels((current) => ({ ...current, [editingCollection]: label }));
    }
    setEditingCollection(null);
  };
  const resetCreateRail = () => {
    setNewRailName('');
    setNewRailContentType('program');
    setNewRailType('generic');
    setNewRailCollection('');
    setNewRailSlots('10');
    setPersonalizerConfiguration('general-recommendations');
  };
  const closeCreateRail = () => {
    setCreateRailOpen(false);
    resetCreateRail();
  };
  const openCreateRail = () => setCreateRailOpen(true);
  const resetPersonalizerConfiguration = () => {
    setConfigurationName('');
    setConfigurationStrategy('general-recommendations');
    setConfigurationContentTypes(['movie', 'series']);
    setConfigurationGenres([]);
    setConfigurationCastMembers([]);
    setConfigurationAudienceRatings([]);
    setConfigurationKeywords([]);
    setConfigurationLanguages([]);
    setConfigurationMinimumRuntime('');
    setConfigurationMaximumRuntime('');
  };
  const closePersonalizerConfiguration = () => { setConfigurationOpen(false); resetPersonalizerConfiguration(); };
  const createPersonalizerConfiguration = () => {
    const label = configurationName.trim();
    if (!label) return;
    const value = `configuration-${Date.now()}`;
    setPersonalizerConfigurations((current) => [...current, { value, label, strategy: configurationStrategy, contentTypes: configurationContentTypes, genres: configurationGenres, castMembers: configurationCastMembers, audienceRatings: configurationAudienceRatings, keywords: configurationKeywords, languages: configurationLanguages, minimumRuntime: configurationMinimumRuntime, maximumRuntime: configurationMaximumRuntime }]);
    setPersonalizerConfiguration(value);
    closePersonalizerConfiguration();
  };
  const resetNewCollection = () => {
    setNewCollectionTitle('');
    setNewCollectionDescription('');
    setNewCollectionStatus('enabled');
    setNewCollectionReference('');
  };
  const closeNewCollection = () => { setNewCollectionOpen(false); resetNewCollection(); };
  const createNewCollection = () => {
    const label = newCollectionTitle.trim();
    if (!label) return;
    const id = `collection-${Date.now()}`;
    setCollectionItems((current) => [...current, { id, label, count: 0, type: 'category', children: [] }]);
    setSelectedCollection(id);
    setNewRailCollection(id);
    closeNewCollection();
  };
  const createRail = () => {
    const name = newRailName.trim();
    if (!name) return;
    const collection = collectionItems.find((item) => item.id === newRailCollection)?.label ?? 'Home';
    const newRail: TableRow = {
      id: `created-${Date.now()}`,
      railId: String(Date.now()).slice(-7),
      status: 'Active',
      title: name,
      collection,
      type: newRailType === 'generic' ? 'Generic' : newRailType === 'personalized' ? 'Personalized' : 'Hybrid',
      updated: 'Just now',
      expandable: true,
      expandedContent: railPreview(name, `created-${name}`),
      contentSlots: Number(newRailSlots) || 10,
      contentType: newRailContentType,
      personalizerConfiguration: newRailType !== 'generic' ? personalizerConfiguration : undefined,
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
        {editingCollection ? collectionEditor : <div className={`rails-list-page__tree-panel ${hasCollections ? '' : 'rails-list-page__tree-panel--empty'}`}><div className="rails-list-page__tree-actions"><TextButton variant="secondary" className="rails-list-page__add-collection" icon={<Plus size={18} />} onClick={() => openCollectionEditor()}>Add new rail collection</TextButton>{hasCollections && <IconButton variant="ghost" size="small" aria-label="Search rail collections"><Search size={16} /></IconButton>}</div>{hasCollections ? tree : <section className="rails-list-page__sidebar-empty" aria-labelledby="empty-collections-sidebar-title"><FolderPlus size={20} aria-hidden="true" /><strong id="empty-collections-sidebar-title">No collections yet</strong><p>Create a collection to organize the rails your team builds.</p></section>}</div>}
      </WorkspaceLayout.SidePanel>
      <WorkspaceLayout.ResizeHandle />
      <WorkspaceLayout.Main className="rails-list-page__main">
        <WorkspaceLayout.PageHeader className="rails-list-page__titlebar"><div><List size={20} aria-hidden="true" /><h1>Rails List</h1></div><PrimaryButton onClick={openCreateRail}><Plus size={16} /> Create rail</PrimaryButton></WorkspaceLayout.PageHeader>
        {hasRails && <WorkspaceLayout.Toolbar className="rails-list-page__filters"><Filter triggerVariant="icon-seamless" options={[{ id: 'title', label: 'Title', type: 'text' }, { id: 'rail-type', label: 'Rail type', type: 'multiselect', options: [{ value: 'editorial', label: 'Editorial' }, { value: 'recommended', label: 'Recommended' }] }, { id: 'collection', label: 'Collection', type: 'select', options: [{ value: 'home', label: 'Home' }, { value: 'drama', label: 'Drama' }, { value: 'kids', label: 'Kids' }] }]} activeFilters={filters} onChange={(nextFilters) => { setFilters(nextFilters); if (nextFilters.length <= 2) setMatchAllFilters(true); }} placeholder="Add filter" />{filters.length > 2 && <div className="rails-list-page__match"><span>Match</span><TextButton variant="contextual" aria-label={`Switch to match ${matchAllFilters ? 'any' : 'all'} filters`} onClick={() => setMatchAllFilters((value) => !value)}>{matchAllFilters ? 'all filters' : 'any filter'}</TextButton></div>}</WorkspaceLayout.Toolbar>}
        {!hasRails ? <section className="rails-list-page__empty-state" aria-labelledby="rails-list-empty-title"><div className="rails-list-page__empty-copy"><h2 id="rails-list-empty-title">Create your first rail</h2><p>{hasCollections ? 'Rails will appear here as you build them for your collections.' : 'Your rails will appear here. Start by creating a rail collection in the panel on the left.'}</p></div><PrimaryButton onClick={openCreateRail}><Plus size={16} /> Create rail</PrimaryButton><div className="rails-list-page__empty-preview" aria-hidden="true"><div className="rails-list-page__empty-preview-rail"><div><i /><span /><em /></div><section>{Array.from({ length: 5 }, (_, index) => <b key={index} />)}</section></div><div className="rails-list-page__empty-preview-rail rails-list-page__empty-preview-rail--secondary"><div><i /><span /><em /></div><section>{Array.from({ length: 4 }, (_, index) => <b key={index} />)}</section></div></div>{!hasCollections && <span className="rails-list-page__empty-hint">Choose “Create rail collection” in the next step to get started.</span>}</section> : <Table className="rails-list-page__table" ariaLabel="Rails list" columns={columns} data={tableView === 'grouped' ? rails : rails.filter((row) => row.kind !== 'group')} selectable expandable singleExpand={tableView === 'list'} freezeLeadingColumns sortable resizable showActions={false} showViewControl={false} totalItems={rails.filter((row) => row.kind !== 'group').length} pageSize={pageSize} pageSizeOptions={[10, 20, 50]} currentPage={currentPage} onPageChange={setCurrentPage} onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }} onRefresh={() => setRails((current) => [...current])} height="calc(100dvh - 246px)" toolbarActions={<div className="rails-list-page__view-controls" role="group" aria-label="Table view"><IconButton variant={tableView === 'list' ? 'outline' : 'ghost'} size="medium" aria-label="List view" aria-pressed={tableView === 'list'} onClick={() => { setTableView('list'); setCurrentPage(1); }}><List size={16} /></IconButton><IconButton variant={tableView === 'grouped' ? 'outline' : 'ghost'} size="medium" aria-label="Grouped view" aria-pressed={tableView === 'grouped'} onClick={() => { setTableView('grouped'); setCurrentPage(1); }}><FolderTree size={16} /></IconButton></div>} renderCell={(column, value, row) => {
          if (column === 'railId') return <span className="rails-list-page__rail-id">{value}</span>;
          if (column === 'status') return <Status tone={String(value).toLowerCase() === 'active' ? 'success' : 'neutral'}>{value}</Status>;
          if (column === 'title') return <span className="rails-list-page__rail-title">{value}</span>;
          if (column === 'collection') return <Badge>{value}</Badge>;
          if (column === 'type') {
            return <Badge tone={['recommended', 'personalized', 'hybrid'].includes(String(value).toLowerCase()) ? 'info' : 'accent'}>{value}</Badge>;
          }
          if (column === 'controls') return <div className="rails-list-page__row-controls"><IconButton variant="ghost" size="small" aria-label={`Edit ${row.title}`} onClick={() => window.location.assign(`${window.location.pathname}?page=${['Recommended', 'Personalized', 'Hybrid'].includes(String(row.type)) ? 'personalized-rail-details-full' : 'rail-details-full'}`)}><Pencil size={15} /></IconButton><IconButton variant="danger" size="small" aria-label={`Delete ${row.title}`} onClick={() => removeRail(row.id)}><Trash2 size={15} /></IconButton></div>;
          return value;
        }} />}
      </WorkspaceLayout.Main>
    </WorkspaceLayout.Body>
    <Modal
      isOpen={createRailOpen}
      onClose={closeCreateRail}
      title="Create Rail"
      size="large"
      className="rails-list-page__create-rail-modal"
      footer={<><OutlineButton onClick={closeCreateRail}>Cancel</OutlineButton><PrimaryButton onClick={createRail} disabled={!newRailName.trim() || !newRailCollection || Number(newRailSlots) < 1}>Create Rail</PrimaryButton></>}
    >
      <div className="rails-list-page__create-rail-form">
        <ChoiceCardGroup
          label="Content Type"
          helperText="What kind of content will this rail show?"
          required
          value={newRailContentType}
          onChange={(value) => setNewRailContentType(value as RailContentType)}
          options={[
            { value: 'program', label: 'Program Rail', description: 'VOD / On-Demand', icon: <Film /> },
            { value: 'station', label: 'Station Rail', description: 'Channel / Network', icon: <RadioTower /> },
            { value: 'live', label: 'Live Now', description: 'Currently airing', icon: <Radio />, badge: <Badge tone="live">Live</Badge> },
            { value: 'live-program', label: 'Live Now + Program', description: 'Live and VOD combined', icon: <Tv /> },
          ]}
        />
        <ChoiceCardGroup
          label="Rail Type"
          required
          columns={3}
          value={newRailType}
          onChange={(value) => setNewRailType(value as RailType)}
          options={[
            { value: 'generic', label: 'Generic', description: 'Non-personalized, manually curated editorial content', icon: <ListChecks />, badge: <Badge>Default</Badge> },
            { value: 'personalized', label: 'Personalized', description: 'Fully algorithm-driven, tailored to each viewer', icon: <Sparkles /> },
            { value: 'hybrid', label: 'Hybrid', description: 'Blends manual curation with personalization signals', icon: <Layers3 /> },
          ]}
        />
        {newRailType !== 'generic' && <div className="rails-list-page__create-rail-configuration">
          <div className="rails-list-page__select-with-action"><Select label="Personalizer configuration" value={personalizerConfiguration} onChange={setPersonalizerConfiguration} options={personalizerConfigurations.map(({ value, label }) => ({ value, label }))} /><Tooltip content="Create personalizer configuration"><IconButton size="medium" aria-label="Create personalizer configuration" onClick={() => setConfigurationOpen(true)}><Plus size={16} /></IconButton></Tooltip></div>
        </div>}
        <div className="rails-list-page__create-rail-fields">
          <TextInput label="Rail Name" value={newRailName} onChange={(event) => setNewRailName(event.target.value)} placeholder="Enter rail name" required />
          <div className="rails-list-page__select-with-action"><Select label="Rail Collection" value={newRailCollection} onChange={setNewRailCollection} disabled={!hasCollections} placeholder={hasCollections ? 'Select rail collection' : 'No collections available'} required options={collectionItems.map((collection) => ({ value: collection.id, label: collectionLabels[collection.id] ?? collection.label }))} /><Tooltip content="Create rail collection"><IconButton size="medium" aria-label="Create rail collection" onClick={() => setNewCollectionOpen(true)}><Plus size={16} /></IconButton></Tooltip></div>
          <NumberInput label="Number of Content Slots" min={1} value={newRailSlots === '' ? '' : Number(newRailSlots)} onValueChange={(value) => setNewRailSlots(String(value))} required />
        </div>
      </div>
    </Modal>
    <Modal isOpen={configurationOpen} onClose={closePersonalizerConfiguration} title="New personalizer configuration" description="This configuration will be applied to the new rail." size="large" className="rails-list-page__configuration-modal" bodyClassName="rails-list-page__configuration-modal-body" footer={<><OutlineButton onClick={closePersonalizerConfiguration}><ChevronLeft size={16} aria-hidden="true" /> Back</OutlineButton><PrimaryButton onClick={createPersonalizerConfiguration} disabled={!configurationName.trim()}>Save &amp; select</PrimaryButton></>}>
      <div className="rails-list-page__personalizer-form">
        <TextInput label="Configuration name" value={configurationName} onChange={(event) => setConfigurationName(event.target.value)} placeholder="e.g. Action movies for adults" required autoFocus />
        <Select label="Recommendation strategy" value={configurationStrategy} onChange={setConfigurationStrategy} helperText="Defines the recommendation source used by this rail." options={[{ value: 'general-recommendations', label: 'General recommendations' }, { value: 'continue-watching', label: 'Continue watching' }, { value: 'popular-now', label: 'Popular now' }]} />
        <section className="rails-list-page__configuration-filtering" aria-labelledby="configuration-filtering-title"><div><span>Content filtering</span><p id="configuration-filtering-title">Filter recommendations on top of the selected strategy.</p></div></section>
        <TagFilter sections={[{ id: 'content-type', title: 'What type of content?', options: [{ id: 'movie', label: 'Movies' }, { id: 'series', label: 'Series' }] }]} selectedOptions={configurationContentTypes} onSelectionChange={setConfigurationContentTypes} />
        <MultiSelect label="Genres to include" value={configurationGenres} onChange={setConfigurationGenres} placeholder="Add genres…" options={[{ value: 'action', label: 'Action' }, { value: 'drama', label: 'Drama' }, { value: 'comedy', label: 'Comedy' }, { value: 'documentary', label: 'Documentary' }]} />
        <MultiSelect label="Featuring cast members" value={configurationCastMembers} onChange={setConfigurationCastMembers} placeholder="Add cast members…" options={[{ value: 'viola-davis', label: 'Viola Davis' }, { value: 'pedro-pascal', label: 'Pedro Pascal' }, { value: 'zendaya', label: 'Zendaya' }]} />
        <TagFilter sections={[{ id: 'audience-rating', title: 'Audience rating', options: [{ id: 'g', label: 'G' }, { id: 'pg', label: 'PG' }, { id: 'pg-13', label: 'PG-13' }, { id: 'r', label: 'R' }, { id: 'nc-17', label: 'NC-17' }] }]} selectedOptions={configurationAudienceRatings} onSelectionChange={setConfigurationAudienceRatings} />
        <MultiSelect label="Match keywords" value={configurationKeywords} onChange={setConfigurationKeywords} placeholder="Add keywords…" options={[]} />
        <MultiSelect label="Available in languages" value={configurationLanguages} onChange={setConfigurationLanguages} placeholder="Add languages…" options={[{ value: 'english', label: 'English' }, { value: 'spanish', label: 'Spanish' }, { value: 'french', label: 'French' }, { value: 'german', label: 'German' }]} />
        <div className="rails-list-page__configuration-runtime"><NumberInput label="Minimum runtime" value={configurationMinimumRuntime === '' ? '' : Number(configurationMinimumRuntime)} onValueChange={(value) => setConfigurationMinimumRuntime(String(value))} min={0} placeholder="Min (min)" /><span>to</span><NumberInput label="Maximum runtime" value={configurationMaximumRuntime === '' ? '' : Number(configurationMaximumRuntime)} onValueChange={(value) => setConfigurationMaximumRuntime(String(value))} min={0} placeholder="Max (min)" /></div>
        <p className="rails-list-page__configuration-runtime-help">Duration range in minutes. Leave blank for no limit.</p>
      </div>
    </Modal>
    <Modal isOpen={newCollectionOpen} onClose={closeNewCollection} title="New rail collection" description="This collection will be selected for the new rail." size="medium" className="rails-list-page__collection-modal" footer={<><OutlineButton onClick={closeNewCollection}><ChevronLeft size={16} aria-hidden="true" /> Back</OutlineButton><PrimaryButton onClick={createNewCollection} disabled={!newCollectionTitle.trim()}>Save &amp; select</PrimaryButton></>}>
      <div className="rails-list-page__collection-modal-form">
        <TextInput label="Title" value={newCollectionTitle} onChange={(event) => setNewCollectionTitle(event.target.value)} required autoFocus />
        <TextArea label="Description" value={newCollectionDescription} onChange={(event) => setNewCollectionDescription(event.target.value)} rows={4} resize="vertical" />
        <Select label="Status" value={newCollectionStatus} onChange={setNewCollectionStatus} options={[{ value: 'enabled', label: 'Enabled' }, { value: 'disabled', label: 'Disabled' }]} />
        <TextInput label="External reference ID" optionalText="Advanced" value={newCollectionReference} onChange={(event) => setNewCollectionReference(event.target.value)} />
      </div>
    </Modal>
  </WorkspaceLayout>;
}
