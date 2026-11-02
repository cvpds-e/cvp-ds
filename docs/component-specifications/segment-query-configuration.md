---
assetId: segment-query-configuration
classification: pattern
lifecycle: deferred
specificationStatus: draft
---
# Segment Query Configuration

## Purpose

Maintain the reference modal for segment sorting and compound field/operator/value
conditions joined by AND or OR.

## When to use

- Maintain an existing prototype using this deferred query concept.
- Evaluate structured query requirements with supplied fields and operators.

Pass `initialConfig`, `availableFields`, and `availableOperators` as appropriate.
`onApply` receives the configuration; `onCancel` and `onClose` handle dismissal.
The configuration model contains sort field/direction, filter conditions, and
logical operators. The parent owns validation against its service contract.

## When not to use

- New production query builders are being introduced without review.
- Rail entity-specific filters already have an approved workspace composition.

See [implementation](../../src/app/components/SegmentQueryConfiguration.tsx) and
[showcase](../../src/app/components/SegmentQueryConfigurationDocumentation.tsx).
