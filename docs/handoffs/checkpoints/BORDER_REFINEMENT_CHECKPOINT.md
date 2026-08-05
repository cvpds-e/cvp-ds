# Border Refinement Checkpoint

Date: 2026-08-05

## Outcome

Neutral borders now follow the intended visual hierarchy across the complete system:

1. **Subtle** — dividers, row separators and low-emphasis internal boundaries
2. **Default** — resting controls, cards, menus and container perimeters
3. **Strong** — deliberate emphasis and interactive hover affordances
4. **Selected / focus / validation** — unchanged high-visibility state boundaries

## Canonical changes

- `--cvp-border-color-container` now resolves to `--cvp-color-border-default` rather than `--cvp-color-border-strong`.
- `--cvp-border-color-strong` now resolves to `--cvp-color-border-strong` rather than the bold neutral boundary.
- `--cvp-color-input-border` now resolves to the theme-aware default border at rest.

No component-specific overrides were introduced. Every component consuming the semantic recipes receives the refinement automatically in light and dark themes.

## Accessibility guardrails retained

- Focus rings and focus borders are unchanged.
- Selected and brand borders are unchanged.
- Error, warning and success borders are unchanged.
- Disabled boundaries retain their dedicated semantic role.
- Text and placeholder contrast values are unchanged.

This keeps ordinary structure visually quiet while ensuring state changes remain prominent and distinguishable.
