# Outline Button — Engineering Handoff

## Outcome

Outline Button is CVP's low-emphasis bordered action. It shares the button family's state, dimension, loading, focus, and motion contracts while using a transparent resting surface. The dotted variant is reserved for additive regions such as “Add filter”.

## API

```tsx
<OutlineButton size="small | medium | large" variant="default | compact | dotted" loading={false} loadingText="Loading">
  Cancel
</OutlineButton>
```

The component defaults to `type="button"`. Loading sets `aria-busy="true"`, prevents repeat activation, preserves width, and uses `loadingText` as the accessible name.

## Dimensions and states

Small and compact are 32px, medium is 40px, and large is 48px. Required states are default, hover, pressed, focus-visible, loading, and disabled. Hover and pressed use semantic surfaces; focus uses the shared CVP focus recipe.

## Token ownership

All visual decisions resolve through `--cvp-button-outline-*` Tier 3 tokens in `src/styles/cvp-component-tokens.css`. Component CSS must not introduce raw colors, spacing, radii, typography, timing, shadows, or easing.

## Acceptance criteria

- Preserve native button semantics and a meaningful visible label.
- Keep Outline below Primary and Secondary in visual emphasis.
- Reserve `dotted` for additive regions, not ordinary actions.
- Validate every state and size in light and dark themes.
- Treat the live documentation page and this handoff as the implementation baseline.

## Query configuration toggles

Sort direction and logical operator controls use the compact Outline Button. Their visible labels toggle between `ASC` / `DESC` and `AND` / `OR`; expose the current selection with `aria-pressed` and an explicit accessible label. They are stateful controls, not separate visual variants.
