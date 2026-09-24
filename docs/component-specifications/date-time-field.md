---
assetId: date-time-field
classification: component
lifecycle: approved
specificationStatus: draft
---
# DateTime Field

## Purpose

DateTime Field lets users choose one calendar date and its associated time as a single scheduling value.

## When to use

- One event, deadline, or schedule point requires both a date and a time.
- Calendar context reduces date-entry errors.
- Minimum or maximum dates constrain the valid scheduling window.

Choose the value parts according to the required precision:

- **Date:** select the calendar day before refining its time.
- **Time:** collect the supported hour and minute interval only when scheduling precision is required.

Account for these DateTime Field states:

- **Incomplete:** communicate which required part of the value remains unset.
- **Complete:** present the selected date and time as one value.
- **Disabled:** preserve the value for context while preventing date and time changes.

## When not to use

- The value requires a date without time; use Calender.
- The task requires a start and end; use DateTime Range Field.
- Users choose from a small set of predefined appointment times; use Select.