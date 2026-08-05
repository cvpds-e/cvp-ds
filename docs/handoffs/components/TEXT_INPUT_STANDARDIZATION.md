# CVP Text Input — Standardization Handoff

**Status:** Ready for implementation  
**Updated:** 2026-08-04  
**Preview:** `http://127.0.0.1:5173/?page=text-input`

## Outcome

Text Input is the reference component for the CVP form-control family. It preserves the original restrained CVP visual language while routing every production value through the canonical token graph.

## Anatomy

1. Persistent visible label, with optional required marker or optional text.
2. Native HTML `input` control.
3. One support region containing helper guidance or the current validation error.

## Supported states

- Default, hover, focus, filled, read-only, required, invalid, and disabled.
- Standard 40px density for normal workflows.
- Compact 32px density for dense tables and filter tooling only.
- Light and dark themes through semantic token resolution.

## Accessibility contract

- IDs use React `useId`, avoiding hydration instability and duplicate random IDs.
- A visible `label` is associated using `htmlFor` and `id`.
- Native `required`, `disabled`, `readOnly`, input type, and browser behavior are preserved.
- Helper or error content is connected through `aria-describedby`; a consumer-supplied description is composed rather than overwritten.
- Invalid fields receive `aria-invalid="true"`; the visible error uses `role="alert"`.
- Focus uses the shared CVP focus-ring recipe and remains visible beyond a color-only border change.
- Reduced-motion preferences disable the component transition.

## Token contract

The component implementation consumes only `--cvp-input-*` component tokens plus shared semantic typography, opacity, and surface roles. Theme-specific colors remain in `cvp-semantic-tokens.css`; geometry and component decisions remain in `cvp-component-tokens.css`.

Key public customization points are `--cvp-input-bg`, `--cvp-input-border`, `--cvp-input-text`, `--cvp-input-placeholder`, `--cvp-input-radius`, `--cvp-input-height`, and `--cvp-input-focus-ring`.

| Role | Tier 3 token | Canonical source | Contract | Activation |
|---|---|---|---|---|
| Surface | `--cvp-input-bg` | `--cvp-color-surface-default` | Theme resolved | Base |
| Text | `--cvp-input-text` | `--cvp-color-text-primary` | 14px / 20px | Value |
| Placeholder | `--cvp-input-placeholder` | `--cvp-color-text-placeholder` | WCAG AA pairing | `::placeholder` |
| Boundary | `--cvp-input-border` | `--cvp-color-input-border` | 1px | Base |
| Focus | `--cvp-input-focus-ring` | `--cvp-border-focus-ring` | Border plus halo | `:focus-visible` |
| Invalid | `--cvp-input-error-ring` | `--cvp-border-error-ring` | Error border plus halo | `[data-invalid]` |
| Height | `--cvp-input-height` | `--cvp-space-800` | 40px | Default |
| Compact height | `--cvp-input-height-compact` | `--cvp-space-8` | 32px | `size="compact"` |
| Shape | `--cvp-input-radius` | `--cvp-shape-control-base` | 6px | All states |
| Motion | `--cvp-input-transition` | Motion foundation | 150ms, standard easing | State change |

## Engineering acceptance

- Match the live preview at default browser zoom in both themes.
- Do not copy computed hex or pixel values from DevTools; consume the listed tokens.
- Verify every documented state and both densities.
- Preserve the rendered DOM associations and native input attributes.
- Run automated DOM/contrast checks and application-level keyboard and screen-reader tests.

## API changes

- Existing `variant`, `error`, `helperText`, `label`, `required`, and native input props remain supported.
- Added `size="default | compact"`.
- Added `optionalText` for explicit optional labeling.
- Added `inputClassName`; `className` continues to style the field wrapper.
- The native `required` attribute is now correctly forwarded. This fixes an existing behavior bug.

## Migration notes

- Remove assumptions about the old global `.text-input*` selectors; use the exported component.
- Do not style internal states with raw color values. Override registered component tokens at a scoped boundary when a supported product variation is required.
- Do not use placeholder text as the accessible name.
- Validation should generally occur on blur or submission, preserve the entered value, and move focus to an error summary for multi-field submission failures.
