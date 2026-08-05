import React, { useState } from 'react';
import { RailContentGallery, RailContentItem } from './RailContentGallery';
import exampleImage from 'figma:asset/a3beffd7687d7ad29a51386a49f0217218583f7e.png';

// Sample content data - Expanded for proper horizontal scrolling
const trendingMovies: RailContentItem[] = [
  {
    id: '1',
    title: 'The Last Voyage',
    year: '2023',
    thumbnail: '', // Empty thumbnail to test fallback
    position: 1,
    metadata: {
      category: 'Drama',
      duration: '152 min',
      status: 'active'
    }
  },
  {
    id: '2',
    title: 'Inception',
    year: '2021',
    thumbnail: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop&crop=face',
    position: 2,
    metadata: {
      category: 'Sci-Fi',
      duration: '148 min',
      status: 'pinned'
    }
  },
  {
    id: '3',
    title: 'Interstellar',
    year: '2022',
    thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop&crop=center',
    position: 3,
    metadata: {
      category: 'Sci-Fi',
      duration: '169 min',
      status: 'active'
    }
  },
  {
    id: '4',
    title: 'Dunkirk',
    year: '2023',
    thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=600&fit=crop&crop=face',
    position: 4,
    metadata: {
      category: 'War',
      duration: '106 min',
      status: 'active'
    }
  },
  {
    id: '5',
    title: 'Tenet',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop&crop=face',
    position: 5,
    metadata: {
      category: 'Action',
      duration: '150 min',
      status: 'active'
    }
  },
  {
    id: '6',
    title: 'Batman Begins',
    year: '2020',
    thumbnail: '', // Empty thumbnail to test fallback
    position: 6,
    metadata: {
      category: 'Action',
      duration: '140 min',
      status: 'active'
    }
  },
  {
    id: '7',
    title: 'Oppenheimer',
    year: '2023',
    thumbnail: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=center',
    position: 7,
    metadata: {
      category: 'Biography',
      duration: '180 min',
      status: 'active'
    }
  },
  {
    id: '8',
    title: 'The Dark Knight',
    year: '2008',
    thumbnail: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop&crop=center',
    position: 8,
    metadata: {
      category: 'Action',
      duration: '152 min',
      status: 'pinned'
    }
  },
  {
    id: '9',
    title: 'Blade Runner 2049',
    year: '2017',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop&crop=center',
    position: 9,
    metadata: {
      category: 'Sci-Fi',
      duration: '164 min',
      status: 'active'
    }
  },
  {
    id: '10',
    title: 'Mad Max: Fury Road',
    year: '2015',
    thumbnail: 'https://images.unsplash.com/photo-1520637836862-4d197d17c13a?w=400&h=600&fit=crop&crop=center',
    position: 10,
    metadata: {
      category: 'Action',
      duration: '120 min',
      status: 'active'
    }
  },
  {
    id: '11',
    title: 'Dune',
    year: '2021',
    thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop&crop=center',
    position: 11,
    metadata: {
      category: 'Sci-Fi',
      duration: '155 min',
      status: 'active'
    }
  },
  {
    id: '12',
    title: 'The Matrix',
    year: '1999',
    thumbnail: '', // Empty thumbnail to test fallback
    position: 12,
    metadata: {
      category: 'Sci-Fi',
      duration: '136 min',
      status: 'active'
    }
  },
  {
    id: '13',
    title: 'Arrival',
    year: '2016',
    thumbnail: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=center',
    position: 13,
    metadata: {
      category: 'Sci-Fi',
      duration: '116 min',
      status: 'active'
    }
  },
  {
    id: '14',
    title: 'Ex Machina',
    year: '2014',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&crop=center',
    position: 14,
    metadata: {
      category: 'Sci-Fi',
      duration: '108 min',
      status: 'pinned'
    }
  }
];

