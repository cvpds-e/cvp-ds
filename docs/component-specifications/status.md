---
assetId: status
classification: component
lifecycle: approved
specificationStatus: draft
---
# Status

## Purpose

Status is a compact, non-interactive indicator for communicating lifecycle, availability, or health states such as active, successful, warning, or critical conditions.

## When to use

- An object's operational state or health needs a concise visual signal.
- A consistent semantic tone helps users recognize meanings such as ready, success, warning, or error.
- The state is read-only information that does not require user interaction.

Choose the tone according to a meaning that remains consistent across the application:

- **Neutral:** use for generic, inactive, unknown, or informational states without positive or negative meaning.
- **Success:** use for healthy, active, ready, or successfully completed states.
- **Warning:** use for states that need attention but do not yet prevent progress.
- **Danger:** use for failed, critical, blocked, or otherwise harmful states that require prompt attention.

Account for these status states:

- **Present:** show concise text that names the current lifecycle, availability, or health condition.
- **Updated:** replace the text and tone together when the underlying condition changes so meaning does not depend on color alone.

## When not to use

- The element represents a category or classification label; use Badge.
- Users can change the state; use a control such as Toggle or Select.
- The value represents a selected item or filtering choice; use Pills or a filtering control.
