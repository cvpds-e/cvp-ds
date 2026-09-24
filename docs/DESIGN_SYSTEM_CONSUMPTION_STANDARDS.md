# Design System Consumption Standards

## Purpose

These standards define how consuming applications use the CVP Design System to build coherent, accessible interfaces. They govern product UI composition and design decisions. Component props, examples, and implementation details are generated from the codebase and are not repeated here.

## Core principles

### Design for the user task

- Start with the primary user task and the information needed to complete it.
- Make the most important action and status easiest to find.
- Keep related information and controls together.
- Prefer progressive disclosure when showing every option would obscure the main task.
- Use product language that is concise, specific, and consistent across workflows.

### Use the system before extending it

- Import public components from `@cvp/design-system`.
- Choose components using the purpose and "When to use" guidance in `docs/component-specifications/`.
- Compose approved components and patterns before creating application-specific UI.
- Do not copy component source into a consuming application.
- Do not recreate a component with local HTML and CSS when the design system provides the required behavior.
- Request a design-system addition when a need recurs across products or cannot be met accessibly through composition.

### Establish clear hierarchy

- Give each page one clear purpose and one dominant heading.
- Use one primary action per task region. Present other actions with lower visual emphasis.
- Order content and actions by user priority, not implementation order.
- Use headings, spacing, alignment, and semantic surfaces to communicate structure.
- Avoid using color, elevation, or container borders as the only indication of hierarchy.
- Keep operational interfaces compact enough to scan while preserving legibility and target size.

### Use layout intentionally

- Use design-system spacing and layout tokens instead of arbitrary values.
- Align related content to a consistent grid and minimize unnecessary nesting.
- Use cards only for discrete, repeated objects or genuinely bounded tools. Do not turn every page section into a card.
- Keep labels near their controls and actions near the content they affect.
- Allow content to reflow. Do not rely on fixed heights for text, forms, tables, or selected values.
- Preserve a logical reading and focus order at every viewport size.

### Use semantic tokens

- Use semantic or component tokens for color, spacing, typography, borders, elevation, and motion.
- Do not use raw color values or primitive tokens directly in product UI.
- Do not override a component's internal state tokens in a consuming application.
- Support both light and dark themes unless the product has an approved theme constraint.
- Preserve semantic distinctions such as error versus danger and selected versus active, even when values appear similar.
- Follow `docs/tokens/TOKEN_GOVERNANCE.md` when an existing token cannot express a reviewed requirement.

### Write clear interface content

- Use sentence case for headings, labels, actions, and messages unless a proper noun requires otherwise.
- Label actions with a specific verb and object where context is not obvious.
- Keep labels stable across states. Show progress or status separately instead of renaming controls unpredictably.
- Put essential guidance in visible text, not placeholders or tooltips alone.
- Write error messages that identify the problem and the action needed to resolve it.
- Design for long names, translated text, empty values, and user-generated content.

### Choose controls by intent

- Use buttons for actions and links for navigation.
- Use Checkbox for independent or multiple choices and radio-style controls for one choice from a visible set.
- Use Select or Multi Select when the option set is too long to remain visible.
- Use Tabs for peer views within the same context, not for form choices or sequential steps.
- Use a modal only for a focused task that must interrupt the current flow.
- Do not disable an action when the reason would be unclear. Prefer guidance that explains how to make it available.
- For multiple actions, use one primary action and arrange secondary actions by importance. Move infrequent actions into an appropriate menu when necessary.

### Provide complete states and feedback

- Define default, hover, focus, active, selected, disabled, loading, empty, error, and success states where applicable.
- Give immediate feedback after an action and prevent duplicate submissions during processing.
- Preserve entered data when validation fails or a recoverable request error occurs.
- Use Skeleton for content whose shape is known and a loading indicator for indeterminate operations.
- Use inline feedback for local problems and banners, notifications, or toasts only at the scope their message affects.
- Do not rely on color alone to communicate state.

### Build responsive interfaces

- Start from content needs and available space rather than device names.
- Reflow columns before content becomes cramped, clipped, or horizontally compressed.
- Keep primary tasks available on small screens; move secondary controls without hiding essential functionality.
- Contain intentional horizontal scrolling within the relevant component, such as a data table.
- Ensure overlays remain inside the viewport and do not obscure their trigger or required actions.
- Test narrow mobile, zoomed desktop, and long-content conditions in addition to standard breakpoints.

### Meet accessibility requirements

- Use semantic HTML and the accessibility behavior provided by design-system components.
- Give every control an accessible name and every form field a persistent visible label.
- Support complete keyboard operation with a logical focus order and visible `focus-visible` treatment.
- Move, trap, and restore focus appropriately for dialogs and other modal experiences.
- Associate instructions and errors programmatically with their controls.
- Announce asynchronous status changes when visual updates would otherwise be missed.
- Meet WCAG AA contrast requirements for text, controls, boundaries, icons, and focus indicators.
- Provide text alternatives for meaningful media and hide decorative media from assistive technology.
- Verify keyboard, zoom and reflow, reduced motion, contrast, and screen-reader behavior before release.

### Use motion with restraint

- Use motion to explain a state or spatial relationship, not as decoration.
- Use design-system motion tokens and keep interaction feedback brief.
- Avoid movement that delays task completion or competes with important content.
- Respect `prefers-reduced-motion` and provide a non-animated equivalent.

## Exceptions and governance

An application may extend the system when an approved component or composition cannot meet a validated user need. Before implementing an exception:

1. Confirm that no existing component, pattern, or semantic token covers the requirement.
2. Document the user need, affected workflows, accessibility implications, and alternatives considered.
3. Review the proposal with Product Design and the Design System team.
4. Build with semantic tokens and the same accessibility and state requirements as system components.
5. Feed recurring solutions back into the design system rather than maintaining parallel variants across applications.

## Review checklist

- The page has a clear purpose, hierarchy, and primary action.
- Components match their documented purpose and usage guidance.
- Public imports and semantic tokens are used without internal overrides.
- Layout works with long content, zoom, and narrow viewports.
- Applicable loading, empty, error, disabled, and success states are present.
- Keyboard, focus, naming, contrast, announcements, and reduced motion are verified.
- Light and dark themes are reviewed where supported.
- Any exception is documented and approved.

## Related sources

- [Component specifications](component-specifications/README.md)
- [Design System Specification](specifications/DESIGN_SYSTEM_SPECIFICATION.md)
- [Token Architecture](tokens/CVP_TOKEN_ARCHITECTURE.md)
- [Token Governance](tokens/TOKEN_GOVERNANCE.md)
- [Token Catalog](tokens/TOKEN_CATALOG.md)
