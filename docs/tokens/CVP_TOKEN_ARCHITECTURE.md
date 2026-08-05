# CVP Token Architecture
**Cloud Video Platform — Design Systems**
Version 2.0 · Living document — see [IMPLEMENTATION_STATUS.md](../project/IMPLEMENTATION_STATUS.md) for progress

---

## Executive Summary

The CVP token architecture establishes a three-tier CSS custom property system — primitives, semantic tokens, and component tokens — that makes the platform themeable, brand-overrideable, and AI-readable without requiring changes to component code.

It was introduced to replace an organic `--tc-*` token set that covered only colour, lacked light-theme support, mixed semantic and implementation concerns, and could not scale to white-label customer requirements. The architecture is backwards-compatible: all 53 original `--tc-*` tokens continue to resolve correctly via an alias bridge during migration.

This document is the architectural reference. For governance see [TOKEN_GOVERNANCE.md](TOKEN_GOVERNANCE.md). For the engineer decision guide see [TOKEN_DECISION_FRAMEWORK.md](TOKEN_DECISION_FRAMEWORK.md). For current implementation status see [IMPLEMENTATION_STATUS.md](../project/IMPLEMENTATION_STATUS.md).

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Experience Infrastructure Positioning](#2-experience-infrastructure-positioning)
3. [Three-Tier Token Architecture](#3-three-tier-token-architecture)
4. [Token Taxonomy](#4-token-taxonomy)
5. [Naming Convention](#5-naming-convention)
6. [Token Decision Framework](#6-token-decision-framework)
7. [Component Architecture](#7-component-architecture)
8. [Theme Strategy](#8-theme-strategy)
9. [Legacy Token Migration](#9-legacy-token-migration)
10. [Migration Roadmap](#10-migration-roadmap)
11. [Success Metrics](#11-success-metrics)
12. [Related Documents](#12-related-documents)

---

## 1. Design Principles

These principles govern all decisions about introducing, naming, and evolving tokens. When in doubt, return here.

| Principle | Definition |
|---|---|
| **Semantic before visual** | Token names describe purpose, not appearance. `color-surface-raised` survives a rebrand; `color-grey-200` does not. |
| **Stable over time** | A token name should remain correct as the palette and brand evolve. Colour names, component names, and implementation details must not appear in semantic tokens. |
| **Themeable** | Every colour token must have both a light and a dark value defined before shipping. Theme switching is a platform capability, not a component responsibility. |
| **Reusable** | Before creating a token, verify no existing token covers the use case. Prefer extending scope of an existing token over creating a new one. |
| **Composable** | Primitives feed semantics; semantics feed component tokens; component tokens feed component CSS. No layer skips another. |
| **Accessible** | All foreground/background pairings meet WCAG AA (4.5:1 text, 3:1 UI components). Primary interactive elements target AAA (7:1). Compliance is validated at token release time, not at component build time. |
| **Implementation independent** | Tokens are CSS custom properties. The architecture is platform-agnostic — the same token names apply to web, native (via translation layer), and Storybook. |
| **AI-readable** | The `[namespace]-[tier]-[category]-[variant]-[modifier]` pattern is machine-parseable. An AI generating a component can select the correct token by parsing the name alone, without needing prose documentation. |
| **Single responsibility** | Each token has one clearly defined purpose. A token that carries two meanings (e.g. `bg-disabled` used as both a surface fill and a text mute) must be split. |

---

## 2. Experience Infrastructure Positioning

Token Architecture is one capability within the broader CVP Experience Infrastructure. Understanding where it sits prevents scope creep in both directions.

```
┌──────────────────────────────────────────────────────────────────┐
│  EXPERIENCE SDK                                                  │
│  Customer / partner integration surface                          │
│  Component overrides · Theme injection · Brand kits              │
└─────────────────────────┬────────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│  AI COMPONENT CONTRACTS                                          │
│  Machine-readable JSON specification per component variant       │
│  AI tools read contracts to generate token-correct components    │
└──────────────┬───────────────────────────────────┬───────────────┘
               │                                   │
┌──────────────▼────────────┐   ┌──────────────────▼──────────────┐
│  COMPONENT LIBRARY        │   │  STORYBOOK CATALOGUE            │
│  React components that    │   │  Component tokens exposed as     │
│  consume component tokens │   │  argTypes controls               │
└──────────────┬────────────┘   └──────────────────┬──────────────┘
               │                                   │
┌──────────────▼───────────────────────────────────▼──────────────┐
│  TOKEN ARCHITECTURE  ◀──── THIS DOCUMENT                        │
│  Tier 1 Primitives → Tier 2 Semantic → Tier 3 Component         │
│  src/styles/tokens/cvp-primitives.css                                   │
│  src/styles/tokens/cvp-semantic-tokens.css                              │
│  src/styles/tokens/cvp-component-tokens.css                             │
└─────────────────────────┬────────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│  THEME ENGINE                                                    │
│  [data-theme="light"] / [data-theme="dark"] cascade             │
│  Runtime customer theme injection via <style> injection          │
└─────────────────────────┬────────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│  DESIGN SYSTEM  (DESIGN.md)                                      │
│  Colour specifications · Component specs · WCAG validation       │
└──────────────────────────────────────────────────────────────────┘
```

For the full platform vision see [EXPERIENCE_INFRASTRUCTURE.md](EXPERIENCE_INFRASTRUCTURE.md).

---

## 3. Three-Tier Token Architecture

### 3.1 Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│  TIER 1 — PRIMITIVE TOKENS                              │
│  Raw values. Not consumed directly by components.       │
│  e.g. --cvp-primitive-blue-600: #3d63dd                 │
│       --cvp-primitive-space-4:  16px                    │
│       --cvp-primitive-radius-md: 6px                    │
└────────────────────┬────────────────────────────────────┘
                     │ referenced by
┌────────────────────▼────────────────────────────────────┐
│  TIER 2 — SEMANTIC TOKENS                               │
│  Purpose-named aliases. Theme-switchable.               │
│  e.g. --cvp-color-surface-default                       │
│       --cvp-color-text-primary                          │
│       --cvp-space-4                                     │
└────────────────────┬────────────────────────────────────┘
                     │ referenced by
┌────────────────────▼────────────────────────────────────┐
│  TIER 3 — COMPONENT TOKENS                              │
│  Per-component override surface. Customer theming here. │
│  e.g. --cvp-button-primary-bg                           │
│       --cvp-input-border                                │
│       --cvp-table-row-bg-hover                          │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Responsibilities

**Tier 1 — Primitives** are the primary home for raw values. Hex codes, pixel lengths, and unitless numbers live here. Changing a primitive propagates automatically through every semantic and component token that references it. Named palette subsets — focus ring colours, link colours, accent colours — are permitted as primitives when they carry an accessibility or brand-role distinction that must remain theme-independent. These are not semantic tokens; they do not describe how a value is used, only which specific raw value from the palette serves that role.

**Tier 2 — Semantic tokens** carry meaning. They resolve to different values under `[data-theme="light"]` and `[data-theme="dark"]`, so components never need conditional theme logic. Non-colour tokens (spacing, radius, typography, motion, z-index) are theme-independent and defined on `:root`. Composite values — shadows, translucent overlays, opacity-composed colours — may be defined directly in the semantic layer when the full composite expression (not just a single raw part) is what changes by theme and no reusable primitive abstraction exists. Bare hex values must still live in Tier 1.

**Tier 3 — Component tokens** are the customer override surface. A white-label customer changes `--cvp-button-primary-bg` without touching the global `--cvp-color-brand-default`. Each component's full override surface is explicit and discoverable via Storybook.

### 3.3 Theme Switching Mechanism

```css
/* Tier 1 — primitives, defined once */
:root {
  --cvp-primitive-blue-600: #3d63dd;
}

/* Tier 2 — semantic, theme-resolved */
[data-theme="light"] { --cvp-color-brand-default: var(--cvp-primitive-blue-600); }
[data-theme="dark"]  { --cvp-color-brand-default: var(--cvp-primitive-blue-600); }

/* Tier 3 — component, customer can override */
:root {
  --cvp-button-primary-bg: var(--cvp-color-brand-default);
}
```

No JavaScript in components. The browser resolves the cascade at render time.

---

## 4. Token Taxonomy

### 4.1 Colour

| Category | Description |
|---|---|
| `color-surface` | Page, card, panel, sunken, raised, overlay, hover, active backgrounds |
| `color-text` | Primary, secondary, muted, disabled, inverse, link, brand |
| `color-text-accent` | Accent text levels (purpose-named, no colour names) |
| `color-border` | Subtle, default, strong, disabled, brand, state variants |
| `color-icon` | Default, strong, muted, disabled, inverse, state variants |
| `color-brand` | Primary brand fill — default, hover, active, accent |
| `color-secondary` | Secondary brand fill — default, hover, active |
| `color-state` | Error/success/warning/info triplets: `bg`, `border`, `text` |
| `color-overlay` | Modal scrim / backdrop |
| `color-interactive` | White/dark overlay fills for button pressed/hover states on dark surfaces |
| `color-gallery` | Media overlay fills (always dark, even in light theme) |

### 4.2 Surface Elevation Scale

| Token | Role |
|---|---|
| `color-surface-page` | Root page background |
| `color-surface-default` | Cards, panels at base level |
| `color-surface-raised` | Elevated cards, table headers, popovers |
| `color-surface-sunken` | Inset areas, expanded table rows |
| `color-surface-overlay` | Menus, tooltips, dropdowns |
| `color-surface-subtle` | Lightly tinted fills |
| `color-surface-disabled` | Disabled input/button fill |
| `color-surface-hover` | Row and item hover fill |
| `color-surface-active` | Pressed / selected fill |
| `color-surface-inverse` | Inverted surface (white in dark theme, dark in light theme) |
| `color-surface-bold` | High-contrast surface (e.g. mid-grey across themes) |

### 4.3 Non-Colour Categories

| Category | Tokens | Theme-dependent |
|---|---|---|
| Focus | `focus-ring-color`, `focus-border-color`, `focus-glow-color`, `focus-ring-width`, `focus-glow-spread` | No |
| Spacing | `space-0` through `space-12` (0–48px in 4px increments) | No |
| Radius | `radius-xs` (2px) through `radius-full` (9999px) | No |
| Shadow | `shadow-sm` through `shadow-modal` | Yes (opacity differs) |
| Typography | `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing` | No |
| Motion | `motion-duration-fast` through `motion-duration-bounce`; `motion-easing-*` | No |
| Opacity | `opacity-disabled` (0.5), `opacity-placeholder` (0.6), `opacity-scrim-light/dark` | No |
| Z-index | `z-base` (0) through `z-toast` (2000) | No |

### 4.4 Terminology Distinctions

Where two terms appear similar, the table below documents whether they are synonyms or intentionally distinct concepts.

| Term pair | Relationship | Distinction |
|---|---|---|
| **error** vs **danger** | Distinct | `error` tokens (`color-state-error-*`, `color-text-error`, `color-icon-error`, `color-border-error`) represent validation and system error feedback — form field errors, API failures, critical alerts. `danger` tokens (`color-state-danger-*`, `color-text-danger`, `color-icon-danger`, `color-border-danger`) represent destructive or high-risk actions such as delete buttons and irreversible operations. In dark theme the two palettes use different hues (red-* vs danger-*). In light theme both resolve to the same value. |
| **strong** vs **bold** | Distinct | Both describe emphasis levels on the same scale but at different steps. `strong` is a medium-emphasis step (subdued structural borders, secondary dividers). `bold` is a heavier step (prominent rules, high-contrast dividers). `border-strong` is lighter than `border-bold`. |
| **default** vs **primary** | Distinct by context | For surfaces and brand colours, `default` names the base/unmodified state: `color-surface-default`, `color-brand-default`. For text, `primary` names the top of the typographic hierarchy: `color-text-primary`. `primary` is reserved for hierarchy roles; `default` is reserved for state roles. |
| **overlay** vs **scrim** | Distinct | `scrim` is a specific type of overlay: a semi-transparent backdrop that blocks interaction with content behind a modal or drawer (`color-overlay-scrim`). Other overlay tokens cover different contexts: `color-surface-overlay` is the surface a floating panel sits on (menus, dropdowns); `color-interactive-overlay` is a translucent fill applied on top of an interactive element for hover/active feedback; `color-gallery-overlay` is a semi-transparent layer over a media thumbnail. |

---

## 5. Naming Convention

### 5.1 Pattern

```
--cvp-[tier]-[category]-[variant]-[modifier]
```

| Segment | Examples | Rule |
|---|---|---|
| `cvp` | — | Fixed product namespace. Prevents collision with Tailwind, Radix, or customer CSS. |
| `tier` | `primitive` · `color` · `space` · `radius` · `shadow` · or a component name | `color`, `space` etc. are semantic tier. A component name (`button`, `input`) signals Tier 3. |
| `category` | `surface` · `text` · `border` · `icon` · `brand` · `focus` · `state` | Describes the token's role, not its appearance. |
| `variant` | `primary` · `secondary` · `muted` · `subtle` · `inverse` · `error` | The specific use within the category. |
| `modifier` | `hover` · `active` · `focus` · `disabled` · `selected` | Interactive state. Applied last. |

### 5.2 Key Rationale

**No colour names in semantic tokens.** `--cvp-color-text-accent-sky-subtle` binds the token to a visual colour. If the brand changes from blue to teal, the token name is wrong and engineers stop trusting it. `--cvp-color-text-accent-subtle` remains correct through any rebrand.

**No `-default-` infixes at the brand level.** `--cvp-color-brand-hover` is preferred over `--cvp-color-brand-default-hover`. The `default` variant is implied when no variant is named; adding it at intermediate tiers creates verbosity without clarity.

**State suffix is `-hover`, not `-hovered`.** Past tense suffixes (`-hovered`, `-pressed`) create naming inconsistency. The modifier names the state the component is *in*, not the action that caused it.

**Component tier omits the `cvp-component-` prefix.** Component tokens use `--cvp-[component]-[property]-[state]`. The tier is implied by the presence of a component name. Adding `component-` would make names unnecessarily long.

### 5.3 Quick Reference

```
--cvp-color-surface-{page|default|raised|sunken|overlay|subtle|disabled|hover|active|inverse|bold}
--cvp-color-text-{primary|secondary|muted|disabled|inverse|on-brand|on-dark|on-light|link-default|link-hover|brand|danger|success|warning|accent-default|accent-subtle|accent-subtlest|accent-muted|accent-secondary}
--cvp-color-border-{subtle|default|strong|bold|disabled|error|brand|success|warning|danger}
--cvp-color-icon-{default|strong|muted|subtle|disabled|inverse|brand|error|danger|success|warning}
--cvp-color-brand-{default|hover|active|accent}
--cvp-color-secondary-{default|hover|active}
--cvp-color-state-{error|success|warning|info}-{bg|border|text}
--cvp-color-overlay-scrim
--cvp-color-interactive-overlay[-medium|-strong]
--cvp-color-gallery-overlay

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

--cvp-{component}-{element?}-{property}-{state?}
  e.g. --cvp-button-primary-bg-hover
       --cvp-input-border-focus
       --cvp-table-row-bg-hover
       --cvp-modal-header-font-size
```

---

## 6. Token Decision Framework

Before creating any token, work through this decision tree:

```
Need a new design value?
│
├─ Does an existing component token cover it?
│   └─ YES → use it directly in component CSS. Done.
│
├─ Does an existing semantic token cover it?
│   └─ YES → wrap it in a component token if the component
│             needs an override surface. Otherwise reference
│             the semantic token directly from component CSS.
│
├─ Does the value change between light and dark themes?
│   ├─ YES → create a semantic token in cvp-semantic-tokens.css.
│   │         Reference it via a component token.
│   └─ NO  → does it vary only by component?
│       ├─ YES → add a component token in cvp-component-tokens.css.
│       │         Point it at an existing semantic token.
│       └─ NO  → add a primitive in cvp-primitives.css,
│                 then a semantic token, then a component token.
│                 Requires Design Systems review.
```

**When component tokens should not exist:**

A component token that does nothing except pass through a semantic token with no possibility of customer override is noise. If `--cvp-nav-bg` always equals `--cvp-color-surface-page` and no customer will ever override just the nav background independently, use `--cvp-color-surface-page` directly in the nav component CSS.

Component tokens earn their existence when they provide a meaningful, documented override surface.

For the full decision guide with worked examples see [TOKEN_DECISION_FRAMEWORK.md](TOKEN_DECISION_FRAMEWORK.md).

---

## 7. Component Architecture

### 7.1 The Consumption Rule

Component CSS may reference component tokens or semantic tokens directly. Component tokens reference semantic tokens only. Semantic tokens reference primitives only. No component CSS ever references `--cvp-primitive-*` or `--tc-*` directly.

**Use a component token when** the value needs a documented customer override surface — for example, button colours, modal background, navigation colours.

**Reference a semantic token directly when** a component token would add no architectural value — for example, applying `--cvp-space-4` for layout padding or `--cvp-color-text-primary` where no per-component colour variant is needed.

```
Component CSS  →  [Component Token →]  Semantic Token  →  Primitive  →  Rendered value
```

### 7.2 Button — Primary

Full resolution chain showing how one CSS property resolves to a hex value in each theme:

```
.button-primary { background-color: var(--cvp-button-primary-bg) }
                                              ↓
                    --cvp-button-primary-bg: var(--cvp-color-brand-default)
                                              ↓
    [data-theme="dark"]  --cvp-color-brand-default: var(--cvp-primitive-blue-600)
    [data-theme="light"] --cvp-color-brand-default: var(--cvp-primitive-blue-600)
                                              ↓
                      --cvp-primitive-blue-600: #3d63dd
                                              ↓
                              Rendered: #3d63dd (both themes)
```

Focus ring (two-part pattern — applies in all themes):

```
.button-primary:focus-visible {
  outline: none;
  border: 2px solid var(--cvp-focus-border-color);   → --cvp-primitive-focus-border → #6f8be6
  box-shadow: 0 0 0 3px var(--cvp-focus-glow-color); → --cvp-primitive-focus-glow   → rgba(111,139,230,0.25)
}
```

Full component token surface:

| Token | Resolves to | Override? |
|---|---|---|
| `--cvp-button-primary-bg` | `--cvp-color-brand-default` | Yes |
| `--cvp-button-primary-bg-hover` | `--cvp-color-brand-hover` | Yes |
| `--cvp-button-primary-text` | `--cvp-color-text-inverse` | Yes |
| `--cvp-button-primary-radius` | `--cvp-radius-sm` (4px) | Yes |
| `--cvp-button-primary-padding-x` | `--cvp-space-4` (16px) | Yes |
| `--cvp-button-primary-font-size` | `--cvp-font-size-md` (14px) | Rarely |

### 7.3 Text Input

```
.input { border-color: var(--cvp-input-border) }
                                ↓
        --cvp-input-border: var(--cvp-color-input-border)
                                ↓
  [dark]  --cvp-color-input-border: var(--cvp-primitive-neutral-500)  → #2a2a36
  [light] --cvp-color-input-border: var(--cvp-primitive-neutral-25)   → #d1d5db
                                ↓
              Rendered: #2a2a36 (dark) / #d1d5db (light)
```

Focus state:

```
.input:focus { border-color: var(--cvp-input-border-focus) }
                                       ↓
            --cvp-input-border-focus: var(--cvp-focus-border-color)
                                       ↓
                 --cvp-focus-border-color: var(--cvp-primitive-focus-border)
                                       ↓
                           #6f8be6 (identical in both themes)
```

### 7.4 Modal

```
.modal { background: var(--cvp-modal-bg); box-shadow: var(--cvp-modal-shadow) }
                            ↓                                    ↓
      --cvp-modal-bg: var(--cvp-color-modal-bg)    --cvp-modal-shadow: var(--cvp-shadow-modal)
                            ↓                                    ↓
  [dark]  --cvp-color-modal-bg: neutral-800 → #14141a    0 8px 32px rgba(0,0,0,0.60)
  [light] --cvp-color-modal-bg: neutral-0   → #ffffff    0 8px 32px rgba(0,0,0,0.12)
```

The backdrop uses:

```
.modal-backdrop { background: var(--cvp-modal-backdrop-bg) }
                                          ↓
             --cvp-modal-backdrop-bg: var(--cvp-color-overlay-scrim)
                                          ↓
  [dark]  rgba(0, 0, 0, 0.75)
  [light] rgba(0, 0, 0, 0.45)
```

### 7.5 Table

```
.table-header { background: var(--cvp-table-header-bg) }
                                      ↓
      --cvp-table-header-bg: var(--cvp-color-surface-raised)
                                      ↓
  [dark]  neutral-650 → #1f1f28
  [light] neutral-2   → #f8f9fa

.table-row:hover { background: var(--cvp-table-row-bg-hover) }
                                          ↓
       --cvp-table-row-bg-hover: var(--cvp-color-surface-hover)
                                          ↓
  [dark]  neutral-650 → #1f1f28
  [light] neutral-5   → #f3f4f6
```

### 7.6 Storybook Integration

Each component token maps to a Storybook argType control:

```ts
// Button.stories.ts
argTypes: {
  '--cvp-button-primary-bg': {
    control: 'color',
    description: 'Primary button background. Defaults to --cvp-color-brand-default.'
  }
}
```

### 7.7 AI Component Contract

Structured token maps enable AI-assisted component generation:

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
    "focus-ring":       "--cvp-focus-ring-color"
  },
  "states": ["default", "hover", "focus", "active", "disabled"],
  "themes": ["light", "dark"]
}
```

An AI generating a component implementation from this contract does not need to hallucinate values — every property resolves to a named token.

---

## 8. Theme Strategy

### 8.1 Platform Themes

Implemented via `data-theme` attribute on `<html>`. Components require zero conditional logic.

```
html[data-theme="light"] → light semantic values
html[data-theme="dark"]  → dark semantic values (current production baseline)
```

Theme preference persists to `localStorage`. Respects `prefers-color-scheme` as default when no preference is stored.

### 8.2 Customer Theming Tiers

| Customer type | Can override | File they ship |
|---|---|---|
| White-label | Component tokens + `color-brand-*` | `customer-acme.css` |
| Partner | Primitives (full palette, typography) | `partner-acme-primitives.css` |

```css
/* White-label: component tokens only */
:root {
  --cvp-button-primary-bg:       #e63946;
  --cvp-button-primary-bg-hover: #c1121f;
  --cvp-color-brand-default:     #e63946;
}

/* Partner: primitive overrides cascade through all tiers */
:root {
  --cvp-primitive-blue-600: #e63946;
  --cvp-primitive-blue-700: #c1121f;
}
```

### 8.3 Runtime Theming

For customer themes fetched from a CMS, inject component token overrides at runtime:

```ts
function applyCustomerTheme(tokens: Record<string, string>) {
  const style = document.createElement('style');
  style.id = 'cvp-customer-theme';
  style.textContent = `:root { ${Object.entries(tokens)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ')} }`;
  document.head.appendChild(style);
}
```

### 8.4 Accessibility

- All semantic token colour pairings must meet WCAG AA (4.5:1 for text, 3:1 for UI components) before a token ships. This is a gate, not a post-hoc check. See TOKEN_GOVERNANCE.md for the full contrast table and escalation process.
- Primary interactive elements (buttons, links, focus rings) target WCAG AAA (7:1). New tokens that miss this threshold require an explicit rationale approved by the Design Systems lead and logged in CHANGELOG.md.
- Automated customer override contrast validation is planned for CI (Phase 2 outstanding work — see IMPLEMENTATION_STATUS.md). Until that tooling ships, overrides are audited manually at review time.
- Dark-mode scrim opacity (0.75) is higher than light-mode (0.45) to maintain adequate separation contrast between a modal and the content behind it.

---

## 9. Legacy Token Migration

### 9.1 Evaluation of the Original `--tc-*` System

The original 53 `--tc-*` tokens had genuine strengths: consistent namespace, semantic intent in names, icon and border categories, hover state awareness. The issues were architectural, not intentional:

| Issue | Example | Resolution |
|---|---|---|
| `bg` and `surface` categories overlap | `--tc-bg-subtle` vs `--tc-surface-default` | Merged into single `color-surface` elevation scale |
| Colour names in semantic tokens | `text-accent-sky-subtle` | Removed; all accent levels are purpose-named |
| State suffixes inconsistent | `-hovered` vs `-hover` | Standardised to `-hover` |
| Computed value in token | `--tc-border-default: color-mix(...)` | Replaced with static theme-aware values |
| `#a1a1a8` used as disabled background | Foreground colour in a surface role | Split: text-disabled and surface-disabled are distinct tokens |
| Colour-only coverage | No spacing, radius, motion | All non-colour categories now tokenised |

### 9.2 Migration Table

Every `--tc-*` token mapped to its `--cvp-*` replacement. The alias bridge (`cvp-alias-bridge.css`) implements all 53 aliases — existing components continue to work with zero changes.

| Existing Token | Proposed Token | Status | Notes |
|---|---|---|---|
| `--tc-bg-accent-purple` | `--cvp-color-brand-accent` | Rename | Colour name removed |
| `--tc-bg-bold` | `--cvp-color-surface-bold` | Rename | Align to surface category |
| `--tc-bg-brand` | `--cvp-color-brand-default` | Rename | Not a surface fill |
| `--tc-bg-brand-hovered` | `--cvp-color-brand-hover` | Rename | Suffix standardised |
| `--tc-bg-danger` | `--cvp-color-state-danger-bg` | Rename | Align to state triplet |
| `--tc-bg-danger-hovered` | `--cvp-color-state-danger-bg-hover` | Rename | — |
| `--tc-bg-disabled` | `--cvp-color-text-disabled` | **Split** | `#a1a1a8` is a foreground value; `surface-disabled` added separately |
| `--tc-bg-hovered` | `--cvp-color-surface-hover` | Rename | — |
| `--tc-bg-inverse` | `--cvp-color-surface-inverse` | Rename | — |
| `--tc-bg-secondary` | `--cvp-color-secondary-default` | Rename | Not a surface fill |
| `--tc-bg-secondary-hovered` | `--cvp-color-secondary-hover` | Rename | — |
| `--tc-bg-subtle` | `--cvp-color-surface-subtle` | Rename | — |
| `--tc-blanket` | `--cvp-color-overlay-scrim` | Rename | Orphan given a category |
| `--tc-border-bold` | `--cvp-color-border-bold` | Keep | Bold and strong are distinct weight tiers; see §4.4 |
| `--tc-border-brand` | `--cvp-color-border-brand` | Keep | — |
| `--tc-border-danger` | `--cvp-color-border-danger` | Keep | — |
| `--tc-border-default` | `--cvp-color-border-default` | **Split** | `color-mix()` replaced with static values per theme |
| `--tc-border-focused` | `--cvp-focus-ring-color` | Rename | Focus is its own category |
| `--tc-border-selected` | `--cvp-focus-border-color` | Rename | Second part of focus ring pattern |
| `--tc-border-subtle` | `--cvp-color-border-subtle` | Rename | — |
| `--tc-border-success` | `--cvp-color-border-success` | Keep | — |
| `--tc-border-warning` | `--cvp-color-border-warning` | Keep | — |
| `--tc-icon-brand` | `--cvp-color-icon-brand` | Rename | Align namespace |
| `--tc-icon-danger` | `--cvp-color-icon-danger` | Rename | Align namespace |
| `--tc-icon-default` | `--cvp-color-icon-default` | Rename | Align namespace |
| `--tc-icon-success` | `--cvp-color-icon-success` | Rename | Align namespace |
| `--tc-icon-warning` | `--cvp-color-icon-warning` | Rename | Align namespace |
| `--tc-surface-default` | `--cvp-color-surface-default` | **Merge** | `bg-*` and `surface-*` unified |
| `--tc-surface-overlay-default` | `--cvp-color-surface-overlay` | Rename | — |
| `--tc-surface-overlay-hovered` | `--cvp-color-surface-overlay-hover` | Rename | Suffix standardised |
| `--tc-surface-overlay-selected` | `--cvp-color-surface-overlay-selected` | Keep | — |
| `--tc-text-accent-blue-subtle` | `--cvp-color-text-accent-subtle` | Rename | Colour name removed |
| `--tc-text-accent-blue-subtlest` | `--cvp-color-text-accent-subtlest` | Rename | Colour name removed |
| `--tc-text-accent-indigo-default` | `--cvp-color-text-accent-muted` | Rename | Purpose level, not colour |
| `--tc-text-accent-indigo-subtle` | `--cvp-color-text-accent-secondary` | Rename | — |
| `--tc-text-accent-indigo-subtlest` | `--cvp-color-text-accent-default` | Rename | Primary accent text |
| `--tc-text-accent-sky-default` | `--cvp-color-text-link-hover` | Rename | Purpose is link hover |
| `--tc-text-accent-sky-subtle` | `--cvp-color-text-link-default` | Rename | Standard link colour |
| `--tc-text-bold` | `--cvp-color-text-secondary` | Rename | `bold` → `secondary` |
| `--tc-text-brand` | `--cvp-color-text-brand` | Keep | — |
| `--tc-text-danger` | `--cvp-color-text-danger` | Keep | — |
| `--tc-text-default` | `--cvp-color-text-primary` | Rename | `default` → `primary` |
| `--tc-text-disabled` | `--cvp-color-text-disabled` | Keep | — |
| `--tc-text-disabled-bold` | — | **Deprecate** | No documented use case |
| `--tc-text-inverse` | `--cvp-color-text-inverse` | Rename | Align namespace |
| `--tc-text-subtle` | `--cvp-color-text-muted` | Rename | `subtle` → `muted` |
| `--tc-text-success` | `--cvp-color-text-success` | Keep | — |
| `--tc-text-warning` | `--cvp-color-text-warning` | Keep | — |

### 9.3 Primitive Adoption Recommendation

Semantic tokens reference primitives for all discrete colour, spacing, radius, and motion values. Two categories of value may be defined directly in the semantic layer without an intermediate primitive:

- **Composite values** — shadows, translucent overlays, and opacity compositions where the full expression (not just a single dimension of it) varies by theme. Decomposing these into per-axis primitives adds complexity without meaningful reuse.
- **Component-context colour tokens** — `--cvp-color-nav-*`, `--cvp-color-input-*`, `--cvp-color-modal-*` and similar groups remain in the semantic layer because they are theme-switchable and serve multiple components within their context.

Bare hex values must always live in Tier 1.

---

## 10. Migration Roadmap

```
Week  1–2   Phase 0   Freeze & audit — map all --tc-* usage per component
Week  3–5   Phase 1   Alias layer — cvp-* tokens defined, bridge live ✅ COMPLETE
Week  6–9   Phase 2   Non-colour tokens + pilot components (Button, Input, Modal)
Week 10–19  Phase 3   Full component migration (parallel, one PR per component)
Week 20–22  Phase 4   Deprecation cleanup — bridge deleted, v2.0 released
```

| Phase | Output | Risk |
|---|---|---|
| 0 — Freeze & Audit | Audit of `--tc-*` usage per component; lint warnings on new hardcoded values | Low |
| 1 — Alias Layer | `--cvp-*` files + bridge. `--tc-*` tokens still resolve. Light theme functional. | Low |
| 2 — Non-colour Tokens + Pilots | Full token graph. 3 pilot components migrated. | Medium — visual regression required |
| 3 — Component Migration | All components on `--cvp-*`. Lint upgraded to error. Storybook arg tables complete. | Medium |
| 4 — Cleanup | Bridge deleted. Storybook + DESIGN.md v2.0 published. | Low if Phase 3 lint is zero |

Each phase ships independently. Production is never blocked.

---

## 11. Success Metrics

### Engineering

| Metric | Baseline | Target |
|---|---|---|
| Hardcoded hex values in component CSS | Uncounted | 0 |
| Components with `--tc-*` direct references | All | 0 by Phase 4 |
| Token coverage (non-colour categories) | 0% | 100% |
| Time to add a new themed component | ~1 day | < 2 hours |

### Design

| Metric | Baseline | Target |
|---|---|---|
| Token reuse rate (% of design decisions backed by a token) | Low | > 90% |
| Design/code colour value consistency | Unmeasured | 100% |
| New component onboarding requiring no new tokens | Rare | > 70% |

### Platform

| Metric | Baseline | Target |
|---|---|---|
| Customer onboarding time (custom theme) | Days | < 2 hours |
| Theming support tickets per quarter | Unmeasured | Baseline then reduce 50% |
| Storybook component coverage with arg tables | 0% | 100% by Phase 3 |
| White-label customers with valid WCAG AA overrides | 0 | 100% (CI-enforced) |

### AI-assisted development

| Metric | Baseline | Target |
|---|---|---|
| Correct token selection rate in AI-generated components | Unmeasured | > 95% |
| AI component output requiring manual token corrections | Unmeasured | < 5% |
| Components with published AI Component Contracts | 0 | All platform components |

---

## 12. Related Documents

| Document | Purpose |
|---|---|
| [EXPERIENCE_INFRASTRUCTURE.md](EXPERIENCE_INFRASTRUCTURE.md) | Platform vision — token architecture in broader context |
| [TOKEN_GOVERNANCE.md](TOKEN_GOVERNANCE.md) | Ownership, versioning, review process, deprecation |
| [TOKEN_DECISION_FRAMEWORK.md](TOKEN_DECISION_FRAMEWORK.md) | Practical engineer guide — when to create which token type |
| [IMPLEMENTATION_STATUS.md](../project/IMPLEMENTATION_STATUS.md) | Current phase progress and outstanding work |
| [DESIGN.md](../specifications/DESIGN.md) | Colour specifications, component specs, WCAG validation |
| `src/styles/tokens/cvp-primitives.css` | Tier 1: all raw values |
| `src/styles/tokens/cvp-semantic-tokens.css` | Tier 2: theme-switchable semantic tokens |
| `src/styles/tokens/cvp-component-tokens.css` | Tier 3: component override surface |
| `src/styles/tokens/cvp-alias-bridge.css` | Migration shim — `--tc-*` aliases for `--cvp-*` |
