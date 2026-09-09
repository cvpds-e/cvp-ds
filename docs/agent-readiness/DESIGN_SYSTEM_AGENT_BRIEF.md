# CVP Design System Agent

## High-level product and engineering brief

**Status:** Working foundation complete; ready for Flow/SCAPE integration pilot

**Audience:** Product, Design, Engineering, Design System, Accessibility, and platform stakeholders

**Purpose:** Align the team on what we are trying to enable, why it matters, and what capabilities and safeguards are needed—without prescribing the final technical architecture.

---

## Executive summary

The CVP Design System is currently consumed mainly as a collection of components, tokens, patterns, and documentation. Using it well still depends on a person knowing what exists, where to find it, how elements should be combined, and which constraints apply.

The **CVP Design System Agent** initiative makes that system available as an internal product capability. An authorized Comcast user should be able to describe an interface or workflow in natural language and receive a runnable, editable prototype composed primarily from approved CVP Design System assets.

The ambition is not to generate UI that merely looks similar to a Comcast product. It is to make the Design System itself discoverable, composable, executable, and verifiable by an agent.

The repository now contains the first working foundation for this proposition: machine-readable component and pattern knowledge, explicit lifecycle and provenance contracts, deterministic discovery and validation, a governed prototype scaffold, automated quality gates, and a read-only MCP interface prepared for Flow/SCAPE integration. The next milestone is to prove the experience through a representative pilot in the supported platform environment.

The first release remains focused on internal prototyping and implementation starting points. It should accelerate product exploration while preserving human control over production decisions and changes to the canonical Design System.

> **North-star proposition:** Make the CVP Design System available as an internal product capability—not simply a library—so authorized teams can move from product intent to a compliant, runnable experience while people continue to govern the evolution of the system.

---

## At a glance

The Design System Agent is a shared capability, not a new destination that teams must visit. It makes the canonical Design System usable through development environments already supported by Comcast's agent platform.

```text
                     CVP DESIGN SYSTEM
        Components • Tokens • Patterns • Guidance
                              │
                              │ canonical knowledge
                              ▼
                  CVP DESIGN SYSTEM AGENT
          Discover • Compose • Generate • Validate
                              │
                              │ governed delivery
                              ▼
                       FLOW / SCAPE
             Context • Identity • Approval • Audit
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
          VS Code        Supported IDEs    Other approved
                                           agent clients
              │               │               │
              └───────────────┼───────────────┘
                              ▼
                  RUNNABLE, TRACEABLE OUTPUT
             Approved reuse • Explicit gaps • Evidence
```

In practical terms, a user expresses product intent in a supported environment. The agent draws on the Design System, produces an editable result, and returns evidence about what it used, what it validated, and where human judgment or a new capability is required.

The Design System side of this model is now executable through a local, read-only MCP server. The Flow/SCAPE connection, identity, approval, audit, and production runtime remain platform responsibilities to validate in the pilot. The diagram shows the intended responsibilities and flow of value without prescribing the final production architecture.

---

## Where the initiative stands today

The work has moved beyond concept definition. The current Design System repository provides a tested integration foundation:

| Capability now available | What it enables |
| --- | --- |
| A registry of 51 classified assets | Agents can distinguish approved, candidate, deferred, internal, and other lifecycle states. |
| Five governed composition patterns | Agents can start from supported product workflows rather than isolated components. |
| A registry of visual fixtures | Expected component appearances are tied to testable evidence. |
| 2,053 generated token definitions | Generated UI can refer back to canonical foundations instead of inventing visual values. |
| Public component exports and TypeScript validation | Agents and engineers have a defined implementation surface. |
| Provenance and candidate schemas | Outputs can record what they used and separate provisional work from approved assets. |
| Deterministic discovery, gap, and compliance tools | Important governance decisions do not depend on model judgment alone. |
| A read-only MCP server with six tools | Flow/SCAPE can consume the capability through a standard agent integration boundary. |
| Automated unit, protocol, build, token, and visual checks | Changes can be validated locally and through GitHub Actions before adoption. |

The latest foundation has passed the complete repository verification gate, the MCP protocol tests, the production build, the dependency audit, and 20 visual regression checks in GitHub Actions.

