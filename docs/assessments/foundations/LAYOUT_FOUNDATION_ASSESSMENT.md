# CVP Layout Foundation Assessment

## Outcome

The Layout Foundation is implemented on the canonical CVP token graph. It establishes responsive page grids, region priorities, pane behavior, content-width constraints, and the structural rules that future screens and component documentation will consume.

## Current-state findings

- Page and component documentation used many independent max-widths, margins, grid definitions, and breakpoint values.
- The design-system shell had a stable 240px navigation width but no canonical semantic token behind it.
- Supporting panels and tools could remain inline too long, competing with the primary work area.
- Reading content and data-heavy content shared inconsistent width constraints.
- Breakpoint rules were spread across component files rather than resolving through shared semantic values.
- Existing Layout components provided useful panel patterns but did not define a complete page-level responsive contract.

## Implemented architecture

Raw widths, breakpoint thresholds, and column counts live in `cvp-primitives.css`. Applied page, pane, and content roles live in `cvp-semantic-tokens.css`. The design-system navigation consumes a Tier 3 component token that references the semantic navigation width.

### Responsive modes

- **SM, 320–599px:** 4 columns, 16px margins and gutters, single-column task priority.
- **MD, 600–1023px:** 8 columns, 24px margins and gutters, supporting content moves below or becomes conditional.
- **LG, 1024–1439px:** 12 columns, 32px margins and gutters, full working layout becomes available.
- **XL, 1440px+:** 12 columns with a 1440px maximum container and increased regional separation.

### CVP customization

The generic source kit proposes navigation widths starting at 280px. CVP retains its established 240px navigation pane because its compact documentation and operational shell already support scanability at that width. Main content remains flexible and keeps priority.

## Structural rules

- Main content never collapses.
- Secondary tools collapse first, followed by supporting and side regions, then inline navigation.
- Navigation must retain an overlay or compact fallback whenever it leaves inline flow.
- Supporting panes stack before they force the main work area below its viable width.
- Reading content remains constrained even on XL screens.
- Data and canvas workflows may expand, but remain aligned to the page grid and margins.
- Overlay regions are independent of the inline grid and use the Elevation stacking contract.
- DOM reading order must remain logical when CSS repositions, stacks, or hides visual regions.

## Accessibility

- Responsive changes preserve content order and access to navigation and tools.
- Zoom and text reflow must not introduce horizontal page scrolling at 320 CSS pixels, except for intentionally scrollable data regions.
- Hidden panes require an accessible trigger and explicit expanded state.
- Sticky or fixed regions must not obscure focused controls.
- Touch targets and separation continue to use the Spacing Foundation contracts.
- Focus visibility continues through the Border Foundation and cannot be clipped by pane overflow.

## Foundation pages as live token audits

Color, Typography, Spacing, Radius, Border, and Elevation pages now inherit their primary surfaces, text, borders, focus colors, theme scopes, page margins, container widths, radius, and elevation from the production token graph. Their side-by-side specimens use nested `data-theme` scopes so both theme mappings are exercised simultaneously.

Some original preview CSS literals remain as temporary fallbacks during Phase 2. The late-cascade audit layer overrides approved production properties. The Phase 0 token audit continues to expose those fallbacks until the source declarations are removed during component migration.

## Next gate

Motion follows Layout. Motion will govern duration, easing, entrance and exit behavior, reduced-motion alternatives, and temporary transitions between the stable layout and elevation states established so far.