const newReleases: RailContentItem[] = [
  {
    id: '15',
    title: 'Echoes of Tomorrow',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop&crop=face',
    metadata: {
      category: 'Sci-Fi',
      duration: '135 min',
      status: 'active'
    }
  },
  {
    id: '16',
    title: 'Silent Shadows',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&crop=face',
    metadata: {
      category: 'Horror',
      duration: '142 min',
      status: 'active'
    }
  },
  {
    id: '17',
    title: 'Midnight Chronicles',
    year: '2023',
    thumbnail: '', // Empty thumbnail to test fallback
    metadata: {
      category: 'Mystery',
      duration: '98 min',
      status: 'active'
    }
  },
  {
    id: '18',
    title: 'Beyond the Horizon',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop&crop=face',
    metadata: {
      category: 'Adventure',
      duration: '128 min',
      status: 'active'
    }
  },
  {
    id: '19',
    title: 'Whispering Winds',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=face',
    metadata: {
      category: 'Drama',
      duration: '155 min',
      status: 'active'
    }
  },
  {
    id: '20',
    title: 'Ocean\'s Edge',
    year: '2024',
    thumbnail: '', // Empty thumbnail to test fallback
    metadata: {
      category: 'Drama',
      duration: '118 min',
      status: 'active'
    }
  },
  {
    id: '21',
    title: 'Quantum Paradox',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop&crop=center',
    metadata: {
      category: 'Sci-Fi',
      duration: '143 min',
      status: 'active'
    }
  },
  {
    id: '22',
    title: 'Neon Nights',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&crop=center',
    metadata: {
      category: 'Thriller',
      duration: '127 min',
      status: 'active'
    }
  },
  {
    id: '23',
    title: 'Aurora\'s Call',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1520637736862-4d197d17c13a?w=400&h=600&fit=crop&crop=center',
    metadata: {
      category: 'Fantasy',
      duration: '158 min',
      status: 'active'
    }
  },
  {
    id: '24',
    title: 'Digital Dreams',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop&crop=center',
    metadata: {
      category: 'Sci-Fi',
      duration: '122 min',
      status: 'active'
    }
  },
  {
    id: '25',
    title: 'The Void Walker',
    year: '2025',
    thumbnail: '', // Empty thumbnail to test fallback
    metadata: {
      category: 'Horror',
      duration: '134 min',
      status: 'active'
    }
  },
  {
    id: '26',
    title: 'Starlight Serenade',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop&crop=center',
    metadata: {
      category: 'Romance',
      duration: '115 min',
      status: 'active'
    }
  },
  {
    id: '27',
    title: 'Crimson Moon',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=center',
    metadata: {
      category: 'Action',
      duration: '141 min',
      status: 'active'
    }
  },
  {
    id: '28',
    title: 'Electric Storm',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop&crop=center',
    metadata: {
      category: 'Sci-Fi',
      duration: '129 min',
      status: 'active'
    }
  }
];

