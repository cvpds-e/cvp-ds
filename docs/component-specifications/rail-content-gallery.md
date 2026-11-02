---
assetId: rail-content-gallery
classification: pattern
lifecycle: approved
specificationStatus: draft
---
# Rail Content Gallery

## Purpose

Preview a horizontal content rail with item metadata, navigation, and optional
management actions.

## When to use

- Show editorial or personalized content in a consumer-like rail.
- Preview stations with square logo artwork using `mediaVariant="station"`.

Supply stable item IDs, labels, and callbacks for supported actions. Poster
artwork remains the default. `renderMedia` supplies artwork inside the
gallery-owned accessible target; do not nest interactive controls inside it.
Retain previous/next navigation, horizontal scrolling, and visible empty slots
when the calling workflow needs them.

## When not to use

- A dense table or vertical list is a better representation.
- The gallery is expected to validate API configuration or persist selections;
  those responsibilities belong to the calling workspace.

See [implementation](../../src/app/components/RailContentGallery.tsx) and
[showcase](../../src/app/components/RailContentGalleryDocumentation.tsx).
