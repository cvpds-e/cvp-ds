# Approved component specification rollout

This is the delivery backlog for bringing every approved reusable component to the specification standard. `Reference` means the component demonstrates the expected complete contract; `Queued` means it remains publicly usable but has not yet completed the new agent-ready specification review.

| Family | Components | Current specification status | Delivery order |
| --- | --- | --- | --- |
| Forms | Checkbox, Choice Card Group, Date Picker, Misc Input, Multi Select, Number Input, Pill, Segmented, Select, Tag Filter, Text Area, Text Input | Choice Card Group: Reference; remaining: Queued | 1 |
| Actions | Icon Button, Icon Button with Text, Outline Button, Primary Button, Secondary Button, Text Button | Queued | 2 |
| Navigation | Breadcrumbs, Header Navigation, Pagination, Tabs | Queued | 3 |
| Data display | Accordion, Table, Tree | Queued | 4 |
| Filtering | Filter, Search Field, Sort Control | Queued | 5 |
| Feedback | Loading Spinner, Notification Banner, Skeleton, Status, Toast | Queued | 6 |
| Overlays | Modal, Tooltip | Queued | 7 |

## Completion criteria

For each queued component, add a Markdown specification and a matching record in `src/agent/registry/component-specifications.json`, then run the checks below.

```sh
npm run specs:audit
npm test
npm run build
```

## Release gate

The Design System team should switch this document from a rollout tracker to a release checklist only after every approved component has a `complete` machine specification, a current documentation example, behavior tests, and visual evidence or an explicit, reviewed exception.
