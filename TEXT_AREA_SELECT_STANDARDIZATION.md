# CVP Text Area and Select — Standardization Handoff

**Status:** Ready for implementation  
**Updated:** 2026-08-04  
**Previews:** `?page=text-area` and `?page=select`

## Shared field contract

Both components inherit the Text Input conventions for persistent labels, optional/required status, helper and error placement, component-token usage, focus indication, disabled styling, light/dark themes, and reduced-motion behavior.

## Text Area

- Uses the native `textarea`; default vertical resizing is retained.
- Supports none, vertical, horizontal, and both-axis resize modes.
- Character count is associated through `aria-describedby` and updates for controlled or uncontrolled input.
- Native `maxLength`, `required`, `disabled`, and `readOnly` behavior is preserved.
- Component-specific values are registered as `--cvp-textarea-*`; shared field values remain `--cvp-input-*`.

| Role | Tier 3 token | Canonical source | Contract | Activation |
|---|---|---|---|---|
| Surface | `--cvp-input-bg` | `--cvp-color-surface-default` | Theme resolved | Base |
| Focus | `--cvp-input-focus-ring` | `--cvp-border-focus-ring` | Border plus halo | `:focus-visible` |
| Invalid | `--cvp-input-error-ring` | `--cvp-border-error-ring` | Error border plus halo | `[data-invalid]` |
| Minimum height | `--cvp-textarea-min-height` | `--cvp-space-1200` | 96px | All resize modes |
| Inset | `--cvp-textarea-padding` | `--cvp-space-3` | 12px | Control content |
| Support type | `--cvp-input-support-size` | `--cvp-font-size-xs` | 12px / 16px | Helper, error, counter |

## Select

- Uses the ARIA combobox/listbox pattern with DOM focus retained on the trigger.
- `aria-activedescendant` communicates the active option; options expose `aria-selected` and `aria-disabled`.
- Arrow keys wrap through enabled options. Home and End move to boundaries. Enter and Space select. Escape closes without selection. Tab closes and advances focus.
- A named hidden input exposes the selected value to native form submission.
- Click-away closes the popup; label activation focuses the trigger.
- Registered `--cvp-select-*` component tokens compose the shared input and menu token contracts.

| Role | Tier 3 token | Canonical source | Contract | Activation |
|---|---|---|---|---|
| Trigger surface | `--cvp-select-bg` | `--cvp-input-bg` | Theme resolved | Base |
| Trigger boundary | `--cvp-select-border` | `--cvp-input-border` | 1px | Base |
| Focus | `--cvp-select-focus-ring` | `--cvp-input-focus-ring` | Border plus halo | `:focus-visible` |
| Height | `--cvp-select-height` | `--cvp-input-height` | 40px | Default |
| Compact height | `--cvp-select-height-compact` | `--cvp-input-height-compact` | 32px | `size="compact"` |
| Popup surface | `--cvp-select-popup-bg` | `--cvp-menu-bg` | Overlay plane | `aria-expanded="true"` |
| Popup elevation | `--cvp-select-popup-shadow` | `--cvp-menu-shadow` | Elevation 3 | Popup open |
| Active option | `--cvp-select-option-hover` | `--cvp-menu-item-bg-hover` | Interactive surface | `[data-active]` |
| Selected option | `--cvp-select-option-selected` | `--cvp-menu-item-bg-active` | Selected surface | `[data-selected]` |

## Engineering acceptance

- Use the live pages as visual references and this file as the normative implementation contract.
- Do not copy computed values; import the canonical styles and consume Tier 3 tokens.
- Match every documented state and both themes before visual sign-off.
- Preserve the public props and DOM/state attributes shown by the reference implementation.
- Run automated DOM/contrast checks plus application-level keyboard and screen-reader tests.

## Validation note

These implementations meet the documented component-level accessibility contract. Release assurance still requires automated DOM/contrast checks and keyboard plus screen-reader testing in each consuming application, because surrounding form structure and product-specific token overrides can affect the final result.
