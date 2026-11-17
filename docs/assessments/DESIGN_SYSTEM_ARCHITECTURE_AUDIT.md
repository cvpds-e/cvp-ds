# Design-system architecture assessment

Date: 2026-11-11

## Executive assessment

CVP is a **component-mature, primitive-partial application repository**, not yet a
published library. Its strongest assets are the theme-aware three-tier token graph,
documented CVP controls, and realistic editorial-workflow compositions. Its largest
gaps are a small approved composition layer, uneven interaction tests, and a mismatch
between discovery metadata and conceptual architecture.

The intended hierarchy is **Foundations -> Tokens -> Primitives -> Components ->
Patterns -> Templates**. Files need not move to reflect it. Existing registry
`classification` values are a compatibility contract; additive `layer` metadata can
express the finer hierarchy without breaking discovery consumers.

## Evidence and limits

The repository-wide assessment covers the tracked source inventory, the public
barrel, all registered assets and lifecycle states, canonical token definitions and
imports, internal UI wrappers, application routing/navigation, component contracts,
documentation, existing unit tests, Playwright fixtures, and product usage. Public
control implementations were inspected for semantics and state handling. Internal
Radix wrappers were inspected as implementation candidates, not assumed approved.
Imported screenshots and pasted reference implementations are not runtime authority.
This is not a claim of manual screen-reader certification or exhaustive verification
of every product workflow.

Important findings:

- The canonical token graph already covers colour, typography, spacing, density,
  radius, elevation, motion, opacity, layering, grids and responsive containers.
- `TextInput` already accepts native `date`, `time`, `file`, and `search` types.
  Separate renamed controls would duplicate capabilities.
- `Select` is a select-only combobox; `MultiSelect` has filtering and creation.
  Neither is a general single-value editable combobox/autocomplete.
- `ChoiceCardGroup` and `SegmentedControl` provide radio-style selection, but not a
  small composable radio field.
- `src/app/components/ui` contains unused internal equivalents of many requested
  primitives. They use framework tokens, and some omit React 18 ref forwarding.
  Progress also omits its value from the accessible Radix root.
- `Toggle` is deferred, not approved. Its label click and native activation paths,
  missing generated description IDs, and mixed state need separate remediation.
- Button variants are intentional visual contracts, not competing Button APIs.
  IconSmallButton is already a deprecated size compatibility alias.
- `MiscInput` is an adorned field, not a duplicate TextInput; its uncontrolled copy
  action reads the initial value rather than the current DOM value.
- SearchField does not forward refs, derives clear visibility from initial values,
  and does not propagate disabled/read-only state to its clear action.
- Badge contains product-specific source variants; preserve them, but do not use
  `algorithmic`/`manual` as generic metadata roles.
- Card, Accordion, Tabs, Modal, Toast, Banner, Table, Navigation, and workflow
  controls belong above primitives. WorkspaceLayout is a pattern, not a Box.
- Storybook is absent. The documentation application is the supported equivalent.
  Existing visual tests cover six fixtures at 768 and 1440 pixels, not narrow mobile.
- The package has no ESLint/stylelint command or configuration. Token governance is
  the existing CSS lint gate; public TypeScript is scoped, not whole-app checking.
- Initial agent validation fails on unregistered PersonalizerFilterBuilder.
- Initial build, public types and token governance pass. Node 26's experimental
  localStorage causes 26 test setup failures; disabling that runtime feature makes
  all 54 baseline tests pass without changing product code.

## Coverage matrix: foundations and tokens

Paths below are relative to the repository root. Unless stated otherwise, token
sources are `src/styles/tokens/cvp-{primitives,semantic-tokens,component-tokens}.css`.
“Complete” means implemented coverage, not certification of every downstream use.

| Capability | Existing implementation | Maturity | Accessibility / responsive evidence | Docs/tests | Action / priority |
| --- | --- | --- | --- | --- | --- |
| Principles | docs/DESIGN_SYSTEM_CONSUMPTION_STANDARDS.md | Complete | AA, reflow and composition guidance | Written standards | Preserve / low |
| Brand, neutral, semantic colour | Canonical graph, both themes | Complete | Previous contrast audit; not every product pairing | Catalog, previews, governance | Preserve / low |
| Background, surface, text, border, interactive, overlay colour | Semantic roles and component aliases | Complete | Theme-aware focus and disabled recipes | Catalog and foundation previews | Use existing roles / low |
| Font family, size, weight, line height, tracking | Font and semantic type roles | Complete | Fixed scales need consumer zoom/reflow checks | Typography preview | Expose semantic content APIs / high |
| Spacing | Two compatible numbered scales plus role/density aliases | Complete, overlapping | Responsive layout tokens; compact/default | Catalog, spacing preview | Preserve both public scales / low |
| Sizing | Component dimensions and layout widths | Partial | No general target-size alias | Component contracts | Add shared target/icon sizing / high |
| Border widths/style/colour | Width and colour roles; literal solid styles | Partial | Focus recipes exist | Border preview | Add semantic style alias / medium |
| Radius / elevation / shadows | Canonical roles and compatibility foundations | Complete | Themed surfaces | Previews/catalog | Preserve / low |
| Opacity | Semantic disabled and scrim roles | Complete | Disabled opacity deliberately remains 1 | Catalog | Do not blindly halve opacity / low |
| Icons | lucide-react plus per-component SVG dimensions | Partial | Decorative treatment varies | IconButton docs | Add shared size/stroke roles / medium |
| Aspect ratios | Internal Radix wrapper; product ratios | Partial | No public ratio vocabulary | No focused tests | Elevate wrapper and ratio aliases / medium |
| Breakpoints | 320, 600, 1024, 1440 foundation values | Complete, divergent consumers | CSS queries must remain literal; other CSS uses ad hoc queries | Layout preview | Preserve, document breakpoint authority / medium |
| Grids, columns, gutters, margins | Responsive semantic layout roles | Complete | 4/8/12 columns and responsive margins | Layout preview | Expose composable layout primitives / high |
| Motion | Duration/easing roles; per-control reduced motion | Partial | Global body transition ignores preference | Catalog; no shared reduced-motion test | Scoped new primitives; global migration deferred / medium |
| Z-index | Base/sticky/navigation/dropdown/tooltip/overlay/modal/toast | Partial | Tooltip is below modal in base ordering | Select modal regression | Defer coordinated portal-layer redesign / high |

