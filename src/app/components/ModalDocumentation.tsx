import React, { useState } from 'react';
import { Modal } from './Modal';
import { PrimaryButton } from './PrimaryButton';
import { OutlineButton } from './OutlineButton';
import { IconSmallButton } from './IconSmallButton';
import { TextInput } from './TextInput';
import { TextArea } from './TextArea';
import { Settings, Trash2, Info, AlertTriangle, User, Bell } from 'lucide-react';

export function ModalDocumentation() {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [noTitleModalOpen, setNoTitleModalOpen] = useState(false);
  const [longContentModalOpen, setLongContentModalOpen] = useState(false);
  const [headerFooterModalOpen, setHeaderFooterModalOpen] = useState(false);
  const [customHeaderModalOpen, setCustomHeaderModalOpen] = useState(false);
  const [tabbedModalOpen, setTabbedModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  return (
    <>
      <style>{`
        .modal-documentation {
          --modal-doc-padding: 48px;
          --modal-doc-max-width: 1200px;
          --modal-doc-font-family: "Inter", sans-serif;
          padding: var(--modal-doc-padding);
          max-width: var(--modal-doc-max-width);
          font-family: var(--modal-doc-font-family);
          box-sizing: border-box;
        }

        .example-content {
          padding: 0;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          margin-bottom: 6px;
          font-size: var(--type-scale-s-size);
          font-weight: 500;
          color: var(--foreground);
        }

        .form-input {
          width: 100%;
          padding: 8px 12px;
          background-color: var(--input-bg);
          border: 1px solid var(--input-border);
          border-radius: 4px;
          color: var(--input-text);
          font-size: var(--type-scale-m-size);
          line-height: var(--type-scale-m-line-height);
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--input-focus-border);
          box-shadow: var(--input-focus-glow);
        }

        .form-input::placeholder {
          color: var(--input-placeholder);
        }

        .button-group {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 24px;
        }

        .warning-content {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background-color: rgba(230, 73, 78, 0.1);
          border: 1px solid rgba(230, 73, 78, 0.3);
          border-radius: 6px;
          margin-bottom: 20px;
        }

        .warning-icon {
          color: #e6494e;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .warning-text {
          color: var(--foreground);
        }

        .warning-text-primary {
          font-family: Inter, sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.15px;
          margin: 0 0 8px 0;
        }

        .custom-header {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }

        .custom-header-icon {
          color: #6f8be6;
        }

        .custom-header-content {
          flex: 1;
        }

        .custom-header-title {
          font-family: Inter, sans-serif;
          font-weight: 500;
          font-size: 18px;
          line-height: 1.4;
          color: var(--modal-title-text);
          margin: 0 0 4px 0;
        }

        .custom-header-subtitle {
          font-size: 14px;
          line-height: 1.5;
          color: var(--modal-description-text);
          margin: 0;
        }

        .footer-actions {
          display: flex;
          gap: 12px;
          justify-content: space-between;
          align-items: center;
        }

        .footer-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--muted-foreground);
          font-size: 11px;
        }
      `}</style>
      
      <div className="modal-documentation">
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ marginBottom: '16px' }}>Modal</h1>
          <p style={{ 
            fontSize: 'var(--type-scale-l-size)',
            lineHeight: 'var(--type-scale-l-line-height)',
            color: 'var(--muted-foreground)',
            marginBottom: '24px'
          }}>
            A modal dialog component that displays content in a centered overlay with structured header, content, and footer areas. Modals interrupt the user's workflow and require explicit action to dismiss, making them ideal for critical information, forms, and confirmations.
          </p>
          
          {/* Status badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            backgroundColor: 'var(--color-green-800)',
            color: 'var(--color-green-200)',
            borderRadius: '16px',
            fontSize: 'var(--type-scale-xs-regular-size)',
            fontWeight: 'var(--font-weight-medium)'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              backgroundColor: 'var(--color-green-400)',
              borderRadius: '50%'
            }} />
            Stable
          </div>
        </div>

        {/* Live Example */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ marginBottom: '24px' }}>Example</h2>
          <div style={{
            padding: '32px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <PrimaryButton onClick={() => setBasicModalOpen(true)}>
              Basic Modal
            </PrimaryButton>
            
            <OutlineButton onClick={() => setHeaderFooterModalOpen(true)}>
              Header & Footer
            </OutlineButton>
            
            <OutlineButton onClick={() => setCustomHeaderModalOpen(true)}>
              Custom Header
            </OutlineButton>
            
            <OutlineButton onClick={() => setConfirmModalOpen(true)}>
              Confirmation
            </OutlineButton>
            
            <OutlineButton onClick={() => setTabbedModalOpen(true)}>
              Tabbed Modal
            </OutlineButton>
          </div>
        </section>

        {/* Modal Structure */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ marginBottom: '24px' }}>Modal Structure</h2>
          <div style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              marginBottom: '20px'
            }}>
              The modal consists of three main areas with specific styling. The tabbed variant adds a navigation area between the header and content:
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '16px'
            }}>
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--muted)',
                borderRadius: '6px'
              }}>
                <h4 style={{ marginBottom: '8px', color: 'var(--foreground)' }}>Header</h4>
                <p style={{ 
                  fontSize: 'var(--type-scale-s-size)',
                  color: 'var(--muted-foreground)',
                  marginBottom: '8px'
                }}>
                  Inter Medium, 13px, 20px line height, +0.1px letter spacing, UPPERCASE
                </p>
                <p style={{ 
                  fontSize: 'var(--type-scale-s-size)',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'var(--font-family-mono)'
                }}>
                  Padding: 13px 19px | Border: 0.5px solid #45454a | Close: IconButton (28×28px)
                </p>
              </div>
              
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--muted)',
                borderRadius: '6px'
              }}>
                <h4 style={{ marginBottom: '8px', color: 'var(--foreground)' }}>Content</h4>
                <p style={{ 
                  fontSize: 'var(--type-scale-s-size)',
                  color: 'var(--muted-foreground)',
                  marginBottom: '8px'
                }}>
                  Scrollable content area with consistent styling
                </p>
                <p style={{ 
                  fontSize: 'var(--type-scale-s-size)',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'var(--font-family-mono)'
                }}>
                  Padding: 16px | Background: #18181A
                </p>
              </div>
              
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--muted)',
                borderRadius: '6px'
              }}>
                <h4 style={{ marginBottom: '8px', color: 'var(--foreground)' }}>Tabs (Tabbed Variant)</h4>
                <p style={{ 
                  fontSize: 'var(--type-scale-s-size)',
                  color: 'var(--muted-foreground)',
                  marginBottom: '8px'
                }}>
                  Navigation tabs between header and content
                </p>
                <p style={{ 
                  fontSize: 'var(--type-scale-s-size)',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'var(--font-family-mono)'
                }}>
                  Padding: 0px 19px | Border: 0.5px solid #45454a | Tab padding: 8px 16px
                </p>
              </div>
              
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--muted)',
                borderRadius: '6px'
              }}>
                <h4 style={{ marginBottom: '8px', color: 'var(--foreground)' }}>Footer</h4>
                <p style={{ 
                  fontSize: 'var(--type-scale-s-size)',
                  color: 'var(--muted-foreground)',
                  marginBottom: '8px'
                }}>
                  Action buttons and additional information
                </p>
                <p style={{ 
                  fontSize: 'var(--type-scale-s-size)',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'var(--font-family-mono)'
                }}>
                  Padding: 13px 19px | Border: 0.5px solid #45454a
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Modal Examples */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ marginBottom: '24px' }}>Modal Types</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px'
            }}>
              <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Basic Modal</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--muted-foreground)',
                marginBottom: '16px',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                Standard modal with title and content area
              </p>
              <PrimaryButton onClick={() => setBasicModalOpen(true)}>
                Open Basic Modal
              </PrimaryButton>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px'
            }}>
              <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Header & Footer</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--muted-foreground)',
                marginBottom: '16px',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                Modal with structured header and footer areas
              </p>
              <OutlineButton onClick={() => setHeaderFooterModalOpen(true)}>
                Open Modal
              </OutlineButton>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px'
            }}>
              <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Custom Header</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--muted-foreground)',
                marginBottom: '16px',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                Modal with custom header content and icons
              </p>
              <OutlineButton onClick={() => setCustomHeaderModalOpen(true)}>
                Open Modal
              </OutlineButton>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px'
            }}>
              <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Without Title</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--muted-foreground)',
                marginBottom: '16px',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                Modal without header title, just close button
              </p>
              <OutlineButton onClick={() => setNoTitleModalOpen(true)}>
                Open Modal
              </OutlineButton>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px'
            }}>
              <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Long Content</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--muted-foreground)',
                marginBottom: '16px',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                Modal with scrollable content area
              </p>
              <OutlineButton onClick={() => setLongContentModalOpen(true)}>
                Open Long Modal
              </OutlineButton>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px'
            }}>
              <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>Tabbed Modal</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--muted-foreground)',
                marginBottom: '16px',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                Modal with integrated tab navigation for organized content
              </p>
              <OutlineButton onClick={() => setTabbedModalOpen(true)}>
                Open Tabbed Modal
              </OutlineButton>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ marginBottom: '24px' }}>Specifications</h2>
          <div style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--muted)' }}>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: 'var(--type-scale-s-size)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>
                    Area
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: 'var(--type-scale-s-size)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>
                    Property
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: 'var(--type-scale-s-size)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { area: 'Container', property: 'Max width (default)', value: '600px' },
                  { area: 'Container', property: 'Background gradient', value: 'linear-gradient(135deg, rgba(24, 24, 28, 0.98), rgba(16, 16, 20, 0.98))' },
                  { area: 'Container', property: 'Backdrop blur', value: '24px' },
                  { area: 'Container', property: 'Border', value: '1px solid rgba(48, 48, 56, 0.4)' },
                  { area: 'Container', property: 'Border radius', value: '12px' },
                  { area: 'Container', property: 'Blue accent overlay', value: 'linear-gradient(135deg, rgba(61, 99, 221, 0.03), transparent)' },
                  { area: 'Container', property: 'Shadow', value: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' },
                  { area: 'Backdrop', property: 'Background color', value: 'rgba(0, 0, 0, 0.8)' },
                  { area: 'Backdrop', property: 'Backdrop blur', value: '8px' },
                  { area: 'Header', property: 'Font', value: 'Inter Medium, 13px' },
                  { area: 'Header', property: 'Line height', value: '20px' },
                  { area: 'Header', property: 'Letter spacing', value: '+0.1px' },
                  { area: 'Header', property: 'Text color', value: '#ffffff' },
                  { area: 'Header', property: 'Text transform', value: 'UPPERCASE' },
                  { area: 'Header', property: 'Padding', value: '13px 19px' },
                  { area: 'Header', property: 'Border bottom', value: '1px solid rgba(42, 42, 53, 0.3)' },
                  { area: 'Header', property: 'Close button', value: 'IconButton (28×28px, 16px icon)' },
                  { area: 'Content', property: 'Padding', value: '16px' },
                  { area: 'Footer', property: 'Padding', value: '13px 19px' },
                  { area: 'Footer', property: 'Border top', value: '1px solid rgba(42, 42, 53, 0.3)' },
                  { area: 'Footer', property: 'Helper text color', value: '#bbbbbb' },
                  { area: 'Footer', property: 'Helper text size', value: '11px' },
                  { area: 'Footer', property: 'Helper icon size', value: '12px' },
                  { area: 'Footer', property: 'Layout', value: 'Helper text left, actions right' },
                  { area: 'Custom Header', property: 'Icon color', value: '#6f8be6' },
                  { area: 'Custom Header', property: 'Icon size', value: '16px' },
                  { area: 'Custom Header', property: 'Subtitle color', value: '#bbbbbb' },
                  { area: 'Custom Header', property: 'Subtitle size', value: '11px' },
                  { area: 'Tabbed', property: 'Tab container padding', value: '0px 19px' },
                  { area: 'Tabbed', property: 'Tab container border', value: '1px solid rgba(42, 42, 53, 0.3)' },
                  { area: 'Tabbed', property: 'Tab item padding', value: '8px 16px' },
                  { area: 'Tabbed', property: 'Tab item font', value: 'Inter Medium, 14px' },
                  { area: 'Tabbed', property: 'Tab inactive text color', value: '#AFAFB5' },
                  { area: 'Tabbed', property: 'Tab active text color', value: '#ffffff' },
                  { area: 'Tabbed', property: 'Tab active border', value: '2px solid #3d63dd' },
                  { area: 'Tabbed', property: 'Tab hover background', value: 'rgba(255, 255, 255, 0.05)' },
                  { area: 'Warning Text', property: 'Primary text font', value: 'Inter Medium, 14px' },
                  { area: 'Warning Text', property: 'Primary text line height', value: '20px' },
                  { area: 'Warning Text', property: 'Primary text letter spacing', value: '+0.15px' }
                ].map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      padding: '12px 16px',
                      fontSize: 'var(--type-scale-s-size)',
                      color: 'var(--foreground)',
                      borderBottom: '1px solid var(--border-default)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      {row.area}
                    </td>
                    <td style={{
                      padding: '12px 16px',
                      fontSize: 'var(--type-scale-s-size)',
                      color: 'var(--foreground)',
                      borderBottom: '1px solid var(--border-default)'
                    }}>
                      {row.property}
                    </td>
                    <td style={{
                      padding: '12px 16px',
                      fontSize: 'var(--type-scale-s-size)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-family-mono)',
                      borderBottom: '1px solid var(--border-default)'
                    }}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ marginBottom: '24px' }}>Usage Guidelines</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }}>
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--color-green-800)',
              borderRadius: '8px'
            }}>
              <h4 style={{ 
                color: 'var(--color-green-400)', 
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: 'var(--color-green-600)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: 'white'
                }}>✓</span>
                Do
              </h4>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                margin: 0,
                color: 'var(--foreground)'
              }}>
                <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                  • Use header for clear modal identification
                </li>
                <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                  • Place primary actions in the footer
                </li>
                <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                  • Keep header titles concise and descriptive
                </li>
                <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                  • Use custom headers for complex information
                </li>
                <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                  • Organize footer actions from left to right by importance
                </li>
                <li style={{ fontSize: 'var(--type-scale-s-size)' }}>
                  • Use tabbed variant for complex forms with multiple sections
                </li>
              </ul>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--color-red-700)',
              borderRadius: '8px'
            }}>
              <h4 style={{ 
                color: 'var(--color-red-400)', 
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: 'var(--color-red-600)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: 'white'
                }}>✕</span>
                Don't
              </h4>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                margin: 0,
                color: 'var(--foreground)'
              }}>
                <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                  • Overcrowd the header with too many elements
                </li>
                <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                  • Use footer for content that belongs in the main area
                </li>
                <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                  • Mix title prop with custom header content
                </li>
                <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                  • Place too many actions in the footer
                </li>
                <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                  • Forget to include a close mechanism
                </li>
                <li style={{ fontSize: 'var(--type-scale-s-size)' }}>
                  • Use tabbed variant for simple modals with minimal content
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <h2 style={{ marginBottom: '24px' }}>Accessibility</h2>
          <div style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>Focus Management</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                When a modal opens, focus is trapped within the modal. The modal includes proper ARIA attributes (role="dialog", aria-modal="true") for screen readers.
              </p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>Keyboard Support</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                The modal automatically handles the Escape key to close, and prevents body scrolling when open.
              </p>
            </div>

            <div>
              <h4 style={{ marginBottom: '12px' }}>Screen Reader Support</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)', 
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                The modal title is properly associated with the dialog using aria-labelledby. The backdrop is marked as aria-hidden to prevent screen reader confusion.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Modal Examples */}
      <Modal 
        isOpen={basicModalOpen} 
        onClose={() => setBasicModalOpen(false)}
        title="Basic Modal Example"
      >
        <div className="example-content">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <TextInput className="form-input" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <TextInput className="form-input" id="email" type="email" placeholder="Enter your email" />
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={headerFooterModalOpen} 
        onClose={() => setHeaderFooterModalOpen(false)}
        title="Settings Configuration"
        footer={
          <div className="footer-actions">
            <div className="footer-info">
              <Info size={12} />
              <span>Changes saved automatically</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <OutlineButton onClick={() => setHeaderFooterModalOpen(false)}>
                Cancel
              </OutlineButton>
              <PrimaryButton onClick={() => setHeaderFooterModalOpen(false)}>
                Save Settings
              </PrimaryButton>
            </div>
          </div>
        }
      >
        <div>
          <div className="form-group">
            <label className="form-label" htmlFor="theme">Theme Preference</label>
            <select className="form-input" id="theme">
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">
              <input type="checkbox" style={{ marginRight: '8px' }} />
              Enable notifications
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              <input type="checkbox" style={{ marginRight: '8px' }} />
              Auto-save drafts
            </label>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={customHeaderModalOpen} 
        onClose={() => setCustomHeaderModalOpen(false)}
        header={
          <div className="custom-header">
            <User size={16} className="custom-header-icon" />
            <div className="custom-header-content">
              <h3 className="custom-header-title">User Profile Settings</h3>
              <p className="custom-header-subtitle">Manage your account preferences</p>
            </div>
          </div>
        }
        footer={
          <div className="footer-actions">
            <div></div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <OutlineButton onClick={() => setCustomHeaderModalOpen(false)}>
                Cancel
              </OutlineButton>
              <PrimaryButton onClick={() => setCustomHeaderModalOpen(false)}>
                Update Profile
              </PrimaryButton>
            </div>
          </div>
        }
      >
        <div>
          <div className="form-group">
            <label className="form-label" htmlFor="displayName">Display Name</label>
            <TextInput className="form-input" id="displayName" placeholder="Enter display name" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="bio">Bio</label>
            <TextArea className="form-input" id="bio" rows={3} placeholder="Tell us about yourself"></TextArea>
          </div>
          <div className="form-group">
            <label className="form-label">
              <input type="checkbox" style={{ marginRight: '8px' }} />
              Make profile public
            </label>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={confirmModalOpen} 
        onClose={() => setConfirmModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <div className="footer-actions">
            <div></div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <OutlineButton onClick={() => setConfirmModalOpen(false)}>
                Cancel
              </OutlineButton>
              <PrimaryButton 
                onClick={() => setConfirmModalOpen(false)}
                style={{ backgroundColor: '#e6494e', borderColor: '#e6494e' }}
              >
                Delete Items
              </PrimaryButton>
            </div>
          </div>
        }
      >
        <div>
          <div className="warning-content">
            <AlertTriangle size={20} className="warning-icon" />
            <div className="warning-text">
              <p className="warning-text-primary">This action cannot be undone</p>
              <p style={{ margin: 0, fontSize: 'var(--type-scale-s-size)' }}>
                This will permanently delete the selected items and remove all associated data.
              </p>
            </div>
          </div>
          <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--type-scale-s-size)' }}>
            Are you sure you want to continue? This action will affect 3 items and cannot be reversed.
          </p>
        </div>
      </Modal>

      <Modal 
        isOpen={noTitleModalOpen} 
        onClose={() => setNoTitleModalOpen(false)}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Info size={48} style={{ color: 'var(--primary-btn-bg)', marginBottom: '16px' }} />
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--foreground)' }}>Information</h3>
          <p style={{ margin: '0 0 24px 0', color: 'var(--muted-foreground)' }}>
            This modal doesn't have a title in the header, but still includes a close button for accessibility.
          </p>
          <PrimaryButton onClick={() => setNoTitleModalOpen(false)}>
            Got it
          </PrimaryButton>
        </div>
      </Modal>

      <Modal 
        isOpen={longContentModalOpen} 
        onClose={() => setLongContentModalOpen(false)}
        title="Long Content Example"
        maxWidth="700px"
        footer={
          <div className="footer-actions">
            <div></div>
            <PrimaryButton onClick={() => setLongContentModalOpen(false)}>
              Close
            </PrimaryButton>
          </div>
        }
      >
        <div>
          <p style={{ marginBottom: '16px', color: 'var(--foreground)' }}>
            This modal demonstrates how content scrolls when it exceeds the available height. The header and footer remain fixed.
          </p>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{ 
              marginBottom: '16px', 
              padding: '12px', 
              backgroundColor: 'var(--muted)', 
              borderRadius: '4px' 
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--foreground)' }}>Section {i + 1}</h4>
              <p style={{ margin: 0, fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>
                This is content section {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </Modal>

      {/* Tabbed Modal */}
      <Modal
        isOpen={tabbedModalOpen}
        onClose={() => setTabbedModalOpen(false)}
        title="Tabbed Modal"
        variant="tabbed"
        tabs={[
          {
            id: 'general',
            label: 'General',
            content: (
              <div>
                <h3 style={{ marginBottom: '16px', color: 'var(--foreground)' }}>General Tab Content</h3>
                <TextInput label="Project Name" id="projectName" placeholder="Enter project name" />
                <TextArea label="Description" id="description" rows={3} placeholder="Project description" />
                <div className="form-group">
                  <label className="form-label">
                    <input type="checkbox" style={{ marginRight: '8px' }} />
                    Enable project notifications
                  </label>
                </div>
              </div>
            )
          },
          {
            id: 'settings',
            label: 'Settings',
            content: (
              <div>
                <h3 style={{ marginBottom: '16px', color: 'var(--foreground)' }}>Settings Tab Content</h3>
                <div className="form-group">
                  <label className="form-label" htmlFor="visibility">Visibility</label>
                  <select className="form-input" id="visibility">
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                    <option value="team">Team Only</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <input type="checkbox" style={{ marginRight: '8px' }} />
                    Allow external collaborators
                  </label>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <input type="checkbox" style={{ marginRight: '8px' }} />
                    Enable advanced security features
                  </label>
                </div>
              </div>
            )
          },
          {
            id: 'advanced',
            label: 'Advanced',
            content: (
              <div>
                <h3 style={{ marginBottom: '16px', color: 'var(--foreground)' }}>Advanced Tab Content</h3>
                <div className="form-group">
                  <label className="form-label" htmlFor="apiKey">API Key</label>
                  <TextInput className="form-input" id="apiKey" type="password" placeholder="Enter API key" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="webhook">Webhook URL</label>
                  <TextInput className="form-input" id="webhook" type="url" placeholder="https://example.com/webhook" />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <input type="checkbox" style={{ marginRight: '8px' }} />
                    Enable debug mode
                  </label>
                </div>
              </div>
            )
          }
        ]}
        defaultActiveTab="general"
        onTabChange={setActiveTab}
        footer={
          <div className="footer-actions">
            <OutlineButton onClick={() => setTabbedModalOpen(false)}>
              Cancel
            </OutlineButton>
            <PrimaryButton onClick={() => setTabbedModalOpen(false)}>
              Save Changes
            </PrimaryButton>
          </div>
        }
      />
    </>
  );
}