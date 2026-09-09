# CVP Design System Agent Readiness

This directory defines the repository contract consumed by people, automation, and future agent tooling.

## Canonical sources

| Concern | Canonical source |
| --- | --- |
| Runtime token values and aliases | `src/styles/token-registry.json` |
| Component identity, classification, lifecycle, and discovery | `src/agent/registry/components.json` |
| Supported compositions | `src/agent/registry/patterns.json` |
| Generated prototype provenance | `src/agent/schemas/prototype-provenance.schema.json` |
| Public implementation API | `src/design-system/index.ts` |
| Detailed human guidance | Component documentation and engineering handoffs |

If two sources disagree, the machine-readable source named above controls its concern. Detailed guidance must link back to the relevant registry ID.

## Lifecycle

- `approved`: reviewed and permitted in prototypes and production.
- `candidate`: reusable proposal awaiting design-system review.
- `local`: product-specific implementation that is not proposed for reuse.
- `deferred`: known implementation outside the approved baseline.
- `deprecated`: supported temporarily with a documented replacement.
- `internal`: documentation, testing, or implementation utility; never a public export.

Lifecycle is independent of classification. A `pattern` can be approved while remaining outside the base component package.

## Classifications

- `component`: reusable, CVP-styled UI building block.
- `pattern`: governed composition of components for a recurring workflow.
- `page`: product-level or acceptance-test page composition.
- `utility`: internal implementation or documentation support.

## Required behavior for agent consumers

1. Search the component and pattern registries before generating UI.
2. Prefer `approved` assets and report any use of another lifecycle.
3. Never represent `internal`, `deferred`, or `candidate` assets as approved.
4. Record the registry version and Git commit in prototype provenance.
5. Run `npm run agent:check` and the normal project build before claiming compliance.
6. Treat accessibility manual checks as unresolved until a person records them.
7. Require human approval before changing an asset's lifecycle or public export status.

Deterministic discovery, gap classification, provenance, and compliance commands are documented in `docs/agent-readiness/TOOLS.md`.

## Validation

Run the complete repository gate:

```bash
npm run verify:agent
```

The gate formally validates all JSON schemas and registries, checks source/documentation paths, unique IDs, public exports, pattern dependencies, and component coverage, compiles the public TypeScript API, enforces registered token use in approved component stylesheets, and runs the production build.
