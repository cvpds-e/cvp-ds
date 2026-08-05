# Design System - Figma Design Import Guide

Complete specification and step-by-step recreation guide for importing the design system into Figma Design.

---

## Table of Contents
1. Quick Start
2. Color System
3. Typography System
4. Component Specifications
5. Interactive States
6. Figma Recreation Steps

**Note:** Scroll through the document or use your viewer's search function (Ctrl/Cmd+F) to navigate to specific sections.

---

## Quick Start

### Before You Begin
1. Take screenshots of the following pages in your current app:
   - `/colors` - Complete color palette with swatches
   - `/typography` - Typography scale and headings
   - `/notification-banner` - All component variants

2. These screenshots will serve as visual references while building in Figma Design.

### Tools Needed in Figma
- Color Styles panel
- Text Styles panel
- Components panel
- Variables (for design tokens, optional)

---

## Color System

### 1. Primary Brand Colors

#### Primary States
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Primary | `#3d63dd` | `oklch(52.3% 0.189 264.4)` | Primary buttons, CTAs, brand elements |
| Primary Hover | `#3451b2` | `oklch(44.9% 0.165 264.8)` | Primary button hover state |
| Primary Active | `#2d4291` | `oklch(39.8% 0.145 265.1)` | Primary button active/pressed state |
| Primary Disabled | `#3d63dd66` | `oklch(52.3% 0.189 264.4 / 0.4)` | Disabled primary elements (40% opacity) |

#### Primary Backgrounds
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Primary BG | `#3d63dd1a` | `oklch(52.3% 0.189 264.4 / 0.1)` | Subtle primary backgrounds (10% opacity) |
| Primary BG Hover | `#3d63dd26` | `oklch(52.3% 0.189 264.4 / 0.15)` | Hovered primary backgrounds (15% opacity) |

#### Primary Borders
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Primary Border | `#3d63dd80` | `oklch(52.3% 0.189 264.4 / 0.5)` | Primary borders (50% opacity) |
| Primary Border Hover | `#3d63ddb3` | `oklch(52.3% 0.189 264.4 / 0.7)` | Hovered primary borders (70% opacity) |

#### Primary Scale (50-950)
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Primary 50 | `#eef2ff` | `oklch(96.5% 0.018 264.5)` | Lightest tint, backgrounds |
| Primary 100 | `#e0e7ff` | `oklch(93.2% 0.038 264.6)` | Very light tint |
| Primary 200 | `#c7d2fe` | `oklch(86.8% 0.074 264.7)` | Light tint |
| Primary 300 | `#a5b4fc` | `oklch(77.5% 0.124 264.9)` | Medium-light shade |
| Primary 400 | `#818cf8` | `oklch(67.2% 0.169 265.3)` | Medium shade |
| Primary 500 | `#6366f1` | `oklch(57.4% 0.196 265.8)` | Medium-dark shade |
| Primary 600 | `#3d63dd` | `oklch(52.3% 0.189 264.4)` | Base brand color |
| Primary 700 | `#3451b2` | `oklch(44.9% 0.165 264.8)` | Dark shade |
| Primary 800 | `#2d4291` | `oklch(39.8% 0.145 265.1)` | Darker shade |
| Primary 900 | `#1e3a8a` | `oklch(32.5% 0.115 265.4)` | Very dark shade |
| Primary 950 | `#172554` | `oklch(21.8% 0.075 265.7)` | Darkest shade |

#### Focus & Special States
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Periwinkle Blue | `#6f8be6` | `oklch(66.8% 0.152 263.8)` | Focus rings, hover borders, active states |

---

### 2. Blue Scale

Lighter blue shades used for informational elements, messaging, and notifications.

| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Blue 300 | `#93c5fd` | `oklch(83.1% 0.088 251.8)` | Light blue for info messages and secondary text |
| Blue 400 | `#60a5fa` | `oklch(72.3% 0.142 251.5)` | Medium blue for info icons and headings |
| Blue 500 | `#3b82f6` | `oklch(61.1% 0.179 251.2)` | Standard blue for interactive info elements |
| Blue 600 | `#2563eb` | `oklch(50.5% 0.197 251.8)` | Darker blue for emphasis and contrast |

---

### 3. Semantic Colors

#### Success (Emerald Green)
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Success | `#10b981` | `oklch(68.5% 0.152 166.8)` | Success messages, positive states |
| Success Hover | `#059669` | `oklch(58.2% 0.135 166.5)` | Success button hover state |
| Success BG | `rgba(16, 185, 129, 0.1)` | `oklch(68.5% 0.152 166.8 / 0.1)` | Success message backgrounds |

