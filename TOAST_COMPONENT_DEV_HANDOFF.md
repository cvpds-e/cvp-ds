# Toast — developer handoff

## Canonical implementation

- Component and provider: `src/app/components/Toast.tsx`
- Component styles: `src/app/components/Toast.css`
- Tier 3 aliases: `src/styles/cvp-component-tokens.css`
- Visual audit: `src/app/components/ToastDocumentation.tsx`

Wrap the application once with `ToastProvider`, then call `useToast().addToast(...)` inside descendants. Do not create additional toast regions or duplicate status colours locally.

## API behavior

- `variant`: `success`, `warning`, `danger`, or `info`.
- `description`: required concise outcome or status.
- `title`: optional; use when it improves scanning.
- `duration`: defaults to 5000ms. Set to `0` for persistent feedback.
- `dismissible`: defaults to `true`.
- `addToast` returns an ID for programmatic removal.
- `clearAll` clears both notifications and pending timers.

## Accessibility

Success and information use `role="status"`; warning and danger use `role="alert"`. The notification region is labelled. The dismiss control has a stable accessible name and the shared CVP focus ring. Do not put required form instructions or field errors only in a toast.

## Token and theme contract

Toast CSS consumes `--cvp-toast-*` Tier 3 aliases. Status backgrounds, borders, text, and icons resolve through CVP semantic state tokens. Theme switching requires no component selectors or hard-coded colour overrides. Motion respects `prefers-reduced-motion`.

## Pixel-perfect acceptance

Verify all four variants, titleless messages, persistent messages, dismissible and timed behavior, responsive width, stacking, focus-visible, and light/dark rendering against the documentation page.
