---
assetId: badge
classification: component
lifecycle: approved
specificationStatus: draft
---
# Badge

## Purpose

Badge is a compact, non-interactive label for categorical metadata such as a collection type, classification, or content source.

## When to use

- An object needs a short category or classification label.
- A shared semantic tone helps distinguish stable meanings such as recommended, editorial, success, warning, or live content.
- Content provenance needs a compact algorithmic or manual label.

Choose the badge variant according to what the label communicates:

- **Default:** use for categories, classifications, and stable semantic metadata.
- **Content source:** use only to identify whether content entered a rail through an algorithmic or manual source.

Choose the default-variant tone according to a shared meaning:

- **Neutral:** use for open-ended identities and generic categories such as collection or genre.
- **Info:** use for established informational meanings such as recommended content.
- **Accent:** use for a shared emphasized classification such as editorial content.
- **Success:** use for a stable positive classification, not transient action feedback.
- **Warning:** use for metadata that consistently means review or caution is required.
- **Live:** use only for currently airing content.

Choose the content-source tone according to provenance:

- **Algorithmic:** use for content selected by recommendation or query logic.
- **Manual:** use for content added or pinned individually by a person.

Use the badge's fixed density and interaction model consistently:

- **Compact label:** keep content concise within the component's 24px height; Badge does not provide larger size variants.
- **Static state:** render Badge as non-interactive text; it does not provide selected, removable, or actionable states.

## When not to use

- The label represents a selected value; use Pills.
- Users can select or clear the label as a filter; use a filtering control.
- The value communicates lifecycle, availability, or health; use Status.