#### Warning (Amber)
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Warning | `#f59e0b` | `oklch(75.8% 0.152 75.2)` | Warning messages, alerts |
| Warning Hover | `#d97706` | `oklch(65.5% 0.145 72.8)` | Warning button hover state |
| Warning BG | `rgba(245, 158, 11, 0.1)` | `oklch(75.8% 0.152 75.2 / 0.1)` | Warning message backgrounds |

#### Error (Red)
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Error | `#e6494e` | `oklch(57.2% 0.185 18.5)` | Error messages, validation failures |
| Error Alt | `#ef4444` | `oklch(62.8% 0.225 25.3)` | Alternative error red |
| Error Hover | `#dc2626` | `oklch(55.5% 0.215 25.7)` | Error button hover state |
| Error BG | `rgba(230, 73, 78, 0.1)` | `oklch(57.2% 0.185 18.5 / 0.1)` | Error message backgrounds |

#### Info (Blue)
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Info | `#3b82f6` | `oklch(61.1% 0.179 251.2)` | Info messages, tooltips |
| Info Hover | `#2563eb` | `oklch(50.5% 0.197 251.8)` | Info button hover state |
| Info BG | `rgba(59, 130, 246, 0.1)` | `oklch(61.1% 0.179 251.2 / 0.1)` | Info message backgrounds |

---

### 4. Surface & Background Colors (Dark Theme)

| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Surface Base | `#0a0a0f` | `oklch(5.2% 0.012 264.8)` | Level 0: Main app background |
| Surface Raised | `#14141a` | `oklch(9.8% 0.015 264.5)` | Level 1: Cards, panels, input backgrounds |
| Surface Overlay | `#1f1f28` | `oklch(14.5% 0.018 264.3)` | Level 2: Borders, separators, hover states |
| Surface Elevated | `#2a2a35` | `oklch(19.2% 0.022 264.1)` | Level 3: Strong borders, emphasis |
| Modal Background | `#252528` | `oklch(17.1% 0.006 264.4)` | Modal dialogs and overlays |
| Filter Menu BG | `#292a2e` | `oklch(19.5% 0.008 264.2)` | Dropdown menus, filter menus |
| Input Background | `#212123` | `oklch(14.8% 0.004 264.5)` | Text inputs, selects, textareas |
| Modal Overlay | `rgba(0, 0, 0, 0.8)` | `oklch(0% 0 0 / 0.8)` | Modal backdrop overlay |

---

### 5. Text Colors (Dark Theme)

| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Text Primary | `#ffffff` | `oklch(100% 0 0)` | Headings, important text, labels |
| Text Secondary | `#b4b4ba` | `oklch(74.8% 0.008 264.3)` | Body text, descriptions |
| Text Tertiary | `#9b9ba5` | `oklch(66.2% 0.012 264.5)` | Form labels, metadata, captions |
| Text Quaternary | `#6b6b78` | `oklch(48.5% 0.015 264.7)` | Placeholders, helper text, inactive icons |
| Text Disabled | `#A1A1A8` | `oklch(68.5% 0.010 264.4)` | Disabled form elements |
| Description Text | `#bbbbbb` | `oklch(77.2% 0 0)` | Form descriptions, helper text |

---

### 6. Border Colors

| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Border Default | `#45454a` | `oklch(32.5% 0.008 264.5)` | Standard borders on inputs, checkboxes |
| Border Subtle | `#1f1f28` | `oklch(14.5% 0.018 264.3)` | Subtle separators, light borders |
| Border Strong | `#2a2a35` | `oklch(19.2% 0.022 264.1)` | Emphasized borders, table headers |
| Border Hover | `#6f8be6` | `oklch(66.8% 0.152 263.8)` | 1px solid on hover (forms) |
| Border Focus | `#6f8be6` | `oklch(66.8% 0.152 263.8)` | 2px solid on focus (forms) |
| Border Error | `#e6494e` | `oklch(57.2% 0.185 18.5)` | Error state borders |
| Modal Border | `#19191b` | `oklch(11.8% 0.004 264.6)` | Modal dialog borders |

---

### 7. Component-Specific Colors

#### Filter & Dropdown
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Filter Bar Hover | `#2f3033` | `oklch(22.5% 0.006 264.3)` | Filter bar hover state |
| Chip Background | `#3d3f45` | `oklch(28.8% 0.010 264.2)` | Filter chips, tags |
| Option Hover (Submenu) | `#35363b` | `oklch(25.2% 0.008 264.4)` | Dropdown submenu option hover |
| Option Selected | `#35373d` | `oklch(25.5% 0.009 264.3)` | Selected dropdown option |
| Search Input BG | `#1f2023` | `oklch(14.2% 0.005 264.5)` | Search input fields |

