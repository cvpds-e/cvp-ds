# Number Input Standardization

Status: ready for implementation.

The Number Input is the canonical control for quantities, positions, and limits. Its implementation lives in `src/app/components/NumberInput.tsx`, with the visual contract in `src/app/components/NumberInput.css` and the interactive reference at `?page=number-input`.

## Contract

- Use the native numeric input; provide sensible `min`, `max`, and `step` constraints.
- Use the shared `--cvp-input-*` tokens for field surface, border, type, spacing, focus, validation, and disabled states. Do not introduce Number Input-specific colour tokens.
- Default density is 40px; compact density is 32px.
- Step controls are contained inside the field boundary and complement direct keyboard entry. They are disabled whenever the field is disabled.
- Read-only values remain readable but cannot be edited. Disabled values, icons, and borders use opaque semantic tokens rather than reduced opacity.

## State requirements

The component must preserve the shared input state model: default, hover, focus-visible, required, invalid, read-only, disabled, compact, and light/dark theme parity.

## Usage

Use Number Input for numeric values only. Use Text Input for IDs, codes, phone numbers, dates, and other strings that may contain digits but are not quantities.
