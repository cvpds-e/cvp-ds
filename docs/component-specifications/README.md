# Component specifications

This directory contains the human-authored product guidance for reusable CVP components. Each component specification answers three questions:

- What is the component for?
- When should a consuming application use it?
- When should a consuming application choose another component or pattern?

This follows the concise purpose and "When To Use" model used by references such as [Ant Design's Button documentation](https://ant.design/components/button). Every component in the canonical registry has one Markdown file here. Draft `TODO` content is not approved guidance.

## Source of truth

- These Markdown files own component purpose and selection guidance.
- Exported TypeScript owns props, types, defaults, and composition contracts.
- Runtime implementations and tests own behavior and accessibility semantics.
- Documentation components and fixtures own examples.
- `src/styles/token-registry.json` owns generated token reference data.
- `src/agent/registry/component-specifications.json` owns the machine-readable component contract.

Do not copy props, code examples, token tables, or implementation behavior into these files. Generate those details from the codebase so they cannot drift from the shipped component.

## Storybook-aligned inventory

The following specifications use the supplied Storybook labels. This alignment is limited to Markdown guidance; implementation exports and registries may continue to use their existing symbols until a separate code migration is approved.

Files retained under older implementation IDs are compatibility redirects required by the current registry. They do not define separate component guidance.

- [Accordion](accordion.md)
- [Badge](badge.md)
- [Banner](banner.md)
- [Breadcrumb](breadcrumb.md)
- Buttons: [TextButton](text-button.md), [IconButton](icon-button.md), and [Button](button.md)
- Calendar: [Calender](calender.md) and [RangeCalender](range-calender.md)
- [Checkbox](checkbox.md)
- [DateTime Field](date-time-field.md)
- [DateTime Range Field](date-time-range-field.md)
- [Input](input.md)
- [Loader](loader.md)
- [Modal](modal.md)
- [NumberInput](number-input.md)
- [Pagination](pagination.md)
- [Segmented Control](segmented-control.md)
- [Pills](pills.md)
- [PillsInput](pills-input.md)
- [Select](select.md)
- [Skeleton](skeleton.md)
- [Splitter](splitter.md)
- [Table](table.md)
- [Tabs](tabs.md)
- [TagsSelect](tags-select.md)
- [Textarea](textarea.md)
- [Toast](toast.md)
- [Tooltip](tooltip.md)
- [Tree](tree.md)

No specification was generated for requested items without an existing model to map: AspectRatio, ButtonGroup, ButtonMenu, Flex, FormControl, Grid, Icon, Image, PasswordInput, OptionList, and Popover. Primitive-only implementations must not be presented as approved public components.

## Authoring guidance

Every component specification must use the frontmatter keys and section order shown in [the template](COMPONENT_SPEC_TEMPLATE.md):

1. `assetId`, `classification`, `lifecycle`, and `specificationStatus` frontmatter.
2. One component title.
3. `## Purpose` with a short statement in user and product language.
4. `## When to use` with concrete selection guidance and decision-relevant variants or states.
5. `## When not to use` with nearby alternatives for unsuitable situations.

Keep exhaustive props, defaults, examples, and implementation behavior out of the file. Review guidance with Design and Engineering before changing lifecycle metadata, then run `npm run agent:check` and `npm run specs:audit`.

New specifications start from [the template](COMPONENT_SPEC_TEMPLATE.md). Consuming applications must also follow the [Design System Consumption Standards](../DESIGN_SYSTEM_CONSUMPTION_STANDARDS.md).
