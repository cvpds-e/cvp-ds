---
assetId: option-list
classification: component
lifecycle: approved
specificationStatus: draft
---
# OptionList

## Purpose

OptionList presents the available choices for a Select or PillsInput in a focused popup. It communicates which options are available, active, selected, or disabled while supporting efficient keyboard and pointer selection.

## When to use

- A Select or PillsInput needs a dropdown for choosing from predefined options.
- The option set is too long to remain visible beside the field.
- Search or filtering helps users find an option efficiently.
- Selected and unavailable options must remain visible in the same list context.

Choose the selection mode according to the parent control:

- **Single:** use with Select when choosing an option replaces the previous value and closes the list.
- **Multiple:** use with PillsInput when users may choose several values and the list remains available for additional selections.

Choose the option organization according to the data:

- **Default:** use one flat list when every option belongs to the same set.
- **Grouped:** use labelled groups when categories such as content type, region, or status materially improve scanning.
- **Custom:** add concise supporting content or an icon only when it helps distinguish otherwise similar options.
- **Custom grid:** use a grid only for compact, visually comparable options that remain understandable with two-dimensional keyboard navigation.

Use supporting actions according to the selection task:

- **Select all:** provide only for multiple selection when applying the action to every currently filtered, enabled option is safe and understandable.
- **Clear all:** provide when users need to reset several selections efficiently.
- **Create option:** provide only when arbitrary user-entered values are valid domain data.

Account for these OptionList states:

- **Open:** place the popup above or below its trigger according to available viewport space and keep its width visually connected to the field.
- **Active:** distinguish the option currently reached by pointer or keyboard without presenting it as selected.
- **Selected:** expose the selected state and use a persistent check indicator for multiple selection.
- **Disabled:** keep an unavailable option visible when its presence provides context, but remove it from selection and keyboard activation.
- **Selection limit reached:** prevent additional unselected options while keeping selected options available for removal.
- **Filtered:** show only options that match the current query while preserving selection state.
- **Empty:** communicate that no options match instead of presenting a blank popup.

## When not to use

- The choices should remain visible as part of the page; use Checkbox, Segmented Control, Choice Card Group, or TagsSelect.
- The content represents commands or navigation rather than value selection; use ButtonMenu or an appropriate navigation pattern.
- The dropdown needs to collect its own label, validation, or selected pills; use Select or PillsInput as the complete field.
- The content is arbitrary interactive UI rather than a list of choices; use Popover.