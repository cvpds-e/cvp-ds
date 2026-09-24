---
assetId: tree
classification: component
lifecycle: approved
specificationStatus: draft
---
# Tree

## Purpose

Tree presents hierarchical collections, folders, and nested resources as compact expandable navigation.

## When to use

- Users browse and select within a genuine nested structure.
- Parent nodes need independent expansion without changing selection.
- Nodes benefit from supplementary count, status, tag, or action metadata.
- A compact side panel needs to preserve a clear hierarchy.

Choose the density according to the browsing context:

- **Compact:** use by default in operational side panels and other space-constrained navigation.
- **Comfortable:** use for lower-volume review where additional row height improves scanning.

Choose the node type according to its role in the hierarchy:

- **Category:** use for a top-level branch that groups child nodes.
- **Subcategory:** use for an intermediate branch within a deeper hierarchy.
- **Item:** use for a leaf destination with no children.

Choose supplementary metadata only when it improves scanning:

- **Count:** show a numeric total when it helps users compare branches or destinations.
- **Active, inactive, or warning status:** use for leaf state that must remain understandable from its accessible label, not color alone.
- **Recommended or editorial tag:** use the corresponding semantic tag for those known classifications; other tag values receive the neutral treatment.
- **Actions:** add trailing node actions only when they remain separate from selection and disclosure.

Account for these navigation states:

- **Collapsed:** hide a branch's children while keeping its disclosure action available.
- **Expanded:** reveal nested children and expose the disclosure state; use initial expansion only for branches that should be open on first render.
- **Selected:** identify the controlled destination as the current page without coupling selection to expansion.
- **Disabled:** keep a temporarily unavailable node visible when its absence would be confusing; remove irrelevant nodes instead of disabling large branches.
- **Empty:** show the built-in empty state when there are no nodes.
- **Long label:** truncate before count, tag, or actions collide, while preserving the complete label as native title text.

## When not to use

- The collection is flat; use Select, a list, or a grid.
- The workflow requires drag-and-drop reordering without dedicated handles.
- The hierarchy is artificial or adds unnecessary navigation depth.
