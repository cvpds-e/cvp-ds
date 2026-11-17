"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "./utils";
import "./primitives.css";

const Avatar = React.forwardRef<React.ComponentRef<typeof AvatarPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(({
  className,
  ...props
}, ref) => {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      ref={ref}
      className={cn("cvp-avatar", className)}
      {...props}
    />
  );
});
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<React.ComponentRef<typeof AvatarPrimitive.Image>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(({
  className,
  ...props
}, ref) => {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      ref={ref}
      className={cn("cvp-avatar__image", className)}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<React.ComponentRef<typeof AvatarPrimitive.Fallback>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>(({
  className,
  ...props
}, ref) => {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      ref={ref}
      className={cn("cvp-avatar__fallback", className)}
      {...props}
    />
  );
});
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
