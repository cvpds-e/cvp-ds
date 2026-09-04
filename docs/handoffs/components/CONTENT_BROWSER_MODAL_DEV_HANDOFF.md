# Content Browser Modal — developer handoff

## Canonical implementation

- Component: `src/app/components/ContentBrowserModal.tsx`
- Component styles: `src/app/components/ContentBrowserModal.css`
- Tier 3 aliases: `src/styles/tokens/cvp-component-tokens.css`
- Visual and contract audit: `src/app/components/ContentBrowserModalDocumentation.tsx`

The component is a composition of the canonical `Modal`, `Checkbox`, `PrimaryButton`, `OutlineButton`, `TextButton`, `IconButton`, `SearchField`, `TagFilter`, `MultiSelect`, and `Select`. Do not recreate their surfaces, focus rings, disabled states, or theme values locally.

## Integration contract

Supply catalog data through `items`. Keep application data, fetching, permissions, and error handling outside the design-system component. Selection may be controlled with `selectedItems` and `onSelectionChange`, or left uncontrolled. `onConfirm` receives the final selected IDs. Use `loading` while catalog data is pending and `pageSize` only when the product context needs a different result density.

The production component intentionally contains no sample catalog. Demo items live only in the documentation page.

## Token contract

Content Browser CSS consumes `--cvp-content-browser-*` Tier 3 aliases. These resolve to canonical semantic and shared component tokens, including `--cvp-modal-*`, `--cvp-checkbox-*`, and `--cvp-input-*`. Theme switching therefore happens at the canonical source; do not add light/dark selectors inside the component.

The expanded filter row uses `--cvp-content-browser-filter-bg`, which resolves to the Section surface (`color.bg.base.section` / `--cvp-color-surface-sunken`) for grouped navigation-region hierarchy.

## Required behavior

- Preserve selection while searching, filtering, changing view, and paginating.
- Keep search as the shared `SearchField`, with its icon inside the field.
- Progressive filters are limited to editorial VOD curation: `Sort by` uses `SortControl` with Title / Year and an ascending/descending direction toggle; `Tags` uses `MultiSelect` with selected values rendered as pills; `Year` uses `Select`; and optional `Program type` uses `TagFilter` as the final criterion immediately before `Clear filters`. Do not substitute native selects or introduce provider/genre filters in this modal. Keep the filter grid aligned at wide widths and collapse it into balanced rows at narrower widths. Sorting is presentation state, so Clear filters resets content criteria only.
- Keep selection quiet in the results: Checkbox state is the local indicator; the results label and `Add selected (n)` show the current selection count. Show a nearby Clear action in the default Text Button style only when an active selection can be cleared. Do not add a bulk “Select page” control.
- Maintain accurate `aria-expanded`, `aria-pressed`, checkbox, disabled, and dialog states.

## Catalog contract

- New catalog integrations should use `programType` (`movie` or `series`) and `tags`.
- `genre` on an item and `filterOptions.genres` remain compatibility fallbacks for legacy data only; do not use them for new integrations.
- The modal accepts only the editorial curation options: `programTypes`, `tags`, and `years`. Provider and rating filter options are intentionally not part of this contract.
- Treat missing thumbnails as expected content and use the tokenized placeholder.
- Retain the Modal focus, Escape dismissal, focus return, and scroll-lock behavior.

## Pixel-perfect acceptance

Compare implementation against the live documentation page in both themes. Verify default, hover, focus-visible, selected, filtered, loading, empty, and disabled states. All visual changes must be made through the canonical token chain unless the change is structural layout.
