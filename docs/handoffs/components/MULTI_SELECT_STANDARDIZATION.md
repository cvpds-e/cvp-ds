# Multi Select Standardization

**Status:** Ready for implementation  
**Updated:** 2026-08-05

## Boundary

Use Multi Select when a user must choose several values from a list long enough to benefit from search. Use Select for one value and a visible Checkbox group for short lists.

```tsx
<MultiSelect
  name="products"
  label="Data products"
  description="Choose one or more products."
  options={productOptions}
  value={selectedProducts}
  onChange={setSelectedProducts}
  maxSelection={3}
  allowCreate={false}
/>
```

## Value and form contract

- Controlled and uncontrolled arrays are supported through `value`/`onChange` and `defaultValue`.
- Duplicate option values are resolved by first occurrence.
- When `name` is supplied, each selected value produces one repeated hidden form input.
- `maxSelection` blocks new choices but still permits removal.
- Creation is opt-in at the product level; enable it only if arbitrary domain values are valid.
- The field has a 40px minimum and grows vertically when tags wrap.
- The popup's selected-count and Clear all action use the shared 13px interactive metadata size (`--cvp-multi-select-meta-font-size`); they do not inherit the smaller support-text size.
- The popup opens below by default, flips above the field when space below is limited, and constrains its own scroll region to the viewport so options remain reachable near the bottom of a panel.

## Selected-value composition

Multi Select renders each selected value with the shared `Pill` component. Multi Select owns selection state, limits, search, count metadata, and the option menu; Pill owns the compact value presentation and its named removal action. The existing `--cvp-multi-select-tag-*` aliases are forwarded to Pill so the field keeps its established compact sizing.

## DOM and interaction contract

- A native text input owns the combobox role, search value, label, description, error, and expanded state.
- The popup uses `role="listbox"` with `aria-multiselectable="true"`; each option exposes `aria-selected` and `aria-disabled`.
- Arrow Down enters the list; Arrow Up/Down moves between enabled options; Enter or Space toggles; Escape closes and restores input focus.
- Backspace removes the last value only when the search query is empty.
- Every chip removal, clear-all, and open/close control is keyboard focusable and specifically named.
- Error accepts a message string, sets `aria-invalid`, and associates an alert through `aria-describedby`.
- The visible `<label>` uses `htmlFor`; IDs are deterministic through React `useId`.

## Token architecture

Multi Select uses registered `--cvp-multi-select-*` Tier 3 tokens only. The field inherits the canonical input contract; the popup inherits the menu contract; selected values use the shared Pill contract. Component-specific roles govern compact tag sizing, search sizing, popup dimensions, option padding, selected-count metadata, and actions.

The shared semantic input border remains intentionally subtle in both themes. Focus and error states provide the stronger state boundary; field surfaces and labels keep the default control identifiable without an intrusive outline.

No component-local colors, theme branches, legacy `--multi-select-*` variables, or global focus overrides remain.

## Acceptance criteria

- Default, hover, focus/open, populated, error, disabled, required, and maximum states are represented.
- Tags wrap without clipping and removal does not toggle the popup unexpectedly.
- Search, selection, deselection, clear, select-all, creation, and limits update controlled and uncontrolled values correctly.
- All visible text, icons, focus indicators, and validation states pass their applicable WCAG contrast thresholds in light and dark themes; the decorative resting border remains intentionally subtle.
- Every combobox, popup, option, removal action, and error relation is identifiable in the DOM.

Visual and interactive audit surface: `/?page=multi-select`.
