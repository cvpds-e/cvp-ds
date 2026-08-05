# Icon Button with Text — Engineering Handoff

This component is a labeled action card combining a decorative icon, concise action title, and optional explanation. Default is a compact 176 × 96px-minimum card; `m` is a 208 × 160px dashed selection card.

```tsx
<IconButtonWithText icon={<Filter />} text="Add with filters" description="Build a content query" size="default | m" variant="default | outline" loading={false} />
```

- The visible `text` is the accessible name; the icon is decorative.
- Description is optional supporting context and must remain concise.
- Required states: default, hover, pressed, focus-visible, loading, disabled.
- Loading replaces the icon/title, sets `aria-busy`, and prevents repeat activation.
- Do not suppress pointer focus or blur after activation.
- M is reserved for creation/setup-path selections, not ordinary form actions.
- All visuals resolve through `--cvp-button-icon-text-*` Tier 3 tokens.
