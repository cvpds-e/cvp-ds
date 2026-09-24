---
assetId: sort-control
classification: component
lifecycle: approved
specificationStatus: draft
---
# Sort Control

## Purpose

Sort Control combines a sort-field selector and an ascending or descending direction control so users can change how a collection is ordered.

## When to use

- A list, table, or result set supports user-controlled sorting.
- Users need to change both the sorting field and direction.
- One compact inline control is clearer than separate controls in different locations.
- The available sort fields form a concise, understandable set.

Use the inline layout as one coordinated sorting decision:

- **Sort field:** provide a concise set of fields whose labels match the attributes visible in the collection.
- **Direction control:** place the direction beside the field selector so both parts of the active ordering remain visible.

Choose the direction according to the intended ordering:

- **Ascending:** order values from lower to higher, earlier to later, or A to Z.
- **Descending:** order values from higher to lower, later to earlier, or Z to A.

Account for these sort states:

- **Selected field:** preserve the current field when users switch direction.
- **Selected direction:** display the active direction and expose the direction button as pressed for descending order.
- **Unavailable field:** disable an option when that field cannot sort the current collection while leaving supported fields available.

## When not to use

- Only one fixed ordering is available; present the ordering as information rather than a control.
- Sorting is performed directly from table column headers; use the table's sorting behavior.
- Many advanced ordering rules must be combined; use a dedicated sorting workflow.
