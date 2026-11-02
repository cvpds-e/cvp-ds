import React, { useCallback, useState } from 'react';
import { ArrowDown, ArrowUp, Lock, PanelLeftClose, PanelLeftOpen, Pin, Plus, Trash2 } from 'lucide-react';
import { Banner } from './Banner';
import { Breadcrumb } from './Breadcrumb';
import { Checkbox } from './Checkbox';
import { HeaderNavigation } from './HeaderNavigation';
import { IconButton } from './IconButton';
import { Modal } from './Modal';
import { NumberInput } from './NumberInput';
import { OutlineButton } from './OutlineButton';
import { PrimaryButton } from './PrimaryButton';
import { RailContentGallery, RailContentItem } from './RailContentGallery';
import { SearchField } from './SearchField';
import { Select } from './Select';
import { SortControl } from './SortControl';
import { Tabs } from './Tabs';
import { TextButton } from './TextButton';
import { TextInput } from './TextInput';
import { ToastProvider, useToast } from './Toast';
import { Tooltip } from './Tooltip';
import { UnsavedChangesFooter } from './UnsavedChangesFooter';
import { WorkspaceLayout } from './WorkspaceLayout';
import { defaultStationRail, deleteStationRail, previewStationRail, readStationRails, saveStationRail, stationFixtures, stationLocationUri, StationPreview, StationRail, validateStationRail } from './stationRails';
import './RailDetails.css';
import './StationRailDetails.css';

const errorMessage = (error: unknown) => error instanceof Error ? error.message : 'Station rail operation failed.';
const managerUrl = () => `${window.location.pathname}?page=rails-list-full&theme=${document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'}`;
const readOnlyIndicator = <Tooltip content="Read only" side="right" align="center"><span className="rail-details__read-only-indicator" role="img" aria-label="Read only"><Lock size={14} aria-hidden="true" /></span></Tooltip>;

function StationLogo({ station }: { station: StationPreview }) {
  return <span className={`station-rail__logo station-rail__logo--${station.callSign.toLowerCase()}`}>
    <svg viewBox="0 0 200 200" role="img" aria-label={`${station.title} sample logo`}>
      {station.callSign === 'WNEWS' ? <g fill="none" stroke="currentColor" strokeWidth="3"><circle cx="100" cy="73" r="31" /><ellipse cx="100" cy="73" rx="14" ry="31" /><path d="M69 73h62M74 57h52M74 89h52" /></g>
        : station.callSign === 'SPORT' ? <g fill="currentColor"><path d="m67 47 30 26-30 26V80l10-7-10-7zM99 47l30 26-30 26V80l10-7-10-7z" /><path d="M137 58h4v28h-4zM125 70h28v4h-28z" /></g>
        : station.callSign === 'FAMILY' ? <g fill="currentColor"><circle cx="86" cy="61" r="15" /><circle cx="114" cy="61" r="15" /><circle cx="86" cy="89" r="15" /><circle cx="114" cy="89" r="15" /></g>
        : <g fill="none" stroke="currentColor" strokeWidth="4"><path d="m65 98 23-45 22 45M93 98l23-45 23 45M60 106h85" /></g>}
      <text x="100" y="139" textAnchor="middle" fill="currentColor" fontSize="21" fontWeight="800" letterSpacing="2">{station.callSign === 'WNEWS' ? 'WORLD' : station.callSign === 'SPORT' ? 'SPORT+' : station.callSign}</text>
      <text x="100" y="159" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="600" letterSpacing="4">{station.callSign === 'WNEWS' ? 'NEWS' : station.callSign === 'SPORT' ? 'NETWORK' : station.callSign === 'FAMILY' ? 'TOGETHER' : 'INDEPENDENT'}</text>
    </svg>
  </span>;
}

