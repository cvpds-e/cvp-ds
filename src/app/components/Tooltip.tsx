import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import './Tooltip.css';

export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
  defaultOpen?: boolean;
};

/** A concise, non-interactive description for a control or unfamiliar term. */
export function Tooltip({
  content,
  children,
  side = 'top',
  align = 'center',
  delayDuration = 300,
  defaultOpen,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root defaultOpen={defaultOpen}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className="cvp-tooltip" side={side} align={align} sideOffset={varToNumber('--cvp-tooltip-offset', 6)}>
            {content}
            <TooltipPrimitive.Arrow className="cvp-tooltip__arrow" width={10} height={5} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

function varToNumber(name: string, fallback: number) {
  if (typeof window === 'undefined') return fallback;
  const value = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
  return Number.isFinite(value) ? value : fallback;
}
