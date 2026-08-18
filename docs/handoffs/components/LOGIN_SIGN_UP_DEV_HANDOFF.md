# Login / Sign Up — Developer Handoff

## Canonical component

Use `LoginSignUp` from `src/app/components/LoginSignUp.tsx`. It automatically follows the active CVP light or dark theme. `LoginSignUpLight` is retained only as a deprecated source-compatible wrapper during migration.

## Supported flows

- `initialMode="sign-in"` for credential and SSO access
- `initialMode="sign-up"` for account creation
- `allowModeSwitch` controls whether users can move between flows
- `loading` prevents repeat actions and communicates progress
- `error` renders persistent inline service feedback with `role="alert"`

## Composition contract

The page composes canonical `TextInput`, `Select`, `PrimaryButton`, `SecondaryButton`, `TextButton`, `IconSmallButton`, and `NotificationBanner` components. Its authentication card aliases the shared Modal surface, border, radius, shadow, padding, and compact width through `--cvp-login-*` Tier 3 tokens. Keep the controls' own contracts intact.

## Accessibility and DOM requirements

- Keep the visible page heading associated through `aria-labelledby`.
- Preserve explicit input labels, `required`, and the supplied autocomplete values.
- Password visibility is a labeled button and must not alter the password value.
- Authentication failures use the shared inline error Notification Banner; do not rely on toast-only feedback.
- Legal links remain inside a labeled navigation landmark.
- Product selection uses the canonical Select listbox behavior.

## Responsive behavior

The card follows the shared compact Modal width. The recovery action follows the same inline text-action spacing and leading edge as the recommended-rail “Create new configuration” action. Below 600px, page and card insets reduce and product selection becomes full width. The full page must remain vertically scrollable at small viewport heights.
