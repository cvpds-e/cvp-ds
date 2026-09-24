---
assetId: multi-select
classification: component
lifecycle: approved
specificationStatus: reference
---
# Multi Select

## Purpose

Multi Select lets people search and choose multiple values from one field. Selected values appear as removable pills, while a portaled listbox provides filtering, bulk selection, optional creation, disabled options, and selection limits.

## When to use

- People may select multiple values from a set that is too long to show as visible checkboxes.
- Search materially reduces the effort of finding options.
- Selected values need to remain visible and individually removable.
- Arbitrary user-created values are valid domain data, when creation is deliberately enabled.

Choose the option model according to the domain:

- **Fixed options:** disable creation when selections must come from a controlled taxonomy or known dataset.
- **Creatable options:** enable creation only when arbitrary user-entered values are valid domain data; handle newly created options when they must persist beyond the field.

Choose selection constraints according to the task:

- **Unlimited selection:** use when every available option may be selected without harming the result.
- **Maximum selection:** set a limit when the domain accepts only a bounded number of values; communicate the maximum and prevent additional choices once reached.
- **Disabled option:** retain an unavailable option in the list when users need to understand that it exists but cannot currently be selected.

Use the built-in list behavior according to the option set:

- **Filtering:** let entered text narrow a long option set; show the empty result when no options match.
- **Bulk selection:** use Select all and Clear all when applying the action to the filtered option set is safe and understandable.
- **Selected pills:** keep chosen values visible, individually removable, and able to wrap as the selection grows.

Account for these field states:

- **Open:** display the portaled listbox above or below the field according to available viewport space.
- **At limit:** prevent creation and unselected options from being chosen while allowing selected values to be removed.
- **Error:** associate a specific validation message with the field when the current selection is invalid.
- **Required:** require at least one selected value before form submission.
- **Disabled:** prevent opening, filtering, clearing, and removing values when the field is unavailable.

## When not to use

- Users may select only one value; use Select or Segmented Control.
- A short set of options can remain visible without crowding; use Checkbox controls.
- The task requires structured conditions rather than choosing values; use Filter.
