---
assetId: toast
classification: component
lifecycle: approved
specificationStatus: draft
---
# Toast

## Purpose

Toast provides brief, non-modal feedback about an outcome or status while allowing users to continue their current task.

## When to use

- An action completes successfully or fails outside a field-level context.
- A background operation needs a brief status update.
- Feedback may dismiss automatically after a short duration.
- A concise message should appear without changing layout.

Choose the tone according to the outcome:

- **Success:** confirm that an action completed as expected; announce it as a non-urgent status.
- **Information:** report a neutral update or background status without implying action is required; announce it as a non-urgent status.
- **Warning:** report a condition that needs timely attention while allowing the current task to continue; announce it immediately.
- **Danger:** report a failed or serious outcome that needs immediate attention; announce it immediately and state what failed.

Choose the content layout according to the message:

- **Description only:** use for a single concise sentence that is clear without a heading.
- **Title and description:** add a short title when it materially improves scanning; keep the description focused on the outcome or next step.
- **Responsive stack:** allow multiple notifications to stack in the shared notification region and constrain their width at narrow viewports.

Choose dismissal behavior according to how long the feedback remains useful:

- **Timed:** use the default five-second duration for brief feedback that does not require action.
- **Persistent:** use a zero duration when the message must remain until dismissed or removed programmatically.
- **Dismissible:** provide the dismiss action when users may clear the message before its timer ends; this is the default.
- **Programmatic:** use the returned notification ID or clear-all behavior when the owning workflow must remove feedback after a state change.

Account for these notification states:

- **Entering and visible:** place feedback in the single application notification region without moving page content.
- **Dismissed:** clear the notification and any pending timer when the user or product removes it.
- **Reduced motion:** suppress entry and exit animation while preserving the same message and timing behavior.

## When not to use

- Instructions or validation must remain beside a field; show inline guidance.
- The message requires a decision or substantial interaction; use Modal.
- The information must remain visible at page or section scope; use Banner.
