---
assetId: filter
classification: component
lifecycle: approved
specificationStatus: draft
---
# Filter

## Purpose

Filter lets users add, edit, and remove structured filters using field-appropriate controls while keeping active filters visible in the current context.

## When to use

- A collection can be narrowed by several fields or value types.
- Users need to add filters progressively rather than complete a large form.
- Active filters should remain visible and individually removable.
- The trigger must adapt between a prominent bar and a compact icon treatment.

Choose the trigger according to the prominence of filtering and active clauses:

- **Bar:** use when filtering is a primary workflow and active clauses must remain visible beside the add-filter trigger.
- **Icon:** use in a compact toolbar where the active count is sufficient and clauses are reviewed after opening the control.
- **Seamless icon:** use in a dense composition that still needs active clauses visible beside a separate icon trigger.

Choose the value path according to the field data:

- **Text:** accept one or more free-text values and apply them as one clause.
- **Select:** present a governed list when exactly one value is needed.
- **Multi-select:** present a governed list when several values may form one clause.
- **Boolean:** add the enabled clause immediately without opening a value editor.
- **Date:** offer lightweight relative-date presets; use Calender or RangeCalender for a custom date or timeframe.

Use each trigger's implemented density consistently:

- **Filter bar:** preserve the 40px minimum field height and allow the bar to wrap as clauses accumulate.
- **Icon treatments:** use the composed medium Icon Button rather than creating a smaller custom filter trigger.

Account for these filter states:

- **Empty:** show the add-filter prompt without an active count or clauses.
- **Populated:** keep each active field and human-readable value visible, editable, and individually removable.
- **Multiple clauses:** allow clauses to wrap without hiding active constraints.
- **Open:** expose searchable field choices first, then the editor appropriate to the selected value path.
- **Disabled:** keep active clauses visible while preventing add, edit, and remove actions.

## When not to use

- One free-text query is sufficient; use Search Field.
- A small set of visible tags provides all necessary choices; use TagsSelect.
- Filtering requires advanced AND or OR expressions; use a dedicated query-building workflow.
