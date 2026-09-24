---
assetId: splitter
classification: component
lifecycle: deferred
specificationStatus: draft
---
# Splitter

## Purpose

Splitter divides a workspace into responsive left and right panels and lets desktop users adjust how much space each panel receives. The component is deferred and should not be introduced into production work.

## When to use

- Maintain an existing prototype that already uses the resizable two-panel layout.
- A master-detail concept needs two persistent work areas.
- Users benefit from adjusting the balance between contextual and primary content.
- The panels need independent headers or breadcrumb context.

Choose the responsive arrangement according to the viewport:

- **Desktop split:** use side-by-side panels at wider viewports.
- **Mobile stack:** place the contextual panel above the primary panel when side-by-side comparison no longer fits.

Choose the divider behavior according to the task:

- **Fixed:** preserve configured panel widths when resizing does not improve the workflow.
- **Resizable:** allow desktop users to drag the divider when either panel may need additional working space.

Treat Splitter as reference guidance while its deferred lifecycle remains in effect.

## When not to use

- New production layout work is being built; use approved layout primitives or a product-specific layout.
- The interface requires more than two primary panels.
- A simple responsive stack, Flex, or Grid layout meets the requirement without user resizing.