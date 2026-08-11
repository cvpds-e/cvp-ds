# CVP Design System Foundation Assessment

Status: Historical architecture assessment
Date: 2026-08-04

> **Historical context:** This assessment predates the active token implementation. Current token ownership, values, and documentation are defined by [`TOKEN_CATALOG.md`](../../tokens/TOKEN_CATALOG.md), [`CVP_TOKEN_ARCHITECTURE.md`](../../tokens/CVP_TOKEN_ARCHITECTURE.md), and the runtime CSS token files.

## 1. Executive conclusion

The current CVP project can be restructured without losing its visual identity. Its dark, operational, media-focused character should remain the baseline. The supplied foundation system should be used as an architectural and quality model, not as a replacement theme.

The project already contains useful token architecture work, but that architecture is not yet the runtime source of truth. Legacy tokens, generic theme variables, imported CSS, documentation-only definitions, inline styles, and newer CVP token files coexist. The immediate goal is therefore consolidation and traceability, not visual reinvention.

Recommended target flow:

```text
Foundation decisions
  -> primitive tokens
  -> semantic tokens
  -> optional component override contracts
  -> React components and layout recipes
  -> visual catalogue and developer documentation
```

## 2. Material reviewed

### Existing CVP project

- React, TypeScript and Vite application from `CVP Design System (Jul '26).zip`
- 244 archived files
- 89 custom component and documentation TSX files
- 46 generic UI primitive TSX files
- Existing token architecture, governance, inventory, audit and implementation-status documents
- Existing light and dark visual references
- Primitive, semantic, component and compatibility CSS token files

### Foundation system

- Color
- Typography
- Spacing
- Radius
- Border
- Elevation
- Layout
- Motion
- Accessibility protocols, developer-handoff contracts, knowledge bases, guides, prompt packs and Figma source files
- AI-ready design-system roadmap

## 3. Current-state findings

### 3.1 Strong material worth preserving

- The product has a recognisable CVP visual language: dark operational surfaces, restrained blue emphasis, compact information density, media-centric workflows and low-distraction chrome.
- Light and dark visual references already exist.
- The project already describes a three-tier token model and a compatibility bridge.
- Many components have dedicated documentation views.
- Existing documents already anticipate governance, audit, AI contracts, Storybook and visual regression.
- Component coverage is broad enough to evolve rather than rebuild from zero.

### 3.2 Structural problems

- The intended CVP primitive, semantic and component token files are not imported by the current main stylesheet.
- The implementation-status document says the component migration has not started.
- Multiple token vocabularies coexist, including CVP tokens, legacy `--tc-*` tokens, generic theme variables, documentation-specific tokens and component-local variables.
- Roughly 3,066 hardcoded hex occurrences exist across 86 CSS/TS/TSX files.
- 61 custom component files contain inline style objects.
- Documentation, implementation and imported reference material are mixed inside the runtime source tree.
- Generic UI primitives and custom CVP components overlap without a clearly documented ownership boundary.
- Several existing architectural documents describe an intended future state as though it were already active.

### 3.3 Primary risk

The largest risk is not an individual bad colour or spacing value. It is having several plausible sources of truth. A developer or AI tool can currently select a valid-looking value from the wrong layer and still produce code that appears correct locally.

## 4. Proposed architecture

### 4.1 Canonical layers

| Layer | Responsibility | May contain | Must not contain |
|---|---|---|---|
| Foundation scales | Raw measurable progressions where a foundation requires them | Numeric steps, breakpoint values | UI roles or component names |
| Primitives | Brand and raw design values | Colour values, dimensions, type values, curves | Product usage intent |
| Semantics | Purpose and behaviour | Surface, text, action, spacing relationship, text role, layout role | Raw values or component-specific exceptions |
| Component contracts | Intentional component override API | Aliases to semantic tokens | Raw values or a duplicate semantic vocabulary |
| Usage | Components, recipes and layouts | Semantic or approved component tokens | Primitives and arbitrary values |

### 4.2 Reconciliation with the foundation model

The supplied foundations generally define two layers: primitives and semantics, with usage above them. Typography and Layout add scale/style layers where needed; Motion adds accessibility mode overrides.

CVP's component-token tier should remain because the project explicitly targets customer and partner theming. It must, however, follow these constraints:

1. A component token exists only when a stable override surface is needed.
2. It aliases an approved semantic token.
3. It does not introduce raw values.
4. It is documented with the component API.
5. Components without override requirements consume semantic tokens directly.

This makes the third tier an interface boundary rather than another source of design meaning.

### 4.3 Source-of-truth policy

- Machine-readable token data becomes authoritative for token names, values, modes and aliases.
- CSS, TypeScript types, documentation tables and audit inputs are generated or validated from that data.
- Figma variables use the same conceptual names and mappings.
- Component documentation owns component behaviour, anatomy, states and accessibility.
- Knowledge-base documents explain intent but do not independently redefine values.
- Imported research and historical CSS remain reference-only and cannot be imported into production bundles.

## 5. Foundation decisions

### Color

Preserve CVP's Royal Blue/Periwinkle identity and its dark operational surfaces. Rebuild the palette and light/dark role mappings using the supplied property-and-intent model. Explicitly document surfaces, foregrounds, borders, icons, focus, interaction states, status intent, valid pairings and invalid pairings.

The supplied default blue values are references, not replacements for CVP colours.

### Typography

Replace the scattered scale and component-specific type variables with role-based typography. Preserve CVP's compact product density, but distinguish interface labels, body content, headings, metadata and technical/data text. Responsive scaling should live in tokens, not local component media-query exceptions.

Font selection remains a product decision. The template's font families are not automatically adopted.

