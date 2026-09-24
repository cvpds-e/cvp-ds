---
assetId: misc-input
classification: component
lifecycle: approved
specificationStatus: draft
---
# Misc Input

## Purpose

Misc Input is a flexible single-line field for data entry that needs validation feedback, character counting, prefix or suffix content, or a copy action.

## When to use

- A single-line field needs error, warning, or success feedback.
- Character counting or a maximum length helps users stay within a limit.
- A prefix or suffix clarifies the expected unit, currency, or format.
- A copy action improves work with identifiers or generated values.

Choose the validation treatment according to the field's current status:

- **Default:** use for neutral helper guidance or when no validation message is needed.
- **Error:** use for an invalid value or an exceeded character limit; error takes precedence over every other validation treatment.
- **Warning:** use for a value that is accepted but may require attention.
- **Success:** use only when explicit confirmation of a valid value helps users continue.

Choose supporting content according to the input constraint:

- **Helper text:** provide persistent guidance that users need before entering a value.
- **Character count:** show when users need to track length; pair it with a maximum length when a hard limit applies.
- **Field prefix:** show compact metadata beside the label, such as an identifier namespace or category.

Choose field adornments according to the value format or follow-up action:

- **Prefix element:** use for a visual unit, currency, or format cue before the entered value.
- **Suffix element:** use for a visual unit or status cue after the entered value.
- **Copy action:** use when the field contains an identifier or generated value that users commonly reuse elsewhere.

Account for these field states:

- **Required:** identify fields that must contain a value before submission.
- **Disabled:** use when the value is unavailable and cannot be edited or copied.
- **Over limit:** treat a value beyond the configured maximum as an error and state how many characters must be removed.

Combine only the supporting features needed to clarify one field.

## When not to use

- The input requires multiple lines; use Textarea.
- A standard labelled field with helper or error text is sufficient; use Text Input.
- The task is specifically search or date selection; use Search Field or Date Picker.
