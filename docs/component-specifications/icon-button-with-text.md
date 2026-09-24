---
assetId: icon-button-with-text
classification: component
lifecycle: approved
specificationStatus: draft
---
# Icon Button with Text

## Purpose

Icon Button with Text combines an icon and visible label in one action, with optional supporting description when the label alone needs brief context.

## When to use

- An icon improves recognition but is not clear enough to stand alone.
- A toolbar or action group benefits from visible action labels.
- A short description helps distinguish similar actions.
- Available space supports more context than an icon-only control.

Choose the visual treatment according to the action's emphasis:

- **Default:** use for a labelled action card that needs the standard bordered treatment.
- **Outline:** use for a supporting choice that should remain visible with less surface emphasis.

Choose the layout according to the amount of decision context:

- **Default:** use the compact 176 × 96px minimum layout for routine actions and choices.
- **M:** use the larger 208 × 160px selection-card layout for mutually exclusive creation or setup paths.

Choose the content according to what distinguishes the action:

- **Icon and title:** use for every action; keep the title concise and action-oriented.
- **Description:** add brief supporting context when the title alone does not distinguish the choice. Do not place paragraphs or instructions inside the control.

Account for these action states:

- **Loading:** replace the icon and title with a specific loading message while preserving the control's geometry and preventing repeat activation.
- **Disabled:** use only when the action is temporarily unavailable and the surrounding interface explains why.

## When not to use

- A familiar icon communicates the action without ambiguity; use Icon Button.
- No icon is needed; use Primary Button, Secondary Button, or Text Button.
- The supporting explanation is too long to fit comfortably in an action control; place guidance beside the control instead.
