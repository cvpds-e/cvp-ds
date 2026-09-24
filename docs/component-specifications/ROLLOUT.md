# Approved component specification rollout

This is the delivery backlog for completing product guidance and machine-readable contracts for every approved reusable component. Human specifications contain only purpose and selection guidance; API details and examples are derived from the codebase. `Reference` means the component has reviewed human guidance and a machine contract. `Queued` means it remains publicly usable but has not completed that review.

| Family | Components | Current specification status | Delivery order |
| --- | --- | --- | --- |
| Forms | Checkbox, Choice Card Group, Date Picker, Misc Input, Multi Select, Number Input, Pills, Segmented Control, Select, Tag Filter, Textarea, Text Input | Choice Card Group: Reference; remaining: Queued | 1 |
| Actions | Icon Button, Icon Button with Text, Outline Button, Primary Button, Secondary Button, Text Button | Queued | 2 |
| Navigation | Breadcrumb, Header Navigation, Pagination, Tabs | Queued | 3 |
| Data display | Accordion, Table, Tree | Queued | 4 |
| Filtering | Filter, Search Field, Sort Control | Queued | 5 |
| Feedback | Loader, Banner, Skeleton, Status, Toast | Queued | 6 |
| Overlays | Modal, Tooltip | Queued | 7 |

## Completion criteria

For each queued component, replace the `Purpose` and `When to use` placeholders with reviewed guidance. Add or update its machine record in `src/agent/registry/component-specifications.json`, and ensure generated API documentation and examples resolve from the exported implementation. Then run the checks below.

```sh
npm run specs:audit
npm test
npm run build
```

## Release gate

The Design System team should switch this document from a rollout tracker to a release checklist only after every approved component has reviewed purpose and usage guidance, a `complete` machine specification, current code-derived documentation, behavior tests, and visual evidence or an explicit, reviewed exception.