#### Button Components
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Secondary Button | `#45454a` | `oklch(32.5% 0.008 264.5)` | Secondary button default state |
| Outline Button Hover | `rgba(255, 255, 255, 0.1)` | `oklch(100% 0 0 / 0.1)` | Outline button hover background |
| Icon Button Active | `rgba(255, 255, 255, 0.15)` | `oklch(100% 0 0 / 0.15)` | Icon button active state |

#### Checkbox & Toggle
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Checkbox Checked | `#3d63dd` | `oklch(52.3% 0.189 264.4)` | Checkbox checked background |
| Toggle On | `#3d63dd` | `oklch(52.3% 0.189 264.4)` | Toggle switch on state |
| Disabled Checked | `#A1A1A8` | `oklch(68.5% 0.010 264.4)` | Disabled checked background |
| Disabled Icon | `#333333` | `oklch(23.8% 0 0)` | Disabled checkmark/icon color |

#### Table Components
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Table Header BG | `#292a2e` | `oklch(19.5% 0.008 264.2)` | Table header row background |
| Table Row Hover | `rgba(255, 255, 255, 0.02)` | `oklch(100% 0 0 / 0.02)` | Table row hover state |

#### Navigation
| Name | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Nav Item Default | `#b4b4ba` | `oklch(74.8% 0.008 264.3)` | Navigation item text color |
| Nav Icon Default | `#6b6b78` | `oklch(48.5% 0.015 264.7)` | Navigation icon color |
| Nav Active | `#6f8be6` | `oklch(66.8% 0.152 263.8)` | Active navigation text/icon color |
| Nav Active BG | `rgba(111, 139, 230, 0.08)` | `oklch(66.8% 0.152 263.8 / 0.08)` | Active navigation background |

---

## Typography System

### Font Family
```
Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif
```

### Type Scale

| Scale | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| XS | 12px | 16px | 0px | Small labels, captions |
| S | 13px | 18px | 0px | Form labels, metadata |
| M | 14px | 20px | 0px | Body text, buttons |
| L | 15px | 22px | 0px | Large body text |

### Headings

| Heading | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| H1 | 32px | 700 (Bold) | 40px | 0px |
| H2 | 24px | 600 (Semibold) | 32px | 0px |
| H3 | 18px | 600 (Semibold) | 28px | 0px |
| H4 | 16px | 600 (Semibold) | 24px | 0px |

### Font Weights

| Name | Value | Usage |
|------|-------|-------|
| Regular | 400 | Body text, standard UI elements |
| Medium | 500 | Emphasized text, small headings |
| Semibold | 600 | Headings H2-H4, important labels |
| Bold | 700 | H1 headings, strong emphasis |

---

## Component Specifications

### NotificationBanner Component

#### Layout Structure
```
Container (Auto-layout: Horizontal)
├── Icon (16×16px)
├── Content (Auto-layout: Vertical)
│   ├── Title (Text)
│   └── Message (Text)
└── Dismiss Button (14×14px) [Optional]
```

#### Layout Properties
- **Layout Mode**: Horizontal auto-layout
- **Padding**: 12px all sides
- **Gap**: 8px between elements
- **Border Radius**: 8px
- **Border**: 1px solid (color varies by variant)

#### Icon Specifications
- **Size**: 16×16px
- **Top Margin**: 2px (to align with text baseline)
- **Flex**: Shrink 0 (fixed size)

#### Content Container
- **Layout Mode**: Vertical auto-layout
- **Gap**: 2px between title and message
- **Flex**: Grow 1 (takes available space)

#### Title Text
- **Font Size**: 12px
- **Font Weight**: 500 (Medium)
- **Line Height**: 16px
- **Margin Bottom**: 2px

#### Message Text
- **Font Size**: 12px
- **Font Weight**: 400 (Regular)
- **Line Height**: 16px

#### Dismiss Button (Optional)
- **Icon Size**: 14×14px (X icon)
- **Flex**: Shrink 0
- **Opacity**: 0.6 (default), 1.0 (hover)
- **Transition**: opacity 0.15s ease

---

### NotificationBanner Variants

#### Dark Theme Variants

**Info Variant**
- Background: Linear gradient
  - Direction: Left to right (0deg)
  - Stop 1: `rgba(59, 130, 246, 0.1)` at 0%
  - Stop 2: `rgba(147, 51, 234, 0.1)` at 100%
