---
assetId: calender
classification: component
lifecycle: approved
specificationStatus: draft
---
# Calender

## Purpose

Calender presents a month view for choosing one calendar date while showing surrounding days, the current day, and unavailable dates in context.

## When to use

- Users benefit from seeing one date in its calendar context.
- Minimum or maximum boundaries must prevent invalid choices.
- Month navigation helps users locate a nearby date.

Account for these Calender states:

- **Today:** identify the current day without presenting it as selected.
- **Selected:** distinguish the chosen date from the rest of the month.
- **Outside month:** keep adjacent-month dates visually subordinate.
- **Disabled:** show dates outside the valid boundary while preventing selection.

## When not to use

- Users need to select a start and end date; use RangeCalender.
- Time is part of the value; use DateTime Field.
- Users know the date and can enter it faster in a required format; use a validated native date field.