import React from 'react';
import { PageSideNav, PageSideNavSection } from './PageSideNav';
import { Radio, Hash, Clock, Filter, Settings, Square, ChevronRight } from 'lucide-react';

export function PageSideNavDocumentation() {
  const [activeItem, setActiveItem] = React.useState('all-channels');

  const generalSections: PageSideNavSection[] = [
    {
      title: 'GENERAL',
      items: [
        {
          id: 'all-channels',
          label: 'All Channels',
          icon: <Radio size={16} />,
          badge: 12,
          active: activeItem === 'all-channels',
          onClick: () => setActiveItem('all-channels')
        },
        {
          id: 'active-channels',
          label: 'Active Channels',
          icon: <Radio size={16} />,
          badge: 11,
          active: activeItem === 'active-channels',
          onClick: () => setActiveItem('active-channels')
        },
        {
          id: 'inactive-channels',
          label: 'Inactive Channels',
          icon: <Radio size={16} />,
          badge: 1,
          active: activeItem === 'inactive-channels',
          onClick: () => setActiveItem('inactive-channels')
        },
        {
          id: 'recently-modified',
          label: 'Recently Modified',
          icon: <Clock size={16} />,
          active: activeItem === 'recently-modified',
          onClick: () => setActiveItem('recently-modified')
        }
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        {
          id: 'channel-templates',
          label: 'Channel Templates',
          icon: <Filter size={16} />,
          active: activeItem === 'channel-templates',
          onClick: () => setActiveItem('channel-templates')
        },
        {
          id: 'default-settings',
          label: 'Default Settings',
          icon: <Settings size={16} />,
          active: activeItem === 'default-settings',
          onClick: () => setActiveItem('default-settings')
        },
        {
          id: 'bulk-actions',
          label: 'Bulk Actions',
          icon: <Square size={16} />,
          active: activeItem === 'bulk-actions',
          onClick: () => setActiveItem('bulk-actions')
        }
      ]
    }
  ];

  return (
    <>
      <style>{`
        .page-side-nav-docs {
          /* Design System Tokens */
          --page-side-nav-docs-padding: var(--doc-padding);
          --page-side-nav-docs-max-width: var(--doc-max-width);
          --page-side-nav-docs-font-family: var(--doc-font-family);
          --page-side-nav-docs-section-spacing: var(--doc-section-spacing);
          --page-side-nav-docs-item-spacing: var(--doc-item-spacing);

          /* Component Styles */
          padding: var(--page-side-nav-docs-padding);
          max-width: var(--page-side-nav-docs-max-width);
          margin: 0 auto;
          font-family: var(--page-side-nav-docs-font-family);
          box-sizing: border-box;
        }

        .page-side-nav-docs__title {
          font-size: var(--text-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--foreground);
          margin-bottom: var(--page-side-nav-docs-section-spacing);
        }

        .page-side-nav-docs__section {
          margin-bottom: var(--page-side-nav-docs-section-spacing);
        }

        .page-side-nav-docs__section-title {
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-semibold);
          color: var(--foreground);
          margin-bottom: var(--page-side-nav-docs-item-spacing);
          border-bottom: 1px solid var(--border-default);
          padding-bottom: 8px;
        }

        .page-side-nav-docs__description {
          font-size: var(--text-base);
          color: var(--muted-foreground);
          margin-bottom: var(--page-side-nav-docs-item-spacing);
          line-height: var(--leading-relaxed);
        }

        .page-side-nav-docs__example {
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: var(--page-side-nav-docs-item-spacing);
          margin-bottom: var(--page-side-nav-docs-item-spacing);
        }

        .page-side-nav-docs__example-title {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-medium);
          color: var(--foreground);
          margin-bottom: 12px;
        }

        .page-side-nav-docs__example-description {
          font-size: var(--text-sm);
          color: var(--muted-foreground);
          margin-bottom: 16px;
        }

        .page-side-nav-docs__example-demo {
          background: var(--bg-base);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          height: 500px;
          margin-bottom: 24px;
        }

        .page-side-nav-docs__content {
          flex: 1;
          padding: 24px;
          background: var(--bg-surface);
          overflow-y: auto;
        }

        .page-side-nav-docs__content-header {
          margin-bottom: 24px;
        }

        .page-side-nav-docs__content-title {
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 8px 0;
        }

        .page-side-nav-docs__content-subtitle {
          font-size: 14px;
          color: #b4b4ba;
          margin: 0;
        }

        .page-side-nav-docs__table {
          width: 100%;
          border-collapse: collapse;
          border: var(--table-border);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: var(--page-side-nav-docs-item-spacing);
        }

        .page-side-nav-docs__table th {
          background: var(--table-header-bg);
          padding: var(--table-header-padding);
          text-align: left;
          font-weight: var(--table-header-font-weight);
          font-size: var(--table-font-size);
          color: var(--foreground);
          border-bottom: var(--table-border);
        }

        .page-side-nav-docs__table td {
          padding: var(--table-cell-padding);
          font-size: var(--table-font-size);
          color: var(--foreground);
          border-bottom: var(--table-border);
          vertical-align: top;
        }

        .page-side-nav-docs__table tr:last-child td {
          border-bottom: none;
        }

        .page-side-nav-docs__code {
          background: var(--muted);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          color: var(--foreground);
        }

        .page-side-nav-docs__guidelines-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--guidelines-grid-gap);
          margin-bottom: var(--page-side-nav-docs-item-spacing);
        }

        @media (max-width: 768px) {
          .page-side-nav-docs__guidelines-grid {
            grid-template-columns: 1fr;
          }
        }

        .page-side-nav-docs__guideline {
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: var(--guidelines-border-radius);
          padding: var(--guidelines-padding);
        }

        .page-side-nav-docs__guideline--do {
          border-left: 4px solid var(--color-green-500);
        }

        .page-side-nav-docs__guideline--dont {
          border-left: 4px solid var(--color-red-500);
        }

        .page-side-nav-docs__guideline-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .page-side-nav-docs__guideline-title {
          font-weight: var(--font-weight-medium);
          color: var(--foreground);
        }

        .page-side-nav-docs__guideline-title--do {
          color: var(--color-green-400);
        }

        .page-side-nav-docs__guideline-title--dont {
          color: var(--color-red-400);
        }

        .page-side-nav-docs__guideline-content {
          font-size: var(--text-sm);
          color: var(--muted-foreground);
          line-height: var(--leading-relaxed);
        }
      `}</style>

      <div className="page-side-nav-docs documentation-container">
        <h1 className="page-side-nav-docs__title">Page Side Nav</h1>
        
        <p className="page-side-nav-docs__description">
          The Page Side Nav component provides a vertical navigation sidebar for organizing content into sections with support for icons, badges, and active states. Perfect for application pages with multiple navigation categories.
        </p>

        {/* Examples */}
        <section className="page-side-nav-docs__section">
          <h2 className="page-side-nav-docs__section-title">Example</h2>
          
          <div className="page-side-nav-docs__example">
            <h3 className="page-side-nav-docs__example-title">Channel Management</h3>
            <p className="page-side-nav-docs__example-description">
              Navigation sidebar with sections for managing channels and settings. Click items to see the active state.
            </p>
            <div className="page-side-nav-docs__example-demo">
              <PageSideNav sections={generalSections} />
              <div className="page-side-nav-docs__content">
                <div className="page-side-nav-docs__content-header">
                  <h2 className="page-side-nav-docs__content-title">
                    {activeItem === 'all-channels' && 'All Channels'}
                    {activeItem === 'active-channels' && 'Active Channels'}
                    {activeItem === 'inactive-channels' && 'Inactive Channels'}
                    {activeItem === 'recently-modified' && 'Recently Modified'}
                    {activeItem === 'channel-templates' && 'Channel Templates'}
                    {activeItem === 'default-settings' && 'Default Settings'}
                    {activeItem === 'bulk-actions' && 'Bulk Actions'}
                  </h2>
                  <p className="page-side-nav-docs__content-subtitle">
                    {activeItem === 'all-channels' && 'View and manage all 12 channels in your workspace'}
                    {activeItem === 'active-channels' && 'Currently active channels (11 total)'}
                    {activeItem === 'inactive-channels' && 'Inactive channels that are not currently in use'}
                    {activeItem === 'recently-modified' && 'Channels that have been recently updated'}
                    {activeItem === 'channel-templates' && 'Pre-configured templates for creating new channels'}
                    {activeItem === 'default-settings' && 'Configure default settings for new channels'}
                    {activeItem === 'bulk-actions' && 'Perform actions on multiple channels at once'}
                  </p>
                </div>
                <div style={{ 
                  padding: '20px', 
                  background: '#14141a', 
                  borderRadius: '6px',
                  border: '1px solid var(--border-default)',
                  color: '#b4b4ba',
                  fontSize: '14px'
                }}>
                  Content area for "{activeItem === 'all-channels' ? 'All Channels' : 
                    activeItem === 'active-channels' ? 'Active Channels' :
                    activeItem === 'inactive-channels' ? 'Inactive Channels' :
                    activeItem === 'recently-modified' ? 'Recently Modified' :
                    activeItem === 'channel-templates' ? 'Channel Templates' :
                    activeItem === 'default-settings' ? 'Default Settings' : 'Bulk Actions'}" page would be displayed here.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="page-side-nav-docs__section">
          <h2 className="page-side-nav-docs__section-title">States</h2>
          
          <div className="page-side-nav-docs__example">
            <h3 className="page-side-nav-docs__example-title">Nav Item States</h3>
            <p className="page-side-nav-docs__example-description">
              Navigation items support default, hover, and active states with smooth transitions.
            </p>
            
            <table className="page-side-nav-docs__table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Background</th>
                  <th>Text Color</th>
                  <th>Icon Color</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Default</td>
                  <td>transparent</td>
                  <td>#6b7280</td>
                  <td>#9ca3af</td>
                </tr>
                <tr>
                  <td>Hover</td>
                  <td>#f3f4f6</td>
                  <td>#111827</td>
                  <td>#374151</td>
                </tr>
                <tr>
                  <td>Active</td>
                  <td>rgba(111, 139, 230, 0.08)</td>
                  <td>#6f8be6</td>
                  <td>#6f8be6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Specifications */}
        <section className="page-side-nav-docs__section">
          <h2 className="page-side-nav-docs__section-title">Specifications</h2>
          
          <table className="page-side-nav-docs__table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
                <th>Token</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} style={{ 
                  background: '#292a2e', 
                  fontWeight: '500', 
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: '13px',
                  letterSpacing: '0.1px'
                }}>
                  Container
                </td>
              </tr>
              <tr>
                <td>Width</td>
                <td>224px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-width</code></td>
              </tr>
              <tr>
                <td>Background</td>
                <td>#ffffff</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-bg</code></td>
              </tr>
              <tr>
                <td>Border Right</td>
                <td>1px solid #e5e7eb</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-border</code></td>
              </tr>
              <tr>
                <td>Padding</td>
                <td>16px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-padding</code></td>
              </tr>
              <tr>
                <td>Section Gap</td>
                <td>24px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-section-gap</code></td>
              </tr>
              <tr>
                <td colSpan={3} style={{ 
                  background: 'var(--bg-surface-raised)', 
                  fontWeight: '500', 
                  textAlign: 'center',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  letterSpacing: '0.1px'
                }}>
                  Section Title
                </td>
              </tr>
              <tr>
                <td>Font Size</td>
                <td>10px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-section-title-size</code></td>
              </tr>
              <tr>
                <td>Font Weight</td>
                <td>600</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-section-title-weight</code></td>
              </tr>
              <tr>
                <td>Color</td>
                <td>#9ca3af</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-section-title-color</code></td>
              </tr>
              <tr>
                <td>Text Transform</td>
                <td>uppercase</td>
                <td>uppercase</td>
              </tr>
              <tr>
                <td>Letter Spacing</td>
                <td>0.05em</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-section-title-spacing</code></td>
              </tr>
              <tr>
                <td>Margin Bottom</td>
                <td>12px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-section-title-margin</code></td>
              </tr>
              <tr>
                <td>Padding</td>
                <td>0 8px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-section-title-padding</code></td>
              </tr>
              <tr>
                <td colSpan={3} style={{ 
                  background: '#292a2e', 
                  fontWeight: '500', 
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: '13px',
                  letterSpacing: '0.1px'
                }}>
                  Nav Item
                </td>
              </tr>
              <tr>
                <td>Padding</td>
                <td>6px 8px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-item-padding</code></td>
              </tr>
              <tr>
                <td>Font Size</td>
                <td>14px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-item-size</code></td>
              </tr>
              <tr>
                <td>Border Radius</td>
                <td>6px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-item-radius</code></td>
              </tr>
              <tr>
                <td>Gap Between Items</td>
                <td>2px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-item-gap</code></td>
              </tr>
              <tr>
                <td>Default Color</td>
                <td>#6b7280</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-item-color</code></td>
              </tr>
              <tr>
                <td>Hover Background</td>
                <td>#f3f4f6</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-item-hover-bg</code></td>
              </tr>
              <tr>
                <td>Hover Color</td>
                <td>#111827</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-item-hover-color</code></td>
              </tr>
              <tr>
                <td>Active Background</td>
                <td>rgba(111, 139, 230, 0.08)</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-item-active-bg</code></td>
              </tr>
              <tr>
                <td>Active Color</td>
                <td>#6f8be6</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-item-active-color</code></td>
              </tr>
              <tr>
                <td>Transition</td>
                <td>all 150ms ease</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-item-transition</code></td>
              </tr>
              <tr>
                <td colSpan={3} style={{ 
                  background: '#292a2e', 
                  fontWeight: '500', 
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: '13px',
                  letterSpacing: '0.1px'
                }}>
                  Icon
                </td>
              </tr>
              <tr>
                <td>Size</td>
                <td>16px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-icon-size</code></td>
              </tr>
              <tr>
                <td>Default Color</td>
                <td>#6b6b78</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-icon-color</code></td>
              </tr>
              <tr>
                <td>Active Color</td>
                <td>#6f8be6</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-icon-active-color</code></td>
              </tr>
              <tr>
                <td>Hover Color</td>
                <td>#ffffff</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-icon-hover-color</code></td>
              </tr>
              <tr>
                <td colSpan={3} style={{ 
                  background: '#292a2e', 
                  fontWeight: '500', 
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: '13px',
                  letterSpacing: '0.1px'
                }}>
                  Badge
                </td>
              </tr>
              <tr>
                <td>Font Size</td>
                <td>10px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-badge-size</code></td>
              </tr>
              <tr>
                <td>Font Weight</td>
                <td>500</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-badge-weight</code></td>
              </tr>
              <tr>
                <td>Background</td>
                <td>#2a2a35</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-badge-bg</code></td>
              </tr>
              <tr>
                <td>Color</td>
                <td>#b4b4ba</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-badge-color</code></td>
              </tr>
              <tr>
                <td>Padding</td>
                <td>2px 6px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-badge-padding</code></td>
              </tr>
              <tr>
                <td>Border Radius</td>
                <td>4px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-badge-radius</code></td>
              </tr>
              <tr>
                <td colSpan={3} style={{ 
                  background: '#292a2e', 
                  fontWeight: '500', 
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: '13px',
                  letterSpacing: '0.1px'
                }}>
                  Active Indicator
                </td>
              </tr>
              <tr>
                <td>Size</td>
                <td>14px</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-indicator-size</code></td>
              </tr>
              <tr>
                <td>Color</td>
                <td>#6f8be6</td>
                <td><code className="page-side-nav-docs__code">--page-side-nav-indicator-color</code></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Usage Guidelines */}
        <section className="page-side-nav-docs__section">
          <h2 className="page-side-nav-docs__section-title">Usage Guidelines</h2>
          
          <div className="page-side-nav-docs__guidelines-grid">
            <div className="page-side-nav-docs__guideline page-side-nav-docs__guideline--do">
              <div className="page-side-nav-docs__guideline-header">
                <span className="page-side-nav-docs__guideline-title page-side-nav-docs__guideline-title--do">
                  ✓ Do
                </span>
              </div>
              <div className="page-side-nav-docs__guideline-content">
                Use section titles to organize navigation items into logical groups. Keep section titles short and descriptive using uppercase text.
              </div>
            </div>

            <div className="page-side-nav-docs__guideline page-side-nav-docs__guideline--dont">
              <div className="page-side-nav-docs__guideline-header">
                <span className="page-side-nav-docs__guideline-title page-side-nav-docs__guideline-title--dont">
                  ✗ Don't
                </span>
              </div>
              <div className="page-side-nav-docs__guideline-content">
                Don't create too many sections or items. Limit sections to 2-4 and items per section to 3-8 for optimal usability.
              </div>
            </div>

            <div className="page-side-nav-docs__guideline page-side-nav-docs__guideline--do">
              <div className="page-side-nav-docs__guideline-header">
                <span className="page-side-nav-docs__guideline-title page-side-nav-docs__guideline-title--do">
                  ✓ Do
                </span>
              </div>
              <div className="page-side-nav-docs__guideline-content">
                Use badges to display counts or status information. Badges work well for showing the number of items in a category.
              </div>
            </div>

            <div className="page-side-nav-docs__guideline page-side-nav-docs__guideline--dont">
              <div className="page-side-nav-docs__guideline-header">
                <span className="page-side-nav-docs__guideline-title page-side-nav-docs__guideline-title--dont">
                  ✗ Don't
                </span>
              </div>
              <div className="page-side-nav-docs__guideline-content">
                Don't use the active state for multiple items simultaneously. Only one navigation item should be active at a time.
              </div>
            </div>

            <div className="page-side-nav-docs__guideline page-side-nav-docs__guideline--do">
              <div className="page-side-nav-docs__guideline-header">
                <span className="page-side-nav-docs__guideline-title page-side-nav-docs__guideline-title--do">
                  ✓ Do
                </span>
              </div>
              <div className="page-side-nav-docs__guideline-content">
                Use consistent icons from the lucide-react library at 16px size. Icons should clearly represent the navigation item's purpose.
              </div>
            </div>

            <div className="page-side-nav-docs__guideline page-side-nav-docs__guideline--do">
              <div className="page-side-nav-docs__guideline-header">
                <span className="page-side-nav-docs__guideline-title page-side-nav-docs__guideline-title--do">
                  ✓ Do
                </span>
              </div>
              <div className="page-side-nav-docs__guideline-content">
                Keep navigation labels concise and clear. Use 1-3 words that accurately describe the destination or content category.
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}