"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";

import { cn } from "./utils";
import "./primitives.css";

const RadioGroup = React.forwardRef<React.ComponentRef<typeof RadioGroupPrimitive.Root>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>>(({
  className,
  ...props
}, ref) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      ref={ref}
      className={cn("cvp-radio-group", className)}
      {...props}
    />
  );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<React.ComponentRef<typeof RadioGroupPrimitive.Item>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>>(({
  className,
  ...props
}, ref) => {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      ref={ref}
      className={cn("cvp-radio-group__item", className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="cvp-radio-group__indicator"
      >
        <CircleIcon className="cvp-radio-group__dot" aria-hidden="true" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
