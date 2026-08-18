# CVP Table — Developer Handoff

## Intent

The CVP Table is a dense operational data surface. It is designed for management views such as Rails List, where users scan many records, compare metadata, select rows, sort columns, expand details, and invoke row actions.

## Component contract

- Render the supplied `Table` component rather than recreating the visual treatment locally.
- Provide `ariaLabel` or a visible `caption` that names the dataset.
- Sorting is opt-in through `sortable`; mark individual columns `sortable: false` when the data cannot be sorted.
- Wire `onSort`, `onSelectionChange`, `onPageChange`, `onRowAction`, and `onRowReorder` whenever their corresponding controls are exposed.
- Use `kind: 'group'`, `groupLabel`, and `groupCount` for collapsible section rows.
- Use `density="compact"` for high-volume operator screens and `density="comfortable"` for review-oriented workflows.
- Keep `loading` and `emptyMessage` meaningful. Avoid replacing table rows with ambiguous blank space.
- For a Rails List `type` column, render the supplied `.cvp-table__rail-type-tag` treatment: `--recommended` uses the link semantic and `--editorial` uses the brand-accent semantic. Keep the visible label; colour reinforces the type and must not be the only cue.

## Token architecture

`Table.css` consumes only `--cvp-table-*` Tier 3 component tokens. Those tokens resolve to Tier 2 semantic tokens in `cvp-component-tokens.css`; theme values are never hard-coded in the component.

The documentation Token Contract records each Tier 3 token, its canonical semantic or foundation source, resolved value/behavior, and activation condition.

Customer theming should override Tier 3 component tokens or approved brand semantics. Do not reference primitives directly from table CSS.

## Accessibility and DOM

- Native `table`, `thead`, `tbody`, `th`, `td`, and `caption` elements preserve the relationships required by DOM-based accessibility checks.
- Sortable headers expose `aria-sort`; selection uses native checkboxes with row-specific accessible names.
- Group and detail toggles expose `aria-expanded`.
- The scroll region is keyboard-focusable and uses the shared CVP focus ring.
- Icon-only actions always require an accessible name.
- Color is never the sole selected-state indicator; the checkbox state remains programmatically available.

## Visual acceptance

- Borders remain subtle in light and dark themes; the table container currently uses no corner radius.
- Headers remain visible while vertically scrolling.
- Cell values stay on one line by default; the scroll container handles narrow viewports.
- Hover affects the row surface, not every cell boundary.
- Destructive actions use the danger semantic and must not dominate until hovered or focused.
- Compact rows and interactive controls must remain visually centered at every supported density. Selection uses the shared CVP Checkbox component and its theme-aware token contract.
- Rail type tags share the table's compact metadata geometry (subtle surface, border, mono 12px label and 4px horizontal inset). Recommended is blue and Editorial is purple in both themes through semantic aliases.

## Product integration

The component intentionally does not own filtering, query chips, column configuration dialogs, or server-side data operations. Compose those above the table and pass resulting data/state through the public callbacks.