- Border: `rgba(59, 130, 246, 0.3)`
- Icon Color: `#60a5fa` / `oklch(72.3% 0.142 251.5)`
- Title Color: `#60a5fa` / `oklch(72.3% 0.142 251.5)`
- Message Color: `oklch(80.9% .105 251.813)`

**Success Variant**
- Background: Linear gradient
  - Direction: Left to right (0deg)
  - Stop 1: `rgba(16, 185, 129, 0.1)` at 0%
  - Stop 2: `rgba(5, 150, 105, 0.1)` at 100%
- Border: `rgba(16, 185, 129, 0.3)`
- Icon Color: `#6ee7b7` / `oklch(87.2% 0.118 166.7)`
- Title Color: `#6ee7b7` / `oklch(87.2% 0.118 166.7)`
- Message Color: `#d1fae5` / `oklch(95.5% 0.058 166.9)`

**Warning Variant**
- Background: Linear gradient
  - Direction: Left to right (0deg)
  - Stop 1: `rgba(245, 158, 11, 0.1)` at 0%
  - Stop 2: `rgba(251, 146, 60, 0.1)` at 100%
- Border: `rgba(245, 158, 11, 0.3)`
- Icon Color: `#fcd34d` / `oklch(86.8% 0.132 88.5)`
- Title Color: `#fcd34d` / `oklch(86.8% 0.132 88.5)`
- Message Color: `#fef3c7` / `oklch(96.2% 0.068 92.3)`

**Error Variant**
- Background: Linear gradient
  - Direction: Left to right (0deg)
  - Stop 1: `rgba(239, 68, 68, 0.1)` at 0%
  - Stop 2: `rgba(220, 38, 38, 0.1)` at 100%
- Border: `rgba(239, 68, 68, 0.3)`
- Icon Color: `#fca5a5` / `oklch(78.5% 0.158 25.8)`
- Title Color: `#fca5a5` / `oklch(78.5% 0.158 25.8)`
- Message Color: `#fee2e2` / `oklch(93.8% 0.072 25.5)`

#### Light Theme Variants

**Info Variant**
- Background: Linear gradient
  - Direction: Left to right (0deg)
  - Stop 1: `rgba(59, 130, 246, 0.08)` at 0%
  - Stop 2: `rgba(147, 51, 234, 0.08)` at 100%
- Border: `rgba(59, 130, 246, 0.2)`
- Icon Color: `#3b82f6` / `oklch(61.1% 0.179 251.2)`
- Title Color: `#3b82f6` / `oklch(61.1% 0.179 251.2)`
- Message Color: `#1e40af` / `oklch(38.5% 0.135 265.4)`

**Success Variant**
- Background: Linear gradient
  - Direction: Left to right (0deg)
  - Stop 1: `rgba(16, 185, 129, 0.08)` at 0%
  - Stop 2: `rgba(5, 150, 105, 0.08)` at 100%
- Border: `rgba(16, 185, 129, 0.2)`
- Icon Color: `#10b981` / `oklch(68.5% 0.152 166.8)`
- Title Color: `#059669` / `oklch(58.2% 0.135 166.5)`
- Message Color: `#047857` / `oklch(48.8% 0.118 166.2)`

**Warning Variant**
- Background: Linear gradient
  - Direction: Left to right (0deg)
  - Stop 1: `rgba(245, 158, 11, 0.08)` at 0%
  - Stop 2: `rgba(251, 146, 60, 0.08)` at 100%
- Border: `rgba(245, 158, 11, 0.2)`
- Icon Color: `#f59e0b` / `oklch(75.8% 0.152 75.2)`
- Title Color: `#d97706` / `oklch(65.5% 0.145 72.8)`
- Message Color: `#b45309` / `oklch(55.2% 0.135 68.5)`

**Error Variant**
- Background: Linear gradient
  - Direction: Left to right (0deg)
  - Stop 1: `rgba(239, 68, 68, 0.08)` at 0%
  - Stop 2: `rgba(220, 38, 38, 0.08)` at 100%
- Border: `rgba(239, 68, 68, 0.2)`
- Icon Color: `#ef4444` / `oklch(62.8% 0.225 25.3)`
- Title Color: `#dc2626` / `oklch(55.5% 0.215 25.7)`
- Message Color: `#b91c1c` / `oklch(48.2% 0.198 26.2)`

---

## Interactive States

