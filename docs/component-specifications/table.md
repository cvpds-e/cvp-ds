---
assetId: table
classification: component
lifecycle: approved
specificationStatus: draft
---
# Table

## Purpose

Table is a dense operational data surface for scanning, comparing, selecting, and managing records in structured columns.

## When to use

- Users compare multiple records across consistent attributes.
- Row selection enables batch actions.
- Columns require sorting or leading-column freezing.
- Rows may expose expandable supporting detail.
- A management view needs built-in loading and pagination states.

Choose the density according to the review task:

- **Compact:** use for high-volume operational work where scanning many records is the priority.
- **Comfortable:** use for lower-volume review where additional row spacing improves readability.

Choose the column layout according to the data:

- **Start aligned:** use by default for text and mixed content.
- **Center aligned:** use for short, comparable values that benefit from a centered column.
- **End aligned:** use for numeric values and other content compared by its trailing edge.
- **Sized columns:** set width or minimum width when stable column geometry improves scanning.
- **Resizable columns:** enable resizing when users need to adjust supported columns for variable content.
- **Frozen leading columns:** keep selection, expansion, and the first data column visible when a wide table scrolls horizontally.
- **Fixed-height region:** set the table height to contain long collections in a predictable scrollable area.

Enable only the interaction variants required by the workflow:

- **Selection:** enable row and select-all controls for batch actions; keep disabled rows out of selection.
- **Expansion:** enable supporting detail when it belongs directly to a row. Allow multiple rows by default or single expansion when comparison is unnecessary.
- **Sorting:** enable sortable headers globally and opt individual columns out when their values cannot be meaningfully ordered.
- **Reordering:** enable row dragging when sequence is user-managed and provide reorder behavior.
- **Group rows:** use collapsible group rows to organize adjacent records under a labelled category and optional item count.
- **Row actions:** show per-row actions when records support contextual operations; hide the actions column when it is not needed.
- **Toolbar:** show table settings, selection summaries, refresh, view controls, custom actions, and page-size choices only when the workflow supports them.
- **Pagination:** show page navigation for divided collections and provide total count, page size, and page-change behavior from the owning view.
- **Custom cells:** render specialized cell content when plain values cannot communicate the required information or action.

Account for these table states:

- **Populated:** render data rows and any enabled controls within the configured column layout.
- **Loading:** replace data rows with column-aligned Skeleton rows and expose the table as busy.
- **Empty:** show the configured empty message across the full table when loading has completed without rows.
- **Selected:** distinguish selected rows and report the selection count with a clear-selection action.
- **Expanded:** place supporting content in a full-width row directly after its parent record.
- **Sorted:** identify the active column and expose its ascending or descending direction.
- **Dragging:** distinguish the row being reordered until it is dropped.
- **Resizing:** preserve a stable minimum width while a supported column is resized.
- **Group collapsed:** hide a group's following data rows until the group is expanded.
- **Row disabled:** prevent selection and dragging for unavailable records while retaining their data for review.

## When not to use

- A very short collection is easier to understand as a list or cards.
- The primary relationship is hierarchical navigation; use Tree.
- The workflow depends on extensive inline cell editing; use a focused detail surface.
