# CVP Elevation Foundation Assessment

## Outcome

The Elevation Foundation is implemented as a restrained plane and depth system. CVP's dark operational character is preserved, while shadow recipes, blocking overlays, and foreground hierarchy now have explicit roles and light/dark equivalents.

## Current-state findings

- Similar overlay shadows were independently repeated across filters, menus, date pickers, cards, toasts, and dialogs.
- Existing shadow recipes ranged from subtle single-pixel drops to broad 50px modal shadows without a shared depth model.
- Hover frequently increased shadow strength even when the surface relationship had not changed.
- Component z-index values included repeated `999`, `1000`, and `9999` values with no documented layer ladder.
- Focus rings and elevation shadows both used `box-shadow`, making accidental replacement possible without composed contracts.
- Light and dark themes used different shadow recipes, but equivalent perceived depth was not governed.

## Implemented architecture

Five depth levels support six semantic plane roles:

- **Canvas / depth 0:** root application environment, no shadow.
- **Section / depth 0:** quiet grouping attached to the canvas, no shadow.
- **Surface / depth 1:** default contained working plane, subtle shadow.
- **Raised / depth 2:** contained emphasis without foreground interruption.
- **Overlay / depth 3:** suppression layer used only behind active foreground content.
- **Elevated / depth 4:** detached or blocking foreground surface.

Shadow recipes use governed y-axis, blur, spread, and theme-aware opacity primitives. A documented z-index ladder covers base, raised, navigation, dropdown, overlay, modal, and toast layers.

## Shared component impact

- Modal shadow and scrim now use the Elevated + Overlay pairing.
- Toasts use a detached foreground shadow tier.
- Tooltips use the lower detached tier appropriate to compact transient content.
- Filters and dropdowns use a shared detached shadow and governed dropdown z-index.
- Panels retain the same low resting elevation on hover.
- Login and authentication cards use the Raised plane.
- The theme switcher remains at a stable depth across hover.

Local recipes remain compatible and will be migrated when their components receive a complete interaction and stacking review.

## Interaction and accessibility rules

- Hover, press, keyboard focus, selection, error, and disabled states do not change semantic depth.
- Focus rings remain independent of elevation shadows and must not be hidden or replaced.
- Dragging may temporarily lift an object, but it returns to its resting plane on release or cancellation.
- Blocking dialogs always pair a suppressive Overlay with one Elevated foreground surface.
- Overlay never appears without foreground content and must collapse when that foreground closes.
- Shadow is never the sole indicator of state, focus, selection, or grouping.
- Reduced motion affects elevation transitions, not resting plane assignment.

Elevation itself has no direct WCAG contrast threshold. Accessibility depends on retained focus visibility, sufficient surface and boundary contrast, correct focus management, and non-color state cues.

## Change classification

- **Preserved:** restrained CVP shadows, dark foreground separation, both themes, and existing component hierarchy.
- **Standardized:** depth roles, shadow composition, scrim behavior, z-index ladder, and theme parity.
- **Elevated:** modal interruption is now structurally explicit; stable controls no longer lift on hover.
- **Deferred:** local z-index and shadow replacement where the component's portal and stacking context must first be understood.

## Next gate

Layout should follow Elevation. Layout will define page regions, containers, responsive behavior, rails, panels, and stacking contexts that consume these plane roles safely.
