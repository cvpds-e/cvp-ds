# CONSOLE-7339 — Complete migration from legacy `--tc-*` tokens to the CVP token system

## Summary

Complete and validate the migration from legacy `--tc-*` design tokens to the canonical three-tier `--cvp-*` token architecture across the CVP Design System, while preserving production compatibility through the temporary alias bridge.

This story formalizes the token architecture now present in the design-system project and defines the remaining work required for a safe engineering handoff. It does not authorize unreviewed visual changes or require removal of the compatibility bridge before all consuming products have migrated.

## Background

The CVP Design System now uses a three-tier token architecture:

1. **Primitive tokens** — raw design values in `src/styles/tokens/cvp-primitives.css`.
2. **Semantic tokens** — purpose-based, theme-aware roles in `src/styles/tokens/cvp-semantic-tokens.css`.
3. **Component tokens** — component-level contracts and supported override surfaces in `src/styles/tokens/cvp-component-tokens.css`.

Legacy `--tc-*` tokens remain available through `src/styles/tokens/cvp-alias-bridge.css`. The bridge prevents breaking changes while components and consuming products move to `--cvp-*` tokens.

The canonical production import chain is:

```text
index.css
└── cvp-alias-bridge.css
    └── cvp-component-tokens.css
        └── cvp-semantic-tokens.css
            └── cvp-primitives.css
```

New component work must use `--cvp-*` tokens. New `--tc-*` tokens must not be introduced.

## User story

**As a** CVP engineer, designer, or QA engineer,

**I want** one governed, theme-aware token system with an explicit legacy migration path,

**so that** components can be implemented consistently across CVP products without hardcoded design values, conflicting token vocabularies, or accidental visual regressions.

## Current state

- The primitive, semantic, component, and legacy bridge files are present and active.
- Light and dark themes resolve through the semantic layer.
- The legacy bridge contains the supported `--tc-*` compatibility mappings.
- Active design-system source does not directly consume `--tc-*` tokens outside the bridge.
- Primary, Secondary, and Outline Button contracts have been standardized.
- Text Input, Text Area, and Select have been standardized against the new component-token contracts.
- Foundation work has expanded token coverage for color, spacing, typography, radius, border, elevation, layout, and related roles.
- Migration enforcement, visual regression coverage, and downstream product verification remain incomplete.

## Scope

### Included

- Maintain the canonical three-tier `--cvp-*` token files and production import chain.
- Maintain the temporary `--tc-*` alias bridge during product migration.
- Establish one reviewed legacy-to-target token mapping inventory.
- Migrate remaining in-scope CVP Design System components from legacy, generic, embedded, or hardcoded styling to approved `--cvp-*` tokens.
- Validate migrated components in both light and dark themes.
- Add automated checks preventing new direct `--tc-*` consumption and unregistered token usage.
- Record migration status, exceptions, and design decisions in the repository.
- Identify mappings that change visual output and hold them behind design approval.

### Explicitly excluded

- Removing `cvp-alias-bridge.css` before all consuming products report zero direct `--tc-*` usage.
- Automatically changing production visuals where legacy and target values differ.
- Migrating every downstream CVP product within this story.
- Building a Markdown-to-JSON/TypeScript/Tailwind token-generation pipeline.
- Introducing Storybook solely as part of this migration; Storybook setup may be tracked separately.
- Redesigning component APIs or adding unrelated variants unless separately approved.
- Treating documentation previews or imported reference material as production code.

## Requirements

### 1. Canonical architecture

- `cvp-primitives.css` is the only home for reusable raw palette and scale values.
- `cvp-semantic-tokens.css` defines purpose-based roles and resolves theme differences.
- `cvp-component-tokens.css` defines meaningful component override contracts.
- Component CSS must not consume primitive tokens or `--tc-*` tokens directly.
- Component tokens must resolve through semantic tokens unless an approved, documented local implementation value is required.

### 2. Legacy mapping inventory

- Create one machine-readable or auditable inventory of every supported `--tc-*` token.
- Reconcile the legacy token count across the ticket, bridge, audit output, and implementation-status documentation.
- Classify every mapping as one of:
  - safe rename with equivalent rendered value;
  - semantic reassignment;
  - visually changed mapping requiring design approval;
  - deprecated token requiring usage-by-usage replacement;
  - temporary fallback with an owner and removal condition.
- The alias bridge and migration inventory must not disagree.

### 3. Visual-change review gate

The following mapping categories require explicit Design Systems approval before a consuming product is migrated:

- backgrounds incorrectly mapped to foreground/text roles;
- hover and overlay surfaces whose rendered values change;
- scrim opacity changes;
- translucent borders becoming solid borders;
- default, subtle, disabled, or secondary text contrast changes;
- deprecated tokens without a direct semantic replacement.

