# Secondary Button — Engineering Handoff

## Outcome

Secondary Button is the supporting-action member of the CVP button family. It shares Primary Button's dimensions, interaction behavior, focus treatment, loading semantics, and density rules while using the secondary semantic color role.

## API

```tsx
<SecondaryButton size="small | medium | large" variant="default | compact" loading={false} loadingText="Loading" disabled={false}>
  View details
</SecondaryButton>
```

The component defaults to `type="button"`. Loading exposes `aria-busy="true"`, uses `loadingText` as the accessible name, preserves resting width, and prevents repeat activation.

## State contract

| State | Visual behavior | DOM contract |
|---|---|---|
| Default | Secondary semantic surface and on-brand label | Native enabled `button` |
| Hover | Secondary hover surface | CSS `:hover` |
| Pressed | Active surface and 1px press offset | CSS `:active` |
| Focus | Shared focus border and halo | CSS `:focus-visible` |
| Loading | Inline spinner and loading label | `disabled`, `aria-busy="true"` |
| Disabled | Disabled semantic surface and text | Native `disabled` |

## Dimensions

| Mode | Height | Horizontal padding | Intended use |
|---|---:|---:|---|
| Small | 32px | 12px | Dense desktop UI |
| Medium | 40px | 16px | Default |
| Large | 48px | 24px | Prominent or touch-oriented contexts |
| Compact | 32px | 8px | Space-constrained toolbars |

## Token ownership

All component decisions use `--cvp-button-secondary-*` Tier 3 tokens in `src/styles/tokens/cvp-component-tokens.css`. They alias semantic color, typography, spacing, radius, border, and motion foundations; component CSS contains no raw visual values.

## Acceptance criteria

- Preserve native button semantics and a visible, meaningful label.
- Keep Secondary visually subordinate to Primary.
- Validate default, hover, pressed, focus, loading, and disabled in light and dark themes.
- Do not replace CVP tokens with local raw values.
- Treat the live documentation page and this handoff as the implementation baseline.
