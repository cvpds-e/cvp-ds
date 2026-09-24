# Choice Card Group

## Status

- Lifecycle: `approved`
- Owner: Design System team
- Last reviewed: 2026-09-23
- Related registry ID: `choice-card-group`

## Purpose and decisions

Choice Card Group presents a mutually exclusive set of options when a concise label alone does not give people enough information to make a choice. Each option may include an icon, a short parallel description, and a status badge.

### Use when

- One choice must be selected from a small, comparable set.
- Descriptions, badges, or icons materially help a user compare options.
- Two or three columns can be read without truncating the option meaning.

### Do not use when

- A compact view switch with short labels is sufficient; use Segmented.
- People may select more than one option; use Checkbox, Tag Filter, or Multi Select.
- The options represent navigation rather than a form decision; use Tabs or navigation controls.

## API and composition

### Canonical import

```tsx
import { Badge, ChoiceCardGroup } from '@cvp/design-system';
```

`@cvp/design-system` is the canonical consumer import. The repository source of truth is `src/app/components/ChoiceCardGroup.tsx`, and the approved public export is `src/design-system/index.ts`.

### TypeScript contract

```tsx
interface ChoiceCardOption {
	value: string;
	label: string;
	description?: string;
	icon?: React.ReactNode;
	badge?: React.ReactNode;
	disabled?: boolean;
}

interface ChoiceCardGroupProps {
	label: string;
	options: ChoiceCardOption[];
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	helperText?: string;
	required?: boolean;
	disabled?: boolean;
	columns?: 2 | 3;
	className?: string;
}
```

### Prop contract

| Prop | Type | Required | Default | Deterministic rule |
| --- | --- | --- | --- | --- |
| `label` | `string` | Yes | — | Visible group label and accessible name. |
| `options` | `ChoiceCardOption[]` | Yes | — | Use two to five stable, mutually exclusive options. An empty array renders nothing. |
| `value` | `string` | No | — | Controlled selection. Must equal an enabled `options[].value`. Do not combine with `defaultValue`. |
| `defaultValue` | `string` | No | First enabled option | Initial uncontrolled selection. Ignored when `value` is supplied. |
| `onChange` | `(value: string) => void` | No | — | Called after pointer or keyboard selection with the selected string value. |
| `helperText` | `string` | No | — | Visible guidance connected to the `radiogroup` with `aria-describedby`. |
| `required` | `boolean` | No | `false` | Adds the visible required marker and `aria-required`; it does not perform form validation. |
| `disabled` | `boolean` | No | `false` | Disables every option and exposes `aria-disabled` on the group. |
| `columns` | `2 \| 3` | No | `2` | Sets the desktop grid column count. Pass a number, not a string. |
| `className` | `string` | No | `''` | Adds a class to the component root. Do not use it to replace component token values. |

`ChoiceCardOption.value` and `label` are strings. `icon` and `badge` accept non-interactive `React.ReactNode` content, not string identifiers or status enums. Use an icon component such as a Lucide icon and the approved `Badge` component. The component marks the icon wrapper decorative; option text must remain understandable without the icon or badge. Never place a button, link, input, or other interactive element in either slot.

### Canonical uncontrolled usage

```tsx
import { Badge, ChoiceCardGroup } from '@cvp/design-system';
import { Film, Radio } from 'lucide-react';

<ChoiceCardGroup
	label="Content type"
	helperText="Choose what viewers will see in this rail."
	defaultValue="program"
	columns={2}
	options={[
		{ value: 'program', label: 'Program Rail', description: 'VOD / On-Demand', icon: <Film /> },
		{ value: 'live', label: 'Live Now', description: 'Currently airing', icon: <Radio />, badge: <Badge tone="live">Live</Badge> },
	]}
/>
```

### Canonical controlled usage

```tsx
const [railType, setRailType] = useState('generic');

<ChoiceCardGroup
	label="Rail behavior"
	options={[
		{ value: 'generic', label: 'Generic', description: 'Manually curated' },
		{ value: 'personalized', label: 'Personalized', description: 'Tailored to each viewer' },
	]}
	value={railType}
	onChange={setRailType}
/>
```

Choose exactly one mode: use `value` with `onChange` for controlled state, or use `defaultValue` for uncontrolled state. Do not pass `value` and `defaultValue` together.

Use a concise label and keep descriptions parallel. `columns` supports two or three columns; the group reflows to one column at narrow widths. Do not place interactive controls inside an option card.

## Behaviour and responsiveness

The first enabled option is selected when no controlled value or valid default is supplied. Pointer selection, Arrow keys, Home, and End select and focus an enabled option. Disabled options cannot be selected.

