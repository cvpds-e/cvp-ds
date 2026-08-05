import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface ModalTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'tabbed';
  tabs?: ModalTab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function Modal({ 
  isOpen, 
  onClose, 
  title,
  description,
  children, 
  maxWidth = '600px',
  showCloseButton = true,
  header,
  footer,
  variant = 'default',
  tabs = [],
  defaultActiveTab,
  onTabChange
}: ModalProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id || '');

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Update active tab when defaultActiveTab changes
  useEffect(() => {
    if (defaultActiveTab) {
      setActiveTab(defaultActiveTab);
    }
  }, [defaultActiveTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  if (!isOpen) return null;

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  const modalContent = (
    <>
      <style>{`
        @keyframes modal-backdrop-enter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modal-content-enter {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background-color: var(--modal-backdrop, rgba(0, 0, 0, 0.8));
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: modal-backdrop-enter 150ms ease-out;
        }

        .modal-wrapper {
          position: fixed;
          top: 50%;
          left: 50%;
          z-index: 1001;
          transform: translate(-50%, -50%);
          width: calc(100% - 2rem);
          max-width: var(--modal-max-width, 600px);
          max-height: calc(100vh - 4rem);
          animation: modal-content-enter 200ms ease-out;
        }

        .modal-container {
          position: relative;
          width: 100%;
          background: var(--modal-bg, linear-gradient(135deg, rgba(24, 24, 28, 0.98), rgba(16, 16, 20, 0.98)));
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          box-shadow: var(--modal-shadow, 0 25px 50px -12px rgba(0, 0, 0, 0.5));
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: calc(100vh - 4rem);
        }

        .modal-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--modal-gradient, linear-gradient(135deg, rgba(61, 99, 221, 0.03), transparent));
          pointer-events: none;
          z-index: 0;
        }

        .modal-content-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          z-index: 1;
        }

        .modal-header {
          padding: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-default);
          flex-shrink: 0;
        }

        .modal-header-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 500;
          line-height: 1.4;
          color: var(--modal-title-text, #ffffff);
          margin: 0;
        }

        .modal-description {
          font-size: 14px;
          line-height: 1.5;
          color: var(--modal-description-text, #AFAFB5);
          margin: 0;
        }

        .modal-close-button {
          position: absolute;
          top: 24px;
          right: 24px;
          z-index: 10;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          border-radius: 6px;
          color: var(--modal-close-icon, #6b6b78);
          cursor: pointer;
          transition: all 150ms ease;
        }

        .modal-close-button:hover {
          background: var(--modal-close-hover-bg, #1f1f28);
          color: var(--modal-close-hover-text, #ffffff);
        }

        .modal-close-button:focus-visible {
          outline: 2px solid #6f8be6;
          outline-offset: 2px;
        }

        .modal-tabs {
          display: flex;
          gap: 0;
          padding: 0 24px;
          border-bottom: 1px solid var(--border-default);
          flex-shrink: 0;
        }

        .modal-tab {
          position: relative;
          padding: 12px 16px;
          background: transparent;
          border: none;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
          color: var(--modal-tab-text, #AFAFB5);
          cursor: pointer;
          transition: all 150ms ease;
          border-bottom: 2px solid transparent;
          font-family: inherit;
        }

        .modal-tab:hover:not(.modal-tab--active) {
          color: var(--modal-tab-hover-text, #ffffff);
          background-color: var(--modal-tab-hover-bg, rgba(255, 255, 255, 0.05));
        }

        .modal-tab--active {
          color: var(--modal-tab-active-text, #ffffff);
          border-bottom-color: var(--border-focus);
        }

        .modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          color: var(--modal-body-text, #9b9ba5);
          max-height: 60vh;
        }

        .modal-body::-webkit-scrollbar {
          width: 8px;
        }

        .modal-body::-webkit-scrollbar-track {
          background: var(--modal-scrollbar-track, rgba(0, 0, 0, 0.2));
          border-radius: 4px;
        }

        .modal-body::-webkit-scrollbar-thumb {
          background: var(--modal-scrollbar-thumb, rgba(255, 255, 255, 0.2));
          border-radius: 4px;
        }

        .modal-body::-webkit-scrollbar-thumb:hover {
          background: var(--modal-scrollbar-thumb-hover, rgba(255, 255, 255, 0.3));
        }

        .modal-footer {
          padding: 24px;
          padding-top: 16px;
          border-top: 1px solid var(--border-default);
          flex-shrink: 0;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }
      `}</style>

      {/* Backdrop */}
      <div 
        className="modal-backdrop" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div 
        className="modal-wrapper"
        style={{ '--modal-max-width': maxWidth } as React.CSSProperties}
      >
        <div 
          className="modal-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          aria-describedby={description ? "modal-description" : undefined}
        >
          {/* Content Wrapper */}
          <div className="modal-content-wrapper">
            {/* Close Button */}
            {showCloseButton && (
              <button 
                className="modal-close-button"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            )}

            {/* Header */}
            {(title || description || header) && (
              <div className="modal-header">
                {header ? (
                  header
                ) : (
                  <div className="modal-header-content">
                    {title && (
                      <h2 id="modal-title" className="modal-title">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p id="modal-description" className="modal-description">
                        {description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Tabs (for tabbed variant) */}
            {variant === 'tabbed' && tabs.length > 0 && (
              <div className="modal-tabs" role="tablist">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`modal-tab ${activeTab === tab.id ? 'modal-tab--active' : ''}`}
                    onClick={() => handleTabClick(tab.id)}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`tabpanel-${tab.id}`}
                    id={`tab-${tab.id}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
            
            {/* Body */}
            <div className="modal-body">
              {variant === 'tabbed' ? (
                <div
                  role="tabpanel"
                  id={`tabpanel-${activeTab}`}
                  aria-labelledby={`tab-${activeTab}`}
                >
                  {activeTabContent}
                </div>
              ) : (
                children
              )}
            </div>

            {/* Footer */}
            {footer && (
              <div className="modal-footer">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}