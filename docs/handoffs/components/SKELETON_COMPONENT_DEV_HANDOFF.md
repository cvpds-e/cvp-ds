# Skeleton component

## Purpose

Use Skeleton while known content is actively loading. It preserves the final layout’s geometry without implying an error, empty state, or disabled control.

## Available compositions

- `Skeleton` — one decorative placeholder shape.
- `SkeletonTableRows` — loading rows for `Table`; automatically used when `loading` is set.
- `SkeletonRailCards` — poster-card placeholders for rails, galleries, and browse results; automatically used by `RailContentGallery` when `loading` is set.

## Usage

```tsx
<Table columns={columns} data={[]} loading />

<RailContentGallery title="Trending" items={[]} loading />

<Skeleton width="68%" height="var(--cvp-skeleton-line-height)" />
```

Do not use a skeleton once loading has completed. Replace it with either loaded content or the component’s empty state.

## Token contract

| Role | Alias | Source |
| --- | --- | --- |
| Base surface | `--cvp-skeleton-bg` | `--cvp-color-surface-subtle` |
| Shimmer highlight | `--cvp-skeleton-highlight` | `--cvp-color-surface-active` |
| Default radius | `--cvp-skeleton-radius` | `--cvp-radius-sm` |
| Line and gap geometry | `--cvp-skeleton-{line-height,gap}` | `--cvp-space-*` |
| Motion | `--cvp-skeleton-motion-{duration,easing}` | `--cvp-motion-*` |

Use aliases rather than direct colour or timing values. Theme selection is resolved by semantic tokens.

## Accessibility

- The visual shapes are decorative (`aria-hidden`).
- The containing table or rail owns a single concise loading status.
- Shimmer is disabled under `prefers-reduced-motion`.
- Avoid announcing each individual placeholder.
