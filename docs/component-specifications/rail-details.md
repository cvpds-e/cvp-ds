---
assetId: rail-details
classification: page
lifecycle: approved
specificationStatus: draft
---
# Rail Details

## Purpose

Compose the editorial rail workspace with a Settings panel, Base and Content
Query tabs, consumer preview, and manual content management.

## When to use

- Configure an editorial rail in the design-system showcase.
- Compare light and dark rail-detail experiences from the shared showcase.

Reuse Workspace Layout, Rail Content Gallery, query controls, and Unsaved Changes
Footer. Keep immutable fields in the established locked, read-only presentation.
Separate Save and Cancel from confirmed rail deletion. The content-preview
header carries the right-aligned Editorial indicator.

## When not to use

- The rail requires personalization; use Personalized Rail Details.
- The entity is Station; use the [Station variant](./station-rail-details.md)
  of the shared Rail Details route and showcase.

See [implementation](../../src/app/components/RailDetails.tsx) and
[showcase](../../src/app/components/RailDetailsDocumentation.tsx).
