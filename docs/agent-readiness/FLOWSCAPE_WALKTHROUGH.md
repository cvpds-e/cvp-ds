# Flow/SCAPE connection walkthrough

This guide takes an engineer from a clean checkout to a verified Flow/SCAPE connection for the CVP Design System MCP server.

The repository side is ready. Flow/SCAPE's MCP registration location, secret-management mechanism, and deployment ownership are platform-specific; the responsible platform team must supply those values where this guide marks them as required inputs.

## Outcome

At the end of this walkthrough, Flow/SCAPE should:

1. start the CVP MCP server as a local child process;
2. discover six read-only design-system tools;
3. use those tools to select approved assets and classify gaps;
4. inspect a prototype only inside an explicitly allowed workspace;
5. retain an auditable acceptance record.

## 1. Collect the required inputs

Before configuring Flow/SCAPE, record these values:

| Input | Example | Owner |
| --- | --- | --- |
| Design System checkout | `/opt/cvp-design-system` | Design System Engineering |
| Prototype workspace | `/workspaces/cvp-prototypes` | Product Engineering |
| Node.js executable | `/usr/local/bin/node` | Runtime/Platform Engineering |
| Flow/SCAPE MCP registration location | Platform-specific | Flow/SCAPE Platform |
| Runtime identity | Service or developer identity | Security/Platform |
| Log destination and retention | Platform-specific | Security/Platform |

Use absolute paths. The runtime identity needs read access to the Design System checkout and prototype workspace. The current MCP server does not require write access.

## 2. Prepare and verify the checkout

```bash
git clone https://github.com/cvpds-e/cvp-ds.git /opt/cvp-design-system
cd /opt/cvp-design-system
npm ci
npm run verify:agent
npm audit
```

Expected result:

- agent-readiness validation passes;
- public API type checking passes;
- token governance passes;
- unit and MCP protocol tests pass;
- the production build succeeds;
- the dependency audit reports zero known vulnerabilities.

For a reproducible integration, pin the checkout to an approved commit or release instead of following `main` implicitly. Record that revision in the acceptance evidence.

## 3. Verify the server entry point

Run the server from the Design System checkout:

```bash
CVP_MCP_WORKSPACE_ROOT=/workspaces/cvp-prototypes npm run mcp:start
```

The process waits silently for MCP messages on standard input. That is expected. Stop the manual check with `Ctrl+C`.

Do not wrap this command with tooling that writes banners or logs to standard output. MCP reserves standard output for protocol messages; operational logs must go to standard error.

## 4. Register the MCP server in Flow/SCAPE

Translate the following values into Flow/SCAPE's MCP server registration format:

```json
{
  "mcpServers": {
    "cvp-design-system": {
      "command": "/usr/local/bin/node",
      "args": [
        "/opt/cvp-design-system/src/agent/mcp/server.mjs"
      ],
      "env": {
        "CVP_MCP_WORKSPACE_ROOT": "/workspaces/cvp-prototypes"
      }
    }
  }
}
```

Required invariants, regardless of Flow/SCAPE's configuration envelope:

- `command` resolves to Node.js 20 or newer;
- the first argument is the absolute path to `server.mjs`;
- `CVP_MCP_WORKSPACE_ROOT` is an absolute path to the smallest workspace the server needs to inspect;
- the process is launched using stdio transport;
- no shell interpolation is needed;
- the server is registered as `cvp-design-system` or another stable, documented identifier.

Restart or reload the Flow/SCAPE agent runtime after changing its MCP configuration.

## 5. Confirm tool discovery

Open Flow/SCAPE's MCP/tool inspector or start a development agent session and confirm that the following tools appear:

| Tool | Expected purpose |
| --- | --- |
| `search_components` | Find approved components by intent or vocabulary. |
| `search_patterns` | Find approved composition patterns. |
| `get_component_contract` | Read lifecycle, source, fixtures, and pattern usage. |
| `classify_design_system_gap` | Classify a requirement as covered, partial, or a gap. |
| `validate_prototype_provenance` | Validate an in-memory provenance document. |
| `report_prototype_compliance` | Inspect a prototype inside the allowed workspace. |

All six tools must be reported as read-only and non-destructive. If the tools do not appear, use the troubleshooting section before continuing.

## 6. Run the acceptance walkthrough

Use a prototype directory inside `CVP_MCP_WORKSPACE_ROOT`. The repository includes `templates/react-typescript` as a known compliant fixture; for a Flow/SCAPE-hosted test, copy that template into the allowed prototype workspace through your normal engineering workflow.

