import React, { useState } from 'react';
import { TagFilter, TagFilterSection } from './TagFilter';

export function TagFilterDocumentation() {
  const [basicSelection, setBasicSelection] = useState<string[]>(['primary-video']);
  const [controlledSelection, setControlledSelection] = useState<string[]>(['4k-uhd', 'audio-only']);
  const [limitedSelection, setLimitedSelection] = useState<string[]>([]);

  const assetTypeSections: TagFilterSection[] = [
    {
      id: 'asset-types',
      title: 'Match Asset Types',
      options: [
        { id: 'primary-video', label: 'Primary Video' },
        { id: 'secondary-video', label: 'Secondary Video' },
        { id: 'audio-track', label: 'Audio Track' },
        { id: 'subtitle-track', label: 'Subtitle Track' },
        { id: 'thumbnail', label: 'Thumbnail' },
        { id: 'poster-image', label: 'Poster Image' },
        { id: 'background-image', label: 'Background Image' },
        { id: 'metadata-file', label: 'Metadata File' },
      ],
    },
    {
      id: 'encoding-profiles',
      title: 'Match Encoding Profiles',
      options: [
        { id: '4k-uhd', label: '4K UHD' },
        { id: '1080p-hd', label: '1080p HD' },
        { id: '720p-hd', label: '720p HD' },
        { id: '480p-sd', label: '480p SD' },
        { id: '360p-mobile', label: '360p Mobile' },
        { id: 'audio-only', label: 'Audio Only' },
        { id: 'low-bandwidth', label: 'Low Bandwidth' },
        { id: 'high-quality', label: 'High Quality' },
      ],
    },
  ];

  const simpleSections: TagFilterSection[] = [
    {
      id: 'categories',
      title: 'Content Categories',
      options: [
        { id: 'news', label: 'News' },
        { id: 'sports', label: 'Sports' },
        { id: 'entertainment', label: 'Entertainment' },
        { id: 'documentary', label: 'Documentary' },
        { id: 'live', label: 'Live' },
      ],
    },
  ];

  const statusSections: TagFilterSection[] = [
    {
      id: 'status',
      title: 'Content Status',
      options: [
        { id: 'published', label: 'Published' },
        { id: 'draft', label: 'Draft' },
        { id: 'archived', label: 'Archived' },
        { id: 'scheduled', label: 'Scheduled' },
        { id: 'pending', label: 'Pending Review', disabled: true },
      ],
    },
  ];

  return (
    <>
      <style>{`
        .tag-filter-docs {
          --tag-filter-docs-padding: var(--doc-padding);
          --tag-filter-docs-max-width: var(--doc-max-width);
          --tag-filter-docs-font-family: var(--doc-font-family);
          --tag-filter-docs-section-spacing: var(--doc-section-spacing);
          --tag-filter-docs-item-spacing: var(--doc-item-spacing);

          padding: var(--tag-filter-docs-padding);
          max-width: var(--tag-filter-docs-max-width);
          font-family: var(--tag-filter-docs-font-family);
          box-sizing: border-box;
        }

        .tag-filter-docs__section {
          margin-bottom: var(--tag-filter-docs-section-spacing);
        }

        .tag-filter-docs__item {
          margin-bottom: var(--tag-filter-docs-item-spacing);
        }

        .tag-filter-docs__example {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .tag-filter-docs__example-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .tag-filter-docs__example-item {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tag-filter-docs__example-title {
          font-size: var(--type-scale-l-size);
          font-weight: var(--type-scale-l-weight);
          line-height: var(--type-scale-l-line-height);
          letter-spacing: var(--type-scale-l-letter-spacing);
          color: var(--foreground);
          margin: 0 0 12px 0;
        }

        .tag-filter-docs__table {
          width: 100%;
          border-collapse: collapse;
          background-color: var(--card);
          border: var(--table-border);
          border-radius: 8px;
          overflow: hidden;
        }

        .tag-filter-docs__table th {
          background-color: var(--table-header-bg);
          padding: var(--table-header-padding);
          text-align: left;
          font-weight: var(--table-header-font-weight);
          font-size: var(--table-font-size);
          border-bottom: var(--table-border);
        }

        .tag-filter-docs__table td {
          padding: var(--table-cell-padding);
          font-size: var(--table-font-size);
          border-bottom: var(--table-border);
          vertical-align: top;
        }

        .tag-filter-docs__table tr:last-child td {
          border-bottom: none;
        }

        .tag-filter-docs__table code {
          background-color: var(--muted);
          padding: 2px 4px;
          border-radius: 2px;
          font-family: var(--font-family-mono);
          font-size: 12px;
        }

        .tag-filter-docs__status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--status-badge-gap);
          padding: var(--status-badge-padding);
          border-radius: var(--status-badge-border-radius);
          font-size: var(--status-badge-font-size);
          font-weight: var(--status-badge-font-weight);
        }

        .tag-filter-docs__status-badge--stable {
          background-color: var(--color-green-800);
          color: var(--color-green-200);
        }

        .tag-filter-docs__status-dot {
          width: var(--status-badge-dot-size);
          height: var(--status-badge-dot-size);
          border-radius: 50%;
          background-color: var(--color-green-400);
        }

        .tag-filter-docs__guidelines {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--guidelines-grid-gap);
          margin-bottom: var(--tag-filter-docs-section-spacing);
        }

        .tag-filter-docs__guideline {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: var(--guidelines-border-radius);
          padding: var(--guidelines-padding);
        }

        .tag-filter-docs__guideline-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .tag-filter-docs__guideline-icon {
          width: var(--guidelines-icon-size);
          height: var(--guidelines-icon-size);
          color: var(--color-green-400);
        }

        .tag-filter-docs__guideline-icon--warning {
          color: var(--color-amber-400);
        }

        .tag-filter-docs__guideline h4 {
          margin: 0;
          color: var(--foreground);
        }

        .tag-filter-docs__guideline ul {
          margin: 0;
          padding-left: 16px;
        }

        .tag-filter-docs__guideline li {
          margin-bottom: 4px;
          color: var(--muted-foreground);
        }

        .tag-filter-docs__selection-display {
          margin-top: 12px;
          padding: 12px;
          background-color: var(--muted);
          border-radius: 4px;
          font-size: var(--type-scale-s-size);
          color: var(--muted-foreground);
        }
      `}</style>

      <div className="tag-filter-docs">
        {/* Header */}
        <div className="tag-filter-docs__section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h1 style={{ margin: 0 }}>Tag Filter</h1>
            <div className="tag-filter-docs__status-badge tag-filter-docs__status-badge--stable">
              <div className="tag-filter-docs__status-dot" />
              Stable
            </div>
          </div>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '24px' }}>
            A multi-selection filter component that allows users to quickly select from predefined options organized in sections. Tags can be toggled on/off and selected items are displayed as removable pills for easy management.
          </p>
        </div>

        {/* Basic Usage */}
        <div className="tag-filter-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Basic Usage</h2>
          <div className="tag-filter-docs__example">
            <div className="tag-filter-docs__example-item">
              <h4 className="tag-filter-docs__example-title">Media Asset Filter</h4>
              <TagFilter
                sections={assetTypeSections}
                selectedOptions={basicSelection}
                onSelectionChange={setBasicSelection}
              />
              <div className="tag-filter-docs__selection-display">
                Selected: {basicSelection.length > 0 ? basicSelection.join(', ') : 'None'}
              </div>
            </div>
          </div>
        </div>

        {/* States */}
        <div className="tag-filter-docs__section">
          <h2 style={{ marginBottom: '16px' }}>States</h2>
          <div className="tag-filter-docs__example">
            <div className="tag-filter-docs__example-grid">
              <div className="tag-filter-docs__example-item">
                <h4 className="tag-filter-docs__example-title">Controlled State</h4>
                <TagFilter
                  sections={assetTypeSections.slice(1)}
                  selectedOptions={controlledSelection}
                  onSelectionChange={setControlledSelection}
                />
                <div className="tag-filter-docs__selection-display">
                  Controlled selection: {controlledSelection.length > 0 ? controlledSelection.join(', ') : 'None'}
                </div>
              </div>
              <div className="tag-filter-docs__example-item">
                <h4 className="tag-filter-docs__example-title">Single Section</h4>
                <TagFilter
                  sections={simpleSections}
                  selectedOptions={limitedSelection}
                  onSelectionChange={setLimitedSelection}
                />
                <div className="tag-filter-docs__selection-display">
                  Categories: {limitedSelection.length > 0 ? limitedSelection.join(', ') : 'None'}
                </div>
              </div>
              <div className="tag-filter-docs__example-item">
                <h4 className="tag-filter-docs__example-title">With Disabled Options</h4>
                <TagFilter
                  sections={statusSections}
                />
                <div className="tag-filter-docs__selection-display">
                  "Pending Review" option is disabled
                </div>
              </div>
              <div className="tag-filter-docs__example-item">
                <h4 className="tag-filter-docs__example-title">Disabled State</h4>
                <TagFilter
                  sections={simpleSections}
                  selectedOptions={['news', 'sports']}
                  disabled
                />
                <div className="tag-filter-docs__selection-display">
                  Entire component is disabled
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="tag-filter-docs__section">
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
                  { property: 'Section Gap', value: '32px', token: '--spacing-8' },
                  { property: 'Section Title Font Size', value: '15px', token: '--type-scale-l-size' },
                  { property: 'Section Title Font Weight', value: '400', token: '--type-scale-l-weight' },
                  { property: 'Section Title Line Height', value: '22px', token: '--type-scale-l-line-height' },
                  { property: 'Section Title Letter Spacing', value: '0px', token: '--type-scale-l-letter-spacing' },
                  { property: 'Section Title Color', value: '#ffffff', token: '--foreground' },
                  { property: 'Section Title Margin Bottom', value: '16px', token: '--spacing-4' },
                  { property: 'Tag Gap', value: '12px', token: '--spacing-3' },
                  { property: 'Tag Padding', value: '4px 8px', token: '—' },
                  { property: 'Tag Border Radius', value: '6px', token: '--radius-md' },
                  { property: 'Tag Background (Unselected)', value: 'transparent', token: '—' },
                  { property: 'Tag Text (Unselected)', value: '#ffffff', token: '--foreground' },
                  { property: 'Tag Border (Unselected)', value: '1px solid rgba(212, 228, 254, 0.1)', token: '--border' },
                  { property: 'Tag Background (Hover)', value: '#292a2e', token: '--accent' },
                  { property: 'Tag Text (Hover)', value: '#ffffff', token: '--accent-foreground' },
                  { property: 'Tag Border (Hover)', value: '1px solid #292a2e', token: '--accent' },
                  { property: 'Tag Background (Selected)', value: '#3d63dd', token: '—' },
                  { property: 'Tag Text (Selected)', value: '#ffffff', token: '—' },
                  { property: 'Tag Border (Selected)', value: '1px solid #3d63dd', token: '—' },
                  { property: 'Tag Background (Selected Hover)', value: '#244cce', token: '—' },
                  { property: 'Tag Border (Selected Hover)', value: '1px solid #244cce', token: '—' },
                  { property: 'Tag Background (Disabled)', value: 'transparent', token: '—' },
                  { property: 'Tag Text (Disabled)', value: '#bbbbbb', token: '--muted-foreground' },
                  { property: 'Tag Border (Disabled)', value: '1px solid #292a2e', token: '--muted' },
                  { property: 'Remove Button Size', value: '16px', token: '—' },
                  { property: 'Remove Button Margin Left', value: '8px', token: '—' },
                  { property: 'Remove Button Hover Background', value: 'rgba(255, 255, 255, 0.2)', token: '—' },
                  { property: 'Remove Button Border Radius', value: '2px', token: '—' },
                  { property: 'Focus Ring', value: '2px solid #67b3fb', token: '--focus-ring' },
                  { property: 'Transition', value: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)', token: '--btn-transition' }
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
        <div className="tag-filter-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Usage Guidelines</h2>
          <div className="tag-filter-docs__guidelines">
            <div className="tag-filter-docs__guideline">
              <div className="tag-filter-docs__guideline-header">
                <svg className="tag-filter-docs__guideline-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 2a6 6 0 110 12A6 6 0 018 2zm0 1a5 5 0 100 10A5 5 0 008 3zm.5 2.5a.5.5 0 00-1 0v3h-1.5a.5.5 0 000 1h2a.5.5 0 00.5-.5v-3.5z"/>
                </svg>
                <h4>When to Use</h4>
              </div>
              <ul>
                <li>For quick multi-selection filtering interfaces</li>
                <li>When options are organized in logical groups</li>
                <li>For content discovery and search refinement</li>
                <li>When users need to see all available options upfront</li>
              </ul>
            </div>

            <div className="tag-filter-docs__guideline">
              <div className="tag-filter-docs__guideline-header">
                <svg className="tag-filter-docs__guideline-icon tag-filter-docs__guideline-icon--warning" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8.982 1.566a1.13 1.13 0 00-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.706c.89 0 1.438-.99.982-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
                <h4>When Not to Use</h4>
              </div>
              <ul>
                <li>For single selection only (use Select instead)</li>
                <li>When there are too many options (&gt;20 per section)</li>
                <li>For hierarchical or nested option structures</li>
                <li>When screen space is very limited</li>
              </ul>
            </div>

            <div className="tag-filter-docs__guideline">
              <div className="tag-filter-docs__guideline-header">
                <svg className="tag-filter-docs__guideline-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.5 3A1.5 1.5 0 004 1.5h8A1.5 1.5 0 0013.5 3v10a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 012.5 13V3zm1.5-.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h8a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H4z"/>
                  <path d="M10.854 7.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 11.708-.708L7.5 9.793l2.646-2.647a.5.5 0 01.708 0z"/>
                </svg>
                <h4>Best Practices</h4>
              </div>
              <ul>
                <li>Group related options into logical sections</li>
                <li>Use clear, descriptive section titles</li>
                <li>Keep tag labels concise and scannable</li>
                <li>Provide visual feedback for selected state</li>
                <li>Allow easy removal with X button on selected tags</li>
                <li>Consider initial pre-selection for common use cases</li>
              </ul>
            </div>

            <div className="tag-filter-docs__guideline">
              <div className="tag-filter-docs__guideline-header">
                <svg className="tag-filter-docs__guideline-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1a7 7 0 104.95 11.95l.707.707A8.001 8.001 0 118 0v1z"/>
                  <path d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z"/>
                </svg>
                <h4>Accessibility</h4>
              </div>
              <ul>
                <li>Fully keyboard navigable (Tab, Enter, Space)</li>
                <li>Screen reader support with proper ARIA attributes</li>
                <li>Clear focus indicators on all interactive elements</li>
                <li>Accessible remove buttons with descriptive labels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}