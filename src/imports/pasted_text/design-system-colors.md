# 🎨 Design System - Modern Dual-Theme Color System

## Overview
A comprehensive, timeless color palette built around **#6f8be6** (Periwinkle Blue) and **#3d63dd** (Royal Blue) as the primary brand colors, with carefully selected complementary colors and semantic variations optimized for both dark and light theme interfaces.

This system supports:
- **Dark Theme** (default) - Optimized for low-light environments
- **Light Theme** - Optimized for bright environments and daytime use
- **Seamless Theme Switching** via ThemeSwitcher component
- **WCAG 2.1 AA Compliance** in both themes

---

## 🎯 Core Brand Colors

### Primary - Periwinkle Blue (#6f8be6)
**Main interaction color** - Used for focus states, hover borders, and active elements.

**Dark Theme:**
```css
/* Direct usage */
color: var(--color-primary);                    /* #6f8be6 */
border-color: var(--color-primary);             /* #6f8be6 */
background: var(--color-primary-bg);            /* rgba(111, 139, 230, 0.08) */

/* Focus States */
border: 2px solid #6f8be6;
box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);  /* Focus glow */

/* Hover States */
border: 1px solid #6f8be6;
background: rgba(111, 139, 230, 0.08);
```

**Light Theme:**
```css
/* Direct usage */
color: var(--color-primary);                    /* #6f8be6 */
border-color: var(--color-primary);             /* #6f8be6 */
background: var(--color-primary-bg);            /* rgba(111, 139, 230, 0.05) */

/* Focus States */
border: 2px solid #2563eb;
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.20);  /* Focus glow */

/* Hover States */
border: 1px solid #6f8be6;
background: rgba(111, 139, 230, 0.05);
```

**Usage Examples:**
- ✅ Focus rings and indicators
- ✅ Hover borders on form inputs
- ✅ Active navigation backgrounds (subtle)
- ✅ Interactive state feedback

---

### Secondary - Royal Blue (#3d63dd / #2563eb)
**Primary action color** - Used for primary buttons, CTAs, and important actions.

**Dark Theme:**
```css
background: var(--color-secondary);             /* #3d63dd */
background: var(--color-secondary-hover);       /* #3451b2 */
background: var(--color-secondary-active);      /* #2d4291 */
background: var(--color-secondary-disabled);    /* rgba(61, 99, 221, 0.4) */
```

**Light Theme:**
```css
background: var(--color-secondary);             /* #2563eb */
background: var(--color-secondary-hover);       /* #1d4ed8 */
background: var(--color-secondary-active);      /* #1e40af */
background: var(--color-secondary-disabled);    /* rgba(37, 99, 235, 0.4) */
```

**Usage Examples:**
- ✅ Primary CTAs (Save, Create, Submit)
- ✅ Checkbox checked states
- ✅ Toggle active states
- ✅ Important links

---

## ✅ Semantic Colors

### Success - Emerald (#10b981 / #16a34a)

**Dark Theme:**
```css
background: var(--color-success);               /* #10b981 */
background: var(--color-success-hover);         /* #059669 */
background: var(--color-success-active);        /* #047857 */
border-color: var(--color-success-border);      /* rgba(16, 185, 129, 0.5) */
background: var(--color-success-bg);            /* rgba(16, 185, 129, 0.1) */
```

**Light Theme:**
```css
background: var(--color-success);               /* #16a34a */
background: var(--color-success-hover);         /* #15803d */
background: var(--color-success-active);        /* #166534 */
border-color: var(--color-success-border);      /* rgba(22, 163, 74, 0.5) */
background: var(--color-success-bg);            /* rgba(22, 163, 74, 0.08) */
```

**Usage:** Success messages, completed states, live indicators, status badges

---

### Warning - Amber (#f59e0b / #d97706)

**Dark Theme:**
```css
background: var(--color-warning);               /* #f59e0b */
background: var(--color-warning-hover);         /* #d97706 */
background: var(--color-warning-active);        /* #b45309 */
border-color: var(--color-warning-border);      /* rgba(245, 158, 11, 0.5) */
background: var(--color-warning-bg);            /* rgba(245, 158, 11, 0.1) */
```

**Light Theme:**
```css
background: var(--color-warning);               /* #d97706 */
background: var(--color-warning-hover);         /* #b45309 */
background: var(--color-warning-active);        /* #92400e */
border-color: var(--color-warning-border);      /* rgba(217, 119, 6, 0.5) */
background: var(--color-warning-bg);            /* rgba(217, 119, 6, 0.08) */
```

**Usage:** Warnings, alerts, pending states, caution indicators

