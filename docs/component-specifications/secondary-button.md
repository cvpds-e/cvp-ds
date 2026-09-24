---
assetId: secondary-button
classification: component
lifecycle: approved
specificationStatus: draft
---
# Secondary Button

## Purpose

Secondary Button presents a supporting action that remains visible without competing with the primary action on the same surface.

## When to use

- An alternative or supporting action appears beside a primary action.
- A form or modal needs a clear action hierarchy.
- A less common operation should remain available with reduced emphasis.
- An asynchronous secondary action needs loading feedback.

Choose the size according to the available space:

- **Default:** use for standard supporting actions on pages, forms, and modals.
- **Compact:** use in constrained layouts where the default button does not fit comfortably.

Account for these button states:

- **Enabled:** use when the supporting action is available and can run immediately.
- **Loading:** show progress and a task-specific loading label while asynchronous work completes; the button becomes unavailable to prevent repeat activation.
- **Disabled:** use when the action is temporarily unavailable and the surrounding interface makes the reason clear.

## When not to use

- The action is the dominant next step; use Primary Button.
- The action should have lighter tertiary emphasis; use Outline Button or Text Button.
- The control navigates to another location rather than performing an action; use an appropriate link or navigation control.
