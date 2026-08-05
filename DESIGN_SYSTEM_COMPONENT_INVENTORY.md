# CVP Design System — Component Inventory

**Prepared by:** Design Systems Engineering  
**Date:** 2026-07-23  
**Purpose:** Engineering handoff — coverage checklist for `DESIGN_SYSTEM_SPECIFICATION.md`  
**Scope:** All components with evidence in the repository. No invented components.

---

## Preface — Cross-Cutting Gaps

Two gaps apply universally and are not repeated in every row below.

**Storybook: zero stories exist.** `src/stories/` does not exist. No `.stories.tsx` or `.stories.ts` files are present anywhere in the repository. Every component listed below has implementation code and no Storybook story. This is blocking the arg-table generation, visual regression suite, and WCAG spot-check workflows described in `TOKEN_GOVERNANCE.md` and `IMPLEMENTATION_STATUS.md`. Phase 0–3 remediation requires Storybook before Phase 2 begins.

**Token migration: Phase 0–3 not started.** Most component implementations reference a mix of old shorthand tokens (`--bg-page`, `--text-primary`, `--input-border`) and component-specific custom tokens (`--primary-button-*`, `--toggle-*`, `--segmented-*`) that are not registered in `cvp-component-tokens.css`. The three-tier CVP token architecture is specified in the CSS files but the component `.tsx` implementations have not been migrated to consume it. Token coverage ratings below reflect this gap.

---

## 1. Component Inventory

> **Token coverage key**
> - `cvp-comp` — references `--cvp-*` component tokens from `cvp-component-tokens.css`
> - `cvp-sem` — references `--cvp-*` semantic tokens directly
> - `unregistered` — references component-specific custom tokens not present in any CVP file (e.g. `--toggle-*`, `--segmented-*`, `--filter-*`)
> - `legacy` — references old shorthand tokens (`--bg-*`, `--text-*`, `--border-*`) from the pre-namespace era
> - `hardcoded` — contains hardcoded hex values alongside or instead of tokens

> **Status key**
> - **Complete** — implementation is production-ready; all documented props, variants, and states are present
> - **Partial** — implementation exists but one or more variants, states, or documented features are unfinished
> - **Missing Story** — Storybook story absent (applies universally; see Preface)
> - **Missing Specification** — referenced in documentation but no component implementation found
> - **Legacy** — implementation exists but uses pre-cvp token naming throughout
> - **Deprecated** — marked for removal
> - **Unclear** — implementation status cannot be determined from available evidence

---

### 1.1 Actions

| Component | Family | Implementation | Storybook | Token coverage | Behaviour documented | Status |
|---|---|---|---|---|---|---|
| PrimaryButton | Actions | `src/app/components/PrimaryButton.tsx` | None | `unregistered` (`--primary-button-*`) | `PrimaryButtonDocumentation.tsx` | Complete — Missing Story |
| SecondaryButton | Actions | `src/app/components/SecondaryButton.tsx` | `SecondaryButton.css` | `--cvp-button-secondary-*` | `SecondaryButtonDocumentation.tsx` | Standardized — Visual + Handoff |
| OutlineButton | Actions | `src/app/components/OutlineButton.tsx` | `OutlineButton.css` | `--cvp-button-outline-*` | `OutlineButtonDocumentation.tsx` | Standardized — Visual + Handoff |
| TextButton | Actions | `src/app/components/TextButton.tsx` | `TextButton.css` | `--cvp-button-text-*` | `TextButtonDocumentation.tsx` | Standardized — Visual + Handoff |
| IconButton | Actions | `src/app/components/IconButton.tsx` | `IconButton.css` | `--cvp-button-icon-*` | `IconButtonDocumentation.tsx` | Standardized — Visual + Handoff |
| IconButtonWithText | Actions | `src/app/components/IconButtonWithText.tsx` | `IconButtonWithText.css` | `--cvp-button-icon-text-*` | `IconButtonWithTextDocumentation.tsx` | Standardized — Visual + Handoff |
| IconSmallButton | Actions | `src/app/components/IconSmallButton.tsx` | Canonical `IconButton.css` | `--cvp-button-icon-*` | `IconSmallButtonDocumentation.tsx` | Standardized — Compatibility Alias |

**Aliases / naming notes:** `PrimaryButton`, `SecondaryButton`, `OutlineButton`, `TextButton` correspond to the button variant system described in `cvp-component-tokens.css` as `--cvp-button-primary-*`, `--cvp-button-secondary-*`, `--cvp-button-outline-*`, `--cvp-button-text-*`. These four are the canonical CVP button variants. `IconButton` and `IconSmallButton` are size-differentiated forms of the same concept; canonical name is `IconButton` with a `size` prop. `IconButtonWithText` has no counterpart in `cvp-component-tokens.css`.

---

### 1.2 Form Controls

