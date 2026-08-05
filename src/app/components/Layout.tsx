import React, { useState, useRef, useCallback } from 'react';
import { MoreHorizontal, Settings } from 'lucide-react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

export interface PanelHeaderProps {
  title: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
  showToggle?: boolean;
  isLeftPanel?: boolean;
  actions?: React.ReactNode;
}

export interface LayoutProps {
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  leftPanelHeader?: PanelHeaderProps;
  rightPanelHeader?: PanelHeaderProps;
  rightPanelBreadcrumbs?: BreadcrumbItem[];
  leftPanelWidth?: number; // percentage for desktop
  rightPanelWidth?: number; // percentage for desktop
  gap?: string;
  minHeight?: string;
  resizable?: boolean;
  className?: string;
  onResize?: (leftWidth: number, rightWidth: number) => void;
}

function PanelHeader({ 
  title, 
  isCollapsed = false, 
  onToggle, 
  showToggle = false, 
  isLeftPanel = false,
  actions 
}: PanelHeaderProps) {
  return (
    <div className={`panel-header ${isLeftPanel ? 'panel-header--left' : ''}`}>
      <div className="panel-header__content">
        <h3 className="panel-header__title">{title}</h3>
      </div>
      {actions && (
        <div className="panel-header__actions">
          {actions}
        </div>
      )}
    </div>
  );
}

