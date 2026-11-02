---
assetId: text-input
classification: component
lifecycle: approved
specificationStatus: draft
---
# Text Input

## Purpose

Collect a single text value with a persistent label and associated guidance or
validation feedback.

## When to use

- A form needs a standard or compact single-line text field.
- An existing value needs the established read-only or disabled presentation.

Supply `label`, `helperText`, and `error` as appropriate. Errors activate the
invalid state and take precedence over helper text. Native input attributes,
including `required`, `readOnly`, and `disabled`, are supported. `labelTooltip`
adds supplementary clarification, not a replacement for the visible label.
Apply `inputClassName` to the input and `className` to the field wrapper.

## When not to use

- Multiple lines are required; use Textarea.
- Selection from known values is preferable; use Select or Multi Select.
- Copy, character count, or richer validation states are needed; see Misc Input.

See [implementation](../../src/app/components/TextInput.tsx) and
[showcase](../../src/app/components/TextInputDocumentation.tsx).
