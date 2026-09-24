---
assetId: number-input
classification: component
lifecycle: approved
specificationStatus: draft
---
# NumberInput

## Purpose

Number Input captures numeric values, quantities, positions, and limits with native number semantics, step controls, and optional bounds.

## When to use

- Users enter or adjust a numeric quantity.
- Minimum, maximum, or step constraints apply.
- Both keyboard entry and increment or decrement controls are useful.
- The field needs persistent guidance or validation feedback.

Choose the density according to the surrounding form:

- **Default:** use the standard 40px field for general forms and settings.
- **Compact:** use in constrained operational layouts where the surrounding controls use the same compact density.

Choose numeric constraints according to the valid range:

- **Minimum and maximum:** set one or both bounds when values outside a known range are invalid; the step controls stop at those bounds.
- **Step:** set the meaningful increment for the quantity; retain the default step of one for whole-unit adjustments.
- **Unbounded:** omit bounds only when any finite numeric value is valid for the task.

Choose supporting content according to what users need to enter a valid value:

- **Helper text:** provide persistent guidance such as the accepted range or unit when it is not otherwise evident.
- **Error:** provide a specific validation message when the value is invalid.
- **Optional text:** identify a non-required field beside its label when that distinction helps users scan the form.
- **Label tooltip:** add concise supplementary clarification that is useful but not required to complete the field.

Account for these field states:

- **Editable:** allow keyboard entry and enable increment or decrement controls while their respective bounds permit a change.
- **Read-only:** keep the value available for review while preventing edits and step changes.
- **Disabled:** make the field and both step controls unavailable when the value does not apply.
- **Empty:** allow no value until the user enters one; the first step begins from the minimum when provided, otherwise from zero.
- **Error:** expose the invalid state and associate the visible error message with the field.

## When not to use

- Digits represent an identifier, code, phone number, or other text; use Input.
- Users select from a short predefined numeric set; use Select or Segmented Control.
- The value cannot be meaningfully incremented or decremented.
