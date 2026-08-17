# Tag Filter Standardization

Tag Filter now follows the CVP navigation-family component contract.

## Structural correction

Each tag is a single native toggle button. Selected tags display a decorative X as a removal cue; the implementation no longer nests a remove button inside another interactive element.

## Supported behavior

- Controlled selection, including an intentionally empty controlled array
- Uncontrolled selection with defaults
- Multiple labelled facet groups
- Per-option and whole-component disabling
- Optional maximum-selection constraint
- Optional polite selection-count announcement
- Responsive wrapping for compact predefined option sets

All visual values resolve through the CVP primitive → semantic → component token architecture, including focus, selected, disabled, motion, and reduced-motion behavior.

## Form-label alignment

Facet labels use the same typography contract as Select, Text Input, and Multi Select:

- `--cvp-tag-filter-title-size: var(--cvp-input-label-size)`
- `--cvp-tag-filter-title-weight: var(--cvp-input-label-weight)`
- `--cvp-tag-filter-title-line-height: var(--cvp-line-height-snug)`