This is not yet the finished product experience. It is the smallest credible, governed substrate on which the Flow/SCAPE pilot can now be built and evaluated.

---

## The opportunity

Today, teams must translate a product requirement into several separate activities:

1. Discover relevant Design System components and patterns.
2. Interpret usage and accessibility guidance.
3. Assemble an experience in code.
4. Identify gaps or product-specific needs.
5. Validate the result and prepare it for review.

An agent can create a conversational entry point to those activities. This could reduce the time needed to explore an idea, make approved patterns easier to use, and reveal genuine system gaps earlier.

The agent would not replace the Design System or its maintainers. The Design System remains the source of truth; the agent becomes an intelligent interface to it.

```text
Product intent
     ↓
Design System Agent
     ↓
Discover approved assets and guidance
     ↓
Compose and generate
     ↓
Produce a runnable prototype
     ↓
Validate and explain the result
     ↓
Iterate with the user
```

---

## Who this is for

The initial audience is internal teams that need to explore, communicate, or begin implementing product experiences quickly.

| User group | Value provided |
| --- | --- |
| Product | Turn requirements and ideas into interactive prototypes for discussion and testing. |
| Engineering | Scaffold interfaces with known components, patterns, and constraints already represented. |
| Design | Explore compositions and accelerate repetitive Design System work. |
| Solutions and customer-facing technical teams | Demonstrate concepts while remaining recognizably aligned with the CVP product experience. |
| Design System maintainers | See recurring gaps, review well-prepared candidates, and improve adoption evidence. |

The MVP should optimize for **human-directed prototyping**, not autonomous production development.

---

## Experience vision

A user should be able to ask for an experience in the development environment they already use:

> Create an Editorial CMS page for managing rails. Include search, filters, status, and the ability to create a new rail.

The agent should then:

- interpret the product requirement;
- discover relevant approved components and patterns;
- explain the intended composition where useful;
- generate a runnable, editable prototype;
- identify which Design System assets were used;
- validate the result against available rules and checks;
- allow focused follow-up changes without rebuilding everything;
- call out any unmet requirement as a Design System gap.

A follow-up such as “add a visual scheduling interface” may expose a capability that does not exist. The agent can still help the prototype progress, but it should identify the new work as **candidate** or **local**, not silently present it as an approved component.

---

## Product principles

### The Design System is the authority

The agent should consume canonical components, tokens, patterns, usage guidance, accessibility contracts, and release information. When sources conflict, the system should surface the conflict rather than guess.

### Discover before generating

The agent should look for an approved component or composition before creating new UI. Reuse is a behavioral requirement, not merely a prompt suggestion.

### Compose before extending

Many apparent component gaps can be solved by combining existing capabilities. The agent should consider an approved pattern or composition before proposing a new reusable primitive.

### Be explicit about status

Users should be able to distinguish canonical Design System assets from provisional or product-specific work at all times.

### Validate claims with evidence

The agent should report checks and unresolved manual review items. It should not make unsupported claims that output is accessible, compliant, or production-ready.

### Keep people in control of system change

The agent may discover gaps and prepare contributions. Design and Engineering owners decide whether a proposal enters the canonical Design System.

### Meet users in existing workflows

The initial product should be a reusable capability available through supported Flow/SCAPE and MCP-enabled development environments. A dedicated UI should be introduced only if user needs justify one.

---

## Core capabilities

The product should ultimately provide six related capabilities. The exact service, tool, retrieval, and runtime boundaries remain engineering decisions.

### 1. Understand

Interpret product intent and relevant domain language, then connect it to Design System concepts such as components, patterns, states, density, responsive behavior, and accessibility needs.

### 2. Discover

Find suitable approved components and patterns by meaning and capability—not only by exact name. For example, “state indicator,” “label,” and “lifecycle” may map to different assets depending on the intended semantics.

### 3. Compose

Combine approved assets into coherent screens and workflows, including common loading, empty, error, partial-failure, responsive, and unsaved-change states.

### 4. Generate and iterate

