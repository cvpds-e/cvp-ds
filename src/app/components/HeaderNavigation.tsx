import React, { useState } from 'react';
import { 
  ChevronDown,
  Building,
  Users,
  Sun,
  LogOut,
  HelpCircle,
  User
} from 'lucide-react';

export interface Account {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
}

export interface HeaderNavigationProps {
  /** List of available accounts */
  accounts?: Account[];
  /** Currently selected account ID */
  selectedAccountId?: string;
  /** Callback when account is changed */
  onAccountChange?: (accountId: string) => void;
  /** List of available teams */
  teams?: Team[];
  /** Currently selected team ID */
  selectedTeamId?: string;
  /** Callback when team is changed */
  onTeamChange?: (teamId: string) => void;
  /** User name or identifier */
  userName?: string;
  /** User email address */
  userEmail?: string;
  /** Callback for help */
  onHelpClick?: () => void;
  /** Callback for user menu */
  onUserMenuClick?: () => void;
  /** Callback for account details */
  onAccountDetails?: () => void;
  /** Callback for theme switch */
  onThemeSwitch?: () => void;
  /** Callback for log out */
  onLogOut?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Variant for documentation/demo purposes */
  variant?: 'fixed' | 'static';
}

export function HeaderNavigation({
  accounts = [
    { id: 'console-vms', name: 'Console VMS' },
    { id: 'enterprise-dashboard', name: 'Enterprise Dashboard' },
    { id: 'content-mgmt', name: 'Content Management Pro' }
  ],
  selectedAccountId = 'console-vms',
  onAccountChange,
  teams = [
    { id: 'content-team', name: 'Content Team' },
    { id: 'editorial-team', name: 'Editorial Team' },
    { id: 'operations-team', name: 'Operations Team' }
  ],
  selectedTeamId = 'content-team',
  onTeamChange,

  userName = "Jane Doe",
  userEmail = "jane.doe@doe.com",
  onHelpClick,
  onUserMenuClick,
  onAccountDetails,
  onThemeSwitch,
  onLogOut,
  className = '',
  variant = 'fixed'
}: HeaderNavigationProps) {
  
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const selectedAccount = accounts.find(account => account.id === selectedAccountId) || accounts[0];
  const selectedTeam = teams.find(team => team.id === selectedTeamId) || teams[0];
  
  const handleAccountSelect = (accountId: string) => {
    setIsAccountDropdownOpen(false);
    onAccountChange?.(accountId);
  };
  
  const handleTeamSelect = (teamId: string) => {
    setIsTeamDropdownOpen(false);
    onTeamChange?.(teamId);
  };

  const handleUserAction = (action: () => void) => {
    setIsUserDropdownOpen(false);
    action();
  };

  const handleAccountDropdownToggle = () => {
    setIsTeamDropdownOpen(false);
    setIsUserDropdownOpen(false);
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleTeamDropdownToggle = () => {
    setIsAccountDropdownOpen(false);
    setIsUserDropdownOpen(false);
    setIsTeamDropdownOpen(!isTeamDropdownOpen);
  };

  const handleUserDropdownToggle = () => {
    setIsAccountDropdownOpen(false);
    setIsTeamDropdownOpen(false);
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  
  return (
    <>
      <style>{`
        .header-navigation {
          /* Design System Tokens */
          --header-height: 45px;
          --header-bg: var(--header-bg, transparent);
          --header-border-bottom: 1px solid var(--border-default);
          --header-padding: 0 var(--spacing-4);
          --header-gap: var(--spacing-3);
          --header-font-family: var(--font-family);
          
          /* Logo/Brand */
          --header-logo-font-size: var(--type-scale-s-size);
          --header-logo-font-weight: var(--type-scale-s-weight);
          --header-logo-line-height: var(--type-scale-s-line-height);
          --header-logo-letter-spacing: var(--type-scale-s-letter-spacing);
          --header-logo-color: var(--header-logo-color, #fff);
          
          /* Navigation items */
          --header-nav-font-size: var(--type-scale-s-size);
          --header-nav-font-weight: var(--type-scale-s-weight);
          --header-nav-line-height: var(--type-scale-s-line-height);
          --header-nav-letter-spacing: var(--type-scale-s-letter-spacing);
          --header-nav-color: var(--header-nav-color, #bbb);
          --header-nav-hover-color: var(--header-nav-hover-color, #fff);
          
          /* User area */
          --header-user-font-size: var(--type-scale-s-size);
          --header-user-font-weight: var(--type-scale-s-weight);
          --header-user-line-height: var(--type-scale-s-line-height);
          --header-user-letter-spacing: var(--type-scale-s-letter-spacing);
          --header-user-color: var(--header-user-color, #fff);
          

          
          /* Component Styles */
          position: ${variant === 'fixed' ? 'fixed' : 'relative'};
          top: ${variant === 'fixed' ? '0' : 'auto'};
          left: ${variant === 'fixed' ? '0' : 'auto'};
          right: ${variant === 'fixed' ? '0' : 'auto'};
          width: ${variant === 'static' ? '100%' : 'auto'};
          height: var(--header-height);
          background-color: var(--header-bg);
          border-bottom: var(--header-border-bottom);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--header-padding);
          font-family: var(--header-font-family);
          z-index: ${variant === 'fixed' ? '1000' : '1'};
          box-sizing: border-box;
        }

        /* Light Theme Override */
        [data-theme="light"] .header-navigation {
          --header-border-bottom: 1px solid var(--border-default);
        }
        
        .header-navigation__left {
          display: flex;
          align-items: center;
          gap: var(--header-gap);
          flex-shrink: 0;
        }
        
        .header-navigation__brand {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          margin-right: var(--spacing-1);
        }
        
        .header-navigation__logo {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }
        
        .header-navigation__brand-text {
          font-size: var(--header-logo-font-size);
          font-weight: 500;
          line-height: var(--header-logo-line-height);
          letter-spacing: var(--header-logo-letter-spacing);
          color: var(--header-logo-color);
          white-space: nowrap;
          font-family: inherit;
        }
        
        .header-navigation__account-dropdown,
        .header-navigation__team-dropdown,
        .header-navigation__user-dropdown {
          position: relative;
          display: inline-block;
        }
        
        .header-navigation__account-button,
        .header-navigation__team-button {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          background: transparent;
          border: none;
          color: var(--header-logo-color);
          cursor: pointer;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          transition: background-color 0.2s ease;
          font-size: var(--header-logo-font-size);
          font-weight: var(--header-logo-font-weight);
          line-height: var(--header-logo-line-height);
          letter-spacing: var(--header-logo-letter-spacing);
          font-family: inherit;
          white-space: nowrap;
        }
        
        .header-navigation__account-button:hover,
        .header-navigation__team-button:hover {
          background-color: var(--header-button-hover-bg, rgba(255, 255, 255, 0.1));
        }
        
        .header-navigation__account-icon,
        .header-navigation__team-icon {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }
        
        .header-navigation__account-text,
        .header-navigation__team-text {
          white-space: nowrap;
        }
        
        .header-navigation__account-chevron,
        .header-navigation__team-chevron {
          width: 12px;
          height: 12px;
          flex-shrink: 0;
          opacity: 0.7;
          transition: transform 0.2s ease;
        }
        
        .header-navigation__account-button--open .header-navigation__account-chevron,
        .header-navigation__team-button--open .header-navigation__team-chevron {
          transform: rotate(180deg);
        }
        
        .header-navigation__account-dropdown-menu,
        .header-navigation__team-dropdown-menu,
        .header-navigation__user-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 200px;
          max-height: 300px;
          background-color: var(--menu-bg);
          border-radius: var(--radius-md);
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          margin-top: 4px;
          overflow-y: auto;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
        }
        
        .header-navigation__account-dropdown-menu--open,
        .header-navigation__team-dropdown-menu--open,
        .header-navigation__user-dropdown-menu--open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .header-navigation__user-dropdown-menu {
          right: 0;
          left: auto;
        }
        
        .header-navigation__account-option,
        .header-navigation__team-option,
        .header-navigation__user-option {
          display: block;
          width: 100%;
          padding: 8px 12px;
          background: transparent;
          border: none;
          color: var(--menu-item-text, #fff);
          cursor: pointer;
          text-align: left;
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          font-family: inherit;
          transition: background-color 0.2s ease;
          white-space: nowrap;
        }
        
        .header-navigation__account-option:hover,
        .header-navigation__team-option:hover,
        .header-navigation__user-option:hover {
          background-color: var(--menu-item-hover-bg);
        }
        
        .header-navigation__account-option--selected,
        .header-navigation__team-option--selected {
          background-color: var(--menu-item-active-bg);
          color: var(--menu-item-active-text);
        }
        
        .header-navigation__account-option--selected:hover,
        .header-navigation__team-option--selected:hover {
          background-color: var(--menu-item-active-bg);
        }

        .header-navigation__user-option {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-navigation__user-email {
          display: block;
          width: 100%;
          padding: 8px 12px;
          background: transparent;
          border: none;
          color: var(--menu-user-email-color, #bbb);
          cursor: default;
          text-align: left;
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          font-family: inherit;
          white-space: nowrap;
          border-bottom: 1px solid var(--menu-user-email-border, var(--border-default));
          margin-bottom: 4px;
        }

        .header-navigation__user-option-icon {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }
        
        .header-navigation__center {
          display: flex;
          align-items: center;
          gap: var(--header-gap);
          flex: 1;
          justify-content: center;
          min-width: 0;
        }
        

        
        .header-navigation__right {
          display: flex;
          align-items: center;
          gap: var(--header-gap);
          flex-shrink: 0;
        }
        

        
        .header-navigation__user {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--header-user-color);
          cursor: pointer;
          padding: 2px;
          border-radius: 50%;
          transition: background-color 0.2s ease;
          font-size: var(--header-user-font-size);
          font-weight: var(--header-user-font-weight);
          line-height: var(--header-user-line-height);
          letter-spacing: var(--header-user-letter-spacing);
          font-family: inherit;
        }
        
        .header-navigation__user:hover {
          background-color: var(--header-button-hover-bg, rgba(255, 255, 255, 0.1));
        }
        
        .header-navigation__user-avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #3d63dd;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 500;
          flex-shrink: 0;
          font-family: var(--font-family);
          letter-spacing: 0.5px;
        }
        
        .header-navigation__user-text {
          white-space: nowrap;
        }
        
        .header-navigation__chevron {
          width: 12px;
          height: 12px;
          flex-shrink: 0;
          opacity: 0.7;
        }
        
        /* Action buttons styling */
        .header-navigation__actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
        }
        
        /* Separator between actions and profile */
        .header-navigation__separator {
          width: 1px;
          height: 16px;
          background-color: var(--header-separator-color, #333);
          margin: 0 var(--spacing-2);
          flex-shrink: 0;
        }
        
        /* Separator between brand and account dropdown */
        .header-navigation__brand-separator {
          width: 1px;
          height: 16px;
          background-color: var(--header-separator-color, #333);
          margin: 0 var(--spacing-2);
          flex-shrink: 0;
        }
        
        /* Profile section wrapper */
        .header-navigation__profile {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }
        
        /* Help button using Icon Button styles */
        .header-navigation__help-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--icon-btn-size);
          height: var(--icon-btn-size);
          background: var(--icon-btn-bg);
          border: none;
          color: var(--icon-btn-text);
          cursor: pointer;
          border-radius: var(--icon-btn-border-radius);
          transition: color 0.2s ease, background-color 0.2s ease;
          padding: 0;
          margin: 0;
          flex-shrink: 0;
        }
        
        .header-navigation__help-btn:hover {
          color: var(--icon-btn-hover-text);
          background-color: var(--icon-btn-hover-bg);
        }
        
        .header-navigation__help-btn:active {
          color: var(--icon-btn-active-text);
          background-color: var(--icon-btn-active-bg);
        }
        
        .header-navigation__help-btn:focus-visible {
          box-shadow: 0 0 0 2px #67b3fb !important;
          outline: none !important;
        }
        
        .header-navigation__help-icon {
          width: var(--icon-btn-icon-size);
          height: var(--icon-btn-icon-size);
          flex-shrink: 0;
        }
        
        /* Focus styles for header navigation elements */
        .header-navigation__account-button:focus-visible,
        .header-navigation__team-button:focus-visible {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: transparent;
          box-shadow: 0 0 0 2px #67b3fb;
          outline: none;
        }
        
        .header-navigation__user:focus-visible {
          background-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 0 2px #67b3fb;
          outline: none;
        }
        
        .header-navigation__account-option:focus-visible,
        .header-navigation__team-option:focus-visible,
        .header-navigation__user-option:focus-visible {
          background-color: #333333;
          box-shadow: inset 0 0 0 2px #67b3fb;
          outline: none;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .header-navigation {
            --header-padding: 0 var(--spacing-3);
            --header-gap: var(--spacing-2);
          }
          
          .header-navigation__user-text {
            display: none;
          }
          

          

          
          .header-navigation__separator {
            margin: 0 var(--spacing-1);
            height: 14px;
          }
          
          .header-navigation__brand-separator {
            margin: 0 var(--spacing-1);
            height: 14px;
          }
          
          .header-navigation__actions {
            gap: 4px;
          }
          
          .header-navigation__help-btn {
            width: 28px;
            height: 28px;
          }
          
          .header-navigation__help-icon {
            width: 14px;
            height: 14px;
          }
        }
        
        @media (max-width: 480px) {
          .header-navigation {
            --header-padding: 0 var(--spacing-2);
            --header-gap: var(--spacing-1);
          }
          
          .header-navigation__brand {
            margin-right: var(--spacing-1);
          }
          
          .header-navigation__logo {
            width: 20px;
            height: 20px;
          }
          
          .header-navigation__brand-text {
            font-size: 12px;
          }
          
          .header-navigation__separator {
            margin: 0 4px;
            height: 12px;
          }
          
          .header-navigation__brand-separator {
            margin: 0 4px;
            height: 12px;
          }
          
          .header-navigation__actions {
            gap: 2px;
          }
          
          .header-navigation__help-btn {
            width: 24px;
            height: 24px;
          }
          
          .header-navigation__help-icon {
            width: 12px;
            height: 12px;
          }
          
          .header-navigation__user {
            padding: 2px;
          }
          
          .header-navigation__user-avatar {
            width: 18px;
            height: 18px;
            font-size: 8px;
          }
          
          .header-navigation__chevron {
            width: 10px;
            height: 10px;
          }
          
          .header-navigation__account-icon,
          .header-navigation__team-icon {
            width: 12px;
            height: 12px;
          }
          
          .header-navigation__account-chevron,
          .header-navigation__team-chevron {
            width: 10px;
            height: 10px;
          }
          
          .header-navigation__account-dropdown-menu,
          .header-navigation__team-dropdown-menu {
            min-width: 180px;
          }
        }
      `}</style>

      <header className={`header-navigation ${className}`}>
        <div className="header-navigation__left">
          <div className="header-navigation__brand">
            <svg 
              className="header-navigation__logo"
              role="img" 
              aria-label="CVP Logo" 
              viewBox="0 0 150 150"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M75.1,20.3c-33.8,0-62.6,21.7-74,52.1l0,0c-0.2,0.3-0.2,0.6-0.2,1c0,1.5,1.2,2.7,2.7,2.7c1.1,0,2.1-0.7,2.5-1.8
	l0,0c10.6-28.4,37.5-48.6,69-48.6c31.6,0,58.5,20.2,69.1,48.8l4.9-1.9C137.8,42.1,108.9,20.3,75.1,20.3z" style={{fill: 'white', opacity: 0.8}} />
              <path d="M133,96.3c-2.3,0-4.4-1.6-5-4c-5.2-25-27.5-43.1-53-43.1S27.1,67.2,22,92.2c-0.6,2.7-3.2,4.5-6,4s-4.5-3.2-4-6
	c3-14.3,10.8-27.3,22.1-36.6c11.4-9.4,26-14.7,40.9-14.7s29.4,5.2,40.9,14.7c11.3,9.4,19.2,22.3,22.1,36.6c0.6,2.7-1.2,5.4-4,6
	C133.7,96.2,133.4,96.3,133,96.3z" style={{fill: 'white', opacity: 0.8}} />
              <g>
                <path d="M104,105.8c1.9,0,3.4-1.5,3.4-3.4c0-1.8-1.6-3.2-3.4-3.2h-4.1v6.7H104z M99.9,119.9c0,1.9-1.5,3.4-3.4,3.4
	c-1.9,0-3.4-1.5-3.4-3.4V95.3c0-1.4,1.1-2.5,2.5-2.5h8.8c5.4,0,9.7,4.4,9.7,9.6c0,5.4-4.4,9.8-9.7,9.8h-4.6L99.9,119.9z" style={{fill: 'white'}} />
                <path d="M74.5,121.5c-0.2,0.5-0.7,0.9-1.3,0.9c-0.6,0-1.1-0.4-1.3-0.9L60,96.7c-0.1-0.4-0.2-0.8-0.2-1.2
	c0-1.9,1.5-3.4,3.4-3.4c1.4,0,2.5,0.8,3.1,1.9l6.9,15.1h0.3l6.7-14.7c0.4-1.4,1.7-2.3,3.2-2.3c1.9,0,3.4,1.5,3.4,3.4
	c0,0.5-0.1,1-0.3,1.4L74.5,121.5z" style={{fill: 'white'}} />
                <path d="M51.8,121c-2.6,1.8-5.6,2.6-8.6,2.6c-8.7,0-15.7-6.9-15.7-15.6c0-8.7,7-15.7,15.7-15.7c4.4,0,7.6,1.3,10.5,4
	c0.4,0.3,0.4,0.9,0,1.2l-3.4,3.5c-0.3,0.3-0.8,0.3-1.1,0c-1.6-1.4-3.7-2.2-5.9-2.2c-4.9,0-8.5,4.1-8.5,9c0,4.8,3.7,8.8,8.6,8.8
	c1.6,0,3.4-0.4,4.8-1.3c0.5-0.3,1.1-0.4,1.7-0.4c1.8,0,3.3,1.5,3.3,3.3C53.3,119.4,52.7,120.4,51.8,121z" style={{fill: 'white'}} />
              </g>
            </svg>
            <span className="header-navigation__brand-text">Rail Manager</span>
          </div>
          
          <div className="header-navigation__brand-separator"></div>
          
          <div className="header-navigation__account-dropdown">
            <button 
              className={`header-navigation__account-button ${isAccountDropdownOpen ? 'header-navigation__account-button--open' : ''}`}
              onClick={handleAccountDropdownToggle}
              aria-label="Select account"
              aria-expanded={isAccountDropdownOpen}
            >
              <Building className="header-navigation__account-icon" />
              <span className="header-navigation__account-text">{selectedAccount.name}</span>
              <ChevronDown className="header-navigation__account-chevron" />
            </button>
            
            <div className={`header-navigation__account-dropdown-menu ${isAccountDropdownOpen ? 'header-navigation__account-dropdown-menu--open' : ''}`}>
              {accounts.map((account) => (
                <button
                  key={account.id}
                  className={`header-navigation__account-option ${account.id === selectedAccountId ? 'header-navigation__account-option--selected' : ''}`}
                  onClick={() => handleAccountSelect(account.id)}
                >
                  {account.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="header-navigation__center">
        </div>
        
        <div className="header-navigation__right">
          <div className="header-navigation__actions">
            <button 
              className="header-navigation__help-btn"
              onClick={onHelpClick}
              aria-label="Help"
            >
              <HelpCircle className="header-navigation__help-icon" />
            </button>
          </div>
          
          <div className="header-navigation__separator"></div>
          
          <div className="header-navigation__profile">
            <div className="header-navigation__team-dropdown">
              <button 
                className={`header-navigation__team-button ${isTeamDropdownOpen ? 'header-navigation__team-button--open' : ''}`}
                onClick={handleTeamDropdownToggle}
                aria-label="Select team"
                aria-expanded={isTeamDropdownOpen}
              >
                <Users className="header-navigation__team-icon" />
                <span className="header-navigation__team-text">{selectedTeam.name}</span>
                <ChevronDown className="header-navigation__team-chevron" />
              </button>
              
              <div className={`header-navigation__team-dropdown-menu ${isTeamDropdownOpen ? 'header-navigation__team-dropdown-menu--open' : ''}`}>
                {teams.map((team) => (
                  <button
                    key={team.id}
                    className={`header-navigation__team-option ${team.id === selectedTeamId ? 'header-navigation__team-option--selected' : ''}`}
                    onClick={() => handleTeamSelect(team.id)}
                  >
                    {team.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="header-navigation__user-dropdown">
              <button 
                className="header-navigation__user"
                onClick={handleUserDropdownToggle}
                aria-label="User menu"
                aria-expanded={isUserDropdownOpen}
              >
                <div className="header-navigation__user-avatar">JD</div>
              </button>
              
              <div className={`header-navigation__user-dropdown-menu ${isUserDropdownOpen ? 'header-navigation__user-dropdown-menu--open' : ''}`}>
                <div className="header-navigation__user-email">
                  {userEmail}
                </div>
                
                <button
                  className="header-navigation__user-option"
                  onClick={() => handleUserAction(() => onAccountDetails?.())}
                >
                  <User className="header-navigation__user-option-icon" />
                  Account Details
                </button>
                
                <button
                  className="header-navigation__user-option"
                  onClick={() => handleUserAction(() => onThemeSwitch?.())}
                >
                  <Sun className="header-navigation__user-option-icon" />
                  Switch to Light Theme
                </button>
                
                <button
                  className="header-navigation__user-option"
                  onClick={() => handleUserAction(() => onLogOut?.())}
                >
                  <LogOut className="header-navigation__user-option-icon" />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}