| Component | Family | Implementation | Storybook | Token coverage | Behaviour documented | Status |
|---|---|---|---|---|---|---|
| TextInput | Form Controls | `src/app/components/TextInput.tsx` | None | `unregistered` (`--text-input-*`) | `TextInputDocumentation.tsx` | Complete — Missing Story |
| TextArea | Form Controls | `src/app/components/TextArea.tsx` | None | `unregistered` | `TextAreaDocumentation.tsx` | Partial — Missing Story |
| MiscInput | Form Controls | `src/app/components/MiscInput.tsx` | `MiscInput.css` | `--cvp-misc-input-*` → `--cvp-input-*` | `MiscInputDocumentation.tsx` | Standardized — Visual + Handoff |
| Select | Form Controls | `src/app/components/Select.tsx` | None | `unregistered` | `SelectDocumentation.tsx` | Complete — Missing Story |
| MultiSelect | Form Controls | `src/app/components/MultiSelect.tsx` | None | `unregistered` | `MultiSelectDocumentation.tsx` | Partial — Missing Story |
| Checkbox | Form Controls | `src/app/components/Checkbox.tsx` | None | `unregistered` (`--checkbox-*`) | `CheckboxDocumentation.tsx` | Complete — Missing Story |
| Toggle | Form Controls | `src/app/components/Toggle.tsx` | None | `unregistered` (`--toggle-*`) | `ToggleDocumentation.tsx` | Complete — Missing Story |
| Segmented | Form Controls | `src/app/components/Segmented.tsx` | None | `unregistered` (`--segmented-*`) | `SegmentedDocumentation.tsx` | Complete — Missing Story |

**Aliases / naming notes:** `TextInput` is the canonical single-line input. `MiscInput` is a richer variant with prefix/suffix slots, character count, copy button, and four validation states — it is not an alias; it is a distinct, more capable component. These two should be reconciled: either `MiscInput` supersedes `TextInput` or they occupy different complexity tiers. `Segmented` is the component name in code; `SegmentedControl` appears in some documentation — canonical name is `Segmented`. `Toggle` maps to what `cvp-component-tokens.css` does not yet cover; the shadcn/ui layer has a separate `ui/switch.tsx` and `ui/toggle.tsx` — these are primitives, not CVP-styled components.

---

### 1.3 Navigation

| Component | Family | Implementation | Storybook | Token coverage | Behaviour documented | Status |
|---|---|---|---|---|---|---|
| HeaderNavigation | Navigation | `src/app/components/HeaderNavigation.tsx` | None | `cvp-comp` (partially, via `--cvp-color-nav-*`) | `HeaderNavigationDocumentation.tsx` | Complete — Missing Story |
| PageSideNav | Navigation | `src/app/components/PageSideNav.tsx` | None | `unregistered` (`--page-side-nav-*`) | `PageSideNavDocumentation.tsx` | Partial — Missing Story |
| Breadcrumbs | Navigation | `src/app/components/Breadcrumbs.tsx` | None | `unregistered` (`--breadcrumb-*`) | `BreadcrumbsDocumentation.tsx` | Complete — Missing Story |
| Tabs | Navigation | `src/app/components/Tabs.tsx` | None | `unregistered` (`--tabs-*`) | `TabsDocumentation.tsx` | Complete — Missing Story |
| DesignSystemNav | Navigation | `src/app/components/DesignSystemNav.tsx` | None | Unknown | None | Unclear — internal use only |

**Aliases / naming notes:** `PageSideNav` is the CVP custom sidebar; `ui/sidebar.tsx` is the shadcn/ui primitive. These are distinct. `Breadcrumbs` (CVP) vs `ui/breadcrumb.tsx` (shadcn) — same distinction. `DesignSystemNav` appears to be an internal demo/navigation component, not a publishable design system component.

---

### 1.4 Overlays

| Component | Family | Implementation | Storybook | Token coverage | Behaviour documented | Status |
|---|---|---|---|---|---|---|
| Modal | Overlays | `src/app/components/Modal.tsx` | None | `unregistered` (`--modal-*`) | `ModalDocumentation.tsx` | Complete — Missing Story |
| ContentBrowserModal | Overlays | `src/app/components/ContentBrowserModal.tsx` | None | Unknown | `ContentBrowserModalDocumentation.tsx` | Partial — Missing Story |

**Aliases / naming notes:** `Modal` is the general-purpose overlay; `ContentBrowserModal` is a product-specific specialisation with a file/content-tree structure. They share the modal shell. `cvp-component-tokens.css` covers `--cvp-modal-*` tokens for the base Modal only. `ui/dialog.tsx` and `ui/drawer.tsx` are the shadcn/ui primitives that `Modal` may or may not delegate to — this is an open question (see §6).

---

### 1.5 Feedback

| Component | Family | Implementation | Storybook | Token coverage | Behaviour documented | Status |
|---|---|---|---|---|---|---|
| Toast | Feedback | `src/app/components/Toast.tsx` | None | `unregistered` (`--toast-*`) | `ToastDocumentation.tsx` | Complete — Missing Story |
| NotificationBanner | Feedback | `src/app/components/NotificationBanner.tsx` | None | `unregistered` (`--notification-banner--*`) | `NotificationBannerDocumentation.tsx` | Complete — Missing Story |

**Aliases / naming notes:** `Toast` is the transient, auto-dismissing notification. `NotificationBanner` is the persistent, full-width contextual message — these are distinct patterns. `ui/sonner.tsx` is a third-party toast primitive also present; the relationship between it and the CVP `Toast` component is unclear (see §6).

---

### 1.6 Data Display

