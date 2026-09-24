---
assetId: checkbox
classification: component
lifecycle: approved
specificationStatus: draft
---
# Checkbox

## Purpose

Checkbox represents an independent binary choice or one item in a group where multiple options may be selected.

## When to use

- Users may select any number of independent options.
- A form needs a clearly labelled opt-in or opt-out choice.
- A parent selection derives a mixed state from selected child values.
- Validation requires an associated error message.

Choose the selection state according to the underlying value:

- **Unchecked:** use when the option is not selected.
- **Checked:** use when the option is selected.
- **Indeterminate:** derive this state from a mixed set of child selections; it is not a third answer users cycle through.

Choose the content treatment according to the amount of context required:

- **Label only:** use when the option is unambiguous in its surrounding group.
- **Label and description:** add concise support text when the consequence or scope needs clarification.
- **Required:** mark the choice as required only when form completion depends on an explicit answer.

Use the fixed checkbox density consistently:

- **Compact control:** preserve the 16px visible control within its 24px local target; Checkbox does not provide size variants.

Account for these interaction and validation states:

- **Hover and focus:** rely on the component's standard interaction feedback and visible focus ring.
- **Error:** associate the error message with the native input and expose the invalid state.
- **Disabled:** keep the current value visible while preventing interaction, including when the value is checked.

## When not to use

- Exactly one option may be selected; use Select, Segmented Control, or Choice Card Group.
- Changing the value should apply immediately as a persistent setting; use Toggle.
- A mixed state is intended as a user-selectable value rather than derived status.
