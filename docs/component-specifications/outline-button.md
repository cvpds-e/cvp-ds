---
assetId: outline-button
classification: component
lifecycle: approved
specificationStatus: draft
---
# Outline Button

## Purpose

Outline Button presents a tertiary or exploratory action with less visual emphasis than primary and secondary actions.

## When to use

- An optional action should remain available without drawing attention from the main task.
- A toolbar or action group needs controls with restrained and consistent emphasis.
- Actions such as preview, reset, or advanced options need a visible but lightweight treatment.
- An asynchronous tertiary action needs loading feedback.

Choose the visual treatment according to the action and available space:

- **Default:** use for a routine tertiary action with the standard outlined target.
- **Compact:** use in constrained toolbars or action groups whose controls share a compact density.
- **Dotted:** reserve for a low-emphasis additive action or region, such as adding a filter.

Choose the content according to the action:

- **Text label:** provide a concise, action-oriented label for every button.
- **Icon and text:** add a familiar supporting icon when it improves recognition; keep the visible label as the primary meaning.

Account for these action states:

- **Loading:** replace the visible content with a spinner and specific loading text while preserving the button's geometry and preventing repeat activation.
- **Disabled:** use when the action is temporarily unavailable and the surrounding interface explains why.

## When not to use

- The action is the dominant next step; use Primary Button.
- The action supports a primary decision and needs more emphasis; use Secondary Button.
- The action is best expressed as inline text; use Text Button or a link.
