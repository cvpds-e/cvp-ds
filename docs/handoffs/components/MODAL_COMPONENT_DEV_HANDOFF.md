# CVP Modal — Developer Handoff

## Intent

Use Modal for focused tasks, confirmations, and short multi-step settings that must temporarily interrupt the underlying page. Prefer a page or side panel when users need to compare the task with background content or complete a long workflow.

## Public contract

- `isOpen` and `onClose` are controlled by the consumer.
- Provide `title`, or provide `ariaLabel` when using a custom/no-title header.
- Use `size="small"` for confirmations, `medium` for standard tasks, and `large` for complex or tabbed settings.
- Use `tone="danger"` only when the primary decision is destructive.
- `closeOnBackdrop` and `closeOnEscape` default to true. Disable backdrop dismissal when accidental closure would lose meaningful work.
- `maxWidth` remains available for exceptional product-specific layouts; prefer the size contract.

## Interaction and accessibility

- The component renders `role="dialog"` with `aria-modal="true"` and unique title/description relationships.
- Opening moves focus into the dialog; Tab and Shift+Tab remain contained; closing restores focus to the trigger.
- Escape and the close button invoke the same `onClose` callback.
- Body scrolling is locked while open and its previous overflow value is restored on cleanup.
- Tabs use `tablist`, `tab`, and `tabpanel` semantics with unique IDs.
- The body owns vertical overflow; header and footer remain visible.

## Token architecture

`Modal.css` consumes `--cvp-modal-*` Tier 3 tokens only. Theme values resolve through CVP semantic tokens. Product code must not add local light/dark gradients, scrims, borders, or text colors.

The documentation Token Contract records each Tier 3 token, its canonical semantic or foundation source, resolved value/behavior, and activation condition.

## Action hierarchy

- Place the primary action last in the footer.
- Use an outline/secondary action for Cancel.
- Destructive actions require a clear object and consequence in the title or description.
- Do not present more than one primary action.

## Visual acceptance

- Backdrop separates the dialog without obscuring its silhouette.
- Header, body, and footer share one continuous surface; subtle dividers provide structure in both themes.
- Close, tab, form, and action focus rings use the shared CVP focus contract.
- At narrow widths the modal becomes a bottom-aligned sheet-like surface and footer actions stack.
- Reduced-motion preferences disable entrance animations.
