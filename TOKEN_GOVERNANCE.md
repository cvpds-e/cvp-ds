# CVP Token Governance

Operational handbook for the CVP (Cloud Video Platform) design token system. Covers ownership, proposal and review process, versioning, deprecation, lint enforcement, and compliance requirements.

Implementation files: `src/styles/cvp-primitives.css`, `src/styles/cvp-semantic-tokens.css`, `src/styles/cvp-component-tokens.css`.

---

## Token Ownership

| Tier | Owner | Required Reviewers |
|---|---|---|
| Primitive | Design Systems team | Design lead + Engineering lead |
| Semantic | Design Systems team | Design lead + Engineering lead |
| Component | Feature team (per component) | Design Systems team |
| Customer override | Customer / Partner | Automated contrast check + spot audit |

Ownership means the named party is accountable for correctness, documentation, and deprecation lifecycle. It does not mean only that team may open a PR — any contributor may propose a token, but the owning team holds approval authority.

---

## Introducing New Tokens

Every proposal must be submitted as a PR that satisfies all six gates before a reviewer may approve it.

1. **Justification.** Explain specifically why no existing token satisfies the requirement. Reference the token registry search you performed and the nearest candidate you considered.

2. **Category placement.** State the tier (primitive / semantic / component) and the category within that tier (e.g., `color.surface`, `spacing`, `typography.size`). Placement must be consistent with the architectural rationale in `CVP_TOKEN_ARCHITECTURE.md`.

3. **Both-theme values.** Light and dark values must both be defined and committed before the PR is eligible for merge. A token that exists in one theme but not the other is a blocking defect.

4. **WCAG validation.** Provide a contrast ratio table covering every token pair where this token will appear as foreground-on-background or vice versa. See the WCAG Compliance Requirements section for thresholds.

5. **Documentation.** An entry in `DESIGN.md` (name, tier, intended usage, do/do-not examples) and a Storybook story demonstrating the token in context must both be present before the PR ships.

6. **Migration note.** If the new token supersedes an existing token, include: the name of the deprecated token, the replacement mapping, and the target release for removal.

---

## Review Process

### Standard flow

1. Author opens a PR against `main` targeting the appropriate implementation file.
2. CI runs the Stylelint token registry check and WCAG contrast script automatically. Both must pass before human review begins.
3. The owning team assigns at minimum one reviewer from each required-reviewer group listed in the ownership table.
4. Reviewers check: naming consistency with the existing taxonomy, correct file placement, presence of both theme values, completeness of documentation, and accuracy of the WCAG table.
5. Design Systems team reviewer left-approves after documentation and naming are confirmed. Engineering lead reviewer left-approves after implementation correctness is confirmed. Both approvals are required to merge.

### Escalation

If design and engineering reviewers reach an impasse, the **Design Systems lead** holds final authority. This authority is intentionally singular to avoid indefinite blocking: the Design Systems lead is accountable for system coherence and is the tiebreaker by default. Either party may request escalation; the lead must respond within two business days. Decisions made under escalation are recorded as a comment on the PR and summarized in `CHANGELOG.md`.

### Expedited review

Security patches and critical contrast corrections may request an expedited review. The author marks the PR `priority: critical`, notifies the Design Systems team channel directly, and a single combined approval (one reviewer satisfying both groups) is acceptable for patch-level changes only.

---

## Versioning

CVP tokens follow semantic versioning. The version is recorded in `CHANGELOG.md` and tagged on the repository.

| Increment | Trigger | Migration guide required |
|---|---|---|
| Patch `1.0.x` | Value correction without renaming | No |
| Minor `1.x.0` | New tokens added; no existing tokens changed or removed | No |
| Major `x.0.0` | Tokens renamed, removed, or structurally reorganized | Yes |

A migration guide for a major release must be committed to the repository before the release tag is created. It must list every renamed or removed token, its replacement (or explicit statement that there is none), and a sed / codemod command or script that automates the update where one is feasible.

---

## Deprecation Process

