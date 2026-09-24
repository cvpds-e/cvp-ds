assetId: multi-select
classification: component
lifecycle: approved
specificationStatus: reference
# Multi Select

## Status

- Lifecycle: `approved`
- Specification status: `reference`
- Owner: Design System team
- Last reviewed: 2026-09-23
- Related registry ID: `multi-select`

## Purpose and decisions

Multi Select lets people search and choose multiple values from one field. Selected values appear as removable pills, while a portaled listbox provides filtering, bulk selection, optional creation, disabled options, and selection limits.

### Use when

- People may select multiple values from a set that is too long to show as visible checkboxes.
- Search materially reduces the effort of finding options.
- Selected values need to remain visible and individually removable.
- Arbitrary user-created values are valid domain data, when creation is deliberately enabled.

### Do not use when

- Exactly one value is allowed; use Select or Choice Card Group.
- A short set can remain visible; use Checkbox.
- The values navigate between views; use Tabs or navigation controls.
- Free-form text is required without a governed option set; use Text Input or Text Area.

## API and composition

### Canonical import

```tsx
import { MultiSelect, type MultiSelectOption } from '@cvp/design-system';
```

`@cvp/design-system` is the canonical consumer import. The runtime source is `src/app/components/MultiSelect.tsx`, and the public export is `src/design-system/index.ts`.

### TypeScript contract

```tsx
interface MultiSelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

interface MultiSelectProps {
	options: MultiSelectOption[];
	value?: string[];
	defaultValue?: string[];
	onChange?: (values: string[]) => void;
	id?: string;
	name?: string;
	label?: string;
	labelTooltip?: React.ReactNode;
	description?: string;
	placeholder?: string;
	maxSelection?: number;
	disabled?: boolean;
	required?: boolean;
	error?: boolean | string;
	className?: string;
	allowCreate?: boolean;
	onCreateOption?: (newOption: MultiSelectOption) => void;
	previewState?: 'hover' | 'focus' | 'open' | 'clear-hover';
}
```

### Prop contract

| Prop | Type | Required | Default | Deterministic rule |
| --- | --- | --- | --- | --- |
| `options` | `MultiSelectOption[]` | Yes | - | Stable choices. Values must be unique; duplicate values resolve to the first option. |
| `value` | `string[]` | No | - | Controlled selection. Values should match supplied or created options. Do not combine with `defaultValue`. |
| `defaultValue` | `string[]` | No | `[]` | Initial uncontrolled selection. Later changes do not reset internal state. |
| `onChange` | `(values: string[]) => void` | No | - | Called with the complete next selection after select, remove, clear, bulk select, or create. |
| `id` | `string` | No | Generated ID | Input ID and base for listbox, description, and error IDs. |
| `name` | `string` | No | - | Emits one hidden input with this name for every selected value. |
| `label` | `string` | No | - | Visible label linked to the combobox. Supply it unless an external label targets `id`. |
| `labelTooltip` | `React.ReactNode` | No | - | Content adjacent to the label. Do not use it as the only accessible label. |
| `description` | `string` | No | - | Support text associated through `aria-describedby`. |
| `placeholder` | `string` | No | `Select options...` | Visible only when no selected pills are present. |
| `maxSelection` | `number` | No | Unlimited | Use a positive integer. At the limit, unselected options and creation are disabled. |
| `disabled` | `boolean` | No | `false` | Disables the combobox, toggle, creation, selection, and removal. |
| `required` | `boolean` | No | `false` | Applies native `required` to the search input only while the selection is empty. |
| `error` | `boolean \| string` | No | `false` | Both forms set `aria-invalid`; a string also renders an associated alert message. |
| `className` | `string` | No | `''` | Adds a class to the root. Do not use it to replace component tokens. |
| `allowCreate` | `boolean` | No | `true` | Enables creation for a non-empty query with no case-insensitive label match. Set `false` for closed vocabularies. |
| `onCreateOption` | `(newOption: MultiSelectOption) => void` | No | - | Called after internal creation with trimmed query text as both `value` and `label`. |
| `previewState` | `'hover' \| 'focus' \| 'open' \| 'clear-hover'` | No | - | Documentation-only visual fixture control. Do not use in product code. |

### Canonical controlled usage

