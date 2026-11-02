---
assetId: rails-list
classification: page
lifecycle: approved
specificationStatus: draft
---
# Rails List

## Purpose

Provide the Rail Manager workspace for discovering, creating, and opening rails
within collections.

## When to use

- Manage editorial, personalized, and Station rail examples in one workspace.
- Open the corresponding rail-details variant from a collection.

Station creation uses an immutable Station entity type and generic behavior;
personalized Station rails are not supported. Choose the Station collection and
capacity during creation, and keep them read-only in Station details. Station
CRUD in this showcase persists in browser storage, not a connected RMS service.
Keep failures visible and destructive actions confirmed.

## When not to use

- A consumer-facing rail needs rendering; use Rail Content Gallery.
- An API-backed production manager is expected without service integration.

See [implementation](../../src/app/components/RailsList.tsx),
[showcase](../../src/app/components/RailsListDocumentation.tsx), and
[Station contract](./station-rail-details.md).
