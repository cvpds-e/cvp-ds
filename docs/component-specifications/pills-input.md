---
assetId: pills-input
classification: component
lifecycle: approved
specificationStatus: draft
---
# PillsInput

## Purpose

PillsInput lets users search and choose multiple values from one field while keeping selected values visible as removable pills.

## When to use

- Users may select multiple values from a list that is too long to show as visible checkboxes.
- Search materially reduces the effort of finding options.
- Selected values need to remain visible and individually removable.
- User-created values are valid domain data when creation is deliberately enabled.

Choose the option model according to the domain:

- **Fixed options:** use when selections must come from a controlled taxonomy or known dataset.
- **Creatable options:** use only when arbitrary user-entered values are valid and can be persisted appropriately.

Choose selection constraints according to the task:

- **Unlimited selection:** use when every available option may be selected without harming the result.
- **Maximum selection:** set a limit when the domain accepts only a bounded number of values.
- **Disabled option:** retain an unavailable option when users need to understand that it exists but cannot be selected.

Account for these PillsInput states:

- **Open:** display the option list above or below the field according to available viewport space.
- **Filtering:** narrow the option list as users type and communicate when no options match.
- **At limit:** prevent additional selections while allowing selected pills to be removed.
- **Error:** associate a specific validation message with the field.
- **Required:** require at least one selected value before form submission.
- **Disabled:** prevent opening, filtering, clearing, and removing values.

## When not to use

- Users may select only one value; use Select or Segmented Control.
- A short set of options can remain visible without crowding; use Checkbox controls.
- The options should remain visible as filter tags; use TagsSelect.
- The task requires structured conditions rather than choosing values; use Filter.