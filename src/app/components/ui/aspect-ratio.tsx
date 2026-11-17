"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import * as React from "react";

const AspectRatio = React.forwardRef<React.ComponentRef<typeof AspectRatioPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>>(({
  ...props
}, ref) => <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} ref={ref} />);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
