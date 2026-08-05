# Header Navigation Standardization

Header Navigation now follows the CVP component architecture and the navigation-family review template.

## Composition

- Product identity and application-home link
- Account context selector
- Canonical Icon Button for global help
- Optional team context selector
- User identity and session-action menu

## Interaction contract

- Only the active menu is rendered.
- Selectors expose `aria-haspopup`, `aria-controls`, and `aria-expanded`.
- Account and team choices use `menuitemradio` with `aria-checked`.
- Menus support Arrow Up/Down, Home, End, Escape, and outside-click dismissal.
- Focus returns to the originating trigger after Escape.

## Responsive contract

- Desktop presents full product, account, team, help, and user context.
- Tablet condenses product and selector labels.
- Mobile prioritizes account, help, and user access while removing secondary team context.

All visual values resolve through the CVP primitive → semantic → component token architecture.
