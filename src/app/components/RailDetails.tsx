import React, { useState } from 'react';
import { CircleHelp, Filter, Lock, PanelLeftClose, PanelLeftOpen, Plus, Save, Trash2 } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { Checkbox } from './Checkbox';
import { ContentBrowserModal } from './ContentBrowserModal';
import { HeaderNavigation } from './HeaderNavigation';
import { IconButton } from './IconButton';
import { IconButtonWithText } from './IconButtonWithText';
import { NotificationBanner } from './NotificationBanner';
import { OutlineButton } from './OutlineButton';
import { PrimaryButton } from './PrimaryButton';
import { RailContentGallery, RailContentItem } from './RailContentGallery';
import { Select } from './Select';
import { SearchField } from './SearchField';
import { Segmented } from './Segmented';
import { SortControl } from './SortControl';
import { Tabs } from './Tabs';
import { TextInput } from './TextInput';
import { NumberInput } from './NumberInput';
import { MultiSelect } from './MultiSelect';
import { Modal } from './Modal';
import { TagFilter } from './TagFilter';
import { TextButton } from './TextButton';
import { Tooltip } from './Tooltip';
import { ToastProvider, useToast } from './Toast';
import { WorkspaceLayout } from './WorkspaceLayout';
import './RailDetails.css';

interface RailDetailsProps { railName?: string; totalLabels?: number; initiallyEmpty?: boolean; queryLocked?: boolean; }

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

function FilterTooltip({ content }: { content: string }) {
  return <Tooltip content={content} side="right" align="center"><button className="rail-details__filter-help" type="button" aria-label={content}><CircleHelp size={15} aria-hidden="true" /></button></Tooltip>;
}

function ReadOnlyIndicator() {
  return <Tooltip content="Read only" side="right" align="center"><span className="rail-details__read-only-indicator" role="img" aria-label="Read only"><Lock size={14} aria-hidden="true" /></span></Tooltip>;
}

