# CVP Color Foundation Assessment

Status: Historical approval assessment — superseded by the active token catalog
Date: 2026-08-04

> **Historical context:** This records the direction considered during the foundation review. For the current, implementation-safe palette and token names, use [`TOKEN_CATALOG.md`](../../tokens/TOKEN_CATALOG.md) and the Foundations → Color preview. The Royal/Periwinkle language below is retained only as decision history.

## Outcome

The existing CVP color identity is suitable for standardisation rather than replacement. The proposed direction preserves Royal Blue, Periwinkle, dark operational neutrals and the existing status vocabulary, while reorganising them into explicit primitive and semantic roles for both light and dark themes.

The accompanying preview is a decision artefact. It does not yet migrate the production component library.

## Current implementation

- Color values are distributed across generic theme variables, `theme.css`, `light-theme.css`, imported reference CSS, component-local styles and newer CVP token files.
- The newer `cvp-primitives.css`, `cvp-semantic-tokens.css` and component-token files describe a stronger architecture but were not connected to the active stylesheet at the start of this phase.
- Legacy and modern variable names coexist.
- Documentation values and runtime values can disagree.
- Hardcoded colours remain widespread in component and documentation source.

## Proposed semantic model

### Background

| Role | Dark direction | Light direction | Intended use |
|---|---|---|---|
| Canvas | `#0d0d14` | `#f8f9fb` | Application shell and workspace |
| Section | `#111118` | `#f2f3f6` | Navigation and grouped regions |
| Surface | `#14141a` | `#ffffff` | Cards, forms and contained content |
| Raised | `#1f1f28` | `#ffffff` | Prominent panels and side sheets |
| Overlay | `#252530` | `#ffffff` | Menus and temporary surfaces |
| Elevated | `#2a2a36` | `#ffffff` | Dialogs and focused tasks |

The light theme uses boundary and shadow support to distinguish upper layers that intentionally share white. The dark theme relies more heavily on surface-value separation.

### Foreground

| Role | Dark direction | Light direction |
|---|---|---|
| Primary | `#ffffff` | `#111827` |
| Secondary | `#e5e7eb` | `#374151` |
| Muted | `#9ca3af` | `#6b7280` |
| On accent | `#ffffff` | `#ffffff` |
| On inverse | `#111827` | `#ffffff` |

### Brand and intent

- Royal Blue remains the primary action family.
- Periwinkle remains a supporting/focus/accent family, not a competing primary action.
- Positive, Warning, Negative and Info retain their existing product meanings.
- Each intent requires subtle background, strong background, foreground and border mappings.
- Warning strong backgrounds must use an on-tint foreground selected by contrast, rather than assuming white.

### Focus

- Dark theme: the existing light-blue focus direction remains suitable.
- Light theme: use a darker blue mapping such as `#2563eb` so the indicator remains distinguishable from light surfaces.
- Both mappings share one semantic focus role and diverge only at the theme layer.

## Initial contrast checks

| Pairing | Ratio | Result |
|---|---:|---|
| Dark primary on canvas | 19.36:1 | Pass |
| Dark muted on surface | 7.23:1 | Pass |
| Light primary on canvas | 16.84:1 | Pass |
| Light muted on surface | 4.83:1 | Pass for normal text |
| White on Royal Blue `#3d63dd` | 5.21:1 | Pass for normal text |
| Existing light-blue focus on dark canvas | 8.68:1 | Pass |
| Existing light-blue focus on light canvas | 2.12:1 | Fail for component indication |
| Proposed `#2563eb` focus on light canvas | 4.91:1 | Pass; verify against every adjacent surface during implementation |

These checks cover the approval preview's primary examples, not the final exhaustive pairing matrix.

## Change classification

- Preserve: Royal Blue, Periwinkle, operational neutral character and dual themes.
- Standardise: surface depth, foreground roles, intent families and state naming.
- Fix: light-theme focus contrast and undocumented foreground/background pairings.
- Elevate: clearer hierarchy between canvas, contained surfaces and temporary layers.
- Deprecate later: duplicate generic and legacy token names after component usage reaches zero.

## Approval questions

1. Does the dark theme retain the intended CVP operator-console character?
2. Does the light theme feel like the same product rather than a separate visual system?
3. Is Royal Blue still the correct primary-action anchor?
4. Is Periwinkle correctly positioned as supporting accent/focus rather than primary CTA?
5. Is the six-level surface model appropriate for CVP workflows?

## Next implementation gate

After visual-direction approval:

1. Create the exact primitive inventory from all current values.
2. Produce the complete legacy-to-semantic mapping.
3. Finalise Light/Dark semantic token values and pairing rules.
4. Generate the canonical CSS/TypeScript token outputs.
5. Pilot Primary Button, Text Input/Select and Modal.
6. Run the exhaustive accessibility and visual-regression suite before expanding migration.
