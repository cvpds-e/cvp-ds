import React, { useState } from 'react';
import { Activity, ArrowLeft, ChevronRight, CircleDot, Network, PanelLeftClose, PanelLeftOpen, Plus, Save, Sparkles, TimerReset, Trash2, TrendingUp } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { HeaderNavigation } from './HeaderNavigation';
import { IconButton } from './IconButton';
import { MultiSelect } from './MultiSelect';
import { Modal } from './Modal';
import { NumberInput } from './NumberInput';
import { OutlineButton } from './OutlineButton';
import { PrimaryButton } from './PrimaryButton';
import { RailContentGallery, RailContentItem } from './RailContentGallery';
import { Select } from './Select';
import { Status } from './Status';
import { Tabs } from './Tabs';
import { TagFilter } from './TagFilter';
import { TextButton } from './TextButton';
import { TextInput } from './TextInput';
import { ToastProvider, useToast } from './Toast';
import { UnsavedChangesFooter } from './UnsavedChangesFooter';
import { WorkspaceLayout } from './WorkspaceLayout';
import './PersonalizedRailDetails.css';

const titles = [
  ['Dune', '2020'], ['The Batman', '2021'], ['Top Gun: Maverick', '2022'], ['No Time to Die', '2023'],
  ['Fast X', '2024'], ['Extraction', '2020'], ['Dune 2', '2021'], ['The Batman 2', '2022'],
  ['Top Gun: Maverick 2', '2023'], ['Mission: Impossible', '2023'], ['John Wick', '2019'], ['The Creator', '2023'],
  ['Blade Runner 2049', '2017'], ['Mad Max: Fury Road', '2015'], ['Tenet', '2020'], ['Oppenheimer', '2023'],
  ['The Dark Knight', '2008'], ['Inception', '2010'], ['Interstellar', '2014'], ['The Prestige', '2006'],
  ['Skyfall', '2012'], ['Arrival', '2016'], ['Sicario', '2015'], ['Edge of Tomorrow', '2014'],
];

const thumbnails = [
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=320&q=80',
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=320&q=80',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=320&q=80',
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=320&q=80',
  'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=320&q=80',
];

const recommendationItems: RailContentItem[] = titles.map(([title, year], index) => ({
  id: `recommendation-${index + 1}`,
  title,
  year,
  thumbnail: thumbnails[index % thumbnails.length],
  position: index + 1,
  metadata: { source: 'algorithmic' },
}));

type ConfigurationStatus = 'Active' | 'Inactive' | 'Training';

interface PersonalizerConfiguration {
  id: string;
  name: string;
  strategy: string;
  status: ConfigurationStatus;
  contentTypes: string[];
  genres: string[];
  castMembers: string[];
  audienceRatings: string[];
  keywords: string[];
  languages: string[];
  minimumRuntime: string;
  maximumRuntime: string;
}

const initialConfigurations: PersonalizerConfiguration[] = [
  { id: 'general-recommendations', name: 'General Recommendations', strategy: 'general-recommendations', status: 'Active', contentTypes: ['movie', 'series'], genres: ['action', 'drama', 'comedy'], castMembers: [], audienceRatings: [], keywords: [], languages: ['english'], minimumRuntime: '', maximumRuntime: '' },
  { id: 'trending-content', name: 'Trending Content', strategy: 'trending', status: 'Active', contentTypes: ['movie', 'series'], genres: ['action', 'drama'], castMembers: [], audienceRatings: [], keywords: [], languages: ['english'], minimumRuntime: '', maximumRuntime: '' },
  { id: 'similar-content', name: 'Similar Content', strategy: 'because-you-watched', status: 'Active', contentTypes: ['movie'], genres: ['thriller', 'sci-fi', 'horror'], castMembers: [], audienceRatings: [], keywords: [], languages: ['english'], minimumRuntime: '', maximumRuntime: '' },
  { id: 'user-behavior', name: 'User Behavior', strategy: 'popular', status: 'Active', contentTypes: ['series'], genres: ['drama', 'crime'], castMembers: [], audienceRatings: [], keywords: [], languages: ['english'], minimumRuntime: '', maximumRuntime: '' },
  { id: 'custom-config-1', name: 'Custom Config 1', strategy: 'recently-added', status: 'Inactive', contentTypes: ['movie', 'series'], genres: [], castMembers: [], audienceRatings: [], keywords: [], languages: [], minimumRuntime: '', maximumRuntime: '' },
  { id: 'custom-config-2', name: 'Custom Config 2', strategy: 'continue-watching', status: 'Training', contentTypes: ['series'], genres: ['animation', 'fantasy'], castMembers: [], audienceRatings: [], keywords: [], languages: [], minimumRuntime: '', maximumRuntime: '' },
];

