---
assetId: tag-filter
classification: component
lifecycle: approved
specificationStatus: draft
---
# Tag Filter

## Purpose

Present grouped, visible filter options as selectable tags.

## When to use

- Users can scan a compact vocabulary of filter values.
- Multiple sections need independent option labels and shared selection state.

Provide stable option IDs and descriptive section titles. Use `selectedOptions`
and `onSelectionChange` for controlled selection, or `defaultSelectedOptions`.
`maxSelections` prevents further selection without blocking removal. Options
expose `aria-pressed` and honor both component and option disabled states.
`showSelectionCount` adds a live selection summary.

## When not to use

- A large vocabulary requires search; use Multi Select.
- Exactly one form value is required; use an appropriate single-select control.

See [implementation](../../src/app/components/TagFilter.tsx) and
[showcase](../../src/app/components/TagFilterDocumentation.tsx).
