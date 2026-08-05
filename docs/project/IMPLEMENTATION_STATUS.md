# CVP Token Architecture — Implementation Status

**Last updated: 2026-08-05**

This document tracks implementation progress. For stable architecture documentation see `docs/tokens/CVP_TOKEN_ARCHITECTURE.md`.

## Latest delivery — Filter and Date Picker

- Rebuilt Filter as a focused clause composer using the canonical input and menu contracts.
- Removed the embedded calendar implementation and extracted Date Picker into its own component, navigation page, token contract, and visual review surface.
- Standardized single, range, optional-time, bounded, disabled, clause, search, value-editor, and dual-theme states.
- Refined Filter clause readability and introduced a theme-safe Date Picker time-selection dialog for consistent hour/minute selection.
- Added `docs/handoffs/components/FILTER_DATE_PICKER_STANDARDIZATION.md` engineering handoff.

## Latest delivery — Multi Select

- Rebuilt Multi Select on the canonical input and menu token contracts, removing embedded styles and global legacy focus overrides.
- Standardized labels, descriptions, errors, tags, search, listbox states, limits, creation, bulk actions, hidden form values, and keyboard focus behavior.
- Rebalanced the shared semantic input-border role to remain subtle in both themes while retaining strong focus and validation state boundaries.
- Added complete dual-theme visual documentation and `docs/handoffs/components/MULTI_SELECT_STANDARDIZATION.md` engineering handoff.

## Latest delivery — Checkbox

- Replaced embedded legacy styling with the registered `--cvp-checkbox-*` Tier 3 contract.
- Restored native binary activation, deterministic IDs, DOM indeterminate state, composed descriptions, errors, and grouped-form semantics.
- Added complete light/dark visual documentation and `docs/handoffs/components/CHECKBOX_STANDARDIZATION.md` engineering handoff.

## Latest delivery — Misc Input

- Defined Misc Input as the advanced single-line field above the canonical Text Input base.
- Standardized slots, copy, counting, four validation states, focus, disabled, and DOM associations.
- Added visual documentation and `docs/handoffs/components/MISC_INPUT_STANDARDIZATION.md` engineering handoff.

## Latest delivery — Text Button

- Promoted six legacy class-based styles into explicit semantic variants.
- Corrected disabled-link, toggle, active-nav, loading, focus, and theme behavior.
- Added visual documentation and `docs/handoffs/components/TEXT_BUTTON_STANDARDIZATION.md` engineering handoff.

## Latest delivery — Icon Button with Text

- Replaced inline hardcoded action-card styling with the canonical `--cvp-button-icon-text-*` contract.
- Standardized compact and M layouts, complete states, loading, theme parity, and visible naming.
- Added visual documentation and `docs/handoffs/components/ICON_BUTTON_WITH_TEXT_STANDARDIZATION.md` engineering handoff.

## Latest delivery — Icon Small Button

- Consolidated Icon Small Button into a compatibility wrapper over canonical Icon Button at 24px.
- Removed manual focus suppression and registered the compact remove-overlay token contract.
- Added visual documentation and `docs/handoffs/components/ICON_SMALL_BUTTON_STANDARDIZATION.md` engineering handoff.

## Latest delivery — Icon Button

- Replaced inline legacy styling with the canonical `--cvp-button-icon-*` contract.
- Standardized targets, variants, focus, loading, disabled behavior, and accessible naming.
- Added visual documentation and `docs/handoffs/components/ICON_BUTTON_STANDARDIZATION.md` engineering handoff.

## Latest delivery — Outline Button

- Replaced legacy inline styling with the canonical `--cvp-button-outline-*` contract.
- Standardized state surfaces, focus, loading, dimensions, compact and dotted variants.
- Added visual documentation and `docs/handoffs/components/OUTLINE_BUTTON_STANDARDIZATION.md` engineering handoff.

## Latest delivery — Secondary Button

- Replaced legacy inline styles and unregistered aliases with the canonical `--cvp-button-secondary-*` contract.
- Standardized interaction states and dimensions across light and dark themes.
- Added a visual token contract and `docs/handoffs/components/SECONDARY_BUTTON_STANDARDIZATION.md` engineering handoff.

## Latest delivery — Primary Button

- Migrated Primary Button from inline legacy CSS to the canonical Tier 3 button contract.
- Added loading behavior, explicit state selectors, governed sizes, theme parity, and reduced-motion handling.
- Added visual Token Contract documentation and `docs/handoffs/components/PRIMARY_BUTTON_STANDARDIZATION.md` engineering handoff.

---

## 1. Delivered Files

| File | Tier | Status | Notes |
|------|------|--------|-------|
| `src/styles/tokens/cvp-primitives.css` | 1 — Primitive | ✅ Expanded | Raw values: colour, spacing, typography, radius, border width, shadow dimensions, depth, motion, opacity, z-index |
| `src/styles/tokens/cvp-semantic-tokens.css` | 2 — Semantic | ✅ Expanded | Full light + dark color, density spacing, shape roles, border recipes, elevation planes, and theme-aware focus/shadows |
| `src/styles/tokens/cvp-component-tokens.css` | 3 — Component | 🔄 Active migration | Existing override surfaces retained; pilot components and foundation contracts now resolve through Tier 2 |
| `src/styles/tokens/cvp-alias-bridge.css` | Migration | ✅ Complete | All 53 `--tc-*` production tokens aliased to `--cvp-*`. Zero breaking changes. |

