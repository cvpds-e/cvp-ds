# CVP Token Architecture Proposal
**Cloud Video Platform — Design Systems Architecture**
Version 1.0 · Prepared for Product, Design & Engineering review

---

## Executive Summary

The CVP production token system (`--tc-*`) was built organically around a single dark theme. It works, but it does not scale: it conflates surfaces with backgrounds, mixes semantic and implementation concerns, has no light-theme support, no component-level tokens, and covers only colour — leaving spacing, typography, motion, elevation, radius, and z-index entirely outside the token graph.

The DESIGN.md is significantly more mature. It already defines semantic foundations across all token categories for both light and dark themes, with full component specifications and WCAG contrast validation.

This proposal closes the gap. It does not replace the production system overnight. It defines a three-tier architecture, a naming convention that scales to hundreds of tokens and multiple customer themes, a concrete migration table for every existing `--tc-*` token, and a phased migration plan designed to let production components continue working throughout.

---

## Table of Contents

1. [Evaluation of Current Production Tokens](#1-evaluation-of-current-production-tokens)
2. [Proposed Token Architecture](#2-proposed-token-architecture)
3. [Token Taxonomy](#3-token-taxonomy)
4. [Naming Convention](#4-naming-convention)
5. [Token Mapping (Migration Table)](#5-token-mapping-migration-table)
6. [Missing Tokens](#6-missing-tokens)
7. [Component Consumption Model](#7-component-consumption-model)
8. [Theme Strategy](#8-theme-strategy)
9. [Governance](#9-governance)
10. [Migration Roadmap](#10-migration-roadmap)

---

## 1. Evaluation of Current Production Tokens

### 1.1 What Works Well

| Strength | Detail |
|---|---|
| Consistent namespace | All tokens use `--tc-` prefix — clear separation from framework tokens |
| Semantic intent is present | Names like `bg-brand`, `text-danger`, `border-focused` describe purpose, not value |
| Icon and border categories exist | Rare to see icon tokens explicitly defined; this is good practice |
| Hover states are tokenised | `bg-brand-hovered`, `bg-secondary-hovered` show state awareness |
| Danger/success/warning semantic groups | Core state semantics are present |

### 1.2 Where Naming Is Inconsistent

| Issue | Example | Problem |
|---|---|---|
| `bg` and `surface` are separate categories that describe the same thing | `--tc-bg-subtle` vs `--tc-surface-default` | Engineers don't know which to reach for |
| State suffixes are inconsistent | `bg-brand-hovered` (hyphenated) but `surface-overlay-hovered` (nested compound) | No consistent state suffix pattern |
| `bold` carries two different meanings | `--tc-bg-bold` = a mid-grey background; `--tc-text-bold` = a text lightness level | Same word, different semantic roles |
| Accent text has three sub-levels with colour names | `text-accent-blue-subtle`, `text-accent-blue-subtlest`, `text-accent-indigo-default` | Colour names leak into semantic tokens; subtlest/subtle/default hierarchy is undefined |
| `blanket` is an orphan | `--tc-blanket` has no category prefix | Cannot be found by scanning category groups |
| `disabled-bold` is unexplained | `--tc-text-disabled-bold` has no design.md equivalent and no documented use | Creates ambiguity |

### 1.3 Where Responsibilities Overlap

| Overlap | Tokens | Recommendation |
|---|---|---|
| Background vs Surface | `--tc-bg-subtle (#252528)` and `--tc-surface-default (#19191b)` both describe background fills | Merge into a single `surface` category with an elevation scale |
| Hover backgrounds | `--tc-bg-hovered (#292a2e)` and `--tc-surface-overlay-hovered (#333333)` both describe hover fills | Distinguish by elevation level, not by category split |
| Focus and selected borders | `--tc-border-focused (#67b3fb)` and `--tc-border-selected (#6f8be6)` are very close in use | Should be named `border-focus` and `border-focus-ring` to clarify the two-part focus pattern |

### 1.4 Implementation-Specific vs Semantic Tokens

| Token | Problem |
|---|---|
| `--tc-border-default: color-mix(in srgb, #d0d0d3 10%, transparent)` | Computed value in a token — cannot be consumed in all contexts (SVG, native, Storybook args). Tokens should be static values. |
| `--tc-bg-disabled: #a1a1a8` | `#a1a1a8` is a text / foreground colour in the design system. Using it as a background `disabled` value is semantically incorrect and will produce contrast failures. |
| `--tc-text-accent-sky-default / subtle` | "sky" is a colour name, not a semantic role. Semantic tokens should not leak colour names. |
| `--tc-surface-overlay-selected: #45454a` | Conflates overlay surface and selection state in one token name. Hard to compose. |

### 1.5 Coverage Gaps

The production token set covers **colour only**. Entirely absent:

- Spacing scale
- Typography scale (size, weight, line-height, letter-spacing)
- Border radius scale
- Shadow / elevation scale
- Motion / transition scale
- Z-index scale
- Opacity scale
- Focus ring pattern (tokenised, not just `--tc-border-focused`)

---

## 2. Proposed Token Architecture

### 2.1 Three-Tier Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│  TIER 1 — PRIMITIVE TOKENS                              │
│  Raw values. Not consumed directly by components.       │
│  e.g. --cvp-primitive-blue-600: #3d63dd                 │
│       --cvp-primitive-space-4: 16px                     │
│       --cvp-primitive-radius-md: 6px                    │
└────────────────────┬────────────────────────────────────┘
                     │ referenced by
┌────────────────────▼────────────────────────────────────┐
│  TIER 2 — SEMANTIC TOKENS                               │
│  Purpose-named aliases. Theme-switchable.               │
│  e.g. --cvp-color-surface-default                       │
│       --cvp-color-text-primary                          │
│       --cvp-space-component-padding-md                  │
└────────────────────┬────────────────────────────────────┘
                     │ referenced by
┌────────────────────▼────────────────────────────────────┐
│  TIER 3 — COMPONENT TOKENS                              │
│  Per-component overrides. Consume semantic tokens.      │
│  e.g. --cvp-button-primary-bg                           │
│       --cvp-input-border-color                          │
│       --cvp-table-row-hover-bg                          │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Why This Hierarchy

**Primitives** establish the design palette — they are the only place raw hex values appear. When a brand colour changes, one primitive changes and all semantic tokens that reference it update automatically.

**Semantic tokens** carry meaning. They are the only tokens that components reference directly (via component tokens). Because they are theme-switchable (different values under `[data-theme="light"]` and `[data-theme="dark"]`), components never need conditional logic.

**Component tokens** provide override points for white-label customers or partner branding without altering the global semantic layer. A customer can change `--cvp-button-primary-bg` without touching `--cvp-color-brand-default`.

### 2.3 Theme Switching Mechanism

```css
/* Primitives — theme-neutral, defined once */
:root {
  --cvp-primitive-blue-600: #3d63dd;
  --cvp-primitive-blue-700: #244cce;
  /* ... */
}

/* Semantic tokens — light theme values */
[data-theme="light"] {
  --cvp-color-surface-default: #ffffff;
  --cvp-color-text-primary: #111827;
  --cvp-color-brand-default: var(--cvp-primitive-blue-600);
}

/* Semantic tokens — dark theme values */
[data-theme="dark"] {
  --cvp-color-surface-default: #14141a;
  --cvp-color-text-primary: #ffffff;
  --cvp-color-brand-default: var(--cvp-primitive-blue-600);
}

/* Component tokens — reference semantic layer */
:root {
  --cvp-button-primary-bg: var(--cvp-color-brand-default);
  --cvp-button-primary-text: var(--cvp-color-text-inverse);
}
```

---

## 3. Token Taxonomy

The full taxonomy. Categories marked ★ are not yet covered in the production `--tc-*` token set.

### 3.1 Color

| Sub-category | Description |
|---|---|
| `color-surface` | Page, card, panel, sunken, raised, overlay backgrounds |
| `color-text` | Primary, secondary, muted, disabled, inverse, link |
| `color-text-state` | Error, success, warning, info text |
| `color-text-accent` | Accent text variants (brand-only, not colour-named) |
| `color-border` | Subtle, default, strong, error, disabled |
| `color-focus` | Focus ring and focus glow |
| `color-icon` | Default, strong, muted, disabled, inverse, error |
| `color-brand` | Primary brand, hover, active |
| `color-secondary` | Secondary brand, hover, active |
| `color-state` | State triplets (bg + border + text) for error / success / warning / info |
| `color-overlay` | Scrim / blanket for modal backdrops |
| `color-interactive` | Hover fill, active fill, disabled fill for generic interactive elements |

### 3.2 Surface ★ (merged into `color-surface`)

Surface tokens replace the dual `bg-*` / `surface-*` split. Defined by elevation level:

| Token | Role |
|---|---|
| `color-surface-page` | Root page background |
| `color-surface-default` | Cards, panels at base level |
| `color-surface-raised` | Elevated cards, popovers |
| `color-surface-sunken` | Inset areas, code blocks |
| `color-surface-overlay` | Menus, tooltips, dropdowns |
| `color-surface-disabled` | Disabled input/button fill |
| `color-surface-hover` | Hover fill for rows and items |
| `color-surface-active` | Pressed fill |
| `color-surface-scrim` | Modal backdrop |

### 3.3 Typography ★

| Sub-category | Tokens |
|---|---|
| `font-family` | `sans`, `mono` |
| `font-size` | `xs` (12), `sm` (13), `md` (14), `lg` (15), `xl` (18), `2xl` (24), `3xl` (32) |
| `font-weight` | `regular` (400), `medium` (500), `semibold` (600), `bold` (700) |
| `line-height` | `tight` (16), `snug` (20), `normal` (22), `relaxed` (28), `loose` (32), `xl` (40) |
| `letter-spacing` | `tight` (0.1px), `normal` (0.15px), `none` (0px), `wide` (0.5px) |

### 3.4 Spacing ★

Base unit: 8px. All values are multiples of 4px.

| Token | Value |
|---|---|
| `space-0` | 0px |
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |

### 3.5 Radius ★

| Token | Value | Use |
|---|---|---|
| `radius-xs` | 2px | Checkboxes, badges |
| `radius-sm` | 4px | Buttons, inputs, chips |
| `radius-md` | 6px | Cards, menus, gallery items |
| `radius-lg` | 8px | Panels |
| `radius-xl` | 12px | Modals |
| `radius-full` | 9999px | Pills, avatars |

### 3.6 Elevation / Shadow ★

| Token | Light | Dark |
|---|---|---|
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | `0 1px 3px rgba(0,0,0,0.40)` |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | `0 4px 12px rgba(0,0,0,0.40)` |
| `shadow-lg` | `0 8px 32px rgba(0,0,0,0.10)` | `0 8px 32px rgba(0,0,0,0.50)` |
| `shadow-modal` | `0 8px 32px rgba(0,0,0,0.12)` | `0 8px 32px rgba(0,0,0,0.60)` |

### 3.7 Motion ★

| Token | Value | Use |
|---|---|---|
| `motion-duration-fast` | 150ms | Hover colour changes |
| `motion-duration-base` | 250ms | Background/border fills |
| `motion-duration-slow` | 350ms | Panel open/close |
| `motion-duration-bounce` | 500ms | Toast entry |
| `motion-easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default easing |
| `motion-easing-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy entry |

### 3.8 Focus ★

| Token | Value |
|---|---|
| `focus-ring-color` | `#67b3fb` |
| `focus-border-color` | `#6f8be6` |
| `focus-glow-color` | `rgba(111, 139, 230, 0.25)` |
| `focus-ring-width` | `2px` |
| `focus-glow-spread` | `3px` |

### 3.9 Z-Index ★

| Token | Value | Layer |
|---|---|---|
| `z-base` | 0 | Default content |
| `z-sticky` | 10 | Sticky headers |
| `z-dropdown` | 100 | Menus, popovers |
| `z-overlay` | 1000 | Modals, drawers |
| `z-toast` | 2000 | Notifications |

### 3.10 Opacity ★

| Token | Value | Use |
|---|---|---|
| `opacity-disabled` | 0.5 | Disabled component overlays |
| `opacity-placeholder` | 0.6 | Placeholder icons in empty states |
| `opacity-scrim-light` | 0.45 | Modal backdrop (light theme) |
| `opacity-scrim-dark` | 0.75 | Modal backdrop (dark theme) |

---

## 4. Naming Convention

### 4.1 Pattern

```
--cvp-[tier]-[category]-[variant]-[modifier]
```

| Segment | Values | Notes |
|---|---|---|
| `cvp` | fixed | Product namespace. Prevents collision with Tailwind, Radix, or customer CSS |
| `tier` | `primitive`, `color`, `space`, `radius`, `shadow`, `motion`, `z`, `opacity`, or a component name | `color`, `space` etc. are semantic tier; component names are component tier |
| `category` | `surface`, `text`, `border`, `icon`, `brand`, `focus`, `state`, `interactive` | Describes the token's role |
| `variant` | `primary`, `secondary`, `muted`, `subtle`, `inverse`, `error`, `success`, `warning`, `info` | Describes the specific use within the category |
| `modifier` | `hover`, `active`, `focus`, `disabled`, `selected` | Interactive state |

### 4.2 Examples

| Token | Tier | Meaning |
|---|---|---|
| `--cvp-primitive-blue-600` | Primitive | Raw blue value, step 600 |
| `--cvp-color-surface-raised` | Semantic | Elevated surface background |
| `--cvp-color-text-primary` | Semantic | Highest-contrast text |
| `--cvp-color-border-focus` | Semantic | Border on focused elements |
| `--cvp-button-primary-bg` | Component | Primary button background |
| `--cvp-button-primary-bg-hover` | Component | Primary button hover state |
| `--cvp-input-border-color` | Component | Text input border |
| `--cvp-table-row-bg-hover` | Component | Table row hover fill |

### 4.3 Rationale

**Why `cvp-` namespace?** Prevents collisions. CSS custom properties are global. Any token without a product namespace can silently override a framework or third-party library token.

**Why no colour names in semantic tokens?** `--cvp-color-text-accent-sky-subtle` tells engineers about the visual colour, not the purpose. If the brand colour changes from blue to teal, the token name becomes wrong. `--cvp-color-text-accent-subtle` is stable across rebrands.

**Why compound category+variant rather than deeply nested?** `--cvp-color-surface-raised` is easier to autocomplete in IDEs than `--cvp-color.surface.raised`. CSS custom properties don't support dot notation — hyphens at each tier boundary give the same scanning benefit.

**Why separate component tokens?** They are the customer/partner override surface. A white-label customer should be able to change `--cvp-button-primary-bg` without editing the global `--cvp-color-brand-default`. Component tokens also make Storybook arg-table documentation trivial — each component's overrideable surface is explicit.

**AI-readability:** Structured `[tier]-[category]-[variant]-[modifier]` naming is parseable by language models. An AI generating a new component can confidently select `--cvp-color-surface-raised` for an elevated card without needing prose documentation, because the token's role is encoded in its name.

### 4.4 Theme Support Model

```
Customer theme overrides (Tier 3 component tokens only)
         ↓
Platform dark/light theme (Tier 2 semantic tokens, via data-theme)
         ↓
CVP primitive palette (Tier 1, defined once in :root)
```

Customers override component tokens. The platform controls semantic tokens. Primitives never change except via a formal design system release.

---

## 5. Token Mapping (Migration Table)

Every current `--tc-*` production token mapped to the proposed architecture.

**Status definitions:**
- **Keep** — name and value are correct, add `cvp-` alias
- **Rename** — semantically correct purpose, non-conforming name
- **Alias** — keep old token, add new token pointing to same value (zero breaking change)
- **Deprecate** — token has no clear semantic purpose or is duplicated
- **Split** — one token should become two or more with distinct purposes
- **Merge** — two tokens should consolidate into one

| Existing Token | Value | Proposed Token | Category | Status | Notes |
|---|---|---|---|---|---|
| `--tc-bg-accent-purple` | `#c084fc` | `--cvp-color-brand-accent` | `color / brand` | Rename | "Purple" leaks colour name; rename to purpose |
| `--tc-bg-bold` | `#d0d0d3` | `--cvp-color-surface-bold` | `color / surface` | Rename | "bold" as surface level is valid; align to category |
| `--tc-bg-brand` | `#3d63dd` | `--cvp-color-brand-default` | `color / brand` | Rename | Surface prefix wrong — this is a brand fill, not a surface |
| `--tc-bg-brand-hovered` | `#244cce` | `--cvp-color-brand-default-hover` | `color / brand` | Rename | State suffix standardised to `-hover` |
| `--tc-bg-danger` | `#c51b20` | `--cvp-color-state-danger-bg` | `color / state` | Rename | Align to bg+border+text triplet pattern |
| `--tc-bg-danger-hovered` | `#a8171b` | `--cvp-color-state-danger-bg-hover` | `color / state` | Rename | — |
| `--tc-bg-disabled` | `#a1a1a8` | `--cvp-color-text-disabled` | `color / text` | **Split** | Value `#a1a1a8` is a foreground/text colour. Add `--cvp-color-surface-disabled` with correct background value separately |
| `--tc-bg-hovered` | `#292a2e` | `--cvp-color-surface-hover` | `color / surface` | Rename | Generic hover fill → surface category |
| `--tc-bg-inverse` | `#ffffff` | `--cvp-color-surface-inverse` | `color / surface` | Rename | — |
| `--tc-bg-secondary` | `#2d4a8e` | `--cvp-color-secondary-default` | `color / brand` | Rename | Brand secondary fill, not a surface |
| `--tc-bg-secondary-hovered` | `#1f3566` | `--cvp-color-secondary-default-hover` | `color / brand` | Rename | — |
| `--tc-bg-subtle` | `#252528` | `--cvp-color-surface-subtle` | `color / surface` | Rename | — |
| `--tc-blanket` | `rgba(0,0,0,0.5)` | `--cvp-color-overlay-scrim` | `color / overlay` | Rename | Orphan token; give it a category |
| `--tc-border-bold` | `#bbbbbb` | `--cvp-color-border-strong` | `color / border` | Rename | `bold` → `strong` to align with design.md |
| `--tc-border-brand` | `#3d63dd` | `--cvp-color-border-brand` | `color / border` | Keep | Semantically correct |
| `--tc-border-danger` | `#e6494e` | `--cvp-color-border-danger` | `color / border` | Keep | Semantically correct |
| `--tc-border-default` | `color-mix(...)` | `--cvp-color-border-default` | `color / border` | **Split** | Replace computed value with static `rgba(255,255,255,0.08)` for dark and `#e5e7eb` for light. Cannot use `color-mix` in all contexts. |
| `--tc-border-focused` | `#67b3fb` | `--cvp-focus-ring-color` | `focus` | Rename | Focus tokens are their own category |
| `--tc-border-selected` | `#6f8be6` | `--cvp-focus-border-color` | `focus` | Rename | Second part of the two-part focus pattern |
| `--tc-border-subtle` | `#45454a` | `--cvp-color-border-subtle` | `color / border` | Rename | Align category |
| `--tc-border-success` | `#3dc155` | `--cvp-color-border-success` | `color / border` | Keep | Semantically correct |
| `--tc-border-warning` | `#f4983b` | `--cvp-color-border-warning` | `color / border` | Keep | Semantically correct |
| `--tc-icon-brand` | `#3d63dd` | `--cvp-color-icon-brand` | `color / icon` | Rename | Align namespace |
| `--tc-icon-danger` | `#e6494e` | `--cvp-color-icon-danger` | `color / icon` | Rename | Align namespace |
| `--tc-icon-default` | `#bbbbbb` | `--cvp-color-icon-default` | `color / icon` | Rename | Align namespace |
| `--tc-icon-success` | `#3dc155` | `--cvp-color-icon-success` | `color / icon` | Rename | Align namespace |
| `--tc-icon-warning` | `#f4983b` | `--cvp-color-icon-warning` | `color / icon` | Rename | Align namespace |
| `--tc-surface-default` | `#19191b` | `--cvp-color-surface-default` | `color / surface` | **Merge** | Merge `--tc-bg-*` and `--tc-surface-*` under unified `surface` category |
| `--tc-surface-overlay-default` | `#292a2e` | `--cvp-color-surface-overlay` | `color / surface` | Rename | — |
| `--tc-surface-overlay-hovered` | `#333333` | `--cvp-color-surface-overlay-hover` | `color / surface` | Rename | Suffix standardised |
| `--tc-surface-overlay-selected` | `#45454a` | `--cvp-color-surface-overlay-selected` | `color / surface` | Keep | Semantically clear |
| `--tc-text-accent-blue-subtle` | `#6f8be6` | `--cvp-color-text-accent-subtle` | `color / text` | **Rename** | Remove colour name from semantic token |
| `--tc-text-accent-blue-subtlest` | `#cdd7f6` | `--cvp-color-text-accent-subtlest` | `color / text` | **Rename** | Remove colour name |
| `--tc-text-accent-indigo-default` | `#1f3566` | `--cvp-color-text-accent-muted` | `color / text` | **Rename** | Map to purpose level, not colour |
| `--tc-text-accent-indigo-subtle` | `#2d4a8e` | `--cvp-color-text-accent-secondary` | `color / text` | **Rename** | — |
| `--tc-text-accent-indigo-subtlest` | `#97a9de` | `--cvp-color-text-accent-default` | `color / text` | **Rename** | The primary accent text colour |
| `--tc-text-accent-sky-default` | `#359afa` | `--cvp-color-text-link-hover` | `color / text` | **Rename** | Purpose is link hover, not a standalone accent |
| `--tc-text-accent-sky-subtle` | `#67b3fb` | `--cvp-color-text-link-default` | `color / text` | **Rename** | This is the standard link/accent text colour |
| `--tc-text-bold` | `#a4a4a4` | `--cvp-color-text-secondary` | `color / text` | Rename | "bold" here means secondary brightness; align to design.md |
| `--tc-text-brand` | `#3d63dd` | `--cvp-color-text-brand` | `color / text` | Keep | — |
| `--tc-text-danger` | `#e6494e` | `--cvp-color-text-danger` | `color / text` | Keep | — |
| `--tc-text-default` | `#ffffff` | `--cvp-color-text-primary` | `color / text` | Rename | `default` → `primary` aligns with design.md |
| `--tc-text-disabled` | `#bbbbbb` | `--cvp-color-text-disabled` | `color / text` | Keep | — |
| `--tc-text-disabled-bold` | `#292a2e` | — | — | **Deprecate** | No documented use case. If needed, introduce as `text-on-disabled-bg` with explanation |
| `--tc-text-inverse` | `#19191b` | `--cvp-color-text-inverse` | `color / text` | Rename | Align namespace |
| `--tc-text-subtle` | `#606060` | `--cvp-color-text-muted` | `color / text` | Rename | `subtle` → `muted` aligns with design.md |
| `--tc-text-success` | `#3dc155` | `--cvp-color-text-success` | `color / text` | Keep | — |
| `--tc-text-warning` | `#f4983b` | `--cvp-color-text-warning` | `color / text` | Keep | — |

---

## 6. Missing Tokens

Tokens required by the DESIGN.md that do not exist in production. Prioritised high → low.

### Priority 1 — Blocking (required for theme switching)

| Token | Proposed Name | Reason |
|---|---|---|
| Light surface backgrounds | `--cvp-color-surface-page` through `--cvp-color-surface-active` (light values) | Production is dark-only. No light theme possible without these. |
| Light text colours | `--cvp-color-text-primary` (light: `#111827`) | Ditto |
| Light border colours | `--cvp-color-border-default` (light: `#e5e7eb`) | Ditto |
| Light icon colours | `--cvp-color-icon-default` (light: `#6b7280`) | Ditto |
| State bg + text for light theme | `--cvp-color-state-error-bg`, `-text`, `-border` (light values) | State indicators broken in light theme |

### Priority 2 — High (required for component build-out)

| Token | Proposed Name | Reason |
|---|---|---|
| Focus ring (two-part) | `--cvp-focus-ring-color`, `--cvp-focus-border-color`, `--cvp-focus-glow-color` | Currently split across `--tc-border-focused` and `--tc-border-selected` with no glow token |
| Input tokens | `--cvp-input-bg`, `--cvp-input-border`, `--cvp-input-border-hover`, `--cvp-input-placeholder` | No input-specific tokens in production |
| Nav tokens | `--cvp-color-nav-bg`, `--cvp-color-nav-text`, `--cvp-color-nav-item-hover-bg` | No nav tokens in production |
| Chip/Tag tokens | `--cvp-color-chip-bg`, `--cvp-color-chip-border`, `--cvp-color-chip-text` | No chip tokens |
| Modal tokens | `--cvp-color-modal-bg`, `--cvp-color-modal-border` | No modal tokens |
| Breadcrumb tokens | `--cvp-color-breadcrumb-text`, `--cvp-color-breadcrumb-active` | No breadcrumb tokens |

### Priority 3 — Medium (design system completeness)

| Token | Proposed Name |
|---|---|
| Spacing scale | `--cvp-space-1` through `--cvp-space-12` |
| Typography scale | `--cvp-font-size-xs` through `--cvp-font-size-3xl` |
| Border radius scale | `--cvp-radius-xs` through `--cvp-radius-full` |
| Shadow scale | `--cvp-shadow-sm` through `--cvp-shadow-modal` |

### Priority 4 — Low (platform maturity)

| Token | Proposed Name |
|---|---|
| Motion/duration | `--cvp-motion-duration-fast` through `--cvp-motion-duration-bounce` |
| Motion easing | `--cvp-motion-easing-standard`, `--cvp-motion-easing-bounce` |
| Z-index | `--cvp-z-dropdown`, `--cvp-z-overlay`, `--cvp-z-toast` |
| Opacity | `--cvp-opacity-disabled`, `--cvp-opacity-placeholder` |

---

## 7. Component Consumption Model

Components must never reference primitive or production `--tc-*` tokens directly. The consumption chain is:

```
Component JSX / CSS
        ↓
Component Token          (--cvp-button-primary-bg)
        ↓                 resolves to ↓
Semantic Token           (--cvp-color-brand-default)
        ↓                 resolves to ↓
Primitive Token          (--cvp-primitive-blue-600)
        ↓                 resolves to ↓
Theme value              #3d63dd
```

### 7.1 CSS Implementation

```css
/* Semantic layer — theme switches this */
[data-theme="dark"] {
  --cvp-color-brand-default: var(--cvp-primitive-blue-600);
  --cvp-color-surface-default: #14141a;
}

[data-theme="light"] {
  --cvp-color-brand-default: var(--cvp-primitive-blue-600);
  --cvp-color-surface-default: #ffffff;
}

/* Component token layer — customer can override this */
:root {
  --cvp-button-primary-bg:       var(--cvp-color-brand-default);
  --cvp-button-primary-bg-hover: var(--cvp-color-brand-default-hover);
  --cvp-button-primary-text:     var(--cvp-color-text-inverse);
}

/* Component CSS — references component tokens only */
.cvp-button-primary {
  background-color: var(--cvp-button-primary-bg);
  color:            var(--cvp-button-primary-text);
}

.cvp-button-primary:hover {
  background-color: var(--cvp-button-primary-bg-hover);
}
```

### 7.2 Storybook Integration

Component tokens become Storybook args. Each token that a component exposes maps to a control in the arg table:

```ts
// Button.stories.ts
export default {
  title: 'Components/Button',
  argTypes: {
    '--cvp-button-primary-bg': {
      control: 'color',
      description: 'Primary button background. Defaults to --cvp-color-brand-default.'
    }
  }
}
```

This makes the component's full override surface discoverable without reading source code.

### 7.3 AI Component Contract

The token structure enables structured component contracts for AI-assisted generation:

```json
{
  "component": "Button",
  "variant": "primary",
  "tokens": {
    "background":       "--cvp-button-primary-bg",
    "background-hover": "--cvp-button-primary-bg-hover",
    "text":             "--cvp-button-primary-text",
    "border-radius":    "--cvp-radius-sm",
    "padding-x":        "--cvp-space-4",
    "padding-y":        "--cvp-space-2",
    "font-size":        "--cvp-font-size-md",
    "font-weight":      "--cvp-font-weight-medium",
    "focus-ring":       "--cvp-focus-ring-color"
  },
  "states": ["default", "hover", "focus", "active", "disabled"],
  "themes": ["light", "dark"]
}
```

An AI can generate a correct implementation from this contract without hallucinating values.

---

## 8. Theme Strategy

### 8.1 Platform Themes (Light / Dark)

Implemented via `data-theme` attribute on `<html>`. Semantic tokens resolve to different values per theme. Components require zero conditional logic.

```
html[data-theme="light"] → light semantic values
html[data-theme="dark"]  → dark semantic values
```

Theme preference persists to `localStorage`. Respects `prefers-color-scheme` as the default when no preference is stored.

### 8.2 White-Label Customers

Customers receive a **component token override file** only. They cannot access or override semantic tokens (which would break WCAG compliance guarantees) or primitives (which would break the design language).

```css
/* customer-acme.css — the only file the customer ships */
:root {
  --cvp-button-primary-bg:        #e63946;  /* Acme red */
  --cvp-button-primary-bg-hover:  #c1121f;
  --cvp-color-brand-default:      #e63946;  /* extends to all brand surfaces */
}
```

**Constraint enforced by governance:** Customers may override component tokens and `color-brand-*` tokens only. Any override must pass a WCAG AA contrast check against the pairing semantic token before shipping.

### 8.3 Partner Branding

Partners with deeper customisation needs (font family, full colour palette) receive a **primitive override file**:

```css
/* partner-acme-primitives.css */
:root {
  --cvp-primitive-brand-500: #e63946;
  --cvp-primitive-brand-600: #c1121f;
  --cvp-primitive-brand-700: #9d0208;
  --cvp-font-family-sans: 'Acme Sans', sans-serif;
}
```

Primitive overrides cascade through semantic and component tokens automatically. No component CSS changes needed.

### 8.4 Accessibility Guarantees

- Semantic tokens are validated for WCAG AA at release time against both light and dark themes.
- Customer overrides are validated in CI using a contrast-check script before merging.
- Component tokens that are overrideable are documented with their required contrast ratio against the background they pair with.
- Dark-mode scrim opacity (`0.75`) is higher than light-mode (`0.45`) to ensure modal separation meets contrast requirements on dark backgrounds.

### 8.5 Runtime Theming

The three-tier CSS custom property architecture supports runtime theme switching with no JavaScript bundle changes — the browser resolves the cascade at render time. For dynamic customer themes (e.g., fetched from a CMS), inject a `<style>` tag with component token overrides into `<head>` at runtime:

```ts
function applyCustomerTheme(tokens: Record<string, string>) {
  const style = document.createElement('style');
  style.id = 'cvp-customer-theme';
  style.textContent = `:root { ${Object.entries(tokens).map(([k, v]) => `${k}: ${v}`).join('; ')} }`;
  document.head.appendChild(style);
}
```

---

## 9. Governance

### 9.1 Token Ownership

| Token tier | Owner | Review required |
|---|---|---|
| Primitive | Design Systems team | Design + Engineering lead |
| Semantic | Design Systems team | Design + Engineering lead |
| Component | Feature team (per component) | Design Systems team review |
| Customer override | Customer / Partner | Automated contrast check + Design Systems spot audit |

### 9.2 Introducing New Tokens

A new token proposal requires:

1. **Justification:** Why can't an existing token be used or extended?
2. **Category placement:** Which tier and category does it belong to?
3. **Both-theme values:** Light and dark values must both be defined before merging.
4. **WCAG validation:** Contrast check against every token it will pair with.
5. **Documentation:** Entry in DESIGN.md and Storybook before the token ships to production.
6. **Migration note:** If it supersedes an existing token, a deprecation timeline is included.

### 9.3 Versioning

Token releases follow **semantic versioning**:

- **Patch (1.0.x):** Value correction for a token without renaming it.
- **Minor (1.x.0):** New tokens added; no existing tokens changed.
- **Major (x.0.0):** Tokens renamed, removed, or restructured. Requires migration guide.

Token versions are tracked in a `CHANGELOG.md` alongside DESIGN.md.

### 9.4 Deprecation

Deprecated tokens:
1. Are marked `@deprecated` in CSS comments with a pointer to the replacement.
2. Remain in production for a minimum of **two minor releases** (approximately 6–8 weeks).
3. Trigger a lint warning in the codebase via a custom ESLint / Stylelint rule.
4. Are removed in the next major release.

```css
/* @deprecated — use --cvp-color-text-primary instead. Removed in v2.0. */
--tc-text-default: var(--cvp-color-text-primary);
```

### 9.5 Preventing Duplication

Before proposing a token, engineers must:
1. Search the token registry (Storybook / DESIGN.md) for an existing token that covers the use case.
2. Check whether a component token override is sufficient before proposing a new semantic token.
3. Get Design Systems team sign-off if no existing token fits.

A Stylelint rule rejects any CSS custom property prefixed `--cvp-` that is not in the approved token registry.

### 9.6 Documentation

- **DESIGN.md** — single source of truth for specifications (values, usage, WCAG notes).
- **Storybook** — live component catalogue with token arg tables and interactive theme switching.
- **CHANGELOG.md** — version history for every token change.
- **CVP_TOKEN_ARCHITECTURE.md** (this document) — architectural rationale and migration plan.

---

## 10. Migration Roadmap

### Phase 0 — Freeze & Audit (1–2 weeks)

**Objective:** Establish a stable baseline. Stop the bleeding.

| Task | Detail |
|---|---|
| Freeze new `--tc-*` tokens | No new production tokens added until Phase 1 completes |
| Audit all components | Catalogue every component and which `--tc-*` tokens it references |
| Document the audit | Record results in a shared spreadsheet linked from DESIGN.md |
| Set up lint rule | Warn (not error) on any new hardcoded hex value in component CSS |

**Output:** Full audit of `--tc-*` token usage per component.  
**Effort:** 1 engineer, 1 week.  
**Risk:** Low.  
**Dependencies:** None.

---

### Phase 1 — Alias Layer (2–3 weeks)

**Objective:** Introduce the new `--cvp-*` token names as aliases for existing values. Zero breaking changes. Production components continue to work.

| Task | Detail |
|---|---|
| Define all semantic tokens | Write `--cvp-color-*` tokens for dark theme first (matches current production) |
| Create alias bridge | Each `--tc-*` token becomes `var(--cvp-*)` — old names still resolve |
| Define missing light-theme values | Write light-theme semantic token values (from DESIGN.md) |
| Add `data-theme` switching | Hook theme switcher component to `[data-theme]` attribute |
| Publish to Storybook | Document all new tokens with light/dark preview |

```css
/* Phase 1 alias bridge — zero breakage */
:root {
  --tc-text-default:    var(--cvp-color-text-primary);
  --tc-bg-brand:        var(--cvp-color-brand-default);
  --tc-border-focused:  var(--cvp-focus-ring-color);
  /* ... all 53 tokens aliased */
}
```

**Output:** All `--cvp-*` semantic tokens defined. Light theme functional. `--tc-*` tokens still work.  
**Effort:** 2 engineers, 2 weeks.  
**Risk:** Low. Old tokens are aliases, not removed.  
**Dependencies:** Phase 0 audit complete.

---

### Phase 2 — Non-Colour Token Foundation (3–4 weeks)

**Objective:** Add spacing, typography, radius, shadow, motion, z-index, and opacity tokens. Migrate design.md component specs to use component tokens.

| Task | Detail |
|---|---|
| Define spacing scale | `--cvp-space-1` through `--cvp-space-12` |
| Define typography tokens | Font size, weight, line-height, letter-spacing |
| Define radius tokens | `--cvp-radius-xs` through `--cvp-radius-full` |
| Define shadow tokens | Light and dark values |
| Define motion tokens | Duration and easing |
| Define focus tokens | Full two-part focus ring pattern as tokens |
| Component token definitions | One file per component with component-level token overrides referencing semantic tokens |
| Migrate 3 pilot components | Button, TextInput, Modal — switch from `--tc-*` to `--cvp-*` component tokens |

**Output:** Full token graph defined. Pilot components migrated.  
**Effort:** 2 engineers + 1 designer, 3 weeks.  
**Risk:** Medium — pilot component changes must be visually regression-tested.  
**Dependencies:** Phase 1 complete.

---

### Phase 3 — Component Migration (6–10 weeks, parallelisable)

**Objective:** Migrate all remaining components from `--tc-*` to `--cvp-*` component tokens. One PR per component.

| Task | Detail |
|---|---|
| Migrate all components | Each component's CSS switches from `--tc-*` to its component token layer |
| Lint rule upgrade | Upgrade from warning to error on `--tc-*` usage in component CSS |
| Visual regression suite | Chromatic or Percy snapshots for every component, both themes |
| Customer theme validation | Run contrast-check script against all customer/partner overrides |
| Storybook arg tables | Each component exposes its component tokens as interactive Storybook controls |

**Output:** All components using `--cvp-*`. `--tc-*` tokens remain as aliases but are `@deprecated`.  
**Effort:** 1 engineer per component family (~8 families), 4–8 weeks in parallel.  
**Risk:** Medium. Requires visual regression coverage before shipping.  
**Dependencies:** Phase 2 complete.

---

### Phase 4 — Deprecation Cleanup (2–3 weeks)

**Objective:** Remove deprecated `--tc-*` alias tokens. Publish v2.0 of the design system.

| Task | Detail |
|---|---|
| Remove `--tc-*` bridge | Delete the alias bridge file. Run Stylelint — zero errors expected. |
| Publish DESIGN.md v2.0 | Updated with all token categories, values, and WCAG notes |
| Publish Storybook v2.0 | Full component catalogue with theme switching and token arg tables |
| Partner / customer migration guide | Document how to update any external overrides |
| Announce in changelog | Formal v2.0 release note with deprecation list and replacement index |

**Output:** Clean `--cvp-*`-only codebase. DESIGN.md and Storybook fully aligned.  
**Effort:** 1 engineer + 1 technical writer, 2 weeks.  
**Risk:** Low if Phase 3 lint errors are zero before starting.  
**Dependencies:** Phase 3 complete, all customer override files updated.

---

### Roadmap Summary

```
Week  1–2   Phase 0   Freeze & audit
Week  3–5   Phase 1   Alias layer — light theme enabled, zero breakage
Week  6–9   Phase 2   Non-colour tokens + pilot components
Week 10–19  Phase 3   Full component migration (parallel streams)
Week 20–22  Phase 4   Deprecation cleanup + v2.0 release
```

Total estimated duration: **22 weeks** with a team of 2–4 engineers and 1 designer committed part-time. Each phase ships independently — production is never blocked.

---

## Appendix A — Primitive Colour Palette

The full primitive palette underpinning the semantic layer.

```css
:root {
  /* Brand blue */
  --cvp-primitive-blue-50:  #eef2ff;
  --cvp-primitive-blue-100: #e0e7ff;
  --cvp-primitive-blue-200: #c7d2fe;
  --cvp-primitive-blue-300: #a5b4fc;
  --cvp-primitive-blue-400: #818cf8;
  --cvp-primitive-blue-500: #6366f1;
  --cvp-primitive-blue-600: #3d63dd;   /* primary brand */
  --cvp-primitive-blue-700: #244cce;   /* primary hover */
  --cvp-primitive-blue-800: #1f3566;   /* secondary hover */
  --cvp-primitive-blue-900: #2d4a8e;   /* secondary */
  --cvp-primitive-blue-950: #172554;

  /* Neutrals — dark surfaces */
  --cvp-primitive-neutral-900: #0a0a10;
  --cvp-primitive-neutral-850: #0d0d14;
  --cvp-primitive-neutral-800: #14141a;
  --cvp-primitive-neutral-750: #19191b;
  --cvp-primitive-neutral-700: #1a1a24;
  --cvp-primitive-neutral-650: #1f1f28;
  --cvp-primitive-neutral-600: #252528;
  --cvp-primitive-neutral-550: #292a2e;
  --cvp-primitive-neutral-500: #2a2a36;
  --cvp-primitive-neutral-450: #333333;
  --cvp-primitive-neutral-400: #374151;
  --cvp-primitive-neutral-350: #45454a;
  --cvp-primitive-neutral-300: #4b5563;
  --cvp-primitive-neutral-250: #606060;
  --cvp-primitive-neutral-200: #6b7280;
  --cvp-primitive-neutral-150: #9ca3af;
  --cvp-primitive-neutral-100: #a1a1a8;
  --cvp-primitive-neutral-50:  #bbbbbb;
  --cvp-primitive-neutral-25:  #d1d5db;
  --cvp-primitive-neutral-10:  #e5e7eb;
  --cvp-primitive-neutral-5:   #f3f4f6;
  --cvp-primitive-neutral-2:   #f8f9fa;
  --cvp-primitive-neutral-0:   #ffffff;

  /* Semantic states */
  --cvp-primitive-red-600:    #dc2626;
  --cvp-primitive-red-500:    #ef4444;
  --cvp-primitive-red-400:    #f87171;
  --cvp-primitive-red-300:    #fca5a5;
  --cvp-primitive-red-100:    #fee2e2;
  --cvp-primitive-red-50:     #fef2f2;

  --cvp-primitive-green-700:  #15803d;
  --cvp-primitive-green-600:  #16a34a;
  --cvp-primitive-green-400:  #4ade80;
  --cvp-primitive-green-300:  #86efac;
  --cvp-primitive-green-50:   #f0fdf4;

  --cvp-primitive-yellow-700: #b45309;
  --cvp-primitive-yellow-600: #d97706;
  --cvp-primitive-yellow-400: #fbbf24;
  --cvp-primitive-yellow-300: #fcd34d;
  --cvp-primitive-yellow-50:  #fffbeb;

  --cvp-primitive-sky-600:    #2563eb;
  --cvp-primitive-sky-400:    #60a5fa;
  --cvp-primitive-sky-300:    #93c5fd;
  --cvp-primitive-sky-50:     #eff6ff;
}
```

---

## Appendix B — Token Naming Cheatsheet

```
--cvp-color-surface-{page|default|raised|sunken|overlay|disabled|hover|active|scrim}
--cvp-color-text-{primary|secondary|muted|disabled|inverse|link|brand|danger|success|warning|accent-default|accent-subtle|accent-subtlest}
--cvp-color-border-{subtle|default|strong|focus|error|disabled|brand|success|warning|danger}
--cvp-color-icon-{default|strong|muted|disabled|inverse|error|brand|success|warning|danger}
--cvp-color-brand-{default|hover|active}
--cvp-color-secondary-{default|hover|active}
--cvp-color-state-{error|success|warning|info}-{bg|border|text}
--cvp-color-overlay-scrim

--cvp-focus-{ring|border|glow}-color
--cvp-focus-{ring|glow}-width

--cvp-space-{0|1|2|3|4|5|6|8|12}
--cvp-radius-{xs|sm|md|lg|xl|full}
--cvp-shadow-{sm|md|lg|modal}
--cvp-z-{base|sticky|dropdown|overlay|toast}
--cvp-opacity-{disabled|placeholder|scrim-light|scrim-dark}

--cvp-font-family-{sans|mono}
--cvp-font-size-{xs|sm|md|lg|xl|2xl|3xl}
--cvp-font-weight-{regular|medium|semibold|bold}
--cvp-line-height-{tight|snug|normal|relaxed|loose|xl}
--cvp-letter-spacing-{tight|normal|none|wide}

--cvp-motion-duration-{fast|base|slow|bounce}
--cvp-motion-easing-{standard|bounce}

--cvp-{component}-{element}-{property}-{state}
  e.g. --cvp-button-primary-bg-hover
       --cvp-input-border-color-focus
       --cvp-table-row-bg-hover
```
