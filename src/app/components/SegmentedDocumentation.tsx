import React, { useState } from 'react';
import { Segmented, SegmentedOption } from './Segmented';

export function SegmentedDocumentation() {
  const [basicValue, setBasicValue] = useState('option1');
  const [sizeValue, setSizeValue] = useState('medium');
  const [statusValue, setStatusValue] = useState('active');
  const [manyOptionsValue, setManyOptionsValue] = useState('home');
  const [tabsValue, setTabsValue] = useState('orders');
  const [fullWidthValue, setFullWidthValue] = useState('list');
  const [colorValue, setColorValue] = useState('analytics');

  const basicOptions: SegmentedOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const sizeOptions: SegmentedOption[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const statusOptions: SegmentedOption[] = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ];

  const manyOptions: SegmentedOption[] = [
    { value: 'home', label: 'Home' },
    { value: 'browse', label: 'Browse' },
    { value: 'search', label: 'Search' },
    { value: 'favorites', label: 'Favorites' },
    { value: 'history', label: 'History' },
  ];

  const tabOptions: SegmentedOption[] = [
    { value: 'orders', label: 'Orders' },
    { value: 'drafts', label: 'Drafts' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'archived', label: 'Archived' },
  ];

  const fullWidthOptions: SegmentedOption[] = [
    { value: 'list', label: 'List View' },
    { value: 'grid', label: 'Grid View' },
  ];

  const colorOptions: SegmentedOption[] = [
    { value: 'analytics', label: 'Analytics' },
    { value: 'insights', label: 'Insights' },
    { value: 'reports', label: 'Reports' },
  ];

  return (
    <>
      <style>{`
        .segmented-documentation {
          padding: var(--doc-padding);
          max-width: var(--doc-max-width);
          font-family: var(--doc-font-family);
          box-sizing: border-box;
        }

        .full-width-container {
          width: 100%;
          max-width: 400px;
        }

        .full-width-container .segmented {
          width: 100%;
        }
      `}</style>

      <div className="segmented-documentation">
        {/* Header */}
        <div style={{ marginBottom: 'var(--doc-section-spacing)' }}>
          <h1 style={{ marginBottom: 'var(--spacing-4)' }}>Segmented</h1>
          <p style={{ 
            fontSize: 'var(--type-scale-l-size)',
            lineHeight: 'var(--type-scale-l-line-height)',
            color: 'var(--muted-foreground)',
            marginBottom: 'var(--doc-item-spacing)'
          }}>
            A segmented control component that allows users to select one option from a set of mutually exclusive choices. Features comprehensive design system tokens, multiple sizes, and accessibility support.
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
            <h4 style={{ marginBottom: 'var(--spacing-4)' }}>Basic Usage</h4>
            <div style={{ marginBottom: 'var(--spacing-4)' }}>
              <Segmented
                options={basicOptions}
                value={basicValue}
                onChange={setBasicValue}
              />
            </div>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              margin: 0
            }}>
              Selected: <span style={{ color: 'var(--foreground)', fontWeight: '500' }}>{basicValue}</span>
            </p>
          </div>

          {/* Color Variant Example */}
          <div style={{
            padding: 'var(--guidelines-padding)',
            backgroundColor: 'var(--card)',
            border: 'var(--table-border)',
            borderRadius: 'var(--guidelines-border-radius)'
          }}>
            <h4 style={{ marginBottom: 'var(--spacing-4)' }}>Color Variant</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--spacing-4)'
            }}>
              The color variant features a #252528 container background and #3d63dd background for the active tab, perfect for highlighting important navigation or primary actions.
            </p>
            <div style={{ marginBottom: 'var(--spacing-4)' }}>
              <Segmented
                options={colorOptions}
                value={colorValue}
                onChange={setColorValue}
                variant="color"
              />
            </div>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              margin: 0
            }}>
              Selected: <span style={{ color: 'var(--foreground)', fontWeight: '500' }}>{colorValue}</span>
            </p>
          </div>

          {/* Size Variants */}
          <div style={{
            padding: 'var(--guidelines-padding)',
            backgroundColor: 'var(--card)',
            border: 'var(--table-border)',
            borderRadius: 'var(--guidelines-border-radius)'
          }}>
            <h4 style={{ marginBottom: 'var(--spacing-4)' }}>Size Variants</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              <div>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: 'var(--spacing-2)', color: 'var(--muted-foreground)' }}>Small</p>
                <Segmented
                  options={sizeOptions}
                  value={sizeValue}
                  onChange={setSizeValue}
                  size="small"
                />
              </div>
              <div>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: 'var(--spacing-2)', color: 'var(--muted-foreground)' }}>Medium (Default)</p>
                <Segmented
                  options={sizeOptions}
                  value={sizeValue}
                  onChange={setSizeValue}
                  size="medium"
                />
              </div>
              <div>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: 'var(--spacing-2)', color: 'var(--muted-foreground)' }}>Large</p>
                <Segmented
                  options={sizeOptions}
                  value={sizeValue}
                  onChange={setSizeValue}
                  size="large"
                />
              </div>
            </div>
          </div>

          {/* Full Width Example */}
          <div style={{
            padding: 'var(--guidelines-padding)',
            backgroundColor: 'var(--card)',
            border: 'var(--table-border)',
            borderRadius: 'var(--guidelines-border-radius)'
          }}>
            <h4 style={{ marginBottom: 'var(--spacing-4)' }}>100% Width (Two Options)</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--spacing-4)'
            }}>
              When there are only 2 options, each tab expands to fill 50% of the allocated space. Perfect for view toggles and binary choices.
            </p>
            <div className="full-width-container" style={{ marginBottom: 'var(--spacing-4)' }}>
              <Segmented
                options={fullWidthOptions}
                value={fullWidthValue}
                onChange={setFullWidthValue}
              />
            </div>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              margin: 0
            }}>
              Selected: <span style={{ color: 'var(--foreground)', fontWeight: '500' }}>{fullWidthValue}</span>
            </p>
          </div>

          {/* States Example */}
          <div style={{
            padding: 'var(--guidelines-padding)',
            backgroundColor: 'var(--card)',
            border: 'var(--table-border)',
            borderRadius: 'var(--guidelines-border-radius)'
          }}>
            <h4 style={{ marginBottom: 'var(--spacing-4)' }}>Disabled Options</h4>
            <div style={{ marginBottom: 'var(--spacing-4)' }}>
              <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: 'var(--spacing-2)', color: 'var(--muted-foreground)' }}>Individual options can be disabled</p>
              <Segmented
                options={statusOptions}
                value={statusValue}
                onChange={setStatusValue}
              />
            </div>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              margin: 0
            }}>
              Selected: <span style={{ color: 'var(--foreground)', fontWeight: '500' }}>{statusValue}</span>
            </p>
          </div>

          {/* Many Options Example */}
          <div style={{
            padding: 'var(--guidelines-padding)',
            backgroundColor: 'var(--card)',
            border: 'var(--table-border)',
            borderRadius: 'var(--guidelines-border-radius)'
          }}>
            <h4 style={{ marginBottom: 'var(--spacing-4)' }}>Multiple Options</h4>
            <div style={{ marginBottom: 'var(--spacing-4)' }}>
              <Segmented
                options={manyOptions}
                value={manyOptionsValue}
                onChange={setManyOptionsValue}
              />
            </div>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              margin: 0
            }}>
              Selected: <span style={{ color: 'var(--foreground)', fontWeight: '500' }}>{manyOptionsValue}</span>
            </p>
          </div>

          {/* With Actions Example */}
          <div style={{
            padding: 'var(--guidelines-padding)',
            backgroundColor: 'var(--card)',
            border: 'var(--table-border)',
            borderRadius: 'var(--guidelines-border-radius)'
          }}>
            <h4 style={{ marginBottom: 'var(--spacing-4)' }}>With Actions</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--spacing-4)'
            }}>
              Segmented controls can be combined with icon action buttons for workflows where users need to both navigate and create.
            </p>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-3)',
              marginBottom: 'var(--spacing-4)'
            }}>
              <Segmented
                options={tabOptions}
                value={tabsValue}
                onChange={setTabsValue}
              />
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'var(--icon-btn-size)',
                  height: 'var(--icon-btn-size)',
                  backgroundColor: 'var(--icon-btn-bg)',
                  color: 'var(--icon-btn-text)',
                  border: 'none',
                  borderRadius: 'var(--icon-btn-border-radius)',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'var(--btn-transition)',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--icon-btn-hover-bg)';
                  e.currentTarget.style.color = 'var(--icon-btn-hover-text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--icon-btn-bg)';
                  e.currentTarget.style.color = 'var(--icon-btn-text)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--icon-btn-active-bg)';
                  e.currentTarget.style.color = 'var(--icon-btn-active-text)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--icon-btn-hover-bg)';
                  e.currentTarget.style.color = 'var(--icon-btn-hover-text)';
                }}
                onClick={() => alert('Add new item')}
                title="Add new item"
              >
                +
              </button>
            </div>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              margin: 0
            }}>
              Selected: <span style={{ color: 'var(--foreground)', fontWeight: '500' }}>{tabsValue}</span>
            </p>
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
                { property: 'Container Border Radius', value: '6px', token: '--segmented-container-radius' },
                { property: 'Container Background (Default)', value: '#19191a', token: '--background' },
                { property: 'Container Background (Color)', value: '#252528', token: '--segmented-color-container-bg' },
                { property: 'Container Gap', value: '2px', token: '--segmented-gap' },
                { property: 'Small Font Size', value: '13px', token: '--type-scale-s-size' },
                { property: 'Small Line Height', value: '20px', token: '--type-scale-s-line-height' },
                { property: 'Small Padding', value: '4px 12px', token: '--segmented-small-padding' },
                { property: 'Medium Font Size', value: '14px', token: '--type-scale-m-size' },
                { property: 'Medium Line Height', value: '20px', token: '--type-scale-m-line-height' },
                { property: 'Medium Padding', value: '6px 16px', token: '--segmented-medium-padding' },
                { property: 'Large Font Size', value: '15px', token: '--type-scale-l-size' },
                { property: 'Large Line Height', value: '22px', token: '--type-scale-l-line-height' },
                { property: 'Large Padding', value: '12px 20px', token: '--segmented-large-padding' },
                { property: 'Default Font Weight', value: '400', token: '--type-scale-m-weight' },
                { property: 'Selected Font Weight', value: '400', token: '--type-scale-m-weight' },
                { property: 'Letter Spacing', value: '0.15px', token: '--type-scale-m-letter-spacing' },
                { property: 'Default Text Color', value: '#bbbbbb', token: '--segmented-default-text' },
                { property: 'Default Background', value: 'transparent', token: 'N/A' },
                { property: 'Hover Background', value: '#292a2e', token: '--segmented-hover-bg' },
                { property: 'Hover Border Radius', value: '6px', token: '--segmented-item-radius' },
                { property: 'Active Background', value: '#292a2e', token: '--segmented-hover-bg' },
                { property: 'Active Border Radius', value: '6px', token: '--segmented-item-radius' },
                { property: 'Selected Background (Default)', value: '#292a2e', token: '--segmented-selected-bg' },
                { property: 'Selected Background (Color)', value: '#3d63dd', token: '--segmented-color-selected-bg' },
                { property: 'Selected Text Color (Default)', value: '#ffffff', token: '--foreground' },
                { property: 'Selected Text Color (Color)', value: '#ffffff', token: '--segmented-color-selected-text' },
                { property: 'Color Hover Background', value: 'rgba(61, 99, 221, 0.1)', token: '--segmented-color-hover-bg' },
                { property: 'Selected Border Radius', value: '6px', token: '--segmented-item-radius' },
                { property: 'Selected Box Shadow', value: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)', token: 'N/A' },
                { property: 'Disabled Text Color', value: '#bbbbbb', token: '--segmented-disabled-text' },
                { property: 'Focus Ring', value: '2px solid #67b3fb', token: '--focus-ring' },
                { property: 'Focus Ring Offset', value: '2px', token: 'N/A' },
                { property: 'Focus Border Radius', value: '6px', token: '--segmented-item-radius' },
                { property: 'Transition', value: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)', token: '--segmented-transition' }
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
                • Use for mutually exclusive options (like toggle switches)
              </li>
              <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                • Keep option labels concise and descriptive
              </li>
              <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                • Use 2-5 options for optimal usability
              </li>
              <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                • Provide clear visual feedback for selected state
              </li>
              <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                • Use consistent sizing within the same interface
              </li>
              <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                • Use full-width for binary choices like view toggles
              </li>
              <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                • Use color variant for important navigation or primary actions
              </li>
              <li style={{ fontSize: 'var(--type-scale-s-size)' }}>
                • Combine with icon action buttons for creation workflows
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
                • Using for multiple selections (use checkboxes instead)
              </li>
              <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                • Having too many options (6+ segments)
              </li>
              <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                • Using very long labels that cause wrapping
              </li>
              <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                • Mixing different sizes in the same context
              </li>
              <li style={{ marginBottom: 'var(--spacing-2)', fontSize: 'var(--type-scale-s-size)' }}>
                • Overusing the color variant (use sparingly for emphasis)
              </li>
              <li style={{ fontSize: 'var(--type-scale-s-size)' }}>
                • Using for navigation with complex hierarchies
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
              The segmented control supports full keyboard navigation for accessibility compliance.
            </p>
            <ul style={{
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              paddingLeft: 'var(--spacing-5)',
              margin: 0
            }}>
              <li>Tab: Enter/exit the segmented control</li>
              <li>Arrow keys: Navigate between segments</li>
              <li>Space/Enter: Select the focused segment</li>
              <li>Escape: Exit the control</li>
            </ul>
          </div>
          
          <div style={{ marginBottom: 'var(--spacing-5)' }}>
            <h4 style={{ marginBottom: 'var(--spacing-3)' }}>Screen Reader Support</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              Uses proper ARIA roles and states (tablist, tab, aria-selected) to communicate the control's purpose and current state to assistive technologies. Selected state and disabled options are properly announced.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: 'var(--spacing-3)' }}>Focus Management</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--type-scale-s-line-height)',
              marginBottom: 'var(--spacing-3)'
            }}>
              Clear focus indicators with proper contrast ratios ensure keyboard users can easily identify which segment is currently focused.
            </p>
            <div style={{
              backgroundColor: 'var(--muted)',
              padding: 'var(--spacing-3)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              fontFamily: 'var(--font-family-mono)'
            }}>
              outline: 2px solid #67b3fb;<br />
              outline-offset: 2px;
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}