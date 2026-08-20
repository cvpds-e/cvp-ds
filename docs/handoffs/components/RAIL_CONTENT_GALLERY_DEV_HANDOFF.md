# Rail Content Gallery — developer handoff

## Canonical implementation

- Component: `src/app/components/RailContentGallery.tsx`
- Component styles: `src/app/components/RailContentGallery.css`
- Tier 3 aliases: `src/styles/tokens/cvp-component-tokens.css`
- Visual audit: `src/app/components/RailContentGalleryDocumentation.tsx`

The gallery composes canonical Checkbox, IconButton, and IconSmallButton components. Do not duplicate their input borders, focus states, disabled treatment, or media-control surfaces.

## Variants

- `display`: horizontal browsing rail.
- `management`: ordered rail with a consistent vertical information stack: Algorithmic source tag above each title by default, title, then metadata. Pinned items instead use a Manual source tag. The drag indicator sits top-left, position bottom-left, and drag/edit/delete reveal together only on hover or focus (always visible on touch). Edit and delete share the same small, dark-glass gallery Icon Button surface; delete carries the semantic danger-red glyph without an additional border. A green pin indicator appears bottom-right only for pinned content.
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

Every media item is a named button. Selectable cards expose `aria-pressed` and use the shared Checkbox state. Visible pinned indicators expose their pressed state and a named unpin action; edit and delete actions each have named controls. Navigation buttons disable at rail boundaries. Missing thumbnails use a meaningful visual placeholder without redundant image announcements.

Reordering callbacks receive the dragged item ID and zero-based target position. Product teams must provide any persistence message or rollback behavior.

## Token contract

Gallery CSS consumes `--cvp-gallery-*` Tier 3 aliases. Text, borders, surfaces, focus, spacing, radius, elevation, overlays, source tags, pin state, motion, and count metadata resolve through canonical CVP foundations. Populated media tiles map to elevation 1 at rest and elevation 2 on hover, while empty slots remain flat. Gallery controls use the same contrast-protected dark glass treatment in both themes, with a strong opaque-hover overlay so controls remain legible over arbitrary thumbnails. Delete keeps that shared surface and consumes semantic danger text. Position numerals use a bold, tabular treatment centered within the overlay square; Algorithmic source uses the bounded neutral surface treatment; Manual source and the active pin resolve through success state tokens. Child controls continue to consume their own Tier 3 contracts.

## Pixel-perfect acceptance

Verify all four variants, horizontal overflow, navigation boundaries, controlled selection, the management-control placement, edit/delete controls, pinned-only green indicators, drag state, missing images, empty/loading states, narrow layout, reduced motion, and both themes against the documentation page.