Create runnable prototypes that teams can edit in their normal workflow. Follow-up requests should make focused, understandable changes and retain established context where appropriate.

### 5. Validate

Check generated output against available deterministic rules, such as public APIs, token use, lifecycle status, accessibility contracts, composition constraints, tests, builds, and visual fixtures.

### 6. Identify and prepare gaps

When approved capabilities are insufficient, explain why, identify the closest alternatives, and classify provisional work. Where a reusable gap exists, prepare evidence for human review rather than changing the Design System autonomously.

---

## What the Design System must provide

Reliable agent behavior depends on reliable Design System information. Human-oriented documentation remains valuable, but the agent also needs consistent, machine-readable contracts.

At a high level, the Design System should make the following available:

| Knowledge area | Information needed |
| --- | --- |
| Components | Identity, purpose, public API, variants, states, examples, lifecycle, and ownership. |
| Tokens | Canonical names, values or mappings, aliases, themes, deprecations, and intended use. |
| Patterns | Supported compositions, required and optional parts, responsive behavior, and common system states. |
| Accessibility | Semantics, naming, keyboard behavior, focus, announcements, contrast, motion, reflow, and manual checks. |
| Guidance | “Use when,” “do not use when,” product vocabulary, alternatives, and migration advice. |
| Evidence | Tests, fixtures, validation status, release availability, and known limitations. |
| Provenance | Package/version context, assets used, exceptions, checks run, and generation context. |

The current repository implements this initial foundation through canonical registries, lifecycle metadata, pattern recipes, public exports, provenance, deterministic validation, and an MCP access layer. It should evolve from evidence gathered during real agent tasks rather than attempting to encode every possible rule up front.

---

## Lifecycle and governance model

Three conceptual states keep experimentation possible without weakening the canonical system:

| State | Meaning | Expected use |
| --- | --- | --- |
| **Approved** | Canonical, reviewed Design System capability. | Prototypes and production, subject to normal release constraints. |
| **Candidate** | Potentially reusable capability proposed for review. | Prototypes and evaluation; not represented as canonical. |
| **Local** | Product-specific solution with no current Design System intent. | The individual prototype or product only. |

The agent may move work through discovery and preparation, but approval remains a human decision:

```text
Unmet requirement
      ↓
Review approved alternatives
      ↓
Provisional implementation
      ↓
Candidate or local classification
      ↓
Validation and evidence
      ↓
Design + Engineering review
      ↓
Keep local / revise / approve through normal contribution process
```

A candidate should arrive with enough context to make review efficient: the use case, rationale, alternatives considered, proposed API and states, token use, accessibility considerations, examples, evidence, known limitations, and an owner.

The agent prepares the case; people govern the system.

---

## Platform boundary

The Design System repository and the agent platform have different responsibilities.

| Design System responsibility | Platform responsibility |
| --- | --- |
| Canonical component, token, pattern, and guidance data | Model access and runtime orchestration |
| Public package and lifecycle contracts | Identity, authentication, and authorization |
| Deterministic repository validation | Retrieval and context delivery |
| Candidate and provenance formats | Approval interruption and durable workflow state |
| Fixtures and evidence targets | Logging, auditability, observability, and operational controls |

The repository now exposes its deterministic capabilities through a local, read-only MCP server using stdio transport. This gives Flow/SCAPE a concrete integration point while keeping repository concerns separate from platform orchestration.

The production capability should use established Comcast Flow/SCAPE conventions. The brief intentionally does not prescribe agent decomposition, model choice, retrieval strategy, remote transport, or production runtime. Identity, authorization, audit, deployment, and approval behavior must be resolved through the Flow/SCAPE pilot and platform governance.

---

## Guardrails

The Design System Agent should:

- prefer approved assets and clearly disclose exceptions;
- never silently replace an approved capability with generated UI;
- never describe candidate or local work as approved;
- preserve existing access controls and respect repository permissions;
- make generated changes understandable and reviewable;
- record which Design System assets and versions informed an output;
- distinguish automated checks from unresolved human review;
- require human approval before canonical lifecycle, export, or release changes;
- support appropriate auditability and observability through the platform;
- avoid exposing restricted source material or user data outside its authorized context.

