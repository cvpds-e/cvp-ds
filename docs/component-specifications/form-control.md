---
assetId: form-control
classification: component
lifecycle: approved
specificationStatus: draft
---
# FormControl

## Purpose

FormControl composes a form field's label, control, supporting information, and validation message into one accessible relationship. It provides consistent field structure across different input types without changing the behavior of the control it contains.

## When to use

- A form control needs a persistent label and associated supporting text.
- Validation state and messages must be communicated consistently.
- Required, read-only, and disabled states need one shared field treatment.
- Different control types should follow the same labelling and messaging pattern.

Choose the control composition according to the value being collected:

- **Input Formcontrol:** use for free-form, single-line text entry.
- **Select Formcontrol:** use when one value must be chosen from predefined options.
- **Checkbox Formcontrol:** use for an independent binary choice or one item in a multiple-selection group.

Choose label and supporting content according to the field context:

- **Visible label:** use by default so users can identify the field before interacting with it.
- **Visually hidden label:** use only when surrounding context makes the field purpose visually unambiguous while an accessible name is still required.
- **Field information:** add concise supplementary guidance when users need context before entering a value.
- **Information tooltip:** use for non-essential clarification that would otherwise interrupt the form's scan path.
- **Caption message:** use for persistent instructions, format expectations, or validation feedback associated with the control.
- **Uppercase label:** use only where the established form hierarchy requires that text treatment; do not use capitalization as the only indication of importance.

Account for these FormControl states:

- **Default:** present the label, control, and optional supporting information without validation emphasis.
- **Required:** mark the label and preserve the contained control's required semantics when a value must be supplied.
- **Read-only:** keep the current value available for review and copying without implying that it can be changed.
- **Disabled:** retain necessary context while making the contained control unavailable.
- **Invalid:** expose the invalid relationship and pair it with a specific message that explains how to resolve the problem.
- **Valid:** use positive validation only when explicit confirmation benefits the workflow; do not add success feedback to every completed field.

## When not to use

- The content is not an interactive form field; use an appropriate text, status, or layout component.
- The contained component already owns its complete label, description, and validation presentation and nesting would duplicate those relationships.
- Several controls share one group label; use a fieldset or group pattern that names the complete set.
- The message applies to the whole form rather than one field; use form-level feedback such as Banner or an error summary.