Approval must be recorded in the pull request or linked design decision. A token alias existing in the bridge is not, by itself, approval of the resulting visual change.

### 4. Component migration

- Migrate components one family at a time.
- Use the component inventory and implementation-status document to track progress.
- Preserve public props and expected behavior unless a separate change is approved.
- Replace component-local token definitions when a governed CVP token exists.
- Do not introduce new raw colors, off-scale spacing, or undocumented radius values.
- Validate focus, disabled, invalid, hover, active, selected, loading, and read-only states where supported.

### 5. Compatibility and removal

- The bridge remains the only permitted definition site for `--tc-*` tokens.
- New code must not add or directly consume `--tc-*` tokens.
- Bridge aliases may be removed only when repository and downstream-product audits confirm zero remaining consumers.
- Bridge removal must be delivered as a separately reviewed breaking change.

### 6. Enforcement and reporting

- Add lint or CI checks that fail on new direct `--tc-*` usage outside the bridge.
- Add checks for unregistered CSS custom properties in migrated component code.
- Report hardcoded-value violations separately from the legacy-token migration so the two measures are not conflated.
- Update `docs/project/IMPLEMENTATION_STATUS.md` when a component family or migration phase changes state.
- Record approved exceptions with an owner, rationale, and intended resolution.

## Acceptance criteria

1. The production stylesheet imports the token layers in the documented order and both themes resolve without missing custom properties.
2. The legacy mapping inventory has a single reconciled token count and matches the definitions in `cvp-alias-bridge.css`.
3. Active CVP Design System source contains no direct `--tc-*` references outside `cvp-alias-bridge.css` and explicitly marked reference fixtures.
4. CI or linting rejects newly introduced `--tc-*` usage outside the bridge.
5. Migrated components consume approved semantic or component tokens and do not reference primitive tokens directly.
6. Every migrated component is verified in light and dark themes at its supported states and densities.
7. Mappings that alter rendered appearance have recorded Design Systems approval before merge.
8. Deprecated tokens without direct replacements have a usage-by-usage migration decision; they do not silently rely on a fallback alias.
9. The compatibility bridge remains in place until downstream audits confirm zero consumers; its removal is not required for this story to complete.
10. `docs/project/IMPLEMENTATION_STATUS.md` accurately distinguishes complete, in-progress, blocked, and follow-on work.
11. Documentation identifies the `--cvp-*` system as canonical and does not present legacy `--tc-*` tokens as valid choices for new work.
12. Build and token-audit checks pass with no unresolved missing-token references.

## Definition of done

- All acceptance criteria pass.
- Engineering and Design Systems have approved the reconciled migration inventory.
- The current component-migration boundary is documented.
- Visual-change approvals and intentional exceptions are traceable.
- Relevant build, lint, audit, theme, and accessibility checks pass.
- Follow-on work is represented by separate tickets rather than being left implicit in this story.

## Recommended subtasks

1. Reconcile the legacy token inventory and correct the 47/48/53 count discrepancy.
2. Add deprecated-token and unregistered-token lint enforcement.
3. Create the design-review board for visually changed mappings.
4. Complete remaining component-family migrations and theme verification.
5. Audit downstream products for direct `--tc-*` consumption.
6. Document approved exceptions and migration decisions.
7. Create a separate bridge-removal ticket after downstream usage reaches zero.
8. Create separate tickets for Storybook, visual-regression infrastructure, and any token-generation pipeline.

## Dependencies and risks

- **Design approval:** visually changed mappings cannot be treated as safe renames.
- **Downstream adoption:** bridge removal depends on product repositories outside this project.
- **Regression coverage:** removing aliases without product-level visual checks could create silent UI changes.
- **Scope control:** component improvements and foundation expansion must not be reported as completion of downstream product migration.
- **Traceability:** without a committed baseline, engineers cannot reliably distinguish inherited files from migration changes; the repository should establish a reviewed baseline before implementation PRs are split or handed off.

## Reference files

- `docs/tokens/CVP_TOKEN_ARCHITECTURE.md`
- `docs/tokens/TOKEN_DECISION_FRAMEWORK.md`
- `docs/tokens/TOKEN_GOVERNANCE.md`
- `docs/tokens/TOKEN_FOUNDATION_RECONCILIATION.md`
- `docs/project/IMPLEMENTATION_STATUS.md`
- `docs/specifications/DESIGN_SYSTEM_COMPONENT_INVENTORY.md`
- `src/styles/tokens/cvp-primitives.css`
- `src/styles/tokens/cvp-semantic-tokens.css`
- `src/styles/tokens/cvp-component-tokens.css`
- `src/styles/tokens/cvp-alias-bridge.css`