---

### Error/Danger - Red (#e6494e / #dc2626)

**Dark Theme:**
```css
background: var(--color-error);                 /* #ef4444 / #e6494e */
background: var(--color-error-hover);           /* #dc2626 */
background: var(--color-error-active);          /* #b91c1c */
border-color: var(--color-error-border);        /* rgba(239, 68, 68, 0.5) */
background: var(--color-error-bg);              /* rgba(239, 68, 68, 0.1) */
```

**Light Theme:**
```css
background: var(--color-error);                 /* #dc2626 */
background: var(--color-error-hover);           /* #b91c1c */
background: var(--color-error-active);          /* #991b1b */
border-color: var(--color-error-border);        /* rgba(220, 38, 38, 0.5) */
background: var(--color-error-bg);              /* rgba(220, 38, 38, 0.08) */
```

**Usage:** Errors, destructive actions, validation failures, error borders

---

### Info - Blue (#3b82f6 / #2563eb)

**Dark Theme:**
```css
background: var(--color-info);                  /* #3b82f6 */
background: var(--color-info-hover);            /* #2563eb */
background: var(--color-info-active);           /* #1d4ed8 */
border-color: var(--color-info-border);         /* rgba(59, 130, 246, 0.5) */
background: var(--color-info-bg);               /* rgba(59, 130, 246, 0.1) */
```

**Light Theme:**
```css
background: var(--color-info);                  /* #2563eb */
background: var(--color-info-hover);            /* #1d4ed8 */
background: var(--color-info-active);           /* #1e40af */
border-color: var(--color-info-border);         /* rgba(37, 99, 235, 0.5) */
background: var(--color-info-bg);               /* rgba(37, 99, 235, 0.08) */
```

**Usage:** Info messages, tips, general information

---

## 🌑 Surfaces & Backgrounds

```css
/* Surface Hierarchy */
background: var(--color-surface-base);          /* #0a0a0f - App background */
background: var(--color-surface-raised);        /* #14141a - Cards, panels */
background: var(--color-surface-overlay);       /* #1f1f28 - Borders, hover states */
background: var(--color-surface-elevated);      /* #2a2a35 - Strong borders, active states */
background: var(--color-modal-bg);              /* #252528 - Modal backgrounds */
background: var(--color-filter-menu-bg);        /* #292a2e - Filter/dropdown menus */
```

