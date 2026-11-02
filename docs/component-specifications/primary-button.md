---
assetId: primary-button
classification: component
lifecycle: approved
specificationStatus: draft
---
# Primary Button

## Purpose

Emphasize the principal action in a page, dialog, or action group.

## When to use

- Users commit a meaningful action such as saving or confirming.
- The default or compact density fits the surrounding controls.

Use a specific verb label and avoid competing primary actions within one group.
The default button type is `button`; set `type="submit"` for form submission.
`loading` disables activation and exposes `aria-busy` and `loadingText`.
Use `disabled` for unavailable actions and explain prerequisites nearby.

## When not to use

- Cancel, navigation, or a supplementary action needs less emphasis.
- An icon-only action is required; use a named Icon Button.

See [implementation](../../src/app/components/PrimaryButton.tsx) and
[showcase](../../src/app/components/PrimaryButtonDocumentation.tsx).