### Focus States
- **Focus Border**: `#6f8be6` / `oklch(66.8% 0.152 263.8)` - 2px solid border
- **Focus Glow**: `rgba(111, 139, 230, 0.25)` / `oklch(66.8% 0.152 263.8 / 0.25)` - Box shadow: 0 0 0 3px
- **Focus Outline Offset**: 2px

### Hover States
- **Hover Border (Forms)**: `#6f8be6` / `oklch(66.8% 0.152 263.8)` - 1px solid
- **Hover Background (Navigation)**: `#292a2e` / `oklch(19.5% 0.008 264.2)`
- **Transition Duration**: 150ms ease

### Active States
- **Active Background**: Typically 15% white overlay or component-specific color
- **Transition**: All 150ms ease

---

## Figma Recreation Steps

### Part 1: Setting Up Color Styles

#### Step 1: Create Color Library Structure
1. Open Figma Design
2. Create a new file named "Design System"
3. Create a page named "🎨 Color Styles"

#### Step 2: Create Primary Color Styles
1. In the Color Styles panel, create a folder: **"Primary Brand"**
2. For each color in the Primary States section:
   - Click the "+" button to create a new style
   - Name it exactly as shown (e.g., "Primary", "Primary Hover")
   - Enter the hex value
   - Add description from the "Usage" column
3. Repeat for Primary Backgrounds, Primary Borders, and Primary Scale folders

**Quick Tip**: Use the OKLCH values for more accurate color representation if your Figma version supports it, otherwise use hex values.

#### Step 3: Create Blue Scale Styles
1. Create folder: **"Blue Scale"**
2. Add all 4 blue colors (Blue 300, 400, 500, 600)
3. Include descriptions for each

#### Step 4: Create Semantic Color Styles
1. Create folder: **"Semantic Colors"**
2. Create subfolders:
   - **Success** (3 colors)
   - **Warning** (3 colors)
   - **Error** (4 colors)
   - **Info** (3 colors)
3. Add each color with its description

#### Step 5: Create Surface & Background Styles
1. Create folder: **"Surfaces (Dark)"**
2. Add all 8 surface colors
3. Name them exactly as shown in the table

#### Step 6: Create Text Color Styles
1. Create folder: **"Text (Dark)"**
2. Add all 6 text colors
3. These will be used when creating text styles

#### Step 7: Create Border Color Styles
1. Create folder: **"Borders"**
2. Add all 7 border colors

#### Step 8: Create Component-Specific Styles
1. Create folder: **"Component Colors"**
2. Create subfolders for each category:
   - Filter & Dropdown
   - Button Components
   - Checkbox & Toggle
   - Table Components
   - Navigation
3. Add all colors to their respective folders

#### Step 9: Create Interactive State Styles
1. Create folder: **"Interactive States"**
2. Add Focus and Hover colors

**Screenshot Reference**: Take a screenshot of your `/colors` page to visually confirm each color while creating styles.

---

### Part 2: Setting Up Typography Styles

#### Step 1: Install Inter Font
1. Download Inter font from Google Fonts or inter.rsms.me
2. Install the font on your system
3. Restart Figma if it was already open

#### Step 2: Create Text Style Structure
1. In the Text Styles panel, create the following structure:
   ```
   📝 Typography
   ├── Headings
   │   ├── H1
   │   ├── H2
   │   ├── H3
   │   └── H4
   └── Type Scale
       ├── XS
       ├── S
       ├── M
       └── L
   ```

#### Step 3: Create Heading Styles
For each heading (H1-H4):
1. Create a text frame
2. Set the properties according to the table:
   - **H1**: 32px / Bold (700) / 40px line height / 0px letter spacing
   - **H2**: 24px / Semibold (600) / 32px line height / 0px letter spacing
   - **H3**: 18px / Semibold (600) / 28px line height / 0px letter spacing
   - **H4**: 16px / Semibold (600) / 24px line height / 0px letter spacing
3. Apply the "Text Primary" color style
4. Create text style with the heading name
5. Add description: Usage from the Typography table

#### Step 4: Create Type Scale Styles
For each scale (XS, S, M, L):
1. Create a text frame
2. Set the properties:
   - **XS**: 12px / Regular (400) / 16px line height / 0px letter spacing
   - **S**: 13px / Regular (400) / 18px line height / 0px letter spacing
   - **M**: 14px / Regular (400) / 20px line height / 0px letter spacing
   - **L**: 15px / Regular (400) / 22px line height / 0px letter spacing
3. Apply the "Text Secondary" color style
4. Create text style

