---
assetId: select
classification: component
lifecycle: approved
specificationStatus: draft
---
# Select

## Purpose

Select is a single-selection combobox for choosing one value from a predefined list in a viewport-aware popup.

## When to use

- Exactly one option may be selected from a list that should not remain fully visible.
- Keyboard navigation and type-ahead improve finding an option.
- The field needs optional or required guidance and validation feedback.
- A compact trigger is needed in a constrained form layout.

Select provides two trigger variants:

- **Default:** use for labelled form fields and settings where the current value should read like other inputs.
- **Button:** use for compact actions or status-oriented selectors that benefit from a leading icon and button-like treatment.

Choose the size according to the surrounding layout:

- **Default:** use in standard forms and settings surfaces.
- **Compact:** use in dense toolbars, tables, and constrained layouts where a full-height field would add unnecessary space.

Account for these select states:

- **Placeholder:** describe the choice users need to make before a value is selected.
- **Open:** keep the popup within the available viewport and preserve the trigger width so options remain connected to the field.
- **Selected:** show the current value in the trigger and distinguish it in the option list.
- **Invalid:** pair the error treatment with a specific message that explains how to resolve the problem.
- **Disabled:** preserve the selected value while making the control unavailable. Disabled options may remain visible in the list but cannot receive selection.
- **Empty:** communicate that no options are currently available rather than presenting a blank popup.

## When not to use

- Users may choose multiple values; use PillsInput.
- A short option set should remain visible; use Segmented Control or Choice Card Group.
- Users enter arbitrary free-form text; use Input.
- Native platform presentation is sufficient and custom popup behavior is unnecessary; use a native select control.