| Component | Family | Implementation | Storybook | Token coverage | Behaviour documented | Status |
|---|---|---|---|---|---|---|
| Table | Data Display | `src/app/components/Table.tsx` | None | `unregistered` (`--table-*`) | `TableDocumentation.tsx`, `TableSpecifications.tsx` | Complete — Missing Story |
| Accordion | Data Display | `src/app/components/Accordion.tsx` | None | `unregistered` (`--accordion-*`) | `AccordionDocumentation.tsx` | Complete — Missing Story |
| Tree | Data Display | `src/app/components/Tree.tsx` + 4 sub-files | None | Unknown | `TreeDocumentation.tsx` | Partial — Missing Story |

**Tree sub-components:** `TreeNode.tsx`, `TreeItem.tsx`, `TreeGroup.tsx`, `TreeGroupHeader.tsx`. These are compound parts of the `Tree` component. `cvp-component-tokens.css` does not yet define `--cvp-tree-*` tokens.

---

### 1.7 Filtering and Search

| Component | Family | Implementation | Storybook | Token coverage | Behaviour documented | Status |
|---|---|---|---|---|---|---|
| Filter | Filtering | `src/app/components/Filter.tsx` | None | `unregistered` (`--filter-*`) + `hardcoded` | `FilterDocumentation.tsx` | Complete — Missing Story |
| FilterGroup | Filtering | `src/app/components/FilterGroup.tsx` | None | Unknown | `FilterGroupDocumentation.tsx` | Partial — Missing Story |
| TagFilter | Filtering | `src/app/components/TagFilter.tsx` | None | `unregistered` (`--tag-filter-*`) | `TagFilterDocumentation.tsx` | Complete — Missing Story |

**Aliases / naming notes:** `Filter` is the advanced multi-type query filter (text, select, date, multiselect, boolean) with a dropdown menu UI. `FilterGroup` groups multiple `Filter` instances. `TagFilter` is a tag-cloud selection pattern — distinct from `Filter` in interaction model and data shape. None of these three have corresponding tokens in `cvp-component-tokens.css`.

---

### 1.8 Media and Editorial

| Component | Family | Implementation | Storybook | Token coverage | Behaviour documented | Status |
|---|---|---|---|---|---|---|
| RailContentGallery | Media | `src/app/components/RailContentGallery.tsx` | None | `cvp-comp` (partially, via `--cvp-rail-*` in token file) | `RailContentGalleryDocumentation.tsx` | Partial — Missing Story |
| RailDetails | Media | `src/app/components/RailDetails.tsx` | None | `legacy` (`--bg-page`, `--border-default`, etc.) | None | Legacy — Missing Story |

**Aliases / naming notes:** `RailContentGallery` and `RailDetails` are product-specific editorial workflow components. `RailContentGallery` has 4 variants: `management`, `display`, `display-grid`, `display-grid-selectable`. `cvp-component-tokens.css` defines `--cvp-rail-*` tokens but the component implementation still uses the old names. `RailDetails` has no documentation component; its behaviour is embedded in the component itself.

---

### 1.9 Layout

| Component | Family | Implementation | Storybook | Token coverage | Behaviour documented | Status |
|---|---|---|---|---|---|---|
| Layout | Layout | `src/app/components/Layout.tsx` | None | Unknown | `LayoutDocumentation.tsx`, `LayoutSpecifications.tsx` | Partial — Missing Story |

---

### 1.10 Authentication

| Component | Family | Implementation | Storybook | Token coverage | Behaviour documented | Status |
|---|---|---|---|---|---|---|
| LoginSignUp | Authentication | `src/app/components/LoginSignUp.tsx` | None | Unknown | `LoginSignUpDocumentation.tsx` | Partial — Missing Story |
| LoginSignUpLight | Authentication | `src/app/components/LoginSignUpLight.tsx` | None | Unknown | (shared with above) | Partial — Missing Story |

**Aliases / naming notes:** `LoginSignUp` is the dark-theme variant; `LoginSignUpLight` is the light-theme variant. These should be unified into a single `LoginSignUp` component with theme-aware tokens rather than two separate files. Both are product-specific, not generic design system primitives.

---

### 1.11 Product-Specific Patterns

| Component | Family | Implementation | Storybook | Token coverage | Behaviour documented | Status |
|---|---|---|---|---|---|---|
| SegmentQueryConfiguration | Product | `src/app/components/SegmentQueryConfiguration.tsx` | None | Unknown | `SegmentQueryConfigurationDocumentation.tsx` | Partial — Missing Story |

**Notes:** This is a domain-specific query builder for editorial content segments. It composes `Filter`, `Modal`, and form controls. It is not a generic design system component but is part of the CVP product layer. It should be documented in the specification as a product pattern, not a base component.

---

### 1.12 Utility and Internal

| Component | Family | Implementation | Storybook | Token coverage | Behaviour documented | Status |
|---|---|---|---|---|---|---|
| ThemeSwitcher | Utility | `src/app/components/ThemeSwitcher.tsx` | None | `theme-switcher.css` | None | Unclear — demo use only |
| ImageWithFallback | Utility | `src/app/components/figma/ImageWithFallback.tsx` | None | None | None | Unclear — Figma import support |

---

### 1.13 shadcn/ui Primitive Layer (not CVP-authored)

