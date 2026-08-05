# CVP Typography Foundation Assessment

Status: Approval preview  
Date: 2026-08-04

## Outcome

CVP should retain its compact, operator-focused typography rather than adopt the foundation template's larger default product scale wholesale. The proposed direction keeps Inter for interface and reading roles, retains Inconsolata for technical content, and adds a semantic role layer so components select type by purpose instead of copying size values.

## Current-state findings

- The active system describes four main sizes: 12, 13, 14 and 15px.
- The 14px/20px combination is the practical interface baseline and should be preserved.
- Headings use several additional hardcoded sizes without a complete semantic hierarchy.
- Font-family stacks and type-scale variables are repeated inside individual components.
- Raw font sizes appear throughout CSS and inline TSX styles, with 13px, 12px and 14px the most common.
- Line-height is inconsistent: 20px dominates interface content, while headings and documentation use a mixture of px values and unitless ratios.
- Inter, system UI stacks, generic monospace, Inconsolata and Monaco/Courier combinations coexist.
- Some token declarations are self-referential or duplicated, weakening confidence in the current source of truth.

## Proposed family contract

| Role | Direction | Rationale |
|---|---|---|
| Primary | Inter with a system-sans fallback | Preserves the existing CVP product voice and broad character coverage |
| Technical | Inconsolata with a system-mono fallback | Preserves the current technical/data distinction |
| Display | Inter initially | Avoids introducing an unapproved brand font during standardisation |

Inter Display from the template is not adopted automatically. It can be evaluated later as a deliberate brand decision.

## Proposed semantic roles

| Role | Primary use | CVP direction |
|---|---|---|
| Display | Rare product-level statements | Large and responsive; documentation/marketing contexts only |
| Headline | Page and primary section titles | Responsive at larger steps |
| Title | Panels, cards and grouped content | Compact and stable |
| Body | Instructions and continuous content | 14px baseline; 15-16px where reading length requires it |
| Label | Controls, actions and navigation | 13-14px with medium/semibold emphasis |
| Caption | Helper text and metadata | 12px minimum for meaningful content |
| Mono | IDs, values, code and technical metadata | 12-14px depending density |

Each role may expose size and emphasis variants, but components should consume only the variants supported by their contract.

## Accessibility and readability rules

- Do not reduce meaningful interface text below 12px.
- Keep the principal UI baseline at 14px/20px.
- Use 13px for compact labels and navigation only when contrast and spacing remain sufficient.
- Reserve 10-11px for non-essential uppercase annotations in documentation, never product instructions or required metadata.
- Body reading roles require a more generous line height than dense table and control labels.
- Responsive compression applies to Display and Headline; core UI roles remain stable.
- Zoom to 200% must preserve content and functionality without clipping or overlap.
- Typography hierarchy cannot rely on colour alone.

## Change classification

- Preserve: Inter, Inconsolata, compact density and 14px/20px UI baseline.
- Standardise: seven semantic roles, weight names, line-height mappings and family fallbacks.
- Fix: repeated local font declarations, arbitrary size/line-height pairs and sub-12px meaningful content.
- Elevate: responsive large-role hierarchy and clearer distinction between reading, interface and technical text.
- Deprecate later: component-local type scales and generic size-only tokens after usage reaches zero.

## Migration gate

After approval:

1. Define the canonical responsive scale and primitive tokens.
2. Map current `--type-scale-*` variables into semantic roles.
3. Generate CSS and TypeScript contracts.
4. Pilot navigation, form controls, table and modal typography.
5. Validate desktop, narrow viewport and 200% zoom.
6. Migrate the remaining components by role rather than by raw size.
