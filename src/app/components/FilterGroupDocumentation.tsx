import React, { useState } from 'react';
import { FilterGroup, FilterCondition } from './FilterGroup';
import { SelectOption } from './Select';

export function FilterGroupDocumentation() {
  const [basicConditions, setBasicConditions] = useState<FilterCondition[]>([
    { id: '1', field: 'genre', operator: 'contains', value: 'Action' },
  ]);

  const [multiConditions, setMultiConditions] = useState<FilterCondition[]>([
    { id: '1', field: 'genre', operator: 'contains', value: 'Action' },
    { id: '2', field: 'release_year', operator: 'greater_or_equal', value: '2024' },
  ]);

  const [logicalOperator, setLogicalOperator] = useState<'AND' | 'OR'>('AND');

  const customFieldOptions: SelectOption[] = [
    { value: 'title', label: 'Title' },
    { value: 'genre', label: 'Genre' },
    { value: 'director', label: 'Director' },
    { value: 'release_year', label: 'Release Year' },
    { value: 'rating', label: 'Rating' },
    { value: 'duration', label: 'Duration' },
  ];

  return (
    <>
      <style>{`
        .filter-group-docs {
          --filter-group-docs-padding: var(--doc-padding);
          --filter-group-docs-max-width: var(--doc-max-width);
          --filter-group-docs-font-family: var(--doc-font-family);
          --filter-group-docs-section-spacing: var(--doc-section-spacing);
          --filter-group-docs-item-spacing: var(--doc-item-spacing);

          padding: var(--filter-group-docs-padding);
          max-width: var(--filter-group-docs-max-width);
          font-family: var(--filter-group-docs-font-family);
          box-sizing: border-box;
        }

        .filter-group-docs__section {
          margin-bottom: var(--filter-group-docs-section-spacing);
        }

        .filter-group-docs__item {
          margin-bottom: var(--filter-group-docs-item-spacing);
        }

        .filter-group-docs__example {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .filter-group-docs__example-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .filter-group-docs__example-item {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .filter-group-docs__example-title {
          font-size: var(--type-scale-l-size);
          font-weight: var(--type-scale-l-weight);
          line-height: var(--type-scale-l-line-height);
          letter-spacing: var(--type-scale-l-letter-spacing);
          color: var(--foreground);
          margin: 0 0 12px 0;
        }

        .filter-group-docs__status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--status-badge-gap);
          padding: var(--status-badge-padding);
          background-color: var(--status-badge-stable-bg);
          color: var(--status-badge-stable-color);
          border-radius: var(--status-badge-border-radius);
          font-size: var(--status-badge-font-size);
          font-weight: var(--status-badge-font-weight);
        }

        .filter-group-docs__status-icon {
          width: 6px;
          height: 6px;
          background-color: var(--status-badge-stable-dot);
          border-radius: 50%;
        }

        .filter-group-docs__selection-display {
          margin-top: 12px;
          padding: 12px;
          background-color: var(--muted);
          border: 1px solid var(--border-default);
          border-radius: 4px;
          font-size: 13px;
          color: var(--muted-foreground);
          font-family: 'Monaco', 'Courier New', monospace;
          max-height: 200px;
          overflow-y: auto;
        }
      `}</style>

      <div className="filter-group-docs">
        {/* Header */}
        <div className="filter-group-docs__section">
          <div style={{ marginBottom: '16px' }}>
            <h1 style={{ marginBottom: '8px' }}>Filter Group</h1>
            <div className="filter-group-docs__status-badge">
              <span className="filter-group-docs__status-icon" />
              Stable
            </div>
          </div>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '24px' }}>
            A complex filter component that allows users to build conditional queries with multiple criteria. Supports adding/removing conditions, drag-and-drop reordering, and logical operators (AND/OR).
          </p>
        </div>

        {/* Basic Usage */}
        <div className="filter-group-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Basic Usage</h2>
          <div className="filter-group-docs__example">
            <div className="filter-group-docs__example-item">
              <h4 className="filter-group-docs__example-title">Single Condition</h4>
              <FilterGroup
                conditions={basicConditions}
                onChange={setBasicConditions}
                showAddGroup={false}
              />
              <div className="filter-group-docs__selection-display">
                {JSON.stringify(basicConditions, null, 2)}
              </div>
            </div>
          </div>
        </div>

        {/* Multiple Conditions */}
        <div className="filter-group-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Multiple Conditions</h2>
          <div className="filter-group-docs__example">
            <div className="filter-group-docs__example-item">
              <h4 className="filter-group-docs__example-title">With Logical Operator</h4>
              <FilterGroup
                conditions={multiConditions}
                onChange={setMultiConditions}
                logicalOperator={logicalOperator}
                onLogicalOperatorChange={setLogicalOperator}
                onAddGroup={() => console.log('Add group clicked')}
              />
              <div className="filter-group-docs__selection-display">
                Operator: {logicalOperator}
                <br />
                <br />
                {JSON.stringify(multiConditions, null, 2)}
              </div>
            </div>
          </div>
        </div>

        {/* Custom Field Options */}
        <div className="filter-group-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Custom Field Options</h2>
          <div className="filter-group-docs__example">
            <div className="filter-group-docs__example-item">
              <h4 className="filter-group-docs__example-title">Custom Fields</h4>
              <FilterGroup
                fieldOptions={customFieldOptions}
                onChange={(conditions) => console.log('Conditions changed:', conditions)}
              />
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="filter-group-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Specifications</h2>
          
          <p style={{ 
            marginBottom: '16px',
            color: 'var(--muted-foreground)',
            fontSize: '14px'
          }}>
            Color values shown for both Dark Theme and Light Theme where applicable. The AND/OR logical operator button uses the same styling as the Segment Query Configuration component.
          </p>

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
                  { property: 'Group Background', value: 'Dark: #1a1a1f / Light: #f8f9fa', token: '--filter-group-bg' },
                  { property: 'Group Border', value: 'Dark: 1px solid #2a2a35 / Light: 1px solid #e5e7eb', token: '--filter-group-border' },
                  { property: 'Group Border Radius', value: '8px', token: '--filter-group-border-radius' },
                  { property: 'Group Padding', value: '16px', token: '--filter-group-padding' },
                  { property: 'Group Gap', value: '12px', token: '--filter-group-gap' },
                  { property: 'Title Font Family', value: 'Inter, sans-serif', token: '--font-family' },
                  { property: 'Title Font Size', value: '14px', token: '--type-scale-m-size' },
                  { property: 'Title Font Weight', value: '500', token: '—' },
                  { property: 'Title Line Height', value: '20px', token: '--type-scale-m-line-height' },
                  { property: 'Title Color', value: 'Dark: #b4b4ba / Light: #6b7280', token: '—' },
                  { property: 'Logical Operator Button Background', value: 'transparent', token: '--logical-op-bg' },
                  { property: 'Logical Operator Button Border', value: '1px solid var(--border-default)', token: '--logical-op-border' },
                  { property: 'Logical Operator Button Color', value: 'var(--muted-foreground)', token: '--logical-op-text' },
                  { property: 'Logical Operator Button Padding', value: '4px 10px', token: '--logical-op-padding' },
                  { property: 'Logical Operator Button Font Size', value: '13px', token: '--logical-op-font-size' },
                  { property: 'Logical Operator Button Font Weight', value: '500', token: '--logical-op-font-weight' },
                  { property: 'Logical Operator Button Min Width', value: '60px', token: '—' },
                  { property: 'Logical Operator Button Height', value: '28px', token: '—' },
                  { property: 'Logical Operator Button Hover Background', value: 'var(--outline-btn-hover-bg)', token: '--logical-op-hover-bg' },
                  { property: 'Logical Operator Button Hover Color', value: 'var(--foreground)', token: '--logical-op-hover-text' },
                  { property: 'Logical Operator Button Focus Outline', value: '2px solid #6f8be6', token: '--focus-ring' },
                  { property: 'Logical Operator Button Focus Offset', value: '2px', token: '—' },
                  { property: 'Condition Background', value: 'Dark: #14141a / Light: #ffffff', token: '--filter-condition-bg' },
                  { property: 'Condition Border', value: 'Dark: 1px solid #2a2a35 / Light: 1px solid #e5e7eb', token: '--filter-condition-border' },
                  { property: 'Condition Border Radius', value: '6px', token: '--filter-condition-border-radius' },
                  { property: 'Condition Padding', value: '12px', token: '--filter-condition-padding' },
                  { property: 'Condition Gap', value: '8px', token: '--filter-condition-gap' },
                  { property: 'Condition Label Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Condition Label Color', value: 'Dark: #9b9ba5 / Light: #6b7280', token: '—' },
                  { property: 'Drag Handle Color', value: 'Dark: #6b6b78 / Light: #9ca3af', token: '—' },
                  { property: 'Input Background', value: 'Dark: #212123 / Light: #ffffff', token: '—' },
                  { property: 'Input Border', value: 'Dark: 1px solid #45454a / Light: 1px solid #d1d5db', token: '—' },
                  { property: 'Input Border Radius', value: '4px', token: '—' },
                  { property: 'Input Padding', value: '8px 12px', token: '—' },
                  { property: 'Input Text Color', value: 'Dark: #ffffff / Light: #111827', token: '—' },
                  { property: 'Input Placeholder Color', value: 'Dark: #6b6b78 / Light: #9ca3af', token: '—' },
                  { property: 'Input Border (Hover)', value: '1px solid #6f8be6', token: '—' },
                  { property: 'Input Focus Border', value: '2px solid #6f8be6', token: '--focus-ring' },
                  { property: 'Input Focus Glow', value: '0 0 0 3px rgba(111, 139, 230, 0.25)', token: '—' },
                  { property: 'Input Disabled Color', value: 'Dark: #A1A1A8 / Light: #9ca3af', token: '—' },
                  { property: 'Action Button Border', value: 'Dark: 1px dashed #45454a / Light: 1px dashed #d1d5db', token: '—' },
                  { property: 'Action Button Color', value: 'Dark: #b4b4ba / Light: #374151', token: '—' },
                  { property: 'Action Button Hover Border', value: '1px solid #6f8be6', token: '—' },
                  { property: 'Action Button Hover Color', value: '#6f8be6', token: '—' },
                  { property: 'Action Button Hover Background', value: 'rgba(111, 139, 230, 0.04)', token: '—' },
                  { property: 'Remove Button Hover Background', value: 'rgba(111, 139, 230, 0.08)', token: '—' },
                  { property: 'Remove Button Hover Color', value: '#6f8be6', token: '—' },
                  { property: 'Transition', value: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)', token: '--btn-transition' },
                ].map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      padding: 'var(--table-cell-padding)',
                      fontSize: 'var(--table-font-size)',
                      color: 'var(--foreground)',
                      borderBottom: 'var(--table-border)',
                      fontWeight: '500'
                    }}>
                      {row.property}
                    </td>
                    <td style={{
                      padding: 'var(--table-cell-padding)',
                      fontSize: 'var(--table-font-size)',
                      color: 'var(--muted-foreground)',
                      borderBottom: 'var(--table-border)',
                      fontFamily: '"Monaco", "Courier New", monospace'
                    }}>
                      {row.value}
                    </td>
                    <td style={{
                      padding: 'var(--table-cell-padding)',
                      fontSize: 'var(--table-font-size)',
                      color: 'var(--muted-foreground)',
                      borderBottom: 'var(--table-border)',
                      fontFamily: '"Monaco", "Courier New", monospace'
                    }}>
                      {row.token}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Accessibility */}
        <div className="filter-group-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Accessibility</h2>
          <div className="filter-group-docs__example">
            <ul style={{ 
              margin: 0, 
              paddingLeft: '20px',
              color: 'var(--muted-foreground)',
              lineHeight: '1.6'
            }}>
              <li><strong>Keyboard Navigation:</strong> Full keyboard support with Tab, Enter, and Escape keys</li>
              <li><strong>Focus States:</strong> Clear focus indicators with 2px border and glow effect</li>
              <li><strong>ARIA Labels:</strong> Proper aria-label attributes on interactive elements</li>
              <li><strong>Screen Readers:</strong> Announces actions and state changes</li>
              <li><strong>Semantic HTML:</strong> Uses button elements for actions</li>
              <li><strong>Visual Feedback:</strong> Drag handle cursor changes and hover states</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="filter-group-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Best Practices</h2>
          <div className="filter-group-docs__example">
            <div style={{ color: 'var(--muted-foreground)', lineHeight: '1.6' }}>
              <p style={{ marginTop: 0 }}><strong>Do:</strong></p>
              <ul style={{ paddingLeft: '20px' }}>
                <li>Provide clear field labels that users understand</li>
                <li>Include appropriate operators for each field type</li>
                <li>Validate user input and show error states</li>
                <li>Save filter configurations for reuse</li>
                <li>Provide visual feedback when conditions are added/removed</li>
                <li>Keep at least one condition visible (don't allow empty groups)</li>
              </ul>
              
              <p><strong>Don't:</strong></p>
              <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
                <li>Allow too many nested filter groups (limit to 2-3 levels)</li>
                <li>Use technical field names without labels</li>
                <li>Remove all conditions (keep at least one)</li>
                <li>Hide the logical operator selector when it matters</li>
                <li>Forget to handle onChange callbacks for state management</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="filter-group-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Use Cases</h2>
          <div className="filter-group-docs__example">
            <div style={{ color: 'var(--muted-foreground)', lineHeight: '1.6' }}>
              <ul style={{ paddingLeft: '20px', marginTop: 0, marginBottom: 0 }}>
                <li><strong>Advanced Search:</strong> Building complex search queries with multiple criteria</li>
                <li><strong>Data Filtering:</strong> Filtering large datasets in tables or lists</li>
                <li><strong>Report Generation:</strong> Defining criteria for custom reports</li>
                <li><strong>Content Discovery:</strong> Finding specific content based on metadata</li>
                <li><strong>Audience Segmentation:</strong> Creating user segments based on attributes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}