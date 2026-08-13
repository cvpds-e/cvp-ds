import React, { createContext, useContext, useMemo, useRef, useState } from 'react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import './WorkspaceLayout.css';
import './WorkspaceLayoutConnectivity.css';

type WorkspaceSlotProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;
type WorkspaceDivProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
type WorkspaceBodyProps = WorkspaceDivProps & { sidePanelWidth?: string; minSidePanelWidth?: number; maxSidePanelWidth?: number };

type WorkspaceResizeContextValue = { onResizeStart: (event: React.PointerEvent<HTMLButtonElement>) => void } | null;
const WorkspaceResizeContext = createContext<WorkspaceResizeContextValue>(null);

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

/**
 * Shared application workspace shell.
 *
 * Use the slots to compose an operational page without duplicating the shell's
 * canvas, split-pane, scrolling, divider, and sticky-footer behaviour.
 */
export function WorkspaceLayout({ className, children, ...props }: WorkspaceDivProps) {
  return <div className={classes('cvp-workspace-layout', className)} {...props}>{children}</div>;
}

function GlobalHeader({ className, children, ...props }: WorkspaceSlotProps) {
  return <header className={classes('cvp-workspace-layout__global-header', className)} {...props}>{children}</header>;
}

function Breadcrumbs({ className, children, ...props }: WorkspaceSlotProps) {
  return <div className={classes('cvp-workspace-layout__breadcrumbs', className)} {...props}>{children}</div>;
}

function Body({ className, children, sidePanelWidth = '344px', minSidePanelWidth = 280, maxSidePanelWidth = 480, style, ...props }: WorkspaceBodyProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(sidePanelWidth);
  const onResizeStart = (event: React.PointerEvent<HTMLButtonElement>) => {
    const body = bodyRef.current;
    if (!body) return;
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = body.querySelector<HTMLElement>('.cvp-workspace-layout__side-panel')?.getBoundingClientRect().width ?? minSidePanelWidth;
    const onMove = (moveEvent: PointerEvent) => setWidth(`${Math.min(maxSidePanelWidth, Math.max(minSidePanelWidth, startWidth + moveEvent.clientX - startX))}px`);
    const onEnd = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onEnd); };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onEnd, { once: true });
  };
  const context = useMemo(() => ({ onResizeStart }), [width, minSidePanelWidth, maxSidePanelWidth]);
  return <WorkspaceResizeContext.Provider value={context}><div ref={bodyRef} className={classes('cvp-workspace-layout__body', className)} style={{ ...style, '--cvp-workspace-side-panel-width': width } as React.CSSProperties} {...props}>{children}</div></WorkspaceResizeContext.Provider>;
}

function SidePanel({ className, children, ...props }: WorkspaceSlotProps) {
  return <aside className={classes('cvp-workspace-layout__side-panel', className)} {...props}>{children}</aside>;
}

function Main({ className, children, ...props }: WorkspaceSlotProps) {
  return <main className={classes('cvp-workspace-layout__main', className)} {...props}>{children}</main>;
}

function ResizeHandle({ className, ...props }: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>) {
  const workspace = useContext(WorkspaceResizeContext);
  if (!workspace) return null;
  return <button type="button" className={classes('cvp-workspace-layout__resize-handle', className)} aria-label="Resize side panel" title="Drag to resize side panel" onPointerDown={workspace.onResizeStart} {...props}><span aria-hidden="true" /></button>;
}

function PageHeader({ className, children, ...props }: WorkspaceSlotProps) {
  return <header className={classes('cvp-workspace-layout__page-header', className)} {...props}>{children}</header>;
}

function Toolbar({ className, children, ...props }: WorkspaceSlotProps) {
  return <div className={classes('cvp-workspace-layout__toolbar', className)} {...props}>{children}</div>;
}

function Footer({ className, children, ...props }: WorkspaceSlotProps) {
  return <footer className={classes('cvp-workspace-layout__footer', className)} {...props}>{children}</footer>;
}

WorkspaceLayout.GlobalHeader = GlobalHeader;
WorkspaceLayout.Breadcrumbs = Breadcrumbs;
WorkspaceLayout.Body = Body;
WorkspaceLayout.SidePanel = SidePanel;
WorkspaceLayout.Main = Main;
WorkspaceLayout.ResizeHandle = ResizeHandle;
WorkspaceLayout.PageHeader = PageHeader;
WorkspaceLayout.Toolbar = Toolbar;
WorkspaceLayout.Footer = Footer;
