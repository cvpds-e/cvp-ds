import React, { useState } from 'react';
import { MultiSelect, type MultiSelectOption } from './MultiSelect';

const sampleOptions: MultiSelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'ember', label: 'Ember.js' },
  { value: 'backbone', label: 'Backbone.js' },
  { value: 'jquery', label: 'jQuery' },
  { value: 'vanilla', label: 'Vanilla JavaScript' },
];

const frameworkOptions: MultiSelectOption[] = [
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxtjs', label: 'Nuxt.js' },
  { value: 'gatsby', label: 'Gatsby' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'remix', label: 'Remix' },
  { value: 'vite', label: 'Vite' },
  { value: 'parcel', label: 'Parcel' },
  { value: 'webpack', label: 'Webpack', disabled: true },
];

export function MultiSelectDocumentation() {
  const [basicValue, setBasicValue] = useState<string[]>([]);
  const [controlledValue, setControlledValue] = useState<string[]>(['react', 'vue']);
  const [limitedValue, setLimitedValue] = useState<string[]>([]);
  const [errorValue, setErrorValue] = useState<string[]>([]);

  return (
    <>
      <style>{`
        .multi-select-docs {
          --multi-select-docs-padding: var(--doc-padding);
          --multi-select-docs-max-width: var(--doc-max-width);
          --multi-select-docs-font-family: var(--doc-font-family);
          --multi-select-docs-section-spacing: var(--doc-section-spacing);
          --multi-select-docs-item-spacing: var(--doc-item-spacing);

          padding: var(--multi-select-docs-padding);
          max-width: var(--multi-select-docs-max-width);
          font-family: var(--multi-select-docs-font-family);
          box-sizing: border-box;
        }

        .multi-select-docs__section {
          margin-bottom: var(--multi-select-docs-section-spacing);
        }

        .multi-select-docs__item {
          margin-bottom: var(--multi-select-docs-item-spacing);
        }

        .multi-select-docs__example {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .multi-select-docs__example-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .multi-select-docs__example-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .multi-select-docs__table {
          width: 100%;
          border-collapse: collapse;
          background-color: var(--card);
          border: var(--table-border);
          border-radius: 8px;
          overflow: hidden;
        }

        .multi-select-docs__table th {
          background-color: var(--table-header-bg);
          padding: var(--table-header-padding);
          text-align: left;
          font-weight: var(--table-header-font-weight);
          font-size: var(--table-font-size);
          border-bottom: var(--table-border);
        }

        .multi-select-docs__table td {
          padding: var(--table-cell-padding);
          font-size: var(--table-font-size);
          border-bottom: var(--table-border);
          vertical-align: top;
        }

        .multi-select-docs__table tr:last-child td {
          border-bottom: none;
        }

        .multi-select-docs__table code {
          background-color: var(--muted);
          padding: 2px 4px;
          border-radius: 2px;
          font-family: var(--font-family-mono);
          font-size: 12px;
        }

        .multi-select-docs__status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--status-badge-gap);
          padding: var(--status-badge-padding);
          border-radius: var(--status-badge-border-radius);
          font-size: var(--status-badge-font-size);
          font-weight: var(--status-badge-font-weight);
        }

        .multi-select-docs__status-badge--stable {
          background-color: var(--color-green-800);
          color: var(--color-green-200);
        }

        .multi-select-docs__status-dot {
          width: var(--status-badge-dot-size);
          height: var(--status-badge-dot-size);
          border-radius: 50%;
          background-color: var(--color-green-400);
        }

        .multi-select-docs__guidelines {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--guidelines-grid-gap);
          margin-bottom: var(--multi-select-docs-section-spacing);
        }

        .multi-select-docs__guideline {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: var(--guidelines-border-radius);
          padding: var(--guidelines-padding);
        }

        .multi-select-docs__guideline-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .multi-select-docs__guideline-icon {
          width: var(--guidelines-icon-size);
          height: var(--guidelines-icon-size);
          color: var(--color-green-400);
        }

        .multi-select-docs__guideline-icon--warning {
          color: var(--color-amber-400);
        }

        .multi-select-docs__guideline h4 {
          margin: 0;
          color: var(--foreground);
        }

        .multi-select-docs__guideline ul {
          margin: 0;
          padding-left: 16px;
        }

        .multi-select-docs__guideline li {
          margin-bottom: 4px;
          color: var(--muted-foreground);
        }

        .multi-select-docs__error-message {
          font-size: var(--type-scale-s-size);
          color: var(--destructive);
        }
      `}</style>

      <div className="multi-select-docs">
        {/* Header */}
        <div className="multi-select-docs__section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h1 style={{ margin: 0 }}>Multi Select</h1>
            <div className="multi-select-docs__status-badge multi-select-docs__status-badge--stable">
              <div className="multi-select-docs__status-dot" />
              Stable
            </div>
          </div>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '24px' }}>
            A dropdown component that allows users to select multiple options from a list with search functionality and tag-based display. The component has a fixed height of 32px, matching the Text Input field for consistency across forms.
          </p>
        </div>

        {/* Basic Usage */}
        <div className="multi-select-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Basic Usage</h2>
          <div className="multi-select-docs__example">
            <div className="multi-select-docs__example-item">
              <label>Select JavaScript libraries:</label>
              <MultiSelect
                options={sampleOptions}
                value={basicValue}
                onChange={setBasicValue}
                placeholder="Choose libraries..."
              />
              <div style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>
                Selected: {basicValue.length > 0 ? basicValue.join(', ') : 'None'}
              </div>
            </div>
          </div>
        </div>

        {/* States */}
        <div className="multi-select-docs__section">
          <h2 style={{ marginBottom: '16px' }}>States</h2>
          <div className="multi-select-docs__example">
            <div className="multi-select-docs__example-grid">
              <div className="multi-select-docs__example-item">
                <label>Controlled</label>
                <MultiSelect
                  options={frameworkOptions}
                  value={controlledValue}
                  onChange={setControlledValue}
                  placeholder="Controlled value..."
                />
                <div style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>
                  Value is controlled by parent component
                </div>
              </div>
              <div className="multi-select-docs__example-item">
                <label>With disabled options</label>
                <MultiSelect
                  options={frameworkOptions}
                  placeholder="Some options disabled..."
                />
                <div style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>
                  Webpack option is disabled
                </div>
              </div>
              <div className="multi-select-docs__example-item">
                <label>Disabled</label>
                <MultiSelect
                  options={sampleOptions.slice(0, 4)}
                  defaultValue={['react', 'vue']}
                  disabled
                  placeholder="Disabled..."
                />
              </div>
              <div className="multi-select-docs__example-item">
                <label>Error state</label>
                <MultiSelect
                  options={sampleOptions.slice(0, 4)}
                  value={errorValue}
                  onChange={setErrorValue}
                  error
                  placeholder="Error state..."
                />
                <div className="multi-select-docs__error-message">
                  Please select at least one option
                </div>
              </div>
              <div className="multi-select-docs__example-item">
                <label>Limited selection (max 2)</label>
                <MultiSelect
                  options={sampleOptions}
                  value={limitedValue}
                  onChange={setLimitedValue}
                  maxSelection={2}
                  placeholder="Max 2 selections..."
                />
                <div style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>
                  {limitedValue.length}/2 selections made
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="multi-select-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Specifications</h2>
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
                  { property: 'Font Size', value: '14px', token: '--type-scale-m-size' },
                  { property: 'Font Weight', value: '400', token: '--type-scale-m-weight' },
                  { property: 'Line Height', value: '20px', token: '--type-scale-m-line-height' },
                  { property: 'Letter Spacing', value: '0.15px', token: '--type-scale-m-letter-spacing' },
                  { property: 'Border Radius', value: '6px', token: '--input-border-radius' },
                  { property: 'Min Height', value: '32px', token: '--input-min-height' },
                  { property: 'Fixed Height', value: '32px', token: '--input-min-height' },
                  { property: 'Padding', value: '4px 10px', token: '--input-padding' },
                  { property: 'Background', value: '#212123', token: '--input-bg' },
                  { property: 'Border (Default)', value: '#45454a', token: '--input-border' },
                  { property: 'Border (Hover)', value: '#6f8be6', token: '--input-hover-border' },
                  { property: 'Border (Focus)', value: '2px solid #6f8be6', token: '--input-focus-border' },
                  { property: 'Border (Error)', value: '#e6494e', token: '--input-error-border' },
                  { property: 'Text Color', value: '#ffffff', token: '--input-text' },
                  { property: 'Placeholder Color', value: '#bbbbbb', token: '--input-placeholder' },
                  { property: 'Focus Glow', value: '0 0 0 3px rgba(111, 139, 230, 0.25)', token: '--input-focus-glow' },
                  { property: 'Text Color (Disabled)', value: '#A1A1A8', token: '--input-disabled-text' },
                  { property: 'Transition', value: 'border-color 0.2s ease, box-shadow 0.2s ease', token: '--input-transition' },
                  { property: 'Dropdown Background', value: '#292a2e', token: '--multi-select-dropdown-bg' },
                  { property: 'Dropdown Shadow', value: '0 1px 1px #000', token: '--multi-select-dropdown-shadow' },
                  { property: 'Dropdown Max Height', value: '350px', token: '--multi-select-dropdown-max-height' },
                  { property: 'Option Padding', value: '8px 12px', token: '--multi-select-option-padding' },
                  { property: 'Option Hover Background', value: '#333333', token: '--multi-select-option-hover-bg' },
                  { property: 'Option Selected Background', value: '#45454a', token: '--multi-select-option-selected-bg' },
                  { property: 'Option Selected Text', value: '#ffffff', token: '--multi-select-option-selected-text' },
                  { property: 'Option Disabled Text', value: '#a4a4a4', token: '--multi-select-option-disabled-text' },
                  { property: 'Tag Background', value: '#3d63dd', token: '--multi-select-tag-bg' },
                  { property: 'Tag Text Color', value: '#ffffff', token: '--multi-select-tag-text' },
                  { property: 'Tag Border Radius', value: '4px', token: '--multi-select-tag-border-radius' },
                  { property: 'Tag Padding', value: '2px 8px', token: '--multi-select-tag-padding' },
                  { property: 'Tag Gap', value: '4px', token: '--multi-select-tag-gap' },
                  { property: 'Tag Font Size', value: '14px', token: '--type-scale-m-size' },
                  { property: 'Tag Font Weight', value: '400', token: '--type-scale-m-weight' },
                  { property: 'Tag Line Height', value: '20px', token: '--type-scale-m-line-height' },
                  { property: 'Tag Letter Spacing', value: '+0.15px', token: '--type-scale-m-letter-spacing' },
                  { property: 'Tag Max Width', value: '150px', token: '—' },
                  { property: 'Header Padding', value: '8px 12px', token: '--multi-select-header-padding' },
                  { property: 'Header Background', value: '#292a2e', token: '--multi-select-header-bg' },
                  { property: 'Create Value Background', value: '#292a2e', token: '--multi-select-create-value-bg' },
                  { property: 'Create Value Hover Background', value: '#333333', token: '--multi-select-create-value-hover-bg' },
                  { property: 'Action Button Color', value: '#97a9de', token: '--multi-select-action-btn-color' },
                  { property: 'Action Button Hover Color', value: '#cdd7f6', token: '--multi-select-action-btn-hover-color' },
                  { property: 'Action Button Font Size', value: '14px', token: '--type-scale-m-size' },
                  { property: 'Action Button Font Weight', value: '500', token: '--type-scale-m-medium-weight' },
                  { property: 'Action Button Line Height', value: '20px', token: '--type-scale-m-line-height' },
                  { property: 'Action Button Letter Spacing', value: '+0.15px', token: '--type-scale-m-letter-spacing' },
                  { property: 'Tag Remove Icon Size', value: '16px × 16px', token: '--multi-select-tag-remove-size' },
                  { property: 'Tag Remove Hover Background', value: 'rgba(255, 255, 255, 0.2)', token: '--multi-select-tag-remove-hover-bg' },
                  { property: 'Clear Icon Size', value: '16px × 16px', token: '--multi-select-clear-icon-size' },
                  { property: 'Chevron Icon Size', value: '16px × 16px', token: '--multi-select-chevron-size' },
                  { property: 'Plus/Tick Icon Size', value: '12px × 12px', token: '—' },
                  { property: 'Search Input Background', value: 'transparent', token: '—' },
                  { property: 'Error Message Gap', value: '6px', token: '—' },
                  { property: 'Error Message Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Error Message Color', value: '#e6494e', token: '--destructive' }
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

        {/* Usage Guidelines */}
        <div className="multi-select-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Usage Guidelines</h2>
          <div className="multi-select-docs__guidelines">
            <div className="multi-select-docs__guideline">
              <div className="multi-select-docs__guideline-header">
                <svg className="multi-select-docs__guideline-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 2a6 6 0 110 12A6 6 0 018 2zm0 1a5 5 0 100 10A5 5 0 008 3zm.5 2.5a.5.5 0 00-1 0v3h-1.5a.5.5 0 000 1h2a.5.5 0 00.5-.5v-3.5z"/>
                </svg>
                <h4>When to Use</h4>
              </div>
              <ul>
                <li>Users need to select multiple items from a list</li>
                <li>The list of options is too long for checkboxes</li>
                <li>Search functionality would help users find options</li>
                <li>Visual feedback for selected items is important</li>
              </ul>
            </div>

            <div className="multi-select-docs__guideline">
              <div className="multi-select-docs__guideline-header">
                <svg className="multi-select-docs__guideline-icon multi-select-docs__guideline-icon--warning" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8.982 1.566a1.13 1.13 0 00-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.706c.89 0 1.438-.99.982-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
                <h4>When Not to Use</h4>
              </div>
              <ul>
                <li>For single selection only (use Select instead)</li>
                <li>When the list is very short (&lt;5 items - use checkboxes)</li>
                <li>When the options are binary (use toggles or switches)</li>
                <li>For mutually exclusive choices</li>
              </ul>
            </div>

            <div className="multi-select-docs__guideline">
              <div className="multi-select-docs__guideline-header">
                <svg className="multi-select-docs__guideline-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.5 3A1.5 1.5 0 004 1.5h8A1.5 1.5 0 0013.5 3v10a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 012.5 13V3zm1.5-.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h8a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H4z"/>
                  <path d="M10.854 7.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 11.708-.708L7.5 9.793l2.646-2.647a.5.5 0 01.708 0z"/>
                </svg>
                <h4>Best Practices</h4>
              </div>
              <ul>
                <li>Provide clear, descriptive labels for options</li>
                <li>Use maxSelection for limited choice scenarios</li>
                <li>Include search for lists with 10+ options</li>
                <li>Show selection count when helpful</li>
                <li>Provide clear error messages when needed</li>
                <li>Maintain consistent 32px height with other form inputs</li>
                <li>Use the clear icon for quick removal of all selections</li>
              </ul>
            </div>

            <div className="multi-select-docs__guideline">
              <div className="multi-select-docs__guideline-header">
                <svg className="multi-select-docs__guideline-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1a7 7 0 104.95 11.95l.707.707A8.001 8.001 0 118 0v1z"/>
                  <path d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z"/>
                </svg>
                <h4>Accessibility</h4>
              </div>
              <ul>
                <li>Fully keyboard navigable (Tab, Enter, Escape, Arrow keys)</li>
                <li>Screen reader support with ARIA attributes</li>
                <li>Clear focus indicators throughout the component</li>
                <li>Descriptive labels and error messages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}