#### Step 5: Create Additional Weight Variations (Optional)
Create variations of Type Scale M with different weights:
- **M / Medium**: 14px / Medium (500) / 20px
- **M / Semibold**: 14px / Semibold (600) / 20px
- **M / Bold**: 14px / Bold (700) / 20px

These are useful for buttons, labels, and emphasis.

**Screenshot Reference**: Take a screenshot of your `/typography` page to verify all styles match.

---

### Part 3: Creating NotificationBanner Component

#### Step 1: Set Up Component Page
1. Create a new page: "🔔 Notification Banner"
2. Create a frame: 1200×800px for working space

#### Step 2: Create Base Structure (Info Variant)
1. **Create Container Frame**:
   - Press `F` for Frame tool
   - Draw a frame approximately 400px wide
   - Name it: "NotificationBanner"
   - Set Auto Layout: Horizontal (Shift+A)
   - Padding: 12px all sides
   - Gap: 8px
   - Corner Radius: 8px

2. **Add Border**:
   - Select the frame
   - In the Stroke section, add stroke
   - Set to 1px
   - Color: `rgba(59, 130, 246, 0.3)`
   - Position: Inside

3. **Add Background Gradient**:
   - Select the frame
   - In the Fill section, change from Solid to Linear
   - Set gradient angle to 0° (left to right)
   - Stop 1 (0%): `rgba(59, 130, 246, 0.1)`
   - Stop 2 (100%): `rgba(147, 51, 234, 0.1)`

#### Step 3: Add Icon
1. **Insert Icon**:
   - Use Lucide Icons plugin or draw a 16×16px circle as placeholder
   - For production: Import "Info" icon from Lucide
   - Name layer: "Icon"
   - Size: 16×16px
   - Color: Apply "Blue 400" style or `#60a5fa`

2. **Set Icon Constraints**:
   - Select icon
   - In Auto Layout section, set:
     - Horizontal resizing: Fixed
     - Vertical resizing: Fixed
   - Add top padding: 2px (to align with text baseline)

#### Step 4: Create Content Container
1. **Add Content Frame**:
   - Create a new frame inside the main frame (after icon)
   - Name it: "Content"
   - Set Auto Layout: Vertical
   - Gap: 2px
   - Horizontal resizing: Fill container
   - Vertical resizing: Hug contents

2. **Add Title Text**:
   - Press `T` for Text tool
   - Click inside Content frame
   - Type: "Now using Localized Fields!"
   - Apply Text Style: Type Scale XS (12px / Medium 500 / 16px)
   - Color: Apply "Blue 400" style or `#60a5fa`
   - Name layer: "Title"

3. **Add Message Text**:
   - Press `T` for Text tool
   - Click inside Content frame (below title)
   - Type: "Switch languages with one click. Hungarian fallback applies automatically."
   - Apply Text Style: Type Scale XS (12px / Regular 400 / 16px)
   - Color: Use OKLCH or approximate with `#93c5fd`
   - Name layer: "Message"
   - Set width to: Fill container

#### Step 5: Add Dismiss Button (Optional)
1. **Create Button Frame**:
   - Create a small frame 14×14px
   - Add "X" icon or draw one
   - Name it: "Dismiss"
   - Size: 14×14px
   - Opacity: 60%

2. **Add Hover Interaction** (optional):
   - Create a hover variant
   - Set opacity to 100%

#### Step 6: Create Component
1. Select the entire NotificationBanner frame
2. Press Ctrl+Alt+K (Windows) or Cmd+Option+K (Mac)
3. This creates a component
4. Name it: "NotificationBanner / Info"

#### Step 7: Create Variants
Now create the other 3 variants (Success, Warning, Error):

**For Each Variant:**
1. Duplicate the Info component (Ctrl+D / Cmd+D)
2. Rename (e.g., "NotificationBanner / Success")
3. Update the background gradient:
   - **Success**: Stop 1: `rgba(16, 185, 129, 0.1)`, Stop 2: `rgba(5, 150, 105, 0.1)`
   - **Warning**: Stop 1: `rgba(245, 158, 11, 0.1)`, Stop 2: `rgba(251, 146, 60, 0.1)`
   - **Error**: Stop 1: `rgba(239, 68, 68, 0.1)`, Stop 2: `rgba(220, 38, 38, 0.1)`
4. Update the border color:
   - **Success**: `rgba(16, 185, 129, 0.3)`
   - **Warning**: `rgba(245, 158, 11, 0.3)`
   - **Error**: `rgba(239, 68, 68, 0.3)`
5. Update icon color:
   - **Success**: `#6ee7b7`
   - **Warning**: `#fcd34d`
   - **Error**: `#fca5a5`
