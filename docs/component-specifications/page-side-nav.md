---
assetId: page-side-nav
classification: component
lifecycle: deferred
specificationStatus: draft
---
# Page Side Nav

## Purpose

Page Side Nav organizes persistent page or application navigation into vertical sections with labelled items, optional icons, and status badges. The component is deferred and should not be introduced into production work.

## When to use

- Maintain an existing prototype that already uses the component.
- A left-aligned navigation concept needs grouped sections for evaluation.
- Navigation items benefit from visible labels, icons, or concise status badges.

Treat the component as a reference while its deferred lifecycle remains in effect.

Use the supported layout only for the existing reference pattern:

- **Fixed-width vertical navigation:** place the 224px navigation beside page content when evaluating a persistent left-hand structure.
- **Sectioned list:** group related destinations under concise section titles when a flat list would be difficult to scan.

Choose item behavior according to the destination:

- **Link item:** provide a destination URL when selecting the item navigates to another location.
- **Button item:** use an in-place action only when selecting the item changes the current view without URL navigation.

Choose optional item content according to what improves recognition:

- **Label only:** use when destination names are clear and the smallest visual footprint is preferred.
- **Icon and label:** add a consistent icon when it helps users distinguish destinations; do not rely on the icon alone.
- **Badge:** add a concise count or status only when it helps users decide where to navigate.

Account for the current navigation state:

- **Active:** mark the one item that represents the current view and show its active color, surface, and indicator.
- **Inactive:** keep other destinations available with the standard resting and hover treatments.

## When not to use

- New production navigation is being built; use an approved navigation component or application-specific solution.
- Top-level navigation belongs in a horizontal application header; use Header Navigation.
- The information architecture requires deeply nested branches; use a navigation pattern designed for hierarchy.
