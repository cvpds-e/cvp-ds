# Runtime tokens

Token dependencies flow in one direction:

```text
cvp-primitives.css
  -> cvp-semantic-tokens.css
    -> cvp-component-tokens.css
      -> cvp-alias-bridge.css
```

Foundation compatibility files such as spacing and radius consume the canonical graph and should not introduce new raw values.

## Token catalog

The complete, readable Markdown inventory is maintained in
[`docs/tokens/TOKEN_CATALOG.md`](../../../docs/tokens/TOKEN_CATALOG.md). It lists every
active primitive, semantic, and component token with its definition and theme scope.

The CSS files remain the runtime source of truth. When a token changes, update the
catalog in the same change so design, product, and implementation guidance stay aligned.
