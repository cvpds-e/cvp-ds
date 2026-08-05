# Design System Specification

**Version:** 2.0  
**Last Updated:** March 18, 2026  
**Application:** Component Library & Design System  
**Framework:** React + Tailwind CSS v4

---

## Table of Contents

1. [Overview](#overview)
2. [Design Philosophy](#design-philosophy)
3. [Theme System](#theme-system)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Spacing & Layout](#spacing--layout)
7. [Interactive States](#interactive-states)
8. [Component Standards](#component-standards)
9. [Elevation & Shadows](#elevation--shadows)
10. [Animation & Transitions](#animation--transitions)
11. [Icons](#icons)
12. [Accessibility](#accessibility)
13. [Implementation Guidelines](#implementation-guidelines)

---

## Overview

This design system creates a **modern dual-theme interface** with emphasis on:

- **Dual-theme support** - Dark theme (default) and Light theme with seamless switching
- **Professional appearance** optimized for extended use in both themes
- **Consistent interaction patterns** across all components
- **Accessibility-first** approach with proper contrast and focus states in both themes
- **Standardized typography** (Typescale M Regular for forms)

**Primary Brand Colors:**
- **#6f8be6** (Periwinkle Blue) - Focus, hover, active states
- **#3d63dd** (Royal Blue) - Primary actions, checked states

---

## Design Philosophy

### Principles

1. **Consistency Over Novelty**
   - Use established patterns
   - Maintain visual hierarchy
   - Apply standards uniformly across both themes

2. **Clarity Through Simplicity**
   - Clear visual language
   - Minimal cognitive load
   - Purposeful use of color and motion

3. **Accessibility By Default**
   - WCAG 2.1 AA compliance in both themes
   - Keyboard navigation support
   - Clear focus indicators
   - Semantic HTML

4. **Performance Conscious**
   - Efficient transitions (150-250ms)
   - Optimized shadows and effects
   - Minimal re-renders

---

## Theme System

### Dark Theme (Default)

**Philosophy:** Rich, immersive interface optimized for low-light environments and extended use

**Characteristics:**
- Base background: #0a0a0f (near black)
- Raised surfaces: #14141a (dark gray)
- Text primary: #ffffff (white)
- Text secondary: #b4b4ba (light gray)
- Borders: Subtle with transparency
- Shadows: Heavy dark shadows
- Interactive: #3d63dd (royal blue)
- Focus ring: #6f8be6 (periwinkle blue)

### Light Theme

**Philosophy:** Clean, minimal interface optimized for bright environments and daytime use

**Characteristics:**
- Base background: #ffffff (white)
- Raised surfaces: #f8f9fa (very light gray)
- Text primary: #111827 (near black - 14.7:1 contrast)
- Text secondary: #374151 (gray - 8.3:1 contrast)
- Borders: #e5e7eb (soft gray)
- Shadows: Light, subtle shadows
- Interactive: #2563eb (vibrant blue)
- Focus ring: #2563eb (bright blue)

### Theme Switching

Users can toggle between themes using the ThemeSwitcher component:
- Preference saved to localStorage
- Respects system preference on first load
- Smooth 300ms transitions
- Fully accessible with keyboard support

---

## Color System

### Primary Palette

#### Periwinkle Blue (#6f8be6)
**Usage:** Interactive states, focus rings, hover effects

**Dark Theme:**
```css
--color-primary: #6f8be6;
--color-primary-bg: rgba(111, 139, 230, 0.08);
--color-primary-border: #6f8be6;
--color-primary-glow: rgba(111, 139, 230, 0.25);
```

**Light Theme:**
```css
--color-primary: #6f8be6;
--color-primary-bg: rgba(111, 139, 230, 0.05);
--color-primary-border: #6f8be6;
--color-primary-glow: rgba(111, 139, 230, 0.20);
```

**Applications:**
- Focus borders (2px solid)
- Hover borders (1px solid)
- Active navigation backgrounds
- Interactive state indicators

#### Royal Blue (#3d63dd)
**Usage:** Primary actions, CTAs, checked states

**Dark Theme:**
```css
--color-secondary: #3d63dd;
--color-secondary-hover: #3451b2;
--color-secondary-active: #2d4291;
--color-secondary-disabled: rgba(61, 99, 221, 0.4);
```

**Light Theme:**
```css
--color-secondary: #2563eb;
--color-secondary-hover: #1d4ed8;
--color-secondary-active: #1e40af;
--color-secondary-disabled: rgba(37, 99, 235, 0.4);
```

**Applications:**
- Primary buttons
- Checkbox/toggle checked states
- Important CTAs
- Active tab indicators

### Semantic Colors

#### Success - Emerald

**Dark Theme:**
```css
--color-success: #10b981;
--color-success-hover: #059669;
--color-success-bg: rgba(16, 185, 129, 0.1);
```

**Light Theme:**
```css
--color-success: #16a34a;
--color-success-hover: #15803d;
--color-success-bg: rgba(22, 163, 74, 0.08);
```

#### Warning - Amber

**Dark Theme:**
```css
--color-warning: #f59e0b;
--color-warning-hover: #d97706;
--color-warning-bg: rgba(245, 158, 11, 0.1);
```

**Light Theme:**
```css
--color-warning: #d97706;
--color-warning-hover: #b45309;
--color-warning-bg: rgba(217, 119, 6, 0.08);
```

#### Error - Red

**Dark Theme:**
```css
--color-error: #e6494e;
--color-error-hover: #dc2626;
--color-error-bg: rgba(230, 73, 78, 0.1);
```

**Light Theme:**
```css
--color-error: #dc2626;
--color-error-hover: #b91c1c;
--color-error-bg: rgba(220, 38, 38, 0.08);
```

#### Info - Blue

**Dark Theme:**
```css
--color-info: #3b82f6;
--color-info-hover: #2563eb;
--color-info-bg: rgba(59, 130, 246, 0.1);
```

**Light Theme:**
```css
--color-info: #2563eb;
--color-info-hover: #1d4ed8;
--color-info-bg: rgba(37, 99, 235, 0.08);
```

### Surface Colors

#### Dark Theme Hierarchy:

```css
--surface-base: #0a0a0f;        /* Level 0: App background */
--surface-raised: #14141a;       /* Level 1: Cards, inputs */
--surface-overlay: #1f1f28;      /* Level 2: Borders, hover */
--surface-elevated: #2a2a35;     /* Level 3: Strong emphasis */
--modal-bg: #252528;             /* Modal backgrounds */
--filter-menu-bg: #292a2e;       /* Dropdown/filter menus */
```

#### Light Theme Hierarchy:

```css
--surface-base: #ffffff;         /* Level 0: App background */
--surface-raised: #f8f9fa;       /* Level 1: Cards, inputs */
--surface-overlay: #f3f4f6;      /* Level 2: Borders, hover */
--surface-elevated: #e5e7eb;     /* Level 3: Strong emphasis */
--modal-bg: #ffffff;             /* Modal backgrounds */
--filter-menu-bg: #ffffff;       /* Dropdown/filter menus */
```

**Usage Rules:**
- Always maintain hierarchy
- Never skip levels
- Use appropriate surface for context

### Text Colors

#### Dark Theme:

```css
--text-primary: #ffffff;         /* Headings, important text */
--text-secondary: #b4b4ba;       /* Body text, descriptions */
--text-tertiary: #9b9ba5;        /* Labels, metadata */
--text-quaternary: #6b6b78;      /* Placeholders, helper text */
--text-disabled: #A1A1A8;        /* Disabled states (STANDARD) */
```

#### Light Theme:

```css
--text-primary: #111827;         /* Headings, important text */
--text-secondary: #374151;       /* Body text, descriptions */
--text-tertiary: #6b7280;        /* Labels, metadata */
--text-quaternary: #9ca3af;      /* Placeholders, helper text */
--text-disabled: #9ca3af;        /* Disabled states */
```

### Border Colors

#### Dark Theme:

```css
--border-default: #45454a;       /* Standard borders */
--border-strong: #2a2a35;        /* Emphasized borders */
--border-hover: #6f8be6;         /* Hover state (1px) */
--border-focus: #6f8be6;         /* Focus state (2px) */
--border-error: #e6494e;         /* Error borders */
```

#### Light Theme:

```css
--border-default: #e5e7eb;       /* Standard borders */
--border-strong: #d1d5db;        /* Emphasized borders */
--border-hover: #6f8be6;         /* Hover state (1px) */
--border-focus: #2563eb;         /* Focus state (2px) */
--border-error: #dc2626;         /* Error borders */
```

---

## Typography

### Font Family

```css
--font-family: Inter, -apple-system, BlinkMacSystemFont, 
               'Segoe UI', Roboto, sans-serif;
--font-mono: 'Monaco', 'Courier New', monospace;
```

### Typescale M Regular (Form Component Standard)

**All form components use this scale:**

```css
font-family: Inter, sans-serif;
font-size: 14px;
font-weight: 400;
line-height: 20px;
letter-spacing: 0.15px;
```

**Components using Typescale M:**
- Text Input
- Text Area
- Select
- Multi-Select
- Checkbox labels
- Toggle labels
- Radio button labels

### Font Sizes

```css
--text-xs: 11px;      /* Helper text, badges */
--text-s: 13px;       /* Labels, descriptions */
--text-m: 14px;       /* Body text, forms (STANDARD) */
--text-base: 16px;    /* Default body */
--text-lg: 18px;      /* Subheadings */
--text-xl: 20px;      /* Section headings */
--text-2xl: 24px;     /* Page titles */
--text-3xl: 30px;     /* Large titles */
```

### Font Weights

```css
--weight-normal: 400;      /* Body text, forms */
--weight-medium: 500;      /* Labels, buttons */
--weight-semibold: 600;    /* Headings, emphasis */
```

### Line Heights

```css
--leading-tight: 1.25;     /* Headings */
--leading-normal: 1.43;    /* Forms (20px / 14px) */
--leading-relaxed: 1.5;    /* Body text */
--leading-loose: 1.75;     /* Spacious content */
```

---

## Spacing & Layout

### Spacing Scale

Based on 4px increments:

```css
--space-0: 0px;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### Border Radius

```css
--radius-sm: 3px;     /* Checkbox */
--radius: 4px;        /* Badges, small elements */
--radius-md: 6px;     /* Buttons, inputs (STANDARD) */
--radius-lg: 8px;     /* Cards, modals */
--radius-xl: 12px;    /* Large cards */
--radius-full: 9999px;  /* Pills, circles */
```

### Grid & Layout

```css
/* Max widths */
--max-width-sm: 640px;
--max-width-md: 768px;
--max-width-lg: 1024px;
--max-width-xl: 1200px;

/* Container padding */
--container-padding: 24px;

/* Sidebar widths */
--sidebar-width: 224px;
--rail-width: 64px;
```

---

## Interactive States

### Focus States (STANDARD)

**All form components:**

```css
border: 2px solid #6f8be6;
box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
outline: none;
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Focus Ring Only (for custom elements):**

```css
box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
```

### Hover States (STANDARD)

**Form inputs, selects, textareas:**

```css
border: 1px solid #6f8be6;
transition: border-color 150ms;
```

**Buttons:**

```css
/* Primary */
background: #3451b2; /* Darker shade */

/* Secondary */
background: #6f8be6;

/* Outline */
border-color: #6f8be6;
color: #ffffff;
```

**Navigation items:**

```css
background: #292a2e;
color: #ffffff;
```

### Active/Selected States

**Navigation:**

```css
background: rgba(111, 139, 230, 0.08);
color: #6f8be6;
```

**Checkboxes, Toggles:**

```css
background: #3d63dd;
border-color: #3d63dd;
```

**Tabs:**

```css
/* Active tab trigger */
color: #ffffff; /* dark */ /* #111827 light */
border-bottom-color: transparent; /* border is a layout placeholder only */

/* Active indicator — ::after pseudo-element */
/* Inset by horizontal padding so bar matches text width, not button width */
position: absolute;
bottom: -2px;
left: 20px;   /* = button horizontal padding (16px) + 4px breathing room */
right: 20px;  /* = button horizontal padding (16px) + 4px breathing room */
height: 2px;
background: #3d63dd; /* dark */ /* #2563eb light */
animation: scaleX 200ms ease; /* slides in from center */
```

### Disabled States (STANDARD)

**All form components:**

```css
color: #A1A1A8;
opacity: 0.5;
cursor: not-allowed;
pointer-events: none;
```

**Specific disabled states:**

```css
/* Checkbox disabled (checked) */
background: #A1A1A8;
border: #A1A1A8;
checkmark-color: #333333;

/* Toggle disabled (on) */
background: #A1A1A8;
thumb-color: #333333;
```

### Error States

```css
border: 1px solid #e6494e;
box-shadow: 0 0 0 3px rgba(230, 73, 78, 0.2);
```

---

## Component Standards

### Form Component Specifications

#### Input Fields (Text, Select, Textarea)

```css
/* Visual */
background: #212123;
border: 1px solid #45454a;
border-radius: 0.2rem;
min-height: 32px;
padding: 6px 4px 6px 10px;

/* Typography */
font-family: Inter, sans-serif;
font-size: 14px;
font-weight: 400;
line-height: 20px;
letter-spacing: 0.15px;
color: #ffffff;

/* Placeholder */
placeholder-color: #bbbbbb;
```

#### Buttons

```css
/* Primary */
background: #3d63dd;
color: #ffffff;
height: 36px;
padding: 0 16px;
border-radius: 6px;
font: 13px Inter, 500 weight;
letter-spacing: 0.1px;

/* Secondary */
background: #45454a;
/* Other specs same as Primary */

/* Outline */
background: transparent;
border: 1px solid #45454a;
color: #b4b4ba;
/* Other specs same as Primary */
```

#### Checkboxes

```css
size: 16px × 16px;
border: 1px solid #45454a;
border-radius: 3px;
background: transparent;

/* Checked */
background: #3d63dd;
border: #3d63dd;
checkmark: #ffffff, 10px × 10px;
```

#### Toggles

```css
container: 36px × 20px;
thumb: 16px × 16px;
border-radius: 10px (container), 50% (thumb);

/* Off */
background: #45454a;

/* On */
background: #3d63dd;
```

### Modal Standards

```css
/* Backdrop */
background: rgba(0, 0, 0, 0.8);
backdrop-filter: blur(4px);

/* Container */
background: #252528;
border: 1px solid #19191b;
border-radius: 8px;
max-width: 600px;
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);

/* Header */
padding: 13px 19px;
border-bottom: 0.5px solid #45454a;
font: 13px Inter, 500 weight;
text-transform: uppercase;

/* Content */
padding: 16px;
background: #252528;

/* Footer */
padding: 13px 19px;
border-top: 0.5px solid #45454a;
```

### Navigation Standards

#### Page Side Nav

```css
/* Container */
width: 224px;
background: #0a0a0f;
border-right: 1px solid #1f1f28;
padding: 16px;

/* Section Title */
font: 10px Inter, 600 weight;
color: #6b6b78;
text-transform: uppercase;
letter-spacing: 0.05em;

/* Nav Item Default */
padding: 6px 8px;
color: #b4b4ba;
icon-color: #6b6b78;

/* Nav Item Hover */
background: #292a2e;
color: #ffffff;

/* Nav Item Active */
background: rgba(111, 139, 230, 0.08);
color: #6f8be6;
```

---

## Elevation & Shadows

### Standard Shadows

```css
--elevation-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--elevation-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--elevation-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
--elevation-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.25);
--elevation-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
```

### Usage

```
SM:  Subtle lift, hover cards
MD:  Cards, dropdowns
LG:  Modals, important overlays
XL:  High-priority overlays
2XL: Full-screen modals
```

### Glow Effects

```css
--glow-primary: 0 0 20px rgba(111, 139, 230, 0.2);
--glow-success: 0 0 20px rgba(16, 185, 129, 0.2);
--glow-warning: 0 0 20px rgba(245, 158, 11, 0.2);
--glow-error: 0 0 20px rgba(239, 68, 68, 0.2);
```

---

## Animation & Transitions

### Transition Speeds

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Easing Functions

```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Usage Guidelines

```
FAST (150ms):  Hover states, focus rings, button presses
BASE (250ms):  Modal animations, dropdown reveals
SLOW (350ms):  Page transitions, complex animations
```

### Standard Transitions

```css
/* Hover */
transition: background-color 150ms, border-color 150ms;

/* Focus */
transition: border-color 150ms, box-shadow 150ms;

/* Transform */
transition: transform 150ms;
```

---

## Icons

### Icon Library

**Primary:** Lucide React

```tsx
import { Icon } from 'lucide-react';
```

### Icon Sizes

```css
--icon-xs: 12px;
--icon-sm: 14px;
--icon-base: 16px;  /* STANDARD for most cases */
--icon-lg: 20px;
--icon-xl: 24px;
```

### Icon Colors

```css
/* Default */
color: #6b6b78;

/* Active */
color: #ffffff;

/* Active Navigation */
color: #6f8be6;

/* Buttons */
color: #ffffff;
```

### Icon Usage

```
Button Icons:     16px
Nav Icons:        16px
Form Icons:       16px
Menu Icons:       16px
Large Actions:    20px
Feature Icons:    24px
```

---

## Accessibility

### WCAG 2.1 AA Compliance

#### Color Contrast

```
Normal Text:      4.5:1 minimum
Large Text:       3:1 minimum
UI Components:    3:1 minimum
```

#### Focus Indicators

```css
/* All interactive elements */
focus-visible: 2px solid #6f8be6;
box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);

/* Minimum contrast ratio: 3:1 */
/* Minimum thickness: 2px */
```

### Keyboard Navigation

```
Tab:              Move forward
Shift+Tab:        Move backward
Enter/Space:      Activate
Arrow Keys:       Navigate menus/tabs
Escape:           Close overlays
```

### Screen Reader Support

```html
<!-- Labels -->
<label for="input-id">Label Text</label>
<input id="input-id" />

<!-- ARIA States -->
aria-checked="true/false"
aria-expanded="true/false"
aria-selected="true/false"
aria-disabled="true"
aria-invalid="true"

<!-- ARIA Descriptions -->
aria-label="Descriptive label"
aria-labelledby="label-id"
aria-describedby="description-id"

<!-- Live Regions -->
aria-live="polite"
role="alert"
role="status"
```

### Semantic HTML

```html
<!-- Use semantic elements -->
<nav>, <main>, <aside>, <header>, <footer>
<button>, <a>, <input>, <select>

<!-- NOT -->
<div role="button">, <span onClick>
```

---

## Implementation Guidelines

### Component Development Checklist

- [ ] Uses design tokens (no hardcoded values)
- [ ] Implements all interactive states (hover, focus, active, disabled)
- [ ] Follows Typescale M Regular for forms
- [ ] Includes keyboard navigation
- [ ] Has proper ARIA attributes
- [ ] Meets WCAG AA contrast requirements
- [ ] Uses semantic HTML
- [ ] Includes error states where applicable
- [ ] Has smooth transitions (150ms standard)
- [ ] Is responsive (if applicable)
- [ ] Supports dark theme
- [ ] Has clear focus indicators

### Code Standards

```tsx
// ✅ Good
<input
  type="text"
  className="input-base"
  aria-label="Email address"
  aria-required="true"
/>

// ❌ Bad
<div className="input" style={{ background: '#212123' }} />
```

### CSS Variable Usage

```css
/* ✅ Good */
background: var(--surface-raised);
color: var(--text-primary);
border: 1px solid var(--border-default);

/* ❌ Bad */
background: #14141a;
color: #ffffff;
border: 1px solid #45454a;
```

### Responsive Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

---

## Version History

### Version 2.0 (March 18, 2026)
- Standardized focus states across all components
- Updated primary color to #6f8be6 (Periwinkle Blue)
- Standardized disabled state color to #A1A1A8
- Unified Typescale M Regular for all form components
- Updated modal backgrounds to #252528
- Updated filter menu backgrounds to #292a2e
- Added comprehensive accessibility guidelines
- Enhanced component specifications

### Version 1.0 (February 20, 2026)
- Initial design system specification
- Core component library
- Dark theme implementation
- Basic accessibility standards

---

**Maintained by:** Design System Team  
**Contact:** design-system@example.com  
**Repository:** github.com/example/design-system  
**License:** MIT