The following 46 components live in `src/app/components/ui/` and are unmodified shadcn/ui primitives. They are available as building blocks but carry no CVP token coverage, no CVP documentation, and no Storybook stories. They are listed for inventory completeness. They should **not** appear as CVP design system components in `DESIGN_SYSTEM_SPECIFICATION.md` unless they have been styled with CVP tokens and documented.

`accordion` · `alert` · `alert-dialog` · `aspect-ratio` · `avatar` · `badge` · `breadcrumb` · `button` · `calendar` · `card` · `carousel` · `chart` · `checkbox` · `collapsible` · `command` · `context-menu` · `dialog` · `drawer` · `dropdown-menu` · `form` · `hover-card` · `input` · `input-otp` · `label` · `menubar` · `navigation-menu` · `pagination` · `popover` · `progress` · `radio-group` · `resizable` · `scroll-area` · `select` · `separator` · `sheet` · `sidebar` · `skeleton` · `slider` · `sonner` · `switch` · `table` · `tabs` · `textarea` · `toggle` · `toggle-group` · `tooltip`

---

## 2. Component Families (Summary)

| Family | Components | Notes |
|---|---|---|
| Actions | PrimaryButton, SecondaryButton, OutlineButton, TextButton, IconButton, IconButtonWithText, IconSmallButton | 7 components; 4 button variants + 3 icon-button variants |
| Form Controls | TextInput, TextArea, MiscInput, Select, MultiSelect, Checkbox, Toggle, Segmented | 8 components; MiscInput/TextInput overlap needs resolution |
| Navigation | HeaderNavigation, PageSideNav, Breadcrumbs, Tabs, DesignSystemNav | 5 components; DesignSystemNav is internal only |
| Overlays | Modal, ContentBrowserModal | 2 components; ContentBrowserModal extends Modal |
| Feedback | Toast, NotificationBanner | 2 distinct patterns (transient vs. persistent) |
| Data Display | Table, Accordion, Tree | 3 components; Tree has 5 compound parts |
| Filtering and Search | Filter, FilterGroup, TagFilter | 3 components; all unregistered in token files |
| Media and Editorial | RailContentGallery, RailDetails | 2 product-specific components |
| Layout | Layout | 1 component; partially documented |
| Authentication | LoginSignUp, LoginSignUpLight | 2 files; should be unified |
| Product Patterns | SegmentQueryConfiguration | 1 product-specific query builder |
| Utility / Internal | ThemeSwitcher, ImageWithFallback | Not publishable design system components |

**Total CVP components (publishable candidates):** 33  
**Internal / utility only:** 3 (DesignSystemNav, ThemeSwitcher, ImageWithFallback)  
**shadcn/ui primitives (available, not CVP-styled):** 46

---

## 3. Variants and Subcomponents

### Actions — PrimaryButton / SecondaryButton / OutlineButton / TextButton

| Dimension | Values |
|---|---|
| Size | `small` · `medium` · `large` |
| Variant (by component) | `primary` · `secondary` · `outline` · `text` |
| States | default · hover · active · focus · disabled |
| Slots | icon (leading/trailing, not yet formalised in props) |
| Controlled | N/A (buttons are stateless) |
| Theme behaviour | Full light/dark via component tokens |

### Actions — IconButton / IconSmallButton / IconButtonWithText

| Dimension | Values |
|---|---|
| Size | default (`IconButton`) · small (`IconSmallButton`) |
| States | default · hover · active · focus · disabled |
| Slots | `icon` (required) · `label` (IconButtonWithText only) |
| Theme behaviour | Full light/dark |

### Form Controls — TextInput

| Dimension | Values |
|---|---|
| Variant | `default` · `error` |
| States | default · hover · focus · disabled · error |
| Slots | `label` · `helperText` · `error` (message) |
| Controlled | Yes (`value` + `onChange`) |
| Theme behaviour | Full light/dark |

### Form Controls — MiscInput

| Dimension | Values |
|---|---|
| Variant | `default` · `error` · `warning` · `success` |
| States | default · hover · focus · disabled |
| Slots | `prefixElement` · `suffixElement` · `fieldPrefix` · `label` · `helperText` · character count · copy button |
| Controlled | Yes (forwardRef) |
| Theme behaviour | Partial — hardcoded values present |

### Form Controls — Checkbox

| Dimension | Values |
|---|---|
| Checked state | `true` · `false` · `'indeterminate'` |
| States | default · hover · focus · disabled |
| Slots | `label` · `description` |
| Controlled | Yes (`checked` + `onChange`) and uncontrolled (`defaultChecked`) |
| Theme behaviour | Full light/dark |

### Form Controls — Toggle

| Dimension | Values |
|---|---|
| Size | `default` · `small` |
| States | on · off · indeterminate · hover · focus · disabled |
| Slots | `label` · `description` |
| Controlled | Yes (`checked` + `onChange`) and uncontrolled (`defaultChecked`) |
| Theme behaviour | Partial — unregistered tokens |

### Form Controls — Segmented

| Dimension | Values |
|---|---|
| Size | `small` · `medium` · `large` |
| Variant | `default` · `color` |
| States | selected · unselected · hover · focus · disabled (per-option) |
| Slots | `options[]` (value + label + disabled) |
| Controlled | Yes (`value` + `onChange`) and uncontrolled (`defaultValue`) |
| Responsive | No |
| Theme behaviour | Partial — unregistered tokens |

