---
assetId: date-picker
classification: component
lifecycle: approved
specificationStatus: draft
---
# Date Picker

## Purpose

Select one date or a date range from a month calendar, optionally including times.

## When to use

- Users benefit from seeing dates in calendar context.
- A range needs visible start and end selections.

Choose `mode="single"` or `mode="range"`. Use `value` with `onChange` for controlled
state, or `defaultValue` for internal state. `minDate` and `maxDate` restrict
available days; `disabled` prevents selection. `showTime` adds time selectors.
Provide a meaningful calendar `label`; days expose full date labels and selected
states, and month navigation uses named buttons.

## When not to use

- The value is not a calendar date.
- A compact field is needed instead of a visible calendar; use Date Time Field
  or Date Time Range Field as appropriate.

See [implementation](../../src/app/components/DatePicker.tsx) and
[showcase](../../src/app/components/DatePickerDocumentation.tsx).
