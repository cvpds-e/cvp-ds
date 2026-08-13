import React from 'react';
import { CircleHelp, Pencil, Settings } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { IconButton } from './IconButton';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import './TextInputDocumentation.css';
import './PrimaryButtonDocumentation.css';
import './TooltipDocumentation.css';

const rows: ComponentTokenContractRow[] = [
  { role: 'Surface', token: '--cvp-tooltip-bg', source: '--cvp-color-surface-overlay', contract: 'Theme-resolved temporary surface', activation: 'Open' },
  { role: 'Foreground', token: '--cvp-tooltip-text', source: '--cvp-color-text-primary', contract: 'Readable supporting text', activation: 'Open' },
  { role: 'Boundary', token: '--cvp-tooltip-border', source: '--cvp-color-border-default', contract: 'Visible on both themes', activation: 'Open' },
  { role: 'Elevation', token: '--cvp-tooltip-shadow', source: '--cvp-shadow-md', contract: 'Floating hierarchy', activation: 'Open' },
  { role: 'Spacing', token: '--cvp-tooltip-padding-{x,y}', source: '--cvp-space-{3,2}', contract: '12px × 8px inset', activation: 'All variants' },
  { role: 'Offset', token: '--cvp-tooltip-offset', source: '--cvp-space-2', contract: '8px from trigger', activation: 'All variants' },
];

function Preview({ theme }: { theme: 'dark' | 'light' }) {
  return <article className="cvp-tooltip-doc__theme" data-theme={theme}>
    <span>{theme}</span>
    <div className="cvp-tooltip-doc__stage">
      <Tooltip content="Edit rail collection" defaultOpen><IconButton size="small" aria-label="Edit rail collection"><Pencil /></IconButton></Tooltip>
    </div>
  </article>;
}

export function TooltipDocumentation() {
  return <main className="cvp-input-doc cvp-tooltip-doc">
    <header className="cvp-input-doc__hero"><div><span>Component · Standardized</span><h1>Tooltip</h1></div><div><p>A concise, non-interactive label that explains an icon-only control or unfamiliar term without competing with the task.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>
    <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Anatomy and behavior</h2><p>Appears after a short hover or focus delay, is anchored to its trigger, and closes when the trigger is no longer active.</p></div></header><div className="cvp-input-doc__anatomy"><div className="cvp-input-doc__live cvp-tooltip-doc__live"><Tooltip content="Open rail settings" defaultOpen><IconButton aria-label="Open rail settings"><Settings /></IconButton></Tooltip></div><ol><li><b>1</b><span><strong>Trigger</strong> An existing interactive control with an accessible name.</span></li><li><b>2</b><span><strong>Label</strong> Short description; do not place interactive content here.</span></li><li><b>3</b><span><strong>Pointer</strong> Connects the floating label to the trigger.</span></li></ol></div></section>
    <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Placement</h2><p>Top is the default; select another side only when space or the surrounding task requires it.</p></div></header><div className="cvp-tooltip-doc__placements">{(['top', 'right', 'bottom', 'left'] as const).map(side => <article key={side}><span>{side}</span><Tooltip content={`${side[0].toUpperCase()}${side.slice(1)} placement`} side={side} defaultOpen><button type="button" aria-label={`${side} tooltip example`}><CircleHelp size={18} /></button></Tooltip></article>)}</div></section>
    <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Theme parity</h2><p>The same component tokens select the appropriate overlay surface, foreground, boundary, and elevation for each theme.</p></div></header><div className="cvp-tooltip-doc__themes"><Preview theme="dark" /><Preview theme="light" /></div></section>
    <section className="cvp-input-doc__panel"><header><b>04</b><div><h2>Token contract</h2><p>The Tooltip consumes registered Tier 3 aliases—no local colours, shadow values, or geometry.</p></div></header><ComponentTokenContract label="Tooltip token contract" rows={rows} /></section>
    <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>05</b><div><h2>Usage decisions</h2></div></header><ul><li>Use for icon-only controls and brief term clarification.</li><li>Keep the label short and supplementary.</li><li>Use a dialog, popover, or inline helper for rich or actionable content.</li></ul></article><article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Accessibility contract</h2></div></header><ul><li>Keep the trigger’s accessible name independent of the tooltip.</li><li>Tooltips appear on hover and keyboard focus.</li><li>Do not put essential instructions solely in a tooltip.</li></ul></article></section>
    <footer className="cvp-input-doc__footer"><span>CVP overlay reference</span><p>Anchored · concise · theme-resolved · non-interactive</p></footer>
  </main>;
}
