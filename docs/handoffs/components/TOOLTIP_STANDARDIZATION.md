# Tooltip — developer handoff

## Canonical implementation

- Component: `src/app/components/Tooltip.tsx`
- Styles: `src/app/components/Tooltip.css`
- Tier 3 contract: `--cvp-tooltip-*` in `src/styles/tokens/cvp-component-tokens.css`
- Visual reference: `src/app/components/TooltipDocumentation.tsx`

## API

```tsx
<Tooltip content="Edit rail collection" side="top">
  <IconButton size="small" aria-label="Edit rail collection"><Pencil /></IconButton>
</Tooltip>
```

- `content`: concise, non-interactive description.
- `side`: `top` (default), `right`, `bottom`, or `left`.
- `align`: `start`, `center` (default), or `end`.
- `delayDuration`: hover/focus delay in milliseconds; defaults to 300.

## Rules

- Use for icon-only controls or unfamiliar terms.
- Keep the trigger's own accessible name; Tooltip is supplemental description.
- Do not put links, buttons, rich content, errors, or required instructions in a tooltip.
- Use a Popover, Dialog, or inline helper when content needs interaction or persistence.

## Theme and token contract

Tooltip consumes `--cvp-tooltip-*` only. Its surface, text, border, elevation, type, geometry, and motion resolve through the CVP token hierarchy in both light and dark themes. Do not set colour, padding, shadow, or radius locally.

## Acceptance

- Hover and keyboard focus open the same content.
- The pointer aligns with the trigger on every supported side.
- The label does not obscure the trigger or exceed its maximum readable width.
- Both themes preserve contrast, boundary visibility, and elevation.
- Reduced-motion preferences suppress entry and exit animation.
