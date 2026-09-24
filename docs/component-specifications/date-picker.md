---
assetId: date-picker
classification: component
lifecycle: approved
specificationStatus: draft
---
# Date Picker

## Purpose

Date Picker provides a calendar interface for selecting one date or a date range, with optional time selection and constraints for valid dates.

## When to use

- Users benefit from seeing dates in calendar context.
- A form or filter needs one date or a start and end date.
- Minimum and maximum dates should prevent invalid choices.
- Time selection is part of the same scheduling decision.

Choose the selection mode according to the value the task requires:

- **Single date:** use for one calendar date or one point in time.
- **Date range:** use when the start and end form one interval; the component selects the start first and safely reorders an earlier second choice.

Choose time selection according to the required precision:

- **Date only:** use when the calendar day is the complete value.
- **Date and time:** add time selection when scheduling precision is required; range mode provides separate start and end times.

Apply boundaries according to the valid scheduling window:

- **Minimum date:** disable dates before the earliest valid choice.
- **Maximum date:** disable dates after the latest valid choice.
- **Bounded range:** combine minimum and maximum dates when all selections must remain within a known interval.

Use the calendar's fixed density and states consistently:

- **Dense calendar:** preserve the component's 32px day targets; Date Picker does not provide alternate density variants.
- **Selected date:** use the selected treatment for a single date or the two range endpoints.
- **In range:** use the connected range treatment only for dates between selected endpoints.
- **Today:** retain the current-day marker without presenting it as selected.
- **Disabled:** preserve the calendar and selected value for context while preventing month, day, and time changes.

## When not to use

- Users know the date and can enter it faster in a required format; use a validated text or native date field.
- The task selects only a month, year, or recurring schedule; use a control designed for that granularity.
- A calendar adds unnecessary complexity to a simple preset choice; use Select or Segmented Control.
