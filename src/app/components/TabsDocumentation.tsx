import React, { useState } from 'react';
import { Tabs } from './Tabs';
import { Settings, User, Bell, Shield } from 'lucide-react';

export function TabsDocumentation() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="tabs-documentation">
      <style>{`
        .tabs-documentation {
          --tabs-doc-padding: 48px;
          --tabs-doc-max-width: 1200px;
          --tabs-doc-font-family: "Inter", sans-serif;
          padding: var(--tabs-doc-padding);
          max-width: var(--tabs-doc-max-width);
          font-family: var(--tabs-doc-font-family);
          box-sizing: border-box;
        }

        .demo-content {
          padding: 24px;
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          margin-top: 16px;
        }

        .demo-section {
          margin-bottom: 16px;
        }

        .demo-section h4 {
          margin-bottom: 8px;
          color: var(--foreground);
        }

        .demo-section p {
          color: var(--muted-foreground);
          font-size: var(--type-scale-s-size);
          line-height: var(--type-scale-s-line-height);
          margin: 0;
        }

        .icon-tab-label {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ marginBottom: '16px' }}>Tabs</h1>
        <p style={{ 
          fontSize: 'var(--type-scale-l-size)',
          lineHeight: 'var(--type-scale-l-line-height)',
          color: 'var(--muted-foreground)',
          marginBottom: '24px'
        }}>
          A tabs component for organizing and navigating between different content sections. Features keyboard navigation, accessibility support, and smooth content transitions.
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
          borderRadius: '8px'
        }}>
          <Tabs
            tabs={[
              {
                id: 'overview',
                label: 'Overview',
                content: (
                  <div className="demo-content">
                    <div className="demo-section">
                      <h4>Overview Content</h4>
                      <p>This is the overview tab. It contains general information about the component.</p>
                    </div>
                    <div className="demo-section">
                      <p>
                        The Tabs component provides a way to organize content into separate views where only one view is visible at a time.
                      </p>
                    </div>
                  </div>
                )
              },
              {
                id: 'features',
                label: 'Features',
                content: (
                  <div className="demo-content">
                    <div className="demo-section">
                      <h4>Key Features</h4>
                      <ul style={{ color: 'var(--muted-foreground)', fontSize: 'var(--type-scale-s-size)' }}>
                        <li>Keyboard navigation with arrow keys</li>
                        <li>Smooth fade-in animations</li>
                        <li>Full accessibility support</li>
                        <li>Disabled tab states</li>
                        <li>Customizable content</li>
                      </ul>
                    </div>
                  </div>
                )
              },
              {
                id: 'settings',
                label: 'Settings',
                content: (
                  <div className="demo-content">
                    <div className="demo-section">
                      <h4>Configuration Settings</h4>
                      <p>Configure the tabs component with various options including default active tab, change callbacks, and custom styling.</p>
                    </div>
                  </div>
                )
              },
              {
                id: 'disabled',
                label: 'Disabled',
                content: null,
                disabled: true
              }
            ]}
            defaultTab="overview"
            onTabChange={(tabId) => setActiveTab(tabId)}
          />
        </div>
      </section>

      {/* Tabs with Icons */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Tabs with Icons</h2>
        <div style={{
          padding: '32px',
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px'
        }}>
          <Tabs
            tabs={[
              {
                id: 'profile',
                label: (
                  <span className="icon-tab-label">
                    <User size={14} />
                    Profile
                  </span>
                ) as any,
                content: (
                  <div className="demo-content">
                    <div className="demo-section">
                      <h4>User Profile</h4>
                      <p>Manage your personal information and preferences.</p>
                    </div>
                  </div>
                )
              },
              {
                id: 'notifications',
                label: (
                  <span className="icon-tab-label">
                    <Bell size={14} />
                    Notifications
                  </span>
                ) as any,
                content: (
                  <div className="demo-content">
                    <div className="demo-section">
                      <h4>Notification Settings</h4>
                      <p>Control how and when you receive notifications.</p>
                    </div>
                  </div>
                )
              },
              {
                id: 'security',
                label: (
                  <span className="icon-tab-label">
                    <Shield size={14} />
                    Security
                  </span>
                ) as any,
                content: (
                  <div className="demo-content">
                    <div className="demo-section">
                      <h4>Security Settings</h4>
                      <p>Manage passwords, two-factor authentication, and security preferences.</p>
                    </div>
                  </div>
                )
              },
              {
                id: 'advanced',
                label: (
                  <span className="icon-tab-label">
                    <Settings size={14} />
                    Advanced
                  </span>
                ) as any,
                content: (
                  <div className="demo-content">
                    <div className="demo-section">
                      <h4>Advanced Settings</h4>
                      <p>Configure advanced options and developer settings.</p>
                    </div>
                  </div>
                )
              }
            ]}
            defaultTab="profile"
          />
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

        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
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
                  Element
                </th>
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
              </tr>
            </thead>
            <tbody>
              {[
                { element: 'Container (TabsList)', property: 'Background', value: 'transparent' },
                { element: 'Container (TabsList)', property: 'Border Bottom', value: 'Dark: 1px solid #2a2a35 / Light: 1px solid #e5e7eb' },
                { element: 'Container (TabsList)', property: 'Display', value: 'flex' },
                { element: 'Container (TabsList)', property: 'Gap', value: '2px' },
                { element: 'Container (TabsList)', property: 'Padding', value: '0' },
                { element: 'Tab Trigger', property: 'Padding', value: '10px 16px' },
                { element: 'Tab Trigger', property: 'Font Size', value: '13px' },
                { element: 'Tab Trigger', property: 'Font Weight', value: '500 (medium)' },
                { element: 'Tab Trigger', property: 'Letter Spacing', value: '0.05em' },
                { element: 'Tab Trigger', property: 'Border Bottom', value: '2px solid transparent (layout placeholder)' },
                { element: 'Tab Trigger', property: 'Background', value: 'transparent' },
                { element: 'Tab Trigger - Default', property: 'Text Color', value: 'Dark: #9b9ba5 / Light: #6b7280' },
                { element: 'Tab Trigger - Hover', property: 'Text Color', value: 'Dark: #ffffff / Light: #111827' },
                { element: 'Tab Trigger - Hover', property: 'Background', value: 'Dark: #1f1f28 / Light: #f8f9fa' },
                { element: 'Tab Trigger - Active', property: 'Text Color', value: 'Dark: #ffffff / Light: #111827' },
                { element: 'Tab Trigger - Active', property: 'Active Indicator', value: '2px ::after bar, inset left/right 20px — text width + 4px breathing room each side' },
                { element: 'Tab Trigger - Active', property: 'Indicator Color', value: 'Dark: #3d63dd / Light: #2563eb' },
                { element: 'Tab Trigger - Active', property: 'Indicator Animation', value: 'scaleX 200ms ease (slide in)' },
                { element: 'Tab Trigger - Focus', property: 'Ring', value: 'Dark: 2px rgba(111, 139, 230, 0.25) / Light: 2px rgba(37, 99, 235, 0.20)' },
                { element: 'Tab Trigger - Disabled', property: 'Text Color', value: 'Dark: #A1A1A8 / Light: #d1d5db' },
                { element: 'Tab Trigger - Disabled', property: 'Opacity', value: '0.5' },
                { element: 'Tab Content', property: 'Padding Top', value: '24px' },
                { element: 'Tab Content', property: 'Animation', value: 'Fade in 150ms' },
                { element: 'Transition', property: 'Duration', value: '150ms ease' }
              ].map((row, index) => (
                <tr key={index}>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 'var(--type-scale-s-size)',
                    color: 'var(--foreground)',
                    borderBottom: '1px solid var(--border-default)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}>
                    {row.element}
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 'var(--type-scale-s-size)',
                    color: 'var(--foreground)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>
                    {row.property}
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 'var(--type-scale-s-size)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-family-mono)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Usage Guidelines</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}>
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--color-green-800)',
            borderRadius: '8px'
          }}>
            <h4 style={{ 
              color: 'var(--color-green-400)', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                width: '16px',
                height: '16px',
                backgroundColor: 'var(--color-green-600)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: 'white'
              }}>✓</span>
              Do
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              margin: 0,
              color: 'var(--foreground)'
            }}>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Use tabs for organizing related content
              </li>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Keep tab labels short and descriptive
              </li>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Limit the number of tabs to 5-7 for better UX
              </li>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Use icons with labels for better recognition
              </li>
              <li style={{ fontSize: 'var(--type-scale-s-size)' }}>
                • Provide keyboard navigation support
              </li>
            </ul>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--color-red-700)',
            borderRadius: '8px'
          }}>
            <h4 style={{ 
              color: 'var(--color-red-400)', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                width: '16px',
                height: '16px',
                backgroundColor: 'var(--color-red-600)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: 'white'
              }}>✕</span>
              Don't
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              margin: 0,
              color: 'var(--foreground)'
            }}>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Use tabs for sequential workflows (use a stepper)
              </li>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Nest tabs within tabs (confusing navigation)
              </li>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Use long labels that wrap to multiple lines
              </li>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Disable the currently active tab
              </li>
              <li style={{ fontSize: 'var(--type-scale-s-size)' }}>
                • Have too many tabs that require scrolling
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 style={{ marginBottom: '24px' }}>Accessibility</h2>
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          padding: '24px'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '12px' }}>ARIA Attributes</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--type-scale-s-line-height)',
              marginBottom: '8px'
            }}>
              The tabs component uses proper ARIA roles and attributes:
            </p>
            <ul style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              <li><code>role="tablist"</code> on the container</li>
              <li><code>role="tab"</code> on each trigger</li>
              <li><code>role="tabpanel"</code> on each content area</li>
              <li><code>aria-selected</code> to indicate active tab</li>
              <li><code>aria-controls</code> to link tabs to their panels</li>
            </ul>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '12px' }}>Keyboard Navigation</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--type-scale-s-line-height)',
              marginBottom: '8px'
            }}>
              Full keyboard support for navigation:
            </p>
            <ul style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              <li><strong>Arrow Left/Right:</strong> Navigate between tabs</li>
              <li><strong>Home:</strong> Jump to first tab</li>
              <li><strong>End:</strong> Jump to last tab</li>
              <li><strong>Tab:</strong> Move focus in/out of tab list</li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '12px' }}>Focus Management</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              Only the selected tab is in the tab order (tabindex="0"), while inactive tabs have tabindex="-1" for proper roving tabindex behavior. Focus indicators are clearly visible with a ring style.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}