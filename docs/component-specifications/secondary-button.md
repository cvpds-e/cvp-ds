---
assetId: secondary-button
classification: component
lifecycle: approved
specificationStatus: draft
---
# Secondary Button

## Purpose

Provide a supporting button action beneath the primary action in the hierarchy.

## When to use

- A supporting action needs a button treatment without primary emphasis.
- Default or compact density matches the surrounding action group.

Use a clear verb label and the existing component tokens. Native button
attributes are supported; the default type is `button`. `loading` prevents
repeat activation and exposes busy feedback with `loadingText`. `disabled`
prevents unavailable actions.

## When not to use

- The action is the principal commitment; use Primary Button.
- The established workflow uses Outline Button for Cancel; preserve that pattern.
- A low-emphasis text action is sufficient; use Text Button.

See [implementation](../../src/app/components/SecondaryButton.tsx) and
[showcase](../../src/app/components/SecondaryButtonDocumentation.tsx).