## Coverage matrix: content, actions and layout

Component implementations are under `src/app/components/` unless another path is
shown. Public means exported by `src/design-system/index.ts`. Internal wrappers are
under `ui/`. A = accessibility; R = responsive behaviour.

| Capability | Current name/location | Recommended layer | Maturity before work | A / R status | Docs/tests before work | Action / priority |
| --- | --- | --- | --- | --- | --- | --- |
| Text / Heading / Paragraph | Native elements in documentation/products | Primitive | Missing public API | Native semantics; duplicated styling | Typography foundation only | Add token-backed semantic elements / high |
| Label / Caption | Field-local labels/support text, ui/label.tsx | Primitive | Partial/internal | Native association in existing fields | Field docs | Expose existing Label; add caption / high |
| Link | TextButton href variant; native anchors | Primitive | Partial | Native navigation; mixed action API | TextButton docs | Preserve TextButton; add plain typographic Link / medium |
| Icon | lucide-react; field-local SVGs | Primitive | Partial | Most decorative SVGs hidden | Button docs | Add semantic sizing wrapper, retain Lucide / medium |
| Image | Native img in galleries/pages | Primitive | Partial | Alt text varies; object-fit product-specific | Product docs | Add native image with required alt / medium |
| Avatar | ui/avatar.tsx; HeaderNavigation initials | Primitive | Internal | Radix fallback; no public contract | None focused | Elevate existing wrapper / medium |
| Badge | Badge.tsx | Primitive (generic variants) | Partial/specialised | Text equivalent; themed, wrapping | Metadata docs; no focused test | Preserve source variants above generic usage / low |
| Tag/Chip | Pills.tsx | Primitive | Complete capability | Named remove button; small target review needed | Pills docs; no focused test | Keep canonical name / medium |
| Divider | ui/separator.tsx; local borders | Primitive | Internal | Radix orientation/decorative handling | None focused | Elevate existing Separator, no Divider alias / medium |
| Button | Primary/Secondary/Outline/TextButton | Primitive | Partial composition | Loading/disabled/focus; first three lack refs | Extensive docs; no focused tests | Add refs to three native variants / high |
| Icon Button | IconButton.tsx; IconSmallButton alias | Primitive | Complete capability | Required name, refs, loading; themed sizes | Documentation; no focused test | Preserve deprecated alias / low |
| Button Group | Local action flex rows | Primitive | Missing | Groups need names; wrapping inconsistent | None | Add named wrapping group, not toolbar / medium |
| Box/Container | Layout.tsx / WorkspaceLayout.tsx are NOT equivalents | Primitive | Missing generic API | Existing layouts are pane/workflow structures | Layout foundation | Add generic native containers / high |
| Stack | Repeated flex columns | Primitive | Missing | DOM order generally preserved | No API/tests | Add role-based gaps / high |
| Inline / Flex | Repeated flex rows | Primitive | Missing | Inconsistent wrapping | No API/tests | Inline covers horizontal Flex; Stack vertical Flex / high |
| Grid | Native product grids and layout foundation | Primitive | Missing generic API | Existing adaptive tokens | Foundation docs | Add adaptive semantic grid / high |
| Spacer | Margins and flex spacers | Primitive | Missing | Decorative only | None | Add flexible decorative spacer / low |
| Aspect Ratio | ui/aspect-ratio.tsx | Primitive | Internal | Radix ratio; no CVP default | None focused | Elevate existing wrapper / medium |
| Scroll Area | ui/scroll-area.tsx | Primitive | Internal | Radix scrolling; viewport not configurable | None focused | Expose viewport props/ref, preserve native scrolling / high |

## Coverage matrix: forms, feedback and overlays

