# CVP Tree — Developer Handoff

## Intent

The CVP Tree is a compact hierarchical navigation surface for collections, folders, and nested resources. Its primary product reference is the Rail Collections side panel.

## Component contract

- Provide stable, unique `id` values for every node.
- Use `children` for hierarchy and `initialExpanded` for the initial disclosure state.
- Treat `selectedId` as controlled product state and update it through `onSelect`.
- Use `density="compact"` in operator side panels; reserve `comfortable` for lower-volume review contexts.
- `status`, `tag`, and `count` are supplementary metadata. The node label must remain meaningful without them.
- Use `disabled` only when the node is visible but unavailable. Remove irrelevant nodes instead of disabling large branches.

## Interaction rules

- The disclosure button changes expansion without changing selection.
- The node button changes selection. Double-clicking a branch node also toggles it.
- Do not make the entire panel a drag surface. If reordering is required later, introduce a dedicated handle and explicit reorder callback.
- Truncated labels expose the complete label through the native title attribute.

## Accessibility and DOM

- The current interaction is represented as native nested lists with separate node and disclosure buttons. It does not claim the composite ARIA tree pattern without implementing its complete roving-focus and arrow-key contract.
- Selected destinations use `aria-current="page"` on the node control.
- Disclosure controls expose `aria-expanded` and explicit Expand/Collapse accessible names.
- If full WAI-ARIA tree keyboard behavior is added later, migrate roles, focus management, and Arrow Up/Down/Left/Right handling together.
- Focus styling uses the shared CVP focus-ring token.
- Status is available as an accessible label and is never communicated through color alone.

## Token architecture

`Tree.css` consumes `--cvp-tree-*` Tier 3 tokens only. These resolve through the CVP semantic layer for light and dark themes. Product code must not introduce local light/dark hex values.

The documentation Token Contract records each Tier 3 token, its canonical semantic or foundation source, resolved value/behavior, and activation condition.

## Visual acceptance

- Parent and child rows align to the shared indentation step.
- Chevron, icon, label, count, and trailing tag remain vertically centered.
- Selection remains visible through its quiet surface without an edge border.
- Long labels truncate before counts or tags collide.
- Hover and selected surfaces remain subtle in both themes.
