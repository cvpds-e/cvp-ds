---
assetId: icon-button
classification: component
lifecycle: approved
specificationStatus: draft
---
# Icon Button

## Purpose

Icon Button is a compact single-action control for familiar symbols, with an explicit accessible action name.

## When to use

- A familiar action such as search, settings, navigation, or delete must fit a compact control.
- Dense operational interfaces cannot accommodate a visible text label.
- A toolbar or media control needs consistent icon-only targets.

Choose the visual treatment according to the action and surface:

- **Default:** use for a routine standalone icon action with standard emphasis.
- **Outline:** use when a visible boundary helps define the target on the surrounding surface.
- **Ghost:** use for lower-emphasis actions in toolbars and compact action groups.
- **Danger:** use only for destructive actions.
- **Rail gallery:** use for controls placed over media or gallery surfaces that need a contrast-safe overlay.
- **Remove:** use for a circular remove action placed over an item or media surface.

Choose the target size according to layout density:

- **Small:** use the 24px target only in dense toolbars or inline action groups with adequate separation.
- **Medium:** use the 32px target as the general default.
- **Large:** use the 40px target in roomier contexts or where a larger target is needed.

Account for these action states:

- **Loading:** replace the glyph with a spinner, announce the supplied loading label, preserve target geometry, and prevent repeat activation.
- **Disabled:** use when the action is temporarily unavailable and the surrounding interface makes the reason clear.

## When not to use

- The icon meaning is ambiguous; use a text-labelled action.
- A small target cannot maintain sufficient separation from adjacent controls.
- Several competing icon styles would make one action group inconsistent.
