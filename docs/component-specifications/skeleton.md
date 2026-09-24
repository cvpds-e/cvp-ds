---
assetId: skeleton
classification: component
lifecycle: approved
specificationStatus: draft
---
# Skeleton

## Purpose

Skeleton is a non-semantic visual placeholder for content actively loading, preserving the final layout geometry without implying an error or empty state.

## When to use

- The shape of pending content is known before data arrives.
- Table rows should retain column alignment while loading.
- Rail or gallery cards should preserve their eventual layout.
- A custom pending region needs a simple placeholder shape.

Choose the variant according to the pending content:

- **Standalone:** use a single placeholder with an explicit width and height for custom text, media, or control geometry.
- **Table rows:** use the table helper to preserve the requested row count, column alignment, and a loading status label.
- **Rail cards:** use the card helper for repeated media-and-copy placeholders in rails, galleries, and browse results.

Choose the radius according to the final content shape:

- **Small:** use for text lines and compact rectangular content.
- **Medium:** use for card media and moderately rounded surfaces.
- **Large:** use when the final surface has a larger corner radius.
- **Pill:** use for fully rounded placeholders such as pill-shaped metadata.

Choose the rail-card layout and density according to the final collection:

- **Rail:** preserve a horizontally arranged content rail.
- **Grid:** preserve a multi-column gallery or browse-result grid.
- **Default density:** use for standard rail and gallery cards.
- **Compact density:** use when the final cards use compact spacing and geometry.

Account for these skeleton states:

- **Animated:** use the standard loading motion while content is actively pending.
- **Reduced motion:** disable the loading animation when the user prefers reduced motion.

## When not to use

- Loading has completed; render content or the empty state.
- Data failed to load; show actionable error feedback.
- Content is intentionally absent or unavailable.