Generated prototypes should be treated as implementation starting points until the relevant product, design, engineering, accessibility, security, and release reviews are complete.

---

## MVP

### Proposed outcome

> A Comcast employee can describe a product interface in a supported development environment and receive a runnable prototype composed primarily from the current CVP Design System, then iteratively refine it and see where new Design System capabilities are required.

The repository foundation required to attempt this journey now exists. The MVP is achieved only when the complete user experience is demonstrated repeatably through Flow/SCAPE—not merely when the individual tools operate in isolation.

### What the MVP should prove

1. **Prompt → prototype:** a meaningful requirement becomes a runnable, editable experience.
2. **Design System reuse:** the output is built primarily from approved assets, with traceability.
3. **Iteration:** a user can request focused changes without full regeneration or loss of context.
4. **Validation:** the agent returns actual check results and identifies unresolved review items.
5. **Gap handling:** an unmet need becomes an explicit candidate or local solution with review-ready context.

### Suggested demonstration scenario

Start with a management experience requiring a page layout, search, filters, a data table, status indicators, actions, and a create/edit flow. After generating and iterating on the approved composition, introduce a requirement not supported by the current system—for example, a visual scheduling interaction. Demonstrate how the agent:

- finds and uses approved assets first;
- produces a working prototype;
- explains asset provenance;
- detects the unsupported capability;
- keeps provisional work separate;
- packages a potential candidate for human consideration.

This single journey highlights the product promise and the governance model together.

### Out of scope for the first release

- autonomous production deployment;
- autonomous approval or publication of Design System changes;
- guaranteed production-ready output without human review;
- complete support for every product domain or frontend stack;
- a bespoke end-user application unless discovery shows it is needed;
- replacement of existing design, engineering, accessibility, or security review.

---

## Adoption path and current progress

The work can progress in outcome-oriented stages without committing to a particular architecture.

### Stage 1 — Establish trustworthy knowledge

Align component, token, pattern, accessibility, lifecycle, and public API information. Define precedence and expose enough structured metadata for reliable discovery.

**Evidence of progress:** representative user intents consistently resolve to the right approved assets, and contradictions are detectable.

**Current position:** Foundation delivered. Components, patterns, fixtures, tokens, lifecycle states, public exports, and provenance are machine-readable and covered by automated consistency checks. Coverage should continue to improve through pilot evidence.

### Stage 2 — Prove composition and validation

Use a small set of representative workflows to generate runnable prototypes, iterate on them, and return deterministic validation evidence.

**Evidence of progress:** the demonstration journey works end to end and can be repeated by several users.

**Current position:** In progress. Deterministic discovery, contract lookup, gap classification, provenance validation, compliance reporting, a prototype scaffold, and automated validation are available. The next proof is the complete journey inside Flow/SCAPE.

### Stage 3 — Prove governed gaps

Allow unsupported requirements to produce clearly separated local or candidate work, including review context and provenance.

**Evidence of progress:** maintainers can review a prepared candidate without reconstructing how or why it was created.

**Current position:** Partially enabled. Candidate and local boundaries are defined and machine-validatable; pilot use must prove that the resulting evidence is sufficient for maintainers.

### Stage 4 — Integrate and scale

Harden the capability for wider internal use through appropriate identity, authorization, observability, evaluation, support, release, and feedback mechanisms.

**Evidence of progress:** teams can use the capability safely through supported environments, and the organization can understand quality, adoption, failure modes, and cost.

**Current position:** Ready to begin. A read-only MCP adapter, protocol tests, security containment, and an engineer walkthrough are available. Flow/SCAPE platform integration and operational controls remain to be completed.

---

## Success measures

Early measures should focus on outcomes and quality rather than prompt volume.

| Measure | What it helps us understand |
| --- | --- |
| Time from requirement to runnable prototype | Whether the capability materially accelerates exploration. |
| Percentage of generated UI using approved assets | Whether the agent is strengthening Design System adoption. |
| Validation pass rate and unresolved review rate | Whether output is reliable and claims are transparent. |
| Frequency and type of Design System gaps | Where the system may need investment or clearer guidance. |
| Duplicate component creation avoided | Whether discovery and composition are working. |
| Candidate acceptance, revision, and rejection rates | Whether proposals are useful and appropriately classified. |
| Prototype-to-production reuse | Whether prototypes provide durable implementation value. |
| Design and engineering time saved | Whether the capability improves team productivity. |
| User trust and task completion | Whether people understand and can act on the output. |

