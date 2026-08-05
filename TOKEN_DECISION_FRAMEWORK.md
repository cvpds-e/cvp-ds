# CVP Token Decision Framework

A practical guide for engineers. Use this before creating any new design token.

---

## 1. Decision Tree

When you think you need a new design value, walk through this in order:

```
1. Do I need a new design value?
   |
   └─ First: check if an existing component token covers it
      └─ Found one → REUSE it. Stop here.
      |
      └─ No match: check if an existing semantic token covers it
         └─ Found one → reference it from a component token. Stop here.
         |
         └─ No match: does the value change between themes (light/dark)?
            |
            ├─ YES → create a new semantic token, then reference it
            |        from a component token.
            |
            └─ NO → does it vary by component only (not theme-driven)?
               |
               ├─ YES → add a component token that references an existing
               |        semantic token. No new semantic token needed.
               |
               └─ NO → add a primitive first, then a semantic token,
                        then a component token. Full chain required.
```

---

## 2. Quick Rules

- Never hardcode hex values in component CSS — always use a token.
- Never reference `--cvp-primitive-*` directly from component CSS.
- Never create a semantic token for a single component's one-off value — use a component token instead.
- If a value does not change between themes, it belongs in `:root`, not in `[data-theme]`.
- A component token that is identical to its semantic token source provides zero additional value — skip it and reference the semantic token directly from component CSS.

---

## 3. Worked Examples

### Example A — Reuse: hover background on a new list item component

You are building a `ListItem` component and need a hover background colour.

Check existing semantic tokens first. `--cvp-color-surface-hover` already exists and expresses exactly this intent.

```css
/* cvp-component-tokens.css — no new token needed */
.cvp-list-item:hover {
  background: var(--cvp-color-surface-hover);
}
```

No new token created. The semantic token is referenced directly in the component style.

---

### Example B — New component token: a custom card component needs a specific border

You are building a `Card` component. The border should follow the standard default border colour but you want a named hook for customers to override it.

The semantic token `--cvp-color-border-default` already exists. Create one component token that references it.

```css
/* cvp-component-tokens.css */
:root {
  --cvp-card-border: var(--cvp-color-border-default);
}

/* Card component CSS */
.cvp-card {
  border: 1px solid var(--cvp-card-border);
}
```

One new component token. Zero new semantic tokens. Zero new primitives.

---

### Example C — New semantic token: a "featured" highlight colour used across multiple components

A "featured" highlight is needed in `Badge`, `Card`, and `HeroPanel`. It must adapt between light and dark themes. No existing semantic token covers this intent.

Step 1 — add a primitive (cvp-primitives.css):

```css
:root {
  --cvp-primitive-amber-500: #f59e0b;
  --cvp-primitive-amber-300: #fcd34d;
}
```

Step 2 — add a semantic token (cvp-semantic-tokens.css):

```css
:root[data-theme="light"] {
  --cvp-color-surface-featured: var(--cvp-primitive-amber-500);
}
:root[data-theme="dark"] {
  --cvp-color-surface-featured: var(--cvp-primitive-amber-300);
}
```

Step 3 — add component tokens where override hooks are needed (cvp-component-tokens.css):

```css
:root {
  --cvp-badge-featured-bg:     var(--cvp-color-surface-featured);
  --cvp-card-featured-bg:      var(--cvp-color-surface-featured);
  --cvp-hero-panel-featured-bg: var(--cvp-color-surface-featured);
}
```

Full chain: primitive → semantic → component.

---

### Example D — When NOT to add a token: a one-off margin tweak

A `Sidebar` component needs `16px` of padding. You consider creating `--cvp-sidebar-padding`.

Do not. Spacing values are already covered by `--cvp-space-*` semantic tokens. The intent is clear without a component token.

```css
/* Correct — reference the semantic space token directly */
.cvp-sidebar {
  padding: var(--cvp-space-4);
}

/* Wrong — unnecessary component token */
:root {
  --cvp-sidebar-padding: var(--cvp-space-4); /* adds nothing */
}
```

Skip the component token when the semantic token already expresses the intent and no customer override hook is required.

---

## 4. Token Type Reference

| Token Type | Defined in                  | Who uses it          | Customer overrideable?        |
|------------|-----------------------------|----------------------|-------------------------------|
| Primitive  | cvp-primitives.css          | Semantic tokens only | No                            |
| Semantic   | cvp-semantic-tokens.css     | Component tokens; component CSS directly when no override surface is needed | No (except brand tokens) |
| Component  | cvp-component-tokens.css    | Component CSS        | Yes                           |

---

## 5. Naming Quick Reference

Pattern: `--cvp-[tier]-[category]-[variant]-[modifier]`

```
--cvp-color-surface-{page|default|raised|sunken|overlay|subtle|disabled|hover|active|inverse|bold}
--cvp-color-text-{primary|secondary|muted|disabled|inverse|link|brand|danger|success|warning|accent-default|accent-subtle|accent-subtlest}
--cvp-color-border-{subtle|default|strong|bold|disabled|error|brand|success|warning|danger}
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
```