6. Update title color (same as icon)
7. Update message color:
   - **Success**: `#d1fae5`
   - **Warning**: `#fef3c7`
   - **Error**: `#fee2e2`
8. Update sample text to match the variant

#### Step 8: Combine as Variants
1. Select all 4 NotificationBanner components
2. Right-click → "Combine as variants"
3. Figma will create a component set
4. In the properties panel, rename the variant property to "Variant"
5. Rename values: Info, Success, Warning, Error

#### Step 9: Add Component Description
1. Select the component set
2. In the right panel, click "..." → "Edit description"
3. Add:
   ```
   Notification banner for displaying informational messages with gradients and icons.
   
   Variants: info, success, warning, error
   
   Features:
   - Subtle gradient backgrounds
   - Semantic colors
   - Optional dismiss button
   - Dark and light theme support
   ```

#### Step 10: Create Light Theme Variants (Optional)
1. Duplicate the entire component set
2. Rename: "NotificationBanner / Light"
3. For each variant, update colors following the "Light Theme Variants" section
4. Key differences:
   - Background gradient opacity: 0.08 (instead of 0.1)
   - Border opacity: 0.2 (instead of 0.3)
   - Use light theme text colors from the specifications

**Screenshot Reference**: Take a screenshot of your `/notification-banner` page showing all 4 variants to compare against Figma.

---

### Part 4: Creating Effect Styles

#### Step 1: Create Focus Effect
1. In the Effects panel, create new style: "Focus Ring"
2. Add Drop Shadow effect
3. Settings:
   - X: 0, Y: 0
   - Blur: 0
   - Spread: 3
   - Color: `rgba(111, 139, 230, 0.25)`
4. Add another effect: Stroke
   - Width: 2px
   - Color: `#6f8be6`

#### Step 2: Create Additional Effects (Optional)
Create any other effect styles your design system needs:
- Modal shadows
- Card elevations
- Hover states

---

### Part 5: Documentation & Organization

#### Step 1: Create Cover Page
1. Create a new page: "📘 Design System Guide"
2. Add:
   - Title: "Design System"
   - Description: "Built around Periwinkle Blue (#6f8be6) and Royal Blue (#3d63dd)"
   - List of pages and what they contain

#### Step 2: Create Usage Examples
1. On the NotificationBanner page, create a section: "Examples"
2. Place instances of each variant
3. Add annotations showing:
   - Padding values
   - Gap sizes
   - Border radius
   - Font sizes

#### Step 3: Add Measurement Annotations
1. Use the annotation tools or text to mark:
   - Icon size: 16×16px
   - Container padding: 12px
   - Gap: 8px
   - Border radius: 8px
   - Border width: 1px

#### Step 4: Create Color Palette Page
1. Create page: "🎨 Color Palette"
2. Create color swatches showing all colors
3. Organize by category (Primary, Semantic, Surface, etc.)
4. Include both hex and OKLCH values
5. Use the screenshot from your `/colors` page as reference

---

### Part 6: Testing & Validation

#### Step 1: Test Component Instances
1. Create test frames on a new page
2. Place instances of NotificationBanner component
3. Switch between variants
4. Verify all colors, spacing, and typography match specifications

#### Step 2: Test Responsiveness
1. Create frames at different widths: 320px, 768px, 1024px
2. Place NotificationBanner instances
3. Verify the message text wraps properly
4. Ensure the component maintains proper padding and gap

#### Step 3: Compare with Screenshots
1. Open your app pages: `/colors`, `/typography`, `/notification-banner`
2. Take screenshots
3. Compare side-by-side with your Figma components
4. Verify colors match exactly
5. Check spacing, typography, and proportions

#### Step 4: Document Any Variations
If you notice any differences between the web app and Figma:
1. Document them in a "Notes" section
2. Decide which is the source of truth
3. Update accordingly

---

## Quick Reference Checklist

### Colors to Create (Total: ~70 color styles)
- [ ] Primary Brand (17 colors: states, backgrounds, borders, scale, periwinkle)
- [ ] Blue Scale (4 colors)
- [ ] Semantic Colors (14 colors across success, warning, error, info)
- [ ] Surfaces (8 colors)
- [ ] Text (6 colors)
- [ ] Borders (7 colors)
- [ ] Component-Specific (14 colors)
- [ ] Interactive States (4 colors)

### Typography Styles to Create (Total: ~12 styles)
- [ ] H1, H2, H3, H4 (4 heading styles)
- [ ] Type Scale: XS, S, M, L (4 base styles)
- [ ] Optional weight variations (4 additional)