export function RailContentGalleryDocumentation() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemClick = (item: RailContentItem) => {
    setSelectedAction(`Clicked: ${item.title}`);
    console.log('Clicked item:', item);
  };

  const handleEdit = (item: RailContentItem) => {
    setSelectedAction(`Edit: ${item.title}`);
    console.log('Edit item:', item);
  };

  const handlePin = (item: RailContentItem) => {
    setSelectedAction(`Pin: ${item.title}`);
    console.log('Pin item:', item);
  };

  const handleDrag = (itemId: string, newPosition: number) => {
    setSelectedAction(`Drag: ${itemId} to position ${newPosition}`);
    console.log('Drag item:', itemId, 'to position:', newPosition);
  };

  const handleSelectionChange = (items: string[]) => {
    setSelectedItems(items);
    setSelectedAction(`Selection changed: ${items.length} items selected`);
    console.log('Selected items:', items);
  };

  return (
    <>
      <style>{`


        .rail-content-gallery-docs__section {
          margin-bottom: 48px;
        }

        @media (max-width: 768px) {
          .rail-content-gallery-docs__section {
            margin-bottom: 32px;
          }
        }

        .rail-content-gallery-docs__example {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 16px;
          overflow-x: auto;
        }

        @media (max-width: 768px) {
          .rail-content-gallery-docs__example {
            padding: 16px;
            margin-bottom: 12px;
          }
        }

        @media (max-width: 480px) {
          .rail-content-gallery-docs__example {
            padding: 12px;
          }
        }

        .rail-content-gallery-docs__example-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .rail-content-gallery-docs__example-grid {
            gap: 16px;
            margin-bottom: 16px;
          }
        }

        .rail-content-gallery-docs__example-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rail-content-gallery-docs__table {
          width: 100%;
          border-collapse: collapse;
          background-color: var(--card);
          border: var(--table-border);
          border-radius: 8px;
          overflow: hidden;
        }

        .rail-content-gallery-docs__table th {
          background-color: var(--table-header-bg);
          padding: var(--table-header-padding);
          text-align: left;
          font-weight: var(--table-header-font-weight);
          font-size: var(--table-font-size);
          border-bottom: var(--table-border);
        }

        .rail-content-gallery-docs__table td {
          padding: var(--table-cell-padding);
          font-size: var(--table-font-size);
          border-bottom: var(--table-border);
          vertical-align: top;
        }

        .rail-content-gallery-docs__table tr:last-child td {
          border-bottom: none;
        }

        .rail-content-gallery-docs__table code {
          background-color: var(--muted);
          padding: 2px 4px;
          border-radius: 2px;
          font-family: var(--font-family-mono);
          font-size: 12px;
        }

        .rail-content-gallery-docs__status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--status-badge-gap);
          padding: var(--status-badge-padding);
          border-radius: var(--status-badge-border-radius);
          font-size: var(--status-badge-font-size);
          font-weight: var(--status-badge-font-weight);
        }

        .rail-content-gallery-docs__status-badge--stable {
          background-color: var(--color-green-800);
          color: var(--color-green-200);
        }

        .rail-content-gallery-docs__status-dot {
          width: var(--status-badge-dot-size);
          height: var(--status-badge-dot-size);
          border-radius: 50%;
          background-color: var(--color-green-400);
        }

        .rail-content-gallery-docs__guidelines {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 48px;
        }

        @media (max-width: 768px) {
          .rail-content-gallery-docs__guidelines {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 32px;
          }
        }

        .rail-content-gallery-docs__guideline {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 24px;
        }

        @media (max-width: 768px) {
          .rail-content-gallery-docs__guideline {
            padding: 16px;
          }
        }

        .rail-content-gallery-docs__guideline--do {
          border-color: var(--color-green-800);
        }

        .rail-content-gallery-docs__guideline--dont {
          border-color: var(--color-red-700);
        }

        .rail-content-gallery-docs__guideline-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .rail-content-gallery-docs__guideline-icon {
          width: var(--guidelines-icon-size);
          height: var(--guidelines-icon-size);
        }

        .rail-content-gallery-docs__guideline-icon--success {
          color: var(--color-green-400);
        }

        .rail-content-gallery-docs__guideline-icon--error {
          color: var(--color-red-400);
        }

        .rail-content-gallery-docs__guideline h4 {
          margin: 0;
          color: var(--foreground);
        }

        .rail-content-gallery-docs__guideline ul {
          margin: 0;
          padding-left: 16px;
          list-style: none;
        }

        .rail-content-gallery-docs__guideline li {
          margin-bottom: 6px;
          color: var(--muted-foreground);
          position: relative;
          padding-left: 12px;
        }

        .rail-content-gallery-docs__guideline li::before {
          content: '•';
          position: absolute;
          left: 0;
        }

        .rail-content-gallery-docs__action-feedback {
          background: var(--muted);
          border-radius: 4px;
          padding: 12px;
          font-family: var(--font-family-mono);
          font-size: var(--type-scale-xs-size);
          color: var(--muted-foreground);
          margin-top: 16px;
          word-break: break-word;
        }

        /* Responsive typography adjustments */
        @media (max-width: 480px) {
          h1 {
            font-size: var(--text-2xl) !important;
          }
          
          h2 {
            font-size: var(--text-xl) !important;
          }
          
          h3 {
            font-size: var(--text-lg) !important;
          }
        }
      `}</style>

      <div className="documentation-container">
        {/* Header */}
        <div className="rail-content-gallery-docs__section">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <h1 style={{ margin: 0 }}>Rail Content Gallery</h1>
            <div className="rail-content-gallery-docs__status-badge rail-content-gallery-docs__status-badge--stable">
              <div className="rail-content-gallery-docs__status-dot" />
              Stable
            </div>
          </div>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '24px' }}>
            A flexible content gallery component for showcasing content collections with 2:3 aspect ratio poster tiles. Supports horizontal scrolling rails and vertical scrolling grids. Includes management mode with full editorial controls, display mode for simplified browsing, and grid variants for compact vertical layouts with optional selection capabilities.
          </p>
        </div>

        {/* Variants */}
        <div className="rail-content-gallery-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Variants</h2>
          
          <div className="rail-content-gallery-docs__example-grid">
            <div className="rail-content-gallery-docs__example-item">
              <h3>Management Variant</h3>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '16px' }}>
                Full editorial interface with 2:3 aspect ratio poster tiles, position numbers, edit controls, pin functionality, and drag-and-drop reordering. Perfect for content management dashboards.
              </p>
              <div className="rail-content-gallery-docs__example">
                <RailContentGallery
                  title="Trending"
                  items={trendingMovies}
                  variant="management"
                  showItemCount={true}
                  showNavigation={true}
                  onItemClick={handleItemClick}
                  onEdit={handleEdit}
                  onPin={handlePin}
                  onDrag={handleDrag}
                />
              </div>
            </div>

            <div className="rail-content-gallery-docs__example-item">
              <h3>Display Variant</h3>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '16px' }}>
                Clean, simplified interface with 2:3 aspect ratio poster tiles for content consumption. Streamlined hover behavior without overlays for better visual clarity.
              </p>
              <div className="rail-content-gallery-docs__example">
                <RailContentGallery
                  title="New Releases"
                  items={newReleases}
                  variant="display"
                  showItemCount={true}
                  showNavigation={true}
                  onItemClick={handleItemClick}
                />
              </div>
            </div>

            <div className="rail-content-gallery-docs__example-item">
              <h3>Display Grid Variant</h3>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '16px' }}>
                Vertical scrolling grid layout for compact content display. Perfect for content browsing in constrained spaces with responsive grid columns (120px minimum width) and 400px max height.
              </p>
              <div className="rail-content-gallery-docs__example">
                <RailContentGallery
                  title="Popular Movies"
                  items={trendingMovies}
                  variant="display-grid"
                  showItemCount={true}
                  showNavigation={false}
                  onItemClick={handleItemClick}
                />
              </div>
            </div>

            <div className="rail-content-gallery-docs__example-item">
              <h3>Display Grid Selectable Variant</h3>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '16px' }}>
                Grid layout with selection capabilities via checkbox icons in the top-left corner. Ideal for bulk operations and content management workflows.
              </p>
              <div className="rail-content-gallery-docs__example">
                <RailContentGallery
                  title="Select Content"
                  items={newReleases.slice(0, 12)}
                  variant="display-grid-selectable"
                  showItemCount={true}
                  showNavigation={false}
                  selectedItems={selectedItems}
                  onSelectionChange={handleSelectionChange}
                />
              </div>
            </div>
          </div>

          {selectedAction && (
            <div className="rail-content-gallery-docs__action-feedback">
              Last Action: {selectedAction}
            </div>
          )}
        </div>

        {/* Specifications */}
        <div className="rail-content-gallery-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Specifications</h2>
          <div style={{
            backgroundColor: 'var(--card)',
            border: 'var(--table-border)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <div className="doc-table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--table-header-bg)' }}>
                  <th style={{
                    padding: 'var(--table-header-padding)',
                    textAlign: 'left',
                    fontSize: 'var(--table-font-size)',
                    fontWeight: 'var(--table-header-font-weight)',
                    color: 'var(--foreground)',
                    borderBottom: 'var(--table-border)'
                  }}>
                    Property
                  </th>
                  <th style={{
                    padding: 'var(--table-header-padding)',
                    textAlign: 'left',
                    fontSize: 'var(--table-font-size)',
                    fontWeight: 'var(--table-header-font-weight)',
                    color: 'var(--foreground)',
                    borderBottom: 'var(--table-border)'
                  }}>
                    Value
                  </th>
                  <th style={{
                    padding: 'var(--table-header-padding)',
                    textAlign: 'left',
                    fontSize: 'var(--table-font-size)',
                    fontWeight: 'var(--table-header-font-weight)',
                    color: 'var(--foreground)',
                    borderBottom: 'var(--table-border)'
                  }}>
                    Token
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { property: 'Font Family', value: 'Inter, sans-serif', token: '--font-family' },
                  { property: 'Gallery Background', value: 'transparent', token: '--rail-gallery-bg' },
                  { property: 'Gallery Title Font Size', value: '14px', token: '--type-scale-m-size' },
                  { property: 'Gallery Title Font Weight', value: '400', token: '--type-scale-m-weight' },
                  { property: 'Gallery Title Color', value: '#ffffff', token: '--foreground' },
                  { property: 'Item Count Background', value: '#292a2e', token: '--secondary' },
                  { property: 'Item Count Font Family', value: 'Inconsolata, monospace', token: '--font-family-mono' },
                  { property: 'Item Count Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Item Count Font Weight', value: '400', token: '--rail-gallery-count-font-weight' },
                  { property: 'Item Count Line Height', value: '20px', token: '--rail-gallery-count-line-height' },
                  { property: 'Item Count Letter Spacing', value: '0.1px', token: '--rail-gallery-count-letter-spacing' },
                  { property: 'Status Badge Background', value: 'var(--color-blue-800)', token: '--color-blue-800' },
                  { property: 'Status Badge Color', value: 'var(--color-blue-200)', token: '--color-blue-200' },
                  { property: 'Management Item Width', value: '120px', token: '--rail-gallery-item-management-width' },
                  { property: 'Display Item Width', value: '120px', token: '--rail-gallery-item-display-width' },
                  { property: 'Item Border Radius', value: '6px', token: '--radius-md' },
                  { property: 'Item Hover Transform', value: 'translateY(-2px)', token: '--rail-gallery-item-hover-transform' },
                  { property: 'Item Transition', value: 'all 0.2s ease', token: '--rail-gallery-item-transition' },
                  { property: 'Image Aspect Ratio', value: '2/3', token: '--rail-gallery-image-aspect-ratio' },
                  { property: 'Image Border Radius', value: '6px', token: '--radius-md' },
                  { property: 'Placeholder Background', value: '#2e2e30', token: '--rail-gallery-placeholder-bg' },
                  { property: 'Placeholder Icon Color', value: '#6b6b6b', token: '--rail-gallery-placeholder-icon-color' },
                  { property: 'Placeholder Icon Size', value: '28px', token: '--rail-gallery-placeholder-icon-size' },
                  { property: 'Position Number Size', value: '24px', token: '--rail-gallery-position-size' },
                  { property: 'Position Number Placement', value: 'Bottom-left corner', token: '--rail-gallery-position-size' },
                  { property: 'Position Number Background', value: 'rgba(0, 0, 0, 0.8)', token: '--rail-gallery-position-bg' },
                  { property: 'Position Number Color', value: '#ffffff', token: '--rail-gallery-position-color' },
                  { property: 'Position Number Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Position Number Font Weight', value: '500', token: '--font-weight-medium' },
                  { property: 'Position Number Override Background', value: '#f59e0bf2', token: 'N/A' },
                  { property: 'Position Number Override Border', value: '1px solid #d9770699', token: 'N/A' },
                  { property: 'Override Tag Placement', value: 'Bottom-right corner', token: 'N/A' },
                  { property: 'Override Tag Background', value: '#f59e0bf2', token: 'N/A' },
                  { property: 'Override Tag Border', value: '1px solid #d9770699', token: 'N/A' },
                  { property: 'Override Tag Color', value: '#ffffff', token: 'N/A' },
                  { property: 'Override Tag Font Family', value: 'Inter, sans-serif', token: '--font-family' },
                  { property: 'Override Tag Font Size', value: '9px', token: 'N/A' },
                  { property: 'Override Tag Font Weight', value: '700', token: 'N/A' },
                  { property: 'Override Tag Line Height', value: '1', token: 'N/A' },
                  { property: 'Override Tag Letter Spacing', value: '0.5px', token: 'N/A' },
                  { property: 'Override Tag Text Transform', value: 'uppercase', token: 'N/A' },
                  { property: 'Override Tag Border Radius', value: '4px', token: 'N/A' },
                  { property: 'Override Tag Padding', value: '4px 8px', token: 'N/A' },
                  { property: 'Override Tag Backdrop Filter', value: 'blur(8px)', token: 'N/A' },
                  { property: 'Override Tag Box Shadow', value: '0 2px 6px rgba(0, 0, 0, 0.5)', token: 'N/A' },
                  { property: 'Override State Trigger', value: 'Click edit icon in management variant', token: 'N/A' },
                  { property: 'Override State Persistence', value: 'Until component unmount', token: 'N/A' },
                  { property: 'Action Button Component', value: 'IconSmallButton rail-gallery variant (24px)', token: '--icon-small-button-size' },
                  { property: 'Action Button Background', value: 'rgba(25, 25, 27, 0.75)', token: '--icon-small-button-bg' },
                  { property: 'Action Button Hover Background', value: '#19191b', token: '--icon-small-button-hover-bg' },
                  { property: 'Action Button Color', value: '#9B9BA5', token: '--icon-small-button-color' },
                  { property: 'Action Icon Size', value: '14px', token: 'N/A' },
                  { property: 'Action Button Border Radius', value: '4px', token: '--icon-small-button-border-radius' },
                  { property: 'Drag Handle Placement', value: 'Top-left corner', token: '--icon-small-button-size' },
                  { property: 'Drag Handle Component', value: 'IconSmallButton rail-gallery variant (24px)', token: '--icon-small-button-size' },
                  { property: 'Drag Handle Background', value: 'rgba(25, 25, 27, 0.75)', token: '--icon-small-button-bg' },
                  { property: 'Drag Handle Hover Background', value: '#19191b', token: '--icon-small-button-hover-bg' },
                  { property: 'Title Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Title Font Weight', value: '500', token: '--type-scale-s-medium-weight' },
                  { property: 'Title Color', value: '#ffffff', token: '--foreground' },
                  { property: 'Year Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Year Color', value: '#bbbbbb', token: '--muted-foreground' },
                  { property: 'Navigation Button Component', value: 'IconButton standard variant (32px)', token: '--icon-btn-size' },
                  { property: 'Navigation Button Icon Size', value: '16px', token: '--icon-btn-icon-size' },
                  { property: 'Navigation Button Background', value: 'transparent', token: '--icon-btn-bg' },
                  { property: 'Navigation Button Hover Background', value: '#292a2e', token: '--icon-btn-hover-bg' },
                  { property: 'Navigation Button Color', value: '#bbbbbb', token: '--icon-btn-text' },
                  { property: 'Navigation Button Hover Color', value: '#ffffff', token: '--icon-btn-hover-text' },
                  { property: 'Navigation Button Border Radius', value: '4px', token: '--icon-btn-border-radius' },
                  { property: 'Navigation Button Focus Ring', value: '2px solid #67b3fb', token: '--focus-ring' },
                  { property: 'Rail Gap', value: '16px', token: '--spacing-4' },
                  { property: 'Content Padding Top', value: '12px', token: '--spacing-3' },
                  { property: 'Content Gap', value: '4px', token: '--spacing-1' },
                  { property: 'Focus Ring', value: '2px solid #67b3fb', token: '--focus-ring' },
                  { property: 'Focus Ring Offset', value: '2px', token: '--rail-gallery-item-focus-outline-offset' },
                  { property: 'Grid Columns', value: 'repeat(auto-fill, minmax(120px, 1fr))', token: '--rail-gallery-grid-columns' },
                  { property: 'Grid Gap', value: '16px', token: '--rail-gallery-grid-gap' },
                  { property: 'Grid Max Height', value: '400px', token: '--rail-gallery-grid-max-height' },
                  { property: 'Selection Checkbox Size', value: '24px', token: '--rail-gallery-checkbox-size' },
                  { property: 'Selection Checkbox Background', value: 'rgba(0, 0, 0, 0.8)', token: '--rail-gallery-checkbox-bg' },
                  { property: 'Selection Checkbox Border', value: '1px solid rgba(255, 255, 255, 0.3)', token: '--rail-gallery-checkbox-border' },
                  { property: 'Selection Checkbox Selected Background', value: '#3d63dd', token: '--rail-gallery-checkbox-selected-bg' },
                  { property: 'Selection Checkbox Selected Border', value: '#3d63dd', token: '--rail-gallery-checkbox-selected-border' },
                  { property: 'Selection Checkbox Hover Background', value: 'rgba(61, 99, 221, 0.1)', token: '--rail-gallery-checkbox-hover-bg' },
                  { property: 'Selection Checkbox Border Radius', value: '4px', token: '--rail-gallery-checkbox-border-radius' },
                  { property: 'Selection Icon Color', value: '#ffffff', token: 'N/A' },
                  { property: 'Selection Icon Size', value: '14px', token: 'N/A' }
                ].map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      padding: 'var(--table-cell-padding)',
                      fontSize: 'var(--table-font-size)',
                      color: 'var(--foreground)',
                      borderBottom: 'var(--table-border)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      {row.property}
                    </td>
                    <td style={{
                      padding: 'var(--table-cell-padding)',
                      fontSize: 'var(--table-font-size)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-family-mono)',
                      borderBottom: 'var(--table-border)'
                    }}>
                      {row.value}
                    </td>
                    <td style={{
                      padding: 'var(--table-cell-padding)',
                      fontSize: 'var(--table-font-size)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-family-mono)',
                      borderBottom: 'var(--table-border)'
                    }}>
                      {row.token}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="rail-content-gallery-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Usage Guidelines</h2>
          <div className="rail-content-gallery-docs__guidelines">
            <div className="rail-content-gallery-docs__guideline rail-content-gallery-docs__guideline--do">
              <div className="rail-content-gallery-docs__guideline-header">
                <svg className="rail-content-gallery-docs__guideline-icon rail-content-gallery-docs__guideline-icon--success" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                </svg>
                <h4>Do</h4>
              </div>
              <ul>
                <li>Use management variant for editorial interfaces and content administration</li>
                <li>Use display variant for public-facing content browsing experiences</li>
                <li>Include navigation arrows when content exceeds viewport width</li>
                <li>Show item counts to help users understand collection size</li>
                <li>Use position numbers in management variant for clear ordering</li>
                <li>Provide meaningful titles that describe the content collection</li>
                <li>Implement proper keyboard navigation for accessibility</li>
                <li>Use consistent image aspect ratios across all items</li>
                <li>Include header status and date information when relevant</li>
                <li>Make action buttons appear on hover to reduce visual clutter</li>
                <li>Use design system IconButton components for consistent interaction patterns</li>
              </ul>
            </div>

            <div className="rail-content-gallery-docs__guideline rail-content-gallery-docs__guideline--dont">
              <div className="rail-content-gallery-docs__guideline-header">
                <svg className="rail-content-gallery-docs__guideline-icon rail-content-gallery-docs__guideline-icon--error" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 15A7 7 0 118 1a7 7 0 010 14zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
                <h4>Don't</h4>
              </div>
              <ul>
                <li>Mix management and display variants in the same interface</li>
                <li>Show action controls permanently in management variant</li>
                <li>Use management variant for public-facing user experiences</li>
                <li>Include too many items without pagination or virtual scrolling</li>
                <li>Use inconsistent image sizes or aspect ratios</li>
                <li>Hide navigation controls when they might be needed</li>
                <li>Forget to include alt text for content images</li>
                <li>Make position numbers too large or distracting</li>
                <li>Use unclear or generic titles for galleries</li>
                <li>Override drag-and-drop behavior without providing alternatives</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div className="rail-content-gallery-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Accessibility</h2>
          <div style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>Keyboard Navigation</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--type-scale-s-line-height)',
                marginBottom: '12px'
              }}>
                Full keyboard support with Tab navigation through all interactive elements. Enter/Space to activate items and actions. Arrow keys for horizontal scrolling through rail content.
              </p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>Screen Reader Support</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--type-scale-s-line-height)',
                marginBottom: '12px'
              }}>
                Proper labeling for all content items, action buttons, and navigation controls. Gallery titles provide context for content collections. Descriptive alt text for all content images.
              </p>
            </div>

            <div>
              <h4 style={{ marginBottom: '12px' }}>Focus Management</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                Clear focus indicators on all interactive elements. Focus moves logically through content items and action controls. Navigation buttons properly indicate enabled/disabled states.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}