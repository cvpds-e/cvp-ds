---
assetId: input
classification: component
lifecycle: approved
specificationStatus: draft
---
# Input

## Purpose

Input collects a single line of text with an associated label, optional guidance, validation feedback, and supporting content that clarifies the expected value.

## When to use

- A form needs a standard single-line text value.
- Helper text clarifies the expected value or format.
- Validation feedback must be associated directly with the field.
- Prefix, suffix, character count, or copy support materially improves data entry.

Choose the density according to the surrounding workflow:

- **Default:** use in standard forms and routine workflows.
- **Compact:** use in dense tables, filter tooling, and constrained settings layouts.

Choose supporting content according to what users need:

- **Label:** provide a persistent visible name; do not use placeholder text as the field label.
- **Prefix or suffix:** use to clarify units, currency, or expected formatting.
- **Character count:** use when a meaningful maximum length applies.
- **Copy action:** use when users commonly need to copy an identifier or generated value.
- **Helper text:** provide persistent format or expectation guidance while the value is valid.

Account for these input states:

- **Empty:** use placeholder content only as an example or hint.
- **Filled:** preserve the entered value as the control changes visual state.
- **Error:** show a specific, actionable validation message and do not rely on color alone.
- **Warning:** use when the value is accepted but needs attention or confirmation.
- **Success:** use only when explicit positive validation feedback benefits the workflow.
- **Read-only:** keep the value available for selection and copying without implying it can be edited.
- **Disabled:** use when the value is unavailable and does not need to be copied or submitted.

## When not to use

- The value spans multiple lines; use Textarea.
- The value is numeric and benefits from bounds or step controls; use NumberInput.
- The task is specifically search or date selection; use the corresponding specialized component.
- Users choose from predefined values; use Select, PillsInput, or TagsSelect.