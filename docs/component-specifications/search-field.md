---
assetId: search-field
classification: component
lifecycle: approved
specificationStatus: draft
---
# Search Field

## Purpose

Search Field is a specialized text field for entering search queries, with a search affordance and an optional action for clearing the current query.

## When to use

- Users search or narrow a collection by entering free text.
- A search icon helps distinguish the field from general data entry.
- Users benefit from clearing the complete query with one action.
- Search-specific browser and mobile keyboard behavior supports the task.

Choose the behavior according to how the query is managed:

- **Persistent query:** omit the clear action when users should edit the query manually or clearing requires a separate confirmation.
- **Clearable query:** provide the clear action when resetting the complete query should immediately restore the unfiltered view.
- **Controlled value:** use when application state owns the current query and updates it as users type.
- **Uncontrolled value:** use when the field can own its initial and subsequent browser-managed value.

Account for these search states:

- **Empty:** show the search affordance and label without a clear action.
- **Populated:** show the current query and, when clearing is supported, expose a specifically labelled clear action.
- **Read-only:** preserve a query that users may review but not edit.
- **Disabled:** make the search field unavailable when searching cannot currently be performed.

## When not to use

- The field collects general text rather than a query; use Text Input.
- Users select from known values instead of entering free text; use Select or Multi Select.
- Filtering requires several structured conditions; use Filter.
