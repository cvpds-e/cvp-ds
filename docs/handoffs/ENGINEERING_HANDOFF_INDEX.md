# CVP Design System — Engineering Handoff Index

**Handoff date:** 2026-08-05  
**Status:** Approved scope ready for implementation  
**Preview:** `http://127.0.0.1:5173/`

This is the engineering entry point for the standardized CVP design system. It links the live visual specifications, canonical code, token contracts, implementation notes, acceptance criteria, and deferred scope. When sources disagree, use the priority order in [Source of truth](#source-of-truth).

## 1. Approved scope

### Foundations

| Foundation | Preview route | Canonical implementation |
|---|---|---|
| Color | `?page=colors` | `src/styles/tokens/cvp-primitives.css`, `src/styles/tokens/cvp-semantic-tokens.css` |
| Typography | `?page=typography` | `src/styles/tokens/cvp-primitives.css`, `src/styles/tokens/cvp-semantic-tokens.css` |
| Spacing and density | `?page=spacing` | `src/styles/tokens/cvp-spacing.css`, canonical values in the three-tier token graph |
| Radius | `?page=radius` | `src/styles/tokens/cvp-radius.css`, canonical values in the three-tier token graph |
| Border | `?page=border` | `src/styles/tokens/cvp-semantic-tokens.css`, `src/styles/tokens/cvp-component-tokens.css` |
| Elevation | `?page=elevation` | `src/styles/tokens/cvp-semantic-tokens.css` |
| Layout foundation | `?page=layout-foundation` | canonical layout roles in the token files and foundation preview |

Motion is governed by the supplied foundation specification and reduced-motion behavior in component CSS. It does not currently have a separate active preview route.

### Actions

| Component | Preview | Canonical source | Handoff |
|---|---|---|---|
| Primary Button | `?page=primary-button` | `PrimaryButton.tsx` / `PrimaryButton.css` / `--cvp-button-primary-*` | `docs/handoffs/components/PRIMARY_BUTTON_STANDARDIZATION.md` |
| Secondary Button | `?page=secondary-button` | `SecondaryButton.tsx` / `SecondaryButton.css` / `--cvp-button-secondary-*` | `docs/handoffs/components/SECONDARY_BUTTON_STANDARDIZATION.md` |
| Outline Button | `?page=outline-button` | `OutlineButton.tsx` / `OutlineButton.css` / `--cvp-button-outline-*` | `docs/handoffs/components/OUTLINE_BUTTON_STANDARDIZATION.md` |
| Icon Button | `?page=icon-button` | `IconButton.tsx` / `IconButton.css` / `--cvp-button-icon-*` | `docs/handoffs/components/ICON_BUTTON_STANDARDIZATION.md` |
| Icon Small Button | `?page=icon-small-button` | compatibility wrapper over `IconButton` | `docs/handoffs/components/ICON_SMALL_BUTTON_STANDARDIZATION.md` |
| Icon Button with Text | `?page=icon-button-with-text` | `IconButtonWithText.tsx` / `IconButtonWithText.css` | `docs/handoffs/components/ICON_BUTTON_WITH_TEXT_STANDARDIZATION.md` |
| Text Button | `?page=text-button` | `TextButton.tsx` / `TextButton.css` / `--cvp-button-text-*` | `docs/handoffs/components/TEXT_BUTTON_STANDARDIZATION.md` |

All implementation paths in this document are relative to `src/app/components/` unless otherwise stated.

### Form controls and filtering

| Component | Preview | Canonical source | Handoff |
|---|---|---|---|
| Text Input | `?page=text-input` | `TextInput.tsx` / `TextInput.css` / `--cvp-input-*` | `docs/handoffs/components/TEXT_INPUT_STANDARDIZATION.md` |
| Number Input | `?page=number-input` | `NumberInput.tsx` / `NumberInput.css` / `--cvp-input-*` | `docs/handoffs/components/NUMBER_INPUT_STANDARDIZATION.md` |
| Text Area | `?page=text-area` | `TextArea.tsx` / `TextArea.css` / `--cvp-textarea-*` | `docs/handoffs/components/TEXT_AREA_SELECT_STANDARDIZATION.md` |
| Misc Input | `?page=misc-input` | `MiscInput.tsx` / `MiscInput.css` / `--cvp-misc-input-*` | `docs/handoffs/components/MISC_INPUT_STANDARDIZATION.md` |
| Checkbox | `?page=checkbox` | `Checkbox.tsx` / `Checkbox.css` / `--cvp-checkbox-*` | `docs/handoffs/components/CHECKBOX_STANDARDIZATION.md` |
| Select | `?page=select` | `Select.tsx` / `Select.css` / `--cvp-select-*` | `docs/handoffs/components/TEXT_AREA_SELECT_STANDARDIZATION.md` |
| Multi Select | `?page=multi-select` | `MultiSelect.tsx` / `MultiSelect.css` / `--cvp-multi-select-*` | `docs/handoffs/components/MULTI_SELECT_STANDARDIZATION.md` |
| Filter | `?page=filter` | `Filter.tsx` / `Filter.css` / `--cvp-filter-*` | `docs/handoffs/components/FILTER_DATE_PICKER_STANDARDIZATION.md` |
| Date Picker | `?page=date-picker` | `DatePicker.tsx` / `DatePicker.css` / `--cvp-date-picker-*` | `docs/handoffs/components/FILTER_DATE_PICKER_STANDARDIZATION.md` |

Text Input is the reference field anatomy. Text Area, Select, Misc Input, Multi Select, Filter, and Date Picker must preserve its label, description, validation, border, focus, density, and theme conventions unless their documented interaction model requires an explicit specialization.

### Navigation and data display

| Component | Preview | Canonical source | Handoff |
|---|---|---|---|
| Breadcrumbs | `?page=breadcrumbs` | `Breadcrumbs.tsx` / `Breadcrumbs.css` / `--cvp-breadcrumb-*` | `docs/handoffs/components/BREADCRUMBS_STANDARDIZATION.md` |
| Header Navigation | `?page=header-navigation` | `HeaderNavigation.tsx` / `HeaderNavigation.css` / `--cvp-header-*` | `docs/handoffs/components/HEADER_NAVIGATION_STANDARDIZATION.md` |
| Tabs | `?page=tabs` | `Tabs.tsx` / `Tabs.css` / `--cvp-tabs-*` | `docs/handoffs/components/TABS_STANDARDIZATION.md` |
| Tree | `?page=tree` | `Tree.tsx` / `Tree.css` / `--cvp-tree-*` | `docs/handoffs/components/TREE_COMPONENT_DEV_HANDOFF.md` |
| Table | `?page=table` | `Table.tsx` / `Table.css` / `--cvp-table-*` | `docs/handoffs/components/TABLE_COMPONENT_DEV_HANDOFF.md` |
| Segmented | `?page=segmented` | `Segmented.tsx` / `Segmented.css` / `--cvp-segmented-*` | `docs/handoffs/components/SEGMENTED_STANDARDIZATION.md` |
| Accordion | `?page=accordion` | `Accordion.tsx` / `Accordion.css` / `--cvp-accordion-*` | `docs/handoffs/components/ACCORDION_STANDARDIZATION.md` |
| Tag Filter | `?page=tag-filter` | `TagFilter.tsx` / `TagFilter.css` / `--cvp-tag-filter-*` | `docs/handoffs/components/TAG_FILTER_STANDARDIZATION.md` |

### Overlays, feedback, product components, and integration

| Component | Preview | Canonical source | Handoff |
|---|---|---|---|
| Modal | `?page=modal` | `Modal.tsx` / `Modal.css` / `--cvp-modal-*` | `docs/handoffs/components/MODAL_COMPONENT_DEV_HANDOFF.md` |
| Content Browser Modal | `?page=content-browser-modal` | `ContentBrowserModal.tsx` / CSS / `--cvp-content-browser-*` | `docs/handoffs/components/CONTENT_BROWSER_MODAL_DEV_HANDOFF.md` |
| Toast | `?page=toast` | `Toast.tsx` / `Toast.css` / `--cvp-toast-*` | `docs/handoffs/components/TOAST_COMPONENT_DEV_HANDOFF.md` |
| Notification Banner | `?page=notification-banner` | `NotificationBanner.tsx` / CSS / `--cvp-notification-banner-*` | `docs/handoffs/components/NOTIFICATION_BANNER_DEV_HANDOFF.md` |
| Rail Content Gallery | `?page=rail-content-gallery` | `RailContentGallery.tsx` / CSS / `--cvp-gallery-*` | `docs/handoffs/components/RAIL_CONTENT_GALLERY_DEV_HANDOFF.md` |
| Login / Sign Up | `?page=login-signup` | `LoginSignUp.tsx` / CSS / `--cvp-login-*` | `docs/handoffs/components/LOGIN_SIGN_UP_DEV_HANDOFF.md` |
| Rail Details | `?page=rail-details` | `RailDetails.tsx` / `RailDetails.css` | composed-page visual acceptance reference |

Rail Details intentionally has no page-level Token Contract. It proves that the approved child components and foundation contracts work together in a production-shaped workflow.

## 2. Deferred scope

The following components are not approved for implementation and are hidden from the active navigation:

- Toggle
- Filter Group
- Page Side Nav
- Segment Query Configuration
- Standalone Layout component showcase

Their existing source is retained for later evaluation. Engineers must not treat it as a canonical example or migrate it into production as part of this handoff.

## 3. Source of truth

Use this precedence order:

1. `src/styles/tokens/cvp-primitives.css` — Tier 1 raw values
2. `src/styles/tokens/cvp-semantic-tokens.css` — Tier 2 theme-aware roles
3. `src/styles/tokens/cvp-component-tokens.css` — Tier 3 component contracts
4. Canonical component TSX and CSS
5. The matching documentation page and handoff Markdown
6. Rail Details for composed-page behavior
7. Historical PDFs, Figma imports, screenshots, and migration references

Do not copy a resolved hex value from the browser into component CSS. Resolve the intended semantic role through the component contract. Component-local variables are allowed only for runtime instance values such as modal width, table height, or tree depth.

### Import contract

Existing migrated applications should import:

```css
@import 'src/styles/tokens/cvp-alias-bridge.css';
```

New applications with no legacy `--tc-*` dependency should import:

```css
@import 'src/styles/tokens/cvp-component-tokens.css';
```

The alias bridge is transitional and must not be expanded with new product tokens.

## 4. Recommended implementation order

1. Install the primitive, semantic, component-token, and alias files in their canonical order.
2. Implement the application theme attribute and verify explicit `light` and `dark` modes.
3. Implement typography, spacing/density, radius, border, elevation, layout, and motion foundations.
4. Implement shared actions and Text Input.
5. Implement the remaining form controls using the Text Input contract.
6. Implement navigation, Table, Tree, and filtering patterns.
7. Implement overlays and feedback.
8. Implement product specializations: Content Browser Modal, Rail Content Gallery, and Login / Sign Up.
9. Recreate Rail Details as the integration acceptance test.
10. Remove legacy aliases only after usage reaches zero and Phase 4 is explicitly approved.

## 5. Pixel-perfect acceptance checklist

Every component is accepted only when all applicable items pass.

### Visual and token fidelity

- [ ] Uses only registered CVP component or semantic tokens for governed values.
- [ ] Matches documented height, width constraints, padding, gap, typography, border width, radius, and elevation.
- [ ] Uses the same DOM and geometry in light and dark modes.
- [ ] Resting borders remain subtle; hover, focus, selected, warning, and error boundaries retain their intended hierarchy.
- [ ] Icons use the documented size, stroke, alignment, and accessible-name behavior.
- [ ] Loading states preserve the component’s normal width and horizontal padding.
- [ ] Dense and comfortable modes change only governed density values.

### States and behavior

- [ ] Default, hover, active/pressed, focus-visible, disabled, loading, selected, invalid, and read-only states are implemented where documented.
- [ ] Empty, loading, populated, overflow, and error states are implemented for collection components.
- [ ] Controlled values, callbacks, and state transitions match the documented API.
- [ ] Overlays use the correct stacking, backdrop, dismissal, scroll, and footer behavior.
- [ ] Responsive behavior preserves usable targets and prevents unintended document-level horizontal overflow.

### Accessibility and DOM

- [ ] Text and meaningful non-text contrast meet WCAG AA in both themes.
- [ ] Focus-visible treatment is not removed or replaced by color alone.
- [ ] Labels, descriptions, errors, headings, regions, lists, tables, and dialogs use valid associations and semantics.
- [ ] Native elements are preferred where they provide the required behavior.
- [ ] Keyboard flows and screen-reader announcements are certified by engineering QA.
- [ ] Reduced-motion preferences disable or simplify non-essential animation.

### Review evidence

- [ ] Component is compared with its live preview route at the agreed viewport.
- [ ] Both themes and all documented states are captured in visual regression tests.
- [ ] Automated build, type, lint, token-governance, accessibility, and interaction checks pass.
- [ ] Any intentional deviation is recorded and approved before merge.

## 6. Verification completed for this handoff

- Production Vite build passes.
- All 38 active routes were exercised in light and dark modes.
- No missing-route states or document-level horizontal overflow were found in the approved scope.
- Automated WCAG A/AA checks were run against approved pages in both themes.
- Token resolution and component contract references were audited.
- Deferred pages are excluded from active navigation.
- Rail Details validates the composed component language.

See `docs/handoffs/checkpoints/ENGINEERING_HANDOFF_READINESS.md` for the final audit summary and known infrastructure follow-ups.

## 7. Engineering follow-ups

These do not block the design handoff, but they are required before treating the repository as a release-grade component package:

- Add TypeScript typecheck and CI enforcement.
- Add Stylelint rules for unregistered and deprecated tokens.
- Add Storybook or an equivalent isolated component harness.
- Add light/dark state-based visual regression coverage.
- Add automated keyboard and interaction tests plus manual screen-reader certification.
- Validate partner/customer token overrides against contrast requirements.
- Add bundle splitting; the current Vite production build reports a large-chunk warning.
- Maintain a token/component changelog and version the approved baseline.

## 8. Supporting checkpoints

- `docs/handoffs/checkpoints/FORM_COMPONENTS_CHECKPOINT.md`
- `docs/handoffs/checkpoints/NAVIGATION_COMPONENTS_CHECKPOINT.md`
- `docs/handoffs/checkpoints/OVERLAYS_FEEDBACK_COMPLEX_CHECKPOINT.md`
- `docs/handoffs/checkpoints/BORDER_REFINEMENT_CHECKPOINT.md`
- `docs/handoffs/checkpoints/ENGINEERING_HANDOFF_READINESS.md`
- `docs/specifications/DESIGN_SYSTEM_COMPONENT_INVENTORY.md`
- `docs/project/IMPLEMENTATION_STATUS.md`
