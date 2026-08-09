"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "./utils";

// Helper function to filter out Figma-specific props
function filterFigmaProps<T extends Record<string, any>>(props: T): Omit<T, `_fg${string}`> {
  const filtered = {} as any;
  for (const key in props) {
    // Filter out any prop that starts with _fg (Figma inspector props)
    if (!key.startsWith('_fg')) {
      filtered[key] = props[key];
    }
  }
  return filtered;
}

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...filterFigmaProps(props)}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...filterFigmaProps(props)} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const cleanProps = filterFigmaProps(props);
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...cleanProps} />;
}

function TooltipContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  const cleanProps = filterFigmaProps(props);
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        style={{
          backgroundColor: 'var(--cvp-color-surface-overlay)',
          color: 'var(--cvp-color-text-primary)',
          fontFamily: 'var(--cvp-font-family-sans)',
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: '0.1px',
          padding: '6px 12px',
          borderRadius: 'var(--cvp-shape-control-base)',
          boxShadow: 'var(--cvp-shadow-md)',
          border: 'var(--cvp-border-container)',
          zIndex: 9999,
          maxWidth: 'fit-content',
          whiteSpace: 'nowrap'
        }}
        className={cn(
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
          className,
        )}
        {...cleanProps}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
