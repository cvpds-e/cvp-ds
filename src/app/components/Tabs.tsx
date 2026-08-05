import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, defaultTab, onTabChange, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [contentKey, setContentKey] = useState(0);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;
    
    setActiveTab(tabId);
    setContentKey(prev => prev + 1);
    onTabChange?.(tabId);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const enabledTabs = tabs.filter(tab => !tab.disabled);
    const currentEnabledIndex = enabledTabs.findIndex(tab => tab.id === tabs[currentIndex].id);
    
    let nextIndex = currentEnabledIndex;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = (currentEnabledIndex + 1) % enabledTabs.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = enabledTabs.length - 1;
        break;
      default:
        return;
    }

    const nextTab = enabledTabs[nextIndex];
    if (nextTab) {
      setActiveTab(nextTab.id);
      setContentKey(prev => prev + 1);
      onTabChange?.(nextTab.id);
      tabRefs.current[nextTab.id]?.focus();
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <>
      <style>{`
        .tabs {
          width: 100%;
        }

        .tabs-list {
          display: flex;
          gap: 0;
          padding: 0;
          background: transparent;
          border-bottom: 1px solid var(--border-default);
          margin: 0;
          list-style: none;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: thin;
        }

        .tabs-trigger {
          padding: 12px 16px;
          background: transparent;
          font-family: Inter, sans-serif;
          font-size: 13px;
          font-weight: 500;
          line-height: 18px;
          border: none;
          border-bottom: 2px solid transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 150ms ease;
          white-space: nowrap;
          position: relative;
          outline: none;
        }

        .tabs-trigger:hover:not(:disabled) {
          color: var(--text-primary);
          background: var(--bg-hover);
        }

        .tabs-trigger[aria-selected="true"] {
          color: var(--text-primary);
          background: transparent;
          border-bottom-color: transparent;
        }

        .tabs-trigger:focus-visible {
          outline: none;
          z-index: 1;
          box-shadow: 0 0 0 2px rgba(111, 139, 230, 0.25); /* Dark theme default */
        }

        [data-theme="light"] .tabs-trigger:focus-visible {
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.20);
        }

        .tabs-trigger:disabled {
          color: #a1a1a8;
          opacity: 0.5;
          cursor: not-allowed;
        }

        .tabs-trigger[aria-selected="true"]::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 20px;
          right: 20px;
          height: 2px;
          background: #3d63dd;
          animation: slideIn 200ms ease;
        }

        [data-theme="light"] .tabs-trigger[aria-selected="true"]::after {
          background: #2563eb;
        }

        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .tabs-content {
          padding-top: 24px;
          animation: fadeIn 150ms ease;
        }

        /* Remove padding for panel navigation tabs */
        .tabs.panel-nav-tabs .tabs-content {
          padding-top: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      <div className={`tabs ${className}`}>
        <div 
          role="tablist" 
          className="tabs-list"
          aria-label="Tabs"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={el => tabRefs.current[tab.id] = el}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className="tabs-trigger"
              onClick={() => handleTabClick(tab.id, tab.disabled)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={tab.disabled}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {tabs.map((tab) => (
          <div
            key={`${tab.id}-${contentKey}`}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className="tabs-content"
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </>
  );
}