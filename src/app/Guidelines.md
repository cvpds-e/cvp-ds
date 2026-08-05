# Design System Guidelines

**Version:** 2.0  
**Last Updated:** March 18, 2026  
**Purpose:** Implementation guidelines and best practices for the design system

---

## General Principles

### 1. Consistency Over Creativity
- Always use established design patterns from the design system
- Don't create new components when existing ones can be used
- Maintain visual and behavioral consistency across all touchpoints
- Ensure consistency across both dark and light themes

### 2. Accessibility First
- All components must meet WCAG 2.1 AA standards in both themes
- Include proper ARIA labels and roles
- Support keyboard navigation for all interactive elements
- Maintain minimum 4.5:1 contrast ratio for text in both themes

### 3. Performance Conscious
- Use efficient animations (150-250ms)
- Optimize component re-renders
- Implement lazy loading for heavy components
- Keep bundle sizes minimal

---

## Theme System

### Dual-Theme Support

The design system supports both **Dark Theme** (default) and **Light Theme**:

**Dark Theme (Default):**
- Optimized for low-light environments and extended use
- Background: #0a0a0f (near black)
- Text: #ffffff (white)
- Focus ring: #6f8be6 (periwinkle blue)

**Light Theme:**
- Optimized for bright environments and daytime use
- Background: #ffffff (white)
- Text: #111827 (near black)
- Focus ring: #2563eb (bright blue)

**Theme Switching:**
- Users toggle themes via the ThemeSwitcher component
- Preference saved to localStorage
- Respects system preference on first load
- Smooth 300ms transitions between themes

### Using Themes in Code

**✅ Always use CSS variables:**
```css
background: var(--bg-surface);
color: var(--text-primary);
border: 1px solid var(--border-default);
```

**❌ Never hardcode theme-specific colors:**
```css
/* DON'T DO THIS */
background: #14141a;
color: #ffffff;
```

---

## Color Usage

### Primary Brand Colors

