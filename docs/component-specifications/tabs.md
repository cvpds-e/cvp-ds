---
assetId: tabs
classification: component
lifecycle: approved
specificationStatus: draft
---
# Tabs

## Purpose

Tabs switches between mutually exclusive peer content panels while preserving clear selection and keyboard focus behavior.

## When to use

- Related peer content needs fast switching within one context.
- Panel labels can remain concise and visible together.
- Automatic activation is appropriate for lightweight local content.
- Manual activation is needed when changing panels is expensive or has side effects.

Choose the orientation according to the available space and reading order:

- **Horizontal:** use when concise labels fit together in one row. Allow the tab list to scroll horizontally rather than wrapping labels onto multiple rows.
- **Vertical:** use when the labels form a short side navigation and the content panel can remain beside the list.

Choose the activation behavior according to the cost of changing panels:

- **Automatic:** use for lightweight local content that can render immediately. Arrow-key focus also selects the focused tab.
- **Manual:** use when rendering a panel is expensive or selection has side effects. Arrow keys move focus; Enter or Space selects the focused tab.

Account for these selection and navigation states:

- **Uncontrolled:** use `defaultTab` when Tabs owns the initial and subsequent selection.
- **Controlled:** use `activeTab` with `onTabChange` when product state owns selection.
- **Selected:** keep one enabled tab in the page tab order and expose its associated panel.
- **Focused:** support orientation-aware arrow keys plus Home and End without losing the selected state in manual activation mode.
- **Disabled:** keep an unavailable tab visible when its absence would be confusing, and skip it during keyboard navigation.
- **No tabs:** render no tab interface when there are no items.

## When not to use

- Destinations are separate pages; use page navigation.
- Choices change a view mode rather than revealing labelled panels; use Segmented Control.
- Only one content panel exists.
