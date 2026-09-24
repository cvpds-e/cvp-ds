---
assetId: segmented-control
classification: component
lifecycle: approved
specificationStatus: draft
---
# Segmented Control

## Purpose

Segmented Control presents a compact set of mutually exclusive choices for changing a view, scope, or presentation mode.

## When to use

- Two to five immediate choices are mutually exclusive.
- Users switch between display modes such as list and grid.
- A short scope selector such as daily, weekly, or monthly should remain visible.
- Choices benefit from persistent labels and optional icons.

Choose the tone according to the prominence of the selected option:

- **Default:** use the neutral treatment for routine view, scope, and presentation choices.
- **Color:** use color emphasis when the selected mode needs greater prominence.

Choose the size and layout according to context:

- **Small:** use in dense toolbars and constrained control groups.
- **Medium:** use by default for most page and panel controls.
- **Large:** use where the control needs greater visual presence or touch comfort.
- **Intrinsic width:** let each option size to its label for compact inline placement.
- **Full width:** distribute options across the available width when the control should align with its container. Preserve one row and allow horizontal overflow rather than wrapping.

Choose the option content according to how quickly choices need to be recognized:

- **Label only:** use for short, familiar text choices.
- **Icon and label:** add an icon when it improves recognition; retain the visible label rather than relying on the icon alone.

Account for these segmented control states:

- **Selected:** keep exactly one available option selected within the group.
- **Unselected:** keep peer options available for immediate switching.
- **Option disabled:** disable an individual unavailable choice while leaving other options operable.
- **Control disabled:** disable the complete group when no choice can currently be changed.

## When not to use

- Each choice controls a labelled peer content panel; use Tabs.
- More than five options are needed; use Select.
- The choice is infrequent or requires supporting descriptions; use a form selection control.
