import React, { useState } from 'react';
import { NotificationBanner } from './NotificationBanner';
import { Sparkles } from 'lucide-react';

export function NotificationBannerDocumentation() {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <>
      <style>{`
        .notification-banner-docs {
          padding: 48px 0;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }

        .notification-banner-docs__header {
          margin-bottom: 48px;
        }

        .notification-banner-docs__title {
          font-size: 32px;
          font-weight: 700;
          line-height: 40px;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .notification-banner-docs__description {
          font-size: var(--type-scale-l-size);
          line-height: var(--type-scale-l-line-height);
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .notification-banner-docs__section {
          margin-bottom: 48px;
        }

        .notification-banner-docs__section h2 {
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .notification-banner-docs__section h3 {
          font-size: 18px;
          font-weight: 600;
          line-height: 28px;
          color: var(--text-primary);
          margin-bottom: 16px;
          margin-top: 32px;
        }

        .notification-banner-docs__section h3:first-of-type {
          margin-top: 0;
        }

        .notification-banner-docs__section p {
          font-size: var(--type-scale-m-size);
          line-height: var(--type-scale-m-line-height);
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .notification-banner-docs__examples {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .notification-banner-docs__note {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 16px;
          margin-top: 24px;
          font-size: 13px;
          color: var(--muted-foreground);
          line-height: 1.6;
        }

        .notification-banner-docs__code {
          background-color: rgba(111, 139, 230, 0.1);
          border: 1px solid rgba(111, 139, 230, 0.2);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 12px;
          color: #6f8be6;
        }
      `}</style>

      <div className="notification-banner-docs">
        <div className="notification-banner-docs__header">
          <h1 className="notification-banner-docs__title">Notification Banner</h1>
          <p className="notification-banner-docs__description">
            A subtle notification component for displaying informational messages with gradients and icons. Features four semantic variants with automatic theme support.
          </p>
        </div>

        {/* Variants */}
        <section className="notification-banner-docs__section">
          <h2>Variants</h2>
          <p>
            The notification banner comes in four variants: info, success, warning, and error. Each uses a subtle gradient background and semantic colors.
          </p>

          <div className="notification-banner-docs__examples">
            <NotificationBanner
              title="Now using Localized Fields!"
              message="Switch languages with one click. Hungarian fallback applies automatically."
              variant="info"
              icon={Sparkles}
            />

            <NotificationBanner
              title="Changes saved successfully"
              message="Your rail configuration has been updated and is now live."
              variant="success"
            />

            <NotificationBanner
              title="Action required"
              message="Please review the content approval queue before the deadline."
              variant="warning"
            />

            <NotificationBanner
              title="Connection failed"
              message="Unable to sync with the content provider. Check your network settings."
              variant="error"
            />
          </div>
        </section>

        {/* Custom Icons */}
        <section className="notification-banner-docs__section">
          <h2>Custom Icons</h2>
          <p>
            You can provide a custom icon component to replace the default variant icon. The icon will automatically inherit the variant's color.
          </p>

          <div className="notification-banner-docs__examples">
            <NotificationBanner
              title="Feature unlocked"
              message="You now have access to advanced analytics and reporting."
              variant="info"
              icon={Sparkles}
            />
          </div>
        </section>

        {/* Dismissible */}
        <section className="notification-banner-docs__section">
          <h2>Dismissible</h2>
          <p>
            Banners can be made dismissible by providing an <span className="notification-banner-docs__code">onDismiss</span> callback. A close button will appear allowing users to hide the notification.
          </p>

          <div className="notification-banner-docs__examples">
            {showDismissible && (
              <NotificationBanner
                title="Dismissible notification"
                message="Click the X button to dismiss this notification."
                variant="info"
                onDismiss={() => setShowDismissible(false)}
              />
            )}
            {!showDismissible && (
              <button
                onClick={() => setShowDismissible(true)}
                style={{
                  padding: '8px 16px',
                  fontSize: '13px',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Show Dismissible Banner
              </button>
            )}
          </div>
        </section>

        {/* Design Specifications */}
        <section className="notification-banner-docs__section">
          <h2>Design Specifications</h2>

          <div className="notification-banner-docs__note">
            <h4 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--text-primary)' }}>Dark Theme</h4>
            <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
              <li><strong>Background:</strong> Linear gradient with 10% opacity (e.g., blue→purple for info)</li>
              <li><strong>Border:</strong> Variant color at 30% opacity</li>
              <li><strong>Border radius:</strong> 8px (large rounded corners)</li>
              <li><strong>Padding:</strong> 12px all sides</li>
              <li><strong>Gap:</strong> 8px between elements</li>
              <li><strong>Icon size:</strong> 16px with 2px top margin</li>
              <li><strong>Typography:</strong> 12px (text-xs) for both title and message</li>
              <li><strong>Font weight:</strong> Medium (500) for title, Regular (400) for message</li>
            </ul>

            <h4 style={{ marginTop: '16px', marginBottom: '12px', color: 'var(--text-primary)' }}>Light Theme</h4>
            <ul style={{ marginLeft: '20px', marginBottom: 0 }}>
              <li><strong>Background:</strong> Linear gradient with 8% opacity (more subtle)</li>
              <li><strong>Border:</strong> Variant color at 20% opacity (lighter)</li>
              <li><strong>Colors:</strong> Darker shades for proper contrast on light backgrounds</li>
            </ul>
          </div>
        </section>

        {/* Color Specifications */}
        <section className="notification-banner-docs__section">
          <h2>Color Specifications</h2>

          <div className="notification-banner-docs__note">
            <h4 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--text-primary)' }}>Dark Theme Colors</h4>
            <ul style={{ marginLeft: '20px', marginBottom: '16px', fontSize: '12px', lineHeight: '1.8' }}>
              <li><strong>Info:</strong><br />
                Icon: #60a5fa / oklch(72.3% 0.142 251.5)<br />
                Title: #60a5fa / oklch(72.3% 0.142 251.5)<br />
                Message: oklch(80.9% .105 251.813)
              </li>
              <li style={{ marginTop: '12px' }}><strong>Success:</strong><br />
                Icon: #6ee7b7 / oklch(87.2% 0.118 166.7)<br />
                Title: #6ee7b7 / oklch(87.2% 0.118 166.7)<br />
                Message: #d1fae5 / oklch(95.5% 0.058 166.9)
              </li>
              <li style={{ marginTop: '12px' }}><strong>Warning:</strong><br />
                Icon: #fcd34d / oklch(86.8% 0.132 88.5)<br />
                Title: #fcd34d / oklch(86.8% 0.132 88.5)<br />
                Message: #fef3c7 / oklch(96.2% 0.068 92.3)
              </li>
              <li style={{ marginTop: '12px' }}><strong>Error:</strong><br />
                Icon: #fca5a5 / oklch(78.5% 0.158 25.8)<br />
                Title: #fca5a5 / oklch(78.5% 0.158 25.8)<br />
                Message: #fee2e2 / oklch(93.8% 0.072 25.5)
              </li>
            </ul>

            <h4 style={{ marginTop: '16px', marginBottom: '12px', color: 'var(--text-primary)' }}>Light Theme Colors</h4>
            <ul style={{ marginLeft: '20px', marginBottom: 0, fontSize: '12px', lineHeight: '1.8' }}>
              <li><strong>Info:</strong><br />
                Icon: #3b82f6 / oklch(61.1% 0.179 251.2)<br />
                Title: #3b82f6 / oklch(61.1% 0.179 251.2)<br />
                Message: #1e40af / oklch(38.5% 0.135 265.4)
              </li>
              <li style={{ marginTop: '12px' }}><strong>Success:</strong><br />
                Icon: #10b981 / oklch(68.5% 0.152 166.8)<br />
                Title: #059669 / oklch(58.2% 0.135 166.5)<br />
                Message: #047857 / oklch(48.8% 0.118 166.2)
              </li>
              <li style={{ marginTop: '12px' }}><strong>Warning:</strong><br />
                Icon: #f59e0b / oklch(75.8% 0.152 75.2)<br />
                Title: #d97706 / oklch(65.5% 0.145 72.8)<br />
                Message: #b45309 / oklch(55.2% 0.135 68.5)
              </li>
              <li style={{ marginTop: '12px' }}><strong>Error:</strong><br />
                Icon: #ef4444 / oklch(62.8% 0.225 25.3)<br />
                Title: #dc2626 / oklch(55.5% 0.215 25.7)<br />
                Message: #b91c1c / oklch(48.2% 0.198 26.2)
              </li>
            </ul>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="notification-banner-docs__section">
          <h2>Usage Guidelines</h2>

          <div className="notification-banner-docs__note">
            <h4 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--text-primary)' }}>When to Use</h4>
            <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
              <li><strong>Info:</strong> Feature announcements, tips, helpful context</li>
              <li><strong>Success:</strong> Confirmation of completed actions, positive feedback</li>
              <li><strong>Warning:</strong> Caution messages, actions requiring attention</li>
              <li><strong>Error:</strong> Error messages, validation failures, critical issues</li>
            </ul>

            <h4 style={{ marginTop: '16px', marginBottom: '12px', color: 'var(--text-primary)' }}>Best Practices</h4>
            <ul style={{ marginLeft: '20px', marginBottom: 0 }}>
              <li>Keep titles short and descriptive (under 50 characters)</li>
              <li>Use the message field for additional context or instructions</li>
              <li>Place banners near the top of the content area or relevant section</li>
              <li>Make banners dismissible for non-critical information</li>
              <li>Use custom icons when they better represent the notification context</li>
            </ul>
          </div>
        </section>

        {/* API */}
        <section className="notification-banner-docs__section">
          <h2>API</h2>

          <div className="notification-banner-docs__note">
            <h4 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--text-primary)' }}>Props</h4>
            <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 600 }}>Prop</th>
                  <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 600 }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 600 }}>Default</th>
                  <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 600 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <td style={{ padding: '8px 0' }}><code>title</code></td>
                  <td style={{ padding: '8px 0' }}>string</td>
                  <td style={{ padding: '8px 0' }}>-</td>
                  <td style={{ padding: '8px 0' }}>The notification title (required)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <td style={{ padding: '8px 0' }}><code>message</code></td>
                  <td style={{ padding: '8px 0' }}>string</td>
                  <td style={{ padding: '8px 0' }}>-</td>
                  <td style={{ padding: '8px 0' }}>The notification message (required)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <td style={{ padding: '8px 0' }}><code>variant</code></td>
                  <td style={{ padding: '8px 0' }}>'info' | 'success' | 'warning' | 'error'</td>
                  <td style={{ padding: '8px 0' }}>'info'</td>
                  <td style={{ padding: '8px 0' }}>The visual style variant</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <td style={{ padding: '8px 0' }}><code>icon</code></td>
                  <td style={{ padding: '8px 0' }}>Component</td>
                  <td style={{ padding: '8px 0' }}>-</td>
                  <td style={{ padding: '8px 0' }}>Optional custom icon component</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0' }}><code>onDismiss</code></td>
                  <td style={{ padding: '8px 0' }}>function</td>
                  <td style={{ padding: '8px 0' }}>-</td>
                  <td style={{ padding: '8px 0' }}>Callback when dismiss button is clicked</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
