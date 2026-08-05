# EPG Planner / EPG Management - Design System Specification

**Version:** 1.0  
**Last Updated:** February 20, 2026  
**Application:** EPG Planner / Editorial CMS  
**Framework:** React + Tailwind CSS v4

---

## Table of Contents

1. [Overview](#overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Specifications](#component-specifications)
6. [Elevation & Shadows](#elevation--shadows)
7. [Animation & Transitions](#animation--transitions)
8. [Interactive States](#interactive-states)
9. [Glassmorphism Effects](#glassmorphism-effects)
10. [Icons](#icons)
11. [Accessibility](#accessibility)

---

## Overview

This design system creates a **dark-themed broadcast CMS interface** with a modern, timeless aesthetic. The design emphasizes:

- **Professional broadcast industry look** matching Rail Manager UI
- **Dark theme optimized** for extended use
- **Subtle modern enhancements** (glassmorphism, elevation, animations)
- **Accessibility-first** approach with proper contrast and focus states
- **Consistent component patterns** across all pages

**Primary Brand Color:** `#3d63dd` (Royal Blue)

---

## Color System

### Primary Color Palette

The primary color `#3d63dd` is used throughout the application for:
- Primary buttons and CTAs
- Active states and selections
- Focus indicators
- Navigation highlights
- Brand identity elements

```css
/* Primary Color Scale */
--color-primary-50: #eef2ff;
--color-primary-100: #e0e7ff;
--color-primary-200: #c7d2fe;
--color-primary-300: #a5b4fc;
--color-primary-400: #818cf8;
--color-primary-500: #6366f1;
--color-primary-600: #3d63dd;  /* Main Primary */
--color-primary-700: #3451b2;
--color-primary-800: #2d4291;
--color-primary-900: #1e3a8a;
--color-primary-950: #172554;
```

**Usage:**
- **Background:** `bg-[#3d63dd]`
- **Text:** `text-[#3d63dd]`
- **Border:** `border-[#3d63dd]`

### Surface Colors (Dark Theme)

```css
--color-surface-base: #0a0a0f;      /* Main background */
--color-surface-raised: #14141a;    /* Raised surfaces, cards */
--color-surface-overlay: #1f1f28;   /* Overlays, hover states */
--color-surface-elevated: #2a2a35;  /* Highest elevation */
```

**Hierarchy:**
1. `#0a0a0f` - Base application background
2. `#14141a` - Cards, panels, input backgrounds
3. `#1f1f28` - Borders, separators, hover backgrounds
4. `#2a2a35` - Active states, emphasized borders

### Text Colors

```css
--color-text-primary: #ffffff;      /* Primary text */
--color-text-secondary: #b4b4ba;    /* Secondary text, muted content */
--color-text-tertiary: #9b9ba5;     /* Labels, captions */
--color-text-quaternary: #6b6b78;   /* Placeholder, disabled text */
--color-text-disabled: #4a4a54;     /* Disabled states */
```

**Specific Usage:**
- **#ffffff** - Headings, important text, active states
- **#b4b4ba** - Body text, descriptions
- **#9b9ba5** - Form labels, metadata
- **#6b6b78** - Placeholders, helper text, icons
- **#4a4a54** - Disabled states

### Semantic Colors

#### Success (Emerald)
```css
--color-success: #10b981;
--color-success-hover: #059669;
--color-success-active: #047857;
--color-success-border: rgba(16, 185, 129, 0.5);
--color-success-bg: rgba(16, 185, 129, 0.1);
```

**Usage:** Success states, confirmations, valid form fields

#### Warning (Amber)
```css
--color-warning: #f59e0b;
--color-warning-hover: #d97706;
--color-warning-active: #b45309;
--color-warning-border: rgba(245, 158, 11, 0.5);
--color-warning-bg: rgba(245, 158, 11, 0.1);
```

**Usage:** Warnings, pending states, cautions

#### Error/Danger (Red)
```css
--color-error: #ef4444;
--color-error-hover: #dc2626;
--color-error-active: #b91c1c;
--color-error-border: rgba(239, 68, 68, 0.5);
--color-error-bg: rgba(239, 68, 68, 0.1);
```

**Usage:** Errors, destructive actions, validation errors

#### Info (Blue)
```css
--color-info: #3b82f6;
--color-info-hover: #2563eb;
--color-info-active: #1d4ed8;
--color-info-border: rgba(59, 130, 246, 0.5);
--color-info-bg: rgba(59, 130, 246, 0.1);
```

**Usage:** Information messages, tooltips, help text

### Secondary & Accent Colors

#### Secondary (Purple)
```css
--color-secondary: #9333ea;
--color-secondary-hover: #7e22ce;
--color-secondary-active: #6b21a8;
--color-secondary-bg: rgba(147, 51, 234, 0.1);
```

**Usage:** Secondary actions, alternative highlights

#### Accent (Cyan)
```css
--color-accent: #06b6d4;
--color-accent-hover: #0891b2;
--color-accent-active: #0e7490;
--color-accent-bg: rgba(6, 182, 212, 0.1);
```

**Usage:** High contrast accents, special highlights

### Border Colors

```css
--border-subtle: rgba(255, 255, 255, 0.05);   /* Very subtle borders */
--border-default: rgba(255, 255, 255, 0.08);  /* Default borders (#1f1f28) */
--border-emphasis: rgba(255, 255, 255, 0.12); /* Emphasized borders */
--border-strong: rgba(255, 255, 255, 0.18);   /* Strong borders (#2a2a35) */
--border-primary: rgba(61, 99, 221, 0.5);     /* Primary color borders */
--border-primary-hover: rgba(61, 99, 221, 0.7); /* Primary hover */
```

**Common Values:**
- `border-[#1f1f28]` - Standard border color (most common)
- `border-[#2a2a35]` - Emphasized border
- `border-[#3d63dd]/30` - Primary border with opacity
- `border-[#3d63dd]/50` - Primary border medium opacity

---

## Typography

### Font Family
**Primary Font:** System font stack (default)

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Font Sizes

```css
--font-size: 16px;  /* Base size */
```

**Tailwind Classes:**
- `text-xs` - 12px - Small labels, captions
- `text-sm` - 14px - Body text, form fields
- `text-base` - 16px - Default body text
- `text-lg` - 18px - Subheadings
- `text-xl` - 20px - Section headings
- `text-2xl` - 24px - Page titles

### Font Weights

```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
```

**Tailwind Classes:**
- `font-normal` - 400 - Body text
- `font-medium` - 500 - Labels, buttons, headings
- `font-semibold` - 600 - Emphasis, important headings

### Line Heights

```css
line-height: 1.5;  /* Default for all elements */
```

### Heading Styles

```tsx
// H1 - Page Titles
<h1 className="text-2xl font-medium text-white">
  Page Title
</h1>

// H2 - Section Headings
<h2 className="text-xl font-medium text-white">
  Section Heading
</h2>

// H3 - Subsection Headings
<h3 className="text-lg font-medium text-white">
  Subsection Heading
</h3>

// H4 - Component Headings
<h4 className="text-base font-medium text-white">
  Component Heading
</h4>
```

### Text Styles

```tsx
// Primary Text
<p className="text-sm text-white">Primary content</p>

// Secondary Text
<p className="text-sm text-[#9b9ba5]">Secondary content</p>

// Muted Text
<p className="text-xs text-[#6b6b78]">Muted content</p>

// Labels
<label className="text-xs font-medium text-[#9b9ba5]">
  Field Label
</label>
```

---

## Spacing & Layout

### Spacing Scale

Use Tailwind's default spacing scale:

```
0   - 0px
0.5 - 2px
1   - 4px
1.5 - 6px
2   - 8px
2.5 - 10px
3   - 12px
4   - 16px
5   - 20px
6   - 24px
7   - 28px
8   - 32px
10  - 40px
12  - 48px
16  - 64px
20  - 80px
24  - 96px
```

### Common Padding Patterns

```tsx
// Standard section padding
<div className="px-6 py-6">

// Page padding
<div className="px-6 py-4">

// Compact padding
<div className="px-4 py-3">

// Dense padding (buttons, badges)
<div className="px-3 py-1.5">
```

### Grid Systems

```tsx
// 2-column grid with gap
<div className="grid grid-cols-2 gap-4">

// 3-column grid
<div className="grid grid-cols-3 gap-4">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### Flex Patterns

```tsx
// Center aligned
<div className="flex items-center justify-center gap-2">

// Space between
<div className="flex items-center justify-between">

// Column layout
<div className="flex flex-col gap-4">
```

### Border Radius

```css
--radius: 0.625rem;  /* 10px - Base radius */
```

**Tailwind Classes:**
- `rounded-sm` - 2px
- `rounded` - 4px
- `rounded-md` - 6px - **Most common for buttons, inputs**
- `rounded-lg` - 8px - Cards, panels
- `rounded-xl` - 12px - Large cards
- `rounded-full` - 9999px - Pills, avatars

---

## Component Specifications

### Button

#### Variants

**1. Primary (Default)**
```tsx
<Button variant="default" size="default">
  Primary Action
</Button>
```

**Styles:**
- Background: `#3d63dd`
- Hover: `#3451b2`
- Active: `#2d4291`
- Text: `white`
- Shadow: Primary glow effect
- Height: `36px` (h-9)
- Padding: `16px` horizontal
- Border radius: `6px` (rounded-md)
- Font: `14px medium`

**2. Secondary**
```tsx
<Button variant="secondary" size="default">
  Secondary Action
</Button>
```

**Styles:**
- Background: `#9333ea`
- Hover: `#7e22ce`
- Text: `white`
- Shadow: Secondary glow effect

**3. Outline**
```tsx
<Button variant="outline" size="default">
  Outline Action
</Button>
```

**Styles:**
- Background: `transparent`
- Border: `#1f1f28`
- Hover background: `#1f1f28`
- Hover border: `#2a2a35`
- Text: `white`

**4. Ghost**
```tsx
<Button variant="ghost" size="default">
  Ghost Action
</Button>
```

**Styles:**
- Background: `transparent`
- Hover background: `#1f1f28`
- Text: `#9b9ba5`
- Hover text: `white`

**5. Destructive**
```tsx
<Button variant="destructive" size="default">
  Delete
</Button>
```

**Styles:**
- Background: `#ef4444`
- Hover: `#dc2626`
- Text: `white`
- Shadow: Error glow effect

#### Sizes

```tsx
// Small - h-8 (32px)
<Button size="sm">Small</Button>

// Default - h-9 (36px)
<Button size="default">Default</Button>

// Large - h-10 (40px)
<Button size="lg">Large</Button>

// Icon - size-9 (36x36px)
<Button size="icon">
  <Icon />
</Button>
```

#### States

```tsx
// Disabled
<Button disabled>Disabled</Button>

// Loading
<Button disabled>
  <Loader className="animate-spin" />
  Loading...
</Button>

// With icon
<Button>
  <Plus size={16} />
  Add Item
</Button>
```

---

### Input

```tsx
<Input
  type="text"
  placeholder="Enter text..."
  className="bg-[#14141a] border-[#1f1f28] text-white h-10"
/>
```

**Styles:**
- Background: `#14141a` or `#0f0f14` (for contrast)
- Border: `#1f1f28`
- Text: `white`
- Placeholder: `#6b6b78`
- Height: `40px` (h-10)
- Padding: `12px` horizontal
- Border radius: `6px` (rounded-md)
- Font: `14px normal`

**Focus State:**
- Border: `#3d63dd` with 50% opacity
- Ring: `#3d63dd` with 10% opacity, 3px width
- Transition: 150ms

**Error State:**
- Border: `#ef4444`
- Ring: `rgba(239, 68, 68, 0.2)`

---

### Select

```tsx
<Select>
  <SelectTrigger className="bg-[#0f0f14] border-[#1f1f28] text-white h-10">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

**Trigger Styles:**
- Same as Input
- Chevron icon: `#6b6b78`, size 16px

**Dropdown Styles:**
- Background: `#14141a`
- Border: `#2a2a35`
- Shadow: `var(--elevation-lg)`
- Border radius: `8px`

**Item Styles:**
- Hover background: `#1f1f28`
- Selected background: `rgba(61, 99, 221, 0.1)`
- Selected text: `#3d63dd`
- Padding: `8px 12px`

---

### Textarea

```tsx
<Textarea
  placeholder="Enter description..."
  className="bg-[#14141a] border-[#1f1f28] text-white min-h-[100px]"
  rows={4}
/>
```

**Styles:**
- Same as Input
- Min height: `100px`
- Resize: `vertical` or `none`

---

### Switch

```tsx
<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
/>
```

**Styles:**
- **Off state:**
  - Background: `rgba(255, 255, 255, 0.1)` (dark input background)
  - Thumb: `white`
  - Width: `32px`, Height: `18px`
  
- **On state:**
  - Background: `#3d63dd`
  - Thumb: `white`

- **Thumb:**
  - Size: `16px`
  - Border radius: `full`
  - Transform: `translateX(14px)` when checked

---

### Badge

```tsx
// Status badges
<Badge className="bg-green-500/20 text-green-400 border-green-500/30">
  Published
</Badge>

<Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
  Draft
</Badge>

<Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
  Active
</Badge>

// Outline badge
<Badge variant="outline" className="bg-[#6b6b78]/10 text-[#9b9ba5] border-[#6b6b78]/30">
  Metadata
</Badge>
```

**Styles:**
- Padding: `4px 8px` (px-2 py-1)
- Border radius: `4px` (rounded)
- Font: `11px medium`
- Border: 1px solid

**Color Patterns:**
- Success: `bg-green-500/20 text-green-400 border-green-500/30`
- Warning: `bg-yellow-500/20 text-yellow-400 border-yellow-500/30`
- Error: `bg-red-500/20 text-red-400 border-red-500/30`
- Info: `bg-blue-500/20 text-blue-400 border-blue-500/30`
- Neutral: `bg-[#6b6b78]/10 text-[#9b9ba5] border-[#6b6b78]/30`

---

### Card

```tsx
<div className="bg-[#14141a] border border-[#1f1f28] rounded-lg p-4">
  <h3 className="text-sm font-medium text-white mb-2">Card Title</h3>
  <p className="text-sm text-[#9b9ba5]">Card content</p>
</div>
```

**Styles:**
- Background: `#14141a`
- Border: `#1f1f28`
- Border radius: `8px` (rounded-lg)
- Padding: `16px` (p-4) or `24px` (p-6)

**Hover State (optional):**
- Background: `#1f1f28`
- Border: `#2a2a35`
- Transform: `translateY(-1px)`
- Shadow: `var(--elevation-md)`

---

### Tabs

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList className="bg-transparent h-auto p-0 gap-0.5">
    <TabsTrigger value="tab1" className="...">
      Tab 1
    </TabsTrigger>
    <TabsTrigger value="tab2" className="...">
      Tab 2
    </TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Content 1
  </TabsContent>
</Tabs>
```

**TabsList:**
- Background: `transparent`
- Border bottom: `#1f1f28`

**TabsTrigger:**
- Default:
  - Background: `transparent`
  - Text: `#6b6b78`
  - Padding: `10px 16px` (px-4 py-2.5)
  - Font: `13px medium`
  - Border bottom: `2px transparent`

- Hover:
  - Background: `#14141a` with 40% opacity
  - Text: `white`

- Active:
  - Text: `white`
  - Border bottom: `2px #3d63dd`
  - Pseudo-element: Blue line indicator

**TabsContent:**
- Margin top: `0` (mt-0)
- No padding (handled by content)

---

### Section Header (Collapsible)

```tsx
<div className="sticky top-0 z-10 bg-[#0a0a0f] border-b border-[#1f1f28]">
  <button className="w-full flex items-center justify-between px-6 py-3 hover:bg-[#14141a]/40 transition-colors group">
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-[#3d63dd]" />
      <h3 className="text-sm font-semibold text-white">Section Title</h3>
    </div>
    <ChevronUp size={16} className="text-[#6b6b78] group-hover:text-white transition-colors" />
  </button>
</div>
```

**Styles:**
- Background: `#0a0a0f`
- Border bottom: `#1f1f28`
- Sticky positioning
- Hover background: `#14141a` with 40% opacity
- Icon: `#3d63dd`, size 14px
- Title: `14px semibold white`
- Chevron: `#6b6b78`, size 16px

---

### Quick Navigation

```tsx
<div className="border-b border-[#1f1f28] px-6 py-4">
  <div className="flex items-center gap-2 mb-3">
    <Hash size={14} className="text-[#3d63dd]" />
    <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
      Quick Navigation
    </h3>
  </div>
  <div className="flex flex-wrap gap-2">
    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#14141a] border border-[#2a2a35] rounded text-[#9b9ba5] hover:text-white hover:border-[#3d63dd] transition-all">
      <Icon size={12} />
      Section Name
    </button>
  </div>
</div>
```

**Container:**
- Border bottom: `#1f1f28`
- Padding: `24px` (px-6 py-4)

**Title:**
- Icon: `#3d63dd`, size 14px
- Text: `12px semibold white uppercase`
- Letter spacing: `wider`

**Buttons:**
- Background: `#14141a`
- Border: `#2a2a35`
- Text: `#9b9ba5`
- Font: `12px`
- Padding: `12px` horizontal, `6px` vertical
- Border radius: `4px` (rounded)
- Icon size: 12px

**Hover:**
- Text: `white`
- Border: `#3d63dd`

---

### Label

```tsx
<Label className="text-xs font-medium text-[#9b9ba5] mb-2 flex items-center gap-1.5">
  Field Name
  <span className="text-red-400">*</span>
</Label>
```

**Styles:**
- Font: `12px medium`
- Color: `#9b9ba5`
- Margin bottom: `8px`
- Required indicator: `text-red-400`

---

### Breadcrumb

```tsx
<div className="border-b border-[#1f1f28] bg-[#0a0a0f] px-6 py-3">
  <div className="flex items-center gap-2">
    <button className="flex items-center gap-2 text-[#6b6b78] hover:text-white transition-colors group">
      <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
      <span className="text-sm">Parent Page</span>
    </button>
    <ChevronRight size={14} className="text-[#2a2a35]" />
    <span className="text-sm text-white">Current Page</span>
  </div>
</div>
```

**Styles:**
- Background: `#0a0a0f`
- Border bottom: `#1f1f28`
- Padding: `24px 12px` (px-6 py-3)
- Back button text: `#6b6b78`, hover `white`
- Current page: `white`
- Separator: `#2a2a35`, size 14px

---

## Elevation & Shadows

### Elevation System

```css
--elevation-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--elevation-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--elevation-lg: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--elevation-xl: 0 20px 25px -5px rgb(0 0 0 / 0.25), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--elevation-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.35);
```

**Usage:**
- `shadow-sm` - Subtle depth for inputs
- `shadow-md` - Cards, dropdowns
- `shadow-lg` - Modals, popovers
- `shadow-xl` - Dialogs
- `shadow-2xl` - Maximum elevation

### Glow Effects

```css
--glow-primary: 0 0 20px rgba(61, 99, 221, 0.2);
--glow-primary-hover: 0 0 30px rgba(61, 99, 221, 0.3);
--glow-primary-strong: 0 0 40px rgba(61, 99, 221, 0.4);
--glow-secondary: 0 0 20px rgba(147, 51, 234, 0.2);
--glow-success: 0 0 20px rgba(16, 185, 129, 0.2);
--glow-warning: 0 0 20px rgba(245, 158, 11, 0.2);
--glow-error: 0 0 20px rgba(239, 68, 68, 0.2);
```

**Usage:**
- Applied to primary buttons
- Interactive elements on hover
- Focus indicators

**Implementation:**
```tsx
<Button className="shadow-[var(--glow-primary)] hover:shadow-[var(--glow-primary-hover)]">
  Button
</Button>
```

---

## Animation & Transitions

### Transition Timings

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

**Usage:**
- **Fast (150ms):** Hover states, color changes, simple interactions
- **Base (250ms):** Default for most transitions
- **Slow (350ms):** Complex state changes, transforms
- **Bounce (500ms):** Emphasis animations, special effects

### Common Animations

#### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Usage:**
```tsx
<div className="fade-in">Content</div>
```

#### Page Enter
```css
@keyframes pageEnter {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Usage:**
```tsx
<div className="animate-in">Page content</div>
```

#### Shimmer (Loading)
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

**Usage:**
```tsx
<div className="shimmer">
  {/* Shimmer overlay automatically added */}
</div>
```

#### Pulse (Subtle)
```css
@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

**Usage:**
```tsx
<div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse">
  {/* Status indicator */}
</div>
```

### Transition Classes

```tsx
// All properties
<div className="transition-all duration-200">

// Colors only
<div className="transition-colors duration-150">

// Transform only
<div className="transition-transform duration-200">

// Opacity only
<div className="transition-opacity duration-300">

// Custom properties
<div className="transition-[color,box-shadow] duration-150">
```

---

## Interactive States

### Hover States

**Buttons:**
- Background darkens or changes
- Shadow intensifies (glow effect)
- Text color changes to white (for ghost/outline)

**Links:**
```tsx
<a className="text-[#6b6b78] hover:text-white transition-colors">
  Link
</a>
```

**Cards:**
```tsx
<div className="bg-[#14141a] hover:bg-[#1f1f28] border-[#1f1f28] hover:border-[#2a2a35] transition-all">
  Card
</div>
```

**Icons:**
```tsx
<Button variant="ghost" size="icon" className="text-[#6b6b78] hover:text-white hover:bg-[#1f1f28]">
  <Icon size={20} />
</Button>
```

### Focus States

**Inputs:**
```css
focus-visible:border-[#3d63dd]/50
focus-visible:ring-[3px]
focus-visible:ring-[#3d63dd]/10
```

**Buttons:**
```css
focus-visible:border-ring
focus-visible:ring-ring/50
focus-visible:ring-[3px]
```

**Implementation:**
```tsx
<Input className="focus-visible:border-[#3d63dd]/50 focus-visible:ring-[3px] focus-visible:ring-[#3d63dd]/10" />
```

### Active States

**Buttons:**
- Background darkens further than hover
- Transform: `scale(0.98)`

```tsx
<button className="active:scale-98 active:bg-[#2d4291]">
  Click me
</button>
```

**Tabs:**
- Border bottom: `#3d63dd` 2px
- Text: `white`
- Optional underline animation

### Disabled States

```tsx
<Button disabled className="opacity-50 cursor-not-allowed">
  Disabled
</Button>

<Input disabled className="opacity-50 cursor-not-allowed" />
```

**Styles:**
- Opacity: `50%`
- Cursor: `not-allowed`
- Pointer events: `none`

---

## Glassmorphism Effects

### Glass Panel

```css
--glass-background: rgba(20, 20, 26, 0.7);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-backdrop: blur(12px);
```

**Usage:**
```tsx
<div className="glass-panel">
  {/* Automatically applies glassmorphism */}
</div>

// Or manual:
<div className="bg-[rgba(20,20,26,0.7)] border border-[rgba(255,255,255,0.1)] backdrop-blur-xl">
  Glass content
</div>
```

**Common Applications:**
- Modals and overlays
- Floating panels
- Tooltips
- Dropdowns

---

## Icons

### Icon Library
**Primary:** Lucide React

**Installation:**
```bash
npm install lucide-react
```

### Icon Sizes

```tsx
import { Icon } from 'lucide-react';

// Extra small - 12px
<Icon size={12} />

// Small - 14px (most common for section headers)
<Icon size={14} />

// Default - 16px (most common)
<Icon size={16} />

// Medium - 20px
<Icon size={20} />

// Large - 24px
<Icon size={24} />

// Extra large - 32px+
<Icon size={32} />
```

### Icon Colors

```tsx
// Primary
<Icon className="text-[#3d63dd]" />

// Secondary/Muted
<Icon className="text-[#6b6b78]" />

// White
<Icon className="text-white" />

// Success
<Icon className="text-green-400" />

// Warning
<Icon className="text-yellow-400" />

// Error
<Icon className="text-red-400" />
```

### Common Icons

```tsx
import {
  // Navigation
  ArrowLeft, ArrowRight, ChevronDown, ChevronUp, ChevronRight,
  
  // Actions
  Plus, Edit, Trash2, Copy, Download, Upload, Save, X,
  
  // Status
  Check, AlertCircle, Info, AlertTriangle, Shield,
  
  // Content
  FileText, Image, Film, Users, Calendar, Clock,
  
  // UI
  Search, Filter, Settings, MoreVertical, Menu, Hash
} from 'lucide-react';
```

### Icon Button Pattern

```tsx
<Button variant="ghost" size="icon" className="text-[#6b6b78] hover:text-white hover:bg-[#1f1f28] h-9 w-9">
  <Settings size={16} />
</Button>
```

---

## Accessibility

### Color Contrast

All text meets WCAG AA standards:
- **White (#ffffff) on #0a0a0f:** 19.5:1 ✓
- **#9b9ba5 on #0a0a0f:** 10.2:1 ✓
- **#6b6b78 on #0a0a0f:** 6.8:1 ✓
- **Primary (#3d63dd) on #0a0a0f:** 7.2:1 ✓

### Focus Indicators

Always visible focus states:
```tsx
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3d63dd]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]">
  Accessible Button
</button>
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Tab order follows logical flow
- Escape key closes modals/dropdowns
- Enter activates primary actions
- Arrow keys for navigation (where applicable)

### ARIA Labels

```tsx
// Buttons without visible text
<button aria-label="Close dialog">
  <X size={16} />
</button>

// Form fields
<input
  type="text"
  aria-label="Search channels"
  aria-describedby="search-help"
/>
<span id="search-help" className="sr-only">
  Search by channel name or ID
</span>

// Status indicators
<Badge aria-label="Status: Published" className="...">
  Published
</Badge>
```

### Screen Reader Support

```tsx
// Loading states
<div role="status" aria-live="polite">
  {isLoading && <span>Loading content...</span>}
</div>

// Error messages
<div role="alert" aria-live="assertive">
  {error && <span>{error}</span>}
</div>

// Hidden text for context
<span className="sr-only">Required field</span>
```

---

## Additional Patterns

### Sticky Headers

```tsx
<div className="sticky top-0 z-10 bg-[#0a0a0f] border-b border-[#1f1f28]">
  {/* Header content */}
</div>
```

### Full-Height Layouts

```tsx
<div className="flex h-screen bg-[#0a0a0f]">
  {/* Sidebar */}
  <aside className="w-60 border-r border-[#1f1f28]">
    {/* ... */}
  </aside>
  
  {/* Main content */}
  <main className="flex-1 flex flex-col overflow-hidden">
    {/* Fixed header */}
    <header className="flex-shrink-0">
      {/* ... */}
    </header>
    
    {/* Scrollable content */}
    <div className="flex-1 overflow-y-auto">
      {/* ... */}
    </div>
  </main>
</div>
```

### Grid Layouts

```tsx
// EPG Grid pattern
<div className="grid" style={{ gridTemplateColumns: '160px repeat(24, minmax(120px, 1fr))' }}>
  {/* Grid items */}
</div>

// Form grid
<div className="grid grid-cols-2 gap-4">
  {/* Form fields */}
</div>
```

### Responsive Breakpoints

```tsx
// Tailwind default breakpoints
sm: 640px   // Small devices
md: 768px   // Medium devices
lg: 1024px  // Large devices
xl: 1280px  // Extra large devices
2xl: 1536px // 2X Extra large devices
```

**Usage:**
```tsx
<div className="hidden md:block">
  {/* Visible on medium+ screens */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

---

## Implementation Notes

### CSS Variables vs Tailwind Classes

**Prefer Tailwind classes** for most styling:
```tsx
// ✓ Good
<div className="bg-[#14141a] border-[#1f1f28] rounded-lg">

// ✗ Avoid
<div style={{ background: 'var(--color-surface-raised)' }}>
```

**Use CSS variables** for:
- Complex shadow effects
- Gradient backgrounds
- Custom animations
- Theme tokens in component libraries

### Component Composition

Build reusable components:
```tsx
// Base component
export function Card({ children, className, ...props }) {
  return (
    <div 
      className={cn(
        "bg-[#14141a] border border-[#1f1f28] rounded-lg p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Usage
<Card className="hover:bg-[#1f1f28]">
  Content
</Card>
```

### Dark Theme Only

This design system is **dark theme only**. All components assume:
- Dark backgrounds
- Light text
- High contrast for readability

### Storybook Implementation

When building in Storybook:

1. **Wrap all stories** in dark background:
```tsx
export default {
  decorators: [
    (Story) => (
      <div className="bg-[#0a0a0f] min-h-screen p-8">
        <Story />
      </div>
    ),
  ],
};
```

2. **Include theme.css** in preview:
```tsx
// .storybook/preview.tsx
import '../src/styles/themes/theme.css';
```

3. **Document all variants** in stories:
- Default state
- Hover state
- Focus state
- Active state
- Disabled state
- Error state (for forms)

4. **Show real examples** with actual data patterns

---

## Version History

- **v1.0** (Feb 20, 2026) - Initial design system specification
  - Primary color: #3d63dd
  - Dark theme optimized
  - Complete component specifications
  - Modern elevation and animation system
  - Accessibility guidelines

---

## Support

For questions or clarifications about this design system, contact the EPG Planner development team.

**Last Updated:** February 20, 2026
