# MCP adapter for Flow/SCAPE

The repository exposes a local, read-only MCP server over stdio. It is a protocol adapter over the deterministic design-system tools; it does not duplicate registry or governance logic.

## Run locally

```bash
npm install
npm run mcp:start
```

Example host configuration:

```json
{
  "mcpServers": {
    "cvp-design-system": {
      "command": "node",
      "args": ["/absolute/path/to/CVP Design System/src/agent/mcp/server.mjs"],
      "env": {
        "CVP_MCP_WORKSPACE_ROOT": "/absolute/path/to/allowed/prototype/workspace"
      }
    }
  }
}
```

The exact Flow/SCAPE configuration envelope may differ. Keep the command, arguments, and workspace environment variable equivalent when translating it to the platform's MCP registration format.

## Exposed tools

- `search_components`
- `search_patterns`
- `get_component_contract`
- `classify_design_system_gap`
- `validate_prototype_provenance`
- `report_prototype_compliance`

All tools are declared read-only and idempotent. The compliance tool can read only a real path contained by `CVP_MCP_WORKSPACE_ROOT`; this also prevents `..` and symlink traversal outside that boundary. No file-writing, publishing, package installation, or Git operations are exposed.

## Recommended agent sequence

1. Search patterns and components for the requested intent.
2. Read contracts for the proposed assets.
3. Classify any unsupported requirement before generating it.
4. Generate the prototype through the host's controlled workspace tools.
5. Validate provenance and run the compliance report.

## Platform decisions still required

Before remote or organization-wide deployment, Flow/SCAPE owners need to define:

- process ownership and the deployment target;
- user/workload identity and authorization policy;
- the allowed prototype workspace mapping;
- audit-log collection, retention, and redaction;
- version pinning and rollout/rollback policy;
- approval gates for any future mutation-capable tools.

Mutation tools should be introduced as a separate capability set after those controls are agreed, rather than added to this read-only server by default.
