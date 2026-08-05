# CVP Radius Foundation Assessment

## Outcome

The Radius Foundation is implemented as a governed three-layer system while preserving CVP's compact, operational visual character. Existing 2px, 4px, 6px, 8px, and 12px geometry has been standardized rather than replaced with the source template's softer defaults.

## Current-state findings

- Radius values were repeated across global tokens, component-local variables, inline styles, and documentation examples.
- The active system mixed fractional `0.2rem` values with 2px, 3px, 4px, 6px, 8px, 12px, 16px, 20px, and fully rounded values.
- Several semantic roles existed implicitly—dense panels, controls, cards, overlays, and pills—but were not named or governed.
- Connected and nested corner rules were not documented, making double-rounded seams and inverted containment hierarchy possible.
- Focus indicators could inherit inconsistent contours when components supplied their own radius values.

## Implemented architecture

The CVP-tuned scale is `0, 2, 4, 6, 8, 12, 16, 24, full`. The 6px step is intentionally retained because it is central to the existing CVP control language. The source Radius Foundation permits scale customization when the token layers and monotonic progression are preserved.

Semantic roles are organized as:

- **Edge:** hard structural joins and minimally softened dense panels.
- **Control:** compact, base, and soft interactive geometry.
- **Surface:** subtle, base, raised, soft, and expressive bounded containment.
- **Overlay:** detached modal, menu, popover, and toast surfaces.
- **Rounded:** pills, status badges, and circular objects only.

Components consume semantic roles; semantic roles reference primitives; primitives reference the scale.

## Shared component impact

The new contracts are active for buttons, shared inputs, segmented controls, accordions, modals, toasts, status badges, collection tags, documentation surfaces, dense panels, and authentication cards.

Legacy aliases remain available so existing components do not break. Component-local raw values will be migrated deliberately during each component review.

## Structural and accessibility rules

- Radius does not change between default, hover, active, focus, disabled, or validation states.
- Shared internal seams use zero radius; only the exposed perimeter remains rounded.
- Inner surfaces use tighter geometry than their containing surface.
- External focus contours follow the component curve and account for outline offset.
- Fully rounded tokens are reserved for pills, avatars, indicators, and circular controls.
- Most screens should use no more than two or three shape categories.

Radius values alone do not create a WCAG failure. The accessibility risk is inconsistent or distorted focus geometry, prevented through stable state shapes and coherent focus contours.

## Change classification

- **Preserved:** compact CVP controls, precise panels, restrained card softness, and both themes.
- **Standardized:** naming, scale ownership, component roles, nesting, shared seams, and focus geometry.
- **Elevated:** overlays now read as detached layers; surfaces and controls have clearer structural hierarchy.
- **Deferred:** replacement of every component-local raw value until that component's complete state and accessibility review.

## Next gate

Border should follow Radius. Border will define boundary strength, focus thickness and offset, selected and validation states, disabled treatment, and theme-specific contrast while using the new radius contours.
