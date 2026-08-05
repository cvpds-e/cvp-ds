# CVP Primary Button — Standardization Handoff

**Status:** Ready for implementation  
**Updated:** 2026-08-05  
**Preview:** `http://127.0.0.1:5173/?page=primary-button`

## Outcome

Primary Button is the reference implementation for the CVP button family. It preserves the original solid Royal Blue emphasis while replacing inline styles, fallback values, and legacy aliases with the three-tier CVP token architecture.

## Anatomy

1. Native `button` root.
2. Visible label supplying the accessible name.
3. Loading layer containing a decorative spinner and visible loading text.

## Supported states

- Default, hover, pressed, keyboard focus, loading, and disabled.
- Small, medium, and large sizes.
- Default and compact density variants.
- Light and dark themes through semantic token resolution.

## Public API

| Prop | Type | Default | Contract |
|---|---|---|---|
| `children` | `React.ReactNode` | Required | Visible label and optional inline icon content |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Selects governed height and typography |
| `variant` | `'default' \| 'compact'` | `'default'` | Compact is reserved for dense desktop tooling |
| `loading` | `boolean` | `false` | Sets `aria-busy`, disables activation, and shows progress |
| `loadingText` | `string` | `'Loading'` | Visible progress label |
| `disabled` | `boolean` | `false` | Native disabled behavior |
| `type` | Native button type | `'button'` | Set `submit` explicitly for form submission |
| Native props | `ButtonHTMLAttributes` | — | Events, names, values, and data attributes pass through |

## Token contract

| Role | Tier 3 token | Canonical source | Contract | Activation |
|---|---|---|---|---|
| Background | `--cvp-button-primary-bg` | `--cvp-color-brand-default` | Royal Blue | Base |
| Hover | `--cvp-button-primary-bg-hover` | `--cvp-color-brand-hover` | Darker brand fill | `:hover` |
| Pressed | `--cvp-button-primary-bg-active` | `--cvp-color-brand-active` | Active fill + 1px offset | `:active` |
| Label | `--cvp-button-primary-text` | `--cvp-color-text-on-brand` | WCAG-conformant pairing | Available |
| Focus | `--cvp-button-primary-focus-ring` | `--cvp-border-focus-ring` | Border plus halo | `:focus-visible` |
| Disabled surface | `--cvp-button-primary-bg-disabled` | `--cvp-color-surface-disabled` | Theme resolved | `:disabled` |
| Medium height | `--cvp-button-primary-height` | `--cvp-space-800` | 40px | Default |
| Small height | `--cvp-button-primary-height-small` | `--cvp-space-8` | 32px | `size="small"` |
| Large height | `--cvp-button-primary-height-large` | `--cvp-space-900` | 48px | `size="large"` |
| Shape | `--cvp-button-primary-radius` | `--cvp-shape-control-compact` | 4px | Small / medium |
| Loading indicator | `--cvp-button-primary-spinner-size` | `--cvp-space-4` | 16px, 2px stroke | `loading={true}` |

## DOM and state contract

- `disabled` is present when either `disabled` or `loading` is true.
- `aria-busy="true"` and `data-loading` are present only while loading.
- `data-disabled` mirrors the unavailable state for diagnostics and styling.
- `data-preview-state` exists only for documentation snapshots of transient hover, active, and focus states; product code must not set it.
- The label remains in layout while loading, preventing width changes.

## Content and accessibility rules

- Use a concise imperative label, normally one to three words.
- Use once per action group or major surface; use Secondary or Outline for supporting actions.
- Do not use Primary Button for destructive confirmation.
- Native Enter and Space activation is preserved.
- Loading prevents repeated activation and exposes busy state.
- Small and compact buttons exceed the WCAG 2.5.8 Level AA 24px target minimum. Touch-first products should place them in a 44px interaction area.

## Engineering acceptance

- Match every preview state, size, and theme at default zoom.
- Import the component stylesheet; do not reproduce computed values.
- Override only documented Tier 3 tokens at a scoped customer boundary.
- Confirm loading cannot submit or fire duplicate actions.
- Run automated DOM/contrast checks plus application-level keyboard and screen-reader testing.
