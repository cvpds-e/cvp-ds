# CVP Foundation Token Reconciliation

## Decision

The existing CVP three-tier architecture is authoritative. Foundation specifications refine its vocabulary and rules; they do not create parallel production token systems.

## Active dependency chain

`index.css` imports `cvp-alias-bridge.css`, which imports `cvp-component-tokens.css`, which imports `cvp-semantic-tokens.css`, which imports `cvp-primitives.css`.

The bridge is intentionally retained during migration. New component work should consume Tier 3 tokens; existing generic variables continue through temporary compatibility aliases.

## Foundation ownership

| Foundation | Tier 1 | Tier 2 | Tier 3 |
|---|---|---|---|
| Color | Raw palettes | Theme-resolved roles and pairings | Component color contracts |
| Typography | Raw font metrics | Text roles and type scale | Component text contracts |
| Spacing | Raw numbered scale | Relationship families and density modes | Component padding/gap contracts |
| Radius | Raw permitted values | Shape roles and geometry rules | Component radius contracts |
| Border | Raw stroke widths | Functional border recipes and theme colors | Component boundary/state contracts |
| Elevation | Raw shadow dimensions and depth | Plane roles, shadow recipes, z-index ladder | Component surface/shadow contracts |

## Migration rules

1. Do not add raw values outside `cvp-primitives.css` unless the architecture explicitly permits a theme-dependent composite.
2. Do not let components reference primitives.
3. Customer override surfaces belong in `cvp-component-tokens.css`.
4. Keep `cvp-alias-bridge.css` until Phase 3 reaches zero direct `--tc-*` usage.
5. Generic `--spacing-*` and `--radius-*` aliases are temporary and must shrink during component migration.
6. A foundation preview may demonstrate semantic roles but must consume the same production token graph.
7. Layout and Motion additions must extend the canonical files and update `docs/project/IMPLEMENTATION_STATUS.md`.

## Next migration checkpoint

Layout begins on this reconciled graph. Its raw breakpoints and dimensions will enter Tier 1, its container and region roles Tier 2, and only true component override surfaces Tier 3. After Layout and Motion, component migration proceeds one component at a time with light/dark visual regression and accessibility checks.

## Completed scope — 4 August 2026

The implemented Color, Typography, Spacing, Radius, Border, Elevation, and Layout
previews now consume the canonical token graph for color. Text Input, Text Area,
and Select were included in the same reconciliation.

- Removed 297 legacy hex declarations from the six pre-Layout foundation preview
  stylesheets.
- Removed remaining RGB/RGBA and `color-mix()` declarations from all seven
  completed foundation preview stylesheets.
- Confirmed zero raw color declarations in the three standardized form controls.
- Added the preserved Royal Blue × Periwinkle presentation ramp and soft purple
  accent to Tier 1.
- Added explicit theme-safe `text-on-brand`, `text-on-dark`, and `text-on-light`
  semantic pairings to Tier 2.
- Bound every rendered Color palette swatch to a primitive token. Printed hex
  strings remain documentation labels only and never drive rendering.
- Revalidated the ten completed pages in both themes with zero automated WCAG
  A/AA violations.

The next component can now be standardized without relying on preview-era color
constants. Other, not-yet-standardized legacy components remain governed by the
component migration sequence and are not represented as complete here.
