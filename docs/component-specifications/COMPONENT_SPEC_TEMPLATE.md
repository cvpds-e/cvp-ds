# [Component name]

## Status

- Lifecycle: `candidate | approved | deprecated | deferred`
- Owner: [team or role]
- Last reviewed: YYYY-MM-DD
- Related registry ID: `[component-id]`
- Public import: `[package or module specifier]`
- Runtime source: `[path]`

## Purpose and decisions

Describe the user problem, intended outcome, and product vocabulary.

### Use when

- [Supported use case]

### Do not use when

- [Alternative situation and the preferred component or pattern]

## API and composition

### TypeScript contract

Include the literal exported TypeScript interfaces or type aliases. Do not paraphrase prop signatures. For every composition slot, state whether it accepts text, a constrained enum, a component type, or `ReactNode`, and prohibit interactive descendants where applicable.

```tsx
interface ExampleProps {
	value: string;
	disabled?: boolean;
}
```

### Prop contract

| Prop | Type | Required | Default | Deterministic rule |
| --- | --- | --- | --- | --- |
| `[name]` | `[exact exported type]` | `Yes | No` | `[literal or —]` | `[behavior, constraints, unsupported combinations]` |

### Canonical usage

Include a minimal compiling example with the canonical package import. If the component supports controlled and uncontrolled modes, show both separately and explicitly prohibit mixing them.

```tsx
import { Example } from '@cvp/design-system';
```

Link to the TypeScript implementation and public export as sources of truth. Document supported variants, states, composition slots, and unsupported combinations.

## Behaviour and responsiveness

Describe interaction, state transitions, validation, loading/empty/error behavior where applicable, breakpoints, reflow rules, and density guidance. Put exact responsive rules in a condition-to-result table. Reference canonical breakpoint tokens when they exist; otherwise identify literal values as component-local constants and prohibit agents from inventing token names.

### Validation contract

State whether validation is native, component-owned, or consumer-owned. Document `required`, invalid state, submission behavior, error-message association, and unsupported validation states. Never imply behavior that the implementation does not expose.

## Accessibility

Document semantics, accessible naming, keyboard behavior, focus management, state announcements, contrast and non-colour cues, reduced motion, and manual checks.

## Visual and token contract

List every supported component token in a table with its exact name, purpose, semantic source, and public/internal/local scope. Link to `src/styles/token-registry.json` for resolved theme values. State supported themes, responsive/density choices, and allowed overrides. Do not invent token names or document raw theme colors as public API.

| Token | Purpose | Resolves to | Scope |
| --- | --- | --- | --- |
| `--cvp-[component]-[role]` | `[role]` | `[semantic token]` | `public | internal | local` |

## Evidence

- Examples: [paths or routes]
- Canonical consumer import: [package import]
- Runtime implementation: [path]
- Public export: [path]
- Machine contract: [registry path]
- Token registry: `src/styles/token-registry.json`
- Behaviour tests: [paths]
- Visual fixtures: [paths or explicit review exception]
- Accessibility review: [automated and manual checks]

## Limitations and migration

Record known constraints, deliberately unsupported requirements, replacement assets, and migration guidance.

## Agent determinism checklist

- [ ] Lifecycle and machine-spec status agree.
- [ ] Canonical import and runtime source are explicit.
- [ ] Literal TypeScript types match the exported implementation.
- [ ] Every prop has an exact type, required flag, default, and constraint.
- [ ] Controlled and uncontrolled examples do not mix modes.
- [ ] Validation ownership and unsupported error states are explicit.
- [ ] Responsive rules use existing tokens or identify reviewed local constants.
- [ ] Every component token is enumerated and linked to the token registry.
- [ ] Examples compile using approved public exports only.
- [ ] Evidence paths exist; unavailable evidence is recorded as a gap.