const strategyLabels: Record<string, string> = {
  'general-recommendations': 'General Recommendations',
  trending: 'Trending',
  'because-you-watched': 'Because You Watched',
  popular: 'Popular',
  'recently-added': 'Recently Added',
  'continue-watching': 'Continue Watching',
};

const configurationIcons = [Sparkles, TrendingUp, CircleDot, Activity, Network, TimerReset];
const formatValues = (values: string[]) => values.map((value) => value.replace(/(^|-)(\w)/g, (_, separator, letter) => `${separator ? ' ' : ''}${letter.toUpperCase()}`)).join(', ');

function PersonalizedRailDetailsWorkspace() {
  const { addToast } = useToast();
  const [name, setName] = useState('Spotlight');
  const [status, setStatus] = useState('active');
  const [collection, setCollection] = useState('home');
  const [position, setPosition] = useState<number | ''>(2);
  const [contentSlots, setContentSlots] = useState<number | ''>(24);
  const [configuration, setConfiguration] = useState('general-recommendations');
  const [externalReferenceId, setExternalReferenceId] = useState('65cdc98c9-e1fdcc7931968');
  const [personalizerConfigurations, setPersonalizerConfigurations] = useState(initialConfigurations);
  const [editingConfigurationId, setEditingConfigurationId] = useState<string | 'new' | null>(null);
  const [configurationName, setConfigurationName] = useState('');
  const [strategy, setStrategy] = useState('general-recommendations');
  const [contentTypes, setContentTypes] = useState<string[]>(['movie', 'series']);
  const [genres, setGenres] = useState<string[]>([]);
  const [castMembers, setCastMembers] = useState<string[]>([]);
  const [audienceRatings, setAudienceRatings] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [minimumRuntime, setMinimumRuntime] = useState('');
  const [maximumRuntime, setMaximumRuntime] = useState('');
  const [configurationDirty, setConfigurationDirty] = useState(false);
  const [activeTab, setActiveTab] = useState('base');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [deleteRailConfirmationOpen, setDeleteRailConfirmationOpen] = useState(false);
  const [deleteConfigurationConfirmationOpen, setDeleteConfigurationConfirmationOpen] = useState(false);

  const hasChanges = name !== 'Spotlight' || status !== 'active' || collection !== 'home' || position !== 2 || contentSlots !== 24 || configuration !== 'general-recommendations' || externalReferenceId !== '65cdc98c9-e1fdcc7931968';
  const reset = () => {
    setName('Spotlight'); setStatus('active'); setCollection('home'); setPosition(2); setContentSlots(24);
    setConfiguration('general-recommendations'); setExternalReferenceId('65cdc98c9-e1fdcc7931968');
  };
  const save = () => addToast({ variant: 'success', title: 'Rail saved', description: `${name} is using General recommendations.` });
  const deleteRail = () => {
    setDeleteRailConfirmationOpen(false);
    window.location.assign(`${window.location.pathname}?page=rails-list`);
  };
  const toggleTheme = () => {
    const root = document.documentElement;
    root.setAttribute('data-theme', root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  };
  const selectedRailConfiguration = personalizerConfigurations.find((item) => item.id === configuration) ?? personalizerConfigurations[0];
  const openConfiguration = (item?: PersonalizerConfiguration) => {
    setEditingConfigurationId(item?.id ?? 'new');
    setConfigurationName(item?.name ?? '');
    setStrategy(item?.strategy ?? 'general-recommendations');
    setContentTypes(item?.contentTypes ?? ['movie', 'series']);
    setGenres(item?.genres ?? []);
    setCastMembers(item?.castMembers ?? []);
    setAudienceRatings(item?.audienceRatings ?? []);
    setKeywords(item?.keywords ?? []);
    setLanguages(item?.languages ?? []);
    setMinimumRuntime(item?.minimumRuntime ?? '');
    setMaximumRuntime(item?.maximumRuntime ?? '');
    setConfigurationDirty(!item);
  };
  const saveConfiguration = () => {
    const trimmedName = configurationName.trim();
    if (!trimmedName || !editingConfigurationId) return;
    const id = editingConfigurationId === 'new' ? `configuration-${Date.now()}` : editingConfigurationId;
    const existingStatus = personalizerConfigurations.find((item) => item.id === editingConfigurationId)?.status ?? 'Active';
    const nextConfiguration: PersonalizerConfiguration = { id, name: trimmedName, strategy, status: existingStatus, contentTypes, genres, castMembers, audienceRatings, keywords, languages, minimumRuntime, maximumRuntime };
    setPersonalizerConfigurations((current) => editingConfigurationId === 'new' ? [...current, nextConfiguration] : current.map((item) => item.id === id ? nextConfiguration : item));
    if (editingConfigurationId === 'new') setConfiguration(id);
    setEditingConfigurationId(null);
    setConfigurationDirty(false);
    addToast({ variant: 'success', title: 'Configuration saved', description: `${trimmedName} is ready to use.` });
  };
  const deleteConfiguration = () => {
    if (!editingConfigurationId || editingConfigurationId === 'new') return;
    const deletedName = configurationName;
    setPersonalizerConfigurations((current) => current.filter((item) => item.id !== editingConfigurationId));
    if (configuration === editingConfigurationId) setConfiguration('general-recommendations');
    setEditingConfigurationId(null);
    setConfigurationDirty(false);
    addToast({ variant: 'info', title: 'Configuration deleted', description: deletedName });
  };

  const basePanel = <div className="personalized-rail-details__form"><div className="personalized-rail-details__form-section">
    <TextInput label="Rail name" value={name} onChange={(event) => setName(event.target.value)} required />
    <Select label="Rail status" value={status} onChange={setStatus} options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }, { value: 'draft', label: 'Draft' }]} />
    <Select label="Rail collection" value={collection} onChange={setCollection} options={[{ value: 'home', label: 'Home' }, { value: 'drama', label: 'Drama' }, { value: 'kids', label: 'Kids' }]} />
    <NumberInput label="Rail position" value={position} onValueChange={setPosition} min={1} />
    <NumberInput label="Number of content slots" value={contentSlots} onValueChange={setContentSlots} min={1} />
    <Select label="Personalizer configuration" value={configuration} onChange={setConfiguration} helperText="The ML configuration powering recommendations for this rail." options={personalizerConfigurations.map((item) => ({ value: item.id, label: item.name }))} />
    <article className="personalized-rail-details__configuration-card">
      <div className="personalized-rail-details__configuration-heading"><span><Sparkles size={16} aria-hidden="true" /></span><div><strong>{selectedRailConfiguration.name}</strong><Status tone={selectedRailConfiguration.status === 'Active' ? 'success' : selectedRailConfiguration.status === 'Training' ? 'warning' : 'neutral'}>{selectedRailConfiguration.status}</Status><p>{strategyLabels[selectedRailConfiguration.strategy]}</p></div></div>
      <dl><div><dt>Content types</dt><dd>{formatValues(selectedRailConfiguration.contentTypes) || 'Any'}</dd></div><div><dt>Genres</dt><dd>{formatValues(selectedRailConfiguration.genres) || 'Any'}</dd></div><div><dt>Languages</dt><dd>{formatValues(selectedRailConfiguration.languages) || 'Any'}</dd></div><div><dt>Last updated</dt><dd>2026-04-28</dd></div></dl>
    </article>
    <div className="personalized-rail-details__configuration-link"><p><strong>Want to tweak the parameters?</strong> Head to Personalizer Configurations to edit this config or create new ones.</p><TextButton variant="secondary" onClick={() => { setActiveTab('configuration'); setEditingConfigurationId(null); }}>Open <ChevronRight size={14} /></TextButton></div>
    <TextInput label="External reference ID" optionalText="Advanced" value={externalReferenceId} onChange={(event) => setExternalReferenceId(event.target.value)} />
    <section className="personalized-rail-details__danger-zone" aria-labelledby="delete-personalized-rail-heading"><div><strong id="delete-personalized-rail-heading">Delete rail</strong><p>Remove this rail and its configuration permanently.</p></div><TextButton variant="secondary" className="personalized-rail-details__delete-action" icon={<Trash2 size={15} />} onClick={() => setDeleteRailConfirmationOpen(true)}>Delete rail</TextButton></section>
  </div></div>;

  const markConfigurationDirty = <Value,>(setter: React.Dispatch<React.SetStateAction<Value>>) => (value: Value) => { setter(value); setConfigurationDirty(true); };
  const configurationPanel = editingConfigurationId ? <div className="personalized-rail-details__configuration-editor">
    <header className="personalized-rail-details__editor-heading"><IconButton variant="ghost" size="small" aria-label="Back to personalizer configurations" onClick={() => { setEditingConfigurationId(null); setConfigurationDirty(false); }}><ArrowLeft size={16} /></IconButton><div><strong>{configurationName || 'New configuration'}</strong><span>Edit configuration parameters</span></div></header>
    <div className="personalized-rail-details__form"><div className="personalized-rail-details__form-section">
      <TextInput label="Configuration name" value={configurationName} onChange={(event) => { setConfigurationName(event.target.value); setConfigurationDirty(true); }} required />
      <Select label="Recommendation strategy" value={strategy} onChange={markConfigurationDirty(setStrategy)} helperText="Defines the recommendation source used by this rail." options={Object.entries(strategyLabels).map(([value, label]) => ({ value, label }))} />
      <section className="personalized-rail-details__filter-heading" aria-labelledby="personalized-configuration-filtering-title"><div><span>Content filtering</span><p id="personalized-configuration-filtering-title">Filter recommendations on top of the selected strategy.</p></div></section>
      <TagFilter sections={[{ id: 'content-type', title: 'What type of content?', options: [{ id: 'movie', label: 'Movies' }, { id: 'series', label: 'Series' }] }]} selectedOptions={contentTypes} onSelectionChange={markConfigurationDirty(setContentTypes)} />
      <MultiSelect label="Genres to include" value={genres} onChange={markConfigurationDirty(setGenres)} placeholder="Add genres…" options={[{ value: 'action', label: 'Action' }, { value: 'drama', label: 'Drama' }, { value: 'comedy', label: 'Comedy' }, { value: 'documentary', label: 'Documentary' }, { value: 'thriller', label: 'Thriller' }, { value: 'sci-fi', label: 'Sci-Fi' }, { value: 'horror', label: 'Horror' }, { value: 'crime', label: 'Crime' }, { value: 'animation', label: 'Animation' }, { value: 'fantasy', label: 'Fantasy' }]} />
      <MultiSelect label="Featuring cast members" value={castMembers} onChange={markConfigurationDirty(setCastMembers)} placeholder="Add cast members…" options={[{ value: 'viola-davis', label: 'Viola Davis' }, { value: 'pedro-pascal', label: 'Pedro Pascal' }, { value: 'zendaya', label: 'Zendaya' }]} />
      <TagFilter sections={[{ id: 'audience-rating', title: 'Audience rating', options: [{ id: 'g', label: 'G' }, { id: 'pg', label: 'PG' }, { id: 'pg-13', label: 'PG-13' }, { id: 'r', label: 'R' }, { id: 'nc-17', label: 'NC-17' }] }]} selectedOptions={audienceRatings} onSelectionChange={markConfigurationDirty(setAudienceRatings)} />
      <MultiSelect label="Match keywords" value={keywords} onChange={markConfigurationDirty(setKeywords)} placeholder="Add keywords…" allowCreate options={[]} />
      <MultiSelect label="Available in languages" value={languages} onChange={markConfigurationDirty(setLanguages)} placeholder="Add languages…" options={[{ value: 'english', label: 'English' }, { value: 'spanish', label: 'Spanish' }, { value: 'french', label: 'French' }, { value: 'german', label: 'German' }]} />
      <div className="personalized-rail-details__runtime"><NumberInput label="Minimum runtime" value={minimumRuntime === '' ? '' : Number(minimumRuntime)} onValueChange={(value) => { setMinimumRuntime(String(value)); setConfigurationDirty(true); }} min={0} placeholder="Min (min)" /><span>to</span><NumberInput label="Maximum runtime" value={maximumRuntime === '' ? '' : Number(maximumRuntime)} onValueChange={(value) => { setMaximumRuntime(String(value)); setConfigurationDirty(true); }} min={0} placeholder="Max (min)" /></div>
      <p className="personalized-rail-details__runtime-help">Duration range in minutes. Leave blank for no limit.</p>
      {editingConfigurationId !== 'new' && <section className="personalized-rail-details__danger-zone" aria-labelledby="delete-personalizer-configuration-heading"><div><strong id="delete-personalizer-configuration-heading">Delete configuration</strong><p>Remove this personalizer configuration permanently.</p></div><TextButton variant="secondary" className="personalized-rail-details__delete-action" icon={<Trash2 size={15} />} onClick={() => setDeleteConfigurationConfirmationOpen(true)}>Delete configuration</TextButton></section>}
    </div></div>
    {configurationDirty && <UnsavedChangesFooter onSave={saveConfiguration} onCancel={() => { setEditingConfigurationId(null); setConfigurationDirty(false); }} saveDisabled={!configurationName.trim()} />}
  </div> : <div className="personalized-rail-details__configuration-list">
    <div className="personalized-rail-details__list-heading"><div><strong>Personalizer configurations</strong><p>Manage ML models and recommendation algorithms</p></div><PrimaryButton onClick={() => openConfiguration()}><Plus size={15} /> New configuration</PrimaryButton></div>
    <div className="personalized-rail-details__configuration-items">{personalizerConfigurations.map((item, index) => { const ConfigurationIcon = configurationIcons[index % configurationIcons.length]; return <button key={item.id} type="button" className="personalized-rail-details__configuration-item" onClick={() => openConfiguration(item)}><span className={`personalized-rail-details__configuration-icon personalized-rail-details__configuration-icon--${item.status.toLocaleLowerCase()}`}><ConfigurationIcon size={16} aria-hidden="true" /></span><span className="personalized-rail-details__configuration-copy"><span><strong>{item.name}</strong><Status tone={item.status === 'Active' ? 'success' : item.status === 'Training' ? 'warning' : 'neutral'}>{item.status}</Status></span><small>Strategy: {strategyLabels[item.strategy]}</small><small>Types: {formatValues(item.contentTypes)}</small>{item.genres.length > 0 && <small>Genres: {formatValues(item.genres)}</small>}</span><ChevronRight size={16} aria-hidden="true" /></button>; })}</div>
    <p className="personalized-rail-details__list-tip"><strong>Tip:</strong> Select a configuration to view details and edit parameters, or create a new one to set up custom recommendation logic.</p>
  </div>;

  return <WorkspaceLayout className="personalized-rail-details-page">
    <WorkspaceLayout.GlobalHeader><HeaderNavigation variant="static" brandName="Rail Manager" userName="Jane Doe" userEmail="jane@cvp.example" teams={[{ id: 'content-team', name: 'Content Team' }]} selectedTeamId="content-team" onThemeSwitch={toggleTheme} /></WorkspaceLayout.GlobalHeader>
    <WorkspaceLayout.Breadcrumb className="personalized-rail-details__crumbs"><Breadcrumb surface="canvas" items={[{ id: 'rails-list', label: 'Rails List' }, { id: 'current', label: name }]} /></WorkspaceLayout.Breadcrumb>
    <WorkspaceLayout.Body className={`personalized-rail-details__workspace ${sidebarOpen ? '' : 'personalized-rail-details__workspace--sidebar-collapsed'}`} sidePanelWidth="clamp(390px, 30vw, 500px)" maxSidePanelWidth={560}>
      {sidebarOpen && <><WorkspaceLayout.SidePanel className="personalized-rail-details__sidebar" aria-label="Personalized rail configuration"><div className="personalized-rail-details__mobile-panel-bar"><strong>Rail configuration</strong><IconButton aria-label="Close configuration" onClick={() => setSidebarOpen(false)}><PanelLeftClose size={16} /></IconButton></div><Tabs ariaLabel="Personalized rail settings" activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); if (tab === 'configuration') setEditingConfigurationId(null); }} tabs={[{ id: 'base', label: 'Base', content: basePanel }, { id: 'configuration', label: 'Personalizer configurations', content: configurationPanel }]} />{activeTab === 'base' && hasChanges && <UnsavedChangesFooter onSave={save} onCancel={reset} />}</WorkspaceLayout.SidePanel><WorkspaceLayout.ResizeHandle /></>}
      <WorkspaceLayout.Main className="personalized-rail-details__main">
        <div className="personalized-rail-details__preview-bar"><IconButton aria-label={sidebarOpen ? 'Collapse configuration' : 'Open configuration'} aria-expanded={sidebarOpen} onClick={() => setSidebarOpen((value) => !value)}>{sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}</IconButton><strong>Recommended</strong><span className="cvp-status-tag cvp-status-tag--recommended personalized-rail-details__preview-tag">Personalized</span></div>
        <div className="personalized-rail-details__content"><RailContentGallery title={name} items={recommendationItems.slice(0, Number(contentSlots) || 0)} variant="display" showItemCount itemCountPlacement="navigation" showSourceLabels={false} /></div>
      </WorkspaceLayout.Main>
    </WorkspaceLayout.Body>
    {hasChanges && !sidebarOpen && <WorkspaceLayout.Footer className="personalized-rail-details__footer"><OutlineButton onClick={reset}>Cancel</OutlineButton><PrimaryButton onClick={save}><Save size={15} /> Save changes</PrimaryButton></WorkspaceLayout.Footer>}
    <Modal isOpen={deleteRailConfirmationOpen} onClose={() => setDeleteRailConfirmationOpen(false)} title={`Delete ${name}?`} description="This permanently removes the rail and its personalizer configuration assignment. This action cannot be undone." tone="danger" footer={<><OutlineButton onClick={() => setDeleteRailConfirmationOpen(false)}>Cancel</OutlineButton><TextButton variant="secondary" className="personalized-rail-details__delete-action personalized-rail-details__delete-action--confirm" icon={<Trash2 size={15} />} onClick={deleteRail}>Delete rail</TextButton></>}><p className="personalized-rail-details__delete-confirmation">You are about to delete <strong>{name}</strong>.</p></Modal>
    <Modal isOpen={deleteConfigurationConfirmationOpen} onClose={() => setDeleteConfigurationConfirmationOpen(false)} title={`Delete ${configurationName}?`} description="This permanently removes the personalizer configuration. Rails using it will need another configuration assignment." tone="danger" footer={<><OutlineButton onClick={() => setDeleteConfigurationConfirmationOpen(false)}>Cancel</OutlineButton><TextButton variant="secondary" className="personalized-rail-details__delete-action personalized-rail-details__delete-action--confirm" icon={<Trash2 size={15} />} onClick={() => { setDeleteConfigurationConfirmationOpen(false); deleteConfiguration(); }}>Delete configuration</TextButton></>}><p className="personalized-rail-details__delete-confirmation">You are about to delete <strong>{configurationName}</strong>.</p></Modal>
  </WorkspaceLayout>;
}

export function PersonalizedRailDetails() {
  return <ToastProvider><PersonalizedRailDetailsWorkspace /></ToastProvider>;
}