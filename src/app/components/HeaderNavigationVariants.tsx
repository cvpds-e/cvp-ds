import React from 'react';
import { HeaderNavigation } from './HeaderNavigation';

export function HeaderNavigationVariants() {
  return (
    <section style={{ marginBottom: '48px' }}>
      <h2 style={{ marginBottom: '24px' }}>Variants</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px'
      }}>
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-default)' }}>
            <h4 style={{ marginBottom: '8px' }}>Minimal Configuration</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              marginBottom: '0'
            }}>
              Basic header with account dropdown and user controls
            </p>
          </div>
          <div style={{ position: 'relative', minHeight: '70px' }}>
            <HeaderNavigation
              accounts={[
                { id: 'my-app', name: 'My App' },
                { id: 'admin-panel', name: 'Admin Panel' }
              ]}
              selectedAccountId="my-app"
              userName="Admin"
              variant="static"
              onAccountDetails={() => console.log('Account details clicked')}
            />
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-default)' }}>
            <h4 style={{ marginBottom: '8px' }}>Full Featured</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              marginBottom: '0'
            }}>
              Header with all features enabled
            </p>
          </div>
          <div style={{ position: 'relative', minHeight: '70px' }}>
            <HeaderNavigation
              accounts={[
                { id: 'enterprise-dashboard', name: 'Enterprise Dashboard' },
                { id: 'business-suite', name: 'Business Suite' },
                { id: 'analytics-pro', name: 'Analytics Pro' }
              ]}
              selectedAccountId="enterprise-dashboard"
              teams={[
                { id: 'design-team', name: 'Design Team' },
                { id: 'dev-team', name: 'Development Team' }
              ]}
              selectedTeamId="design-team"
              userName="John Smith"
              userEmail="john.smith@company.com"
              variant="static"
              onAccountDetails={() => console.log('Account details clicked')}
              showSearch={false}
            />
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-default)' }}>
            <h4 style={{ marginBottom: '8px' }}>Custom Branding</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              marginBottom: '0'
            }}>
              Header with multiple account options
            </p>
          </div>
          <div style={{ position: 'relative', minHeight: '70px' }}>
            <HeaderNavigation
              accounts={[
                { id: 'content-mgmt-pro', name: 'Content Management Pro' },
                { id: 'media-hub', name: 'Media Hub' }
              ]}
              selectedAccountId="content-mgmt-pro"
              userName="Editor"
              variant="static"
              onAccountDetails={() => console.log('Account details clicked')}
              showSearch={false}
            />
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-default)' }}>
            <h4 style={{ marginBottom: '8px' }}>Fixed Positioning (Production)</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              marginBottom: '0'
            }}>
              Use variant="fixed" (default) for production applications where the header should stay at the top of the viewport
            </p>
          </div>
          <div style={{ position: 'relative', minHeight: '70px', padding: '16px' }}>
            <code style={{ 
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              fontFamily: 'var(--font-family-mono)'
            }}>
              &lt;HeaderNavigation variant="fixed" /&gt;
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}