| Capability | Current name/location | Recommended layer | Maturity before work | A / R status | Docs/tests before work | Action / priority |
| --- | --- | --- | --- | --- | --- | --- |
| Text Input | TextInput.tsx | Primitive | Complete capability | Ref, native attributes, required, error/helper IDs; fluid | Docs; indirect tests | Preserve; add direct association tests / medium |
| Text Area | Textarea.tsx | Primitive | Complete capability | Ref, resize modes, count, validation IDs | Docs; indirect tests | Preserve / low |
| Adorned input | MiscInput.tsx | Component | Partial | Copy can use stale uncontrolled value; failures unannounced | Docs | Fix current value, feedback and cleanup / high |
| Checkbox | Checkbox.tsx | Primitive | Complete capability | Native checked/mixed; ref, generated IDs, validation | Docs; indirect tests | Preserve / medium |
| Radio | ChoiceCardGroup / SegmentedControl; ui/radio-group.tsx | Primitive for small radio, component for cards/segments | Partial/internal | Existing groups have arrows; Radix supports roving focus | Card tests; no small radio tests | Elevate existing RadioGroup / high |
| Switch/Toggle | Toggle.tsx deferred; ui/switch.tsx | Primitive | Partial/internal | Deferred Toggle double activation/mixed semantics; Radix binary switch | Deferred docs; no focused tests | Elevate binary Switch; leave deferred Toggle unchanged / high |
| Select | Select.tsx | Primitive | Partial | Keyboard/typeahead; portaled, native required/name limitations | Docs, one modal test | Preserve; separate form-integration redesign / high |
| Multi-select | MultiSelect.tsx | Component | Partial | Search/listbox/create; focus and dangling ID review needed | Docs; indirect tests | Preserve; focused APG remediation deferred / high |
| Combobox | Select is select-only; ui/command.tsx is a command palette | Primitive | Missing editable single-value contract | No approved editable combobox journey | No focused tests | Defer API/filtering/async decision / high |
| Autocomplete | MultiSelect filtering is not single-value completion | Component | Missing approved contract | Needs announcement and async states | No focused tests | Defer with combobox / high |
| Search Input | SearchField.tsx | Primitive | Partial | Native search and label; stale clear state; no ref | Product usage; no focused tests | Fix uncontrolled/readonly/disabled/ref / high |
| Number Input | NumberInput.tsx | Primitive | Partial | Ref/native bounds, custom steps; step alignment needs review | Documentation; indirect tests | Preserve; native step semantics deferred / medium |
| Date Input | TextInput type=date | Primitive | Partial documented capability | Native semantics and label/error support | No explicit native example | Document existing capability, no duplicate / medium |
| Time Input | TextInput type=time | Primitive | Partial documented capability | Native locale/keyboard behaviour | No explicit native example | Document existing capability, no duplicate / medium |
| Date Picker | DatePicker.tsx, embedded TimeSelector | Component | Partial | Calendar buttons all tabbable; no APG grid arrows; fixed calendar width | Docs; no focused tests | Defer calendar/time interaction redesign / high |
| Slider | ui/slider.tsx | Primitive | Internal | Radix keyboard/range/touch; default thumb/value mismatch | None focused | Elevate with aligned single-value default / high |
| File Upload | TextInput type=file | Primitive for native chooser; pattern for drop zone | Partial | Native chooser supported; no generic drag/drop/status | No focused tests | Document chooser; defer upload transport/drop-zone API / medium |
| Form Label | Field-local labels; ui/label.tsx | Primitive | Partial/internal | Native htmlFor support | Existing field docs | Elevate Label, no FormLabel duplicate / high |
| Helper Text | Field-local support paragraphs | Primitive | Partial | Existing fields compose describedby correctly | Existing field docs | Add standalone HelperText / medium |
| Validation Message | Field-local errors | Primitive | Partial | Existing fields have alerts | Existing field docs | Add standalone message; caller associates IDs / medium |
| Spinner | Loader.tsx | Primitive | Complete capability | Status or decorative; reduced motion CSS | Loader docs | Keep name, no Spinner duplicate / low |
| Progress Indicator | ui/progress.tsx | Primitive | Partial/internal | Value not passed to Radix root | None focused | Correct value semantics and expose / high |
| Skeleton | Skeleton.tsx | Primitive (base), pattern (rail/table helpers) | Complete capability | Decorative base; table announcement; reduced motion | Docs | Keep helpers and classification distinction / low |
| Status Indicator | Status.tsx | Primitive | Complete capability | Text + tone; not automatically live | Docs | Preserve; document live-region composition / low |
| Tooltip | Tooltip.tsx / ui/tooltip.tsx | Primitive | Partial/duplicated | Public Radix trigger requires forwarded ref; portal layering review | Docs; no direct tests | Fix button composition; defer portal unification / high |
| Popover | ui/popover.tsx | Primitive | Internal | Radix focus/dismissal; not CVP-approved | None focused | Defer until layering/theme/focus tests / medium |
| Dropdown / Menu | ui/dropdown-menu.tsx, HeaderNavigation/Filter inline menus | Primitive for menu, component for filtering | Partial/duplicated | Inline menus have different keyboard contracts | Header/filter docs; no focused menu suite | Do not relabel Filter as primitive; defer consolidation / high |
| Context Menu | ui/context-menu.tsx | Primitive | Internal | Radix semantics; touch discoverability requires review | None focused | Defer approval, do not duplicate / medium |

## Higher-layer classification

