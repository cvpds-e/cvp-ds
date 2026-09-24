---
assetId: primary-button
classification: component
lifecycle: approved
specificationStatus: draft
---
# Primary Button

## Purpose

Primary Button presents the dominant action users should take on a page, form, or modal.

## When to use

- A surface has one clear action such as save, submit, confirm, or create.
- The encouraged next step needs the strongest action emphasis.
- An asynchronous primary action needs loading feedback while work completes.

Use one Primary Button per focused surface so the dominant next step remains unambiguous.

Choose the size according to the available space:

- **Default:** use for standard page, form, and modal actions.
- **Compact:** use in constrained layouts where the default button does not fit comfortably.

Account for these button states:

- **Enabled:** use when the action is available and can run immediately.
- **Loading:** show progress and a task-specific loading label while asynchronous work completes; the button becomes unavailable to prevent repeat submission.
- **Disabled:** use when the action is temporarily unavailable and the surrounding interface makes the reason clear.

## When not to use

- The action supports or competes with another primary decision; use Secondary Button.
- The action is optional or exploratory; use Outline Button or Text Button.
- The control navigates to another location without performing a consequential action; use an appropriate link or navigation control.