---

## 2. Phase Progress

| Phase | Description | Status | Notes |
|-------|-------------|--------|-------|
| Phase 0 — Freeze & Audit | Catalogue token and hardcoded-value usage | 🔄 In progress | Initial inventory and CSV audit delivered; lint enforcement remains |
| Phase 1 — Alias Layer | New token files + bridge | ✅ Complete | |
| Phase 2 — Non-colour Tokens + Pilots | Foundation graph + Button, Input, Modal pilots | 🔄 In progress | All seven completed foundations reconciled into canonical tiers |
| Phase 3 — Full Component Migration | All components on `--cvp-*`; lint to error | 🔄 In progress | Text Input standardized as the reference form-control pattern |
| Phase 4 — Cleanup | Bridge file deleted; v2.0 published | ⏳ Not started | Requires Phase 3 |

---

## 3. Outstanding Work

Ordered by priority:

1. **Complete Phase 0 enforcement** — Extend the delivered component inventory and token CSV with lint warnings for new hardcoded values and deprecated tokens.
2. **Stylelint enforcement** — Write/configure the `no-unregistered-token` and `no-deprecated-token` rules (see TOKEN_GOVERNANCE.md). Effort: ~2 days.
3. **Storybook arg tables** — Map each component's component tokens to Storybook argTypes controls. Effort: ~1 day per component.
4. **Visual regression suite** — Chromatic or Percy snapshots for all components in both themes before Phase 3 begins. Effort: ~1 week setup.
5. **Customer override validation script** — CI script that runs contrast checks against all customer/partner token overrides. Effort: ~3 days.
6. **CHANGELOG.md** — Create the token changelog file and log the v1.0 → v1.1 changes made during this refactor.

## 6. Foundation reconciliation — 2026-08-04

- Activated the canonical chain in production import order: alias bridge → component tokens → semantic tokens → primitives.
- Absorbed the new Spacing, Radius, Border, and Elevation foundations into the existing three tiers.
- Retained `cvp-spacing.css` and `cvp-radius.css` only as temporary aliases for un-migrated generic variables.
- Retained the existing `--tc-*` bridge unchanged; it remains scheduled for deletion only after Phase 3 reaches zero direct references.
- Theme-resolved focus colors now use the accessible dark and light mappings established during the Color and Border phases.
- Layout and Motion must extend these canonical files rather than introduce parallel token sources.
- Layout Foundation added canonical breakpoint, grid, pane, and content-width tokens; all completed Foundation previews now consume the live production graph as visual audit surfaces.

## 7. Component standardization — 2026-08-04

- Text Input is the first completed Phase 3 component and establishes the shared form-control conventions.
- Removed component-local embedded tokens and styles; the implementation now consumes Tier 3 `--cvp-input-*` tokens exclusively.
- Replaced random IDs with React `useId`, restored native `required`, composed consumer and internal descriptions, and standardized error semantics.
- Documented default, hover, focus, filled, read-only, required, invalid, and disabled states; compact/default density; and nested light/dark theme parity.
- Full engineering handoff: `docs/handoffs/components/TEXT_INPUT_STANDARDIZATION.md`.
- Text Area and Select now share the same field anatomy, validation wiring, theme resolution, and density rules; Select also establishes the custom listbox keyboard model.
- Full engineering handoff: `docs/handoffs/components/TEXT_AREA_SELECT_STANDARDIZATION.md`.

---

## 4. Architecture Decisions Made During Implementation

| Decision | Rationale |
|----------|-----------|
| `--cvp-color-brand-hover` not `--cvp-color-brand-default-hover` | `-default-` infix redundant at brand level; matches `--cvp-color-secondary-hover` |
| `--tc-text-disabled-bold` aliased to `--cvp-color-surface-hover` | No documented use case; prevents hard failure during migration |
| Overlay surface hover/selected tokens in theme selectors not `:root` | These values vary by theme, so they must live inside `[data-theme]` blocks |
| `--tc-border-default` mapped to static `--cvp-color-border-default` | `color-mix()` computed values fail in SVG, native apps, and Storybook args |
| Component-context colour tokens (`--cvp-color-nav-*`, `--cvp-color-input-*` etc.) kept in semantic layer | They vary by theme, so they belong in semantic file; component tokens reference them |
| `rgba()` interactive overlay values promoted to semantic tokens | `--cvp-color-interactive-overlay` etc. allow component tokens to stay primitive-free |

---

## 5. How to Import

```css
/* Activate everything (production — includes migration shim): */
@import 'src/styles/tokens/cvp-alias-bridge.css';

/* New projects (no migration shim needed): */
@import 'src/styles/tokens/cvp-component-tokens.css';
```