```tsx
import { useState } from 'react';
import { MultiSelect, type MultiSelectOption } from '@cvp/design-system';

const productOptions: MultiSelectOption[] = [
	{ value: 'forecast', label: 'Forecast' },
	{ value: 'observations', label: 'Observations' },
	{ value: 'warnings', label: 'Warnings' },
	{ value: 'experimental', label: 'Experimental', disabled: true },
];

const [products, setProducts] = useState<string[]>(['forecast']);

<MultiSelect
	label="Data products"
	description="Choose up to three products."
	options={productOptions}
	value={products}
	onChange={setProducts}
	maxSelection={3}
	allowCreate={false}
/>
```

### Canonical uncontrolled form usage

```tsx
<MultiSelect
	id="distribution-regions"
	name="regions"
	label="Distribution regions"
	options={regionOptions}
	defaultValue={['north-america']}
	required
	error={showError ? 'Select at least one region.' : false}
	allowCreate={false}
/>
```

Choose one state mode: use `value` with `onChange` for controlled state, or `defaultValue` for uncontrolled state. Do not pass `value` and `defaultValue` together. For controlled creation, update both the selected value and the parent-owned options when `onCreateOption` fires if created options must persist after remounting.

## Behaviour and responsiveness

- Clicking or focusing the field opens the popup. Outside pointer interaction or Escape closes it and clears the query.
- Typing filters labels with a locale-aware, case-insensitive substring match.
- Clicking an enabled option toggles it. Selected pills expose individual remove buttons; Clear all empties the selection.
- The popup action says Select all only when nothing is selected. It selects enabled filtered options up to `maxSelection`; when any value is selected, the action clears the entire selection.
- Creation trims the query and uses the same string for the new option value and label. It is unavailable for empty queries, case-insensitive label matches, or when the limit is reached.
- Selected pills wrap and the field grows vertically. Do not force a fixed field height.

| Condition | Layout contract |
| --- | --- |
| Field width changes | The root and popup track the field width; selected pills wrap. |
| Space below is constrained | The fixed-position portal opens above when usable space above exceeds space below. |
| Popup near viewport edge | An `8px` viewport inset and `4px` field gap are preserved. |
| Available vertical space changes | Popup height is capped by available space, with a `112px` minimum calculation and a `320px` measured fallback. |

There are no Multi Select media-query breakpoints. Agents must preserve fluid wrapping and viewport-aware popup positioning rather than inventing breakpoint tokens.

## Keyboard behavior

- From the input, Arrow Down moves focus to the first enabled option.
- On options, Arrow Up and Arrow Down move through enabled options and wrap at the boundaries.
- Enter or Space toggles the focused option.
- Escape closes the popup; from an option it also returns focus to the input.
- Enter creates the current query only when creation is available.
- Backspace with an empty query removes the last selected value.
- Tab follows native focus order through the input, clear/toggle controls, and available popup controls.

## Accessibility and validation

- The text input is a combobox with `aria-expanded`, `aria-controls`, `aria-haspopup="listbox"`, and `aria-autocomplete="list"`.
- The popup list uses `role="listbox"` with `aria-multiselectable="true"`; options expose `aria-selected` and `aria-disabled`.
- A visible `label` names the input through `htmlFor`. If `label` is omitted, provide `id` and a correctly associated external label.
- Description and string error text are composed into `aria-describedby`.
- `error={true}` exposes invalid state without visible error copy. Prefer a string when actionable error text is available; string errors render with `role="alert"`.
- `required` participates in native constraint validation while the selection is empty. Product validation still owns when errors appear and how focus is managed after failed submission.
- Every pill removal and clear/toggle button has a specific accessible name.
- Manually verify screen-reader announcements for add/remove changes, portaled reading order, long translated labels, zoom/reflow, touch targets, and light/dark contrast.

## Visual and token contract

The public prefix is `--cvp-multi-select-`. Canonical values live in `src/styles/token-registry.json`. The component composes shared Input, Menu, and Pill contracts; consumers must not replace internal state tokens locally.

