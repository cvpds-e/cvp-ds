import React, { useState } from 'react';
import { SegmentQueryConfiguration } from './SegmentQueryConfiguration';
import { CurrentConfiguration } from './CurrentConfiguration';
import { PrimaryButton } from './PrimaryButton';
import type { SegmentQueryConfig } from './SegmentQueryConfiguration';

const sampleFields = [
  { value: 'id', label: 'Id' },
  { value: 'pubdate', label: 'Pubdate' },
  { value: 'title', label: 'Title' },
  { value: 'author', label: 'Author' },
  { value: 'status', label: 'Status' },
  { value: 'category', label: 'Category' },
  { value: 'publishedAt', label: 'Published At' },
  { value: 'updatedAt', label: 'Updated At' },
  { value: 'releasePid', label: 'Release Pid' }
];

const sampleOperators = [
  { value: 'equals', label: 'equals' },
  { value: 'not_equals', label: 'not equals' },
  { value: 'contains', label: 'contains' },
  { value: 'not_contains', label: 'not contains' },
  { value: 'starts_with', label: 'starts with' },
  { value: 'ends_with', label: 'ends with' },
  { value: 'greater_than', label: 'greater than' },
  { value: 'less_than', label: 'less than' },
  { value: 'greater_equal', label: 'greater than or equal' },
  { value: 'less_equal', label: 'less than or equal' }
];