### Form Controls — Select / MultiSelect

| Dimension | Values |
|---|---|
| States | default · hover · open · focus · disabled |
| Slots | `label` · `placeholder` · `options[]` |
| MultiSelect extras | chip display of selected values · remove chip |
| Controlled | Yes |
| Theme behaviour | Partial — unregistered tokens |

### Navigation — HeaderNavigation

| Dimension | Values |
|---|---|
| Slots | `navItems` · `userDropdown` |
| States | `activeNav` item · dropdown open/closed · user menu open |
| Responsive | Yes |
| Theme behaviour | Partial (references `--cvp-color-nav-*` which exists in semantic file) |

### Navigation — PageSideNav

| Dimension | Values |
|---|---|
| Slots | `sections[]` (title + items) · item icon · item badge |
| States | active item · hover item |
| Controlled | Yes (`sections[].items[].active`, `onClick`) |
| Theme behaviour | Partial — unregistered tokens |

### Navigation — Tabs

| Dimension | Values |
|---|---|
| Variant | `default` (value not confirmed from available lines) |
| States | active tab · hover · focus · disabled (undocumented) |
| Compound | TabList + TabPanel |
| Controlled | Yes (`activeTab` + `onChange`) |
| Theme behaviour | Partial — unregistered tokens |

### Navigation — Breadcrumbs

| Dimension | Values |
|---|---|
| Features | truncation with dropdown for overflow (`maxVisible`) |
| Slots | `items[]` (label, onClick) · separator |
| States | active (last item) · hover · focus |
| Theme behaviour | Partial — unregistered tokens |

### Overlays — Modal

| Dimension | Values |
|---|---|
| Variant | `default` · `tabbed` |
| Size | `maxWidth` prop (arbitrary) |
| States | open · closed (with animation) |
| Slots | `title` · `description` · `children` · `header` · `footer` · close button |
| Tabbed extras | `tabs[]` · `defaultActiveTab` · `onTabChange` |
| Features | Portal rendering · escape key close · body scroll lock · backdrop click close |
| Theme behaviour | Partial — unregistered `--modal-*` tokens |

### Overlays — ContentBrowserModal

| Dimension | Values |
|---|---|
| Extends | Modal shell |
| Slots | `contentItems` (tree structure) · `title` |
| Selection | single or `multiple` |
| Callback | `onSelect` |

### Feedback — Toast

| Dimension | Values |
|---|---|
| Variant | `success` · `error` · `warning` · `info` |
| Features | auto-dismiss (`duration`) · manual close (`onClose`) |
| Theme behaviour | Partial — unregistered tokens |

### Feedback — NotificationBanner

| Dimension | Values |
|---|---|
| Variant | `info` · `warning` · `success` · `error` |
| Slots | `title` · `message` · `icon` (custom) |
| Dismissible | Yes (`onDismiss`) |
| Theme behaviour | Partial — gradient backgrounds, some hardcoded |

### Data Display — Table

| Dimension | Values |
|---|---|
| Features | column sorting · column resizing · row selection · row expansion · row reordering (drag) · pagination |
| Slots | `columns[]` (id, label, width, sortable, resizable) · `renderCell` (custom renderer) |
| Controlled | Yes (`onSort`, `onSelectionChange`, `onRowReorder`, `onPageChange`) |
| Settings | `showSettings` · `showPagination` · `pageSize` · `currentPage` · `totalItems` |
| Theme behaviour | Partial — unregistered `--table-*` tokens |

### Data Display — Accordion

| Dimension | Values |
|---|---|
| Type | `single` (one open at a time) · `multiple` |
| States | expanded · collapsed · hover · focus · disabled |
| Controlled | Yes (`defaultExpanded` + `onExpandedChange`) |
| Animation | Smooth height + icon rotation |
| Theme behaviour | Partial — unregistered `--accordion-*` tokens |

### Data Display — Tree

| Dimension | Values |
|---|---|
| Compound parts | `Tree` · `TreeNode` · `TreeGroup` · `TreeGroupHeader` · `TreeItem` |
| States | selected · expanded · collapsed · hover · focus |
| Controlled | Yes (`onSelect`) |
| Theme behaviour | Unknown — no token references confirmed |

### Filtering — Filter

| Dimension | Values |
|---|---|
| Filter types | `text` · `select` · `date` · `multiselect` · `boolean` |
| Date presets | 1d · 3d · 1w · 1m · 3m · 6m · 1y · custom |
| States | open · closed · active filter chips · remove chip |
| Controlled | Yes (`activeFilters` + `onChange`) |
| Token coverage | Unregistered `--filter-*` + hardcoded values |

### Filtering — TagFilter

| Dimension | Values |
|---|---|
| Structure | Multiple named sections, each with tag options |
| States | selected · unselected · hover · disabled (component-level and per-option) |
| Controlled | Yes (`selectedOptions` + `onSelectionChange`) |
| Token coverage | Unregistered `--tag-filter-*` |

### Media — RailContentGallery

