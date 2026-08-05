import React, { useState } from 'react';
import { Layout, PanelHeader } from './Layout';
import { Settings, MoreHorizontal, User, Calendar, Star, Eye } from 'lucide-react';
import { Tabs } from './Tabs';
import { Accordion } from './Accordion';
import { LayoutSpecifications } from './LayoutSpecifications';

export function LayoutDocumentation() {
  const [leftWidth, setLeftWidth] = useState(30);
  const [rightWidth, setRightWidth] = useState(70);

  const handleResize = (newLeftWidth: number, newRightWidth: number) => {
    setLeftWidth(newLeftWidth);
    setRightWidth(newRightWidth);
  };

  const SampleLeftPanel = () => (
    <div>
      <h4 style={{ marginBottom: 'var(--spacing-4)', color: 'var(--foreground)' }}>
        Navigation
      </h4>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-3)'
      }}>
        <div style={{
          background: 'var(--secondary)',
          padding: 'var(--spacing-3)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-default)'
        }}>
          <h5 style={{ marginBottom: 'var(--spacing-2)', color: 'var(--foreground)' }}>
            Collections
          </h5>
          <p style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>
            Browse content collections and categories.
          </p>
        </div>
        <div style={{
          background: 'var(--secondary)',
          padding: 'var(--spacing-3)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-default)'
        }}>
          <h5 style={{ marginBottom: 'var(--spacing-2)', color: 'var(--foreground)' }}>
            Media Library
          </h5>
          <p style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>
            Access your media files and assets.
          </p>
        </div>
      </div>
    </div>
  );

  // Tabs + Accordion Panel Example
  const TabsAccordionPanel = () => {
    const accordionItems = [
      {
        id: 'visibility',
        title: 'Visibility',
        content: (
          <div style={{ padding: '8px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--foreground)'
              }}>
                <input type="checkbox" defaultChecked />
                Show in navigation
              </label>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--foreground)'
              }}>
                <input type="checkbox" />
                Featured content
              </label>
            </div>
          </div>
        )
      },
      {
        id: 'permissions',
        title: 'Permissions',
        content: (
          <div style={{ padding: '8px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--foreground)'
              }}>
                <input type="checkbox" defaultChecked />
                Public access
              </label>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--foreground)'
              }}>
                <input type="checkbox" />
                Require authentication
              </label>
            </div>
          </div>
        )
      }
    ];

    const tabItems = [
      {
        id: 'content',
        label: 'Content',
        content: (
          <div style={{ marginTop: '0' }}>
            <Accordion
              items={accordionItems}
              type="multiple"
              defaultExpanded={['visibility']}
              className="panel-full-width-horizontal"
            />
          </div>
        )
      },
      {
        id: 'settings',
        label: 'Settings',
        content: (
          <div style={{ flex: 1, marginBottom: '16px' }}>
            <div>
              <h4 style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                margin: '0 0 12px 0',
                color: 'var(--foreground)'
              }}>
                Configuration
              </h4>
              <div style={{ 
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--muted-foreground)',
                lineHeight: '1.4'
              }}>
                Configure display settings, permissions, and content organization preferences.
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <Accordion
                items={accordionItems}
                type="multiple"
                defaultExpanded={['visibility']}
                className="panel-full-width-horizontal"
              />
            </div>
          </div>
        )
      }
    ];

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%' 
      }}>
        {/* Top Section with Tabs Control as Navigation */}
        <Tabs
          tabs={tabItems}
          defaultTab="content"
          className="panel-nav-tabs"
        />
      </div>
    );
  };



  const SampleRightPanel = () => (
    <div>
      <h4 style={{ marginBottom: 'var(--spacing-4)', color: 'var(--foreground)' }}>
        Content Details
      </h4>
      <div style={{
        display: 'grid',
        gap: 'var(--spacing-4)',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
      }}>
        <div style={{
          background: 'var(--secondary)',
          padding: 'var(--spacing-4)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-default)'
        }}>
          <h5 style={{ marginBottom: 'var(--spacing-2)', color: 'var(--foreground)' }}>
            Active Collections
          </h5>
          <p style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>
            Manage your content collections and organization settings.
          </p>
        </div>
        <div style={{
          background: 'var(--secondary)',
          padding: 'var(--spacing-4)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-default)'
        }}>
          <h5 style={{ marginBottom: 'var(--spacing-2)', color: 'var(--foreground)' }}>
            Content Library
          </h5>
          <p style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>
            Browse and configure your media content library items.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .layout-docs {
          /* Design System Tokens */
          --layout-docs-padding: var(--doc-padding);
          --layout-docs-max-width: var(--doc-max-width);
          --layout-docs-font-family: var(--doc-font-family);
          --layout-docs-section-spacing: var(--doc-section-spacing);
          --layout-docs-item-spacing: var(--doc-item-spacing);

          /* Component Styles */
          padding: var(--layout-docs-padding);
          max-width: var(--layout-docs-max-width);
          margin: 0 auto;
          font-family: var(--layout-docs-font-family);
          box-sizing: border-box;
        }

        .layout-docs__title {
          font-size: var(--text-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--foreground);
          margin-bottom: var(--layout-docs-section-spacing);
        }

        .layout-docs__section {
          margin-bottom: var(--layout-docs-section-spacing);
        }

        .layout-docs__section-title {
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-semibold);
          color: var(--foreground);
          margin-bottom: var(--layout-docs-item-spacing);
          border-bottom: 1px solid var(--border-default);
          padding-bottom: 8px;
        }

        .layout-docs__subsection-title {
          font-size: var(--text-xl);
          font-weight: var(--font-weight-medium);
          color: var(--foreground);
          margin-bottom: 16px;
          margin-top: 32px;
        }

        .layout-docs__description {
          font-size: var(--text-base);
          color: var(--muted-foreground);
          margin-bottom: var(--layout-docs-item-spacing);
          line-height: var(--leading-relaxed);
        }

        .layout-docs__example {
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: var(--layout-docs-item-spacing);
          margin-bottom: var(--layout-docs-item-spacing);
        }

        .layout-docs__example-title {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-medium);
          color: var(--foreground);
          margin-bottom: 12px;
        }

        .layout-docs__example-description {
          font-size: var(--text-sm);
          color: var(--muted-foreground);
          margin-bottom: 16px;
        }

        .layout-docs__table {
          width: 100%;
          border-collapse: collapse;
          border: var(--table-border);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: var(--layout-docs-item-spacing);
        }

        .layout-docs__table th {
          background: var(--table-header-bg);
          padding: var(--table-header-padding);
          text-align: left;
          font-weight: var(--table-header-font-weight);
          font-size: var(--table-font-size);
          color: var(--foreground);
          border-bottom: var(--table-border);
        }

        .layout-docs__table td {
          padding: var(--table-cell-padding);
          font-size: var(--table-font-size);
          color: var(--foreground);
          border-bottom: var(--table-border);
          vertical-align: top;
        }

        .layout-docs__table tr:last-child td {
          border-bottom: none;
        }

        .layout-docs__code {
          background: var(--muted);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          color: var(--foreground);
        }

        .layout-docs__feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--layout-docs-item-spacing);
          margin-bottom: var(--layout-docs-item-spacing);
        }

        .layout-docs__feature {
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 20px;
        }

        .layout-docs__feature-title {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-medium);
          color: var(--foreground);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .layout-docs__feature-description {
          font-size: var(--text-sm);
          color: var(--muted-foreground);
          line-height: var(--leading-relaxed);
        }

        .layout-docs__guidelines-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--guidelines-grid-gap);
          margin-bottom: var(--layout-docs-item-spacing);
        }

        @media (max-width: 768px) {
          .layout-docs__guidelines-grid {
            grid-template-columns: 1fr;
          }
        }

        .layout-docs__guideline {
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: var(--guidelines-border-radius);
          padding: var(--guidelines-padding);
        }

        .layout-docs__guideline--do {
          border-left: 4px solid var(--color-green-500);
        }

        .layout-docs__guideline--dont {
          border-left: 4px solid var(--color-red-500);
        }

        .layout-docs__guideline-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .layout-docs__guideline-title {
          font-weight: var(--font-weight-medium);
          color: var(--foreground);
        }

        .layout-docs__guideline-title--do {
          color: var(--cvp-color-state-success-text);
        }

        .layout-docs__guideline-title--dont {
          color: var(--cvp-color-state-danger-text);
        }

        .layout-docs__guideline-content {
          font-size: var(--text-sm);
          color: var(--muted-foreground);
          line-height: var(--leading-relaxed);
        }

        .layout-docs__resize-demo {
          background: var(--secondary);
          padding: var(--spacing-3);
          border-radius: var(--radius-md);
          font-size: var(--type-scale-s-size);
          color: var(--muted-foreground);
          text-align: center;
          margin-bottom: var(--spacing-4);
        }
      `}</style>

      <div className="layout-docs documentation-container">
        <h1 className="layout-docs__title">Panel Layout System</h1>
        
        <p className="layout-docs__description">
          Flexible panel-based layout with responsive behavior, resizing capabilities, and elevation 
          shadows. The layout system provides consistent spacing, headers, and responsive breakpoints 
          for desktop split-panel and mobile stacked layouts.
        </p>

        {/* Features */}
        <section className="layout-docs__section">
          <h2 className="layout-docs__section-title">Features</h2>
          
          <div className="layout-docs__feature-grid">
            <div className="layout-docs__feature">
              <h3 className="layout-docs__feature-title">
                <Calendar size={20} />
                Responsive Layout
              </h3>
              <p className="layout-docs__feature-description">
                Desktop split-panel (30%/70%) automatically transforms to mobile stacked layout with optimized spacing.
              </p>
            </div>

            <div className="layout-docs__feature">
              <h3 className="layout-docs__feature-title">
                <User size={20} />
                Panel Resizing
              </h3>
              <p className="layout-docs__feature-description">
                Interactive resize handles with visual feedback. Drag to adjust left panel between 20-40% width for optimal content balance.
              </p>
            </div>

            <div className="layout-docs__feature">
              <h3 className="layout-docs__feature-title">
                <Settings size={20} />
                Collapsible Panels
              </h3>
              <p className="layout-docs__feature-description">
                Toggle panel visibility with smooth animations and persistent state management.
              </p>
            </div>

            <div className="layout-docs__feature">
              <h3 className="layout-docs__feature-title">
                <Star size={20} />
                Panel Headers
              </h3>
              <p className="layout-docs__feature-description">
                Consistent 44px headers with S Regular typography, borders, and action buttons.
              </p>
            </div>

            <div className="layout-docs__feature">
              <h3 className="layout-docs__feature-title">
                <Eye size={20} />
                Elevation System
              </h3>
              <p className="layout-docs__feature-description">
                Multi-layer shadows with hover effects and theme-aware opacity levels.
              </p>
            </div>
          </div>
        </section>

        {/* Layout Examples */}
        <section className="layout-docs__section">
          <h2 className="layout-docs__section-title">Layout Examples</h2>
          
          <div className="layout-docs__example">
            <h3 className="layout-docs__example-title">Split Panel with Breadcrumbs</h3>
            <p className="layout-docs__example-description">
              Right panel with breadcrumbs navigation instead of panel header, ideal for hierarchical content navigation.
            </p>
            <Layout
              leftPanel={<SampleLeftPanel />}
              rightPanel={<SampleRightPanel />}
              leftPanelHeader={{
                title: 'Navigation',
                showToggle: true,
                actions: (
                  <button className="panel-action-btn" aria-label="Navigation settings">
                    <Settings size={16} />
                  </button>
                )
              }}
              rightPanelBreadcrumbs={[
                { id: '1', label: 'Projects', onClick: () => console.log('Projects') },
                { id: '2', label: 'Design System', onClick: () => console.log('Design System') },
                { id: '3', label: 'Components', onClick: () => console.log('Components') },
                { id: '4', label: 'Layout' }
              ]}
              minHeight="400px"
            />
          </div>

          <div className="layout-docs__example">
            <h3 className="layout-docs__example-title">Resizable Panel Layout</h3>
            <p className="layout-docs__example-description">
              Interactive layout with resize handles and real-time width feedback.
            </p>
            <div className="layout-docs__resize-demo">
              Left: {Math.round(leftWidth)}% | Right: {Math.round(rightWidth)}%
            </div>
            <Layout
              leftPanel={<SampleLeftPanel />}
              rightPanel={<SampleRightPanel />}
              leftPanelHeader={{
                title: 'Navigation',
                showToggle: true
              }}
              rightPanelHeader={{
                title: 'Main Content',
                showToggle: true
              }}
              resizable={true}
              onResize={handleResize}
              minHeight="400px"
            />
          </div>

          <div className="layout-docs__example">
            <h3 className="layout-docs__example-title">Left Panel with Navigation Tabs + Accordion</h3>
            <p className="layout-docs__example-description">
              Demonstrates navigation-style tabs positioned at the very top of the panel with no padding/gap, plus bottom border for clean geometric alignment. Includes accordion at bottom for settings organization.
            </p>
            <Layout
              leftPanel={<TabsAccordionPanel />}
              rightPanel={<SampleRightPanel />}
              leftPanelHeader={{
                title: 'Content Manager',
                showToggle: true,
                actions: (
                  <button className="panel-action-btn" aria-label="Content manager settings">
                    <Settings size={16} />
                  </button>
                )
              }}
              rightPanelHeader={{
                title: 'Main View',
                showToggle: true
              }}
              minHeight="500px"
            />
          </div>



          <div className="layout-docs__example">
            <h3 className="layout-docs__example-title">Single Panel Layout</h3>
            <p className="layout-docs__example-description">
              Layout with only right panel for simplified interfaces.
            </p>
            <Layout
              rightPanel={<SampleRightPanel />}
              rightPanelHeader={{
                title: 'Content Management',
                showToggle: true,
                actions: (
                  <>
                    <button className="panel-action-btn" aria-label="Content settings">
                      <Settings size={16} />
                    </button>
                    <button className="panel-action-btn" aria-label="More content actions">
                      <MoreHorizontal size={16} />
                    </button>
                  </>
                )
              }}
              minHeight="300px"
            />
          </div>
        </section>

        {/* Specifications */}
        <section className="layout-docs__section">
          <h2 className="layout-docs__section-title">Specifications</h2>
          <LayoutSpecifications />
        </section>

        {/* Usage Guidelines */}
        <section className="layout-docs__section">
          <h2 className="layout-docs__section-title">Usage Guidelines</h2>
          
          <div className="layout-docs__guidelines-grid">
            <div className="layout-docs__guideline layout-docs__guideline--do">
              <div className="layout-docs__guideline-header">
                <span className="layout-docs__guideline-title layout-docs__guideline-title--do">
                  ✓ Do
                </span>
              </div>
              <div className="layout-docs__guideline-content">
                Use for interfaces that require navigation alongside content viewing/editing. Perfect for admin panels, content management, and workflow applications where context switching is frequent.
              </div>
            </div>

            <div className="layout-docs__guideline layout-docs__guideline--dont">
              <div className="layout-docs__guideline-header">
                <span className="layout-docs__guideline-title layout-docs__guideline-title--dont">
                  ✗ Don't
                </span>
              </div>
              <div className="layout-docs__guideline-content">
                Don't use for simple content consumption or when mobile-first design is critical. Avoid when the left panel content doesn't provide ongoing navigation value.
              </div>
            </div>

            <div className="layout-docs__guideline layout-docs__guideline--do">
              <div className="layout-docs__guideline-header">
                <span className="layout-docs__guideline-title layout-docs__guideline-title--do">
                  ✓ Do
                </span>
              </div>
              <div className="layout-docs__guideline-content">
                Enable resizing when users need to adjust panel proportions based on content needs. The resize handle allows dragging between 20-40% left panel width, providing optimal balance between navigation and content viewing areas.
              </div>
            </div>

            <div className="layout-docs__guideline layout-docs__guideline--dont">
              <div className="layout-docs__guideline-header">
                <span className="layout-docs__guideline-title layout-docs__guideline-title--dont">
                  ✗ Don't
                </span>
              </div>
              <div className="layout-docs__guideline-content">
                Don't enable resizing for layouts where proportions are critical to the user experience. Avoid resize handles when the default split serves all use cases effectively.
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
