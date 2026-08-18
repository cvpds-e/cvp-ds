# Notification Banner — developer handoff

## Canonical implementation

- Component: `src/app/components/NotificationBanner.tsx`
- Component styles: `src/app/components/NotificationBanner.css`
- Tier 3 aliases: `src/styles/tokens/cvp-component-tokens.css`
- Visual audit: `src/app/components/NotificationBannerDocumentation.tsx`

Notification Banner is persistent and remains in document flow. Use Toast for brief action feedback and Modal for blocking decisions.

## API

- `title` and `message` provide the content hierarchy.
- `variant`: `info`, `success`, `warning`, or `error`.
- `icon`: optional semantic icon override. The default `info` icon is `Info`; do not use Sparkles for generic information because it can imply AI activity.
- `onDismiss`: adds the dismiss control.
- `actionLabel` plus `onAction`: adds one inline resolution action.
- `className`: layout integration only; do not override theme colors locally.

## Accessibility

Information and success use `role="status"`; warning and error use `role="alert"`. The component is atomic so title and message are announced together. Action and dismiss controls share the canonical focus ring. Do not automatically dismiss a banner.

## Token contract

All visual styling consumes `--cvp-notification-banner-*` Tier 3 aliases. Status colors resolve through canonical semantic state tokens, and focus, spacing, radius, typography, and border width use their respective CVP foundations. The info icon uses `--cvp-notification-banner-info-icon → --cvp-color-state-info-text`, matching the blue used by the “Localized fields available” state in both themes. Theme switching requires no component-level selector.

## Pixel-perfect acceptance

Verify four variants, custom icon, optional action, optional dismissal, long content wrapping, narrow layouts, focus-visible, and light/dark themes against the documentation page.
