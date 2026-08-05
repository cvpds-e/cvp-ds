# Segmented Standardization

Segmented now follows the CVP navigation-family component contract.

## Semantic correction

Segmented represents a mutually exclusive choice without associated tab panels. It therefore uses `radiogroup` and `radio` semantics instead of `tablist` and `tab`.

## Supported behavior

- Controlled and uncontrolled selection
- Small, medium, and large sizes
- Neutral and color-emphasis variants
- Optional icons with persistent labels
- Full-width distribution
- Individual-option and whole-group disabling
- Arrow keys plus Home and End navigation
- Horizontally scrollable overflow

All visual values resolve through the CVP primitive → semantic → component token architecture, including focus, elevation, motion, and reduced-motion behavior.
