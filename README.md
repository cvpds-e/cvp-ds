# CVP Design System

## Get started

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Repository map

| Area | Purpose |
| --- | --- |
| [`src/app`](src/app) | Application shell, component implementations, and component documentation views |
| [`src/styles/tokens`](src/styles/tokens) | Canonical primitive, semantic, component, and compatibility token CSS |
| [`src/styles/themes`](src/styles/themes) | Active light/dark theme mappings and framework theme defaults |
| [`docs/specifications`](docs/specifications) | Canonical design-system specifications and component inventory |
| [`docs/tokens`](docs/tokens) | Token architecture, contracts, governance, and decision guidance |
| [`docs/handoffs`](docs/handoffs) | Engineering entry point, component handoffs, and readiness checkpoints |
| [`docs/assessments`](docs/assessments) | Foundation and accessibility assessments with visual previews |
| [`docs/figma`](docs/figma) | Figma implementation guidance |
| [`docs/project`](docs/project) | Project implementation status |
| [`scripts`](scripts) | Repository analysis and maintenance tooling |
| [`reports`](reports) | Generated audit results |

Start engineering implementation from the [Engineering Handoff Index](docs/handoffs/ENGINEERING_HANDOFF_INDEX.md). For the complete documentation map, see [docs/README.md](docs/README.md).

## Token entry points

The runtime token graph is loaded through `src/styles/index.css`:

1. [`cvp-primitives.css`](src/styles/tokens/cvp-primitives.css) — Tier 1 raw values
2. [`cvp-semantic-tokens.css`](src/styles/tokens/cvp-semantic-tokens.css) — Tier 2 theme-aware roles
3. [`cvp-component-tokens.css`](src/styles/tokens/cvp-component-tokens.css) — Tier 3 component contracts
4. [`cvp-alias-bridge.css`](src/styles/tokens/cvp-alias-bridge.css) — compatibility aliases

See the [Token Architecture](docs/tokens/CVP_TOKEN_ARCHITECTURE.md) before adding or changing a token.
