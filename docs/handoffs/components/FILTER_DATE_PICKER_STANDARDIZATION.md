# Filter and Date Picker Standardization — Engineering Handoff

**Status:** Ready for implementation  
**Updated:** 2026-08-05

## Component boundary

Filter composes visible query clauses. It finds a field, collects a lightweight value, and displays the resulting constraint. Date Picker owns calendar navigation and absolute single/range date selection. Filter may launch Date Picker in a product flow, but must not reproduce its calendar internals.

## Filter contract

- Controlled through `activeFilters` and `onChange`.
- Re-adding the same field replaces its existing clause rather than creating an invisible duplicate.
- Supports text, enumerated, boolean, multi-value-domain, and relative-date paths.
- Text and multi-value editors stage removable values before one explicit Add Filter action; the final action includes the pending count and remains disabled until a value exists.
- Active clauses remain visible and individually removable.
- Trigger, search, editor, submenu and removal controls are native interactive elements with specific names.
- The popup search icon is contained within the shared input shell; icon, placeholder, focus ring, spacing, option rows, radius and elevation follow the canonical input/menu foundations.
- `triggerVariant="icon"` composes the standardized CVP Icon Button for compact toolbars and exposes an active-filter count badge without duplicating icon-button styling.
- Disabled state suppresses trigger and clause removal.
- Uses only registered `--cvp-filter-*` tokens, composed from the canonical input and menu contracts.
- Search and editor input use `--cvp-filter-font-size`. Every interactive menu row—field options, editor heading, entered-value action, pending values, and apply action—uses the compact `--cvp-filter-action-font-size` / `--cvp-filter-action-line-height` pair, consistent with other 32px actions. Do not introduce a larger type scale inside the add-value flow.

## Date Picker contract

- Supports `single` and `range` modes, controlled or uncontrolled values, optional time fields, disabled state, and minimum/maximum dates.
- Optional time selection uses a CVP-themed dialog with separate 24-hour and quarter-hour choices, consistent hover/focus/selected states, Escape dismissal, and an explicit Done action.
- Range selection chooses a start and then an end; choosing an earlier end reorders the interval safely.
- Every day is a native button with a full-date accessible name and `aria-pressed` selection state.
- Month navigation uses named native buttons and a live month heading.
- Unavailable dates use native `disabled`, not color alone.
- Uses registered `--cvp-date-picker-*` calendar tokens and canonical input tokens for time fields.

## Visual behavior

- Default container borders remain subtle in light and dark themes.
- Focus and validation indicators carry the stronger state contrast.
- Selected endpoints use brand/on-brand roles; intermediate range days use the semantic active-menu pair.
- Today has a border marker and remains distinguishable from selection.
- Reduced-motion users receive no decorative transitions.

## Acceptance criteria

- Filter search, field selection, value selection/application, replacement, removal, dismissal, empty and disabled states work.
- Date Picker month navigation, single selection, ordered range selection, time editing and date bounds work.
- Both components have complete visible labels/names and valid DOM relationships.
- Text, icons, selected states, focus indicators and validation states meet applicable WCAG contrast requirements in both themes.
- No embedded `--filter-*` or date-picker literals remain in component implementations.

Review surfaces: `/?page=filter` and `/?page=date-picker`.
