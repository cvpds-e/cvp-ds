import React, { useState } from 'react';
import { TreeNode } from './TreeNode';

export interface TreeItem {
  id: string;
  label: string;
  children?: TreeItem[];
  type?: 'category' | 'subcategory' | 'item';
  status?: 'active' | 'inactive';
  tag?: 'RECOMMENDED' | 'EDITORIAL';
  count?: number;
}

export interface TreeProps {
  data: TreeItem[];
  onSelect?: (item: TreeItem) => void;
  selectedId?: string;
  initialExpanded?: string[];
  className?: string;
  style?: React.CSSProperties;
}

export function Tree({ data, onSelect, selectedId, initialExpanded = [], className = '', style }: TreeProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(initialExpanded));

  const handleToggle = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <>
      <style>{`
        .tree {
          /* Design System Tokens - Base System */
          --100dvw: 100dvw;
          --100dvh: 100dvh;
          --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

          /* Color System (OKLCH) */
          --color-red-50: oklch(.971 .013 17.38);
          --color-red-200: oklch(.885 .062 18.334);
          --color-red-300: oklch(.808 .114 19.571);
          --color-red-400: oklch(.704 .191 22.216);
          --color-red-500: oklch(.637 .237 25.331);
          --color-red-600: oklch(.577 .245 27.325);
          --color-red-700: oklch(.505 .213 27.518);
          --color-red-800: oklch(.444 .177 26.899);
          --color-red-950: oklch(.258 .092 26.042);
          --color-orange-300: oklch(.837 .128 66.29);
          --color-orange-600: oklch(.646 .222 41.116);
          --color-amber-50: oklch(.987 .022 95.277);
          --color-amber-200: oklch(.924 .12 95.746);
          --color-amber-300: oklch(.879 .169 91.605);
          --color-amber-400: oklch(.828 .189 84.429);
          --color-amber-500: oklch(.769 .188 70.08);
          --color-amber-600: oklch(.666 .179 58.318);
          --color-amber-700: oklch(.555 .163 48.998);
          --color-amber-800: oklch(.473 .137 46.201);
          --color-amber-950: oklch(.279 .077 45.635);
          --color-green-100: oklch(.962 .044 156.743);
          --color-green-200: oklch(.925 .084 155.995);
          --color-green-400: oklch(.792 .209 151.711);
          --color-green-500: oklch(.723 .219 149.579);
          --color-green-600: oklch(.627 .194 149.214);
          --color-green-800: oklch(.448 .119 151.328);
          --color-blue-50: oklch(.97 .014 254.604);
          --color-blue-100: oklch(.932 .032 255.585);
          --color-blue-200: oklch(.882 .059 254.128);
          --color-blue-300: oklch(.809 .105 251.813);
          --color-blue-600: oklch(.546 .245 262.881);
          --color-blue-700: oklch(.488 .243 264.376);
          --color-blue-800: oklch(.424 .199 265.638);
          --color-blue-950: oklch(.282 .091 267.935);
          --color-purple-100: oklch(.946 .033 307.174);
          --color-purple-200: oklch(.902 .063 306.703);
          --color-purple-300: oklch(.827 .119 306.383);
          --color-purple-600: oklch(.558 .288 302.321);
          --color-purple-800: oklch(.438 .218 303.724);
          --color-gray-100: oklch(.967 .003 264.542);
          --color-gray-400: oklch(.707 .022 261.325);
          --color-gray-500: oklch(.551 .027 264.364);
          --color-gray-900: oklch(.21 .034 264.665);
          --color-black: #000;
          --color-white: #fff;

          /* Typography System */
          --text-xs: .75rem;
          --text-xs--line-height: calc(1 / .75);
          --text-sm: .875rem;
          --text-sm--line-height: calc(1.25 / .875);
          --text-base: 1rem;
          --text-base--line-height: calc(1.5 / 1);
          --text-lg: 1.125rem;
          --text-lg--line-height: calc(1.75 / 1.125);
          --text-xl: 1.25rem;
          --text-2xl: 1.5rem;
          --text-2xl--line-height: calc(2 / 1.5);
          --text-3xl: 1.875rem;
          --text-3xl--line-height: calc(2.25 / 1.875);
          --font-weight-semibold: 600;
          --font-weight-bold: 700;
          --font-weight-medium: 500;
          --font-weight-normal: 400;

          /* Spacing & Layout */
          --spacing: 4px;
          --radius: .625rem;
          --radius-xs: .125rem;
          --tracking-tight: -.025em;
          --tracking-wider: .05em;
          --tracking-widest: .1em;
          --leading-relaxed: 1.625;

          /* Animation */
          --ease-in-out: cubic-bezier(.4, 0, .2, 1);
          --default-transition-duration: .15s;
          --default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);

          /* Font System */
          --font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          --font-family-mono: "Inconsolata", monospace;

          /* Typography Scale */
          --type-scale-m-size: 14px;
          --type-scale-m-weight: 400;
          --type-scale-m-line-height: 20px;
          --type-scale-m-letter-spacing: .15px;
          --type-scale-m-medium-size: 14px;
          --type-scale-m-medium-weight: 500;
          --type-scale-m-medium-line-height: 20px;
          --type-scale-m-medium-letter-spacing: .15px;
          --type-scale-l-size: 15px;
          --type-scale-l-weight: 400;
          --type-scale-l-line-height: 22px;
          --type-scale-l-letter-spacing: 0px;
          --type-scale-s-size: 13px;
          --type-scale-s-weight: 500;
          --type-scale-s-line-height: 20px;
          --type-scale-s-letter-spacing: .1px;
          --type-scale-s-regular-size: 13px;
          --type-scale-s-regular-weight: 400;
          --type-scale-s-regular-line-height: 20px;
          --type-scale-s-regular-letter-spacing: .1px;

          /* Component Tokens */
          --background: #19191b;
          --foreground: #fff;
          --card: #19191b;
          --card-foreground: #fff;
          --secondary: #292a2e;
          --secondary-foreground: #fff;
          --muted: #292a2e;
          --muted-foreground: #bbb;
          --border: #d4e4fe1a;

          /* Accessibility Colors */
          --a11y-status-active: #3dc155;
          --a11y-status-inactive: #a1a1a8;
          --a11y-rail-recommended: #67b3fb;
          --a11y-rail-editorial: #c084fc;

          /* Tree Container Tokens */
          --tree-bg: transparent;
          --tree-color: var(--foreground);
          --tree-border-radius: 6px;
          --tree-min-width: 280px;
          --tree-padding: 8px 0;

          /* Tree Container Styles */
          font-family: var(--font-family);
          background-color: var(--tree-bg);
          color: var(--tree-color);
          border-radius: var(--tree-border-radius);
          min-width: var(--tree-min-width);
          padding: var(--tree-padding);
          box-sizing: border-box;
        }

        .tree__content {
          /* Container for tree nodes */
        }

        /* Full width support for panel layouts */
        .tree.panel-full-width-horizontal {
          width: 100%;
          min-width: auto;
        }
      `}</style>

      <div className={`tree ${className}`} style={style}>
        <div className="tree__content">
          {data.map((item) => (
            <TreeNode
              key={item.id}
              item={item}
              level={0}
              expandedIds={expandedIds}
              onToggle={handleToggle}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      </div>
    </>
  );
}