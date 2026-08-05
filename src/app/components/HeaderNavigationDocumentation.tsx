import React, { useState } from 'react';
import { HeaderNavigation } from './HeaderNavigation';
import { sampleAccounts, sampleTeams } from './HeaderNavigationSampleData';
import { createStatusBadge, createActionIndicator, doAndDontItems, designTokensData } from './HeaderNavigationDocUtils';

export function HeaderNavigationDocumentation() {
  const [userMenuClicked, setUserMenuClicked] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState('console-vms');
  const [selectedTeamId, setSelectedTeamId] = useState('content-team');
  const [accountChangeStatus, setAccountChangeStatus] = useState<string | null>(null);
  const [teamChangeStatus, setTeamChangeStatus] = useState<string | null>(null);
  const [accountDetailsAction, setAccountDetailsAction] = useState(false);
  const [themeAction, setThemeAction] = useState(false);
  const [logOutAction, setLogOutAction] = useState(false);
  const [helpAction, setHelpAction] = useState(false);

  const handleAction = (action: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    console.log(`${action} clicked!`);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const handleAccountChange = (accountId: string) => {
    console.log(`Account changed to: ${accountId}`);
    setSelectedAccountId(accountId);
    const selectedAccount = sampleAccounts.find(acc => acc.id === accountId);
    setAccountChangeStatus(`Switched to ${selectedAccount?.name}`);
    setTimeout(() => setAccountChangeStatus(null), 3000);
  };

  const handleTeamChange = (teamId: string) => {
    console.log(`Team changed to: ${teamId}`);
    setSelectedTeamId(teamId);
    const selectedTeam = sampleTeams.find(team => team.id === teamId);
    setTeamChangeStatus(`Switched to ${selectedTeam?.name}`);
    setTimeout(() => setTeamChangeStatus(null), 3000);
  };

  const handleAccountDetails = () => {
    console.log('Account details clicked!');
    setAccountDetailsAction(true);
    setTimeout(() => setAccountDetailsAction(false), 2000);
  };

  const handleThemeSwitch = () => {
    console.log('Theme switch clicked!');
    setThemeAction(true);
    setTimeout(() => setThemeAction(false), 2000);
  };

  const handleLogOut = () => {
    console.log('Log out clicked!');
    setLogOutAction(true);
    setTimeout(() => setLogOutAction(false), 2000);
  };

  const handleHelpClick = () => {
    console.log('Help clicked!');
    setHelpAction(true);
    setTimeout(() => setHelpAction(false), 2000);
  };

  const actionItems = [
    { label: 'Help', clicked: helpAction },
    { label: 'Account Details', clicked: accountDetailsAction },
    { label: 'Theme Switch', clicked: themeAction },
    { label: 'Log Out', clicked: logOutAction }
  ];

  return (
    <div className="documentation-container">
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ marginBottom: '16px' }}>Header Navigation</h1>
        <p style={{ 
          fontSize: 'var(--type-scale-l-size)',
          lineHeight: 'var(--type-scale-l-line-height)',
          color: 'var(--muted-foreground)',
          marginBottom: '24px'
        }}>
          A fixed header navigation component that provides application branding, account/team switching, help access, and user profile management in a compact top bar. Features dropdown menus for account selection, team switching, and user actions including theme switching and logout. Designed to be integrated into web applications as a top-level navigation element with the CVP Rail Manager brand identity.
        </p>
        
        {createStatusBadge('green', 'Stable')}
      </div>

      {/* Live Example */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Example</h2>
        <div style={{
          position: 'relative',
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          overflow: 'hidden',
          minHeight: '180px'
        }}>
          <HeaderNavigation
            accounts={sampleAccounts}
            selectedAccountId={selectedAccountId}
            onAccountChange={handleAccountChange}
            teams={sampleTeams}
            selectedTeamId={selectedTeamId}
            onTeamChange={handleTeamChange}
            userName="Jane Doe"
            userEmail="jane.doe@doe.com"
            variant="static"
            onHelpClick={handleHelpClick}
            onUserMenuClick={() => handleAction('user menu', setUserMenuClicked)}
            onAccountDetails={handleAccountDetails}
            onThemeSwitch={handleThemeSwitch}
            onLogOut={handleLogOut}
          />
          
          <div style={{
            marginTop: '40px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <p style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>
              Click any header element to see the interaction. Try the account dropdown, team dropdown, help button, and user profile menu. The header is fully responsive and adapts to different screen sizes:
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              marginTop: '12px'
            }}>
              {actionItems.map((item) => (
                <div key={item.label}>
                  {createActionIndicator(item.label, item.clicked)}
                </div>
              ))}
              
              {(accountChangeStatus || teamChangeStatus) && (
                <div style={{
                  gridColumn: '1 / -1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: 'var(--color-green-800)',
                  color: 'var(--color-green-200)',
                  borderRadius: '4px',
                  fontSize: 'var(--type-scale-s-size)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: 'var(--color-green-400)',
                    borderRadius: '50%'
                  }} />
                  {accountChangeStatus || teamChangeStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Behavior */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Responsive Behavior</h2>
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <p style={{ 
            fontSize: 'var(--type-scale-s-size)',
            color: 'var(--muted-foreground)',
            marginBottom: '16px'
          }}>
            The HeaderNavigation component automatically adapts to different screen sizes:
          </p>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '20px', 
            color: 'var(--muted-foreground)',
            fontSize: 'var(--type-scale-s-size)'
          }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Desktop (768px+):</strong> Full header with all elements visible
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Tablet (480-768px):</strong> Hides user text, adjusts spacing and icon sizes
            </li>
            <li>
              <strong>Mobile (&lt; 480px):</strong> Compact layout with smaller brand elements, optimized spacing
            </li>
          </ul>
        </div>
      </section>



      {/* Usage Guidelines */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Usage Guidelines</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {[
            { title: 'Do', items: doAndDontItems.do, color: 'var(--color-green-500)', icon: 'M10 3L4.5 8.5L2 6' },
            { title: "Don't", items: doAndDontItems.dont, color: 'var(--destructive)', icon: 'M9 3L3 9M3 3l6 6' }
          ].map((section) => (
            <div key={section.title} style={{
              padding: '24px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: section.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d={section.icon} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 style={{ marginBottom: '8px', color: 'var(--foreground)' }}>{section.title}</h4>
                  <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none' }}>
                    {section.items.map((item, index) => (
                      <li key={index} style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specifications */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Specifications</h2>
        
        <h3>Design Tokens</h3>
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '32px'
        }}>
          <div className="doc-table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--muted)' }}>
                {['Property', 'Value', 'Token'].map((header) => (
                  <th key={header} style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: 'var(--type-scale-s-size)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {designTokensData.map((row, index) => (
                <tr key={index}>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 'var(--type-scale-s-size)',
                    color: 'var(--foreground)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>{row.property}</td>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 'var(--type-scale-s-size)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-family-mono)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>{row.value}</td>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 'var(--type-scale-s-size)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-family-mono)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>{row.token}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </section>
    </div>
  );
}