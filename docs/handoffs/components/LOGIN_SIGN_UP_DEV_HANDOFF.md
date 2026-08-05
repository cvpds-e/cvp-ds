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

The page composes canonical `TextInput`, `Select`, `PrimaryButton`, `SecondaryButton`, `TextButton`, and `IconSmallButton` components. Do not restyle those children locally. Page-level layout consumes `--cvp-login-*` Tier 3 tokens from `cvp-component-tokens.css`.

## Accessibility and DOM requirements

- Keep the visible page heading associated through `aria-labelledby`.
- Preserve explicit input labels, `required`, and the supplied autocomplete values.
- Password visibility is a labeled button and must not alter the password value.
- Authentication failures remain inline; do not rely on toast-only feedback.
- Legal links remain inside a labeled navigation landmark.
- Product selection uses the canonical Select listbox behavior.

## Responsive behavior

The card is capped at 440px. Below 600px, page and card insets reduce and product selection becomes full width. The full page must remain vertically scrollable at small viewport heights.
