"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--cvp-color-surface-overlay)",
          "--normal-text": "var(--cvp-color-text-primary)",
          "--normal-border": "var(--cvp-color-border-default)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
