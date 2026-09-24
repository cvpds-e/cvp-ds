---
assetId: pagination
classification: component
lifecycle: approved
specificationStatus: draft
---
# Pagination

## Purpose

Pagination moves through a controlled, ordered result set while keeping the current position, visible range, and available navigation clear.

## When to use

- A table, browser, or management list is divided into discrete pages.
- Users need context about their current range within the full result set.
- The workflow may benefit from page-by-page or row-by-row traversal.
- Direct page selection is more useful than continuous loading.

Choose the navigation unit according to how users move through the collection:

- **Page navigation:** use by default when users review results in page-sized groups.
- **Row navigation:** use when users need to move to a specific item position within a focused record workflow.

Account for these pagination states:

- **Interactive:** provide page-change behavior so the first, previous, next, last, and direct-entry controls can move through the collection.
- **Read-only:** omit page-change behavior when the range and position are informative only; navigation and direct entry remain unavailable.
- **Boundary:** disable first and previous controls at the beginning, and next and last controls at the end.
- **Empty:** show that there are no items and keep navigation unavailable.
- **Short collection:** show the current range without enabling movement when every item fits on one page.
- **Direct entry:** accept a page or row number, constrain it to the available range, and restore the current value after invalid input.

## When not to use

- The experience intentionally uses infinite scrolling or incremental loading.
- Filtering or sorting is the primary way users move through results.
- The collection fits comfortably on one page.
