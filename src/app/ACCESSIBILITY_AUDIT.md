# Accessibility and Token Standardization Audit

## Status

This is an active, incremental audit. The design system targets WCAG 2.2 AA; it must not be described as globally conformant until every supported route, theme, breakpoint, and interaction state has been verified.

## Verification standard

- Use semantic `--cvp-*` tokens for production colour, typography, spacing, shape, motion, and focus decisions.
- Test dark and light themes, keyboard operation, visible focus, and responsive layouts.
- Run the built-in automated scan with `?audit=1` on each rendered route. Automated checks complement, rather than replace, manual keyboard and visual review.
- Verify normal-size text at 4.5:1 minimum and large text at 3:1 minimum. Non-text controls and focus indicators require at least 3:1 against adjacent colours where applicable.
- Disabled controls are documented exceptions under WCAG; their disabled state must not be the sole way to communicate critical information.

## First-pass findings — August 9, 2026

| Area | Result | Follow-up |
| --- | --- | --- |
| Semantic foundation tokens | Text, surface, border, brand, state, and focus tokens resolve for dark and light themes. | Verify rendered token pairings in each component. |
| Reusable controls audited | `FilterGroup`, `PageSideNav`, `Toggle`, and `SegmentQueryConfiguration` now use semantic tokens for production colour states. | Continue with remaining reusable components. |
| Table and Rails workflows | Neutral selection, metadata tags, control spacing, and compact controls use shared component tokens. | Exercise all selection, filter, and edit states with the automated scan. |
| Global focus styling | Shared focus ring token is used by the system-level and recently standardized controls. | Check custom controls for keyboard focus order and focus visibility. |
| Legacy styles | Older documentation/demo styles and compatibility aliases remain in the repository. | Replace or isolate them route by route; do not copy them into new production work. |

## Automated route scan — August 9, 2026

The current automated WCAG 2.2 A/AA scan reports **zero violations** for Rails List, Rail Details, and the accessibility guidance route. It also flags items that require contextual visual or semantic review (for example text displayed over media artwork, table group heading structure, and controls whose popup is conditionally rendered). These are review items, not passed assertions, and remain part of the release gate.

## Visual, responsive, and token-governance audit — August 9, 2026

| Check | Result |
| --- | --- |
| Rails List at 1440px and 768px | No horizontal document overflow; zero automated violations. |
| Rail Details at 1440px and 768px | No horizontal document overflow; zero automated violations. |
| Active Rails workflow token use | No direct colour values or legacy aliases found in Rails List, Rail Details, Table, or Rail Content Gallery. |
| Reference-only legacy modules | Four older reference modules still use compatibility aliases and are isolated from the active Rails workflows. They remain migration work, not a reason to use legacy styles in new UI. |

## Explicitly deferred

Keyboard and screen-reader checks for menus, filters, tables, dialogs, and dynamic status messages are intentionally out of scope for this stage. They must be completed before a full WCAG conformance claim is made.

## Release gate

Before claiming AA conformance for a release, record zero serious/critical automated violations for all supported routes and complete manual review of keyboard navigation, focus order, screen-reader names, contrast, zoom/reflow, and error/status announcements.
