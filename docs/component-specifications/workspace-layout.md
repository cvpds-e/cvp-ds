---
assetId: workspace-layout
classification: pattern
lifecycle: approved
specificationStatus: draft
---
# Workspace Layout

## Purpose

Compose operational pages using the shared application shell, split panes,
scroll regions, dividers, and footer behavior.

## When to use

- Build Rail Manager or another settings-and-preview workspace.
- Reuse a consistent shell instead of duplicating page scaffolding.

Compose `GlobalHeader`, `Breadcrumb`, `Body`, `SidePanel`, `Main`, `PageHeader`,
`Toolbar`, and `Footer` slots as needed. Place `ResizeHandle` inside `Body` for
pointer-driven resizing. `Body` accepts initial side-panel width and minimum
and maximum pixel bounds. Provide meaningful labels for side-panel landmarks;
the page owns its responsive collapse/reopen behavior and action state.

## When not to use

- A simple content container or modal is sufficient.
- A consumer screen requires a different composition without operational panes.

See [implementation](../../src/app/components/WorkspaceLayout.tsx) and
[showcase](../../src/app/components/WorkspaceLayoutDocumentation.tsx).
