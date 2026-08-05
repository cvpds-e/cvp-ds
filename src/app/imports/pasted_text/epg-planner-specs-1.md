# EPG Planner / Editorial CMS - Component Specifications

**Version:** 1.0  
**Last Updated:** March 2, 2026  
**Purpose:** Cross-platform component specifications for recreating the EPG Planner UI in any system  
**Framework Reference:** React + Tailwind CSS v4

---

## Table of Contents

1. [Introduction](#introduction)
2. [Design Tokens](#design-tokens)
3. [Core Components](#core-components)
   - [Button](#button)
   - [Input](#input)
   - [Select](#select)
   - [Textarea](#textarea)
   - [Switch](#switch)
   - [Checkbox](#checkbox)
   - [Radio Group](#radio-group)
   - [Badge](#badge)
   - [Label](#label)
   - [Tabs](#tabs)
   - [Card](#card)
   - [Table](#table)
   - [Dialog/Modal](#dialogmodal)
   - [Dropdown Menu](#dropdown-menu)
   - [Popover](#popover)
   - [Tooltip](#tooltip)
   - [Separator](#separator)
   - [Skeleton](#skeleton)
   - [Progress](#progress)
   - [Slider](#slider)
4. [Composite Components](#composite-components)
   - [Section Header](#section-header)
   - [Quick Navigation](#quick-navigation)
   - [Breadcrumb](#breadcrumb)
   - [Data Table](#data-table)
   - [History Timeline](#history-timeline)
5. [Layout Components](#layout-components)
   - [Page Layout](#page-layout)
   - [Details Panel](#details-panel)
   - [Main Layout](#main-layout)
6. [Animations & Transitions](#animations--transitions)
7. [Accessibility Requirements](#accessibility-requirements)

---

## Introduction

This document provides platform-agnostic specifications for all UI components used in the EPG Planner / Editorial CMS. Each component specification includes:

- **Visual Design**: Exact colors, spacing, typography, and dimensions
- **States**: Default, hover, active, focus, disabled, error
- **Variants**: Different versions of the component
- **Behavior**: Interaction patterns and animations
- **Accessibility**: ARIA attributes and keyboard navigation

Use these specifications to recreate the UI in any platform (Flutter, SwiftUI, Android, Web, etc.)

---

## Design Tokens

### Color System

#### Surface Colors (Dark Theme)
```
SURFACE_BASE       = #0a0a0f    // Main background
SURFACE_RAISED     = #14141a    // Raised surfaces, cards
SURFACE_OVERLAY    = #1f1f28    // Overlays, hover states
SURFACE_ELEVATED   = #2a2a35    // Highest elevation
```

#### Primary Brand Color (#3d63dd - Royal Blue)
```
PRIMARY_50         = #eef2ff
PRIMARY_100        = #e0e7ff
PRIMARY_200        = #c7d2fe
PRIMARY_300        = #a5b4fc
PRIMARY_400        = #818cf8
PRIMARY_500        = #6366f1
PRIMARY_600        = #3d63dd    // Main Primary
PRIMARY_700        = #3451b2    // Hover
PRIMARY_800        = #2d4291    // Active
PRIMARY_900        = #1e3a8a
PRIMARY_950        = #172554
```

#### Text Colors
```
TEXT_PRIMARY       = #ffffff    // Primary text, headings
TEXT_SECONDARY     = #b4b4ba    // Secondary text
TEXT_TERTIARY      = #9b9ba5    // Labels, captions
TEXT_QUATERNARY    = #6b6b78    // Placeholder, disabled
TEXT_DISABLED      = #4a4a54    // Disabled states
```

#### Semantic Colors

**Success (Emerald)**
```
SUCCESS            = #10b981
SUCCESS_HOVER      = #059669
SUCCESS_ACTIVE     = #047857
SUCCESS_BORDER     = rgba(16, 185, 129, 0.5)
SUCCESS_BG         = rgba(16, 185, 129, 0.1)
```

**Warning (Amber)**
```
WARNING            = #f59e0b
WARNING_HOVER      = #d97706
WARNING_ACTIVE     = #b45309
WARNING_BORDER     = rgba(245, 158, 11, 0.5)
WARNING_BG         = rgba(245, 158, 11, 0.1)
```

**Error (Red)**
```
ERROR              = #ef4444
ERROR_HOVER        = #dc2626
ERROR_ACTIVE       = #b91c1c
ERROR_BORDER       = rgba(239, 68, 68, 0.5)
ERROR_BG           = rgba(239, 68, 68, 0.1)
```

**Info (Blue)**
```
INFO               = #3b82f6
INFO_HOVER         = #2563eb
INFO_ACTIVE        = #1d4ed8
INFO_BORDER        = rgba(59, 130, 246, 0.5)
INFO_BG            = rgba(59, 130, 246, 0.1)
```

#### Secondary & Accent Colors

**Secondary (Purple)**
```
SECONDARY          = #9333ea
SECONDARY_HOVER    = #7e22ce
SECONDARY_ACTIVE   = #6b21a8
SECONDARY_BG       = rgba(147, 51, 234, 0.1)
```

**Accent (Cyan)**
```
ACCENT             = #06b6d4
ACCENT_HOVER       = #0891b2
ACCENT_ACTIVE      = #0e7490
ACCENT_BG          = rgba(6, 182, 212, 0.1)
```

#### Border Colors
```
BORDER_SUBTLE      = rgba(255, 255, 255, 0.05)
BORDER_DEFAULT     = rgba(255, 255, 255, 0.08)  // #1f1f28
BORDER_EMPHASIS    = rgba(255, 255, 255, 0.12)
BORDER_STRONG      = rgba(255, 255, 255, 0.18)  // #2a2a35
BORDER_PRIMARY     = rgba(61, 99, 221, 0.5)
BORDER_PRIMARY_HOVER = rgba(61, 99, 221, 0.7)
```

### Typography

#### Font Family
```
FONT_FAMILY = "System UI"
// Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
//           Roboto, 'Helvetica Neue', Arial, sans-serif
```

#### Font Sizes
```
FONT_XS    = 12px   // Small labels, captions
FONT_SM    = 14px   // Body text, form fields
FONT_BASE  = 16px   // Default body text
FONT_LG    = 18px   // Subheadings
FONT_XL    = 20px   // Section headings
FONT_2XL   = 24px   // Page titles
FONT_3XL   = 30px   // Large titles
```

#### Font Weights
```
WEIGHT_NORMAL    = 400   // Body text
WEIGHT_MEDIUM    = 500   // Labels, buttons, headings
WEIGHT_SEMIBOLD  = 600   // Emphasis, important headings
```

#### Line Heights
```
LINE_HEIGHT = 1.5   // Default for all elements
```

### Spacing Scale
```
SPACE_0    = 0px
SPACE_0_5  = 2px
SPACE_1    = 4px
SPACE_1_5  = 6px
SPACE_2    = 8px
SPACE_2_5  = 10px
SPACE_3    = 12px
SPACE_4    = 16px
SPACE_5    = 20px
SPACE_6    = 24px
SPACE_8    = 32px
SPACE_10   = 40px
SPACE_12   = 48px
SPACE_16   = 64px
SPACE_20   = 80px
```

### Border Radius
```
RADIUS_SM   = 2px   // Tight corners
RADIUS      = 4px   // Default
RADIUS_MD   = 6px   // Buttons, inputs (most common)
RADIUS_LG   = 8px   // Cards, panels
RADIUS_XL   = 12px  // Large cards
RADIUS_FULL = 9999px // Pills, avatars
```

### Elevation & Shadows
```
ELEVATION_SM  = 0 1px 2px 0 rgb(0 0 0 / 0.05)
ELEVATION_MD  = 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
ELEVATION_LG  = 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.1)
ELEVATION_XL  = 0 20px 25px -5px rgb(0 0 0 / 0.25), 0 8px 10px -6px rgb(0 0 0 / 0.1)
ELEVATION_2XL = 0 25px 50px -12px rgb(0 0 0 / 0.35)
```

### Glow Effects (Subtle Light Halos)
```
GLOW_PRIMARY         = 0 0 20px rgba(61, 99, 221, 0.2)
GLOW_PRIMARY_HOVER   = 0 0 30px rgba(61, 99, 221, 0.3)
GLOW_PRIMARY_STRONG  = 0 0 40px rgba(61, 99, 221, 0.4)
GLOW_SECONDARY       = 0 0 20px rgba(147, 51, 234, 0.2)
GLOW_SUCCESS         = 0 0 20px rgba(16, 185, 129, 0.2)
GLOW_WARNING         = 0 0 20px rgba(245, 158, 11, 0.2)
GLOW_ERROR           = 0 0 20px rgba(239, 68, 68, 0.2)
```

### Transitions
```
TRANSITION_FAST   = 150ms cubic-bezier(0.4, 0, 0.2, 1)
TRANSITION_BASE   = 250ms cubic-bezier(0.4, 0, 0.2, 1)
TRANSITION_SLOW   = 350ms cubic-bezier(0.4, 0, 0.2, 1)
TRANSITION_BOUNCE = 500ms cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## Core Components

### Button

#### Purpose
Primary interaction element for triggering actions.

#### Variants

##### 1. Default (Primary)

**Visual Specs:**
```
Background:     #3d63dd (PRIMARY_600)
Text:           #ffffff
Height:         36px (9 * 4px)
Padding:        16px horizontal (4 * 4px)
Border Radius:  6px (RADIUS_MD)
Font:           14px medium (FONT_SM, WEIGHT_MEDIUM)
Shadow:         GLOW_PRIMARY
Border:         none
Icon Size:      16px
Gap (icon):     8px (SPACE_2)
```

**States:**
```
DEFAULT:
  background: #3d63dd
  shadow: GLOW_PRIMARY

HOVER:
  background: #3451b2 (PRIMARY_700)
  shadow: GLOW_PRIMARY_HOVER
  transition: TRANSITION_FAST

ACTIVE:
  background: #2d4291 (PRIMARY_800)
  transform: scale(0.98)

FOCUS:
  outline: none
  ring: 3px rgba(61, 99, 221, 0.5)
  ring-offset: 2px

DISABLED:
  background: rgba(61, 99, 221, 0.4)
  opacity: 0.5
  cursor: not-allowed
  shadow: none
```

##### 2. Secondary

**Visual Specs:**
```
Background:     #9333ea (SECONDARY)
Text:           #ffffff
Shadow:         GLOW_SECONDARY
(All other specs same as Primary)
```

**States:**
```
HOVER:  background: #7e22ce
ACTIVE: background: #6b21a8
```

##### 3. Outline

**Visual Specs:**
```
Background:     transparent
Border:         1px solid #1f1f28 (BORDER_DEFAULT)
Text:           #ffffff
Shadow:         none
(Other specs same as Primary)
```

**States:**
```
HOVER:
  background: #1f1f28 (SURFACE_OVERLAY)
  border: #2a2a35 (BORDER_STRONG)

ACTIVE:
  background: #2a2a35 (SURFACE_ELEVATED)
```

##### 4. Ghost

**Visual Specs:**
```
Background:     transparent
Border:         none
Text:           #9b9ba5 (TEXT_TERTIARY)
Shadow:         none
```

**States:**
```
HOVER:
  background: #1f1f28 (SURFACE_OVERLAY)
  text: #ffffff

ACTIVE:
  background: #2a2a35 (SURFACE_ELEVATED)
```

##### 5. Destructive

**Visual Specs:**
```
Background:     #ef4444 (ERROR)
Text:           #ffffff
Shadow:         GLOW_ERROR
```

**States:**
```
HOVER:  background: #dc2626
ACTIVE: background: #b91c1c
```

#### Sizes

```
SMALL (sm):
  height: 32px (8 * 4px)
  padding: 12px horizontal
  font: 14px medium
  gap: 6px
  icon: 14px

DEFAULT:
  height: 36px (9 * 4px)
  padding: 16px horizontal
  font: 14px medium
  gap: 8px
  icon: 16px

LARGE (lg):
  height: 40px (10 * 4px)
  padding: 24px horizontal
  font: 14px medium
  gap: 8px
  icon: 16px

ICON (square):
  width: 36px
  height: 36px
  padding: 0
  icon: 16px (centered)
```

#### Accessibility
```
Role:              button
Keyboard:          Enter/Space to activate
Focus Visible:     Ring indicator (3px primary color)
Disabled State:    aria-disabled="true", not focusable
Loading State:     aria-busy="true", icon spinner
Icon Only:         aria-label required
```

---

### Input

#### Purpose
Single-line text input for forms.

#### Visual Specs

```
Background:       #14141a (SURFACE_RAISED) or #0f0f14 (darker variant)
Border:           1px solid #1f1f28 (BORDER_DEFAULT)
Text:             #ffffff (TEXT_PRIMARY)
Placeholder:      #6b6b78 (TEXT_QUATERNARY)
Height:           40px (10 * 4px)
Padding:          12px horizontal
Border Radius:    6px (RADIUS_MD)
Font:             14px normal (FONT_SM, WEIGHT_NORMAL)
```

#### States

```
DEFAULT:
  background: #14141a
  border: #1f1f28

HOVER:
  border: #2a2a35 (BORDER_STRONG)

FOCUS:
  outline: none
  border: rgba(61, 99, 221, 0.5)
  ring: 3px rgba(61, 99, 221, 0.1)
  transition: TRANSITION_FAST

ERROR:
  border: #ef4444
  ring: 3px rgba(239, 68, 68, 0.2)

DISABLED:
  opacity: 0.5
  cursor: not-allowed
  background: #14141a
```

#### Input Types
```
text, email, password, number, tel, url, search, date, time, datetime-local
```

#### Accessibility
```
Role:              textbox
Label:             Associated <label> or aria-label
Placeholder:       Optional, not replacement for label
Error:             aria-invalid="true", aria-describedby="error-id"
Required:          aria-required="true"
```

---

### Select

#### Purpose
Dropdown selection control.

#### Trigger Visual Specs

```
Background:       #0f0f14 or #14141a
Border:           1px solid #1f1f28
Text:             #ffffff
Height:           40px (10 * 4px)
Padding:          12px left, 36px right (for chevron)
Border Radius:    6px (RADIUS_MD)
Font:             14px normal
Chevron:          #6b6b78, size 16px, positioned right 12px
```

#### Dropdown Visual Specs

```
Background:       #14141a (SURFACE_RAISED)
Border:           1px solid #2a2a35 (BORDER_STRONG)
Border Radius:    8px (RADIUS_LG)
Shadow:           ELEVATION_LG
Max Height:       300px (scrollable)
Padding:          4px vertical
Animation:        Fade in + scale from 95% to 100%, 150ms
```

#### Item Visual Specs

```
Padding:          8px 12px
Font:             14px normal
Text:             #ffffff

HOVER:
  background: #1f1f28 (SURFACE_OVERLAY)

SELECTED:
  background: rgba(61, 99, 221, 0.1)
  text: #3d63dd (PRIMARY_600)
  
DISABLED:
  opacity: 0.5
  cursor: not-allowed
```

#### States

```
DEFAULT: Same as Input default
HOVER:   Same as Input hover
FOCUS:   Same as Input focus
OPEN:    border: rgba(61, 99, 221, 0.5)
```

#### Accessibility
```
Role:              combobox
Expanded:          aria-expanded="true/false"
Selected:          aria-selected="true" on active option
Keyboard:          Arrow keys to navigate, Enter to select, Esc to close
```

---

### Textarea

#### Purpose
Multi-line text input.

#### Visual Specs

```
Background:       #14141a (SURFACE_RAISED)
Border:           1px solid #1f1f28
Text:             #ffffff
Placeholder:      #6b6b78
Min Height:       100px
Padding:          12px
Border Radius:    6px (RADIUS_MD)
Font:             14px normal
Line Height:      1.5
Resize:           vertical (can be none)
```

#### States
```
Same as Input component
```

#### Accessibility
```
Same as Input component
Role:              textbox
Multiline:         aria-multiline="true"
```

---

### Switch

#### Purpose
Toggle control for binary choices.

#### Visual Specs

```
CONTAINER:
  width: 32px
  height: 18px
  border-radius: 9999px (RADIUS_FULL)

THUMB:
  width: 16px
  height: 16px
  border-radius: 9999px
  background: #ffffff
```

#### States

```
OFF:
  container background: rgba(255, 255, 255, 0.1)
  thumb position: 1px from left
  thumb background: #ffffff

ON:
  container background: #3d63dd (PRIMARY_600)
  thumb position: translate 14px (right side)
  thumb background: #ffffff
  transition: TRANSITION_FAST

HOVER (OFF):
  container background: rgba(255, 255, 255, 0.15)

HOVER (ON):
  container background: #3451b2 (PRIMARY_700)

FOCUS:
  ring: 3px rgba(61, 99, 221, 0.3)
  ring-offset: 2px

DISABLED:
  opacity: 0.5
  cursor: not-allowed
```

#### Accessibility
```
Role:              switch
Checked:           aria-checked="true/false"
Keyboard:          Space/Enter to toggle
Label:             aria-label or associated label
```

---

### Checkbox

#### Purpose
Multi-select control for options.

#### Visual Specs

```
SIZE:             16px × 16px
BORDER:           1.5px solid #2a2a35 (BORDER_STRONG)
BORDER_RADIUS:    4px (RADIUS)
BACKGROUND:       #14141a (unchecked)

CHECKMARK:
  color: #ffffff
  stroke-width: 2px
  size: 12px (centered)
```

#### States

```
UNCHECKED:
  background: #14141a
  border: #2a2a35

CHECKED:
  background: #3d63dd (PRIMARY_600)
  border: #3d63dd
  checkmark: visible, white

HOVER (UNCHECKED):
  border: #3d63dd with 50% opacity

HOVER (CHECKED):
  background: #3451b2 (PRIMARY_700)

FOCUS:
  ring: 3px rgba(61, 99, 221, 0.3)
  ring-offset: 2px

DISABLED:
  opacity: 0.5
  cursor: not-allowed
```

#### Accessibility
```
Role:              checkbox
Checked:           aria-checked="true/false"
Keyboard:          Space to toggle
Label:             Associated label or aria-label
```

---

### Radio Group

#### Purpose
Single-select control from multiple options.

#### Visual Specs (Individual Radio)

```
SIZE:             16px × 16px
BORDER:           1.5px solid #2a2a35
BORDER_RADIUS:    9999px (RADIUS_FULL - circle)
BACKGROUND:       #14141a (unchecked)

DOT (selected):
  size: 8px (centered)
  background: #ffffff
  border-radius: full
```

#### States

```
UNSELECTED:
  background: #14141a
  border: #2a2a35

SELECTED:
  background: #3d63dd
  border: #3d63dd
  dot: visible, white

HOVER (UNSELECTED):
  border: #3d63dd with 50% opacity

HOVER (SELECTED):
  background: #3451b2

FOCUS:
  ring: 3px rgba(61, 99, 221, 0.3)
  ring-offset: 2px

DISABLED:
  opacity: 0.5
  cursor: not-allowed
```

#### Accessibility
```
Role:              radio
Checked:           aria-checked="true/false"
Group:             role="radiogroup"
Keyboard:          Arrow keys to navigate, Space to select
Label:             Associated label or aria-label
```

---

### Badge

#### Purpose
Small label for status, categories, or counts.

#### Visual Specs

```
Padding:          4px 8px (SPACE_1 SPACE_2)
Border Radius:    4px (RADIUS)
Font:             11px medium (slightly smaller than FONT_XS)
Border:           1px solid
Letter Spacing:   0.01em
```

#### Variants

##### Status Badges

**Success:**
```
background: rgba(16, 185, 129, 0.2)   // SUCCESS_BG
text: #34d399 (lighter green)
border: rgba(16, 185, 129, 0.3)
```

**Warning:**
```
background: rgba(245, 158, 11, 0.2)
text: #fbbf24 (lighter amber)
border: rgba(245, 158, 11, 0.3)
```

**Error:**
```
background: rgba(239, 68, 68, 0.2)
text: #f87171 (lighter red)
border: rgba(239, 68, 68, 0.3)
```

**Info:**
```
background: rgba(59, 130, 246, 0.2)
text: #60a5fa (lighter blue)
border: rgba(59, 130, 246, 0.3)
```

**Primary:**
```
background: rgba(61, 99, 221, 0.1)
text: #3d63dd
border: rgba(61, 99, 221, 0.3)
```

**Neutral:**
```
background: rgba(107, 107, 120, 0.1)
text: #9b9ba5 (TEXT_TERTIARY)
border: rgba(107, 107, 120, 0.3)
```

#### States

```
DEFAULT: As specified above
HOVER:   Slightly increased opacity on background (optional)
```

#### Accessibility
```
Role:              status (if dynamic) or presentation
Screen Reader:     Include status in aria-label if icon only
Example:           aria-label="Status: Published"
```

---

### Label

#### Purpose
Text label for form inputs.

#### Visual Specs

```
Font:             12px medium (FONT_XS, WEIGHT_MEDIUM)
Color:            #9b9ba5 (TEXT_TERTIARY)
Margin Bottom:    8px (SPACE_2)
Display:          flex (for icons/badges)
Gap:              6px (SPACE_1_5)
```

#### With Required Indicator

```
Required asterisk:
  color: #ef4444 (ERROR)
  font: inherit
  position: after label text or inline
```

#### With Help Text

```
Help text below label:
  font: 11px normal
  color: #6b6b78 (TEXT_QUATERNARY)
  margin-top: 4px
```

#### Accessibility
```
Element:           <label> with for attribute
Association:       Links to input via for="input-id"
Required:          Visual asterisk + aria-required on input
Help Text:         Use aria-describedby on input
```

---

### Tabs

#### Purpose
Navigation between different content sections.

#### Container (TabsList)

```
Background:       transparent
Border Bottom:    1px solid #1f1f28 (BORDER_DEFAULT)
Height:           auto
Padding:          0
Display:          flex
Gap:              2px (SPACE_0_5)
```

#### Tab Trigger

```
Padding:          10px 16px (SPACE_2_5 SPACE_4)
Font:             13px medium (between FONT_XS and FONT_SM)
Text Transform:   uppercase (optional based on design)
Letter Spacing:   0.05em (wider)
Border Bottom:    2px solid transparent
Background:       transparent
```

**States:**
```
DEFAULT:
  text: #6b6b78 (TEXT_QUATERNARY)
  background: transparent
  border-bottom: transparent

HOVER:
  text: #ffffff
  background: rgba(20, 20, 26, 0.4)
  transition: TRANSITION_FAST

ACTIVE/SELECTED:
  text: #ffffff
  background: transparent
  border-bottom: 2px solid #3d63dd
  (Optional: Add slide-in animation for border)

FOCUS:
  outline: none
  ring: 2px rgba(61, 99, 221, 0.3)
```

#### Tab Content

```
Margin Top:       0
Padding:          Defined by content (usually 24px top)
Animation:        Fade in on switch (150ms)
```

#### Accessibility
```
Role:              tablist (container), tab (trigger), tabpanel (content)
Selected:          aria-selected="true/false"
Controls:          aria-controls="panel-id"
Keyboard:          Arrow keys to navigate, Space/Enter to select
Tab Index:         Only selected tab is focusable
```

---

### Card

#### Purpose
Container for grouped content.

#### Visual Specs

```
Background:       #14141a (SURFACE_RAISED)
Border:           1px solid #1f1f28 (BORDER_DEFAULT)
Border Radius:    8px (RADIUS_LG)
Padding:          16px (SPACE_4) or 24px (SPACE_6)
```

#### Optional Features

**With Hover Effect:**
```
HOVER:
  background: #1f1f28 (SURFACE_OVERLAY)
  border: #2a2a35 (BORDER_STRONG)
  transform: translateY(-1px)
  shadow: ELEVATION_MD
  transition: TRANSITION_BASE
```

**Header Section:**
```
Border Bottom:    1px solid #1f1f28
Padding Bottom:   16px
Margin Bottom:    16px
```

**Footer Section:**
```
Border Top:       1px solid #1f1f28
Padding Top:      16px
Margin Top:       16px
```

#### Variants

**Elevated Card:**
```
shadow: ELEVATION_MD
(add ELEVATION_LG on hover)
```

**Interactive Card:**
```
cursor: pointer
All hover effects enabled
```

---

### Table

#### Purpose
Display structured tabular data.

#### Container

```
Width:            100%
Border:           1px solid #1f1f28 (BORDER_DEFAULT)
Border Radius:    8px (RADIUS_LG)
Overflow:         hidden
Background:       #14141a (SURFACE_RAISED)
```

#### Table Header (thead)

```
Background:       #0a0a0f (SURFACE_BASE) or transparent
Border Bottom:    1px solid #1f1f28
```

**Header Cell (th):**
```
Padding:          12px 16px (SPACE_3 SPACE_4)
Font:             12px semibold (FONT_XS, WEIGHT_SEMIBOLD)
Color:            #9b9ba5 (TEXT_TERTIARY)
Text Transform:   uppercase
Letter Spacing:   0.05em
Text Align:       left (or center/right as needed)
```

#### Table Body (tbody)

**Row (tr):**
```
Border Bottom:    1px solid #1f1f28

HOVER:
  background: #1f1f28 (SURFACE_OVERLAY)
  transition: TRANSITION_FAST
```

**Cell (td):**
```
Padding:          12px 16px (SPACE_3 SPACE_4)
Font:             14px normal (FONT_SM)
Color:            #ffffff (TEXT_PRIMARY)
Vertical Align:   middle
```

#### States

**Selected Row:**
```
background: rgba(61, 99, 221, 0.1)
border-left: 2px solid #3d63dd
```

**Striped Rows (optional):**
```
even rows: background: rgba(255, 255, 255, 0.02)
```

#### Accessibility
```
Element:           <table>
Headers:           <th> with scope="col" or scope="row"
Caption:           <caption> for table description
Complex Tables:    aria-labelledby, aria-describedby
Sortable:          aria-sort="ascending/descending/none"
```

---

### Dialog/Modal

#### Purpose
Overlay window for focused tasks or information.

#### Overlay (Backdrop)

```
Background:       rgba(0, 0, 0, 0.7) (semi-transparent black)
Backdrop Filter:  blur(4px) (optional glassmorphism)
Position:         fixed, full viewport
Z-Index:          1000+
Animation:        Fade in (150ms)
```

#### Dialog Container

```
Background:       #14141a (SURFACE_RAISED)
Border:           1px solid #2a2a35 (BORDER_STRONG)
Border Radius:    12px (RADIUS_XL)
Shadow:           ELEVATION_2XL
Max Width:        500px (default), 600px (medium), 800px (large)
Padding:          24px (SPACE_6)
Position:         centered (horizontal & vertical)
Animation:        Fade in + scale from 95% to 100% (200ms)
```

#### Header

```
Margin Bottom:    16px (SPACE_4)
Border Bottom:    1px solid #1f1f28 (optional)
Padding Bottom:   16px (if border present)

Title:
  font: 18px medium (FONT_LG, WEIGHT_MEDIUM)
  color: #ffffff

Close Button:
  position: absolute top-right
  size: 32px × 32px
  icon: X (16px)
  background: transparent
  hover background: #1f1f28
  color: #6b6b78
  hover color: #ffffff
```

#### Body

```
Padding:          0 (handled by dialog container)
Max Height:       60vh (scrollable if needed)
Color:            #9b9ba5 (TEXT_TERTIARY) for body text
```

#### Footer

```
Border Top:       1px solid #1f1f28
Padding Top:      16px
Margin Top:       16px
Display:          flex
Justify:          flex-end (right-aligned buttons)
Gap:              8px (SPACE_2)
```

#### Accessibility
```
Role:              dialog or alertdialog
Labeled By:        aria-labelledby="dialog-title"
Described By:      aria-describedby="dialog-description"
Modal:             aria-modal="true"
Focus Trap:        Keep focus within dialog
Keyboard:          Esc to close, Tab to navigate
Initial Focus:     First focusable element or close button
```

---

### Dropdown Menu

#### Purpose
Contextual menu triggered by a button or action.

#### Trigger Button

```
Usually: Ghost or Icon button variant
Icon:    MoreVertical (3 vertical dots) size 20px
```

#### Menu Container

```
Background:       #14141a (SURFACE_RAISED)
Border:           1px solid #2a2a35 (BORDER_STRONG)
Border Radius:    8px (RADIUS_LG)
Shadow:           ELEVATION_LG
Min Width:        180px
Max Width:        300px
Padding:          4px vertical (SPACE_1)
Animation:        Fade in + slide down 8px (150ms)
Z-Index:          50
```

#### Menu Item

```
Padding:          8px 12px (SPACE_2 SPACE_3)
Font:             14px normal (FONT_SM)
Color:            #ffffff
Display:          flex
Align Items:      center
Gap:              8px (SPACE_2) (for icons)

HOVER:
  background: #1f1f28 (SURFACE_OVERLAY)
  cursor: pointer

ACTIVE:
  background: #2a2a35 (SURFACE_ELEVATED)

DISABLED:
  opacity: 0.5
  cursor: not-allowed
  no hover effect

DESTRUCTIVE:
  color: #ef4444 (ERROR)
  hover background: rgba(239, 68, 68, 0.1)
```

#### Menu Separator

```
Height:           1px
Background:       #1f1f28 (BORDER_DEFAULT)
Margin:           4px 0 (SPACE_1)
```

#### With Icons

```
Icon Size:        16px
Icon Color:       #6b6b78 (TEXT_QUATERNARY)
Icon Position:    Left of text
```

#### Accessibility
```
Role:              menu (container), menuitem (items)
Orientation:       aria-orientation="vertical"
Keyboard:          Arrow keys to navigate, Enter to select, Esc to close
Focus:             First item on open
```

---

### Popover

#### Purpose
Floating content container anchored to an element.

#### Container

```
Background:       #14141a (SURFACE_RAISED)
Border:           1px solid #2a2a35 (BORDER_STRONG)
Border Radius:    8px (RADIUS_LG)
Shadow:           ELEVATION_LG
Padding:          16px (SPACE_4)
Max Width:        400px
Animation:        Fade in + scale from 95% (150ms)
Z-Index:          50

Arrow (optional):
  size: 8px
  color: #14141a (matches background)
  border: matches container border
```

#### Positioning

```
Preferred:        Bottom (below trigger)
Fallback:         Top, Left, Right
Offset:           8px from trigger
Alignment:        Start, Center, or End
```

#### Accessibility
```
Role:              dialog or region
Labeled By:        aria-labelledby
Described By:      aria-describedby
Keyboard:          Esc to close, Tab to navigate
Focus Management:  Return focus to trigger on close
```

---

### Tooltip

#### Purpose
Brief informational text on hover/focus.

#### Visual Specs

```
Background:       rgba(20, 20, 26, 0.95) (semi-opaque dark)
Backdrop Filter:  blur(8px) (glassmorphism)
Border:           1px solid rgba(255, 255, 255, 0.1)
Border Radius:    4px (RADIUS)
Padding:          6px 12px (SPACE_1_5 SPACE_3)
Font:             12px normal (FONT_XS)
Color:            #ffffff
Max Width:        250px
Shadow:           ELEVATION_SM
Z-Index:          60

Arrow:
  size: 6px
  color: matches background
```

#### Behavior

```
Trigger:          Hover (mouse) + Focus (keyboard)
Delay:            300ms (to avoid flashing)
Hide:             On mouse leave + blur
Animation:        Fade in (100ms)
Positioning:      Same as Popover (prefers bottom)
```

#### Accessibility
```
Role:              tooltip
Described By:      aria-describedby on trigger element
Keyboard:          Visible on focus, hidden on blur
Content:           Brief, supplementary text only
```

---

### Separator

#### Purpose
Visual divider between sections or elements.

#### Horizontal

```
Width:            100%
Height:           1px
Background:       #1f1f28 (BORDER_DEFAULT)
Margin:           16px 0 (SPACE_4) or 24px 0 (SPACE_6)
```

#### Vertical

```
Width:            1px
Height:           100% or specific (e.g., 24px)
Background:       #1f1f28 (BORDER_DEFAULT)
Margin:           0 16px (SPACE_4) or 0 8px (SPACE_2)
```

#### Variants

**Subtle:**
```
background: rgba(255, 255, 255, 0.05) (BORDER_SUBTLE)
```

**Strong:**
```
background: #2a2a35 (BORDER_STRONG)
```

#### Accessibility
```
Role:              separator
Orientation:       aria-orientation="horizontal/vertical"
Decorative:        role="presentation" if purely visual
```

---

### Skeleton

#### Purpose
Loading placeholder that mimics content structure.

#### Visual Specs

```
Background:       #1f1f28 (SURFACE_OVERLAY)
Border Radius:    4px (RADIUS) or match content shape
Animation:        Shimmer/Pulse effect
```

#### Shimmer Animation

```
@keyframes shimmer {
  0%:   transform: translateX(-100%)
  100%: transform: translateX(100%)
}

Overlay:
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.03),
    transparent
  )
  animation: shimmer 2s infinite
```

#### Common Shapes

**Text Line:**
```
height: 14px (matches text height)
width: 100% or specific (e.g., 60%, 80%)
border-radius: 4px
```

**Circle (Avatar):**
```
width: 40px (or size)
height: 40px
border-radius: 9999px
```

**Rectangle (Image):**
```
aspect-ratio: 16/9 or 1/1 or 2/3
border-radius: 8px
```

#### Accessibility
```
Role:              status
Aria Label:        aria-label="Loading..." or aria-busy="true"
Live Region:       aria-live="polite"
```

---

### Progress

#### Purpose
Visual indicator of completion status.

#### Linear Progress

```
CONTAINER:
  width: 100%
  height: 8px
  background: #1f1f28 (SURFACE_OVERLAY)
  border-radius: 9999px (RADIUS_FULL)
  overflow: hidden

BAR:
  height: 100%
  background: #3d63dd (PRIMARY_600)
  border-radius: 9999px
  transition: width TRANSITION_BASE
  
INDETERMINATE:
  animation: slide back and forth
  width: 40% (of container)
```

#### Circular Progress (Spinner)

```
SIZE:             20px, 24px, 32px (variants)
STROKE_WIDTH:     2px
COLOR:            #3d63dd (PRIMARY_600)
ANIMATION:        rotate 360deg, 1s linear infinite
BACKGROUND:       optional track in #1f1f28
```

#### Accessibility
```
Role:              progressbar
Value:             aria-valuenow (0-100)
Min/Max:           aria-valuemin="0" aria-valuemax="100"
Label:             aria-label="Loading progress"
Indeterminate:     aria-valuenow omitted
```

---

### Slider

#### Purpose
Input control for selecting a value from a range.

#### Visual Specs

```
TRACK:
  width: 100%
  height: 4px
  background: #1f1f28 (SURFACE_OVERLAY)
  border-radius: 9999px (RADIUS_FULL)

FILLED_TRACK (active range):
  height: 4px
  background: #3d63dd (PRIMARY_600)
  border-radius: 9999px

THUMB:
  width: 16px
  height: 16px
  background: #ffffff
  border: 2px solid #3d63dd
  border-radius: 9999px
  shadow: ELEVATION_SM
  cursor: grab

THUMB (dragging):
  cursor: grabbing
  transform: scale(1.1)
  shadow: ELEVATION_MD
```

#### States

```
HOVER (thumb):
  transform: scale(1.1)
  shadow: ELEVATION_MD

FOCUS (thumb):
  ring: 3px rgba(61, 99, 221, 0.3)
  ring-offset: 2px

DISABLED:
  opacity: 0.5
  cursor: not-allowed
  thumb: no hover/drag
```

#### Accessibility
```
Role:              slider
Value:             aria-valuenow
Min/Max:           aria-valuemin, aria-valuemax
Label:             aria-label or associated label
Keyboard:          Arrow keys to adjust, Home/End for min/max
Step:              Defined increment (default 1)
```

---

## Composite Components

### Section Header

#### Purpose
Collapsible section header with icon and title.

#### Visual Specs

```
Container:
  position: sticky
  top: 0
  z-index: 10
  background: #0a0a0f (SURFACE_BASE)
  border-bottom: 1px solid #1f1f28

Button (full width):
  display: flex
  align-items: center
  justify-content: space-between
  padding: 12px 24px (SPACE_3 SPACE_6)
  transition: TRANSITION_FAST
  
HOVER:
  background: rgba(20, 20, 26, 0.4)

LEFT SECTION:
  display: flex
  align-items: center
  gap: 8px (SPACE_2)
  
  Icon:
    size: 14px
    color: #3d63dd (PRIMARY_600)
  
  Title:
    font: 14px semibold (FONT_SM, WEIGHT_SEMIBOLD)
    color: #ffffff
    text-transform: uppercase (optional)
    letter-spacing: 0.05em

RIGHT SECTION:
  Chevron Icon:
    size: 16px
    color: #6b6b78 (TEXT_QUATERNARY)
    transition: transform TRANSITION_FAST
    
  EXPANDED:
    transform: rotate(180deg)
  
  HOVER (chevron):
    color: #ffffff
```

#### States

```
COLLAPSED:
  content hidden
  chevron down

EXPANDED:
  content visible
  chevron up (rotated 180deg)
```

#### Accessibility
```
Role:              button
Expanded:          aria-expanded="true/false"
Controls:          aria-controls="section-content-id"
Keyboard:          Enter/Space to toggle
```

---

### Quick Navigation

#### Purpose
Horizontal list of navigation shortcuts to page sections.

#### Container

```
Border Bottom:    1px solid #1f1f28
Padding:          24px (SPACE_6 vertical and horizontal)
```

#### Title Section

```
Display:          flex
Align Items:      center
Gap:              8px (SPACE_2)
Margin Bottom:    12px (SPACE_3)

Icon:
  size: 14px
  color: #3d63dd (PRIMARY_600)

Title:
  font: 12px semibold (FONT_XS, WEIGHT_SEMIBOLD)
  color: #ffffff
  text-transform: uppercase
  letter-spacing: 0.05em (wider)
```

#### Buttons Container

```
Display:          flex
Flex Wrap:        wrap
Gap:              8px (SPACE_2)
```

#### Navigation Button

```
Display:          flex
Align Items:      center
Gap:              6px (SPACE_1_5)
Padding:          6px 12px (SPACE_1_5 SPACE_3)
Font:             12px normal (FONT_XS)
Background:       #14141a (SURFACE_RAISED)
Border:           1px solid #2a2a35 (BORDER_STRONG)
Border Radius:    4px (RADIUS)
Color:            #9b9ba5 (TEXT_TERTIARY)
Transition:       TRANSITION_FAST

Icon:
  size: 12px
  color: inherit

HOVER:
  color: #ffffff
  border: #3d63dd (PRIMARY_600)
  background: rgba(61, 99, 221, 0.05)

ACTIVE:
  background: rgba(61, 99, 221, 0.1)
```

#### Accessibility
```
Role:              navigation
Button Role:       button or link
Keyboard:          Tab to navigate, Enter/Space to activate
Label:             aria-label="Quick navigation to page sections"
```

---

### Breadcrumb

#### Purpose
Hierarchical navigation showing current location.

#### Container

```
Border Bottom:    1px solid #1f1f28
Background:       #0a0a0f (SURFACE_BASE)
Padding:          12px 24px (SPACE_3 SPACE_6)
```

#### Layout

```
Display:          flex
Align Items:      center
Gap:              8px (SPACE_2)
```

#### Back Button (First Item)

```
Display:          flex
Align Items:      center
Gap:              8px (SPACE_2)
Background:       transparent
Border:           none
Color:            #6b6b78 (TEXT_QUATERNARY)
Font:             14px normal (FONT_SM)
Transition:       TRANSITION_FAST

Icon (ArrowLeft):
  size: 16px
  color: inherit
  
HOVER:
  color: #ffffff
  
  Icon:
    transform: translateX(-2px)
```

#### Separator

```
Icon (ChevronRight):
  size: 14px
  color: #2a2a35 (BORDER_STRONG)
```

#### Current Page

```
Font:             14px normal (FONT_SM)
Color:            #ffffff (TEXT_PRIMARY)
```

#### Accessibility
```
Role:              navigation
Aria Label:        aria-label="Breadcrumb navigation"
Current Page:      aria-current="page"
Keyboard:          Tab to navigate, Enter to activate links
```

---

### Data Table

#### Purpose
Advanced table with sorting, filtering, pagination.

#### Features

**Extends Base Table with:**

1. **Sortable Columns**
   ```
   Header with sort icon (size 14px):
     - Unsorted: both arrows in #6b6b78
     - Ascending: up arrow #3d63dd
     - Descending: down arrow #3d63dd
   
   Hover on header: 
     background: rgba(255, 255, 255, 0.05)
     cursor: pointer
   ```

2. **Row Selection**
   ```
   Checkbox in first column
   Selected row:
     background: rgba(61, 99, 221, 0.1)
     border-left: 2px solid #3d63dd
   ```

3. **Pagination**
   ```
   Container:
     display: flex
     justify-content: space-between
     align-items: center
     padding: 12px 16px
     border-top: 1px solid #1f1f28
   
   Page Info:
     font: 14px normal
     color: #9b9ba5
   
   Page Buttons:
     size: 32px × 32px
     background: transparent
     border: 1px solid #2a2a35
     border-radius: 4px
     
     HOVER:
       background: #1f1f28
     
     ACTIVE/CURRENT:
       background: #3d63dd
       color: #ffffff
       border: #3d63dd
   ```

4. **Filters**
   ```
   Filter row above table
   Each filter: Small Select or Input
   Background: #14141a
   ```

#### Accessibility
```
Extends base table accessibility
Sortable:          aria-sort="ascending/descending/none"
Selection:         aria-selected="true/false" on rows
Pagination:        aria-label on nav buttons
Live Region:       aria-live="polite" for updates
```

---

### History Timeline

#### Purpose
Chronological list of events/changes.

#### Container

```
Display:          flex
Flex Direction:   column
Gap:              0 (items connect visually)
```

#### Timeline Item

```
Display:          flex
Gap:              16px (SPACE_4)
Padding Bottom:   20px (SPACE_5)
Position:         relative

LAST ITEM:
  padding-bottom: 0
```

#### Timeline Line (Connector)

```
Position:         absolute
Left:             7px (center of dot)
Top:              16px (below dot)
Bottom:           0
Width:            2px
Background:       #2a2a35 (BORDER_STRONG)

LAST ITEM:
  display: none (no line after last item)
```

#### Timeline Dot

```
Width:            14px
Height:           14px
Border Radius:    9999px (RADIUS_FULL)
Border:           2px solid #3d63dd (PRIMARY_600)
Background:       #0a0a0f (SURFACE_BASE)
Flex Shrink:      0
Position:         relative
Z-Index:          1

VARIANTS:
  Success: border-color: #10b981
  Warning: border-color: #f59e0b
  Error:   border-color: #ef4444
```

#### Content Section

```
Flex:             1

Title:
  font: 14px medium (FONT_SM, WEIGHT_MEDIUM)
  color: #ffffff
  margin-bottom: 4px

Description:
  font: 13px normal
  color: #9b9ba5 (TEXT_TERTIARY)
  margin-bottom: 4px

Timestamp:
  font: 12px normal (FONT_XS)
  color: #6b6b78 (TEXT_QUATERNARY)

Metadata (optional):
  display: flex
  gap: 8px
  margin-top: 8px
  
  Badge or small text showing user, action type, etc.
```

#### Accessibility
```
Role:              list (container), listitem (items)
Semantic:          Use <time> for timestamps
Order:             Chronological (newest first or last)
Screen Reader:     Descriptive text for each event
```

---

## Layout Components

### Page Layout

#### Purpose
Standard full-page layout structure.

#### Structure

```
CONTAINER:
  display: flex
  flex-direction: column
  height: 100vh
  background: #0a0a0f (SURFACE_BASE)

HEADER:
  flex-shrink: 0
  border-bottom: 1px solid #1f1f28
  background: #0a0a0f
  
  Common patterns:
    - Breadcrumb (as specified above)
    - Page title with actions
    - Tabs navigation

CONTENT:
  flex: 1
  overflow: auto
  
  Common patterns:
    - Full width
    - Centered max-width (e.g., 1200px)
    - With sidebar (flex layout)

FOOTER (optional):
  flex-shrink: 0
  border-top: 1px solid #1f1f28
  padding: 16px 24px
  background: #0a0a0f
```

---

### Details Panel

#### Purpose
Right-side sliding panel for viewing/editing details.

#### Container

```
Width:            400px (fixed) or 500px
Height:           100vh
Position:         fixed or flex item
Right:            0
Top:              0
Background:       #0a0a0f (SURFACE_BASE)
Border Left:      1px solid #1f1f28
Display:          flex
Flex Direction:   column
Z-Index:          40 (if fixed/overlay)

Animation (slide in):
  from: translateX(100%)
  to: translateX(0)
  duration: TRANSITION_BASE
```

#### Header

```
Flex Shrink:      0
Padding:          16px 24px (SPACE_4 SPACE_6)
Border Bottom:    1px solid #1f1f28
Background:       #0a0a0f

Display:          flex
Align Items:      center
Justify Content:  space-between

Title:
  font: 18px medium (FONT_LG, WEIGHT_MEDIUM)
  color: #ffffff

Close Button:
  size: 32px
  icon size: 16px
  variant: ghost
```

#### Content

```
Flex:             1
Overflow Y:       auto
Padding:          24px (SPACE_6)
```

#### Footer (optional)

```
Flex Shrink:      0
Border Top:       1px solid #1f1f28
Padding:          16px 24px
Background:       #0a0a0f

Display:          flex
Justify Content:  flex-end (right-aligned)
Gap:              8px
```

#### Sections Within Panel

```
Collapsible sections using Section Header component
Each section separated by border or spacing
```

---

### Main Layout

#### Purpose
Application shell with top navigation.

#### Structure

```
TOP NAV:
  height: 56px
  background: #0a0a0f
  border-bottom: 1px solid #1f1f28
  padding: 0 24px
  display: flex
  align-items: center
  gap: 32px
  
  Logo/Title:
    font: 18px semibold
    color: #ffffff
  
  Nav Links:
    display: flex
    gap: 4px
    
    Link:
      padding: 8px 16px
      font: 14px medium
      color: #9b9ba5
      border-radius: 4px
      
      HOVER:
        color: #ffffff
        background: rgba(255, 255, 255, 0.05)
      
      ACTIVE:
        color: #ffffff
        background: rgba(61, 99, 221, 0.1)
        border-bottom: 2px solid #3d63dd (optional)

CONTENT AREA:
  height: calc(100vh - 56px)
  overflow: auto
```

---

## Animations & Transitions

### Fade In
```
@keyframes fadeIn {
  from:
    opacity: 0
    transform: translateY(8px)
  to:
    opacity: 1
    transform: translateY(0)
}

Duration: 150-250ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### Page Enter
```
@keyframes pageEnter {
  from:
    opacity: 0
    transform: scale(0.98)
  to:
    opacity: 1
    transform: scale(1)
}

Duration: 200ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### Slide In (Panel)
```
@keyframes slideIn {
  from:
    transform: translateX(100%)
  to:
    transform: translateX(0)
}

Duration: 250ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### Shimmer (Loading)
```
@keyframes shimmer {
  from:
    transform: translateX(-100%)
  to:
    transform: translateX(100%)
}

Duration: 2s
Easing: linear
Iteration: infinite

Gradient:
  linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.03),
    transparent
  )
```

### Pulse (Subtle)
```
@keyframes pulse-subtle {
  0%, 100%:
    opacity: 1
  50%:
    opacity: 0.7
}

Duration: 2s
Easing: cubic-bezier(0.4, 0, 0.6, 1)
Iteration: infinite
```

### Hover Lift
```
HOVER:
  transform: translateY(-1px)
  transition: transform TRANSITION_FAST
```

### Button Press
```
ACTIVE:
  transform: scale(0.98)
  transition: transform 100ms
```

---

## Accessibility Requirements

### Keyboard Navigation
```
TAB:              Navigate forward through interactive elements
SHIFT + TAB:      Navigate backward
ENTER/SPACE:      Activate buttons, links, toggles
ARROW KEYS:       Navigate within components (tabs, menus, sliders)
ESCAPE:           Close modals, dropdowns, panels
HOME/END:         Jump to start/end (in lists, sliders)
```

### Focus Management
```
Focus Visible:    Always show clear focus indicator (ring)
Focus Trap:       Keep focus within modals/dialogs
Focus Return:     Return focus to trigger after closing
Skip Links:       Provide skip to main content link
Tab Order:        Logical and intuitive order
```

### Screen Reader Support
```
Semantic HTML:    Use proper elements (<button>, <nav>, <main>)
ARIA Labels:      Provide text for icon-only buttons
ARIA Described:   Link help text to form fields
Live Regions:     Announce dynamic content changes
Landmarks:        Use <header>, <nav>, <main>, <aside>, <footer>
Headings:         Proper hierarchy (h1 -> h2 -> h3)
```

### Color Contrast
```
All text meets WCAG AA standards (4.5:1 for normal, 3:1 for large)
Do not rely on color alone for information
Provide text alternatives for icons
```

### Interactive States
```
All interactive elements must have:
  - Default state
  - Hover state (mouse)
  - Focus state (keyboard)
  - Active state
  - Disabled state (if applicable)
  - Error state (for forms)
```

### Form Accessibility
```
Labels:           Every input has a visible label or aria-label
Required:         Indicated visually and with aria-required
Errors:           Announced with aria-invalid and aria-describedby
Help Text:        Linked with aria-describedby
Autocomplete:     Use autocomplete attributes
```

### Motion & Animation
```
Respect:          prefers-reduced-motion media query
Reduce:           Disable animations for users who prefer
Duration:         Keep animations under 500ms for accessibility
Avoid:            Flashing or strobing effects
```

---

## Implementation Notes

### Platform-Specific Considerations

**Web (React/CSS):**
- Use CSS variables for all design tokens
- Implement with Tailwind CSS utility classes
- Use Radix UI or Headless UI for accessibility

**Flutter:**
- Define Theme with all color/typography tokens
- Create custom widget library matching specs
- Use Material or Cupertino base with overrides

**SwiftUI:**
- Define Color and Font extensions
- Create ViewModifiers for reusable styles
- Use native SwiftUI components with styling

**Android:**
- Define theme in styles.xml
- Use Material Design Components with customization
- Create custom composables (Jetpack Compose)

### Responsive Behavior

**Breakpoints:**
```
Mobile:    < 640px
Tablet:    640px - 1024px
Desktop:   > 1024px
```

**Adaptations:**
- Reduce padding on mobile (16px instead of 24px)
- Stack layouts vertically on mobile
- Use bottom sheets instead of side panels on mobile
- Hamburger menu for navigation on mobile
- Touch targets minimum 44px × 44px on mobile

### Performance

- Lazy load images and heavy content
- Virtualize long lists (100+ items)
- Debounce search and filter inputs
- Use skeleton screens for loading states
- Optimize animations (use transform/opacity)
- Preload critical fonts

### Testing Checklist

- [ ] Keyboard navigation works for all interactions
- [ ] Screen reader announces all important information
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are always visible
- [ ] All form fields have proper labels
- [ ] Error states are clear and helpful
- [ ] Touch targets are at least 44px × 44px (mobile)
- [ ] Works with browser zoom up to 200%
- [ ] Respects prefers-reduced-motion
- [ ] Works without JavaScript (progressive enhancement)

---

## Conclusion

These specifications provide a comprehensive, platform-agnostic blueprint for recreating the EPG Planner / Editorial CMS UI. Each component has been detailed with exact measurements, colors, states, and behaviors to ensure visual and functional consistency across any implementation.

For questions or clarifications, refer to the original design system documentation or the React/Tailwind CSS implementation in the source codebase.

**Document Version:** 1.0  
**Last Updated:** March 2, 2026  
**Maintained By:** EPG Planner Development Team
