# Component Specifications - Design System

**Version:** 2.0  
**Last Updated:** March 18, 2026  
**Purpose:** Cross-platform component specifications for consistent UI implementation  
**Framework Reference:** React + Tailwind CSS v4

---

## Table of Contents

1. [Introduction](#introduction)
2. [Design Tokens](#design-tokens)
3. [Form Components](#form-components)
   - [Text Input](#text-input)
   - [Text Area](#text-area)
   - [Select](#select)
   - [Multi-Select](#multi-select)
   - [Checkbox](#checkbox)
   - [Toggle/Switch](#toggleswitch)
4. [Button Components](#button-components)
   - [Primary Button](#primary-button)
   - [Secondary Button](#secondary-button)
   - [Outline Button](#outline-button)
   - [Text Button](#text-button)
   - [Icon Buttons](#icon-buttons)
5. [Navigation Components](#navigation-components)
   - [Header Navigation](#header-navigation)
   - [Page Side Nav](#page-side-nav)
   - [Breadcrumbs](#breadcrumbs)
   - [Tabs](#tabs)
6. [Overlay Components](#overlay-components)
   - [Modal/Dialog](#modaldialog)
   - [Filter](#filter)
7. [Display Components](#display-components)
   - [Table](#table)
   - [Accordion](#accordion)
   - [Badge](#badge)
8. [Accessibility Requirements](#accessibility-requirements)

---

## Introduction

This document provides platform-agnostic specifications for all UI components. Each component specification includes:

- **Visual Design**: Exact colors, spacing, typography, and dimensions
- **States**: Default, hover, active, focus, disabled, error
- **Behavior**: Interaction patterns and animations
- **Accessibility**: ARIA attributes and keyboard navigation

Use these specifications to recreate the UI in any platform.

---

## Design Tokens

### Typography - Typescale M Regular (Form Components Standard)

```
FONT_FAMILY        = Inter, sans-serif
FONT_SIZE          = 14px
FONT_WEIGHT        = 400
LINE_HEIGHT        = 20px
LETTER_SPACING     = 0.15px
```

### Color Tokens

```
PRIMARY            = #6f8be6    // Periwinkle blue - focus, hover, active
SECONDARY          = #3d63dd    // Royal blue - primary actions, checked states
SUCCESS            = #10b981    // Emerald green
WARNING            = #f59e0b    // Amber
ERROR              = #e6494e    // Red
DISABLED_TEXT      = #A1A1A8    // Standardized disabled color

SURFACE_BASE       = #0a0a0f    // App background
SURFACE_RAISED     = #14141a    // Cards, inputs
SURFACE_OVERLAY    = #1f1f28    // Borders, hover
SURFACE_ELEVATED   = #2a2a35    // Strong borders
MODAL_BG           = #252528    // Modal backgrounds
FILTER_MENU_BG     = #292a2e    // Filter/dropdown menus

TEXT_PRIMARY       = #ffffff
TEXT_SECONDARY     = #b4b4ba
TEXT_TERTIARY      = #9b9ba5
TEXT_QUATERNARY    = #6b6b78
TEXT_DISABLED      = #A1A1A8

BORDER_DEFAULT     = #45454a
BORDER_HOVER       = #6f8be6
BORDER_FOCUS       = #6f8be6
BORDER_ERROR       = #e6494e
```

### Interactive State Standards

```
FOCUS_BORDER       = 2px solid #6f8be6
FOCUS_GLOW         = 0 0 0 3px rgba(111, 139, 230, 0.25)
HOVER_BORDER       = 1px solid #6f8be6
ACTIVE_BG          = rgba(111, 139, 230, 0.08)
DISABLED_COLOR     = #A1A1A8
```

### Spacing Scale

```
SPACE_2    = 8px
SPACE_3    = 12px
SPACE_4    = 16px
SPACE_6    = 24px
```

### Border Radius

```
RADIUS_SM   = 3px   // Checkbox
RADIUS      = 4px   // Default
RADIUS_MD   = 6px   // Buttons, inputs
RADIUS_LG   = 8px   // Cards, modals
```

---

## Form Components

### Text Input

#### Purpose
Single-line text input for forms.

#### Visual Specs

```
Background:       #212123
Border:           1px solid #45454a
Text:             #ffffff
Placeholder:      #bbbbbb
Height:           32px
Padding:          6px 4px 6px 10px
Border Radius:    0.2rem (3.2px)
Font:             14px Inter, 400 weight
Line Height:      20px
Letter Spacing:   0.15px
```

#### States

```
DEFAULT:
  background: #212123
  border: 1px solid #45454a
  color: #ffffff

HOVER:
  border: 1px solid #6f8be6

FOCUS:
  outline: none
  border: 2px solid #6f8be6
  box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25)

ERROR:
  border: 1px solid #e6494e
  box-shadow: 0 0 0 3px rgba(230, 73, 78, 0.2)

DISABLED:
  color: #A1A1A8
  opacity: 0.5
  cursor: not-allowed
```

#### Accessibility
```
Role:              textbox
Label:             Associated <label> with for attribute
Placeholder:       Not a replacement for label
Error:             aria-invalid="true", aria-describedby
Required:          aria-required="true"
```

---

### Text Area

#### Purpose
Multi-line text input.

#### Visual Specs

```
Background:       #212123
Border:           1px solid #45454a
Text:             #ffffff
Placeholder:      #6b6b78
Min Height:       80px
Padding:          12px
Border Radius:    6px
Font:             14px Inter, 400 weight
Line Height:      1.5
Resize:           vertical
```

#### States
```
DEFAULT:  border: 1px solid #1f1f28
HOVER:    border: 1px solid #6f8be6
FOCUS:    border: 2px solid #6f8be6
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25)
ERROR:    border: #ef4444
DISABLED: color: #A1A1A8, opacity: 0.5
```

---

### Select

#### Purpose
Dropdown selection control.

#### Visual Specs

```
Background:       #212123
Border:           1px solid #45454a
Text:             #ffffff
Height:           32px
Padding:          6px 4px 6px 10px
Border Radius:    0.2rem
Font:             14px Inter, 400 weight
Line Height:      20px
Letter Spacing:   0.15px
Chevron:          16px, positioned right
```

#### Dropdown Menu

```
Background:       #292a2e (Filter menu background)
Border:           1px solid var(--border)
Border Radius:    8px
Shadow:           0 8px 24px rgba(0, 0, 0, 0.4)
Max Height:       300px (scrollable)
Padding:          4px vertical
```

#### Option Specs

```
Padding:          10px 12px
Font:             14px Inter, 400 weight

HOVER:
  background: #35363b
  
SELECTED:
  background: #45454a
  color: #ffffff
```

#### States

```
DEFAULT:  Same as Text Input
HOVER:    border: 1px solid #6f8be6
FOCUS:    border: 2px solid #6f8be6
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25)
DISABLED: color: #A1A1A8, opacity: 0.5
```

---

### Multi-Select

#### Purpose
Multi-option selection control.

#### Visual Specs

```
Background:       #212123
Border:           1px solid #45454a
Min Height:       32px
Padding:          4px
Border Radius:    0.2rem
Font:             14px Inter, 400 weight
```

#### Tag Specs (Selected Items)

```
Background:       #3d63dd
Color:            #ffffff
Padding:          2px 8px
Border Radius:    4px
Font:             13px Inter, 500 weight
Gap:              4px (between tags)
```

#### States

```
DEFAULT:  border: 1px solid #45454a
HOVER:    border: #6f8be6
FOCUS:    border: 2px solid #6f8be6
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25)
DISABLED: color: #A1A1A8
```

---

### Checkbox

#### Purpose
Multi-select control for options.

#### Visual Specs

```
SIZE:             16px × 16px
BORDER:           1px solid #45454a
BORDER_RADIUS:    3px
BACKGROUND:       transparent (unchecked)
GAP:              8px (between box and label)

CHECKMARK:
  color: #ffffff
  stroke-width: 2px
  size: 10px × 10px (centered)
```

#### States

```
UNCHECKED:
  background: transparent
  border: 1px solid #45454a

HOVER (UNCHECKED):
  border: 1px solid #6f8be6

CHECKED:
  background: #3d63dd
  border: 1px solid #3d63dd
  checkmark: visible

FOCUS:
  border: 2px solid #6f8be6
  box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25)

DISABLED:
  opacity: 0.5
  cursor: not-allowed
  
DISABLED (CHECKED):
  background: #A1A1A8
  border: #A1A1A8
  checkmark color: #333333
```

#### Typography

```
Label Font:       14px Inter, 400 weight
Label Color:      #ffffff
Line Height:      20px
Letter Spacing:   0.15px

Description Font: 13px Inter, 400 weight
Description Color: #bbbbbb
```

---

### Toggle/Switch

#### Purpose
Binary on/off control.

#### Visual Specs

```
CONTAINER:
  width: 36px
  height: 20px
  border-radius: 10px

THUMB:
  width: 16px
  height: 16px
  border-radius: 50%
  background: #ffffff
```

#### States

```
OFF:
  container background: #45454a
  thumb position: 2px from left

ON:
  container background: #3d63dd
  thumb position: 18px from left (right side)

HOVER (OFF):
  container background: #6f8be6

HOVER (ON):
  container background: #3451b2

FOCUS:
  box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25)

DISABLED:
  opacity: 0.5
  cursor: not-allowed
  
DISABLED (ON):
  background: #A1A1A8
  thumb: #333333
```

---

## Button Components

### Primary Button

#### Visual Specs

```
Background:       #3d63dd
Text:             #ffffff
Height:           36px
Padding:          0 16px
Border Radius:    6px
Font:             13px Inter, 500 weight
Line Height:      20px
Letter Spacing:   0.1px
Border:           none
```

#### States

```
DEFAULT:
  background: #3d63dd
  color: #ffffff

HOVER:
  background: #3451b2

ACTIVE:
  background: #2d4291
  transform: scale(0.98)

FOCUS:
  outline: none
  box-shadow: 0 0 0 3px rgba(61, 99, 221, 0.5)

DISABLED:
  background: rgba(61, 99, 221, 0.4)
  opacity: 0.5
  cursor: not-allowed
```

---

### Secondary Button

#### Visual Specs

```
Background:       #45454a
Text:             #ffffff
Height:           36px
Padding:          0 16px
Border Radius:    6px
Font:             13px Inter, 500 weight
```

#### States

```
DEFAULT:  background: #45454a
HOVER:    background: #6f8be6
ACTIVE:   background: #5a7ad9
FOCUS:    box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25)
DISABLED: opacity: 0.5
```

---

### Outline Button

#### Visual Specs

```
Background:       transparent
Border:           1px solid #45454a
Text:             #b4b4ba
Height:           36px
Padding:          0 16px
Border Radius:    6px
Font:             13px Inter, 500 weight
```

#### States

```
DEFAULT:
  background: transparent
  border: 1px solid #45454a
  color: #b4b4ba

HOVER:
  border: 1px solid #6f8be6
  color: #ffffff

ACTIVE:
  background: rgba(111, 139, 230, 0.08)

FOCUS:
  box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25)
```

---

### Text Button

#### Visual Specs

```
Background:       transparent
Border:           none
Text:             #b4b4ba
Height:           28px
Padding:          0 8px
Font:             13px Inter, 500 weight
```

#### States

```
DEFAULT:  color: #b4b4ba, background: transparent
HOVER:    color: #ffffff, background: rgba(111, 139, 230, 0.08)
ACTIVE:   background: rgba(111, 139, 230, 0.15)
FOCUS:    box-shadow: 0 0 0 2px rgba(111, 139, 230, 0.25)
```

---

## Navigation Components

### Header Navigation

#### Visual Specs

```
Background:       #0a0a0f
Height:           56px
Border Bottom:    1px solid #1f1f28
Padding:          0 24px
```

#### Nav Item

```
Padding:          8px 12px
Font:             13px Inter, 500 weight
Color:            #b4b4ba
Border Radius:    6px
```

#### Nav Item States

```
DEFAULT:
  color: #b4b4ba
  background: transparent

HOVER:
  color: #ffffff
  background: #14141a

ACTIVE:
  color: #6f8be6
  background: rgba(111, 139, 230, 0.08)
```

---

### Page Side Nav

#### Visual Specs

```
Width:            224px
Background:       #0a0a0f
Border Right:     1px solid #1f1f28
Padding:          16px
```

#### Section Title

```
Font:             10px Inter, 600 weight
Color:            #6b6b78
Text Transform:   uppercase
Letter Spacing:   0.05em
Padding:          0 8px
Margin Bottom:    12px
```

#### Nav Item

```
Padding:          6px 8px
Font:             14px Inter, 400 weight
Border Radius:    6px
Gap:              8px (icon to text)
```

#### Nav Item States

```
DEFAULT:
  color: #b4b4ba
  background: transparent
  icon color: #6b6b78

HOVER:
  color: #ffffff
  background: #292a2e
  icon color: #ffffff

ACTIVE:
  color: #6f8be6
  background: rgba(111, 139, 230, 0.08)
  icon color: #6f8be6
```

---

### Tabs

#### Container

```
Border Bottom:    1px solid #1f1f28
Display:          flex
Gap:              2px
```

#### Tab Trigger

```
Padding:          12px 16px
Font:             13px Inter, 500 weight
Border Bottom:    2px solid transparent (layout placeholder only)
Position:         relative
```

#### Tab States

```
DEFAULT:
  color: #9b9ba5 (dark) / #6b7280 (light)
  background: transparent

HOVER:
  color: #ffffff (dark) / #111827 (light)
  background: #1f1f28 (dark) / #f8f9fa (light)

ACTIVE:
  color: #ffffff (dark) / #111827 (light)
  border-bottom: transparent (indicator uses ::after, not border)
  ::after indicator:
    position: absolute
    bottom: -2px
    left: 20px          ← padding (16px) + 4px breathing room
    right: 20px         ← indicator slightly narrower than text
    height: 2px
    background: #3d63dd (dark) / #2563eb (light)
    animation: scaleX 200ms ease (slide in)

DISABLED:
  color: #a1a1a8 (dark) / #d1d5db (light)
  opacity: 0.5
  cursor: not-allowed
```

---

## Overlay Components

### Modal/Dialog

#### Overlay (Backdrop)

```
Background:       rgba(0, 0, 0, 0.8)
Backdrop Filter:  blur(4px) (optional)
Position:         fixed, full viewport
Z-Index:          1000
```

#### Dialog Container

```
Background:       #252528
Border:           1px solid #19191b
Border Radius:    8px (0.2rem)
Shadow:           0 25px 50px -12px rgba(0, 0, 0, 0.35)
Max Width:        600px
Padding:          0 (handled by sections)
```

#### Header

```
Padding:          13px 19px
Border Bottom:    0.5px solid #45454a
Font:             13px Inter, 500 weight
Color:            #ffffff
Text Transform:   uppercase
Letter Spacing:   0.1px
```

#### Content

```
Padding:          16px
Background:       #252528
```

#### Footer

```
Padding:          13px 19px
Border Top:       0.5px solid #45454a
Background:       #252528
Display:          flex
Justify:          flex-end
Gap:              12px
```

---

### Filter

#### Filter Bar

```
Background:       #292a2e
Border:           1px solid var(--border)
Border Radius:    6px
Padding:          6px 12px
Min Height:       36px
Font:             14px Inter, 400 weight
```

#### Filter Menu

```
Background:       #292a2e
Border:           1px solid var(--border)
Border Radius:    8px
Shadow:           0 8px 24px rgba(0, 0, 0, 0.4)
Padding:          12px
Max Height:       480px
Width:            380px
```

#### Filter Option

```
Padding:          10px 12px
Font:             13px Inter, 400 weight
Border Radius:    6px
```

#### Filter Option States

```
DEFAULT:  color: #ffffff, background: transparent
HOVER:    background: #35363b
SELECTED: background: #35373d, color: #ffffff
```

---

## Display Components

### Table

#### Container

```
Width:            100%
Border:           1px solid var(--border)
Border Radius:    8px
Background:       var(--card)
```

#### Header (thead)

```
Background:       #292a2e
Border Bottom:    1px solid var(--border)
```

#### Header Cell (th)

```
Padding:          12px 16px
Font:             13px Inter, 500 weight
Color:            #fff
Text Align:       center
```

#### Body Cell (td)

```
Padding:          12px 16px
Font:             14px Inter, 400 weight
Color:            #ffffff
Border Bottom:    1px solid var(--border)
Text Align:       center
```

#### Row Hover

```
background: rgba(255, 255, 255, 0.02)
transition: 150ms
```

---

## Accessibility Requirements

### Keyboard Navigation

```
Tab:              Move focus forward
Shift + Tab:      Move focus backward
Enter/Space:      Activate buttons, toggles
Arrow Keys:       Navigate menus, selects, tabs
Escape:           Close modals, menus
```

### Focus Management

```
Focus Indicator:  2px solid #6f8be6 border
Focus Glow:       0 0 0 3px rgba(111, 139, 230, 0.25)
Focus Visible:    Always show clear focus states
Skip to Content:  Provide skip links for navigation
```

### ARIA Attributes

```
Labels:           All inputs have associated labels
States:           aria-checked, aria-expanded, aria-selected
Errors:           aria-invalid, aria-describedby
Live Regions:     aria-live for dynamic content
Landmarks:        Use semantic HTML (nav, main, aside)
```

### Color Contrast

```
All text meets WCAG AA standards (4.5:1 for normal text)
Interactive elements have clear visual distinction
Disabled states use #A1A1A8 for visibility
Focus states exceed minimum contrast requirements
```

---

**Last Updated:** March 18, 2026  
**Standards:** WCAG 2.1 AA, Typescale M Regular for forms  
**Framework:** React + Tailwind CSS v4