| Dimension | Values |
|---|---|
| Variant | `management` · `display` · `display-grid` · `display-grid-selectable` |
| Features | horizontal scroll · drag-to-reorder · pin · selection · click |
| Slots | `title` · `headerStatus` · `headerDate` · `items[]` |
| Controlled | Yes (`selectedItems` + `onSelectionChange`) |
| Token coverage | Partially `cvp-comp` (`--cvp-rail-*` in token file, legacy names in component) |

### Authentication — LoginSignUp / LoginSignUpLight

| Dimension | Values |
|---|---|
| Fields | email · password (with show/hide toggle) |
| States | loading · error |
| Slots | `logoUrl` · `platformName` |
| Actions | `onSignIn` · `onSSOSignIn` · `onForgotPassword` |
| Theme | LoginSignUp = dark; LoginSignUpLight = light — should be unified |

---

## 4. Shared Patterns

The following patterns appear across multiple components and should be specified once in `DESIGN_SYSTEM_SPECIFICATION.md` rather than duplicated per-component.

### 4.1 Focus Treatment

**Appears in:** all interactive components  
**Current state:** Focus ring uses `#67b3fb` (primitive) and `#6f8be6` (border) referenced as hardcoded values or via `--focus-ring`, `--focus-border`, `--focus-glow`. CVP canonical tokens are `--cvp-focus-ring-color`, `--cvp-focus-border-color`, `--cvp-focus-glow-color` defined in `cvp-primitives.css`. Components are not yet consuming canonical tokens.  
**What to specify:** Ring width, offset, radius, colour, glow; WCAG 2.4.11 (non-text contrast 3:1) compliance; keyboard-only vs. always-visible (`:focus-visible` vs. `:focus`) rule.

### 4.2 Validation States

**Appears in:** TextInput, MiscInput, TextArea, Checkbox, Select, MultiSelect  
**Variants:** `default` · `error` · `warning` · `success`  
**Current state:** Inconsistent. TextInput supports `default | error`. MiscInput supports all four. No unified validation token group in `cvp-component-tokens.css`.  
**What to specify:** State colours per variant, message text position, icon usage, ARIA attributes (`aria-invalid`, `aria-describedby`), priority when multiple states co-exist.

### 4.3 Disabled States

**Appears in:** all interactive components  
**Current state:** `DisabledStateDemo.tsx` exists as a showcase. Individual components implement disabled locally with unregistered tokens. `cvp-component-tokens.css` defines `--cvp-button-primary-bg-disabled`, `--cvp-button-primary-text-disabled` etc. — but only for buttons.  
**What to specify:** Opacity treatment vs. dedicated colour vs. pointer-events none; whether disabled elements receive focus; WCAG exemption scope.

### 4.4 Loading States

**Appears in:** LoginSignUp (loading prop), Table (implied by pagination), RailContentGallery  
**Current state:** `ui/skeleton.tsx` and `ui/progress.tsx` exist as shadcn/ui primitives; `ui/chart.tsx` wraps recharts. No CVP-authored loading/skeleton component exists.  
**What to specify:** Skeleton pattern, spinner pattern, progress bar, inline loading (button loading state), when to use each.

### 4.5 Empty and Error States

**Appears in:** Table, Filter, RailContentGallery, ContentBrowserModal  
**Current state:** No dedicated empty-state or error-state component exists. Handled inline per component.  
**What to specify:** Empty state anatomy (illustration slot, heading, body, CTA), error state anatomy, when to use full-page vs. inline vs. inline-card empty state.

### 4.6 Destructive Actions

**Appears in:** Modal (destructive variant implied), Table (row delete), ContentBrowserModal  
**Current state:** No `danger` variant on Modal or Button is implemented; `--cvp-color-text-danger` exists in semantic tokens but no button or modal variant consumes it.  
**What to specify:** Confirmation pattern (two-step: trigger → confirm dialog), danger button styling, scrim/backdrop behaviour for destructive modals.

### 4.7 Overflow Behaviour

**Appears in:** Breadcrumbs (`maxVisible` + dropdown), Table (horizontal scroll), Filter (chip overflow), HeaderNavigation (responsive collapse), PageSideNav (collapsed state)  
**Current state:** Each component handles overflow independently with no shared pattern.  
**What to specify:** Truncation with tooltip, ellipsis menu (`…`), dropdown overflow, responsive collapse thresholds.

### 4.8 Filtering and Search

**Appears in:** Filter, FilterGroup, TagFilter, Table (filterable prop)  
**Current state:** Three separate filter components with no shared pattern or token group.  
**What to specify:** When to use Filter vs. TagFilter vs. Table built-in filter, search input pattern (controlled keyword search), filter chip anatomy, clear-all behaviour.

### 4.9 Selection

**Appears in:** Table (row selection), RailContentGallery (`display-grid-selectable`), ContentBrowserModal (multiple), MultiSelect, TagFilter  
**Current state:** Each component implements selection independently.  
**What to specify:** Checkbox-based row selection, select-all/deselect-all, selected count display, selection toolbar pattern.

### 4.10 Drag and Reorder

**Appears in:** Table (`draggable`, `onRowReorder`), RailContentGallery (`onDrag`)  
**Current state:** Drag handle icon, drag state styling — implemented per component, no shared tokens.  
**What to specify:** Drag handle anatomy, drag ghost styling, drop target indicator, keyboard reorder alternative.

### 4.11 Pagination

