---
assetId: button
classification: component
lifecycle: approved
specificationStatus: draft
---
# Button

## Purpose

Button initiates an action and communicates its importance through a consistent hierarchy of primary, secondary, and outline treatments.

## When to use

- A user needs to submit, confirm, create, cancel, preview, reset, or perform another explicit action.
- The interface needs a clear hierarchy between one dominant action and its supporting alternatives.
- An asynchronous action needs loading feedback while preserving the control's position and size.

Choose the variant according to the action hierarchy:

- **Primary:** use for the single dominant action on a focused page, form, or modal.
- **Secondary:** use for a supporting action that should remain visible without competing with the primary action.
- **Outline:** use for tertiary, optional, or exploratory actions that need less emphasis.
- **Dotted outline:** reserve for low-emphasis additive actions such as adding a filter.

Choose the size according to the available space:

- **Default:** use for standard page, form, and modal actions.
- **Compact:** use in dense toolbars or constrained layouts where the default size does not fit comfortably.

Choose the content according to the action:

- **Text label:** use a concise, action-oriented label that describes the outcome.
- **Icon and text:** add a familiar supporting icon when it improves recognition; keep the visible label as the primary meaning.

Account for these button states:

- **Enabled:** use when the action is available and can run immediately.
- **Loading:** show progress and task-specific loading text while asynchronous work completes, and prevent repeat activation.
- **Disabled:** use when the action is temporarily unavailable and the surrounding interface makes the reason clear.

## When not to use

- The action is represented clearly by a familiar icon in a compact interface; use Icon Button.
- The action should appear inline with surrounding content; use Text Button.
- The control navigates to another location without performing an action; use an appropriate link or navigation control.