1. The token is marked `@deprecated` in a CSS comment on the same line as the custom property declaration, with a pointer to the replacement token and the target removal release. Example:

   ```css
   --cvp-color-brand-legacy: #0057ff; /* @deprecated use --cvp-color-interactive-primary; removal in v4.0.0 */
   ```

2. The deprecated token remains in `src/styles/cvp-semantic-tokens.css` (or its originating file) for a minimum of two minor releases, equivalent to approximately six to eight weeks under the standard release cadence.

3. A custom Stylelint rule (see Lint Enforcement) emits a warning for any usage of the deprecated token in the codebase. The warning is non-blocking during the grace period and becomes an error after the grace period closes.

4. The token is removed in the next major release following expiry of the grace period.

---

## Lint Enforcement

A Stylelint plugin enforces two invariants: all `--cvp-` custom properties must appear in the approved token registry, and deprecated tokens emit warnings (or errors, after grace period).

Minimal `.stylelintrc.json` configuration:

```json
{
  "plugins": ["stylelint-plugin-cvp-tokens"],
  "rules": {
    "cvp-tokens/no-unregistered-token": [true, {
      "registryPath": "src/styles/token-registry.json",
      "severity": "error"
    }],
    "cvp-tokens/no-deprecated-token": [true, {
      "registryPath": "src/styles/token-registry.json",
      "severity": "warning"
    }]
  }
}
```

`token-registry.json` is generated automatically from `cvp-primitives.css`, `cvp-semantic-tokens.css`, and `cvp-component-tokens.css` by the `scripts/build-token-registry.js` script, which runs as part of CI and as a pre-commit hook. Any `--cvp-` property not present in the generated registry causes a lint error and blocks merge.

---

## WCAG Compliance Requirements

All token pairs that represent foreground-on-background combinations must meet the following thresholds before a token is approved for production.

| Context | Minimum (required) | Target (expected for new work) |
|---|---|---|
| Body text, labels, captions | AA (4.5:1) | AAA (7:1) |
| Large text (18 pt / 14 pt bold) | AA (3:1) | AA (3:1) |
| Primary interactive elements (buttons, links, focus rings) | AA (4.5:1) | AAA (7:1) |
| Non-text UI components (icons, input borders, dividers) | AA non-text (3:1) | AA non-text (3:1) |
| Disabled states | Exempt | Exempt |

AAA is the target, not merely aspirational: any new primitive or semantic color token introduced for interactive use that fails to reach 7:1 against its intended background must be documented with an explicit rationale for the exception, approved by the Design Systems lead, and logged in `CHANGELOG.md`.

Contrast ratios must be computed against all surfaces the token is expected to appear on, including the light theme default surface, dark theme default surface, and any elevated or overlay surfaces defined in `cvp-semantic-tokens.css`.

---

## Preventing Duplication

Before proposing any token:

1. Search the token registry at `src/styles/token-registry.json` and the live Storybook catalogue for an existing token that meets the need.
2. Determine whether a component-level token override in `cvp-component-tokens.css` satisfies the requirement without promoting to a semantic token.
3. If both checks pass and no existing token suffices, proceed to the proposal process above.

The Stylelint `cvp-tokens/no-unregistered-token` rule is the automated backstop: it will reject any `--cvp-` property not in the registry, catching duplicate proposals that use novel names for existing concepts.

---

## Documentation Requirements

| Artifact | Purpose | Updated by |
|---|---|---|
| `DESIGN.md` | Single source of truth for token specifications and usage guidance | Token author, required before merge |
| Storybook | Live catalogue with token arg tables and theme switching | Token author, required before merge |
| `CHANGELOG.md` | Version history for every token change | Token author, required before merge |
| `CVP_TOKEN_ARCHITECTURE.md` | Architectural rationale and tier definitions | Design Systems team on structural changes |

`DESIGN.md` and Storybook are co-equal requirements. A token that is specified but not demonstrable, or demonstrable but not specified, is considered incomplete.
