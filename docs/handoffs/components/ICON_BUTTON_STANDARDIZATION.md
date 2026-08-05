# Icon Button — Engineering Handoff

Icon Button is CVP's compact single-action control. Its API requires an accessible action name; its glyph is decorative. Default, outline, ghost, danger, and rail-gallery variants share one state, size, focus, loading, and theme contract.

```tsx
<IconButton aria-label="Delete item" size="small | medium | large" variant="default | outline | ghost | danger | rail-gallery" loading={false} loadingLabel="Deleting">
  <Trash2 />
</IconButton>
```

| Size | Target | Use |
|---|---:|---|
| Small | 24px | Dense toolbars with sufficient separation |
| Medium | 32px | Default interface control |
| Large | 40px | Prominent or touch-oriented contexts |

## Accessibility and DOM contract

- `aria-label` is required and describes the action rather than the glyph.
- The glyph wrapper is `aria-hidden="true"` to prevent duplicate names.
- Loading replaces the glyph, sets `aria-busy="true"`, uses `loadingLabel` as the accessible name, and disables repeat activation.
- Use 32px or 40px where space allows. Keep 24px controls separated from adjacent targets.
- Danger is reserved for destructive actions. Rail Gallery is reserved for controls over media.

All visual decisions resolve through `--cvp-button-icon-*` Tier 3 tokens. Component CSS contains no raw visual values.
