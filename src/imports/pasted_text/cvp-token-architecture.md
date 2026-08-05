You are a Senior Design Systems Architect helping evolve the Cloud Video Platform (CVP) Design System into a scalable Experience Infrastructure platform.
Use:
The current DESIGN.md from this project (our source of truth for the design system).
The production design tokens outside of this project in our current eng environment:
--tc-bg-accent-purple #c084fc
--tc-bg-bold #d0d0d3
--tc-bg-brand #3d63dd
--tc-bg-brand-hovered #244cce
--tc-bg-danger #c51b20
--tc-bg-danger-hovered #a8171b
--tc-bg-disabled #a1a1a8
--tc-bg-hovered #292a2e
--tc-bg-inverse #ffffff
--tc-bg-secondary #2d4a8e
--tc-bg-secondary-hovered #1f3566
--tc-bg-subtle #252528
--tc-blanket rgba(0, 0, 0, 0.5)
--tc-border-bold #bbbbbb
--tc-border-brand #3d63dd
--tc-border-danger #e6494e
--tc-border-default color-mix(in srgb, #d0d0d3 10%, transparent)
--tc-border-focused #67b3fb
--tc-border-selected #6f8be6
--tc-border-subtle #45454a
--tc-border-success #3dc155
--tc-border-warning #f4983b
--tc-icon-brand #3d63dd
--tc-icon-danger #e6494e
--tc-icon-default #bbbbbb
--tc-icon-success #3dc155
--tc-icon-warning #f4983b
--tc-surface-default #19191b
--tc-surface-overlay-default #292a2e
--tc-surface-overlay-hovered #333333
--tc-surface-overlay-selected #45454a
--tc-text-accent-blue-subtle #6f8be6
--tc-text-accent-blue-subtlest #cdd7f6
--tc-text-accent-indigo-default #1f3566
--tc-text-accent-indigo-subtle #2d4a8e
--tc-text-accent-indigo-subtlest #97a9de
--tc-text-accent-sky-default #359afa
--tc-text-accent-sky-subtle #67b3fb
--tc-text-bold #a4a4a4
--tc-text-brand #3d63dd
--tc-text-danger #e6494e
--tc-text-default #ffffff
--tc-text-disabled #bbbbbb
--tc-text-disabled-bold #292a2e
--tc-text-inverse #19191b
--tc-text-subtle #606060
--tc-text-success #3dc155
--tc-text-warning #f4983b

Background
The current production tokens evolved organically and are implementation-focused.
The design.md is significantly more mature and already introduces semantic foundations including:
Colors
Typography
Spacing
Motion
Elevation
Components
Accessibility
Theme support
The goal is to evolve the existing production token system so it fully supports the design system without introducing unnecessary breaking changes.

Objectives
Review both the production tokens and design.md.
Then produce a proposed CVP Token Architecture.
Do not simply rename tokens.
Instead:
identify the underlying architecture
identify inconsistencies
identify missing token categories
recommend a scalable naming convention
identify migration opportunities

Deliverables
1. Evaluate the current production tokens
For every token category explain:
what works well
where naming is inconsistent
where responsibilities overlap
where tokens are implementation-specific rather than semantic

2. Propose a Token Architecture
Recommend a scalable hierarchy.
For example:
Foundations
Semantic Tokens
Component Tokens
or another hierarchy if you believe it better supports the existing design system.
Explain why.

3. Token Taxonomy
Define the complete taxonomy.
Examples include (but are not limited to):
Background
Surface
Text
Border
Icon
Brand
States
Elevation
Motion
Radius
Spacing
Typography
Focus
Overlay
Opacity
Z-index
Identify any additional categories required.

4. Naming Convention
Recommend a naming convention that:
scales across hundreds of tokens
supports light/dark themes
supports customer themes
supports AI-readable component contracts
remains easy for engineers to consume
Explain the rationale behind the convention.

5. Token Mapping
Create a migration table.
For every existing production token show:
Existing token
Proposed semantic token
Proposed category
Status
Status should be one of:
Keep
Rename
Alias
Deprecate
Split
Merge
Avoid unnecessary breaking changes.

6. Missing Tokens
Identify semantic tokens required by the current design.md that do not yet exist in production.
Prioritise them.

7. Component Consumption
Describe how components should consume tokens.
For example:
Component
↓
Component Token
↓
Semantic Token
↓
Theme
↓
Value
rather than directly referencing implementation tokens.

8. Theme Strategy
Recommend how customer branding should be implemented.
Consider:
light/dark themes
white-label customers
partner branding
accessibility
future runtime theming

9. Governance
Recommend governance principles for the token system.
Include guidance on:
versioning
deprecation
introducing new tokens
preventing duplication
documentation
ownership

10. Migration Roadmap
Provide a phased migration plan.
For each phase describe:
objective
expected output
engineering effort
risks
dependencies
The migration should allow the current production system to continue functioning while gradually adopting the new architecture.

Constraints
Build on the existing design.md rather than replacing it.
Minimise disruption to existing production components.
Optimise for long-term maintainability.
Assume Storybook will become the canonical component catalogue.
Assume the design system will eventually support AI-assisted interface generation through structured component contracts.
Assume this token architecture will become part of the broader CVP Experience Infrastructure platform.

Output
Produce a comprehensive design architecture proposal suitable for discussion between Product, Design and Engineering, including diagrams, rationale, migration tables and concrete recommendations.

