---
assetId: text-button
classification: component
lifecycle: approved
specificationStatus: draft
---
# TextButton

## Purpose

Text Button provides low-emphasis actions for utilities, disclosure, inline context, and navigation without the visual weight of a filled button.

## When to use

- A quiet utility action such as viewing details or clearing filters is needed.
- An inline action must fit naturally within surrounding text or values.
- A control reveals or hides related content.
- A low-emphasis destination needs optional icon support.

Choose the semantic variant according to the action:

- **Default:** use for routine low-emphasis utilities.
- **Secondary:** use when a neutral action needs more emphasis than the default text treatment but less than a filled button.
- **Toggle:** use for disclosure or another low-emphasis pressed control whose active state must be exposed.
- **Minimal:** use for the quietest inline actions where surrounding content provides sufficient context.
- **Contextual:** use for a changing inline value, such as match all versus match any, without adding a background surface.
- **Minimal inverted:** use the minimal treatment only on a dark or inverse surface that requires inverted text contrast.
- **Navigation:** use for destinations, optionally with a leading icon, and expose the active destination as the current page.

Choose the rendered behavior according to the outcome:

- **Button action:** render a native button for commands, utilities, and toggles.
- **Link destination:** provide a destination only for navigation; disabled links remove their destination and leave the tab order.
- **Text only:** use when the label fully communicates the action.
- **Icon and text:** add a decorative leading icon when it improves scanning; keep the visible text as the action name.

Account for these interaction states:

- **Default:** keep the action visually quiet until interaction.
- **Hover and focus:** preserve the shared interactive emphasis and visible focus treatment.
- **Active toggle:** map the active Toggle variant to its pressed state.
- **Active navigation:** identify the current destination without making it actionable as a button.
- **Loading:** replace the label with concise loading text, show the loader, expose busy state, and block repeat activation.
- **Disabled:** prevent activation and communicate unavailability for both button and link forms.

## When not to use

- The action is primary or high emphasis; use Button.
- The icon is the primary visual and its meaning is familiar; use Icon Button.
- The action is destructive and needs prominent warning emphasis.