function StationRailWorkspace() {
  const { addToast } = useToast();
  const [initial] = useState(() => {
    try {
      const id = new URLSearchParams(window.location.search).get('id') || defaultStationRail.id;
      const rail = readStationRails().find((item) => item.id === id);
      if (!rail) throw new Error('Station rail not found. Return to the rail manager.');
      return { rail, error: '' };
    } catch (error) { return { rail: null, error: errorMessage(error) }; }
  });
  const [saved, setSaved] = useState(initial.rail);
  const [draft, setDraft] = useState(initial.rail);
  const [error, setError] = useState(initial.error);
  const [tab, setTab] = useState('base');
  const [sidebar, setSidebar] = useState(true);
  const [browser, setBrowser] = useState(false);
  const [search, setSearch] = useState('');
  const [guid, setGuid] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [stations] = useState(() => stationFixtures());
  const [previewMode, setPreviewMode] = useState('editorial');
  const [locationOverride, setLocationOverride] = useState('');
  const [selectedStation, setSelectedStation] = useState<StationPreview | null>(null);
  const closeBrowser = useCallback(() => setBrowser(false), []);
  const closeDelete = useCallback(() => setConfirmDelete(false), []);
  const closeStation = useCallback(() => setSelectedStation(null), []);
  if (!draft || !saved) return <main className="station-rail__error"><Banner title="Unable to load station rail" message={error} variant="error" /><a href={managerUrl()}>Return to rail manager</a></main>;
  const update = (patch: Partial<StationRail>) => setDraft({ ...draft, ...patch });
  const query = (patch: Partial<StationRail['contentQuery']>) => update({ contentQuery: { ...draft.contentQuery, ...patch } });
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const hasActiveQuery = Object.values(draft.contentQuery).some((value) => value !== '') || draft.sortKey !== defaultStationRail.sortKey || draft.sortDirection !== defaultStationRail.sortDirection;
  const validation = validateStationRail(draft);
  const overrideError = locationOverride && !stationLocationUri.safeParse(locationOverride).success ? 'Enter an absolute Location URI.' : '';
  const preview = validation || (previewMode === 'end-user' && overrideError) ? [] : previewStationRail(draft, stations, Date.now(), previewMode === 'end-user' ? locationOverride : '');
  const previewItems: RailContentItem[] = preview.map((station, index) => ({
    id: `slot-${index + 1}`, position: index + 1,
    title: station?.title ?? (draft.slots[index]?.pinned ? 'Station unavailable' : 'Empty slot'),
    year: station ? `${station.callSign} · ${station.channelNumber ? `Ch ${station.channelNumber}` : 'No channel'}` : `Slot ${index + 1}`,
    thumbnail: '',
    metadata: { category: station ? `${station.isHD ? 'HD' : 'SD'}${station.isPayPerView ? ' · PPV' : ''}` : 'Adjust filters or add a station' },
  }));
  const save = () => {
    try {
      saveStationRail(draft);
      setSaved(structuredClone(draft));
      setError('');
      addToast({ variant: 'success', title: 'Station rail saved', description: 'Saved in this browser demo. No API request was sent.' });
    } catch (failure) { setError(errorMessage(failure)); }
  };
  const addStation = (contentGuid: string) => {
    const next = { ...draft, slots: [...draft.slots, { contentGuid, pinned: true }] };
    const issue = validateStationRail(next);
    if (issue) { setError(issue); return; }
    update({ slots: next.slots });
    setGuid('');
    setError('');
    setBrowser(false);
  };
  const move = (index: number, direction: number) => {
    const slots = [...draft.slots];
    [slots[index], slots[index + direction]] = [slots[index + direction], slots[index]];
    update({ slots });
  };
  const base = <div className="rail-details__form"><div className="rail-details__form-section">
    <TextInput label="Rail name" value={draft.name} required onChange={(event) => update({ name: event.target.value })} />
    <Select label="Rail collection" labelTooltip={readOnlyIndicator} value={draft.collection} disabled options={[...new Set(['Home', 'Drama', 'Kids', saved.collection])].map((value) => ({ value, label: value }))} />
    <TextInput label="Rail entity type" labelTooltip={readOnlyIndicator} value="Station" readOnly disabled helperText="Immutable after creation." />
    <TextInput label="Rail behavior" labelTooltip={readOnlyIndicator} value="generic" readOnly disabled helperText="Immutable after creation. Station rails do not support personalization." />
    <NumberInput label="Number of content slots" labelTooltip={readOnlyIndicator} value={draft.contentSlots} min={1} readOnly disabled />
    <TextInput label="Rail ID" value={draft.id} readOnly />
    <Checkbox label="Disable rail" checked={draft.disabled} onChange={(value) => update({ disabled: value === true })} />
    <section className="rail-details__danger-zone" aria-labelledby="delete-station-rail-heading"><div><strong id="delete-station-rail-heading">Delete rail</strong><p>Remove the station rail and its saved configuration.</p></div><TextButton variant="secondary" className="rail-details__delete-action" icon={<Trash2 size={15} />} onClick={() => setConfirmDelete(true)}>Delete rail</TextButton></section>
  </div></div>;
  const queryPanel = <div className="rail-details__form"><div className="rail-details__form-section">
    <SortControl value={draft.sortKey} direction={draft.sortDirection} onChange={(value) => { if (value === 'title' || value === 'channelNumber' || value === 'callSign') update({ sortKey: value }); }} onDirectionChange={(sortDirection) => update({ sortDirection })} options={[{ value: 'channelNumber', label: 'Channel number' }, { value: 'title', label: 'Title' }, { value: 'callSign', label: 'Call sign' }]} />
    <TextInput label="Location URI" value={draft.contentQuery.byLocationId} onChange={(event) => query({ byLocationId: event.target.value })} helperText="byLocationId · Leave blank for all stations, including stations without channels. location:any matches only that exact location." placeholder="urn:theplatform:tv:location:any" />
    <Select label="Language" value={draft.contentQuery.byLanguage} onChange={(value) => { if (value === '' || value === 'en' || value === 'us') query({ byLanguage: value }); }} helperText="byLanguage · API values: en or us." options={[{ value: '', label: 'Any language' }, { value: 'en', label: 'en' }, { value: 'us', label: 'us' }]} />
    <Select label="HD" value={draft.contentQuery.byIsHD} onChange={(value) => { if (value === '' || value === 'true' || value === 'false') query({ byIsHD: value }); }} helperText="byIsHD" options={[{ value: '', label: 'Any definition' }, { value: 'true', label: 'HD only' }, { value: 'false', label: 'SD only' }]} />
    <Select label="Pay per view" value={draft.contentQuery.byIsPayPerView} onChange={(value) => { if (value === '' || value === 'true' || value === 'false') query({ byIsPayPerView: value }); }} helperText="byIsPayPerView" options={[{ value: '', label: 'Any' }, { value: 'true', label: 'Pay per view only' }, { value: 'false', label: 'Exclude pay per view' }]} />
    <TextInput label="Listing time range" value={draft.contentQuery.byListingTime} onChange={(event) => query({ byListingTime: event.target.value })} helperText="byListingTime · start~end, ISO-8601 with time zones or epoch seconds." placeholder="2026-11-02T18:00:00Z~2026-11-02T22:00:00Z" />
    <p className="station-rail__muted">Filters populate unfilled slots. Pinned manual selections keep their positions. Expired, not-yet-available stations and stations with no current or future listings are excluded.</p>
  </div></div>;
  const clearQueryAction = tab === 'query' && hasActiveQuery ? <TextButton onClick={() => update({ contentQuery: { ...defaultStationRail.contentQuery }, sortKey: 'channelNumber', sortDirection: 'asc' })}>Clear Query</TextButton> : null;
  return <WorkspaceLayout className="rail-details-page station-rail">
    <WorkspaceLayout.GlobalHeader><HeaderNavigation variant="static" brandName="Rail Manager" userName="Jane Doe" teams={[{ id: 'editorial', name: 'Editorial Team' }]} selectedTeamId="editorial" onThemeSwitch={() => document.documentElement.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light')} /></WorkspaceLayout.GlobalHeader>
    <WorkspaceLayout.Breadcrumb className="rail-details__crumbs"><Breadcrumb surface="canvas" items={[{ id: 'manager', label: 'Rails List', href: managerUrl() }, { id: 'station', label: draft.name }]} /></WorkspaceLayout.Breadcrumb>
    <WorkspaceLayout.Body className={`rail-details__workspace ${sidebar ? '' : 'rail-details__workspace--sidebar-collapsed'}`} sidePanelWidth="344px">
      {sidebar && <><WorkspaceLayout.SidePanel className="rail-details__sidebar" aria-label="Station rail configuration"><div className="rail-details__panel-title"><h2>Settings</h2></div><Tabs ariaLabel="Station rail settings" activeTab={tab} onTabChange={setTab} tabs={[{ id: 'base', label: 'Base', content: base }, { id: 'query', label: 'Content Query', content: queryPanel }]} />{dirty ? <UnsavedChangesFooter onSave={save} saveDisabled={Boolean(validation)} onCancel={() => { setDraft(structuredClone(saved)); setError(''); }} additionalActions={clearQueryAction} /> : clearQueryAction && <footer className="station-rail__query-footer" aria-label="Query actions">{clearQueryAction}</footer>}</WorkspaceLayout.SidePanel><WorkspaceLayout.ResizeHandle /></>}
      <WorkspaceLayout.Main className="rail-details__main">
        <div className="rail-details__preview-bar"><IconButton aria-label={sidebar ? 'Collapse configuration' : 'Open configuration'} onClick={() => setSidebar(!sidebar)}>{sidebar ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}</IconButton><strong>Content preview</strong><span className="cvp-status-tag cvp-status-tag--neutral rail-details__preview-tag">Station</span></div>
        <div className="rail-details__content">
          <div className="station-rail__heading"><div><h1>{draft.name}</h1><p className="station-rail__muted">Station rail · {preview.filter(Boolean).length} of {draft.contentSlots} slots populated</p></div><PrimaryButton onClick={() => { setError(''); setBrowser(true); }} disabled={draft.slots.length >= draft.contentSlots}><Plus size={16} /> Add station</PrimaryButton></div>
          {(error || validation) && <Banner title="Unable to save station rail" message={error || validation || ''} variant="error" />}
          {draft.disabled && <Banner title="Rail disabled" message="The configuration is retained. This rail is hidden from the end-user preview." variant="warning" />}
          <div className="station-rail__preview-controls"><Select label="Preview audience" value={previewMode} onChange={setPreviewMode} options={[{ value: 'editorial', label: 'Editorial · RMS concept' }, { value: 'end-user', label: 'End user · RAS concept' }]} />{previewMode === 'end-user' && <TextInput label="Location override" value={locationOverride} onChange={(event) => setLocationOverride(event.target.value)} error={overrideError || undefined} helperText="RAS byLocationId overrides the configured location. This does not change the rail." />}</div>
          {!(draft.disabled && previewMode === 'end-user') && <section className="station-rail__screen" aria-label="Station rail preview">
            <p className="station-rail__screen-label">Consumer screen preview</p>
            <RailContentGallery title={draft.name} items={previewItems} mediaVariant="station" showSourceLabels={false} showItemCount={false} onItemClick={(item) => { const station = preview[(item.position ?? 1) - 1]; if (station) setSelectedStation(station); else setBrowser(true); }} renderMedia={(item) => {
              const station = preview[(item.position ?? 1) - 1];
              return station ? <><StationLogo station={station} /><span className="station-rail__channel">{station.channelNumber ? `Ch ${station.channelNumber}` : station.callSign}</span>{draft.slots[(item.position ?? 1) - 1]?.pinned && <span className="station-rail__pinned"><Pin size={14} aria-label="Pinned selection" /></span>}</> : <span className="station-rail__empty-logo"><Plus size={24} aria-hidden="true" /><span>{item.title === 'Station unavailable' ? 'Unavailable' : 'Add station'}</span></span>;
            }} />
            <p className="station-rail__muted">Sample station identities · Scroll to explore the rail. Select a logo to view station details.</p>
          </section>}
          {draft.slots.length > 0 && <section className="station-rail__browser" aria-label="Manual station selections"><h2>Manual station selections</h2>{draft.slots.map((slot, index) => <div className="station-rail__browser-row" key={slot.contentGuid}><div><strong>Selection {index + 1} · {stations.find((station) => station.contentGuid === slot.contentGuid)?.title || 'Custom station'}</strong><p className="station-rail__guid">{slot.contentGuid}</p></div><div className="station-rail__actions"><IconButton aria-label={`Move slot ${index + 1} up`} disabled={index === 0} onClick={() => move(index, -1)}><ArrowUp size={16} /></IconButton><IconButton aria-label={`Move slot ${index + 1} down`} disabled={index === draft.slots.length - 1} onClick={() => move(index, 1)}><ArrowDown size={16} /></IconButton><IconButton aria-label={`${slot.pinned ? 'Unpin' : 'Pin'} slot ${index + 1}`} aria-pressed={slot.pinned} onClick={() => update({ slots: draft.slots.map((item, slotIndex) => slotIndex === index ? { ...item, pinned: !item.pinned } : item) })}><Pin size={16} /></IconButton><IconButton aria-label={`Remove slot ${index + 1}`} onClick={() => update({ slots: draft.slots.filter((_, slotIndex) => slotIndex !== index) })}><Trash2 size={16} /></IconButton></div></div>)}</section>}
          <p className="station-rail__muted">Sample data and browser-local saves. RMS/RAS and live-listing layouts are not connected.</p>
          {dirty && !sidebar && <UnsavedChangesFooter onSave={save} saveDisabled={Boolean(validation)} onCancel={() => { setDraft(structuredClone(saved)); setError(''); }} />}
        </div>
      </WorkspaceLayout.Main>
    </WorkspaceLayout.Body>
    <Modal isOpen={browser} onClose={closeBrowser} title="Add station" description="Choose a sample station or enter a ChannelSchedule URI. Manual selections are pinned by default." footer={<OutlineButton onClick={closeBrowser}>Close</OutlineButton>}>
      <div className="station-rail__browser">{error && <Banner title="Cannot add station" message={error} variant="error" />}<SearchField label="Search stations" value={search} onChange={(event) => setSearch(event.target.value)} onClear={() => setSearch('')} />
        {stations.filter((station) => `${station.title} ${station.callSign} ${station.channelNumber}`.toLowerCase().includes(search.toLowerCase())).map((station) => <div className="station-rail__browser-row" key={station.contentGuid}><div className="station-rail__browser-identity"><StationLogo station={station} /><div><strong>{station.title}</strong><p className="station-rail__muted">{station.callSign} · {station.channelNumber || 'No channel'}</p></div></div><OutlineButton disabled={draft.slots.some((slot) => slot.contentGuid === station.contentGuid)} onClick={() => addStation(station.contentGuid)}>Add {station.callSign} {station.channelNumber}</OutlineButton></div>)}
        <TextInput label="Station content GUID" value={guid} onChange={(event) => setGuid(event.target.value)} helperText="Current RailConfig CRUD requires a ChannelSchedule URI. LiveStation/Station GUID migration is pending API alignment." placeholder="urn:theplatform:tv:ChannelSchedule/123" /><PrimaryButton onClick={() => addStation(guid.trim())}>Add by GUID</PrimaryButton>
      </div>
    </Modal>
    <Modal isOpen={selectedStation !== null} onClose={closeStation} title={selectedStation?.title} description="Sample station details" footer={<OutlineButton onClick={closeStation}>Close</OutlineButton>}>
      {selectedStation && <div className="station-rail__station-details"><StationLogo station={selectedStation} /><dl><dt>Call sign</dt><dd>{selectedStation.callSign}</dd><dt>Channel</dt><dd>{selectedStation.channelNumber || 'No channel'}</dd><dt>Definition</dt><dd>{selectedStation.isHD ? 'HD' : 'SD'}</dd><dt>Language</dt><dd>{selectedStation.language}</dd><dt>Location</dt><dd>{selectedStation.locationId || 'No channel location'}</dd><dt>Sample listing</dt><dd>{selectedStation.listings[0].title}</dd></dl></div>}
    </Modal>
    <Modal isOpen={confirmDelete} onClose={closeDelete} title="Delete station rail?" description="This removes the browser-local station rail and cannot be undone." tone="danger" footer={<><OutlineButton onClick={closeDelete}>Cancel</OutlineButton><TextButton variant="secondary" className="rail-details__delete-action rail-details__delete-action--confirm" icon={<Trash2 size={15} />} onClick={() => { try { deleteStationRail(draft.id); window.location.assign(managerUrl()); } catch (failure) { setConfirmDelete(false); setError(errorMessage(failure)); } }}>Delete rail</TextButton></>}><p className="rail-details__delete-confirmation">You are about to delete <strong>{draft.name}</strong>.</p></Modal>
  </WorkspaceLayout>;
}

export function StationRailDetails() {
  return <ToastProvider><StationRailWorkspace /></ToastProvider>;
}
