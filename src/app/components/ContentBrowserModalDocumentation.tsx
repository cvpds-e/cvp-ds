import React, { useState } from 'react';
import { ContentBrowserModal, ContentItem } from './ContentBrowserModal';
import { PrimaryButton } from './PrimaryButton';

const SAMPLE_CONTENT_ITEMS: ContentItem[] = [
  { id: '1', title: 'The Dark Knight', year: '2023', genre: 'Action', rating: 'PG-13', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
  { id: '2', title: 'Inception', year: '2024', genre: 'Sci-Fi', rating: 'PG-13', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80' },
  { id: '3', title: 'The Avengers', year: '2022', genre: 'Action', rating: 'PG-13', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1489599317593-3b62f9a61c5b?auto=format&fit=crop&w=300&q=80' },
  { id: '4', title: 'Interstellar', year: '2021', genre: 'Sci-Fi', rating: 'PG-13', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1478720568477-b0c8b7e0e518?auto=format&fit=crop&w=300&q=80' },
  { id: '5', title: 'Die Hard', year: '2020', genre: 'Action', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=300&q=80' },
  { id: '6', title: 'Guardians of the Galaxy', year: '2019', genre: 'Action', rating: 'PG-13', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80' },
  { id: '7', title: 'Blade Runner 2049', year: '2018', genre: 'Sci-Fi', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=300&q=80' },
  { id: '8', title: 'Mad Max: Fury Road', year: '2023', genre: 'Action', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?auto=format&fit=crop&w=300&q=80' },
  
  // Test items with no thumbnails to showcase placeholder functionality
  { id: '9', title: 'Mystery Movie', year: '2024', genre: 'Drama', rating: 'R', provider: 'Netflix', thumbnail: '' },
  { id: '10', title: 'Unknown Film', year: '2022', genre: 'Sci-Fi', rating: 'PG-13', provider: 'Disney+', thumbnail: '' },
  { id: '11', title: 'Hidden Gem', year: '2021', genre: 'Drama', rating: 'R', provider: 'HBO Max', thumbnail: '' }
];

export function ContentBrowserModalDocumentation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedItems(selectedIds);
  };

  const handleConfirm = (selectedIds: string[]) => {
    console.log('Confirmed selection:', selectedIds);
    setSelectedItems([]);
  };

  return (
    <>
      <style>{`
        .content-browser-modal-docs {
          /* Design System Tokens */
          --docs-padding: var(--doc-padding);
          --docs-max-width: var(--doc-max-width);
          --docs-font-family: var(--doc-font-family);
          --docs-section-spacing: var(--doc-section-spacing);
          --docs-item-spacing: var(--doc-item-spacing);

          /* Component Styles */
          padding: var(--docs-padding);
          max-width: var(--docs-max-width);
          font-family: var(--docs-font-family);
          box-sizing: border-box;
        }

        .content-browser-modal-docs h1 {
          margin-bottom: var(--docs-section-spacing);
        }

        .content-browser-modal-docs h2 {
          margin: var(--docs-section-spacing) 0 var(--docs-item-spacing) 0;
        }

        .content-browser-modal-docs h3 {
          margin: var(--docs-item-spacing) 0 var(--spacing-4) 0;
        }

        .content-browser-modal-docs__demo-container {
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: var(--docs-item-spacing);
          margin-bottom: var(--docs-item-spacing);
        }

        .content-browser-modal-docs__table {
          width: 100%;
          border-collapse: collapse;
          background: var(--card);
          border: var(--table-border);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: var(--docs-item-spacing);
        }

        .content-browser-modal-docs__table th {
          background: var(--table-header-bg);
          padding: var(--table-header-padding);
          text-align: left;
          font-weight: var(--table-header-font-weight);
          font-size: var(--table-font-size);
          border-bottom: var(--table-border);
        }

        .content-browser-modal-docs__table td {
          padding: var(--table-cell-padding);
          font-size: var(--table-font-size);
          border-bottom: var(--table-border);
          vertical-align: top;
        }

        .content-browser-modal-docs__table code {
          background: var(--muted);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: var(--font-family-mono);
          font-size: 12px;
        }

        .content-browser-modal-docs__table tr:last-child td {
          border-bottom: none;
        }

        .content-browser-modal-docs__usage-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--guidelines-grid-gap);
          margin-bottom: var(--docs-item-spacing);
        }

        .content-browser-modal-docs__usage-card {
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: var(--guidelines-border-radius);
          padding: var(--guidelines-padding);
        }

        .content-browser-modal-docs__usage-card h4 {
          margin: 0 0 var(--spacing-3) 0;
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }

        .content-browser-modal-docs__usage-card ul {
          margin: 0;
          padding-left: var(--spacing-5);
        }

        .content-browser-modal-docs__usage-card li {
          margin-bottom: var(--spacing-2);
          font-size: var(--type-scale-s-size);
          line-height: var(--type-scale-s-line-height);
        }

        .content-browser-modal-docs__icon--do {
          color: var(--color-green-400);
        }

        .content-browser-modal-docs__icon--dont {
          color: var(--destructive);
        }

        .content-browser-modal-docs__icon--consider {
          color: var(--color-amber-400);
        }

        .content-browser-modal-docs__dot {
          width: var(--guidelines-dot-size);
          height: var(--guidelines-dot-size);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .content-browser-modal-docs__dot--do {
          background: var(--color-green-400);
        }

        .content-browser-modal-docs__dot--dont {
          background: var(--destructive);
        }

        .content-browser-modal-docs__dot--consider {
          background: var(--color-amber-400);
        }
      `}</style>

      <div className="content-browser-modal-docs">
        <h1>Content Browser Modal</h1>
        
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '32px' }}>
          A comprehensive modal component for browsing, searching, filtering, and selecting content items. Features advanced filtering capabilities, selection reference management, placeholder handling with themed backgrounds and film strip icons, enhanced tooltips, and bulk selection functionality for editorial workflows.
        </p>

        {/* Interactive Demo */}
        <section style={{ marginBottom: '48px' }}>
          <h2>Interactive Demo</h2>
          
          <div style={{ marginBottom: '32px' }}>
            <h3>Content Browser Modal</h3>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '16px' }}>
              Click to open the content browser modal. Features search, filtering, view modes, pagination, selection reference with enhanced remove buttons, placeholder handling with themed backgrounds and film strip icons, and advanced tooltip positioning.
            </p>
            <div className="content-browser-modal-docs__demo-container">
              <PrimaryButton onClick={() => setIsModalOpen(true)}>
                Open Content Browser
              </PrimaryButton>
              
              {selectedItems.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <p style={{ 
                    fontSize: 'var(--type-scale-s-size)', 
                    color: 'var(--muted-foreground)',
                    marginBottom: '4px'
                  }}>
                    Currently selected: {selectedItems.length} items
                  </p>
                  <p style={{ 
                    fontSize: 'var(--type-scale-xs-size)', 
                    color: 'var(--muted-foreground)',
                    fontStyle: 'italic'
                  }}>
                    Try filtering to see the Selection Reference feature in action
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Component Features */}
        <section style={{ marginBottom: '48px' }}>
          <h2>Component Features</h2>
          
          <div className="content-browser-modal-docs__usage-grid">
            <div className="content-browser-modal-docs__usage-card">
              <h4>
                <div className="content-browser-modal-docs__dot content-browser-modal-docs__dot--do" />
                Search & Discovery
              </h4>
              <ul>
                <li>Real-time search with instant filtering</li>
                <li>Text-based content discovery across titles</li>
                <li>Clear search state management</li>
                <li>Search icon visual indicator</li>
                <li>Responsive search input behavior</li>
              </ul>
            </div>
            
            <div className="content-browser-modal-docs__usage-card">
              <h4>
                <div className="content-browser-modal-docs__dot content-browser-modal-docs__dot--do" />
                Advanced Filtering
              </h4>
              <ul>
                <li>Expandable filter panel with toggle</li>
                <li>Multi-attribute filtering (Genre, Year, Rating, Provider)</li>
                <li>Sort by options (Title, Year, Rating)</li>
                <li>Clear all filters functionality</li>
                <li>Filter state persistence during session</li>
              </ul>
            </div>
            
            <div className="content-browser-modal-docs__usage-card">
              <h4>
                <div className="content-browser-modal-docs__dot content-browser-modal-docs__dot--consider" />
                Content Display
              </h4>
              <ul>
                <li>Grid and list view modes (grid implemented)</li>
                <li>Responsive grid layout with aspect ratios</li>
                <li>Content thumbnails with fallback handling</li>
                <li>Hover states and visual feedback</li>
                <li>Empty state with guidance messaging</li>
              </ul>
            </div>
            
            <div className="content-browser-modal-docs__usage-card">
              <h4>
                <div className="content-browser-modal-docs__dot content-browser-modal-docs__dot--do" />
                Selection Management
              </h4>
              <ul>
                <li>Individual item selection with checkboxes</li>
                <li>Select all on page functionality</li>
                <li>Selection state persistence across filters</li>
                <li>Visual selection indicators</li>
                <li>Bulk selection confirmation workflow</li>
              </ul>
            </div>
            
            <div className="content-browser-modal-docs__usage-card">
              <h4>
                <div className="content-browser-modal-docs__dot content-browser-modal-docs__dot--do" />
                Selection Reference
              </h4>
              <ul>
                <li>Shows selected items not visible in current view</li>
                <li>Collapsible reference section with toggle</li>
                <li>Enhanced remove buttons with visibility on hover</li>
                <li>Tooltips for remove buttons and content items</li>
                <li>Real-time count of hidden selected items</li>
              </ul>
            </div>
            
            <div className="content-browser-modal-docs__usage-card">
              <h4>
                <div className="content-browser-modal-docs__dot content-browser-modal-docs__dot--do" />
                Placeholder Handling
              </h4>
              <ul>
                <li>Themed background placeholders (adaptive to light/dark modes)</li>
                <li>Film strip icons for missing thumbnails</li>
                <li>Consistent placeholder styling across components</li>
                <li>Professional fallback for content without images</li>
                <li>Proper handling of empty, null, and invalid URLs</li>
              </ul>
            </div>
            
            <div className="content-browser-modal-docs__usage-card">
              <h4>
                <div className="content-browser-modal-docs__dot content-browser-modal-docs__dot--consider" />
                Enhanced UX Features
              </h4>
              <ul>
                <li>Tooltips positioned below content items for readability</li>
                <li>Remove button tooltips positioned above for clarity</li>
                <li>Semi-transparent remove buttons with backdrop blur</li>
                <li>Hover animations and scale effects</li>
                <li>Improved focus states and keyboard navigation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Design Specifications */}
        <section>
          <h2>Specifications</h2>
          
          <div style={{ marginBottom: '32px' }}>
            <h3>Modal Structure</h3>
            <table className="content-browser-modal-docs__table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Token</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { property: 'Modal Background', value: 'rgba(0, 0, 0, 0.8)', token: '--modal-overlay-bg' },
                  { property: 'Dialog Background', value: '#252528', token: '--modal-bg' },
                  { property: 'Dialog Border', value: '#19191b', token: '--modal-border' },
                  { property: 'Dialog Border Radius', value: '8px', token: '--modal-border-radius' },
                  { property: 'Dialog Max Width', value: '60vw', token: '--modal-max-width' },
                  { property: 'Dialog Height', value: '70vh', token: '--modal-height' },
                  { property: 'Z-Index', value: '1000', token: '--modal-z-index' }
                ].map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.property}</td>
                    <td><code>{spec.value}</code></td>
                    <td><code>{spec.token}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>Header Specifications</h3>
            <table className="content-browser-modal-docs__table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Token</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { property: 'Header Padding', value: '20px 24px', token: '--header-padding' },
                  { property: 'Header Border Bottom', value: '1px solid #45454a', token: '--header-border-bottom' },
                  { property: 'Title Font Size', value: '13px', token: '--header-title-font-size' },
                  { property: 'Title Font Weight', value: '500', token: '--header-title-font-weight' },
                  { property: 'Title Color', value: '#fff', token: '--header-title-color' },
                  { property: 'Title Transform', value: 'uppercase', token: '--header-title-transform' },
                  { property: 'Subtitle Font Size', value: '13px', token: '--header-subtitle-font-size' },
                  { property: 'Subtitle Color', value: '#bbb', token: '--header-subtitle-color' }
                ].map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.property}</td>
                    <td><code>{spec.value}</code></td>
                    <td><code>{spec.token}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>Filter Bar Specifications</h3>
            <table className="content-browser-modal-docs__table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Token</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { property: 'Filter Bar Padding', value: '16px 24px', token: '--filter-bar-padding' },
                  { property: 'Filter Bar Border Bottom', value: '1px solid #45454a', token: '--filter-bar-border-bottom' },
                  { property: 'Filter Bar Gap', value: '12px', token: '--filter-bar-gap' },
                  { property: 'Search Max Width', value: '320px', token: 'max-width' },
                  { property: 'Search Icon Color', value: '#bbb', token: 'color' },
                  { property: 'View Control Gap', value: '4px', token: 'gap' }
                ].map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.property}</td>
                    <td><code>{spec.value}</code></td>
                    <td><code>{spec.token}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>Filter Section Specifications</h3>
            <table className="content-browser-modal-docs__table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Token</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { property: 'Filter Section Padding', value: '20px 24px', token: '--filter-section-padding' },
                  { property: 'Filter Section Gap', value: '16px', token: '--filter-section-gap' },
                  { property: 'Filter Group Min Width', value: '140px', token: 'min-width' },
                  { property: 'Filter Label Font Size', value: '13px', token: '--filter-label-font-size' },
                  { property: 'Filter Label Color', value: '#bbb', token: '--filter-label-color' },
                  { property: 'Filter Label Transform', value: 'none', token: '--filter-label-transform' },
                  { property: 'Filter Label Font Weight', value: '400', token: '--filter-label-font-weight' },
                  { property: 'Filter Select Background', value: '#212123', token: 'background' },
                  { property: 'Filter Select Border', value: '#45454a', token: 'border' },
                  { property: 'Clear Filters Color', value: '#97a9de', token: 'color' },
                  { property: 'Clear Filters Hover Color', value: '#cdd7f6', token: 'color' }
                ].map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.property}</td>
                    <td><code>{spec.value}</code></td>
                    <td><code>{spec.token}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>Content Grid Specifications</h3>
            <table className="content-browser-modal-docs__table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Token</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { property: 'Content Padding', value: '24px', token: '--content-padding' },
                  { property: 'Content Min Height', value: '400px', token: '--content-min-height' },
                  { property: 'Content Max Height', value: '50vh', token: '--content-max-height' },
                  { property: 'Grid Gap', value: '20px', token: '--grid-gap' },
                  { property: 'Grid Columns', value: 'repeat(auto-fill, minmax(120px, 1fr))', token: '--grid-columns' },
                  { property: 'Item Aspect Ratio', value: '2/3', token: '--item-aspect-ratio' },
                  { property: 'Item Border Radius', value: '6px', token: '--item-border-radius' },
                  { property: 'Checkbox Size', value: '20px', token: 'width/height' },
                  { property: 'Checkbox Background', value: 'rgba(0, 0, 0, 0.8)', token: 'background' },
                  { property: 'Checkbox Selected Background', value: '#3d63dd', token: 'background' }
                ].map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.property}</td>
                    <td><code>{spec.value}</code></td>
                    <td><code>{spec.token}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>Selection Reference Specifications</h3>
            <table className="content-browser-modal-docs__table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Token</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { property: 'Reference Background', value: '#1e1e20', token: '--selection-ref-bg' },
                  { property: 'Reference Border Bottom', value: '1px solid #45454a', token: '--selection-ref-border' },
                  { property: 'Reference Padding', value: '16px 24px', token: '--selection-ref-padding' },
                  { property: 'Reference Gap', value: '12px', token: '--selection-ref-gap' },
                  { property: 'Item Size', value: '60px', token: '--selection-ref-item-size' },
                  { property: 'Item Border Radius', value: '4px', token: '--selection-ref-item-border-radius' },
                  { property: 'Remove Button Background', value: 'rgba(0, 0, 0, 0.75)', token: 'background' },
                  { property: 'Remove Button Border', value: '1px solid rgba(255, 255, 255, 0.2)', token: 'border' },
                  { property: 'Remove Button Hover Background', value: '#e6494e', token: 'background' },
                  { property: 'Backdrop Filter', value: 'blur(4px)', token: 'backdrop-filter' }
                ].map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.property}</td>
                    <td><code>{spec.value}</code></td>
                    <td><code>{spec.token}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>Placeholder Specifications</h3>
            <table className="content-browser-modal-docs__table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Token</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { property: 'Placeholder Background', value: '#2e2e30', token: '--placeholder-bg' },
                  { property: 'Placeholder Icon Color', value: '#6b6b6b', token: '--placeholder-icon-color' },
                  { property: 'Placeholder Icon Size (Main)', value: '28px', token: '--placeholder-icon-size' },
                  { property: 'Placeholder Icon Size (Reference)', value: '16px', token: '--selection-ref-placeholder-icon-size' },
                  { property: 'Placeholder Icon Opacity', value: '0.8', token: 'opacity' },
                  { property: 'Placeholder Display', value: 'flex', token: 'display' },
                  { property: 'Placeholder Align Items', value: 'center', token: 'align-items' },
                  { property: 'Placeholder Justify Content', value: 'center', token: 'justify-content' }
                ].map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.property}</td>
                    <td><code>{spec.value}</code></td>
                    <td><code>{spec.token}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>Footer Specifications</h3>
            <table className="content-browser-modal-docs__table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Token</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { property: 'Footer Padding', value: '13px 19px', token: '--footer-padding' },
                  { property: 'Footer Border Top', value: '0.5px solid #45454a', token: '--footer-border-top' },
                  { property: 'Footer Gap', value: '16px', token: '--footer-gap' },
                  { property: 'Footer Background', value: '#18181A', token: '--footer-bg' },
                  { property: 'Footer Min Height', value: '60px', token: 'min-height' },
                  { property: 'Status Text Font Size', value: '13px', token: 'font-size' },
                  { property: 'Status Text Color', value: '#bbb', token: 'color' },
                  { property: 'Pagination Button Color', value: '#67b3fb', token: 'color' },
                  { property: 'Button Gap', value: '12px', token: 'gap' }
                ].map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.property}</td>
                    <td><code>{spec.value}</code></td>
                    <td><code>{spec.token}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>Tooltip Specifications</h3>
            <table className="content-browser-modal-docs__table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { property: 'Content Item Tooltip Position', value: 'side="bottom"', description: 'Positioned below content items for better readability' },
                  { property: 'Remove Button Tooltip Position', value: 'side="top"', description: 'Positioned above remove buttons to avoid conflicts' },
                  { property: 'Content Tooltip Content', value: 'Title (Year)', description: 'Shows full title and year information' },
                  { property: 'Remove Tooltip Content', value: 'Remove from selection', description: 'Clear action description' },
                  { property: 'Tooltip Trigger', value: 'hover', description: 'Activated on mouse hover' },
                  { property: 'Tooltip Arrow', value: 'hidden', description: 'Arrows are globally hidden for clean appearance' }
                ].map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.property}</td>
                    <td><code>{spec.value}</code></td>
                    <td>{spec.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>Empty State Specifications</h3>
            <table className="content-browser-modal-docs__table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Token</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { property: 'Empty State Gap', value: '16px', token: '--empty-state-gap' },
                  { property: 'Empty Icon Size', value: '48px', token: 'width/height' },
                  { property: 'Empty Icon Color', value: '#666', token: '--empty-state-icon-color' },
                  { property: 'Empty Title Font Size', value: '16px', token: 'font-size' },
                  { property: 'Empty Title Font Weight', value: '500', token: 'font-weight' },
                  { property: 'Empty Title Color', value: '#fff', token: 'color' },
                  { property: 'Empty Subtitle Font Size', value: '13px', token: 'font-size' },
                  { property: 'Empty Subtitle Color', value: '#bbb', token: '--empty-state-text-color' },
                  { property: 'Empty Subtitle Max Width', value: '400px', token: 'max-width' }
                ].map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.property}</td>
                    <td><code>{spec.value}</code></td>
                    <td><code>{spec.token}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Modal Instance */}
      <ContentBrowserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedItems={selectedItems}
        onSelectionChange={handleSelectionChange}
        onConfirm={handleConfirm}
      />
    </>
  );
}