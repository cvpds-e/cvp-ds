---
assetId: tags-select
classification: component
lifecycle: approved
specificationStatus: draft
---
# TagsSelect

## Purpose

TagsSelect presents grouped options as visible tags so users can select and remove multiple values without opening a menu.

## When to use

- Users may select multiple independent values across a small set of categories.
- Keeping every option visible improves comparison and discovery.
- A selection limit helps prevent an invalid or overly narrow result.
- Showing the selected count helps users understand the current selection state.

Choose the grouping according to the option set:

- **Single section:** use for one compact set of related options.
- **Multiple sections:** use labelled sections for distinct facets users may combine independently.
- **Responsive wrapping:** use for concise options that should remain visible as space narrows.

Choose selection constraints according to the domain:

- **Unlimited multiple selection:** use when any number of independent options may be combined.
- **Maximum selection:** set a limit only when the domain imposes a meaningful maximum.
- **Selection count:** show the count when users benefit from tracking selected or remaining options.

Account for these TagsSelect states:

- **Unselected:** present the tag as an available option.
- **Selected:** expose the selected state and provide a clear removal cue.
- **Option disabled:** keep one unavailable option visible when its absence would be confusing.
- **Control disabled:** disable the complete selection set when the criterion is unavailable.
- **Limit reached:** disable only unselected options until a selected option is removed.

## When not to use

- Only one value may be selected; use Select or Segmented Control.
- The option set is too long to remain visible; use PillsInput or Filter.
- The labels communicate static categories rather than interactive choices; use Badge.