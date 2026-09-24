---
assetId: tooltip
classification: component
lifecycle: approved
specificationStatus: draft
---
# Tooltip

## Purpose

Tooltip provides a concise, non-interactive description for a control or unfamiliar term on hover and keyboard focus.

## When to use

- An icon-only control benefits from supplemental explanation.
- An unfamiliar term, abbreviation, or feature name needs brief clarification.
- The same information can appear on hover and keyboard focus.
- Placement and delay need to adapt to the surrounding layout.

Choose the side according to available space around the trigger:

- **Top:** use by default when the tooltip can appear above without obscuring nearby content.
- **Right:** use when vertical space is constrained and room is available after the trigger.
- **Bottom:** use when content above the trigger must remain visible.
- **Left:** use when vertical space is constrained and room is available before the trigger.

Choose alignment according to the trigger and nearby boundary:

- **Start:** align the tooltip with the start edge when centering would collide with a boundary.
- **Center:** use by default for balanced placement over compact triggers.
- **End:** align the tooltip with the end edge when centering would collide with a boundary.

Account for these disclosure states:

- **Closed:** keep supplemental content out of view while preserving the trigger's own accessible name.
- **Delayed hover:** open after the default 300ms delay so incidental pointer movement does not produce distracting overlays.
- **Keyboard focus:** expose the same content when the trigger receives focus; never make hover the only path.
- **Open:** keep content concise, non-interactive, readable, and positioned without obscuring the trigger.
- **Reduced motion:** suppress entry and exit animation without changing access to the content.

## When not to use

- The content includes links, buttons, or other interaction; use a richer overlay.
- The message is an error or required instruction; show persistent inline text.
- Users need to retain, select, or copy the content.
- The tooltip would be the only documentation for a feature.