| Condition | Layout contract |
| --- | --- |
| Default | `columns={2}` renders two equal columns; `columns={3}` renders three. |
| Viewport `<= 600px` | Three-column groups stack to one column. |
| Viewport `<= 460px` | All groups stack to one column. |

The design system does not currently expose canonical breakpoint tokens. `600px` and `460px` are component-local implementation constants in `ChoiceCardGroup.css`; agents must reuse these values and must not invent CSS custom properties for them.

The shared component uses a subtle compact density: 64px minimum card height, a leading radio indicator, compact option padding, and compact icon and supporting-text sizing. The selected surface stays neutral while its brand border and filled radio dot preserve a clear state. Consumers should not override those dimensions locally without a reviewed accessibility and content-fit reason.

## Accessibility

- The option container is a named `radiogroup`; cards are radio controls with `aria-checked`.
- Helper text and required state are programmatically associated with the group.
- Roving tab focus exposes one enabled option in the tab order.
- Arrow keys move and select; Home and End move to the first and last enabled options.
- Selected state is communicated with a filled radio indicator, boundary change, and programmatic state, not colour alone.
- Manually verify long labels/descriptions, keyboard order after reflow, focus visibility, contrast in both themes, and touch target suitability for the product context.

### Required and validation behavior

`required` is semantic and presentational only. It sets `aria-required="true"` and renders an asterisk, but the component does not render a native form control, block submission, expose `aria-invalid`, or provide an error-message prop. Uncontrolled usage always selects the first enabled option when no valid default is supplied. For controlled usage, the parent must keep `value` matched to an enabled option and must prevent submission when its own business validation fails. Do not claim an inline error state until the public component API adds and tests one.

## Visual and token contract

The public token prefix is `--cvp-choice-card-`. The canonical values and theme resolution live in `src/styles/token-registry.json`; do not create aliases or hard-coded replacements in consumers.

| Token | Purpose | Resolves to |
| --- | --- | --- |
| `--cvp-choice-card-bg` | Default option surface | `--cvp-color-surface-page` |
| `--cvp-choice-card-bg-hover` | Hover surface | `--cvp-color-surface-hover` |
| `--cvp-choice-card-bg-selected` | Quiet selected surface | `--cvp-color-surface-subtle` |
| `--cvp-choice-card-bg-disabled` | Disabled surface | `--cvp-color-surface-disabled` |
| `--cvp-choice-card-border` | Default boundary | `--cvp-color-border-default` |
| `--cvp-choice-card-border-hover` | Hover and radio boundary | `--cvp-color-border-strong` |
| `--cvp-choice-card-border-selected` | Selected boundary | `--cvp-color-border-brand` |
| `--cvp-choice-card-text` | Primary option text | `--cvp-color-text-primary` |
| `--cvp-choice-card-description` | Helper and description text | `--cvp-color-text-muted` |
| `--cvp-choice-card-selected-accent` | Selected radio fill | `--cvp-color-text-link-default` |
| `--cvp-choice-card-text-disabled` | Disabled text | `--cvp-color-text-disabled` |
| `--cvp-choice-card-icon` | Default icon | `--cvp-color-icon-muted` |
| `--cvp-choice-card-icon-disabled` | Disabled icon | `--cvp-color-icon-disabled` |
| `--cvp-choice-card-required` | Required marker | `--cvp-color-text-danger` |
| `--cvp-choice-card-focus-ring` | Keyboard focus | `--cvp-border-focus-ring` |
| `--cvp-choice-card-border-width` | Option and radio boundary width | `--cvp-border-base-width` |
| `--cvp-choice-card-radius` | Option radius | `--cvp-radius-md` |
| `--cvp-choice-card-min-height` | Compact option minimum height | `64px` |
| `--cvp-choice-card-transition` | Surface, border, and focus motion | Fast standard component motion |

The component supports light and dark themes. Consumers may place it in either theme without overrides. Product code must not override internal states, minimum height, or breakpoints; request a reviewed design-system variant instead.

## Evidence

- Examples: `src/app/components/ChoiceCardGroupDocumentation.tsx`
- Canonical consumer import: `@cvp/design-system`
- Runtime implementation: `src/app/components/ChoiceCardGroup.tsx`
- Public export: `src/design-system/index.ts`
- Machine contract: `src/agent/registry/component-specifications.json`
- Token registry: `src/styles/token-registry.json`
- Behaviour tests: `src/app/components/ChoiceCardGroup.test.tsx`
- Visual coverage: documentation route; dedicated fixture is tracked as a rollout gap rather than implied by this specification.
- Accessibility review: keyboard behavior is covered by component behavior and must be manually reviewed alongside visual fixture work.

## Limitations and migration

The component intentionally supports only single selection and two or three columns. It has no built-in invalid/error state and no native form-submission value. A future multi-select card control is a separate candidate, not a variant of this component.