**Periwinkle Blue (#6f8be6)** - Interactive States
- Use for focus rings (2px solid)
- Use for hover borders (1px solid)
- Use for active navigation backgrounds (rgba(111, 139, 230, 0.08))
- DO NOT use for large background areas
- **Consistent across both themes**

**Royal Blue (#3d63dd in dark / #2563eb in light)** - Primary Actions
- Use for primary buttons
- Use for checkbox/toggle checked states
- Use for important CTAs
- DO NOT use for text (contrast issues)
- **Color adjusts automatically based on theme**

### Surface Hierarchy

**Dark Theme:**
1. Base (#0a0a0f) - Page background
2. Raised (#14141a) - Cards, panels, inputs
3. Overlay (#1f1f28) - Borders, hover states
4. Elevated (#2a2a35) - Strong emphasis

**Light Theme:**
1. Base (#ffffff) - Page background
2. Raised (#f8f9fa) - Cards, panels, inputs
3. Overlay (#f3f4f6) - Borders, hover states
4. Elevated (#e5e7eb) - Strong emphasis

**Special Cases (Dark Theme):**
- Modals: ALWAYS use #252528
- Filter menus/dropdowns: ALWAYS use #292a2e
- Form inputs: ALWAYS use #212123

**Special Cases (Light Theme):**
- Modals: ALWAYS use #ffffff
- Filter menus/dropdowns: ALWAYS use #ffffff
- Form inputs: ALWAYS use #ffffff

### Text Color Hierarchy

**Dark Theme (5-level scale):**
- **#ffffff** - Headings, important labels only
- **#b4b4ba** - Body text, descriptions
- **#9b9ba5** - Form labels, metadata
- **#6b6b78** - Placeholders, helper text
- **#A1A1A8** - Disabled states (STANDARD)

**Light Theme (5-level scale):**
- **#111827** - Headings, important labels only
- **#374151** - Body text, descriptions
- **#6b7280** - Form labels, metadata
- **#9ca3af** - Placeholders, helper text
- **#9ca3af** - Disabled states

---

## Typography

### Font Size Standards

**DO NOT** override these without design approval:
- Use base 14px for body text
- Use 13px for buttons and labels
- Use 12px for captions only
- Never go below 11px

### Form Components - Typescale M Regular

ALL form components use this standard:
```
Font: Inter, sans-serif
Size: 14px
Weight: 400
Line Height: 20px
Letter Spacing: 0.15px
```

**Components using Typescale M:**
- Text Input
- Text Area  
- Select
- Multi-Select
- Checkbox labels
- Toggle labels
- Radio button labels

**DO NOT** change these values without updating the entire system.

### Font Weights

- **400 (Normal)** - Body text, form inputs
- **500 (Medium)** - Labels, buttons, subtle emphasis
- **600 (Semibold)** - Headings, strong emphasis
- **700 (Bold)** - Rarely used, only for major headings

---

## Component Usage Guidelines

### Buttons

#### When to Use Each Variant

**Primary Button**
- Main action on a page/section
- Limit to ONE per view
- Examples: "Save", "Create", "Submit"

**Secondary Button**
- Alternative actions
- Can appear alongside primary
- Examples: "Cancel", "Reset"

**Outline Button**
- Tertiary actions
- Multiple allowed
- Examples: "View Details", "Edit"

**Text Button**
- Least important actions
- In-content links
- Examples: "Learn More", "See All"

#### Button Best Practices

✅ **DO:**
- Use action-oriented labels ("Save Changes" not "Save")
- Keep labels concise (2-3 words max)
- Include icons for clarification when needed
- Maintain consistent spacing (16px horizontal padding)

❌ **DON'T:**
- Use more than one primary button per section
- Make buttons too small (min 32px height)
- Use all caps unless specifically designed
- Create custom button variants

### Form Components

#### Input Fields

**DO:**
- Always include associated labels (use `<label>` with `for` attribute)
- Provide helpful placeholder text (not as replacement for labels)
- Show error states with clear messages
- Use appropriate input types (email, tel, number)

**DON'T:**
- Use placeholder as the only label
- Make inputs too narrow (min 200px recommended)
- Skip validation feedback
- Auto-focus inputs on page load (accessibility issue)

#### Select vs. Multi-Select

**Use Select when:**
- User must choose exactly ONE option
- List has 3+ options
- Examples: Country selector, Status dropdown

**Use Multi-Select when:**
- User can choose MULTIPLE options
- Options are non-exclusive
- Examples: Tag selector, Filter criteria

**DON'T use if:**
- Only 2 options → Use Toggle or Radio buttons
- More than 20 options → Consider search/autocomplete

#### Checkboxes vs. Toggles

**Use Checkbox for:**
- Multiple independent options
- Lists of selections
- "I agree" confirmations

**Use Toggle for:**
- Single on/off states
- Immediate effect changes
- Settings preferences

### Navigation Components

#### Breadcrumbs

**DO:**
- Show current location in hierarchy
- Make all ancestors clickable except current
- Use for 3+ levels of navigation
- Keep labels short

**DON'T:**
- Include "Home" unless absolutely needed
- Make breadcrumbs wrap to multiple lines
- Use for flat navigation structures

#### Tabs

**DO:**
- Use for 3-7 related content sections
- Keep tab labels short (1-2 words)
- Show active state clearly
- Support keyboard navigation

**DON'T:**
- Use for sequential steps (use Stepper instead)
- Nest tabs within tabs
- Use more than 7 tabs
- Disable tabs arbitrarily

---

## Interactive States - Standardized

### Focus States (MANDATORY)

**For Form Inputs:**
```css
border: 2px solid #6f8be6;
box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
outline: none;
```

**For Buttons:**
```css
/* Primary Button */
outline: 2px solid #6f8be6;
outline-offset: 2px;

/* Other Buttons */
box-shadow: 0 0 0 2px #67b3fb;
```

**Never remove focus states** - it breaks accessibility.

### Hover States

**Form Inputs:**
```css
border: 1px solid #6f8be6;
transition: border-color 150ms;
```

**Navigation Items:**
```css
background: #292a2e;
color: #ffffff;
transition: background 150ms;
```

### Disabled States (STANDARD)

**ALL disabled form components use:**
```css
color: #A1A1A8;
opacity: 0.5;
cursor: not-allowed;
```

**Specific cases:**
- Checkbox disabled (checked): background #A1A1A8, icon #333333
- Toggle disabled (on): background #A1A1A8, thumb #333333

---

## Spacing & Layout

### Spacing Scale (4px base)

Use the 4px spacing scale for all spacing:
- 4px (1 unit) - Tight spacing
- 8px (2 units) - Default gap
- 12px (3 units) - Component padding
- 16px (4 units) - Section spacing
- 24px (6 units) - Major sections
- 32px (8 units) - Page sections

**DON'T** use arbitrary spacing values like 15px or 23px.

### Layout Best Practices

✅ **DO:**
- Use flexbox and grid for layouts
- Make layouts responsive by default
- Use max-width containers (1200px for content)
- Maintain consistent gutters

❌ **DON'T:**
- Use absolute positioning unless necessary
- Create fixed-width layouts
- Hardcode pixel values for responsive layouts
- Skip mobile considerations

---

## Animation & Motion

### Animation Duration Standards

- **150ms** - Instant feedback (hover, focus)
- **250ms** - Standard transitions (modals, dropdowns)
- **350ms** - Complex animations
- **Never** exceed 500ms for UI animations

### Easing Functions

Use the standard easing:
```css
cubic-bezier(0.4, 0, 0.2, 1)
```

### When to Animate

✅ **DO animate:**
- State changes (hover, active, focus)
- Modal/dropdown open/close
- Loading states
- Micro-interactions

❌ **DON'T animate:**
- Initial page load (no splash screens)
- Critical user actions (form submission)
- Text rendering
- Continuous loops (annoying)

---

## Modals & Overlays

### Modal Usage

**DO:**
- Use for focused tasks requiring user attention
- Include clear close button (top right)
- Dim background with rgba(0, 0, 0, 0.8)
- Trap focus within modal
- Close on Escape key
- Use #252528 background (STANDARD)

**DON'T:**
- Nest modals within modals
- Auto-open modals on page load
- Make modals too large (600px max width)
- Forget to restore focus after closing

### Filter Menus & Dropdowns

**ALWAYS use #292a2e background** for:
- Dropdown menus
- Filter menus
- Context menus
- Popover menus

**Best Practices:**
- Max height 300-400px (scrollable)
- 8px padding
- 4px border radius minimum
- Close on outside click
- Close on Escape key

---

## Error Handling & Validation

### Form Validation

**DO:**
- Validate on blur, not on every keystroke
- Show specific error messages ("Email must include @")
- Use red border #e6494e for error state
- Include error icon for clarity
- Support inline validation

**DON'T:**
- Show errors before user interaction
- Use generic messages ("Invalid input")
- Block form submission with JavaScript only
- Forget to show success states

### Error Message Guidelines

✅ **Good:**
- "Email address must include @"
- "Password must be at least 8 characters"
- "This field is required"

❌ **Bad:**
- "Error"
- "Invalid"
- "Fix this"

---

## Accessibility Requirements

### Keyboard Navigation

**ALL interactive elements must support:**
- Tab - Move forward
- Shift+Tab - Move backward
- Enter/Space - Activate
- Escape - Close overlays
- Arrow keys - Navigate options (selects, menus)

### ARIA Labels

**Required for:**
- Icon-only buttons (`aria-label="Close"`)
- Form inputs (associated `<label>`)
- Status changes (`aria-live="polite"`)
- Modal dialogs (`role="dialog"`, `aria-modal="true"`)
- Expandable sections (`aria-expanded="true/false"`)

### Screen Reader Support

**DO:**
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Provide alt text for images
- Announce dynamic content changes
- Include skip links for navigation

**DON'T:**
- Use `<div>` with `onClick` instead of `<button>`
- Hide content with `display: none` if it should be read
- Rely solely on color for information
- Create keyboard traps

---

## Common Mistakes to Avoid

### ❌ DON'T:

1. **Create custom colors** - Use the defined palette
2. **Override typography** - Without updating the entire system
3. **Skip focus states** - Breaks accessibility
4. **Use inconsistent spacing** - Stick to 4px scale
5. **Ignore disabled state standard** - Always use #A1A1A8
6. **Mix border weights** - Hover (1px), Focus (2px)
7. **Use wrong modal background** - Must be #252528
8. **Use wrong filter menu background** - Must be #292a2e
9. **Remove form label typography** - Must be Typescale M Regular
10. **Auto-focus inputs** - Accessibility violation

### ✅ DO:

1. **Use design system components** - Don't reinvent
2. **Follow accessibility guidelines** - WCAG AA minimum
3. **Test keyboard navigation** - Every interactive element
4. **Maintain visual hierarchy** - Use proper text scales
5. **Use semantic HTML** - `<button>`, `<nav>`, `<main>`
6. **Keep it simple** - Don't over-complicate
7. **Document custom implementations** - If absolutely necessary
8. **Test in dark mode** - Our primary theme
9. **Validate color contrast** - Use contrast checker tools
10. **Ask before deviating** - Consistency is key

---

## Implementation Checklist

Before shipping any component:

- [ ] Uses approved design system colors
- [ ] Implements proper focus states (2px border + 3px glow)
- [ ] Includes hover states (1px border for forms)
- [ ] Uses correct disabled state (#A1A1A8)
- [ ] Follows Typescale M Regular for form components
- [ ] Supports keyboard navigation
- [ ] Has proper ARIA labels and roles
- [ ] Meets WCAG AA contrast standards
- [ ] Uses 4px spacing scale
- [ ] Includes smooth transitions (150-250ms)
- [ ] Modal uses #252528 background
- [ ] Filter menus use #292a2e background
- [ ] Tested on mobile viewports
- [ ] No hardcoded magic numbers
- [ ] Follows naming conventions

---

## Getting Help

### Questions?

**Before implementing:**
- Check the design-system-specification.md
- Review the component documentation pages
- Look at existing component implementations
- Ask the design system team

**When stuck:**
- Don't guess - ask
- Don't create custom solutions - extend existing
- Don't skip accessibility - it's required
- Don't break existing patterns - maintain consistency

---

**Last Updated:** March 18, 2026  
**Maintained By:** Design System Team  
**Version:** 2.0