| Existing assets | Recommended layer | Maturity / evidence | Action / priority |
| --- | --- | --- | --- |
| Accordion, Tabs, Modal, Banner, Toast, Breadcrumb, Pagination, Table, Tree | Component | Implemented, uneven tests; modal nested/tabbed focus needs review; Table drag/resize needs keyboard alternatives | Preserve public APIs; do not call primitives / high |
| HeaderNavigation, SortControl, Filter, TagFilter, ChoiceCardGroup, SegmentedControl | Component | Controls composed with task-specific behaviour; HeaderNavigation has account/team defaults | Keep above primitives / medium |
| ContentBrowserModal, RailContentGallery, UnsavedChangesFooter, WorkspaceLayout | Pattern | Registered product/workspace compositions; tests concentrated in galleries | Preserve / low |
| PersonalizerFilterBuilder | Pattern | Implemented and tested; absent from discovery registry | Register as internal, not approved generic primitive / high |
| LoginSignUp, RailsList, RailDetails, PersonalizedRailDetails, StationRailDetails | Template/page | Realistic reference workflows; storage and preview logic intentionally product-specific | Preserve page classification; document template concept / low |
| Layout, FilterGroup, PageSideNav, SegmentQueryConfiguration, Toggle | Component/pattern, deferred | Hidden navigation is intentional, not evidence of absence | Do not silently approve or rewrite / medium |
| ui/card, ui/dialog, ui/tabs, ui/sidebar, ui/table, ui/accordion and other internal framework wrappers | Component, internal | Second implementation family, not canonical CVP alternatives | No public promotion without individual review / medium |

## Phase 2: implementation plan (recorded before code changes)

All changes below are additive unless an intentional bug fix is noted. Existing
imports, component names, registry classifications, and CVP visual recipes remain.

1. **Safe additions:** token-backed Text, Heading, Paragraph, Caption, Link, Icon,
   Image, Box, Container, Stack, Inline, Grid, Spacer, ButtonGroup, HelperText and
   ValidationMessage. Use native HTML, refs and existing semantic styles; no
   product defaults or new packages. Test native attributes, semantics, refs,
   field association, long content, wrapping and 320/768/1440 layouts.
2. **Elevate existing primitives:** expose the existing internal Label, RadioGroup,
   Switch, Slider, Progress, Avatar, Separator, AspectRatio and ScrollArea wrappers.
   Apply CVP tokens, React 18 refs and documented names; keep their original module
   paths and exports. Fix Progress value semantics and Slider default alignment.
   Test controlled/uncontrolled, keyboard selection, disabled states, native form
   submission, progress state and scroll-region accessibility.
3. **Token improvements:** add only absent shared target/icon/stroke/aspect/border
   roles to the canonical graph; regenerate catalog/registry with the existing
   generator. No mass raw-value replacement or theme palette changes. Validate
   token generation and governance.
4. **Accessibility improvements:** forward refs on native button variants for
   Tooltip/asChild composition. Repair SearchField clear-state/availability/ref
   handling and MiscInput current-value copy/error announcements. Keep handlers
   and native attributes backward compatible. Add direct interaction tests.
5. **Documentation and equivalent stories:** add a navigable primitives gallery,
   native date/time/file examples, composition guidance, lifecycle metadata, and
   focused responsive/axe/interaction tests. Extend discovery with optional
   conceptual layer metadata while retaining the legacy classifications.
6. **Potentially breaking changes:** none planned for approved APIs. Internal
   wrappers intentionally change to CVP appearance and consistent defaults when
   elevated. Slider's unspecified default becomes one thumb at min. Public
   TextButton polymorphic refs, Toggle indeterminate semantics, and registry
   classification replacement are deferred because they require migration design.
7. **Do not change yet:** no folder migration, button replacement API, new
   Storybook installation, package publication, async combobox, upload transport,
   calendar rewrite, generic menu consolidation, Table drag/resize rewrite, global
   legacy token removal, or portal-layer redesign. These require explicit product
   contracts and focused regression testing rather than speculative abstraction.

## Validation and final outcome

### Implemented coverage

The safe implementation tranche is delivered; the deferred items below are not
represented as complete. No existing public API was removed, no files were moved,
and no dependencies or package-manager conventions changed.

| Area | Outcome |
| --- | --- |
| Content | Added Text, Heading, Paragraph, Caption, Link, Icon, Image, HelperText, ValidationMessage |
| Layout/actions | Added Box, Container, Stack, Inline, Grid, Spacer, ButtonGroup |
| Existing primitives elevated | Label, RadioGroup/RadioGroupItem, Switch, Slider, Progress, Avatar family, Separator, AspectRatio, ScrollArea/ScrollBar |
| Native fields reused | Existing TextInput date/time/file capabilities documented and tested; no renamed duplicate APIs |
| Tokens | 16 new names / 17 definitions: icon size/stroke, minimum/comfortable target sizes, aspect ratios, border style, theme-aware interactive boundaries |
| Discovery/classification | 80 registered assets; 43 primitive, 26 component, 6 pattern, 5 template layer annotations. Legacy classification values retained |
| Forms and actions repaired | Three native button variants forward refs; SearchField tracks uncontrolled edits/reset and availability; MiscInput copies current content and announces success/failure |
| Progress and slider semantics | Progress exposes value/max; default slider thumb/value agree; names/descriptions/disabled semantics reach thumbs; disabled sliders omit successful form values |
| Responsive product repair | Personalized mobile Settings starts below the persistent header instead of placing its close control underneath it; existing header-height token reused |

