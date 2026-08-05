# CVP Spacing Foundation Assessment

Status: Implemented foundation candidate  
Date: 2026-08-04

## Outcome

The CVP project now has an active primitive and semantic spacing foundation. Existing components that consume the legacy `--spacing-*` variables resolve through the canonical scale, while new work can use relationship-based Stack, Inline, Inset, Gap, Section and Container tokens.

## Current-state findings

- The existing project already clusters heavily around 4, 8, 12, 16, 24, 32 and 48px.
- Those values form a strong 4px-oriented core and are preserved.
- Hundreds of component declarations still use raw values directly.
- Off-scale values such as 6, 10, 13, 15 and 19px appear in component padding and layout rules.
- Padding, sibling gaps and section separation are frequently represented by the same generic token family.
- Component density is compact, but touch-target and interactive-clearance requirements are not consistently encoded.

## Implemented architecture

### Primitive scale

`0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128px`

### Semantic families

| Family | Responsibility |
|---|---|
| Stack | Vertical relationships in content flow |
| Inline | Horizontal relationships in one row |
| Inset | Space between content and a local boundary |
| Gap | Equal spacing in repeated grids and lists |
| Section | Separation between major vertical zones |
| Container | Padding for shells and layout wrappers |

Each family supplies xs, sm, md, lg and xl roles across Compact, Default and Comfortable density modes.

## Component impact applied in this phase

- Existing `--spacing-0` through `--spacing-12` variables now alias the canonical scale.
- Button, text-button, input, segmented-control, modal, modal-tab, badge, table-cell, panel-header, collection-tag and login-card global spacing tokens now use canonical or semantic values.
- Several off-scale global values have been replaced with semantic inset/inline roles.
- The documentation navigation now distinguishes System, Foundations and component categories.

Component-local raw spacing remains visible in the audit and will be removed during each component's full state review. It is intentionally not bulk-replaced without understanding whether the relationship is Stack, Inline, Inset, Gap, Section or Container.

## Accessibility rules

- Interactive targets should provide a 44x44px target area where touch interaction is expected.
- Adjacent interactive targets retain at least 8px clearance, including Compact density.
- Focus indicators must not be clipped by overflow or insufficient inset.
- Zoom and text reflow must not cause controls, labels or error messages to overlap.
- Compact mode may reduce visual padding but cannot reduce operability.

## Change classification

- Preserve: CVP's dense professional character and dominant 4/8/12/16/24/32/48 rhythm.
- Standardise: one primitive scale, six relationship families and three density modes.
- Fix: off-scale global component padding and unsafe interactive clearance.
- Elevate: explicit proximity, containment and macro-rhythm decisions.
- Deprecate later: generic legacy aliases after component migration reaches zero.

## Next gate

Proceed to Radius, then Border. Those foundations can safely standardise component geometry and boundaries now that padding, gaps and density have an explicit contract. Component state matrices should be updated alongside those migrations.
