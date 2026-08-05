import React, { useState } from 'react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { Rss, Play, Home, Folder, Settings, Users, FileText, Database, Shield } from 'lucide-react';

export function BreadcrumbsDocumentation() {
  const [currentPath, setCurrentPath] = useState('feeds');

  // Sample breadcrumb configurations
  const feedsBreadcrumb: BreadcrumbItem[] = [
    {
      id: 'feeds-list',
      label: 'Feeds List',
      icon: Rss,
      onClick: () => setCurrentPath('feeds-list')
    },
    {
      id: 'feed-name-4',
      label: 'Feed Name 4'
    }
  ];

  const seriesBreadcrumb: BreadcrumbItem[] = [
    {
      id: 'series-list',
      label: 'Series List',
      icon: Play,
      onClick: () => setCurrentPath('series-list')
    },
    {
      id: 'series-title',
      label: 'Series Title',
      onClick: () => setCurrentPath('series-title')
    },
    {
      id: 'season-2',
      label: 'Season 2',
      onClick: () => setCurrentPath('season-2')
    },
    {
      id: 'episode-title',
      label: 'Episode Title'
    }
  ];

  const settingsBreadcrumb: BreadcrumbItem[] = [
    {
      id: 'settings-root',
      label: 'Settings',
      icon: Settings,
      onClick: () => setCurrentPath('settings-root'),
      dropdown: [
        {
          id: 'general-settings',
          label: 'General Settings',
          icon: Settings,
          onClick: () => setCurrentPath('general-settings')
        },
        {
          id: 'system-settings',
          label: 'System Settings',
          icon: Database,
          onClick: () => setCurrentPath('system-settings')
        },
        {
          id: 'security-settings',
          label: 'Security Settings',
          icon: Shield,
          onClick: () => setCurrentPath('security-settings'),
          separator: true
        }
      ]
    },
    {
      id: 'user-management',
      label: 'User Management',
      icon: Users,
      onClick: () => setCurrentPath('user-management')
    },
    {
      id: 'permissions',
      label: 'Permissions'
    }
  ];

  const simpleBreadcrumb: BreadcrumbItem[] = [
    {
      id: 'documents',
      label: 'Documents',
      onClick: () => setCurrentPath('documents')
    },
    {
      id: 'reports',
      label: 'Reports',
      onClick: () => setCurrentPath('reports')
    },
    {
      id: 'quarterly-report',
      label: 'Q3 2024 Report'
    }
  ];

  return (
    <div className="documentation-container">
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ marginBottom: '16px' }}>Breadcrumbs</h1>
        <p style={{ 
          fontSize: 'var(--type-scale-l-size)',
          lineHeight: 'var(--type-scale-l-line-height)',
          color: 'var(--muted-foreground)',
          marginBottom: '24px'
        }}>
          Navigation component that displays a hierarchical trail showing the user's current location within a system and provides quick navigation back to previous levels.
        </p>
        
        {/* Status badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          backgroundColor: 'var(--color-green-800)',
          color: 'var(--color-green-200)',
          borderRadius: '16px',
          fontSize: 'var(--type-scale-xs-regular-size)',
          fontWeight: 'var(--font-weight-medium)'
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            backgroundColor: 'var(--color-green-400)',
            borderRadius: '50%'
          }} />
          Stable
        </div>
      </div>

      {/* Live Example */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Example</h2>
        <div style={{
          padding: '32px',
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div>
            <div style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>
              Feeds Navigation
            </div>
            <Breadcrumbs items={feedsBreadcrumb} />
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>
              Series Navigation
            </div>
            <Breadcrumbs items={seriesBreadcrumb} />
          </div>
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            backgroundColor: 'var(--muted)',
            borderRadius: '6px',
            fontSize: 'var(--type-scale-s-size)',
            color: 'var(--muted-foreground)',
            fontFamily: 'var(--font-family-mono)'
          }}>
            Current interaction: {currentPath}
          </div>
        </div>
      </section>

      {/* States */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>States</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Default</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              marginBottom: '16px',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              Standard appearance with interactive links and current page highlighted
            </p>
            <Breadcrumbs items={[
              { id: 'home', label: 'Home', icon: Home, onClick: () => {} },
              { id: 'settings', label: 'Settings', onClick: () => {} },
              { id: 'current', label: 'Current Page' }
            ]} />
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>With Icons</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              marginBottom: '16px',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              Including optional icons for better visual hierarchy and context
            </p>
            <Breadcrumbs items={[
              { id: 'settings', label: 'Settings', icon: Settings, onClick: () => {} },
              { id: 'users', label: 'Users', icon: Users, onClick: () => {} },
              { id: 'permissions', label: 'Permissions' }
            ]} />
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Simple Text</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              marginBottom: '16px',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              Clean text-only navigation without icons
            </p>
            <Breadcrumbs items={[
              { id: 'docs', label: 'Documentation', onClick: () => {} },
              { id: 'components', label: 'Components', onClick: () => {} },
              { id: 'breadcrumbs', label: 'Breadcrumbs' }
            ]} />
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>With Dropdown</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              marginBottom: '16px',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              Interactive dropdown menu with Select component styling for quick access to related sections
            </p>
            <Breadcrumbs items={[
              { 
                id: 'content', 
                label: 'Content', 
                icon: Folder, 
                onClick: () => setCurrentPath('content'),
                dropdown: [
                  {
                    id: 'movies',
                    label: 'Movies',
                    icon: Play,
                    onClick: () => setCurrentPath('movies')
                  },
                  {
                    id: 'series',
                    label: 'Series',
                    icon: Rss,
                    onClick: () => setCurrentPath('series')
                  },
                  {
                    id: 'documents',
                    label: 'Documents',
                    icon: FileText,
                    onClick: () => setCurrentPath('documents'),
                    separator: true
                  }
                ]
              },
              { id: 'movies', label: 'Movies', onClick: () => setCurrentPath('movies') },
              { id: 'action', label: 'Action Movies' }
            ]} />
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Single Item</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              marginBottom: '16px',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              When there's only one level to display
            </p>
            <Breadcrumbs items={[
              { id: 'dashboard', label: 'Dashboard', icon: Home }
            ]} />
          </div>
        </div>
      </section>

      {/* Common Usage Patterns */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Common Usage Patterns</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px'
        }}>
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginBottom: '16px' }}>Content Management</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              marginBottom: '16px'
            }}>
              Navigate through content hierarchies like feeds, series, and episodes with clear context.
            </p>
            <Breadcrumbs items={feedsBreadcrumb} />
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginBottom: '16px' }}>Multi-level Settings</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              marginBottom: '16px'
            }}>
              Guide users through complex configuration workflows and settings panels with dropdown navigation.
            </p>
            <Breadcrumbs items={settingsBreadcrumb} />
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginBottom: '16px' }}>Document Structure</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              marginBottom: '16px'
            }}>
              Show location within file systems, documentation, or organizational structures.
            </p>
            <Breadcrumbs items={simpleBreadcrumb} />
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Usage Guidelines</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-green-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 style={{ marginBottom: '8px', color: 'var(--foreground)' }}>Do</h4>
                <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none' }}>
                  <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                    • Keep breadcrumb labels concise and descriptive
                  </li>
                  <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                    • Show the complete navigation path
                  </li>
                  <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                    • Use icons sparingly for better context
                  </li>
                  <li style={{ fontSize: 'var(--type-scale-s-size)' }}>
                    • Use dropdowns for quick navigation to related sections
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'var(--destructive)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M9 3L3 9M3 3l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 style={{ marginBottom: '8px', color: 'var(--foreground)' }}>Don't</h4>
                <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none' }}>
                  <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                    • Use breadcrumbs for single-level navigation
                  </li>
                  <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                    • Make labels too long or technical
                  </li>
                  <li style={{ fontSize: 'var(--type-scale-s-size)' }}>
                    • Skip intermediate levels in the hierarchy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Specifications</h2>
        
        <p style={{ 
          marginBottom: '16px',
          color: 'var(--muted-foreground)',
          fontSize: '14px'
        }}>
          Color values shown for both Dark Theme and Light Theme where applicable.
        </p>

        <h3>Design Tokens</h3>
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '32px'
        }}>
          <div className="doc-table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--muted)' }}>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: 'var(--type-scale-s-size)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  borderBottom: '1px solid var(--border-default)'
                }}>
                  Property
                </th>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: 'var(--type-scale-s-size)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  borderBottom: '1px solid var(--border-default)'
                }}>
                  Value
                </th>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: 'var(--type-scale-s-size)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  borderBottom: '1px solid var(--border-default)'
                }}>
                  Token
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { property: 'Font family', value: 'Inter', token: '--font-family' },
                { property: 'Font size', value: '14px', token: '--type-scale-m-size' },
                { property: 'Font weight', value: '400', token: '--type-scale-m-weight' },
                { property: 'Line height', value: '20px', token: '--type-scale-m-line-height' },
                { property: 'Letter spacing', value: '0.15px', token: '--type-scale-m-letter-spacing' },
                { property: 'Gap between items', value: '8px', token: '--breadcrumbs-gap' },
                { property: 'Icon size', value: '14px', token: '--breadcrumbs-icon-size' },
                { property: 'Separator icon size', value: '12px', token: '--breadcrumbs-separator-icon-size' },
                { property: 'Default text color', value: 'Dark: #bbb / Light: #6b7280', token: '--muted-foreground' },
                { property: 'Current page text color', value: 'Dark: #fff / Light: #111827', token: '--foreground' },
                { property: 'Hover text color', value: 'Dark: #fff / Light: #111827', token: '--foreground' },
                { property: 'Separator color', value: 'Dark: #bbb / Light: #9ca3af', token: '--muted-foreground' },
                { property: 'Dropdown trigger background', value: 'transparent', token: '--breadcrumbs-dropdown-trigger-bg' },
                { property: 'Dropdown trigger hover background', value: 'Dark: #292a2e / Light: #f3f4f6', token: '--muted' },
                { property: 'Dropdown trigger padding', value: '2px 4px', token: '--breadcrumbs-dropdown-trigger-padding' },
                { property: 'Dropdown trigger border radius', value: '4px', token: '--breadcrumbs-dropdown-trigger-border-radius' },
                { property: 'Dropdown menu background', value: 'Dark: #292a2e / Light: #ffffff', token: '--breadcrumbs-dropdown-bg' },
                { property: 'Dropdown menu shadow', value: 'Dark: 0 1px 1px #000 / Light: 0 1px 3px rgba(0,0,0,0.08)', token: '--breadcrumbs-dropdown-shadow' },
                { property: 'Dropdown menu border radius', value: '3.2px', token: '--input-border-radius' },
                { property: 'Dropdown option padding', value: '8px 12px', token: '--breadcrumbs-dropdown-option-padding' },
                { property: 'Dropdown option hover background', value: 'Dark: #333333 / Light: #f3f4f6', token: '--breadcrumbs-dropdown-option-hover-bg' },
              ].map((row, index) => (
                <tr key={index}>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 'var(--type-scale-s-size)',
                    color: 'var(--foreground)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>{row.property}</td>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 'var(--type-scale-s-size)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-family-mono)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>{row.value}</td>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 'var(--type-scale-s-size)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-family-mono)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>{row.token}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </section>
    </div>
  );
}