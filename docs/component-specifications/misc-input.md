---
assetId: misc-input
classification: component
lifecycle: approved
specificationStatus: draft
---
# Misc Input

## Purpose

Provide a text input with optional prefix or suffix content, copy action,
character count, and warning or success feedback.

## When to use

- A field needs supporting affordances beyond the standard Text Input.
- Users need to copy a displayed value or understand a character limit.

Provide a persistent `label` and appropriate helper or validation text. Use
`maxLength` with `showCharacterCount` when a limit matters. `showCopy` exposes a
named copy button; `onCopy` can supply application-specific copy handling.
Required, disabled, and described-by states remain associated with the input.

## When not to use

- A standard labeled text field is sufficient; prefer Text Input.
- Values should be selected rather than entered.

See [implementation](../../src/app/components/MiscInput.tsx) and
[showcase](../../src/app/components/MiscInputDocumentation.tsx).