**Appears in:** Table (`showPagination`, `pageSize`, `currentPage`, `totalItems`, `onPageChange`)  
**Current state:** Handled inline within Table. `ui/pagination.tsx` exists as a shadcn/ui primitive.  
**What to specify:** Page controls anatomy, page size selector, total count display, first/last/previous/next labels, ARIA.

### 4.12 Responsive Collapse

**Appears in:** HeaderNavigation, PageSideNav, Layout, RailDetails (breakpoints at 1024px, 768px, 640px)  
**Current state:** Each component uses its own breakpoints.  
**What to specify:** CVP breakpoint scale, which components collapse at which breakpoint, mobile navigation pattern, drawer/sheet pattern for collapsed navigation.

---

## 5. Documentation Coverage Plan

Proposed sequence for `DESIGN_SYSTEM_SPECIFICATION.md`. Groups are ordered to minimise forward references — foundational patterns before composed components, shared patterns before component-specific variants.

### Pass 1 — Foundation (no component dependencies)

1. **Introduction and Scope** — what the spec covers, versioning, how to read it
2. **Token Architecture Summary** — pointer to `CVP_TOKEN_ARCHITECTURE.md`; three-tier model; how to look up a token
3. **Shared Patterns: Focus Treatment** — applies universally; document once, reference everywhere
4. **Shared Patterns: Disabled States** — same rationale
5. **Shared Patterns: Validation States** — required before any form control
6. **Shared Patterns: Loading States** — required before Table, RailContentGallery

### Pass 2 — Actions

7. **Button system overview** — four variants as a system; size scale; shared anatomy
8. **PrimaryButton** — full spec
9. **SecondaryButton** — delta from Primary only
10. **OutlineButton** — delta
11. **TextButton** — delta
12. **IconButton** — full spec; size variants; IconSmallButton as size modifier
13. **IconButtonWithText** — full spec

### Pass 3 — Form Controls

14. **Form control shared anatomy** — label, helper text, error message, required indicator; applies to all below
15. **TextInput** — full spec
16. **TextArea** — delta from TextInput
17. **MiscInput** — full spec (prefix/suffix, copy, character count); note relationship to TextInput
18. **Select** — full spec
19. **MultiSelect** — delta from Select; chip pattern
20. **Checkbox** — full spec; indeterminate state
21. **Toggle** — full spec; indeterminate state; size variants
22. **Segmented** — full spec; size and colour variants

### Pass 4 — Navigation

23. **Navigation overview** — when to use each navigation component
24. **HeaderNavigation** — full spec; responsive behaviour
25. **PageSideNav** — full spec; sections; badge; collapsed state
26. **Breadcrumbs** — full spec; overflow dropdown
27. **Tabs** — full spec; tab + panel anatomy

### Pass 5 — Filtering and Search

28. **Filtering overview** — Filter vs. TagFilter vs. Table-internal; when to use each
29. **Filter** — full spec; all filter types; date presets; chip output
30. **FilterGroup** — composing multiple filters
31. **TagFilter** — full spec; sections; multi-select chips

### Pass 6 — Overlays

32. **Overlay shared patterns** — scrim, focus trap, escape key, body scroll lock
33. **Modal** — full spec; default and tabbed variants; slot anatomy
34. **ContentBrowserModal** — delta from Modal; tree content structure; selection
35. **Shared Patterns: Destructive Actions** — confirmation flow; placed here because it uses Modal

### Pass 7 — Feedback

36. **Toast** — full spec; four variants; auto-dismiss; positioning
37. **NotificationBanner** — full spec; four variants; dismissible
38. **Shared Patterns: Empty and Error States** — inline, card, and full-page forms

### Pass 8 — Data Display

39. **Table** — full spec; column features; row features; pagination; selection; drag-reorder
40. **Shared Patterns: Pagination** — extracted from Table; documented here for reuse
41. **Shared Patterns: Selection** — checkbox selection pattern; select-all; selected toolbar
42. **Accordion** — full spec; single vs. multiple; animation
43. **Tree** — full spec; compound anatomy; expand/collapse; selection

### Pass 9 — Media and Editorial

44. **RailContentGallery** — full spec; four variants; selection; drag-reorder
45. **RailDetails** — full spec; layout anatomy; tab structure; legacy token migration required

### Pass 10 — Layout and Product Patterns

46. **Layout** — page layout anatomy; slot definitions; responsive collapse
47. **Authentication — LoginSignUp** — full spec; unified light/dark treatment
48. **SegmentQueryConfiguration** — product pattern spec; composed from Filter + Modal

### Pass 11 — Appendices

49. **Token quick reference** — all `--cvp-*` tokens organised by category
50. **Migration table** — `--tc-*` to `--cvp-*`; old shorthand to new namespace
51. **Accessibility compliance matrix** — WCAG ratios per component; known gaps
52. **Storybook arg table index** — which component token maps to which argType control
53. **Open questions and outstanding work** — carries forward §6 below

---

## 6. Open Questions

### OQ-1 — Modal rendering strategy

**What is missing:** It is unclear whether the CVP `Modal.tsx` is built on top of the shadcn/ui `ui/dialog.tsx` Radix Dialog primitive or implements its own portal and focus-trap logic from scratch.  
**Where it should come from:** Code inspection of `Modal.tsx` beyond the first 60 lines; or explicit statement from the component author.  
**Engineering assumption for now:** Treat Modal as self-contained. If Radix is discovered to be used internally, update the spec to note it — does not change the public API.

