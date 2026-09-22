# Component specifications

This directory is the human-readable contract layer for reusable CVP assets. It complements, rather than replaces, the implementation, component registry, tokens, examples, tests, and visual evidence.

Every asset in the canonical registry has a Markdown file here. Draft files are intentionally incomplete and must never be interpreted by an agent as approved usage guidance; the structured specification registry is the authority for completed agent-ready contracts.

## Definition of done

An asset may be promoted to `approved` only when its machine specification is valid and its human specification covers purpose, use and non-use decisions, API, states, responsive behavior, accessibility, tokens, evidence, ownership, and known limitations. A component also needs implementation evidence: examples, automated behavior tests, visual coverage or an explicit visual-review exception, and a recorded release decision.

## Rollout sequence

1. Start with the shared primitives used by the most patterns.
2. Complete the Markdown and machine specification together.
3. Add or link examples, tests, visual evidence, and accessibility review.
4. Run `npm run agent:check` and `npm run specs:audit`.
5. Review with Design and Engineering before changing an asset's lifecycle.

The complete reference is [Choice Card Group](choice-card-group.md). New specifications start from [the template](COMPONENT_SPEC_TEMPLATE.md).