**Usage Guide:**
- **Base (#0a0a0f)**: Page background
- **Raised (#14141a)**: Cards, panels, containers, input backgrounds
- **Overlay (#1f1f28)**: Borders, separators, hover backgrounds
- **Elevated (#2a2a35)**: Strong borders, emphasized elements
- **Modal (#252528)**: Modal dialogs, overlay windows
- **Filter Menu (#292a2e)**: Dropdowns, context menus, filters

---

## 📝 Text Colors

```css
color: var(--color-text-primary);               /* #ffffff - Headings, important text */
color: var(--color-text-secondary);             /* #b4b4ba - Body text */
color: var(--color-text-tertiary);              /* #9b9ba5 - Labels, captions */
color: var(--color-text-quaternary);            /* #6b6b78 - Placeholder text, icons */
color: var(--color-text-disabled);              /* #A1A1A8 - Disabled states */
```

**Hierarchy:**
- **#ffffff**: Primary headings, important labels
- **#b4b4ba**: Body text, descriptions
- **#9b9ba5**: Form labels, metadata
- **#6b6b78**: Placeholders, helper text, inactive icons
- **#A1A1A8**: Disabled text and elements

---

## 🔲 Borders

```css
border-color: var(--border-subtle);             /* rgba(255, 255, 255, 0.05) */
border-color: var(--border-default);            /* #1f1f28 */
border-color: var(--border-emphasis);           /* rgba(255, 255, 255, 0.12) */
border-color: var(--border-strong);             /* #2a2a35 */
border-color: var(--border-primary);            /* #6f8be6 */
border-color: var(--border-primary-hover);      /* #6f8be6 */
```

**Specific Use Cases:**
- **Default (#1f1f28)**: Standard borders, separators
- **Strong (#2a2a35)**: Emphasized borders, table headers
- **Primary (#6f8be6)**: Hover states (1px), focus states (2px)
- **Error (#e6494e)**: Error borders

---

## 🎨 Interactive States - Form Components

### Focus States
```css
/* Standard focus ring for all form components */
border: 2px solid #6f8be6;
box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
outline: none;
```

### Hover States
```css
/* Form inputs, selects, textareas */
border: 1px solid #6f8be6;
```

### Disabled States
```css
/* Text color for all disabled form components */
color: #A1A1A8;
opacity: 0.5;
cursor: not-allowed;
```

### Active/Selected States
```css
/* Navigation, tabs, and active elements */
background: rgba(111, 139, 230, 0.08);
color: #6f8be6;
```

---

## ✨ Effects

### Focus Glow
```css
/* Applied to all focused form elements */
box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
```

### Elevation (Shadows)
```css
box-shadow: var(--elevation-sm);                /* 0 1px 2px rgba(0,0,0,0.05) */
box-shadow: var(--elevation-md);                /* 0 4px 6px -1px rgba(0,0,0,0.1) */
box-shadow: var(--elevation-lg);                /* 0 10px 15px -3px rgba(0,0,0,0.2) */
box-shadow: var(--elevation-xl);                /* 0 20px 25px -5px rgba(0,0,0,0.25) */
box-shadow: var(--elevation-2xl);               /* 0 25px 50px -12px rgba(0,0,0,0.35) */
```

### Glow Effects
```css
box-shadow: var(--glow-primary);                /* 0 0 20px rgba(111, 139, 230, 0.2) */
box-shadow: var(--glow-success);                /* 0 0 20px rgba(16, 185, 129, 0.2) */
box-shadow: var(--glow-warning);                /* 0 0 20px rgba(245, 158, 11, 0.2) */
box-shadow: var(--glow-error);                  /* 0 0 20px rgba(239, 68, 68, 0.2) */
```

---

## ⏱️ Transitions

```css
transition: all var(--transition-fast);         /* 150ms - Instant feedback */
transition: all var(--transition-base);         /* 250ms - Standard */
transition: all var(--transition-slow);         /* 350ms - Deliberate */
```

**Easing:**
- All transitions use `cubic-bezier(0.4, 0, 0.2, 1)` for smooth, natural motion

---

## 📋 Quick Reference - Common Patterns

### Form Input (Default State)
```css
background: #212123;
border: 1px solid #45454a;
color: #ffffff;
font: 14px/20px Inter, 400 weight;
letter-spacing: 0.15px;
```

### Form Input (Hover State)
```css
border: 1px solid #6f8be6;
```

### Form Input (Focus State)
```css
border: 2px solid #6f8be6;
box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
outline: none;
```

### Form Input (Disabled State)
```css
color: #A1A1A8;
opacity: 0.5;
cursor: not-allowed;
```

### Modal Background
```css
background: #252528;
border: 1px solid #19191b;
border-radius: 8px;
```

### Filter Menu Background
```css
background: #292a2e;
border: 1px solid var(--border);
border-radius: 8px;
```

### Navigation Active State
```css
background: rgba(111, 139, 230, 0.08);
color: #6f8be6;
```

### Checkbox/Toggle Checked State
```css
background: #3d63dd;
border: 1px solid #3d63dd;
```

---

## 🎯 Color Principles

### 1. **Hierarchy Through Contrast**
- Primary actions use high-contrast colors (#6f8be6, #3d63dd)
- Secondary elements use muted tones
- Text hierarchy uses the 5-level text color scale

### 2. **Consistency is Key**
- Always use semantic colors for their intended purpose
- Maintain the surface hierarchy (#0a0a0f → #14141a → #1f1f28 → #2a2a35)
- Use consistent focus (2px) and hover (1px) border weights

### 3. **Accessibility First**
- All color combinations meet WCAG AA standards
- Focus states are highly visible (2px border + 3px glow)
- Disabled states use #A1A1A8 for clear visual distinction

### 4. **Standardized Typography**
- All form components use Typescale M Regular
- Font size: 14px
- Font weight: 400
- Line height: 20px
- Letter spacing: 0.15px

---

## 💡 Best Practices

1. **Always use CSS variables** - Never hardcode color values
2. **Respect the surface hierarchy** - Base → Raised → Overlay → Elevated
3. **Use semantic colors** - Don't use success colors for errors
4. **Maintain consistent states**:
   - Hover: 1px solid #6f8be6
   - Focus: 2px solid #6f8be6 + 3px glow
   - Disabled: #A1A1A8 color
   - Active: rgba(111, 139, 230, 0.08) background
5. **Modal backgrounds**: Always use #252528
6. **Filter menus**: Always use #292a2e
7. **Test in dark mode** - All colors optimized for dark backgrounds

---

**Last Updated:** March 18, 2026  
**Primary Color:** #6f8be6 (Periwinkle Blue)  
**Secondary Color:** #3d63dd (Royal Blue)  
**Design Philosophy:** Modern, timeless, accessible, consistent