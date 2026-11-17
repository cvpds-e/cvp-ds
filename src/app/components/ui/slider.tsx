"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "./utils";
import "./primitives.css";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** Accessible names for range thumbs, in value order. */
  thumbLabels?: string[];
}

const Slider = React.forwardRef<React.ComponentRef<typeof SliderPrimitive.Root>, SliderProps>(({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  disabled = false,
  name,
  thumbLabels,
  "aria-label": ariaLabel,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  ...props
}, ref) => {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min],
    [value, defaultValue, min],
  );

  // Radix's generated slider inputs do not inherit disabled.
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      ref={ref}
      defaultValue={defaultValue ?? [min]}
      value={value}
      min={min}
      max={max}
      disabled={disabled}
      name={disabled ? undefined : name}
      className={cn("cvp-slider", className)}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="cvp-slider__track"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="cvp-slider__range"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="cvp-slider__thumb"
          aria-label={thumbLabels?.[index] ?? ariaLabel}
          aria-labelledby={thumbLabels?.[index] ? undefined : labelledBy}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          aria-disabled={disabled || undefined}
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = "Slider";

export { Slider };
