import React, { useState } from 'react';
import { Checkbox, CheckboxState } from './Checkbox';

export function CheckboxDocumentation() {
  const [basicChecked, setBasicChecked] = useState<CheckboxState>(false);
  const [controlledChecked, setControlledChecked] = useState<CheckboxState>(true);
  const [indeterminateState, setIndeterminateState] = useState<CheckboxState>('indeterminate');
  const [groupSelection, setGroupSelection] = useState<string[]>(['video', 'audio']);
  const [contentTypes, setContentTypes] = useState<string[]>(['unknown', 'audio']);
  const [formats, setFormats] = useState<string[]>([]);

  const handleGroupChange = (value: string, checked: CheckboxState) => {
    setGroupSelection(prev => {
      if (checked === true) {
        return [...prev, value];
      } else {
        return prev.filter(item => item !== value);
      }
    });
  };

  const handleContentTypeChange = (value: string, checked: CheckboxState) => {
    setContentTypes(prev => {
      if (checked === true) {
        return [...prev, value];
      } else {
        return prev.filter(item => item !== value);
      }
    });
  };

  const handleFormatChange = (value: string, checked: CheckboxState) => {
    setFormats(prev => {
      if (checked === true) {
        return [...prev, value];
      } else {
        return prev.filter(item => item !== value);
      }
    });
  };

  return (
    <>
      <style>{`
        .checkbox-docs {
          --checkbox-docs-padding: var(--doc-padding);
          --checkbox-docs-max-width: var(--doc-max-width);
          --checkbox-docs-font-family: var(--doc-font-family);
          --checkbox-docs-section-spacing: var(--doc-section-spacing);
          --checkbox-docs-item-spacing: var(--doc-item-spacing);

          padding: var(--checkbox-docs-padding);
          max-width: var(--checkbox-docs-max-width);
          font-family: var(--checkbox-docs-font-family);
          box-sizing: border-box;
        }

        .checkbox-docs__section {
          margin-bottom: var(--checkbox-docs-section-spacing);
        }

        .checkbox-docs__item {
          margin-bottom: var(--checkbox-docs-item-spacing);
        }

        .checkbox-docs__example {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .checkbox-docs__example-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .checkbox-docs__example-item {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .checkbox-docs__example-title {
          font-size: var(--type-scale-l-size);
          font-weight: var(--type-scale-l-weight);
          line-height: var(--type-scale-l-line-height);
          letter-spacing: var(--type-scale-l-letter-spacing);
          color: var(--foreground);
          margin: 0 0 12px 0;
        }

        .checkbox-docs__status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--status-badge-gap);
          padding: var(--status-badge-padding);
          border-radius: var(--status-badge-border-radius);
          font-size: var(--status-badge-font-size);
          font-weight: var(--status-badge-font-weight);
        }

        .checkbox-docs__status-badge--stable {
          background-color: var(--color-green-800);
          color: var(--color-green-200);
        }

        .checkbox-docs__status-dot {
          width: var(--status-badge-dot-size);
          height: var(--status-badge-dot-size);
          border-radius: 50%;
          background-color: var(--color-green-400);
        }

        .checkbox-docs__selection-display {
          margin-top: 12px;
          padding: 12px;
          background-color: var(--muted);
          border-radius: 4px;
          font-size: var(--type-scale-s-size);
          color: var(--muted-foreground);
        }

        .checkbox-docs__checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .checkbox-docs__group-title {
          font-size: var(--type-scale-l-size);
          font-weight: var(--type-scale-l-weight);
          color: var(--foreground);
          margin: 0 0 12px 0;
        }

        .checkbox-docs__group-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .checkbox-docs__guidelines {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--guidelines-grid-gap);
          margin-bottom: var(--checkbox-docs-section-spacing);
        }

        .checkbox-docs__guideline {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: var(--guidelines-border-radius);
          padding: var(--guidelines-padding);
        }

        .checkbox-docs__guideline-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .checkbox-docs__guideline-icon {
          width: var(--guidelines-icon-size);
          height: var(--guidelines-icon-size);
          color: var(--color-green-400);
        }

        .checkbox-docs__guideline-icon--warning {
          color: var(--color-amber-400);
        }

        .checkbox-docs__guideline h4 {
          margin: 0;
          color: var(--foreground);
        }

        .checkbox-docs__guideline ul {
          margin: 0;
          padding-left: 16px;
        }

        .checkbox-docs__guideline li {
          margin-bottom: 4px;
          color: var(--muted-foreground);
        }
      `}</style>

      <div className="checkbox-docs">
        {/* Header */}
        <div className="checkbox-docs__section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h1 style={{ margin: 0 }}>Checkbox</h1>
            <div className="checkbox-docs__status-badge checkbox-docs__status-badge--stable">
              <div className="checkbox-docs__status-dot" />
              Stable
            </div>
          </div>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '24px' }}>
            A checkbox input component that allows users to select one or more options from a set. Features clear visual states, keyboard accessibility, and seamless integration with the design system.
          </p>
        </div>

        {/* Basic Usage */}
        <div className="checkbox-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Basic Usage</h2>
          <div className="checkbox-docs__example">
            <div className="checkbox-docs__example-item">
              <h4 className="checkbox-docs__example-title">Simple Checkbox (Click to cycle through states)</h4>
              <div className="checkbox-docs__checkbox-group">
                <Checkbox
                  id="basic-checkbox"
                  label="Enable notifications"
                  checked={basicChecked}
                  onChange={setBasicChecked}
                />
                <Checkbox
                  id="with-description"
                  label="Marketing emails"
                  description="Receive updates about new features and promotions"
                  defaultChecked={false}
                />
              </div>
              <div className="checkbox-docs__selection-display">
                Basic checkbox: {
                  basicChecked === true ? 'Checked' : 
                  basicChecked === 'indeterminate' ? 'Indeterminate' : 
                  'Unchecked'
                } (Cycles: Unchecked → Checked → Indeterminate → Unchecked)
              </div>
            </div>
          </div>
        </div>

        {/* States */}
        <div className="checkbox-docs__section">
          <h2 style={{ marginBottom: '16px' }}>States</h2>
          <div className="checkbox-docs__example">
            <div className="checkbox-docs__example-grid">
              <div className="checkbox-docs__example-item">
                <h4 className="checkbox-docs__example-title">Default States</h4>
                <div className="checkbox-docs__checkbox-group">
                  <Checkbox
                    id="unchecked"
                    label="Unchecked"
                  />
                  <Checkbox
                    id="checked"
                    label="Checked"
                    defaultChecked={true}
                  />
                  <Checkbox
                    id="indeterminate"
                    label="Indeterminate"
                    checked={indeterminateState}
                    onChange={setIndeterminateState}
                  />
                  <Checkbox
                    id="controlled"
                    label="Controlled (click to cycle)"
                    checked={controlledChecked}
                    onChange={setControlledChecked}
                  />
                </div>
              </div>
              <div className="checkbox-docs__example-item">
                <h4 className="checkbox-docs__example-title">Disabled States</h4>
                <div className="checkbox-docs__checkbox-group">
                  <Checkbox
                    id="disabled-unchecked"
                    label="Disabled unchecked"
                    disabled
                  />
                  <Checkbox
                    id="disabled-checked"
                    label="Disabled checked"
                    defaultChecked={true}
                    disabled
                  />
                  <Checkbox
                    id="disabled-indeterminate"
                    label="Disabled indeterminate"
                    defaultChecked="indeterminate"
                    disabled
                  />
                  <Checkbox
                    id="disabled-with-description"
                    label="Disabled with description"
                    description="This option is not available"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkbox Groups - Inspired by the screenshot */}
        <div className="checkbox-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Checkbox Groups</h2>
          <div className="checkbox-docs__example">
            <div className="checkbox-docs__example-grid">
              <div className="checkbox-docs__example-item">
                <h4 className="checkbox-docs__group-title">Match Content Types</h4>
                <div className="checkbox-docs__group-grid">
                  <Checkbox
                    id="unknown"
                    label="(Unknown)"
                    checked={contentTypes.includes('unknown')}
                    onChange={(checked) => handleContentTypeChange('unknown', checked)}
                  />
                  <Checkbox
                    id="audio"
                    label="Audio"
                    checked={contentTypes.includes('audio')}
                    onChange={(checked) => handleContentTypeChange('audio', checked)}
                  />
                  <Checkbox
                    id="document"
                    label="Document"
                    checked={contentTypes.includes('document')}
                    onChange={(checked) => handleContentTypeChange('document', checked)}
                  />
                  <Checkbox
                    id="executable"
                    label="Executable"
                    checked={contentTypes.includes('executable')}
                    onChange={(checked) => handleContentTypeChange('executable', checked)}
                  />
                  <Checkbox
                    id="image"
                    label="Image"
                    checked={contentTypes.includes('image')}
                    onChange={(checked) => handleContentTypeChange('image', checked)}
                  />
                  <Checkbox
                    id="video"
                    label="Video"
                    checked={contentTypes.includes('video')}
                    onChange={(checked) => handleContentTypeChange('video', checked)}
                  />
                </div>
                <div className="checkbox-docs__selection-display">
                  Selected: {contentTypes.length > 0 ? contentTypes.join(', ') : 'None'}
                </div>
              </div>

              <div className="checkbox-docs__example-item">
                <h4 className="checkbox-docs__group-title">Match Formats</h4>
                <div className="checkbox-docs__group-grid">
                  <Checkbox
                    id="mpeg"
                    label="MPEG"
                    checked={formats.includes('mpeg')}
                    onChange={(checked) => handleFormatChange('mpeg', checked)}
                  />
                  <Checkbox
                    id="mpeg-dash"
                    label="MPEG-DASH"
                    checked={formats.includes('mpeg-dash')}
                    onChange={(checked) => handleFormatChange('mpeg-dash', checked)}
                  />
                  <Checkbox
                    id="mp3"
                    label="MP3"
                    checked={formats.includes('mp3')}
                    onChange={(checked) => handleFormatChange('mp3', checked)}
                  />
                  <Checkbox
                    id="sami"
                    label="SAMI"
                    checked={formats.includes('sami')}
                    onChange={(checked) => handleFormatChange('sami', checked)}
                  />
                  <Checkbox
                    id="vast"
                    label="VAST"
                    checked={formats.includes('vast')}
                    onChange={(checked) => handleFormatChange('vast', checked)}
                  />
                  <Checkbox
                    id="vmap"
                    label="VMAP"
                    checked={formats.includes('vmap')}
                    onChange={(checked) => handleFormatChange('vmap', checked)}
                  />
                  <Checkbox
                    id="webvtt"
                    label="WebVTT"
                    checked={formats.includes('webvtt')}
                    onChange={(checked) => handleFormatChange('webvtt', checked)}
                  />
                </div>
                <div className="checkbox-docs__selection-display">
                  Selected: {formats.length > 0 ? formats.join(', ') : 'None'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="checkbox-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Specifications</h2>
          
          <p style={{ 
            marginBottom: '16px',
            color: 'var(--muted-foreground)',
            fontSize: '14px'
          }}>
            Color values shown for both Dark Theme and Light Theme where applicable.
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
                  { property: 'Font Family', value: 'Inter, sans-serif', token: '--font-family' },
                  { property: 'Font Size', value: '14px', token: '--type-scale-m-size' },
                  { property: 'Font Weight', value: '400', token: '--type-scale-m-weight' },
                  { property: 'Line Height', value: '20px', token: '--type-scale-m-line-height' },
                  { property: 'Letter Spacing', value: '0.15px', token: '--type-scale-m-letter-spacing' },
                  { property: 'Checkbox Size', value: '16px × 16px', token: '--checkbox-size' },
                  { property: 'Border Radius', value: '3px', token: '--checkbox-border-radius' },
                  { property: 'Border Width', value: '1px', token: '--checkbox-border-width' },
                  { property: 'Gap (Box to Label)', value: '8px', token: '--checkbox-gap' },
                  { property: 'Background (Default)', value: 'Dark: #212123 / Light: #ffffff', token: '--checkbox-default-bg' },
                  { property: 'Border (Default)', value: 'Dark: #45454a / Light: #d1d5db', token: '--checkbox-default-border' },
                  { property: 'Border (Hover)', value: 'Dark: #6f8be6 / Light: #6f8be6', token: '--checkbox-hover-border-color' },
                  { property: 'Background (Checked)', value: 'Dark: #3d63dd / Light: #2563eb', token: '--checkbox-checked-bg-color' },
                  { property: 'Border (Checked)', value: 'Dark: #3d63dd / Light: #2563eb', token: '--checkbox-checked-border-color' },
                  { property: 'Checkmark Color', value: 'Dark: #ffffff / Light: #ffffff', token: '--checkbox-checked-text-color' },
                  { property: 'Background (Disabled)', value: 'Dark: #2a2a35 / Light: #f3f4f6', token: '--checkbox-disabled-bg-color' },
                  { property: 'Border (Disabled)', value: 'Dark: #45454a / Light: #e5e7eb', token: '--checkbox-disabled-border-color' },
                  { property: 'Text (Disabled)', value: 'Dark: #A1A1A8 / Light: #9ca3af', token: '--checkbox-disabled-text-color' },
                  { property: 'Background (Disabled Checked)', value: 'Dark: #A1A1A8 / Light: #9ca3af', token: '--checkbox-disabled-checked-bg-color' },
                  { property: 'Border (Disabled Checked)', value: 'Dark: #A1A1A8 / Light: #9ca3af', token: '--checkbox-disabled-checked-border-color' },
                  { property: 'Icon (Disabled Checked)', value: 'Dark: #333333 / Light: #ffffff', token: '--checkbox-disabled-checked-icon-color' },
                  { property: 'Label Color', value: 'Dark: #ffffff / Light: #111827', token: '--checkbox-label-color' },
                  { property: 'Description Color', value: 'Dark: #b4b4ba / Light: #6b7280', token: '--checkbox-description-color' },
                  { property: 'Description Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Description Line Height', value: '20px', token: '--type-scale-s-line-height' },
                  { property: 'Description Margin Top', value: '2px', token: '--checkbox-description-margin-top' },
                  { property: 'Focus Ring', value: 'Dark: #6f8be6 / Light: #2563eb', token: '--focus-ring' },
                  { property: 'Focus Glow', value: 'Dark: 0 0 0 3px rgba(111, 139, 230, 0.25) / Light: 0 0 0 3px rgba(37, 99, 235, 0.20)', token: '--checkbox-focus-ring' },
                  { property: 'Icon Size', value: '10px × 10px', token: '—' },
                  { property: 'Cursor (Default)', value: 'pointer', token: '--checkbox-cursor' },
                  { property: 'Cursor (Disabled)', value: 'not-allowed', token: '--checkbox-disabled-cursor' },
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
        <div className="checkbox-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Usage Guidelines</h2>
          <div className="checkbox-docs__guidelines">
            <div className="checkbox-docs__guideline">
              <div className="checkbox-docs__guideline-header">
                <svg className="checkbox-docs__guideline-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 2a6 6 0 110 12A6 6 0 018 2zm0 1a5 5 0 100 10A5 5 0 008 3zm.5 2.5a.5.5 0 00-1 0v3h-1.5a.5.5 0 000 1h2a.5.5 0 00.5-.5v-3.5z"/>
                </svg>
                <h4>When to Use</h4>
              </div>
              <ul>
                <li>For multiple selection from a list of options</li>
                <li>When users need to enable/disable features or settings</li>
                <li>For filter interfaces where multiple criteria can be applied</li>
                <li>When the option state needs to be clearly visible</li>
                <li>Use indeterminate state for parent checkboxes when some (but not all) children are selected</li>
              </ul>
            </div>

            <div className="checkbox-docs__guideline">
              <div className="checkbox-docs__guideline-header">
                <svg className="checkbox-docs__guideline-icon checkbox-docs__guideline-icon--warning" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8.982 1.566a1.13 1.13 0 00-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.706c.89 0 1.438-.99.982-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
                <h4>When Not to Use</h4>
              </div>
              <ul>
                <li>For single selection only (use radio buttons instead)</li>
                <li>For binary on/off states (use toggle switches instead)</li>
                <li>When the list of options is very long (consider other UI patterns)</li>
                <li>For actions that take immediate effect (use buttons instead)</li>
              </ul>
            </div>

            <div className="checkbox-docs__guideline">
              <div className="checkbox-docs__guideline-header">
                <svg className="checkbox-docs__guideline-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.5 3A1.5 1.5 0 004 1.5h8A1.5 1.5 0 0013.5 3v10a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 012.5 13V3zm1.5-.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h8a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H4z"/>
                  <path d="M10.854 7.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 11.708-.708L7.5 9.793l2.646-2.647a.5.5 0 01.708 0z"/>
                </svg>
                <h4>Best Practices</h4>
              </div>
              <ul>
                <li>Use clear, descriptive labels for each checkbox</li>
                <li>Group related checkboxes with section headers</li>
                <li>Consider adding descriptions for complex options</li>
                <li>Provide visual feedback for all interactive states</li>
                <li>Use consistent spacing in checkbox groups</li>
                <li>Consider default selections for common use cases</li>
                <li>Use indeterminate state to show partial selection in nested lists</li>
                <li>Clicking cycles through: unchecked → checked → indeterminate → unchecked</li>
              </ul>
            </div>

            <div className="checkbox-docs__guideline">
              <div className="checkbox-docs__guideline-header">
                <svg className="checkbox-docs__guideline-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1a7 7 0 104.95 11.95l.707.707A8.001 8.001 0 118 0v1z"/>
                  <path d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z"/>
                </svg>
                <h4>Accessibility</h4>
              </div>
              <ul>
                <li>Fully keyboard navigable (Tab, Space, Enter)</li>
                <li>Screen reader support with proper ARIA attributes</li>
                <li>Clear focus indicators for all interactive elements</li>
                <li>Descriptive labels and optional descriptions</li>
                <li>Proper contrast ratios for all states</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}