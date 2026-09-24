---
assetId: date-time-range-field
classification: component
lifecycle: approved
specificationStatus: draft
---
# DateTime Range Field

## Purpose

DateTime Range Field lets users choose the start and end dates and times of one scheduled interval.

## When to use

- A schedule, availability window, or report interval requires precise start and end values.
- Users benefit from selecting dates in calendar context and refining each endpoint with a time.
- Minimum or maximum dates constrain the complete interval.

Choose each endpoint according to the workflow:

- **Start date and time:** establish when the interval begins.
- **End date and time:** establish when the interval finishes and keep it chronologically valid.

Account for these DateTime Range Field states:

- **Start selected:** preserve the first endpoint while the user completes the range.
- **Complete range:** present both date-time endpoints as one interval.
- **Invalid range:** explain when an end value conflicts with the start or allowed boundary.
- **Disabled:** preserve the complete interval for context while preventing changes.

## When not to use

- Users choose only a date range without times; use RangeCalender.
- Users choose one date and time; use DateTime Field.
- The workflow requires recurring or exception-based scheduling; use a dedicated scheduling pattern.