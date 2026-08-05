# Tabs Standardization

Tabs now follows the CVP navigation-family component contract.

## Supported behavior

- Controlled and uncontrolled selection
- Automatic activation while navigating with arrows
- Optional manual activation with Enter or Space
- Horizontal and vertical orientation
- Home and End navigation
- Disabled-tab skipping
- Horizontally scrollable single-row overflow

## Accessibility

- Every instance creates unique tab and panel IDs.
- `aria-controls` and `aria-labelledby` preserve tab/panel relationships.
- Roving `tabIndex` keeps one tab in the page tab order.
- The active panel remains programmatically focusable.
- Selection uses text emphasis and a persistent indicator.

All visual values resolve through the CVP primitive → semantic → component token architecture, including motion and reduced-motion behavior.