Final capability coverage is intentionally distinct from completeness:

| Layer/family | Coverage after implementation | Remaining maturity gap |
| --- | --- | --- |
| Foundations/tokens | All requested foundation families represented | Legacy raw values, divergent responsive queries, global reduced motion and portal layering remain partial |
| Content primitives | All requested capabilities represented | Existing Badge product variants and Pills target-size review remain |
| Actions | Buttons, icon buttons and grouping represented | TextButton polymorphic refs and stable loading names require separate compatibility design |
| Forms | Native inputs, textarea, checkbox, radio, switch, select, multiselect, search, numeric, date/time, slider and native file chooser represented | Editable combobox/autocomplete, upload/drop-zone pattern, calendar keyboard model and select form integration remain incomplete |
| Layout | All requested capabilities represented; Stack/Inline cover Flex, Separator covers Divider | No hiding/reordering system added; consumer overflow policies remain explicit |
| Feedback | Spinner, determinate/indeterminate progress, skeleton and status represented | Consumers still own meaningful asynchronous announcements |
| Overlay/disclosure primitives | Public Tooltip; internal Popover/Menu/ContextMenu equivalents recognised | Generic menu approval, consolidation, nested focus and portal-layer ordering deferred |
| Components/patterns/templates | Existing inventory preserved and conceptually distinguished | Product workflow accessibility and deferred assets are not silently approved |

### Accessibility, interaction and documentation evidence

- 23 new unit cases cover semantic elements, refs, native attributes, field
  descriptions/required/errors, grouping, binary/radio selection, slider keyboard
  bounds and form values, progress values, scroll-region naming, copy outcomes,
  search clear/reset, and native date/time/file capabilities.
- Eight new browser tests cover light/dark at 320/768/1440, measured grid collapse,
  no document overflow, actual 16:9 rendered media geometry, 24px minimum targets,
  measured radio-boundary contrast of at least 3:1, automated WCAG A/AA rules,
  reduced motion, density, RTL switch travel, focus, Tooltip composition, pointer
  dragging, keyboard selection, and keyboard scrolling.
- Existing workflow browser regressions pass. Mobile Settings coverage now checks
  both themes at 320 and 390, actual header/close geometry, clickable portaled
  Select options, close, and reopen.
- The new navigable gallery is available at `?page=primitives`; the isolated
  responsive fixture is `?page=primitives-full&theme=light` (or dark).
- A shared [primitive contract](../specifications/PRIMITIVES.md), 25 new per-asset
  usage documents, an updated existing AspectRatio specification, documentation
  indexes, and corrected historical inventory guidance accompany the code.
- Token catalog and registry are regenerated. Shared primitive styles are now
  covered by the existing token-governance checker, including deduplication when
  several symbols share one stylesheet.

### Commands and results

| Command | Result |
| --- | --- |
| Initial `npm run verify:agent` | Failed: pre-existing unregistered PersonalizerFilterBuilder; now registered as internal pattern |
| Initial public typecheck, token governance and build | Passed |
| Initial `npm test` | 26 setup failures due to Node 26 experimental global storage; 54/54 pass when that feature is disabled |
| `npm run tokens:generate` | Generated synchronized catalog/registry; final token check sees 2,091 definitions and 1,899 unique names |
| Focused new unit-test command | 23/23 pass after implementation |
| `NODE_OPTIONS=--no-experimental-webstorage npm run verify:agent` | Pass: registry/schemas, public types, 38 stylesheets under token governance, all 77 tests in 14 files, token freshness and production build |
| Added-source/test TypeScript command below | Pass; includes the gallery and tests outside the public barrel's normal scope |
| `npm run visual:test -- tests/visual/primitives.spec.ts tests/visual/station-rails.spec.ts` | 25/25 pass |
| `git diff --check` | Pass |

Additional strict typecheck:

```bash
npx tsc --noEmit --jsx react-jsx --module ESNext \
  --moduleResolution Bundler --target ES2022 --lib ES2022,DOM,DOM.Iterable \
  --skipLibCheck --esModuleInterop --strict \
  src/types/assets.d.ts src/test/setup.ts \
  src/app/components/PrimitivesDocumentation.tsx \
  src/design-system/primitives/Primitives.test.tsx \
  src/app/components/InputComposition.test.tsx tests/visual/primitives.spec.ts
```

There is **no configured JavaScript/TypeScript linter**. Token governance is the
repository's CSS/token lint gate; it and whitespace checks pass. No unrelated
lint tooling was installed. The full screenshot-baseline suite was not run; the
relevant focused browser suites above were run. Existing large-bundle, Node API,
and dependency annotation warnings remain non-fatal. The added docs/control code
increases the documentation-app bundle; code splitting remains recommended.

An optional verification-log write was denied by organization policy. The
restricted file was not accessed; validation was subsequently run directly to the
console. No test server or dependency was installed or left running by this work.

