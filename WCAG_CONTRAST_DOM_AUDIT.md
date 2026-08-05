# WCAG contrast and DOM audit

Date: 5 August 2026  
Scope: completed foundations, standardised form controls, and the complete button family  
Standard: WCAG 2.0/2.1/2.2 Level A and AA automated rules

## Audited pages

- Colors
- Typography
- Spacing
- Radius
- Border
- Elevation
- Layout
- Text Input
- Text Area
- Select
- Primary Button
- Secondary Button
- Outline Button
- Icon Button
- Icon Small Button
- Icon Button with Text
- Text Button

Every page was checked in both the CVP dark and light themes with axe-core. The
current result is **zero automated WCAG A/AA violations** across the 34-page/theme
matrix.

## Remediation completed

- Raised light- and dark-theme placeholder values to meet the 4.5:1 normal-text
  requirement on their field surfaces.
- Raised light-theme muted text to a value that remains conformant on white,
  page, sunken, and raised semantic surfaces.
- Replaced preview-era low-contrast display greys with semantic foreground
  tokens.
- Made all completed foundation previews consume the active theme for both
  surfaces and foregrounds.
- Corrected inverse-surface and intent-label pairings in the Color foundation.
- Corrected light-theme status, metadata, table-header, density-panel, and
  elevation-label pairings.
- Completed the ARIA table hierarchy in the Typography preview.
- Removed closed Select controls' dangling `aria-controls` references; the
  relationship is now exposed only while the popup exists.
- Added valid list/listitem semantics to the Color change-classification legend.
- Added accessible names to the Layout foundation's icon-only example actions.
- Corrected light-theme breadcrumb and guidance-label contrast on the Layout page.
- Verified accessible names, disabled semantics, focus recipes, loading states,
  and theme-aware contrast across all seven button pages.

## Automated indeterminate results reviewed manually

Axe cannot resolve five text/background pairs because their preview cards use
nested CSS custom properties and/or adjacent decorative geometry:

- Four surface-token code labels in the two Color theme examples.
- The `shape.rounded` code label in the Radius semantic-role example.

Their computed pairings were inspected directly. The Color labels resolve to
the theme's secondary foreground on opaque semantic surfaces; the Radius label
resolves to the theme's sky foreground over the inherited opaque card surface. All are comfortably above 4.5:1. These are
recorded as reviewed false indeterminates, not open failures.

## Repeating the check

Append `audit=1` to any preview URL, for example:

`http://127.0.0.1:5173/?page=text-input&audit=1`

The page emits a hidden `#cvp-a11y-audit` JSON result after rendering. This is
intended for local browser automation and CI harnesses; it does not alter the
visible preview or production component markup when the query flag is absent.

## Boundary of this audit

This confirms the automated contrast and DOM rules in the stated scope. It does
not claim complete WCAG conformance for keyboard journeys, screen-reader
announcements, zoom/reflow, cognitive usability, or manual interaction testing.
Those checks remain part of component acceptance as the library is standardised.
