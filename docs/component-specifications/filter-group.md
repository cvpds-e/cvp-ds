---
assetId: filter-group
classification: component
lifecycle: deferred
specificationStatus: draft
---
# Filter Group

## Purpose

Filter Group lets users build a structured filter expression by combining field, operator, and value conditions with AND or OR logic. The component is deferred and should not be introduced into production work.

## When to use

- Maintain an existing prototype that already uses the component.
- An advanced query concept needs multiple conditions joined by AND or OR logic.
- Users need to add and remove field, operator, and value conditions dynamically.
- The interface is being evaluated for users who understand structured filtering.

Treat every configuration as reference-only while the deferred lifecycle remains in effect.

Choose the condition structure according to the prototype being maintained:

- **Single condition:** use one field, comparison operator, and value when no compound expression is needed.
- **Multiple conditions:** use repeatable condition rows when the prototype must combine criteria; retain at least one condition.
- **Custom fields:** provide a governed field list when the prototype needs criteria beyond the default options.

Choose the logical relationship according to how all conditions are evaluated:

- **AND:** use when every condition must match.
- **OR:** use when any condition may match.

Choose comparison operators according to the field and value semantics:

- **Contains or equals:** use for text and exact-value comparisons.
- **Greater or less than:** use for ordered values where the boundary itself is excluded.
- **Greater or equal / less or equal:** use for ordered values where the boundary itself is included.

Choose the group action layout according to the prototype scope:

- **Condition actions:** allow adding conditions and removing any condition after the first.
- **Add group shown:** expose the add-group action only when the prototype handles another nested group through its callback.
- **Add group hidden:** omit the action when the prototype supports one condition group only.

## When not to use

- New production filtering is being built; use an approved filtering component or a reviewed product-specific solution.
- One free-text query is sufficient; use Search Field.
- Users only need a small set of predefined filters; use Filter or TagsSelect.