Automated checks do not establish complete WCAG conformance. Manual acceptance
still includes screen readers, forced colours, 400% zoom, real touch operation,
and complex/nested workflows. Radix radio focus moves asynchronously; keyboard
tests keep the arrow down through that focus/selection transition rather than
collapsing keydown/keyup into one synthetic instant.

### Compatibility and migration

- Approved names, import locations, variants and visual recipes remain available.
  The new public names are additive. No broad folder migration occurred.
- Legacy registry `classification` remains unchanged. Consumers may opt into
  `layer`; schemas also accept an explicit shared `stylesheet` path.
- Elevated internal wrappers intentionally adopt CVP styling instead of framework
  defaults. Their old module paths, exports and data-slot hooks remain.
- Slider's unspecified default is now one thumb at min. Internal consumers that
  intended a range must supply an explicit array such as `[20, 80]`.
- Switch does not replace the deferred Toggle's indeterminate API. No compatibility
  promise is made for incorrectly treating a binary switch as a mixed checkbox.
- SearchField controlled owners still update value in onClear; uncontrolled users
  now receive an actual cleared input with focus restored.
- The mobile Settings top inset is an intentional bug fix, not a desktop change.

### Remaining work, ordered by impact and effort

| Priority | Work | Impact / effort | Why not changed in this tranche |
| --- | --- | --- | --- |
| High | Editable combobox/autocomplete with async/empty/error announcements | High / high | Filtering, creation, async data and controlled API need an agreed contract; Select and command palette are not substitutes |
| High | Calendar/time keyboard model; native required/reset/disabled integration for custom Select/MultiSelect | High / high | Existing consumer contracts and portaled focus need dedicated interaction work |
| High | Consolidate generic menu/popover/context-menu behavior and portal layering | High / medium-high | Existing framework and inline implementations differ; approving wrappers without nested tests would be unsafe |
| High | Table keyboard alternatives for drag/reorder/resize; deferred pane layout keyboard resizing | High / high | Changes affect composite workflows, not small primitives |
| High | Screen-reader, zoom/reflow and forced-colour acceptance | High / medium | Automated checks cannot replace assistive-technology testing |
| Medium | Audit small Pills/remove actions and existing field boundaries across contexts | Medium / medium | Existing visual density/contrast contracts need coordinated review |
| Medium | Reconcile deferred Toggle mixed-state activation and label associations | Medium / medium | Existing indeterminate consumers require migration rather than silent replacement |
| Medium | FormField composition and TextButton polymorphic refs/stable loading labels | Medium / medium | Preserve current markup, focus and public typing before consolidation |
| Medium | Upload/drop-zone pattern | Medium / high | Transport, file policy, drag/drop, progress, cancellation and errors are product/application contracts |
| Medium | Eliminate legacy raw values and align responsive/motion policies incrementally | Medium / high | A bulk substitution risks changing documented CVP appearance and theme behavior |
| Low | Optional Storybook, package publication and documentation code splitting | Medium / medium | Existing live docs meet this tranche's needs; infrastructure should be a separate deliberate change |

### Files changed

All paths below are relative links. Shared-purpose rows apply to every named file.

