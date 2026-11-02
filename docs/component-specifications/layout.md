---
assetId: layout
classification: component
lifecycle: deferred
specificationStatus: draft
---
# Layout

## Purpose

Maintain the legacy two-panel layout prototype, with panel headers, optional
breadcrumbs, and configurable panel proportions.

## When to use

- Maintain an existing prototype that already depends on Layout.
- Evaluate the legacy resizable panel concept without treating it as production.

Supply `leftPanel` and `rightPanel` content and their optional headers. Widths
are desktop percentages; `resizable` enables the existing resizing interaction
and `onResize` reports the resulting proportions.

## When not to use

- New operational workspaces are being built. Use
  [Workspace Layout](./workspace-layout.md) instead.
- A simple single-column container is sufficient.

This asset remains deferred; this specification does not promote its lifecycle.
See [implementation](../../src/app/components/Layout.tsx).