### Spacing

Retain the compact operator-console character. Use semantic relationship families such as stack, inline, inset, gap, section and container. Density should be an intentional mode or recipe rather than a collection of local small paddings.

### Radius

Preserve CVP's relatively restrained, technical geometry. Map controls, surfaces, overlays and fully rounded elements to semantic roles. Nested and connected-corner rules should remove visually inconsistent local rounding.

### Border

Treat borders as structural and interactive signals, not decoration. Border colour belongs to Color; Border Foundation owns widths/styles and their semantic functions. This prevents colour and border specifications from defining the same decision twice.

### Elevation

Unify surface depth, border support, shadow styles and overlay behaviour. CVP's dark UI often communicates depth through subtle surface changes and borders, so shadows should reinforce hierarchy rather than imitate a bright consumer UI.

### Layout

Formalise the current application-shell, navigation, side-pane, main-workspace and overlay patterns. Use four responsive tiers and explicit collapse/stack/overlay behaviour, adapted to CVP's data-dense desktop workflows. Mobile support should preserve core tasks rather than shrink the desktop composition.

### Motion

Replace arbitrary transitions with intent-based motion for enter, exit, replace, feedback, emphasis, loading and attention. Implement reduced-motion modes from the start. CVP motion should remain restrained and operational, with animation used to explain state or spatial change.

## 6. Dependency order

Recommended implementation order:

1. Color
2. Typography
3. Spacing
4. Radius
5. Border
6. Elevation
7. Layout
8. Motion

This is not a claim that each foundation is independent. Color and Spacing begin first because they unlock the largest number of component corrections. Border depends on Color. Elevation depends on Color and Border. Layout consumes Spacing. Motion should be applied after component state models are stable, while its reduced-motion contract should be established early.

## 7. Repository target

```text
src/
  foundations/
    tokens/              canonical machine-readable token sources
    generated/           generated CSS and TypeScript outputs
    contracts/           schemas and validation rules
  components/
    primitives/          low-level accessible building blocks
    cvp/                 product components and recipes
  patterns/              composed product workflows
  docs/                  visual catalogue application
  legacy/                temporary compatibility layer only
tests/
  accessibility/
  tokens/
  visual/
docs/
  foundations/
  components/
  decisions/
  migration/
```

Exact paths should be adjusted to the existing Vite application during implementation. The important change is the separation of runtime source, generated assets, documentation, historical references and compatibility code.

## 8. Visual catalogue and developer handoff

Each component entry should eventually include:

- Interactive example
- Variants and sizes
- Light and dark themes
- Default, hover, pressed, selected, focus, disabled, loading, error and empty states where relevant
- Responsive and density modes
- Reduced-motion behaviour
- Anatomy and composition
- Semantic and component-token usage
- Props and event contract
- Keyboard behaviour and accessibility requirements
- Do/avoid guidance
- Migration status
- Figma mapping
- Visual regression snapshots

The existing documentation application can become this catalogue. Storybook can be added later if isolated testing, controls and external developer consumption justify it; it is not required to begin the foundation migration.

## 9. Color-first migration plan

### Phase C0 - Freeze and inventory

- Treat current production visuals as regression references.
- Inventory every colour declaration and variable use.
- Classify each occurrence by property, intent, state, theme and component.
- Identify undocumented or contradictory values.

### Phase C1 - Approve the CVP color model

- Confirm brand and supporting palettes.
- Confirm surface depth for both themes.
- Confirm status intents and action states.
- Confirm focus treatment.
- Approve semantic naming and component-override policy.
- Produce pairing and invalid-pairing tables.

### Phase C2 - Build canonical tokens

- Create canonical token data.
- Generate or validate CSS and TypeScript outputs.
- Add compatibility aliases for legacy tokens.
- Ensure the runtime imports one ordered token entry point.

### Phase C3 - Pilot components

Recommended pilots:

1. Primary Button - action states, foreground pairing and focus
2. Text Input/Select - surface, border, placeholder, error, disabled and focus
3. Modal - layering, overlay, elevated surface and inverse pairing

These cover the widest variety of colour decisions with limited migration scope.

### Phase C4 - Validate

- Automated contrast checks for required pairings
- Keyboard and focus review
- Both themes
- Forced-colours/high-contrast review where applicable
- Visual regression against the preserved CVP baseline

### Phase C5 - Expand and retire

- Migrate remaining components in dependency groups.
- Block new hardcoded values.
- Deprecate legacy aliases with usage data and migration notes.
- Remove the bridge only after zero production references remain.

## 10. Change classification

Every material decision should be labelled:

| Classification | Meaning |
|---|---|
| Preserve | Existing CVP decision is intentional and becomes canonical |
| Standardise | Existing variants become one governed rule |
| Fix | Correct an accessibility, implementation or behavioural defect |
| Elevate | Improve hierarchy or polish without changing product identity |
| Deprecate | Keep temporarily with a documented replacement |
| Replace | Remove only when the existing pattern cannot meet requirements safely |

## 11. Approval gates

No broad component rewrite should begin until these decisions are approved:

1. CVP brand palette and product-theme direction
2. Canonical token naming format
3. Component override policy for customer theming
4. Font-family decision
5. Default density and supported density modes
6. Browser/platform support expectations
7. Whether Figma or repository token data is operationally authoritative, and how synchronization is governed

## 12. Immediate recommendation

Proceed with Color Phase C0 and C1. Do not yet migrate every component or replace the current token files. First produce the exact legacy-to-target colour map and an approval board showing CVP dark/light surfaces, foreground pairings, interaction states, status colours and focus treatment.

This gives the team a visible, testable decision point before implementation changes propagate through the system.
