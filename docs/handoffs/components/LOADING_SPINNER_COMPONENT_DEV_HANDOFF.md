# Loading Spinner

## Purpose

Loading Spinner communicates indeterminate progress for a local action or compact pending region.

## Use

- Use `sm` in compact controls, `md` as the default, and `lg` for a larger pending region.
- Use `tone="inherit"` when the spinner sits inside a button or another colored surface; it inherits the parent foreground color.
- A loading control may be natively disabled to prevent repeat activation, but it must retain its active visual hierarchy and expose `aria-busy`; disabled is a separate unavailable state.
- Include a concise `label` that describes what is loading.
- Set `decorative` when a parent control already exposes the loading state, such as a busy button; this prevents duplicate status announcements.
- Use Skeleton instead when the intended layout is known and should remain visible while content resolves.

## Accessibility

- The component exposes a `role="status"` and visually hides its loading label.
- Motion respects `prefers-reduced-motion` by using a static partial indicator.
- Do not rely on a spinner alone for a long-running operation; provide meaningful progress or status where available.

## Tokens

Use the `--cvp-loading-spinner-*` component contract for size, track, indicator, and motion. Theme values resolve through semantic colour and motion tokens.
