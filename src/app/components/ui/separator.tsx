"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "./utils";
import "./primitives.css";

const Separator = React.forwardRef<React.ComponentRef<typeof SeparatorPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>>(({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}, ref) => {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn("cvp-separator", className)}
      {...props}
    />
  );
});
Separator.displayName = "Separator";

export { Separator };
