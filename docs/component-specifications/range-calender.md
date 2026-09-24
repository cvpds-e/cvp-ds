---
assetId: range-calender
classification: component
lifecycle: approved
specificationStatus: draft
---
# RangeCalender

## Purpose

RangeCalender presents a calendar workflow for choosing the start and end dates of one interval.

## When to use

- A booking, report, campaign, or filter requires a bounded date interval.
- Users benefit from comparing the start and end within calendar context.
- Minimum or maximum boundaries constrain the complete range.

Account for these RangeCalender states:

- **Start selected:** identify the first endpoint while waiting for the end date.
- **Complete range:** distinguish both endpoints and connect the dates between them.
- **Reordered range:** safely reorder an earlier second choice so the interval remains chronological.
- **Disabled:** show dates outside the valid boundary while preventing selection.

## When not to use

- Users choose only one date; use Calender.
- Start and end times are also required; use DateTime Range Field.
- The task uses fixed relative periods such as “last seven days”; use predefined filter options.