export function Layout({
  leftPanel,
  rightPanel,
  leftPanelHeader,
  rightPanelHeader,
  rightPanelBreadcrumbs,
  leftPanelWidth = 30,
  rightPanelWidth = 70,
  gap = '0.5rem',
  minHeight = 'calc(100vh - 240px)',
  resizable = false,
  className = '',
  onResize
}: LayoutProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [currentLeftWidth, setCurrentLeftWidth] = useState(leftPanelWidth);
  const [currentRightWidth, setCurrentRightWidth] = useState(rightPanelWidth);

  
  const containerRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!resizable) return;
    e.preventDefault();
    setIsResizing(true);
  }, [resizable]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const newRightWidth = 100 - newLeftWidth;
    
    // Ensure width constraints: minimum 20% left to maximum 40% left
    if (newLeftWidth >= 20 && newLeftWidth <= 40) {
      setCurrentLeftWidth(newLeftWidth);
      setCurrentRightWidth(newRightWidth);
      onResize?.(newLeftWidth, newRightWidth);
    }
  }, [isResizing, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <>
      <style>{`
        .panel-layout {
          /* Panel Layout CSS Variables */
          --panel-border-radius: 2px;
          --panel-shadow: var(--shadow-sm);
          --panel-hover-shadow: var(--shadow-md);
          --panel-resize-indicator: transparent;
          --panel-resize-indicator-hover: var(--focus-ring);
          --panel-resize-indicator-active: var(--primary);
          --collapsible-content-bg: transparent;
          
          /* Panel spacing system */
          --panel-spacing-unit: var(--spacing);
          --panel-header-padding: 0 15px;
          --panel-left-header-padding: 15px;
          --panel-collapsible-padding: calc(var(--panel-spacing-unit) * 4);
          
          /* Component layout */
          min-height: ${minHeight};
          width: 100%;
          box-sizing: border-box;
          position: relative;
        }

        /* Unified panel container */
        .panel {
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: var(--panel-border-radius);
          box-shadow: var(--panel-shadow);
          transition: box-shadow var(--default-transition-duration) var(--default-transition-timing-function);
          overflow: hidden;
          display: flex;
          height: 100%;
        }

        .panel:hover {
          box-shadow: var(--panel-hover-shadow);
        }

        /* Desktop layout (≥768px) */
        @media (min-width: 768px) {
          .panel {
            flex-direction: row;
          }
          
          .panel-layout__left {
            width: ${currentLeftWidth}%;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            border-right: 1px solid var(--border-default);
          }
          
          .panel-layout__right {
            width: ${currentRightWidth}%;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
        }

        /* Mobile layout (<768px) */
        @media (max-width: 767px) {
          .panel {
            flex-direction: column;
          }
          
          .panel-layout__left {
            width: 100%;
            max-height: 500px;
            order: 1;
            border-right: none;
            border-bottom: 1px solid var(--border-default);
          }
          
          .panel-layout__right {
            width: 100%;
            flex: 1;
            order: 2;
          }
        }



        /* Panel Header Styles */
        .panel-header {
          height: 44px;
          padding: var(--panel-header-padding);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-default);
          background: var(--card);
          position: relative;
        }

        .panel-header--left {
          padding-left: var(--panel-left-header-padding);
        }

        .panel-header__content {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }

        .panel-header__title {
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          letter-spacing: 0.1px;
          color: var(--foreground);
          margin: 0;
        }



        .panel-header__actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
        }

        /* Panel Content Styles */
        .panel__content {
          padding: var(--panel-collapsible-padding);
          background: var(--collapsible-content-bg);
          flex: 1;
          overflow: auto;
        }

        /* Right Panel Content Specific Styles */
        .panel-layout__right .panel__content {
          padding-block: calc(var(--spacing) * 4);
          padding-inline: calc(var(--spacing) * 4);
        }

        /* Full-width component utilities */
        .panel__content .panel-full-width {
          margin-left: calc(-1 * var(--panel-collapsible-padding));
          margin-right: calc(-1 * var(--panel-collapsible-padding));
          width: calc(100% + 2 * var(--panel-collapsible-padding));
        }

        .panel__content .panel-full-width-horizontal {
          margin-left: calc(-1 * var(--panel-collapsible-padding));
          margin-right: calc(-1 * var(--panel-collapsible-padding));
          width: calc(100% + 2 * var(--panel-collapsible-padding));
        }

        /* Navigation Segmented component styling */
        .panel__content .panel-nav-segmented {
          margin-left: calc(-1 * var(--panel-collapsible-padding));
          margin-right: calc(-1 * var(--panel-collapsible-padding));
          margin-top: calc(-1 * var(--panel-collapsible-padding));
          width: calc(100% + 2 * var(--panel-collapsible-padding));
          border-bottom: 1px solid var(--border-default);
        }

        /* Navigation Tabs component styling */
        .panel__content .panel-nav-tabs {
          margin-left: calc(-1 * var(--panel-collapsible-padding));
          margin-right: calc(-1 * var(--panel-collapsible-padding));
          margin-top: calc(-1 * var(--panel-collapsible-padding));
          width: calc(100% + 2 * var(--panel-collapsible-padding));
        }

        .panel__content .panel-nav-tabs .tabs-list {
          border-bottom: 1px solid var(--border-default);
        }

        /* Accordion inside panel-nav-tabs should not have full-width margins */
        .panel__content .panel-nav-tabs .accordion.panel-full-width-horizontal {
          margin-left: 0;
          margin-right: 0;
          width: 100%;
        }

        /* Navigation container for panels */
        .panel__nav-container {
          margin-left: calc(-1 * var(--panel-collapsible-padding));
          margin-right: calc(-1 * var(--panel-collapsible-padding));
          margin-top: calc(-1 * var(--panel-collapsible-padding));
          width: calc(100% + 2 * var(--panel-collapsible-padding));
          padding: var(--panel-collapsible-padding);
          padding-bottom: calc(var(--panel-collapsible-padding) - 1px);
          border-bottom: 1px solid var(--border-default);
          margin-bottom: calc(var(--panel-collapsible-padding) - 1px);
        }

        /* Tree view container specific styles */
        .panel__content .tree-view-container.space-y-6 {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }

        .panel__content :where(.space-y-6 > :not(:last-child)) {
          margin-block-end: 0 !important;
        }

        /* Resize Handle Styles */
        .panel-layout__resizer {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 4px;
          left: ${currentLeftWidth}%;
          transform: translateX(-2px);
          cursor: col-resize;
          border-left: 2px solid var(--panel-resize-indicator);
          transition: border-color var(--default-transition-duration) var(--default-transition-timing-function);
          z-index: 10;
          user-select: none;
        }

        .panel-layout__resizer:hover {
          border-left-color: var(--panel-resize-indicator-hover);
        }

        .panel-layout__resizer--active,
        .panel-layout__resizer--resizing {
          border-left-color: var(--panel-resize-indicator-active);
        }

        /* Hide resizer on mobile */
        @media (max-width: 767px) {
          .panel-layout__resizer {
            display: none;
          }
        }

        /* Panel action buttons */
        .panel-action-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          color: var(--muted-foreground);
          cursor: pointer;
          transition: var(--btn-transition);
        }

        .panel-action-btn:hover {
          background: var(--secondary);
          color: var(--foreground);
        }

        .panel-action-btn:focus-visible {
          box-shadow: 0 0 0 2px var(--focus-ring);
        }

        /* Responsive adjustments */
        @media (max-width: 480px) {
          .panel-header {
            padding: var(--panel-header-padding);
          }
          
          .panel-header--left {
            padding-left: var(--spacing-3);
          }
          
          .panel-layout__left .panel__content {
            padding: var(--spacing-3);
          }
          
          /* Ensure right panel padding is maintained on mobile */
          .panel-layout__right .panel__content {
            padding-block: calc(var(--spacing) * 4) !important;
            padding-inline: calc(var(--spacing) * 4) !important;
          }
        }

        /* Custom scrollbar for panel content */
        .panel__content::-webkit-scrollbar {
          width: 6px;
        }

        .panel__content::-webkit-scrollbar-track {
          background: transparent;
        }

        .panel__content::-webkit-scrollbar-thumb {
          background: var(--muted);
          border-radius: 3px;
        }

        .panel__content::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }
      `}</style>

      <div 
        className={`panel-layout ${className}`}
        ref={containerRef}
      >
        <div className="panel">
          {/* Left Panel */}
          {leftPanel && (
            <div className="panel-layout__left">
              {leftPanelHeader && (
                <PanelHeader
                  {...leftPanelHeader}
                  isLeftPanel={true}
                />
              )}
              <div className="panel__content">
                {leftPanel}
              </div>
            </div>
          )}

          {/* Resize Handle */}
          {resizable && leftPanel && rightPanel && (
            <div
              ref={resizerRef}
              className={`panel-layout__resizer ${isResizing ? 'panel-layout__resizer--resizing' : ''}`}
              onMouseDown={handleMouseDown}
            />
          )}

          {/* Right Panel */}
          {rightPanel && (
            <div className="panel-layout__right">
              {rightPanelHeader && (
                <PanelHeader
                  {...rightPanelHeader}
                  isLeftPanel={false}
                />
              )}
              {rightPanelBreadcrumbs && (
                <Breadcrumbs items={rightPanelBreadcrumbs} />
              )}
              <div className="panel__content">
                {rightPanel}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Export individual components for advanced usage
export { PanelHeader };