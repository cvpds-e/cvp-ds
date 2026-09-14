# Agent readiness roadmap

## Foundation — implemented in this change

- Canonical component and pattern registries
- Explicit lifecycle and classification vocabulary
- Approved component source export surface
- Prototype provenance schema
- Candidate manifest and repository boundaries
- Repository consistency validator

## Verification infrastructure — next

- ✅ Public TypeScript API check and CI gate
- ✅ Initial approved-component token-governance gate
- ✅ Formal JSON Schema validation
- Expand ESLint and Stylelint rules beyond the approved component surface
- Interaction and keyboard tests
- ✅ Initial interaction and keyboard test infrastructure
- ✅ Machine-readable isolated fixture catalog
- ✅ Light/dark and responsive visual-regression workflow
- Consumer-package build and smoke test
- Customer-theme contrast validation

## Composition and prototyping

- Expand pattern recipes from five initial workflows
- ✅ Add a versioned React/TypeScript prototype scaffold
- Generate provenance during prototype creation
- ✅ Generate and validate prototype provenance
- ✅ Add deterministic component and pattern search
- ✅ Add deterministic gap classification
- ✅ Add compliance and deviation reports

## Governed evolution

- Pull-request and decision-record templates
- Code ownership and required human approvals
- Semantic versioning, changelog, and deprecation automation
- Candidate promotion and rejection checks

## Flow/SCAPE integration boundary

- Expose registry search, contract retrieval, validation, gap classification, and candidate packaging as bounded tools
- Configure identity, authorization, approval interrupts, audit logs, observability, runtime isolation, and model access in the platform layer
- Evaluate with approved-component, candidate, local, deprecated, accessibility-failure, and iterative-edit scenarios
