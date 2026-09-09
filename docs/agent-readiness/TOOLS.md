# Deterministic Design System tools

The repository exposes stable JSON commands that can be used directly in development environments and wrapped by a future MCP/Flow adapter. The model is not responsible for inventing lifecycle, provenance, or validation results.

## Commands

```bash
npm run ds:tool -- search-components "filter a collection by date"
npm run ds:tool -- search-patterns "search filter and edit records"
npm run ds:tool -- get-component segmented
npm run ds:tool -- classify-gap "visual scheduling grid for channels"
npm run ds:tool -- create-provenance --approved primary-button,text-input --patterns create-edit-modal --output cvp-provenance.json
npm run ds:tool -- validate-provenance ./cvp-provenance.json
npm run ds:tool -- report-compliance ./prototype-directory
```

All commands return the same envelope:

```json
{
  "ok": true,
  "data": {},
  "diagnostics": []
}
```

Failures set a non-zero exit code. Search defaults to approved assets only. Contract results include source traceability, fixtures, public status, and pattern usage. Gap classification is deterministic and conservative: partial or unknown vocabulary cannot be promoted to approved coverage by model judgment.

## Platform integration

Flow/SCAPE should wrap functions from `src/agent/tools/design-system-tools.mjs`, rather than parsing CLI text. Identity, authorization, mutation approvals, audit logs, and observability remain platform responsibilities.

Recommended read-only MCP operations map directly to `searchComponents`, `searchPatterns`, `getComponentContract`, `classifyGap`, `validateProvenance`, and `reportCompliance`. `createProvenance` may write only to the active prototype workspace. Canonical registry, lifecycle, candidate promotion, and public-export changes remain approval-gated repository mutations.
