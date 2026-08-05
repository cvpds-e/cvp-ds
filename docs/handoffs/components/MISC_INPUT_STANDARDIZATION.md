# Misc Input — Engineering Handoff

Misc Input is the advanced single-line field. Use Text Input for ordinary fields; use Misc Input when prefix/suffix content, copy, character counting, or warning/success validation is required.

```tsx
<MiscInput label="Generated ID" value="rail_01J8CVP" readOnly showCopy />
<MiscInput label="Slug" fieldPrefix="cvp" maxLength={24} showCharacterCount />
```

- One shared shell owns border, focus, disabled, and validation presentation.
- Validation precedence is error → warning → success → default helper.
- Error sets `aria-invalid` and associates an alert message.
- Helper/validation and counter IDs compose into `aria-describedby`.
- Prefix and suffix slots are decorative. The copy action has its own accessible name.
- Use character count only with a meaningful limit; use copy primarily for read-only/generated values.
- All visuals resolve through `--cvp-misc-input-*`, which extends the shared `--cvp-input-*` Tier 3 contract.
