---
assetId: icon-small-button
classification: component
lifecycle: deprecated
specificationStatus: draft
---
# Icon Small Button

## Purpose

Icon Small Button is a deprecated wrapper that provides the small size of Icon Button. Existing uses remain supported, but new work should use Icon Button with its small size directly.

## When to use

- Maintain an existing interface that already depends on Icon Small Button.
- A dense toolbar or inline action requires the established compact icon-only treatment.

For new work, use Icon Button with its small size. When maintaining an existing use, choose the inherited treatment according to context:

- **Default:** use for a routine compact icon action.
- **Outline:** use when the compact target needs a visible boundary.
- **Ghost:** use for a lower-emphasis toolbar or inline action.
- **Danger:** use only for a destructive compact action.
- **Rail gallery:** use for a compact control over a media or gallery surface.
- **Remove:** use for a circular remove action over an item or media surface.

The component has one fixed layout:

- **Small:** retain the inherited 24px Icon Button target only where adjacent controls have adequate separation.

Account for the inherited action states:

- **Loading:** preserve the target geometry, announce the supplied loading label, and prevent repeat activation.
- **Disabled:** use when the action is temporarily unavailable and the surrounding interface explains why.

## When not to use

- New code needs a compact icon action; use Icon Button directly.
- The icon is not sufficiently clear by itself; use Icon Button with Text.
- The available target area cannot provide adequate click or touch separation.
