# Design System Specification

## Version 1.0

This document provides a complete specification of the design system, including design tokens, component definitions, and usage guidelines. Use this document to replicate the design system across other tools and platforms.

---

## Table of Contents

1. [Foundation](#foundation)
   - [Colors](#colors)
   - [Typography](#typography)
   - [Spacing](#spacing)
   - [Border Radius](#border-radius)
   - [Shadows & Effects](#shadows--effects)
2. [Design Tokens](#design-tokens)
3. [Components](#components)
4. [Patterns & Guidelines](#patterns--guidelines)
5. [Accessibility](#accessibility)

---

## Foundation

### Colors

#### Background Colors
- **Primary Background**: `#19191a`
- **Card Background**: `#19191a`
- **Secondary Background**: `#292a2e`
- **Modal Background**: `#252528` (standardized)
- **Filter Menu Background**: `#292a2e` (standardized)
- **Input Background**: `#212123`

#### Text Colors
- **Primary Text**: `#ffffff`
- **Muted Text**: `#bbbbbb`
- **Disabled Text**: `#A1A1A8` (standardized)
- **Placeholder Text**: `#bbbbbb`

#### Border Colors
- **Default Border**: `#45454a`
- **Hover Border**: `#6f8be6`
- **Focus Border**: `#6f8be6`
- **Error Border**: `#e6494e`
- **Card Border**: `rgba(212, 228, 254, 0.1)`

#### Interactive Colors
- **Primary Blue**: `#3d63dd`
- **Primary Blue Hover**: `#244cce`
- **Secondary Blue**: `#2d4a8e`
- **Secondary Blue Hover**: `#1f3566`
- **Focus Ring**: `#67b3fb`
- **Link Blue**: `#97a9de`
- **Link Blue Hover**: `#cdd7f6`

#### Status Colors
- **Error/Destructive**: `#e6494e`
- **Success**: `#10b981`
- **Warning**: `#ffb723`
- **Info**: `#5675ff`

#### Chart Colors
- **Chart 1**: `#5675ff`
- **Chart 2**: `#0dad9a`
- **Chart 3**: `#ffb723`
- **Chart 4**: `#f04438`
- **Chart 5**: `#79828a`

### Typography

#### Font Families
- **Primary**: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`
- **Monospace**: `"Inconsolata", monospace`

#### Type Scale

All form components use **Typescale M Regular** by default.

##### Typescale XS
- **Size**: `12px`
- **Weight**: `400`
- **Line Height**: `16px`
- **Letter Spacing**: `0.1px`

##### Typescale S
- **Size**: `13px`
- **Weight**: `400`
- **Line Height**: `20px`
- **Letter Spacing**: `0.1px`
- **Medium Weight**: `500`

##### Typescale M (Default for Form Components)
- **Size**: `14px`
- **Weight**: `400`
- **Line Height**: `20px`
- **Letter Spacing**: `0.15px`
- **Medium Weight**: `500`

##### Typescale L
- **Size**: `15px`
- **Weight**: `400`
- **Line Height**: `22px`
- **Letter Spacing**: `0px`

#### Font Weights
- **Normal**: `400`
- **Medium**: `500`
- **Semibold**: `600`
- **Bold**: `700`

### Spacing

The design system uses a **4px base spacing unit**.

- **spacing-0**: `0px`
- **spacing-1**: `4px`
- **spacing-2**: `8px`
- **spacing-3**: `12px`
- **spacing-4**: `16px`
- **spacing-5**: `20px`
- **spacing-6**: `24px`
- **spacing-8**: `32px`
- **spacing-12**: `48px`

#### Component Padding Presets
- **XS**: `4px 12px`
- **S**: `8px 12px`
- **M**: `8px 16px`
- **L**: `12px 20px`

### Border Radius

- **XS**: `2px` (0.125rem)
- **SM**: `4px`
- **MD**: `6px`
- **Default**: `10px` (0.625rem)

### Shadows & Effects

#### Box Shadows
- **Panel Shadow**: `0 1px 2px 0 rgba(0, 0, 0, 0.15)`
- **Panel Hover Shadow**: `0 1px 3px 0 rgba(0, 0, 0, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.2)`
- **Modal Shadow**: `0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)`
- **Toast Shadow**: `0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)`

#### Focus Styles

**Standard Focus Ring** (Most Components):
- **Border**: `1px solid #6f8be6`
- **Glow**: `0 0 0 3px rgba(111, 139, 230, 0.25)`
- **Box Shadow**: `0 0 0 2px #67b3fb` (for buttons)

**Button Variant Select Focus**:
- **Box Shadow**: `0 0 0 2px #67b3fb`

---

## Design Tokens

### Complete Token Reference

```css
/* Font System */
--font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...;
--font-family-mono: "Inconsolata", monospace;

/* Type Scale */
--type-scale-xs-size: 12px;
--type-scale-xs-weight: 400;
--type-scale-xs-line-height: 16px;
--type-scale-xs-letter-spacing: 0.1px;

--type-scale-s-size: 13px;
--type-scale-s-weight: 400;
--type-scale-s-line-height: 20px;
--type-scale-s-letter-spacing: 0.1px;
--type-scale-s-medium-weight: 500;

--type-scale-m-size: 14px;
--type-scale-m-weight: 400;
--type-scale-m-line-height: 20px;
--type-scale-m-letter-spacing: 0.15px;
--type-scale-m-medium-weight: 500;

--type-scale-l-size: 15px;
--type-scale-l-weight: 400;
--type-scale-l-line-height: 22px;
--type-scale-l-letter-spacing: 0px;

/* Spacing */
--spacing-0: 0;
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-12: 48px;

/* Border Radius */
--radius-xs: 0.125rem;  /* 2px */
--radius-sm: 4px;
--radius-md: 6px;
--radius: 0.625rem;     /* 10px */

/* Transitions */
--btn-transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--input-transition: border-color 0.2s ease, box-shadow 0.2s ease;
--toast-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Semantic Tokens */
--background: #19191a;
--foreground: #fff;
--muted: #292a2e;
--muted-foreground: #bbb;
--border: rgba(212, 228, 254, 0.1);
--focus-ring: #67b3fb;
--destructive: #e6494e;
```

---

## Components

### Button Components

#### Primary Button

**Visual Specifications**:
- Background: `#3d63dd`
- Hover Background: `#244cce`
- Text Color: `#ffffff`
- Font: Typescale S Medium (13px, 500 weight)
- Padding: `6px 16px`
- Border Radius: `6px`
- Border: `transparent`
- Disabled Background: `#A1A1A8`
- Disabled Text: `#292a2e`

**Focus State**:
- Outline: `2px solid #6f8be6`
- Outline Offset: `2px`

**States**:
- Default
- Hover
- Active (same as hover)
- Disabled
- Focus

#### Secondary Button

**Visual Specifications**:
- Background: `#2d4a8e`
- Hover Background: `#1f3566`
- Text Color: `#ffffff`
- Font: Typescale S Medium (13px, 500 weight)
- Padding: `6px 16px`
- Border Radius: `6px`
- Border: `transparent`
- Disabled Background: `#A1A1A8`
- Disabled Text: `#292a2e`

**Focus State**:
- Box Shadow: `0 0 0 2px #67b3fb`

#### Outline Button

**Visual Specifications**:
- Background: `transparent`
- Hover Background: `#292a2e`
- Active Background: `#333336`
- Text Color: `#ffffff`
- Font: Typescale S Medium (13px, 500 weight)
- Padding: `6px 16px`
- Border Radius: `6px`
- Border: `1px solid #292a2e`
- Hover Border: `1px solid #4a4a4a`

**Focus State**:
- Box Shadow: `0 0 0 2px #67b3fb`

#### Text Button

**Visual Specifications**:
- Background: `transparent`
- Text Color: `#97a9de`
- Hover Text Color: `#cdd7f6`
- Disabled Text Color: `#A1A1A8`
- Font: Typescale M Medium (14px, 500 weight)
- Padding: `2px 4px`
- Border: `none`
- Text Decoration: `none`

**Focus State**:
- Box Shadow: `0 0 0 2px #67b3fb`

#### Icon Button

**Visual Specifications**:
- Size: `32px × 32px`
- Icon Size: `16px`
- Background: `transparent`
- Hover Background: `#292a2e`
- Active Background: `#333336`
- Icon Color: `#bbbbbb`
- Hover Icon Color: `#ffffff`
- Border Radius: `4px`

**Focus State**:
- Box Shadow: `0 0 0 2px #67b3fb`

#### Icon Small Button

**Visual Specifications**:
- Size: `24px × 24px`
- Icon Size: `14px`
- Background: `transparent`
- Hover Background: `#292a2e`
- Active Background: `#333336`
- Icon Color: `#bbbbbb`
- Hover Icon Color: `#ffffff`
- Border Radius: `4px`

**Focus State**:
- Box Shadow: `0 0 0 2px #67b3fb`

---

### Form Components

All form components use **Typescale M Regular** (14px, 400 weight, 20px line height, 0.15px letter spacing).

#### Text Input

**Visual Specifications**:
- Background: `#212123`
- Border: `1px solid #45454a`
- Hover Border: `1px solid #6f8be6`
- Text Color: `#ffffff`
- Placeholder: `#bbbbbb`
- Font: Typescale M Regular
- Border Radius: `3.2px` (0.2rem)
- Min Height: `32px`
- Padding: `6px 4px 6px 10px`

**Focus State**:
- Border: `1px solid #6f8be6`
- Box Shadow: `0 0 0 1px #6f8be6, 0 0 0 3px rgba(111, 139, 230, 0.25)`

**Error State**:
- Border: `1px solid #e6494e`

**Disabled State**:
- Background: `#d0d0d3`
- Text Color: `#4a4a4a`
- Border: `1px solid #bbb`

#### Select

**Visual Specifications** (Default Variant):
- Background: `#212123`
- Border: `1px solid #45454a`
- Hover Border: `1px solid #6f8be6`
- Text Color: `#ffffff`
- Font: Typescale M Regular
- Border Radius: `3.2px`
- Min Height: `32px`
- Padding: `6px 10px`

**Focus State**:
- Border: `1px solid #6f8be6`
- Box Shadow: `0 0 0 1px #6f8be6, 0 0 0 3px rgba(111, 139, 230, 0.25)`

**Button Variant Focus State**:
- Background: `rgba(255, 255, 255, 0.1)`
- Border: `transparent`
- Box Shadow: `0 0 0 2px #67b3fb`

**Dropdown Menu**:
- Background: `#292a2e`
- Border: `1px solid #45454a`
- Border Radius: `6px`
- Box Shadow: `0 4px 12px rgba(0, 0, 0, 0.4)`

**Disabled State**:
- Background: `#d0d0d3`
- Text Color: `#A1A1A8`
- Border: `1px solid #bbb`

#### Multi Select

**Visual Specifications**:
- Background: `#212123`
- Border: `1px solid #45454a`
- Hover Border: `1px solid #6f8be6`
- Text Color: `#ffffff`
- Font: Typescale M Regular
- Border Radius: `3.2px`
- Min Height: `32px`
- Padding: `4px 10px`

**Focus State**:
- Border: `1px solid #6f8be6`
- Box Shadow: `0 0 0 1px #6f8be6, 0 0 0 3px rgba(111, 139, 230, 0.25)`

**Tag Styling**:
- Background: `#292a2e`
- Text Color: `#ffffff`
- Border Radius: `4px`
- Padding: `2px 6px`
- Font: Typescale S

**Dropdown Menu**:
- Background: `#292a2e`
- Border: `1px solid #45454a`
- Border Radius: `6px`

**Disabled State**:
- Background: `#d0d0d3`
- Text Color: `#A1A1A8`
- Border: `1px solid #bbb`

#### Checkbox

**Visual Specifications**:
- Size: `16px × 16px`
- Background: `#212123`
- Border: `1px solid #45454a`
- Checked Background: `#3d63dd`
- Checked Border: `#3d63dd`
- Checkmark Color: `#ffffff`
- Border Radius: `3px`
- Font: Typescale M Regular (for label)

**Focus State**:
- Border: `1px solid #6f8be6`
- Box Shadow: `0 0 0 1px #6f8be6, 0 0 0 3px rgba(111, 139, 230, 0.25)`

**Disabled State**:
- Background: `#4a4a4a`
- Border: `#4a4a4a`
- Checkmark Color: `#A1A1A8`
- Label Color: `#A1A1A8`

**States**:
- Unchecked
- Checked
- Indeterminate (dash icon)
- Disabled (all variants)
- Focus

#### Toggle

**Visual Specifications**:
- Width: `36px`
- Height: `20px`
- Thumb Size: `16px`
- Border Radius: `10px`
- Background (Off): `#45454a`
- Background (On): `#3d63dd`
- Background (Hover): `#6f8be6`
- Thumb Color: `#ffffff`
- Font: Typescale M Regular (for label/description)

**Small Variant**:
- Width: `28px`
- Height: `16px`
- Thumb Size: `12px`
- Border Radius: `8px`

**Indeterminate State**:
- Background: `#3d63dd`
- Displays centered white dash icon (10px × 2px)
- ARIA: `aria-checked="mixed"`
- On click: transitions to enabled (true)

**Focus State**:
- Box Shadow: `0 0 0 2px #67b3fb`

**Disabled State**:
- Background (Off): `#4a4a4a`
- Background (On): `#A1A1A8`
- Thumb Color (Off): `#A1A1A8`
- Thumb Color (On): `#333333`
- Label Color: `#A1A1A8`

**Animation**:
- Click animation: subtle pulse (scale 1 → 0.95 → 1) over 200ms

---

### Layout Components

#### Modal

**Visual Specifications**:
- Background: `#252528` (standardized)
- Border: `1px solid #19191b`
- Border Radius: `3.2px` (0.2rem)
- Max Width: `600px`
- Box Shadow: `0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)`

**Header**:
- Padding: `13px 19px`
- Border Bottom: `0.5px solid #45454a`
- Title Font: Typescale S Medium (uppercase)
- Close Button Size: `28px`

**Content**:
- Padding: `16px`

**Footer**:
- Padding: `13px 19px`
- Border Top: `0.5px solid #45454a`

**Backdrop**:
- Background: `rgba(0, 0, 0, 0.8)`
- Backdrop Filter: `blur(4px)` (optional)

**Tabbed Variant**:
- Tab Container Background: `#18181A`
- Tab Container Border: `0.5px solid #45454a`
- Tab Padding: `8px 16px`
- Active Tab Border: `2px solid #45454a`

#### Toast

**Visual Specifications**:
- Background: `rgba(33, 33, 35, 0.95)`
- Border: `1px solid #45454a`
- Border Radius: `6px`
- Padding: `16px`
- Min Width: `320px`
- Text Color: `#ffffff`
- Icon Color: `#bbbbbb`
- Box Shadow: `0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)`
- Backdrop Filter: `blur(8px)`

**Animation**:
- Duration: `300ms`
- Timing: `cubic-bezier(0.4, 0, 0.2, 1)`

**Variants**:
- Default
- Success (with success icon)
- Error (with error icon)
- Warning (with warning icon)
- Info (with info icon)

#### Accordion

**Visual Specifications**:
- Background: `#19191a`
- Hover Background: `#292a2e`
- Border: `1px solid rgba(212, 228, 254, 0.1)`
- Border Radius: `0px` (sharp corners)
- Header Padding: `12px 16px`
- Content Padding: `16px`
- Icon Size: `16px`
- Font: Typescale M Regular

**Animation**:
- Duration: `200ms`
- Timing: ease

---

### Navigation Components

#### Segmented Control

**Visual Specifications** (Default):
- Container Background: `transparent`
- Selected Background: `#292a2e`
- Text Color: `#bbbbbb`
- Selected Text Color: `#ffffff`
- Border Radius: `6px`
- Gap: `2px`

**Padding by Size**:
- Small: `4px 12px`
- Medium: `6px 16px`
- Large: `12px 20px`

**Color Variant**:
- Container Background: `#252528`
- Selected Background: `#3d63dd`
- Selected Text Color: `#ffffff`
- Hover Background: `rgba(61, 99, 221, 0.1)`

#### Breadcrumbs

**Visual Specifications**:
- Font: Typescale M Regular
- Link Color: `#97a9de`
- Hover Color: `#cdd7f6`
- Current Color: `#ffffff`
- Separator: `/`
- Separator Color: `#bbbbbb`
- Gap: `8px`

---

### Data Display Components

#### Table

**Visual Specifications**:
- Background: `#19191a`
- Header Background: `#333333`
- Row Hover Background: `#292a2e`
- Border: `1px solid rgba(212, 228, 254, 0.1)`
- Text Color: `#ffffff`
- Muted Text: `#bbbbbb`
- Font: Typescale S
- Cell Padding: `12px 16px`
- Header Padding: `16px`
- Row Min Height: `40px`

**Fixed Height Variant**:
- Total Height: `500px`
- Header Height: `36px`
- Settings Bar Height: `52px`
- Pagination Height: `56px`

#### Tree

**Visual Specifications**:
- Background: `transparent`
- Item Padding: `8px 12px`
- Indent: `20px`
- Font: Typescale M Regular
- Icon Size: `16px`
- Hover Background: `#292a2e`
- Selected Background: `#3d63dd` (subtle)

**Status Dots**:
- Active: `#10b981`
- Inactive: `#6b7280`
- Size: `6px`

**Tags**:
- Recommended: `#60a5fa`
- Editorial: `#c084fc`
- Font: Typescale XS
- Padding: `2px 6px`
- Border Radius: `4px`

---

### Filter Components

#### Filter Menu

**Visual Specifications**:
- Background: `#292a2e` (standardized)
- Border: `1px solid #45454a`
- Border Radius: `6px`
- Padding: `8px`
- Box Shadow: `0 4px 12px rgba(0, 0, 0, 0.4)`
- Min Width: `200px`

**Filter Item**:
- Padding: `8px 12px`
- Hover Background: `#333336`
- Selected Background: `#3d63dd`
- Font: Typescale M Regular
- Border Radius: `4px`

#### Tag Filter

**Visual Specifications**:
- Tag Background: `#292a2e`
- Tag Border: `1px solid #45454a`
- Tag Border Radius: `16px`
- Tag Padding: `4px 12px`
- Tag Font: Typescale S
- Remove Icon Size: `14px`
- Remove Icon Color: `#bbbbbb`
- Remove Icon Hover: `#ffffff`

---

## Patterns & Guidelines

### Focus Management

#### Standard Focus Ring Pattern
Used by: Most buttons, form controls, interactive elements
```css
box-shadow: 0 0 0 2px #67b3fb;
outline: none;
```

#### Input Focus Pattern
Used by: Text inputs, selects, multi-selects, textareas
```css
border: 1px solid #6f8be6;
box-shadow: 0 0 0 1px #6f8be6, 0 0 0 3px rgba(111, 139, 230, 0.25);
outline: none;
```

#### Primary Button Focus Pattern
```css
outline: 2px solid #6f8be6;
outline-offset: 2px;
```

### Disabled States

**Standardized Disabled Color**: `#A1A1A8`

All form components follow this pattern:
- **Background (filled)**: `#d0d0d3` or `#A1A1A8`
- **Text/Icons**: `#A1A1A8` or `#4a4a4a`
- **Border**: `#bbb`
- **Cursor**: `not-allowed`

### Hover States

Interactive elements use:
- **Background**: Darken or shift to `#292a2e` / `#333336`
- **Border**: Shift to `#4a4a4a` / `#6f8be6`
- **Text/Icon**: Shift to `#ffffff` (for muted elements)
- **Transition**: `all 0.15s cubic-bezier(0.4, 0, 0.2, 1)`

### Animation Guidelines

#### Button/Control Interactions
- **Duration**: 150ms - 200ms
- **Timing**: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)
- **Properties**: background-color, border-color, color, transform

#### Modal/Overlay Animations
- **Duration**: 300ms
- **Timing**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Properties**: opacity, transform

#### Subtle Feedback (Toggle pulse)
```css
@keyframes toggle-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}
/* Duration: 200ms, ease-out */
```

### Responsive Patterns

#### Breakpoints
- **Mobile**: `< 480px`
- **Tablet**: `480px - 768px`
- **Desktop**: `768px - 1024px`
- **Large Desktop**: `> 1024px`

#### Container Widths
- **Documentation Container**: `1200px` max-width
- **Modal**: `600px` max-width
- **Toast**: `320px` min-width

### Layout Grids

```css
/* Documentation Variants Grid */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 24px;

/* Documentation States Grid */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 24px;

/* Two Column Grid */
grid-template-columns: 1fr 1fr;
gap: 24px;

/* Mobile: All become single column */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
  gap: 16px;
}
```

---

## Accessibility

### ARIA Patterns

#### Toggle Indeterminate State
```html
<input
  role="switch"
  aria-checked="mixed"
  aria-describedby="description-id"
/>
```

#### Modal
```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Modal Title</h2>
</div>
```

#### Accordion
```html
<button aria-expanded="false" aria-controls="content-id">
  Header
</button>
<div id="content-id" role="region">
  Content
</div>
```

### Keyboard Navigation

#### Standard Controls
- **Tab**: Move focus forward
- **Shift + Tab**: Move focus backward
- **Enter / Space**: Activate button/toggle
- **Escape**: Close modal/dropdown

#### Specific Patterns
- **Select/Multi-Select**: Arrow keys navigate options, Enter selects
- **Accordion**: Arrow keys navigate headers, Enter/Space toggles
- **Tree**: Arrow keys navigate, Enter expands/collapses

### Focus Visibility

All interactive elements must have visible focus states using the standardized focus ring patterns defined above.

### Color Contrast

Maintain WCAG AA contrast ratios:
- **Normal text**: 4.5:1 minimum
- **Large text**: 3:1 minimum
- **UI components**: 3:1 minimum

### Screen Reader Support

- Use semantic HTML elements
- Provide ARIA labels where needed
- Announce state changes
- Support landmark regions

---

## Implementation Notes

### CSS Custom Properties

All tokens are implemented as CSS custom properties (variables) in the `:root` scope, making them globally available and easy to override for theming.

### Component Isolation

Components include their styles inline using `<style>` tags to ensure portability and avoid CSS cascade issues.

### Typography Inheritance

Form components inherit typography from the Typescale M Regular tokens, ensuring consistency across all form inputs.

### Icon System

The design system uses **Lucide React** for icons. Standard icon sizes:
- Small: `14px`
- Default: `16px`
- Large: `20px`

### Naming Convention

- **BEM-style**: `.component__element--modifier`
- **Tokens**: `--component-property-variant`
- **Example**: `.toggle__switch`, `--toggle-checked-bg`

---

## Version History

### v1.0 (Current)
- Initial design system specification
- Standardized disabled states to `#A1A1A8`
- Standardized modal backgrounds to `#252528`
- Standardized filter menu backgrounds to `#292a2e`
- Unified typography to Typescale M Regular for form components
- Added Toggle indeterminate state
- Added subtle click animations for Toggle

---

## Export & Usage

This design system can be implemented in:
- **React** (current implementation)
- **Vue.js** (adapt component patterns)
- **Angular** (adapt component patterns)
- **Vanilla HTML/CSS** (use token values directly)
- **Design Tools** (Figma, Sketch, Adobe XD)

For JSON schema definitions of all components, see `design-system-schema.json`.

---

**Last Updated**: March 18, 2026  
**Maintained By**: Design System Team