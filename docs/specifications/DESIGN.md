---
name: Cloud Video Platform Design System
description: A professional design system for broadcast and OTT platforms — rail configuration, content management, and operator-focused interfaces built on semantic design tokens
version: "2.0"
updated: "2026-06-25"
---

# Cloud Video Platform — Design System

> **How to use this document:** Every value here is concrete and implementation-ready. No cross-referencing required. Apply `data-theme="light"` or `data-theme="dark"` to your root element, paste in the CSS variable blocks below, then follow each component spec to build the UI exactly.

---

## Table of Contents

1. [Overview](#overview)
2. [CSS Variables — Light Theme](#css-variables--light-theme)
3. [CSS Variables — Dark Theme](#css-variables--dark-theme)
4. [Color Token Reference](#color-token-reference)
5. [Typography](#typography)
6. [Spacing & Layout](#spacing--layout)
7. [Elevation & Shadows](#elevation--shadows)
8. [Shapes & Border Radius](#shapes--border-radius)
9. [Motion & Transitions](#motion--transitions)
10. [Focus Ring System](#focus-ring-system)
11. [Components](#components)
12. [Do's and Don'ts](#dos-and-donts)

---

## Overview

Built for expert operators managing complex broadcast and OTT workflows. The system prioritizes information density, operational efficiency, and contextual clarity. Every component is token-driven — theme switching is achieved by swapping a single `data-theme` attribute with zero code changes.

**Guiding principles:**
- Semantic tokens everywhere — never hardcode hex values in components
- Progressive disclosure — show defaults first, advanced options on demand
- WCAG AA minimum on all text/background pairs; AAA on primary actions
- Single focus ring pattern applied consistently to every interactive element

---

## CSS Variables — Light Theme

```css
[data-theme="light"], .light-theme {

  /* ─── Page & Surfaces ─── */
  --bg-page:              #ffffff;
  --bg-surface:           #ffffff;
  --bg-surface-raised:    #f8f9fa;
  --bg-surface-sunken:    #f3f4f6;
  --bg-overlay:           #ffffff;
  --bg-disabled:          #f3f4f6;
  --bg-hover:             #f3f4f6;
  --bg-active:            #e5e7eb;
  --bg-scrim:             rgba(0, 0, 0, 0.45);

  /* ─── Text ─── */
  --text-primary:         #111827;
  --text-secondary:       #374151;
  --text-muted:           #6b7280;
  --text-placeholder:     #9ca3af;
  --text-disabled:        #4b5563;
  --text-inverse:         #ffffff;
  --text-link:            #2563eb;
  --text-error:           #dc2626;
  --text-success:         #16a34a;
  --text-warning:         #d97706;

  /* ─── Borders ─── */
  --border-subtle:        #e5e7eb;
  --border-default:       #e5e7eb;
  --border-strong:        #d1d5db;
  --border-focus:         #2563eb;
  --border-error:         #dc2626;
  --border-disabled:      #a1a1a8;

  /* ─── Icons ─── */
  --icon-default:         #6b7280;
  --icon-strong:          #374151;
  --icon-muted:           #8b91a0;
  --icon-disabled:        #4b5563;
  --icon-inverse:         #ffffff;
  --icon-error:           #dc2626;

  /* ─── Shadows ─── */
  --shadow-sm:            0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md:            0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg:            0 8px 32px rgba(0, 0, 0, 0.10);
  --shadow-modal:         0 8px 32px rgba(0, 0, 0, 0.12);

  /* ─── Brand / Interactive ─── */
  --color-primary:        #3d63dd;
  --color-primary-hover:  #244cce;
  --color-primary-active: #244cce;
  --color-secondary:      #2d4a8e;
  --color-secondary-hover:#1f3566;
  --focus-ring:           #67b3fb;
  --focus-border:         #6f8be6;
  --focus-glow:           rgba(111, 139, 230, 0.25);

  /* ─── Inputs ─── */
  --input-bg:             #ffffff;
  --input-border:         #d1d5db;
  --input-border-hover:   #6b7280;
  --input-border-focus:   #6f8be6;
  --input-border-error:   #dc2626;
  --input-text:           #111827;
  --input-placeholder:    #9ca3af;
  --input-prefix-bg:      #f3f4f6;

  /* ─── Chips & Tags ─── */
  --chip-bg:              #f3f4f6;
  --chip-bg-hover:        #e5e7eb;
  --chip-border:          #d1d5db;
  --chip-text:            #374151;
  --chip-icon:            #6b7280;

  /* ─── Menus & Dropdowns ─── */
  --menu-bg:              #ffffff;
  --menu-border:          #e5e7eb;
  --menu-item-text:       #374151;
  --menu-item-hover-bg:   #f3f4f6;
  --menu-item-active-bg:  #eff6ff;
  --menu-item-active-text:#2563eb;
  --menu-icon:            #6b7280;
  --menu-separator:       #f3f4f6;

  /* ─── Navigation ─── */
  --nav-bg:               #f8f9fa;
  --nav-border:           #e5e7eb;
  --nav-text:             #374151;
  --nav-text-active:      #111827;
  --nav-item-hover-bg:    #f3f4f6;
  --nav-item-active-bg:   #e5e7eb;
  --nav-section-label:    #9ca3af;

  /* ─── Breadcrumbs ─── */
  --breadcrumb-bg:        #f3f4f6;
  --breadcrumb-text:      #6b7280;
  --breadcrumb-active:    #111827;
  --breadcrumb-sep:       #d1d5db;

  /* ─── Modals ─── */
  --modal-bg:             #ffffff;
  --modal-border:         #e5e7eb;
  --modal-header-text:    #111827;
  --modal-body-text:      #374151;

  /* ─── State: Error ─── */
  --state-error-bg:       #fef2f2;
  --state-error-border:   #fca5a5;
  --state-error-text:     #991b1b;

  /* ─── State: Success ─── */
  --state-success-bg:     #f0fdf4;
  --state-success-border: #86efac;
  --state-success-text:   #166534;

  /* ─── State: Warning ─── */
  --state-warning-bg:     #fffbeb;
  --state-warning-border: #fcd34d;
  --state-warning-text:   #92400e;

  /* ─── State: Info ─── */
  --state-info-bg:        #eff6ff;
  --state-info-border:    #93c5fd;
  --state-info-text:      #1e40af;
}
```

---

## CSS Variables — Dark Theme

```css
[data-theme="dark"], .dark-theme {

  /* ─── Page & Surfaces ─── */
  --bg-page:              #0d0d14;
  --bg-surface:           #14141a;
  --bg-surface-raised:    #1f1f28;
  --bg-surface-sunken:    #0a0a10;
  --bg-overlay:           #1a1a24;
  --bg-disabled:          #2a2a36;
  --bg-hover:             #1f1f28;
  --bg-active:            #2a2a36;
  --bg-scrim:             rgba(0, 0, 0, 0.75);

  /* ─── Text ─── */
  --text-primary:         #ffffff;
  --text-secondary:       #e5e7eb;
  --text-muted:           #9ca3af;
  --text-placeholder:     #6b7280;
  --text-disabled:        #a1a1a8;
  --text-inverse:         #111827;
  --text-link:            #60a5fa;
  --text-error:           #f87171;
  --text-success:         #4ade80;
  --text-warning:         #fbbf24;

  /* ─── Borders ─── */
  --border-subtle:        #1f1f28;
  --border-default:       #2a2a36;
  --border-strong:        #374151;
  --border-focus:         #3b82f6;
  --border-error:         #f87171;
  --border-disabled:      #374151;

  /* ─── Icons ─── */
  --icon-default:         #9ca3af;
  --icon-strong:          #e5e7eb;
  --icon-muted:           #6b7280;
  --icon-disabled:        #a1a1a8;
  --icon-inverse:         #111827;
  --icon-error:           #f87171;

  /* ─── Shadows ─── */
  --shadow-sm:            0 1px 3px rgba(0, 0, 0, 0.40);
  --shadow-md:            0 4px 12px rgba(0, 0, 0, 0.40);
  --shadow-lg:            0 8px 32px rgba(0, 0, 0, 0.50);
  --shadow-modal:         0 8px 32px rgba(0, 0, 0, 0.60);

  /* ─── Brand / Interactive ─── */
  --color-primary:        #3d63dd;
  --color-primary-hover:  #244cce;
  --color-primary-active: #244cce;
  --color-secondary:      #2d4a8e;
  --color-secondary-hover:#1f3566;
  --focus-ring:           #67b3fb;
  --focus-border:         #6f8be6;
  --focus-glow:           rgba(111, 139, 230, 0.25);

  /* ─── Inputs ─── */
  --input-bg:             #14141a;
  --input-border:         #2a2a36;
  --input-border-hover:   #6b7280;
  --input-border-focus:   #6f8be6;
  --input-border-error:   #f87171;
  --input-text:           #ffffff;
  --input-placeholder:    #6b7280;
  --input-prefix-bg:      #1f1f28;

  /* ─── Chips & Tags ─── */
  --chip-bg:              #1f1f28;
  --chip-bg-hover:        #2a2a36;
  --chip-border:          #374151;
  --chip-text:            #e5e7eb;
  --chip-icon:            #9ca3af;

  /* ─── Menus & Dropdowns ─── */
  --menu-bg:              #1a1a24;
  --menu-border:          #2a2a36;
  --menu-item-text:       #e5e7eb;
  --menu-item-hover-bg:   #1f1f28;
  --menu-item-active-bg:  #1e3a5f;
  --menu-item-active-text:#60a5fa;
  --menu-icon:            #9ca3af;
  --menu-separator:       #1f1f28;

  /* ─── Navigation ─── */
  --nav-bg:               #0d0d14;
  --nav-border:           #1f1f28;
  --nav-text:             #9ca3af;
  --nav-text-active:      #ffffff;
  --nav-item-hover-bg:    #1f1f28;
  --nav-item-active-bg:   #1f1f28;
  --nav-section-label:    #4b5563;

  /* ─── Breadcrumbs ─── */
  --breadcrumb-bg:        #1f1f28;
  --breadcrumb-text:      #9ca3af;
  --breadcrumb-active:    #ffffff;
  --breadcrumb-sep:       #374151;

  /* ─── Modals ─── */
  --modal-bg:             #14141a;
  --modal-border:         #2a2a36;
  --modal-header-text:    #ffffff;
  --modal-body-text:      #e5e7eb;

  /* ─── State: Error ─── */
  --state-error-bg:       #2d1515;
  --state-error-border:   #7f1d1d;
  --state-error-text:     #fca5a5;

  /* ─── State: Success ─── */
  --state-success-bg:     #052e16;
  --state-success-border: #14532d;
  --state-success-text:   #86efac;

  /* ─── State: Warning ─── */
  --state-warning-bg:     #2d1f05;
  --state-warning-border: #78350f;
  --state-warning-text:   #fcd34d;

  /* ─── State: Info ─── */
  --state-info-bg:        #0f172a;
  --state-info-border:    #1e3a5f;
  --state-info-text:      #93c5fd;
}
```

---

## Color Token Reference

### Surfaces

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg-page` | `#ffffff` | `#0d0d14` | Root page background |
| `--bg-surface` | `#ffffff` | `#14141a` | Cards, panels |
| `--bg-surface-raised` | `#f8f9fa` | `#1f1f28` | Elevated cards, popovers |
| `--bg-surface-sunken` | `#f3f4f6` | `#0a0a10` | Inset areas, code blocks |
| `--bg-overlay` | `#ffffff` | `#1a1a24` | Menus, tooltips, floats |
| `--bg-disabled` | `#f3f4f6` | `#2a2a36` | Disabled input/button fill |
| `--bg-hover` | `#f3f4f6` | `#1f1f28` | Row/item hover fill |
| `--bg-active` | `#e5e7eb` | `#2a2a36` | Row/item pressed fill |
| `--bg-scrim` | `rgba(0,0,0,0.45)` | `rgba(0,0,0,0.75)` | Modal backdrop |

### Text

| Token | Light | Dark | Use |
|---|---|---|---|
| `--text-primary` | `#111827` | `#ffffff` | Headings, body, labels |
| `--text-secondary` | `#374151` | `#e5e7eb` | Subheadings, descriptions |
| `--text-muted` | `#6b7280` | `#9ca3af` | Metadata, helper text |
| `--text-placeholder` | `#9ca3af` | `#6b7280` | Input placeholder |
| `--text-disabled` | `#4b5563` | `#a1a1a8` | Disabled text |
| `--text-inverse` | `#ffffff` | `#111827` | Text on colored backgrounds |
| `--text-link` | `#2563eb` | `#60a5fa` | Hyperlinks |
| `--text-error` | `#dc2626` | `#f87171` | Validation errors |
| `--text-success` | `#16a34a` | `#4ade80` | Success messages |
| `--text-warning` | `#d97706` | `#fbbf24` | Warning messages |

### Borders

| Token | Light | Dark | Use |
|---|---|---|---|
| `--border-subtle` | `#e5e7eb` | `#1f1f28` | Shared dividers |
| `--border-default` | `#e5e7eb` | `#2a2a36` | Standard component borders |
| `--border-strong` | `#d1d5db` | `#374151` | Emphasized borders |
| `--border-focus` | `#2563eb` | `#3b82f6` | Focus ring border color |
| `--border-error` | `#dc2626` | `#f87171` | Error state |
| `--border-disabled` | `#a1a1a8` | `#374151` | Disabled component border |

### Icons

| Token | Light | Dark | Use |
|---|---|---|---|
| `--icon-default` | `#6b7280` | `#9ca3af` | Standard icons |
| `--icon-strong` | `#374151` | `#e5e7eb` | Emphasized icons |
| `--icon-muted` | `#9ca3af` | `#6b7280` | Subtle / secondary icons |
| `--icon-disabled` | `#4b5563` | `#a1a1a8` | Disabled state |
| `--icon-inverse` | `#ffffff` | `#111827` | Icons on colored bg |
| `--icon-error` | `#dc2626` | `#f87171` | Error indicator |

### State Colors (bg + border + text triplets)

| State | Token | Light | Dark |
|---|---|---|---|
| **Error** | `--state-error-bg` | `#fef2f2` | `#2d1515` |
| | `--state-error-border` | `#fca5a5` | `#7f1d1d` |
| | `--state-error-text` | `#991b1b` | `#fca5a5` |
| **Success** | `--state-success-bg` | `#f0fdf4` | `#052e16` |
| | `--state-success-border` | `#86efac` | `#14532d` |
| | `--state-success-text` | `#166534` | `#86efac` |
| **Warning** | `--state-warning-bg` | `#fffbeb` | `#2d1f05` |
| | `--state-warning-border` | `#fcd34d` | `#78350f` |
| | `--state-warning-text` | `#92400e` | `#fcd34d` |
| **Info** | `--state-info-bg` | `#eff6ff` | `#0f172a` |
| | `--state-info-border` | `#93c5fd` | `#1e3a5f` |
| | `--state-info-text` | `#1e40af` | `#93c5fd` |

### WCAG Contrast

| Pair | Light | Dark | Grade |
|---|---|---|---|
| `text-primary` on `bg-page` | 16.0:1 | 21.0:1 | AAA |
| `text-secondary` on `bg-surface` | 9.7:1 | 14.7:1 | AAA |
| `text-muted` on `bg-surface` | 4.7:1 | 4.6:1 | AA |
| White on `#3d63dd` (primary) | 5.2:1 | 5.2:1 | AA |
| White on `#2d4a8e` (secondary) | 8.5:1 | 8.5:1 | AAA |
| `text-link` on `bg-page` | 4.6:1 | 4.5:1 | AA |

---

## Typography

**Primary font:** `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`

**Monospace font:** `Inconsolata, monospace`

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inconsolata:wght@400&display=swap');
```

### Type Scale

| Name | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `body-xs` | 12px | 400 | 16px | 0.1px | Timestamps, annotations, fine print |
| `body-s` | 13px | 400 | 20px | 0.1px | Helper text, menu items, secondary labels |
| `label` / `body-s-medium` | 13px | 500 | 20px | 0.1px | Form labels, nav items |
| `body-m` | 14px | 400 | 20px | 0.15px | Body copy, input text, table cells |
| `body-m-medium` | 14px | 500 | 20px | 0.15px | Button labels, active states |
| `body-l` | 15px | 400 | 22px | 0px | Descriptions, longer-form content |
| `h3` | 18px | 600 | 28px | 0px | Section headings, modal titles |
| `h2` | 24px | 600 | 32px | 0px | Page section titles |
| `h1` | 32px | 700 | 40px | 0px | Page titles |
| `mono` | 14px | 400 | 20px | 0px | Code, technical IDs |

### Typography Defaults by Category

| Category | Style |
|---|---|
| All form inputs | `body-m` — 14px / 400 / 20px / 0.15px |
| All form labels | `label` — 13px / 500 / 20px / 0.1px |
| All button labels | `body-m-medium` — 14px / 500 / 20px / 0.15px |
| Table header cells | `label` — 13px / 500 / 20px / 0.1px |
| Table body cells | `body-m` — 14px / 400 / 20px / 0.15px |
| Menu items | `body-m` — 14px / 400 / 20px / 0.15px |
| Nav items | `body-m` — 14px / 400 / 20px / 0.15px |
| Helper / error text | `body-s` — 13px / 400 / 20px / 0.1px |

---

## Spacing & Layout

**Base unit:** 8px. All values are multiples of 4px.

| Token | px | Common use |
|---|---|---|
| `spacing-0` | 0 | Reset |
| `spacing-1` | 4px | Icon gap, tight inline spacing |
| `spacing-2` | 8px | Compact padding, button icon gap |
| `spacing-3` | 12px | Small padding, inline groupings |
| `spacing-4` | 16px | Standard padding, form field spacing |
| `spacing-5` | 20px | Medium gaps |
| `spacing-6` | 24px | Section padding, related groups |
| `spacing-8` | 32px | Desktop page gutter, major gaps |
| `spacing-12` | 48px | Major section divisions |

### Page Gutters

| Breakpoint | Horizontal Padding |
|---|---|
| Desktop > 1024px | 32px |
| Tablet 768–1024px | 24px |
| Mobile < 768px | 16px |

### Vertical Rhythm

| Use | Value |
|---|---|
| Major section breaks | 48px |
| Related component groups | 24px |
| Form field sets | 16px |
| Inline element groupings | 12px |

### Z-Index Layers

| Layer | z-index |
|---|---|
| Base content | 0 |
| Sticky headers | 10 |
| Dropdown menus | 100 |
| Modals / overlays | 1000 |
| Toasts / notifications | 2000 |

---

## Elevation & Shadows

| Token | Light | Dark | Use |
|---|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | `0 1px 3px rgba(0,0,0,0.40)` | Chips, hover cards |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | `0 4px 12px rgba(0,0,0,0.40)` | Dropdowns, popovers |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.10)` | `0 8px 32px rgba(0,0,0,0.50)` | Panels, persistent overlays |
| `--shadow-modal` | `0 8px 32px rgba(0,0,0,0.12)` | `0 8px 32px rgba(0,0,0,0.60)` | Dialogs, modals |

Depth is communicated primarily through **tonal elevation** (`bg-surface-raised` / `bg-surface-sunken`) rather than shadows. Shadows are reserved for floating elements. Overlays additionally use `backdrop-filter: blur(8px)`.

---

## Shapes & Border Radius

| Name | Value | Use |
|---|---|---|
| `radius-xs` | 2px | Checkboxes, small badges |
| `radius-sm` | 4px | Buttons, inputs, chips |
| `radius-md` | 6px | Dropdowns, cards, menus, gallery items |
| `radius-lg` | 8px | Large cards, side panels |
| `radius-xl` | 12px | Modals, overlay sheets |
| `radius-full` | 9999px | Pills, circular avatars |

**Consistency rules:**
- Interactive components (buttons, inputs): **4px**
- Container elements (cards, menus): **6px**
- Overlays (modals): **12px**
- Status indicators: **9999px**

---

## Motion & Transitions

| Token | Value | Use |
|---|---|---|
| `--transition-fast` | `150ms cubic-bezier(0.4, 0, 0.2, 1)` | Hover color changes |
| `--transition-base` | `250ms cubic-bezier(0.4, 0, 0.2, 1)` | Background/border fills |
| `--transition-slow` | `350ms cubic-bezier(0.4, 0, 0.2, 1)` | Panel open/close |
| `--transition-bounce` | `500ms cubic-bezier(0.34, 1.56, 0.64, 1)` | Toast entry, confirmations |

**Body theme transition:** `background-color 0.3s ease, color 0.3s ease`

---

## Focus Ring System

One consistent pattern across every interactive element. Apply on `:focus-visible` only — not `:focus` — so mouse users are unaffected.

### Standard (buttons, icon buttons, nav items)

```css
element:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #67b3fb;
}
```

### Bordered inputs (text input, select, multi-select)

```css
input:focus-visible {
  outline: none;
  border: 2px solid #6f8be6;
  box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
  padding: 0 11px; /* -1px to compensate for 2px border */
}
```

### Primary button (outline-based to clear existing border)

```css
.primary-button:focus-visible {
  outline: 2px solid #6f8be6;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
}
```

| Token | Value |
|---|---|
| `--focus-ring` | `#67b3fb` |
| `--focus-border` | `#6f8be6` |
| `--focus-glow` | `rgba(111, 139, 230, 0.25)` |

Both values are **identical in light and dark themes.**

---

## Components

---

### Primary Button

**Purpose:** Highest-emphasis actions — Save, Publish, Create, Submit.

#### Anatomy

```
┌─────────────────────┐
│       Label         │  ← body-m-medium, white
└─────────────────────┘
  radius: 4px  padding: 8px 16px
```

#### States (identical in light and dark — brand colors don't change)

| State | Background | Text | Border | Notes |
|---|---|---|---|---|
| Default | `#3d63dd` | `#ffffff` | none | — |
| Hover | `#244cce` | `#ffffff` | none | — |
| Focus | `#3d63dd` | `#ffffff` | `#6f8be6` 2px | `box-shadow: 0 0 0 3px rgba(111,139,230,0.25)` · padding becomes 7px 15px |
| Active | `#244cce` | `#ffffff` | none | `translateY(1px)` |
| Disabled | `#a1a1a8` | `#292a2e` | none | `cursor: not-allowed` · `pointer-events: none` |

**Typography:** Inter 14px / 500 / 20px / 0.15px  
**Contrast:** White on `#3d63dd` = **5.2:1 (AA)**

---

### Secondary Button

**Purpose:** Medium-emphasis actions — Cancel, Reset, secondary workflows.

#### States (identical in light and dark)

| State | Background | Text | Border |
|---|---|---|---|
| Default | `#2d4a8e` | `#ffffff` | none |
| Hover | `#1f3566` | `#ffffff` | none |
| Focus | `#2d4a8e` | `#ffffff` | `#6f8be6` 2px + glow |
| Disabled | `#a1a1a8` | `#292a2e` | none |

Same sizing as primary: radius 4px, padding 8px 16px, body-m-medium.  
**Contrast:** White on `#2d4a8e` = **8.5:1 (AAA)**

---

### Outline Button

**Purpose:** Tertiary actions, toolbar buttons, secondary options.

#### States

| State | Background | Text | Border |
|---|---|---|---|
| Default (light) | transparent | `#111827` | `#e5e7eb` 1px |
| Default (dark) | transparent | `#ffffff` | `#2a2a36` 1px |
| Hover (both) | transparent | unchanged | `#6f8be6` 1px |
| Focus (both) | transparent | unchanged | `#6f8be6` 2px + `box-shadow: 0 0 0 3px rgba(111,139,230,0.25)` · padding 7px 15px |
| Disabled (light) | transparent | `#a1a1a8` | `#e5e7eb` 1px |
| Disabled (dark) | transparent | `#a1a1a8` | `#1f1f28` 1px |

**Typography:** Inter 14px / 500 / 20px / 0.15px · Radius: 4px · Padding: 8px 16px

---

### Text Button (All Variants)

All variants: transparent background at default, Inter font, no box decoration.

#### Default Text Button

| State | Text | Notes |
|---|---|---|
| Default | `#97a9de` | padding: 2px 4px |
| Hover | `#cdd7f6` | — |
| Focus | `#97a9de` | `outline: 2px solid #6f8be6` · `outline-offset: 2px` · `box-shadow: 0 0 0 3px rgba(111,139,230,0.25)` · radius: 4px |
| Disabled | `#a1a1a8` | `cursor: not-allowed` |

**Typography:** 14px / 500. Identical in both themes.

#### Secondary Variant

| State | Text | Background (light) | Background (dark) |
|---|---|---|---|
| Default | `#bbbbbb` | transparent | transparent |
| Hover | `#111827` (light) / `#ffffff` (dark) | `#f3f4f6` | `#1f1f28` |

**Typography:** 14px / 400 · Padding: 6px 12px · Radius: 4px

#### Toggle Variant

| State | Text | Background |
|---|---|---|
| Default | `#67b3fb` | transparent |
| Hover | `#67b3fb` | `#1f1f28` |

**Typography:** 13px / 400 · Padding: 4px 8px · Icon gap: 4px. Identical in both themes.

#### Minimalistic Variant

| State | Text | Background |
|---|---|---|
| Default | `#bbbbbb` | transparent |
| Hover | `#ffffff` | transparent |
| Disabled | `#606060` | transparent |

**Typography:** 13px / 400 · Padding: 0. Identical in both themes.

#### Minimalistic Inverted Variant

| State | Text | Background |
|---|---|---|
| Default | `#ffffff` | transparent |
| Hover | `#bbbbbb` | transparent |

**Typography:** 13px / 400 · Padding: 0. Identical in both themes.

#### Nav Variant

| State | Text | Background | Notes |
|---|---|---|---|
| Default | `#b4b4ba` | transparent | — |
| Hover | `#ffffff` | `#1f1f28` | — |
| Active | `#ffffff` | `#252528` | — |
| Focus | `#b4b4ba` | transparent | `outline: 2px solid #6f8be6` · `outline-offset: 2px` · glow |
| Disabled | `#a1a1a8` | transparent | `opacity: 0.5` · `cursor: not-allowed` |

**Typography:** 14px / 400 · Padding: 8px 12px · Radius: 6px · Icon: 16px · Icon gap: 8px. Identical in both themes.

---

### Icon Button (All Variants)

Always perfect squares. Icons centered both axes. Focus ring: `box-shadow: 0 0 0 2px #67b3fb`.

#### Sizes

| Name | Button | Icon |
|---|---|---|
| Small | 24 × 24px | 14px |
| Medium (default) | 28 × 28px | 16px |
| Large | 32 × 32px | 18px |

#### Default Icon Button (both themes)

| State | Background | Icon Color | Notes |
|---|---|---|---|
| Default | transparent | `#AFAFB5` | radius: 4px |
| Hover | `#1f1f28` | `#ffffff` | — |
| Focus | `#1f1f28` | `#ffffff` | `box-shadow: 0 0 0 2px #67b3fb` |
| Active | `rgba(255,255,255,0.15)` | `#ffffff` | `transform: scale(0.95)` |
| Disabled | transparent | `#a1a1a8` | `opacity: 0.5` · `cursor: not-allowed` |

#### Outline Variant

| State | Background | Border | Icon |
|---|---|---|---|
| Default | transparent | `rgba(255,255,255,0.30)` 1px | `#AFAFB5` |
| Hover | `#1f1f28` | `rgba(255,255,255,0.50)` | `#ffffff` |

#### Danger Variant

| State | Background | Icon |
|---|---|---|
| Default | transparent | `#e6494e` |
| Hover | `#1f1f28` | `#e6494e` |
| Active | `#1f1f28` | `#e6494e` |

Use for: delete, remove, clear actions. Identical in both themes.

#### Rail Gallery Variant

| State | Background |
|---|---|
| Default | `rgba(25, 25, 27, 0.75)` |
| Hover / Focus / Active | `#19191b` (solid) |

Use for overlay navigation arrows on image carousels.

**Accessibility:** Icon buttons must always carry `aria-label` — no visible text label exists.

---

### Icon Button With Text

**Purpose:** Descriptive action cards combining icon, label, and helper text. Used in content creation workflows and empty state CTAs.

#### Default Size (176 × 96px)

| Property | Value |
|---|---|
| Width | 176px |
| Min-height | 96px |
| Padding | 12px 16px |
| Border | 1px **solid** `#2a2a36` |
| Radius | 6px |
| Layout | Horizontal: icon beside label, description below |
| Icon size | 12 × 12px |
| Gap (icon → label) | 8px |
| Gap (header → description) | 8px |
| Label typography | Inter 13px / 500 / 20px / 0.1px |
| Description typography | Inter 12px / 400 / 16px / 0.1px |

#### M Size (208 × 160px)

| Property | Value |
|---|---|
| Width | 208px |
| Height | 160px |
| Padding | 22px 36px |
| Border | 1px **dashed** `#2a2a36` |
| Radius | 6px |
| Layout | Vertical column, all centered |
| Icon background | 48 × 48px square · `#292A2E` background |
| Icon size | 25 × 25px |
| Gap (all elements) | 8px |

#### States (both sizes, both themes)

| State | Background | Border | Notes |
|---|---|---|---|
| Default | transparent | `#2a2a36` | text: `#ffffff` |
| Hover | `#1f1f28` | `#4a4a4a` | text: `#ffffff` |
| Focus | transparent | — | `box-shadow: 0 0 0 2px #67b3fb` |
| Disabled | transparent | `#2a2a36` | `opacity: 0.5` · `cursor: not-allowed` |

---

### User Avatar

**Purpose:** Visual user identity in header navigation and profile areas.

#### Avatar Circle

| Property | Value |
|---|---|
| Size | 20 × 20px |
| Shape | `border-radius: 50%` |
| Background | `#3d63dd` — **identical in both themes** |
| Text color | `#ffffff` |
| Typography | Inter 9px / 500 / 9px / 0.5px letter-spacing |
| Content | 2-character uppercase initials |
| flex-shrink | 0 |

#### Interactive Wrapper Button

| State | Background | Notes |
|---|---|---|
| Default | transparent | padding: 2px · radius: 50% |
| Hover | `rgba(255,255,255,0.10)` | transition: 0.2s ease |
| Focus | `rgba(255,255,255,0.10)` | `box-shadow: 0 0 0 2px #67b3fb` · outline: none |

Identical in both themes. Avatar background `#3d63dd` never changes.  
**Contrast:** White on `#3d63dd` = **5.2:1 (AA)**

---

### Text Input

**Purpose:** Single-line text entry for forms and filters.

#### Anatomy

```
Label text                   ← 13px / 500 / var(--text-primary)
┌───────────────────────────────┐
│  Value or placeholder text    │  ← height: 40px · padding: 0 12px
└───────────────────────────────┘
Helper or error text         ← 13px / 400 / var(--text-muted) or var(--text-error)
```

Stack gap: 6px. Radius: 6px.

#### States

| State | bg | Border | Text | Notes |
|---|---|---|---|---|
| Default (light) | `#ffffff` | `#d1d5db` 1px | `#111827` | — |
| Default (dark) | `#14141a` | `#2a2a36` 1px | `#ffffff` | — |
| Hover (both) | unchanged | `#6f8be6` 1px | — | — |
| Focus (both) | unchanged | `#6f8be6` 2px | — | `box-shadow: 0 0 0 3px rgba(111,139,230,0.25)` · padding: 0 11px |
| Error (light) | `#ffffff` | `#dc2626` 1px | `#111827` | error text `#dc2626` below |
| Error (dark) | `#14141a` | `#f87171` 1px | `#ffffff` | error text `#f87171` below |
| Disabled (light) | `#f3f4f6` | `#e5e7eb` 1px | `#9ca3af` | `cursor: not-allowed` |
| Disabled (dark) | `#2a2a36` | `#1f1f28` 1px | `#a1a1a8` | `cursor: not-allowed` |

Placeholder: light `#9ca3af` · dark `#6b7280`  
Prefix area bg: light `#f3f4f6` · dark `#1f1f28`

---

### Checkbox

**Purpose:** Boolean selection and multi-select lists.

| Property | Value |
|---|---|
| Size | 16 × 16px |
| Radius | 2px |
| Border | 1px |

#### States

| State | bg (light) | bg (dark) | Border (light) | Border (dark) |
|---|---|---|---|---|
| Unchecked | transparent | transparent | `#d1d5db` | `#374151` |
| Checked | `#3d63dd` | `#3d63dd` | `#3d63dd` | `#3d63dd` |
| Focus | unchanged | unchanged | `#6f8be6` 2px | `#6f8be6` 2px |
| Focus extra | — | — | `box-shadow: 0 0 0 3px rgba(111,139,230,0.25)` |
| Disabled unchecked (light) | `#f3f4f6` | — | `#e5e7eb` | — |
| Disabled unchecked (dark) | — | `#2a2a36` | — | `#1f1f28` |
| Any disabled | — | — | `cursor: not-allowed` |

Checked icon: white SVG checkmark, centered.

---

### Modal

**Purpose:** Focused workflows, forms, confirmations, content previews.

#### Container

| Property | Light | Dark |
|---|---|---|
| Background | `#ffffff` | `#14141a` |
| Border | `#e5e7eb` 1px | `#2a2a36` 1px |
| Radius | 12px | 12px |
| Padding | 24px | 24px |
| Max-width | 600px (configurable) | 600px |
| Box-shadow | `0 8px 32px rgba(0,0,0,0.12)` | `0 8px 32px rgba(0,0,0,0.60)` |

#### Backdrop

| Property | Light | Dark |
|---|---|---|
| Background | `rgba(0,0,0,0.45)` | `rgba(0,0,0,0.75)` |
| Filter | `backdrop-filter: blur(8px)` | `backdrop-filter: blur(8px)` |

#### Internal Sections

| Section | Typography | Color (light) | Color (dark) |
|---|---|---|---|
| Header / title | 18px / 600 / 28px | `#111827` | `#ffffff` |
| Body text | 14px / 400 / 20px | `#374151` | `#e5e7eb` |
| Footer border | 1px top | `#e5e7eb` | `#2a2a36` |

**Behavior:** Escape closes · click-outside closes · focus trapped · body scroll locked · max-height 80vh on body section · never exceed 800px width.

---

### Dropdown Menu

**Purpose:** Contextual actions, navigation options, selection lists.

#### Container

| Property | Light | Dark |
|---|---|---|
| Background | `#ffffff` | `#1a1a24` |
| Border | `#e5e7eb` 1px | `#2a2a36` 1px |
| Radius | 6px | 6px |
| Inner padding | 4px | 4px |
| Box-shadow | `0 4px 12px rgba(0,0,0,0.08)` | `0 4px 12px rgba(0,0,0,0.40)` |

#### Items

| State | bg (light) | bg (dark) | Text (light) | Text (dark) |
|---|---|---|---|---|
| Default | transparent | transparent | `#374151` | `#e5e7eb` |
| Hover | `#f3f4f6` | `#1f1f28` | `#374151` | `#e5e7eb` |
| Active / selected | `#eff6ff` | `#1e3a5f` | `#2563eb` | `#60a5fa` |

Item padding: 8px 12px · Item radius: 4px  
Typography: Inter 14px / 400 / 20px / 0.15px  
Separator: 1px solid · light `#f3f4f6` · dark `#1f1f28`  
Icon color: light `#6b7280` · dark `#9ca3af`

---

### Breadcrumbs

**Purpose:** Location awareness in hierarchical navigation.

| Element | Light | Dark |
|---|---|---|
| Container bg | `#f3f4f6` | `#1f1f28` |
| Inactive link text | `#6b7280` | `#9ca3af` |
| Active / current text | `#111827` | `#ffffff` |
| Separator | `#d1d5db` | `#374151` |

Layout: horizontal flex, chevron separator between items.  
Active item: no hover, no underline.  
Typography: Inter 13px / 400 / 20px / 0.1px

---

### Header Navigation

**Purpose:** Global navigation — always visible, fixed to top.

#### Container

| Property | Value |
|---|---|
| Height | 45px (fixed) |
| Horizontal padding | 16px desktop · 12px tablet · 8px mobile |
| Border-bottom (light) | `#e5e7eb` 1px |
| Border-bottom (dark) | `#2a2a35` 1px |
| Background | inherits `--bg-page` |
| z-index | 1000 |

#### Zone Layout

```
[ Logo · Brand  │  Account ▾  Team ▾ ]   [ Nav items ]   [ ? │ Avatar ]
  └── Left ──────────────────────────┘   └─ Center ──┘   └── Right ───┘
```

- Vertical separator: 1px · 16px tall · light `#e5e7eb` · dark `#333333`
- Zone gaps: 12px desktop · 8px tablet · 4px mobile

#### All Header Buttons

| State | Background | Transition |
|---|---|---|
| Default | transparent | — |
| Hover | `rgba(255,255,255,0.10)` | 0.2s ease |
| Focus | `rgba(255,255,255,0.10)` + `box-shadow: 0 0 0 2px #67b3fb` | — |

Dropdown chevron rotates 180° when open (transition: 0.2s ease).

#### Responsive

| Breakpoint | Change |
|---|---|
| > 768px | Full layout, all labels |
| 480–768px | User text label hidden (avatar only) |
| < 480px | Brand text reduced, gaps compressed |

---

### Side Navigation

**Purpose:** Primary app section navigation in left sidebar.

#### Container

| Property | Light | Dark |
|---|---|---|
| Background | `#f8f9fa` | `#0d0d14` |
| Border-right | `#e5e7eb` 1px | `#1f1f28` 1px |
| Width | 240px | 240px |
| Padding | 8px | 8px |

#### Nav Items

| State | bg (light) | bg (dark) | Text (light) | Text (dark) |
|---|---|---|---|---|
| Default | transparent | transparent | `#374151` | `#9ca3af` |
| Hover | `#f3f4f6` | `#1f1f28` | `#374151` | `#e5e7eb` |
| Active | `#e5e7eb` | `#1f1f28` | `#111827` | `#ffffff` |

Item padding: 8px 12px · Radius: 6px · Icon: 16px · Icon gap: 8px  
Typography: Inter 14px / 400 / 20px / 0.15px  
Section label: Inter 12px / 500 · light `#9ca3af` · dark `#4b5563`

---

### Table

**Purpose:** Dense tabular data, sortable lists, bulk operations.

#### Structure

| Element | Light | Dark |
|---|---|---|
| Header background | `#f8f9fa` | `#1f1f28` |
| Header text | `#374151` | `#e5e7eb` |
| Header border-bottom | `#e5e7eb` 1px | `#2a2a36` 1px |
| Row background | `#ffffff` | `#14141a` |
| Row background (hover) | `#f3f4f6` | `#1f1f28` |
| Row background (selected) | `#eff6ff` | `#1e3a5f` |
| Row border-bottom | `#f3f4f6` 1px | `#1f1f28` 1px |
| Cell text primary | `#111827` | `#ffffff` |
| Cell text secondary | `#6b7280` | `#9ca3af` |

Cell padding: 8px vertical · 12px horizontal  
Header typography: Inter 13px / 500 / 20px / 0.1px  
Body typography: Inter 14px / 400 / 20px / 0.15px

**Expandable rows:** expanded area uses `--bg-surface-sunken` (light `#f3f4f6` · dark `#0a0a10`) to visually nest content beneath the parent row.

---

### Rail Content Gallery

**Purpose:** Display content items inside expandable table rows — horizontal scroll rails or vertical grids showing media collections with thumbnails, titles, and metadata.

#### Item Specifications (all variants)

| Property | Value |
|---|---|
| Item width | 120px fixed |
| Aspect ratio | 2:3 (portrait) |
| Item radius | 6px |
| Gap between items | 16px |
| Title typography | Inter 13px / 500 / 20px / 0.1px |
| Year typography | Inter 13px / 400 / 20px / 0.1px |
| Year color (light) | `#6b7280` |
| Year color (dark) | `#9ca3af` |

#### Variants

| Variant | Layout | Distinctive features |
|---|---|---|
| Display | Horizontal scroll | Left / right nav arrows |
| Display Grid | Vertical grid | Fixed height, no arrows |
| Display Grid Selectable | Vertical grid | Per-item checkboxes |
| Management | Horizontal or grid | Position numbers, pin / edit icons, drag handles |

#### Gallery Header Anatomy

```
[ Title ]  [ Count badge ]  [ Status ]  [ Date ]          [ ← → ]
```

Count badge: `--chip-bg` fill, `--chip-text` color, `--chip-border` 1px border, radius 9999px.

#### Empty State

Displayed when a rail contains zero content items.

| Property | Value |
|---|---|
| Display | `flex` · `flex-direction: column` · `align-items: center` · `justify-content: center` |
| Padding | 48px top/bottom · 24px left/right |
| Min-height | 200px |
| Width | 100% of container |
| Gap | 16px (between icon and text) |
| Background | transparent |
| Border | `1px dashed rgba(255, 255, 255, 0.10)` |
| Border-radius | 6px |

**Icon:**

| Property | Value |
|---|---|
| Component | `Film` from lucide-react |
| Size | 48 × 48px |
| Color | `#6b6b78` |
| Opacity | `0.6` |

**Text:**

| Property | Value |
|---|---|
| Content | `"No content in this rail"` |
| Color | `#9b9ba5` |
| Typography | Inter 14px / 400 / 20px / 0.15px |
| Text-align | center |

**Theme behavior:** Empty state values are **identical in both light and dark themes.** The subtle dashed border and muted colors are intentionally low-contrast — they signal the area exists without competing for visual attention.

**Usage context:** Appears in expandable table rows (e.g., "Top Picks for You" rail row) when `items.length === 0`. Maintains consistent min-height to prevent layout shift when content is later added.

---

### Chip / Tag

**Purpose:** Status labels, categories, filters, removable selections.

| Property | Light | Dark |
|---|---|---|
| Background | `#f3f4f6` | `#1f1f28` |
| Background hover | `#e5e7eb` | `#2a2a36` |
| Border | `#d1d5db` 1px | `#374151` 1px |
| Text | `#374151` | `#e5e7eb` |
| Icon | `#6b7280` | `#9ca3af` |

Padding: 4px 12px · Radius: 6px  
Typography: Inter 13px / 400 / 20px / 0.1px

**Variants:**
- **Static:** no hover, display-only
- **Interactive:** hover background shift
- **Dismissible:** `×` close icon on right, 8px gap
- **Selected (filter chip):** `#3d63dd` background + `#ffffff` text

---

### Toast / Notification

**Purpose:** Transient feedback — confirmations, error alerts, background process updates.

#### Container

| Property | Value |
|---|---|
| Position | fixed · bottom-right |
| Min-width | 280px |
| Max-width | 420px |
| Radius | 6px |
| Padding | 12px 16px |
| Box-shadow | `--shadow-lg` |
| Auto-dismiss | 5 seconds (configurable) |

#### Type Colors

| Type | bg (light) | bg (dark) | border (light) | border (dark) | text (light) | text (dark) |
|---|---|---|---|---|---|---|
| Success | `#f0fdf4` | `#052e16` | `#86efac` | `#14532d` | `#166534` | `#86efac` |
| Error | `#fef2f2` | `#2d1515` | `#fca5a5` | `#7f1d1d` | `#991b1b` | `#fca5a5` |
| Warning | `#fffbeb` | `#2d1f05` | `#fcd34d` | `#78350f` | `#92400e` | `#fcd34d` |
| Info | `#eff6ff` | `#0f172a` | `#93c5fd` | `#1e3a5f` | `#1e40af` | `#93c5fd` |

Stack order: newest on top. Each toast has 1px border in the type border color.

---

## Do's and Don'ts

### Do's

1. **Always reference CSS custom properties** (`var(--text-primary)`, `var(--bg-surface)`) in component code. Never paste a hex value directly. This is a hard rule with zero exceptions.

2. **Default all form inputs to `body-m`** — Inter 14px / 400 / 20px / 0.15px. All form labels default to `label` — 13px / 500. All button labels to `body-m-medium` — 14px / 500.

3. **Apply the standard focus ring to every interactive element.** Use `:focus-visible`, not `:focus`. Never write `outline: none` without providing the box-shadow replacement.

4. **Use progressive disclosure for complexity.** Show the most-used defaults first. Put advanced settings in collapsible sections or secondary tabs — never bury daily-use controls.

5. **Maintain vertical rhythm with spacing tokens.** Section breaks: 48px. Related groups: 24px. Form field sets: 16px. Inline elements: 12px.

6. **Disabled components must be inert and visually distinct.** Use `#a1a1a8` for text/fill, `cursor: not-allowed`, `pointer-events: none`. Remove all hover effects.

7. **Test every text/background pair for WCAG AA** (4.5:1 body text, 3:1 for large/bold). All values in this document already pass — maintain this when adding new colors.

8. **Design for keyboard navigation.** Tab order matches visual layout. Enter / Space activate buttons. Escape closes overlays. Arrow keys navigate menus and lists.

9. **Use semantic state colors exclusively.** Red = error/destructive. Green = success. Yellow = warning. Blue = informational. Never invert these associations.

10. **Reuse existing components before building new ones.** Add variants to existing patterns. Avoid creating parallel components that duplicate established behavior.

### Don'ts

1. **Never hardcode hex values in component CSS.** Every color, shadow, and border must reference a CSS custom property.

2. **Never write `outline: none` without a visible replacement.** The box-shadow focus ring is the required replacement for all interactive elements.

3. **Never create spacing values outside the scale.** If 18px is needed, use 16px or 20px. Do not introduce arbitrary values.

4. **Never apply hover effects to disabled elements.** Disabled means non-interactive — hover feedback would mislead users.

5. **Never use red for non-error contexts or green for non-success contexts.** Color semantics enable instant recognition in dense operator interfaces.

6. **Never hide controls that operators use every day** behind progressive disclosure. Collapsing is for advanced/edge-case settings only.

7. **Never create modals wider than 800px or body content taller than 80vh.** If more space is needed, use a side panel or dedicated page instead.

8. **Never use placeholder text as a label substitute.** Placeholders disappear on typing and fail to provide persistent context. Labels always sit above the field, always visible.

9. **Never mix light-theme and dark-theme color values in a single rendered interface.** Components adapt via `data-theme` automatically — hardcoding theme-specific values breaks this.

10. **Never combine border + pure box-shadow for focus on bordered components.** Bordered inputs (text input, select) require the combined `border: 2px solid #6f8be6` + `box-shadow: 0 0 0 3px rgba(111,139,230,0.25)` pattern, not box-shadow alone.
