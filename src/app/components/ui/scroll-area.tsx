"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "./utils";
import "./primitives.css";

export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  viewportProps?: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>;
  viewportRef?: React.Ref<React.ComponentRef<typeof ScrollAreaPrimitive.Viewport>>;
}

const ScrollArea = React.forwardRef<React.ComponentRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(({
  className,
  children,
  viewportProps,
  viewportRef,
  ...props
}, ref) => {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      ref={ref}
      className={cn("cvp-scroll-area", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        {...viewportProps}
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        tabIndex={viewportProps?.tabIndex ?? 0}
        className={cn("cvp-scroll-area__viewport", viewportProps?.className)}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = "ScrollArea";

const ScrollBar = React.forwardRef<React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>(({
  className,
  orientation = "vertical",
  ...props
}, ref) => {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      ref={ref}
      orientation={orientation}
      className={cn("cvp-scroll-area__scrollbar", className)}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="cvp-scroll-area__thumb"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
});
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
