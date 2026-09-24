---
assetId: text-input
classification: component
lifecycle: approved
specificationStatus: draft
---
# Text Input

## Purpose

Text Input collects a single line of text with an associated label, optional guidance, and validation feedback.

## When to use

- A form needs a standard single-line text value.
- Helper text clarifies the expected value or format.
- Error feedback must be associated directly with the field.
- A compact field is needed for a dense form or settings layout.

Choose the density according to the surrounding workflow:

- **Default:** use the standard 40px control for forms and routine workflows.
- **Compact:** use the 32px control only in dense tables, filter tooling, and similarly constrained settings layouts.

Choose the validation treatment according to the field state:

- **Default:** use for input that has no current validation problem.
- **Error:** use for a problem the user can resolve. Preserve the entered value, associate the message with the control, and do not rely on color alone.

Choose supporting content according to what the user needs:

- **Label:** provide a persistent visible label; do not use placeholder text as the field name.
- **Required:** show the required marker and preserve native required behavior when a value must be supplied.
- **Optional:** use optional text when explicitly identifying non-required fields improves completion.
- **Label tooltip:** add the shared Tooltip only for supplementary, non-essential clarification beside the label.
- **Helper text:** provide persistent format or expectation guidance while the field is valid.
- **Error text:** replace helper text with the current actionable validation message when invalid.

Account for these field states:

- **Empty:** use placeholder content only as an example or hint, never as the accessible name.
- **Filled:** preserve the entered value as the control changes visual state.
- **Hover and focus:** retain the standard boundary and shared visible focus ring.
- **Read-only:** keep the value focusable and available for selection and copying without implying it can be edited.
- **Disabled:** use only when the value is unavailable and does not need to be copied or submitted.
- **Invalid:** expose invalid state and its associated error message after an appropriate validation event, generally blur or submission.

## When not to use

- The value spans multiple lines; use Textarea.
- The field needs character counting, prefix or suffix content, or a copy action; use Misc Input.
- The task is specifically search, numeric entry, or date selection; use the corresponding specialized control.