### OQ-2 — Toast: CVP Toast vs. sonner

**What is missing:** `src/app/components/Toast.tsx` and `src/app/components/ui/sonner.tsx` both exist. It is unclear which is the canonical CVP toast and whether they co-exist intentionally.  
**Where it should come from:** Decision from Design Systems team.  
**Engineering assumption for now:** CVP `Toast.tsx` is the specification target. `sonner.tsx` is an available primitive if a richer toast stack is needed. Document both with a clear note on when to use each.

### OQ-3 — MiscInput vs. TextInput boundary

**What is missing:** `MiscInput` is a superset of `TextInput` in feature terms. It is unclear whether `TextInput` should be deprecated in favour of `MiscInput`, or whether `TextInput` is the simple variant and `MiscInput` is the advanced one with a distinct use case.  
**Where it should come from:** Design lead decision.  
**Engineering assumption for now:** `TextInput` = simple, no slots, minimal variants. `MiscInput` = advanced, slots, four validation states. Document both; note that teams building simple forms should default to `TextInput`.

### OQ-4 — LoginSignUp light/dark unification

**What is missing:** Two separate files exist. It is unclear whether the intent is to keep them as separate export targets or to unify under a single component with a `theme` prop or CSS `data-theme` attribute.  
**Where it should come from:** Design Systems team decision before specification is written.  
**Engineering assumption for now:** Specify as a single `LoginSignUp` component. Note that light-theme rendering is achieved via `data-theme="light"` on the wrapper, not a prop. `LoginSignUpLight.tsx` will be deprecated.

### OQ-5 — Filter token registration

**What is missing:** `Filter.tsx`, `FilterGroup.tsx`, and `TagFilter.tsx` use custom tokens (`--filter-*`, `--tag-filter-*`) that are not present in `cvp-component-tokens.css`. These tokens are also not in `cvp-alias-bridge.css` or any documented token file.  
**Where it should come from:** A Phase 2 token migration task; or confirmation that these components are intentionally outside the CVP token system for now.  
**Engineering assumption for now:** Mark as `unregistered`. Include a note in the specification that these components require token registration before they are production-ready under the governance rules in `TOKEN_GOVERNANCE.md`.

### OQ-6 — Tree component token coverage

**What is missing:** No `--cvp-tree-*` or `--tree-*` tokens are defined in any CSS file. It is unclear what token set the Tree implementation uses.  
**Where it should come from:** Full read of `Tree.tsx` and its sub-files.  
**Engineering assumption for now:** Block Tree specification until token coverage is confirmed. Mark as `Unclear` in the inventory.

### OQ-7 — DesignSystemNav role

**What is missing:** `DesignSystemNav.tsx` has no documentation and its scope is unclear. It may be the internal navigation shell for the component documentation site, not a publishable component.  
**Where it should come from:** Code inspection or team confirmation.  
**Engineering assumption for now:** Exclude from `DESIGN_SYSTEM_SPECIFICATION.md`. Mark as internal utility.

### OQ-8 — shadcn/ui integration policy

**What is missing:** The repository contains 46 shadcn/ui primitives in `ui/`. It is unclear whether these are intended to be styled with CVP tokens and published as part of the design system, or whether they are internal development conveniences.  
**Where it should come from:** Architecture decision from Design Systems team.  
**Engineering assumption for now:** shadcn/ui primitives are internal scaffolding only. Do not specify them in `DESIGN_SYSTEM_SPECIFICATION.md`. If any are to be CVP-styled and published, they require a full token migration and Storybook story before inclusion.

### OQ-9 — Storybook setup

**What is missing:** `.storybook/` does not exist. No Storybook configuration is present. `IMPLEMENTATION_STATUS.md` lists Storybook arg table generation as an outstanding task but does not specify the target Storybook version.  
**Where it should come from:** Engineering decision.  
**Engineering assumption for now:** Cannot block specification writing on Storybook setup. Write specification first; Storybook stories are a parallel deliverable. Token arg tables will be generated from the `--cvp-component-*` tokens documented in the spec.

### OQ-10 — DESIGN.md role going forward

**What is missing:** `DESIGN.md` (v2.0, 2026-06-25) uses old shorthand token names without the `--cvp-` namespace. `TOKEN_GOVERNANCE.md` states that `DESIGN.md` is the required documentation artifact for every token — but the file predates the current architecture. It is unclear whether `DESIGN.md` should be updated to use `--cvp-*` token names or superseded by `DESIGN_SYSTEM_SPECIFICATION.md`.  
**Where it should come from:** Design Systems team decision.  
**Engineering assumption for now:** `DESIGN_SYSTEM_SPECIFICATION.md` (to be created) becomes the canonical specification. `DESIGN.md` is retained as a historical reference but is not updated. `TOKEN_GOVERNANCE.md` documentation requirements should reference the new spec file.

---

*This inventory is the coverage checklist for all subsequent specification passes. No component should appear in `DESIGN_SYSTEM_SPECIFICATION.md` that is not listed here. No component listed here should be omitted from `DESIGN_SYSTEM_SPECIFICATION.md` without an explicit decision recorded in §6.*