export function SegmentQueryConfigurationDocumentation() {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [prefilledModalOpen, setPrefilledModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [lastConfig, setLastConfig] = useState<SegmentQueryConfig | null>(null);

  const [emptyConfig] = useState<SegmentQueryConfig>({
    sortBy: { field: 'pubdate', direction: 'DESC' },
    filters: [],
    logicalOperators: []
  });

  const [activeConfig] = useState<SegmentQueryConfig>({
    sortBy: { field: 'pubdate', direction: 'DESC' },
    filters: [
      { id: '1', field: 'releasePid', operator: 'equals', value: '362decdc' },
      { id: '2', field: 'title', operator: 'equals', value: 'new' }
    ],
    logicalOperators: [
      { id: 'op-2', type: 'AND' }
    ]
  });

  const prefilledConfig: SegmentQueryConfig = {
    sortBy: { field: 'pubdate', direction: 'DESC' },
    filters: [
      { id: '1', field: 'status', operator: 'equals', value: 'published' },
      { id: '2', field: 'author', operator: 'contains', value: 'John' }
    ],
    logicalOperators: [
      { id: 'op-2', type: 'AND' }
    ]
  };

  const handleApply = (config: SegmentQueryConfig) => {
    setLastConfig(config);
    console.log('Applied configuration:', config);
  };

  return (
    <>
      <style>{`
        .segment-query-docs {
          --segment-query-docs-padding: var(--doc-padding);
          --segment-query-docs-max-width: var(--doc-max-width);
          --segment-query-docs-font-family: var(--doc-font-family);
          --segment-query-docs-section-spacing: var(--doc-section-spacing);
          --segment-query-docs-item-spacing: var(--doc-item-spacing);

          padding: var(--segment-query-docs-padding);
          max-width: var(--segment-query-docs-max-width);
          font-family: var(--segment-query-docs-font-family);
          box-sizing: border-box;
        }

        .segment-query-docs__section {
          margin-bottom: var(--segment-query-docs-section-spacing);
        }

        .segment-query-docs__example {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .segment-query-docs__example-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .segment-query-docs__example-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .segment-query-docs__config-display {
          background: var(--muted);
          border-radius: 4px;
          padding: 12px;
          font-family: var(--font-family-mono);
          font-size: var(--type-scale-xs-size);
          white-space: pre-wrap;
          color: var(--muted-foreground);
          max-height: 200px;
          overflow-y: auto;
        }

        .segment-query-docs__table {
          width: 100%;
          border-collapse: collapse;
          background-color: var(--card);
          border: var(--table-border);
          border-radius: 8px;
          overflow: hidden;
        }

        .segment-query-docs__table th {
          background-color: var(--table-header-bg);
          padding: var(--table-header-padding);
          text-align: left;
          font-weight: var(--table-header-font-weight);
          font-size: var(--table-font-size);
          border-bottom: var(--table-border);
        }

        .segment-query-docs__table td {
          padding: var(--table-cell-padding);
          font-size: var(--table-font-size);
          border-bottom: var(--table-border);
          vertical-align: top;
        }

        .segment-query-docs__table tr:last-child td {
          border-bottom: none;
        }

        .segment-query-docs__table code {
          background-color: var(--muted);
          padding: 2px 4px;
          border-radius: 2px;
          font-family: var(--font-family-mono);
          font-size: 12px;
        }

        .segment-query-docs__status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--status-badge-gap);
          padding: var(--status-badge-padding);
          border-radius: var(--status-badge-border-radius);
          font-size: var(--status-badge-font-size);
          font-weight: var(--status-badge-font-weight);
        }

        .segment-query-docs__status-badge--stable {
          background-color: var(--color-green-800);
          color: var(--color-green-200);
        }

        .segment-query-docs__status-dot {
          width: var(--status-badge-dot-size);
          height: var(--status-badge-dot-size);
          border-radius: 50%;
          background-color: var(--color-green-400);
        }

        .segment-query-docs__guidelines {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--guidelines-grid-gap);
          margin-bottom: var(--segment-query-docs-section-spacing);
        }

        .segment-query-docs__guideline {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: var(--guidelines-border-radius);
          padding: var(--guidelines-padding);
        }

        .segment-query-docs__guideline--do {
          border-color: var(--color-green-800);
        }

        .segment-query-docs__guideline--dont {
          border-color: var(--color-red-700);
        }

        .segment-query-docs__guideline-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .segment-query-docs__guideline-icon {
          width: var(--guidelines-icon-size);
          height: var(--guidelines-icon-size);
        }

        .segment-query-docs__guideline-icon--success {
          color: var(--color-green-400);
        }

        .segment-query-docs__guideline-icon--error {
          color: var(--color-red-400);
        }

        .segment-query-docs__guideline h4 {
          margin: 0;
          color: var(--foreground);
        }

        .segment-query-docs__guideline ul {
          margin: 0;
          padding-left: 16px;
          list-style: none;
        }

        .segment-query-docs__guideline li {
          margin-bottom: 6px;
          color: var(--muted-foreground);
          position: relative;
          padding-left: 12px;
        }

        .segment-query-docs__guideline li::before {
          content: '•';
          position: absolute;
          left: 0;
        }

        .segment-query-docs__example .primary-button {
          background: var(--primary-btn-bg);
          color: var(--primary-btn-text);
          border: 1px solid var(--primary-btn-border);
          border-radius: var(--btn-border-radius);
          padding: var(--btn-padding);
          font-size: var(--btn-font-size);
          font-weight: var(--btn-font-weight);
          line-height: var(--btn-line-height);
          letter-spacing: var(--btn-letter-spacing);
          cursor: pointer;
          transition: var(--btn-transition);
          font-family: var(--btn-font-family);
          margin-bottom: 16px;
        }

        .segment-query-docs__example .primary-button:hover {
          background: var(--primary-btn-hover-bg);
        }

        /* Technical Resource Center Link Fix - High Specificity */
        .segment-query-config__empty-state-link,
        .segment-query-config .segment-query-config__empty-state-link,
        div .segment-query-config__empty-state-link,
        a.segment-query-config__empty-state-link {
          color: #67b3fb !important;
          text-decoration: none !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          transition: color 0.2s ease !important;
          font-weight: inherit !important;
          font-size: inherit !important;
          line-height: inherit !important;
          vertical-align: baseline !important;
          text-decoration-line: none !important;
          text-underline-offset: unset !important;
          text-decoration-thickness: 0 !important;
          outline: none !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
          transform: none !important;
          will-change: color !important;
          box-shadow: none !important;
          background: none !important;
          position: static !important;
        }

        .segment-query-config__empty-state-link:hover,
        .segment-query-config .segment-query-config__empty-state-link:hover,
        div .segment-query-config__empty-state-link:hover,
        a.segment-query-config__empty-state-link:hover {
          color: #359afa !important;
          text-decoration: none !important;
          font-weight: inherit !important;
          text-decoration-line: none !important;
          text-underline-offset: unset !important;
          text-decoration-thickness: 0 !important;
          outline: none !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
          transform: none !important;
          box-shadow: none !important;
          background: none !important;
          position: static !important;
        }

        .segment-query-config__empty-state-link:focus,
        .segment-query-config__empty-state-link:active,
        .segment-query-config .segment-query-config__empty-state-link:focus,
        .segment-query-config .segment-query-config__empty-state-link:active,
        div .segment-query-config__empty-state-link:focus,
        div .segment-query-config__empty-state-link:active,
        a.segment-query-config__empty-state-link:focus,
        a.segment-query-config__empty-state-link:active {
          color: #359afa !important;
          text-decoration: none !important;
          font-weight: inherit !important;
          text-decoration-line: none !important;
          text-underline-offset: unset !important;
          text-decoration-thickness: 0 !important;
          outline: none !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
          transform: none !important;
          box-shadow: none !important;
          background: none !important;
          position: static !important;
        }
      `}</style>

      <div className="segment-query-docs">
        {/* Header */}
        <div className="segment-query-docs__section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h1 style={{ margin: 0 }}>Segment Query Configuration</h1>
            <div className="segment-query-docs__status-badge segment-query-docs__status-badge--stable">
              <div className="segment-query-docs__status-dot" />
              Stable
            </div>
          </div>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '24px' }}>
            A modal component for configuring segment queries with dynamic filtering, sorting, and logical operators. Allows users to build complex query conditions with field selection, operator choices, and value inputs.
          </p>
        </div>

        {/* Basic Usage */}
        <div className="segment-query-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Basic Usage</h2>
          <div className="segment-query-docs__example">
            <div className="segment-query-docs__example-item">
              <PrimaryButton onClick={() => setBasicModalOpen(true)}>
                Open Basic Configuration
              </PrimaryButton>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '13px' }}>
                Basic modal with default fields and operators
              </p>
            </div>
          </div>
        </div>

        {/* Current Configuration Summary */}
        <div className="segment-query-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Current Configuration Summary</h2>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '16px' }}>
            A compact summary component that displays the current segment query configuration, including sort settings and active filters.
          </p>
          <div className="segment-query-docs__example">
            <div className="segment-query-docs__example-grid">
              <div className="segment-query-docs__example-item">
                <h4>Empty Configuration</h4>
                <div style={{ maxWidth: '400px' }}>
                  <CurrentConfiguration 
                    config={emptyConfig}
                    onConfigure={() => setBasicModalOpen(true)}
                    availableFields={sampleFields}
                    availableOperators={sampleOperators}
                  />
                </div>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '13px' }}>
                  Shows default sort with 0 active filters
                </p>
              </div>
              <div className="segment-query-docs__example-item">
                <h4>With Active Filters</h4>
                <div style={{ maxWidth: '400px' }}>
                  <CurrentConfiguration 
                    config={activeConfig}
                    onConfigure={() => setPrefilledModalOpen(true)}
                    availableFields={sampleFields}
                    availableOperators={sampleOperators}
                  />
                </div>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '13px' }}>
                  Displays active filters with logical operators
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal States */}
        <div className="segment-query-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Modal States</h2>
          <div className="segment-query-docs__example">
            <div className="segment-query-docs__example-grid">
              <div className="segment-query-docs__example-item">
                <h4>Empty State (Default)</h4>
                <PrimaryButton onClick={() => setBasicModalOpen(true)}>
                  Open Empty Configuration
                </PrimaryButton>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '13px' }}>
                  Modal opens with no filters, showing empty state with dashed border
                </p>
              </div>
              <div className="segment-query-docs__example-item">
                <h4>With Pre-filled Configuration</h4>
                <PrimaryButton onClick={() => setPrefilledModalOpen(true)}>
                  Open Pre-filled Modal
                </PrimaryButton>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '13px' }}>
                  Modal opens with existing sort and filter configuration
                </p>
              </div>
              <div className="segment-query-docs__example-item">
                <h4>Custom Fields & Operators</h4>
                <PrimaryButton onClick={() => setCustomModalOpen(true)}>
                  Open Custom Modal
                </PrimaryButton>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '13px' }}>
                  Modal with extended field and operator options
                </p>
              </div>
            </div>
          </div>

          {lastConfig && (
            <div className="segment-query-docs__example">
              <h4>Last Applied Configuration</h4>
              <div className="segment-query-docs__config-display">
                {JSON.stringify(lastConfig, null, 2)}
              </div>
            </div>
          )}
        </div>

        {/* Specifications */}
        <div className="segment-query-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Specifications</h2>
          <div style={{
            backgroundColor: 'var(--card)',
            border: 'var(--table-border)',
            borderRadius: '8px',
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
                  { property: 'Modal Background', value: 'var(--modal-bg)', token: '--modal-bg' },
                  { property: 'Modal Border', value: 'var(--modal-border)', token: '--modal-border' },
                  { property: 'Modal Border Radius', value: '0.2rem', token: '--modal-border-radius' },
                  { property: 'Modal Max Width', value: '800px', token: '--modal-max-width' },
                  { property: 'Section Title Font Size', value: '15px', token: '--type-scale-l-size' },
                  { property: 'Section Title Font Weight', value: '400', token: '--type-scale-l-weight' },
                  { property: 'Section Title Line Height', value: '22px', token: '--type-scale-l-line-height' },
                  { property: 'Filters Title Margin Bottom', value: '0px', token: '—' },
                  { property: 'Section Spacing', value: '32px', token: '--spacing-8' },
                  { property: 'Content Padding', value: '24px', token: '--spacing-6' },
                  { property: 'Filter Row Background', value: 'transparent', token: '—' },
                  { property: 'Filter Row Border (Default)', value: '1px solid var(--border-default)', token: '--border' },
                  { property: 'Filter Row Border (Hover)', value: '1px solid #6f8be6', token: '--input-focus-border' },
                  { property: 'Filter Row Border Radius', value: '6px', token: '--radius-md' },
                  { property: 'Filter Row Padding', value: '24px', token: '--spacing-6' },
                  { property: 'Filter Row Gap', value: '12px', token: '--spacing-3' },
                  { property: 'Sort Direction Background', value: 'var(--outline-btn-bg)', token: '--outline-btn-bg' },
                  { property: 'Sort Direction Hover Background', value: 'var(--outline-btn-hover-bg)', token: '--outline-btn-hover-bg' },
                  { property: 'Sort Direction Border', value: '1px solid var(--border-default)', token: '--border' },
                  { property: 'Sort Direction Border Radius', value: '6px', token: '--radius-md' },
                  { property: 'Sort Direction Padding', value: '4px 10px', token: '—' },
                  { property: 'Sort Direction Text Color', value: 'var(--foreground)', token: '--foreground' },
                  { property: 'Sort Direction Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Sort Direction Font Weight', value: '500', token: '--type-scale-s-medium-weight' },
                  { property: 'Sort Direction Icon', value: 'arrow-up-down (left-positioned)', token: '—' },
                  { property: 'Sort Direction Min Width', value: 'none (dynamic)', token: '—' },
                  { property: 'Logical Operator Background', value: 'transparent', token: '—' },
                  { property: 'Logical Operator Hover Background', value: 'var(--outline-btn-hover-bg)', token: '--outline-btn-hover-bg' },
                  { property: 'Logical Operator Active Background', value: 'var(--outline-btn-active-bg)', token: '--outline-btn-active-bg' },
                  { property: 'Logical Operator Text Color', value: 'var(--muted-foreground)', token: '--muted-foreground' },
                  { property: 'Logical Operator Hover Text Color', value: 'var(--foreground)', token: '--foreground' },
                  { property: 'Logical Operator Border', value: '1px solid var(--border-default)', token: '--border' },
                  { property: 'Logical Operator Border Radius', value: '4px', token: '--radius-sm' },
                  { property: 'Logical Operator Padding', value: '4px 10px', token: '—' },
                  { property: 'Logical Operator Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Logical Operator Font Weight', value: '500', token: '--type-scale-s-medium-weight' },
                  { property: 'Logical Operator Alignment', value: 'flex center', token: '—' },
                  { property: 'Add Filter Background', value: 'var(--outline-btn-bg)', token: '--outline-btn-bg' },
                  { property: 'Add Filter Border', value: '1px solid var(--outline-btn-border)', token: '--outline-btn-border' },
                  { property: 'Add Filter Hover Background', value: 'var(--outline-btn-hover-bg)', token: '--outline-btn-hover-bg' },
                  { property: 'Add Filter Text Color', value: 'var(--outline-btn-text)', token: '--outline-btn-text' },
                  { property: 'Remove Filter Color', value: '#e6494e', token: '--destructive' },
                  { property: 'Remove Filter Hover Background', value: 'rgba(230, 73, 78, 0.1)', token: '—' },
                  { property: 'Actions Border Top', value: '1px solid var(--border-default)', token: '--border' },
                  { property: 'Actions Padding Top', value: '16px', token: '--spacing-4' },
                  { property: 'Footer Actions Gap', value: '12px', token: '—' },
                  { property: 'Apply Button Style', value: 'Primary Button', token: '--primary-btn-*' },
                  { property: 'Cancel Button Style', value: 'Outline Button', token: '--outline-btn-*' },
                  { property: 'Button Transition', value: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)', token: '--btn-transition' },
                  { property: 'Focus Ring', value: '2px solid #67b3fb', token: '--focus-ring' },
                  { property: 'Focus Ring Offset', value: '2px', token: '--btn-focus-offset' },
                  { property: 'Empty State Border', value: '2px dashed var(--border-default)', token: '--border' },
                  { property: 'Empty State Border Radius', value: '6px', token: '--radius-md' },
                  { property: 'Empty State Padding', value: '48px 24px', token: '--spacing-12 --spacing-6' },
                  { property: 'Empty State Text Color', value: 'var(--muted-foreground)', token: '--muted-foreground' },
                  { property: 'Empty State Text Align', value: 'center', token: '—' },
                  { property: 'Empty State Font Size', value: '14px', token: '--type-scale-m-size' },
                  { property: 'Empty State Font Weight', value: '400', token: '--type-scale-m-weight' },
                  { property: 'Empty State Line Height', value: '20px', token: '--type-scale-m-line-height' },
                  { property: 'Empty State Letter Spacing', value: '0.15px', token: '--type-scale-m-letter-spacing' },
                  { property: 'Empty State Link Color', value: '#67b3fb', token: '—' },
                  { property: 'Empty State Link Hover Color', value: '#359afa', token: '—' },
                  { property: 'Empty State Link Icon Size', value: '14px', token: '—' },
                  { property: 'Empty State Link Gap', value: '4px', token: '—' },
                  { property: 'Empty State Link Transition', value: 'color 0.2s ease', token: '—' },
                  { property: 'Current Config Container Background', value: 'var(--current-config-bg)', token: '--current-config-bg' },
                  { property: 'Current Config Border Radius', value: '8px', token: '--current-config-border-radius' },
                  { property: 'Current Config Padding', value: '16px', token: '--spacing-4' },
                  { property: 'Current Config Title Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Current Config Title Font Weight', value: '500', token: '--type-scale-s-medium-weight' },
                  { property: 'Current Config Title Text Transform', value: 'uppercase', token: '—' },
                  { property: 'Current Config Summary Gap', value: '24px', token: '--spacing-6' },
                  { property: 'Current Config Summary Value Background', value: 'var(--current-config-summary-value-bg)', token: '—' },
                  { property: 'Current Config Filters Count Font Family', value: 'Inconsolata, monospace', token: '--font-family-mono' },
                  { property: 'Current Config Filters Count Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Current Config Filters Count Font Weight', value: '400', token: '--type-scale-s-weight' },
                  { property: 'Current Config Filters Count Line Height', value: '20px', token: '--type-scale-s-line-height' },
                  { property: 'Current Config Filters Count Letter Spacing', value: '0.1px', token: '--type-scale-s-letter-spacing' },
                  { property: 'Current Config Filter Item Background', value: 'transparent', token: '—' },
                  { property: 'Current Config Filter Item Border', value: '1px solid var(--border-default)', token: '--border' },
                  { property: 'Current Config Filter Item Border Radius', value: '4px', token: '—' },
                  { property: 'Current Config Configure Button Width', value: '100%', token: '—' }
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
        <div className="segment-query-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Usage Guidelines</h2>
          <div className="segment-query-docs__guidelines">
            <div className="segment-query-docs__guideline segment-query-docs__guideline--do">
              <div className="segment-query-docs__guideline-header">
                <svg className="segment-query-docs__guideline-icon segment-query-docs__guideline-icon--success" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                </svg>
                <h4>Do</h4>
              </div>
              <ul>
                <li>Provide meaningful field labels that users understand</li>
                <li>Group related fields together for easier selection</li>
                <li>Use appropriate operators for each field type</li>
                <li>Validate field values before allowing query application</li>
                <li>Save user preferences for commonly used configurations</li>
                <li>Provide clear feedback when queries are applied</li>
                <li>Use logical operators (AND/OR) to create complex conditions</li>
                <li>Show empty state with dashed border when no filters exist</li>
                <li>Filter rows show focus state on hover with purple border</li>
                <li>Sort direction toggles between ASC/DESC with single click</li>
              </ul>
            </div>

            <div className="segment-query-docs__guideline segment-query-docs__guideline--dont">
              <div className="segment-query-docs__guideline-header">
                <svg className="segment-query-docs__guideline-icon segment-query-docs__guideline-icon--error" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 15A7 7 0 118 1a7 7 0 010 14zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
                <h4>Don't</h4>
              </div>
              <ul>
                <li>Allow empty field selections in filter rows</li>
                <li>Create overly complex query interfaces with too many options</li>
                <li>Apply queries without user confirmation</li>
                <li>Use technical field names that users won't understand</li>
                <li>Allow infinite filter additions without reasonable limits</li>
                <li>Hide important query operations behind unclear UI</li>
                <li>Show empty filter rows instead of a proper empty state</li>
                <li>Make logical operators too prominent or distracting</li>
                <li>Use complex hover states that confuse the interaction model</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div className="segment-query-docs__section">
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
                Full keyboard support with Tab navigation through all interactive elements. Enter/Space to activate buttons and dropdowns. Escape to close modal and dropdowns.
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
                Proper labeling for all form controls, section headings, and interactive elements. Filter relationships clearly communicated through logical operators.
              </p>
            </div>

            <div>
              <h4 style={{ marginBottom: '12px' }}>Focus Management</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                Clear focus indicators on all interactive elements. Focus returns to trigger element when modal closes. Focus trapped within modal during interaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SegmentQueryConfiguration
        isOpen={basicModalOpen}
        onClose={() => setBasicModalOpen(false)}
        onApply={handleApply}
      />

      <SegmentQueryConfiguration
        isOpen={prefilledModalOpen}
        onClose={() => setPrefilledModalOpen(false)}
        initialConfig={prefilledConfig}
        onApply={handleApply}
      />

      <SegmentQueryConfiguration
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
        availableFields={sampleFields}
        availableOperators={sampleOperators}
        onApply={handleApply}
      />
    </>
  );
}