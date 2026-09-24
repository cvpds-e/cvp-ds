---
assetId: tag-filter
classification: component
lifecycle: approved
specificationStatus: draft
---
# Tag Filter

## Purpose

Tag Filter presents grouped filter options as visible tags so users can select and remove multiple values without opening a menu.

## When to use

- Users may select multiple independent filters across a small set of categories.
- Keeping every option visible improves comparison and discovery.
- A selection limit helps prevent over-filtering.
- Showing the selected count helps users understand the active filter state.

Choose the grouping and supporting content according to the filter set:

- **Single section:** use for one compact set of related options.
- **Multiple sections:** use labelled sections for distinct facets that users may combine independently.
- **Responsive wrapping:** use for compact predefined option sets that should remain visible and wrap as space narrows.
- **Title tooltip:** add the shared Tooltip beside a section title only when the facet meaning needs brief clarification.

Choose selection constraints according to the domain:

- **Unlimited multiple selection:** use when any number of independent options may be combined.
- **Maximum selection:** set a limit only when the domain imposes a meaningful maximum; leave selected options available so users can remove them.
- **Selection count:** show the polite count announcement when users benefit from tracking the total selected or the remaining limit.

Account for these selection and availability states:

- **Unselected:** present the option as an available toggle button.
- **Selected:** expose the pressed state and show the decorative removal cue without adding a nested interactive control.
- **Option disabled:** keep one unavailable option visible when its absence would be confusing.
- **Filter disabled:** disable the complete filter when the entire criterion is temporarily unavailable.
- **Limit reached:** disable only unselected options until a selected option is removed.
- **Uncontrolled:** use default selections when Tag Filter owns the selection state.
- **Controlled:** provide the selected options and handle selection changes when product state owns filtering, including an intentionally empty selection.

## When not to use

- Only one value may be selected; use Select or Segmented Control.
- The option set is too long to display without crowding; use Multi Select or Filter.
- The labels communicate static categories rather than interactive filters; use Badge.
