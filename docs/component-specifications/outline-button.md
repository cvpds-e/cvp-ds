---
assetId: outline-button
classification: component
lifecycle: approved
specificationStatus: draft
---
# Outline Button

## Purpose

Provide a bordered action with less visual emphasis than Primary Button.

## When to use

- Offer Cancel or another alternative beside a primary action.
- A default, compact, or dotted outlined treatment fits the action hierarchy.

Use an explicit action label. The component defaults to `type="button"`; choose
`type="submit"` deliberately inside forms. `loading` prevents repeat activation
and exposes a busy state with `loadingText`. `disabled` marks unavailable actions.

## When not to use

- The action is the page's principal commitment; use Primary Button.
- A low-emphasis link-style action is sufficient; use Text Button.

See [implementation](../../src/app/components/OutlineButton.tsx) and
[showcase](../../src/app/components/OutlineButtonDocumentation.tsx).
