---
assetId: personalized-rail-details
classification: page
lifecycle: approved
specificationStatus: draft
---
# Personalized Rail Details

## Purpose

Provide the personalized rail workspace within the shared Rail Details showcase.

## When to use

- Configure a personalized rail and inspect its content preview.
- Evaluate personalized configuration, empty states, and responsive settings.

Keep the Settings heading above the configuration tabs, the Personalized
indicator right-aligned in the preview header, and the shared Save/Cancel footer
for pending edits. Preserve mobile settings close/reopen actions and the
established secondary Text Button treatment for confirmed deletion.

## When not to use

- An editorial-only rail is needed; use Rail Details.
- A Station rail is needed; Station does not support personalization.

See [implementation](../../src/app/components/PersonalizedRailDetails.tsx) and
[shared showcase](../../src/app/components/RailDetailsDocumentation.tsx).