### Components to Create
- [ ] NotificationBanner (4 variants: Info, Success, Warning, Error)
- [ ] Optional: Light theme variants (4 additional)

### Effect Styles to Create
- [ ] Focus Ring
- [ ] Optional: Additional effects

---

## Tips for Success

### Working with OKLCH in Figma
As of early 2024, Figma doesn't natively support OKLCH color space. Options:
1. **Use hex values**: Most straightforward, already provided in all tables
2. **Convert OKLCH to RGB**: Use an online converter if you need exact matches
3. **Visual matching**: Use the provided screenshots to visually match colors
4. **Future-proof**: Add OKLCH values in descriptions for when Figma adds support

### Naming Conventions
- Use consistent naming that matches the web app
- Include usage in descriptions
- Organize with folders/groups
- Use emoji prefixes for easy scanning (🎨, 📝, 🔔, etc.)

### Maintaining Consistency
1. Always use color styles, never hardcoded colors
2. Always use text styles, never hardcoded typography
3. Create components for repeated elements
4. Document any custom variations

### Keyboard Shortcuts Reference
- Create Frame: `F`
- Create Text: `T`
- Auto Layout: `Shift + A`
- Create Component: `Ctrl/Cmd + Alt/Option + K`
- Duplicate: `Ctrl/Cmd + D`
- Copy Properties: `Ctrl/Cmd + Alt/Option + C`
- Paste Properties: `Ctrl/Cmd + Alt/Option + V`

---

## Next Steps After Recreation

### 1. Create Additional Components
Expand your design system by creating other components:
- Buttons (Primary, Outline, Text, Icon)
- Form inputs (Text, Select, Checkbox, Toggle)
- Tables
- Navigation items
- Breadcrumbs
- Modals
- Cards

### 2. Set Up Variables (Figma Variables)
If using Figma's Variables feature:
1. Convert color styles to color variables
2. Create semantic naming (e.g., `color/semantic/success`)
3. Set up mode switching for dark/light themes
4. Link text styles to size/spacing variables

### 3. Create Component Library
1. Publish the file as a team library
2. Enable other files to use your components
3. Set up version control
4. Document usage guidelines

### 4. Maintain Sync with Code
1. Keep this markdown file updated
2. When colors or components change in code, update Figma
3. When designs change in Figma, update code
4. Use version tags to track changes

---

## Support & Resources

### Reference Screenshots Location
Remember to capture these pages from your app:
- `/colors` - Full color palette view
- `/typography` - Typography scale and headings
- `/notification-banner` - All component variants
- Any other component documentation pages

### External Resources
- **Inter Font**: https://rsms.me/inter/
- **Lucide Icons**: https://lucide.dev/ (or use Figma plugin)
- **OKLCH Color Converter**: https://oklch.com/
- **Figma Community**: Search for "design system" templates for organizational ideas

### Questions?
If you encounter any issues during recreation:
1. Double-check the specifications in this guide
2. Compare with your screenshots
3. Verify color values (hex) match exactly
4. Check that Auto Layout settings are correct
5. Ensure Inter font is properly installed

---

**Last Updated**: 2026-05-04
**Design System Version**: 1.0
**Based on**: Figma Make Web Application

---

## Appendix: Component States & Interactions

### NotificationBanner States
- **Default**: Standard appearance as specified
- **Hover (Dismiss button)**: Opacity changes from 0.6 to 1.0
- **Dismissible**: Shows X button when onDismiss prop provided
- **Non-dismissible**: No X button

### Recommended Interactions in Figma
1. Create a "With Dismiss" boolean property
2. Show/hide the dismiss button based on this property
3. Create hover state for dismiss button
4. Add smart animate transitions for smooth interactions

---

## Color Accessibility Notes

### Contrast Ratios (WCAG AA Compliance)
When using these colors on dark backgrounds:
- Text Primary (#ffffff): 21:1 (AAA)
- Text Secondary (#b4b4ba): 11.5:1 (AAA)
- Text Tertiary (#9b9ba5): 8.2:1 (AA)
- Text Quaternary (#6b6b78): 4.8:1 (AA)

### Semantic Color Usage
- **Success**: Green is universally understood for positive actions
- **Warning**: Amber/yellow draws attention without alarm
- **Error**: Red signals issues that need immediate attention
- **Info**: Blue conveys helpful information without urgency

### Color Blindness Considerations
The color system includes:
- Sufficient brightness differences between states
- Not relying solely on color (icons + text)
- High contrast ratios for readability

---

**End of Guide**
