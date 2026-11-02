---
assetId: login-sign-up
classification: page
lifecycle: approved
specificationStatus: draft
---
# Login / Sign Up

## Purpose

Provide the theme-aware authentication page composition for sign-in and
account-registration experiences.

## When to use

- Build a CVP authentication entry point with shared branding and form controls.
- Demonstrate sign-in, sign-up, SSO, or password-recovery entry points.

Choose `initialMode` and whether `allowModeSwitch` is available. Integrations
handle `onSignIn`, `onSignUp`, `onSSOSignIn`, and `onForgotPassword`; the component
does not authenticate users itself. Supply `loading` and `error` from the
authentication workflow. Keep labels and validation feedback visible, and use
the existing password-visibility control rather than an unlabeled icon.

## When not to use

- A modal authentication prompt or unrelated data-entry form is required.
- Theme-specific duplicate pages are being proposed; this page supports themes.

See [implementation](../../src/app/components/LoginSignUp.tsx) and
[showcase](../../src/app/components/LoginSignUpDocumentation.tsx).
