---
assetId: layout
classification: component
lifecycle: deferred
specificationStatus: draft
---
# Layout

## Purpose

Layout divides a workspace into responsive left and right panels with optional headers, breadcrumbs, and a resizable desktop divider. The component is deferred and should not be introduced into production work.

## When to use

- Maintain an existing prototype that already uses the component.
- A master-detail concept needs two persistent work areas.
- Desktop users benefit from resizing the division between the two panels.
- The two panels need independent headers or breadcrumb trails.

Treat the component as a reference while its deferred lifecycle remains in effect.

Choose the responsive panel arrangement according to the viewport:

- **Desktop split:** use the side-by-side left and right panels at 768px and wider. The default split is 30% and 70%; provide custom percentages only when the content hierarchy requires them.
- **Mobile stack:** allow the left panel to stack above the right panel below 768px; do not depend on side-by-side comparison at small widths.

Choose the optional panel regions according to the workspace hierarchy:

- **Left panel:** use for the master list, navigation, filters, or other context that controls the detail area.
- **Right panel:** use for the primary detail or work area.
- **Panel headers:** add independent left or right headers when each panel needs its own title or actions.
- **Right-panel breadcrumbs:** add when the detail area needs to communicate its location within a hierarchy.

Choose the divider behavior according to whether user-controlled width is useful:

- **Fixed:** keep the configured panel widths when resizing would not improve the task.
- **Resizable:** allow desktop users to drag the divider when master and detail content need variable space; the left panel remains constrained between 20% and 40%.

## When not to use

- New production layout work is being built; use the approved layout primitives or a product-specific CSS layout.
- The page requires more than two primary panels.
- A simple responsive stack or grid meets the content requirement without resizing.