function RailDetailsWorkspace({ railName = 'Trending', initiallyEmpty = false, queryLocked = false }: RailDetailsProps) {
  const { addToast } = useToast();
  const initialContentSlots = queryLocked ? '3' : '24';
  const initialRailItems = initiallyEmpty ? [] : queryLocked ? initialItems.slice(0, 3).map((item) => ({ ...item, metadata: { ...item.metadata, status: 'pinned' } })) : initialItems;
  const [name, setName] = useState(railName);
  const [collection, setCollection] = useState('home');
  const [contentSlots, setContentSlots] = useState(initialContentSlots);
  const [guid, setGuid] = useState('trending-editorial-001');
  const [disabled, setDisabled] = useState(false);
  const [mediaFormats, setMediaFormats] = useState<string[]>([]);
  const [filterSearch, setFilterSearch] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [matchMode, setMatchMode] = useState<'all' | 'any'>('all');
  const [genres, setGenres] = useState<string[]>([]);
  const [releaseYear, setReleaseYear] = useState('');
  const [mediaAvailability, setMediaAvailability] = useState<string[]>([]);
  const [anyTitlePrefix, setAnyTitlePrefix] = useState('');
  const [subscriptionPackages, setSubscriptionPackages] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [isAdult, setIsAdult] = useState('');
  const [exactTitle, setExactTitle] = useState('');
  const [titlePrefix, setTitlePrefix] = useState('');
  const [tvSeason, setTvSeason] = useState('');
  const [activeTab, setActiveTab] = useState(queryLocked ? 'query' : 'base');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [browserOpen, setBrowserOpen] = useState(false);
  const [items, setItems] = useState<RailContentItem[]>(() => initialRailItems);
  const [contentDirty, setContentDirty] = useState(false);
  const [candidateSelection, setCandidateSelection] = useState<string[]>([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const showDeferredEditorialFilters = false;
  const showPreviewGuide = false;

  const toggleTheme = () => {
    const root = document.documentElement;
    root.setAttribute('data-theme', root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  };
  const save = () => { setContentDirty(false); addToast({ variant: 'success', title: 'Rail saved', description: `${name} and its ${items.length} content items are up to date.` }); };
  const deleteRail = () => {
    setDeleteConfirmationOpen(false);
    window.location.assign(`${window.location.pathname}?page=rails-list`);
  };
  const queriedItems = items.filter((item) => {
    const normalizedTitle = item.title.toLocaleLowerCase();
    const category = item.metadata.category?.toLocaleLowerCase() ?? '';
    const languageByCategory: Record<string, string> = { action: 'en', drama: 'fr', 'sci-fi': 'de', thriller: 'it' };
    const criteria = [
      mediaFormats.length ? !mediaFormats.includes('movie') : undefined,
      genres.length ? genres.includes(category) : undefined,
      releaseYear ? (releaseYear === 'before-2010' && Number(item.year) < 2010) || (releaseYear === '2010s' && Number(item.year) >= 2010 && Number(item.year) < 2020) || (releaseYear === '2020s' && Number(item.year) >= 2020) : undefined,
      mediaAvailability.length ? mediaAvailability.includes(item.metadata.status === 'inactive' ? 'expired' : 'available') : undefined,
      exactTitle ? normalizedTitle === exactTitle.toLocaleLowerCase() : undefined,
      titlePrefix ? normalizedTitle.startsWith(titlePrefix.toLocaleLowerCase()) : undefined,
      anyTitlePrefix ? normalizedTitle.startsWith(anyTitlePrefix.toLocaleLowerCase()) : undefined,
      subscriptionPackages.length ? subscriptionPackages.includes(`package-${item.id}`) : undefined,
      languages.length ? languages.includes(languageByCategory[category]) : undefined,
      isAdult ? (isAdult === 'yes' ? item.metadata.status === 'inactive' : item.metadata.status !== 'inactive') : undefined,
      tvSeason ? (tvSeason === '1' ? Number(item.year) < 2010 : tvSeason === '2' ? Number(item.year) < 2020 : Number(item.year) >= 2020) : undefined,
    ].filter((criterion): criterion is boolean => criterion !== undefined);
    return !criteria.length || (matchMode === 'all' ? criteria.every(Boolean) : criteria.some(Boolean));
  }).sort((a, b) => {
    const valueA = sortField === 'year' ? a.year : a.title;
    const valueB = sortField === 'year' ? b.year : b.title;
    return valueA.localeCompare(valueB) * (sortDirection === 'asc' ? 1 : -1);
  });
  const isEmptyRail = items.length === 0;
  const hasEmptyQuery = !isEmptyRail && queriedItems.length === 0;
  const remainingManualSlots = initiallyEmpty && items.length > 0 ? Math.max(Number(contentSlots) - items.length, 0) : 0;

  const basePanel = <div className="rail-details__form">
    <div className="rail-details__form-section">
      <TextInput label="Rail name" required value={name} onChange={(event) => setName(event.target.value)} />
      <Select label="Rail collection" required labelTooltip={<ReadOnlyIndicator />} value={collection} onChange={setCollection} disabled options={[{ value: 'home', label: 'Home screen' }, { value: 'drama', label: 'Drama' }, { value: 'kids', label: 'Kids' }]} />
      <NumberInput label="Number of content slots" required labelTooltip={<ReadOnlyIndicator />} value={contentSlots === '' ? '' : Number(contentSlots)} onValueChange={(value) => setContentSlots(String(value))} min={1} disabled />
      <TextInput label="GUID" required value={guid} onChange={(event) => setGuid(event.target.value)} />
      <Checkbox label="Disable" checked={disabled} onChange={(checked) => setDisabled(checked === true)} />
      <section className="rail-details__danger-zone" aria-labelledby="delete-rail-heading">
        <div><strong id="delete-rail-heading">Delete rail</strong><p>Remove this rail and its configuration permanently.</p></div>
        <TextButton variant="secondary" className="rail-details__delete-action" icon={<Trash2 size={15} />} onClick={() => setDeleteConfirmationOpen(true)}>Delete rail</TextButton>
      </section>
    </div>
  </div>;
  const hasQueryFilters = Boolean(mediaFormats.length || genres.length || mediaAvailability.length || releaseYear || anyTitlePrefix || subscriptionPackages.length || languages.length || isAdult || exactTitle || titlePrefix || tvSeason || sortField !== 'title' || sortDirection !== 'desc');
  const hasBaseChanges = name !== railName || collection !== 'home' || contentSlots !== '24' || guid !== 'trending-editorial-001' || disabled;
  const shouldShowSaveFooter = hasBaseChanges || hasQueryFilters || matchMode !== 'all' || contentDirty;
  const matchesFilterSearch = (...labels: string[]) => !filterSearch.trim() || labels.some((label) => label.toLocaleLowerCase().includes(filterSearch.trim().toLocaleLowerCase()));
  const clearQueryFilters = () => {
    setMediaFormats([]);
    setGenres([]);
    setReleaseYear('');
    setMediaAvailability([]);
    setAnyTitlePrefix('');
    setSubscriptionPackages([]);
    setLanguages([]);
    setIsAdult('');
    setExactTitle('');
    setTitlePrefix('');
    setTvSeason('');
    setMatchMode('all');
    setSortField('title');
    setSortDirection('desc');
  };
  const cancelChanges = () => {
    setName(railName);
    setCollection('home');
    setContentSlots(initialContentSlots);
    setGuid('trending-editorial-001');
    setDisabled(false);
    setItems(initialRailItems);
    setContentDirty(false);
    setFilterSearch('');
    clearQueryFilters();
    addToast({ variant: 'info', title: 'Changes discarded', description: 'The rail settings and content query were restored.' });
  };
  const addAlgorithmically = () => {
    setSidebarOpen(true);
    setActiveTab('query');
  };
  const addManually = () => {
    setCandidateSelection([]);
    setBrowserOpen(true);
  };
  const queryPanel = <div className="rail-details__form">
    {queryLocked && <NotificationBanner className="rail-details__query-lock-banner" title="Query filters unavailable" message="All available slots are occupied by manual content. To use the content query filters, free up at least one slot by removing a manual item." variant="info" />}
    <div className={`rail-details__form-section rail-details__query-section ${queryLocked ? 'rail-details__query-section--locked' : ''}`}>
      <div className="rail-details__query-lockable" aria-label={queryLocked ? 'Content query unavailable because all slots are manual' : undefined}>
        <div className="rail-details__query-lockable-content" aria-hidden={queryLocked || undefined} inert={queryLocked ? '' : undefined}>
      {hasQueryFilters && <div className="rail-details__query-actions"><TextButton onClick={clearQueryFilters}>Clear all filters</TextButton></div>}
      <div className="rail-details__query-controls">
        <SearchField label="Search filters" value={filterSearch} onChange={(event) => setFilterSearch(event.target.value)} onClear={() => setFilterSearch('')} placeholder="Search filters…" />
        <SortControl value={sortField} direction={sortDirection} onChange={setSortField} onDirectionChange={setSortDirection} options={[{ value: 'title', label: 'Title' }, { value: 'year', label: 'Release year' }]} />
        <div className="rail-details__match-control"><span>Match filters</span><FilterTooltip content="Choose whether content must match all selected filters or at least one selected filter" /><Segmented ariaLabel="Filter match mode" size="small" value={matchMode} onChange={(value) => setMatchMode(value as 'all' | 'any')} options={[{ value: 'all', label: 'All' }, { value: 'any', label: 'Any' }]} /></div>
      </div>
      <div className="rail-details__filter-content">
        {matchesFilterSearch('Program type') && <TagFilter sections={[{ id: 'program-type', title: 'Program type', titleTooltip: <FilterTooltip content="Filter content by program type" />, options: [{ id: 'movie', label: 'Movie' }, { id: 'series', label: 'Series' }] }]} selectedOptions={mediaFormats} onSelectionChange={setMediaFormats} />}
        {matchesFilterSearch('Tags') && <MultiSelect label="Tags" labelTooltip={<FilterTooltip content="Filter content by one or more tags associated with the program" />} value={genres} onChange={setGenres} allowCreate={false} placeholder="Select tags…" options={[{ value: 'action', label: 'Action' }, { value: 'drama', label: 'Drama' }, { value: 'sci-fi', label: 'Sci-Fi' }, { value: 'thriller', label: 'Thriller' }]} />}
        {matchesFilterSearch('Media availability', 'Available', 'Not yet available', 'Expired', 'Unknown') && <TagFilter sections={[{ id: 'media-availability', title: 'Media availability', titleTooltip: <FilterTooltip content="Filter content by its current availability" />, options: [{ id: 'available', label: 'Available' }, { id: 'notYetAvailable', label: 'Not yet available' }, { id: 'expired', label: 'Expired' }, { id: 'unknown', label: 'Unknown' }] }]} selectedOptions={mediaAvailability} onSelectionChange={setMediaAvailability} />}
        {matchesFilterSearch('Year', 'Release year') && <Select label="Year" labelTooltip={<FilterTooltip content="Filter programs by release year" />} value={releaseYear} onChange={setReleaseYear} placeholder="Select or type a year" options={[{ value: 'before-2010', label: 'Before 2010' }, { value: '2010s', label: '2010–2019' }, { value: '2020s', label: '2020 and later' }]} />}
        {matchesFilterSearch('Title', 'Exact title') && <TextInput label="Title" labelTooltip={<FilterTooltip content="Filter programs by exact title match" />} value={exactTitle} onChange={(event) => setExactTitle(event.target.value)} placeholder="Enter title" />}
        {showDeferredEditorialFilters && matchesFilterSearch('Title prefix', 'Primary title') && <TextInput label="Title prefix" labelTooltip={<FilterTooltip content="Filter programs whose primary title starts with the given prefix" />} value={titlePrefix} onChange={(event) => setTitlePrefix(event.target.value)} placeholder="Enter title prefix" />}
        {matchesFilterSearch('Any title prefix') && <TextInput label="Any title prefix" labelTooltip={<FilterTooltip content="Filter programs whose any title starts with the given prefix" />} value={anyTitlePrefix} onChange={(event) => setAnyTitlePrefix(event.target.value)} placeholder="Enter title prefix" />}
        {matchesFilterSearch('Subscription packages', 'Package') && <MultiSelect label="Subscription packages" labelTooltip={<FilterTooltip content="Filter by one or more subscription packages associated with the program" />} value={subscriptionPackages} onChange={setSubscriptionPackages} allowCreate={false} placeholder="Select subscription packages…" options={[{ value: 'package-1', label: 'Test Package 1' }, { value: 'package-3', label: 'Test Package 3' }, { value: 'package-4', label: 'Test Package 4' }, { value: 'package-5', label: 'Test Package 5' }, { value: 'package-6', label: 'Test Package 6' }]} />}
        {matchesFilterSearch('Languages') && <MultiSelect label="Languages" labelTooltip={<FilterTooltip content="Filter by one or more languages associated with the program" />} value={languages} onChange={setLanguages} allowCreate={false} placeholder="Select languages…" options={[{ value: 'en', label: 'English (en)' }, { value: 'es', label: 'Spanish (es)' }, { value: 'fr', label: 'French (fr)' }, { value: 'de', label: 'German (de)' }, { value: 'it', label: 'Italian (it)' }]} />}
        {showDeferredEditorialFilters && matchesFilterSearch('Is adult', 'Adult') && <Select label="Is adult" labelTooltip={<FilterTooltip content="Filter by whether the program is marked as adult content" />} value={isAdult} onChange={setIsAdult} placeholder="Select audience…" options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />}
        {showDeferredEditorialFilters && matchesFilterSearch('TV season', 'Season') && <Select label="TV season" labelTooltip={<FilterTooltip content="Filter programs by their associated television season" />} value={tvSeason} onChange={setTvSeason} placeholder="Select TV season…" options={[{ value: '1', label: 'Season 1' }, { value: '2', label: 'Season 2' }, { value: '3', label: 'Season 3' }]} />}
      </div>
        </div>
        {queryLocked && <div className="rail-details__query-lock-overlay" aria-hidden="true"><Lock size={18} /><strong>Content query unavailable</strong><span>All available slots are filled with manual content.</span></div>}
      </div>
    </div>
  </div>;

  return <WorkspaceLayout className="rail-details-page">
    <WorkspaceLayout.GlobalHeader><HeaderNavigation variant="static" brandName="Rail Manager" userName="Jane Doe" userEmail="jane@cvp.example" teams={[{ id: 'editorial', name: 'Editorial Team' }]} selectedTeamId="editorial" onThemeSwitch={toggleTheme} /></WorkspaceLayout.GlobalHeader>
    <WorkspaceLayout.Breadcrumbs className="rail-details__crumbs"><Breadcrumbs surface="canvas" items={[{ id: 'rails-list', label: 'Rails List' }, { id: 'current', label: name }]} /></WorkspaceLayout.Breadcrumbs>
    <WorkspaceLayout.Body className={`rail-details__workspace ${sidebarOpen ? '' : 'rail-details__workspace--sidebar-collapsed'}`} sidePanelWidth="344px">
      {sidebarOpen && <><WorkspaceLayout.SidePanel className="rail-details__sidebar" aria-label="Rail configuration"><div className="rail-details__panel-title"><strong>Rail Manager</strong></div><Tabs ariaLabel="Rail settings" activeTab={activeTab} onTabChange={setActiveTab} tabs={[{ id: 'base', label: 'Base', content: basePanel }, { id: 'query', label: 'Content Query', content: queryPanel }]} /></WorkspaceLayout.SidePanel><WorkspaceLayout.ResizeHandle /></>}
      <WorkspaceLayout.Main className="rail-details__main">
        <div className="rail-details__preview-bar"><IconButton aria-label={sidebarOpen ? 'Collapse configuration' : 'Open configuration'} aria-expanded={sidebarOpen} onClick={() => setSidebarOpen((value) => !value)}>{sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}</IconButton><strong>Content Preview</strong><span className="cvp-status-tag cvp-status-tag--editorial rail-details__preview-tag">Editorial</span></div>
        <div className="rail-details__content">
          {isEmptyRail ? <section className="rail-details__empty-rail" aria-labelledby="empty-rail-title"><div className="rail-details__empty-rail-card"><div className="rail-details__empty-rail-copy"><h2 id="empty-rail-title">No content in this rail</h2><p>Add content to this rail using one of the options below.</p></div><div className="rail-details__empty-rail-actions"><IconButtonWithText size="m" icon={<Filter />} text="Add algorithmically" description="Use content query filters to automatically populate this rail." onClick={addAlgorithmically} /><IconButtonWithText size="m" icon={<Plus />} text="Add manually" description="Browse and select individual content items to add." onClick={addManually} /></div></div></section> : <>{hasEmptyQuery && <NotificationBanner title="No content found" message="No content matches the current editorial VOD criteria." variant="warning" />}<RailContentGallery title={name} showItemCount itemCountPlacement="navigation" items={queriedItems} variant="management" emptyMessage={hasEmptyQuery ? 'Try a different filter or clear the current criteria.' : undefined} emptySlotCount={hasEmptyQuery ? 10 : remainingManualSlots} onAddToEmptySlot={addManually} onEdit={(item) => { setCandidateSelection([item.id]); setBrowserOpen(true); }} onDelete={(item) => { setItems((current) => current.filter((candidate) => candidate.id !== item.id)); setContentDirty(true); addToast({ variant: 'info', title: 'Content removed', description: item.title }); }} onPin={(item) => { setContentDirty(true); addToast({ variant: 'info', title: 'Pin updated', description: item.title }); }} onDrag={(id, position) => { setContentDirty(true); addToast({ variant: 'info', title: 'Order changed', description: `Item ${id} moved to position ${position + 1}.` }); }} /></>}
          {showPreviewGuide && <NotificationBanner title="Preview guide" message="This preview reflects the current rail configuration. Reorder or pin content, then save to publish your changes." variant="info" actionLabel="Review query" onAction={() => setSidebarOpen(true)} />}
        </div>
      </WorkspaceLayout.Main>
    </WorkspaceLayout.Body>
    {shouldShowSaveFooter && <WorkspaceLayout.Footer className="rail-details__footer"><OutlineButton onClick={cancelChanges}>Cancel</OutlineButton><PrimaryButton onClick={save}><Save size={15} /> Save changes</PrimaryButton></WorkspaceLayout.Footer>}
    <Modal isOpen={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)} title={`Delete ${name}?`} description="This permanently removes the rail, its content, and its configuration. This action cannot be undone." tone="danger" footer={<><OutlineButton onClick={() => setDeleteConfirmationOpen(false)}>Cancel</OutlineButton><TextButton variant="secondary" className="rail-details__delete-action rail-details__delete-action--confirm" icon={<Trash2 size={15} />} onClick={deleteRail}>Delete rail</TextButton></>}>
      <p className="rail-details__delete-confirmation">You are about to delete <strong>{name}</strong>.</p>
    </Modal>
    <ContentBrowserModal isOpen={browserOpen} onClose={() => setBrowserOpen(false)} items={initialItems} selectedItems={candidateSelection} onSelectionChange={setCandidateSelection} onConfirm={(ids) => { setItems(initialItems.filter((item) => ids.includes(item.id))); setContentDirty(true); addToast({ variant: 'success', title: 'Content updated', description: `${ids.length} items are now in the rail.` }); }} />
  </WorkspaceLayout>;
}

export function RailDetails(props: RailDetailsProps) { return <ToastProvider><RailDetailsWorkspace {...props} /></ToastProvider>; }
