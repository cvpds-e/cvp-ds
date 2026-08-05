# Engineering Handoff Readiness

Date: 2026-08-05

Start implementation from `ENGINEERING_HANDOFF_INDEX.md`, which consolidates the approved scope, preview routes, source priority, component handoffs, and acceptance checklist.

## Handoff status

The standardized scope is ready for engineering implementation and visual review. Foundation pages, component documentation, Tier 3 contracts, individual handoff notes, and the Rail Details integration page provide the intended pixel-level source.

## Completed verification

- Production Vite build passes.
- Patch whitespace validation passes.
- All 38 approved routes render in both light and dark themes without missing-page states or document-level horizontal overflow.
- Automated WCAG A/AA checks cover the approved pages in both themes. The audit includes WCAG 2.0, 2.1, and 2.2 rules; screen-reader and complete keyboard-flow certification remains an engineering responsibility.
- Completed components resolve through the CVP primitive → semantic → component token chain.
- Every active component handoff identifies its Token Contract or Canonical Source.
- CSS custom-property resolution is clean across the approved scope. The only intentionally local variables are modal instance width, table container height, tree nesting level, and generated primitive references.
- Light and dark themes use the same component markup.
- The default semantic selector no longer competes with an explicit light theme; light and dark values now resolve deterministically at the root.
- Light-theme link, editorial, success, error, and gallery-empty roles use contrast-safe semantic values rather than dark-theme or primitive-only fallbacks.
- Resting neutral borders follow the subtle/default/strong hierarchy; focus and validation boundaries remain prominent.
- Rail Details composes the standardized controls and uses `Rails List → Trending` for its page hierarchy.
- Deferred components are hidden from the active navigation without deleting their source.

## Deferred by product decision

- Toggle
- Filter Group
- Page Side Nav
- Segment Query Configuration

These are outside the current handoff scope and should not be treated as approved components.

## Engineering infrastructure still recommended

These do not block design handoff, but should be added before treating the repository as a release-ready package:

1. Add a TypeScript `typecheck` script and CI gate. The current package exposes only `dev` and `build`.
2. Add Stylelint token-governance rules for unregistered and deprecated custom properties.
3. Add automated interaction/accessibility tests for keyboard and screen-reader behavior.
4. Add visual regression snapshots for light/dark, responsive widths, and component states.
5. Add Storybook or an equivalent isolated component harness if engineers require prop-level fixtures outside the documentation site.
6. Add bundle splitting before production distribution; Vite currently reports a large-chunk warning.

The in-app audit intentionally reports manual-review items separately from violations. Table header/data associations and context-dependent contrast over media should remain in the engineering QA checklist even when automated checks pass.

## Source priority for implementation

1. `src/styles/cvp-primitives.css`
2. `src/styles/cvp-semantic-tokens.css`
3. `src/styles/cvp-component-tokens.css`
4. Component CSS and TSX
5. Component documentation page and matching `*_DEV_HANDOFF.md` / `*_STANDARDIZATION.md`
6. Rail Details for composed-page behavior

When written prose and live code disagree, the canonical token files and standardized component implementation take precedence; log the discrepancy rather than introducing a local override.
