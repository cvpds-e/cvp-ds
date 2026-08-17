# Rail Content Gallery — developer handoff

## Canonical implementation

- Component: `src/app/components/RailContentGallery.tsx`
- Component styles: `src/app/components/RailContentGallery.css`
- Tier 3 aliases: `src/styles/tokens/cvp-component-tokens.css`
- Visual audit: `src/app/components/RailContentGalleryDocumentation.tsx`

The gallery composes canonical Checkbox, IconButton, and IconSmallButton components. Do not duplicate their input borders, focus states, disabled treatment, or media-control surfaces.

## Variants

- `display`: horizontal browsing rail.
- `management`: ordered rail with edit, pin, drag, position, and navigation controls.
- `display-grid`: responsive comparison grid.
- `display-grid-selectable`: grid with controlled selection.

The `selectedItems` array and `onSelectionChange` form a controlled selection contract. `loading` and an empty `items` array expose distinct loading and empty states. The forwarded handle retains `scrollLeft()` and `scrollRight()` for parent-owned navigation.

## Header metadata and navigation

- `showItemCount` controls whether the item total is shown.
- `itemCountPlacement="heading"` is the default for a title-adjacent total.
- `itemCountPlacement="navigation"` places the total immediately before the previous/next controls; use it when the total describes the whole rail, such as the Rail Details content preview.
- The total uses the gallery count aliases, which resolve to the same neutral metadata-tag language as Table totals: muted mono text, subtle surface, default border, compact horizontal inset, and no vertical inset.
- Rail navigation uses the small IconButton contract. Do not add local padding or size overrides to align the total with the controls.

## Accessibility and interaction

Every media item is a named button. Selectable cards expose `aria-pressed` and use the shared Checkbox state. Pin controls expose their pressed state. Navigation buttons disable at rail boundaries. Missing thumbnails use a meaningful visual placeholder without redundant image announcements.

Reordering callbacks receive the dragged item ID and zero-based target position. Product teams must provide any persistence message or rollback behavior.

## Token contract

Gallery CSS consumes `--cvp-gallery-*` Tier 3 aliases. Text, borders, surfaces, focus, spacing, radius, overlays, motion, and count metadata resolve through canonical CVP foundations. Child controls continue to consume their own Tier 3 contracts.

## Pixel-perfect acceptance

Verify all four variants, horizontal overflow, navigation boundaries, controlled selection, edit/pin controls, drag state, missing images, empty/loading states, narrow layout, reduced motion, and both themes against the documentation page.
