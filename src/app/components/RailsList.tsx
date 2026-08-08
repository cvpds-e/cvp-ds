import React, { useState } from 'react';
import { ListFilter, Plus, Search } from 'lucide-react';
import { Filter, ActiveFilter } from './Filter';
import { HeaderNavigation } from './HeaderNavigation';
import { IconButton } from './IconButton';
import { PrimaryButton } from './PrimaryButton';
import { Table, TableColumn, TableRow } from './Table';
import { Tabs } from './Tabs';
import { TextButton } from './TextButton';
import { Tree, TreeItem } from './Tree';
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
  const [matchAllFilters, setMatchAllFilters] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState('home');
  const toggleTheme = () => {
    const root = document.documentElement;
    root.setAttribute('data-theme', root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  };
  const tree = <Tree data={collections} selectedId={selectedCollection} initialExpanded={['home', 'drama', 'kids']} ariaLabel="Rail collections" onSelect={(item) => setSelectedCollection(item.id)} />;

  return <div className="rails-list-page">
    <HeaderNavigation variant="static" brandName="Rail Manager" userName="Jane Doe" userEmail="jane@cvp.example" teams={[{ id: 'content-team', name: 'Content Team' }]} selectedTeamId="content-team" onThemeSwitch={toggleTheme} />
    <div className="rails-list-page__workspace">
      <aside className="rails-list-page__sidebar" aria-label="Rail collections navigation">
        <div className="rails-list-page__sidebar-label">Overview</div>
        <Tabs className="rails-list-page__tabs" ariaLabel="Rail manager navigation" defaultTab="collections" tabs={[
          { id: 'collections', label: 'Rail Collections', content: <div className="rails-list-page__tree-panel"><div className="rails-list-page__tree-actions"><button type="button" className="rails-list-page__add-collection"><Plus size={18} aria-hidden="true" /> Add new rail collection</button><IconButton variant="ghost" size="small" aria-label="Search rail collections"><Search size={16} /></IconButton></div>{tree}</div> },
          { id: 'pages', label: 'Pages', content: <div className="rails-list-page__empty-panel">No pages configured.</div> },
        ]} />
      </aside>
      <main className="rails-list-page__main">
        <header className="rails-list-page__titlebar"><div><ListFilter size={20} aria-hidden="true" /><h1>Rails List</h1></div><PrimaryButton><Plus size={16} /> Create rail</PrimaryButton></header>
        <div className="rails-list-page__filters"><Filter triggerVariant="icon-seamless" options={[{ id: 'title', label: 'Title', type: 'text' }, { id: 'rail-type', label: 'Rail type', type: 'multiselect', options: [{ value: 'editorial', label: 'Editorial' }, { value: 'recommended', label: 'Recommended' }] }, { id: 'collection', label: 'Collection', type: 'select', options: [{ value: 'home', label: 'Home' }, { value: 'drama', label: 'Drama' }, { value: 'kids', label: 'Kids' }] }]} activeFilters={filters} onChange={(nextFilters) => { setFilters(nextFilters); if (nextFilters.length <= 2) setMatchAllFilters(true); }} placeholder="Add filter" />{filters.length > 2 && <TextButton className="rails-list-page__match" variant="minimal" aria-label={`Switch to match ${matchAllFilters ? 'any' : 'all'} filters`} onClick={() => setMatchAllFilters((value) => !value)}>{matchAllFilters ? 'Match all filters' : 'Match any filter'}</TextButton>}</div>
        <Table className="rails-list-page__table" ariaLabel="Rails list" columns={columns} data={rows} selectable expandable sortable showActions={false} totalItems={38} pageSize={38} height="calc(100dvh - 246px)" renderCell={(column, value) => column === 'collection' ? <span className="rails-list-page__collection-tag">{value}</span> : value} />
      </main>
    </div>
  </div>;
}