Quality evaluation should include realistic tasks, adversarial or ambiguous requests, iterative edits, lifecycle mistakes, accessibility failures, deprecated assets, and incomplete Design System information.

---

## Risks and responses

| Risk | Directional response |
| --- | --- |
| The agent creates a parallel unofficial Design System | Enforce discover-first behavior, lifecycle visibility, provenance, and review boundaries. |
| Documentation and code drift | Establish canonical authorities and deterministic consistency checks. |
| Users over-trust prototype output | Show validation evidence, exceptions, and unresolved human checks in the result. |
| Retrieval returns plausible but outdated guidance | Version knowledge, apply source precedence, and include release availability. |
| Candidate volume overwhelms maintainers | Require evidence, ownership, alternatives considered, and a clear reusable need. |
| Product-specific UI is generalized too early | Preserve a local category and evaluate repeated needs before promotion. |
| Platform decisions are locked prematurely | Define capabilities and evidence gates first; let engineering test implementation options. |
| Adoption requires another destination | Begin in supported development environments and validate the need for any dedicated UI. |

---

## Decisions for the pilot

The foundation has resolved the initial repository questions. The following decisions now need Product, Design System, Engineering, Security, Accessibility, and Flow/SCAPE platform owners:

- Which user group and workflow should anchor the first pilot?
- Which additional Design System facts or guidance prove necessary after observing the pilot?
- Which information belongs in Flow/SCAPE context versus deterministic MCP tools?
- Is the current React and TypeScript prototype scaffold sufficient for the first users?
- Which checks must pass before an output may be described as Design System-aligned?
- How should users see asset provenance, lifecycle, warnings, and unresolved manual checks?
- What is the review and ownership model for candidate components?
- How will access, audit, retention, telemetry, and sensitive data be handled?
- Where will the MCP process run, how will Flow/SCAPE authorize it, and how will its version be pinned and rolled back?
- How will Flow/SCAPE capture and redact tool-call evidence without exposing sensitive content or paths?
- What evaluation set will establish that the agent is improving reuse rather than only generating convincing UI?

These questions should be answered through the representative management-workspace pilot and its acceptance evidence, rather than through architecture decisions made in the brief.

---

## Recommended next milestone

Connect the existing read-only MCP server to a Flow/SCAPE development environment and run the documented management-workspace acceptance journey. Stakeholders should align on four points before that pilot begins:

1. Confirm the initial users and pilot owner.
2. Confirm the management-workspace journey as the first end-to-end demonstration.
3. Approve the read-only permission boundary and workspace scope.
4. Agree on the evidence and success threshold required to proceed beyond development.

Engineering can then follow the repository's [Flow/SCAPE connection walkthrough](./FLOWSCAPE_WALKTHROUGH.md), capture the tool trace and compliance evidence, and return observed gaps to the Design System backlog. The result should inform production architecture and rollout decisions.

---

## One-slide summary

**Problem:** The CVP Design System is valuable but requires specialist knowledge to discover and apply consistently.

**Idea:** Make the Design System accessible as an internal agentic capability in supported development workflows.

**User promise:** Describe an experience, receive a runnable CVP-aligned prototype, refine it conversationally, and understand the assets and gaps involved.

**Key behavior:** Discover and compose approved assets before generating new UI.

**Governance:** The agent can prepare candidate contributions; people approve changes to the canonical system.

**MVP proof:** Prompt → prototype → approved reuse → iteration → validated gap/candidate.

**Progress:** The governed repository foundation and read-only MCP interface are built and verified.

**Next milestone:** Connect to Flow/SCAPE and prove the complete journey with representative users and auditable evidence.

**Architecture stance:** Keep Design System authority in the repository and let Flow/SCAPE own identity, orchestration, approval, and operations.