| Files | Explanation |
| --- | --- |
| [Content.tsx](../../src/design-system/primitives/Content.tsx) | Nine native semantic content/support primitives with refs |
| [Layout.tsx](../../src/design-system/primitives/Layout.tsx) | Seven generic composition/layout primitives |
| [Primitives.css](../../src/design-system/primitives/Primitives.css) | Semantic typography, surfaces, responsive grids and spacing |
| [index.ts](../../src/design-system/index.ts) | Additive public exports and related prop types |
| [label.tsx](../../src/app/components/ui/label.tsx) | Elevate existing Label with ref and CVP styling |
| [radio-group.tsx](../../src/app/components/ui/radio-group.tsx) | Elevate existing small radio composition with refs |
| [switch.tsx](../../src/app/components/ui/switch.tsx) | Elevate existing binary Switch with ref |
| [slider.tsx](../../src/app/components/ui/slider.tsx) | Ref, aligned default, thumb names/descriptions/disabled semantics, form omission |
| [progress.tsx](../../src/app/components/ui/progress.tsx) | Ref and synchronized numeric/indeterminate visual and accessible states |
| [avatar.tsx](../../src/app/components/ui/avatar.tsx) | Preserve image/fallback composition; add refs/CVP styling |
| [separator.tsx](../../src/app/components/ui/separator.tsx) | Ref and semantic orientation styling |
| [aspect-ratio.tsx](../../src/app/components/ui/aspect-ratio.tsx) | Ref forwarding without duplicating Radix geometry |
| [scroll-area.tsx](../../src/app/components/ui/scroll-area.tsx) | Root/viewport refs, focusable configurable viewport and styled scrollbars |
| [primitives.css](../../src/app/components/ui/primitives.css) | Shared CVP control styles, minimum targets, focus, RTL and reduced motion |
| [PrimaryButton.tsx](../../src/app/components/PrimaryButton.tsx) | Native ref forwarding, unchanged button recipe |
| [SecondaryButton.tsx](../../src/app/components/SecondaryButton.tsx) | Native ref forwarding, unchanged button recipe |
| [OutlineButton.tsx](../../src/app/components/OutlineButton.tsx) | Native ref forwarding, unchanged button recipe |
| [SearchField.tsx](../../src/app/components/SearchField.tsx) | Current uncontrolled value/reset, controlled ownership and safe clearing/ref |
| [SearchField.css](../../src/app/components/SearchField.css) | Reduced-motion treatment |
| [MiscInput.tsx](../../src/app/components/MiscInput.tsx) | Current DOM copy value, async completion/error feedback and cleanup |
| [MiscInput.css](../../src/app/components/MiscInput.css) | Accessible copy-status/error presentation |
| [PersonalizedRailDetails.css](../../src/app/components/PersonalizedRailDetails.css) | Token-backed mobile header inset; close action remains operable |
| [PrimitivesDocumentation.tsx](../../src/app/components/PrimitivesDocumentation.tsx) | Interactive examples, native fields, standalone theme fixture |
| [PrimitivesDocumentation.css](../../src/app/components/PrimitivesDocumentation.css) | Scoped documentation layout/media/overflow styling |
| [App.tsx](../../src/app/App.tsx) | Normal and isolated primitive documentation routes |
| [DesignSystemNav.tsx](../../src/app/components/DesignSystemNav.tsx) | Discoverable Primitives navigation entry |
| [cvp-primitives.css](../../src/styles/tokens/cvp-primitives.css) | Reusable raw stroke, ratio and border-style values |
| [cvp-semantic-tokens.css](../../src/styles/tokens/cvp-semantic-tokens.css) | Shared aliases and theme-aware interactive boundary |
| [token-registry.json](../../src/styles/token-registry.json), [TOKEN_CATALOG.md](../tokens/TOKEN_CATALOG.md) | Generated token inventory synchronized with CSS |
| [components.json](../../src/agent/registry/components.json) | Primitive discovery, additive conceptual layers, internal pattern registration |
| [component-registry.schema.json](../../src/agent/schemas/component-registry.schema.json) | Optional layer and shared stylesheet metadata |
| [validate-agent-readiness.mjs](../../scripts/validate-agent-readiness.mjs) | Validate explicit shared stylesheet paths |
| [check-component-token-governance.mjs](../../scripts/check-component-token-governance.mjs) | Lint shared primitive styles once each |
| [Primitives.test.tsx](../../src/design-system/primitives/Primitives.test.tsx) | Native composition and elevated-control unit/interaction tests |
| [InputComposition.test.tsx](../../src/app/components/InputComposition.test.tsx) | Search/copy/native-field regression tests |
| [primitives.spec.ts](../../tests/visual/primitives.spec.ts) | Responsive, accessibility, geometry and real-browser interaction tests |
| [station-rails.spec.ts](../../tests/visual/station-rails.spec.ts) | Extend mobile Settings regression across themes/narrow widths |
| [README.md](../../README.md), [docs/README.md](../README.md) | Entry points and Node 26 test-runtime guidance |
| [PRIMITIVES.md](../specifications/PRIMITIVES.md) | APIs, native capabilities, behavior, migration and accessibility contracts |
| [DESIGN_SYSTEM_COMPONENT_INVENTORY.md](../specifications/DESIGN_SYSTEM_COMPONENT_INVENTORY.md) | Correct stale visual-test guidance and link the capability assessment |
| [DESIGN_SYSTEM_ARCHITECTURE_AUDIT.md](DESIGN_SYSTEM_ARCHITECTURE_AUDIT.md) | Initial matrix/plan plus final evidence, file list, risks and next steps |
| [text](../component-specifications/text.md), [heading](../component-specifications/heading.md), [paragraph](../component-specifications/paragraph.md), [caption](../component-specifications/caption.md), [link](../component-specifications/link.md), [icon](../component-specifications/icon.md), [image](../component-specifications/image.md) | Individual content-purpose/selection guidance linked to shared contracts |
| [helper-text](../component-specifications/helper-text.md), [validation-message](../component-specifications/validation-message.md), [label](../component-specifications/label.md) | Individual field-support/association guidance |
| [box](../component-specifications/box.md), [container](../component-specifications/container.md), [stack](../component-specifications/stack.md), [inline](../component-specifications/inline.md), [grid](../component-specifications/grid.md), [spacer](../component-specifications/spacer.md), [button-group](../component-specifications/button-group.md) | Individual layout/action-group selection guidance |
| [radio-group](../component-specifications/radio-group.md), [switch](../component-specifications/switch.md), [slider](../component-specifications/slider.md), [progress](../component-specifications/progress.md) | Individual control/feedback selection guidance |
| [avatar](../component-specifications/avatar.md), [separator](../component-specifications/separator.md), [scroll-area](../component-specifications/scroll-area.md) | Individual elevated-primitive composition guidance |
| [aspect-ratio](../component-specifications/aspect-ratio.md) | Preserve existing specification; annotate primitive layer and public API |
| [personalizer-filter-builder](../component-specifications/personalizer-filter-builder.md) | Explain internal product-pattern classification |

## Follow-up: integrate individual capabilities into the main design system

The initial implementation exported the primitive APIs but exposed only their
combined gallery in the main sidebar. A subsequent discoverability pass compared
the public barrel, all application routes, and registry lifecycle metadata
against the navigation. This follow-up addresses that gap without adding
synonymous controls or promoting unfinished APIs.

