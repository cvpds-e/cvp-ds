import { RailContentItem, TableColumn, TableRow } from './Table';
import { RailContentGallery } from './RailContentGallery';

// Sample content items for Rail Content Gallery
export const sampleContentItems: RailContentItem[] = [
  {
    id: 'item-1',
    title: 'Stranger Things',
    year: '2016',
    thumbnail: 'https://images.unsplash.com/photo-1489599767714-2706e9c68269?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'item-2', 
    title: 'The Crown',
    year: '2020',
    thumbnail: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'item-3',
    title: 'Ozark',
    year: '2017', 
    thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'item-4',
    title: 'Black Mirror',
    year: '2011',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'item-5',
    title: 'House of Cards',
    year: '2013',
    thumbnail: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=240&h=360&fit=crop&crop=center',
  }
];

export const trendingContentItems: RailContentItem[] = [
  {
    id: 'trending-1',
    title: 'Wednesday',
    year: '2022',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'trending-2',
    title: 'The Witcher',
    year: '2019',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'trending-3',
    title: 'Bridgerton',
    year: '2020',
    thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0401ba2f6ba?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'trending-4',
    title: 'Emily in Paris',
    year: '2020',
    thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=240&h=360&fit=crop&crop=center',
  }
];

export const personalizedContentItems: RailContentItem[] = [
  {
    id: 'personalized-1',
    title: 'Breaking Bad',
    year: '2008',
    thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'personalized-2',
    title: 'Better Call Saul',
    year: '2015',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'personalized-3',
    title: 'Narcos',
    year: '2015',
    thumbnail: 'https://images.unsplash.com/photo-1554213352-5ffe6534af08?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'personalized-4',
    title: 'Money Heist',
    year: '2017',
    thumbnail: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=240&h=360&fit=crop&crop=center',
  }
];

export const newReleasesContentItems: RailContentItem[] = [
  {
    id: 'new-1',
    title: 'The Queen\'s Gambit',
    year: '2020',
    thumbnail: 'https://images.unsplash.com/photo-1606096559724-b24aaf630a67?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'new-2',
    title: 'Squid Game',
    year: '2021',
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'new-3',
    title: 'Lupin',
    year: '2021',
    thumbnail: 'https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'new-4',
    title: 'The Umbrella Academy',
    year: '2019',
    thumbnail: 'https://images.unsplash.com/photo-1616777215777-676e2a81d88d?w=240&h=360&fit=crop&crop=center',
  }
];

export const continueWatchingContentItems: RailContentItem[] = [
  {
    id: 'continue-1',
    title: 'Dark',
    year: '2017',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'continue-2',
    title: 'Mindhunter',
    year: '2017',
    thumbnail: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=240&h=360&fit=crop&crop=center',
  },
  {
    id: 'continue-3',
    title: 'Orange Is the New Black',
    year: '2013',
    thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0401ba2f6ba?w=240&h=360&fit=crop&crop=center',
  }
];

export const emptyContentItems: RailContentItem[] = [];

// Sample columns configuration
export const sampleColumns: TableColumn[] = [
  { id: 'title', label: 'Title', width: '200px', sortable: true },
  { id: 'collection', label: 'Collection', width: '150px', sortable: true },
  { id: 'order', label: 'Order', width: '100px', sortable: true },
  { id: 'type', label: 'Type', width: '120px', sortable: true },
  { id: 'updated', label: 'Updated', width: '120px', sortable: true }
];

// Create sample data with Rail Content Gallery components
export const createSampleData = (): TableRow[] => [
  {
    id: '1',
    title: 'Spotlight',
    collection: 'HOME',
    order: '1',
    type: 'Recommended',
    updated: 'Aug 14',
    expandable: true,
    expandedContent: (
      <RailContentGallery
        title="Spotlight"
        items={sampleContentItems}
        variant="display"
        showItemCount={true}
        showNavigation={true}
        headerStatus="EDITORIAL"
        headerDate="Aug 14"
      />
    )
  },
  {
    id: '2',
    title: 'Trending',
    collection: 'HOME',
    order: '2',
    type: 'Editorial',
    updated: 'Aug 12',
    expandable: true,
    expandedContent: (
      <RailContentGallery
        title="Trending"
        items={trendingContentItems}
        variant="display"
        showItemCount={true}
        showNavigation={true}
        headerStatus="EDITORIAL"
        headerDate="Aug 12"
      />
    )
  },
  {
    id: '3',
    title: 'Because You Watched',
    collection: 'HOME',
    order: '3',
    type: 'Recommended',
    updated: 'Aug 14',
    expandable: true,
    expandedContent: (
      <RailContentGallery
        title="Because You Watched"
        items={personalizedContentItems}
        variant="display"
        showItemCount={true}
        showNavigation={true}
        headerStatus="RECOMMENDED"
        headerDate="Aug 14"
      />
    )
  },
  {
    id: '4',
    title: 'New Releases',
    collection: 'HOME',
    order: '4',
    type: 'Editorial',
    updated: 'Aug 10',
    expandable: true,
    expandedContent: (
      <RailContentGallery
        title="New Releases"
        items={newReleasesContentItems}
        variant="display"
        showItemCount={true}
        showNavigation={true}
        headerStatus="EDITORIAL"
        headerDate="Aug 10"
      />
    )
  },
  {
    id: '5',
    title: 'Continue Watching',
    collection: 'HOME',
    order: '5',
    type: 'Editorial',
    updated: 'Aug 16',
    expandable: true,
    expandedContent: (
      <RailContentGallery
        title="Continue Watching"
        items={continueWatchingContentItems}
        variant="display"
        showItemCount={true}
        showNavigation={true}
        headerStatus="EDITORIAL"
        headerDate="Aug 16"
      />
    )
  },
  {
    id: '6',
    title: 'Top Picks for You',
    collection: 'HOME',
    order: '6',
    type: 'Recommended',
    updated: 'Aug 18',
    expandable: true,
    expandedContent: (
      <RailContentGallery
        title="Top Picks for You"
        items={emptyContentItems}
        variant="display"
        showItemCount={true}
        showNavigation={true}
        headerStatus="RECOMMENDED"
        headerDate="Aug 18"
      />
    )
  }
];