---
assetId: pills
classification: component
lifecycle: approved
specificationStatus: draft
---
# Pills

## Purpose

Pills is the compact selected-value primitive used by Multi Select and other composed controls that need a consistent representation of chosen items.

## When to use

- A composed control displays one or more selected values.
- A selected value may be removed independently.
- Selected-value styling must remain consistent across controls.

Choose the pill behavior according to whether users can change the selection:

- **Read-only:** omit removal behavior when the selected value is informational or must be changed elsewhere.
- **Removable:** provide removal behavior when users can remove the selected value independently. Supply a specific accessible removal label that identifies the value.

Account for these pill states:

- **Default:** show the selected-value label without implying an action on the pill itself.
- **Removal available:** show the remove control only when removal behavior is provided, and keep the label visible for context.

## When not to use

- The element represents a category or metadata label; use Badge.
- The element communicates lifecycle or health; use Status.
- The pills themselves are intended to act as filtering controls.
