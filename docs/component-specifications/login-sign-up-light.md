---
assetId: login-sign-up-light
classification: utility
lifecycle: deprecated
specificationStatus: draft
---
# Login / Sign Up Light

## Purpose

Preserve source compatibility for consumers of the former light-only login page.
This wrapper forwards LoginSignUp props to the theme-aware LoginSignUp component.

## When to use

- Maintain an existing import temporarily while migrating to LoginSignUp.

## When not to use

- New authentication experiences are being built.
- A separate theme-specific implementation is being introduced.

Use [Login / Sign Up](./login-sign-up.md) for new work. This wrapper adds no
authentication behavior or independent theme contract.

See [implementation](../../src/app/components/LoginSignUpLight.tsx).
