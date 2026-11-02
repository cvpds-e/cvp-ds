---
assetId: theme-switcher
classification: utility
lifecycle: internal
specificationStatus: draft
---
# Theme Switcher

## Purpose

Switch the internal showcase between its light and dark token themes.

## When to use

- Maintain the design-system application's existing theme toggle.
- Inspect component behavior in both supported themes.

The control initializes from the stored `theme` preference or system preference,
updates document/body theme attributes, and persists the next selection.
Its accessible label names the theme that activation will select. Keep theme
changes within the existing token system rather than overriding component colors.

## When not to use

- A public product theme-preference component is required without integration.
- Theme-specific copies of otherwise theme-aware components are proposed.

See [implementation](../../src/app/components/ThemeSwitcher.tsx).
