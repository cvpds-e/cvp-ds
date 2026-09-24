---
assetId: breadcrumb
classification: component
lifecycle: approved
specificationStatus: draft
---
# Breadcrumb

## Purpose

Breadcrumb shows a compact location trail for hierarchical workflows, providing predictable navigation to ancestors and optional related destinations.

## When to use

- The current page has a genuine hierarchical relationship to parent locations.
- Users need quick navigation to ancestors without losing their place.
- An ancestor may expose a small menu of sibling destinations.
- Long paths should remain on one horizontally scrollable row.

Choose the surface according to the parent layout:

- **Default surface:** use on standard page backgrounds and navigation regions.
- **Canvas surface:** use in the established details canvas where the breadcrumb must integrate with that surface treatment.

Choose the hierarchy pattern according to the available destinations:

- **Single location:** use when only the current location needs to be named; it remains non-interactive.
- **Ancestor trail:** use for two or more levels; ancestors are navigable and the current page remains non-interactive.
- **Ancestor menu:** add a dropdown only when an ancestor has a small, meaningful set of sibling destinations.
- **Custom separator:** use only when the product context has an established separator that preserves the same hierarchy.

Use the compact layout consistently:

- **Compact targets:** keep ancestor labels concise within the component's 32px navigation target; Breadcrumb does not provide larger density variants.
- **Long hierarchy:** preserve one horizontal row and allow overflow rather than wrapping the trail into ambiguous lines.

Account for these navigation states:

- **First ancestor:** use the established back-navigation treatment to return to the parent location.
- **Current page:** expose the final item as the current page without link or button behavior.
- **Open ancestor menu:** expose sibling destinations in the keyboard-operable menu and return focus to its trigger when dismissed.
- **Unavailable destination:** keep a disabled menu item visible only when its unavailable state provides useful context.

## When not to use

- The sequence represents progress through a task rather than location.
- The hierarchy is artificial or only one level deep.
- Users need to explore a full hierarchy at once; use Tree or page navigation.
