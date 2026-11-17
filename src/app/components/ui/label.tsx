"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "./utils";
import "./primitives.css";

const Label = React.forwardRef<React.ComponentRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(({
  className,
  ...props
}, ref) => {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      ref={ref}
      className={cn("cvp-label", className)}
      {...props}
    />
  );
});
Label.displayName = "Label";

export { Label };