Ask the connected agent:

> Create an Editorial CMS page for managing rails. Before writing code, use the CVP Design System tools to find an approved management pattern and suitable components for search, filtering, status, and creating a rail. Classify a visual scheduling grid separately if it is unsupported. After generation, validate provenance and report prototype compliance.

Verify the tool sequence in Flow/SCAPE's trace or audit view:

1. `search_patterns` is called for the management workflow.
2. `search_components` is called for required controls.
3. `get_component_contract` is called for the selected assets.
4. `classify_design_system_gap` is called for the scheduling grid.
5. `validate_prototype_provenance` is called with the generated provenance document.
6. `report_prototype_compliance` is called with a directory inside the configured workspace.

Expected functional evidence:

- the approved `management-list-workspace` pattern is considered;
- returned reusable assets have lifecycle `approved`;
- the scheduling requirement is not silently represented as an approved asset;
- provenance contains the Design System revision and assets used;
- the compliance result contains `compliant`, `usedAssets`, and `diagnostics` fields;
- any manual accessibility work remains explicitly unresolved rather than being claimed as complete.

The precise generated screen may vary. Acceptance is based on tool use, lifecycle accuracy, provenance, containment, and validation evidence—not on identical prose or layout.

## 7. Test the security boundary

Ask Flow/SCAPE to call `report_prototype_compliance` with a path outside the configured workspace, such as `..`.

Expected result: the tool returns an error stating that the target must resolve inside the configured workspace root. Flow/SCAPE must not retry with broader filesystem permissions.

Also confirm:

- the runtime identity cannot write to the Design System checkout;
- secrets are not passed in prompts or logged tool arguments;
- the workspace root is not `/`, a home directory, or a shared parent containing unrelated repositories;
- no mutation, Git, publishing, or dependency-installation tools are exposed by this MCP server.

## 8. Capture the acceptance record

Store the following with the team's normal engineering evidence:

- Design System Git commit or release;
- Node.js version;
- Flow/SCAPE runtime/environment version;
- sanitized MCP registration, with secrets omitted;
- discovered tool list;
- acceptance prompt;
- tool-call trace and results;
- compliance report;
- security-boundary test result;
- engineer, date, and reviewer;
- defects, missing metadata, or weak search matches found during the run.

Do not store credentials, access tokens, user content, or sensitive filesystem paths unless the approved audit policy permits them.

## Troubleshooting

### Server disconnects immediately

- Run `node --version`; version 20 or newer is required.
- Run the absolute `server.mjs` path directly and inspect standard error.
- Run `npm ci` in the Design System checkout.
- Confirm the Flow/SCAPE process identity can read the checkout.

### No tools are discovered

- Confirm Flow/SCAPE is configured for an MCP stdio server, not HTTP.
- Confirm `command` and every file path are absolute.
- Remove shell wrappers that print to standard output.
- Reload the agent runtime after configuration changes.
- Run `npm test -- --run src/agent/mcp/server.test.ts` to isolate the repository from the platform configuration.

### Compliance scan fails with a workspace error

- Confirm the target exists before calling the tool.
- Resolve symlinks and ensure the real target remains below `CVP_MCP_WORKSPACE_ROOT`.
- Use the narrow prototype workspace as the root; do not broaden it to bypass the containment check.

### Search results are incomplete

- Try product intent and synonyms rather than only an implementation name.
- Check the component and pattern registries for missing aliases, tags, intents, or constraints.
- Record the failed query in the acceptance evidence so the registry can be improved from observed use.

## Production enablement checklist

The proof of concept can be accepted when every item below has an owner and evidence:

- [ ] A Design System revision is pinned and has passed CI.
- [ ] Flow/SCAPE discovers exactly the intended read-only tools.
- [ ] The representative workflow completes with traceable approved assets.
- [ ] Unsupported requirements are classified explicitly.
- [ ] Provenance validation and compliance reporting run successfully.
- [ ] Workspace traversal is rejected.
- [ ] Runtime identity follows least privilege.
- [ ] Audit collection and redaction are approved.
- [ ] Rollout, rollback, and version-update responsibilities are assigned.
- [ ] Any future mutation capability has a separate human-approval design.

After this checklist passes in development, repeat the same acceptance walkthrough in the controlled pre-production Flow/SCAPE environment before wider rollout.