| Token group | Tokens | Contract source |
| --- | --- | --- |
| Field surfaces | `--cvp-multi-select-bg`, `--cvp-multi-select-bg-disabled` | Input surface tokens |
| Field borders | `--cvp-multi-select-border`, `--cvp-multi-select-border-width`, `--cvp-multi-select-border-hover`, `--cvp-multi-select-border-focus`, `--cvp-multi-select-border-disabled` | Input border tokens |
| Focus | `--cvp-multi-select-focus-ring` | Input focus ring |
| Text | `--cvp-multi-select-text`, `--cvp-multi-select-text-disabled`, `--cvp-multi-select-placeholder`, `--cvp-multi-select-label`, `--cvp-multi-select-support`, `--cvp-multi-select-error-text`, `--cvp-multi-select-meta` | Semantic text tokens |
| Error | `--cvp-multi-select-error` | Input error border |
| Field geometry | `--cvp-multi-select-min-height`, `--cvp-multi-select-padding-x`, `--cvp-multi-select-padding-y`, `--cvp-multi-select-radius`, `--cvp-multi-select-field-gap` | Input and spacing tokens |
| Typography | `--cvp-multi-select-font-size`, `--cvp-multi-select-line-height`, `--cvp-multi-select-label-size`, `--cvp-multi-select-label-weight`, `--cvp-multi-select-support-size`, `--cvp-multi-select-meta-font-size` | Input typography tokens |
| Motion | `--cvp-multi-select-transition` | Input transition |
| Selected pills | `--cvp-multi-select-tag-bg`, `--cvp-multi-select-tag-text`, `--cvp-multi-select-tag-radius`, `--cvp-multi-select-tag-height`, `--cvp-multi-select-tag-padding-x`, `--cvp-multi-select-tag-gap`, `--cvp-multi-select-tag-max-width`, `--cvp-multi-select-tag-remove-hover`, `--cvp-multi-select-tag-remove-active` | Pill and spacing tokens |
| Icons | `--cvp-multi-select-icon`, `--cvp-multi-select-icon-size`, `--cvp-multi-select-icon-target` | Semantic icon and spacing tokens |
| Clear action | `--cvp-multi-select-clear-icon`, `--cvp-multi-select-clear-icon-hover`, `--cvp-multi-select-clear-icon-active`, `--cvp-multi-select-clear-bg`, `--cvp-multi-select-clear-bg-hover`, `--cvp-multi-select-clear-bg-active`, `--cvp-multi-select-clear-border`, `--cvp-multi-select-clear-border-hover` | Semantic icon, surface, and border tokens |
| Search | `--cvp-multi-select-search-min-width` | Spacing calculation |
| Popup | `--cvp-multi-select-popup-bg`, `--cvp-multi-select-popup-text`, `--cvp-multi-select-popup-border`, `--cvp-multi-select-popup-radius`, `--cvp-multi-select-popup-shadow`, `--cvp-multi-select-popup-max-height` | Menu tokens |
| Options | `--cvp-multi-select-option-hover`, `--cvp-multi-select-option-selected`, `--cvp-multi-select-option-selected-text`, `--cvp-multi-select-option-padding-x`, `--cvp-multi-select-option-padding-y`, `--cvp-multi-select-option-radius` | Menu and spacing tokens |
| Popup actions | `--cvp-multi-select-action`, `--cvp-multi-select-action-hover` | Link text tokens |

These groups enumerate all 63 registered Multi Select tokens. Light and dark values resolve through their semantic sources. Reduced-motion preferences disable field and chevron transitions.

## Evidence

- Examples: `src/app/components/MultiSelectDocumentation.tsx`
- Canonical consumer import: `@cvp/design-system`
- Runtime implementation: `src/app/components/MultiSelect.tsx`
- Public export: `src/design-system/index.ts`
- Machine contract: `src/agent/registry/component-specifications.json`
- Token registry: `src/styles/token-registry.json`
- Behavior tests: not yet available; required before specification status can become `complete`.
- Visual coverage: no dedicated fixture is registered; required before specification status can become `complete`.
- Accessibility review: documentation guidance exists; manual assistive-technology results are not yet recorded.

## Limitations and migration

The component supports multiple string values only. It does not virtualize large option sets, announce selection changes through a live region, or persist created options outside its mounted state. The popup is portaled to `document.body`, so consumers must test it inside modals, transformed containers, and constrained viewports. `previewState` is not a product API. Use Select for single selection and Checkbox for short visible sets.
