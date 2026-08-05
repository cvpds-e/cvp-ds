# CVP Design System Specification

**Version:** 1.0 (Foundation pass)  
**Status:** Active — component sections to follow  
**Audience:** Engineers · Designers · QA · Storybook maintainers · AI tooling  
**Last updated:** 2026-07-23

---

## Executive Engineering Handoff

> This section is the engineering sign-off record for the CVP Design System Specification. It is addressed to engineering, QA, product design, and accessibility teams preparing to implement or validate CVP components.

### EH.1 Purpose of This Specification

This document is the single authoritative engineering specification for the CVP Design System. It defines what every component should look like, how it should behave, which tokens it must consume, how it must handle accessibility, and what tests it must pass.

It is the reference that allows an engineer to implement a component correctly the first time, a QA engineer to validate it systematically, and a product designer to verify that implementation matches intent — without inferring visual rules, token choices, or expected behaviour from code inspection alone.

### EH.2 Intended Audience

| Audience | Primary use |
|---|---|
| **Feature engineers** | Implement components and patterns according to specification; consume tokens correctly |
| **Design systems engineers** | Maintain the specification; manage token migration; enforce governance |
| **QA engineers** | Validate each component section against the States and Behaviour tables |
| **Product designers** | Verify visual and interaction intent; resolve specification gaps |
| **Accessibility specialists** | Validate WCAG requirements; remediate the gaps documented in each component section |
| **Product stakeholders** | Understand what is and is not implemented; prioritise remediation |

This document does **not** prescribe internal engineering tooling, test framework choice, CI configuration, or component library organisation. Those decisions remain with the engineering team.

### EH.3 Current Maturity

| Dimension | Status |
|---|---|
| **Specification completeness** | ✓ All 35 CVP publishable components documented · 14 design patterns documented · 3 internal utilities classified · 46 shadcn/ui primitives catalogued |
| **Token architecture (Tier 1–2)** | ✓ Complete — `cvp-primitives.css`, `cvp-semantic-tokens.css`, `cvp-alias-bridge.css` delivered |
| **Token architecture (Tier 3)** | ✓ Complete — `cvp-component-tokens.css` delivered for Button, Input, Avatar, Checkbox, Modal, Dropdown, Nav, Header, Breadcrumbs, Chip, Table, Toast, Rail Gallery |
| **Component token migration** | ✗ Phase 0 (audit) not started · Phase 2+ not started · All component implementations still reference legacy shorthand or unregistered tokens |
| **Storybook** | ✗ No `.storybook/` directory · No stories exist for any component |
| **Automated tests** | ✗ No unit, interaction, or accessibility tests for any CVP component |
| **Stylelint enforcement** | ✗ `token-registry.json` not generated · `stylelint-plugin-cvp-tokens` not configured |
| **WCAG validation** | ✗ Accessibility validation has not been performed for any component; gaps are documented per component but not independently confirmed |
| **Light theme** | ~ Available via `data-theme="light"` attribute; not validated in components (most use legacy tokens that bypass the theme mechanism) |

**Specification is the leading artefact. Implementation, testing, and tooling are all behind it.**

### EH.4 Scope Included

- All 35 CVP publishable components (Parts A–G)
- 14 design patterns (Design Patterns section)
- Component token contracts for all documented components
- Global engineering principles, visual rules, behaviour rules, accessibility requirements, motion standards, responsive standards (§§1–8)
- Appendix A — Component Coverage Matrix
- Appendix B — Engineering Enhancement Backlog

### EH.5 Scope Explicitly Excluded

- The 46 shadcn/ui primitives in `src/app/components/ui/` — catalogued for reference only; not CVP specifications
- Engineering tooling decisions (Storybook configuration, test framework, CI pipeline, component bundler)
- Internal utilities: `ThemeSwitcher`, `DesignSystemNav`, `ImageWithFallback` — classified and excluded from the publishable package
- Figma design files — Figma is the visual source of truth for geometry and colour decisions; this document captures decisions made there, not the files themselves
- `TOKEN_GOVERNANCE.md` process rules — the governance process is defined there, not here
- Typography, Layout, and Theming as standalone component families — these are addressed via global rules (§§3–4) and the `Layout` component section (Part G); a dedicated typography component (e.g. Text, Heading, Body) does not exist in the repository

### EH.6 How Engineers Should Use This Document

1. **Before implementing a component:** Read §§3–8 (global principles, visual rules, behaviour rules, accessibility, motion, responsive). These apply universally. Do not re-read them per-component — they are stated once and referenced in component sections.
2. **Implementing a component:** Open its section in Parts A–G. Work through the Visual Specification table to confirm token choices. Work through the States table to implement all applicable states. Work through the Known Gaps list to understand what is intentionally incomplete.
3. **Implementing a pattern:** Open the Design Patterns section. The pattern section explains composition and state coordination; individual component behaviour is in the relevant component section.
4. **Validating a component:** Use the States table as a checklist. Use the Accessibility sub-section for AT requirements. Use the Storybook requirements list to identify required test cases.
5. **Raising a gap:** If behaviour is unresolved, mark it with the correct label from §EH.11 and open a discussion with the appropriate owner (see Appendix B for owner types).
6. **Token questions:** Consult `CVP_TOKEN_ARCHITECTURE.md` for architecture rules and `TOKEN_GOVERNANCE.md` for the proposal process. Do not create tokens during implementation without following governance.

### EH.7 Source-of-Truth Precedence

When sources disagree, resolve in this order:

1. **This document** (after Design Systems team approval)
2. **Figma** (visual design intent; overrides text description where they conflict)
3. **`CVP_TOKEN_ARCHITECTURE.md`** (token naming, tier rules, and architecture)
4. **`TOKEN_GOVERNANCE.md`** (process rules)
5. **Current production behaviour** (may reflect a known gap, not the specification)

### EH.8 First Recommended Implementation Sequence

The following sequence minimises re-work — foundational infrastructure first, then pilot components, then full migration.

| Step | Work | Rationale |
|---|---|---|
| 1 | **Phase 0 audit** — Map all `--tc-*` and unregistered token usage per component | Required before any migration; produces the migration spreadsheet |
| 2 | **Stylelint enforcement** — Generate `token-registry.json`; configure `stylelint-plugin-cvp-tokens` | Gates further migration; prevents new hardcoded values |
| 3 | **Critical accessibility remediations** — Table semantic HTML, Modal focus trap, Tree ARIA, Accordion content ARIA | These are WCAG failures blocking QA sign-off for any screen using these components |
| 4 | **Phase 2 pilot migration** — `PrimaryButton`, `TextInput`, `Modal` (three simplest, highest-coverage components) | Validates the migration process before full rollout |
| 5 | **Phase 3 full migration** — All remaining 32 components in parallel PRs | One component per PR; visual regression required at each step |
| 6 | **Phase 4 cleanup** — Delete `cvp-alias-bridge.css`; publish v2.0 | Only after all lint warnings resolve to zero |

Storybook setup and visual regression tooling (Chromatic or Percy) are prerequisites for Phase 3 and should be running by the end of Phase 2.

### EH.9 Highest-Priority Component Gaps

| Priority | Component | Gap | WCAG? |
|---|---|---|---|
| P0 | Table | No semantic HTML — `<div>` throughout, no `<table>/<th>/<td>` | Yes — critical failure |
| P0 | Tree | No ARIA tree role or keyboard navigation | Yes — critical failure |
| P0 | Modal | No focus trap; no initial focus; no focus restoration | Yes — critical failure |
| P0 | Accordion | Height animation broken; content `role="region"` / `aria-labelledby` missing | Yes — partial failure |
| P1 | Toast | Auto-dismiss timer not paused on hover/focus; `role="alert"` on non-urgent variants | Yes |
| P1 | Filter | No Escape handler; no menu ARIA roles; no keyboard navigation in options | Yes |
| P1 | TagFilter | No `aria-pressed` on tag buttons | Yes |
| P1 | RailContentGallery | Selection checkbox has no ARIA role/state/label | Yes |
| P2 | LoginSignUp | Focus not moved to error on validation failure | Yes |
| P2 | SegmentQueryConfiguration | Filter ID collision bug on remove/re-add | No — data integrity |
| P2 | RailDetails | All action buttons are stubs with no handlers | No — functionality |

### EH.10 Highest-Priority Accessibility Gaps

| Priority | Requirement | Components affected | WCAG criterion |
|---|---|---|---|
| P0 | Semantic table structure (`<table>`, `<th>`, `<td>`, `scope`, `aria-sort`) | Table | 1.3.1 Info and Relationships |
| P0 | `role="tree"`, `role="treeitem"`, `aria-expanded`, `aria-level`, keyboard navigation | Tree | 4.1.2 Name, Role, Value |
| P0 | Focus trap in modal dialogs | Modal, ContentBrowserModal, SegmentQueryConfiguration | 2.4.3 Focus Order |
| P0 | Focus restoration after modal close | Modal, ContentBrowserModal, SegmentQueryConfiguration | 2.4.3 Focus Order |
| P1 | Timer pause on hover/focus for auto-dismissed regions | Toast | 2.2.1 Timing Adjustable |
| P1 | Escape closes menus, dropdowns, and filter panels | Filter, HeaderNavigation, Select | 2.1.2 No Keyboard Trap (inverse) |
| P1 | Skip-to-main navigation link | Navigation Shell (App.tsx) | 2.4.1 Bypass Blocks |
| P1 | `aria-pressed` on all toggle-style buttons | TagFilter, Accordion (implicit), all toggle buttons | 4.1.2 |
| P1 | `prefers-reduced-motion` on all animated components | RailContentGallery, Accordion, Filter, Toast, Modal | 2.3.3 Animation from Interactions |
| P2 | Mobile navigation substitute at ≤768px | Navigation Shell, RailDetails | 2.1.1 Keyboard |
| P2 | `aria-live` for async status changes (loading, selection count, filter results) | Table, Filter, RailContentGallery, Form | 4.1.3 Status Messages |

### EH.11 Highest-Priority Token Gaps

| Priority | Gap | Affected components | Action |
|---|---|---|---|
| P0 | Phase 0 audit not started — no `--tc-*` usage map exists | All | Engineering: run Phase 0 audit |
| P0 | No Stylelint enforcement — new hardcoded values can be added undetected | All | Engineering: configure lint |
| P1 | Token inconsistency: Toast `danger` variant maps to `--cvp-color-error-surface` instead of `--cvp-color-state-danger-bg` | Toast | Design Systems: correct token target |
| P1 | `--cvp-color-surface-selected` referenced in HeaderNavigation spec — token not defined in architecture; correct token is `--cvp-color-surface-active` | HeaderNavigation | Design Systems: resolve token name |
| P1 | `--cvp-color-surface-placeholder` referenced as migration target in RailContentGallery — not in architecture taxonomy | RailContentGallery | Design Systems: add token or remap |
| P1 | Filter, FilterGroup, TagFilter, SegmentQueryConfiguration, RailDetails tokens all unregistered — 70+ component-specific tokens not in `cvp-component-tokens.css` | 5 domain components | Engineering + Design Systems: Phase 2/3 migration |
| P2 | Focus ring in components uses `--focus-ring` (Tailwind shorthand) not `--cvp-focus-ring-color` (CVP token) | All components | Engineering: Phase 2+ migration |
| P2 | `--background`, `--foreground`, `--border`, `--muted` etc. consumed directly — these are Tailwind tokens, not CVP semantic tokens | All components | Engineering: Phase 2+ migration |

### EH.12 Known Architectural Constraints

1. **Alias bridge is the compatibility layer.** `cvp-alias-bridge.css` aliases all 53 `--tc-*` tokens to their `--cvp-*` equivalents. This means existing components work today without changes. The bridge will be removed in Phase 4 — any component not migrated by then will break.
2. **Tailwind shorthand tokens.** The components' CSS uses `--background`, `--foreground`, `--border`, and `--muted` — Tailwind CSS custom properties defined in `src/styles/index.css`. These are not CVP tokens. They happen to resolve to similar values because `src/styles/theme.css` maps them to compatible colours. This equivalence is accidental, not architecturally guaranteed, and will diverge after Phase 2 migration.
3. **No `token-registry.json` exists.** The Stylelint plugin described in `TOKEN_GOVERNANCE.md` requires a registry file generated from the CSS source files. This script (`scripts/build-token-registry.js`) is referenced in governance docs but does not exist in the repository. Enforcement cannot be enabled until this script is created.
4. **`LoginSignUp` and `LoginSignUpLight` are two separate files.** Theme duality should be expressed via `data-theme` tokens. Unification is pending a Design Systems decision (OQ-4).
5. **`CHANGELOG.md` does not exist.** Token governance requires it for every token change. Until it exists, version history is untracked.

### EH.13 Unresolved Design Decisions

| ID | Decision | Impact if unresolved | Owner |
|---|---|---|---|
| OQ-1 | Modal rendering strategy — Radix Dialog or custom portal | Affects focus trap implementation plan | Engineering |
| OQ-2 | CVP Toast vs. sonner co-existence | Duplication risk; unclear which API engineers should use | Design Systems |
| OQ-3 | MiscInput vs TextInput boundary | Risk of engineers choosing wrong component | Design Systems + Product Design |
| OQ-4 | LoginSignUp light/dark unification | Maintenance burden of two parallel files | Design Systems |
| OQ-5–6 | Filter + Tree token registration | Token gap blocks Phase 3 | Design Systems |
| OQ-8 | shadcn/ui integration policy | 46 primitives are in the repo with no adoption guidance | Cross-functional |
| — | `danger` button variant | Destructive confirmation pattern requires it; not implemented | Design Systems + Engineering |
| — | Bulk action bar canonical placement | Data Table workflow has no canonical bar styling | Design Systems |
| — | Loading indicator component | No CVP spinner; shadcn `Skeleton` available | Design Systems |
| — | Mobile navigation (Sheet/Drawer) | ≤768px navigation is broken | Engineering + Product Design |

### EH.14 Terminology Reference

These pairs are frequently confused. The distinction is architectural and affects token selection.

| Pair | Rule |
|---|---|
| **error** vs **danger** | `error` = validation/system failure state. `danger` = destructive action about to be taken. Dark theme uses different hues. In light theme they may look the same — the semantic distinction must be preserved regardless. |
| **overlay** vs **scrim** | `scrim` = blocking backdrop behind a modal (`--cvp-color-overlay-scrim`). `overlay` is used in three other contexts: floating panel surface (`color-surface-overlay`), interactive hover/press fill (`color-interactive-overlay`), media thumbnail overlay (`color-gallery-overlay`). |
| **selected** vs **active** | `active` = pointer-down momentary state (`color-surface-active`). `selected` = persistent selection state — a row in a table, a checked tag, a pinned item. The CVP token `color-surface-active` covers both pressed and selected fills. There is no separate `color-surface-selected` token. |
| **loading** vs **processing** | `loading` = UI waiting for an async operation to complete (API call, form submit). The component is interactive but waiting. `processing` = an external job running on content (video transcode, image resize). Processing is a content-state, not a UI state. No CVP processing-status component exists. |
| **strong** vs **bold** | For borders: `strong` is a medium-emphasis step; `bold` is heavier. `border-strong` < `border-bold` in visual weight. |
| **default** vs **primary** | For surfaces and brand: `default` = base/unmodified state. For text: `primary` = top of typographic hierarchy. `primary` is reserved for hierarchy; `default` for states. |
| **component** vs **pattern** | A component is a self-contained, reusable UI element with a defined API. A pattern is a composition of components solving a recurring product problem. Patterns do not have their own implementation file. |

### EH.15 Definition of Ready

A component is ready for engineering when all of the following are true:

- [ ] Purpose and intended use are clear
- [ ] Anatomy is defined with named elements
- [ ] Supported variants and sizes are known
- [ ] Visual styles and token mapping are identified
- [ ] All applicable states are defined
- [ ] Expected behaviour (hover, focus, keyboard, disabled) is documented
- [ ] Accessibility requirements are documented
- [ ] Responsive expectations are documented
- [ ] Unresolved decisions are explicitly listed (not silently assumed)
- [ ] Implementation dependencies (parent components, tokens) are known

### EH.16 Definition of Done

A component implementation is complete when all of the following are true:

- [ ] Implementation matches the approved specification
- [ ] Token usage follows the three-tier architecture — no `--tc-*`, no raw hex values, no unregistered tokens
- [ ] All applicable variants and states are implemented
- [ ] Mouse, keyboard, and touch behaviour matches the specification
- [ ] Focus behaviour is correct (`focus-visible`, not `focus`)
- [ ] Responsive behaviour is validated at all documented breakpoints
- [ ] Light and dark themes are validated
- [ ] Accessibility requirements are validated (axe, manual keyboard test, AT smoke test)
- [ ] `prefers-reduced-motion` behaviour is correct
- [ ] Long content and missing content are handled (long labels, missing images, absent optional slots)
- [ ] Loading, empty, and error states are handled where applicable
- [ ] The component coverage matrix (Appendix A) is updated
- [ ] Known limitations are documented in the component's Known Gaps section

---

## Contents

1. [Purpose and Scope](#1-purpose-and-scope)
2. [How to Use This Document](#2-how-to-use-this-document)
3. [Global Engineering Principles](#3-global-engineering-principles)
4. [Global Visual Rules](#4-global-visual-rules)
5. [Global Behaviour Rules](#5-global-behaviour-rules)
6. [Accessibility Requirements](#6-accessibility-requirements)
7. [Motion Standards](#7-motion-standards)
8. [Responsive Standards](#8-responsive-standards)
9. [Storybook Standards](#9-storybook-standards)
10. [Component Specification Template](#10-component-specification-template)
11. [Contribution Workflow](#11-contribution-workflow)
12. [PR Checklist](#12-pr-checklist)

---

## 1. Purpose and Scope

### 1.1 What This Document Is

This document is the canonical engineering specification for the CVP Design System. It defines how every component should look, how it should behave, which tokens it must consume, how it must handle accessibility, and what tests it must pass.

It is the reference that lets an engineer build a component correctly the first time, a QA engineer validate one systematically, a Storybook maintainer identify missing stories, and an AI tool generate token-correct markup without guessing.

### 1.2 Scope

This document covers every component listed in `DESIGN_SYSTEM_COMPONENT_INVENTORY.md`. It does not cover the 46 shadcn/ui primitives in `src/app/components/ui/` unless a primitive has been styled with CVP tokens and promoted to a CVP component.

### 1.3 Relationship Between Sources

The CVP Design System spans several artefacts that must be kept in agreement. The table below defines their roles.

| Artefact | Role | Who updates it |
|---|---|---|
| **This document** (`DESIGN_SYSTEM_SPECIFICATION.md`) | Canonical engineering specification. Defines correct behaviour and appearance. | Design Systems team |
| `DESIGN.md` | Design-facing token specification. Pre-dates the `--cvp-*` namespace; retained as historical reference. Not authoritative for token names. | Design Systems team (on deprecation) |
| Figma (via `FIGMA_DESIGN_SYSTEM_GUIDE.md`) | Visual design source of truth for geometry, spacing, and colour decisions. | Design lead |
| `CVP_TOKEN_ARCHITECTURE.md` | Token system architecture, tier definitions, layering rules, and governance. | Design Systems Engineering |
| `TOKEN_GOVERNANCE.md` | Ownership, proposal process, versioning, deprecation, lint rules, WCAG compliance thresholds. | Design Systems lead |
| `TOKEN_DECISION_FRAMEWORK.md` | Decision tree for creating vs. reusing tokens. | Design Systems Engineering |
| `IMPLEMENTATION_STATUS.md` | Phase progress, outstanding work, and architectural decisions made during implementation. | Design Systems Engineering |
| `src/styles/cvp-*.css` | Authoritative source of actual token values (Tier 1–3). | Design Systems Engineering |
| Storybook | Live catalogue of implemented states. Downstream of this spec — it validates, not defines. | Component authors |
| Component contracts (JSON) | Machine-readable token surface for AI tooling and automated audits. | Component authors |

### 1.4 Source-of-Truth Precedence

When sources disagree, resolve conflicts in this order:

1. **Approved component specification** (this document, after Design Systems team approval)
2. **Figma design + `DESIGN.md`** (design intent; Figma takes precedence over `DESIGN.md` where they conflict)
3. **Token architecture and governance** (`CVP_TOKEN_ARCHITECTURE.md`, `TOKEN_GOVERNANCE.md`)
4. **Current production behaviour** (what ships; may be a known gap, not the definition of correct)
5. **Storybook implementation** (reflects what was built, not necessarily what was specified)

**Discrepancies must be documented, not silently normalised.** If a Storybook story shows behaviour that differs from this specification, open an issue. If production behaviour differs from Figma, it is either an approved deviation (document it in §Known Gaps of the relevant component section) or a bug.

### 1.5 What This Document Does Not Replace

- `CVP_TOKEN_ARCHITECTURE.md` — do not duplicate token architecture rules here; link to them.
- `TOKEN_GOVERNANCE.md` — do not duplicate governance process; link to it.
- Figma — this document captures decisions made in Figma; it does not replace Figma as the design tool.

---

## 2. How to Use This Document

### 2.1 Implementing a New Component

1. Find the component in `DESIGN_SYSTEM_COMPONENT_INVENTORY.md` and confirm it is in scope.
2. Read §3 (Engineering Principles), §4 (Visual Rules), §5 (Behaviour Rules), §6 (Accessibility), §7 (Motion), §8 (Responsive) before writing any code.
3. Open the component's section in this document. If the section does not yet exist, request it or write it using the template in §10.
4. Identify all required tokens from the component's Visual Specification table. Confirm they exist in `cvp-component-tokens.css` before consuming them. If a token is missing, follow the proposal process in `TOKEN_GOVERNANCE.md` before writing a component-specific custom property.
5. Implement states in the order: default → hover → focus → active → disabled → error → loading → empty.
6. Validate accessibility using the checklist in §6.
7. Write Storybook stories following §9 before marking implementation complete.
8. Update or create the component's JSON contract.

### 2.2 Validating an Existing Component

1. Open the component section in this document.
2. Work through the States table row by row. Confirm each visual change and behaviour is present.
3. Work through the Visual Specification table. Confirm each token reference is correct — no hardcoded values, no unregistered tokens.
4. Run the component in both light and dark themes. Confirm the appearance matches both theme definitions.
5. Tab through the component with keyboard only. Confirm focus indicator is visible, order is logical, all interactive elements are reachable.
6. Resize viewport to 320px wide. Confirm no content is clipped or overlapping.
7. Set `prefers-reduced-motion: reduce`. Confirm all animations are suppressed or reduced.
8. Run the axe accessibility audit. All violations must be resolved before the component is marked Complete.

### 2.3 Enhancing an Incomplete Storybook Story

1. Open the component's Storybook requirements list (in its specification section or from the template in §10).
2. Identify which required stories are missing. Cross-reference the States table — every row that has a visual change requires a corresponding story or story arg.
3. Add missing stories. Follow the naming convention in §9.
4. Confirm the token arg table in the story maps to all Public override tokens listed in the component's token contract section.
5. Run interaction tests and visual regression snapshots for the new stories before pushing.

### 2.4 Proposing a New Variant

1. Check the component's Variants section. Confirm the variant does not already exist under a different name.
2. Check `TOKEN_DECISION_FRAMEWORK.md` to determine whether a new token is required.
3. Open a design review with a Figma frame showing the variant in both themes.
4. Once design is approved, add the variant to the component section of this document before writing code.
5. Follow the token proposal process in `TOKEN_GOVERNANCE.md` if new tokens are required.
6. Implement, add Storybook stories, update the JSON contract, update the PR checklist.

### 2.5 Fixing a Token Mismatch

A token mismatch is when a component references a token that is incorrect (wrong tier, wrong intent, or replaced by a different token).

1. Identify the incorrect reference and the correct replacement. The Visual Specification table in the component section is the source of truth for which token a given element should use.
2. Update the component token file (`cvp-component-tokens.css`) if the component token itself points to the wrong semantic token.
3. Update the component implementation if it bypasses the component token and references a wrong semantic or primitive token directly.
4. If the mismatch is a legacy `--tc-*` token, check `cvp-alias-bridge.css` for the correct `--cvp-*` replacement.
5. Run visual regression snapshots before and after. Confirm the change is intentional, not a visual regression.

### 2.6 Handling Undocumented Behaviour

If a component exhibits behaviour that is not covered by this specification:

1. Determine whether it is intentional (ask the original author) or accidental.
2. If intentional: add it to the component section under "Known gaps and follow-up work" with a note that it should be formally specified.
3. If accidental: treat it as a bug. Do not add it to the specification. Fix or deprecate it.
4. Never normalise undocumented behaviour by adding it to the spec without design review.

---

## 3. Global Engineering Principles

These principles apply to every component without exception. Exceptions require a written rationale in the component's Known Gaps section and approval from the Design Systems lead.

### 3.1 Token Consumption

**No raw colour values in component CSS.** No `#hex`, `rgb()`, `hsl()`, or `oklch()` value may appear in a component's style rules. All colour must come from a CSS custom property.

**No direct primitive consumption.** Component CSS must never reference `--cvp-primitive-*` tokens. Primitives are for the semantic layer only. See `CVP_TOKEN_ARCHITECTURE.md §3` for the tier contract.

**No legacy token consumption.** Component CSS must not reference `--tc-*` tokens. These are aliases that will be removed in a future major version. Use `--cvp-*` tokens only. Migration is tracked in `IMPLEMENTATION_STATUS.md`.

**No shorthand token consumption.** The old shorthand names (`--bg-page`, `--text-primary`, `--border-default`, `--input-border`, etc.) from `DESIGN.md` are not valid token names in the current architecture. They have no corresponding CSS custom property in the CVP token files. Do not use them in new code.

**Semantic vs. component token consumption.** Components consume Tier 3 component tokens for every value that is a customer override surface. Components consume Tier 2 semantic tokens directly for values where a pass-through component token would add zero value (no override hook needed). See `TOKEN_DECISION_FRAMEWORK.md §3 Example A` for a concrete case. Components never skip Tier 2 and Tier 3 to reference Tier 1 directly.

**Token classification within a component:**

| Classification | Meaning | Where defined |
|---|---|---|
| Public | Customer-facing override surface; documented in Storybook arg table | `cvp-component-tokens.css` |
| Internal | Platform implementation tokens; not part of the customer API | `cvp-component-tokens.css` |
| Direct semantic | Semantic token consumed directly by component CSS; no override hook | Referenced inline in component CSS |
| Local | Fixed geometry or layout with no theming purpose (e.g. a specific gap value) | Defined inline or via `--cvp-space-*` |

### 3.2 Backwards Compatibility

Do not rename or remove a public component token without following the deprecation process in `TOKEN_GOVERNANCE.md §Deprecation Process`. The deprecation comment, grace period, and removal release must all be defined before the PR is approved.

Do not change the behaviour of a prop without a major version bump or a documented deprecation path. Adding a new prop with a default that preserves current behaviour is always backwards-compatible.

### 3.3 Progressive Enhancement

Components must render a usable baseline state when CSS custom properties resolve to their initial value (empty string). Avoid component-level `@supports` guards unless a feature is explicitly experimental.

### 3.4 Responsive-by-Default

Every component must be tested at 320px viewport width before it is marked Complete. Components that wrap, truncate, or collapse at narrow viewports must document the threshold and the resulting layout explicitly in their Responsive Behaviour section.

### 3.5 Reduced Motion

Every component that animates must implement `@media (prefers-reduced-motion: reduce)`. Animated properties must either be disabled entirely or reduced to an instantaneous transition. See §7 for allowed motion tokens and reduced-motion rules.

### 3.6 Keyboard Accessibility

Every interactive element must be reachable and operable by keyboard alone. Tab order must follow DOM order unless there is a documented, ARIA-compliant reason to deviate. All actions available via mouse must be available via keyboard. See §6 for full keyboard requirements.

### 3.7 Native HTML Semantics First

Use the most semantically correct HTML element for the job. A button that performs an action is a `<button>`, not a `<div role="button">`. An input field is an `<input>`, not a `<div contenteditable>`. Apply ARIA only where native semantics are insufficient — ARIA supplements, it does not replace.

### 3.8 Controlled ARIA Use

Do not add ARIA attributes that duplicate the semantics of the host element. `<button aria-role="button">` is incorrect. Do not set `aria-label` on an element that already has a visible text label — use `aria-labelledby` instead. Every ARIA attribute in every component must have a documented reason in either this spec or the component's accessibility section.

### 3.9 Composability

Components must accept `className` (for Tailwind composition) and forward refs where the root element is an interactive or focusable element. Components must not set `overflow: hidden` on their root element unless explicitly required and documented — doing so breaks composed layouts.

### 3.10 Stable DOM and API Contracts

Do not change HTML structure in a way that breaks existing CSS selectors, test selectors, or ARIA relationships without a major version signal. Prefer adding a new element over restructuring existing ones. Data attributes used in tests (e.g. `data-testid`) must not be removed without coordination with the test suite.

### 3.11 Theme Independence

Components must be visually correct in both `[data-theme="light"]` and `[data-theme="dark"]` without any JavaScript. Theme switching is a CSS cascade operation on a `data-theme` attribute on a root element — see `EXPERIENCE_INFRASTRUCTURE.md §6`. Components must not detect or respond to the theme in JavaScript.

### 3.12 Testability

Every interactive state must be reachable programmatically. A component that only shows a hover style on pointer entry but provides no prop or attribute to force the hover state into tests is untestable. Prefer data attributes (e.g. `data-state="open"`) over class names for state signals consumed by tests. Storybook interaction tests must be able to drive every state without manual interaction.

---

## 4. Global Visual Rules

### 4.1 Typography

All type in CVP components must reference tokens from the `--cvp-font-*` scale. No component may define a `font-size`, `font-weight`, `line-height`, or `letter-spacing` as a raw value.

| Token group | Tokens | Use |
|---|---|---|
| Font family | `--cvp-font-family-sans` · `--cvp-font-family-mono` | UI text uses sans; code, tokens, and IDs use mono |
| Font size | `--cvp-font-size-xs` through `--cvp-font-size-3xl` | See size scale below |
| Font weight | `--cvp-font-weight-regular` · `medium` · `semibold` · `bold` | |
| Line height | `--cvp-line-height-tight` · `snug` · `normal` · `relaxed` · `loose` · `xl` | |
| Letter spacing | `--cvp-letter-spacing-tight` · `normal` · `none` · `wide` | |

**Size scale guidance (from repository evidence):**

| Label | Token | Typical use |
|---|---|---|
| XS | `--cvp-font-size-xs` | Captions, badges, helper text |
| S | `--cvp-font-size-sm` | Secondary labels, table cells |
| M | `--cvp-font-size-md` | Default body, form inputs, buttons |
| L | `--cvp-font-size-lg` | Section headings |
| XL+ | `--cvp-font-size-xl` and above | Page headings; use sparingly in components |

**Note:** The repository's documentation components reference a "Typescale M Regular" as the standard for form component labels. This corresponds to `--cvp-font-size-md` + `--cvp-font-weight-regular`.

### 4.2 Spacing

All margin, padding, and gap values must reference tokens from the `--cvp-space-*` scale.

| Token | Computed value (reference only — use token) | Typical use |
|---|---|---|
| `--cvp-space-0` | 0 | Reset / collapse |
| `--cvp-space-1` | 4px | Tight intra-element gap |
| `--cvp-space-2` | 8px | Small intra-element gap |
| `--cvp-space-3` | 12px | Medium intra-element gap |
| `--cvp-space-4` | 16px | Standard component padding |
| `--cvp-space-5` | 20px | Generous padding |
| `--cvp-space-6` | 24px | Section separation |
| `--cvp-space-8` | 32px | Large section separation |
| `--cvp-space-12` | 48px | Page-level separation |

Raw pixel values (e.g. `padding: 6px 8px`) are only acceptable as Local implementation values when the exact value has no semantic spacing equivalent and the value does not vary by theme. They must be defined as a component-local custom property, not hardcoded inline.

### 4.3 Border Radius

| Token | Use |
|---|---|
| `--cvp-radius-xs` | Small badges, chips, tight tags |
| `--cvp-radius-sm` | Buttons, inputs, small cards |
| `--cvp-radius-md` | Standard cards, modals, dropdowns |
| `--cvp-radius-lg` | Large cards, panels |
| `--cvp-radius-xl` | Floating containers |
| `--cvp-radius-full` | Pill/avatar shapes |

Interactive components (buttons, inputs) use `--cvp-radius-sm` by default unless the component specification states otherwise.

### 4.4 Borders

| Context | Token |
|---|---|
| Default border | `--cvp-color-border-default` |
| Subtle / muted border | `--cvp-color-border-subtle` |
| Strong emphasis | `--cvp-color-border-strong` |
| Heavy emphasis | `--cvp-color-border-bold` |
| Disabled element | `--cvp-color-border-disabled` |
| Validation error | `--cvp-color-border-error` |
| Brand / interactive | `--cvp-color-border-brand` |
| Success state | `--cvp-color-border-success` |
| Warning state | `--cvp-color-border-warning` |
| Danger (destructive) | `--cvp-color-border-danger` |

All borders must use `border-color` as a separate property, not the `border` shorthand with a hardcoded width. Border width is a Local implementation value; document the pixel value in the component section if it deviates from `1px`.

### 4.5 Elevation (Shadows)

| Token | Use |
|---|---|
| `--cvp-shadow-sm` | Subtle lift; input prefix elements, small chips |
| `--cvp-shadow-md` | Standard dropdown, popover, menu |
| `--cvp-shadow-lg` | Large floating panel |
| `--cvp-shadow-modal` | Modal overlay |

Components that do not float above the document (buttons, inputs, inline badges) should use `none`. Do not use `box-shadow` for focus rings — use the focus token system (§4.6).

### 4.6 Focus Rings

Focus rings are a universal pattern. All interactive components must implement the same focus token set.

| Token | Use |
|---|---|
| `--cvp-focus-ring-color` | `outline-color` of the focus ring |
| `--cvp-focus-ring-width` | `outline-width` of the focus ring |
| `--cvp-focus-border-color` | Border colour change on focus (supplements the ring) |
| `--cvp-focus-glow-color` | `box-shadow` glow underneath the ring |
| `--cvp-focus-glow-width` | `box-shadow` blur/spread of the glow |

**Implementation pattern (apply to every focusable element):**

```css
:focus-visible {
  outline: var(--cvp-focus-ring-width) solid var(--cvp-focus-ring-color);
  outline-offset: 2px;
  box-shadow: 0 0 var(--cvp-focus-glow-width) var(--cvp-focus-glow-color);
}
```

Use `:focus-visible`, not `:focus`. This ensures keyboard users see the ring while pointer users do not.

**WCAG requirement:** The focus indicator must have a minimum contrast ratio of 3:1 against adjacent colours (WCAG 2.4.11). The `--cvp-focus-ring-color` value was validated at design time — do not override it with a lower-contrast value in a component token.

### 4.7 Icon Sizing

| Context | Size | Notes |
|---|---|---|
| Inline with body text (M) | 16px | Aligns to line-height |
| Inline with heading text (L) | 20px | |
| Icon button (default) | 20px | |
| Icon button (small) | 16px | |
| Status / feedback icons | 20px | Toast, NotificationBanner |
| Navigation icons | 20px | HeaderNavigation, PageSideNav |

Icons must use `currentColor` for their fill/stroke so they inherit the text token colour of their parent. Do not hardcode icon colours. Use `--cvp-color-icon-*` tokens for icons that require a colour distinct from the surrounding text.

| Icon colour token | Use |
|---|---|
| `--cvp-color-icon-default` | Standard icon in most contexts |
| `--cvp-color-icon-strong` | Emphasised icon |
| `--cvp-color-icon-muted` | Secondary / trailing icon |
| `--cvp-color-icon-disabled` | Icon on disabled element |
| `--cvp-color-icon-inverse` | Icon on dark/brand surface |
| `--cvp-color-icon-error` | Validation error icon |
| `--cvp-color-icon-brand` | Brand-coloured icon |
| `--cvp-color-icon-success` | Success state icon |
| `--cvp-color-icon-warning` | Warning state icon |
| `--cvp-color-icon-danger` | Destructive action icon |

### 4.8 Disabled Appearance

All disabled components must:

- Use `--cvp-color-text-disabled` for text content.
- Use `--cvp-color-border-disabled` for borders.
- Use `--cvp-color-surface-disabled` for background surfaces.
- Use `--cvp-color-icon-disabled` for icon fills.
- Set `cursor: not-allowed` on the root element or the nearest interactive descendant.
- Set `pointer-events: none` only when `cursor: not-allowed` cannot propagate.
- Not receive keyboard focus (add `disabled` attribute on native elements, `aria-disabled="true"` + `tabindex="-1"` on custom elements).

Opacity-based disabled treatment (`opacity: var(--cvp-opacity-disabled)`) is acceptable as an alternative only when dedicated disabled token values do not exist for the component and is documented as a temporary gap.

### 4.9 Hover Appearance

| Element type | Hover token |
|---|---|
| Surface / container background | `--cvp-color-surface-hover` |
| Interactive overlay (button, menu item) | `--cvp-color-interactive-overlay` |
| Text colour shift | Defined per component |
| Border colour shift | Defined per component |
| Icon colour shift | Defined per component |

Hover transitions must use `transition: background-color var(--cvp-motion-duration-fast) var(--cvp-motion-easing-standard)`. Do not use `transition: all`.

### 4.10 Active (Pointer Down) Appearance

| Element type | Active token |
|---|---|
| Surface / container background | `--cvp-color-surface-active` |
| Interactive overlay | Deeper than hover; defined per component |

Active state is a momentary (pointer-down) visual change. It must not be confused with the selected/on state (which persists after interaction).

### 4.11 Error vs. Danger — Terminology

This is a firm distinction in the CVP token system. Misusing these terms creates incorrect token choices.

| Term | Meaning | Token prefix | Example |
|---|---|---|---|
| **Error** | Validation failure or system feedback state | `--cvp-color-*-error` | "This field is required"; API failure banner |
| **Danger** | Destructive action the user is about to take | `--cvp-color-*-danger` | "Delete this item" button; "Remove member" action |

In dark theme, `error` and `danger` use different hues. In light theme they may share a hue — but the distinction is semantic and must be preserved in token naming regardless of their current resolved value.

### 4.12 Overlays and Scrims

| Token | Use |
|---|---|
| `--cvp-color-overlay-scrim` | Modal/dialog backdrop that blocks interaction |
| `--cvp-color-surface-overlay` | Floating panel surface (dropdown, popover, menu) |
| `--cvp-color-interactive-overlay` | Translucent hover/active fill on items within a container |
| `--cvp-color-gallery-overlay` | Media thumbnail overlay |

`overlay-scrim` is applied as a `background-color` on a full-viewport backdrop element positioned between the page and the modal. It is not applied to the modal surface itself.

`surface-overlay` is the background of a floating panel. It uses the raised surface token in light theme and the raised surface value in dark.

Scrim opacity must come from `--cvp-opacity-scrim-dark` (dark theme) or `--cvp-opacity-scrim-light` (light theme) — do not hardcode `rgba()` opacity in component CSS. The `--cvp-color-overlay-scrim` token already encodes the correct opacity as a complete rgba value.

### 4.13 Light and Dark Themes

Both themes are supported. Dark theme is the production baseline. Light theme is defined in `src/styles/light-theme.css`.

Theme is activated via `data-theme` on a root element:

```html
<!-- Dark (default) -->
<html data-theme="dark">

<!-- Light -->
<html data-theme="light">
```

Class-based fallbacks `.dark-theme` and `.light-theme` are also supported. No JavaScript is required for built-in themes.

Components must not contain any conditional logic based on the detected theme. If a component needs different geometry in different themes, that difference must be expressed via a semantic or component token that resolves differently per theme — not via a JavaScript theme check.

### 4.14 Density

The CVP system currently defines one density level. Density variants (compact, comfortable, spacious) are a **Specification gap** — they are referenced in no current component implementation and are not defined in the token system. Do not add density props to components until this gap is resolved.

### 4.15 Touch Targets

Every interactive element must have a minimum tap target of **44×44px** (WCAG 2.5.5, Level AAA). When the visible element is smaller (e.g. a 16px icon button), the tap target must be extended invisibly via `padding`, `min-height`/`min-width`, or an absolutely positioned pseudo-element. The extended tap area must not clip or overlap adjacent elements.

---

## 5. Global Behaviour Rules

### 5.1 Hover

- Hover state activates on `mouseenter` / `pointerenter`.
- Hover state deactivates on `mouseleave` / `pointerleave`.
- Hover must not activate on keyboard focus (use `:hover` selector only, not combined with `:focus`).
- Hover background transitions use `var(--cvp-motion-duration-fast)`.
- Hover is suppressed on disabled elements (`pointer-events: none` or `disabled` attribute).

### 5.2 Pointer Down

- Active state activates on `mousedown` / `pointerdown`.
- Active state deactivates on `mouseup` / `pointerup`.
- If the pointer moves outside the element before `pointerup`, the active state deactivates without triggering the action.

### 5.3 Keyboard Activation

- `Space` and `Enter` activate button-role elements.
- `Enter` alone activates link-role elements.
- `Space` alone activates checkbox-role and switch-role elements.
- Arrow keys navigate within composite widgets (radio groups, tab lists, segmented controls, menus).
- Keyboard activation follows the same visual feedback cycle as pointer activation (active state flash if the component implements one).

### 5.4 Focus-Visible

- Focus rings appear on `:focus-visible` only, not on `:focus`.
- This means pointer interactions do not show the ring; keyboard interactions do.
- The exception is any context where `any-pointer: coarse` applies (touch-primary devices) — add the ring on `:focus` in that context as well.

### 5.5 Disabled

- Disabled elements receive no hover, active, or focus visual changes.
- Disabled elements must not dispatch click or change events.
- On native `<button>`, `<input>`, `<select>`, `<textarea>`: add the `disabled` HTML attribute.
- On custom interactive elements: add `aria-disabled="true"` and `tabindex="-1"`.
- Disabled elements are exempt from contrast requirements (WCAG 1.4.3 exception).

### 5.6 Read-Only

**Specification gap.** `read-only` / `readonly` behaviour is present on `<input readonly>` and `<textarea readonly>` natively but no CVP component explicitly documents a read-only visual state or token. The distinction from disabled must be specified per-component as components are documented.

### 5.7 Loading

- A loading state indicates an asynchronous operation is in progress.
- The element must be inert during loading (not accept user interaction).
- A visible loading indicator (spinner, skeleton, or progress bar) must be present. It must not be colour-only.
- Loading state must include `aria-busy="true"` and suppress interactive ARIA roles where appropriate.
- Loading motion must respect `prefers-reduced-motion: reduce` (see §7).
- **Specification gap:** No shared loading spinner or skeleton component exists in the CVP component layer. Components that need loading behaviour currently implement it independently. A shared pattern is required before components can be considered complete.

### 5.8 Selected

- Selected state (`aria-selected="true"` or `aria-checked="true"`) must be distinguishable from unselected by more than colour alone (pattern, icon, or weight change required for WCAG 1.4.1).
- Selected state must persist after the interaction ends.
- Selected state must be communicated to screen readers via the appropriate ARIA attribute, not via visual-only means.

### 5.9 Expanded

- Expanded state (`aria-expanded="true"`) must be present on the trigger element when a disclosure panel (accordion, dropdown, collapsible section) is open.
- The trigger must remain reachable and focusable in both expanded and collapsed states.
- Closing a disclosure panel must return focus to the trigger (see §5.16).

### 5.10 Error State

- Error state is for validation failures and system errors — not destructive actions (use danger for those; see §4.11).
- An error message must be associated with the input via `aria-describedby`.
- The error icon must have an `aria-label` or be accompanied by visible text — not colour alone.
- Border, background, and text tokens all shift to `--cvp-color-border-error`, `--cvp-color-state-error-bg`, and `--cvp-color-state-error-text` respectively.
- Error state must be programmatically settable (via a prop), not only derivable from form validation.

### 5.11 Success State

- Success state confirms a completed operation.
- Token: `--cvp-color-state-success-bg`, `--cvp-color-state-success-border`, `--cvp-color-state-success-text`.
- May be transient (auto-clears after a duration) or persistent. Document which per component.

### 5.12 Destructive Actions

A destructive action permanently deletes, removes, or cannot be undone.

**Required pattern:**
1. Trigger — a Danger-variant button or menu item labelled with the action (e.g. "Delete rail").
2. Confirmation — a Modal containing: a clear description of what will be destroyed, a secondary Cancel action, and a primary Danger button to confirm.
3. The Danger button in the confirmation Modal is the only element that executes the action.

Single-step destructive actions (no confirmation) are only permitted when the action is immediately reversible (e.g. "Remove tag" where undo is instant and visible).

**Specification gap:** No Danger variant exists on the CVP Button or Modal components. Token `--cvp-color-text-danger` and `--cvp-color-border-danger` exist in the semantic layer but no component token set has been defined for a Danger button. This must be resolved before any feature using destructive actions can be considered token-complete.

### 5.13 Asynchronous Actions

- Show a loading indicator immediately on action trigger (do not wait for the response to arrive).
- Disable the triggering element during the async operation to prevent double-submission.
- On success: restore the element state; show a Toast or NotificationBanner confirming the action.
- On failure: restore the element state; show an error Toast or NotificationBanner; do not silently swallow the error.
- If the operation takes more than 10 seconds, provide a way to cancel it.

### 5.14 Escape Behaviour

- `Escape` closes any overlay that is open (Modal, dropdown menu, popover, date picker).
- `Escape` cancels any in-progress edit or selection without applying it.
- `Escape` must return focus to the element that triggered the overlay (see §5.16).
- `Escape` must not close a nested overlay and a parent overlay simultaneously — only the topmost overlay closes.

### 5.15 Outside-Click Behaviour

- Clicking outside a floating overlay (dropdown, popover, date picker) must dismiss it.
- Clicking outside a Modal must not dismiss it by default — the dismiss mechanism is the explicit close button or `Escape`. Exception: components may provide an `onBackdropClick` prop for use cases where backdrop-click dismiss is appropriate, but it must be opt-in.

### 5.16 Focus Restoration

- When an overlay (Modal, dropdown, popover) closes, focus must return to the element that triggered it.
- When a disclosure panel (accordion item, collapsible) collapses, focus must remain on the trigger.
- When an item is removed from a list (tag removed, table row deleted), focus must move to the next logical item, or to the list container if no items remain.

### 5.17 Scroll Locking

- Opening a Modal or full-screen overlay must prevent the document body from scrolling.
- Scroll locking must be released when the overlay closes — including when closed via `Escape` or programmatically.
- On iOS, scroll locking requires additional treatment (`position: fixed` on body with saved scroll position). This is a **Specification gap** — the current `Modal.tsx` implementation's cross-browser scroll-lock behaviour is not confirmed.

### 5.18 Text Overflow

- Truncated text must be accompanied by a `title` attribute or a tooltip on hover showing the full text.
- Truncation is `text-overflow: ellipsis` with `overflow: hidden` and `white-space: nowrap` — never use JavaScript to slice strings.
- Components must document their truncation behaviour (which elements truncate, at what width) in their Responsive Behaviour section.

### 5.19 Responsive Collapse

- Components that collapse at narrow viewports must define the exact viewport threshold in their Responsive Behaviour section.
- Repository evidence shows three breakpoints in use: **1024px**, **768px**, **640px**. Treat these as the current CVP breakpoints until a formal breakpoint scale is defined.
- Collapsed navigation (HeaderNavigation, PageSideNav) must still provide full access to all navigation destinations — a hamburger menu or drawer may be used but must be fully keyboard-accessible.

---

## 6. Accessibility Requirements

### 6.1 Semantic HTML

Every component must use the most appropriate HTML element for its role. The correct element eliminates the need for ARIA and provides native keyboard and screen-reader support.

| Component pattern | Correct element |
|---|---|
| Action that does not navigate | `<button>` |
| Action that navigates | `<a href="...">` |
| Text field | `<input type="text">` (or appropriate type) |
| Multi-line text | `<textarea>` |
| Selection from a list | `<select>` or `<input role="combobox">` with listbox |
| Checkbox | `<input type="checkbox">` |
| Radio selection | `<input type="radio">` within `<fieldset>` |
| Toggle/switch | `<input type="checkbox" role="switch">` |
| Accordion trigger | `<button>` within a heading element |
| Tab | `<button role="tab">` within `<div role="tablist">` |
| Alert | `<div role="alert">` (auto-announced by screen readers) |
| Dialog | `<dialog>` or `<div role="dialog">` with focus trap |
| Navigation landmark | `<nav>` |

### 6.2 Accessible Names

Every interactive element must have an accessible name — what a screen reader announces when the element receives focus.

- **Preferred:** Visible label text (automatically associated via `<label for>` or proximity).
- **Acceptable:** `aria-label` on elements with no visible text (e.g. icon-only buttons).
- **Acceptable:** `aria-labelledby` pointing to a visible heading or label element.
- **Not acceptable:** No accessible name (results in axe `button-name` or `label` violation).

Icon-only buttons must have `aria-label="[action name]"`. The label must describe the action, not the icon shape. Use "Close" not "X". Use "Delete row" not "Trash".

### 6.3 Descriptions

When an element needs supplementary information beyond its name (e.g. a helper text below an input), associate it via `aria-describedby` referencing the ID of the description element. An error message is always associated this way — `aria-describedby` must point to the error message ID when the error state is active.

### 6.4 Error Association

```html
<input
  id="email-input"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">
  Please enter a valid email address.
</span>
```

- `aria-invalid="true"` marks the input as in error.
- `aria-describedby` links the input to its error message.
- `role="alert"` on the error message ensures it is announced immediately on appearance.

### 6.5 Keyboard Navigation

| Pattern | Expected keyboard behaviour |
|---|---|
| Button | `Tab` to focus; `Enter` or `Space` to activate |
| Link | `Tab` to focus; `Enter` to follow |
| Checkbox | `Tab` to focus; `Space` to toggle |
| Radio group | `Tab` into group; arrow keys to move within group; `Tab` to exit |
| Tab list | `Tab` into list; `←`/`→` to move between tabs; `Tab` to move into panel |
| Accordion | `Tab` to each trigger; `Enter` or `Space` to expand/collapse |
| Menu / dropdown | `Tab` or `Enter`/`Space` to open; `↑`/`↓` to move; `Enter` to select; `Escape` to close |
| Segmented control | `Tab` into group; `←`/`→` to move between options |
| Modal | `Tab` / `Shift+Tab` within trap; `Escape` to close |
| Tree | `Tab` into tree; `↑`/`↓` to move; `→` to expand; `←` to collapse; `Enter` to select |
| Table with selection | `Tab` into table; `Space` to select row; `Shift+click` for range selection |

### 6.6 Focus Order

Focus order must follow the visual reading order (top-to-bottom, left-to-right for LTR). Do not use `tabindex` values greater than 0. Use `tabindex="0"` to add custom elements to the tab order and `tabindex="-1"` to remove elements from the tab order programmatically.

### 6.7 Focus Trapping

Modal dialogs and other overlay patterns that block background interaction must trap focus. While a Modal is open:

- `Tab` and `Shift+Tab` cycle through focusable elements within the Modal only.
- Clicking outside the Modal does not move focus outside it.
- Screen reader virtual cursor should be constrained to the Modal (`aria-modal="true"` on the dialog element).

When the Modal closes, focus returns to the trigger (§5.16).

### 6.8 Contrast

| Context | Minimum | Target |
|---|---|---|
| Body text, labels | 4.5:1 (AA) | 7:1 (AAA) |
| Large text (≥18pt or ≥14pt bold) | 3:1 (AA) | 3:1 (AA) |
| Interactive elements (buttons, links, focus rings) | 4.5:1 (AA) | 7:1 (AAA) |
| Non-text UI (icons, input borders, dividers) | 3:1 (AA non-text) | 3:1 (AA non-text) |
| Disabled states | Exempt | Exempt |

Contrast must be validated against all surfaces a token can appear on (default surface, raised surface, overlay surface — in both themes). This is a pre-merge gate, not a post-hoc check. See `TOKEN_GOVERNANCE.md §WCAG Compliance Requirements` for the full policy.

### 6.9 Non-Text Contrast

Input borders, focus rings, and status icons must meet 3:1 contrast against adjacent background colours. `--cvp-focus-ring-color` was validated at design time. Input borders in the default state must be validated per component.

### 6.10 Disabled Semantics

- Add `disabled` attribute to native form elements — this removes them from focus order and suppresses events natively.
- Add `aria-disabled="true"` + `tabindex="-1"` to non-native interactive elements in the disabled state.
- Do not add `aria-disabled` to static elements (headings, paragraphs, containers) — it has no semantic effect there.
- Screen readers must announce "dimmed" or "unavailable" for `aria-disabled` elements — confirm this in the accessibility test for each component.

### 6.11 Live Regions

Use `role="alert"` for critical messages that must be announced immediately (form errors, destructive confirmations, system notifications).

Use `role="status"` (or `aria-live="polite"`) for non-critical updates (success messages, count updates, loading completion).

Do not use `aria-live="assertive"` unless the message must interrupt the user immediately (reserved for `role="alert"` equivalents).

### 6.12 Reduced Motion

For users who have `prefers-reduced-motion: reduce` set in their OS, all animations must be suppressed or replaced with instantaneous state changes. See §7.5 for implementation requirements.

### 6.13 Screen Reader Announcements

Every state change that carries meaningful information must be announced to screen readers either via:
- A naturally announced element (e.g. `role="alert"` appearing in the DOM), or
- An `aria-live` region that already exists in the DOM and receives updated text content.

Do not rely on visual-only feedback (colour change, icon change) as the sole signal of a state change.

### 6.14 Touch Targets

Minimum 44×44px as defined in §4.15. On touch-primary viewports, increase spacing between adjacent interactive elements to prevent accidental activation of the wrong target.

### 6.15 High Zoom and Reflow

At 200% browser zoom, all content must remain readable and interactive without horizontal scrolling (WCAG 1.4.4). At 400% zoom (WCAG 1.4.10 Reflow), content must reflow to a single column without loss of content or functionality. Test at 320px CSS width (the 400% equivalent of a 1280px viewport).

### 6.16 RTL Considerations

**Specification gap.** The CVP component implementations do not include RTL (right-to-left) layout support. No `dir="rtl"` handling or CSS logical properties are in use. This must be addressed before CVP components can be used in Arabic, Hebrew, or other RTL markets. Track as a separate roadmap item.

---

## 7. Motion Standards

### 7.1 Allowed Durations

| Token | When to use |
|---|---|
| `--cvp-motion-duration-fast` | Hover transitions, icon state changes, short overlays appearing |
| `--cvp-motion-duration-base` | Accordion expand/collapse, modal enter/exit, most transitions |
| `--cvp-motion-duration-slow` | Complex entrance animations, multi-step transitions |
| `--cvp-motion-duration-bounce` | Playful emphasis; use sparingly and only with `easing-bounce` |

Do not define duration values as raw milliseconds in component CSS.

### 7.2 Easing

| Token | Use |
|---|---|
| `--cvp-motion-easing-standard` | Default for all transitions |
| `--cvp-motion-easing-bounce` | Paired with `duration-bounce` only |

### 7.3 Animated Properties

Animate only properties that the browser can composite cheaply. In order of preference:

1. `opacity`
2. `transform` (translate, scale, rotate)
3. `background-color` (short duration only)
4. `border-color` (short duration only)
5. `color` (short duration only)
6. `box-shadow` (use sparingly; not GPU-composited)

Do not animate `width`, `height`, `max-height` (except for accordion where `max-height` animation is the established pattern with a documented workaround). Do not use `transition: all`.

### 7.4 Entrance and Exit Motion

| Pattern | Entrance | Exit |
|---|---|---|
| Modal | Fade in + scale from 0.96 → 1 | Fade out |
| Dropdown / menu | Fade in + translate Y by 4px | Fade out |
| Toast | Slide in from edge | Fade out |
| Accordion panel | Max-height expand | Max-height collapse |
| Tooltip | Fade in | Fade out (immediate) |

All entrance/exit animations must use `animation` or `transition` with the appropriate CVP duration and easing tokens.

### 7.5 Reduced-Motion Requirements

Every animated component must include this block:

```css
@media (prefers-reduced-motion: reduce) {
  /* Replace all transitions and animations with instant state changes */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

The above is a global reset. Component-level override may be more precise — for example, an accordion under reduced-motion should still expand (just instantly), not hide the panel.

### 7.6 Loading Motion

Skeleton loading uses a shimmer animation (`background-position` shift on a gradient). Under `prefers-reduced-motion: reduce`, the shimmer must be replaced with a static muted background — the element must still visually indicate a loading state, just without motion.

Spinner animations must stop under `prefers-reduced-motion: reduce`. Replace with a static loading icon or static "Loading…" text.

### 7.7 When Motion Must Not Be Used

- Do not animate layout shifts caused by content loading (e.g. jumping text as images load).
- Do not auto-play looping animations that have no pause mechanism — this violates WCAG 2.2.2.
- Do not use motion as the sole differentiator between states (always pair motion with a colour, shape, or text change).

---

## 8. Responsive Standards

### 8.1 Breakpoints

Repository evidence confirms three breakpoints in active use:

| Name | Value | Behaviour at this threshold |
|---|---|---|
| Large | 1024px | Primary layout breakpoints for nav, RailDetails |
| Medium | 768px | Mid-point wrap and stack |
| Small | 640px | Single-column stacking; minimum viable layout |

A formal breakpoint token set (`--cvp-breakpoint-*`) is a **Specification gap** — no such tokens are defined. Components use the px values directly in media queries. Until tokens are defined, document the exact px breakpoint used in each component's Responsive Behaviour section.

### 8.2 Narrow Viewport Behaviour

At the minimum supported viewport width (320px CSS, equivalent to WCAG 1.4.10):

- All text must be readable without horizontal scrolling.
- All interactive elements must be reachable.
- No content may be clipped by overflow.
- Navigation must have a collapsed state that provides full access to all destinations.

### 8.3 Wrapping

Multi-element rows (button groups, chip lists, filter bars) must wrap to multiple rows at narrow viewports rather than overflow horizontally or clip. Exception: horizontal scrolling is acceptable for media rail / gallery components where horizontal scroll is the intended interaction.

### 8.4 Truncation

When a fixed-width container cannot accommodate its text content, truncate with an ellipsis and provide the full content via `title` attribute or tooltip. Never clip text silently. See §5.18.

### 8.5 Touch Interaction

On touch-primary devices:

- Touch targets must be ≥44×44px (§4.15, §6.14).
- Hover-only states must have equivalent tap-accessible alternatives.
- Long-press must not be the sole mechanism for any action.
- Drag interactions (Table row reorder, RailContentGallery drag) must have a keyboard-accessible alternative.

### 8.6 Mobile Overlays

On viewports ≤640px, Modal dialogs must occupy the full viewport width (minus a small margin) and be positioned at the bottom of the screen (sheet pattern) or the full screen, rather than centred at a fixed max-width. **Specification gap:** The current `Modal.tsx` does not implement this — it uses a fixed `maxWidth` prop with no responsive override.

### 8.7 Responsive Tables

At narrow viewports, data tables must not overflow horizontally unless they are contained within a horizontal-scroll region with an explicit ARIA label. The preferred behaviour at ≤640px is a card-per-row or stack layout. **Specification gap:** `Table.tsx` behaviour at narrow viewports is not confirmed.

### 8.8 Responsive Navigation

At ≤1024px, `HeaderNavigation` must collapse to a compact form. At ≤768px, `PageSideNav` must be dismissible (drawer or overlay pattern rather than always-visible sidebar). The collapsed navigation must be fully keyboard-accessible.

### 8.9 Responsive Media

`RailContentGallery` in `display-grid` and `display-grid-selectable` variants must reflow to a smaller grid at narrow viewports. Thumbnail aspect ratios must be preserved.

### 8.10 Content Resizing at 200% and 400%

Test every component at:

- 200% browser zoom: all text readable, no interactive elements unreachable.
- 400% zoom (or 320px viewport width): full reflow to single column, no content lost.

Use the browser's built-in zoom for 200% testing and viewport resizing for 400% testing.

---

## 9. Storybook Standards

### 9.1 Prerequisites

No Storybook is currently configured in this repository (confirmed: no `.storybook/` directory, no story files). Before any component story can be written, the Storybook setup must be completed. This is tracked as an outstanding task in `IMPLEMENTATION_STATUS.md §3`.

### 9.2 Story Naming Convention

Stories must follow this naming structure:

```
[Family] / [ComponentName] / [Story Name]

Examples:
  Actions / PrimaryButton / Default
  Actions / PrimaryButton / All Sizes
  Actions / PrimaryButton / Disabled
  Form Controls / TextInput / Error State
  Overlays / Modal / Tabbed Variant
  Data Display / Table / With Row Selection
```

Story names must be human-readable, not camelCase identifiers. Use sentence case. The story name describes what is demonstrated, not the prop combination.

### 9.3 Required Story Structure per Component

Every component entry must include these story sections, where applicable to the component:

| Story | Required for | Notes |
|---|---|---|
| **Overview** | All | Default state with all props at their defaults |
| **Usage guidance** | All | MDX prose explaining when to use and when not to use |
| **Anatomy** | All | Annotated screenshot or diagram identifying each part |
| **Variants** | Components with variant prop | One story per variant |
| **Sizes** | Components with size prop | One story per size |
| **States** | All interactive | One story per state (hover*, active*, focus, disabled, error, loading, success) |
| **Theme examples** | All | Side-by-side light and dark |
| **Interactive example** | All interactive | Fully working control with all props wired |
| **Accessibility notes** | All | ARIA pattern used, keyboard map, known gaps |
| **Token table** | All | All Public component tokens with resolved values per theme |
| **Props / API** | All | Auto-generated from TypeScript interface |
| **Responsive example** | All | Viewport resized to 320px |
| **Long-content example** | Text-bearing components | Labels and body content at maximum realistic length |
| **Edge cases** | As needed | Empty arrays, zero counts, very long strings, zero-width containers |
| **Interaction tests** | All interactive | Written in Storybook `play` function |
| **Visual regression** | All | Chromatic or Percy snapshot |
| **Design reference** | All | Link to Figma frame |
| **AI contract reference** | All | Link to or embed of the component's JSON contract |
| **Known limitations** | Where applicable | Documented gaps from the component specification |

*Hover and active states: demonstrate via arg control (data attribute or forced prop), not by requiring pointer interaction.

### 9.4 Token Arg Tables

Every Public component token must appear as a Storybook argType control. The control type should be:

- `color` for colour tokens
- `number` for size tokens
- `text` for radius and other string-form tokens

The arg table must show the token name, not the resolved value, as the default.

### 9.5 Interaction Tests

Every state reachable via user interaction must be covered by a `play` function test. Required interactions per component type:

| Component type | Required interaction tests |
|---|---|
| Button | Click fires callback; disabled button does not fire callback; keyboard activation fires callback |
| Input | Typing updates value; blur triggers validation; error state displays error message |
| Modal | Opens on trigger; closes on Escape; closes on close button; focus is trapped inside; focus returns to trigger on close |
| Dropdown | Opens on trigger; closes on outside click; closes on Escape; item selection fires callback |
| Accordion | Expands on trigger; collapses on second trigger; respects `type="single"` constraint |
| Table | Row selection fires callback; sort fires callback; page change fires callback |

---

## 10. Component Specification Template

Copy this template verbatim for each new component section. Replace all `[placeholder]` values. Remove rows or sections that do not apply, but do not remove section headings — instead write "Not applicable" so reviewers can confirm the absence was intentional.

---

### [Component Name]

> **Status block** — update every time the section changes

| Dimension | Status |
|---|---|
| Production implementation | `Complete` / `Partial` / `Missing` |
| Storybook stories | `Complete` / `Partial` / `None` |
| Token migration | `Migrated to --cvp-*` / `Partial` / `Legacy tokens in use` / `Unregistered tokens in use` |
| Specification confidence | `High` (all props confirmed from code) / `Medium` (some inference) / `Low` (stub implementation only) |
| Known gaps | [List gaps inline here or write "None"] |

---

#### Purpose

One or two sentences. What problem does this component solve? What is its primary use case?

#### When to Use

- [Condition where this component is the right choice]
- [Another condition]

#### When Not to Use

- [Condition where a different component is better — and name the alternative]
- [Anti-pattern]

---

#### Anatomy

Label every named part. Use a numbered list keyed to a diagram if one exists.

1. **Root container** — `[element type]` · `[role if custom]`
2. **[Part name]** — `[element type]` · [description]
3. (Continue for every distinct part)

---

#### Variants

| Variant | Description | When to use |
|---|---|---|
| [variant name] | [what it looks like] | [when to prefer it] |

#### Sizes

| Size | Token or value | Use case |
|---|---|---|
| [size name] | `--cvp-[token]` | [when] |

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `[propName]` | `[type]` | `[default]` | Yes / No | [description] |

---

#### Visual Specification

| Element / property | Default token | Variant / state token | Notes |
|---|---|---|---|
| Background | `--cvp-[component]-bg` | `--cvp-[component]-bg-hover` on hover | |
| Text colour | `--cvp-[component]-text` | `--cvp-[component]-text-disabled` when disabled | |
| Border colour | `--cvp-[component]-border` | `--cvp-[component]-border-error` in error state | |
| Border radius | `--cvp-[component]-radius` | — | |
| Font size | `--cvp-font-size-md` | — | Internal token |
| Font weight | `--cvp-font-weight-semibold` | — | Internal token |
| Padding (x) | `--cvp-[component]-padding-x` | — | Local value |
| Padding (y) | `--cvp-[component]-padding-y` | — | Local value |
| Focus ring | `--cvp-focus-ring-color` | — | Global rule; see §4.6 |
| Shadow | `none` | — | |

---

#### Component Token Contract

**Public override tokens** (customer-facing; documented in Storybook arg table):

| Token | Default value | Semantic source | Notes |
|---|---|---|---|
| `--cvp-[component]-bg` | `var(--cvp-color-surface-default)` | `--cvp-color-surface-default` | Primary background |
| `--cvp-[component]-text` | `var(--cvp-color-text-primary)` | `--cvp-color-text-primary` | |
| `--cvp-[component]-border` | `var(--cvp-color-border-default)` | `--cvp-color-border-default` | |
| `--cvp-[component]-radius` | `var(--cvp-radius-sm)` | `--cvp-radius-sm` | |

**Internal component tokens** (platform implementation; not customer override surface):

| Token | Default value | Notes |
|---|---|---|
| `--cvp-[component]-text-disabled` | `var(--cvp-color-text-disabled)` | |
| `--cvp-[component]-font-size` | `var(--cvp-font-size-md)` | |

**Direct semantic references** (component CSS references these without a component token):

| Semantic token | Where used |
|---|---|
| `--cvp-color-surface-hover` | `:hover` background on interactive sub-elements |
| `--cvp-focus-ring-color` | `:focus-visible` outline |

**Local implementation values** (fixed geometry; no theming purpose):

| Property | Value | Notes |
|---|---|---|
| `gap` | `8px` | Inline gap between icon and label |

---

#### States

| State | Visual change | Behaviour | Accessibility |
|---|---|---|---|
| Default | Base appearance | — | — |
| Hover | Background → `--cvp-[component]-bg-hover` | Cursor changes to `pointer` | No ARIA change |
| Focus | Focus ring appears (§4.6) | Keyboard-triggered only | `:focus-visible` |
| Active | Background → `--cvp-[component]-bg-active` | During pointer-down | `aria-pressed` if applicable |
| Disabled | Text, border, bg shift to disabled tokens | No events; not focusable | `disabled` or `aria-disabled="true"` |
| Error | Border → `--cvp-[component]-border-error`; icon and message appear | — | `aria-invalid="true"`, `aria-describedby` |
| Loading | Spinner visible; element inert | No interaction accepted | `aria-busy="true"` |

---

#### Interaction Behaviour

**Mouse / pointer:**
- [Describe hover, click, drag interactions]

**Keyboard:**
- `Tab` — [focus behaviour]
- `Enter` — [activation behaviour]
- `Space` — [activation behaviour, if different]
- `Escape` — [close/cancel behaviour, if applicable]
- `↑ ↓` — [navigation within composite widget, if applicable]

**Touch:**
- [Tap targets; long-press if applicable; swipe if applicable]

**Programmatic:**
- [Props that trigger state changes; callback signatures]

---

#### Focus Behaviour

- Focus enters: [describe where initial focus lands when the component opens or receives focus]
- Focus order: [describe the tab order within the component if it has multiple focusable elements]
- Focus exits: [describe what happens when Tab is pressed past the last focusable element]
- Focus restoration: [describe where focus returns after the component closes or an action completes]

---

#### Loading Behaviour

Not applicable / [describe loading state appearance and ARIA]

---

#### Disabled and Read-Only Behaviour

**Disabled:**
- All interactive elements receive `disabled` attribute (native) or `aria-disabled="true"` + `tabindex="-1"` (custom).
- [Component-specific disabled behaviour]

**Read-only:**
Not applicable / [Specification gap — read-only state not yet defined for this component]

---

#### Validation Behaviour

Not applicable / [describe how error state is entered, displayed, and cleared; ARIA associations]

---

#### Responsive Behaviour

| Viewport | Behaviour |
|---|---|
| ≥ 1024px | [Full layout] |
| 768px–1023px | [Mid-point adjustments] |
| 640px–767px | [Stacked layout] |
| < 640px / 320px | [Minimum viable layout; WCAG reflow test] |

---

#### Content Rules

| Content element | Rules |
|---|---|
| Label | Required; maximum [n] characters before truncation; must not wrap (or: wraps to [n] lines max) |
| Helper text | Optional; wraps; no maximum length |
| Error message | Required when in error state; must be visible text; ≤ [n] characters recommended |
| Placeholder | Guidance text only; not a substitute for label |
| Icon | Optional; 16px or 20px; must use `currentColor`; not decorative if it conveys state |
| Empty content | [What renders when the data set is empty] |
| Long strings | [What truncates; what wraps; what has no maximum] |
| Localisation | [Any strings baked into the component that must be externalised for i18n] |

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| Role | `[native element or explicit ARIA role]` |
| Accessible name | [How the accessible name is provided] |
| Description | `aria-describedby` referencing [element ID] when [condition] |
| Error association | `aria-invalid` + `aria-describedby` on [element] |
| Keyboard map | [reference Interaction Behaviour above] |
| Focus trap | [Yes / No — if yes, describe scope] |
| Focus restoration | [Where focus returns on close] |
| Live region | [role="alert" / role="status" / none — describe what triggers announcement] |
| Reduced motion | [What changes under prefers-reduced-motion: reduce] |
| Screen reader test | [NVDA+Chrome, VoiceOver+Safari — state which have been validated] |
| WCAG level | AA targeted; AAA for all new interactive token pairs |

---

#### Motion

| Animation | Property | Duration token | Easing token | Reduced-motion |
|---|---|---|---|---|
| [e.g. Modal entrance] | `opacity`, `transform` | `--cvp-motion-duration-base` | `--cvp-motion-easing-standard` | Instant; no transform |
| [e.g. Hover transition] | `background-color` | `--cvp-motion-duration-fast` | `--cvp-motion-easing-standard` | Not applicable |

---

#### Composition

Describe how this component is intended to be used alongside other components:

- **Used inside:** [e.g. Modal, FilterGroup, Layout]
- **Contains:** [e.g. PrimaryButton, TextInput, Breadcrumbs]
- **Must not be nested inside:** [e.g. another Modal; reason]
- **Related patterns:** [e.g. Validation — see §4 Shared Patterns]

---

#### Storybook Requirements

Required stories for this component:

| Story name | What it demonstrates | Interaction test required |
|---|---|---|
| Default | Base state, all props at defaults | No |
| [Variant name] | [What the variant shows] | No |
| Disabled | Disabled prop = true | Yes — confirm no events fire |
| Error state | Error prop with message | Yes — confirm `aria-invalid` present |
| All sizes | Size prop cycling | No |
| Keyboard navigation | — | Yes — Tab through, activate, Escape |
| Theme: light | data-theme="light" wrapper | No |
| Theme: dark | data-theme="dark" wrapper | No |
| Long content | Labels and text at maximum realistic length | No |
| Responsive (320px) | Viewport constrained | No |

---

#### Test Requirements

| Test type | Coverage required | Tool |
|---|---|---|
| Unit | Props → rendered output; conditional rendering per state | Vitest + Testing Library |
| Interaction | All states in States table; all keyboard paths | Storybook `play` + Playwright |
| Accessibility | axe-core scan; keyboard-only walkthrough | axe + Storybook a11y addon |
| Visual regression | All variants × both themes | Chromatic or Percy |
| Responsive | 320px, 640px, 1024px, 1440px viewports | Playwright viewport resize |
| Keyboard | Full keyboard walkthrough per Keyboard map | Playwright |
| Theme | Visual diff between light and dark snapshots | Chromatic or Percy |

---

#### AI Component Contract

The component's JSON contract must include the following fields:

```json
{
  "component": "[ComponentName]",
  "variant": "[variant name or 'default']",
  "version": "[semver]",
  "tokens": {
    "[semantic role]": "--cvp-[component]-[token]",
    "background": "--cvp-[component]-bg",
    "text": "--cvp-[component]-text",
    "border": "--cvp-[component]-border",
    "border-radius": "--cvp-[component]-radius",
    "focus-ring": "--cvp-focus-ring-color"
  },
  "states": ["default", "hover", "focus", "active", "disabled"],
  "themes": ["light", "dark"],
  "slots": ["[slot names]"],
  "props": {
    "[propName]": { "type": "[type]", "default": "[value]", "required": false }
  },
  "wcag": {
    "text-contrast": "[ratio]:1 ([AA|AAA])",
    "focus-contrast": "[ratio]:1 (AA non-text)",
    "level": "AA"
  },
  "storybook": "[URL to story]",
  "figma": "[URL to Figma frame]"
}
```

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action required | Owner |
|---|---|---|---|
| [Description] | High / Medium / Low | [What must be done] | [Team] |

---

*End of component template.*

---

## 11. Contribution Workflow

### 11.1 Token Selection

Before writing any component CSS, identify every value the component needs. For each value:

1. Open `TOKEN_DECISION_FRAMEWORK.md` and walk the decision tree.
2. Search `src/styles/cvp-component-tokens.css` for an existing component token that matches the intent.
3. If none exists, search `src/styles/cvp-semantic-tokens.css`.
4. If a semantic token matches the intent exactly and no override surface is needed, reference it directly from component CSS.
5. If a component token is warranted, add it to `cvp-component-tokens.css` referencing the semantic token, following the naming pattern: `--cvp-[component]-[element]-[property]-[state]`.
6. If neither semantic nor component tokens cover the value, follow the token proposal process in `TOKEN_GOVERNANCE.md §Introducing New Tokens`.

Never invent a `--cvp-*` custom property in component code. All `--cvp-*` tokens must live in `cvp-primitives.css`, `cvp-semantic-tokens.css`, or `cvp-component-tokens.css`.

### 11.2 Specification Update

When adding a new component or variant:

1. Write or update the component's section in this document using the template in §10.
2. Get the specification reviewed by the Design Systems team lead before writing implementation code.
3. Mark the specification status as `High` confidence only after the implementation matches the spec.

### 11.3 Implementation

1. Read the full component specification section before touching any code.
2. Implement in the order: semantic HTML → base styles → hover → focus → active → disabled → error → responsive → reduced motion.
3. Do not skip states — an undocumented state is a gap, not a feature.
4. Add new component tokens to `cvp-component-tokens.css` with the Public/Internal/Local annotation comment.

### 11.4 Storybook

1. Stories must be added before the implementation is merged.
2. Follow §9 for required stories.
3. Token arg tables must be configured for all Public tokens before the story is considered complete.
4. Interaction tests must be written in `play` functions.
5. Visual regression baseline must be captured on the first story merge.

### 11.5 Tests

Write in this order: accessibility test first (axe), then interaction tests, then visual regression. Accessibility violations found by axe are blocking — they must be resolved before merge.

### 11.6 Design Review

Every new component and every new variant requires a synchronous or async design review against the Figma frame. The reviewer must confirm:

- The implementation matches the Figma frame in both themes.
- Token usage is correct (no hardcoded values visible in browser DevTools).
- All documented states are present.

### 11.7 Accessibility Review

Every new component requires a dedicated accessibility review covering:

- Keyboard walkthrough (Tab, Shift+Tab, Enter, Space, Escape, arrow keys as applicable).
- Screen reader walkthrough (VoiceOver + Safari on macOS; NVDA + Chrome on Windows).
- axe automated scan — zero violations.
- Zoom test at 200% and 320px width.

### 11.8 Contract Update

When a component gains a new public token, new state, or new variant, update the component's JSON contract. AI tooling reads contracts — a contract that is out of sync with the implementation generates incorrect component code.

### 11.9 Approval

A component PR requires:

- Design Systems team approval (naming, token correctness, spec alignment)
- Engineering lead approval (implementation correctness)
- Zero failing CI checks (lint, tests, visual regression, axe)

---

## 12. PR Checklist

Copy this checklist into every component PR description.

```markdown
## CVP Design System PR Checklist

### Visual Fidelity
- [ ] Implementation matches Figma frame in light theme
- [ ] Implementation matches Figma frame in dark theme
- [ ] No hardcoded colour values in component CSS
- [ ] No hardcoded spacing values outside of documented Local implementation values
- [ ] All design tokens confirmed in browser DevTools (no raw hex or rgba visible in computed styles)

### Tokens
- [ ] No --cvp-primitive-* references in component CSS
- [ ] No --tc-* legacy token references in component CSS
- [ ] No shorthand (--bg-*, --text-*, --border-*) references in component CSS
- [ ] All component tokens added to cvp-component-tokens.css with Public/Internal/Local annotation
- [ ] No new --cvp-* property defined outside of a token CSS file
- [ ] Token proposal PR merged (if new tokens were required)
- [ ] cvp-alias-bridge.css updated (if a deprecated token is being replaced)

### States
- [ ] Default state: renders correctly
- [ ] Hover state: implemented and visually correct
- [ ] Focus state: focus ring visible on keyboard navigation; not visible on pointer focus
- [ ] Active (pointer-down) state: implemented
- [ ] Disabled state: pointer-events suppressed; no events fire; visual appearance correct
- [ ] Error state (if applicable): border, text, icon shift; aria-invalid present; error message associated
- [ ] Loading state (if applicable): spinner visible; element inert; aria-busy="true"
- [ ] Empty state (if applicable): documented and implemented
- [ ] All states present in the States table of the component specification

### Keyboard Behaviour
- [ ] All interactive elements reachable by Tab
- [ ] Tab order follows visual reading order
- [ ] Enter and/or Space activate the component's primary action
- [ ] Escape closes overlays and returns focus to trigger
- [ ] Arrow key navigation implemented for composite widgets (menu, tab list, radio group)
- [ ] Keyboard-only walkthrough completed without getting stuck or losing focus

### Semantics and ARIA
- [ ] Correct HTML element used (button, a, input, etc. — not div/span for interactive elements)
- [ ] No redundant ARIA (e.g. role="button" on a <button>)
- [ ] All interactive elements have an accessible name
- [ ] Error messages associated via aria-describedby
- [ ] aria-invalid set in error state
- [ ] aria-expanded set on disclosure triggers
- [ ] aria-selected set on selectable items
- [ ] aria-disabled set on custom disabled elements
- [ ] Focus trap implemented for modal overlays
- [ ] aria-modal="true" on dialog elements

### Themes
- [ ] Component renders correctly with data-theme="light"
- [ ] Component renders correctly with data-theme="dark"
- [ ] No JavaScript theme detection in component code
- [ ] Visual regression snapshots captured for both themes

### Responsive Behaviour
- [ ] Tested at 320px viewport width (WCAG 1.4.10 reflow)
- [ ] Tested at 640px, 768px, 1024px breakpoints
- [ ] No horizontal overflow at 320px
- [ ] Responsive behaviour documented in the component specification
- [ ] Touch targets ≥ 44×44px

### Content Resilience
- [ ] Long label text: truncates or wraps as specified; no overflow
- [ ] Empty arrays / zero items: renders as specified
- [ ] Single item: renders correctly
- [ ] Very long single word (no whitespace): handled without overflow
- [ ] Internationalised strings: no hardcoded English copy baked into component rendering

### Motion
- [ ] All animations use --cvp-motion-duration-* and --cvp-motion-easing-* tokens
- [ ] No raw ms values in transitions
- [ ] prefers-reduced-motion: reduce tested: animations suppressed or instant
- [ ] No looping animations without a pause mechanism

### Tests
- [ ] Unit tests: conditional rendering per state; prop → output
- [ ] Interaction tests (Storybook play): all states reachable; all keyboard paths covered
- [ ] Accessibility test: axe scan passes with zero violations
- [ ] Visual regression: baseline captured; diff reviewed
- [ ] Responsive tests: 320px, 640px, 1024px, 1440px
- [ ] Theme tests: light and dark visual diff reviewed

### Storybook
- [ ] All required stories present (per §9 of DESIGN_SYSTEM_SPECIFICATION.md)
- [ ] Story names follow naming convention
- [ ] Token arg table configured for all Public tokens
- [ ] Interactive example with all props wired
- [ ] Both themes demonstrated
- [ ] Responsive example at 320px
- [ ] Long-content example
- [ ] Interaction tests in play functions

### Documentation
- [ ] Component specification section in DESIGN_SYSTEM_SPECIFICATION.md updated
- [ ] Status block updated (production status, Storybook status, token migration)
- [ ] Known gaps documented in the specification section
- [ ] DESIGN_SYSTEM_COMPONENT_INVENTORY.md updated if component status changed

### AI Contracts
- [ ] Component JSON contract created or updated
- [ ] All Public tokens present in the contract tokens map
- [ ] All states listed
- [ ] Both themes listed
- [ ] WCAG ratios populated
- [ ] Figma and Storybook URLs populated

### Backwards Compatibility
- [ ] No existing public token renamed or removed without deprecation comment
- [ ] No existing prop renamed or removed without deprecation path
- [ ] cvp-alias-bridge.css updated if a --tc-* token mapping changed
- [ ] Migration note added to CHANGELOG.md for any deprecated or removed token
```

---

---

## Part A — Actions

> **Family-wide token migration note.** All components in the Actions family are in token migration state `Unregistered tokens in use`. Every component defines its own component-level custom properties inline (e.g. `--primary-button-*`, `--icon-button-*`) rather than consuming tokens from `cvp-component-tokens.css`. Until Phase 2 migration is complete, treat the inline tokens as the de-facto token contract. The canonical `--cvp-button-*` tokens defined in `cvp-component-tokens.css` are the migration target.

> **Family-wide implementation gap — `transition: all`.** Every Actions component uses `transition: all 0.2s …`. This must be replaced with explicit property lists (`transition: background-color … , color …`) as part of the token migration pass, to avoid animating layout properties unintentionally.

> **Family-wide implementation gap — loading state.** No Actions component implements a loading state or `aria-busy`. Loading is a **Specification gap** across the entire family until a shared loading pattern is agreed (see §5.7 and §5.13).

> **Family-wide implementation gap — Danger variant on standard buttons.** `--cvp-color-text-danger` and `--cvp-color-border-danger` exist in the semantic layer. A Danger variant for `PrimaryButton`-style components does not exist in any standard button component. It exists on `IconButton` and `IconSmallButton` only. See §5.12.

---

### PrimaryButton

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Unregistered tokens in use (`--primary-button-*`, `--primary-btn-*` fallbacks) |
| Specification confidence | High |
| Known gaps | No loading state · `transition: all` · No Danger variant · Touch target below 44px for small size |

#### Purpose

The primary call-to-action button. Expresses the single most important action on a surface. Use once per major UI section; overuse diminishes hierarchy.

#### When to Use

- The single primary action on a page, modal, or card (e.g. "Save", "Publish", "Create").
- Confirming a multi-step flow.

#### When Not to Use

- Secondary or tertiary actions — use `SecondaryButton` or `OutlineButton`.
- Destructive actions — a Danger variant is required (currently a specification gap; do not use PrimaryButton for delete/remove).
- Navigation — use `TextButton` with `href` or a standard `<a>`.
- More than one primary action per surface; if two actions are equal in weight, one should be secondary.

---

#### Anatomy

1. **Root** — `<button>` element, `type="button"` unless inside a `<form>` where `type="submit"` is appropriate.
2. **Label** — text content via `children`; must be meaningful as an accessible name.
3. **Icon (optional)** — leading or trailing icon passed as part of `children`; no dedicated icon slot exists in the current implementation.

---

#### Variants

| Variant | Description | When to use |
|---|---|---|
| `default` | Standard padding (8px 16px) | Default; most contexts |
| `compact` | Reduced padding (4px 8px) | Constrained toolbar or inline contexts |

#### Sizes

| Size | Font size | Padding | Border radius | Min-width |
|---|---|---|---|---|
| `small` | 12px | 4px 12px | 4px | 60px |
| `medium` (default) | 14px | 8px 16px | 4px | — |
| `large` | 16px | 12px 24px | 8px | 100px |

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | — | Yes | Button label and optional icon |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | No | Size variant |
| `variant` | `'default' \| 'compact'` | `'default'` | No | Padding variant |
| `disabled` | `boolean` | `false` | No | Disables the button |
| `className` | `string` | `''` | No | Additional CSS classes |
| `...rest` | `React.ButtonHTMLAttributes` | — | No | All native button attributes |

---

#### Visual Specification

| Element / property | Default token (current) | State / variant token | Target CVP token |
|---|---|---|---|
| Background | `var(--primary-btn-bg, #3d63dd)` | `var(--primary-btn-hover-bg, #244cce)` on hover/active | `--cvp-button-primary-bg` |
| Text colour | `var(--primary-btn-text, #ffffff)` | `var(--primary-btn-disabled-text, #333333)` when disabled | `--cvp-button-primary-text` |
| Background (disabled) | `var(--primary-btn-disabled-bg, #1f1f28)` | — | `--cvp-button-primary-bg-disabled` |
| Border | `none` | — | `--cvp-button-primary-border` |
| Border radius | `4px` (small/medium) · `8px` (large) | — | `--cvp-button-primary-radius` |
| Font size | `14px` (medium) | `12px` (small) · `16px` (large) | `--cvp-font-size-md` |
| Font weight | `500` | — | `--cvp-font-weight-medium` |
| Line height | `20px` | — | `--cvp-line-height-normal` |
| Focus ring | `2px solid #67b3fb`, offset `2px` | — | `--cvp-focus-ring-color` |
| Active transform | `translateY(1px)` | — | Local (fixed) |
| Transition | `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)` | — | **Gap:** must be specific properties |

**WCAG note (from `DESIGN.md`):** White (`#ffffff`) on `#3d63dd` = 8.6:1 (AAA). White on disabled background `#1f1f28` — must be verified; current disabled text `#333333` may fail against `#1f1f28`.

---

#### Component Token Contract

**Public override tokens (migration target in `cvp-component-tokens.css`):**

| Token | Semantic source | Notes |
|---|---|---|
| `--cvp-button-primary-bg` | `--cvp-color-brand-default` | Default background |
| `--cvp-button-primary-bg-hover` | `--cvp-color-brand-hover` | Hover background |
| `--cvp-button-primary-bg-active` | `--cvp-color-brand-active` | Active background |
| `--cvp-button-primary-bg-disabled` | `--cvp-color-surface-disabled` | Disabled background |
| `--cvp-button-primary-text` | `--cvp-color-text-inverse` | Label colour |
| `--cvp-button-primary-radius` | `--cvp-radius-sm` | Border radius |

**Internal component tokens:**

| Token | Semantic source |
|---|---|
| `--cvp-button-primary-text-disabled` | `--cvp-color-text-disabled` |
| `--cvp-button-primary-font-size` | `--cvp-font-size-md` |
| `--cvp-button-primary-font-weight` | `--cvp-font-weight-medium` |
| `--cvp-button-primary-line-height` | `--cvp-line-height-normal` |

**Local implementation values:**

| Property | Value |
|---|---|
| `padding-x` (medium) | `16px` |
| `padding-y` (medium) | `8px` |
| `active-transform` | `translateY(1px)` |

---

#### States

| State | Visual change | Behaviour | Accessibility |
|---|---|---|---|
| Default | Brand blue background, white text | Clickable | `<button>` |
| Hover | Background darkens to hover colour | `cursor: pointer` | No ARIA change |
| Focus | 2px focus ring, 2px offset | Keyboard-triggered only | `:focus-visible` |
| Active (pointer-down) | Background same as hover; `translateY(1px)` | During pointer-down | No ARIA change |
| Disabled | Muted bg and text; `cursor: not-allowed` | No events | `disabled` attribute; not focusable |
| Loading | **Specification gap** — not implemented | — | `aria-busy="true"` required |

---

#### Interaction Behaviour

**Mouse:** Click triggers `onClick`. Active state (translateY) on pointer-down. Hover darkens background.

**Keyboard:** `Tab` focuses. `Enter` and `Space` both activate. `:focus-visible` shows ring; pointer focus does not.

**Touch:** 44×44px minimum tap target required. **Gap:** Small size at 4px/12px padding may not meet this threshold; audit required.

**Programmatic:** `disabled` prop removes from tab order and prevents all events natively.

---

#### Focus Behaviour

- Focus enters on `Tab`.
- Focus ring appears on `:focus-visible` only — correct implementation confirmed.
- No nested focusable elements; focus exits on `Tab` to next element.

---

#### Loading Behaviour

**Specification gap.** No loading state is implemented. Planned behaviour: label replaced by spinner; `aria-busy="true"`; pointer events suppressed.

---

#### Disabled and Read-Only Behaviour

**Disabled:** `disabled` HTML attribute is applied directly. Native browser behaviour removes from tab order and suppresses events. Visual: muted background and text. `cursor: not-allowed` applied.

**Read-only:** Not applicable (buttons are not read-only).

---

#### Validation Behaviour

Not applicable.

---

#### Responsive Behaviour

The button is `display: inline-flex` and does not have responsive width behaviour. It shrinks to content width. In constrained horizontal spaces, the `compact` variant reduces padding; for very narrow contexts, `small` size is preferred. Label text does not wrap by default — if the label is too long for the container, it will clip. Use short, imperative labels.

---

#### Content Rules

| Element | Rules |
|---|---|
| Label | Must be short and imperative (≤ 3 words recommended). Do not wrap. Do not use sentence-case paragraphs. |
| Icon | Optional; must use `currentColor`; no accessible name needed if label is present; if icon-only, wrap in `IconButton` instead. |
| Required/forbidden | No placeholder. No helper text. No error message. |

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| Role | Native `<button>` — no ARIA role needed |
| Accessible name | `children` text content |
| Focus trap | No |
| Focus restoration | N/A |
| Keyboard | `Tab` to focus; `Enter` or `Space` to activate |
| Reduced motion | **Gap:** `transition: all` must be replaced with specific properties; `prefers-reduced-motion` block required |
| Screen reader | Announces button label; disabled state announced as "dimmed" or "unavailable" |
| WCAG | White on brand blue = 8.6:1 (AAA); disabled exemption applies |

---

#### Motion

| Animation | Property | Duration | Easing | Reduced-motion |
|---|---|---|---|---|
| Hover background | `background-color` | 200ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Instant (gap: no media query yet) |
| Active press | `transform: translateY(1px)` | 200ms | Same | Should be removed entirely |

---

#### Composition

- **Used inside:** Modals (footer), forms, toolbars, cards, empty states.
- **Must not be nested inside:** Another `<button>` (invalid HTML).
- **Pairs with:** `SecondaryButton` or `OutlineButton` for multi-action groups; never two `PrimaryButton` instances at the same level.
- **Related:** Destructive confirmation flow uses a Danger button (spec gap) inside a `Modal`.

---

#### Storybook Requirements

| Story | What it demonstrates | Interaction test |
|---|---|---|
| Default | Medium size, default variant | No |
| All sizes | small / medium / large side by side | No |
| Compact variant | `variant="compact"` | No |
| Disabled | `disabled={true}` | Yes — confirm no `onClick` fires |
| With leading icon | Icon + label in `children` | No |
| With trailing icon | Label + icon in `children` | No |
| Keyboard navigation | — | Yes — Tab to focus; Enter and Space activate |
| Theme: light | `data-theme="light"` wrapper | No |
| Theme: dark | `data-theme="dark"` wrapper | No |
| Long label | 40-character label string | No |

---

#### Test Requirements

| Type | Coverage |
|---|---|
| Unit | `onClick` fires when not disabled; `onClick` does not fire when disabled; correct class names per size and variant |
| Interaction | Keyboard activation via Enter and Space; disabled button receives no events |
| Accessibility | axe scan; accessible name present; `disabled` attribute present when disabled |
| Visual regression | All sizes × both themes; disabled state |
| Responsive | 320px viewport — label visible |

---

#### AI Component Contract

```json
{
  "component": "PrimaryButton",
  "variant": "default",
  "tokens": {
    "background": "--cvp-button-primary-bg",
    "background-hover": "--cvp-button-primary-bg-hover",
    "background-active": "--cvp-button-primary-bg-active",
    "background-disabled": "--cvp-button-primary-bg-disabled",
    "text": "--cvp-button-primary-text",
    "border-radius": "--cvp-button-primary-radius",
    "focus-ring": "--cvp-focus-ring-color"
  },
  "states": ["default", "hover", "focus", "active", "disabled"],
  "themes": ["light", "dark"],
  "slots": ["children"],
  "wcag": { "text-contrast": "8.6:1 (AAA) — white on brand blue", "level": "AAA" }
}
```

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| `transition: all` — animates layout properties | Medium | Replace with explicit property list in migration pass |
| No `prefers-reduced-motion` block | High | Add `@media (prefers-reduced-motion: reduce)` |
| Loading state not implemented | High | Implement spinner + `aria-busy="true"` |
| Danger variant missing from standard buttons | High | Add `danger` variant (see §5.12) |
| Small size may miss 44px touch target | High | Audit and extend touch area |
| Disabled text contrast not validated | Medium | Check `#333333` on `#1f1f28`; adjust if < 3:1 (non-text minimum) |
| Tokens not registered in `cvp-component-tokens.css` | High | Phase 2 migration task |

---

### SecondaryButton

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Unregistered tokens in use (`--secondary-button-*`, `--secondary-btn-*` fallbacks) |
| Specification confidence | High |
| Known gaps | No loading state · `transition: all` · No Danger variant · Disabled styling differs from PrimaryButton pattern |

#### Purpose

The secondary action button. Used alongside `PrimaryButton` to offer an alternative, less-prominent action. Also used as the sole action when no primary hierarchy exists.

#### When to Use

- A supporting action next to a primary action ("Cancel" next to "Save"; "Preview" next to "Publish").
- An action that is important but not the page's primary intent.

#### When Not to Use

- The most important action on a surface — use `PrimaryButton`.
- Navigation — use `TextButton` with `href`.
- Destructive actions — Danger variant is required (specification gap).

---

#### Anatomy

1. **Root** — `<button>` element.
2. **Label** — text content via `children`.
3. **Icon (optional)** — passed inside `children`; no dedicated slot.

---

#### Variants

| Variant | Description |
|---|---|
| `default` | Standard padding |
| `compact` | Reduced padding (4px 8px) |

#### Sizes

| Size | Font size | Padding |
|---|---|---|
| `small` | 12px | 6px 12px |
| `medium` (default) | 14px | 8px 16px |
| `large` | 16px | 12px 24px |

---

#### Props and API

Same structure as `PrimaryButton`. Props: `children`, `size`, `variant`, `disabled`, `className`, `...rest`.

---

#### Visual Specification

| Element / property | Default token (current) | State token | Target CVP token |
|---|---|---|---|
| Background | `var(--secondary-btn-bg, #515158)` | `var(--secondary-btn-hover-bg, #1f3566)` on hover | `--cvp-button-secondary-bg` |
| Text colour | `var(--secondary-btn-text, #ffffff)` | `var(--secondary-btn-disabled-text, #292a2e)` when disabled | `--cvp-button-secondary-text` |
| Background (disabled) | `var(--secondary-btn-disabled-bg, #a1a1a8)` | — | `--cvp-button-secondary-bg-disabled` |
| Border | `none` | — | — |
| Border radius | `4px` | — | `--cvp-button-secondary-radius` |
| Active transform | `translateY(1px)` | — | Local |
| Focus ring | `2px solid #67b3fb`, offset `2px` | — | `--cvp-focus-ring-color` |

**Mismatch with PrimaryButton:** Disabled background is `#a1a1a8` (a visible grey, not dark like PrimaryButton's disabled). This means the component has two different disabled patterns. The disabled text `#292a2e` on background `#a1a1a8` should be contrast-checked. **Flag for design review.**

---

#### Component Token Contract

**Public override tokens:**

| Token | Semantic source |
|---|---|
| `--cvp-button-secondary-bg` | `--cvp-color-surface-raised` |
| `--cvp-button-secondary-bg-hover` | `--cvp-color-secondary-hover` |
| `--cvp-button-secondary-bg-active` | `--cvp-color-secondary-active` |
| `--cvp-button-secondary-bg-disabled` | `--cvp-color-surface-disabled` |
| `--cvp-button-secondary-text` | `--cvp-color-text-primary` |
| `--cvp-button-secondary-radius` | `--cvp-radius-sm` |

---

#### States

| State | Visual change | Behaviour | Accessibility |
|---|---|---|---|
| Default | Dark grey surface background | Clickable | `<button>` |
| Hover | Background → `#1f3566` (deep navy) | — | No ARIA change |
| Focus | 2px ring | `:focus-visible` only | Correct |
| Active | Background = hover; `translateY(1px)` | During pointer-down | — |
| Disabled | Visible grey bg (`#a1a1a8`), dark text | No events; `cursor: not-allowed` | `disabled` attribute |
| Loading | **Specification gap** | — | — |

---

#### Interaction Behaviour

Identical to `PrimaryButton`. All keyboard, touch, and programmatic notes apply.

---

#### Focus Behaviour

Identical to `PrimaryButton` — `:focus-visible` implemented correctly.

---

#### Loading / Disabled / Read-only / Validation / Responsive

Same gaps as `PrimaryButton`. Disabled visual pattern differs and requires design alignment.

---

#### Content Rules

Same as `PrimaryButton` — short, imperative labels; no wrapping.

---

#### Accessibility

Same as `PrimaryButton`.

---

#### Motion

Same as `PrimaryButton` — `transition: all` gap applies.

---

#### Composition

- Pairs with `PrimaryButton` in action groups. `SecondaryButton` is always to the left (or below on mobile) of `PrimaryButton`.
- Can be used standalone without a Primary sibling.

---

#### Storybook Requirements

Same story set as `PrimaryButton`. Add a story: **Paired with PrimaryButton** — showing the two-button action group pattern.

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| Disabled visual pattern differs from PrimaryButton | Medium | Design alignment needed |
| Disabled text contrast (`#292a2e` on `#a1a1a8`) not validated | High | Contrast audit required |
| All gaps inherited from PrimaryButton | — | See PrimaryButton Known Gaps |

---

### OutlineButton

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Unregistered tokens in use (`--outline-button-*`, `--outline-btn-*` fallbacks) |
| Specification confidence | High |
| Known gaps | Focus uses `:focus` not `:focus-visible` (mouse users see focus ring) · `transition: all` |

#### Purpose

A bordered, transparent-background button for tertiary or alternative actions. Less visually dominant than `PrimaryButton` or `SecondaryButton`.

#### When to Use

- A third option in an action group (e.g. "Cancel" when Primary = "Save", Secondary = "Save Draft").
- Actions in dense toolbars where background fill would be too heavy.
- Upload zones, drag targets, or placeholder-style interactive areas (`dotted` variant).

#### When Not to Use

- The most important action — use `PrimaryButton`.
- Destructive actions — Danger variant required (specification gap).

---

#### Anatomy

1. **Root** — `<button>` element.
2. **Border** — `1px solid` (default) or `1px dashed` (`dotted` variant).
3. **Label** — text content via `children`.

---

#### Variants

| Variant | Description |
|---|---|
| `default` | Solid 1px border |
| `compact` | Reduced padding with solid border |
| `dotted` | Dashed/dotted border; for upload zones or add-item placeholders |

#### Sizes

Same as `PrimaryButton` — `small`, `medium` (default), `large`.

---

#### Props and API

Same as `PrimaryButton` except `variant` accepts `'default' | 'compact' | 'dotted'`.

---

#### Visual Specification

| Element / property | Default token (current) | State token | Target CVP token |
|---|---|---|---|
| Background | `transparent` | `rgba(255,255,255,0.05)` on hover/focus | `--cvp-button-outline-bg` |
| Border | `1px solid var(--outline-btn-border)` | Dashed on `dotted` variant | `--cvp-button-outline-border` |
| Text colour | `var(--outline-btn-text, #ffffff)` | `#a1a1a8` when disabled | `--cvp-button-outline-text` |
| Disabled opacity | `opacity: 0.6` | — | Local |
| Focus | `box-shadow: 0 0 0 2px #67b3fb` | — | `--cvp-focus-ring-color` |

**Known implementation issue:** Focus uses `:focus` not `:focus-visible`. Pointer (mouse) clicks will show the focus ring. This must be corrected to `:focus-visible` in the migration pass.

---

#### Component Token Contract

**Public override tokens:**

| Token | Semantic source |
|---|---|
| `--cvp-button-outline-bg` | `transparent` (local) |
| `--cvp-button-outline-bg-hover` | `--cvp-color-interactive-overlay` |
| `--cvp-button-outline-border` | `--cvp-color-border-default` |
| `--cvp-button-outline-text` | `--cvp-color-text-primary` |
| `--cvp-button-outline-radius` | `--cvp-radius-sm` |

---

#### States

| State | Visual change | Behaviour | Accessibility |
|---|---|---|---|
| Default | Transparent bg, 1px border | Clickable | `<button>` |
| Hover | Semi-transparent white overlay bg; border stays | — | — |
| Focus | `box-shadow` ring — **appears on pointer focus (bug)** | — | `:focus-visible` target; current is `:focus` |
| Active | Deeper overlay bg; `translateY(1px)` | — | — |
| Disabled | `opacity: 0.6`; unchanged colours | No events | `disabled` attribute |
| Loading | **Specification gap** | — | — |

---

#### Interaction Behaviour / Focus / Loading / Disabled

Same as `PrimaryButton` except focus ring uses `box-shadow` rather than `outline` — functionally equivalent but does not animate with `outline-offset`. Focus-visible gap must be resolved.

---

#### Motion

Same gaps as `PrimaryButton`. Additionally, the `dotted` border style is static — no animation.

---

#### Composition

- Used in toolbar alongside Primary and Secondary.
- `dotted` variant used in media upload zones and content-add placeholders.

---

#### Storybook Requirements

| Story | What it demonstrates |
|---|---|
| Default | Solid border, medium size |
| Dotted variant | Dashed border |
| All sizes | small / medium / large |
| Disabled | opacity treatment |
| Focus (keyboard only) | confirms ring not visible on mouse click |
| Theme: light and dark | border visibility in both themes |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| `:focus` not `:focus-visible` — mouse focus ring shown | High | Replace `:focus` with `:focus-visible` in migration |
| Disabled uses opacity (not dedicated tokens) | Medium | Add dedicated disabled tokens in migration |
| `--outline-btn-border` fallback not defined — border invisible if env token missing | High | Add hardcoded fallback or migrate to `--cvp-color-border-default` |
| All gaps inherited from PrimaryButton | — | See PrimaryButton Known Gaps |

---

### TextButton

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Unregistered tokens in use; also references old shorthand tokens (`--type-scale-m-size`, `--font-family`) |
| Specification confidence | High |
| Known gaps | Polymorphic (`<button>` / `<a>`) — link rendering not keyboard-complete · Multiple internal sub-variants not in token contract · No size prop |

#### Purpose

A text-only, no-background button for low-emphasis actions and navigation-style interactions. Can render as a `<button>` (action) or `<a>` (navigation) depending on whether `href` is provided.

#### When to Use

- Low-emphasis supplementary actions ("Learn more", "View all", "Cancel" as a low-priority alternative).
- Navigation actions where a link appearance is appropriate.
- Navigation items with icons in the `nav` sub-variant (used in sidebar navigation context).
- Toggle-style contextual actions in the `toggle` sub-variant.

#### When Not to Use

- Primary or secondary actions — use `PrimaryButton` or `SecondaryButton`.
- Standalone destructive actions without context.

---

#### Anatomy

**When rendered as `<button>`:**
1. **Root** — `<button>` element.
2. **Icon (optional)** — leading icon via `icon` prop; wrapped in `<span class="text-button-icon">`.
3. **Label** — text via `children`.

**When rendered as `<a>` (href provided):**
1. **Root** — `<a>` element with standard anchor behaviour.
2. **Label** — text via `children`.

---

#### Variants (sub-variants — no `variant` prop; applied via `className`)

| Sub-variant class | Description | When to use |
|---|---|---|
| (default) | Periwinkle blue text, no bg, minimal padding | Inline supplementary actions |
| `text-button--toggle` | Brighter blue, small bg on hover, icon+gap | Contextual toggle-style controls |
| `text-button--secondary` | Muted (`#bbb`) → white on hover, rounded bg | Secondary toolbar actions |
| `text-button--minimalistic` | Muted small text, no bg | Fine-print links, auxiliary actions |
| `text-button--minimalistic-inverted` | White → muted on hover | Light-surface inverse actions |
| `text-button--nav` | Full nav item with icon, padding, rounded bg, active state | Sidebar/header navigation items |

**Specification gap:** Sub-variants are not implemented via a `variant` prop but via externally-applied class names. This is an undocumented API and will not appear in Storybook arg tables or AI contracts automatically. A `variant` prop should be added in the migration pass.

---

#### Active State (nav sub-variant only)

The `nav` sub-variant has an `active` prop that adds `.text-button--active` class, changing background and text to the active colours. This is the only button component with a persistent "selected" state.

**Accessibility note for active state:** `aria-current="page"` must be added by the parent navigation component when the TextButton is used as a navigation item and represents the current page.

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | — | Yes | Button label |
| `href` | `string` | — | No | When provided, renders as `<a>` |
| `disabled` | `boolean` | `false` | No | Disabled state |
| `icon` | `React.ReactNode` | — | No | Leading icon (renders `nav` layout) |
| `active` | `boolean` | — | No | Active/selected state (nav sub-variant) |
| `className` | `string` | `''` | No | Used to apply sub-variant classes |
| `...rest` | `ButtonHTMLAttributes \| AnchorHTMLAttributes` | — | No | Forwarded to root element |

---

#### Visual Specification

| Element / property | Default | `nav` sub-variant | `minimalistic` sub-variant |
|---|---|---|---|
| Background | `transparent` | `transparent` (hover: `#1f1f28`) | `transparent` |
| Text colour | `#97a9de` | `#b4b4ba` (hover/active: `#fff`) | `#bbbbbb` (hover: `#fff`) |
| Padding | `2px 4px` | `8px 12px` | `0` |
| Border radius | `4px` (focus shape only) | `6px` | — |
| Icon size | — | `16px` | — |
| Font size | `var(--type-scale-m-size)` | `var(--type-scale-m-size)` | `var(--type-scale-s-size)` |
| Focus ring | `border-radius: 4px` only — **ring not implemented** | `outline: 2px solid #6f8be6; box-shadow` | Not implemented |

**Known gap:** The default TextButton sub-variant sets `border-radius: 4px` on `:focus-visible` for shape but does not implement a visible `outline` focus ring. The nav sub-variant does implement a full focus ring with glow. This inconsistency must be resolved.

---

#### Component Token Contract

**Current state:** All values are hardcoded or reference old type-scale tokens (`--type-scale-m-size`, `--font-family`). No CVP component tokens are defined for TextButton. The migration target should define:

| Token | Semantic source |
|---|---|
| `--cvp-button-text-color` | `--cvp-color-text-brand` (or link colour) |
| `--cvp-button-text-color-hover` | `--cvp-color-text-primary` |
| `--cvp-button-text-color-disabled` | `--cvp-color-text-disabled` |

Sub-variant tokens are a specification gap pending the `variant` prop redesign.

---

#### States

| State | Visual change | Behaviour | Accessibility |
|---|---|---|---|
| Default | Coloured text, transparent bg | Clickable / navigable | `<button>` or `<a>` |
| Hover | Text lightens or bg appears | `cursor: pointer` | No ARIA change |
| Focus | Shape-only (default variant) — **ring gap** · Full ring (nav variant) | `:focus-visible` | Partially correct |
| Active (pointer-down) | — (no explicit active style in default variant) | — | — |
| Active (nav selected) | Bg + text change; persistent | Set via `active` prop | **Gap:** `aria-current="page"` not in component |
| Disabled | Muted text; `pointer-events: none` | No events | `disabled` or `.text-button--disabled`; **gap: `pointer-events: none` alone does not suppress keyboard** |

**Accessibility gap:** When rendered as `<a href>`, `disabled` suppresses pointer events via CSS but the link remains navigable by keyboard (`Tab` + `Enter`). A disabled link must use `aria-disabled="true"` and `tabindex="-1"`, not CSS alone.

---

#### Interaction Behaviour

**Mouse:** Hover changes text colour or adds background. Click triggers action or navigates.

**Keyboard (as `<button>`):** `Tab` focuses; `Enter` and `Space` activate.

**Keyboard (as `<a>`):** `Tab` focuses; `Enter` follows link. `Space` does not activate links natively. **Gap:** If the TextButton renders as `<a>` for an action (not true navigation), `Space` should also trigger it — this requires `onKeyDown` handling.

---

#### Focus Behaviour

- Default sub-variant: `:focus-visible` sets border-radius but no visible ring — **bug; must be fixed**.
- Nav sub-variant: `:focus-visible` sets `outline: 2px solid #6f8be6` with glow — correct pattern.
- All sub-variants should use the CVP focus ring pattern from §4.6.

---

#### Disabled and Read-Only Behaviour

**Button rendering:** `disabled` attribute applied. Correct.

**Link rendering:** CSS `pointer-events: none` only — keyboard users can still Tab to and activate the link. **This is a WCAG violation.** Fix: add `aria-disabled="true"` + `tabindex="-1"` on the `<a>` when `disabled` is true.

---

#### Content Rules

| Element | Rules |
|---|---|
| Label | Short; typically ≤ 4 words; no wrapping enforced but `white-space: nowrap` on nav sub-variant |
| Icon | 16px; `currentColor` — nav sub-variant only |
| Long content | Label may wrap in default sub-variant (no `white-space: nowrap`); design guidance: keep to one line |

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| Role | `<button>` or `<a>` (polymorphic) |
| Accessible name | `children` text |
| Current page (nav variant) | **Gap:** `aria-current="page"` not implemented in component |
| Disabled as link | **Bug:** CSS-only; keyboard-accessible when disabled |
| Focus ring | **Gap on default sub-variant** — no visible ring |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default (button) | Default sub-variant, no icon |
| As link (`href` provided) | Renders `<a>` |
| Nav sub-variant with icon | Active and inactive states |
| Toggle sub-variant | |
| Secondary sub-variant | |
| Minimalistic sub-variant | |
| All disabled states | Button and link disabled |
| Focus ring demonstration | Keyboard focus visible vs mouse click |
| Long label | |
| Theme: light and dark | |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| Focus ring missing in default sub-variant | High | Add `outline` to `:focus-visible` |
| Disabled link accessible via keyboard | Critical | Add `aria-disabled` + `tabindex="-1"` when `disabled` and `href` |
| `active` prop has no ARIA support | High | Add `aria-current="page"` in nav context |
| Sub-variants require external class names, not a `variant` prop | Medium | Add `variant` prop in migration |
| No size prop | Low | Size is implicit per sub-variant; add if needed |

---

### IconButton

| Dimension | Status |
|---|---|
| Production implementation | Complete (forwardRef) |
| Storybook stories | None |
| Token migration | Unregistered tokens in use |
| Specification confidence | High |
| Known gaps | Focus uses `:focus` not `:focus-visible` · 28px default size is below 44px touch target · Danger uses hardcoded hex · No loading state |

#### Purpose

A square icon-only button. Used for compact actions where a text label is not visible, such as toolbar actions, close buttons, and contextual controls.

#### When to Use

- Compact actions in toolbars, table rows, card headers where space is at a premium.
- Close buttons for modals, overlays, toasts.
- Inline actions on list items (edit, delete, move).

#### When Not to Use

- Actions where the icon meaning is ambiguous to all users — always pair with a tooltip and `aria-label`.
- Primary page actions — use `PrimaryButton` with a text label.

---

#### Anatomy

1. **Root** — `<button>` element, square (equal width and height).
2. **Content wrapper** — `<div class="icon-button__content">`, flex-centred.
3. **Icon** — passed via `children`; expected to be a Lucide React icon or SVG.

---

#### Variants

| Variant | Description |
|---|---|
| `default` | Transparent bg; dark hover fill |
| `outline` | Adds 1px semi-transparent border |
| `ghost` | No border; same as default functionally |
| `danger` | Icon colour is error red (`#e6494e`); bg/hover unchanged |
| `rail-gallery` | Semi-transparent dark bg for media overlays |

#### Sizes

| Size | Dimension |
|---|---|
| `small` | 24×24px |
| `medium` (default) | 28×28px |
| `large` | 32×32px |

**Touch target gap:** All three sizes are below the 44×44px WCAG 2.5.5 minimum. An invisible padding extension or wrapper must be used in touch contexts.

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | — | Yes | Icon to render |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | No | Button dimension |
| `variant` | `'default' \| 'outline' \| 'ghost' \| 'danger' \| 'rail-gallery'` | `'default'` | No | Visual style |
| `disabled` | `boolean` | `false` | No | Disabled state |
| `className` | `string` | `''` | No | Additional classes |
| `ref` | `React.Ref<HTMLButtonElement>` | — | No | forwardRef |
| `...rest` | `React.ButtonHTMLAttributes` | — | No | Includes `aria-label`, `title`, `onClick` |

**Critical:** `aria-label` must be provided by the consumer for every `IconButton`. The component does not enforce this — it is a consumer contract. Failure to provide `aria-label` produces an axe `button-name` violation.

---

#### Visual Specification

| Element / property | Default | `danger` variant | `outline` variant |
|---|---|---|---|
| Size | 28×28px | 28×28px | 28×28px |
| Background | `transparent` | `transparent` | `transparent` |
| Icon colour | `#AFAFB5` | `#e6494e` (hardcoded) | `#AFAFB5` |
| Hover bg | `#1f1f28` | `#1f1f28` | `#1f1f28` |
| Hover icon colour | `#fff` | `#e6494e` (unchanged) | `#fff` |
| Active bg | `rgba(255,255,255,0.15)` | — | — |
| Active transform | `scale(0.95)` | `scale(0.95)` | `scale(0.95)` |
| Disabled opacity | `0.5` | `0.5` | `0.5` |
| Border (outline) | — | — | `1px solid rgba(255,255,255,0.3)` |
| Focus ring | `box-shadow: 0 0 0 2px #67b3fb` | same | same |

---

#### Component Token Contract

**Public override tokens (migration target):**

| Token | Semantic source |
|---|---|
| `--cvp-icon-button-color` | `--cvp-color-icon-default` |
| `--cvp-icon-button-bg-hover` | `--cvp-color-surface-hover` |
| `--cvp-icon-button-color-hover` | `--cvp-color-text-primary` |
| `--cvp-icon-button-color-danger` | `--cvp-color-text-danger` |
| `--cvp-icon-button-color-disabled` | `--cvp-color-icon-disabled` |

---

#### States

| State | Visual change | Accessibility |
|---|---|---|
| Default | Muted icon, transparent bg | `<button>` with required `aria-label` |
| Hover | Bg darkens; icon brightens | No ARIA change |
| Focus | `box-shadow` ring — **appears on mouse click (bug)** | `:focus` not `:focus-visible` |
| Active | `scale(0.95)` | No ARIA change |
| Disabled | `opacity: 0.5`; transparent bg | `disabled` attribute; not focusable |
| Loading | **Specification gap** | — |

**Critical accessibility bug:** Focus ring appears on `:focus` (not `:focus-visible`). Every mouse click on the button shows a focus ring. Must be corrected to `:focus-visible`.

---

#### Focus Behaviour

Focus enters via `Tab`. Focus ring is a `box-shadow` which is functionally visible but implements incorrectly (`:focus` not `:focus-visible`). No nested focusable elements.

---

#### Disabled and Read-Only

`disabled` attribute applied natively. `opacity: 0.5` used — no dedicated disabled token. Icon colour does not shift to `--cvp-color-icon-disabled`; opacity dims the existing colour instead.

---

#### Content Rules

| Element | Rules |
|---|---|
| `aria-label` | **Required** from consumer; must describe the action, not the icon shape ("Close dialog" not "X") |
| `title` | Optional; provides tooltip on hover for mouse users |
| Children (icon) | Expected 16–20px SVG icon; `currentColor` fill |

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| Role | Native `<button>` |
| Accessible name | **Consumer-required** `aria-label` |
| Focus ring | Present but on `:focus` — bug |
| Touch target | **Gap:** 24–32px visible; 44px minimum not met |
| WCAG contrast (danger) | `#e6494e` on `#1f1f28` hover bg — must be audited |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| All variants | default / outline / ghost / danger / rail-gallery |
| All sizes | 24 / 28 / 32px |
| With aria-label | Demonstrates required accessible name |
| Disabled | |
| Keyboard navigation | Confirms ring on Tab, not on mouse click |
| Tooltip paired | `<IconButton>` inside a tooltip |
| Theme: light and dark | |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| `:focus` not `:focus-visible` | Critical | Replace in migration |
| All sizes below 44px touch target | High | Add invisible padding extension |
| `danger` icon colour is hardcoded hex | Medium | Replace with `--cvp-color-icon-danger` |
| `aria-label` not enforced at component level | High | Add prop to interface as required or add PropTypes warning |
| No loading state | High | Add in migration |

---

### IconButtonWithText

| Dimension | Status |
|---|---|
| Production implementation | Partial — `outline` variant is identical to `default`; size `m` differs significantly in layout |
| Storybook stories | None |
| Token migration | Mixed — uses shadcn tokens (`--border`, `--foreground`, `--accent`, `--ring`) + unregistered tokens |
| Specification confidence | Medium |
| Known gaps | `mouseDown.preventDefault()` removes focus on click — may break keyboard flows · No `aria-label` enforcement · No size prop for icon |

#### Purpose

A card-style button presenting a named action with a supporting icon and a short description line. Used in content-creation or mode-selection contexts (e.g. "Add Content", "Import from URL").

#### When to Use

- Presenting 2–4 alternative creation or upload modes.
- Prominent icon-action selections in a dialog or panel.

#### When Not to Use

- Repeated list items (use a menu or list instead).
- Compact toolbars (use `IconButton`).
- Primary page actions (use `PrimaryButton`).

---

#### Anatomy

1. **Root** — `<button>` element; `176px` wide × `96px` min-height (default size).
2. **Header** — flex row: icon + label text.
3. **Description** — text paragraph below header.

**Size `m` layout change:** Header becomes flex column (icon centred above label). Icon has a 48×48px background container. Width `208px`, height `160px`.

---

#### Variants and Sizes

| Variant | Description |
|---|---|
| `default` | Standard card, solid border |
| `outline` | Identical to `default` (implementation gap — no visual difference) |

| Size | Width | Height | Padding |
|---|---|---|---|
| `default` | 176px | 96px min | 12px 16px |
| `m` | 208px | 160px | 22px 36px; dashed border |

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `icon` | `React.ReactNode` | — | Yes | Icon element |
| `text` | `string` | — | Yes | Primary action label |
| `description` | `string` | — | Yes | Supporting description |
| `variant` | `'default' \| 'outline'` | `'default'` | No | Visual variant (no difference currently) |
| `size` | `'default' \| 'm'` | `'default'` | No | Size variant |
| `disabled` | `boolean` | `false` | No | |
| `ref` | forwardRef | | | |

---

#### Visual Specification

| Element / property | Default | Size `m` |
|---|---|---|
| Width | 176px | 208px |
| Min-height | 96px | 160px (fixed) |
| Border | `1px solid var(--border)` | `1px dashed var(--border)` |
| Border radius | `var(--radius-md)` | `var(--radius-md)` |
| Hover bg | `#1f1f28` | `#1f1f28` |
| Hover border | `#4a4a4a` | `#4a4a4a` |
| Focus ring | `box-shadow: 0 0 0 2px var(--focus-ring)` | `box-shadow` with `ring` + `background` offset |
| Disabled | `opacity: 0.5`; `pointer-events: none` | Same |

**Token issue:** Uses `var(--border)`, `var(--foreground)`, `var(--accent)`, `var(--ring)` — shadcn/ui theme tokens. These are not part of the CVP token system. Must be migrated to `--cvp-*` equivalents.

---

#### Interaction Behaviour

**Known issue:** `onMouseDown` calls `e.preventDefault()` to prevent the button receiving focus on mouse clicks. The intent is to avoid a persistent focus ring after mouse interaction. However, `preventDefault()` on `mouseDown` can break drag-to-select behaviour and some OS-level interactions. The correct approach is `:focus-visible` CSS — suppress the ring there, not at the event level.

**Also:** `onClick` uses `setTimeout(() => blur(), 0)` to force blur after click. This is a workaround for the same issue and removes focus from the button immediately — which means keyboard users who click with `Enter` or `Space` will lose focus after activation. **This is an accessibility defect** — focus should remain on the button after keyboard activation.

---

#### Accessibility

| Requirement | Status |
|---|---|
| Role | Native `<button>` |
| Accessible name | `text` prop used as visible label — correct |
| Description | `description` prop is visible text — not associated via `aria-describedby` |
| Focus after activation | **Bug:** Focus removed after keyboard activation via blur trick |
| Touch target | 96px height / 176px width — meets 44px minimum ✓ |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| `onMouseDown.preventDefault()` + post-click blur — breaks keyboard focus | Critical | Remove; use `:focus-visible` instead |
| `outline` variant identical to `default` | Low | Implement distinct visual or remove variant |
| Uses shadcn tokens not CVP tokens | High | Migrate to `--cvp-*` in Phase 2 |
| `description` not associated via `aria-describedby` | Medium | Add `aria-describedby` on button, `id` on description element |

---

### IconSmallButton

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Unregistered tokens in use |
| Specification confidence | High |
| Known gaps | `:focus` not `:focus-visible` · Same `mouseDown.preventDefault()` issue as IconButtonWithText · `remove` variant uses hardcoded danger hex |

#### Purpose

A fixed 24×24px icon button. Functionally identical to `IconButton` size `small`, but with additional variants (notably `remove`) and the same problematic mouse-focus suppression pattern. Used in chip/tag removal, gallery thumbnail controls, and compact action rows.

#### When to Use

- Removing a chip or tag ("×" button on a selected item).
- Compact inline controls where `IconButton` small is too large.
- `rail-gallery` and `remove` variants for media thumbnail overlays.

#### Relationship to IconButton

`IconSmallButton` is a fixed-24px variant of `IconButton` with one additional variant (`remove`). In a future migration, `IconButton` with `size="small"` and an added `remove` variant should replace this component. Track as a consolidation opportunity.

---

#### Variants

| Variant | Description |
|---|---|
| `default` | Transparent bg, muted icon |
| `outline` | Thin semi-transparent border |
| `ghost` | No border |
| `danger` | Error-red icon colour |
| `rail-gallery` | Semi-transparent dark bg |
| `remove` | Circular, black bg, white icon; hover turns red; used for removing items from media |

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | — | Yes | Icon |
| `variant` | `'default' \| 'outline' \| 'ghost' \| 'danger' \| 'rail-gallery' \| 'remove'` | `'default'` | No | |
| `disabled` | `boolean` | `false` | No | |
| `ref` | forwardRef | | | |
| `...rest` | `ButtonHTMLAttributes` | | | Includes required `aria-label` |

---

#### Visual Specification

| Element / property | Default | `remove` variant |
|---|---|---|
| Size | 24×24px | 24×24px, `border-radius: 50%` |
| Background | `transparent` | `rgba(0,0,0,0.75)` with backdrop-filter blur |
| Icon colour | `#AFAFB5` | `#fff` |
| Hover bg | `#1f1f28` | Error red (`#e6494e`) |
| Active scale | `scale(0.9)` | `scale(0.95)` |
| Hover scale (remove) | — | `scale(1.1)` |
| Disabled opacity | `0.5` | `0.5` |
| Focus ring | `box-shadow: 0 0 0 2px #67b3fb` | Same + additional layer |

---

#### States, Interaction, Accessibility

Same gaps as `IconButton`: `:focus` not `:focus-visible`; `aria-label` required from consumer; touch target below 44px.

Same `mouseDown.preventDefault()` and post-click blur issues as `IconButtonWithText`.

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| `:focus` not `:focus-visible` | Critical | Fix in migration |
| `mouseDown.preventDefault()` + blur on click | Critical | Remove; use `:focus-visible` |
| Consolidation with `IconButton size="small"` + `remove` variant | Medium | Plan in migration roadmap |
| All below 44px touch target | High | Add invisible padding extension |
| `remove` danger colour hardcoded | Medium | Migrate to `--cvp-color-danger-*` tokens |

---

## Part B — Form Controls

> **Family-wide token migration note.** All Form Control components define their styling via inline `<style>` blocks using custom tokens (`--surface-raised`, `--border-default`, `--text-primary`, `--destructive`, `--type-scale-m-size`) that map to old shorthand or are hardcoded fallbacks. These are not registered in `cvp-component-tokens.css`. The migration target tokens are the `--cvp-input-*`, `--cvp-checkbox-*` etc. tokens already defined in `cvp-component-tokens.css`.

> **Family-wide implementation gap — random ID generation.** `TextInput` and `TextArea` generate element IDs using `Math.random().toString(36)`. This is server-side rendering (SSR) unsafe — IDs will differ between server render and client hydration, breaking `htmlFor` associations. Replace with a stable `useId()` hook (React 18+) before production use.

> **Family-wide implementation gap — `:focus` vs `:focus-visible`.** `TextInput`, `TextArea`, `Select`, and `MultiSelect` use `:focus` for focus ring styling (all focus events, including pointer). Only `Checkbox`, `Toggle`, and `Segmented` correctly use `:focus-visible` on the hidden native input. Correct in migration.

---

### TextInput

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Legacy and unregistered tokens in use |
| Specification confidence | High |
| Known gaps | `:focus` not `:focus-visible` · Random ID (SSR-unsafe) · No `warning` or `success` variant (use `MiscInput`) · No prefix/suffix slots |

#### Purpose

A single-line text input with label, helper text, and error message support. The baseline form input for simple text entry.

#### When to Use

- Single-line text fields: names, emails, URLs, short values.
- Forms where prefix/suffix slots, character count, or copy-to-clipboard are not needed (use `MiscInput` for those).

#### When Not to Use

- Multi-line text — use `TextArea`.
- Inputs with prefix/suffix/copy controls — use `MiscInput`.
- Numeric input, date input, password input — use appropriate `<input type>` with this component as the base (currently a specification gap: no dedicated Number, Date, or Password variant exists).

---

#### Anatomy

1. **Container** — `<div class="text-input-container">`, `display: flex; flex-direction: column`.
2. **Label** — `<label>` with `htmlFor` association; optional required marker (`*`).
3. **Input** — `<input>` element; `height: 40px; width: 100%`.
4. **Error message** — `<p role="alert">` below input; only when `error` is truthy.
5. **Helper text** — `<p>` below input; only when `helperText` is truthy and no `error`.

---

#### Variants

| Variant | Description |
|---|---|
| `default` | Standard border and background |
| `error` | Error-coloured border; shows error message |

#### Sizes

No size prop — the input is always `height: 40px; width: 100%` (fills container).

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | No | Field label; renders `<label>` when provided |
| `required` | `boolean` | `false` | No | Shows required `*` marker on label; adds `aria-required` |
| `variant` | `'default' \| 'error'` | `'default'` | No | Visual state |
| `error` | `string` | — | No | Error message text; activates error state |
| `helperText` | `string` | — | No | Helper text below input |
| `disabled` | `boolean` | `false` | No | Disabled state |
| `id` | `string` | auto-generated | No | Input ID for label association |
| `ref` | forwardRef | | | |
| `...rest` | `React.InputHTMLAttributes` | | | Includes `placeholder`, `type`, `value`, `onChange` |

---

#### Visual Specification

| Element / property | Default | Error state | Hover | Focus |
|---|---|---|---|---|
| Background | `var(--input-bg, #14141a)` | unchanged | unchanged | unchanged |
| Border | `1px solid var(--input-border, #2D2D37)` | `1px solid #ef4444` | `border-color: #6f8be6` | `2px solid #6f8be6` + shadow |
| Text colour | `var(--input-text, #ffffff)` | unchanged | unchanged | unchanged |
| Placeholder | `#8f8f95` | unchanged | unchanged | unchanged |
| Border radius | `6px` | unchanged | unchanged | unchanged |
| Height | `40px` | unchanged | unchanged | unchanged |
| Error border colour | — | `var(--color-error, #ef4444)` | stays error | stays error + error shadow |
| Focus shadow | — | — | — | `0 0 0 3px rgba(111,139,230,0.25)` |
| Focus padding adjustment | — | — | — | Reduces to `11px` (1px less to offset border width increase) |

**Note:** The focus state increases border to `2px solid` and adjusts padding by `1px` to prevent layout shift. This is the established pattern across all form inputs in this family.

---

#### Component Token Contract

**Current tokens (inline, not in CVP files):**

| Token name | Value | CVP target |
|---|---|---|
| `--surface-raised` | `var(--input-bg, #14141a)` | `--cvp-input-bg` → `--cvp-color-surface-default` |
| `--border-default` | `var(--input-border, #2D2D37)` | `--cvp-input-border` → `--cvp-color-input-border` |
| `--text-primary` | `var(--input-text, #ffffff)` | `--cvp-input-text` → `--cvp-color-text-primary` |
| `--text-quaternary` | `var(--input-placeholder, #8f8f95)` | `--cvp-input-placeholder` → `--cvp-color-text-placeholder` |
| `--destructive` | `var(--color-error, #ef4444)` | `--cvp-color-border-error` |

---

#### States

| State | Visual change | Behaviour | Accessibility |
|---|---|---|---|
| Default | Surface bg, default border | Accepts text input | `<input>` — no ARIA needed beyond label |
| Hover | Border → `#6f8be6` | — | No ARIA change |
| Focus | 2px border, glow shadow; padding adjusted | Text cursor | `:focus` (should be `:focus-visible`) |
| Disabled | `cursor: not-allowed`; bg unchanged | No input accepted | `disabled` attribute |
| Error | Error-red border; error message appears | — | `aria-invalid="true"` + `aria-describedby` → error ID |
| Loading | Not applicable | — | — |
| Read-only | **Specification gap** — `readonly` attribute accepted via spread but no visual specification | — | `aria-readonly="true"` |

---

#### Interaction Behaviour

**Mouse:** Click focuses; typing updates value via controlled or uncontrolled state.

**Keyboard:** `Tab` to focus; type to enter; `Shift+Tab` to move backward. `Enter` submits the enclosing form (native `<input>` behaviour). No special key handling within the component.

**Touch:** Native `<input>` touch behaviour; mobile keyboard appears on focus. No `inputmode` attribute is set by default — consumer should pass `inputMode` for numeric or email fields.

---

#### Focus Behaviour

- Focus via `Tab`.
- `:focus` used (should be `:focus-visible`) — ring appears on mouse click as well as keyboard.
- `aria-describedby` on the input points to either the error or helper text element.

---

#### Validation Behaviour

- Error state is controlled by `error` prop (message string) or `variant="error"`.
- When `error` is truthy: `aria-invalid="true"` is set; `aria-describedby` points to the error element; the error `<p>` has `role="alert"` for immediate screen reader announcement.
- The error message replaces the helper text (not shown simultaneously).
- **Gap:** Only two validation states (default and error). `warning` and `success` states are not available — use `MiscInput` for those.

---

#### Responsive Behaviour

The input is `width: 100%` and fills its container. At 320px viewport the input will be fully readable. No responsive breakpoint changes.

---

#### Content Rules

| Element | Rules |
|---|---|
| Label | Required in most contexts; omit only when context makes field obvious AND an `aria-label` is provided on the input |
| Placeholder | Guidance text only; not a substitute for a label |
| Error message | Required when `error` is provided; short and specific (e.g. "Enter a valid email address") |
| Helper text | Optional; explains format or constraints; hidden when error is shown |
| Required marker | `*` appended to label via `::after`; must also add accessible text (e.g. "(required)") for screen readers — **gap: current `*` is not announced differently** |

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| Label association | `<label htmlFor={inputId}>` — correct |
| Error association | `aria-invalid="true"` + `aria-describedby` pointing to error `<p role="alert">` — correct |
| Required | `required` prop available; `aria-required` is not explicitly set — **gap: add `aria-required={required}` on input** |
| Placeholder | Contrast of `#8f8f95` on `#14141a` — must be audited; WCAG exempts placeholder from colour contrast but usability requires legibility |
| Focus | `:focus` not `:focus-visible` — gap |
| SSR ID | `Math.random()` ID generation — gap |

---

#### Motion

| Animation | Property | Duration | Reduced-motion |
|---|---|---|---|
| Border colour change | `border-color` | 150ms | Instant (no media query — gap) |
| Shadow appear | `box-shadow` | 150ms | Instant (no media query — gap) |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default | Empty, with label |
| With placeholder | |
| With helper text | |
| Error state | `error="Error message"` |
| Disabled | |
| Required | With required marker |
| No label (aria-label) | Label-less input with `aria-label` |
| Long input value | Value at 200 characters |
| Keyboard navigation | Confirm focus ring |
| Theme: light and dark | |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| `:focus` not `:focus-visible` | High | Fix in migration |
| SSR-unsafe random ID | High | Replace with `useId()` |
| `aria-required` not set on input | Medium | Add `aria-required={required}` |
| Required `*` marker not accessible | Medium | Add visually-hidden "(required)" text or use `aria-required` |
| No `warning` or `success` state | Low | Document boundary; redirect to `MiscInput` |
| No `inputMode` default | Low | Document that consumer must pass `inputMode` for non-text keyboards |
| `prefers-reduced-motion` not handled | Medium | Add to migration |

---

### TextArea

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Legacy and unregistered tokens in use |
| Specification confidence | High |
| Known gaps | `:focus` not `:focus-visible` · Random ID (SSR-unsafe) · Error icon `⚠` is hardcoded emoji |

#### Purpose

A multi-line text input with label, character count, helper text, and error message. Use when the expected input is more than one line.

#### When to Use

- Free-form descriptions, notes, comments, biographical text.
- Any content that may span multiple lines.

#### When Not to Use

- Single-line values — use `TextInput`.
- Structured code or configuration — use a code editor.

---

#### Anatomy

1. **Container** — `<div class="textarea-container">`.
2. **Label row** — `<div>` containing label (left) and character count (right, when enabled).
3. **Label** — `<label>` with `htmlFor`.
4. **Character count** — `<span>` showing `current / max (N left)` or `N over`; turns error-red when over limit.
5. **Textarea** — `<textarea>` element.
6. **Error message** — `<p role="alert">` with ⚠ prefix emoji.
7. **Helper text** — `<p>` when no error.

---

#### Variants

| Variant | Description |
|---|---|
| `default` | Standard border |
| `error` | Error-coloured border + error message |

#### Additional props (beyond TextInput)

| Prop | Type | Default | Description |
|---|---|---|---|
| `maxLength` | `number` | — | Maximum character limit |
| `showCharacterCount` | `boolean` | `false` | Shows character counter in label row |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | CSS resize behaviour |
| `rows` | `number` | `4` | Visible rows |

---

#### Visual Specification

Same border and focus treatment as `TextInput`. Height is variable (`min-height: 80px`, height driven by `rows` prop and resize). Padding is `12px` on all sides (vs. `0 12px` in `TextInput`).

---

#### States

Same as `TextInput`. Character count over-limit state: count text turns error-red.

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| Label association | `<label htmlFor>` — correct |
| Error association | `aria-invalid` + `aria-describedby` — correct |
| Required | `aria-required` set on textarea — **correct** (unlike TextInput) |
| Error emoji | `⚠` is hardcoded in the error `<p>` text. Emoji rendering varies by screen reader; some announce "warning sign", others skip it. This is a minor inconsistency — replace with an SVG icon with `aria-hidden="true"`. |
| Character count | Not associated with textarea — `aria-describedby` should include the character count element when `showCharacterCount` is true |

---

#### Content Rules

Same as `TextInput` plus:

| Element | Rules |
|---|---|
| Character count | Shows `X / Y (Z left)` when under; `N over` when exceeded; input is not blocked when over limit — consumer must handle blocking via `maxLength` prop (browser-native) |
| Resize | Default `vertical` allows user height adjustment; use `none` in constrained layouts |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default | 4 rows, label, placeholder |
| With character count | `showCharacterCount={true}` `maxLength={200}` |
| Character limit exceeded | Value longer than maxLength |
| Error state | |
| Disabled | |
| Resize none | `resize="none"` |
| Long content | Many lines of text |
| Theme: light and dark | |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| `:focus` not `:focus-visible` | High | Fix in migration |
| SSR-unsafe random ID | High | Replace with `useId()` |
| Error emoji `⚠` — variable screen reader behaviour | Medium | Replace with `aria-hidden` SVG icon |
| Character count not associated via `aria-describedby` | Medium | Add count element ID to `aria-describedby` |
| `prefers-reduced-motion` not handled | Medium | Add in migration |

---

### MiscInput

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Mixed — uses shadcn tokens + old shorthand tokens |
| Specification confidence | High |
| Known gaps | Uses shadcn tokens not CVP tokens · Copy feature async (no error handling exposed) · `fieldPrefix` not associating accessible label |

#### Purpose

An enhanced single-line input supporting four validation states, prefix/suffix slot elements, a field prefix label, character count, and a copy-to-clipboard button. Use when `TextInput`'s simpler feature set is insufficient.

#### When to Use

- Fields needing prefix/suffix visual decoration (e.g. URL prefix "https://", currency symbol, icon suffix).
- Read-only or copyable reference fields (API keys, generated URLs).
- Fields requiring all four validation states (default, error, warning, success).
- Fields with character count constraints.

#### When Not to Use

- Simple text fields — use `TextInput`.
- Multi-line text — use `TextArea`.

---

#### Anatomy

1. **Container** — column flex.
2. **Label row** — label (left) + character count (right, when enabled).
3. **Input row** — field prefix label + prefix element + input + suffix element + copy button (slots are optional and combinable).
4. **Validation message** — error, warning, or success message below input.
5. **Helper text** — shown when no validation message.

---

#### Variants

| Variant | Description | Border / icon colour |
|---|---|---|
| `default` | Standard input | Default border |
| `error` | Validation error | `#ef4444` border |
| `warning` | Soft validation warning | `#f4983b` border |
| `success` | Field complete/validated | `#3dc155` border |

---

#### Props and API

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'error' \| 'warning' \| 'success'` | `'default'` | Validation state |
| `error` | `string` | — | Error message |
| `warning` | `string` | — | Warning message |
| `success` | `string` | — | Success message |
| `helperText` | `string` | — | Helper text |
| `label` | `string` | — | Field label |
| `required` | `boolean` | `false` | Required marker |
| `maxLength` | `number` | — | Max character limit |
| `minLength` | `number` | — | Min character limit |
| `showCharacterCount` | `boolean` | `false` | Shows count |
| `prefixElement` | `React.ReactNode` | — | Slot before input |
| `suffixElement` | `React.ReactNode` | — | Slot after input |
| `fieldPrefix` | `string` | — | Text label left of input (e.g. "https://") |
| `showCopy` | `boolean` | `false` | Shows copy button |
| `onCopy` | `(value: string) => void` | — | Custom copy handler |
| `value` | `string` | `''` | Controlled value |
| `ref` | forwardRef | | |

---

#### Visual Specification

| Element / property | Default | Error | Warning | Success |
|---|---|---|---|---|
| Border colour | `var(--border-default)` | `#ef4444` | `#f4983b` | `#3dc155` |
| Focus border | `#6f8be6` | stays error colour | stays warning | stays success |
| Field prefix bg | `var(--surface-raised)` / `var(--surface-darker)` | — | — | — |
| Validation icon | none | error icon | warning icon | check icon |
| Copy button | — (when `showCopy`) | — | — | — |

---

#### Component Token Contract

**Current state:** Uses `var(--surface-raised)`, `var(--surface-darker)`, `var(--border-default)`, `var(--destructive)`, `var(--warning)`, `var(--success)` — old shorthand and shadcn tokens. CVP migration target:

| Current | CVP target |
|---|---|
| `--surface-raised` | `--cvp-color-surface-default` |
| `--destructive` | `--cvp-color-border-error` |
| `--warning` | `--cvp-color-border-warning` |
| `--success` | `--cvp-color-border-success` |

---

#### States

| State | Visual | Accessibility |
|---|---|---|
| Default | Standard border | `<input>` |
| Hover | Border lightens (same hover as TextInput) | No ARIA change |
| Focus | `2px solid #6f8be6` + glow | `aria-invalid` if in error |
| Error | Red border + red message | `aria-invalid="true"` + `aria-describedby` → error |
| Warning | Orange border + orange message | No `aria-invalid` (warning is not invalid) |
| Success | Green border + green message | No special ARIA |
| Disabled | `cursor: not-allowed`; dims | `disabled` attribute |
| Loading | Not applicable | — |

---

#### Copy Feature

When `showCopy={true}`, a copy icon button appears. On click: uses `navigator.clipboard.writeText()` (async); shows "Copied!" tooltip for 2 seconds; reverts to copy icon. If `onCopy` prop is provided, it is called instead of the clipboard API.

**Accessibility:** Copy button uses `<IconButton>` with `aria-label` — confirm the `aria-label` is "Copy to clipboard" or similar. The tooltip ("Copied!") should be announced via `role="status"` or an `aria-live` region — **gap: current implementation relies on tooltip visibility only**.

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| Label | `htmlFor` association — correct |
| Error association | `aria-invalid` + `aria-describedby` — correct |
| Warning association | **Gap:** Warning message is not associated via `aria-describedby` when variant is `warning` only |
| `fieldPrefix` label | **Gap:** `fieldPrefix` text is not associated with the input; not announced to screen readers |
| Copy button name | Uses `IconButton` — consumer must confirm `aria-label` is set |
| Copy announcement | **Gap:** "Copied!" state not announced to screen readers |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default | Plain input with label |
| Error state | `error="message"` |
| Warning state | `warning="message"` |
| Success state | `success="message"` |
| With prefix element | Icon in prefix slot |
| With suffix element | Unit label in suffix slot |
| With fieldPrefix | "https://" prefix label |
| With copy button | `showCopy={true}` |
| With character count | `showCharacterCount` + `maxLength` |
| Disabled | |
| Long value | |
| Theme: light and dark | |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| Uses shadcn tokens not CVP | High | Migrate in Phase 2 |
| `fieldPrefix` not accessible | Medium | Add `aria-label` or `aria-labelledby` with prefix text |
| Warning message not in `aria-describedby` | Medium | Associate warning element |
| Copy "Copied!" not announced | Medium | Add `aria-live="polite"` region for copy confirmation |

---

### Select

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Unregistered tokens in use |
| Specification confidence | High |
| Known gaps | `aria-labelledby="select-label"` hardcoded — conflicts when multiple selects on page · Position-aware dropdown not SSR-safe · `:focus-visible` partially correct · No label prop |

#### Purpose

A single-selection dropdown. Custom implementation using `role="combobox"` and `role="listbox"` for full ARIA support and CVP-styled appearance.

#### When to Use

- Selecting a single value from a predefined list.
- When the list is long enough that radio buttons would take excessive space (> 5–6 options).
- Inline compact selectors in toolbars (use `button` variant).

#### When Not to Use

- Multiple selections — use `MultiSelect`.
- Very short lists (2–3 options) — consider radio buttons or `Segmented`.
- Free-text entry with suggestions — consider a combobox with search.

---

#### Anatomy

1. **Container** — `<div>` (position relative).
2. **Trigger** — `<div role="combobox">` — styled as input; chevron indicator.
3. **Dropdown** — `<div>` (positioned, absolute) containing listbox.
4. **Listbox** — `<ul role="listbox">`.
5. **Option** — `<li role="option">` with check icon when selected.
6. **Empty state** — text message when no options.

---

#### Variants

| Variant | Description |
|---|---|
| `default` | Full-width trigger, surface background |
| `button` | Compact, transparent bg, no border, auto-width — for toolbar/header selectors |

---

#### Props and API

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `SelectOption[]` | — | Required. `{ value, label, disabled? }[]` |
| `value` | `string` | — | Controlled selected value |
| `defaultValue` | `string` | `''` | Uncontrolled default |
| `onChange` | `(value: string) => void` | — | Callback on selection |
| `placeholder` | `string` | `'Select an option...'` | Shown when no selection |
| `disabled` | `boolean` | `false` | |
| `error` | `boolean` | `false` | Error border state |
| `variant` | `'default' \| 'button'` | `'default'` | |
| `icon` | `React.ComponentType` | — | Icon for button variant trigger |
| `className` | `string` | `''` | |

**Missing prop:** No `label` prop. No `id` prop. Label must be provided by the parent form layout. **Gap:** The trigger's `aria-labelledby` is hardcoded to `"select-label"` — this assumes a single element with that ID exists on the page. Multiple `Select` instances on the same page will all reference the same ID, creating duplicate ID violations and incorrect label associations.

---

#### Visual Specification

| Element / property | Default | Button variant |
|---|---|---|
| Trigger background | `#14141a` | `transparent` |
| Trigger border | `1px solid #2D2D37` | `none` |
| Trigger height | `40px` | auto |
| Trigger padding | `0 36px 0 12px` | `2px 6px` |
| Focus border | `2px solid #6f8be6` | `box-shadow: 0 0 0 2px #67b3fb` |
| Open border | `1px solid rgba(61,99,221,0.5)` | background `#1f1f28` |
| Dropdown bg | `#14141a` | Same |
| Dropdown shadow | `0 4px 6px -1px rgba(0,0,0,0.1)` | Same |
| Dropdown radius | `8px` | Same |
| Option hover bg | `#292a2e` | Same |
| Option selected bg | `#35373d` | Same |
| Option selected check | SVG check icon | Same |
| Dropdown max-height | `300px` | Same |

**Position detection:** The dropdown detects available space below/above on open and flips to top if insufficient space below. This uses `getBoundingClientRect()` — not SSR-compatible. For server-rendered pages, the dropdown will always open below on first render.

---

#### Component Token Contract

**Current tokens (not in CVP files):**

| Token | Value | CVP target |
|---|---|---|
| `--surface-raised` | `var(--select-bg, #14141a)` | `--cvp-input-bg` |
| `--border-default` | `var(--select-border, #2D2D37)` | `--cvp-color-input-border` |
| `--text-primary` | `var(--select-text, #ffffff)` | `--cvp-color-text-primary` |
| `--text-quaternary` | `var(--select-placeholder, #8f8f95)` | `--cvp-color-text-placeholder` |
| `--destructive` | `#ef4444` | `--cvp-color-border-error` |

---

#### States

| State | Visual change | Behaviour | Accessibility |
|---|---|---|---|
| Default | Closed trigger | Clickable | `role="combobox"` `aria-expanded="false"` |
| Open | Dropdown visible; trigger border changes | Options navigable | `aria-expanded="true"` `aria-haspopup="listbox"` |
| Hover (trigger) | Border `#6f8be6` | — | No ARIA |
| Focus | `2px border` + glow (default) or `box-shadow` (button) | `:focus-visible` on trigger div | Correct pattern |
| Selected option | Check icon + selected bg | — | `aria-selected="true"` on `<li role="option">` |
| Disabled (trigger) | `cursor: not-allowed` | No events | `aria-disabled="true"` |
| Disabled option | `opacity: 0.5` | Not selectable | `tabIndex="-1"` on option |
| Error | Red trigger border | — | `aria-describedby` → error |
| Loading | Not applicable | — | — |

---

#### Keyboard Behaviour

| Key | Action |
|---|---|
| `Tab` | Focus trigger |
| `Enter` or `Space` | Open/close dropdown |
| `↓` | Open dropdown and focus first option (or move to next) |
| `↑` | Open dropdown and focus last option (or move to previous) |
| `Enter` or `Space` (on option) | Select option; close dropdown; return focus to trigger |
| `Escape` | Close dropdown; return focus to trigger |
| `↓`/`↑` (on option) | Move to next/previous enabled option |

**Gap:** No `Home`/`End` key handling to jump to first/last option. No type-ahead search (pressing a letter key moves to the first option beginning with that letter).

---

#### Touch Behaviour

Native touch tap on trigger opens dropdown. Tap on option selects. Outside tap closes. Touch targets: options are `8px 12px` padding — minimum height ~36px; below 44px minimum. **Gap: option touch targets require audit.**

---

#### Focus Behaviour

Trigger is focusable via `Tab`. On open, `↓` moves focus to the first list option. Each `<li>` has `tabIndex={0}` when enabled, making options individually focusable in the listbox. On close (selection or Escape), focus returns to trigger.

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| Combobox role | `role="combobox"` on trigger — correct |
| aria-expanded | Present — correct |
| aria-haspopup | `"listbox"` — correct |
| aria-labelledby | Hardcoded `"select-label"` — **bug; breaks with multiple instances** |
| Listbox | `role="listbox"` on `<ul>` — correct |
| Option selection | `aria-selected` on `<li role="option">` — correct |
| Screen reader | Closes + announces selection on Enter — depends on `aria-label` of trigger being updated; **gap: selected value is visual only; trigger accessible name is not updated on selection** |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default | Full-width, with options |
| Button variant | Compact, in toolbar context |
| With placeholder | No default selection |
| With disabled option | One option disabled |
| Error state | `error={true}` |
| Disabled trigger | `disabled={true}` |
| Empty options | `options={[]}` |
| Dropdown flips above | Trigger near bottom of viewport |
| Keyboard navigation | Full keyboard walkthrough |
| Long option labels | |
| Theme: light and dark | |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| `aria-labelledby="select-label"` hardcoded | Critical | Accept `id` and `label` props; generate association dynamically |
| Selected value not reflected in trigger accessible name | High | Update `aria-label` on trigger when selection changes |
| No `Home`/`End` key navigation | Medium | Add keyboard handler |
| No type-ahead search | Low | Add letter-key navigation to option list |
| Option touch targets below 44px | Medium | Increase option padding or minimum height |
| Dropdown flip not SSR-safe | Medium | Document SSR caveat; default to bottom on server |

---

### MultiSelect

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Unregistered tokens in use; dropdown tokens appear inverted (light values in dark context) |
| Specification confidence | High |
| Known gaps | Dropdown token mismatch · `aria-labelledby` hardcoded · No keyboard navigation from search input to options via arrow keys (partially implemented) · `allowCreate` not validated |

#### Purpose

A multi-selection combobox with search-in-dropdown, chip display of selections, select-all/clear-all, maximum selection limit, and option creation. Use when users need to select multiple values from a list.

#### When to Use

- Tag selection, category filtering, permission assignment.
- Any field requiring one or more selections from a list.

#### When Not to Use

- Single selection — use `Select`.
- Very small option sets (≤ 3) — consider `Checkbox` group.

---

#### Anatomy

1. **Container** — position relative.
2. **Trigger** — `<div role="combobox">` containing chips + search input.
3. **Chip** — each selected value shown as a coloured tag with remove button.
4. **Search input** — `<input>` appears on open; filters options.
5. **Controls** — clear-all button + chevron, absolutely positioned right.
6. **Dropdown** — positioned below trigger (no position flip).
7. **Header** — "N of M selected" count + "Select All" / "Clear All" actions.
8. **Create row** — appears when search query matches no existing option and `allowCreate={true}`.
9. **Listbox** — `<ul role="listbox" aria-multiselectable="true">`.
10. **Option** — check icon (selected) or plus icon (unselected).

---

#### Props and API

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `MultiSelectOption[]` | — | `{ value, label, disabled? }[]` |
| `value` | `string[]` | — | Controlled selection |
| `defaultValue` | `string[]` | `[]` | Uncontrolled default |
| `onChange` | `(values: string[]) => void` | — | |
| `placeholder` | `string` | `'Select options...'` | |
| `maxSelection` | `number` | — | Caps selection count |
| `disabled` | `boolean` | `false` | |
| `error` | `boolean` | `false` | |
| `allowCreate` | `boolean` | `true` | Enables option creation from search |
| `onCreateOption` | `(option: MultiSelectOption) => void` | — | |

---

#### Token Issue — Dropdown

The dropdown background uses `--multi-select-dropdown-bg: var(--select-dropdown-bg, #ffffff)` — a white default. In dark theme, this means the dropdown may appear white unless `--select-dropdown-bg` is overridden. **This is a token mismatch: the dark theme uses a light dropdown fallback.** Verify and fix by defaulting to the surface overlay token.

---

#### States

| State | Visual | Accessibility |
|---|---|---|
| Default (closed) | Chips or placeholder visible | `aria-expanded="false"` |
| Open | Dropdown with search input | `aria-expanded="true"` |
| Selecting | Chip added; option shows check | `aria-selected="true"` on option |
| Deselecting | Chip removed; option shows plus | `aria-selected="false"` |
| At max selection | Options beyond limit show as disabled | Options with `tabIndex="-1"` |
| Error | Red trigger border | `aria-describedby` |
| Disabled | `cursor: not-allowed`; `aria-disabled` | |

---

#### Keyboard Behaviour

| Key | Action |
|---|---|
| `Tab` | Focus trigger; when open, search input is active |
| `Enter`/`Space` | Open dropdown when trigger focused |
| `↓` (from search) | Move focus to first listbox option |
| `Enter` (in search) | Select single filtered result or create new option |
| `Escape` | Close dropdown; return focus to trigger |
| `↑`/`↓` (on option) | Move between options — **Gap: not implemented on options; options require Tab navigation instead** |
| `Backspace` (in search, empty query) | **Gap: does not remove last chip** |

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| `aria-multiselectable` | `"true"` on `<ul role="listbox">` — correct |
| `aria-selected` | Set on each `<li role="option">` — correct |
| `aria-labelledby` | Hardcoded `"multi-select-label"` — **same bug as Select** |
| Chip remove button | `aria-label="Remove [option label]"` — correct |
| Clear-all button | `aria-label="Clear all selections"` — correct |
| Screen reader count | "N of M selected" visible text — adequate |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default | Empty, open dropdown |
| With pre-selected options | |
| With max selection | `maxSelection={3}` |
| Create mode | `allowCreate={true}`, type new value |
| Error state | |
| Disabled | |
| Keyboard navigation | Tab + arrow keys |
| Long option labels | |
| Theme: light and dark | Note dropdown token mismatch in dark |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| Dropdown bg defaults to `#ffffff` in dark theme | Critical | Default to `--cvp-color-surface-overlay` |
| `aria-labelledby` hardcoded | Critical | Same fix as Select |
| Arrow key navigation in listbox not implemented | High | Add keyboard handler on option `<li>` elements |
| Backspace does not remove last chip | Medium | Add input keydown handler |
| No position-flip for dropdown | Low | Dropdown always opens below |

---

### Checkbox

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Unregistered tokens in use; token variables reference undefined `--checkbox-default-*` variables |
| Specification confidence | High |
| Known gaps | State cycles false→true→indeterminate (non-standard for a checkbox) · Token variables reference undefined custom properties · `Enter` activates (non-standard: Space only per WCAG) |

#### Purpose

A binary selection control with optional indeterminate state. Supports label and description text. Use for boolean on/off settings, multi-item selection lists, and agreement confirmations.

#### When to Use

- Selecting one or more items from a list (each item is independent).
- Boolean settings (enable/disable a feature).
- Acknowledgement fields ("I agree to the terms").

#### When Not to Use

- Mutually exclusive choices — use Radio group.
- A single on/off toggle that takes effect immediately — use `Toggle`.
- Segmented multi-option views — use `Segmented`.

---

#### Anatomy

1. **Root** — `<label>` element wrapping all children (makes the entire label area clickable).
2. **Hidden input** — `<input type="checkbox">` with `position: absolute; opacity: 0`.
3. **Visual box** — `<div class="checkbox__box">` with SVG icon inside.
4. **Icon** — SVG checkmark (checked state) or SVG dash (indeterminate state).
5. **Content area** — `<div>` containing label text and description.
6. **Label text** — `<span>`.
7. **Description** — `<span id={id-description}>` associated via `aria-describedby`.

---

#### Variants

No visual variants. The three checked states (`false`, `true`, `'indeterminate'`) are the states, not variants.

#### Sizes

No size prop — fixed 16×16px visual box.

---

#### Props and API

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean \| 'indeterminate'` | — | Controlled state |
| `defaultChecked` | `boolean \| 'indeterminate'` | `false` | Uncontrolled default |
| `onChange` | `(checked: CheckboxState) => void` | — | |
| `disabled` | `boolean` | `false` | |
| `label` | `string` | — | Label text |
| `description` | `string` | — | Secondary description |
| `id` | `string` | — | ID for the hidden input |
| `name` | `string` | — | Form name |
| `value` | `string` | — | Form value |

---

#### Visual Specification

| Element / property | Unchecked | Checked | Indeterminate | Disabled |
|---|---|---|---|---|
| Box bg | `var(--checkbox-default-bg)` | `var(--checkbox-checked-bg-color)` | Same as checked | `var(--checkbox-disabled-bg-color)` |
| Box border | `var(--checkbox-default-border)` | `var(--checkbox-checked-border-color)` | Same | `var(--checkbox-disabled-border-color)` |
| Icon | Hidden | Checkmark SVG | Dash SVG | Matches state |
| Icon colour | — | `var(--checkbox-checked-text-color)` | Same | `var(--checkbox-disabled-checked-icon-color)` |
| Label colour | `var(--foreground)` | Same | Same | `var(--checkbox-disabled-text-color)` |
| Box size | 16×16px | 16×16px | 16×16px | 16×16px |
| Border radius | `3px` | `3px` | `3px` | `3px` |
| Focus ring | `box-shadow: 0 0 0 2px var(--focus-ring)` on hidden input `:focus-visible` | Same | Same | N/A |

**Token gap:** All `--checkbox-default-bg`, `--checkbox-checked-bg-color` etc. tokens are set in component CSS as `var(--checkbox-default-bg)` but never given a fallback value. If the environment does not define these, the checkbox will be invisible (no bg, no border). This must be resolved before any production use. The CVP token files do not define these either.

---

#### Component Token Contract

**Current state:** References `--checkbox-default-bg`, `--checkbox-checked-bg-color`, `--checkbox-hover-border-color`, etc. — none defined in CVP files.

**CVP migration targets:**

| Current | CVP target |
|---|---|
| `--checkbox-default-bg` | `--cvp-color-surface-default` |
| `--checkbox-default-border` | `--cvp-color-border-default` |
| `--checkbox-checked-bg-color` | `--cvp-color-brand-default` |
| `--checkbox-checked-border-color` | `--cvp-color-brand-default` |
| `--checkbox-checked-text-color` | `--cvp-color-text-inverse` |
| `--checkbox-hover-border-color` | `--cvp-color-border-brand` |
| `--checkbox-disabled-bg-color` | `--cvp-color-surface-disabled` |
| `--checkbox-disabled-border-color` | `--cvp-color-border-disabled` |
| `--checkbox-disabled-text-color` | `--cvp-color-text-disabled` |

---

#### States

| State | Visual | Accessibility |
|---|---|---|
| Unchecked | Empty box | `aria-checked="false"` |
| Checked | Checkmark icon; brand bg | `aria-checked="true"` |
| Indeterminate | Dash icon; brand bg | `aria-checked="mixed"` — correct per ARIA spec |
| Hover | Border darkens | No ARIA change |
| Focus | Box-shadow ring via hidden input `:focus-visible` | Correct |
| Disabled unchecked | Muted bg and border | `disabled` attribute; `tabIndex="-1"` |
| Disabled checked | Muted filled bg; dimmed icon | `disabled` attribute |

---

#### Interaction Behaviour

**State cycling (non-standard):** The component cycles: `false → true → 'indeterminate' → false`. Standard checkboxes do not cycle into indeterminate via user interaction — indeterminate is a programmatic state (e.g. "some children selected" in a tree). This cycling behaviour is non-standard and may surprise users. **Design decision required:** Retain or remove the cycle.

**Mouse:** Click the label or box to cycle state.

**Keyboard:** `Tab` focuses the hidden `<input>`. `Space` activates (standard). `Enter` also activates — **non-standard for checkboxes: WCAG expects Space only**. Activating with `Enter` may conflict with form submission in some browsers.

**Programmatic:** `checked` prop controls state (controlled). `onChange` receives the new state.

---

#### Focus Behaviour

Focus is on the hidden `<input type="checkbox">`. `:focus-visible` is used on the hidden input to drive the visible box's `box-shadow` ring — correct ARIA and focus pattern.

---

#### Validation Behaviour

No built-in validation. The checkbox does not show an error state or error message. Required validation must be handled by the parent `<form>` or a form library.

**Gap:** No `aria-required` on the hidden input. No error message slot.

---

#### Touch Behaviour

The entire `<label>` element is the touch target. The visual box is 16×16px but the label text extends the touch area. Bare checkboxes (no label) have a 16×16px touch target — below the 44px minimum. **For bare checkboxes, add `min-width: 44px; min-height: 44px` padding.**

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| Role | `<input type="checkbox">` — native; correct |
| `aria-checked="mixed"` | Implemented for indeterminate — correct |
| `aria-describedby` | Points to description span — correct |
| Focus ring | `:focus-visible` on hidden input → visible box ring — correct |
| `Enter` key | Activates — non-standard; may conflict with forms |
| Touch target | Label extends area; bare checkbox is 16px — gap |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Unchecked | Default state |
| Checked | `checked={true}` |
| Indeterminate | `checked="indeterminate"` |
| With label | `label="Enable feature"` |
| With label and description | |
| Disabled unchecked | |
| Disabled checked | |
| Disabled indeterminate | |
| Controlled | Value driven by parent state |
| Uncontrolled | `defaultChecked` |
| Keyboard navigation | Space activates; Enter behaviour documented |
| Touch target (bare) | Without label — shows touch target gap |
| Theme: light and dark | |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| Token variables have no fallback values — checkbox invisible without env tokens | Critical | Add fallback hex values or migrate to `--cvp-*` tokens immediately |
| `Enter` key activates — non-standard | Medium | Document or remove (keep only Space) |
| State cycling into indeterminate via click — non-standard | Medium | Design decision: retain or make indeterminate programmatic-only |
| No error state | Medium | Add error variant with `aria-invalid` and error message |
| Touch target for bare checkbox | High | Add min 44px click area |
| `aria-required` not set | Medium | Add when `required` context is needed |

---

### Toggle

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Unregistered tokens in use; many hardcoded hex values |
| Specification confidence | High |
| Known gaps | All colour values hardcoded · Indeterminate is non-standard for a switch · Hover changes to brand-hover blue (not a switch-typical hover) · `Enter` activates (non-standard) |

#### Purpose

A switch control for binary on/off settings that take immediate effect. Distinguishable from `Checkbox` by the pill-and-thumb visual and its intent: Toggles represent immediate actions; Checkboxes represent form submission values.

#### When to Use

- Enabling or disabling a setting (dark mode, notifications, permission).
- Real-time preferences that apply without a save button.

#### When Not to Use

- Form submission values — use `Checkbox`.
- Selecting from a set of options — use `Segmented` or Radio.
- Settings that require confirmation before applying — use a `Checkbox` + submit button pattern.

---

#### Anatomy

1. **Root** — `<label>` wrapping all children.
2. **Hidden input** — `<input type="checkbox">` with `opacity: 0`.
3. **Switch track** — `<div class="toggle__switch">` — pill-shaped container.
4. **Thumb** — `<div class="toggle__thumb">` — circular slider inside track.
5. **Indeterminate icon** — `<div class="toggle__indeterminate-icon">` — horizontal dash (only in indeterminate state).
6. **Content** — label text and description.

---

#### Sizes

| Size | Track W × H | Thumb size |
|---|---|---|
| `default` | 36 × 20px | 16px |
| `small` | 28 × 16px | 12px |

---

#### Props and API

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled on/off state |
| `defaultChecked` | `boolean` | `false` | Uncontrolled default |
| `onChange` | `(checked: boolean) => void` | — | |
| `disabled` | `boolean` | `false` | |
| `label` | `string` | — | |
| `description` | `string` | — | |
| `size` | `'default' \| 'small'` | `'default'` | |
| `indeterminate` | `boolean` | `false` | Shows dash in track; on click always transitions to `true` |
| `id`, `name`, `value` | `string` | — | Form attributes |

---

#### Visual Specification

| Property | Off | On | Hover (off) | Disabled off | Disabled on |
|---|---|---|---|---|---|
| Track bg | `#45454a` | `#3d63dd` | `#6f8be6` | `#4a4a4a` | `#A1A1A8` |
| Track border | Same as bg | Same | Same | Same | Same |
| Thumb bg | `#fff` | `#fff` | `#fff` | `#A1A1A8` | `#333` |
| Thumb position | Left (`left: 2px`) | Right (computed) | Left | Left | Right |
| Focus ring | `box-shadow: 0 0 0 2px var(--focus-ring)` | — | — | — | — |
| Animation | `toggle-pulse` scale 0.2s on click | | | | |

**Hover issue:** Hover turns the track blue (`#6f8be6` — the focus-border colour). This means hovering an off-state toggle makes it look like the brand primary colour, which could be confused for the on state. **Design review recommended.**

**Indeterminate:** Track is brand-coloured but thumb is hidden; a horizontal dash is shown centred in the track. On click, always transitions to `true` (on). This is non-standard — the switch ARIA spec does not include a "mixed" state. `aria-checked="mixed"` is emitted, which is technically correct for a checkbox but unusual for a switch.

---

#### Component Token Contract

**All values are hardcoded hex in the component.** No `var(--...)` references for colours except `var(--focus-ring)` (old shorthand token). CVP migration targets:

| Property | CVP target |
|---|---|
| Track off bg | `--cvp-color-surface-active` or dedicated `--cvp-toggle-bg` |
| Track on bg | `--cvp-color-brand-default` |
| Track hover bg | `--cvp-color-brand-hover` |
| Track disabled | `--cvp-color-surface-disabled` |
| Thumb bg | `--cvp-color-text-inverse` (white) |
| Focus ring | `--cvp-focus-ring-color` |

---

#### States

| State | Visual | Accessibility |
|---|---|---|
| Off | Grey track | `aria-checked="false"` |
| On | Brand blue track; thumb right | `aria-checked="true"` |
| Indeterminate | Blue track; dash icon; no thumb | `aria-checked="mixed"` |
| Hover (off) | Track turns blue | No ARIA change |
| Focus | Box-shadow ring | `:focus-visible` on hidden input — correct |
| Disabled off | Muted grey | `disabled`; `tabIndex="-1"` |
| Disabled on | Muted grey + dark thumb | `disabled` |
| Animating | Scale pulse on track | — |

---

#### Interaction Behaviour

**Mouse:** Click label or track to toggle.

**Keyboard:** `Space` activates — correct for switch/checkbox. `Enter` also activates — non-standard (same issue as Checkbox). The `handleKeyDown` on the `<label>` handles both.

**Animation:** `toggle-pulse` (`scale` 0.95 → 1) plays on click. Under `prefers-reduced-motion: reduce`: **gap — no media query; animation plays regardless**.

---

#### Focus Behaviour

Identical pattern to Checkbox: hidden input receives keyboard focus; `:focus-visible` drives visible track's `box-shadow` ring.

---

#### Disabled Behaviour

`disabled` HTML attribute set on hidden input. `tabIndex="-1"` prevents keyboard focus. `cursor: not-allowed` on root. Correct.

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| Role | `<input type="checkbox">` with implicit switch semantics — technically sufficient; explicit `role="switch"` would be more semantic |
| `aria-checked` | `"true"` / `"false"` / `"mixed"` — correct values |
| Label | Via `<label>` wrapping; or `label` prop text |
| Description | `aria-describedby` — correct |
| Focus | `:focus-visible` on hidden input — correct |
| `role="switch"` | **Not set** — `<input type="checkbox">` is used; some screen readers do not announce this as a switch without the explicit role |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Off state | Default |
| On state | `checked={true}` |
| Small size | `size="small"` |
| Indeterminate | `indeterminate={true}` |
| With label | |
| With description | |
| Disabled off | |
| Disabled on | |
| Animated click | Observe pulse animation |
| Reduced motion | Confirm animation suppressed |
| Theme: light and dark | |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| All colours hardcoded | High | Migrate to `--cvp-*` tokens |
| `prefers-reduced-motion` not handled | High | Add media query to suppress pulse |
| Hover blue may be confused with on state | Medium | Design review |
| `role="switch"` not explicit | Medium | Add `role="switch"` to hidden input |
| `Enter` key activates (non-standard) | Low | Document or remove |
| Indeterminate is non-standard for switch | Low | Document design intent |

---

### Segmented

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Unregistered tokens in use (`--segmented-*`, `--background`, `--foreground`, `--focus-ring`) |
| Specification confidence | High |
| Known gaps | No arrow key navigation (roving tabindex set but no keyboard handler) · `--background` and `--foreground` are shadcn tokens · `tablist` role with no active tab management |

#### Purpose

A segmented control (button group) for selecting a single option from a small, fixed set. Visually presents options as a connected group, unlike Radio where options are separated.

#### When to Use

- Selecting a view mode (e.g. "List" / "Grid" / "Map").
- Toggling between a small set of content filters (≤ 5 options).
- Navigation within a panel or card (not page-level navigation — use Tabs for that).

#### When Not to Use

- More than 5–6 options — use `Select` or Radio group.
- Page navigation — use `Tabs`.
- Boolean settings — use `Toggle`.
- Form submission values — use Radio group.

---

#### Anatomy

1. **Container** — `<div role="tablist" aria-orientation="horizontal">`.
2. **Segment** — `<button role="tab">` for each option; `aria-selected` for selected state.

---

#### Variants

| Variant | Description |
|---|---|
| `default` | Neutral background for selected item |
| `color` | Brand-coloured selected item; different container background |

#### Sizes

| Size | Font size | Padding |
|---|---|---|
| `small` | `var(--type-scale-s-size)` = 13px | `--segmented-small-padding` |
| `medium` (default) | `var(--type-scale-m-size)` = 14px | `--segmented-medium-padding` |
| `large` | `var(--type-scale-l-size)` = unclear | `--segmented-large-padding` |

**Gap:** `--type-scale-l-size` is referenced in the large size but is not defined in the component's inline CSS — the large size will inherit the browser default or the theme-provided value if `--type-scale-l-size` is set externally.

---

#### Props and API

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `SegmentedOption[]` | — | Required. `{ value, label, disabled? }[]` |
| `value` | `string` | — | Controlled selected value |
| `defaultValue` | `string` | first option | Uncontrolled default |
| `onChange` | `(value: string) => void` | — | |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | |
| `variant` | `'default' \| 'color'` | `'default'` | |
| `className` | `string` | `''` | |

---

#### Visual Specification

| Element / property | Default variant | Color variant |
|---|---|---|
| Container bg | `var(--background)` | `var(--segmented-color-container-bg)` |
| Segment bg (unselected) | `transparent` | `transparent` |
| Segment bg (hover) | `var(--segmented-hover-bg)` | `var(--segmented-color-hover-bg)` |
| Segment bg (selected) | `var(--segmented-selected-bg)` | `var(--segmented-color-selected-bg)` |
| Selected text colour | `var(--foreground)` | `var(--segmented-color-selected-text)` |
| Selected shadow | `0 1px 2px rgba(0,0,0,0.03)` + multi-layer | Same |
| Focus ring | `outline: 2px solid var(--focus-ring)`, `offset: 2px` | Same |
| Disabled text | `var(--segmented-disabled-text)` | Same |

**Token issue:** `var(--background)` and `var(--foreground)` are shadcn/ui tokens, not CVP tokens. These must be migrated to `--cvp-color-surface-default` and `--cvp-color-text-primary` respectively.

**Focus ring implementation:** Uses `var(--focus-ring)` — old shorthand, not `--cvp-focus-ring-color`. Migrate in Phase 2. The focus pattern is correctly using `:focus-visible` — this is the best implementation among all form controls reviewed.

---

#### Component Token Contract

**CVP migration targets:**

| Current token | CVP target |
|---|---|
| `--background` | `--cvp-color-surface-default` |
| `--foreground` | `--cvp-color-text-primary` |
| `--segmented-selected-bg` | Dedicated `--cvp-segmented-selected-bg` → `--cvp-color-surface-raised` |
| `--segmented-hover-bg` | `--cvp-segmented-hover-bg` → `--cvp-color-surface-hover` |
| `--segmented-disabled-text` | `--cvp-color-text-disabled` |
| `--focus-ring` | `--cvp-focus-ring-color` |
| `--segmented-color-selected-bg` | `--cvp-segmented-color-selected-bg` → `--cvp-color-brand-default` |
| `--segmented-color-selected-text` | `--cvp-color-text-inverse` |

---

#### States

| State | Visual | Accessibility |
|---|---|---|
| Unselected | Transparent segment | `aria-selected="false"` |
| Selected | Raised bg with shadow | `aria-selected="true"` |
| Hover (unselected) | Subtle bg | No ARIA change |
| Focus | `outline: 2px solid` at `2px` offset | `:focus-visible` — correct |
| Disabled option | Muted text; `disabled` attr | `tabIndex` removed by `disabled` |

---

#### Keyboard Behaviour

**Current state (gap):** The container is `role="tablist"`. Each segment has `role="tab"`. The selected tab has `tabIndex={0}`; unselected tabs have `tabIndex={-1}` — this is the roving tabindex pattern. However, **no `onKeyDown` handler is present on the container or segments** to move focus on `←`/`→` arrow keys. Users must Tab through all elements to reach the desired option — this violates the `tablist` keyboard contract (WCAG §Keyboard — tablist requires arrow key navigation).

| Key (expected) | Expected action | Actual |
|---|---|---|
| `Tab` | Enter tablist; focus selected tab | Works |
| `←` / `→` | Move to prev/next tab | **Not implemented** |
| `Space` / `Enter` | Select focused tab | Click handler only |
| `Home` / `End` | Jump to first/last | **Not implemented** |

---

#### Focus Behaviour

Roving tabindex is configured but arrow key navigation is missing. The container receives no keyboard events. Fix: add `onKeyDown` on the container `<div role="tablist">` to handle `ArrowLeft`/`ArrowRight` and `Home`/`End`, updating the focused element programmatically.

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| Role | `tablist` + `tab` — semantically appropriate for Segmented use |
| `aria-selected` | Set correctly |
| `aria-controls` | Present (`panel-{value}`) — but no corresponding panel elements exist in the component. Panels are expected to be rendered by the parent. |
| Arrow key navigation | **Missing — WCAG violation** |
| Focus ring | Correctly `:focus-visible` only |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default, medium | 3 options |
| Color variant | |
| All sizes | small / medium / large |
| With disabled option | |
| Controlled | External state management |
| Keyboard navigation | Arrow key gap must be visible in story |
| Full-width | Using `panel-full-width-horizontal` class |
| Theme: light and dark | Note `--background` token gap in dark |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| No arrow key navigation — WCAG violation for `tablist` role | Critical | Add `onKeyDown` with `ArrowLeft`/`ArrowRight`/`Home`/`End` |
| `--background` and `--foreground` are shadcn tokens | High | Migrate to `--cvp-*` |
| `--focus-ring` is old shorthand token | Medium | Migrate to `--cvp-focus-ring-color` |
| `--type-scale-l-size` undefined in component | Medium | Add fallback or define in component |
| `aria-controls` panel elements not in component — parent contract | Low | Document that parent must render panels with matching IDs |

---

*Actions and Form Controls specification complete. Navigation, Overlays, Feedback, and remaining families to follow in subsequent passes.*

---

## Part C — Navigation and Wayfinding

> **Family scope.** The CVP Navigation family comprises four publishable components: `HeaderNavigation`, `PageSideNav`, `Breadcrumbs`, and `Tabs`. `DesignSystemNav` exists in the repository but is an internal documentation-site component only and is excluded from the publishable specification. `Accordion` and `Tree` are classified as Data Display in the component inventory (Pass 6) but serve wayfinding functions; they are documented in Part D (Data Display). `Segmented` was documented in Part B (Form Controls) as it is classified there.

> **Family-wide token migration note.** All Navigation components define their styling via inline `<style>` blocks. Token coverage is mixed: `HeaderNavigation` partially consumes `--cvp-color-nav-*` tokens (from the semantic layer); `PageSideNav`, `Breadcrumbs`, and `Tabs` use unregistered component-level tokens referencing old shorthand tokens (`--bg-base`, `--text-secondary`, `--border-default`, `--icon-muted`, `--text-primary`, `--bg-hover`, `--muted`, `--focus-ring`, etc.). These old shorthand tokens are not part of the canonical CVP three-tier architecture and must be migrated to `--cvp-*` tokens in Phase 2.

> **Family-wide gap — click-outside keyboard pattern.** `HeaderNavigation`, `Breadcrumbs`, and PageSideNav dropdown menus close on external `mousedown` events but do not close on external `pointerdown` or `touchstart`. On mobile, some taps produce no `mousedown` — menus may not close. All dropdown close handlers should use `pointerdown` instead of `mousedown`, or use a React portal with a transparent backdrop element.

> **Family-wide gap — `transition: all`.** `HeaderNavigation` and `PageSideNav` both use `transition: all 150ms ease` or `transition: all 0.2s ease`. Replace with explicit property lists.

> **Family-wide gap — routing.** No Navigation component integrates with a client-side router. Items render as `<a href>` when `href` is provided, or as `<button>` otherwise. SPA route handling (e.g. React Router `<Link>`) must be implemented by the consumer. This is a **Specification gap** — the routing contract is not defined in the repository and must be resolved before shipping.

---

### HeaderNavigation

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Partial — consumes `--cvp-color-nav-*` (semantic layer) for some values; other values hardcoded or reference old type-scale tokens |
| Specification confidence | High |
| Known gaps | No Escape key handler for open dropdowns · No `role="menu"` / `role="menuitem"` on dropdown options · No click-outside keyboard/touch parity · Avatar initials are hardcoded "JD" (not derived from `userName`) · Team dropdown not in current layout — present in implementation but wired to right panel only |

#### Purpose

The global application header. Renders at the top of every application page. Contains the product logo + brand name, account switcher, help action, team switcher, and user menu with account details and logout. Serves as the primary orientation and context-switching surface.

#### When to Use

- Once per application, at the top of the page root layout.
- Always visible; not context-dependent.

#### When Not to Use

- Embedded within a dialog, panel, or scrollable region — it must be a page-level element.
- A secondary toolbar — use a dedicated toolbar component (not yet implemented).

---

#### Anatomy

1. **Root** — `<header class="header-navigation">` — 45px fixed or static height; full viewport width; `z-index: 1000` when fixed.
2. **Left section** — brand logo + brand name + account dropdown.
3. **Brand** — SVG logo (24×24px) + `<span>` brand text ("Rail Manager").
4. **Brand separator** — 1px vertical line, 16px tall.
5. **Account dropdown** — `<button>` trigger (Building icon + account name + chevron) + dropdown menu.
6. **Centre section** — empty flex spacer (reserved for future navigation links).
7. **Right section** — help button + separator + team dropdown + user avatar button + user dropdown.
8. **Help button** — `<button>` with `HelpCircle` icon; 28×28px; uses `icon-btn-*` tokens.
9. **Separator** — 1px vertical line.
10. **Team dropdown** — `<button>` trigger (Users icon + team name + chevron) + dropdown menu.
11. **User avatar button** — `<button>` with 20×20px initials circle; opens user dropdown.
12. **User dropdown** — email display + Account Details + Switch Theme + Log Out options.

---

#### Variants

| Variant | Description | Position |
|---|---|---|
| `fixed` (default) | `position: fixed; top: 0; left: 0; right: 0` | Sticks to top; z-index 1000 |
| `static` | `position: relative; width: 100%` | In document flow |

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `accounts` | `Account[]` | Sample data | No | Accounts for account switcher |
| `selectedAccountId` | `string` | First account | No | Controlled selected account |
| `onAccountChange` | `(id: string) => void` | — | No | |
| `teams` | `Team[]` | Sample data | No | Teams for team switcher |
| `selectedTeamId` | `string` | First team | No | |
| `onTeamChange` | `(id: string) => void` | — | No | |
| `userName` | `string` | `"Jane Doe"` | No | Displayed name (used for avatar initials — **gap: currently hardcoded to "JD"**) |
| `userEmail` | `string` | `"jane.doe@doe.com"` | No | Shown in user dropdown header |
| `onHelpClick` | `() => void` | — | No | Help button callback |
| `onAccountDetails` | `() => void` | — | No | |
| `onThemeSwitch` | `() => void` | — | No | |
| `onLogOut` | `() => void` | — | No | |
| `variant` | `'fixed' \| 'static'` | `'fixed'` | No | |
| `className` | `string` | `''` | No | |

---

#### Visual Specification

| Element / property | Default token (current) | State / variant | Target CVP token |
|---|---|---|---|
| Header height | `45px` (hardcoded via `--header-height`) | — | `--cvp-header-height` |
| Background | `transparent` | — | `--cvp-header-bg` → `--cvp-color-surface-base` |
| Border bottom | `1px solid #2a2a35` | Light: `1px solid #e5e7eb` | `--cvp-header-border` → `--cvp-color-border-subtle` |
| z-index (fixed) | `1000` (hardcoded) | — | Local |
| Brand text colour | `var(--header-logo-color, #fff)` | — | `--cvp-color-text-primary` |
| Nav item colour | `var(--header-nav-color, #bbb)` | Hover: `var(--header-nav-hover-color, #fff)` | `--cvp-color-nav-text` |
| Account/team button hover | `rgba(255,255,255,0.1)` | — | `--cvp-color-interactive-overlay` |
| Dropdown bg | `var(--menu-bg)` | — | `--cvp-color-surface-overlay` |
| Dropdown option hover | `var(--menu-item-hover-bg)` | — | `--cvp-color-surface-hover` |
| Dropdown selected | `var(--menu-item-active-bg)` | — | `--cvp-color-surface-selected` |
| User avatar bg | `#3d63dd` (hardcoded) | — | `--cvp-color-brand-default` |
| Focus ring | `box-shadow: 0 0 0 2px #67b3fb` | Options: inset `box-shadow` | `--cvp-focus-ring-color` |
| Separator | `var(--header-separator-color, #333)` | — | `--cvp-color-border-subtle` |
| Help button | Uses `--icon-btn-*` tokens | — | Defers to `IconButton` token contract |

---

#### Component Token Contract

**Current tokens (partial CVP, inline):**

| Token | Source | CVP target |
|---|---|---|
| `--header-height` | Inline | `--cvp-header-height` |
| `--header-bg` | Inline (transparent) | `--cvp-color-surface-base` |
| `--header-border-bottom` | Hardcoded `#2a2a35` | `--cvp-color-border-subtle` |
| `--header-logo-color` | Inline fallback `#fff` | `--cvp-color-text-primary` |
| `--header-nav-color` | Inline fallback `#bbb` | `--cvp-color-nav-text` |
| `--header-button-hover-bg` | Hardcoded `rgba(255,255,255,0.1)` | `--cvp-color-interactive-overlay` |
| `--menu-bg` | References old `--menu-bg` shorthand | `--cvp-color-surface-overlay` |
| `--menu-item-hover-bg` | References old shorthand | `--cvp-color-surface-hover` |
| `--menu-item-active-bg` | References old shorthand | `--cvp-color-surface-selected` |

**Registered CVP partial usage:** `--cvp-color-nav-*` tokens are used indirectly via the `--header-nav-*` custom properties in the semantic layer.

---

#### Dropdown Menu Structure

Three dropdown menus share the same structure and animation pattern:
- **Open state:** `opacity: 1; visibility: visible; transform: translateY(0)`.
- **Closed state:** `opacity: 0; visibility: hidden; transform: translateY(-8px)`.
- **Animation:** `transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease`.
- **Position:** Absolute, `top: 100%; margin-top: 4px`. Account dropdown opens left-aligned; user dropdown opens right-aligned.
- **Max-height:** `300px; overflow-y: auto`.
- **Min-width:** `200px` (account, team) / auto (user).

---

#### States

| State | Visual change | Behaviour | Accessibility |
|---|---|---|---|
| Default | Header visible | Fixed to top | `<header>` landmark |
| Account dropdown open | Dropdown animates in | Click-outside closes | `aria-expanded="true"` on trigger |
| Team dropdown open | Same pattern | Only one dropdown open at a time | `aria-expanded="true"` |
| User dropdown open | Right-aligned dropdown | Same close behaviour | `aria-expanded="true"` |
| Option hover | `var(--menu-item-hover-bg)` bg | `cursor: pointer` | No ARIA change |
| Option selected (account/team) | `var(--menu-item-active-bg)` bg | Visual indicator of current selection | **Gap:** No `aria-checked` or `aria-selected` on selected option |
| Help focused | `box-shadow` ring | `:focus-visible` | Correct |
| Trigger focused | `box-shadow` ring | `:focus-visible` | Correct |
| Option focused | Inset `box-shadow` ring | `:focus-visible` | Correct |
| Responsive ≤768px | Username text hidden | Avatar only | Name hidden but label unchanged |
| Responsive ≤480px | Smaller icons, condensed padding | — | — |

---

#### Keyboard Behaviour

| Key | Action | Status |
|---|---|---|
| `Tab` | Cycles through focusable header elements left-to-right | Correct |
| `Enter` / `Space` on trigger | Opens / closes dropdown | Correct (native `<button>`) |
| `↓` / `↑` on open dropdown | **Not implemented** — focus does not move through options | **Gap: critical accessibility issue** |
| `Escape` on open dropdown | **Not implemented** — dropdown does not close | **Gap: critical** |
| `Enter` / `Space` on option | Selects option; closes dropdown | Correct (native `<button>`) |
| `Tab` inside open dropdown | Moves focus through options in DOM order | Works, but non-standard for menu role |

**Critical accessibility gaps:**
1. Arrow key navigation inside open dropdown not implemented — screen reader users cannot navigate.
2. `Escape` does not close the dropdown.
3. Dropdown options do not have `role="menuitem"` — they are plain `<button>` elements inside a `<div>`. For a disclosure menu pattern, `<button>` elements are technically sufficient but `role="menu"` / `role="menuitem"` is the correct ARIA pattern for a popup menu.
4. No focus restoration to the trigger after option selection (selection closes the dropdown but does not explicitly refocus the trigger — browser handles this via the `<button>` onClick, which may or may not restore focus depending on the browser).

---

#### Focus Behaviour

All triggers use `:focus-visible` with `box-shadow: 0 0 0 2px #67b3fb`. Dropdown options use inset `box-shadow: inset 0 0 0 2px #67b3fb`. This is the correct visual treatment. The keyboard navigation gap means focus management inside open menus is incomplete.

---

#### Responsive Behaviour

| Breakpoint | Change |
|---|---|
| ≤768px | Username text hidden (avatar initials only); reduced padding; help button shrinks to 28px |
| ≤480px | Brand text smaller (12px); all icons smaller; condensed padding; avatar 18px |

**Gap:** The centre slot (currently empty) has no responsive behaviour defined. When centre navigation links are added, overflow handling must be specified.

**Gap:** No mobile drawer / hamburger menu pattern. The header collapses content but does not provide a mobile-first navigation drawer. This is a specification gap for the mobile navigation pattern.

---

#### Accessible Name Requirements

| Element | `aria-label` |
|---|---|
| Account trigger | `"Select account"` — correct |
| Team trigger | `"Select team"` — correct |
| User trigger | `"User menu"` — correct |
| Help button | `"Help"` — correct |
| Logo SVG | `role="img" aria-label="CVP Logo"` — correct |

**Gap:** Selected option within account and team dropdowns has no `aria-checked="true"` or `aria-selected="true"` — screen readers cannot determine which option is currently active.

---

#### Content Rules

| Element | Rules |
|---|---|
| Brand name | Short product name (≤ 20 chars); `white-space: nowrap` |
| Account name | Truncated if long — `white-space: nowrap` on trigger; dropdown shows full name |
| Team name | Same as account name |
| User avatar | 2-character initials; derived from `userName` — **gap: currently hardcoded "JD"** |
| User email | Full email shown in dropdown header; `white-space: nowrap` with `overflow-x: auto` on dropdown |

---

#### Accessibility

| Requirement | Status |
|---|---|
| `<header>` landmark | ✓ |
| Accessible names on all controls | ✓ |
| `:focus-visible` focus rings | ✓ |
| Dropdown close on outside click | ✓ (mousedown) |
| Arrow key navigation in dropdowns | **Gap** |
| Escape closes dropdown | **Gap** |
| `aria-selected` / `aria-checked` on active option | **Gap** |
| `role="menu"` / `role="menuitem"` | **Gap** |
| Mobile touch close | **Gap** |
| Avatar initials derived from userName | **Gap** |

---

#### Motion

| Animation | Property | Duration | Easing |
|---|---|---|---|
| Dropdown open/close | `opacity`, `visibility`, `transform` | 200ms | `ease` |
| Chevron rotation (open state) | `transform: rotate(180deg)` | 200ms | `ease` |
| Button hover | `background-color` | 200ms | `ease` |

**Gap:** No `prefers-reduced-motion` block. All animations play regardless of user preference.

---

#### Composition

- Renders at the root layout level, above page content.
- Fixed variant requires `padding-top: 45px` on the page body to prevent content overlap.
- The centre slot is reserved for page-level navigation links (not yet implemented).
- Account and team switchers are the App Switcher pattern for this design system.

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default (fixed) | With sample accounts, teams, user |
| Static variant | In document flow |
| Account dropdown open | `isAccountDropdownOpen={true}` via interaction test |
| Team dropdown open | |
| User dropdown open | |
| Long account name | 40-char account name |
| Responsive ≤768px | Shows avatar-only mode |
| Responsive ≤480px | Shows compressed layout |
| Keyboard navigation | Tab through all triggers; **shows arrow-key gap** |
| Theme: light | `data-theme="light"` — border changes |
| Theme: dark | Default |

---

#### Test Requirements

| Type | Coverage |
|---|---|
| Unit | `onAccountChange` fires; `onLogOut` fires; `variant="static"` applies correct position |
| Interaction | Click trigger opens dropdown; click outside closes; click option selects and closes; only one dropdown open at a time |
| Accessibility | axe scan; all `aria-label` values present; `aria-expanded` reflects open state |
| Visual regression | Default × both themes; all three dropdowns open |
| Responsive | 768px and 480px viewports |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| No arrow key navigation in dropdowns | Critical | Add `onKeyDown` with `↓`/`↑`/`Home`/`End`/`Escape` |
| Escape does not close dropdowns | Critical | Add global `keydown` listener or update handler |
| No `role="menu"` / `role="menuitem"` | High | Add ARIA roles or convert to disclosure button pattern with explicit menu role |
| No `aria-selected`/`aria-checked` on selected dropdown option | High | Add to selected account/team option |
| Avatar initials hardcoded "JD" | High | Derive from `userName` prop |
| Click-outside uses `mousedown` (not `pointerdown`) | Medium | Replace with `pointerdown` for mobile parity |
| No Escape handler | Critical | See arrow key gap above |
| No `prefers-reduced-motion` | Medium | Add media query |
| Centre slot undefined | Low | Document when navigation links are added |
| Token migration incomplete | High | Phase 2 migration task |
| No mobile drawer pattern | High | Design and implement mobile navigation drawer |
| `transition: all` on buttons | Medium | Replace with specific properties |

---

### PageSideNav

| Dimension | Status |
|---|---|
| Production implementation | Partial — no focus ring CSS defined; no `aria-current` on active item |
| Storybook stories | None |
| Token migration | Unregistered tokens in use (`--page-side-nav-*`); references old shorthands (`--bg-base`, `--bg-hover`, `--text-secondary`, `--text-primary`, `--text-tertiary`, `--icon-muted`, `--icon-strong`, `--border-default`, `--bg-surface-raised`) |
| Specification confidence | High |
| Known gaps | No `aria-current` on active item · No focus ring defined · No keyboard shortcut to open/close sidebar · No collapsed state · Polymorphic `<button>` / `<a>` has no routing contract · `transition: all` |

#### Purpose

The left sidebar primary navigation. Groups navigation items into labelled sections. Displays badges (counts) and an active-item indicator. Fills the full height of the content area beside it.

#### When to Use

- Primary application navigation with 5–20 items grouped into 2–5 labelled sections.
- Persistent sidebar navigation visible on all pages (not a contextual panel).

#### When Not to Use

- Global navigation — use `HeaderNavigation`.
- In-page tab navigation — use `Tabs`.
- Contextual panel navigation — use `Accordion` or a custom panel.
- Mobile-only context — this sidebar has no collapsed or mobile state (see Known Gaps).

---

#### Anatomy

1. **Root** — `<nav class="page-side-nav">` — 224px fixed width; full height via parent container.
2. **Inner** — `<div class="page-side-nav__inner">` — 16px padding; flex column; 24px section gap.
3. **Section** — `<div class="page-side-nav__section">` — one per section.
4. **Section title** — `<h3>` — 10px, uppercase, 600-weight, 0.05em letter-spacing.
5. **Items list** — `<div class="page-side-nav__items">` — 2px gap between items.
6. **Item** — `<button>` or `<a>` — 6px 8px padding; flex row; icon + label + (badge + indicator).
7. **Icon** — `<span class="page-side-nav__icon">` — 16px; `currentColor`.
8. **Label** — `<span class="page-side-nav__label">` — truncated with ellipsis.
9. **Badge** — `<span class="page-side-nav__badge">` — 10px; 500 weight; surface-raised bg.
10. **Indicator** — `<span class="page-side-nav__indicator">` — `ChevronRight` 14px; only on active item.

---

#### Variants

No visual variants. The sidebar has one style. Item state (active/inactive) is controlled via the `active` prop on each item.

#### Sizes

No size prop. Width is always 224px. Item font size is always 14px.

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `sections` | `PageSideNavSection[]` | — | Yes | Array of sections |
| `className` | `string` | `''` | No | |

**`PageSideNavSection`:**

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | Yes | Section header label |
| `items` | `PageSideNavItem[]` | Yes | Navigation items |

**`PageSideNavItem`:**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | |
| `label` | `string` | Yes | Visible label |
| `icon` | `React.ReactNode` | No | 16px icon |
| `badge` | `string \| number` | No | Count badge |
| `active` | `boolean` | No | Active/current page state |
| `onClick` | `() => void` | No | Action handler |
| `href` | `string` | No | Renders as `<a>` when provided |

---

#### Visual Specification

| Element / property | Default | Active state | Hover |
|---|---|---|---|
| Width | `224px` | — | — |
| Background | `var(--bg-base)` | — | — |
| Border right | `1px solid var(--border-default)` | — | — |
| Section title | 10px, `--text-tertiary`, uppercase | — | — |
| Item colour | `var(--text-secondary)` | `#6f8be6` | `var(--text-primary)` |
| Item background | `transparent` | `rgba(111,139,230,0.08)` | `var(--bg-hover)` |
| Item border radius | `6px` | `6px` | `6px` |
| Item transition | `all 150ms ease` | — | — |
| Icon colour | `var(--icon-muted)` | `#6f8be6` | `var(--icon-strong)` |
| Badge bg | `var(--bg-surface-raised)` | — | — |
| Badge colour | `var(--text-secondary)` | — | — |
| Indicator | Hidden | `ChevronRight` 14px, `#6f8be6` | Hidden |
| Focus ring | **None defined in CSS** | — | **Gap** |

**CVP migration targets:**

| Current | CVP target |
|---|---|
| `--bg-base` | `--cvp-color-surface-base` |
| `--border-default` | `--cvp-color-border-default` |
| `--text-secondary` | `--cvp-color-text-secondary` |
| `--text-primary` | `--cvp-color-text-primary` |
| `--text-tertiary` | `--cvp-color-text-tertiary` |
| `--bg-hover` | `--cvp-color-surface-hover` |
| `--icon-muted` | `--cvp-color-icon-default` |
| `--icon-strong` | `--cvp-color-icon-strong` |
| `#6f8be6` (active) | `--cvp-color-brand-secondary` or `--cvp-color-interactive-primary` |

---

#### Component Token Contract

**Public override tokens (migration target):**

| Token | Semantic source |
|---|---|
| `--cvp-side-nav-width` | Local (224px) |
| `--cvp-side-nav-bg` | `--cvp-color-surface-base` |
| `--cvp-side-nav-border` | `--cvp-color-border-default` |
| `--cvp-side-nav-item-color` | `--cvp-color-text-secondary` |
| `--cvp-side-nav-item-color-hover` | `--cvp-color-text-primary` |
| `--cvp-side-nav-item-color-active` | `--cvp-color-brand-secondary` |
| `--cvp-side-nav-item-bg-hover` | `--cvp-color-surface-hover` |
| `--cvp-side-nav-item-bg-active` | `rgba(111,139,230,0.08)` (local; no semantic equivalent) |
| `--cvp-side-nav-section-title-color` | `--cvp-color-text-tertiary` |
| `--cvp-side-nav-badge-bg` | `--cvp-color-surface-raised` |
| `--cvp-side-nav-badge-color` | `--cvp-color-text-secondary` |
| `--cvp-side-nav-indicator-color` | `--cvp-color-brand-secondary` |

---

#### Orientation and Hierarchy

- **Orientation:** Vertical, left-aligned, full-height.
- **Hierarchy:** Two levels — Section (group) → Item. No sub-items or nested navigation.
- **Section header** is a visual label (`<h3>`) only; it is not interactive.
- **Single active item** at a time — enforced by the caller (`active` prop on exactly one item).

---

#### States

| State | Visual | Behaviour | Accessibility |
|---|---|---|---|
| Default (inactive) | Muted text, transparent bg | Clickable | `<button>` or `<a>` |
| Active | Brand colour text + bg; chevron indicator | — | **Gap:** No `aria-current="page"` |
| Hover | Primary text; hover bg | `cursor: pointer` | No ARIA change |
| Focus | **No focus ring CSS defined** | `:focus-visible` would apply browser default | **Gap: critical** |
| Disabled | Not implemented | — | **Spec gap: no disabled prop** |

---

#### Interaction Behaviour

**Mouse:** Click item → triggers `onClick` or follows `href`. Active state controlled by consumer.

**Keyboard:** `Tab` cycles through all items in DOM order. Arrow key navigation is **not implemented** — this is a linear list, not a `role="navigation"` widget requiring arrow keys. `Tab` navigation is standard for navigation landmarks (links in a `<nav>` do not require roving tabindex).

**Touch:** Full item row is touchable (wide padding). Touch targets at 6px 8px padding → minimum height ~28px — below 44px minimum. **Gap: minimum height must increase to 44px.**

**Routing:** **Specification gap.** When `href` is provided, the item renders as `<a>`. In an SPA, this will trigger a full page load unless the consumer replaces the anchor with a router `<Link>`. The routing integration contract is not defined.

---

#### Focus Behaviour

**Critical gap:** No `:focus-visible` CSS is defined in the component. Items will receive the browser's default focus ring (usually a thin blue outline), which may not match CVP's focus style. The fix: add `.page-side-nav__item:focus-visible { outline: 2px solid var(--cvp-focus-ring-color); outline-offset: 2px; }`.

---

#### Active Item and `aria-current`

**Critical gap:** `aria-current="page"` is not set on the active item. This means screen readers cannot identify the current page in the navigation. Fix: add `aria-current={item.active ? "page" : undefined}` to the item element.

---

#### Navigation Semantics

The root element is `<nav>` — correct landmark role. The `<nav>` does not have an `aria-label`, which means if multiple `<nav>` elements exist on the page (e.g. `HeaderNavigation` + `PageSideNav`), they are indistinguishable in the landmarks list.

**Fix:** Add `aria-label="Page navigation"` (or a prop-driven label) to the `<nav>` element.

---

#### Responsive Behaviour

**Specification gap.** No responsive breakpoint is implemented. The sidebar is always 224px wide. There is no collapsed state, no icon-only mode, and no mobile drawer. At narrow viewports the sidebar will force horizontal scroll or overflow the layout container.

**Recommended pattern (not yet implemented):** Below 768px, the sidebar should hide or convert to a mobile drawer (accessible via a hamburger toggle in the header).

---

#### Badge Behaviour

Badges display a string or number. They do not have a semantic `aria-label` — a badge of `"3"` is not announced as "3 unread items" to screen readers. **Gap:** Add `aria-label` to the badge `<span>` or include a visually-hidden description.

---

#### Content Rules

| Element | Rules |
|---|---|
| Label | Short and descriptive (≤ 20 chars recommended); truncated with ellipsis when too long |
| Section title | Short category name; uppercase (via CSS); ≤ 15 chars |
| Badge | Numeric count or short string (≤ 3 chars); do not use for status only — use an icon |
| Icon | 16×16px; `currentColor`; must not be the only means of conveying state |

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| `<nav>` landmark | ✓ |
| `aria-label` on `<nav>` | **Gap** — add label to distinguish from other nav landmarks |
| `aria-current="page"` on active item | **Critical gap** |
| Focus ring | **Critical gap** — no CSS defined |
| Touch target | **Gap** — item height below 44px |
| Badge screen-reader text | **Gap** |
| Routing contract | **Specification gap** |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default | Two sections, 4 items each; one active |
| No badges | Clean state |
| With badges | Multiple items with count badges |
| Active item changes | Interaction test — click changes active |
| Long labels | Labels longer than 224px container |
| Single section | One section only |
| Without icons | Icons are optional |
| Theme: light and dark | Border and bg differences |
| Keyboard navigation | Tab through items; confirm focus ring (gap visible) |
| Missing `aria-current` | Visible in accessibility test |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| No focus ring CSS defined | Critical | Add `:focus-visible` style to `.page-side-nav__item` |
| No `aria-current="page"` on active item | Critical | Add `aria-current={active ? "page" : undefined}` |
| No `aria-label` on `<nav>` element | High | Add `aria-label` prop or hardcode "Page navigation" |
| Touch target below 44px | High | Increase item padding to minimum 12px 8px |
| No responsive/collapsed state | High | Design mobile sidebar pattern |
| Badge not accessible | Medium | Add `aria-label` to badge `<span>` |
| `transition: all` | Medium | Replace with explicit properties |
| Token migration | High | Phase 2 task |
| Routing contract undefined | High | Define SPA routing integration |
| No disabled item state | Low | Add `disabled` prop to `PageSideNavItem` |

---

### Breadcrumbs

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Unregistered tokens in use (`--breadcrumb-*`, `--breadcrumbs-*`); also references old shorthands (`--breadcrumb-bg`, `--breadcrumb-text`, `--breadcrumb-active`, `--breadcrumb-sep`, `--muted`, `--foreground`, `--border`, `--focus-ring`, `--input-border-radius`) |
| Specification confidence | High |
| Known gaps | Dropdown uses `mousedown` click-outside only · Dropdown has no `role="menu"` · Focus ring uses `#6f8be6` (old `--focus-border`) not `#67b3fb` (current focus ring token) · `aria-haspopup="true"` should be `"listbox"` or `"menu"` |

#### Purpose

A horizontal breadcrumb trail showing the user's location in the page hierarchy. Supports static items, clickable links, and items with dropdown menus (for overflow navigation to sibling pages). Includes a back-arrow icon on the first item.

#### When to Use

- Inside a page or panel header to show hierarchical location (page A > section B > detail C).
- When users frequently navigate back to parent pages.
- When a breadcrumb item needs to offer related sibling pages via a dropdown.

#### When Not to Use

- Top-level navigation — use `HeaderNavigation` or `PageSideNav`.
- Flat navigation without hierarchy (only one level).
- Inside a dialog — navigation breadcrumbs inside modals create confusing context.

---

#### Anatomy

1. **Root** — `<nav aria-label="Breadcrumb navigation">` — horizontal padding 24px, bottom border.
2. **List** — `<ol class="breadcrumbs__list">` — semantic ordered list.
3. **Item** — `<li class="breadcrumbs__item">` — inline-flex; first item gets `--first` modifier; last item gets `--current` modifier.
4. **Back arrow** — `ArrowLeft` 16px icon on the first item only; translates left on hover (`translateX(-2px)`).
5. **Link** — `<a>` or `<button>` rendered as `breadcrumbs__link` when `onClick` or `href` is provided.
6. **Static text** — `<span class="breadcrumbs__text">` when item has no interaction.
7. **Separator** — `<li role="presentation" aria-hidden="true">` — `ChevronRight` icon; not interactive; `pointer-events: none`.
8. **Dropdown container** — `<div class="breadcrumbs__dropdown-container">` — when `dropdown` prop is provided.
9. **Dropdown trigger** — `<button>` with chevron that rotates on open.
10. **Dropdown menu** — `<div class="breadcrumbs__dropdown-menu">` — positioned absolute, left-aligned.
11. **Dropdown list** — `<ul class="breadcrumbs__dropdown-list">`.
12. **Dropdown option** — `<a>` or `<button>` per option.
13. **Dropdown separator** — `<li role="separator">` for visual grouping.

---

#### Variants

No explicit variant prop. The component adapts based on item configuration:
- **Static item** — `<span>` (non-interactive).
- **Link item** — `<a>` or `<button>` with click handler.
- **Dropdown item** — `<button>` trigger + `<div>` dropdown menu.

The last item always renders as static current-page text (no hover, no link).

---

#### First Item — Back Link Pattern

The first breadcrumb item always renders with an `ArrowLeft` icon regardless of whether it has a custom icon. On hover, the arrow translates `translateX(-2px)` for a visual "retreat" effect. This is the **back-link pattern** — it communicates "go back" to the user even without a dedicated Back button.

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `items` | `BreadcrumbItem[]` | — | Yes | Ordered items, first = root, last = current |
| `separator` | `React.ReactNode` | `<ChevronRight>` | No | Custom separator |
| `className` | `string` | `''` | No | |

**`BreadcrumbItem`:**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | |
| `label` | `string` | Yes | Visible text |
| `icon` | `React.ComponentType` | No | 16px icon (not shown on first item — ArrowLeft always used) |
| `onClick` | `() => void` | No | Click handler |
| `href` | `string` | No | Renders `<a>` when provided |
| `dropdown` | `DropdownItemOption[]` | No | Dropdown items; renders dropdown trigger |

**`DropdownItemOption`:**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | |
| `label` | `string` | Yes | |
| `icon` | `React.ComponentType` | No | 14px icon |
| `onClick` | `() => void` | No | |
| `href` | `string` | No | |
| `separator` | `boolean` | No | Adds separator above this item |

---

#### Visual Specification

| Element / property | Default | Current item | First item | Hover |
|---|---|---|---|---|
| Font size | `14px` | `14px` | `14px` | — |
| Font weight | `400` | `400` | `400` | — |
| Item colour (first) | `#bbb` | — | `#bbb` | `#fff` |
| Item colour (middle) | `var(--breadcrumb-text)` | — | — | `#bbb` |
| Item colour (last/current) | — | `var(--breadcrumb-active)` | — | (not interactive) |
| Separator colour | `var(--breadcrumb-sep)` | — | — | — |
| Background | `var(--breadcrumb-bg)` | — | — | — |
| Border bottom | `1px solid var(--border-default)` | — | — | — |
| Padding | `12px 24px` | — | — | — |
| Back arrow hover | `translateX(-2px)` | — | — | — |
| Dropdown trigger open | Chevron rotates 180°; hover bg | — | — | — |
| Dropdown bg | `#292a2e` (hardcoded) | — | — | — |
| Dropdown option hover | `#333333` (hardcoded) | — | — | — |
| Focus ring | `outline: 2px solid #6f8be6; offset: 2px` | — | — | — |

**Focus ring discrepancy:** The current focus ring colour `#6f8be6` is the old `--focus-border` token (used for border on focus), not the ring colour `#67b3fb` (`--focus-ring`). The correct canonical focus ring colour is `#67b3fb`. **Flag for design alignment.**

**Hover colour logic is inverted between first and non-first items:**
- First item: starts `#bbb`, brightens to `#fff` on hover.
- Non-first items: start at `var(--breadcrumb-text)` (white in dark theme), dim to `#bbb` on hover.
This is an intentional design pattern to visually de-emphasise intermediate crumbs.

---

#### Component Token Contract

**CVP migration targets:**

| Current | CVP target |
|---|---|
| `--breadcrumb-bg` | `--cvp-color-surface-base` |
| `--breadcrumb-text` | `--cvp-color-text-secondary` |
| `--breadcrumb-active` | `--cvp-color-text-primary` |
| `--breadcrumb-sep` | `--cvp-color-text-tertiary` |
| `--border-default` | `--cvp-color-border-default` |
| `#292a2e` (dropdown bg) | `--cvp-color-surface-overlay` |
| `#333333` (dropdown hover) | `--cvp-color-surface-hover` |
| `#6f8be6` (focus colour) | `--cvp-focus-ring-color` (`#67b3fb`) — post alignment |

---

#### States

| State | Visual | Accessibility |
|---|---|---|
| Default — static last item | Current-colour text, non-interactive | `aria-current="page"` on `<li>` — correct |
| Default — interactive item | Breadcrumb-text colour | `<a>` or `<button>` |
| Hover — first item | `#fff` text; arrow moves left | No ARIA change |
| Hover — middle item | `#bbb` text | No ARIA change |
| Focus | `2px outline` at `2px` offset | `:focus-visible` — correct |
| Dropdown closed | Chevron down | `aria-expanded="false"` — correct |
| Dropdown open | Dropdown visible; chevron up | `aria-expanded="true"` — correct |
| Dropdown option hover | `#333333` bg | |

---

#### Keyboard Behaviour

| Key | Action | Status |
|---|---|---|
| `Tab` | Focus each interactive item and separator | Interactive items only; separators are `aria-hidden` |
| `Enter` / `Space` | Activate link or open dropdown | Correct (native elements) |
| `Escape` | **Not implemented** — open dropdown does not close | **Gap: critical** |
| `↓` / `↑` in dropdown | **Not implemented** — focus does not move | **Gap** |
| `Home` / `End` in dropdown | **Not implemented** | **Gap** |

---

#### Current Page Semantics

`aria-current="page"` is applied to the `<li>` element for the last breadcrumb item — technically correct per WAI-ARIA (the `aria-current` can be on the list item). **However**, the WAI-ARIA Breadcrumb pattern recommends placing `aria-current="page"` on the link element itself (the `<a>` or `<button>`), not the `<li>`. Current implementation uses the last item as static text (no `<a>`), which is acceptable, but if the last item is ever made interactive, `aria-current` must move to the interactive element.

---

#### Separator Semantics

Separators use `role="presentation"` and `aria-hidden="true"` — correct. They are `<li>` elements which technically should not have `role="presentation"` if they are inside an `<ol>`. The correct approach: use `aria-hidden="true"` only (or render separators outside the `<ol>`). This is a minor ARIA conformance note, not a user-facing gap.

---

#### Dropdown Accessibility

The dropdown trigger uses `aria-haspopup="true"` — this is valid but deprecated in ARIA 1.2. The correct value is `aria-haspopup="menu"` (if the popup is a menu) or `aria-haspopup="listbox"`. No `role="menu"` or `role="menuitem"` is set on the dropdown. The dropdown options are `<a>` or `<button>` elements in a `<div>` — no ARIA roles. This means the dropdown is an accessible disclosure widget but not a full ARIA menu. Arrow key navigation is not implemented.

---

#### Responsive Behaviour

At ≤768px: gap and item-gap reduce from 8px to 6px and 4px respectively. No truncation or overflow handling is implemented. If the breadcrumb trail is longer than the viewport width, it will wrap to multiple lines (the `<ol>` uses `flex-wrap: wrap`). **Gap:** Long breadcrumb trails should collapse intermediate items into an ellipsis or overflow menu — this is the `--breadcrumbs-dropdown-*` mechanism, but the overflow-trigger logic is not implemented automatically.

---

#### Composition

- Typically placed inside a page header `<div>`, below the `HeaderNavigation` and above the main content area.
- Uses the `Layout` component's `rightPanelBreadcrumbs` prop to inject breadcrumbs into the panel header.
- Does not communicate with `PageSideNav` — active state is managed separately.

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Two items | Root + current page |
| Three items | Root + section + current page |
| With dropdown | Second item has dropdown with 3 options |
| With dropdown separator | Dropdown with separator between groups |
| Custom separator | `|` pipe separator |
| Long labels | Item with 30-char label |
| Single item | Only current page (no back arrow) |
| Responsive (mobile) | Wrapping behaviour at 375px |
| Keyboard focus | Focus ring visible; dropdown keyboard gap documented |
| Escape gap | Document that Escape does not close dropdown |
| Theme: light and dark | |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| Escape does not close dropdown | Critical | Add `keydown` handler for Escape |
| No arrow key navigation in dropdown | High | Add `↓`/`↑`/`Home`/`End` to dropdown |
| `aria-haspopup="true"` deprecated | Medium | Change to `"menu"` |
| No `role="menu"` / `role="menuitem"` in dropdown | Medium | Add ARIA roles or accept disclosure pattern |
| Focus ring colour is `#6f8be6` not `#67b3fb` | Medium | Align with canonical focus ring token |
| Click-outside uses `mousedown` only | Medium | Replace with `pointerdown` |
| `aria-current` placement on `<li>` vs `<a>` | Low | Move to interactive element if last item becomes interactive |
| Overflow/collapse not automatic | High | Implement max-items + overflow dropdown logic |
| No `prefers-reduced-motion` | Medium | Add for `translateX` animation |
| Token migration | High | Phase 2 task |

---

### Tabs

| Dimension | Status |
|---|---|
| Production implementation | Complete — best accessibility implementation in the Navigation family |
| Storybook stories | None |
| Token migration | Unregistered tokens in use (`--border-default`, `--text-muted`, `--text-primary`, `--bg-hover`); also references shadcn tokens; active underline colours are hardcoded (`#3d63dd` dark / `#2563eb` light) |
| Specification confidence | High |
| Known gaps | `aria-label="Tabs"` on tablist is non-specific · No icon support in tab labels · No badge/count support · Active indicator animation not honouring `prefers-reduced-motion` · Disabled tab uses HTML `disabled` attr but roving tabindex ignores disabled tabs correctly · Indicator `left/right: 20px` inset is hardcoded; if trigger padding changes, the inset must be updated to match |

#### Purpose

A horizontally scrollable tab strip with associated content panels. Each tab controls exactly one panel. Supports full keyboard navigation (Arrow keys, Home, End) and correct ARIA roles (`tablist`, `tab`, `tabpanel`).

#### When to Use

- Displaying different views or sections of content within a single page region.
- 2–7 tabs maximum; beyond 7 consider a different navigation pattern.
- When all tab content needs to be accessible on the same page (not a page-level navigation — use `PageSideNav` or `Tabs` depends on context).

#### When Not to Use

- Page-level navigation between pages — use `PageSideNav` or `HeaderNavigation`.
- Binary toggle — use `Toggle` or `Segmented`.
- Very few options (2) — use `Segmented` for a more compact treatment.

---

#### Anatomy

1. **Root** — `<div class="tabs">`.
2. **Tablist** — `<div role="tablist" aria-label="Tabs">` — horizontal flex; overflow-x scrollable; bottom border.
3. **Tab** — `<button role="tab">` — 12px 16px padding; transparent border-bottom (layout placeholder only); white-space nowrap.
4. **Active indicator** — `::after` pseudo-element — 2px bar; inset `left: 20px / right: 20px` (button padding 16px + 4px breathing room each side); `scaleX(0→1)` entry animation.
5. **Content panels** — `<div role="tabpanel">` — one per tab; `hidden` when inactive.

---

#### Variants

No variant prop. One visual style. The `panel-nav-tabs` className modifier removes `padding-top: 24px` from the content area for use inside panels.

#### Sizes

No size prop. All tabs are 13px / 500 weight / 18px line-height.

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `tabs` | `TabItem[]` | — | Yes | Tab definitions |
| `defaultTab` | `string` | First tab | No | Initially active tab ID |
| `onTabChange` | `(tabId: string) => void` | — | No | |
| `className` | `string` | `''` | No | |

**`TabItem`:**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique ID; used for `tab-{id}` and `panel-{id}` |
| `label` | `string` | Yes | Tab button text |
| `content` | `React.ReactNode` | Yes | Panel content |
| `disabled` | `boolean` | No | Disables tab |

---

#### Visual Specification

| Element / property | Default | Active | Disabled | Hover |
|---|---|---|---|---|
| Tab colour | `var(--text-muted)` | `var(--text-primary)` | `#a1a1a8; opacity 0.5` | `var(--text-primary)` |
| Tab background | `transparent` | `transparent` | `transparent` | `var(--bg-hover)` |
| Tab bottom border | `2px solid transparent` (layout placeholder) | `transparent` | — | `transparent` |
| Active indicator | — | `::after` 2px bar; `left: 20px; right: 20px`; width = text width − 4px each side | — | — |
| Active indicator color (dark) | — | `#3d63dd` | — | — |
| Active indicator color (light) | — | `#2563eb` | — | — |
| Active indicator animation | — | `scaleX(0→1) 200ms ease` | — | — |
| Focus ring | `box-shadow: 0 0 0 2px rgba(111,139,230,0.25)` | Same | — | — |
| Focus ring (light) | `box-shadow: 0 0 0 2px rgba(37,99,235,0.20)` | Same | — | — |
| Panel padding | `padding-top: 24px` | — | — | — |
| Panel animation | `opacity: 0→1 (fadeIn 150ms)` | — | — | — |
| Font | `Inter, sans-serif; 13px; 500` | — | — | — |

**Note:** The tab font is hardcoded to `Inter, sans-serif` rather than `var(--font-family)`. This should be migrated to the CVP font token.

---

#### Component Token Contract

**CVP migration targets:**

| Current | CVP target |
|---|---|
| `var(--border-default)` (tablist border) | `--cvp-color-border-default` |
| `var(--text-muted)` | `--cvp-color-text-tertiary` |
| `var(--text-primary)` | `--cvp-color-text-primary` |
| `var(--bg-hover)` | `--cvp-color-surface-hover` |
| `#3d63dd` (dark active underline) | `--cvp-color-brand-default` |
| `#2563eb` (light active underline) | `--cvp-color-brand-default` (light value) |
| `#a1a1a8` (disabled text) | `--cvp-color-text-disabled` |
| Focus shadow colours | `--cvp-focus-ring-color` |

---

#### States

| State | Visual | Behaviour | Accessibility |
|---|---|---|---|
| Inactive | Muted text | Clickable | `aria-selected="false"`; `tabIndex="-1"` |
| Active | Primary text; 2px underline | Panel visible | `aria-selected="true"`; `tabIndex="0"` |
| Hover | Primary text; hover bg | `cursor: pointer` | No ARIA change |
| Focus | Box-shadow ring (no outline) | `:focus-visible` | Correct |
| Disabled | Muted text, `opacity: 0.5`; `cursor: not-allowed` | No interaction | `disabled` attr; skipped by keyboard navigation |
| Panel hidden | — | `hidden` attribute | `hidden` attribute hides from AT |
| Panel visible | Content rendered; fade-in | — | `aria-labelledby` → active tab id |

---

#### Keyboard Behaviour

This is the strongest keyboard implementation in the Navigation family.

| Key | Action | Status |
|---|---|---|
| `Tab` | Enter tablist (focus active tab); Tab again leaves tablist to panel | ✓ Correct via roving tabindex |
| `→` | Move to next enabled tab (wraps) | ✓ Implemented |
| `←` | Move to previous enabled tab (wraps) | ✓ Implemented |
| `Home` | Move to first enabled tab | ✓ Implemented |
| `End` | Move to last enabled tab | ✓ Implemented |
| `Enter` / `Space` | Activate the focused tab (also fires on arrow navigation) | ✓ Arrow navigation immediately activates |
| Arrow over disabled tab | Skips disabled tab — moves to next enabled | ✓ Correct |

**Activation model:** The implementation uses "immediate activation" — arrow key navigation both moves focus and activates the panel simultaneously. The WAI-ARIA pattern also supports "manual activation" (arrow = focus only; Enter/Space = activate). Immediate activation is acceptable and simpler.

---

#### Focus Behaviour

- Roving tabindex: active tab `tabIndex={0}`; inactive `tabIndex={-1}`. Correct.
- `Tab` enters the tablist at the active tab; `Tab` again moves to the panel content.
- No focus trapping inside the tablist — `Tab` exits normally.
- Focus is programmatically set via `tabRefs.current[nextTab.id]?.focus()` on arrow key navigation — correct.

---

#### Panel Management

- All panels are rendered in the DOM simultaneously.
- Inactive panels use `hidden` attribute — removes from accessibility tree and from visual display.
- Panel `id` is `panel-{tab.id}`; tab `id` is `tab-{tab.id}`.
- `aria-controls={panel-{id}}` on tab and `aria-labelledby={tab-{id}}` on panel — correct bidirectional association.
- Content re-renders when tab changes (via `contentKey` counter) — animates the `fadeIn` on each switch.

---

#### Disabled Tab Behaviour

- `disabled` HTML attribute applied to `<button>` — removes from tab order.
- Arrow key navigation skips disabled tabs — correct.
- Visual: `color: #a1a1a8; opacity: 0.5; cursor: not-allowed`.
- `aria-disabled` is not explicitly set (the `disabled` attribute on a `<button>` is sufficient).

---

#### Responsive Behaviour

The tablist is `overflow-x: auto; scrollbar-width: thin`. On narrow viewports, tabs scroll horizontally. No collapse to dropdown is implemented. **Gap:** Very long tab lists (> 8 tabs) may require a "more" dropdown on narrow viewports — not implemented.

---

#### `aria-label` Quality

`aria-label="Tabs"` on the tablist is the minimum but not descriptive. If the page has multiple tab groups, screen readers announce both as "Tabs". **Gap:** Add a meaningful `aria-label` prop (e.g. `"Content sections"`, `"Settings categories"`) and expose it via a `tablistLabel` prop.

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| `role="tablist"` | ✓ |
| `role="tab"` | ✓ |
| `role="tabpanel"` | ✓ |
| `aria-selected` | ✓ |
| `aria-controls` / `aria-labelledby` | ✓ Bidirectional |
| `tabIndex` roving | ✓ |
| Arrow key navigation | ✓ |
| `Home` / `End` | ✓ |
| Disabled tab skipped | ✓ |
| Focus ring | ✓ `:focus-visible` |
| Panel `hidden` | ✓ |
| Descriptive `aria-label` on tablist | **Gap** — "Tabs" is generic |
| Icon support in tabs | Not implemented |
| `prefers-reduced-motion` | **Gap** — animations play regardless |

---

#### Motion

| Animation | Property | Duration | Easing | Reduced-motion |
|---|---|---|---|---|
| Active underline entry | `transform: scaleX(0→1)` | 200ms | `ease` | **Gap: no media query** |
| Panel content fade | `opacity: 0→1` | 150ms | `ease` | **Gap: no media query** |

---

#### Composition

- Tabs can be used standalone or inside a `Layout` panel via the `panel-nav-tabs` className modifier.
- Panels accept any `React.ReactNode` — tables, forms, media, etc.
- Icon support in tab labels requires `children` or a dedicated `icon` prop (not yet implemented).

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default | 3 tabs; second tab active by default |
| With disabled tab | One disabled tab; confirm arrow key skips it |
| Many tabs | 7 tabs; horizontal scroll visible |
| Long tab labels | 30-char label |
| Controlled | `activeTab` driven by parent state |
| Panel content variety | Text, form, table in panels |
| Panel nav modifier | `className="panel-nav-tabs"` |
| Keyboard navigation | Arrow keys, Home, End |
| Theme: light and dark | Active underline colour change |
| Reduced motion gap | Document animation gap |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| `aria-label="Tabs"` is non-specific | Medium | Add `tablistLabel` prop |
| Font hardcoded to `Inter` not `var(--font-family)` | Medium | Migrate to CVP font token |
| No icon or badge in tab label | Low | Add optional `icon` and `badge` fields to `TabItem` |
| `prefers-reduced-motion` not handled | Medium | Add media query for both animations |
| No overflow to "More" dropdown | Low | Implement for > 8 tabs at narrow widths |
| Active underline colours hardcoded | High | Migrate to `--cvp-color-brand-default` |
| Token migration | High | Phase 2 task |

---

### Accordion

> **Classification note.** Accordion is classified as **Data Display** in the component inventory (Pass 6). It is documented here in the Navigation and Wayfinding pass because it implements the ARIA `region` + `button[aria-expanded]` pattern that governs collapsible navigation sections. It is not a page-navigation component — it does not change the URL or move focus to a new page. See the inventory for the Pass 6 classification.

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Mixed — uses shadcn tokens (`--background`, `--card`, `--border`, `--muted`, `--foreground`, `--muted-foreground`, `--primary`); references old tokens (`--type-scale-m-size`, `--type-scale-m-weight`, `--focus-ring`, `--default-transition-timing-function`) |
| Specification confidence | High |
| Known gaps | Height animation uses `display: none` not height transition (CSS height animation is noted in token but `display: none` is used instead) · No `prefers-reduced-motion` · Uses shadcn tokens, not CVP tokens |

#### Purpose

A vertically stacked list of collapsible sections. Each section has a header button that expands or collapses its content region. Supports single-open (accordion) or multi-open modes.

#### When to Use

- FAQs, settings panels, long-form content broken into sections.
- Collapsible navigation groups within a sidebar or modal.
- Progressive disclosure of complex configuration options.

#### When Not to Use

- Tab-switching (use `Tabs`).
- Simple show/hide of one item (use a disclosure button).
- Deep hierarchical navigation (use `Tree`).

---

#### Anatomy

1. **Root** — `<div class="accordion">` — full width; `overflow: hidden`.
2. **Item** — `<div class="accordion-item">` — bottom border except last item.
3. **Header button** — `<button class="accordion-header">` — flex row; icon + title left; chevron right.
4. **Title icon** — optional; `<span class="accordion-title-icon">` — default or primary colour.
5. **Title** — `<span class="accordion-title">` — 14px / 500.
6. **Chevron** — inline SVG; rotates 180° when expanded.
7. **Content region** — `<div role="region" class="accordion-content">` — `display: none` when collapsed; `display: block` when expanded.
8. **Content inner** — `<div class="accordion-content-inner">` — 16px padding.

---

#### Variants

| Variant | Description |
|---|---|
| `single` (default) | Only one item can be expanded at a time; expanding a new item collapses the previous |
| `multiple` | Multiple items can be expanded simultaneously |

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `items` | `AccordionItem[]` | — | Yes | |
| `type` | `'single' \| 'multiple'` | `'single'` | No | Expansion mode |
| `defaultExpanded` | `string[]` | `[]` | No | Initially expanded item IDs |
| `onExpandedChange` | `(expandedItems: string[]) => void` | — | No | |
| `disabled` | `boolean` | `false` | No | Disables all items |
| `className` | `string` | `''` | No | |

**`AccordionItem`:**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | |
| `title` | `string` | Yes | Header label |
| `content` | `React.ReactNode` | Yes | Panel content |
| `disabled` | `boolean` | No | Disables this item |
| `icon` | `React.ReactNode` | No | Optional icon in header |
| `iconColor` | `'default' \| 'primary'` | `'default'` | Icon colour variant |

---

#### Visual Specification

| Element / property | Collapsed | Expanded | Hover | Disabled |
|---|---|---|---|---|
| Header background | `var(--card)` | `var(--card)` | `var(--muted)` | `var(--card); opacity 0.5` |
| Header text | `var(--foreground)` | `var(--foreground)` | `var(--foreground)` | Same |
| Chevron | `0°` | `180°` | — | — |
| Content | `display: none` | `display: block` | — | — |
| Content background | `var(--card)` | `var(--card)` | — | — |
| Border between items | `var(--border)` | — | — | — |
| Focus ring | `outline: 2px solid var(--focus-ring); offset: -2px` (inset) | — | — | — |
| Icon (primary) | `var(--primary)` | — | — | — |
| Muted foreground (chevron) | `var(--muted-foreground)` | — | — | — |
| Global disabled | `opacity: 0.6; pointer-events: none` | — | — | — |

**Implementation gap:** The CSS declares `transition: height var(--accordion-transition-duration)` for the content region, suggesting a smooth height animation. However, the content is toggled with `display: none` / `display: block`, which is not animatable. The height transition defined in CSS has no effect. If smooth collapse animation is required, the component must implement a `max-height` or measured-height animation.

---

#### Component Token Contract

**Current tokens (all shadcn or old shorthand):**

| Current | CVP target |
|---|---|
| `--background` | `--cvp-color-surface-default` |
| `--card` | `--cvp-color-surface-raised` |
| `--border` | `--cvp-color-border-default` |
| `--muted` | `--cvp-color-surface-hover` |
| `--foreground` | `--cvp-color-text-primary` |
| `--muted-foreground` | `--cvp-color-text-secondary` |
| `--primary` | `--cvp-color-brand-default` |
| `--focus-ring` | `--cvp-focus-ring-color` |
| `--type-scale-m-size` | `--cvp-font-size-md` |
| `--type-scale-m-weight` | `--cvp-font-weight-medium` |
| `--default-transition-timing-function` | `cubic-bezier(0.4, 0, 0.2, 1)` (local) |

---

#### States

| State | Visual | Behaviour | Accessibility |
|---|---|---|---|
| Collapsed | Content hidden; chevron 0° | Click header to expand | `aria-expanded="false"` |
| Expanded | Content visible; chevron 180° | Click header to collapse | `aria-expanded="true"` |
| Hover | Header bg → `--muted` | — | No ARIA change |
| Focus | Inset `outline: 2px` | `:focus-visible` | Correct |
| Disabled (item) | `opacity: 0.5`; `cursor: not-allowed` | No interaction | `disabled` attribute |
| Disabled (global) | `opacity: 0.6`; `pointer-events: none` | No interaction | `aria-disabled` not set — **Gap** |

**Global disabled gap:** When `disabled={true}` is set on the `Accordion`, the component applies CSS `pointer-events: none` and `opacity: 0.6`. This does not set `aria-disabled` on the individual header buttons. Keyboard users can still Tab to headers and attempt to activate them (the `onClick` guard prevents activation, but there's no ARIA feedback).

---

#### Keyboard Behaviour

The Accordion does not implement a custom keyboard handler. It relies on native `<button>` keyboard behaviour:

| Key | Action |
|---|---|
| `Tab` | Focus each header button in sequence |
| `Enter` / `Space` | Toggle expand/collapse |
| No other custom keys | — |

**Gap:** WAI-ARIA Accordion pattern recommends (not requires) `↓`/`↑` to move between headers. This is not implemented — `Tab` navigation only. This is acceptable per WCAG, but the WAI-ARIA authoring practices note that arrow keys improve usability for screen reader users.

---

#### Focus Behaviour

Focus ring uses inset `outline-offset: -2px` (negative offset = inside the button border). This is correct for a button that spans the full container width. `:focus-visible` is used — correct.

---

#### Accessibility

| Requirement | Implementation |
|---|---|
| `aria-expanded` on header | ✓ |
| `aria-controls` → content region | ✓ |
| `role="region"` on content | ✓ |
| `aria-labelledby` on content region | ✓ |
| `:focus-visible` focus ring | ✓ |
| `disabled` attr on disabled headers | ✓ |
| `aria-disabled` on globally disabled | **Gap** |
| Height animation | **Gap — not animated** |
| `prefers-reduced-motion` | **Gap** |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Single mode | Default; only one open at a time |
| Multiple mode | `type="multiple"` |
| All collapsed | `defaultExpanded={[]}` |
| One pre-expanded | `defaultExpanded={["item-1"]}` |
| With icon | `icon={<SomeIcon />}` |
| With primary icon | `iconColor="primary"` |
| Disabled item | One item disabled |
| Globally disabled | `disabled={true}` |
| Long content | Content with many paragraphs |
| Keyboard navigation | Tab + Space/Enter |
| Animation gap | Document height-animation limitation |
| Theme: light and dark | |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| Height animation not functional (display:none) | Medium | Implement max-height or measured-height animation |
| `prefers-reduced-motion` not handled | Medium | Add media query |
| `aria-disabled` not set when globally disabled | Medium | Add `aria-disabled={true}` to header buttons when `disabled` is true |
| All tokens are shadcn/old shorthand | High | Migrate to `--cvp-*` in Phase 2 |
| Icon colour hardcoded to `var(--primary)` | Medium | Migrate to `--cvp-color-brand-default` |
| Arrow key navigation between headers | Low | Optional enhancement per WAI-ARIA pattern |

---

### Components Not Implemented in the Navigation Family

The following components listed in the brief's potential component list were searched for in the repository and do not exist as standalone CVP components:

| Component | Status | Notes |
|---|---|---|
| Stepper | Not implemented | No file found; `ui/` folder has no stepper primitive |
| Pagination | Not standalone | Handled inline within `Table` component; `ui/pagination.tsx` exists as a shadcn primitive |
| Menu / ContextMenu / CommandMenu | Not implemented | Dropdowns exist inside HeaderNavigation but no standalone Menu component |
| Toolbar | Not implemented | No file found |
| Anchor Navigation | Not implemented | |
| Page Header | Not implemented | Used as an HTML pattern within pages, not a component |
| Mobile Navigation | Not implemented | Responsive collapse exists in HeaderNavigation but no mobile drawer |
| App Switcher | Integrated | Part of HeaderNavigation account dropdown — not a standalone component |
| Account Menu | Integrated | Part of HeaderNavigation user dropdown — not a standalone component |
| Back Link | Pattern only | Implemented as the first item in `Breadcrumbs` with ArrowLeft icon |
| DesignSystemNav | Internal only | Not a publishable component |

All absent components are **Specification gaps** pending design and implementation.

---

*Navigation and Wayfinding specification complete. Data Display, Overlays, Feedback, and remaining families to follow in subsequent passes.*

---

## Part D — Overlays, Disclosure and Feedback

> **Family scope.** The CVP publishable component set for this pass comprises:
> - **Overlays:** `Modal`, `ContentBrowserModal`
> - **Disclosure:** `Accordion` (documented in Part C — Navigation, §Accordion)
> - **Feedback:** `Toast`, `NotificationBanner`
>
> The following shadcn/ui and Radix primitives are installed in `src/app/components/ui/` and are available as composition primitives but are **not CVP-styled components**: `Dialog`, `Drawer`, `Sheet`, `Popover`, `Tooltip`, `HoverCard`, `Alert`, `Badge`, `Progress`, `Skeleton`, `Collapsible`, and `Sonner`. They are documented in a summary table at the end of this section. They do not receive full §10-template specifications in this pass.
>
> **Open question resolved (OQ-1):** `Modal.tsx` is self-contained — it does **not** delegate to `ui/dialog.tsx`. It uses `createPortal()` directly and implements its own Escape handler and scroll lock. It does **not** use Radix Dialog and has no focus trap.
>
> **Open question resolved (OQ-2):** CVP `Toast.tsx` is the canonical toast. `ui/sonner.tsx` is an available Sonner wrapper. They co-exist; use CVP Toast for product notifications; use Sonner only when adopting the Sonner API directly.

> **Family-wide overlay gap — no focus trap.** The CVP `Modal` does not implement a focus trap. Keyboard users can Tab outside the modal into the inert background. This is a **critical WCAG violation** (WCAG 2.1 SC 2.1.2). Fix requires either a FocusLock wrapper (e.g. `react-focus-lock`) or a manual `keydown` Tab handler on the modal container.

> **Family-wide overlay gap — no initial focus.** The CVP `Modal` does not move focus into the dialog on open. Focus remains on the trigger element behind the backdrop. Fix: use `autoFocus` on the first interactive element, or call `.focus()` on the modal container or a designated element in a `useEffect`.

> **Family-wide overlay gap — no focus restoration.** When the CVP `Modal` closes, focus is not programmatically returned to the element that triggered it. This means keyboard users lose their position in the page after dismissal.

> **Family-wide overlay gap — `prefers-reduced-motion`.** No overlay or feedback component implements a `@media (prefers-reduced-motion: reduce)` block. All entrance/exit animations play regardless of system preference.

> **Family-wide token migration note.** CVP Modal and Toast use unregistered component-level tokens (`--modal-*`, `--toast-*`) with mostly hardcoded fallback values. `cvp-component-tokens.css` defines `--cvp-modal-*` tokens as the migration target. NotificationBanner uses entirely hardcoded hex values with no token references.

---

## Overlays

### Modal

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | Unregistered tokens in use (`--modal-*`); fallbacks are hardcoded hex values; `cvp-component-tokens.css` defines `--cvp-modal-*` migration targets |
| Specification confidence | High |
| Known gaps | No focus trap · No initial focus · No focus restoration · No `prefers-reduced-motion` · Focus ring uses `#6f8be6` (old `--focus-border`) not `#67b3fb` · Tab navigation in tabbed variant is not roving-tabindex · `aria-labelledby` ID is hardcoded `"modal-title"` — will conflict on nested modals |

#### Purpose

A full-screen-backdrop blocking overlay (modal dialog). Prevents interaction with background content until closed. Used for confirmations, complex forms, detailed views, and content selections. The default variant takes any content via `children`; the `tabbed` variant provides built-in tab navigation inside the modal.

#### When to Use

- An action that requires the user's full attention before they can continue (destructive confirmation, agreement, blocking form completion).
- A detailed view or editor for an item where navigating away would lose context.
- A media or content selection flow requiring browsing inside the overlay.

#### When Not to Use

- Simple informational messages — use `NotificationBanner` or `Toast`.
- Non-blocking supplementary information — use `Popover` or `Tooltip`.
- Navigation — modals must not replace page navigation.
- Content that can be shown inline — modals add cognitive overhead.
- Nested modals — a second modal on top of a first is nearly always a design failure; redesign the flow.

---

#### Anatomy

1. **Backdrop** — `<div class="modal-backdrop" aria-hidden="true">` — `position: fixed; inset: 0; z-index: 1000`; `rgba(0,0,0,0.8)` + `backdrop-filter: blur(8px)`. Clicking the backdrop calls `onClose`.
2. **Wrapper** — `<div class="modal-wrapper">` — `position: fixed; top: 50%; left: 50%; z-index: 1001; transform: translate(-50%, -50%)`; max-width via `--modal-max-width` CSS variable.
3. **Container** — `<div role="dialog" aria-modal="true">` — gradient background; `border-radius: 12px`; `overflow: hidden`; `max-height: calc(100vh - 4rem)`.
4. **Decorative overlay** — `::before` pseudo-element; subtle brand-colour gradient at 3% opacity.
5. **Close button** — `<button aria-label="Close modal">` — `position: absolute; top: 24px; right: 24px`; 32×32px; optional via `showCloseButton` prop.
6. **Header** — `<div class="modal-header">` — padding 24px; bottom separator border; contains title and description. Can be replaced entirely via `header` prop.
7. **Title** — `<h2 id="modal-title">` — 18px / 500 weight; referenced by `aria-labelledby`.
8. **Description** — `<p id="modal-description">` — 14px; referenced by `aria-describedby`.
9. **Tab strip** (tabbed variant only) — `<div role="tablist">` with `<button role="tab">` children.
10. **Body** — `<div class="modal-body">` — `flex: 1; overflow-y: auto; max-height: 60vh`; custom scrollbar styling.
11. **Tab panel** (tabbed variant) — `<div role="tabpanel">` — wraps active tab content.
12. **Footer** — `<div class="modal-footer">` — padding 24px 16px; flex end; 8px gap. Optional via `footer` prop.

---

#### Variants

| Variant | Description |
|---|---|
| `default` | Standard modal with optional title, description, children, and footer slots |
| `tabbed` | Adds a tab strip between header and body; content is driven by the `tabs` prop; tab state is managed internally |

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `isOpen` | `boolean` | — | Yes | Controls visibility |
| `onClose` | `() => void` | — | Yes | Called on Escape, backdrop click, and close button click |
| `title` | `string` | — | No | Heading text; renders `<h2 id="modal-title">` |
| `description` | `string` | — | No | Subheading text; renders `<p id="modal-description">` |
| `children` | `React.ReactNode` | — | No | Body content (default variant) |
| `maxWidth` | `string` | `'600px'` | No | Max width via CSS custom property |
| `showCloseButton` | `boolean` | `true` | No | Shows/hides the ×  button |
| `header` | `React.ReactNode` | — | No | Replaces the default header slot entirely |
| `footer` | `React.ReactNode` | — | No | Footer slot (action buttons) |
| `variant` | `'default' \| 'tabbed'` | `'default'` | No | |
| `tabs` | `ModalTab[]` | `[]` | No | Tab definitions for tabbed variant |
| `defaultActiveTab` | `string` | First tab | No | Initially active tab |
| `onTabChange` | `(tabId: string) => void` | — | No | |

---

#### Visual Specification

| Element / property | Value | Token | Target CVP token |
|---|---|---|---|
| Backdrop colour | `rgba(0,0,0,0.8)` | `var(--modal-backdrop)` | `--cvp-modal-backdrop` → `--cvp-color-overlay-scrim` |
| Backdrop blur | `blur(8px)` | Hardcoded | Local |
| Container background | `linear-gradient(135deg, rgba(24,24,28,0.98), rgba(16,16,20,0.98))` | `var(--modal-bg)` | `--cvp-modal-bg` → `--cvp-color-surface-overlay` |
| Container blur | `backdrop-filter: blur(24px)` | Hardcoded | Local |
| Container border | `1px solid rgba(48,48,56,0.4)` | `var(--modal-border)` | `--cvp-modal-border` → `--cvp-color-border-subtle` |
| Container shadow | `0 25px 50px -12px rgba(0,0,0,0.5)` | `var(--modal-shadow)` | `--cvp-modal-shadow` → `--cvp-shadow-modal` |
| Container radius | `12px` | Hardcoded | `--cvp-radius-lg` |
| Separator | `rgba(42,42,53,0.3)` | `var(--modal-border-separator)` | `--cvp-modal-border-separator` → `--cvp-color-border-subtle` |
| Title colour | `#ffffff` | `var(--modal-title-text)` | `--cvp-modal-title-color` → `--cvp-color-text-primary` |
| Description colour | `#AFAFB5` | `var(--modal-description-text)` | `--cvp-modal-description-color` → `--cvp-color-text-secondary` |
| Body colour | `#9b9ba5` | `var(--modal-body-text)` | `--cvp-modal-body-color` → `--cvp-color-text-secondary` |
| Close button colour | `#6b6b78` | `var(--modal-close-icon)` | `--cvp-modal-close-color` → `--cvp-color-icon-default` |
| Close hover bg | `#1f1f28` | `var(--modal-close-hover-bg)` | `--cvp-modal-close-hover-bg` → `--cvp-color-surface-hover` |
| Close hover colour | `#ffffff` | `var(--modal-close-hover-text)` | `--cvp-color-text-primary` |
| Active tab underline | `#3d63dd` | Hardcoded | `--cvp-color-brand-default` |
| Tab text | `#AFAFB5` | `var(--modal-tab-text)` | `--cvp-color-text-secondary` |
| Tab active text | `#ffffff` | `var(--modal-tab-active-text)` | `--cvp-color-text-primary` |
| Tab hover bg | `rgba(255,255,255,0.05)` | `var(--modal-tab-hover-bg)` | `--cvp-color-interactive-overlay` |
| Close button focus ring | `outline: 2px solid #6f8be6; offset 2px` | Hardcoded | `--cvp-focus-ring-color` (`#67b3fb`) |
| Decorative gradient | `rgba(61,99,221,0.03)` | `var(--modal-gradient)` | Local |
| z-index (backdrop) | `1000` | Hardcoded | `--cvp-z-index-modal-backdrop` |
| z-index (wrapper) | `1001` | Hardcoded | `--cvp-z-index-modal` |

---

#### Component Token Contract

**Public override tokens (migration target in `cvp-component-tokens.css`):**

| Token | Semantic source |
|---|---|
| `--cvp-modal-backdrop` | `--cvp-color-overlay-scrim` |
| `--cvp-modal-bg` | `--cvp-color-surface-overlay` |
| `--cvp-modal-border` | `--cvp-color-border-subtle` |
| `--cvp-modal-shadow` | `--cvp-shadow-modal` |
| `--cvp-modal-border-separator` | `--cvp-color-border-subtle` |
| `--cvp-modal-title-color` | `--cvp-color-text-primary` |
| `--cvp-modal-description-color` | `--cvp-color-text-secondary` |
| `--cvp-modal-body-color` | `--cvp-color-text-secondary` |
| `--cvp-modal-close-color` | `--cvp-color-icon-default` |
| `--cvp-modal-close-hover-bg` | `--cvp-color-surface-hover` |

**Internal component tokens:**

| Token | Value |
|---|---|
| `--cvp-modal-max-width` | `600px` (default; overridden via `maxWidth` prop) |
| `--cvp-modal-radius` | `--cvp-radius-lg` |
| `--cvp-modal-body-max-height` | `60vh` |

**Local implementation values:**

| Property | Value |
|---|---|
| Backdrop blur | `blur(8px)` |
| Container blur | `blur(24px)` |
| Decorative gradient opacity | `3%` (brand overlay) |
| z-index backdrop | `1000` |
| z-index wrapper | `1001` |
| Body max-height | `calc(100vh - 4rem)` outer; `60vh` body scroll area |

---

#### States

| State | Visual | Behaviour | Accessibility |
|---|---|---|---|
| Closed | Not rendered (`return null`) | No DOM presence | No ARIA impact |
| Open (entering) | Backdrop fades in 150ms; container scales 0.95→1 and fades in 200ms | Page scroll locked | `role="dialog"` `aria-modal="true"` |
| Open (idle) | Visible; backdrop blurred | All events active; background inert visually but **not inert to AT** | `aria-labelledby` and `aria-describedby` when title/description present |
| Tabbed — tab active | Bottom border on active tab | Tab content visible | `aria-selected="true"` on active tab |
| Tabbed — tab inactive | No bottom border | Content hidden | `aria-selected="false"`; `tabIndex="-1"` (gap — not currently set) |
| Closing | Component unmounts | Scroll restored | No exit animation — component uses `return null`; no exit transition |

---

#### Opening Behaviour

1. `isOpen` changes to `true`.
2. Component renders via `createPortal` to `document.body`.
3. Backdrop renders and fades in (`modal-backdrop-enter`, 150ms).
4. Container scales and fades in (`modal-content-enter`, 200ms).
5. `document.body.style.overflow = 'hidden'` is set — scroll locked.
6. `document.addEventListener('keydown', handleEscape)` is attached.
7. **Gap:** No focus movement — focus remains on the trigger element behind the backdrop.

#### Closing Behaviour

1. `onClose` is called (via Escape key, backdrop click, or close button).
2. Component re-renders with `isOpen = false` → `return null` — DOM is immediately removed.
3. `document.removeEventListener('keydown', handleEscape)` runs on cleanup.
4. `document.body.style.overflow = 'unset'` — scroll restored.
5. **Gap:** No exit animation — closure is abrupt.
6. **Gap:** Focus is not returned to the trigger element.

---

#### Scroll Lock

`document.body.style.overflow = 'hidden'` is applied when `isOpen` is true. This prevents body scroll behind the modal. The cleanup sets it to `'unset'`. **Gap:** If the body had a non-default `overflow` value before the modal opened (e.g. `'auto'`), the cleanup incorrectly resets it to `'unset'`. The correct pattern: store the original value and restore it on cleanup.

---

#### Focus Management

**Critical gap — focus trap:** The Modal does not implement a focus trap. When the modal is open, keyboard users can Tab out of the modal container and interact with background content. This violates WCAG 2.1 SC 2.1.2 (No Keyboard Trap) in the sense that users should not be able to reach background content while a modal is open (the `aria-modal="true"` attribute signals inertness to AT, but does not enforce it in all browsers, and does not block keyboard Tab events natively).

**Critical gap — initial focus:** No focus movement occurs on open. WCAG and WAI-ARIA both require that focus move to a predictable element within the dialog on open (typically the first focusable element, or the close button if no other element is appropriate).

**Critical gap — focus restoration:** On close, focus must return to the element that triggered the modal. The component provides no mechanism for this. The consumer must manually track and restore focus.

**Recommended fix:** Wrap the modal container with `react-focus-lock` or implement a manual focus trap:
1. On open: store `document.activeElement` as `returnFocusRef`.
2. Move focus to the modal container or first focusable element.
3. On keydown Tab/Shift+Tab: prevent focus from leaving the modal.
4. On close: call `returnFocusRef.current?.focus()`.

---

#### Escape Behaviour

`document.addEventListener('keydown', handleEscape)` is attached when `isOpen = true`. When `event.key === 'Escape'` and `isOpen`, calls `onClose`. This is implemented correctly at the global document level. **However:** If multiple modals or overlays are stacked (e.g. a tooltip inside a modal), all open listeners will fire simultaneously — only the topmost overlay should respond to Escape. **Gap:** No stacking-order Escape priority management.

---

#### Backdrop Interaction

Clicking the backdrop `<div aria-hidden="true">` calls `onClose`. The backdrop has `aria-hidden="true"` — correct (it is decorative). The modal container does not have a `stopPropagation` call, so clicks on the container do not bubble to the backdrop — this is correct because the backdrop is a sibling element at a lower z-index, not an ancestor.

---

#### Scroll Locking

The modal body (`div.modal-body`) is independently scrollable via `overflow-y: auto; max-height: 60vh`. Long content scrolls within the modal, not the page. The body scroll lock applies to `document.body`. **Gap:** The `max-height: 60vh` is hardcoded — it should be a CVP token (`--cvp-modal-body-max-height`).

---

#### Stacking and z-Index

| Layer | z-index |
|---|---|
| Backdrop | `1000` |
| Modal wrapper | `1001` |
| Modal close button | `10` (within stacking context) |
| Tooltip (when inside modal) | `9999` — renders above modal correctly |
| Toast container | `9999` — renders above modal correctly |

**Nested overlay note:** If a `Tooltip` or `Popover` is rendered inside a modal, it will portal to `document.body` and use its own z-index (9999 for Tooltip). This is correct. If a second Modal is opened inside a first, both use z-index 1000/1001 — the second will visually override the first, but there is no programmatic stacking management.

---

#### Responsive Behaviour

The modal wrapper is `width: calc(100% - 2rem)` with `max-width` from the `maxWidth` prop (default 600px). On narrow viewports, it fills nearly the full width. At very small viewports (320px), the content area is 288px wide. No mobile full-screen mode is implemented. **Gap:** On mobile (≤480px), modals should typically be full-screen — this requires a responsive breakpoint override, not currently implemented.

**Long-content scrolling:** The modal body has `overflow-y: auto; max-height: 60vh`. Content longer than 60% of viewport height scrolls within the body. The header and footer are `flex-shrink: 0` — they remain visible regardless of scroll position. This is the correct pattern.

---

#### Background Inertness

`aria-modal="true"` is set on the dialog container. This instructs screen readers to treat background content as inert. However, `aria-modal` inertness is not universally implemented across all screen readers and browsers — VoiceOver on iOS, for example, may still read background content. The canonical fix is to add `aria-hidden="true"` to all page content outside the modal when it opens, or to use the HTML `inert` attribute. **Gap:** No `inert` attribute or `aria-hidden` management on background content.

---

#### Destructive Confirmation

A "danger" or "destructive" modal variant is a **specification gap**. No Danger styling exists for the Modal component. When destructive confirmation is required (e.g. "Delete this asset?"), the consumer should:
1. Use the default Modal with a `title` beginning with the consequence ("Delete 'Broadcast 2026-07'?").
2. Provide a `description` with the irreversibility statement.
3. Use a Danger button in the `footer` for the confirm action and a secondary Cancel button.

Until a Danger modal variant is implemented, the consumer constructs this pattern manually. See §5.12 (Global Behaviour — Destructive Actions) for the two-step confirmation requirement.

---

#### Asynchronous Confirmation

When the modal footer action triggers an async operation (e.g. API call):
1. The confirm button must show a loading state (`aria-busy="true"`) during the operation.
2. The modal must not close until the operation completes or fails.
3. On success: close the modal; show a Toast success notification.
4. On failure: keep the modal open; show an error message inside the modal (inline error) or a Toast danger notification.

**Gap:** The Modal has no built-in loading state, no error slot, and no async lifecycle management. The consumer must implement all of this via the `footer` prop.

---

#### Accessible Name and Description

| Condition | Result |
|---|---|
| `title` provided | `aria-labelledby="modal-title"` → `<h2 id="modal-title">` |
| `title` not provided, `header` prop provided | No `aria-labelledby` — **Gap: header prop must include an element with a stable id for labelling** |
| `description` provided | `aria-describedby="modal-description"` → `<p id="modal-description">` |

**ID conflict gap:** `id="modal-title"` and `id="modal-description"` are hardcoded strings. If two Modal instances are open simultaneously (nested modal scenario), or if a Modal is open alongside a component that also uses `id="modal-title"`, the IDs will conflict. Fix: derive IDs dynamically using `useId()` or a prop.

---

#### Tabbed Variant Keyboard Behaviour

The tabbed variant renders a tab strip using the same implementation as the standalone `Tabs` component but without roving tabindex. **Gap:** Tab buttons in the modal tablist use `tabIndex={0}` on all tabs, not just the active tab — standard roving tabindex is not implemented inside the modal. This means all tabs are Tab-navigable without arrow key support.

| Key | Expected | Actual |
|---|---|---|
| `Tab` | Enter tablist at active tab | All tabs in tab order (gap) |
| `←` / `→` | Navigate between tabs | Not implemented (gap) |
| `Home` / `End` | First / last tab | Not implemented (gap) |

---

#### Motion

| Animation | Property | Duration | Easing | Reduced-motion |
|---|---|---|---|---|
| Backdrop entrance | `opacity: 0→1` | 150ms | `ease-out` | **Gap** |
| Container entrance | `opacity: 0→1; scale: 0.95→1` | 200ms | `ease-out` | **Gap** |
| Container exit | None — component unmounts immediately | — | — | N/A |
| Close button hover | `background-color, color` | 150ms | `ease` | **Gap** |
| Tab hover | `background-color, color` | 150ms | `ease` | **Gap** |

---

#### Composition

- Rendered via `createPortal` to `document.body` — no parent needed in the component tree.
- `footer` prop accepts action buttons; recommended: one `PrimaryButton` (confirm) + one `SecondaryButton` or `TextButton` (cancel).
- `header` prop replaces the entire header slot — useful for custom header layouts.
- `ContentBrowserModal` uses the same portal pattern but is a standalone component, not a composition of `Modal`.

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default — no title | `children` only; no `aria-labelledby` |
| Default — with title and description | Standard anatomy |
| With footer actions | Primary + Secondary button in footer |
| With custom header slot | `header` prop |
| Tabbed variant | 3 tabs; active tab switching |
| Wide modal | `maxWidth="900px"` |
| Long content | Body exceeds 60vh; scrolls within modal |
| No close button | `showCloseButton={false}` |
| Escape closes | Keyboard interaction test |
| Backdrop click closes | Click interaction test |
| Focus trap gap | Document: keyboard Tab exits modal to background |
| Initial focus gap | Document: focus does not move into modal on open |
| Destructive pattern | Manually constructed danger confirmation |
| Theme: light and dark | |
| Reduced motion gap | Document: animations play regardless |

---

#### Test Requirements

| Type | Coverage |
|---|---|
| Unit | `onClose` fires on Escape; `onClose` fires on backdrop click; body scroll locked when open; scroll restored on close; `isOpen=false` renders nothing |
| Interaction | Tab exits modal (documents gap); Escape dismisses |
| Accessibility | axe scan; `aria-labelledby` present when `title` provided; `role="dialog"` and `aria-modal="true"` present |
| Visual regression | Default × both themes; tabbed variant; wide modal; long content |
| Responsive | 375px viewport — modal near full width |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| No focus trap | Critical | Implement `react-focus-lock` or manual Tab interception |
| No initial focus | Critical | Move focus on open (`useEffect` + `.focus()`) |
| No focus restoration | Critical | Store trigger ref; restore on close |
| Background content not inert | High | Add `inert` to background or `aria-hidden` on app root |
| No exit animation | Medium | Implement `AnimatePresence` or CSS class-based exit |
| Hardcoded `id="modal-title"` conflicts | High | Replace with `useId()` |
| Tabbed variant missing roving tabindex and arrow keys | High | Apply `Tabs` keyboard model inside modal |
| Scroll lock restoration bug | Medium | Store original overflow value before setting |
| No `prefers-reduced-motion` | High | Add to all animations |
| No Danger/destructive variant | High | Add variant with error colour treatment |
| No mobile full-screen mode | Medium | Add breakpoint override at ≤480px |
| Close focus ring uses `#6f8be6` not `#67b3fb` | Medium | Align with canonical focus ring token |
| Token migration | High | Phase 2 task |

---

### ContentBrowserModal

| Dimension | Status |
|---|---|
| Production implementation | Partial — product-specific domain component |
| Storybook stories | None |
| Token migration | Mixed — uses old shorthand tokens (`--foreground`, `--muted-foreground`, `--content-browser-*`), shadcn tokens, and some CVP tokens |
| Specification confidence | Medium — this is a product component, not a generic design system primitive |
| Known gaps | Same focus trap/restoration/initial-focus gaps as Modal · Responsive items-per-page uses window resize listener (SSR-unsafe) · Search field and filter state not externally controlled |

#### Purpose

A product-specific modal for browsing and selecting content items (e.g. movies, shows, episodes) from a paginated grid. Extends the Modal shell with a built-in search, filter sidebar, grid display, item selection with visual reference strip, and pagination.

> **Classification note.** `ContentBrowserModal` is a **product-layer component** — it composes design system primitives (`Modal`, `Select`, pagination, filter controls) for a domain-specific use case. It is not a generic design system component. It should be documented as a product pattern, not a published component. Changes to its internals should not be gated by the design system review process; changes to the composed primitives should.

---

#### Anatomy (delta from Modal)

All Modal anatomy applies. Additionally:

1. **Header** — custom header with `title` + `subtitle` rendered via Modal's `header` slot.
2. **Filter bar** — horizontal row of `<select>` dropdowns (genre, year, rating, provider) + keyword search input.
3. **Filter toggle** — `<button>` to expand/collapse the filter sidebar.
4. **Filter sidebar** — expanded panel with detailed filter options.
5. **Content grid** — `display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr))` — responsive item grid.
6. **Content item** — thumbnail image + title + metadata; `aspect-ratio: 2/3`; selection via click.
7. **Selection reference strip** — fixed bottom-of-grid bar showing selected item thumbnails with remove buttons.
8. **Pagination** — page number buttons + Previous/Next.
9. **Footer** — item count display + Cancel + Confirm buttons.

---

#### Props and API (key props)

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | — | Required |
| `onClose` | `() => void` | — | Required |
| `title` | `string` | — | Modal title |
| `subtitle` | `string` | — | Subtitle below title |
| `items` | `ContentItem[]` | `[]` | All available content items |
| `selectedItems` | `string[]` | `[]` | Initially selected item IDs |
| `onSelectionChange` | `(ids: string[]) => void` | — | Fires on each selection change |
| `onConfirm` | `(ids: string[]) => void` | — | Fires when user confirms selection |
| `filterOptions` | `{ genres, years, ratings, providers }` | `{}` | Options to populate filter dropdowns |

---

#### Responsive Behaviour

Items per page adapts to viewport width via `window.addEventListener('resize')`:

| Viewport | Items per page |
|---|---|
| < 480px | 12 |
| < 768px | 15 |
| < 1200px | 18 |
| ≥ 1200px | 21 |

Grid columns: `repeat(auto-fill, minmax(84px, 1fr))` → smaller minimums at narrower widths.
Modal max-width: `95vw` (mobile) → `80vw` (tablet) → `60vw` (desktop).

**SSR gap:** `window.addEventListener('resize')` inside `useEffect` is safe in React but requires care. `window` is not available during SSR — this produces a hydration mismatch if used in a server-rendered environment.

---

#### Accessibility

Same gaps as `Modal`. Additionally:

| Requirement | Status |
|---|---|
| Filter `<select>` focus ring | Custom `outline: 2px solid #6f8be6; outline-offset: -2px` — correct pattern but wrong colour |
| Search input focus | Styled focus ring — correct pattern |
| Grid item selection | Click-only — no keyboard arrow navigation within grid |
| Pagination | Native `<button>` elements — keyboard accessible |
| Selection reference strip | Remove buttons — need `aria-label="Remove [item name]"` — **gap** |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| All Modal focus gaps inherited | Critical | Fix in Modal |
| Grid keyboard navigation | High | Arrow key navigation within grid |
| Selection remove button labels | High | Add `aria-label="Remove [title]"` |
| SSR resize listener | Medium | Use `ResizeObserver` or conditional init |
| Token migration | High | Phase 2 task |

---

### Shadcn/UI Overlay Primitives — Summary

The following overlay primitives are installed in `src/app/components/ui/` and are available for use. They are Radix-based and handle focus trapping, Escape, and accessible roles internally. They are **not CVP-styled** — they use Tailwind utility classes referencing shadcn design tokens (`bg-background`, `z-50`, etc.), not CVP tokens.

| Component | Implementation | Radix base | Focus trap | Escape | Portal | z-index | Animation |
|---|---|---|---|---|---|---|---|
| `Dialog` | `ui/dialog.tsx` | `@radix-ui/react-dialog` | ✓ Radix | ✓ Radix | ✓ | `z-50` | Fade + Zoom 200ms |
| `Sheet` | `ui/sheet.tsx` | `@radix-ui/react-dialog` | ✓ Radix | ✓ Radix | ✓ | `z-50` | Slide in/out 300ms–500ms; 4 sides |
| `Drawer` | `ui/drawer.tsx` | Vaul (Radix Dialog) | ✓ Vaul | ✓ Vaul | ✓ | `z-50` | Drag + slide; drag handle visible |
| `Popover` | `ui/popover.tsx` | `@radix-ui/react-popover` | Non-modal | ✓ Radix | ✓ | `z-50` | Fade + Zoom + slide by side |
| `Tooltip` | `ui/tooltip.tsx` | `@radix-ui/react-tooltip` | Non-modal | Radix | ✓ | `9999` | Fade + Zoom; custom inline styles |
| `HoverCard` | `ui/hover-card.tsx` | `@radix-ui/react-hover-card` | Non-modal | Radix | ✓ | `z-50` | Fade + Zoom + slide by side |

**When to use each:**

| Scenario | Recommended component |
|---|---|
| Blocking confirmation requiring user decision | `Modal` (CVP) |
| Complex form in overlay with focus trap | `Dialog` (shadcn) — has focus trap |
| Side panel sliding in | `Sheet` (shadcn) |
| Mobile bottom sheet / swipeable drawer | `Drawer` (Vaul/shadcn) |
| Contextual options near a trigger element | `Popover` (shadcn) |
| Short text label for an icon/element | `Tooltip` (shadcn) |
| Rich preview card on hover | `HoverCard` (shadcn) |

**CVP styling gap:** None of the shadcn primitives consume CVP component tokens. If CVP-consistent styling is required, override their CSS via the shadcn component's `className` prop combined with CVP token values.

---

## Feedback

### Toast

| Dimension | Status |
|---|---|
| Production implementation | Complete — includes Context provider and `useToast()` hook |
| Storybook stories | None |
| Token migration | Unregistered tokens in use (`--toast-*`); variant-specific tokens (`--toast-success-bg`, etc.) are referenced but defined nowhere — they must be set in the consumer's token file or via CVP component tokens |
| Specification confidence | High |
| Known gaps | Variant tokens undefined (toasts invisible without consumer token definitions) · No hover-pause on auto-dismiss timer · No exit animation on dismiss · SSR-unsafe random ID · `role="alert"` on all variants (including `info` which should be `role="status"`) · Duplicate toasts not detected · No `prefers-reduced-motion` |

#### Purpose

A transient, auto-dismissing notification that appears in the top-right corner of the viewport. Used to confirm that an action completed, warn of a non-blocking issue, or communicate a background event. Managed via a React Context provider and `useToast()` hook.

#### When to Use

- Confirming a completed action when the result is not immediately visible (e.g. "File saved", "Link copied").
- Warning of a background state that does not require user action.
- Reporting that an async operation failed but the user can retry.
- Communicating ephemeral system events (e.g. "Session will expire in 5 minutes").

#### When Not to Use

- Errors that block the user from continuing — use an inline error or Modal.
- Information that must persist until acknowledged — use `NotificationBanner`.
- Status that the user needs to read before they can act — do not auto-dismiss.
- More than 3 toasts visible at once — queue or throttle additions.

---

#### Architecture

`Toast.tsx` exports three public surfaces:

1. **`ToastProvider`** — React Context provider. Wrap the application root. Renders the `ToastContainer` as a sibling to `children`.
2. **`useToast()`** — hook; returns `{ toasts, addToast, removeToast, clearAll }`.
3. **`Toast`** (named export, internal component `ToastComponent`) — the individual toast element. Consumed by `ToastContainer`; not typically used directly.

---

#### Anatomy

**Container (`ToastContainer`):**
1. **Region** — `<div role="region" aria-label="Notifications" aria-live="polite">` — `position: fixed; top; right; z-index: 9999; pointer-events: none`.
2. **Toast stack** — `display: flex; flex-direction: column; gap: var(--spacing-3)`.

**Individual toast (`ToastComponent`):**
1. **Root** — `<div role="alert" tabIndex={0}>` — flex row; `pointer-events: auto`; `min-width: 320px`; backdrop blur.
2. **Icon** — 16×16px inline SVG; `margin-top: 2px`; `currentColor`.
3. **Content** — flex column; `flex: 1`.
4. **Title** — optional `<div>` — 14px / 500 weight; `margin-bottom: 4px`.
5. **Description** — required `<div>` — 13px / 400 weight; `opacity: 0.9`.
6. **Dismiss button** — optional `<button aria-label="Dismiss notification">` — 20×20px; `opacity: 0.7`; × icon SVG.

---

#### Variants

| Variant | Icon | Intended semantic |
|---|---|---|
| `success` | Checkmark | Operation completed successfully |
| `warning` | Triangle alert | Non-blocking warning; user should be aware |
| `danger` | Circle × | Operation failed; error state |
| `info` | Circle i | Neutral information; background event |

**ARIA role note:** All variants use `role="alert"`. This is semantically correct for `danger` and `warning` (alerts require immediate attention). For `success` and `info`, `role="status"` or `role="log"` may be more appropriate — `alert` causes screen readers to interrupt the current reading flow, which is intrusive for low-priority notifications. **Specification gap:** Use `role="alert"` for `danger` and `warning`; use `role="status"` for `success` and `info`.

---

#### Props and API

**`addToast(toast)` parameters:**

| Field | Type | Default | Required | Description |
|---|---|---|---|---|
| `description` | `string` | — | Yes | Primary notification message |
| `variant` | `'success' \| 'warning' \| 'danger' \| 'info'` | — | Yes | Visual and semantic variant |
| `title` | `string` | — | No | Optional heading above description |
| `duration` | `number` | `5000` | No | Auto-dismiss delay in ms; `0` = persistent |
| `dismissible` | `boolean` | `true` | No | Shows dismiss button |

**`useToast()` returns:**

| Method | Signature | Description |
|---|---|---|
| `addToast` | `(toast) => id: string` | Adds toast; returns its ID |
| `removeToast` | `(id: string) => void` | Immediately removes a toast |
| `clearAll` | `() => void` | Removes all toasts |

---

#### Visual Specification

| Element / property | Value | Token reference | Target CVP token |
|---|---|---|---|
| Container z-index | `9999` | `--toast-container-z-index` | `--cvp-z-index-toast` |
| Container max-width | `400px` | `--toast-container-max-width` | `--cvp-toast-container-max-width` |
| Container position | `fixed; top: var(--spacing-6); right: var(--spacing-6)` | Token refs | `--cvp-toast-container-inset` |
| Toast background | `var(--toast-bg)` → `var(--toast-{variant}-bg)` | Variant tokens | `--cvp-toast-{variant}-bg` |
| Toast border | `var(--toast-border)` → variant | Variant tokens | `--cvp-toast-{variant}-border` |
| Toast text | `var(--toast-text)` → variant | Variant tokens | `--cvp-toast-{variant}-text` |
| Toast icon colour | `var(--toast-icon-color)` → variant | Variant tokens | `--cvp-toast-{variant}-icon` |
| Toast border radius | `var(--radius-md)` | Old shorthand | `--cvp-radius-md` |
| Toast padding | `var(--spacing-4)` | Old shorthand | `--cvp-space-4` |
| Toast shadow | `0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)` | `--toast-box-shadow` | `--cvp-shadow-md` |
| Toast backdrop | `blur(8px)` | `--toast-backdrop-filter` | Local |
| Dismiss hover bg | `rgba(255,255,255,0.1)` | `--toast-dismiss-hover-bg` | `--cvp-color-interactive-overlay` |
| Dismiss focus ring | `outline: 2px solid var(--focus-ring)` | Old shorthand | `--cvp-focus-ring-color` |
| Icon size | `16px` | `--toast-icon-size` | `--cvp-icon-size-sm` |

**Critical token gap:** `--toast-success-bg`, `--toast-warning-bg`, `--toast-danger-bg`, `--toast-info-bg` (and their `-border`, `-text`, `-icon` counterparts) are referenced in the component CSS but **defined nowhere in the CVP token files**. Without external definition, all toasts render with empty backgrounds and invisible text. These must be added to `cvp-component-tokens.css` before the Toast component can be used.

---

#### Component Token Contract

**Public override tokens (must be defined in `cvp-component-tokens.css`):**

| Token | Semantic source | Notes |
|---|---|---|
| `--cvp-toast-success-bg` | `rgba` on `--cvp-color-success-surface` | Semi-transparent |
| `--cvp-toast-success-border` | `--cvp-color-border-success` | |
| `--cvp-toast-success-text` | `--cvp-color-text-success` | |
| `--cvp-toast-success-icon` | `--cvp-color-icon-success` | |
| `--cvp-toast-warning-bg` | `rgba` on `--cvp-color-warning-surface` | |
| `--cvp-toast-warning-border` | `--cvp-color-border-warning` | |
| `--cvp-toast-warning-text` | `--cvp-color-text-warning` | |
| `--cvp-toast-warning-icon` | `--cvp-color-icon-warning` | |
| `--cvp-toast-danger-bg` | `rgba` on `--cvp-color-error-surface` | |
| `--cvp-toast-danger-border` | `--cvp-color-border-error` | |
| `--cvp-toast-danger-text` | `--cvp-color-text-error` | |
| `--cvp-toast-danger-icon` | `--cvp-color-icon-error` | |
| `--cvp-toast-info-bg` | `rgba` on `--cvp-color-surface-overlay` | |
| `--cvp-toast-info-border` | `--cvp-color-border-default` | |
| `--cvp-toast-info-text` | `--cvp-color-text-primary` | |
| `--cvp-toast-info-icon` | `--cvp-color-icon-default` | |

---

#### States

| State | Visual | Behaviour | Accessibility |
|---|---|---|---|
| Entering | Slides in from right (`translateX(100%)→0`; `opacity 0→1`); 300ms cubic-bezier | Appears in stack | Announced by `aria-live="polite"` on container |
| Idle | Fully visible; hover lifts `translateY(-2px)` | Timer counting down | Focusable via `tabIndex={0}` |
| Hover | `translateY(-2px)`; enhanced shadow | **Timer does not pause** | No ARIA change |
| Focused | Browser default (no custom ring on root) | Timer continues | `tabIndex={0}` |
| Dismissed (by user) | Removed from DOM immediately | `removeToast(id)` | **Gap: no exit animation** |
| Auto-dismissed | Removed from DOM after timeout | `setTimeout → removeToast` | No announcement |

---

#### Timeout Behaviour

`addToast` sets `setTimeout(() => removeToast(id), duration)`. Default duration: 5000ms. Set `duration: 0` for persistent toasts.

**Critical gap — no timer pause on hover or focus.** WCAG 2.2 SC 2.2.1 (Timing Adjustable) requires that timing be pauseable, stoppable, or adjustable. WCAG 2.2 SC 2.2.4 (Interruptions) recommends that status messages not interrupt the user. The auto-dismiss timer does not pause when the user hovers or focuses the toast.

**Fix:** Add a `mouseenter`/`focus` handler that clears the auto-dismiss `setTimeout`, and a `mouseleave`/`blur` handler that restarts it with the remaining duration.

---

#### Screen Reader Announcement

The container is `role="region" aria-label="Notifications" aria-live="polite"`. When a new toast is added to the container's children, the `aria-live` region announces its content. `polite` means announcements wait for the current screen reader speech to finish. For `danger` and `warning` toasts, `aria-live="assertive"` would be more appropriate — but the container uses a single `aria-live` value for all variants.

**Specification gap:** The `aria-live` priority should vary by variant:
- `danger`, `warning`: `aria-live="assertive"` — interrupt current speech.
- `success`, `info`: `aria-live="polite"` — wait for current speech to finish.

**Fix options:**
1. Use separate toast containers for high-priority and low-priority toasts.
2. Set `aria-live` dynamically on individual toast elements.
3. Use the Web Accessibility API `aria-atomic` and `aria-relevant` to control announcement granularity.

---

#### Dismissal

Toasts are dismissed by:
1. **Auto-dismiss timer** — `setTimeout` fires after `duration` ms.
2. **User dismiss** — clicks the × button (calls `removeToast`).
3. **Escape key** — `onKeyDown` on the toast element handles `Escape`; calls `removeToast`.
4. **`clearAll`** — via hook, removes all toasts (no keyboard shortcut for this).

**Gap:** No exit animation on dismiss — toast disappears immediately from the DOM.

---

#### Duplicate Detection

`addToast` generates a random ID for every call — there is no duplicate detection. Two identical toasts can appear simultaneously. **Specification gap:** Implement deduplication based on `description` + `variant` if the same event fires twice in rapid succession.

---

#### Persistence

Toasts with `duration: 0` are persistent — they must be dismissed by the user. They remain in the stack indefinitely. **Gap:** Persistent toasts have no visual distinction from auto-dismissing ones. A persistent badge or indicator should differentiate them.

---

#### Positioning and Stacking

The container is `position: fixed; top: var(--spacing-6); right: var(--spacing-6)`. Toasts stack in column order (oldest at top, newest at bottom) via `flex-direction: column`. At ≤640px: container spans full width with `left: var(--spacing-4); right: var(--spacing-4)`.

**Gap:** If many toasts are added quickly, the stack can grow beyond the viewport height. No max-visible-toast limit or overflow strategy is implemented.

---

#### Motion

| Animation | Property | Duration | Easing | Reduced-motion |
|---|---|---|---|---|
| Entrance | `translateX(100%)→0; opacity 0→1` | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` | **Gap: no media query** |
| Hover lift | `translateY(-2px); box-shadow` | 300ms | Same | **Gap** |
| Exit | None — DOM removal is instant | — | — | N/A |

---

#### Responsive Behaviour

At ≤640px: `min-width: auto; width: 100%` on individual toasts; container uses `left` and `right` side margins. At wider viewports: `min-width: 320px; max-width: 400px`.

---

#### Composition

- `ToastProvider` must wrap the application root (e.g. `App.tsx`).
- `useToast()` is called in any component that needs to add a toast.
- `Toast` is rendered inside `ToastProvider` automatically via `ToastContainer`.
- The CVP `Toast` and shadcn `Sonner` can co-exist — they are independent systems. Do not mix them in the same application without a documented convention.

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Success | `variant="success"` with title and description |
| Warning | `variant="warning"` |
| Danger | `variant="danger"` |
| Info | `variant="info"` |
| Without title | Description only |
| Persistent | `duration={0}` — dismiss button required |
| Non-dismissible | `dismissible={false}` |
| Multiple toasts | Stack of 3 different variants |
| Auto-dismiss | Timer interaction test (5s) |
| Escape dismisses | Keyboard interaction test |
| Hover timer gap | Document: timer does not pause on hover |
| Undefined tokens gap | Document: variant tokens must be defined in consuming app |
| Mobile (640px) | Full-width stack |
| Theme: light and dark | |
| Reduced motion gap | Document |

---

#### Test Requirements

| Type | Coverage |
|---|---|
| Unit | `addToast` adds to stack; `removeToast` removes by id; `clearAll` empties; `duration: 0` does not set timeout; default duration 5000ms |
| Interaction | Dismiss button removes toast; Escape dismisses; auto-dismiss after timeout |
| Accessibility | axe scan; `role="alert"` present; `aria-live="polite"` on container; `aria-label="Notifications"` present |
| Visual regression | All 4 variants × both themes; with title; without title; persistent |
| Responsive | 640px — full width |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| Variant token values undefined — toasts invisible | Critical | Define `--cvp-toast-{variant}-*` tokens in `cvp-component-tokens.css` |
| Auto-dismiss timer does not pause on hover/focus | High | Add pause/resume on `mouseenter`/`focus` |
| No exit animation | Medium | Add CSS exit transition or `AnimatePresence` |
| `role="alert"` on all variants | Medium | Use `role="status"` for success and info |
| `aria-live="polite"` for all variants | Medium | Use `"assertive"` for danger and warning |
| SSR-unsafe random ID | Medium | Replace with `crypto.randomUUID()` or `useId()` |
| No duplicate detection | Low | Add deduplication by description + variant |
| No max-visible-toast limit | Low | Implement queue and max visible count |
| No `prefers-reduced-motion` | High | Add media query |
| Persistent toast has no visual distinction | Low | Add persistent indicator |
| Token migration | High | Phase 2 task |

---

### NotificationBanner

| Dimension | Status |
|---|---|
| Production implementation | Complete |
| Storybook stories | None |
| Token migration | No CVP tokens consumed — all values are hardcoded hex, rgba, gradient values, or inline font declarations |
| Specification confidence | High |
| Known gaps | No CVP tokens · No live region (`role` or `aria-live`) — banner is silent to screen readers unless consumer adds announcement · Theme detection uses `@media (prefers-color-scheme)` not `[data-theme]` — inconsistent with CVP theme system · Font hardcoded to `Inter` · No title truncation |

#### Purpose

A persistent, inline contextual message. Unlike `Toast`, `NotificationBanner` is not transient — it remains visible until explicitly dismissed or the containing component unmounts. Used to communicate page-level or section-level status that the user must be aware of before proceeding.

#### When to Use

- Informing the user about a permanent or long-lived condition relevant to the current page or section (e.g. "This account is in trial mode", "Your license expires in 7 days").
- Displaying a success state after a form submission where the success persists on the page.
- Presenting a warning about a degraded service state.
- Confirming an action that has a visible effect in the current view (non-transient success).

#### When Not to Use

- Ephemeral confirmations after user actions — use `Toast`.
- Blocking errors that prevent the user from continuing — use a Modal or inline error.
- Informational messages with no urgency — use body text or a callout.

---

#### Anatomy

1. **Root** — `<div class="notification-banner notification-banner--{variant}">` — flex row; 12px padding; 8px border-radius; 1px border.
2. **Icon** — `<Icon size={16}>` — Lucide icon; `margin-top: 2px`; flex-shrink 0.
3. **Content** — `<div>` — flex column; flex 1.
4. **Title** — `<div class="notification-banner__title">` — 12px / 500 / 16px.
5. **Message** — `<div class="notification-banner__message">` — 12px / 400 / 16px.
6. **Dismiss button** — `<button aria-label="Dismiss notification">` — optional; only rendered when `onDismiss` is provided; `X` icon.

---

#### Variants

| Variant | Icon | Background | Border | Title colour | Message colour |
|---|---|---|---|---|---|
| `info` (default) | `Info` | Blue-purple gradient at 10% | `rgba(59,130,246,0.3)` | `#60a5fa` | `oklch(80.9% .105 251.813)` |
| `success` | `CheckCircle` | Green gradient at 10% | `rgba(16,185,129,0.3)` | `#6ee7b7` | `#d1fae5` |
| `warning` | `AlertTriangle` | Amber gradient at 10% | `rgba(245,158,11,0.3)` | `#fcd34d` | `#fef3c7` |
| `error` | `XCircle` | Red gradient at 10% | `rgba(239,68,68,0.3)` | `#fca5a5` | `#fee2e2` |

Light theme values (via `@media (prefers-color-scheme: light)`) differ — darker, more saturated versions of the same hues.

**Token gap:** All colour values are hardcoded. CVP migration targets:

| Current | CVP target |
|---|---|
| Info gradient | `--cvp-color-info-surface` |
| Info border | `--cvp-color-border-info` |
| Info title | `--cvp-color-text-info` |
| Success gradient | `--cvp-color-success-surface` |
| Warning gradient | `--cvp-color-warning-surface` |
| Error gradient | `--cvp-color-error-surface` |

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `title` | `string` | — | Yes | Bold heading |
| `message` | `string` | — | Yes | Supporting text |
| `variant` | `'info' \| 'warning' \| 'success' \| 'error'` | `'info'` | No | |
| `icon` | `React.ComponentType` | Auto by variant | No | Custom icon (Lucide component) |
| `onDismiss` | `() => void` | — | No | When provided, dismiss button renders |

---

#### Visual Specification

| Element / property | Value |
|---|---|
| Border radius | `8px` (hardcoded) |
| Padding | `12px` (hardcoded) |
| Icon size | `16px` |
| Title font size | `12px` / 500 / 16px |
| Message font size | `12px` / 400 / 16px |
| Title–message gap | `2px` margin-bottom on title |
| Dismiss opacity default | `0.6` |
| Dismiss hover opacity | `1.0` |
| Dismiss transition | `opacity 0.15s ease` |
| Dismiss focus ring | `outline: 2px solid #6f8be6; offset 2px` |
| Font | `"Inter", -apple-system, ...` (hardcoded) |

---

#### States

| State | Visual | Behaviour | Accessibility |
|---|---|---|---|
| Default | Coloured gradient bg; icon; title; message | Static | No ARIA role — **critical gap** |
| Dismissible | + dismiss button visible | Click calls `onDismiss`; consumer manages visibility | `aria-label="Dismiss notification"` on button |
| Dismissed | Component unmounts (consumer-controlled) | — | — |

---

#### Screen Reader Announcement

**Critical gap:** `NotificationBanner` has no `role` or `aria-live` attribute. When it appears (via conditional rendering in the consumer), screen readers will not announce it unless the consumer wraps it in an `aria-live` region.

**Required fix at consumer level:** Wrap `<NotificationBanner>` in an `aria-live` region:
```jsx
<div role="status" aria-live="polite" aria-atomic="true">
  {showBanner && <NotificationBanner ... />}
</div>
```

**Design system fix (preferred):** Add appropriate `role` and `aria-live` to the component based on variant:
- `error`, `warning`: `role="alert"` (implies `aria-live="assertive"`)
- `success`, `info`: `role="status"` (implies `aria-live="polite"`)

---

#### Theme System Inconsistency

The component uses `@media (prefers-color-scheme: light)` for light theme variants. The CVP system uses `[data-theme="light"]` data attributes. This means:
- If the user's OS is in dark mode but the app forces `data-theme="light"`, the component renders dark theme colours.
- The component is not responsive to the CVP theme toggle.

**Fix:** Replace `@media (prefers-color-scheme: light)` blocks with `[data-theme="light"] .notification-banner--*` selectors, matching the rest of CVP.

---

#### Dismissal Behaviour

The `onDismiss` prop is a callback — the component is stateless. The consumer is responsible for:
1. Tracking whether the banner should be shown (e.g. via `useState(true)`).
2. Setting the visibility to `false` when `onDismiss` fires.
3. Optionally persisting the dismissed state (e.g. `localStorage`) to prevent re-appearance.

There is no built-in animation on dismiss — if `onDismiss` causes the banner to unmount, it disappears immediately.

---

#### Persistence

The banner is persistent by design. It remains visible until `onDismiss` is called. There is no auto-dismiss mechanism.

---

#### Content Rules

| Element | Rules |
|---|---|
| Title | Short and imperative; ≤ 60 chars; 500 weight; 12px |
| Message | 1–2 sentences max; do not wrap over 3 lines at standard widths |
| Icon | Defaults by variant; override only when default icon is ambiguous in context |
| Font hardcoding | **Gap:** must use `var(--font-family)` or `var(--cvp-font-family-sans)` |

---

#### Responsive Behaviour

No responsive breakpoints. The banner fills its container width (block-level). On narrow viewports the icon, title, and message stack without wrapping issues — the flex row layout allows natural multi-line message text.

---

#### Composition

- Used inline within page content, panels, modals, and card headers.
- Typically positioned near the content it describes, not as a global header.
- Multiple banners can stack vertically; the consumer controls layout spacing.

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Info | Default variant |
| Success | `variant="success"` |
| Warning | `variant="warning"` |
| Error | `variant="error"` |
| With dismiss | `onDismiss={fn}` |
| Without dismiss | No button |
| Custom icon | `icon={Sparkles}` |
| Long message | 3-line message text |
| Theme: light forced | Document theme system mismatch |
| Theme: dark forced | |
| Screen reader gap | No live region documented |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| No `role` or `aria-live` — silent to screen readers | Critical | Add `role="alert"` (error/warning) or `role="status"` (success/info) |
| Theme uses `prefers-color-scheme` not `[data-theme]` | High | Replace with CVP theme data attribute selectors |
| All colours hardcoded | High | Migrate to `--cvp-*` tokens |
| Font hardcoded to `Inter` | Medium | Replace with `var(--font-family)` |
| No dismiss animation | Low | Add CSS exit transition |
| No title truncation | Low | Add `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` option |

---

### Shadcn/UI Feedback Primitives — Summary

The following feedback primitives are installed in `src/app/components/ui/` and are available for composition. They are **not CVP-styled**.

| Component | File | Description | ARIA | Notes |
|---|---|---|---|---|
| `Alert` | `ui/alert.tsx` | Inline alert with `default` and `destructive` variants | `role="alert"` | CVA variants; uses shadcn tokens |
| `Badge` | `ui/badge.tsx` | Small label/tag with 4 variants (`default`, `secondary`, `destructive`, `outline`) | None | Can be used as `<a>` via `asChild`; focus ring on links |
| `Progress` | `ui/progress.tsx` | Horizontal progress bar; `value` prop (0–100) | Radix managed | `bg-primary/20` track; `bg-primary` indicator; `transition-all` |
| `Skeleton` | `ui/skeleton.tsx` | Shimmer placeholder; `animate-pulse` | None | No ARIA; consumer must add `aria-busy` on parent |
| `Sonner` | `ui/sonner.tsx` | Third-party Sonner toast library wrapper | Sonner-managed | Syncs with next-themes; `--normal-bg/text/border` via shadcn vars |

**When to use each:**

| Scenario | Component |
|---|---|
| Inline validation or contextual warning in a form | `Alert` (shadcn) |
| Status label on a card or list item | `Badge` (shadcn) |
| Progress of a deterministic operation | `Progress` (shadcn) |
| Loading placeholder for content | `Skeleton` (shadcn) |
| Toast using the Sonner API | `Sonner`/`Toaster` (shadcn) |
| Product notification toast | `Toast` (CVP) |
| Persistent contextual message | `NotificationBanner` (CVP) |

**Skeleton accessibility gap:** `Skeleton` has no ARIA attributes. The parent element must use `aria-busy="true"` and `aria-label="Loading…"` while skeleton content is displayed. When real content replaces the skeleton, `aria-busy` must be removed.

**Progress accessibility gap:** `Progress` (Radix) manages `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` internally. The consumer must provide `aria-label` or `aria-labelledby` on the `Progress` element to give it an accessible name.

---

### Components Not Implemented — Overlays, Disclosure, Feedback

The following components listed in the brief's potential component list do not exist as standalone CVP components in the repository:

| Component | Status | Notes |
|---|---|---|
| `Dialog` | Not standalone CVP | Shadcn primitive (`ui/dialog.tsx`) available |
| `AlertDialog` | Not implemented | No file found; use Modal with Danger pattern |
| `Drawer` | Not standalone CVP | Shadcn/Vaul primitive (`ui/drawer.tsx`) available |
| `Sheet` | Not standalone CVP | Shadcn primitive (`ui/sheet.tsx`) available |
| `Popover` | Not standalone CVP | Shadcn primitive (`ui/popover.tsx`) available |
| `Dropdown` | Not standalone CVP | Dropdown menus exist inside HeaderNavigation only |
| `Tooltip` | Not standalone CVP | Shadcn/Radix primitive (`ui/tooltip.tsx`) available |
| `HoverCard` | Not standalone CVP | Shadcn primitive (`ui/hover-card.tsx`) available |
| `Context Menu` | Not implemented | No file found |
| `Disclosure` | Not standalone CVP | Shadcn `Collapsible` (`ui/collapsible.tsx`) available; CVP `Accordion` is the CVP equivalent |
| `Expandable Panel` | Not implemented | No file found |
| `Collapsible Section` | Not standalone CVP | Use `Accordion` |
| `Alert` | Not standalone CVP | Shadcn primitive (`ui/alert.tsx`) available |
| `Banner` | Alias of `NotificationBanner` (CVP) | Documented above |
| `Inline Message` | Specification gap | No standalone component; see `MiscInput` validation messages |
| `Snackbar` | Alias of `Toast` (CVP) | Documented above |
| `Notification` | Alias of `NotificationBanner` (CVP) | Documented above |
| `Status Indicator` | Not implemented | No standalone component |
| `Badge` | Not standalone CVP | Shadcn primitive (`ui/badge.tsx`) available |
| `Progress Bar` | Not standalone CVP | Shadcn/Radix primitive (`ui/progress.tsx`) available |
| `Spinner` | Not implemented | No file found; no CVP spinner component |
| `Skeleton` | Not standalone CVP | Shadcn primitive (`ui/skeleton.tsx`) available |
| `Empty State` | Pattern only | Implemented inline within `Table`, `RailContentGallery`, `ContentBrowserModal`; no standalone component |
| `Error State` | Pattern only | Same as Empty State |
| `Success State` | Pattern only | Same as Empty State |

All absent components are **Specification gaps** pending design and implementation. The Spinner, Empty State, Error State, and Success State gaps are particularly significant as they affect multiple existing components.

---

*Overlays, Disclosure and Feedback specification complete. Data Display and remaining families to follow in subsequent passes.*

---

## Part E — Data Display and Structured Content

> **Family scope.** The CVP publishable component set for this pass comprises:
> - **Data Display (CVP custom):** `Table`, `Tree` (and sub-components `TreeNode`, `TreeGroupHeader`, `TreeGroup`, `TreeItem`)
> - **Data Display (CVP cross-reference):** `Accordion` — documented in Part C (Navigation and Wayfinding); not re-specified here
> - **Data Display (shadcn/ui primitives, available but not CVP-styled):** `Card`, `Avatar`, `Pagination`, `Chart`
>
> `Badge`, `Skeleton`, `Progress` are documented in Part D (Feedback) because they were installed and referenced in that family context. They appear in a cross-reference table at the end of this section.
>
> Components listed in the brief's potential list that do not exist as standalone CVP components: Data Table (alias of Table), Sortable Table (Table with `sortable` prop), Selectable Table (Table with `selectable` prop), Expandable Table (Table with `expandable` prop), Grid, List, Description List, Panel, Tile, Stat, Metric, Chip, Tag, Avatar Group, Timeline, Key-Value Pair, Code Block, Metadata List, Property Panel, Details Panel, Data Summary. All are **specification gaps** documented in the closing table.

> **Family-wide critical gap — Table semantic HTML.** The CVP `Table` component is implemented entirely with `<div>` elements. It uses **no semantic HTML table elements** (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`) and **no ARIA table roles** (`role="table"`, `role="row"`, `role="columnheader"`, `role="cell"`, `role="rowgroup"`). Screen readers cannot interpret the layout as tabular data. This is a **critical WCAG violation** affecting all users of assistive technology. Fix requires either migrating to semantic `<table>` HTML or adding the full ARIA grid/table role hierarchy.

> **Family-wide critical gap — Table keyboard navigation.** The Table has no keyboard navigation model for cells. Row selection via checkboxes is keyboard-accessible, but there is no arrow-key grid navigation. Sort buttons and expand buttons are focusable, but there is no Tab order management within the table. Pagination Previous/Next buttons have no focus ring (`.table-btn { outline: none }` with no `:focus-visible` override).

> **Family-wide critical gap — Tree ARIA semantics.** The CVP `Tree` component implements no ARIA tree roles. The root element is a plain `<div>` — no `role="tree"`. Individual items have no `role="treeitem"`, `aria-expanded`, `aria-level`, `aria-setsize`, or `aria-posinset`. There is no keyboard navigation (arrow keys, Enter, Space, Home, End). This component is entirely inaccessible to screen reader users.

---

## Table

| Dimension | Status |
|---|---|
| Production implementation | Complete — richest CVP component |
| Storybook stories | None |
| Token migration | Unregistered tokens (`--table-*`); mix of hardcoded hex values and old shorthand tokens (`--bg-surface-raised`, `--input-bg`, `--input-border`, `--icon-muted`, etc.); light theme overrides via `[data-theme="light"]` |
| Specification confidence | High |
| Known gaps | No semantic table HTML · No ARIA table roles · No `aria-sort` on sort headers · No focus ring on most interactive elements · No `aria-label` on checkboxes, action buttons, or pagination · No indeterminate select-all state · Drag-and-drop mouse-only · Column resize mouse-only · Settings/Group/View buttons are non-functional (console.log stubs) · No loading state · No empty state · No error state · No keyboard cell navigation |

#### Purpose

A rich data presentation component for tabular information. Combines column sorting, row selection (checkbox-based), row expansion, column resizing, row reordering via drag-and-drop, settings toolbar, and an integrated pagination footer. It operates as a visual-only data grid — all data manipulation (sorting, pagination) is externally driven via callbacks.

#### When to Use

- Displaying structured records where users need to scan, filter, compare, and act on rows.
- List views of content assets, users, schedules, or metadata-rich items.
- When row selection and bulk action patterns are required.
- When row-level inline detail expansion is needed.

#### When Not to Use

- Simple read-only key-value pairs — use a Description List pattern.
- Lists with fewer than 5 rows and no interaction — use a styled `<ul>`.
- Highly complex pivot or cross-tab analysis — this component is a presentation table, not a data grid with in-cell editing.
- Mobile-primary contexts — the component has limited mobile transformation (font and padding reduction only).

---

#### Semantic HTML Clarification

> **This is the most important implementation gap in the CVP design system.**

The component renders:
```html
<div class="data-table-container">
  <div class="data-table-header-row">
    <div class="data-table-header-cell">Column Name</div>
    ...
  </div>
  <div class="table-body-container">
    <div class="data-table-row">
      <div class="data-table-cell">Cell value</div>
    </div>
  </div>
</div>
```

It does **not** render `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, or `<td>`. Screen readers announce this as generic layout content, not tabular data.

**Required fix (Option A — semantic HTML):**
```html
<table>
  <thead>
    <tr>
      <th scope="col" aria-sort="ascending">Column Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell value</td>
    </tr>
  </tbody>
</table>
```

**Required fix (Option B — ARIA roles):**
```html
<div role="table" aria-label="[table name]">
  <div role="rowgroup">
    <div role="row">
      <div role="columnheader" aria-sort="ascending">Column Name</div>
    </div>
  </div>
  <div role="rowgroup">
    <div role="row">
      <div role="cell">Cell value</div>
    </div>
  </div>
</div>
```

Option A (semantic HTML) is preferred — it provides the richer browser-native behaviour and is more resilient to AT differences.

---

#### Anatomy

1. **Container** — `.data-table-container` — `display: flex; flex-direction: column; overflow: hidden`; fixed `height` (default 500px); border 1px; radius 8px.
2. **Settings toolbar** — `.table-settings-row` — sticky top; 52px height; left: count / "Clear All"; right: Settings, Group/Ungroup, View icon buttons.
3. **Scroll container** — `.table-scroll-container` — `flex: 1; overflow: auto` — both axes scroll.
4. **Header row** — `.data-table-header-row` — sticky within scroll container; `z-index: 2`.
5. **Header cell** — `.data-table-header-cell` — 12px / 600 / uppercase / 0.05em tracking.
6. **Sort button** — `.table-sort-icon` — 24×24px; `ChevronUp` (asc) or `ChevronDown` (desc/unsorted).
7. **Resize handle** — `.table-resize-handle` — `position: absolute; right: 0`; 1px wide; opacity 0 → 1 on header hover; `cursor: col-resize`.
8. **Body container** — `.table-body-container`.
9. **Data row** — `.data-table-row` — `min-height: 40px`; flex row; `border-bottom: 1px`.
10. **Primary cell** — `.data-table-cell` — 14px / 400; first column; full colour.
11. **Secondary cell** — `.data-table-cell.data-table-cell--secondary` — muted colour.
12. **Checkbox cell** — 48px wide; centered; `<input type="checkbox">` with custom CSS.
13. **Expand cell** — 40px wide; centered; `<button class="table-expand-icon">` (ChevronUp/Down).
14. **Drag handle** — `.table-drag-handle` — `Grip` icon; opacity 0 → 1 on row hover.
15. **Actions cell** — 80px wide; centered; `MoreHorizontal` (overflow) + `Trash2` (delete) buttons.
16. **Expanded content row** — `.data-table-expanded-content` — `bg-surface-raised`; 16px padding; 13px text; only rendered when row is expanded.
17. **Pagination footer** — `.table-pagination-footer` — sticky bottom; 56px height; "Page N of N" + Previous/Next buttons.

---

#### Column Model

| Property | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | — | Column identifier; used as key in `row` object |
| `label` | `string` | — | Display name shown in header |
| `width` | `string` | `auto` | CSS width value; sets `flex: none` when provided |
| `sortable` | `boolean` | inherits from table `sortable` prop | Per-column override |
| `resizable` | `boolean` | inherits from table `resizable` prop | Per-column override |

Column widths are tracked in a `columnWidths: Record<string, number>` state object that is updated during drag-resize. Minimum width: 80px.

#### Row Model

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Required unique key |
| `[columnId]` | `any` | Cell value for each column — rendered directly or via `renderCell` |
| `expandable` | `boolean` | When true, expand button appears in the expand cell |
| `expandedContent` | `React.ReactNode` | Rendered in expanded content row |

---

#### Props and API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `columns` | `TableColumn[]` | — | Yes | Column definitions |
| `data` | `TableRow[]` | — | Yes | Row data |
| `selectable` | `boolean` | `false` | No | Enables checkbox column |
| `expandable` | `boolean` | `false` | No | Enables expand column |
| `sortable` | `boolean` | `false` | No | Enables sort buttons on all columns (per-column `sortable` can override) |
| `resizable` | `boolean` | `false` | No | Enables drag-resize handles (per-column `resizable` can override) |
| `draggable` | `boolean` | `false` | No | Enables row reorder drag handles |
| `onSort` | `(columnId, direction) => void` | — | No | Called when sort changes; component does NOT re-sort data |
| `onSelectionChange` | `(ids: string[]) => void` | — | No | Called when selection changes |
| `onRowReorder` | `(from, to) => void` | — | No | Called after drop; component does NOT reorder data |
| `className` | `string` | `''` | No | Additional class on container |
| `height` | `string` | `'500px'` | No | Fixed container height (CSS value) |
| `showSettings` | `boolean` | `true` | No | Shows/hides settings toolbar |
| `showPagination` | `boolean` | `true` | No | Shows/hides pagination footer |
| `pageSize` | `number` | `10` | No | Rows per page |
| `currentPage` | `number` | `1` | No | Current page (controlled) |
| `totalItems` | `number` | — | No | Total row count for server-side pagination |
| `onPageChange` | `(page: number) => void` | — | No | Called on Previous/Next click |
| `renderCell` | `(colId, value, row) => ReactNode` | — | No | Custom cell renderer |

---

#### Visual Specification

| Element / property | Dark theme value | Light theme value | Token ref | CVP target |
|---|---|---|---|---|
| Container bg | `#14141a` | `#ffffff` | `--table-bg` | `--cvp-color-surface-default` |
| Header bg | `#0a0a0f` | `#f8f9fa` | `--table-header-bg` | `--cvp-color-surface-sunken` |
| Row hover | `#1f1f28` | `#f3f4f6` | `--table-row-hover` | `--cvp-color-surface-hover` |
| Border | `#1f1f28` | `#e5e7eb` | `--table-border-color` | `--cvp-color-border-default` |
| Text primary | `#ffffff` | `#111827` | `--table-text` | `--cvp-color-text-primary` |
| Text muted | `#9b9ba5` | `#6b7280` | `--table-muted-text` | `--cvp-color-text-secondary` |
| Selected row bg | `rgba(61,99,221,0.1)` | `rgba(37,99,235,0.1)` | `--table-selected-row-bg` | `--cvp-color-selection-surface` |
| Selected row border | `#3d63dd` | `#2563eb` | `--table-selected-row-border` | `--cvp-color-brand-default` |
| Primary button | `#3d63dd` | `#2563eb` | `--table-primary-btn` | `--cvp-color-brand-default` |
| Primary button hover | `#244cce` | `#1d4ed8` | `--table-primary-btn-hover` | `--cvp-color-brand-hover` |
| Icon button hover bg | `#1f1f28` | `#f3f4f6` | `--table-icon-btn-hover` | `--cvp-color-surface-hover` |
| Delete icon | `#e6494e` | `#e6494e` | `--table-delete-icon` | `--cvp-color-error-default` |
| Container height | `500px` | — | `--table-fixed-height` (from prop) | — |
| Settings row height | `52px` | — | `--table-settings-height` | `--cvp-table-settings-height` |
| Pagination height | `56px` | — | `--table-pagination-height` | `--cvp-table-pagination-height` |
| Row min-height | `40px` | — | `--table-row-min-height` | `--cvp-table-row-min-height` |
| Container radius | `8px` | — | Hardcoded | `--cvp-radius-md` |
| Header font size | `12px` | — | Hardcoded | `--cvp-type-scale-xs-size` |
| Header font weight | `600` | — | Hardcoded | `--cvp-type-scale-xs-weight` |
| Cell font size | `14px` | — | Hardcoded | `--cvp-type-scale-m-size` |
| Cell font weight | `400` | — | Hardcoded | `--cvp-type-scale-m-weight` |
| Checkbox focus ring | `box-shadow: 0 0 0 2px #67b3fb` | — | Hardcoded | `--cvp-focus-ring-color` |
| Sort focus ring | `box-shadow: 0 0 0 2px #67b3fb` | — | Hardcoded | `--cvp-focus-ring-color` |
| Expand focus ring | `box-shadow: 0 0 0 2px #67b3fb` | — | Hardcoded | `--cvp-focus-ring-color` |
| Pagination btn focus | **None** | — | `.table-btn { outline: none }` | Must add `:focus-visible` |

---

#### Component Token Contract

**Current unregistered tokens (must be migrated):**

| Token | Semantic target |
|---|---|
| `--table-bg` | `--cvp-color-surface-default` |
| `--table-header-bg` | `--cvp-color-surface-sunken` |
| `--table-row-hover` | `--cvp-color-surface-hover` |
| `--table-border-color` | `--cvp-color-border-default` |
| `--table-text` | `--cvp-color-text-primary` |
| `--table-muted-text` | `--cvp-color-text-secondary` |
| `--table-selected-row-bg` | `--cvp-color-selection-surface` |
| `--table-selected-row-border` | `--cvp-color-brand-default` |
| `--table-primary-btn` | `--cvp-color-brand-default` |
| `--table-primary-btn-hover` | `--cvp-color-brand-hover` |
| `--table-icon-btn-hover` | `--cvp-color-surface-hover` |
| `--table-delete-icon` | `--cvp-color-error-default` |

**Internal structural tokens (retained as local):**

| Token | Value |
|---|---|
| `--table-fixed-height` | Injected from `height` prop |
| `--table-settings-height` | `52px` |
| `--table-pagination-height` | `56px` |
| `--table-row-min-height` | `40px` |

---

#### States

| State | Visual | Behaviour |
|---|---|---|
| Row — default | Background: `--table-bg` | No interaction |
| Row — hover | Background: `--table-row-hover` | Drag handle appears; cursor: default |
| Row — selected | Background: `--table-selected-row-bg`; left border `--table-selected-row-border` | Checkbox checked |
| Row — dragging | `opacity: 0.5` | HTML5 drag in progress |
| Row — expanded | No bottom border | `expandedContent` rendered below |
| Header cell — sortable | Cursor: pointer | Click triggers `onSort` |
| Header cell — sort active | Sort icon changes; direction indicator | `onSort` called with new direction |
| Header cell — resizing | Resize handle `opacity: 1` | Column width updating live |
| Sort button — unsorted | `ChevronDown` at muted colour | — |
| Sort button — asc | `ChevronUp` at strong colour | — |
| Sort button — desc | `ChevronDown` at strong colour | — |
| Checkbox — unchecked | Transparent bg; muted border | — |
| Checkbox — checked | Brand blue bg; checkmark SVG | — |
| Checkbox — indeterminate | **Not implemented** — gap | Select-all when partial selection exists |
| Pagination Previous — disabled | `opacity: 0.5; cursor: not-allowed` | Cannot click when `currentPage === 1` |
| Pagination Next — disabled | `opacity: 0.5; cursor: not-allowed` | Cannot click when `currentPage === totalPages` |

---

#### Sorting

**Behaviour:** Clicking a sort button calls `onSort(columnId, direction)`. The component does **not** sort the `data` array itself — it only tracks `sortColumn` and `sortDirection` for visual state and delegates sorting to the consumer. The consumer must re-pass sorted data via the `data` prop.

**Direction toggle:** Clicking a column for the first time sets `asc`. Clicking the same column a second time sets `desc`. Clicking a third time does NOT clear the sort — there is no "unsorted" state after initial activation. **Gap:** No mechanism to reset to unsorted.

**Multiple column sort:** Not supported. Only one column can be sorted at a time.

**Visual state:** The active sort column's button shows `ChevronUp` (asc) or `ChevronDown` (desc). All other columns show `ChevronDown` (appears unsorted).

**ARIA gap:** No `aria-sort` attribute is set on sort header cells. Screen readers cannot announce sort state.

**Required fix:**
```html
<th scope="col" aria-sort="ascending">Column Name</th>
<!-- or -->
<div role="columnheader" aria-sort="descending">Column Name</div>
```

`aria-sort` values: `"none"` (sortable, not active) | `"ascending"` | `"descending"` | `"other"`.

**Sort announcement:** When sort changes, screen readers should be informed. With `aria-sort` in place, AT announces the new state automatically. No additional `aria-live` announcement is needed for sort.

---

#### Selection

**Model:** Checkbox-based multi-select. `selectedRows` is a `Set<string>` of row IDs held in internal state.

**Select-all:** Header checkbox checks/unchecks all rows in `data` (not just `displayedData`). Calls `onSelectionChange(Array.from(selection))`.

**Individual select:** Row checkboxes toggle individual row IDs in the set.

**Indeterminate state — critical gap:** When some but not all rows are selected, the select-all checkbox should show an indeterminate state (`<input type="checkbox">` `.indeterminate = true` property). The component does not set this. The browser does not render indeterminate from the `checked` attribute — it requires a JavaScript property assignment. 

**Required fix:**
```tsx
useEffect(() => {
  if (selectAllRef.current) {
    selectAllRef.current.indeterminate = 
      selectedRows.size > 0 && selectedRows.size < data.length;
  }
}, [selectedRows, data]);
```

**Selection toolbar:** When `selectedRows.size > 0`, the settings toolbar shows "{N} selected" and a "Clear All" TextButton. No bulk action buttons are defined — bulk action content is a specification gap. The consumer must inject bulk action controls.

**Accessibility gap:** Checkboxes have no `aria-label`. Screen readers announce them as "checkbox" with no context.

**Required fix:** Add descriptive labels:
- Select-all: `aria-label="Select all rows"`
- Row checkbox: `aria-label={`Select row: ${row[columns[0].id]}`}`

---

#### Row Expansion

**Behaviour:** When `expandable` is true and a row has `expandable: true` in its data, an expand column with a chevron button appears. Clicking toggles `expandedRows` state. When expanded, `expandedContent` is rendered in a full-width div immediately below the row.

**Multiple expansion:** Supported — any number of rows can be expanded simultaneously.

**Accessibility gap:** The expand button has no `aria-expanded` or `aria-label`.

**Required fix:**
```tsx
<button
  aria-expanded={expandedRows.has(row.id)}
  aria-label={expandedRows.has(row.id) ? "Collapse row" : "Expand row"}
>
```

**Expanded content region:** `data-table-expanded-content` has no ARIA role or relationship to its triggering row. With semantic HTML, this would be a `<tr>` with a `<td colspan={n}>` inside.

---

#### Column Resizing

**Behaviour:** When `resizable` is true (or per-column), a `<div class="table-resize-handle">` appears at the right edge of each header cell. It is `opacity: 0` until the header cell is hovered.

**Mechanism:** `mousedown` on the handle stores `resizingColumn`, `resizeStartX`, and `resizeStartWidth`. Global `document.addEventListener('mousemove')` and `mouseup` handlers track the delta and update `columnWidths` state. Minimum width: 80px. Cleanup removes global listeners on mouseup and on component unmount.

**Gaps:**
- Mouse-only — no touch support, no keyboard resize.
- The resize handle is a `<div>` with no role, label, or keyboard interaction — it is inaccessible.
- Global `document.addEventListener` inside a React component without a stable function reference: the `handleResizeMove` and `handleResizeEnd` functions reference state values (`resizingColumn`, `resizeStartX`, `resizeStartWidth`) captured at the time they were defined. If state updates cause re-renders, the closures may capture stale values. **Fix:** Use `useRef` for resize tracking instead of state.

---

#### Row Drag-and-Drop Reorder

**Behaviour:** When `draggable` is true, each row shows a `Grip` icon handle (visible on row hover). Rows use HTML5 drag events (`draggable={true}`, `onDragStart`, `onDragOver`, `onDrop`). `onDrop` fires `onRowReorder(fromIndex, toIndex)`. The component does **not** reorder data itself — the consumer must update the `data` prop.

**Gaps:**
- Mouse-only — no keyboard drag support.
- No visual drop target indicator — no highlight on the row being dragged over.
- The drag handle `<div>` has no `aria-label`, `role`, or keyboard interaction. It should be `role="button" aria-label="Drag to reorder"` with a keyboard-accessible reorder mechanism (e.g. position input, move-up/move-down buttons).
- `draggable={true}` on divs requires `role="row"` to be meaningful to AT.

---

#### Settings Toolbar

**Available controls (right side):**

| Control | Icon | Implemented | Notes |
|---|---|---|---|
| Settings | `Settings` 16px | Visual only | Handler logs to console — no functionality |
| Group/Ungroup | `Group` / `Ungroup` 16px | Partial | Toggles `isGrouped` boolean; no actual grouping |
| View | `Eye` 16px | Visual only | Handler logs to console — no functionality |

**Left side:** Shows `"{N} rows"` when no selection, or `"{N} selected" + Clear All` when rows are selected.

**Accessibility gap:** All three icon buttons use `title` attribute (`title="Settings"` etc.) for tooltip. Title-only labels are not reliably announced by all screen readers. These should have `aria-label`.

---

#### Pagination

**Two modes:**

| Mode | When | Mechanism |
|---|---|---|
| Client-side | `totalItems` not provided | Component slices `data` with `(currentPage - 1) * pageSize` |
| Server-side | `totalItems` provided | Component renders all `data` as-is; consumer provides pre-sliced page |

**Controls:** "Previous" and "Next" buttons only — no page number buttons, no page size selector, no jump-to-page.

**Display:** "Page {currentPage} of {totalPages}".

**Accessibility gaps:**
- No `role="navigation"` or `aria-label` on the pagination section.
- Previous/Next buttons have no `aria-label` — they have text labels, which is acceptable.
- No `aria-current="page"` (no page number buttons to mark).
- **Critical:** Pagination buttons have `outline: none` from the `.table-btn` base class with no `:focus-visible` override. Focus rings are completely absent on Previous and Next.

**Required fix:**
```css
.table-btn--pagination:focus-visible {
  box-shadow: 0 0 0 2px #67b3fb;
  outline: none;
}
```

---

#### Actions Column

Every row has a fixed 80px "Actions" column with:
1. `MoreHorizontal` (14px) — overflow/context menu trigger — no handler implemented; no `aria-label`.
2. `Trash2` (14px) — delete — no handler implemented; no `aria-label`.

Both buttons have `outline: none` from `.table-btn` with no `:focus-visible` override.

**Required fixes:**
```tsx
<button aria-label="More actions" onClick={...}>
<button aria-label="Delete row" onClick={...}>
```

---

#### Loading State

**Not implemented.** The component renders data immediately or nothing. There is no loading skeleton, spinner, or `aria-busy` state. **Specification gap:** When data is loading, the consumer must:
1. Pass an empty `data` array.
2. Optionally render a skeleton overlay or loading indicator externally.
3. Set `aria-busy="true"` on the containing element.

A built-in loading prop (`loading?: boolean`) with a skeleton row pattern is recommended for a future pass.

---

#### Empty State

**Not implemented.** When `data` is an empty array, the table body renders nothing — no message, no illustration, no call to action. The consumer must implement an external empty state. **Specification gap:** A built-in empty state slot (`emptyState?: React.ReactNode`) is recommended.

---

#### Error State

**Not implemented.** Same gap as loading. **Specification gap.**

---

#### Density

**Single density only.** The row min-height is 40px, padding is 12px 16px (cells). There is no `density` prop. **Specification gap:** Comfortable (56px row) and Compact (32px row) density variants are standard for data-heavy applications. Recommended future prop: `density?: 'comfortable' | 'default' | 'compact'`.

---

#### Long-Cell Content

Cell content is `display: flex; align-items: center` with no `overflow: hidden` or `text-overflow: ellipsis`. Long content overflows horizontally within its cell flex column. The horizontal scroll on the scroll container captures this. **Gap:** Primary cells should support an optional `truncate` mode with `white-space: nowrap; overflow: hidden; text-overflow: ellipsis`.

---

#### Sticky Headers

The header row (`data-table-header-row`) is `position: sticky; top: 0; z-index: 2` within the `.table-scroll-container`. This correctly sticks during vertical scroll. The settings toolbar (`table-settings-row`) is `position: sticky; top: 0; z-index: 3` on the outer container — it sticks during any page scroll above the table.

---

#### Horizontal Overflow

The `.table-scroll-container` has `overflow: auto` on both axes. When total column widths exceed the container width, a horizontal scrollbar appears. The header row and body rows are flex rows — they maintain alignment naturally. Column widths are `flex: 1` (auto) unless explicitly set via `width` prop or resize.

---

#### Mobile Transformation

At `max-width: 768px`: font-size `12px` on the container; settings and pagination padding reduced to `0 8px`; cell padding reduced to `6px 8px`. No column hiding, no card-stacking, no drawer. **Specification gap:** Tables on mobile should either be scrollable with sticky first column, or transform into a card-list view. Neither pattern is currently implemented.

---

#### Virtualisation

**Not implemented.** The component renders all rows in `displayedData` directly to the DOM. For client-side pagination, `displayedData` is bounded by `pageSize`. For server-side mode, the consumer must ensure `data.length` is bounded. **Specification gap:** For tables with >100 visible rows, virtual scrolling (e.g. `react-virtual`) should be considered.

---

#### Keyboard Behaviour

| Key | Target | Behaviour |
|---|---|---|
| `Tab` | All interactive elements | Moves through checkboxes, sort buttons, expand buttons, action buttons, pagination buttons in DOM order |
| `Space` | Checkbox | Toggle selection |
| `Enter` | Checkbox | Toggle selection (redundant; native checkbox) |
| `Enter` / `Space` | Sort button | Toggle sort direction |
| `Enter` / `Space` | Expand button | Toggle row expansion |
| Arrow keys | Cells | **Not implemented — gap** |
| `Home` / `End` | Cells | **Not implemented — gap** |
| `Page Up` / `Page Down` | Scroll | Scrolls the scroll container (browser default) |

**Grid keyboard navigation gap:** WCAG recommends that data grids support arrow key navigation between cells (`role="grid"`). This is not implemented.

---

#### Screen Reader Behaviour

| What AT sees | Current | Required |
|---|---|---|
| Table structure | Generic `<div>` layout | `role="table"` / `role="grid"` hierarchy |
| Column headers | Plain text in div | `role="columnheader"` / `<th scope="col">` |
| Sort state | Not announced | `aria-sort` on column header |
| Row relationship | Not announced | `role="row"` / `<tr>` |
| Cell relationship | Not announced | `role="cell"` / `<td>` |
| Checkbox label | "checkbox" | "Select row: {primary cell value}" |
| Expand state | Not announced | `aria-expanded="true/false"` |
| Action buttons | "button" | "More actions" / "Delete row" |
| Pagination nav | Not announced | `role="navigation" aria-label="Table pagination"` |
| Selected count | Visible text | Should also be `aria-live` |

---

#### Motion

| Animation | Property | Duration | Reduced-motion |
|---|---|---|---|
| Row hover bg | `background-color` | 200ms ease | **Gap: no media query** |
| Sort icon | — | Instant (no animation) | N/A |
| Expand state | — | Instant (no animation) | N/A |
| Drag row | `opacity: 0.5` | Instant | **Gap** |
| Column resize | Live update | Instant | N/A |
| Resize handle | `opacity` | 200ms ease | **Gap** |
| Button press | `transform: scale(0.95)` | Instant | **Gap** |

---

#### Composition

- The Table is a standalone component. It does not compose other CVP components internally (it has its own checkbox implementation and does not use the CVP `Checkbox` component).
- `renderCell` prop enables composition — pass any React element as cell content.
- For content-selection tables, `ContentBrowserModal` wraps a similar pattern in a modal context.

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default — read-only | No checkboxes, no expand, no sort |
| Sortable | `sortable={true}`; demonstrate `onSort` callback |
| Selectable | `selectable={true}`; demonstrate select, select-all |
| Selectable — partial | Some selected; document indeterminate gap |
| Expandable | `expandable={true}`; rows with `expandedContent` |
| Resizable | `resizable={true}`; drag to resize column |
| Draggable | `draggable={true}`; drag to reorder rows |
| All features combined | All props true |
| Custom cell renderer | `renderCell` with status badges |
| Client-side pagination | `pageSize={5}` with 20 rows |
| Server-side pagination | `totalItems={100}` with 10-row page |
| No settings toolbar | `showSettings={false}` |
| No pagination | `showPagination={false}` |
| Empty data | `data={[]}` — document empty state gap |
| Loading — gap | No built-in; document |
| Mobile (768px) | Horizontal scroll behaviour |
| Theme: light and dark | |
| Focus ring gap | Document: pagination/action buttons have no ring |
| Semantic HTML gap | Document: no `<table>` elements |
| Select-all indeterminate gap | Document |
| Keyboard navigation gap | Document |

---

#### Test Requirements

| Type | Coverage |
|---|---|
| Unit | `onSort` fires with correct args; `onSelectionChange` fires on checkbox change; select-all selects all IDs; clear-all deselects; expand toggles `expandedRows`; pagination slices data correctly; `onPageChange` fires; disabled pagination buttons at boundaries |
| Accessibility | axe scan — expect failures (no table roles; no aria-sort; no checkbox labels); document all failures explicitly |
| Visual regression | Default × both themes; selected rows; expanded row; all features combined |
| Responsive | 768px — padding reduction |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| No semantic table HTML | Critical | Migrate to `<table>` / ARIA grid roles |
| No `aria-sort` on sort headers | Critical | Add after semantic HTML migration |
| No ARIA roles on checkboxes | High | Add `aria-label` to all checkboxes |
| No focus ring on pagination/action buttons | High | Add `:focus-visible` to `.table-btn` |
| No `aria-label` on action buttons | High | Add to overflow and delete buttons |
| No `aria-expanded` on expand buttons | High | Add with `aria-label` |
| No indeterminate select-all | High | Use `useRef` + `.indeterminate` property |
| No keyboard cell navigation | High | Add arrow-key grid navigation (WCAG grid) |
| Stale closure in resize handlers | Medium | Replace resize state with `useRef` |
| Resize handle not keyboard accessible | Medium | Implement keyboard resize (e.g. ± Shift+Arrow) |
| Drag-and-drop mouse-only | Medium | Implement keyboard-accessible reorder |
| Settings/Group/View buttons non-functional | Medium | Implement or remove |
| No loading state | Medium | Add `loading?: boolean` prop with skeleton rows |
| No empty state | Medium | Add `emptyState?: ReactNode` slot |
| No error state | Medium | Add `errorState?: ReactNode` slot |
| No density prop | Medium | Add `density?: 'comfortable' \| 'default' \| 'compact'` |
| No mobile card-stack transformation | Medium | Design mobile layout pattern |
| No `prefers-reduced-motion` | Medium | Add to all transitions |
| Token migration | High | Phase 2 task |

---

## Tree

| Dimension | Status |
|---|---|
| Production implementation | Complete — 5 files: `Tree.tsx`, `TreeNode.tsx`, `TreeItem.tsx`, `TreeGroup.tsx`, `TreeGroupHeader.tsx` |
| Storybook stories | None |
| Token migration | Status unknown per inventory (OQ); `Tree.tsx` defines a large set of design system tokens inline (`--tree-*`, `--color-*`, `--text-*`, `--spacing`, etc.) but does not reference `cvp-component-tokens.css`; no `--cvp-tree-*` tokens exist |
| Specification confidence | High |
| Known gaps | No ARIA tree roles (`role="tree"`, `role="treeitem"`) · No `aria-expanded` on tree items · No `aria-level`, `aria-setsize`, `aria-posinset` · No keyboard navigation (arrow keys, Enter, Space, Home, End) · Complete inaccessibility to screen reader users · Hardcoded colour values for status dots and tags · Token registration not started |

#### Purpose

A hierarchical navigation and content-selection component for multi-level taxonomies. Renders a folder-like tree of categories, subcategories, and leaf items. Used in content browsing contexts (e.g. a genre/sub-genre/show hierarchy). Supports item selection, expansion/collapse, status indicators, and tag badges.

#### When to Use

- Displaying hierarchical taxonomies where users navigate between levels.
- Content browsing sidebars where items can be selected from a deep hierarchy.
- Configuration trees, category selectors, or faceted navigation systems.

#### When Not to Use

- Flat lists — use `PageSideNav` or a styled `<ul>`.
- Navigation menus with only one level — use `HeaderNavigation` or `PageSideNav`.
- More than 3–4 nesting levels — visual indentation becomes unreadable.

---

#### Architecture

The Tree is composed from 5 co-located files:

```
Tree.tsx          — Root; manages expandedIds state; renders TreeNode per top-level item
TreeNode.tsx      — Routing component; decides whether to render TreeGroupHeader + TreeGroup (category) or TreeItem (leaf)
TreeGroupHeader.tsx — Category row; expand/collapse chevron; icon; label; count badge
TreeGroup.tsx     — Collapse container; renders children only when expanded
TreeItem.tsx      — Leaf row; status dot; icon; label; optional tag
```

---

#### Anatomy

**Root (`.tree`):**
1. Token definitions (large inline `<style>` block with primitive tokens, component tokens, and typography scale).
2. `<div class="tree__content">` — container for top-level `TreeNode` items.

**TreeGroupHeader:**
1. **Toggle button** — `<button>` — flex row; full width; `min-height: var(--tree-group-header-min-height)`.
2. **Chevron icon** — rotates 0° (collapsed) → 90° (expanded).
3. **Folder icon** — `Layers` Lucide icon (not semantically meaningful — decorative).
4. **Label** — group name text.
5. **Count badge** — optional; `<span>` with item count.

**TreeItem:**
1. **Item button** — `<button>` (selected state changes bg and text colour).
2. **Status dot** — 6px circle; green (active) or gray (inactive).
3. **File icon** — `FileText` Lucide icon — decorative.
4. **Label** — item name text.
5. **Tag badge** — optional; `RECOMMENDED` (blue) or `EDITORIAL` (purple).

---

#### TreeItem and TreeGroupHeader Props

**TreeNode:**
```typescript
interface TreeNodeProps {
  item: TreeItem;
  level: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onSelect?: (item: TreeItem) => void;
  selectedId?: string;
}
```

**TreeItem / TreeGroupHeader:** Same props as TreeNode (passed through).

---

#### Item Model

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier |
| `label` | `string` | Display name |
| `children` | `TreeItem[]` | Sub-items; presence makes this item a category |
| `type` | `'category' \| 'subcategory' \| 'item'` | Rendering hint; category/subcategory renders TreeGroupHeader |
| `status` | `'active' \| 'inactive'` | Status dot colour |
| `tag` | `'RECOMMENDED' \| 'EDITORIAL'` | Tag badge |
| `count` | `number` | Count badge on category header |

---

#### Nesting and Indentation

Indentation is calculated from the `level` prop:

| Level | Left padding |
|---|---|
| 0 | `8px` (tree container padding only) |
| 1 (subcategory) | `33px` |
| 2+ (item) | `52px` |

The exact values are hardcoded in `TreeGroupHeader.tsx` and `TreeItem.tsx` via inline style expressions on the button's `paddingLeft`. **Gap:** These should be token-driven: `calc(level × --tree-indent-width + --tree-indent-base)`.

---

#### Visual Specification

| Element / property | Dark value | Token |
|---|---|---|
| Tree bg | `transparent` | `--tree-bg` |
| Tree text | `var(--foreground)` | `--tree-color` |
| Tree radius | `6px` | `--tree-border-radius` |
| Tree min-width | `280px` | `--tree-min-width` |
| Tree padding | `8px 0` | `--tree-padding` |
| Group header bg | `transparent` | `--tree-group-header-bg` (derived) |
| Group header selected | — | `--tree-group-header-bg-selected` |
| Group header hover | — | `--tree-group-header-bg-hover` |
| Item selected bg | — | `--tree-item-bg-selected` |
| Item hover bg | — | `--tree-item-bg-hover` |
| Status dot — active | `#3dc155` | `--a11y-status-active` |
| Status dot — inactive | `#a1a1a8` | `--a11y-status-inactive` |
| Tag RECOMMENDED | `#67b3fb` | `--a11y-rail-recommended` |
| Tag EDITORIAL | `#c084fc` | `--a11y-rail-editorial` |
| Status dot size | `6px` | `--tree-item-status-dot-size` |
| Icon size | `16px` | `--tree-item-icon-size` / `--tree-group-header-icon-size` |
| Chevron size | `16px` | `--tree-group-header-chevron-size` |

**Token migration gap:** All token values are hardcoded hex or OKLCH values defined inline within the component. They reference no CVP primitive or semantic tokens. The `--a11y-*` tokens name a11y semantics but contain hardcoded values that may not match CVP's semantic colour layer.

---

#### States

| State | Visual | Accessibility |
|---|---|---|
| Category — collapsed | Chevron 0° (pointing right) | Gap: no `aria-expanded="false"` |
| Category — expanded | Chevron 90° (pointing down) | Gap: no `aria-expanded="true"` |
| Category — hover | Background: `--tree-group-header-bg-hover` | Gap: no ARIA state |
| Category — selected | Background: `--tree-group-header-bg-selected` | Gap: no `aria-selected` |
| Item — default | Normal bg; muted text | Gap: no `role="treeitem"` |
| Item — hover | Background: `--tree-item-bg-hover` | Gap: no ARIA state |
| Item — selected | Background: `--tree-item-bg-selected`; primary text | Gap: no `aria-selected` |
| Item — active status | Green dot | No semantic ARIA |
| Item — inactive status | Gray dot | No semantic ARIA |
| Item — RECOMMENDED tag | Blue badge | Gap: not announced to AT |
| Item — EDITORIAL tag | Purple badge | Gap: not announced to AT |

---

#### Selection

Single-selection model: `selectedId` prop is a controlled external value. Clicking any item calls `onSelect(item)`. The component does not manage selection state internally — it is fully controlled.

**Accessibility gap:** Selected items have no `aria-selected` attribute. Screen readers cannot report which item is selected.

---

#### Expansion

`expandedIds` is a `Set<string>` in `Tree`'s state. `TreeGroup` renders `{expanded ? children : null}` — no animation. The chevron rotates via CSS `transform: rotate(...)`.

**Animation gap:** Height transition is not implemented. `TreeGroup` toggles content with conditional rendering (`{expanded ? children : null}`) — there is no CSS height animation.

**Accessibility gap:** No `aria-expanded` on the toggle button.

---

#### Keyboard Navigation

**Not implemented.** The tree items are `<button>` elements — they are Tab-navigable and Enter/Space activatable. However:
- No arrow-key navigation between items.
- No `Home` / `End` to jump to first/last.
- No `Right Arrow` to expand or descend.
- No `Left Arrow` to collapse or ascend.

**Required keyboard model (WAI-ARIA Tree Pattern):**

| Key | Action |
|---|---|
| `Down Arrow` | Move focus to next visible item |
| `Up Arrow` | Move focus to previous visible item |
| `Right Arrow` | If collapsed: expand; if expanded: move focus to first child |
| `Left Arrow` | If expanded: collapse; if collapsed: move focus to parent |
| `Enter` / `Space` | Select focused item |
| `Home` | Move focus to first item in tree |
| `End` | Move focus to last visible item in tree |
| `*` (asterisk) | Expand all siblings of focused item |

---

#### Screen Reader Behaviour

**Current (all gaps):**

| Required | Current |
|---|---|
| `role="tree"` on root | None |
| `role="treeitem"` on each item | None |
| `aria-expanded` on expandable items | None |
| `aria-level` on each item | None |
| `aria-setsize` on each group | None |
| `aria-posinset` on each item | None |
| `aria-selected` on selected item | None |
| Accessible name on group headers | Implicit text content (acceptable) |

The complete absence of tree roles means screen readers announce the tree as a sequence of buttons with no hierarchical context.

**Required fix (representative):**
```tsx
<div role="tree" aria-label="Content hierarchy">
  <div role="group">
    <button
      role="treeitem"
      aria-expanded={isExpanded}
      aria-level={level + 1}
      aria-setsize={siblings.length}
      aria-posinset={positionInParent + 1}
      aria-selected={selectedId === item.id}
    >
      {item.label}
    </button>
    {isExpanded && (
      <div role="group">
        {/* children */}
      </div>
    )}
  </div>
</div>
```

---

#### Responsive Behaviour

`min-width: 280px` on the tree container. At narrower widths, the tree overflows horizontally within its parent. No responsive breakpoints defined. In `panel-full-width-horizontal` variant: `width: 100%; min-width: auto`.

---

#### Motion

| Animation | Property | Duration | Reduced-motion |
|---|---|---|---|
| Chevron rotation | `transform: rotate()` | `var(--default-transition-duration)` (0.15s) | **Gap** |
| Item hover | `background-color` | `var(--default-transition-duration)` | **Gap** |
| Content expand/collapse | None — conditional render | — | N/A |

---

#### Composition

- The Tree is typically placed in a sidebar panel.
- `onSelect` receives the full `TreeItem` object — the consumer uses this to load content corresponding to the selected item.
- The Tree does not render any content itself beyond the hierarchy.

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Flat list | Single level; items only |
| Nested | 2 levels; categories + items |
| Deep nest | 3 levels; categories + subcategories + items |
| With status dots | Mix of active and inactive items |
| With tags | Items with RECOMMENDED and EDITORIAL tags |
| With count badges | Category headers showing item counts |
| Controlled selection | `selectedId` passed externally |
| Initially expanded | `initialExpanded` with some IDs |
| ARIA gap | Document: no tree roles; complete AT inaccessibility |
| Keyboard gap | Document: no arrow key navigation |
| Theme: light and dark | |

---

#### Test Requirements

| Type | Coverage |
|---|---|
| Unit | Clicking category header calls `onToggle`; clicking item calls `onSelect`; `selectedId` applies selected class; `initialExpanded` IDs are expanded on mount |
| Accessibility | axe scan — expect critical failures (no tree roles); document all failures |
| Visual regression | Default; expanded; selected item; with tags × both themes |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| No ARIA tree roles | Critical | Add `role="tree"`, `role="treeitem"`, `role="group"` |
| No `aria-expanded` | Critical | Add to all expandable buttons |
| No `aria-level`, `aria-setsize`, `aria-posinset` | High | Add per WAI-ARIA tree pattern |
| No `aria-selected` | High | Add to selected item |
| No keyboard navigation | Critical | Implement full WAI-ARIA keyboard model |
| No expand/collapse animation | Medium | Replace conditional render with height animation |
| Hardcoded indentation values | Medium | Replace with token-driven calculation |
| Token migration | High | Register `--cvp-tree-*` tokens; link to CVP semantic layer |
| `--a11y-*` hardcoded hex values | Medium | Reference `--cvp-color-status-*` tokens |
| No `prefers-reduced-motion` | Medium | Add to chevron and hover transitions |

---

## Shadcn/UI Data Display Primitives — Summary

### Card

| Dimension | Value |
|---|---|
| File | `src/app/components/ui/card.tsx` |
| Implementation | shadcn/ui; no Radix; pure Tailwind |
| Sub-components | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` |
| Layout | CSS Grid with container queries (`@container/card-header`) |
| Token basis | `bg-card`, `text-card-foreground`, `rounded-xl`, `border` |
| CVP token coverage | None |
| ARIA | None (generic container) |
| Variants | None — utility-based via `className` |

**Clickable card pattern:** `Card` has no interactive variant. To make a card clickable, wrap it in an `<a>` or add `onClick` and appropriate `role="button"` / `tabIndex`. The nested interactive content (buttons, links) must be handled carefully — a card that is itself a link cannot contain other links (invalid HTML). **Specification gap:** CVP needs a documented pattern for clickable vs. static cards, and a pattern for cards with nested actions.

**Focus behaviour:** No default focus ring on the `Card` container. When used as an interactive element, a focus ring must be added via `className`.

**Selected state:** No built-in selected state. Consumer adds `border-ring` or equivalent when selected.

**Media ratio:** No built-in media slot. Consumer adds an `<img>` inside `CardHeader` or `CardContent` with `aspect-ratio` utilities.

**Loading:** Use `Skeleton` (Part D) components to approximate loading states within card slots.

**Action placement:** `CardAction` is positioned via grid template in the header — it appears at top-right of the card header area. Actions in the footer slot (`CardFooter`) use flex layout.

**Responsive:** Card fills its container. Consumer controls responsive layout by placing cards in a grid with responsive `grid-cols-*` classes.

---

### Avatar

| Dimension | Value |
|---|---|
| File | `src/app/components/ui/avatar.tsx` |
| Implementation | Radix `AvatarPrimitive` |
| Sub-components | `Avatar`, `AvatarImage`, `AvatarFallback` |
| Size | Fixed `size-10` (40px) — no size variants |
| Shape | `rounded-full` |
| CVP token coverage | None |
| ARIA | `AvatarImage` carries implicit `img` role; alt text must be provided |

**Alt text requirement:** `AvatarImage` must receive `alt` text for sighted users' understanding. When used decoratively (alongside a name), `alt=""` is appropriate. When standalone (avatar-only button), `alt="[User Name]"` is required.

**Fallback:** `AvatarFallback` renders initials or a placeholder icon when the image fails to load or while loading. It renders as generic content — no `aria-hidden`.

**Avatar Group:** Not implemented. Consumer must manage overlap via negative margin and `z-index` stacking. **Specification gap.**

**Sizes:** A single 40px size only. Common sizes needed: 24px (inline), 32px (compact lists), 40px (default), 48px (profile), 64px (detail view), 96px (avatar editor).

---

### Pagination (shadcn)

| Dimension | Value |
|---|---|
| File | `src/app/components/ui/pagination.tsx` |
| Implementation | shadcn/ui; semantic `<nav>` + `<ul>` |
| Sub-components | `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis` |
| ARIA | `role="navigation" aria-label="pagination"`; `aria-current="page"` on active link |
| CVP token coverage | None |

**Relationship to Table pagination:** The CVP `Table` component has its own built-in Previous/Next pagination (div-based, no nav semantics). The shadcn `Pagination` is a separate primitive for page-level pagination outside the table. They should not be mixed.

**Page number buttons:** `PaginationLink` renders page number buttons. `PaginationEllipsis` renders `…` for skipped page ranges. The consumer constructs the page range logic.

**Accessibility:** `aria-label="pagination"` on the `<nav>` is non-specific — should be `aria-label="[Content type] pagination"`. `aria-current="page"` on the active `PaginationLink` is correct.

---

### Chart

| Dimension | Value |
|---|---|
| File | `src/app/components/ui/chart.tsx` |
| Implementation | Recharts wrapper with config-driven theming |
| Sub-components | `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `useChart()` |
| CVP token coverage | None |
| ARIA | None — Recharts SVG charts have no built-in accessible alternatives |

**Accessibility gap:** SVG-based charts from Recharts have no built-in accessible text alternatives. A data table equivalent of the chart data must be provided for screen reader users (either a visually hidden `<table>` or a toggle to switch to table view).

**Theme:** `ChartConfig` supports light/dark colour values per series. These must be manually aligned with CVP colour tokens.

---

### Components Not Implemented — Data Display and Structured Content

| Component | Status | Notes |
|---|---|---|
| `Data Table` | Alias | Same as `Table` — no separate component |
| `Sortable Table` | Alias | `Table` with `sortable={true}` |
| `Selectable Table` | Alias | `Table` with `selectable={true}` |
| `Expandable Table` | Alias | `Table` with `expandable={true}` |
| `Grid` | Not implemented | Layout pattern; no standalone component |
| `List` | Not implemented | No standalone CVP component; use `<ul>` with styles |
| `Description List` | Not implemented | No standalone CVP component; use `<dl>` |
| `Panel` | Specification gap | Similar to Card; no standalone CVP component |
| `Tile` | Specification gap | No standalone CVP component |
| `Stat` / `Metric` | Specification gap | No standalone CVP component |
| `Chip` / `Tag` | Specification gap | No standalone CVP component; `Badge` (shadcn) is the closest |
| `Avatar Group` | Specification gap | No standalone CVP component |
| `Timeline` | Specification gap | No standalone CVP component |
| `Key-Value Pair` | Specification gap | Pattern only; no component |
| `Code Block` | Specification gap | No standalone CVP component |
| `Metadata List` | Specification gap | No standalone CVP component |
| `Property Panel` | Specification gap | No standalone CVP component |
| `Details Panel` | Specification gap | No standalone CVP component |
| `Data Summary` | Specification gap | No standalone CVP component |
| `Pagination` | Shadcn primitive | `ui/pagination.tsx` — documented above; not CVP-styled |

---

### Cross-Reference: Feedback Components with Data Display Applications

| Component | Documented in | Data display use case |
|---|---|---|
| `Badge` (shadcn) | Part D — Feedback | Status labels on table cells, card metadata |
| `Skeleton` (shadcn) | Part D — Feedback | Loading placeholders inside Card, Table, Avatar |
| `Progress` (shadcn) | Part D — Feedback | Progress bars inside table cells or stat cards |

---

*Data Display and Structured Content specification complete. Remaining families (Typography, Layout, Theming, and the Global Behaviour appendix) to follow in subsequent passes.*

---

## Part F — Media, Editorial and CVP Domain-Specific Components

> **Family scope and authority.** This pass documents all domain-specific CVP components found in the repository. The authoritative list is derived from `DESIGN_SYSTEM_COMPONENT_INVENTORY.md` and direct code inspection. Components listed in the brief's potential list that are **not found** in the repository are documented in the closing specification-gap table.
>
> **CVP publishable domain components (full spec):**
> - `RailContentGallery` — editorial rail with 4 variants; the central media display primitive
> - `RailDetails` — page-level editorial view composing CVP primitives
> - `Filter` — dropdown filter picker with active-filter chip strip
> - `FilterGroup` — condition-row query builder composing `Select`
> - `TagFilter` — tag-cloud multi-select with sections
> - `SegmentQueryConfiguration` — modal query builder composing `Modal`, `Select`, `TextInput`
>
> **Cross-referenced (full spec in Part D):**
> - `ContentBrowserModal` — documented in Part D §ContentBrowserModal; additional editorial context added here
>
> **Family-wide notes:**
> - All domain components use legacy shorthand tokens (`--bg-page`, `--border-default`, `--text-primary`, `--icon-muted`) or unregistered component tokens. No domain component has completed Phase 2 token migration.
> - `RailDetails` is a **page-level composition**, not a reusable primitive. It assembles `Breadcrumbs`, `Tabs`, `NotificationBanner`, `PrimaryButton`, `OutlineButton`, and `TextButton` with product-specific layout CSS. It should be treated as a product-layer pattern, not a published design system component.
> - Editorial workflow state (draft, staged, live, expired, scheduled) is represented in `RailDetails` via hardcoded badge text (`"Active"`, `"Editorial"`, `"CAR-002"`). No programmatic status model exists in the component — status is consumer-defined string content.

---

## RailContentGallery

| Dimension | Status |
|---|---|
| Production implementation | Complete — 984 lines |
| Storybook stories | None |
| Token migration | Partial — `--rail-gallery-*` tokens are defined inline; most reference CVP semantic tokens (`--foreground`, `--muted-foreground`, `--radius-md`, etc.); several values are hardcoded hex (placeholder bg, override badge colour, scrollbar colours) |
| Specification confidence | High |
| Known gaps | Horizontal scroll (`management`/`display`) does not implement `scrollIntoView` for keyboard-selected items · Drag-and-drop (`management`) initiates via HTML5 drag but drop target is not implemented within the component — `onDrag(itemId, newPosition)` fires with the new position but the data reorder must be managed externally · Selection checkbox in `display-grid-selectable` has no `aria-label` · Item `role="button"` with no accessible name beyond the heading inside it · Override badge colours hardcoded (`#f59e0bf2`, `#d9770699`) — not token-referenced · Pin active state colour hardcoded (`#10B981`, `#059669`) — not token-referenced · No loading or processing state |

#### Purpose

The primary media content display primitive. Renders a collection of content items (films, shows, episodes, or similar) as poster-art tiles with title and year metadata. The `management` variant adds editorial controls (pin, edit, drag-to-reorder, override badge, position number). The `display-grid` and `display-grid-selectable` variants switch from horizontal rail scroll to a responsive vertical grid.

#### When to Use

- Displaying a curated set of content items from a rail in the editorial management interface.
- Allowing an editor to preview, reorder, pin, and edit rail item positions.
- Selecting items from a grid for bulk addition to a rail (selectable variant).
- Showing a read-only content preview within a rail detail view.

#### When Not to Use

- A full content catalogue browser — use `ContentBrowserModal`.
- A single content item detail — link to the item's own page.
- Non-media content (e.g. text articles) — the 2:3 aspect ratio and poster-art framing are media-specific.

---

#### Variants

| Variant | Description | Scroll model | Item size | Controls |
|---|---|---|---|---|
| `display` (default) | Read-only horizontal rail | Horizontal scroll + nav arrows | 120px wide | None |
| `management` | Editable horizontal rail | Horizontal scroll + nav arrows | 120px wide | Pin, Edit, Drag handle, Position number, Override badge |
| `display-grid` | Read-only responsive grid | Vertical scroll (max-height 400px) | `minmax(120px, 1fr)` | None |
| `display-grid-selectable` | Selectable responsive grid | Vertical scroll (max-height 400px) | `minmax(120px, 1fr)` | Selection checkbox overlay |

All four variants share the same item anatomy; the variant controls which controls are layered on top.

---

#### Anatomy

**Component root (`.rail-content-gallery`):**
1. **Header** — `.rail-content-gallery__header` — flex row; title section left; status section right.
2. **Title** — `<h2 class="rail-content-gallery__title">` — `var(--type-scale-m-size)` / `var(--type-scale-m-weight)` / `var(--foreground)`.
3. **Item count badge** — `.rail-content-gallery__count` — monospace font; `var(--secondary)` background; `var(--muted-foreground)` text.
4. **Status badge** — `.rail-content-gallery__status` — `var(--color-blue-800)` bg; `var(--color-blue-200)` text; uppercase; shown only in `management` variant when `headerStatus` is set.
5. **Date** — `.rail-content-gallery__date` — plain text; shown in `management` variant when `headerDate` is set.
6. **Navigation** — `<IconButton>` ← / → arrows; disabled when at scroll boundary; info button in `management` variant.
7. **Container** — `.rail-content-gallery__container` — max-width 1000px; switches to grid layout for grid variants.
8. **Rail** (horizontal variants) — `.rail-content-gallery__rail` — `display: flex; overflow-x: auto; scroll-behavior: smooth`; webkit scrollbar styled.
9. **Grid** (grid variants) — `.rail-content-gallery__grid` — `display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); max-height: 400px; overflow-y: auto`.
10. **Item** — `.rail-content-gallery__item` — `role="button"; tabIndex={0}`; hover: `translateY(-2px)`; focus-visible: 2px outline.
11. **Image container** — `aspect-ratio: 2/3; overflow: hidden; border-radius: var(--radius-md)`.
12. **Image** — `<ImageWithFallback>` — `object-fit: cover`; falls back to Film icon placeholder when `thumbnail` is absent or broken.
13. **Placeholder** — `.rail-content-gallery__placeholder` — `background: #2e2e30`; `Film` icon at 28px.
14. **Item overlay** — `rgba(0,0,0,0.4)` overlay shown on hover (read-only variants show overlay with no controls).
15. **Content** — `.rail-content-gallery__item-content` — padding top 12px; flex column.
16. **Item title** — `<h3>` — `var(--type-scale-s-size)`; 500 weight; `-webkit-line-clamp: 2` truncation.
17. **Item year** — `<p>` — `var(--type-scale-s-size)`; 400 weight; `var(--muted-foreground)`.
18. **Empty state** — `Film` icon 48px + "No content in this rail" message; dashed border.

**Management-only overlays (inside image container):**
19. **Position number badge** — bottom-left of image; 24×24px; `rgba(0,0,0,0.8)` bg; 1-based index from `item.position` or array index.
20. **Override badge** — bottom-right of image; `"OVERRIDE"` text; amber background (`#f59e0bf2`); appears when item has been edited.
21. **Action buttons column** — top-right of image; `IconSmallButton` × 2 (Pin, Edit); opacity 0 → 1 on hover / focus.
22. **Drag handle** — top-left of image; `GripVertical` icon; opacity 0 → 1 on hover.

**Selectable-grid-only overlays:**
23. **Selection checkbox** — top-left of image; 24×24px; `rgba(0,0,0,0.8)` bg; opacity 0 → 1 on hover; blue bg when selected; always visible when selected.

---

#### Content Item Model

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique identifier |
| `title` | `string` | Yes | Displayed below the poster; max 2 lines |
| `year` | `string` | Yes | Publication year; displayed below title |
| `thumbnail` | `string` | Yes | Image URL; falls back to Film placeholder when absent or broken |
| `position` | `number` | No | Explicit position number; defaults to `index + 1` if absent |
| `metadata.category` | `string` | No | Unused by current render |
| `metadata.duration` | `string` | No | Unused by current render |
| `metadata.status` | `'active' \| 'inactive' \| 'pinned'` | No | `'pinned'` contributes to initial pinned state |

---

#### Props and API

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Gallery section heading (`<h2>`) |
| `items` | `RailContentItem[]` | — | Content items |
| `variant` | `'management' \| 'display' \| 'display-grid' \| 'display-grid-selectable'` | `'display'` | Controls layout and controls |
| `showItemCount` | `boolean` | `true` | Shows count badge in header |
| `showNavigation` | `boolean` | `true` | Shows navigation arrows (horizontal variants only) |
| `headerStatus` | `string` | — | Status badge text (management variant only) |
| `headerDate` | `string` | — | Date text (management variant only) |
| `onItemClick` | `(item) => void` | — | Fires on item click/Enter/Space (non-selectable variants) |
| `onEdit` | `(item) => void` | — | Fires on Edit button click; marks item as overridden internally |
| `onPin` | `(item) => void` | — | Fires on Pin button click; toggles pin state internally |
| `onDrag` | `(itemId, newPosition) => void` | — | Fires on drag end; component does NOT reorder data |
| `onSelectionChange` | `(selectedIds: string[]) => void` | — | Fires on checkbox toggle (selectable variant only) |
| `selectedItems` | `string[]` | `[]` | Controlled selection (selectable variant only) |

---

#### Visual Specification

| Element | Value | Token | CVP target |
|---|---|---|---|
| Item width (management / display) | `120px` | `--rail-gallery-item-management-width` | `--cvp-rail-item-width` |
| Image aspect ratio | `2/3` | `--rail-gallery-image-aspect-ratio` | `--cvp-rail-image-aspect-ratio` |
| Image border radius | `var(--radius-md)` | `--rail-gallery-image-border-radius` | `--cvp-radius-md` |
| Image bg (muted) | `var(--muted)` | `--rail-gallery-image-bg` | `--cvp-color-surface-muted` |
| Placeholder bg | `#2e2e30` | `--rail-gallery-placeholder-bg` | **Migrate to** `--cvp-color-surface-placeholder` |
| Placeholder icon | `#6b6b6b` | `--rail-gallery-placeholder-icon-color` | **Migrate to** `--cvp-color-icon-disabled` |
| Item hover transform | `translateY(-2px)` | `--rail-gallery-item-hover-transform` | Local |
| Focus outline | `2px solid var(--focus-ring)` | `--rail-gallery-item-focus-outline` | `--cvp-focus-ring-color` |
| Overlay bg | `rgba(0,0,0,0.4)` | Hardcoded | Local |
| Position badge bg | `rgba(0,0,0,0.8)` | `--rail-gallery-position-bg` | `--cvp-color-overlay-badge` |
| Override badge bg | `#f59e0bf2` | Hardcoded | **Migrate to** `--cvp-color-warning-emphasis` |
| Override badge border | `#d9770699` | Hardcoded | **Migrate to** `--cvp-color-warning-border` |
| Pin active bg | `#10B981` | Hardcoded | **Migrate to** `--cvp-color-success-default` |
| Pin active hover bg | `#059669` | Hardcoded | **Migrate to** `--cvp-color-success-hover` |
| Checkbox selected bg | `#3d63dd` | `--rail-gallery-checkbox-selected-bg` | `--cvp-color-brand-default` |
| Grid max-height | `400px` | `--rail-gallery-grid-max-height` | `--cvp-rail-grid-max-height` |
| Grid columns | `repeat(auto-fill, minmax(120px, 1fr))` | `--rail-gallery-grid-columns` | Local |
| Scroll per arrow click | `3 items × (120px + 16px gap) = 408px` | Hardcoded | Local |
| Count badge bg | `var(--secondary)` | Hardcoded (class usage) | `--cvp-color-surface-secondary` |
| Status badge bg | `var(--color-blue-800)` | Hardcoded | `--cvp-color-info-surface` |
| Status badge text | `var(--color-blue-200)` | Hardcoded | `--cvp-color-info-text` |
| Scrollbar colour | `rgba(255,255,255,0.4)` | Hardcoded | Light theme override gap |

---

#### States

| State | Visual | Behaviour | Accessibility |
|---|---|---|---|
| Item — default | Poster at full opacity | Static | `role="button"; tabIndex={0}` |
| Item — hover | `translateY(-2px)`; overlay appears at opacity 1 | Action buttons visible (management) | No ARIA change |
| Item — focus-visible | 2px outline (`var(--focus-ring)`) | — | Keyboard-navigable |
| Item — selected (selectable) | Blue checkbox; `opacity: 1` always visible | `selectedItems` includes `item.id` | **Gap:** no `aria-pressed` or `aria-checked` |
| Action button — hover | Opacity 1 (from 0) | — | `aria-label` set on Pin/Edit/Drag buttons |
| Pin — inactive | Default button style | Calls `onPin` | `aria-label="Pin [title]"` |
| Pin — active | `#10B981` bg; white icon; `opacity: 1` always | Calls `onPin` on second press | `aria-label="Unpin [title]"` |
| Override — tagged | Amber "OVERRIDE" badge bottom-right | Visual only | Not announced to AT — **gap** |
| Position badge — default | `rgba(0,0,0,0.8)` bg; white number | Derived from `item.position` or index | Not announced — decorative |
| Position badge — override | Amber bg (`#f59e0bf2`) | After item is edited | Not announced — **gap** |
| Empty | Dashed border; Film icon; message | No items rendered | Film icon is decorative; message is visible text |
| Scroll left — disabled | `disabled` on `IconButton` | Arrow press does nothing | `disabled` attribute on button |
| Scroll right — disabled | `disabled` on `IconButton` | Arrow press does nothing | `disabled` attribute on button |

---

#### Scroll Behaviour

Horizontal variants use native CSS `overflow-x: auto` with `scroll-behavior: smooth`. Arrow buttons call `container.scrollBy({ left: ±408px, behavior: 'smooth' })` where 408px = 3 × (120px item + 16px gap). Scroll state is tracked via `onScroll` → `handleScrollUpdate`. `ResizeObserver` re-evaluates scroll limits on container resize (100ms debounce via `setTimeout`).

**Gap — keyboard scroll:** Keyboard users who Tab through items will move focus off-screen without causing the rail to scroll. No `scrollIntoView` is called on keyboard focus. This is an interactive usability gap.

**Gap — touch scroll:** Mobile touch scrolling works natively via `overflow-x: auto` but the navigation arrow buttons are unnecessary on touch (no `@media (hover: none)` to hide them).

---

#### Thumbnail and Broken Image Handling

`ImageWithFallback` (from `./figma/ImageWithFallback`) handles image loading and error states. When `thumbnail` is absent or the image fails to load, the placeholder `<div class="rail-content-gallery__placeholder">` is shown with a `Film` icon (28px, colour `#6b6b6b`).

**Alt text:** `alt={`${item.title} (${item.year})`}` — descriptive, includes title and year. Correct.

**Decorative placeholder:** The `Film` icon in the placeholder is decorative — it does not convey information beyond "no image". It has no `aria-hidden="true"`. **Gap:** Add `aria-hidden="true"` to the placeholder icon.

---

#### Media Aspect Ratio

All items use `aspect-ratio: 2/3` (portrait poster format — standard for film/TV cover art). This is not configurable per-item. **Gap:** A `16/9` landscape variant is commonly needed for episode thumbnails and news items. This requires either an `imageAspectRatio` prop or a second component.

---

#### Drag-and-Drop

The `management` variant's drag handle is an `IconSmallButton` with `draggable` and `onDragStart` that sets `event.dataTransfer.setData('text/plain', item.id)`. The component does **not** implement a drop target — there is no `onDrop` handler on the item or rail container. The `onDrag(itemId, newPosition)` callback is defined in the interface but is not called from any existing handler. **Gap:** Drag-and-drop is incomplete. The drop target must be implemented by the consumer, and `onDrag` must be wired to the resulting position.

**Keyboard drag gap:** There is no keyboard-accessible reorder mechanism. Keyboard users cannot reorder management rail items.

---

#### Pin Behaviour

Pin state is a dual-source truth:
1. `item.metadata.status === 'pinned'` — server-sourced initial pin state.
2. `pinnedItems` internal `Set<string>` — client-side optimistic toggle.

`isItemPinned(item)` returns true if either source reports pinned. When the editor clicks Pin, the item is added to `pinnedItems` immediately (optimistic update), and `onPin(item)` is fired for the consumer to persist. When clicked again, the item is removed from `pinnedItems`. **Note:** There is no mechanism to reflect a failed `onPin` back to the component — if the server rejects the pin, the UI remains pinned. This is an optimistic update without rollback.

---

#### Edit / Override Behaviour

Clicking Edit adds `item.id` to the `overriddenItems` internal `Set<string>` and fires `onEdit(item)`. The visual effect is:
- Position badge background changes from `rgba(0,0,0,0.8)` to amber (`#f59e0bf2`).
- "OVERRIDE" badge appears at bottom-right of the image.

The override state is local to the component — it is not persisted and is not derived from props. On re-render with new props, overrides are reset. **Gap:** Override state should be externally controllable via an `overriddenItems?: string[]` prop to reflect server-confirmed overrides.

---

#### Selection (display-grid-selectable)

Selection is fully controlled — the consumer manages `selectedItems` and responds to `onSelectionChange`. The component does not manage selection state internally. The checkbox overlay is `opacity: 0` by default and becomes `opacity: 1` on hover or when the item is selected.

**Accessibility gap:** The selection element is a `<div>` with click handler, not a `<button>` or `<input type="checkbox">`. It has no `role`, `aria-label`, or `aria-checked`.

**Required fix:**
```tsx
<button
  role="checkbox"
  aria-checked={selectedItems.includes(item.id)}
  aria-label={`Select ${item.title}`}
  className="rail-content-gallery__selection-checkbox ..."
  onClick={...}
/>
```

---

#### Keyboard Behaviour

| Key | Target | Behaviour |
|---|---|---|
| `Tab` | Items | Sequential Tab through all items |
| `Enter` / `Space` | Item | Fires `onItemClick` or `handleItemSelection` |
| `Enter` / `Space` | Nav arrow | Scrolls rail (handled by `IconButton`) |
| Arrow keys | Items | **Not implemented — gap** |

Arrow key navigation within the rail (treating it as a listbox or carousel) is not implemented.

---

#### Responsive Behaviour

The component itself has no responsive breakpoints. The grid variants rely on `auto-fill` CSS grid to respond naturally. The rail (horizontal) variants have a fixed item width (120px) and rely on horizontal scroll at any viewport width. The parent layout is responsible for constraining the component's width.

---

#### Reduced Motion

`--rail-gallery-item-transition: all 0.2s ease` and `--rail-gallery-item-hover-transform: translateY(-2px)` apply unconditionally. **Gap:** No `@media (prefers-reduced-motion: reduce)` override.

---

#### Screen Reader Behaviour

| Element | Current | Required |
|---|---|---|
| Item | `role="button"` — announced as "button" | Needs accessible name: `aria-label={item.title}` |
| Item heading | `<h3>` inside button — AT may announce double | Consider removing `<h3>` and relying on `aria-label` |
| Thumbnail | `alt="${title} (${year})"` | Correct |
| Placeholder icon | No `aria-hidden` | Add `aria-hidden="true"` |
| Pin button | `aria-label="Pin/Unpin [title]"` | Correct |
| Edit button | `aria-label="Edit [title]"` | Correct |
| Drag handle | `aria-label="Drag to reorder [title]"` | Correct — but drag is keyboard-inaccessible |
| Override badge | No AT announcement | Add visually-hidden text or `aria-label` on parent |
| Selection checkbox | No `role`, `aria-checked`, or `aria-label` | Fix required (see above) |
| Empty state | Visible text "No content in this rail" | Correct; icon needs `aria-hidden` |
| Nav arrows | `aria-label="Scroll left/right"` | Correct |
| Item count | Monospace number + text | Correct |

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| `display` — 8 items | Default variant; horizontal scroll |
| `display` — 1 item | Single item; no scroll; right arrow disabled |
| `management` — 8 items | All management controls visible |
| `management` — with pinned items | Some items start pinned via `metadata.status` |
| `management` — after edit | Pin and edit; override badges appear |
| `display-grid` — 20 items | Grid layout; vertical scroll |
| `display-grid-selectable` — 20 items | Selection mode; check some items |
| Missing thumbnail | All items without `thumbnail`; placeholders shown |
| Long title | Title ≥ 40 chars; 2-line clamp |
| Empty rail | `items={[]}` — empty state with dashed border |
| Dark theme | |
| Light theme | Scrollbar and placeholder colours adapt |
| Reduced-motion gap | Document: `translateY` plays regardless |
| Keyboard scroll gap | Document: Tab does not auto-scroll |
| Drag gap | Document: drop target not implemented |
| ARIA gap | Document: selection checkbox missing role |

---

#### Test Requirements

| Type | Coverage |
|---|---|
| Unit | `onItemClick` fires; `onEdit` adds to overridden state; `onPin` toggles; `onSelectionChange` fires with correct IDs; empty state renders when `items=[]`; scroll arrows disabled at boundaries |
| Accessibility | axe scan; item button labels; thumbnail alt text; action button aria-labels |
| Visual regression | All 4 variants × both themes; with override badges; with selected items |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| Item `role="button"` has no accessible name | High | Add `aria-label={item.title}` |
| Selection checkbox missing ARIA role/state/label | High | Convert to `<button role="checkbox">` |
| Drag-and-drop incomplete (no drop target) | High | Implement `onDrop` within component |
| No keyboard reorder mechanism | High | Add move-up/move-down keyboard controls |
| Keyboard focus does not scroll rail | Medium | Add `scrollIntoView` on focus |
| Override badge not announced to AT | Medium | Add visually-hidden status text |
| Override state not externally controllable | Medium | Add `overriddenItems?: string[]` prop |
| Pin optimistic update has no rollback | Medium | Document consumer responsibility |
| Hardcoded override / pin colours | Medium | Migrate to CVP semantic tokens |
| No `prefers-reduced-motion` | Medium | Add media query |
| Placeholder icon not `aria-hidden` | Low | Add `aria-hidden="true"` |
| Touch: nav arrows shown unnecessarily | Low | Hide with `@media (hover: none)` |
| No `16/9` landscape aspect ratio option | Medium | Add `imageAspectRatio` prop |
| Scrollbar colours hardcoded | Low | Token migration |
| Token migration | High | Phase 2 task |

---

## RailDetails

| Dimension | Status |
|---|---|
| Production implementation | Complete — 855 lines |
| Storybook stories | None |
| Token migration | Legacy tokens throughout (`--bg-page`, `--bg-surface`, `--border-default`, `--text-primary`, `--text-secondary`, `--text-muted`, `--icon-muted`, `--bg-hover`, `--border-subtle`, `--border-strong`, `--bg-surface-raised`); badge tokens (`--chip-bg`, `--state-success-bg`, `--state-info-bg`) are unregistered |
| Specification confidence | High |
| Classification | **Product-layer page composition.** This is not a reusable primitive — it is an opinionated layout assembling `Breadcrumbs`, `Tabs`, `NotificationBanner`, `PrimaryButton`, `OutlineButton`, `TextButton`, and domain-specific rail preview elements. Design system changes to composed components propagate automatically. |

#### Purpose

The editorial management view for a single Rail object. Provides a three-region layout: left sidebar (Rail Manager with Base / Configuration tabs), top navigation bar (breadcrumbs + team selector), and main content area (page header with badges/metadata, content preview rail, and notification banner). Represents a read-level view of a rail with Save, Duplicate, and Preview actions.

#### Layout Structure

```
┌─────────────────────────────────────────────────┐
│  Sidebar (200px)  │  Breadcrumbs nav bar (44px) │
│  Rail Manager     │─────────────────────────────│
│  [Base] [Config]  │  Content header              │
│                   │  Title · Badges · Metadata   │
│  Base tab:        │  Actions: Dup / Preview / Save│
│  · Rail           │─────────────────────────────│
│  · Content Query  │  Content area (scrollable)   │
│  · Rails Colls    │  · Content Preview rail      │
│  · Query Items    │  · Add content button         │
│                   │  · NotificationBanner        │
│  Config tab:      │                              │
│  · Listing Filters│                              │
│  · Showing Type   │                              │
│  · (etc.)         │                              │
└───────────────────┴──────────────────────────────┘
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `railName` | `string` | `"Trending"` | Rail name shown in breadcrumbs and page title |
| `totalLabels` | `number` | `22` | Total label count (referenced by prop but not rendered in current implementation) |

> **Specification gap:** `totalLabels` is accepted as a prop but not rendered. Its intended use is unclear from the implementation. Mark as unresolved.

---

#### Editorial State Representation

The component renders three hardcoded status badges in the content header:

| Badge | Class | Token source | Value |
|---|---|---|---|
| `"Active"` | `badge--success` | `--state-success-bg` / `--state-success-border` / `--state-success-text` | Unregistered tokens |
| `"CAR-002"` | `badge--neutral` | `--chip-bg` / `--chip-border` / `--chip-text` | Unregistered tokens |
| `"Editorial"` | `badge--info` | `--state-info-bg` / `--state-info-border` / `--state-info-text` | Unregistered tokens |

**Specification gap:** The badge values (`"Active"`, `"CAR-002"`, `"Editorial"`) are hardcoded strings, not derived from props. A production implementation should accept a `status`, `railId`, and `railType` prop to drive these values.

**Editorial status model (specification gap):** The CVP product likely distinguishes states such as:

| State | Badge | Colour |
|---|---|---|
| Active (live) | `"Active"` | Success green |
| Draft | `"Draft"` | Neutral grey |
| Scheduled | `"Scheduled"` | Info blue |
| Expired | `"Expired"` | Error red |
| Paused | `"Paused"` | Warning amber |

None of these states beyond `"Active"` are implemented. All require specification-gap resolution via product-rule documentation.

---

#### Content Metadata

Three key-value pairs are hardcoded in the current implementation:

| Label | Value | Notes |
|---|---|---|
| Collection | `"Home"` | Should derive from `collection` prop |
| Position | `"#2"` | Should derive from `position` prop |
| Items | `"7 / 24"` | Should derive from `currentItems` / `maxItems` props |

---

#### Action Buttons

| Button | Type | Icon | Behaviour |
|---|---|---|---|
| Duplicate | `OutlineButton` | `Copy` | No handler — **stub** |
| Preview | `OutlineButton` | `Eye` | No handler — **stub** |
| Save Changes | `PrimaryButton` | `Save` | No handler — **stub** |

All three actions are visual stubs with no onClick handlers. **Specification gap:** Define callbacks: `onDuplicate`, `onPreview`, `onSave`.

---

#### Content Preview Rail

The main area renders a horizontal scroll of 8 hardcoded content items (films with Unsplash URLs). The rail uses custom CSS (`.rail-details__rail-*`) rather than the `RailContentGallery` component. The scroll container uses webkit scrollbar styling. Items are 120×180px (fixed, not aspect-ratio based).

**Gap:** This internal rail should be replaced with `<RailContentGallery variant="display" items={contentItems} />`. The current implementation duplicates the rail pattern without the reusability, accessibility, or token coverage of the canonical component.

---

#### Sidebar

The sidebar uses the CVP `Tabs` component (Base / Configuration tabs). All section headers in both tabs are non-interactive `<div>` elements — clicking "Showing Type" in the Configuration tab toggles an expand/collapse, but all other headers are static labels (no navigation, no forms). **Specification gap:** The sidebar is a UI stub — it needs full specification of the Rail configuration properties it represents.

---

#### Responsive Behaviour

| Breakpoint | Change |
|---|---|
| ≤ 1024px | Content header stacks; actions wrap |
| ≤ 768px | Sidebar narrows to 180px; action buttons flex |
| ≤ 640px | Sidebar hidden (`display: none`); actions stack full-width; title font shrinks to 20px |

---

#### Accessibility

| Element | Current | Gap |
|---|---|---|
| Page title `<h1>` | `rail-details__content-title` | Correct heading level |
| Badge elements | `<span>` elements | No ARIA role; correct for decorative status chips |
| Sidebar `<aside>` | Used correctly | No `aria-label` on `<aside>` |
| Tabs | CVP `Tabs` component | Inherits Tabs keyboard model |
| Breadcrumbs | CVP `Breadcrumbs` component | Inherits Breadcrumbs ARIA |
| Action buttons | CVP `PrimaryButton`, `OutlineButton` | No handlers — not testable |
| Team dropdown | Custom `<button>` | Uses `:focus` not `:focus-visible` — **gap** |
| Content preview images | `<img alt={title}>` | Correct |

---

#### Token Migration

`RailDetails` uses no CVP semantic tokens. All layout colours derive from legacy shorthand tokens (`--bg-page`, `--border-default`, etc.) which are themselves mapped to CVP primitives in `cvp-tokens.css`. This means colour changes propagate correctly, but the component must be migrated to CVP semantic tokens before Phase 2 token migration can be marked complete for this component.

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| Badge values hardcoded | High | Accept `status`, `railId`, `railType` props |
| Metadata values hardcoded | High | Accept `collection`, `position`, `currentItems`, `maxItems` props |
| All action buttons are stubs | High | Add `onDuplicate`, `onPreview`, `onSave` callbacks |
| `totalLabels` prop unused | Medium | Document intended use or remove |
| Internal rail not using `RailContentGallery` | Medium | Replace with canonical component |
| Sidebar configuration sections are stubs | High | Full specification of rail config properties |
| Token migration | High | Phase 2 task |
| Team dropdown uses `:focus` not `:focus-visible` | Medium | Fix focus style |
| `<aside>` lacks `aria-label` | Low | Add `aria-label="Rail Manager"` |

---

## Filter

| Dimension | Status |
|---|---|
| Production implementation | Complete — 591 lines |
| Storybook stories | None |
| Token migration | Unregistered tokens (`--filter-menu-bg`, `--filter-search-bg`, `--filter-option-hover-bg`, `--filter-menu-border`, `--filter-active-chip-bg`, `--filter-shortcut-key-bg`); all with inline fallbacks; colour `#3d63dd` hardcoded for primary; `#6f8be6` hardcoded for focus |
| Specification confidence | High |
| Known gaps | Keyboard navigation in dropdown menu not fully implemented · No Escape key handler to close the menu · No `role="listbox"` / `role="option"` ARIA on options · Focus trap absent in open menu · `multiselect` type routes through select submenu (single-selection only — true multi-select values not accumulated) |

#### Purpose

A compound filter control rendered inline in a toolbar or filter bar. Collapses to a pill showing active filter chips; expands to a dropdown menu with search and a two-level option hierarchy (filter category → filter value). Produces and manages an array of `ActiveFilter` objects.

#### When to Use

- Toolbar-level filtering where multiple independent filter dimensions can be combined.
- Any context where the user needs to apply and remove named filters with labelled values.

#### When Not to Use

- Simple single-value filtering — use a `Select` dropdown.
- Tag-based content faceting — use `TagFilter`.
- Programmatic content queries with boolean logic — use `FilterGroup` or `SegmentQueryConfiguration`.

---

#### Anatomy

1. **Filter bar** (`.filter__bar`) — `role="button"; tabIndex={0}; aria-expanded`; click toggles menu.
2. **Active filter chips** (`.filter__active-filter`) — rendered inside the bar when filters exist; label in muted colour; value in primary; × remove button.
3. **Remove button** — `<button aria-label="Remove [label] filter">` — `<X size={14}>`.
4. **Placeholder** — shown when no active filters.
5. **Dropdown menu** (`.filter__menu`) — `position: absolute; top: 100%; width: 380px; max-height: 480px; z-index: 9999`.
6. **Search** — `<input autoFocus>` with `Search` icon and `"F"` shortcut badge.
7. **Options list** — one `<div class="filter__option">` per `FilterOption`; icon + label + chevron (for non-boolean).
8. **Submenu** — slides in `translateX(10px→0)` over the options list; back button + title.
9. **Submenu options** — one `<div>` per value option.
10. **Date submenu** — preset date ranges (1d, 3d, 1w, 1m, 3m, 6m, 1y) + "Custom…".

---

#### Filter Types

| Type | Behaviour |
|---|---|
| `boolean` | Clicking adds filter immediately with `value: 'true', displayValue: 'enabled'`; no submenu |
| `select` | Opens submenu showing `option.options[]`; clicking a value adds filter |
| `multiselect` | Routes to same submenu as `select` — **gap: does not accumulate multiple values** |
| `text` | Defined in interface but submenu returns null — **gap: no text input rendered** |
| `date` | Opens date submenu with preset ranges; custom date not implemented |

---

#### Props and API

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `FilterOption[]` | `[]` | Available filter dimensions |
| `activeFilters` | `ActiveFilter[]` | `[]` | Currently applied filters (controlled) |
| `onChange` | `(filters: ActiveFilter[]) => void` | — | Fires when filters added or removed |
| `placeholder` | `string` | `'Filter...'` | Text shown when no filters active |
| `className` | `string` | `''` | Additional class on root |

**`FilterOption` model:**
| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier |
| `label` | `string` | Display name |
| `icon` | `ReactNode` | Optional leading icon |
| `type` | `'text' \| 'select' \| 'date' \| 'multiselect' \| 'boolean'` | Determines submenu |
| `options` | `{ value, label }[]` | Sub-options for select/multiselect |

**`ActiveFilter` model:**
| Field | Type | Description |
|---|---|---|
| `id` | `string` | Matches `FilterOption.id` |
| `label` | `string` | Copied from `FilterOption.label` |
| `value` | `string` | Raw value |
| `displayValue` | `string` | Human-readable value for chip display |

---

#### Keyboard Behaviour

| Key | Element | Behaviour |
|---|---|---|
| `Enter` / `Space` | Filter bar | Opens menu; sets `aria-expanded="true"` |
| `Escape` | Menu | **Not implemented — gap** |
| `Tab` | Menu open | Focus moves through search input then options |
| `Enter` | Option (focused) | Selects option (via `:focus-visible` CSS) — **gap: no keydown handler on options** |
| `Backspace` | — | Not implemented; common pattern for removing last chip |

**Escape gap:** No `Escape` key handler exists. The menu is closed only by clicking outside or by selecting an option.

**Arrow key gap:** No arrow key navigation between options.

---

#### Click Outside

`document.addEventListener('mousedown', handleClickOutside)` is attached on mount. Clicks outside both `menuRef` and `buttonRef` close the menu and reset `selectedOption`.

---

#### Accessibility

| Requirement | Current | Gap |
|---|---|---|
| Filter bar announced as interactive | `role="button"; aria-expanded` | Correct |
| Accessible label | `aria-label="Open filter menu"` | Correct |
| Menu announced as options list | None — plain `<div>` | Should have `role="listbox"` or `role="menu"` |
| Options announced | None — plain `<div>` | Should have `role="option"` or `role="menuitem"` |
| Active filter chips announced | Visible text | No `role="group"` wrapping chips |
| Remove button label | `aria-label="Remove [label] filter"` | Correct |
| Menu focus trap | None | Should trap focus while menu is open |
| Escape closes menu | Not implemented | Gap |

---

#### Visual Specification

| Element | Value | Token |
|---|---|---|
| Bar bg | `var(--filter-menu-bg, #14141a)` | `--filter-menu-bg` |
| Bar border | `var(--filter-menu-border, #2D2D37)` | `--filter-menu-border` |
| Bar hover border | `#6f8be6` | Hardcoded |
| Bar focus border | `#6f8be6` | Hardcoded (not `:focus-visible`) — **gap** |
| Chip bg | `var(--filter-active-chip-bg, #35373d)` | `--filter-active-chip-bg` |
| Option hover bg | `var(--filter-option-hover-bg, #292a2e)` | `--filter-option-hover-bg` |
| Menu z-index | `9999` | Hardcoded |
| Menu width | `380px` | Hardcoded |
| Menu max-height | `480px` | Hardcoded |
| Dropdown animation | `scale(0.95→1); opacity 0→1` | 150ms ease-out |
| Submenu animation | `translateX(10px→0); opacity 0→1` | 200ms ease |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| No Escape key handler | High | Add to document event listener while menu open |
| No ARIA menu roles on options | High | Add `role="listbox/menu"` and `role="option/menuitem"` |
| No arrow key navigation in menu | High | Implement roving tabindex in options list |
| No focus trap in open menu | Medium | Constrain Tab within menu |
| `multiselect` type not functional | High | Accumulate multiple selected values |
| `text` type not functional | High | Render text input in submenu |
| Filter bar uses `:focus` not `:focus-visible` | Medium | Fix focus style |
| Token migration | High | Register `--cvp-filter-*` tokens |

---

## FilterGroup

| Dimension | Status |
|---|---|
| Production implementation | Complete — 482 lines |
| Storybook stories | None |
| Token migration | Unregistered tokens (references `--filter-group-*`); composes CVP `Select` which uses its own tokens |
| Specification confidence | Medium |
| Classification | Standalone condition-row query builder; not the same as the logical-operator section in `SegmentQueryConfiguration` |

#### Purpose

Renders a group of filter conditions — each condition being a (field, operator, value) triple — with a shared logical operator (AND/OR) and optional drag-to-reorder handles. Designed for use in query-building UIs where the user defines structured content selection rules.

#### Anatomy

1. **Logical operator toggle** — `Select` dropdown; `AND` / `OR`.
2. **Condition rows** — each row: field `Select` + operator `Select` + value `TextInput` + remove `<button>`.
3. **Drag handle** — `GripVertical` icon per row; HTML5 drag-and-drop.
4. **Add condition button** — "Add Condition" with `Plus` icon.
5. **Add group button** — optional; "Add Group" (calls `onAddGroup`).

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `conditions` | `FilterCondition[]` | `[{id:'1', field:'genre', operator:'contains', value:''}]` | Initial conditions |
| `fieldOptions` | `SelectOption[]` | Genre, Release Year, Rating, Director | Field selector options |
| `logicalOperator` | `'AND' \| 'OR'` | `'AND'` | Shared operator between all conditions |
| `onLogicalOperatorChange` | `(op) => void` | — | |
| `onChange` | `(conditions) => void` | — | Fires when conditions change |
| `showAddGroup` | `boolean` | `true` | Shows Add Group button |
| `onAddGroup` | `() => void` | — | |

#### Known Gaps and Follow-up Work

| Gap | Severity |
|---|---|
| Drag-to-reorder conditions: mouse-only, no keyboard | Medium |
| Minimum 1 condition enforced (remove disabled at 1 row) | Correct behaviour — document |
| No ARIA on drag handles | Medium |
| Token migration | High |

---

## TagFilter

| Dimension | Status |
|---|---|
| Production implementation | Complete — 304 lines |
| Storybook stories | None |
| Token migration | Unregistered tokens (`--tag-filter-*`); references CVP semantic tokens (`--foreground`, `--muted-foreground`, `--border`) via inline definition |
| Specification confidence | High |

#### Purpose

A tag-cloud multi-select control organised into named sections. Unlike `Filter` (which produces structured key-value filter objects), `TagFilter` produces a flat array of selected tag IDs from an arbitrary tag taxonomy. Used for content faceting by genre, mood, theme, or any label-based taxonomy.

#### Anatomy

1. **Selected tags strip** — chips shown at top for all currently selected options; × remove per chip.
2. **Section list** — one section per `TagFilterSection`; section title + tag buttons.
3. **Tag button** — `<button>` per option; selected state: brand blue bg + white text; disabled state: `opacity: 0.4`.

#### Item Model

```typescript
TagFilterSection {
  id: string;
  title: string;
  options: TagFilterOption[];
}

TagFilterOption {
  id: string;
  label: string;
  disabled?: boolean;
}
```

#### Selection Behaviour

Hybrid uncontrolled/controlled: when `selectedOptions` prop is non-empty the component uses the prop value; when empty it uses internal `internalSelection` state. This is a subtle contract — passing `selectedOptions={[]}` explicitly will reset the component to uncontrolled mode even if items were previously selected. **Specification gap:** Clarify the controlled/uncontrolled contract; recommend using `undefined` vs `[]` for uncontrolled vs controlled-with-no-selections.

#### Accessibility

Tag buttons are `<button>` elements — keyboard accessible. Focus ring uses `var(--focus-ring)` via inherited styles. Disabled tags use `disabled` attribute — correct. Selected tags announced via visible text only — **gap:** add `aria-pressed="true/false"` to tag buttons to announce selection state to screen readers.

---

#### Known Gaps and Follow-up Work

| Gap | Severity |
|---|---|
| No `aria-pressed` on tag buttons | High | Add to convey selection to AT |
| Controlled/uncontrolled contract ambiguous | Medium | Document `undefined` vs `[]` |
| Token migration | High |

---

## SegmentQueryConfiguration

| Dimension | Status |
|---|---|
| Production implementation | Complete — 611 lines |
| Storybook stories | None |
| Token migration | References CVP semantic tokens (`--border`, `--foreground`, `--muted-foreground`, `--focus-ring`, `--radius-md`, `--spacing-*`) and composes CVP Form Controls (`Select`, `TextInput`) and CVP `Modal` |
| Specification confidence | High |
| Known gaps | Inherits all Modal gaps (no focus trap, no initial focus, no focus restoration) · `initialConfig` is only read once on mount — subsequent prop changes are ignored (derived state anti-pattern) · Filter ID generation uses `(config.filters.length + 1).toString()` — produces duplicate IDs if filters are removed and then added |

#### Purpose

A modal-based query builder for defining content segment queries. The editor specifies a sort field and direction, then adds one or more filter conditions. Each condition is a (field, operator, value) triple connected by AND/OR logical operators. Produces a `SegmentQueryConfig` object for external persistence.

#### When to Use

- Configuring the content selection query for a rail's data source.
- Any context where structured boolean filter logic must be authored interactively.

---

#### Architecture

`SegmentQueryConfiguration` composes:
- `Modal` — provides the overlay shell, Escape close, and footer slot
- `Select` — field selector and operator selector per filter row
- `TextInput` — value input per filter row
- `PrimaryButton` ("Apply Query") + `OutlineButton` ("Cancel") in modal footer

All component tokens are inherited from the composed components.

---

#### Config Model

```typescript
SegmentQueryConfig {
  sortBy: {
    field: string;    // default: 'pubdate'
    direction: 'ASC' | 'DESC';  // default: 'DESC'
  };
  filters: FilterCondition[];
  logicalOperators: LogicalOperator[];   // length === filters.length - 1
}

FilterCondition {
  id: string;
  field: string;
  operator: string;   // default: 'equals'
  value: string;
}

LogicalOperator {
  id: string;
  type: 'AND' | 'OR';   // default: 'AND'
}
```

---

#### Available Fields (defaults)

`id`, `pubdate`, `title`, `author`, `status`, `category`

The consumer passes `availableFields` to override. These default to content metadata fields appropriate for a CMS-style segment query.

#### Available Operators (defaults)

`equals`, `not equals`, `contains`, `not contains`, `greater than`, `less than`

---

#### Anatomy

1. **Modal shell** — `maxWidth="800px"`; title "Segment Query Configuration".
2. **Sort section** — heading "Sort By"; `Select` for field + `<button>` for direction toggle.
3. **Sort direction toggle** — `<button>` showing `ArrowUpDown` icon + `"ASC"` / `"DESC"` text; `focus-visible: outline: 2px solid var(--focus-ring)`.
4. **Filters section** — heading "Filters" + "Add Filter" button.
5. **Empty state** — dashed border; message + link to Technical Resource Center.
6. **Filter rows** — each row: field `Select` + operator `Select` + value `TextInput` + `<button aria-label="Remove filter">`.
7. **Logical operator toggles** — `<button aria-label="Toggle logical operator. Current: AND/OR">` between adjacent rows; clicking toggles AND/OR.
8. **Footer** — Cancel (`OutlineButton`) + Apply Query (`PrimaryButton`).

---

#### States

| State | Visual | Behaviour |
|---|---|---|
| No filters | Dashed border empty state with link | "Add Filter" button |
| 1 filter | Single row; no logical operator shown | Sort + 1 condition |
| N filters | N rows + N-1 logical operators between them | All conditions evaluated |
| Sort — ASC | `"ASC"` text + `ArrowUpDown` icon | Click toggles to DESC |
| Sort — DESC | `"DESC"` text + `ArrowUpDown` icon | Click toggles to ASC |
| Logical operator — AND | `"AND"` button style | Click → OR |
| Logical operator — OR | `"OR"` button style | Click → AND |

---

#### Apply and Cancel

**Apply:** Calls `onApply(config)` with the current `config` state, then calls `onClose()`. Config is passed by value.

**Cancel:** Calls `onCancel()` then `onClose()`. State is **not** reset — if the modal is reopened it will show the state at the time of cancel, not `initialConfig`. **Gap:** On cancel, the config should reset to `initialConfig` or to the last applied state.

---

#### Filter ID Generation

New filter IDs are generated as `(config.filters.length + 1).toString()`. If filters are removed and then added, IDs may repeat. Example: add 3 filters (ids: "1", "2", "3"), remove "2", add again → new filter gets id "3" (duplicate). This causes React key collision warnings and logical operator mapping errors.

**Required fix:** Use `crypto.randomUUID()` or a monotonic counter stored in `useRef`.

---

#### `initialConfig` Prop

`useState(initialConfig || defaultConfig)` is called on mount. Subsequent changes to the `initialConfig` prop after mount have no effect — the derived state is fixed at mount time. **Gap:** If the consumer needs to reset the form (e.g. for "undo"), there is no mechanism. Fix: add a `key` prop on the component to force re-mount, or add an `onReset` prop.

---

#### Accessibility

Inherits all `Modal` accessibility gaps:
- No focus trap — Tab exits modal to background
- No initial focus management — focus remains on trigger
- No focus restoration on close

Component-specific accessibility:
- Sort direction button: `focus-visible: outline: 2px solid var(--focus-ring)` — correct
- Add Filter button: `focus-visible: outline: 2px solid var(--focus-ring)` — correct
- Remove filter button: `aria-label="Remove filter"` — correct but non-specific (should include field name)
- Logical operator toggle: `aria-label="Toggle logical operator. Current: AND"` — correct
- Empty state link: `focus-visible: outline: 2px solid var(--focus-ring)` — correct (many `!important` overrides due to conflicting styles)

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| Empty (no filters) | Default state; empty state with link |
| With 1 filter | Single condition row |
| With 3 filters | Two AND operators shown |
| Mixed AND/OR | Toggle operators to show OR |
| Sort ASC / DESC | Both sort direction states |
| Custom fields | `availableFields` override |
| Cancel behaviour | Gap: state not reset — document |
| Apply callback | Log `SegmentQueryConfig` to console |
| Focus trap gap | Keyboard Tab exits modal — document |

---

#### Known Gaps and Follow-up Work

| Gap | Severity | Action |
|---|---|---|
| Filter ID collision on remove/re-add | High | Use `crypto.randomUUID()` |
| `initialConfig` ignored after mount | Medium | Document; add `key` guidance |
| Cancel does not reset to `initialConfig` | Medium | Reset state on cancel |
| All Modal focus gaps inherited | Critical | Fix in `Modal` component |
| Remove filter label non-specific | Low | Add field name to `aria-label` |
| Token migration | High | Phase 2 task |

---

## ContentBrowserModal — Editorial Context Addendum

> The full specification for `ContentBrowserModal` is in **Part D §ContentBrowserModal**. This addendum covers editorial-specific behaviour not addressed in that section.

#### Content Item Metadata in Editorial Context

The `ContentItem` model exposed by `ContentBrowserModal` includes:
- `genre`, `year`, `rating`, `provider` — filterable dimensions
- `thumbnail` — poster URL (2:3 aspect ratio, 84px min-width at desktop)
- `title` — displayed below poster

**Not supported:** Processing status, availability windows, scheduling state, rights territory, or content warnings. If these dimensions are needed in the picker, the consumer must extend the item model and provide a custom `renderCell` equivalent (none exists — the modal renders its own grid internally).

#### Selection Reference Strip

When filters are active and previously-selected items are hidden by those filters, the component shows a "Selection Reference" panel below the grid. This panel shows thumbnails of selected-but-hidden items with remove buttons.

**Accessibility gap:** The selection reference remove buttons have no `aria-label`. They show only an `×` icon.

#### Pagination in Modal Context

The modal manages its own `currentPage` and `itemsPerPage` (12–21, responsive). The consumer cannot control pagination from outside. Confirming the selection calls `onConfirm(selectedIds: string[])`.

---

## Shadcn/UI Carousel — Available Primitive

| Dimension | Value |
|---|---|
| File | `src/app/components/ui/carousel.tsx` |
| Implementation | `embla-carousel-react` wrapper |
| Sub-components | `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` |
| ARIA | `role="region" aria-roledescription="carousel"` on root; `aria-roledescription="slide"` on items |
| CVP token coverage | None |

This primitive is available for use but is not CVP-styled and is not used by any current CVP domain component. The `RailContentGallery` implements its own horizontal scroll rather than using this primitive. **Specification gap:** If a standards-compliant carousel is required, this primitive should be adopted and CVP-styled rather than maintaining a parallel custom implementation.

---

## Components Not Implemented — Media, Editorial and Domain-Specific

The following components appeared in the brief's potential component list but are not found in the repository:

| Component | Status | Notes |
|---|---|---|
| Video Player | Not implemented | No CVP video player component |
| Video Preview | Not implemented | No standalone preview component |
| Media Tile / Poster Card / Landscape Card | Specification gap | Alias of RailContentGallery items; no standalone component |
| Thumbnail | Not implemented | Handled by `ImageWithFallback` (figma utility); no standalone component |
| Image (standalone component) | Not implemented | `<img>` used directly |
| Gallery / Media Gallery | Not implemented | No standalone; `RailContentGallery` is the closest |
| Carousel | shadcn primitive | `ui/carousel.tsx` available but not CVP-styled |
| Rail Item | Not standalone | Internal to `RailContentGallery` |
| Content Card | Not implemented | No standalone CVP card for content items |
| Asset Picker | Alias | `ContentBrowserModal` is the asset picker |
| Upload Tile / Upload Progress | Not implemented | No file upload component |
| Metadata Panel / Metadata Field | Not implemented | No standalone; `RailDetails` has hardcoded metadata section |
| Content Status / Processing Status | Not implemented | No standalone status component |
| Schedule Indicator | Not implemented | No scheduling component |
| Availability Badge | Not implemented | No availability indicator |
| Channel Card / Channel Row | Not implemented | No channel components |
| Programme Card / Event Card | Not implemented | No programme or event components |
| EPG Grid / EPG Programme | Not implemented | No EPG (Electronic Program Guide) component |
| Timeline Control | Not implemented | No timeline component |
| Page Preview / Device Preview | Not implemented | No preview component |
| Audience Segment Chip / Targeting Rule | Not implemented | Domain concepts; no components |
| Variant Selector | Not implemented | No variant selector component |
| Page Tree | Not implemented | `Tree` (Data Display) is the closest; not page-specific |
| Rail Manager | Label only | Appears as sidebar heading in `RailDetails`; not a component |
| Collection Builder | Not implemented | No collection builder component |
| Editorial Toolbar | Not implemented | `RailDetails` has a top-level action bar; not a standalone toolbar |
| Content Drawer | Not implemented | No content-specific drawer |
| Player Controls | Not implemented | No playback controls component |

All absent components are **Specification gaps** for future design and implementation. The most impactful gaps for the CVP editorial workflow are: Processing Status, Schedule Indicator, Availability Badge, Channel Card, Programme Card, EPG Grid, and Device Preview.

---

*Media, Editorial and CVP Domain-Specific component specification complete. Global Behaviour appendix, Typography, Layout, and Theming families to follow in subsequent passes.*

---

## Accordion

> **Coverage note.** Accordion is a Data Display component (§1.6 of the inventory) and belongs to the Part E family. It was omitted from the Part E pass. This section is appended here to close the coverage gap. It should be relocated adjacent to the Table and Tree sections in a future document reorg pass.

| Dimension | Status |
|---|---|
| Production implementation | Complete — 270 lines |
| Storybook stories | None |
| Token migration | Partial — defines `--accordion-*` tokens inline; consumes `--background`, `--card`, `--border`, `--foreground`, `--muted`, `--focus-ring`, `--primary`, `--muted-foreground` via shorthand aliases |
| Specification confidence | High |
| Known gaps | Height animation: `height: 0 → auto` via CSS `transition` does not animate in browsers — a JavaScript height measurement is required · Content panel has no `id` or `aria-labelledby` — **gap** · No `role="region"` on content panels (WAI-ARIA Accordion pattern requires this) |

#### Purpose

A vertically stacked series of disclosure panels. Each panel has a header (trigger) and a collapsible content region. Supports `single` mode (only one item expanded at a time) or `multiple` mode (any number expanded simultaneously).

#### When to Use

- Progressive disclosure of long-form content where sections are logically distinct.
- Configuration panels, FAQ lists, sidebar filters with sections.

#### When Not to Use

- Navigation — use `Tabs`.
- Simple content toggle for a single section — use `details`/`summary` or a `TextButton` with rotate icon.
- Deeply nested accordions — maximum 1 nesting level.

---

#### Anatomy

1. **Root** — `<div class="accordion">` — `background-color: var(--background)`; `width: 100%`; `overflow: hidden`.
2. **Item** — `<div class="accordion-item">` — `border-bottom: 1px solid var(--border)`; last item has no bottom border.
3. **Header** — `<button class="accordion-header">` — full-width; `text-align: left`; `background-color: var(--card)`.
4. **Title** — `<span class="accordion-title">` — optional leading icon + text; `var(--type-scale-m-size)` / `var(--type-scale-m-weight)` / `var(--foreground)`.
5. **Title icon** — `<span class="accordion-title-icon">` — 16×16px; `var(--foreground)` default or `var(--primary)` when `iconColor="primary"`.
6. **Chevron icon** — `<span class="accordion-icon">` — SVG chevron; `var(--muted-foreground)`; rotates 180° when expanded.
7. **Content panel** — `<div class="accordion-content">` — `overflow: hidden`; height: `0` (collapsed) or `auto` (expanded); `background-color: var(--card)`.
8. **Content inner** — `<div class="accordion-content-inner">` — `padding: 16px`; `color: var(--foreground)`.

---

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `AccordionItem[]` | — | Array of disclosure panels |
| `type` | `'single' \| 'multiple'` | `'single'` | Single: one open at a time; Multiple: any count |
| `defaultExpanded` | `string[]` | `[]` | IDs of initially expanded items |
| `onExpandedChange` | `(expandedIds: string[]) => void` | — | Fires when any item is toggled |
| `disabled` | `boolean` | `false` | Disables all items |
| `className` | `string` | `''` | Additional class on root |

**`AccordionItem` model:**
| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique identifier |
| `title` | `string` | Yes | Visible header text |
| `content` | `ReactNode` | Yes | Content region |
| `disabled` | `boolean` | No | Disables this item only |
| `icon` | `ReactNode` | No | Icon before title |
| `iconColor` | `'default' \| 'primary'` | No | Icon colour — `primary` maps to `var(--primary)` |

---

#### States

| State | Visual | Behaviour | Accessibility |
|---|---|---|---|
| Item — collapsed | Content hidden (`height: 0`) | Click expands | `aria-expanded="false"` |
| Item — expanded | Content visible (`height: auto`) | Click collapses | `aria-expanded="true"` |
| Header — hover | `background-color: var(--muted)` | — | No ARIA change |
| Header — focus-visible | `outline: 2px solid var(--focus-ring); outline-offset: -2px` | — | Keyboard accessible |
| Item — disabled (item) | `opacity: 0.5; cursor: not-allowed` | Click does nothing | `disabled` attribute |
| Accordion — disabled (root) | `opacity: 0.6; pointer-events: none` | No items interactive | Applied to root |
| Chevron — collapsed | 0° rotation | — | Decorative |
| Chevron — expanded | 180° rotation, 0.2s ease | — | `aria-hidden="true"` implied |

---

#### Visual Specification

| Element | Value | Token |
|---|---|---|
| Root bg | `var(--background)` | `--accordion-*` (inline) → `--cvp-color-surface-page` |
| Header bg | `var(--card)` | → `--cvp-color-surface-card` |
| Header hover bg | `var(--muted)` | → `--cvp-color-surface-muted` |
| Content bg | `var(--card)` | → `--cvp-color-surface-card` |
| Border | `var(--border)` | → `--cvp-color-border-default` |
| Header text | `var(--foreground)` | → `--cvp-color-text-primary` |
| Chevron colour | `var(--muted-foreground)` | → `--cvp-color-icon-muted` |
| Icon (primary) | `var(--primary)` | → `--cvp-color-brand-default` |
| Focus ring | `var(--focus-ring)` | → `--cvp-focus-ring-color` |
| Header padding | `12px 15px` | `--accordion-header-padding` |
| Content padding | `16px` | `--accordion-content-padding` |
| Transition | `0.2s ease` | `--accordion-transition-duration` |
| Chevron size | `16px` | `--accordion-icon-size` |

---

#### Keyboard Behaviour

| Key | Behaviour |
|---|---|
| `Tab` | Moves focus to next accordion header |
| `Shift+Tab` | Moves focus to previous accordion header |
| `Enter` / `Space` | Toggles the focused item |
| `Home` | **Not implemented** — WAI-ARIA recommends moving focus to first header |
| `End` | **Not implemented** — WAI-ARIA recommends moving focus to last header |
| Arrow keys | **Not implemented** — WAI-ARIA recommends `↑`/`↓` between headers |

---

#### Accessibility

| Requirement | Current | Gap |
|---|---|---|
| Header as button | `<button disabled aria-expanded aria-controls id>` | Correct |
| Content region `id` | No `id` on content `<div>` | **Gap:** add `id="accordion-content-{item.id}"` |
| Content `aria-labelledby` | Not present | **Gap:** add `aria-labelledby="accordion-header-{item.id}"` |
| Content `role="region"` | Not present | Required by WAI-ARIA Accordion pattern when `<section>` not used |
| Disabled items | `disabled` attribute | Correct |
| Chevron icon | Inline SVG with no accessible annotation | Add `aria-hidden="true"` to chevron SVG |

**Required fix for content panel ARIA:**
```tsx
<div
  id={`accordion-content-${item.id}`}
  role="region"
  aria-labelledby={`accordion-header-${item.id}`}
  className={`accordion-content ...`}
>
```

---

#### Animation Gap

The component uses `transition: height var(--accordion-transition-duration) ease` on the `.accordion-content` element with `height: 0` (collapsed) and `height: auto` (expanded). CSS `transition` cannot animate from a defined value to `auto` — the panel appears/disappears instantly with no animation despite the transition definition.

**Required fix:** Measure content height with `ref.current.scrollHeight` and set explicit pixel height before transitioning:
```tsx
const contentRef = useRef<HTMLDivElement>(null);
// On expand: set height to scrollHeight px, then on transitionend set to 'auto'
// On collapse: set height to scrollHeight px, then in next frame set to 0
```

Alternatively, adopt the `ui/accordion.tsx` shadcn/ui primitive which wraps Radix UI's `Collapsible` and handles this correctly.

---

#### Storybook Requirements

| Story | Notes |
|---|---|
| `single` — default | One item expanded; click another collapses first |
| `multiple` | Multiple items open simultaneously |
| Default expanded | `defaultExpanded` with 2 pre-opened items |
| With icons | Items with leading icon in default and primary colour |
| Disabled item | One item disabled within enabled accordion |
| Disabled accordion | Root disabled; all items inert |
| Long content | Content with multi-paragraph text |
| Dark / light theme | Both themes |
| Animation gap | Document: height transition does not animate |

---

#### Test Requirements

| Type | Coverage |
|---|---|
| Unit | `single` mode allows only one open; `multiple` allows many; disabled item unresponsive; `onExpandedChange` fires correct IDs; `defaultExpanded` pre-opens items |
| Accessibility | axe scan; `aria-expanded` correct; button `disabled` attribute; content `id` / `aria-labelledby` (after fix) |
| Visual regression | Collapsed + expanded states × both themes |

---

#### Known Gaps

| Gap | Severity | Action |
|---|---|---|
| Height `auto` transition does not animate | High | Implement JS height measurement pattern |
| Content panel missing `id`, `aria-labelledby`, `role="region"` | High | Fix ARIA structure |
| Chevron SVG not `aria-hidden` | Low | Add `aria-hidden="true"` |
| No `Home`/`End`/arrow key navigation | Medium | Implement WAI-ARIA Accordion keyboard pattern |
| Token migration | High | Phase 2 task |

---

## Part G — Layout, Authentication and Internal Utilities

> **Family scope.** This part covers the remaining components from the inventory: the `Layout` split-panel container (§1.9), the `LoginSignUp` / `LoginSignUpLight` authentication views (§1.10), and the internal utilities `ThemeSwitcher`, `ImageWithFallback`, and `DesignSystemNav` (§1.12). The authentication components and utilities are the final components required for 100% inventory coverage.

---

## Layout

| Dimension | Status |
|---|---|
| Production implementation | Complete — ~380 lines |
| Storybook stories | None |
| Token migration | Defines `--panel-*` tokens inline; references `--shadow-sm`, `--shadow-md`, `--focus-ring`, `--primary`, `--spacing`; several values hardcoded |
| Specification confidence | High |
| Classification | Generic layout container (publishable primitive) |

#### Purpose

A two-panel horizontal layout with an optional resizable divider. Provides left-panel and right-panel slots with optional headers, breadcrumbs, action slots, and collapse toggles. Intended as the primary page layout shell for content management views requiring a master-detail or sidebar-plus-content arrangement.

#### When to Use

- Any two-column editorial or management view: sidebar navigation + content, filter panel + results, detail panel + form.
- When the user needs to drag-resize the panel split.

#### When Not to Use

- Single-column content — use a plain container.
- Full-page application shell with persistent navigation — use `PageSideNav` + `HeaderNavigation` composition.

---

#### Anatomy

1. **Root** — `<div class="layout">` — flex row (desktop) / flex column (mobile ≤768px).
2. **Left panel** — `<div class="layout__panel layout__panel--left">` — width `leftPanelWidth`% (default 30%).
3. **Right panel** — `<div class="layout__panel layout__panel--right">` — width `rightPanelWidth`% (default 70%).
4. **Resizer** — `<div class="layout__resizer">` — 4px wide; visible as `var(--focus-ring)` on hover; rendered only when `resizable={true}` on desktop.
5. **Panel header** — `<div class="layout__panel-header">` — 44px tall; flex row; title text + optional toggle + optional actions.
6. **Panel header title** — 14px / 600 weight / `var(--foreground)`.
7. **Panel toggle button** — `<button>` — `ChevronLeft`/`ChevronRight` icon; 28×28px; shows when `showToggle={true}`.
8. **Panel actions** — `<div class="layout__panel-header-actions">` — arbitrary ReactNode slot.
9. **Breadcrumbs** — rendered in right panel header when `rightPanelBreadcrumbs` is non-empty.
10. **Panel content** — `<div class="layout__panel-content">` — `overflow: auto`; custom webkit scrollbar.

---

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `leftPanel` | `ReactNode` | — | Left panel content |
| `rightPanel` | `ReactNode` | — | Right panel content |
| `leftPanelHeader` | `PanelHeaderProps` | — | Header config for left panel |
| `rightPanelHeader` | `PanelHeaderProps` | — | Header config for right panel |
| `rightPanelBreadcrumbs` | `BreadcrumbItem[]` | — | Breadcrumb trail in right panel header |
| `leftPanelWidth` | `number` | `30` | Left panel width (%) on desktop |
| `rightPanelWidth` | `number` | `70` | Right panel width (%) on desktop |
| `gap` | `string` | `'0.5rem'` | Gap between panels |
| `minHeight` | `string` | `'calc(100vh - 240px)'` | Minimum height of layout |
| `resizable` | `boolean` | `false` | Enable drag-to-resize |
| `className` | `string` | `''` | Additional class on root |
| `onResize` | `(leftWidth, rightWidth) => void` | — | Fires on drag resize |

**`PanelHeaderProps` model:**
| Field | Type | Default |
|---|---|---|
| `title` | `string` | — |
| `isCollapsed` | `boolean` | `false` |
| `onToggle` | `() => void` | — |
| `showToggle` | `boolean` | `false` |
| `isLeftPanel` | `boolean` | `false` |
| `actions` | `ReactNode` | — |

---

#### Resize Behaviour

When `resizable={true}`, the resizer element listens to `mousedown` to begin a drag session. During drag, `mousemove` on `document` computes the new left-panel width as a percentage of the container width. Constraints: minimum 20%, maximum 40% for the left panel. On `mouseup`, drag ends. `onResize(leftWidth, rightWidth)` fires on every frame during drag. Resize is only active on desktop (≥768px); the resizer is not rendered on mobile.

**Accessibility gap:** The resize handle has no `role`, no `aria-label`, no keyboard interaction. A keyboard user cannot resize the panels.

**Required fix:**
```tsx
<div
  role="separator"
  aria-label="Resize panels"
  aria-orientation="vertical"
  tabIndex={0}
  onKeyDown={handleResizerKeyDown}  // Left/Right arrows adjust width
  className="layout__resizer"
/>
```

---

#### Responsive Behaviour

| Breakpoint | Change |
|---|---|
| ≥768px | Horizontal flex; resizer shown if `resizable` |
| <768px | Vertical flex column; left panel `max-height: 500px`; resizer hidden |
| ≤480px | Header and content padding reduced |

---

#### Visual Specification

| Element | Value | Token |
|---|---|---|
| Panel shadow | `var(--shadow-sm)` | `--panel-shadow` |
| Panel hover shadow | `var(--shadow-md)` | `--panel-hover-shadow` |
| Resizer default | `transparent` | `--panel-resize-indicator` |
| Resizer hover | `var(--focus-ring)` | `--panel-resize-indicator-hover` |
| Resizer active | `var(--primary)` | `--panel-resize-indicator-active` |
| Panel border radius | `2px` | `--panel-border-radius` |
| Header height | `44px` | Hardcoded |
| Header title size | `14px / 600` | Hardcoded |
| Panel action button | `28×28px` | Hardcoded |
| Resizer width | `4px` | Hardcoded |
| Scrollbar width | `6px` | Hardcoded |

---

#### Accessibility

| Requirement | Current | Gap |
|---|---|---|
| Left panel | Plain `<div>` | Add `role="complementary"` + `aria-label` if sidebar |
| Right panel | Plain `<div>` | Add `role="main"` if primary content |
| Panel headers | Plain `<div>` | Should be `<header>` element |
| Panel toggle | `<button>` | Needs `aria-expanded`, `aria-controls` |
| Resizer handle | No `role` or keyboard | Add `role="separator"`, keyboard resize |
| Breadcrumbs | `CVP Breadcrumbs` component | Inherits Breadcrumbs ARIA |

---

#### Known Gaps

| Gap | Severity | Action |
|---|---|---|
| Resizer not keyboard accessible | High | Add keyboard interaction |
| Resizer has no `role` or `aria-label` | High | Add ARIA |
| Panel elements lack semantic roles | Medium | Add `role="main"`, `role="complementary"` where appropriate |
| Header height hardcoded | Low | Token migration |
| Resize constrained to 20–40% — no prop | Medium | Add `minLeftWidth`, `maxLeftWidth` props |
| Mobile: left panel `max-height: 500px` hardcoded | Low | Token migration |
| Token migration | High | Phase 2 task |

#### Storybook Requirements

| Story | Notes |
|---|---|
| Default | 30/70 split; static |
| Resizable | Drag handle visible; drag to resize |
| With headers | Left + right panel headers |
| With breadcrumbs | Right panel breadcrumb trail |
| With actions | Header actions slot populated |
| Collapsed left | Toggle button collapses left panel |
| Mobile — 768px | Stacked layout |
| Resizer keyboard gap | Document: keyboard resize not implemented |

---

## LoginSignUp

| Dimension | Status |
|---|---|
| Production implementation | Two files: `LoginSignUp.tsx` (dark) + `LoginSignUpLight.tsx` (light) — ~280 lines each |
| Storybook stories | None |
| Token migration | Defines `--login-*` tokens inline; many values hardcoded (gradients, border, padding, radius, shadow) |
| Specification confidence | High |
| Classification | Authentication product pattern — not a generic design system primitive. Theme duality via separate files is a gap (see below). |

#### Purpose

The authentication entry screen. Provides email + password sign-in with optional SSO integration. Two variants exist as separate components: `LoginSignUp` (dark/navy gradient background) and `LoginSignUpLight` (light/pastel blue gradient background). Both expose identical props.

#### Unification Recommendation

Two separate components for dark/light variants is an anti-pattern in the CVP token architecture. The correct approach is:
- Single `LoginSignUp` component consuming `--login-*` tokens
- Token values set differently under `[data-theme="dark"]` and `[data-theme="light"]` in `cvp-component-tokens.css`
- `LoginSignUpLight.tsx` deprecated and removed

This recommendation requires a Phase 2 migration task. Until migration, both files must be maintained in parallel. **Do not add new features to one file without updating the other.**

---

#### Anatomy

1. **Page wrapper** — `<div class="login-page">` — full viewport; `background: linear-gradient(...)`.
2. **Container** — `<div class="login-container">` — max-width 440px; centred; `backdrop-filter: blur(20px)`.
3. **Logo** — `<img>` with `logoUrl` prop or fallback SVG — max-width 260px.
4. **Title** — `<h1>` — platform name (`platformName` prop).
5. **Subtitle row** — "Sign in to [account selector]" — inline `Select` for account type.
6. **Form** — `<form>` — email `TextInput` + password field.
7. **Password field** — custom input with password visibility toggle (`Eye`/`EyeOff` icons).
8. **Error message** — `<div role="alert">` — shown when `error` prop is non-empty.
9. **Sign In button** — `PrimaryButton` — disabled until email + password filled; loading state.
10. **Divider** — "OR" divider line.
11. **SSO button** — `OutlineButton` with Building2 icon.
12. **Footer** — privacy and terms links; platform name.

---

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `onSignIn` | `(email, password) => void` | — | Form submit callback |
| `onSSOSignIn` | `() => void` | — | SSO button callback |
| `onForgotPassword` | `() => void` | — | Forgot password link callback |
| `loading` | `boolean` | `false` | Disables all inputs and buttons; shows loading state |
| `error` | `string` | — | Error message shown in `role="alert"` div |
| `logoUrl` | `string` | — | Custom logo URL; falls back to placeholder |
| `platformName` | `string` | `'Cloud Video Platform'` | Shown in title and footer |

---

#### States

| State | Visual | Behaviour | Accessibility |
|---|---|---|---|
| Default (empty) | All fields empty | Sign In button disabled | `<button disabled>` |
| Default (filled) | Email + password filled | Sign In button enabled | `<button>` (no disabled) |
| Loading | Button shows spinner or "Signing In…" text | All inputs disabled; SSO button disabled | Buttons `disabled` |
| Error | Error message appears below form | Focus not moved to error — **gap** | `role="alert"` |
| Password visible | Password field shows plaintext | Toggle toggles again | `aria-label="Hide password"` |
| Password hidden | Password field shows dots | Toggle toggles again | `aria-label="Show password"` |

---

#### Visual Specification (Dark Variant)

| Element | Value | Token |
|---|---|---|
| Background gradient | `linear-gradient(#182848, #4b6cb7)` | `--login-bg-gradient-start/end` |
| Card bg | `linear-gradient(rgba(16,16,16,0.98), rgba(4,4,4,0.98))` | `--login-card-bg` |
| Card border | `transparent` | `--login-card-border` |
| Card max-width | `440px` | `--login-card-max-width` |
| Card padding | `32px` | `--login-card-padding` |
| Card border-radius | `8px` | `--login-card-border-radius` |
| Card shadow | `0 8px 24px rgba(0,0,0,0.4)` | `--login-card-shadow` |
| Header text | `#fff` | `--login-header-text` |
| Subtext / links | `#B8C5E0` | `--login-subtext`, `--login-link-text` |
| Divider line | `#45454a` | Hardcoded — **migrate** |

**Light variant** overrides all gradient and surface tokens with pastels (`#e0e7ff` → `#f0f9ff`; card `rgba(255,255,255,0.95)`; card border `#e5e7eb`).

---

#### Accessibility

| Requirement | Current | Gap |
|---|---|---|
| Error message | `role="alert"` | Correct |
| Password toggle | `aria-label` switches on toggle | Correct |
| Form submit on Enter | `<form onSubmit>` with `preventDefault` | Correct |
| Focus after error | No focus management | **Gap:** move focus to error message or first error field |
| Loading state | Inputs and buttons `disabled` | Correct |
| Logo alt text | Not confirmed | **Verify:** `<img>` needs descriptive `alt` or `alt=""` if decorative |
| Account selector | CVP `Select` component | Inherits Select ARIA |

---

#### Known Gaps

| Gap | Severity | Action |
|---|---|---|
| Two separate files for light/dark | High | Unify to single component with `data-theme` tokens |
| No focus management on error | Medium | Move focus to `role="alert"` element or first error field |
| Password field is custom — not CVP `TextInput` | Medium | Extend `TextInput` or `MiscInput` with suffix slot for toggle |
| Divider line colour hardcoded | Low | Token migration |
| Card padding hardcoded | Low | Token migration |
| No `loading` visual beyond disabled state | Medium | Add spinner or button loading state |
| Token migration | High | Phase 2 task |

---

## ThemeSwitcher

| Classification | Internal utility — not a publishable design system component |
|---|---|
| Implementation | `src/app/components/ThemeSwitcher.tsx` (~60 lines) |
| Purpose | Toggle between light and dark themes in demo and documentation environments |
| Props | None |
| Tokens | None (`theme-switcher.css` handles icon active state with `--active` class) |

**Behaviour:** Reads `localStorage.getItem('theme')` on mount; falls back to `window.matchMedia('(prefers-color-scheme: dark)')`. Sets `document.documentElement.dataset.theme` and `document.body.dataset.theme` to `"light"` (or removes the attribute for dark). Persists to `localStorage`. Logs to `console`.

**ARIA:** `<button aria-label="Switch to light/dark mode" title="...">` — correct.

**Exclusions from specification:** No component spec template required. `ThemeSwitcher` should not appear in consumer product interfaces — it is a development and documentation utility only. It should not be exported from the design system package as a publishable component.

**Gap:** `console.log` in production code — remove before publishing.

---

## DesignSystemNav

| Classification | Internal utility — not a publishable design system component |
|---|---|
| Implementation | `src/app/components/DesignSystemNav.tsx` |
| Purpose | Navigation sidebar for the CVP component documentation site; lists all components by category |
| Props | `activeItem: string`; `onItemClick: (item: string) => void` |

**Behaviour:** Renders a categorised list of navigation items covering all design system components. Categories: Core Items, Buttons, Forms, Navigation, Overlays, Feedback, Complex, Pages. Clicking an item fires `onItemClick` with the item's `id`. No routing — the parent handles rendering the selected component's documentation.

**Exclusions from specification:** `DesignSystemNav` is the navigation shell for the internal component documentation site. It is not a publishable design system component. It should be excluded from the CVP package export. It is referenced in the inventory as `Unclear` — **resolution: Internal utility. Exclude from published package.**

---

## ImageWithFallback

| Classification | Internal utility — not a publishable design system component |
|---|---|
| Implementation | `src/app/components/figma/ImageWithFallback.tsx` |
| Purpose | Wraps `<img>` with an `onError` fallback slot; used by `RailContentGallery` |
| Props | `src`, `alt`, `className`, `style`, `fallback?: ReactNode`; passes remaining props to `<img>` |

**Behaviour:** Renders `<img>`. On `onError`, replaces image with `fallback` ReactNode (or default Film icon placeholder). Not a stateful gallery component — purely a progressive-enhancement wrapper for a single image element.

**Exclusions from specification:** `ImageWithFallback` is an internal implementation detail of `RailContentGallery`. It is not a publishable standalone component. If an image-with-fallback primitive is needed in the design system, it should be formally specified as `Image` or `MediaImage` with a full §10 template and CVP token coverage.

---

## Appendix A — Component Coverage Matrix

> This matrix is the single source of truth for what is and is not documented. Every component in `DESIGN_SYSTEM_COMPONENT_INVENTORY.md` must appear here. **Legend:** ✓ = present / complete; ✗ = absent; ~ = partial; — = not applicable.

### A.1 CVP Publishable Components

| Component | Family | Specification section | Storybook story | Implementation file | Unit tests | Token migration | Remaining critical gaps |
|---|---|---|---|---|---|---|---|
| PrimaryButton | Actions | Part A | ✗ | `PrimaryButton.tsx` | ✗ | Unregistered `--primary-button-*` | No Storybook; token migration pending |
| SecondaryButton | Actions | Part A | ✗ | `SecondaryButton.tsx` | ✗ | Unregistered `--secondary-button-*` | No Storybook; token migration pending |
| OutlineButton | Actions | Part A | ✗ | `OutlineButton.tsx` | ✗ | Unregistered `--outline-button-*` | No Storybook; token migration pending |
| TextButton | Actions | Part A | ✗ | `TextButton.tsx` | ✗ | Unregistered `--text-button-*` | No Storybook; token migration pending |
| IconButton | Actions | Part A | ✗ | `IconButton.tsx` | ✗ | Unregistered | No Storybook; token migration pending |
| IconSmallButton | Actions | Part A | ✗ | `IconSmallButton.tsx` | ✗ | Unregistered | Spec gap: should be `size` prop on `IconButton` |
| IconButtonWithText | Actions | Part A | ✗ | `IconButtonWithText.tsx` | ✗ | Unregistered | No CVP token counterpart; no Storybook |
| TextInput | Form Controls | Part B | ✗ | `TextInput.tsx` | ✗ | Unregistered `--text-input-*` | No Storybook; token migration pending |
| TextArea | Form Controls | Part B | ✗ | `TextArea.tsx` | ✗ | Unregistered | No Storybook |
| MiscInput | Form Controls | Part B | ✗ | `MiscInput.tsx` | ✗ | Legacy + hardcoded | TextInput/MiscInput overlap unresolved (OQ-3) |
| Select | Form Controls | Part B | ✗ | `Select.tsx` | ✗ | Unregistered | No Storybook |
| MultiSelect | Form Controls | Part B | ✗ | `MultiSelect.tsx` | ✗ | Unregistered | No Storybook; `multiple` mode gap |
| Checkbox | Form Controls | Part B | ✗ | `Checkbox.tsx` | ✗ | Unregistered `--checkbox-*` | No Storybook |
| Toggle | Form Controls | Part B | ✗ | `Toggle.tsx` | ✗ | Unregistered `--toggle-*` | No Storybook |
| Segmented | Form Controls | Part B | ✗ | `Segmented.tsx` | ✗ | Unregistered `--segmented-*` | No Storybook |
| HeaderNavigation | Navigation | Part C | ✗ | `HeaderNavigation.tsx` | ✗ | Partial CVP sem | No Storybook; responsive gap |
| PageSideNav | Navigation | Part C | ✗ | `PageSideNav.tsx` | ✗ | Unregistered | No Storybook; collapsed state gap |
| Breadcrumbs | Navigation | Part C | ✗ | `Breadcrumbs.tsx` | ✗ | Unregistered `--breadcrumb-*` | No Storybook |
| Tabs | Navigation | Part C | ✗ | `Tabs.tsx` | ✗ | Unregistered `--tabs-*` | No Storybook |
| Modal | Overlays | Part D | ✗ | `Modal.tsx` | ✗ | Unregistered `--modal-*` | No focus trap; no initial focus; no focus restoration |
| ContentBrowserModal | Overlays | Part D + Part F addendum | ✗ | `ContentBrowserModal.tsx` | ✗ | Unknown | Product-layer; selection strip remove button has no `aria-label` |
| Toast | Feedback | Part D | ✗ | `Toast.tsx` | ✗ | Unregistered `--toast-*` | Variant tokens undefined (invisible without consumer tokens); timer non-pause WCAG violation |
| NotificationBanner | Feedback | Part D | ✗ | `NotificationBanner.tsx` | ✗ | Unregistered `--notification-banner--*` | `prefers-color-scheme` vs `[data-theme]` mismatch; missing `role`/`aria-live` |
| Table | Data Display | Part E | ✗ | `Table.tsx` | ✗ | Unregistered `--table-*` | No semantic HTML (`<table>`/`<th>`/`<td>`); no ARIA role equivalents; indeterminate checkbox gap |
| Accordion | Data Display | Accordion addendum (after Part F) | ✗ | `Accordion.tsx` | ✗ | Unregistered `--accordion-*` | Height animation broken; content ARIA missing |
| Tree | Data Display | Part E | ✗ | `Tree.tsx` + 4 sub-files | ✗ | Inline tokens | No `role="tree"`; no keyboard navigation; completely inaccessible |
| Filter | Filtering | Part F | ✗ | `Filter.tsx` | ✗ | Unregistered `--filter-*` + hardcoded | No Escape handler; no ARIA roles on menu/options; `multiselect` type non-functional |
| FilterGroup | Filtering | Part F | ✗ | `FilterGroup.tsx` | ✗ | Unknown | Keyboard drag gap; token migration |
| TagFilter | Filtering | Part F | ✗ | `TagFilter.tsx` | ✗ | Unregistered `--tag-filter-*` | Missing `aria-pressed` on tag buttons |
| RailContentGallery | Media | Part F | ✗ | `RailContentGallery.tsx` | ✗ | Partial CVP comp | Selection checkbox missing ARIA; drag-and-drop incomplete; no reduced-motion |
| RailDetails | Media | Part F | ✗ | `RailDetails.tsx` | ✗ | Legacy | Product-layer; all action buttons stubs; badge values hardcoded |
| Layout | Layout | Part G | ✗ | `Layout.tsx` | ✗ | Inline `--panel-*` | Resizer not keyboard accessible; panel roles absent |
| LoginSignUp | Authentication | Part G | ✗ | `LoginSignUp.tsx` | ✗ | Inline `--login-*` | Dark/light split-file anti-pattern; no focus on error |
| LoginSignUpLight | Authentication | Part G (joint spec) | ✗ | `LoginSignUpLight.tsx` | ✗ | Inline `--login-*` | Duplicate of `LoginSignUp`; recommend deprecation |
| SegmentQueryConfiguration | Product Pattern | Part F | ✗ | `SegmentQueryConfiguration.tsx` | ✗ | Unknown | Filter ID collision; `initialConfig` anti-pattern; Modal focus gaps |

---

### A.2 Internal / Non-Publishable Components

| Component | Classification | Specification section | Notes |
|---|---|---|---|
| DesignSystemNav | Internal utility | Part G | Navigation sidebar for documentation site; exclude from CVP package |
| ThemeSwitcher | Internal utility | Part G | Dev/documentation theme toggle; exclude from CVP package |
| ImageWithFallback | Internal utility | Part G | Internal implementation detail of `RailContentGallery`; not standalone |

---

### A.3 shadcn/ui Primitives (Available, Not CVP-Styled)

These 46 primitives live in `src/app/components/ui/`. They are available as building blocks but carry no CVP token coverage, no CVP documentation, and no Storybook stories. They are listed here for inventory completeness only.

| shadcn/ui component | CVP adoption status | Notes |
|---|---|---|
| accordion | ✗ — CVP `Accordion.tsx` exists | Radix-backed; handles height animation correctly; consider replacing CVP Accordion |
| alert | ✗ | Not CVP-styled |
| alert-dialog | ✗ | Not CVP-styled |
| aspect-ratio | ✗ | Utility primitive |
| avatar | ~ | Used in `HeaderNavigation` |
| badge | ✗ | Not CVP-styled; no CVP badge component |
| breadcrumb | ✗ | CVP `Breadcrumbs.tsx` is the canonical component |
| button | ✗ | CVP `PrimaryButton` etc. are the canonical buttons |
| calendar | ✗ | Not CVP-styled; no CVP calendar |
| card | ✗ | Not CVP-styled; no CVP card component |
| carousel | ~ | Available; not adopted by CVP domain components |
| chart | ~ | Wraps recharts; not CVP-styled |
| checkbox | ✗ | CVP `Checkbox.tsx` is canonical |
| collapsible | ✗ | Not CVP-styled |
| command | ✗ | Not CVP-styled |
| context-menu | ✗ | Not CVP-styled |
| dialog | ✗ | CVP `Modal.tsx` is canonical |
| drawer | ✗ | Not CVP-styled |
| dropdown-menu | ✗ | Not CVP-styled |
| form | ✗ | Not CVP-styled |
| hover-card | ~ | Mentioned in Part D as available primitive |
| input | ✗ | CVP `TextInput.tsx` is canonical |
| input-otp | ✗ | Not CVP-styled; no CVP OTP input |
| label | ✗ | Not CVP-styled |
| menubar | ✗ | Not CVP-styled |
| navigation-menu | ✗ | CVP `HeaderNavigation.tsx` is canonical |
| pagination | ~ | Table uses internal pagination; `ui/pagination` available for extraction |
| popover | ~ | Mentioned in Part D as available primitive |
| progress | ~ | Mentioned in Part D as available primitive |
| radio-group | ✗ | Not CVP-styled; no CVP radio group |
| resizable | ✗ | `Layout.tsx` implements own resize; `ui/resizable` not adopted |
| scroll-area | ✗ | Not CVP-styled; components use native `overflow: auto` |
| select | ✗ | CVP `Select.tsx` is canonical |
| separator | ✗ | Not CVP-styled |
| sheet | ~ | Mentioned in Part D as available primitive |
| sidebar | ✗ | CVP `PageSideNav.tsx` is canonical |
| skeleton | ~ | Mentioned in Part D as available primitive |
| slider | ✗ | Not CVP-styled; no CVP slider |
| sonner | ~ | Third-party toast; relation to CVP `Toast.tsx` unresolved (OQ-2) |
| switch | ✗ | CVP `Toggle.tsx` is canonical |
| table | ✗ | CVP `Table.tsx` is canonical (though it uses `<div>` not `<table>`) |
| tabs | ✗ | CVP `Tabs.tsx` is canonical |
| textarea | ✗ | CVP `TextArea.tsx` is canonical |
| toggle | ✗ | CVP `Toggle.tsx` is canonical |
| toggle-group | ✗ | CVP `Segmented.tsx` covers this use case |
| tooltip | ~ | Mentioned in Part D as available primitive |

---

### A.4 Coverage Summary

| Metric | Count | Status |
|---|---|---|
| CVP publishable components in inventory | 35 | — |
| Components with full specification | 35 | ✓ 100% |
| Components with Storybook stories | 0 | ✗ 0% — universal gap |
| Components with unit tests | 0 | ✗ 0% — universal gap |
| Components with completed token migration | 0 | ✗ 0% — Phase 2 not started |
| Components with critical accessibility gaps | 8 | Table, Tree, Modal, Toast, Filter, Accordion, RailContentGallery, TagFilter |
| Internal utilities documented | 3 | ThemeSwitcher, DesignSystemNav, ImageWithFallback |
| shadcn/ui primitives catalogued | 46 | Inventory only — not CVP specifications |

---

### A.5 Open Questions Status

| OQ | Question | Status |
|---|---|---|
| OQ-1 | Modal rendering strategy (Radix or custom) | Unresolved — treat as custom; update if Radix discovered |
| OQ-2 | CVP Toast vs. sonner co-existence | Unresolved — CVP Toast is specification target; sonner is available alternative |
| OQ-3 | MiscInput vs. TextInput boundary | Unresolved — spec treats as distinct tiers (simple vs. advanced) |
| OQ-4 | LoginSignUp light/dark unification | Recommendation: unify under `data-theme` tokens; pending Design Systems decision |
| OQ-5 | Filter token registration | Unresolved — marked `unregistered`; Phase 2 task |
| OQ-6 | Tree token coverage | Resolved — Tree uses inline tokens (32 `--tree-*` custom properties); no CVP token mapping |
| OQ-7 | DesignSystemNav role | Resolved — internal documentation utility; exclude from CVP package |
| OQ-8 | shadcn/ui integration policy | Unresolved — treated as internal scaffolding; catalogued in §A.3 |
| OQ-9 | Storybook setup | Unresolved — no `.storybook/` exists; universal gap for all components |
| OQ-10 | DESIGN.md role going forward | Unresolved — `DESIGN_SYSTEM_SPECIFICATION.md` is now canonical; `DESIGN.md` retained as historical reference |

---

*Specification complete. All 35 CVP publishable components are documented. All 3 internal utilities are documented. All 46 shadcn/ui primitives are catalogued. Appendix A closes the coverage matrix. Remaining work: Storybook setup (Phase 0), token migration (Phase 2), accessibility remediations (8 critical components), and open questions OQ-1 through OQ-10.*

---

### A.6 Engineering Readiness Classification

Every CVP publishable component receives one final status classification. This classification is the engineering handoff verdict.

| Status | Meaning |
|---|---|
| **Ready for engineering** | Specification is complete; no blocking gaps; implementation can proceed |
| **Ready with documented assumptions** | Specification is complete; one or more behaviour decisions have been made without full design sign-off; implementation can proceed but assumptions must be validated |
| **Requires design decision** | An unresolved visual or interaction question blocks correct implementation |
| **Requires token decision** | A token name, tier, or value is unresolved; implementation would require a hardcoded value |
| **Requires accessibility validation** | WCAG compliance for this component has not been independently confirmed |
| **Requires implementation investigation** | A technical question (rendering strategy, dependency, framework constraint) must be answered before the specification can be fully trusted |
| **Legacy — maintain only** | Component uses pre-CVP token naming throughout; no new features should be added; token migration required before enhancement |
| **Deprecated** | Component is scheduled for removal |

| Component | Engineering readiness status |
|---|---|
| PrimaryButton | Ready with documented assumptions — token migration required; no Storybook |
| SecondaryButton | Ready with documented assumptions — token migration required |
| OutlineButton | Ready with documented assumptions — token migration required |
| TextButton | Ready with documented assumptions — token migration required |
| IconButton | Ready with documented assumptions — token migration required |
| IconSmallButton | Requires design decision — should be `size` prop on `IconButton`, not separate component |
| IconButtonWithText | Requires design decision — no CVP token counterpart; no Storybook; OQ-pending |
| TextInput | Ready with documented assumptions — token migration required |
| TextArea | Ready with documented assumptions — token migration required |
| MiscInput | Requires design decision — boundary with `TextInput` unresolved (OQ-3) |
| Select | Ready with documented assumptions — token migration required |
| MultiSelect | Ready with documented assumptions — `multiple` mode gap |
| Checkbox | Ready for engineering — most complete CVP form component |
| Toggle | Ready with documented assumptions — token migration required |
| Segmented | Ready with documented assumptions — token migration required |
| HeaderNavigation | Requires implementation investigation — `--cvp-color-surface-selected` vs `--cvp-color-surface-active` token inconsistency |
| PageSideNav | Ready with documented assumptions — collapsed state gap; token migration required |
| Breadcrumbs | Ready for engineering — correct ARIA; token migration required |
| Tabs | Ready with documented assumptions — keyboard model partially implemented |
| Modal | Requires accessibility validation — no focus trap; WCAG 2.4.3 failure; OQ-1 (rendering strategy) |
| ContentBrowserModal | Requires design decision — product-layer classification; selection strip ARIA gap |
| Toast | Requires accessibility validation — timer not paused; `role="alert"` on non-urgent variants; token inconsistency (`danger` maps to `error` tokens) |
| NotificationBanner | Requires accessibility validation — `prefers-color-scheme` vs `[data-theme]` mismatch; missing `role`/`aria-live` |
| Table | Requires implementation investigation — no semantic HTML; complete WCAG 1.3.1 failure; must choose Option A (rewrite with `<table>`) or Option B (ARIA roles) before proceeding |
| Accordion | Requires implementation investigation — height animation broken; ARIA content region gap |
| Tree | Requires implementation investigation — no ARIA tree pattern; no keyboard navigation; WCAG 4.1.2 failure |
| Filter | Requires accessibility validation — no Escape handler; no ARIA menu roles; no keyboard navigation |
| FilterGroup | Ready with documented assumptions — keyboard drag gap; token migration required |
| TagFilter | Requires accessibility validation — no `aria-pressed` on tag buttons |
| RailContentGallery | Requires accessibility validation — selection checkbox ARIA gap; drag-and-drop incomplete |
| RailDetails | Legacy — maintain only — all action buttons stubs; legacy tokens throughout; product-layer classification |
| Layout | Requires accessibility validation — resizer keyboard gap; panel ARIA roles absent |
| LoginSignUp | Requires design decision — OQ-4 (light/dark split file); focus on error gap |
| LoginSignUpLight | Requires design decision — OQ-4; recommend deprecation after unification |
| SegmentQueryConfiguration | Requires implementation investigation — inherits Modal focus gaps; filter ID collision bug |

---

## Appendix B — Engineering Enhancement Backlog

> All gaps identified during specification and review, ordered by priority. Use this table to plan remediation work alongside the implementation sequence in §EH.8.
>
> **Priority key:** P0 = blocking (WCAG failure or data integrity risk) · P1 = high (significant usability or accessibility gap) · P2 = medium (quality, consistency, or maintainability) · P3 = low (improvement, polish, documentation)
>
> **Owner types:** Engineering · Design Systems · Product Design · Accessibility · Product · Cross-functional decision

| Priority | Component or scope | Gap | Recommended action | Owner | Validation required |
|---|---|---|---|---|---|
| **P0** | Table | No semantic HTML — entire component uses `<div>` elements; no `<table>`, `<th>`, `<td>`, `scope`, `aria-sort` | Rewrite with semantic `<table>` structure (Option A) or add full ARIA role equivalents (Option B); decision required first | Engineering | Accessibility (WCAG 1.3.1), regression |
| **P0** | Tree | No `role="tree"`, `role="treeitem"`, `aria-expanded`, `aria-level`, `aria-setsize`, `aria-posinset`; no keyboard navigation | Implement WAI-ARIA Tree pattern; add arrow key, Enter, Home/End navigation | Engineering | Accessibility (WCAG 4.1.2, 2.1.1) |
| **P0** | Modal | No focus trap; focus not moved to modal on open; focus not restored on close | Implement focus trap (either adopt Radix `Dialog` or use `focus-trap` library); resolve OQ-1 | Engineering | Accessibility (WCAG 2.4.3) |
| **P0** | All components | Phase 0 token audit not started — no map of `--tc-*` and unregistered token usage | Run Phase 0 audit; produce migration spreadsheet | Engineering | Engineering |
| **P0** | All components | Stylelint enforcement not configured — new hardcoded values undetected | Generate `token-registry.json`; configure `stylelint-plugin-cvp-tokens` | Engineering | Engineering |
| **P1** | Toast | Auto-dismiss timer not paused on hover or focus (WCAG 2.2.1 violation) | Pause `clearTimeout` on `mouseenter`/`focusin`; resume on `mouseleave`/`focusout` | Engineering | Accessibility (WCAG 2.2.1) |
| **P1** | Toast | `danger` variant tokens map to `--cvp-color-error-surface` — should be `--cvp-color-state-danger-bg` | Correct token targets in Toast specification and implementation | Design Systems | Token, visual regression |
| **P1** | Toast | `role="alert"` on `info` and `success` variants causes aggressive AT interruption | Use `role="status"` + `aria-live="polite"` for non-urgent variants | Engineering | Accessibility |
| **P1** | Toast | SSR-unsafe ID generation (`Math.random()`) | Replace with `crypto.randomUUID()` or a stable counter | Engineering | Engineering |
| **P1** | Filter | No Escape key handler to close the dropdown menu | Add `keydown` listener for Escape on the document while menu is open | Engineering | Accessibility (WCAG 2.1.2 inverse) |
| **P1** | Filter | No `role="menu"` / `role="listbox"` or `role="option"` / `role="menuitem"` on dropdown options | Add ARIA roles to menu container and each option | Engineering | Accessibility (WCAG 4.1.2) |
| **P1** | Filter | No keyboard navigation within dropdown options (arrow keys) | Implement roving `tabindex` in options list | Engineering | Accessibility (WCAG 2.1.1) |
| **P1** | Filter | `multiselect` type does not accumulate multiple values — routes to same single-value submenu | Implement true multi-value submenu with checkboxes | Engineering | Engineering |
| **P1** | Accordion | Height animation broken (`transition` on `height: auto` does not animate) | Implement JS `scrollHeight` measurement pattern or adopt Radix `Collapsible` | Engineering | Visual regression |
| **P1** | Accordion | Content panels missing `id`, `aria-labelledby`, `role="region"` | Add ARIA structure to content elements | Engineering | Accessibility (WCAG 4.1.2) |
| **P1** | TagFilter | No `aria-pressed` on tag buttons — screen readers cannot determine selection state | Add `aria-pressed={selectedOptions.includes(option.id)}` | Engineering | Accessibility (WCAG 4.1.2) |
| **P1** | RailContentGallery | Selection checkbox (display-grid-selectable) has no `role`, `aria-checked`, or `aria-label` | Convert to `<button role="checkbox" aria-checked aria-label>` | Engineering | Accessibility (WCAG 4.1.2) |
| **P1** | Navigation Shell | No skip-to-main link | Add `<a href="#main-content" class="skip-link">Skip to main content</a>` as first focusable element | Engineering | Accessibility (WCAG 2.4.1) |
| **P1** | Navigation Shell | Mobile navigation absent at ≤768px | Implement hamburger + Sheet/Drawer overlay; `PageSideNav` collapses to a drawer | Engineering + Product Design | Responsive, Accessibility |
| **P1** | HeaderNavigation | Dropdown `--cvp-color-surface-selected` token does not exist — architecture defines `--cvp-color-surface-active` | Correct token name in specification and component implementation | Design Systems | Token, visual regression |
| **P1** | NotificationBanner | Uses `prefers-color-scheme` media query for theming instead of `[data-theme]` attribute | Replace media query with `[data-theme="dark"]` selector | Engineering | Visual regression, theme |
| **P1** | NotificationBanner | Missing `role` and `aria-live` attributes — stateless banner not announced to AT | Add `role="status"` + `aria-live="polite"` (or `role="alert"` for error variants) | Engineering | Accessibility (WCAG 4.1.3) |
| **P1** | SegmentQueryConfiguration | Filter ID collision on remove-then-add — IDs generated as string index | Replace with `crypto.randomUUID()` | Engineering | Engineering |
| **P1** | SegmentQueryConfiguration | `initialConfig` ignored after mount (derived state anti-pattern) | Document `key` prop pattern or add `onReset` callback | Engineering | Engineering |
| **P2** | All components | `prefers-reduced-motion` not respected — all animations fire unconditionally | Add `@media (prefers-reduced-motion: reduce)` overrides to all component stylesheets | Engineering | Accessibility (WCAG 2.3.3), responsive |
| **P2** | All components | Focus ring uses Tailwind `--focus-ring` shorthand, not `--cvp-focus-ring-color` | Migrate focus ring CSS to CVP token as part of Phase 2 | Engineering | Token, visual regression |
| **P2** | All components | `--background`, `--foreground`, `--border`, `--muted` are Tailwind tokens, not CVP tokens | Migrate to `--cvp-color-surface-page`, `--cvp-color-text-primary`, etc. in Phase 2/3 | Engineering | Token, visual regression, theme |
| **P2** | LoginSignUp | Focus not moved to error region on validation failure | Add `errorRef.current.focus()` after error is set | Engineering | Accessibility (WCAG 2.4.3) |
| **P2** | LoginSignUp | Light/dark theme split across two component files | Unify into single component with `[data-theme]` token resolution; deprecate `LoginSignUpLight.tsx` | Design Systems | Design decision (OQ-4) |
| **P2** | RailContentGallery | Drag-and-drop incomplete — no drop target; `onDrag` not called from any handler | Implement `onDrop` within component | Engineering | Engineering |
| **P2** | RailContentGallery | Keyboard focus does not auto-scroll the rail to the focused item | Add `scrollIntoView` on item `focus` event | Engineering | Accessibility |
| **P2** | RailContentGallery | Override badge colour hardcoded (`#f59e0bf2`) — not token-referenced | Migrate to `--cvp-color-warning-emphasis` or equivalent semantic token | Engineering + Design Systems | Token |
| **P2** | RailContentGallery | Pin active state colour hardcoded (`#10B981`) | Migrate to `--cvp-color-success-default` or equivalent | Engineering + Design Systems | Token |
| **P2** | Layout | Resizer panel not keyboard accessible — no `role`, `aria-label`, or keyboard interaction | Add `role="separator"` + arrow key resize | Engineering | Accessibility |
| **P2** | Modal | Hardcoded `"modal-title"` / `"modal-description"` IDs — multiple modal instances would collide | Use `useId()` or generate unique IDs | Engineering | Engineering |
| **P2** | Table | Indeterminate select-all checkbox state not implemented | Set `.indeterminate = true` on the input ref | Engineering | Engineering |
| **P2** | Table | No keyboard reorder alternative for drag-to-reorder rows | Add move-up/move-down keyboard controls | Engineering | Accessibility |
| **P2** | Filter | `text` filter type defined in interface but no text input rendered in submenu | Implement text input submenu | Engineering | Engineering |
| **P2** | Filter | Filter bar search input has no `<label>` or `aria-label` | Add `aria-label="Search content"` | Engineering | Accessibility |
| **P2** | Tree | No `Home`, `End`, or arrow key navigation | Implement WAI-ARIA Tree keyboard model | Engineering | Accessibility (WCAG 2.1.1) |
| **P2** | PrimaryButton (danger variant) | No `danger` variant exists — destructive confirmation pattern requires it | Design a `danger` variant; add `--cvp-button-danger-*` tokens | Design Systems + Engineering | Design decision |
| **P2** | Bulk action bar | No canonical CVP pattern — consumer-managed with no shared layout or styling | Define canonical bulk-action-bar pattern; optionally build as a design pattern component | Design Systems + Product Design | Design decision |
| **P2** | RailDetails | All action buttons (Duplicate, Preview, Save) are stubs with no `onClick` handlers | Add `onDuplicate`, `onPreview`, `onSave` callbacks; implement unsaved-change detection | Engineering | Engineering |
| **P2** | SegmentQueryConfiguration | Cancel does not reset config to `initialConfig` | Reset state in `handleCancel`; or lift state to parent | Engineering | Engineering |
| **P2** | Filter | `role="button"` on trigger `<div>` — should be native `<button>` | Replace `<div role="button">` with `<button>` | Engineering | Accessibility |
| **P3** | MiscInput vs TextInput | Boundary between the two components is unresolved (OQ-3) | Design Systems decision: deprecate one, differentiate documentation | Design Systems | Design decision |
| **P3** | Modal | No exit animation — closes instantly | Add `fadeOut` / `scaleOut` exit animation; requires JS-controlled unmount | Engineering | Visual |
| **P3** | Toast | No exit animation | Add exit animation before unmounting | Engineering | Visual |
| **P3** | ThemeSwitcher | `console.log` in production code | Remove before publishing | Engineering | Engineering |
| **P3** | Modal | SSR-unsafe hardcoded ID `"modal-title"` / `"modal-description"` | Use `useId()` | Engineering | Engineering |
| **P3** | All domain components | `--rail-gallery-*`, `--filter-*`, `--tag-filter-*`, `--segment-query-config-*` tokens unregistered | Register in `cvp-component-tokens.css` during Phase 3 migration | Design Systems + Engineering | Token |
| **P3** | RailDetails | `<aside>` lacks `aria-label` | Add `aria-label="Rail Manager"` | Engineering | Accessibility |
| **P3** | Layout | Left and right panels lack semantic roles (`role="main"`, `role="complementary"`) | Add appropriate ARIA landmark roles | Engineering | Accessibility |
| **P3** | Specification | `CHANGELOG.md` does not exist — token governance requires it | Create `CHANGELOG.md` and log v1.0 → v1.1 changes | Design Systems | Process |
| **P3** | Specification | `scripts/build-token-registry.js` referenced in governance docs but does not exist | Create the registry generation script | Engineering | Engineering |
| **P3** | ContentBrowserModal | Selection reference strip remove buttons have no `aria-label` | Add `aria-label="Remove [title] from selection"` | Engineering | Accessibility |
| **P3** | Filter | Focus ring uses `#6f8be6` hardcoded — slightly mismatched with `--cvp-focus-ring-color` (`#67b3fb`) | Migrate to CVP focus token | Engineering | Token, visual regression |

---

*Engineering review complete. The specification is ready for engineering handoff. Implementation should begin with Phase 0 audit and P0 accessibility remediations before any new feature work proceeds.*

---

## Design Patterns

> **How to read this section.** A design pattern is a repeatable combination of components that solves a recurring product problem. Patterns are not new components — they are compositions. This section documents only patterns with direct evidence in the repository (component implementations, documentation files, or product screens). Patterns that appear in the brief but have no repository evidence are listed in §P.0.
>
> For each pattern this section explains: which components are combined, in what sequence, how state is coordinated across them, how focus moves, how errors are recovered, and where the current implementation falls short. Individual component behaviour is not repeated here — refer to the relevant component specification section.
>
> **Notation.** Component names in `code style` refer to the CVP components documented in Parts A–G. Steps marked **Gap** identify cross-component behaviours that no current implementation provides.

---

### P.0 Patterns Without Repository Evidence

The following patterns were requested in the brief but have no current implementation evidence in the repository. They are listed here to close the requirement without inventing unsupported specification.

| Pattern | Status | Notes |
|---|---|---|
| Upload workflow | Not implemented | No file-upload component exists (see Part F absent-components table) |
| Processing workflow | Not implemented | No processing-status component exists |
| Scheduling | Not implemented | No scheduling component; `RailDetails` has no scheduling UI |
| Audience targeting | Not implemented | No audience-segment or targeting-rule component |
| Variant management | Not implemented | No variant-selector component |
| Device/page preview | Not implemented | No preview component |
| Page and rail composition (full) | Partial | `RailDetails` provides an editorial page shell but is a product-specific stub with no formal composition API |

These patterns should each receive a full specification once implementation evidence exists.

---

### P.1 Authentication Form

**Components used:** `LoginSignUp` · `TextInput` · `Select` · `PrimaryButton` · `OutlineButton` · `TextButton`

**See also:** Part G §LoginSignUp

#### Purpose

Present an email/password credential form with optional SSO, an inline account-type selector, and error feedback. Serves as the entry gate to the CVP application.

#### Structure

```
Page wrapper (full-viewport, gradient background)
└── Card container (max-width 440px, centred, backdrop-blur)
    ├── Logo
    ├── Title (h1)
    ├── Subtitle + account Select (inline)
    ├── Form
    │   ├── Email TextInput
    │   ├── Password field (custom input + visibility toggle)
    │   ├── Error message (role="alert", shown when error prop set)
    │   └── Sign In PrimaryButton
    ├── Divider ("OR")
    ├── SSO OutlineButton
    └── Footer (legal links)
```

#### State Transitions

| From | Trigger | To | Visual change |
|---|---|---|---|
| Idle (empty) | User types in both fields | Idle (ready) | Sign In button becomes enabled |
| Idle (ready) | Click Sign In | Loading | All inputs + buttons `disabled`; button text "Signing In…" |
| Loading | `onSignIn` resolves | Idle (empty) or redirect | Loading cleared |
| Loading | `onSignIn` rejects | Error | `error` prop set; `role="alert"` div appears |
| Error | User edits email or password | Error (still shown) | Error persists until next submit — **Gap: error should clear on input change** |

#### Validation and Errors

- Sign In button `disabled` while either email or password field is empty (`disabled={loading || !email || !password}`).
- The component does no format validation of the email field — the consumer's `onSignIn` handler is responsible.
- Error message is a `role="alert"` region; AT announces it automatically on mount.
- **Gap:** When the error appears, focus does not move to it. A screen reader user submitting the form will not hear the error unless they navigate back to it.
- **Gap:** No `aria-live` region for the loading state change.

#### Focus Flow

1. Page load → browser default focus (first focusable element, typically logo or email field).
2. Tab: Email → Password → Show/Hide toggle → Sign In → SSO → legal links.
3. On error: focus remains on Sign In button — **Gap:** should move to `role="alert"` or first invalid field.
4. On loading start: inputs and buttons gain `disabled`; focus remains wherever it was.

#### Keyboard Behaviour

| Key | Target | Action |
|---|---|---|
| `Tab` | Form | Sequential through email → password → toggle → Sign In → SSO → links |
| `Enter` | Form | Submits if Sign In is enabled |
| `Enter` / `Space` | Show/Hide toggle | Toggles password visibility |
| `Enter` | SSO button | Fires `onSSOSignIn` |

#### Responsive Behaviour

- ≤640px: card padding reduces from 32px to 24px.
- All elements remain single-column; no layout changes beyond padding.

#### Accessibility

| Requirement | Current | Gap |
|---|---|---|
| Error region | `role="alert"` | Correct — announced automatically |
| Focus on error | Not implemented | Gap: move focus to alert or first invalid field |
| Password toggle label | `aria-label` switches | Correct |
| Loading announced | Not implemented | Gap: announce "Signing in" to AT |
| Logo alt text | Needs verification | Confirm `<img alt="[platform name]">` or `alt=""` if decorative |

#### Testing Expectations

- Submit button disabled when either field empty.
- Submit fires `onSignIn(email, password)` with correct values.
- `loading={true}` disables all inputs and buttons.
- `error="..."` renders `role="alert"` with error text.
- Password toggle changes input `type` between `password` and `text`.

#### Known Gaps

- Focus not moved to error on validation failure.
- Error does not clear when user edits input.
- Loading state not announced to assistive technology.
- Light/dark theme requires separate component file (see Part G §LoginSignUp unification recommendation).

---

### P.2 Filter Bar

**Components used:** `Filter` · `TextInput` (search) · `IconButton` (view toggle) · `PrimaryButton` / `TextButton` (actions)

**See also:** Part F §Filter, Part D §ContentBrowserModal

#### Purpose

A horizontal toolbar combining keyword search with structured filter controls. Produces a filtered result set from a combination of a text query and one or more named filter conditions. Used above content grids and tables.

#### Structure

```
Filter bar (flex row)
├── Search TextInput (with Search icon prefix)
├── Separator (optional)
├── Filter (dropdown trigger + active chip strip)
├── View mode toggle (IconButton group: Grid / List)
└── Secondary actions (sort, settings, etc.)
```

In `ContentBrowserModal` a collapsible filter drawer sits below the bar and is toggled by a "Filters" button:

```
Filter bar
└── Filter drawer (expanded on demand)
    ├── Genre Select
    ├── Year Select
    ├── Rating Select
    ├── Provider Select
    └── Clear All Filters TextButton
```

#### Behaviour Sequence

1. User types in the search field → results filter in real time against `title` (and other text fields).
2. User opens `Filter` dropdown → selects a filter type → selects a value → chip appears in `Filter`'s chip strip.
3. Both conditions apply: `filteredItems = items.filter(item => matchesText && matchesAllChips)`.
4. "Clear All Filters" removes all chips and resets search — **Gap:** no single "reset" action on the composed filter bar; each must be cleared independently.
5. Result count updates below/beside the bar (not a CVP component — consumer responsibility).

#### State Coordination

The text search and the `Filter` component maintain independent state in the current `ContentBrowserModal` implementation. Neither is aware of the other's state. The parent (`ContentBrowserModal`) combines them into a single `filteredItems` derivation on every render.

**Pattern:** Text search value + `ActiveFilter[]` array → derive filtered list → pass to grid renderer. No shared filter-state container component exists.

#### Focus Flow

1. Page open or modal open → focus moves to search input (`autoFocus` in `ContentBrowserModal`).
2. Tab: search → Filter trigger → view toggles → additional actions.
3. Filter dropdown opens → focus moves to search-within-filter input (`autoFocus`).
4. Escape (in filter dropdown) → **Gap:** Escape not handled — menu does not close.
5. Filter value selected → chip appears → focus stays on the filter trigger (no explicit focus management).

#### Responsive Behaviour

- ≤768px: filter drawer stacks vertically; each filter control goes full-width.
- ≤480px: view mode toggle may be hidden; search takes full width.

#### Accessibility

| Requirement | Current | Gap |
|---|---|---|
| Search input label | Missing `<label>` — placeholder only | Gap: add `aria-label="Search content"` |
| Filter trigger label | `aria-label="Open filter menu"` | Correct |
| Active chip remove | `aria-label="Remove [label] filter"` | Correct |
| Filter menu | No `role="menu"` or `role="listbox"` | Gap — see Part F §Filter |
| Escape closes filter | Not implemented | Gap |
| Result count announced | Not implemented | Gap: add `aria-live="polite"` on result count |

#### Testing Expectations

- Text search reduces visible items to those matching query.
- Chip filter reduces items further (AND logic).
- Clear All resets to full item list.
- Filter chip remove button removes that filter only, leaving others active.

#### Known Gaps

- No single "reset all" that clears both text search and all chips.
- No debounce on text input — real-time filtering may be performance-sensitive on large sets.
- Escape does not close the `Filter` dropdown.
- Search input missing `<label>` or `aria-label`.
- Filter menu missing ARIA roles (see Part F §Filter).

---

### P.3 Data Table Workflow

**Components used:** `Table` · `TextInput` (optional search) · `Filter` (optional) · `PrimaryButton` / `OutlineButton` (bulk actions)

**See also:** Part E §Table

#### Purpose

A structured, interactive data list supporting column sorting, column resizing, row selection, row reordering, row expansion, pagination, and bulk operations on selected rows.

#### Structure

```
Table container
├── Table header (optional: search + action buttons)
│   └── Bulk action bar (visible when rows selected)
├── Table body
│   ├── Header row (sort triggers, resize handles, select-all checkbox)
│   └── Data rows (expandable, draggable, selectable)
└── Table footer (pagination controls)
```

#### Behaviour Sequence — Sort

1. User clicks a sortable column header → `onSort(columnId, 'asc')` fires.
2. Click same column again → `onSort(columnId, 'desc')`.
3. Click a different column → previous sort clears; new column becomes sorted.
4. Visual indicator: `ChevronUp` (asc) / `ChevronDown` (desc) icon in header.

#### Behaviour Sequence — Row Selection

1. User clicks row checkbox → row is added to `selectedRows` Set → `onSelectionChange([...ids])` fires.
2. User clicks select-all header checkbox → all visible-page rows added to `selectedRows`.
   - **Indeterminate state:** when some but not all rows are selected → header checkbox shows indeterminate. **Gap:** `indeterminate` state not implemented on the select-all checkbox (see Part E §Table).
3. Selecting rows reveals the bulk action bar.
4. Deselect all → bulk action bar hides.

#### Behaviour Sequence — Pagination

1. User clicks "Next" → `onPageChange(currentPage + 1)` fires; consumer updates `data` and `currentPage` props.
2. Table does not manage pagination state internally — it is fully controlled.
3. On page change, selection is **not** automatically cleared — consumer responsibility.
4. **Gap:** No "select all across pages" mechanism; `selectedRows` only covers visible rows.

#### Behaviour Sequence — Row Reorder

1. User drags a row via its `GripVertical` handle.
2. Drop fires `onRowReorder(fromIndex, toIndex)`.
3. The component does not reorder `data` internally — consumer updates the data prop.
4. **Gap:** No keyboard reorder alternative (see Part E §Table).

#### Bulk Action Pattern

```
Bulk action bar (appears when selectedRows.size > 0)
├── "[N] rows selected" count
├── PrimaryButton or OutlineButton per action (Delete, Export, Move, etc.)
└── Clear selection TextButton
```

The bulk action bar is **not implemented inside `Table.tsx`** — the Table provides `onSelectionChange` and the consumer is responsible for rendering the action bar. This is a composition gap: the pattern has no canonical placement or styling.

#### State Coordination

| State | Owner | Propagation |
|---|---|---|
| Sort column + direction | Consumer | Props: `sortColumn`, `sortDirection`; Callback: `onSort` |
| Selected rows | Table (internal `Set`) | Callback: `onSelectionChange` |
| Expanded rows | Table (internal `Set`) | No callback — fully internal |
| Current page | Consumer | Props: `currentPage`, `totalItems`; Callback: `onPageChange` |
| Column widths | Table (internal state) | No callback — fully internal |

#### Focus Flow

- Tab: select-all checkbox → column headers → data rows → pagination controls.
- Sortable header: Enter/Space triggers sort — **Gap:** not confirmed for keyboard activation.
- Row checkbox: Space toggles — correct.
- Expand row: **Gap:** no keyboard expand trigger documented.
- Pagination buttons: Tab-reachable — **Gap:** focus ring missing on pagination buttons (see Part E §Table).

#### Accessibility

The `Table` component has a critical semantic HTML gap — the entire table uses `<div>` elements with no `<table>`, `<thead>`, `<th>`, or `<td>`. This is documented in full in Part E §Table. Until that gap is resolved, the Data Table Workflow pattern is not accessible to screen reader users.

#### Testing Expectations

- Sort callback fires with correct column and direction.
- `onSelectionChange` receives array of selected IDs.
- `onPageChange` fires with next/prev page number.
- `onRowReorder` fires with correct from/to indices.
- Deselecting all rows fires `onSelectionChange([])`.

#### Known Gaps

- No semantic HTML (`<table>`) — complete WCAG failure (Part E).
- Indeterminate select-all not implemented.
- No keyboard reorder.
- Bulk action bar is consumer-responsibility with no canonical pattern.
- No "select all across pages" mechanism.
- Focus ring missing on pagination and action buttons.

---

### P.4 Empty State

**Components used:** No dedicated component — inline pattern using layout, icons, typography, and `PrimaryButton` / `TextButton`.

**See also:** Part A §PrimaryButton, Part A §TextButton

#### Purpose

Communicate that a container has no content to show, and (where appropriate) provide a path to remedy that. Three distinct triggers produce empty states:

| Trigger | Message tone | Example |
|---|---|---|
| First use — no data yet | Encouraging | "No content in this rail. Add items to get started." |
| Filter/search — no matches | Helpful | "No matching content found. Try adjusting your filters." |
| Permission / unavailable | Explanatory | "You don't have access to this content." |

#### Structure

```
Empty state container (flex column, centred)
├── Illustration or icon (decorative — aria-hidden)
├── Heading (primary message)
├── Body text (secondary explanation, optional)
└── Action (PrimaryButton or TextButton, optional)
```

#### Repository Evidence

- `RailContentGallery` — Film icon (48px) + "No content in this rail" text + dashed border container.
- `ContentBrowserModal` — Search icon + "Apply filters to find content" heading + "Show Filters" button; or "No matching content found" + "Clear All Filters" button.
- `Filter` → `SegmentQueryConfiguration` — dashed border empty state + link to Technical Resource Center.
- `Table` — no explicit empty state implemented; **Gap.**

#### State Transitions

| From | Trigger | To |
|---|---|---|
| Empty (first use) | Consumer adds items | Populated |
| Populated | Consumer removes all items | Empty (first use) |
| Populated | User applies filters that exclude all results | Empty (no matches) |
| Empty (no matches) | User clears all filters | Populated |
| Empty (no matches) | User clicks "Clear All Filters" CTA | Filter state cleared → Populated |

#### Accessibility

- Illustration / icon: `aria-hidden="true"` — decorative.
- Heading: heading element at the correct level for the section context.
- CTA button: descriptive label; not "Click here".
- The empty container should not receive focus — it is content, not an interactive element.

#### Known Gaps

- No shared empty state component. Each component implements its own layout, icon size, and copy.
- `Table` has no empty state — displays nothing when `data=[]`.
- No consistent icon treatment (Film vs Search vs dashed border varies by component).
- No standard for when to show a CTA vs. explanatory text only.

---

### P.5 Loading State

**Components used:** `PrimaryButton` (loading prop) · shadcn `Skeleton` · `TextInput` (disabled) · `Toggle` (disabled)

**See also:** Part A §PrimaryButton, Appendix A §shadcn/ui Primitives

#### Purpose

Communicate that an asynchronous operation is in progress and prevent duplicate submissions or interaction with stale data.

#### Three Loading Tiers

| Tier | When | Pattern |
|---|---|---|
| **Inline button loading** | Form submit, save, publish | Button text changes or spinner shown; button `disabled` |
| **Form loading** | Full form submission | All inputs `disabled`; button shows loading state |
| **Content loading** | Page or section data fetch | Skeleton placeholders in content area |

#### Repository Evidence — Inline Button Loading

`LoginSignUp`: `loading` prop disables email input, password input, SSO button, and changes Sign In button text. Pattern:

```
loading = true
  → all TextInputs: disabled={loading}
  → PrimaryButton: disabled={loading}, children="Signing In..."
  → OutlineButton (SSO): disabled={loading}
```

No spinner component exists in CVP — the text change is the only loading indicator.

#### Repository Evidence — Content Loading

No CVP loading/skeleton component exists. `ui/skeleton.tsx` (shadcn) is available. For grid content (e.g. `RailContentGallery`, `ContentBrowserModal`), skeleton cards would match the grid item dimensions (120px wide, 2:3 aspect ratio for posters).

#### State Coordination

Loading state must propagate from the form/page root downward to every interactive child:
- All `TextInput`, `TextArea`, `Select`, `MultiSelect`, `Checkbox`, `Toggle` → `disabled`.
- All `PrimaryButton`, `OutlineButton`, `TextButton` → `disabled`.
- The loading source should be a single `isLoading` boolean at the form root, not managed per-field.

#### Focus Behaviour

When loading begins, focus should remain where it is (typically the submit button). When loading ends on error, focus moves to the error region. When loading ends on success, focus moves to the next logical element (e.g. the newly created item, a success toast, or a navigation target).

#### Accessibility

| Requirement | Current | Gap |
|---|---|---|
| Loading state announced | Not implemented | Gap: `aria-live="polite"` region or `aria-busy="true"` on form |
| Button disabled during load | `disabled` attribute | Correct — not in focus order |
| Inputs disabled during load | `disabled` attribute | Correct |
| Loading text change | "Signing In…" | Correct but brief — not announced separately |

#### Known Gaps

- No CVP spinner or loading indicator component.
- No `aria-busy` or `aria-live` announcement for loading state.
- No skeleton component in CVP (shadcn `Skeleton` available but unstated).
- No loading state on `RailContentGallery`, `Table`, or other data-display components.

---

### P.6 Confirmation Flow

**Components used:** `Modal` · `PrimaryButton` (confirm) · `OutlineButton` (cancel)

**See also:** Part D §Modal

#### Purpose

Require explicit user acknowledgement before executing an irreversible or high-impact action. Two sub-patterns: **informational confirmation** (proceed or cancel) and **destructive confirmation** (delete, remove, or discard with a danger-styled confirm action).

#### Structure

```
Modal (triggered by a button in the parent UI)
├── Header
│   ├── Title ("Are you sure?" / "Delete Rail?")
│   └── Close button (X)
├── Content
│   ├── Icon (AlertTriangle for destructive — optional)
│   ├── Description ("This action cannot be undone.")
│   └── Impact summary ("This will affect 47 episodes across 3 rails.")
└── Footer
    ├── Cancel (OutlineButton)
    └── Confirm (PrimaryButton — or danger-styled for destructive)
```

#### Behaviour Sequence

1. User triggers a high-impact action (e.g. clicks "Delete Rail" or "Discard Changes").
2. `Modal` opens. Focus moves to the Modal — **Gap:** focus trap and initial focus not implemented (see Part D §Modal). The focus should move to the Cancel button (safest default) or the modal container.
3. User reads description and impact summary.
4. User clicks **Cancel** → Modal closes; original action is abandoned; focus returns to the trigger element.
5. User clicks **Confirm** → Modal enters loading state (Confirm button shows loading, Cancel `disabled`) → action executes → Modal closes on success; on failure, error shown inside modal.
6. User presses **Escape** → same as Cancel.

#### Destructive Confirmation Variant

For irreversible actions (delete, remove), the Confirm button must use a danger / destructive visual style:
- Button background: `var(--cvp-color-danger-default)` (or equivalent).
- Optional icon: `Trash2` or `AlertTriangle` in button.

**Gap:** No `danger` variant exists on `PrimaryButton`. The component has no `variant="danger"` prop. Destructive confirmation currently requires the consumer to override button styling — not token-tracked.

#### Async Confirmation State

```
User clicks Confirm
  → Confirm button: loading state (disabled, text "Deleting…")
  → Cancel button: disabled (prevent race condition)
  → On success: Modal closes; success Toast shown
  → On failure: Modal stays open; error message shown inside Modal
```

**Gap:** The `Modal` component has no built-in loading state. The consumer must manage button state and error display within the modal `children` slot.

#### Focus Management

| Moment | Required behaviour | Current |
|---|---|---|
| Modal opens | Focus moves to Cancel button (safe default) or modal container | Not implemented — Gap |
| User presses Tab | Focus cycles within modal | Not implemented (no focus trap) — Gap |
| User presses Escape | Modal closes; focus returns to trigger | Escape closes modal; return to trigger not implemented — Gap |
| Modal closes (success/cancel) | Focus returns to trigger element | Not implemented — Gap |

#### Accessibility

All focus management gaps are documented in Part D §Modal. Until the focus trap is implemented, the Confirmation Flow pattern fails WCAG 2.1 §2.4.3 (Focus Order) for modal dialogs.

#### Testing Expectations

- Confirm button fires the destructive action callback.
- Cancel button fires close callback without the action.
- Escape closes the modal.
- Loading state disables both buttons during async confirmation.
- Error state shows error text inside modal without closing it.
- On success, Modal closes and parent state updates.

---

### P.7 Save and Publish

**Components used:** `PrimaryButton` (Save Changes) · `OutlineButton` (Preview, Duplicate) · `NotificationBanner` · `Toast`

**See also:** Part G §RailDetails, Part D §NotificationBanner, Part D §Toast

#### Purpose

Allow an editor to persist changes to an editorial object (rail, page, segment configuration) and optionally publish those changes to a live audience. The pattern manages the lifecycle from unsaved draft → saved draft → published live.

#### Structure (from RailDetails)

```
Content header (flex row)
├── Title section
│   ├── h1 (rail/page name)
│   ├── Status badges (Active, Editorial, CAR-002)
│   └── Metadata (Collection, Position, Items)
└── Action group (flex row, right-aligned)
    ├── OutlineButton "Duplicate" (Copy icon)
    ├── OutlineButton "Preview" (Eye icon)
    └── PrimaryButton "Save Changes" (Save icon)
```

#### State Transitions

| State | Visual | Available actions |
|---|---|---|
| Clean (no unsaved changes) | "Save Changes" disabled | Duplicate, Preview |
| Dirty (unsaved changes present) | "Save Changes" enabled | All three |
| Saving | "Save Changes" loading; all buttons disabled | None |
| Saved | NotificationBanner or Toast confirmation | Duplicate, Preview, Save (disabled) |
| Save failed | Error Toast or inline error | All three; save re-enabled |

**Gap:** `RailDetails` has no unsaved-changes detection. The "Save Changes" button is always visible but has no `onClick` handler. The dirty/clean state distinction is not implemented.

#### Unsaved Changes Guard

When a user navigates away with unsaved changes, a confirmation dialog should appear:

```
Modal (confirmation)
├── Title: "Unsaved changes"
├── Content: "You have unsaved changes that will be lost."
└── Footer
    ├── OutlineButton "Keep editing"
    └── PrimaryButton "Discard changes" (danger style)
```

**Gap:** No unsaved-changes guard exists in the repository. The component does not track field-level changes. Implementation requires:
1. A `isDirty` boolean tracking whether any form value differs from the last saved state.
2. A `beforeunload` event listener (for browser navigation).
3. An interceptor for in-app navigation (React Router's `useBlocker` or equivalent).

#### Publish vs. Save

The distinction between Save (persist draft) and Publish (make live) is a product-rule decision not reflected in the current implementation. `RailDetails` uses only "Save Changes". A full Save + Publish pattern requires:

| Action | Effect | Button style |
|---|---|---|
| Save | Persists draft; does not change live audience | OutlineButton |
| Publish | Saves + deploys to live audience | PrimaryButton |
| Schedule | Saves + schedules future publish | OutlineButton with calendar icon |

**Gap:** None of these distinctions are implemented.

#### Focus Flow

After clicking "Save Changes":
1. Button enters loading state.
2. On success: focus returns to "Save Changes" button (now disabled); Toast appears (announced via `role="alert"`).
3. On failure: focus moves to error region or Toast (if the Toast announces via `role="alert"`).

#### Accessibility

| Requirement | Current | Gap |
|---|---|---|
| Save button label | "Save Changes" with visible text | Correct |
| Save loading state | Not implemented | Gap: needs `aria-busy`, disabled, loading text |
| Success announcement | Not implemented | Gap: need Toast with `role="alert"` |
| Unsaved changes announced | Not implemented | Gap |

#### Testing Expectations

- Save button fires `onSave` callback.
- Loading state disables all action buttons.
- On save success: `NotificationBanner` or Toast appears with success message.
- On save failure: error shown; save button re-enabled.
- Duplicate fires `onDuplicate`; opens duplicate in new context.
- Preview fires `onPreview`; opens a view-only rendering.

---

### P.8 Query Builder

**Components used:** `SegmentQueryConfiguration` · `Modal` · `Select` · `TextInput` · `PrimaryButton` · `OutlineButton`

**See also:** Part F §SegmentQueryConfiguration, Part D §Modal

#### Purpose

Allow an editor to construct a structured boolean query — a sort field, sort direction, and a set of filter conditions connected by AND/OR logical operators — to define the content selection for a rail or segment.

#### Structure

```
Trigger button (in parent editorial view)
└── Modal (maxWidth 800px)
    ├── Header: "Segment Query Configuration"
    └── Content
        ├── Sort section
        │   ├── Label "Sort By"
        │   ├── Select (field: pubdate, title, author, etc.)
        │   └── Direction toggle button (ASC / DESC)
        ├── Filters section
        │   ├── Label "Filters" + "Add Filter" button
        │   ├── [Empty state — dashed border with help link]
        │   └── For each FilterCondition:
        │       ├── [Logical operator button — AND/OR — if not first row]
        │       ├── Select (field)
        │       ├── Select (operator)
        │       ├── TextInput (value)
        │       └── Remove button (×)
        └── Footer
            ├── OutlineButton "Cancel"
            └── PrimaryButton "Apply Query"
```

#### Behaviour Sequence

1. Editor opens the Modal via a trigger in the rail configuration sidebar.
2. Editor selects a sort field and direction.
3. Editor clicks "Add Filter" → a new condition row appears with default field/operator/value.
4. Editor fills in the field, operator, and value for each condition.
5. Between rows, an AND/OR toggle button controls the logical relationship.
6. Editor clicks "Apply Query" → `onApply(config)` fires → Modal closes.
7. Editor clicks "Cancel" → Modal closes; **Gap:** config state is not reset (see Part F §SegmentQueryConfiguration).

#### State Coordination

- `config` state lives inside `SegmentQueryConfiguration`. The parent does not manage individual filter conditions.
- `initialConfig` prop sets the starting state on mount only (derived state anti-pattern — see Part F).
- `logicalOperators` array has length `filters.length - 1`; the array is kept in sync on add/remove.
- Filter ID generation uses `(filters.length + 1).toString()` — ID collision risk on remove/re-add (see Part F).

#### Condition Add/Remove

| Action | State change |
|---|---|
| "Add Filter" | Appends new `FilterCondition` with defaults; appends new `LogicalOperator` if not first |
| Remove (×) on row | Removes condition; removes the adjacent `LogicalOperator`; all minimum 1 condition enforced? — **Gap:** no minimum enforcement confirmed |
| Toggle AND/OR | Updates `logicalOperators[index].type` |

#### Focus Flow

1. Modal opens → **Gap:** focus not moved to Modal (see Part D §Modal).
2. Tab within modal: Sort Select → Sort direction button → first field Select → first operator Select → first value TextInput → Remove button → logical operator button → next row → … → Add Filter button → Cancel → Apply Query.
3. "Add Filter" → new row appends; **Gap:** focus does not move to the new row's field Select.
4. Remove (×) → row removed; **Gap:** focus does not move to the row above.
5. Cancel / Apply → Modal closes; **Gap:** focus not returned to trigger.

#### Accessibility

All focus management gaps are inherited from `Modal` (see Part D §Modal). Additional gaps specific to this pattern:

| Requirement | Current | Gap |
|---|---|---|
| Focus on new condition row | Not implemented | Gap: focus should move to new row's field Select |
| Focus on row remove | Not implemented | Gap: focus should move to previous row or "Add Filter" |
| Logical operator label | `aria-label="Toggle logical operator. Current: AND"` | Correct |
| Sort direction label | `aria-label` not confirmed | Verify |
| Remove button specificity | `aria-label="Remove filter"` (not field-specific) | Gap: include field name |

#### Testing Expectations

- Adding a filter row increments `config.filters.length`.
- Removing a row decrements both `config.filters` and `config.logicalOperators`.
- Toggling AND/OR updates the correct `logicalOperators[index].type`.
- "Apply Query" fires `onApply` with the current config.
- Cancel fires `onCancel` without applying changes.
- ID collision: add 3, remove middle, add 1 → no duplicate IDs.

---

### P.9 Progressive Disclosure

**Components used:** `Accordion` · `Tabs` · `TextButton` (show more/show less)

**See also:** Part E (Accordion addendum), Part C §Tabs

#### Purpose

Reveal complexity incrementally — show the minimal required information first, expose additional detail on demand. Prevents cognitive overload in configuration-heavy interfaces.

#### Three Disclosure Tiers

| Tier | Mechanism | Used in |
|---|---|---|
| Section collapse | `Accordion` (single/multiple) | `RailDetails` sidebar configuration sections (Listing Filters, Showing Type, etc.) |
| Context switch | `Tabs` | `RailDetails` sidebar (Base / Configuration tabs) |
| Inline expand | Custom toggle button + CSS height | `ContentBrowserModal` filter drawer expand |

#### Accordion Pattern (from RailDetails sidebar)

The configuration sidebar uses `Accordion` in `multiple` mode so all sections can be open simultaneously. Each section contains a form-like set of controls (Select dropdowns, radio-style buttons). The accordion collapse preserves values inside collapsed sections — no data loss on collapse.

**Focus behaviour after collapse:** When a section is collapsed, any focused element inside it becomes hidden but not `inert`. Screen readers may still read hidden content — **Gap:** collapsed `Accordion` content regions are not `inert` or `aria-hidden`.

**Gap:** The accordion height animation is broken (see Accordion addendum). Sections appear/disappear without animation.

#### Tabs Pattern (from RailDetails)

Tabs separate the rail configuration into Base (content source, queries) and Configuration (format, availability). The Base tab contains frequently used settings; the Configuration tab contains advanced settings rarely changed. This split follows the principle that defaults live in Base, overrides live in Configuration.

The `Tabs` component uses `activeTab` + `onTabChange` for controlled behaviour. State inside each tab panel is preserved when switching tabs.

#### Inline Expand Pattern (from ContentBrowserModal)

A "Filters ↑/↓" button with `ChevronUp`/`ChevronDown` icon toggles a filter drawer. The toggle uses `filtersExpanded` state in `ContentBrowserModal`. The drawer slides in using a CSS animation — no Accordion component is used. This pattern is a one-off implementation, not using a shared disclosure primitive.

**Gap:** This pattern is duplicated in multiple places without a shared primitive. `Tabs`, `Accordion`, and ad-hoc inline toggles all solve the same problem with different implementations.

#### Keyboard Behaviour

| Pattern | Key | Action |
|---|---|---|
| Accordion header | Enter/Space | Toggle section |
| Accordion header | Tab | Next header |
| Tabs | Arrow keys | Switch tab (WAI-ARIA Tabs pattern) |
| Tabs | Tab | Move focus into tab panel |
| Inline expand button | Enter/Space | Toggle drawer |

#### Known Gaps

- Accordion height animation broken.
- Collapsed accordion content not `inert` or `aria-hidden`.
- Accordion missing `Home`/`End`/arrow key navigation.
- No shared primitive for inline expand — `ContentBrowserModal` uses a custom implementation.

---

### P.10 Master-Detail Layout

**Components used:** `Layout` · `Tabs` · `Accordion` · `Breadcrumbs` · `PrimaryButton` · `OutlineButton`

**See also:** Part G §Layout, Part C §Tabs, Part C §Breadcrumbs

#### Purpose

Present a two-panel view where the left panel provides context (navigation, search results, or configuration) and the right panel displays or allows editing of the selected item's detail. The split-panel layout is the primary composition model for CVP editorial management screens.

#### Structure (from RailDetails)

```
Application shell
├── HeaderNavigation (full width, top)
└── Body (flex row)
    ├── Sidebar panel (200px, Layout left panel)
    │   ├── Panel header "Rail Manager"
    │   ├── Tabs (Base | Configuration)
    │   └── Tab content (Accordion sections)
    └── Content panel (flex-1, Layout right panel)
        ├── Breadcrumbs (top of panel)
        ├── Content header
        │   ├── h1 title
        │   ├── Status badges
        │   ├── Metadata (key-value)
        │   └── Action buttons (Duplicate, Preview, Save)
        └── Content body
            ├── RailContentGallery (display variant)
            └── NotificationBanner
```

#### Selection Coordination

In a canonical master-detail pattern, selecting an item in the left panel updates the right panel. In the current `RailDetails` implementation the left panel (sidebar) contains configuration controls rather than a list of selectable items — there is no list-to-detail navigation. The `Layout` component exposes an `onResize` callback but no `onItemSelect` coordination across panels.

**Gap:** No shared selection-coordination mechanism. In a true master-detail (e.g. list of rails on the left, rail detail on the right), the consumer must wire left-panel `onSelect` to a right-panel content prop. No CVP component handles this cross-panel state.

#### Responsive Collapse

| Breakpoint | Change |
|---|---|
| ≤1024px | Content header stacks vertically |
| ≤768px | Sidebar narrows to 180px |
| ≤640px | Sidebar hidden (`display: none`); hamburger/back navigation required |

**Gap:** When the sidebar is hidden at ≤640px, there is no navigation mechanism to access the sidebar content. A `Sheet` or `Drawer` overlay is the standard solution — neither is implemented.

#### Focus Flow Across Panels

- Tab naturally crosses panel boundaries (left panel → right panel) since both panels are in document order.
- There is no explicit panel-to-panel focus jump shortcut (e.g. skip-link for "Jump to configuration").
- **Gap:** No skip link between panels.

#### Known Gaps

- No cross-panel selection coordination mechanism.
- Sidebar hidden at ≤640px with no mobile navigation substitute.
- No skip link between panels.
- Left panel `<aside>` lacks `aria-label`.
- Right panel lacks `role="main"` (see Part G §Layout).

---

### P.11 Navigation Shell

**Components used:** `HeaderNavigation` · `PageSideNav` · `Breadcrumbs` · `Layout`

**See also:** Part C §HeaderNavigation, Part C §PageSideNav, Part C §Breadcrumbs, Part G §Layout

#### Purpose

Provide persistent global navigation (horizontal top bar + optional vertical sidebar) with contextual wayfinding (breadcrumbs). The shell wraps all product screens.

#### Structure

```
<html>
└── Application root
    ├── HeaderNavigation (position: fixed or sticky; full width)
    │   ├── Logo / brand
    │   ├── Account selector
    │   ├── Team selector
    │   └── User menu (avatar + dropdown)
    ├── Body (flex row; padding-top = header height)
    │   ├── PageSideNav (fixed left; 240px; full height)
    │   │   └── sections[] with items, icons, badges
    │   └── Main content (flex: 1; margin-left = sidebar width)
    │       ├── Breadcrumbs (top of each content page)
    │       └── Page content
    └── Toast region (fixed, bottom-right)
```

#### Evidence

`App.tsx` implements this shell using `DesignSystemNav` (the internal documentation navigation) rather than the publishable `PageSideNav`. The pattern is directly evidenced by:
- `DesignSystemNav` = position fixed left, 240px, full height scroll.
- `HeaderNavigation` = full-width top bar with account/team/user dropdowns.
- URL state synced to `?page=` query parameter via `window.history.pushState`.

#### State Coordination

| State | Owner | Coordination |
|---|---|---|
| Active navigation item | `PageSideNav` (via `sections[].items[].active` prop) | Parent manages active item; updates on route change |
| Account selection | `HeaderNavigation` (via `onAccountChange`) | Consumer updates global auth context |
| Team selection | `HeaderNavigation` (via `onTeamChange`) | Consumer updates global team context |
| User menu open | `HeaderNavigation` (internal) | Dropdown managed internally |
| Page content | Consumer | Driven by active navigation item |

#### Responsive Navigation

| Breakpoint | Change |
|---|---|
| ≥1024px | Side nav visible; main content inset |
| ≤768px | Side nav hidden; hamburger button required |
| ≤640px | Side nav hidden; header may collapse |

**Gap:** No mobile navigation is implemented. At ≤768px the `PageSideNav` disappears with no hamburger, drawer, or sheet alternative. A mobile user has no way to navigate. The shadcn `Sheet` primitive is available for a slide-in mobile nav drawer but is not wired.

#### Focus Management

- On page navigation: focus should move to the main content region heading — **Gap:** no focus management on route change.
- Skip link: "Skip to main content" should be the first focusable element in the shell — **Gap:** not implemented.
- The `HeaderNavigation` dropdown menus trap focus incorrectly (see Part C §HeaderNavigation for gap details).

#### Accessibility

| Requirement | Current | Gap |
|---|---|---|
| Skip to main | Not implemented | Critical — required for WCAG 2.4.1 |
| `<main>` landmark | Not present | Add `<main>` wrapping page content |
| `<nav>` landmark | `HeaderNavigation` and `PageSideNav` | Needs `aria-label` to distinguish |
| Mobile nav | Not implemented | Sheet/Drawer required at ≤768px |
| Focus on route change | Not implemented | Move focus to `<main>` or page heading |

---

### P.12 Media Browsing and Selection

**Components used:** `ContentBrowserModal` · `RailContentGallery` (display-grid-selectable) · `PrimaryButton` · `OutlineButton` · `TextInput` (search) · `Select` (filter dropdowns)

**See also:** Part D §ContentBrowserModal, Part F §RailContentGallery

#### Purpose

Allow an editor to browse a media library, filter by metadata attributes, and select one or more content items for inclusion in a rail or editorial object.

#### Two Entry Points

| Entry point | Component | Use case |
|---|---|---|
| Modal asset picker | `ContentBrowserModal` | Adding content to an empty or existing rail from any editorial screen |
| Inline selectable grid | `RailContentGallery` (display-grid-selectable) | Selecting content items that are already staged in a rail |

#### ContentBrowserModal Pattern

**Behaviour sequence:**
1. Editor clicks "Add Content" or similar trigger → `ContentBrowserModal` opens.
2. Search and filter controls appear at the top.
3. Editor types a search term → filtered grid updates in real time.
4. Editor expands the filter drawer → applies Genre / Year / Rating / Provider filters.
5. Items matching all criteria appear in the grid (2:3 poster tiles).
6. Editor clicks an item → checkbox toggles; item added to `selectedItems`.
7. Selected-but-filtered-out items appear in the "Selection Reference" strip below the grid.
8. Editor paginates through results to find more items.
9. Editor clicks "Add Selected (N)" → `onConfirm(selectedIds)` fires → Modal closes.

**Pagination + selection note:** Selection persists across page changes within the modal. Items selected on page 1 remain selected when viewing page 2. The selection reference strip shows items selected on hidden/filtered pages.

**Focus flow in modal:** See Part D §ContentBrowserModal and Part D §Modal focus gaps. The modal has no focus trap.

#### RailContentGallery Selectable Pattern

**Behaviour sequence:**
1. `RailContentGallery` renders in `display-grid-selectable` variant.
2. Editor hovers over an item → checkbox overlay appears.
3. Editor clicks → item added to `selectedItems`; `onSelectionChange([...ids])` fires.
4. Editor uses bulk action controls (provided by parent) to act on selection.

**Gap:** The selection checkbox has no ARIA role, state, or label (see Part F §RailContentGallery). Keyboard selection is not accessible.

#### Coordination Between Entry Points

When `ContentBrowserModal` is used to add items to a rail, the selected IDs must be merged with the existing `RailContentGallery` items by the parent consumer. No automated sync mechanism exists. The consumer:
1. Opens `ContentBrowserModal` with existing item IDs pre-selected (via `defaultSelected` or `selectedItems` prop).
2. Receives `onConfirm(ids)`.
3. Updates the `RailContentGallery` `items` prop with the merged set.

**Gap:** No standard diff/merge utility exists. If an editor adds 5 items via the modal and removes 2 via the gallery, the parent must reconcile both operations.

#### Accessibility

| Requirement | Current | Gap |
|---|---|---|
| Selection checkbox ARIA | Missing on gallery selectable | Gap — see Part F §RailContentGallery |
| Selection count announced | Not implemented | Gap: announce "N items selected" via `aria-live` |
| Focus trap in ContentBrowserModal | Not implemented | Gap — see Part D §Modal |
| Item thumbnail alt text | Correct in ContentBrowserModal | ContentBrowserModal: verify alt text format |

---

### P.13 Editorial Configuration

**Components used:** `Tabs` · `Accordion` · `Select` · `Toggle` · `Segmented` · `TextInput` · `PrimaryButton`

**See also:** Part C §Tabs, Accordion addendum, Part B §Select, Part G §RailDetails

#### Purpose

Present the configuration interface for an editorial object (a rail, a page, a segment) through a structured set of controls, grouped by concern and progressively disclosed. Allow the editor to define content sources, format rules, and availability constraints without being overwhelmed by all settings at once.

#### Structure (from RailDetails sidebar)

```
Sidebar panel (200px)
├── Tabs
│   ├── Base tab
│   │   ├── Accordion section: "Rail"
│   │   │   └── (Select, TextInput controls)
│   │   ├── Accordion section: "Content Query"
│   │   ├── Accordion section: "Rails Collections"
│   │   └── Accordion section: "Query Items"
│   └── Configuration tab
│       ├── Accordion section: "Listing Filters"
│       ├── Accordion section: "Rating Type"
│       ├── Accordion section: "Living Format"
│       ├── Accordion section: "Showing Type"
│       │   └── Inline toggle group (Full / Partial / Preview / Teaser)
│       ├── Accordion section: "Media Filters"
│       ├── Accordion section: "Availability Slots"
│       └── Accordion section: "Movie Format"
```

#### State Coordination

- Each accordion section independently tracks its expanded/collapsed state (Accordion `multiple` mode).
- Tabs preserve section state when switching — a collapsed section in Base tab remains collapsed when returning to it.
- Changes within section controls are buffered in component state until "Save Changes" is clicked.
- **Gap:** No change-tracking mechanism. If the editor modifies a control in "Listing Filters" and then switches tabs, there is no visual indicator that unsaved changes exist in the hidden tab.

#### Interaction with Save

All configuration changes across both tabs are saved together when "Save Changes" fires in the main content header. The configuration panel is not self-contained — it has no local save. This means editors can make conflicting changes in different sections and not discover the conflict until save validation.

**Gap:** No cross-section validation. No indication of which sections contain unsaved changes.

#### Known Gaps

- Sidebar accordion sections are UI stubs — no real form controls; all sections show placeholder labels (see Part G §RailDetails).
- No unsaved-change tracking within sections.
- No cross-section validation.
- Sidebar hidden at ≤640px with no mobile substitute.
- Accordion height animation broken.

---

### P.14 Bulk Selection and Actions

**Components used:** `Table` · `Checkbox` (select-all) · `PrimaryButton` / `OutlineButton` / `TextButton` (bulk actions)

**See also:** Part E §Table, P.3 §Data Table Workflow

#### Purpose

Allow the editor to select multiple rows from a data set and apply a single operation (delete, export, move, publish) to all selected items simultaneously.

#### Structure

```
Table with selection column
├── Select-all Checkbox (header row)
├── Per-row Checkbox (each data row)
└── Bulk action bar (appears when selection > 0)
    ├── "[N] items selected"
    ├── Action buttons (Delete, Export, Move…)
    └── TextButton "Clear selection"
```

#### Behaviour Sequence

1. Editor clicks a row checkbox → row selected; bulk action bar appears.
2. Editor clicks select-all → all visible rows selected.
3. Editor selects an action (e.g. "Delete [N] items") → Confirmation flow (P.6) triggered.
4. On confirm → action executes; selection cleared; rows removed from data; success Toast shown.
5. "Clear selection" → all rows deselected; bulk action bar hides.

#### Select-All State

| `selectedRows` count | `data` count | Select-all checkbox state |
|---|---|---|
| 0 | Any | Unchecked |
| 1 to (count - 1) | Any | Indeterminate |
| Equal to count | Any | Checked |

**Gap:** The `Table` component does not implement the indeterminate state on the select-all checkbox (see Part E §Table). The checkbox visually shows either checked or unchecked only.

#### Cross-Page Selection

The `Table` component manages selection internally. Pagination changes clear the visible page; items selected on previous pages are lost unless the consumer tracks a separate multi-page selection state.

**Gap:** No multi-page selection mechanism. "Select all 1,243 results" (selecting across all pages) is not implemented.

#### Bulk Action Bar Placement

The `Table` does not render a bulk action bar. The consumer must render it above or below the table based on `onSelectionChange`. No canonical CVP styling exists for the bulk action bar.

#### Accessibility

| Requirement | Current | Gap |
|---|---|---|
| Selection count announced | Not implemented | Gap: `aria-live` announcement of "N items selected" |
| Indeterminate checkbox | Not implemented | Gap — see Part E §Table |
| Bulk action bar focus | Not implemented | Gap: focus should move to bulk action bar on first selection |
| Action button labels | Consumer-defined | Verify: labels describe the action + count ("Delete 5 items") |

---

### P.15 Pattern Coverage Summary

| Pattern | Evidence | Components | Accessibility | Storybook example |
|---|---|---|---|---|
| P.1 Authentication Form | `LoginSignUp.tsx` | 5 | Partial — focus on error missing | None |
| P.2 Filter Bar | `ContentBrowserModal.tsx`, `Filter.tsx` | 4 | Partial — search label, Escape, menu ARIA | None |
| P.3 Data Table Workflow | `Table.tsx` | 2–5 | Critical gap — no semantic HTML | None |
| P.4 Empty State | `RailContentGallery`, `ContentBrowserModal`, `SegmentQueryConfiguration` | None dedicated | Partial | None |
| P.5 Loading State | `LoginSignUp.tsx` | 3 | Partial — no AT announcement | None |
| P.6 Confirmation Flow | `Modal.tsx`, `ModalDocumentation.tsx` | 2 | Critical gap — no focus trap | None |
| P.7 Save and Publish | `RailDetails.tsx` | 2–3 | Gap — no loading/dirty state | None |
| P.8 Query Builder | `SegmentQueryConfiguration.tsx` | 5 | Critical gap — inherits Modal gaps | None |
| P.9 Progressive Disclosure | `RailDetails.tsx`, `Accordion`, `Tabs` | 3 | Partial — collapsed content not inert | None |
| P.10 Master-Detail Layout | `RailDetails.tsx`, `Layout.tsx` | 4+ | Gap — no skip link, no mobile nav | None |
| P.11 Navigation Shell | `App.tsx`, `HeaderNavigation`, `PageSideNav` | 3 | Critical — no skip link, no mobile nav | None |
| P.12 Media Browsing and Selection | `ContentBrowserModal.tsx`, `RailContentGallery` | 4+ | Partial — modal focus trap missing | None |
| P.13 Editorial Configuration | `RailDetails.tsx` sidebar | 4 | Partial — stub only | None |
| P.14 Bulk Selection and Actions | `Table.tsx` | 2–4 | Gap — no indeterminate, no live region | None |

**Universal gap:** No Storybook stories exist for any pattern. Pattern-level stories (compositions of multiple components) are distinct from component stories and should be filed as "Patterns" in a dedicated Storybook section.

*Design Patterns section complete.*
