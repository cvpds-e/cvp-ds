import React from 'react';
import { Accordion, AccordionItem } from './Accordion';
import { Settings, Lock, Bell, Zap, Database, Users } from 'lucide-react';

export function AccordionDocumentation() {
  const basicItems: AccordionItem[] = [
    {
      id: 'base',
      title: 'Base',
      content: (
        <div>
          <p style={{ marginBottom: 'var(--spacing-4)' }}>
            Base configuration settings for the application. This section contains fundamental setup options that affect the overall behavior of the system.
          </p>
          <ul style={{ paddingLeft: 'var(--spacing-5)', color: 'var(--muted-foreground)' }}>
            <li>Application name and description</li>
            <li>Default language settings</li>
            <li>Base URL configuration</li>
            <li>Core feature toggles</li>
          </ul>
        </div>
      )
    },
    {
      id: 'content-query',
      title: 'Content Query',
      content: (
        <div>
          <p style={{ marginBottom: 'var(--spacing-4)' }}>
            Configure how content is queried and retrieved from the system. These settings control data fetching behavior and query optimization.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--spacing-3)', 
            marginTop: 'var(--spacing-4)',
            padding: 'var(--spacing-3)',
            backgroundColor: 'var(--muted)',
            borderRadius: 'var(--radius-md)'
          }}>
            <button style={{
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: 'var(--secondary)',
              color: 'var(--foreground)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: 'var(--type-scale-s-size)'
            }}>
              Base Query
            </button>
            <button style={{
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: 'transparent',
              color: 'var(--muted-foreground)',
              border: 'var(--table-border)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: 'var(--type-scale-s-size)'
            }}>
              Segment Query
            </button>
          </div>
        </div>
      )
    }
  ];

  const stateItems: AccordionItem[] = [
    {
      id: 'enabled',
      title: 'Enabled Section',
      content: (
        <div>
          <p>This section is enabled and can be expanded.</p>
        </div>
      )
    },
    {
      id: 'disabled',
      title: 'Disabled Section',
      content: (
        <div>
          <p>This section is disabled and cannot be expanded.</p>
        </div>
      ),
      disabled: true
    }
  ];

  const iconItems: AccordionItem[] = [
    {
      id: 'general',
      title: 'General Settings',
      icon: <Settings size={16} />,
      content: (
        <div>
          <p style={{ marginBottom: 'var(--spacing-4)' }}>
            General application settings and preferences including language, timezone, and display options.
          </p>
          <ul style={{ paddingLeft: 'var(--spacing-5)', color: 'var(--muted-foreground)' }}>
            <li>Language preferences</li>
            <li>Timezone configuration</li>
            <li>Display density options</li>
          </ul>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Lock size={16} />,
      content: (
        <div>
          <p style={{ marginBottom: 'var(--spacing-4)' }}>
            Security configurations and access control settings for protecting your account and data.
          </p>
          <ul style={{ paddingLeft: 'var(--spacing-5)', color: 'var(--muted-foreground)' }}>
            <li>Two-factor authentication</li>
            <li>Password requirements</li>
            <li>Session management</li>
          </ul>
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={16} />,
      content: (
        <div>
          <p style={{ marginBottom: 'var(--spacing-4)' }}>
            Notification preferences and delivery settings for staying informed about important updates.
          </p>
          <ul style={{ paddingLeft: 'var(--spacing-5)', color: 'var(--muted-foreground)' }}>
            <li>Email notifications</li>
            <li>Push notifications</li>
            <li>Notification frequency</li>
          </ul>
        </div>
      )
    }
  ];

  const primaryIconItems: AccordionItem[] = [
    {
      id: 'performance',
      title: 'Performance',
      icon: <Zap size={16} />,
      iconColor: 'primary',
      content: (
        <div>
          <p style={{ marginBottom: 'var(--spacing-4)' }}>
            Performance optimization settings to enhance the speed and efficiency of the application.
          </p>
          <ul style={{ paddingLeft: 'var(--spacing-5)', color: 'var(--muted-foreground)' }}>
            <li>Caching strategies</li>
            <li>Resource loading optimization</li>
            <li>Background processing</li>
          </ul>
        </div>
      )
    },
    {
      id: 'database',
      title: 'Database',
      icon: <Database size={16} />,
      iconColor: 'primary',
      content: (
        <div>
          <p style={{ marginBottom: 'var(--spacing-4)' }}>
            Database configuration and management settings for storing and retrieving data.
          </p>
          <ul style={{ paddingLeft: 'var(--spacing-5)', color: 'var(--muted-foreground)' }}>
            <li>Connection settings</li>
            <li>Schema management</li>
            <li>Backup and recovery</li>
          </ul>
        </div>
      )
    },
    {
      id: 'users',
      title: 'Users',
      icon: <Users size={16} />,
      iconColor: 'primary',
      content: (
        <div>
          <p style={{ marginBottom: 'var(--spacing-4)' }}>
            User management and role-based access control settings for managing users and permissions.
          </p>
          <ul style={{ paddingLeft: 'var(--spacing-5)', color: 'var(--muted-foreground)' }}>
            <li>User creation and deletion</li>
            <li>Role assignment</li>
            <li>Permission management</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <>
      <style>{`
        .accordion-documentation {
          padding: var(--doc-padding);
          max-width: var(--doc-max-width);
          font-family: var(--doc-font-family);
          box-sizing: border-box;
        }
      `}</style>

      <div className="accordion-documentation">
        {/* Header */}
        <div style={{ marginBottom: 'var(--doc-section-spacing)' }}>
          <h1 style={{ marginBottom: 'var(--spacing-4)' }}>Accordion</h1>
          <p style={{ 
            fontSize: 'var(--type-scale-l-size)',
            lineHeight: 'var(--type-scale-l-line-height)',
            color: 'var(--muted-foreground)',
            marginBottom: 'var(--doc-item-spacing)'
          }}>
            A vertically stacked set of interactive headings that each reveal a section of content. Perfect for organizing settings, FAQ sections, and hierarchical information. Designed with square corners for seamless integration within panel layouts and structured interfaces.
          </p>
          
          {/* Status badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--status-badge-gap)',
            padding: 'var(--status-badge-padding)',
            backgroundColor: 'var(--color-green-800)',
            color: 'var(--color-green-200)',
            borderRadius: 'var(--status-badge-border-radius)',
            fontSize: 'var(--status-badge-font-size)',
            fontWeight: 'var(--status-badge-font-weight)'
          }}>
            <div style={{
              width: 'var(--status-badge-dot-size)',
              height: 'var(--status-badge-dot-size)',
              backgroundColor: 'var(--color-green-400)',
              borderRadius: '50%'
            }} />
            Stable
          </div>
        </div>

        {/* Live Examples */}
        <section style={{ marginBottom: 'var(--doc-section-spacing)' }}>
          <h2 style={{ marginBottom: 'var(--doc-item-spacing)' }}>Examples</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Basic Example */}
            <div style={{
              padding: 'var(--guidelines-padding)',
              backgroundColor: 'var(--card)',
              border: 'var(--table-border)',
              borderRadius: 'var(--guidelines-border-radius)'
            }}>
              <h4 style={{ marginBottom: 'var(--spacing-4)' }}>Basic Usage (Single Mode)</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                marginBottom: 'var(--spacing-4)'
              }}>
                Only one section can be expanded at a time. Similar to the settings interface shown in the screenshot.
              </p>
              <div style={{ maxWidth: '600px' }}>
                <Accordion 
                  items={basicItems}
                  type="single"
                  defaultExpanded={['content-query']}
                />
              </div>
            </div>

            {/* Multiple Mode Example */}
            <div style={{
              padding: 'var(--guidelines-padding)',
              backgroundColor: 'var(--card)',
              border: 'var(--table-border)',
              borderRadius: 'var(--guidelines-border-radius)'
            }}>
              <h4 style={{ marginBottom: 'var(--spacing-4)' }}>Icon + Text Variant</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                marginBottom: 'var(--spacing-4)'
              }}>
                Accordion items with icons alongside titles for enhanced visual hierarchy and quick scanning.
              </p>
              <div style={{ maxWidth: '600px' }}>
                <Accordion 
                  items={iconItems}
                  type="multiple"
                  defaultExpanded={['general', 'security']}
                />
              </div>
            </div>

            {/* Primary Icon Variant Example */}
            <div style={{
              padding: 'var(--guidelines-padding)',
              backgroundColor: 'var(--card)',
              border: 'var(--table-border)',
              borderRadius: 'var(--guidelines-border-radius)'
            }}>
              <h4 style={{ marginBottom: 'var(--spacing-4)' }}>Icon + Text Variant (Primary Color)</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                marginBottom: 'var(--spacing-4)'
              }}>
                Icons displayed in the primary color to draw attention to important sections.
              </p>
              <div style={{ maxWidth: '600px' }}>
                <Accordion 
                  items={primaryIconItems}
                  type="multiple"
                  defaultExpanded={['performance']}
                />
              </div>
            </div>

            {/* States Example */}
            <div style={{
              padding: 'var(--guidelines-padding)',
              backgroundColor: 'var(--card)',
              border: 'var(--table-border)',
              borderRadius: 'var(--guidelines-border-radius)'
            }}>
              <h4 style={{ marginBottom: 'var(--spacing-4)' }}>Disabled State</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                marginBottom: 'var(--spacing-4)'
              }}>
                Individual items or the entire accordion can be disabled.
              </p>
              <div style={{ maxWidth: '600px' }}>
                <Accordion 
                  items={stateItems}
                  type="single"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section style={{ marginBottom: 'var(--doc-section-spacing)' }}>
          <h2 style={{ marginBottom: 'var(--doc-item-spacing)' }}>Specifications</h2>
          <div style={{
            backgroundColor: 'var(--card)',
            border: 'var(--table-border)',
            borderRadius: 'var(--guidelines-border-radius)',
            overflow: 'hidden'
          }}>
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
                  { property: 'Border Radius', value: '0px', token: '--accordion-item-radius' },
                  { property: 'Header Padding', value: '12px 16px', token: '--accordion-header-padding' },
                  { property: 'Content Padding', value: '16px', token: '--accordion-content-padding' },
                  { property: 'Border Width', value: '1px', token: '--accordion-border-width' },
                  { property: 'Transition Duration', value: '0.2s', token: '--accordion-transition-duration' },
                  { property: 'Icon Size', value: '16px', token: '--accordion-icon-size' },
                  { property: 'Header Font Size', value: '14px', token: '--type-scale-m-size' },
                  { property: 'Header Font Weight', value: '400', token: '--type-scale-m-weight' },
                  { property: 'Header Text Color', value: 'var(--foreground)', token: '--foreground' },
                  { property: 'Header Background', value: 'var(--card)', token: '--card' },
                  { property: 'Header Hover Background', value: 'var(--muted)', token: '--muted' },
                  { property: 'Content Background', value: 'var(--card)', token: '--card' },
                  { property: 'Content Text Color', value: 'var(--foreground)', token: '--foreground' },
                  { property: 'Border Color', value: 'var(--border-default)', token: '--border' },
                  { property: 'Icon Color', value: 'var(--muted-foreground)', token: '--muted-foreground' },
                  { property: 'Disabled Opacity', value: '0.5', token: 'N/A' },
                  { property: 'Focus Ring', value: '2px solid var(--focus-ring)', token: '--focus-ring' },
                  { property: 'Transition Function', value: 'cubic-bezier(0.4, 0, 0.2, 1)', token: '--default-transition-timing-function' }
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
        </section>

        {/* Usage Guidelines */}
        <section style={{ marginBottom: 'var(--doc-section-spacing)' }}>
          <h2 style={{ marginBottom: 'var(--doc-item-spacing)' }}>Usage Guidelines</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--guidelines-grid-gap)'
          }}>
            <div style={{
              padding: 'var(--guidelines-padding)',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--color-green-800)',
              borderRadius: 'var(--guidelines-border-radius)'
            }}>
              <h4 style={{ 
                color: 'var(--color-green-400)', 
                marginBottom: 'var(--spacing-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--status-badge-gap)'
              }}>
                <span style={{
                  width: 'var(--guidelines-icon-size)',
                  height: 'var(--guidelines-icon-size)',
                  backgroundColor: 'var(--color-green-600)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--guidelines-dot-size)',
                  color: 'white'
                }}>✓</span>
                Best Practices
              </h4>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                margin: 0,
                color: 'var(--foreground)'
              }}>
                <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                  • Use for settings panels and configuration sections within square layouts
                </li>
                <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                  • Keep section titles concise and descriptive
                </li>
                <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                  • Use single mode for mutually exclusive sections
                </li>
                <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                  • Group related content logically within sections
                </li>
                <li style={{ fontSize: 'var(--type-scale-s-size)' }}>
                  • Consider initial expanded state for important sections
                </li>
              </ul>
            </div>

            <div style={{
              padding: 'var(--guidelines-padding)',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--color-red-700)',
              borderRadius: 'var(--guidelines-border-radius)'
            }}>
              <h4 style={{ 
                color: 'var(--color-red-400)', 
                marginBottom: 'var(--spacing-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--status-badge-gap)'
              }}>
                <span style={{
                  width: 'var(--guidelines-icon-size)',
                  height: 'var(--guidelines-icon-size)',
                  backgroundColor: 'var(--color-red-600)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--guidelines-dot-size)',
                  color: 'white'
                }}>✕</span>
                Avoid
              </h4>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                margin: 0,
                color: 'var(--foreground)'
              }}>
                <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                  • Don't use for simple lists that don't need grouping
                </li>
                <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                  • Avoid too many nested accordions
                </li>
                <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                  • Don't use for critical actions that need immediate visibility
                </li>
                <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                  • Avoid extremely long section titles
                </li>
                <li style={{ fontSize: 'var(--type-scale-s-size)' }}>
                  • Don't hide essential information behind accordions
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <h2 style={{ marginBottom: 'var(--doc-item-spacing)' }}>Accessibility</h2>
          <div style={{
            backgroundColor: 'var(--card)',
            border: 'var(--table-border)',
            borderRadius: 'var(--guidelines-border-radius)',
            padding: 'var(--guidelines-padding)'
          }}>
            <div style={{ marginBottom: 'var(--spacing-5)' }}>
              <h4 style={{ marginBottom: 'var(--spacing-3)' }}>Keyboard Navigation</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--type-scale-s-line-height)',
                marginBottom: 'var(--spacing-2)'
              }}>
                Full keyboard support for navigation and interaction.
              </p>
              <ul style={{
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--muted-foreground)',
                paddingLeft: 'var(--spacing-5)',
                margin: 0
              }}>
                <li>Tab: Navigate between accordion headers</li>
                <li>Enter/Space: Toggle accordion panel</li>
                <li>Arrow Keys: Navigate between accordion items</li>
                <li>Home/End: Jump to first/last accordion item</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: 'var(--spacing-5)' }}>
              <h4 style={{ marginBottom: 'var(--spacing-3)' }}>Screen Reader Support</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                Uses proper ARIA attributes including aria-expanded, aria-controls, and role="region" to communicate the accordion state and structure to assistive technologies.
              </p>
            </div>

            <div>
              <h4 style={{ marginBottom: 'var(--spacing-3)' }}>Focus Management</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                Clear focus indicators and proper focus management ensure the accordion is accessible to keyboard users. Focus remains on the header after toggling.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}