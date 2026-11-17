"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "./utils";
import "./primitives.css";

const Progress = React.forwardRef<React.ComponentRef<typeof ProgressPrimitive.Root>, React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>>(({
  className,
  value,
  max = 100,
  ...props
}, ref) => {
  const maximum = Number.isFinite(max) && max > 0 ? max : 100;
  const percentage = typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= maximum
    ? value / maximum * 100
    : undefined;
  return (
    <ProgressPrimitive.Root
      {...props}
      ref={ref}
      data-slot="progress"
      value={value}
      max={max}
      className={cn("cvp-progress", className)}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="cvp-progress__indicator"
        style={percentage === undefined ? undefined : { width: `${percentage}%` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = "Progress";

export { Progress };
