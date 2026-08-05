# Accordion Standardization

Accordion now follows the CVP navigation-family component contract.

## Supported behavior

- Controlled and uncontrolled expansion
- Single and multiple expansion models
- Optional leading icons with neutral or brand emphasis
- Per-item and whole-component disabled states
- Configurable semantic heading level
- Arrow Up/Down, Home, and End header navigation

## Accessibility

- Unique trigger and region IDs are generated per instance.
- Native buttons expose `aria-expanded` and `aria-controls`.
- Expanded panels use labelled regions.
- Disabled headings remain perceivable and are skipped by keyboard navigation.
- Collapsed panel content is removed from the DOM and focus order.

All visual values resolve through the CVP primitive → semantic → component token architecture, including reduced-motion behavior.
