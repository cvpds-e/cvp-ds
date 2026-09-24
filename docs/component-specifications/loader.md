---
assetId: loader
classification: component
lifecycle: approved
specificationStatus: draft
---
# Loader

## Purpose

Loader communicates indeterminate progress for a local action or compact pending region, with an accessible status label and reduced-motion fallback.

## When to use

- A compact control is waiting for an operation with unknown duration.
- A small region is pending and its final layout is not the primary information.
- A loading button needs an inherited-color progress indicator.

Choose the type according to whether progress can be measured:

- **Indeterminate:** use when the operation is active but its completion percentage is unknown. Loader does not provide a determinate progress type.

Choose the size according to the pending region:

- **Small:** use inside compact controls or tightly constrained pending regions.
- **Medium:** use as the general default for local loading feedback.
- **Large:** use in a roomier local region where the indicator needs greater prominence.

Choose the tone according to the surrounding surface:

- **Default:** use when Loader supplies its own standard foreground color.
- **Inherit:** use inside a control or context where the indicator must use the parent's current text color.

Choose the semantic mode according to where the loading status is communicated:

- **Status:** provide a concise label when Loader is responsible for announcing the pending state.
- **Decorative:** hide Loader from assistive technology when a parent control already exposes its busy state and loading label.

Account for motion preferences:

- **Standard motion:** use the indeterminate rotation when reduced motion is not requested.
- **Reduced motion:** retain a visible progress indicator without relying on continuous rotation.

## When not to use

- The final content layout is known; use Skeleton.
- A long-running operation needs meaningful progress or status detail.
- The Loader would be the only feedback for an extended wait.
