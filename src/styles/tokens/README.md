# Runtime tokens

Token dependencies flow in one direction:

```text
cvp-primitives.css
  -> cvp-semantic-tokens.css
    -> cvp-component-tokens.css
      -> cvp-alias-bridge.css
```

Foundation compatibility files such as spacing and radius consume the canonical graph and should not introduce new raw values.
