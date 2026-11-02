---
assetId: multi-select
classification: component
lifecycle: approved
specificationStatus: reference
---
# Multi Select

## Purpose

Let people search and choose multiple values from one field with removable pills.

## When to use

- Multiple values may be selected from a set too long for visible checkboxes.
- Search or individually removable selected values materially improve the task.

Supply stable option values and readable labels. Use `value` with `onChange` for
controlled selection, or `defaultValue` for internal selection. Set
`allowCreate={false}` for a closed vocabulary; creation is otherwise available.
`maxSelection` caps selection while preserving removal of selected items.

Provide a label and associated description or error. The control exposes a
combobox and multiselect listbox, keyboard option navigation, named pill-removal
actions, disabled options, and clear/select-all actions. A `name` emits hidden
inputs for selected values.

## When not to use

- Exactly one value is allowed; use Select.
- A short option set can remain visible as checkboxes.
- Values perform navigation rather than form selection.

See [implementation](../../src/app/components/MultiSelect.tsx),
[showcase](../../src/app/components/MultiSelectDocumentation.tsx), and the
canonical entry in the [specification registry](../../src/agent/registry/component-specifications.json).
