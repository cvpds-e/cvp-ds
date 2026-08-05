import React, { useState } from 'react';
import { ToastProvider, useToast } from './Toast';
import { PrimaryButton } from './PrimaryButton';
import { OutlineButton } from './OutlineButton';

function ToastExamples() {
  const { addToast, clearAll } = useToast();
  const [customDuration, setCustomDuration] = useState(3000);

  const showSuccessToast = () => {
    addToast({
      variant: 'success',
      title: 'Success!',
      description: 'Your changes have been saved successfully.',
    });
  };

  const showWarningToast = () => {
    addToast({
      variant: 'warning',
      title: 'Warning',
      description: 'Please review your input before continuing.',
    });
  };

  const showDangerToast = () => {
    addToast({
      variant: 'danger',
      title: 'Error',
      description: 'Something went wrong. Please try again.',
    });
  };

  const showInfoToast = () => {
    addToast({
      variant: 'info',
      title: 'Information',
      description: 'This is an informational message.',
    });
  };

  const showSimpleToast = () => {
    addToast({
      variant: 'info',
      description: 'This is a simple toast without a title.',
    });
  };

  const showPersistentToast = () => {
    addToast({
      variant: 'warning',
      title: 'Persistent Toast',
      description: 'This toast will not auto-dismiss.',
      duration: 0,
    });
  };

  const showCustomDurationToast = () => {
    addToast({
      variant: 'success',
      title: 'Custom Duration',
      description: `This toast will dismiss in ${customDuration / 1000} seconds.`,
      duration: customDuration,
    });
  };

  const showNonDismissibleToast = () => {
    addToast({
      variant: 'danger',
      title: 'Non-dismissible',
      description: 'This toast cannot be manually dismissed.',
      dismissible: false,
      duration: 8000,
    });
  };

  return (
    <>
      <style>{`
        .toast-docs {
          --toast-docs-padding: var(--doc-padding);
          --toast-docs-max-width: var(--doc-max-width);
          --toast-docs-font-family: var(--doc-font-family);
          --toast-docs-section-spacing: var(--doc-section-spacing);
          --toast-docs-item-spacing: var(--doc-item-spacing);

          padding: var(--toast-docs-padding);
          max-width: var(--toast-docs-max-width);
          font-family: var(--toast-docs-font-family);
          box-sizing: border-box;
        }

        .toast-docs__section {
          margin-bottom: var(--toast-docs-section-spacing);
        }

        .toast-docs__item {
          margin-bottom: var(--toast-docs-item-spacing);
        }

        .toast-docs__example {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .toast-docs__example-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .toast-docs__example-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 16px;
        }

        .toast-docs__control {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .toast-docs__input {
          background-color: var(--input-bg);
          border: 1px solid var(--input-border);
          border-radius: var(--input-border-radius);
          color: var(--input-text);
          font-size: var(--input-font-size);
          padding: 4px 8px;
          width: 80px;
        }

        .toast-docs__input:focus {
          border-color: var(--input-focus-border);
          outline: none;
          box-shadow: var(--input-focus-glow);
        }

        .toast-docs__code {
          background-color: var(--muted);
          border: 1px solid var(--border-default);
          border-radius: 4px;
          padding: 12px;
          font-family: var(--font-family-mono);
          font-size: 13px;
          overflow-x: auto;
          white-space: pre;
        }

        .toast-docs__table {
          width: 100%;
          border-collapse: collapse;
          background-color: var(--card);
          border: var(--table-border);
          border-radius: 8px;
          overflow: hidden;
        }

        .toast-docs__table th {
          background-color: var(--table-header-bg);
          padding: var(--table-header-padding);
          text-align: left;
          font-weight: var(--table-header-font-weight);
          font-size: var(--table-font-size);
          border-bottom: var(--table-border);
        }

        .toast-docs__table td {
          padding: var(--table-cell-padding);
          font-size: var(--table-font-size);
          border-bottom: var(--table-border);
          vertical-align: top;
        }

        .toast-docs__table tr:last-child td {
          border-bottom: none;
        }

        .toast-docs__table code {
          background-color: var(--muted);
          padding: 2px 4px;
          border-radius: 2px;
          font-family: var(--font-family-mono);
          font-size: 12px;
        }

        .toast-docs__status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--status-badge-gap);
          padding: var(--status-badge-padding);
          border-radius: var(--status-badge-border-radius);
          font-size: var(--status-badge-font-size);
          font-weight: var(--status-badge-font-weight);
        }

        .toast-docs__status-badge--stable {
          background-color: var(--color-green-800);
          color: var(--color-green-200);
        }

        .toast-docs__status-dot {
          width: var(--status-badge-dot-size);
          height: var(--status-badge-dot-size);
          border-radius: 50%;
          background-color: var(--color-green-400);
        }

        .toast-docs__guidelines {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--guidelines-grid-gap);
          margin-bottom: var(--toast-docs-section-spacing);
        }

        .toast-docs__guideline {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: var(--guidelines-border-radius);
          padding: var(--guidelines-padding);
        }

        .toast-docs__guideline-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .toast-docs__guideline-icon {
          width: var(--guidelines-icon-size);
          height: var(--guidelines-icon-size);
          color: var(--color-green-400);
        }

        .toast-docs__guideline-icon--warning {
          color: var(--color-amber-400);
        }

        .toast-docs__guideline h4 {
          margin: 0;
          color: var(--foreground);
        }

        .toast-docs__guideline ul {
          margin: 0;
          padding-left: 16px;
        }

        .toast-docs__guideline li {
          margin-bottom: 4px;
          color: var(--muted-foreground);
        }

        .toast-docs__variant-demo {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .toast-docs__variant-card {
          background-color: var(--muted);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          padding: 16px;
          text-align: center;
        }

        .toast-docs__variant-preview {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin: 0 auto 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toast-docs__variant-preview--success {
          background-color: rgba(16, 185, 129, 0.2);
          color: var(--color-green-400);
        }

        .toast-docs__variant-preview--warning {
          background-color: rgba(245, 158, 11, 0.2);
          color: var(--color-amber-400);
        }

        .toast-docs__variant-preview--danger {
          background-color: rgba(239, 68, 68, 0.2);
          color: var(--color-red-400);
        }

        .toast-docs__variant-preview--info {
          background-color: rgba(59, 130, 246, 0.2);
          color: var(--color-blue-400);
        }
      `}</style>

      <div className="toast-docs">
        {/* Header */}
        <div className="toast-docs__section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h1 style={{ margin: 0 }}>Toast</h1>
            <div className="toast-docs__status-badge toast-docs__status-badge--stable">
              <div className="toast-docs__status-dot" />
              Stable
            </div>
          </div>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '24px' }}>
            A notification component that displays temporary messages to users with different severity levels and automatic dismissal.
          </p>
        </div>

        {/* Variants */}
        <div className="toast-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Variants</h2>
          <div className="toast-docs__variant-demo">
            <div className="toast-docs__variant-card">
              <div className="toast-docs__variant-preview toast-docs__variant-preview--success">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ fontWeight: 'var(--font-weight-medium)', marginBottom: '4px' }}>Success</div>
              <div style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>
                Positive actions and confirmations
              </div>
            </div>

            <div className="toast-docs__variant-card">
              <div className="toast-docs__variant-preview toast-docs__variant-preview--warning">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L15 15H1L8 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8" cy="12" r="1" fill="currentColor"/>
                </svg>
              </div>
              <div style={{ fontWeight: 'var(--font-weight-medium)', marginBottom: '4px' }}>Warning</div>
              <div style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>
                Cautionary messages and alerts
              </div>
            </div>

            <div className="toast-docs__variant-card">
              <div className="toast-docs__variant-preview toast-docs__variant-preview--danger">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M5.5 5.5L10.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ fontWeight: 'var(--font-weight-medium)', marginBottom: '4px' }}>Danger</div>
              <div style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>
                Errors and destructive actions
              </div>
            </div>

            <div className="toast-docs__variant-card">
              <div className="toast-docs__variant-preview toast-docs__variant-preview--info">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="8" cy="5" r="1" fill="currentColor"/>
                </svg>
              </div>
              <div style={{ fontWeight: 'var(--font-weight-medium)', marginBottom: '4px' }}>Info</div>
              <div style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>
                General information and updates
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="toast-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Interactive Examples</h2>
          <div className="toast-docs__example">
            <div className="toast-docs__example-row">
              <PrimaryButton onClick={showSuccessToast}>Show Success</PrimaryButton>
              <PrimaryButton onClick={showWarningToast}>Show Warning</PrimaryButton>
              <PrimaryButton onClick={showDangerToast}>Show Danger</PrimaryButton>
              <PrimaryButton onClick={showInfoToast}>Show Info</PrimaryButton>
            </div>
            
            <div className="toast-docs__example-row">
              <PrimaryButton onClick={showSimpleToast}>Simple Toast</PrimaryButton>
              <PrimaryButton onClick={showPersistentToast}>Persistent</PrimaryButton>
              <PrimaryButton onClick={showNonDismissibleToast}>Non-dismissible</PrimaryButton>
              <OutlineButton onClick={clearAll}>Clear All</OutlineButton>
            </div>

            <div className="toast-docs__example-row">
              <div className="toast-docs__control">
                <label htmlFor="duration-input" style={{ fontSize: 'var(--type-scale-s-size)' }}>
                  Custom Duration:
                </label>
                <input
                  id="duration-input"
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(Number(e.target.value))}
                  className="toast-docs__input"
                  min="1000"
                  max="10000"
                  step="500"
                />
                <span style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>ms</span>
              </div>
              <PrimaryButton onClick={showCustomDurationToast}>Show Custom</PrimaryButton>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="toast-docs__section">
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
                  { property: 'Border Radius', value: '6px', token: '--toast-border-radius' },
                  { property: 'Padding', value: '16px', token: '--toast-padding' },
                  { property: 'Min Width', value: '320px', token: '--toast-min-width' },
                  { property: 'Backdrop Filter', value: 'blur(8px)', token: '--toast-backdrop-filter' },
                  { property: 'Box Shadow', value: 'var(--toast-box-shadow)', token: '--toast-box-shadow' },
                  { property: 'Animation Duration', value: '0.3s cubic-bezier(0.4, 0, 0.2, 1)', token: '--toast-transition' },
                  { property: 'Container Position', value: 'fixed top: 24px, right: 24px', token: '--spacing-6' },
                  { property: 'Container Z-Index', value: '9999', token: '—' },
                  { property: 'Container Max Width', value: '400px', token: '—' },
                  { property: 'Container Gap', value: '12px', token: '--spacing-3' },
                  { property: 'Background (Default)', value: 'var(--toast-default-bg)', token: '--toast-default-bg' },
                  { property: 'Border (Default)', value: 'var(--toast-default-border)', token: '--toast-default-border' },
                  { property: 'Text (Default)', value: 'var(--toast-default-text)', token: '--toast-default-text' },
                  { property: 'Icon (Default)', value: 'var(--toast-default-icon)', token: '--toast-default-icon' },
                  { property: 'Background (Success)', value: 'var(--toast-success-bg)', token: '--toast-success-bg' },
                  { property: 'Border (Success)', value: 'var(--toast-success-border)', token: '--toast-success-border' },
                  { property: 'Text (Success)', value: 'var(--toast-success-text)', token: '--toast-success-text' },
                  { property: 'Icon (Success)', value: 'var(--toast-success-icon)', token: '--toast-success-icon' },
                  { property: 'Background (Warning)', value: 'var(--toast-warning-bg)', token: '--toast-warning-bg' },
                  { property: 'Border (Warning)', value: 'var(--toast-warning-border)', token: '--toast-warning-border' },
                  { property: 'Text (Warning)', value: 'var(--toast-warning-text)', token: '--toast-warning-text' },
                  { property: 'Icon (Warning)', value: 'var(--toast-warning-icon)', token: '--toast-warning-icon' },
                  { property: 'Background (Danger)', value: 'var(--toast-danger-bg)', token: '--toast-danger-bg' },
                  { property: 'Border (Danger)', value: 'var(--toast-danger-border)', token: '--toast-danger-border' },
                  { property: 'Text (Danger)', value: 'var(--toast-danger-text)', token: '--toast-danger-text' },
                  { property: 'Icon (Danger)', value: 'var(--toast-danger-icon)', token: '--toast-danger-icon' },
                  { property: 'Background (Info)', value: 'var(--toast-info-bg)', token: '--toast-info-bg' },
                  { property: 'Border (Info)', value: 'var(--toast-info-border)', token: '--toast-info-border' },
                  { property: 'Text (Info)', value: 'var(--toast-info-text)', token: '--toast-info-text' },
                  { property: 'Icon (Info)', value: 'var(--toast-info-icon)', token: '--toast-info-icon' },
                  { property: 'Icon Size', value: '16px × 16px', token: '—' },
                  { property: 'Icon Margin Top', value: '2px', token: '—' },
                  { property: 'Title Font Size', value: '14px', token: '--type-scale-m-size' },
                  { property: 'Title Font Weight', value: '500', token: '--type-scale-m-medium-weight' },
                  { property: 'Title Line Height', value: '20px', token: '--type-scale-m-line-height' },
                  { property: 'Title Letter Spacing', value: '0.15px', token: '--type-scale-m-letter-spacing' },
                  { property: 'Title Margin Bottom', value: '4px', token: '—' },
                  { property: 'Description Font Size', value: '13px', token: '--type-scale-s-size' },
                  { property: 'Description Font Weight', value: '400', token: '--type-scale-s-weight' },
                  { property: 'Description Line Height', value: '20px', token: '--type-scale-s-line-height' },
                  { property: 'Description Letter Spacing', value: '0.1px', token: '--type-scale-s-letter-spacing' },
                  { property: 'Description Opacity', value: '0.9', token: '—' },
                  { property: 'Dismiss Button Size', value: '20px × 20px', token: '—' },
                  { property: 'Dismiss Button Border Radius', value: '4px', token: '--radius-sm' },
                  { property: 'Dismiss Button Background', value: 'transparent', token: '—' },
                  { property: 'Dismiss Button Hover', value: 'rgba(255, 255, 255, 0.1)', token: '—' },
                  { property: 'Dismiss Button Icon Size', value: '12px × 12px', token: '—' },
                  { property: 'Focus Ring', value: '2px solid #67b3fb', token: '--focus-ring' },
                  { property: 'Focus Ring Offset', value: '2px', token: '—' },
                  { property: 'Hover Transform', value: 'translateY(-2px)', token: '—' },
                  { property: 'Slide-in Animation', value: 'translateX(100%) → translateX(0), opacity 0 → 1', token: '—' }
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
        <div className="toast-docs__section">
          <h2 style={{ marginBottom: '16px' }}>Usage Guidelines</h2>
          <div className="toast-docs__guidelines">
            <div className="toast-docs__guideline">
              <div className="toast-docs__guideline-header">
                <svg className="toast-docs__guideline-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 2a6 6 0 110 12A6 6 0 018 2zm0 1a5 5 0 100 10A5 5 0 008 3zm.5 2.5a.5.5 0 00-1 0v3h-1.5a.5.5 0 000 1h2a.5.5 0 00.5-.5v-3.5z"/>
                </svg>
                <h4>When to Use</h4>
              </div>
              <ul>
                <li>Provide feedback for user actions</li>
                <li>Display system notifications</li>
                <li>Show progress updates</li>
                <li>Communicate errors or warnings</li>
                <li>Confirm successful operations</li>
              </ul>
            </div>

            <div className="toast-docs__guideline">
              <div className="toast-docs__guideline-header">
                <svg className="toast-docs__guideline-icon toast-docs__guideline-icon--warning" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8.982 1.566a1.13 1.13 0 00-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.706c.89 0 1.438-.99.982-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
                <h4>When Not to Use</h4>
              </div>
              <ul>
                <li>For critical errors requiring immediate action</li>
                <li>When user input is required</li>
                <li>For permanent status information</li>
                <li>When content is too long or complex</li>
              </ul>
            </div>

            <div className="toast-docs__guideline">
              <div className="toast-docs__guideline-header">
                <svg className="toast-docs__guideline-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.5 3A1.5 1.5 0 004 1.5h8A1.5 1.5 0 0013.5 3v10a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 012.5 13V3zm1.5-.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h8a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H4z"/>
                  <path d="M10.854 7.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 11.708-.708L7.5 9.793l2.646-2.647a.5.5 0 01.708 0z"/>
                </svg>
                <h4>Best Practices</h4>
              </div>
              <ul>
                <li>Use appropriate variants for context</li>
                <li>Keep messages concise and clear</li>
                <li>Use titles for important notifications</li>
                <li>Consider duration based on message importance</li>
                <li>Don't stack too many toasts at once</li>
              </ul>
            </div>

            <div className="toast-docs__guideline">
              <div className="toast-docs__guideline-header">
                <svg className="toast-docs__guideline-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1a7 7 0 104.95 11.95l.707.707A8.001 8.001 0 118 0v1z"/>
                  <path d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z"/>
                </svg>
                <h4>Implementation</h4>
              </div>
              <ul>
                <li>Toasts use aria-live="polite" for screen readers</li>
                <li>Each toast has role="alert" for immediate attention</li>
                <li>Keyboard accessible with Tab and Escape keys</li>
                <li>Clear focus indicators on interactive elements</li>
                <li>Color is not the only indicator of meaning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ToastDocumentation() {
  return (
    <ToastProvider>
      <ToastExamples />
    </ToastProvider>
  );
}