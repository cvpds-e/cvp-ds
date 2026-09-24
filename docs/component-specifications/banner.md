---
assetId: banner
classification: component
lifecycle: approved
specificationStatus: draft
---
# Banner

## Purpose

Banner provides persistent, in-flow feedback near the content it affects, keeping important guidance, status, warnings, and recoverable errors visible while users work.

## When to use

- Task-specific guidance must remain visible.
- A successful state change needs persistent confirmation.
- A warning or recoverable error requires review or an action.
- The message applies to a page, section, or workflow rather than one field.

Choose the tone according to the message priority:

- **Info:** use for persistent guidance or neutral status that helps people continue their work.
- **Success:** use for a completed state change that should remain visible in context.
- **Warning:** use for a condition that needs timely review while the current workflow can continue.
- **Error:** use for a recoverable failure that requires attention or resolution.

Choose the action treatment according to what people can do next:

- **Message only:** use when the content itself is sufficient and no direct response is needed.
- **Single action:** include one concise action when it leads directly to review or resolution; do not add competing actions.

Choose the icon treatment according to the message semantics:

- **Semantic icon:** keep the tone's default icon for standard information, success, warning, and error messages.
- **Custom icon:** use only when a domain-specific symbol improves recognition without weakening the selected tone.

Account for these persistence and announcement states:

- **Persistent:** keep required guidance visible until its underlying context changes.
- **Dismissible:** allow dismissal only when people can safely continue without the message.
- **Status announcement:** use the info and success tones for non-urgent updates.
- **Alert announcement:** use the warning and error tones for conditions requiring greater attention.

## When not to use

- Feedback is brief and does not need to remain visible; use Toast.
- A decision must block the current workflow; use Modal.
- The message is a field-level validation error; show it with the field.
