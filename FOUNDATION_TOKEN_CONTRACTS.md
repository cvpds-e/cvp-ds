# CVP Foundation Token Contracts

**Status:** Frozen baseline for component standardization  
**Updated:** 2026-08-04

## Contract rule

Components consume Tier 3 component tokens. Tier 3 resolves through Tier 2
semantic roles, and Tier 2 resolves through Tier 1 primitives. Foundation
previews are executable audits of this graph: displayed samples are bound to the
same tokens used by production components. Numeric strings printed beside a
sample are documentation labels, not rendering inputs.

## Foundation ownership

| Foundation | Tier 1 source | Tier 2 contract | Component expectation |
|---|---|---|---|
| Color | `--cvp-primitive-{family}-{step}` | `--cvp-color-*`, focus and state roles | Never select a primitive directly |
| Typography | Font families, sizes, weights, line heights, tracking | `--cvp-type-*`, `--cvp-font-*`, `--cvp-line-height-*` | Component typography aliases a semantic role |
| Spacing | `--cvp-primitive-space-*` | `--cvp-space-*`, relationship families, density remapping | Insets and gaps use Tier 3 tokens where customization is public |
| Radius | `--cvp-primitive-radius-*` | `--cvp-radius-*`, `--cvp-shape-*` | Geometry describes control, surface, overlay, or rounded role |
| Border | Primitive widths | Width, color, and composed `--cvp-border-*` recipes | State boundaries use registered recipes |
| Elevation | Shadow dimensions and depth steps | `--cvp-elevation-*`, `--cvp-plane-*`, z-index roles | Components use plane/menu/modal shadow contracts |
| Layout | Breakpoints, columns, governed widths | Page, content, pane, and responsive layout roles | Components use layout roles rather than local breakpoints |

## Typography roles

| Role | Size | Line height | Weight |
|---|---|---|---|
| Display | `--cvp-type-display-size` | `--cvp-type-display-line-height` | `--cvp-type-display-weight` |
| Headline | `--cvp-type-headline-size` | `--cvp-type-headline-line-height` | `--cvp-type-headline-weight` |
| Title | `--cvp-type-title-size` | `--cvp-type-title-line-height` | `--cvp-type-title-weight` |
| Body | `--cvp-type-body-size` | `--cvp-type-body-line-height` | Regular |
| Label | `--cvp-type-label-size` | `--cvp-type-label-line-height` | `--cvp-type-label-weight` |
| Caption | `--cvp-type-caption-size` | `--cvp-type-caption-line-height` | Regular |
| Technical | `--cvp-type-mono-size` | `--cvp-type-mono-line-height` | Mono family |

## Density contract

`compact`, `default`, and `comfortable` remap semantic relationship tokens;
components do not maintain independent spacing scales. Default controls remain
40px high. Compact controls are 32px and are reserved for data-dense tooling.
Touch targets in touch-primary contexts must still meet the product's 44px target
policy through layout or hit-area treatment.

## Acceptance gate

A component is ready for engineering only when:

1. Its preview shows anatomy, complete states, theme parity, and density where applicable.
2. Its Token Contract names Tier 3 token, canonical source, resolved value, and activation selector/state.
3. Its Markdown handoff defines API, DOM/state hooks, migration rules, and acceptance criteria.
4. Static token checks, production build, and dual-theme WCAG A/AA checks pass.

