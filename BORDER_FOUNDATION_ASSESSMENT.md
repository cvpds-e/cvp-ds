# CVP Border Foundation Assessment

## Outcome

The Border Foundation is implemented as a governed structural and interaction-state system. It preserves CVP's quiet, dark operational interface while making keyboard focus, selection, validation, and theme parity explicit.

## Current-state findings

- Border widths were spread across raw `0.5px`, `1px`, `2px`, and dashed declarations.
- Structural boundaries, hover states, selection, and focus frequently used similar weights without consistent role names.
- Focus treatment alternated between outline, border replacement, single box-shadow rings, glows, and component-specific colors.
- Some focused controls changed border width, risking visual or internal layout movement.
- Light and dark theme border colors existed, but components could bypass them through local hex or alpha values.
- Disabled, error, and selected boundaries were not governed by one shared contract.

## Implemented architecture

The canonical width scale is `0, 0.5, 1, 2, 4px`.

- **Subtle:** optional hairline separation in dense contexts.
- **Base:** routine control and component edges.
- **Divider:** separation between adjacent content.
- **Container:** bounded groups and local surfaces.
- **Strong:** structural emphasis above the base layer.
- **Section:** major regional separation.
- **Selected:** active choice or selected object boundary.
- **Focus:** keyboard position, always distinct from passive structure.

Each role combines a governed width with a theme-aware semantic color. Component contracts consume complete border recipes or their width and color parts when state transitions require independent control.

## Shared component impact

- Global button focus treatment now uses a consistent 2px focus ring and secondary halo.
- Shared input colors, hover, focus, error, and halo contracts use the Border Foundation.
- Text Input now retains its 1px layout border while focus is drawn externally, preventing geometry shift.
- Checkbox width, radius, and focus treatment now use shared contracts.
- Modal container, header, and footer boundaries now distinguish containment from division.
- Table separation, collection tags, and documentation surfaces use semantic recipes.
- Select and Multi Select continue through the shared input state variables and therefore inherit the new colors and halo.

## Accessibility assessment

- Dark focus `#67b3fb` and light focus `#2563eb` are deliberately different mappings for reliable non-text contrast.
- Focus uses both a 2px edge and halo and does not rely on a subtle color change alone.
- Error and selected states use a visible boundary plus accompanying component content or fill; border color is not intended as the sole status announcement.
- Disabled boundaries may be lower contrast because they are non-operable, but disabled text and state meaning remain independently governed.
- Hairlines are never used for focus, selection, validation, or essential containment.

Keyboard focus, error messaging, `aria-invalid`, labels, and descriptive text remain component responsibilities and are reviewed with each component.

## Decision rules

Use whitespace first when distance is sufficient. Use a surface change when the interface plane changes. Add a border only when an explicit edge, repeated scan line, containment boundary, or interaction state is necessary.

## Change classification

- **Preserved:** CVP's restrained borders, blue interaction language, dense scan clarity, and both themes.
- **Standardized:** widths, role names, state hierarchy, focus geometry, and theme mappings.
- **Elevated:** focus no longer changes control geometry; selection and validation are distinct from hover.
- **Deferred:** replacement of every local border declaration until the owning component's complete state review.

## Next gate

Elevation should follow Border. It will distinguish embedded surfaces from detached overlays without duplicating the boundary signals established here.
