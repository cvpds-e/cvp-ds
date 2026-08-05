import React, { useState, useRef } from 'react';
import { Toggle } from './Toggle';

export function ToggleDocumentation() {
  const [basicChecked, setBasicChecked] = useState(false);
  const [controlledChecked, setControlledChecked] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [smallSizeChecked, setSmallSizeChecked] = useState(true);
  
  // States section
  const [stateDefault, setStateDefault] = useState(false);
  const [stateChecked, setStateChecked] = useState(true);
  const [stateWithDescription, setStateWithDescription] = useState(true);
  const [stateSmall, setStateSmall] = useState(true);
  const [stateIndeterminate, setStateIndeterminate] = useState(false);

  // Settings Panel with indeterminate state
  const [dataSync, setDataSync] = useState<boolean>(true);
  const [isDataSyncIndeterminate, setIsDataSyncIndeterminate] = useState(true);
  const ignoreNextChange = useRef(false);

  const handleDataSyncChange = (checked: boolean) => {
    console.log('handleDataSyncChange called with:', checked, 'isDataSyncIndeterminate:', isDataSyncIndeterminate, 'ignoreNextChange:', ignoreNextChange.current);
    
    // Ignore this call if we're in the process of transitioning from indeterminate
    if (ignoreNextChange.current) {
      ignoreNextChange.current = false;
      console.log('Ignoring this onChange call');
      return;
    }
    
    // When clicking from indeterminate state, always go to enabled (true)
    if (isDataSyncIndeterminate) {
      setDataSync(true);
      setIsDataSyncIndeterminate(false);
      // Set flag to ignore the next onChange call that happens due to state update
      ignoreNextChange.current = true;
    } else {
      setDataSync(checked);
    }
  };

  const resetDataSync = () => {
    setDataSync(true);
    setIsDataSyncIndeterminate(true);
    ignoreNextChange.current = false;
  };

  return (
    <>
      <style>{`
        .toggle-docs {
          --toggle-docs-padding: var(--doc-padding);
          --toggle-docs-max-width: var(--doc-max-width);
          --toggle-docs-font-family: var(--doc-font-family);
          --toggle-docs-section-spacing: var(--doc-section-spacing);
          --toggle-docs-item-spacing: var(--doc-item-spacing);

          padding: var(--toggle-docs-padding);
          max-width: var(--toggle-docs-max-width);
          font-family: var(--toggle-docs-font-family);
          box-sizing: border-box;
        }

        .toggle-docs__section {
          margin-bottom: var(--toggle-docs-section-spacing);
        }

        .toggle-docs__item {
          margin-bottom: var(--toggle-docs-item-spacing);
        }

        .toggle-docs__example {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .toggle-docs__example-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .toggle-docs__example-item {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .toggle-docs__example-title {
          font-size: var(--type-scale-l-size);
          font-weight: var(--type-scale-l-weight);
          line-height: var(--type-scale-l-line-height);
          letter-spacing: var(--type-scale-l-letter-spacing);
          color: var(--foreground);
          margin: 0 0 12px 0;
        }

        .toggle-docs__status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--status-badge-gap);
          padding: var(--status-badge-padding);
          background-color: var(--status-badge-success-bg);
          color: var(--status-badge-success-text);
          border-radius: var(--status-badge-border-radius);
          font-size: var(--status-badge-font-size);
          font-weight: var(--status-badge-font-weight);
          margin-bottom: 24px;
        }

        .toggle-docs__status-dot {
          width: 6px;
          height: 6px;
          background-color: currentColor;
          border-radius: 50%;
        }

        .toggle-docs__table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }

        .toggle-docs__table-header {
          background-color: var(--muted);
          text-align: left;
        }

        .toggle-docs__table-header-cell {
          padding: 12px 16px;
          font-size: var(--type-scale-s-size);
          font-weight: var(--font-weight-medium);
          color: var(--foreground);
          border-bottom: 1px solid var(--border-default);
        }

        .toggle-docs__table-cell {
          padding: 12px 16px;
          font-size: var(--type-scale-s-size);
          color: var(--foreground);
          border-bottom: 1px solid var(--border-default);
        }

        .toggle-docs__table-cell--code {
          font-family: var(--font-family-mono);
          color: var(--muted-foreground);
        }

        .toggle-docs__guidelines {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .toggle-docs__guideline-section {
          padding: 24px;
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
        }

        .toggle-docs__guideline-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }

        .toggle-docs__guideline-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .toggle-docs__guideline-icon--do {
          background-color: var(--color-green-500);
        }

        .toggle-docs__guideline-icon--dont {
          background-color: var(--destructive);
        }

        .toggle-docs__guideline-title {
          margin: 0 0 8px 0;
          color: var(--foreground);
        }

        .toggle-docs__guideline-list {
          margin: 0;
          padding-left: 0;
          list-style: none;
        }

        .toggle-docs__guideline-item {
          margin-bottom: 8px;
          font-size: var(--type-scale-s-size);
          color: var(--foreground);
        }

        .toggle-docs__reset-button {
          padding: 8px 16px;
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 4px;
          color: var(--foreground);
          cursor: pointer;
          font-size: var(--type-scale-s-size);
          font-family: var(--font-family);
          transition: background-color 0.2s ease, border-color 0.2s ease;
          align-self: flex-start;
        }

        .toggle-docs__reset-button:hover {
          background-color: var(--muted);
          border-color: var(--muted-foreground);
        }

        .toggle-docs__reset-button:active {
          background-color: var(--background);
        }

        @media (max-width: 768px) {
          .toggle-docs__guidelines {
            grid-template-columns: 1fr;
          }

          .toggle-docs__example-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="toggle-docs">
        {/* Header */}
        <div className="toggle-docs__section">
          <h1 style={{ marginBottom: '16px' }}>Toggle</h1>
          <p style={{ 
            fontSize: 'var(--type-scale-l-size)',
            lineHeight: 'var(--type-scale-l-line-height)',
            color: 'var(--muted-foreground)',
            marginBottom: '24px'
          }}>
            A binary switch control that allows users to toggle between on and off states. The toggle provides clear visual feedback with a sliding thumb animation and supports keyboard navigation, disabled states, indeterminate states with a dash icon, and optional labels with descriptions.
          </p>
          
          <div className="toggle-docs__status-badge">
            <div className="toggle-docs__status-dot" />
            Stable
          </div>
        </div>

        {/* Example */}
        <section className="toggle-docs__section">
          <h2 style={{ marginBottom: '24px' }}>Example</h2>
          
          <div className="toggle-docs__example">
            <h3 className="toggle-docs__example-title">Basic Usage</h3>
            <div className="toggle-docs__example-grid">
              <div className="toggle-docs__example-item">
                <Toggle
                  label="Uncontrolled Toggle"
                  defaultChecked={false}
                />
                <Toggle
                  label="Controlled Toggle"
                  checked={controlledChecked}
                  onChange={setControlledChecked}
                />
                <Toggle
                  label="With Description"
                  description="This toggle includes additional description text"
                  checked={basicChecked}
                  onChange={setBasicChecked}
                />
              </div>
              
              <div className="toggle-docs__example-item">
                <Toggle
                  label="Disabled (Off)"
                  disabled
                />
                <Toggle
                  label="Disabled (On)"
                  checked={true}
                  disabled
                />
                <Toggle
                  label="Small Size"
                  size="small"
                  checked={smallSizeChecked}
                  onChange={setSmallSizeChecked}
                />
              </div>
            </div>
          </div>

          <div className="toggle-docs__example">
            <h3 className="toggle-docs__example-title">Settings Panel Example</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
              <Toggle
                label="Enable Notifications"
                description="Receive push notifications for important updates"
                checked={notifications}
                onChange={setNotifications}
              />
              <Toggle
                label="Email Alerts"
                description="Get email notifications for critical events"
                checked={emailAlerts}
                onChange={setEmailAlerts}
              />
              <Toggle
                label="Auto-Save"
                description="Automatically save your work every 5 minutes"
                checked={autoSave}
                onChange={setAutoSave}
              />
              <Toggle
                label="Dark Mode"
                description="Switch to dark theme for reduced eye strain"
                checked={darkMode}
                onChange={setDarkMode}
              />
              <Toggle
                label="Data Sync"
                description="Enable automatic data synchronization"
                checked={isDataSyncIndeterminate ? false : dataSync}
                indeterminate={isDataSyncIndeterminate}
                onChange={handleDataSyncChange}
              />
              <button
                className="toggle-docs__reset-button"
                onClick={resetDataSync}
              >
                Reset Data Sync
              </button>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="toggle-docs__section">
          <h2 style={{ marginBottom: '24px' }}>Specifications</h2>
          
          <p style={{ 
            marginBottom: '16px',
            color: 'var(--muted-foreground)',
            fontSize: '14px'
          }}>
            Color values shown for both Dark Theme and Light Theme where applicable.
          </p>

          <div className="toggle-docs__table-container">
            <table className="toggle-docs__table">
              <thead>
                <tr>
                  <th className="toggle-docs__table-header">Property</th>
                  <th className="toggle-docs__table-header">Value</th>
                  <th className="toggle-docs__table-header">Token</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="toggle-docs__table-cell">Toggle width (default)</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">36px</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-width</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Toggle width (small)</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">28px</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-width</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Toggle height (default)</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">20px</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-height</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Toggle height (small)</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">16px</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-height</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Thumb size (default)</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">16px</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-thumb-size</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Thumb size (small)</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">12px</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-thumb-size</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Border radius</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">10px (default), 8px (small)</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-border-radius</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Background (off)</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">Dark: #45454a / Light: #d1d5db</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-bg</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Background (on)</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">Dark: #3d63dd / Light: #2563eb</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-checked-bg</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Background (hover)</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">Dark: #6f8be6 / Light: #6f8be6</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-hover-bg</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Thumb color</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">Dark: #fff / Light: #fff</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-thumb-bg</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Disabled background</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">Dark: #4a4a4a / Light: #e5e7eb</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-disabled-bg</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Disabled thumb</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">Dark: #A1A1A8 / Light: #9ca3af</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-disabled-thumb-bg</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Disabled checked background</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">Dark: #A1A1A8 / Light: #9ca3af</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-disabled-checked-bg</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Disabled checked thumb</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">Dark: #333 / Light: #fff</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-disabled-checked-thumb-bg</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Focus ring</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">Dark: 0 0 0 3px rgba(111, 139, 230, 0.25) / Light: 0 0 0 3px rgba(37, 99, 235, 0.20)</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--focus-ring</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Gap (label spacing)</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">8px</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--toggle-gap</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Font size</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">14px</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--type-scale-m-size</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Font weight</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">400</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--type-scale-m-weight</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Line height</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">20px</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--type-scale-m-line-height</td>
                </tr>
                <tr>
                  <td className="toggle-docs__table-cell">Letter spacing</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">0.15px</td>
                  <td className="toggle-docs__table-cell toggle-docs__table-cell--code">--type-scale-m-letter-spacing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="toggle-docs__section">
          <h2 style={{ marginBottom: '24px' }}>Usage Guidelines</h2>
          <div className="toggle-docs__guidelines">
            <div className="toggle-docs__guideline-section">
              <div className="toggle-docs__guideline-header">
                <div className="toggle-docs__guideline-icon toggle-docs__guideline-icon--do">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="toggle-docs__guideline-title">Do</h4>
                  <ul className="toggle-docs__guideline-list">
                    <li className="toggle-docs__guideline-item">• Use for binary on/off settings</li>
                    <li className="toggle-docs__guideline-item">• Provide clear labels that describe what the toggle controls</li>
                    <li className="toggle-docs__guideline-item">• Use descriptions for additional context when needed</li>
                    <li className="toggle-docs__guideline-item">• Apply changes immediately when toggled</li>
                    <li className="toggle-docs__guideline-item">• Group related toggles together in settings panels</li>
                    <li className="toggle-docs__guideline-item">• Use the small size variant for compact layouts</li>
                    <li className="toggle-docs__guideline-item">• Ensure sufficient spacing between multiple toggles</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="toggle-docs__guideline-section">
              <div className="toggle-docs__guideline-header">
                <div className="toggle-docs__guideline-icon toggle-docs__guideline-icon--dont">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M9 3L3 9M3 3l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="toggle-docs__guideline-title">Don't</h4>
                  <ul className="toggle-docs__guideline-list">
                    <li className="toggle-docs__guideline-item">• Use for selections between more than two options (use radio buttons or select instead)</li>
                    <li className="toggle-docs__guideline-item">• Require a confirmation dialog for toggle changes</li>
                    <li className="toggle-docs__guideline-item">• Use ambiguous labels like "Yes/No" or "On/Off"</li>
                    <li className="toggle-docs__guideline-item">• Use toggles in forms that require a submit action</li>
                    <li className="toggle-docs__guideline-item">• Disable toggles without clear explanation</li>
                    <li className="toggle-docs__guideline-item">• Stack too many toggles without grouping or headings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="toggle-docs__section">
          <h2 style={{ marginBottom: '24px' }}>States</h2>
          <div className="toggle-docs__example">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Default (Off)</h4>
                <Toggle 
                  label="Default state" 
                  checked={stateDefault}
                  onChange={setStateDefault}
                />
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Checked (On)</h4>
                <Toggle 
                  label="Checked state" 
                  checked={stateChecked}
                  onChange={setStateChecked}
                />
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Disabled Off</h4>
                <Toggle label="Disabled off state" disabled />
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Disabled On</h4>
                <Toggle label="Disabled on state" checked={true} disabled />
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>With Description</h4>
                <Toggle 
                  label="Toggle with description" 
                  description="Additional context about this toggle option"
                  checked={stateWithDescription}
                  onChange={setStateWithDescription}
                />
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Small Size</h4>
                <Toggle 
                  label="Small size variant" 
                  size="small" 
                  checked={stateSmall}
                  onChange={setStateSmall}
                />
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Indeterminate</h4>
                <Toggle 
                  label="Indeterminate state" 
                  description="Shows a dash icon in the center indicating a partial or intermediate state"
                  checked={stateIndeterminate}
                  indeterminate={true}
                  onChange={setStateIndeterminate}
                />
              </div>
              
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Disabled Indeterminate</h4>
                <Toggle 
                  label="Disabled indeterminate state" 
                  description="Indeterminate state in disabled mode"
                  indeterminate={true}
                  disabled
                />
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="toggle-docs__section">
          <h2 style={{ marginBottom: '24px' }}>Accessibility</h2>
          <div style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '20px', 
              color: 'var(--muted-foreground)',
              fontSize: 'var(--type-scale-s-size)'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--foreground)' }}>Keyboard Navigation:</strong> Toggle can be activated using Space or Enter keys when focused
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--foreground)' }}>ARIA Support:</strong> Uses proper aria-checked attribute to indicate state
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--foreground)' }}>Focus Indication:</strong> Clear focus ring appears when navigating with keyboard
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--foreground)' }}>Screen Readers:</strong> Labels and descriptions are properly associated with the toggle control
              </li>
              <li>
                <strong style={{ color: 'var(--foreground)' }}>Disabled State:</strong> Disabled toggles are not focusable and cannot be activated
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}