# Icon Small Button — Engineering Handoff

Icon Small Button is a compatibility alias for `<IconButton size="small">`, not an independent component styling system. It retains existing imports while the codebase migrates to the canonical Icon Button API.

```tsx
<IconSmallButton aria-label="Remove item" variant="remove"><X /></IconSmallButton>
// Canonical form for new code:
<IconButton size="small" aria-label="Remove item" variant="remove"><X /></IconButton>
```

- Target: 24px square; glyph: 16px maximum.
- Required states: default, hover, pressed, focus-visible, loading, disabled.
- `aria-label` is mandatory; glyph content is decorative.
- Keep adequate separation between adjacent 24px controls. Prefer 32px Icon Button when spacing is constrained.
- `remove` is reserved for circular media or card removal overlays.
- Focus must not be prevented on mouse down or manually blurred after activation.
- All visuals resolve through the canonical `--cvp-button-icon-*` Tier 3 tokens.
