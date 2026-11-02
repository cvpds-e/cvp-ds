---
assetId: design-system-nav
classification: utility
lifecycle: internal
specificationStatus: draft
---
# Design System Navigation

## Purpose

Provide the internal showcase navigation for foundations, components, and
workspace examples.

## When to use

- Maintain the design-system application and its discoverable example routes.

`activeItem` identifies the current showcase entry and `onItemClick` handles
selection. Preserve the existing categorized navigation, search, keyboard
behavior, and active-state indication when adding entries. Station remains a
variant of the Rail Details showcase rather than a separate navigation page.

## When not to use

- Product application navigation is required.
- An internal showcase utility is being proposed as a public component.

See [implementation](../../src/app/components/DesignSystemNav.tsx).
