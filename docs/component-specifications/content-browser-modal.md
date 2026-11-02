---
assetId: content-browser-modal
classification: pattern
lifecycle: approved
specificationStatus: draft
---
# Content Browser Modal

## Purpose

Let editors search, filter, sort, and select catalog content without leaving an
editorial workspace. Compose Modal, query controls, Rail Content Gallery, and
confirmation actions.

## When to use

- Add or replace editorial rail content from a supplied catalog.
- Preserve selections while browsing paginated results.

Use `selectedItems` and `onSelectionChange` for controlled selection. Supply
`onConfirm` to apply selected IDs and `onClose` to dismiss the dialog. Provide
program types, tags, and years through `filterOptions`; genres remain a legacy
compatibility input. The caller supplies items, loading state, and persistence.

## When not to use

- A permanent full-page catalog browser is required.
- Station GUID selection needs the station-specific validation workflow.

See [implementation](../../src/app/components/ContentBrowserModal.tsx) and
[showcase](../../src/app/components/ContentBrowserModalDocumentation.tsx).
