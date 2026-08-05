# Content Browser Modal — developer handoff

## Canonical implementation

- Component: `src/app/components/ContentBrowserModal.tsx`
- Component styles: `src/app/components/ContentBrowserModal.css`
- Tier 3 aliases: `src/styles/tokens/cvp-component-tokens.css`
- Visual and contract audit: `src/app/components/ContentBrowserModalDocumentation.tsx`

The component is a composition of the canonical `Modal`, `Checkbox`, `PrimaryButton`, `OutlineButton`, `TextButton`, and `IconButton`. Do not recreate their surfaces, focus rings, disabled states, or theme values locally.

## Integration contract

Supply catalog data through `items`. Keep application data, fetching, permissions, and error handling outside the design-system component. Selection may be controlled with `selectedItems` and `onSelectionChange`, or left uncontrolled. `onConfirm` receives the final selected IDs. Use `loading` while catalog data is pending and `pageSize` only when the product context needs a different result density.

The production component intentionally contains no sample catalog. Demo items live only in the documentation page.

## Token contract

Content Browser CSS consumes `--cvp-content-browser-*` Tier 3 aliases. These resolve to canonical semantic and shared component tokens, including `--cvp-modal-*`, `--cvp-checkbox-*`, and `--cvp-input-*`. Theme switching therefore happens at the canonical source; do not add light/dark selectors inside the component.

## Required behavior

- Preserve selection while searching, filtering, changing view, and paginating.
- Keep search as one input, with its icon inside the field.
- Announce selection totals through the existing polite live region.
- Maintain accurate `aria-expanded`, `aria-pressed`, checkbox, disabled, and dialog states.
- Treat missing thumbnails as expected content and use the tokenized placeholder.
- Retain the Modal focus, Escape dismissal, focus return, and scroll-lock behavior.

## Pixel-perfect acceptance

Compare implementation against the live documentation page in both themes. Verify default, hover, focus-visible, selected, filtered, loading, empty, and disabled states. All visual changes must be made through the canonical token chain unless the change is structural layout.
