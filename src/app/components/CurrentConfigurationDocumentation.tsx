// This file has been merged into SegmentQueryConfigurationDocumentation.tsx
// Please use that file instead.

  return (
    <>
      <style>{`
        .current-config-docs {
          --current-config-docs-padding: var(--doc-padding);
          --current-config-docs-max-width: var(--doc-max-width);
          --current-config-docs-font-family: var(--doc-font-family);
          --current-config-docs-section-spacing: var(--doc-section-spacing);
          --current-config-docs-item-spacing: var(--doc-item-spacing);

          padding: var(--current-config-docs-padding);
          max-width: var(--current-config-docs-max-width);
          font-family: var(--current-config-docs-font-family);
          box-sizing: border-box;
        }

        .current-config-docs__section {
          margin-bottom: var(--current-config-docs-section-spacing);
        }

        .current-config-docs__example {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .current-config-docs__example-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .current-config-docs__example-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .current-config-docs__status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--status-badge-gap);
          padding: var(--status-badge-padding);
          border-radius: var(--status-badge-border-radius);
          font-size: var(--status-badge-font-size);
          font-weight: var(--status-badge-font-weight);
        }

        .current-config-docs__status-badge--stable {
          background-color: var(--color-green-800);
          color: var(--color-green-200);
        }

        .current-config-docs__status-dot {
          width: var(--status-badge-dot-size);
          height: var(--status-badge-dot-size);
          border-radius: 50%;
          background-color: var(--color-green-400);
        }

        .current-config-docs__guidelines {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--guidelines-grid-gap);
          margin-bottom: var(--current-config-docs-section-spacing);
        }

        .current-config-docs__guideline {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: var(--guidelines-border-radius);
          padding: var(--guidelines-padding);
        }

        .current-config-docs__guideline--do {
          border-color: var(--color-green-800);
        }

        .current-config-docs__guideline--dont {
          border-color: var(--color-red-700);
        }

        .current-config-docs__guideline-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .current-config-docs__guideline-icon {
          width: var(--guidelines-icon-size);
          height: var(--guidelines-icon-size);
        }

        .current-config-docs__guideline-icon--success {
          color: var(--color-green-400);
        }

        .current-config-docs__guideline-icon--error {
          color: var(--color-red-400);
        }

        .current-config-docs__guideline h4 {
          margin: 0;
          color: var(--foreground);
        }

        .current-config-docs__guideline ul {
          margin: 0;
          padding-left: 16px;
          list-style: none;
        }

        .current-config-docs__guideline li {
          margin-bottom: 6px;
          color: var(--muted-foreground);
          position: relative;
          padding-left: 12px;
        }

        .current-config-docs__guideline li::before {
          content: '•';
          position: absolute;
          left: 0;
        }
      `}</style>

      <div className="current-config-docs">
        {/* Header */}
        <div className="current-config-docs__section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h1 style={{ margin: 0 }}>Current Configuration</h1>
            <div className="current-config-docs__status-badge current-config-docs__status-badge--stable">
              <div className="current-config-docs__status-dot" />
              Stable
            </div>
          </div>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '24px' }}>
            A component that displays a summary of the current segment query configuration, showing sort settings, active filter count, and individual filter details in a compact, readable format.
          </p>
        </div>

        {/* Basic Usage */}
        <div className="current-config-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Basic Usage</h2>
          <div className="current-config-docs__example">
            <div className="current-config-docs__example-item">
              <h4>Empty State</h4>
              <div style={{ maxWidth: '400px' }}>
                <CurrentConfiguration 
                  config={emptyConfig}
                  onConfigure={handleConfigure}
                  availableFields={sampleFields}
                  availableOperators={sampleOperators}
                />
              </div>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '13px' }}>
                Shows default sort configuration with no active filters
              </p>
            </div>
          </div>
        </div>

        {/* States */}
        <div className="current-config-docs__section">
          <h2 style={{ marginBottom: '16px' }}>States</h2>
          <div className="current-config-docs__example">
            <div className="current-config-docs__example-grid">
              <div className="current-config-docs__example-item">
                <h4>With Active Filters</h4>
                <CurrentConfiguration 
                  config={activeConfig}
                  onConfigure={handleConfigure}
                  availableFields={sampleFields}
                  availableOperators={sampleOperators}
                />
                <p style={{ color: 'var(--muted-foreground)', fontSize: '13px' }}>
                  Displays active filters with logical operators between them
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="current-config-docs__section">
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
                  { property: 'Container Background', value: '#292a2e', token: '--current-config-bg' },
                  { property: 'Container Border Radius', value: '8px', token: '--current-config-border-radius' },
                  { property: 'Container Padding', value: '16px', token: '--spacing-4' },
                  { property: 'Title Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Title Font Weight', value: '500', token: '--type-scale-s-medium-weight' },
                  { property: 'Title Text Transform', value: 'uppercase', token: '—' },
                  { property: 'Title Color', value: '#ffffff', token: '--foreground' },
                  { property: 'Title Margin Bottom', value: '12px', token: '--spacing-3' },
                  { property: 'Summary Gap', value: '24px', token: '--spacing-6' },
                  { property: 'Summary Label Color', value: '#bbbbbb', token: '--muted-foreground' },
                  { property: 'Summary Value Background', value: '#45454a', token: '—' },
                  { property: 'Summary Value Border Radius', value: '4px', token: '—' },
                  { property: 'Summary Value Padding', value: '2px 8px', token: '—' },
                  { property: 'Sort Value Font Family', value: 'Inconsolata, monospace', token: '--font-family-mono' },
                  { property: 'Active Filters Title', value: 'ACTIVE FILTERS:', token: '—' },
                  { property: 'Active Filters Title Color', value: '#bbbbbb', token: '--muted-foreground' },
                  { property: 'Filter Item Background', value: '#45454a', token: '—' },
                  { property: 'Filter Item Border Radius', value: '4px', token: '—' },
                  { property: 'Filter Item Padding', value: '6px 12px', token: '—' },
                  { property: 'Filter Field Font Weight', value: '500', token: '--type-scale-s-medium-weight' },
                  { property: 'Filter Operator Style', value: 'italic', token: '—' },
                  { property: 'Filter Operator Color', value: '#bbbbbb', token: '--muted-foreground' },
                  { property: 'Filter Value Font Family', value: 'Inconsolata, monospace', token: '--font-family-mono' },
                  { property: 'Logical Operator Font Size', value: '12px', token: '--type-scale-xs-size' },
                  { property: 'Logical Operator Font Weight', value: '500', token: '--type-scale-s-medium-weight' },
                  { property: 'Logical Operator Color', value: '#bbbbbb', token: '--muted-foreground' },
                  { property: 'Configure Button Width', value: '100%', token: '—' },
                  { property: 'Configure Button Icon Size', value: '16px', token: '—' },
                  { property: 'Configure Button Gap', value: '6px', token: '—' }
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
        <div className="current-config-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Usage Guidelines</h2>
          <div className="current-config-docs__guidelines">
            <div className="current-config-docs__guideline current-config-docs__guideline--do">
              <div className="current-config-docs__guideline-header">
                <svg className="current-config-docs__guideline-icon current-config-docs__guideline-icon--success" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                </svg>
                <h4>Do</h4>
              </div>
              <ul>
                <li>Use as a summary component before configuration modals</li>
                <li>Show clear field and operator labels that users understand</li>
                <li>Include filter values in quotation marks for clarity</li>
                <li>Display logical operators between filters</li>
                <li>Make the configure button easily accessible</li>
                <li>Use monospace font for technical values</li>
                <li>Show active filter count for quick reference</li>
              </ul>
            </div>

            <div className="current-config-docs__guideline current-config-docs__guideline--dont">
              <div className="current-config-docs__guideline-header">
                <svg className="current-config-docs__guideline-icon current-config-docs__guideline-icon--error" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 15A7 7 0 118 1a7 7 0 010 14zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
                <h4>Don't</h4>
              </div>
              <ul>
                <li>Show incomplete or invalid filter configurations</li>
                <li>Use technical field names without proper labels</li>
                <li>Hide the configure action when configuration is possible</li>
                <li>Make the component too wide for sidebar use</li>
                <li>Show confusing or unclear filter relationships</li>
                <li>Use this component for real-time filter editing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div className="current-config-docs__section">
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
                The configure button is fully keyboard accessible with Enter/Space activation and clear focus indication.
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
                Clear section headings and descriptive content structure. Filter relationships are clearly communicated through logical operators.
              </p>
            </div>

            <div>
              <h4 style={{ marginBottom: '12px' }}>Visual Design</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                High contrast colors and clear visual hierarchy. Uses monospace font for technical values to improve readability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <SegmentQueryConfiguration
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onApply={handleApply}
        availableFields={sampleFields}
        availableOperators={sampleOperators}
      />
    </>
  );
}