### Main-system coverage

- **99 searchable destinations**, generated from shared catalogue metadata:
  system guidance, foundations, tokens, primitives, components, patterns,
  templates, and explicitly labelled deferred/deprecated documentation.
- **Every one of the 70 approved registry assets is represented.** Compound
  primitive parts stay with their family. Editorial, personalized, and station
  rail variants retain one shared Rail Details documentation page.
- **25 individual primitive-family pages** now show a live example, usage snippet,
  and composition/accessibility contract. The original composed gallery remains.
- **Seven foundation pages** expose existing Sizing, Iconography, Opacity, Aspect
  Ratios, Responsive Behaviour, Motion, and Layering contracts. No visual scales
  or global token values were changed.
- Existing **Design Principles** and **Accessibility** guidance is reachable from
  the navigation and catalogue.
- **Search Field** and **Sort Control** have individual routes that reuse the
  existing Query Controls implementation.
- **Date Input, Time Input, and File Input** document native TextInput
  capabilities, not duplicate implementations or an upload service.
- **Unsaved Changes Footer** remains a pattern. Its existing implementation and
  props type are now publicly exported, with a working save/discard example.
- The overview embeds the catalogue; the prior interactive component sampler is
  preserved under Component Previews. Narrow screens expose Browse design
  system; the hidden desktop sidebar no longer leaves invisible Tab stops.
- Deferred editable comboboxes, menus, upload transport, calendar redesign, and
  other complex behavior remain deferred rather than being presented as supported.

### Follow-up files

| File | Change |
| --- | --- |
| [designSystemCatalog.ts](../../src/app/designSystemCatalog.ts) | Single catalogue for navigation/search, capability aliases, and lifecycle labels |
| [DesignSystemCatalogDocumentation.tsx](../../src/app/components/DesignSystemCatalogDocumentation.tsx) | Complete, searchable linked library, also embedded in the overview |
| [DesignSystemCatalog.css](../../src/app/components/DesignSystemCatalog.css) | Token-backed responsive catalogue and detail-page styles |
| [PrimitiveDocumentation.tsx](../../src/app/components/PrimitiveDocumentation.tsx) | Individual live examples, native input capability pages, and working draft pattern |
| [FoundationDocumentation.tsx](../../src/app/components/FoundationDocumentation.tsx) | Seven foundation contracts and related capabilities |
| [DesignSystemNav.tsx](../../src/app/components/DesignSystemNav.tsx), [DesignSystemNav.css](../../src/app/components/DesignSystemNav.css) | Shared metadata, current-page semantics, lifecycle labels, and narrow-screen focus behavior |
| [App.tsx](../../src/app/App.tsx), [App.css](../../src/app/App.css) | Routes, embedded catalogue, principles page, and mobile catalogue access |
| [QueryControlsDocumentation.tsx](../../src/app/components/QueryControlsDocumentation.tsx) | Reuse search/sort examples on individual routes; explicit search label |
| [UnsavedChangesFooter.tsx](../../src/app/components/UnsavedChangesFooter.tsx), [index.ts](../../src/design-system/index.ts) | Additive pattern and props exports |
| [components.json](../../src/agent/registry/components.json) | Fill discovery documentation for Search Field, Sort Control, and Unsaved Changes Footer |
| [DesignSystemCatalog.test.tsx](../../src/app/components/DesignSystemCatalog.test.tsx) | Registry coverage, route uniqueness, aliases, links, navigation, and draft behavior |
| [catalog.spec.ts](../../tests/visual/catalog.spec.ts) | Real-route smoke checks, primitive navigation/history, responsive keyboard access, and themed AA scans |
| [PRIMITIVES.md](../specifications/PRIMITIVES.md), this report | Main-system discovery and maintenance guidance |

### Follow-up verification and limits

- `NODE_OPTIONS=--no-experimental-webstorage npm run verify:agent`: registry,
  schemas, public types, 38-style token governance, **83 unit tests**, token
  freshness, and production build pass.
- `npm run visual:test -- tests/visual/catalog.spec.ts
  tests/visual/primitives.spec.ts tests/visual/station-rails.spec.ts`:
  **35 browser tests pass**, including the retained shared Rail Details behavior.
  The catalogue suite visits every destination to reject accidental overview
  fallbacks; all new primitive/foundation detail pages are scanned in both themes
  at 320px. The full catalogue is checked at 320/768/1440px.
- An additional strict TypeScript invocation covers all new/changed catalogue
  components, navigation, Query Controls documentation, and new unit/browser
  tests using the repository's existing compiler. It passes.
- `git diff --check`: passes.
- An exploratory whole-App strict check is **not clean**: existing legacy
  documentation types fail (including optional axe impact values and Lucide
  component types), and the ad-hoc invocation lacks existing SVG declarations.
  This is outside the configured public-type gate and was not suppressed or
  repaired as part of catalogue integration. Whole-application strict cleanup
  remains a separate task.
- No dependencies were added. Existing bundle-size, Node deprecation, and
  third-party annotation warnings remain. No JavaScript linter is configured;
  token governance is the existing stylesheet lint gate. Automated AA results
  do not replace manual assistive-technology certification.
