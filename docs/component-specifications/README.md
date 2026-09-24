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

The following requested Storybook components have approved public implementations and aligned specifications:

- [Accordion](accordion.md)
- [Badge](badge.md)
- [Banner](banner.md)
- [Breadcrumb](breadcrumb.md)
- Buttons: [Text Button](text-button.md) and [Icon Button](icon-button.md)
- [Checkbox](checkbox.md)
- [Loader](loader.md)
- [Modal](modal.md)
- [Number Input](number-input.md)
- [Pagination](pagination.md)
- [Segmented Control](segmented-control.md)
- [Pills](pills.md)
- [Select](select.md)
- [Skeleton](skeleton.md)
- [Table](table.md)
- [Tabs](tabs.md)
- [Textarea](textarea.md)
- [Toast](toast.md)
- [Tooltip](tooltip.md)
- [Tree](tree.md)

No specification was generated for requested items without one unambiguous public implementation: AspectRatio, Button, ButtonGroup, ButtonMenu, Calendar, RangeCalendar, DateTime Field, DateTime Range Field, Flex, FormControl, Grid, Icon, Image, Input, PasswordInput, OptionList, PillsInput, Popover, Splitter, and TagsSelect. Primitive-only or overlapping internal implementations must not be presented as approved public components.

## Authoring guidance

Every component specification must use the frontmatter keys and section order shown in [the template](COMPONENT_SPEC_TEMPLATE.md):

1. `assetId`, `classification`, `lifecycle`, and `specificationStatus` frontmatter.
2. One component title.
3. `## Purpose` with a short statement in user and product language.
4. `## When to use` with concrete selection guidance and decision-relevant variants or states.
5. `## When not to use` with nearby alternatives for unsuitable situations.

Keep exhaustive props, defaults, examples, and implementation behavior out of the file. Review guidance with Design and Engineering before changing lifecycle metadata, then run `npm run agent:check` and `npm run specs:audit`.

New specifications start from [the template](COMPONENT_SPEC_TEMPLATE.md). Consuming applications must also follow the [Design System Consumption Standards](../DESIGN_SYSTEM_CONSUMPTION_STANDARDS.md).
