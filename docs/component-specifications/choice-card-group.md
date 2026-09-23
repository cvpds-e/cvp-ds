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

`ChoiceCardGroup` accepts `label`, `options`, optional controlled `value`, optional `defaultValue`, `onChange`, `helperText`, `required`, `disabled`, `columns`, and `className`. `options` provide a stable `value` and `label`, with optional `description`, `icon`, `badge`, and `disabled`.

Use a concise label and keep descriptions parallel. `columns` supports two or three columns; the group reflows to one column at narrow widths. Do not place interactive controls inside an option card.

## Behaviour and responsiveness

The first enabled option is selected when no controlled value or valid default is supplied. Pointer selection, Arrow keys, Home, and End select and focus an enabled option. Disabled options cannot be selected. Three-column groups stack below 600px; two-column groups stack below 460px.

The shared component uses a subtle compact density: 64px minimum card height, a leading radio indicator, compact option padding, and compact icon and supporting-text sizing. The selected surface stays neutral while its brand border and filled radio dot preserve a clear state. Consumers should not override those dimensions locally without a reviewed accessibility and content-fit reason.

## Accessibility

- The option container is a named `radiogroup`; cards are radio controls with `aria-checked`.
- Helper text and required state are programmatically associated with the group.
- Roving tab focus exposes one enabled option in the tab order.
- Arrow keys move and select; Home and End move to the first and last enabled options.
- Selected state is communicated with a filled radio indicator, boundary change, and programmatic state, not colour alone.
- Manually verify long labels/descriptions, keyboard order after reflow, focus visibility, contrast in both themes, and touch target suitability for the product context.

## Visual and token contract

The public token prefix is `--cvp-choice-card-`. Tokens control surface, border, selection, text, icon, focus, minimum height, and motion. The component supports the system light and dark themes. Its compact density is the default global contract.

## Evidence

- Examples: `src/app/components/ChoiceCardGroupDocumentation.tsx`
- Behaviour tests: `src/app/components/ChoiceCardGroup.test.tsx`
- Visual coverage: documentation route; dedicated fixture is tracked as a rollout gap rather than implied by this specification.
- Accessibility review: keyboard behavior is covered by component behavior and must be manually reviewed alongside visual fixture work.

## Limitations and migration

The component intentionally supports only single selection and two or three columns. A future multi-select card control is a separate candidate, not a variant of this component.
