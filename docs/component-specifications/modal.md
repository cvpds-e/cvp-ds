---
assetId: modal
classification: component
lifecycle: approved
specificationStatus: draft
---
# Modal

## Purpose

Modal presents a focused task, decision, or short settings workflow above the current page. It temporarily interrupts the underlying interface while preserving page context until the user completes or dismisses the task.

## When to use

- A focused task or decision needs immediate attention without navigating away from the current page.
- A short form or configuration workflow can be completed without comparing information in the underlying interface.
- A destructive or consequential action requires explicit confirmation and a clear explanation of its impact.
- A small set of closely related settings benefits from one contained, optionally tabbed workflow.

Modal provides two layout variants:

- **Default:** use for confirmations, forms, notices, and focused tasks with one continuous content area.
- **Tabbed:** use for a small set of closely related settings that share one task context. Use a page when the sections form a long or complex workflow.

Choose the tone and size according to the task:

- **Default tone:** use for routine tasks and decisions.
- **Danger tone:** use when the primary decision is destructive or difficult to reverse. State the affected object and consequence clearly.
- **Medium:** use for confirmations, standard forms, and focused tasks.
- **Large:** use for complex or tabbed settings that still fit a contained workflow.

Account for these modal states:

- **Open:** reserve the interruption for work that requires attention before the user returns to the page.
- **Protected dismissal:** prevent backdrop dismissal when accidental closure would lose meaningful work.
- **Long content:** keep the task title and actions available while the body content scrolls.

## When not to use

- The workflow is long, complex, or requires substantial navigation; use a dedicated page.
- Users need to compare or interact with information in the underlying interface; use a side panel or inline layout.
- The content provides optional detail without requiring a decision; use inline disclosure or a non-modal overlay.
- The message is passive feedback that does not require immediate action; use a notification banner or toast at the appropriate scope.
