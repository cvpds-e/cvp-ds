---
assetId: unsaved-changes-footer
classification: pattern
lifecycle: approved
specificationStatus: draft
---
# Unsaved Changes Footer

## Purpose

Keep draft status and save/cancel actions visible at the bottom of an editable
workspace settings panel.

## When to use

- A workspace has pending changes that can be saved or discarded.
- Long configuration forms scroll independently of their action area.

The parent controls visibility and supplies `onSave`, `onCancel`, and
`saveDisabled`. The footer announces Unsaved changes and stacks Primary Button
Save changes above Outline Button Cancel. `additionalActions` appends related
actions after Cancel without changing existing consumers.

Station Content Query uses that slot for a blue link-style Clear Query action
only when filters or sorting differ from their defaults. Clearing updates the
draft; it does not save automatically.

## When not to use

- No unsaved changes exist; do not show an inaccurate draft status.
- A destructive rail-deletion action needs confirmation; keep it separate.

See [implementation](../../src/app/components/UnsavedChangesFooter.tsx) and
[Station interactions](./station-rail-details.md).
