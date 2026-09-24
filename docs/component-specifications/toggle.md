---
assetId: toggle
classification: component
lifecycle: deferred
specificationStatus: draft
---
# Toggle

## Purpose

Toggle represents a binary setting that can be turned on or off, with optional label, description, and mixed state. The component is deferred and should not be introduced into production work.

## When to use

- Maintain an existing prototype that already uses the component.
- A setting takes effect immediately when its on or off state changes.
- A parent setting needs to communicate a mixed state derived from child values.
- A compact binary control is being evaluated for a dense settings surface.

Treat the component as a reference while its deferred lifecycle remains in effect.

Choose the size only when maintaining an existing prototype:

- **Default:** use for routine settings with a label or description.
- **Small:** use only in a dense settings surface that cannot accommodate the default switch.

Choose the content layout according to the setting:

- **Switch only:** use only when adjacent context provides an unambiguous accessible label.
- **Label:** use for a concise setting name that activates with the switch.
- **Label and description:** add supporting text when users need to understand the setting's effect before changing it.

Account for these setting states:

- **Off:** communicate that the setting is inactive.
- **On:** communicate that the setting is active and apply the change immediately.
- **Indeterminate:** use only for a parent value derived from mixed child settings; activation resolves it to on.
- **Disabled:** keep an unavailable setting visible only when its absence would be confusing, and prevent pointer and keyboard changes.
- **Uncontrolled:** use the default checked value when the prototype owns subsequent state.
- **Controlled:** provide the checked value and handle changes when product state owns the setting.

## When not to use

- New production settings are being built; use Checkbox or another approved control.
- The choice is submitted with the rest of a form rather than applied immediately; use Checkbox.
- More than two mutually exclusive choices are available; use Segmented Control or Select.
