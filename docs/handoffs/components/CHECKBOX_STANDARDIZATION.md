# Checkbox Standardization — Engineering Handoff

**Status:** Ready for implementation  
**Updated:** 2026-08-05

## Component contract

`Checkbox` is a native checkbox wrapped by one visible label. It supports controlled and uncontrolled use, descriptions, errors, required and disabled states, and a parent-owned `indeterminate` state.

```tsx
<Checkbox
  name="notifications"
  value="email"
  label="Email notifications"
  description="Receive service updates."
  checked={selected}
  onChange={setSelected}
/>
```

`checked`, `defaultChecked`, and `onChange` use `boolean | 'indeterminate'`. User activation always resolves to a boolean. A parent selection model—not the checkbox itself—assigns `indeterminate`.

## DOM and behavior

- Keep the native `<input type="checkbox">`; do not replace it with a generic element.
- Space toggles the focused checkbox. Enter does not activate it.
- The wrapper label expands the click target and supplies the accessible name.
- The visible box is 16px within a 24px local target. Layout spacing around the label increases the practical target further.
- The DOM `indeterminate` property is synchronized in an effect, with `aria-checked="mixed"` for assistive technology.
- Error sets `aria-invalid="true"` and joins the description/error IDs through `aria-describedby`.
- Related checkboxes require `<fieldset>` and `<legend>`.

## Token contract

The implementation consumes registered `--cvp-checkbox-*` Tier 3 tokens only. Their values resolve through the canonical semantic and primitive files; light and dark values must not be hardcoded in component CSS.

Public override surface: `--cvp-checkbox-size`, `--cvp-checkbox-radius`, `--cvp-checkbox-border`, `--cvp-checkbox-checked-bg`, and `--cvp-checkbox-checked-border`.

Internal roles include target size, hover/error borders, selected and disabled icons/surfaces, focus ring, content spacing, and label/support/error typography. The unchecked boundary intentionally resolves from the theme-safe muted foreground role because the generic container-border steps do not meet the 3:1 graphical-object threshold at 16px.

## State precedence

1. Disabled suppresses hover and interaction styling.
2. Invalid/error controls the boundary and error copy.
3. Focus-visible adds the canonical focus ring.
4. Checked or indeterminate controls the selected surface and glyph.
5. Hover affects enabled controls only.

## Acceptance criteria

- Unchecked, checked, mixed, hover, focus-visible, invalid, disabled unchecked, and disabled checked are visually represented.
- Selected icon/control, unchecked boundary, focus indicator, label, description, and error colors pass their applicable WCAG contrast requirements in both themes.
- Every checkbox has an accessible name; support and error text are programmatically associated.
- A parent checkbox derives checked/mixed/unchecked from its child values.
- No legacy `--checkbox-*` variables or component-local color literals remain.

The visual audit surface is `/?page=checkbox`.
