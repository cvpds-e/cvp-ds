# [Component name]

## Status

- Lifecycle: `candidate | approved | deprecated | deferred`
- Owner: [team or role]
- Last reviewed: YYYY-MM-DD
- Related registry ID: `[component-id]`

## Purpose and decisions

Describe the user problem, intended outcome, and product vocabulary.

### Use when

- [Supported use case]

### Do not use when

- [Alternative situation and the preferred component or pattern]

## API and composition

Document public props, supported variants, states, composition slots, controlled/uncontrolled behavior, and unsupported combinations. Link to the TypeScript implementation as the source of truth for signatures.

## Behaviour and responsiveness

Describe interaction, state transitions, validation, loading/empty/error behavior where applicable, breakpoints, reflow rules, and density guidance.

## Accessibility

Document semantics, accessible naming, keyboard behavior, focus management, state announcements, contrast and non-colour cues, reduced motion, and manual checks.

## Visual and token contract

List the component token prefix, supported themes, responsive/density choices, and any allowed overrides. Do not document raw visual values as public API.

## Evidence

- Examples: [paths or routes]
- Behaviour tests: [paths]
- Visual fixtures: [paths or explicit review exception]
- Accessibility review: [automated and manual checks]

## Limitations and migration

Record known constraints, deliberately unsupported requirements, replacement assets, and migration guidance.
