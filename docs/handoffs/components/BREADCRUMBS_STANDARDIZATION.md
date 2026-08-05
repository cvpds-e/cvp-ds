# Breadcrumbs Standardization

Breadcrumbs now follows the established CVP component checkpoint conventions.

## Contract

- Uses the primitive → semantic → component token architecture.
- Preserves the CVP back-arrow pattern for the first ancestor.
- Uses the shared menu surface, item, border, elevation, and interaction roles.
- Supports light and dark themes without component-local color overrides.
- Keeps the current page non-interactive and exposes `aria-current="page"`.

## Interaction

- Links retain native navigation behavior when `href` is supplied.
- Trail hover is text-only: ancestors brighten to primary text and the current location softens to muted text; neither receives a background fill.
- Dropdown triggers expose `aria-haspopup`, `aria-controls`, and `aria-expanded`.
- Open menus support Arrow Up/Down, Home, End, and Escape.
- Disabled destinations remain visible but cannot be activated.
- Clicking outside closes an open destination menu.

## Responsive behavior

The trail remains a single hierarchy line and scrolls horizontally when space is constrained. The current label truncates at a documented token boundary rather than forcing a second row.

The Rail Details integration uses the two-level hierarchy `Rails List → Trending`; the former intermediate Content Query crumb was removed because it represented an editor tab rather than a navigation destination.
