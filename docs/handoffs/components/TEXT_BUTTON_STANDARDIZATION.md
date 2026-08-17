# Text Button — Engineering Handoff

Text Button is CVP's lowest-emphasis action family. Its variants are semantic: `default`, `secondary`, `toggle`, `minimal`, `contextual`, `minimal-inverted`, and `nav`.

```tsx
<TextButton variant="secondary">Import content</TextButton>
<TextButton variant="toggle" active={expanded}>Show details</TextButton>
<TextButton variant="contextual">all filters</TextButton>
<TextButton href="/files" variant="nav" active icon={<FileText />}>Files</TextButton>
```

- Render actions as buttons and destinations as anchors.
- Toggle maps `active` to `aria-pressed`; active nav links expose `aria-current="page"`.
- Contextual is for a changing inline value. It uses muted text at rest and primary text on hover without a background surface; use it for controls such as match-all versus match-any.
- Disabled links remove `href`, set `aria-disabled`, and leave the tab order.
- Loading is button-only in practice; it sets `aria-busy`, disables activation, and uses `loadingText` as the accessible name.
- Legacy modifier class names remain recognized during migration; new code must use the `variant` prop.
- All visuals resolve through `--cvp-button-text-*` Tier 3 tokens.
