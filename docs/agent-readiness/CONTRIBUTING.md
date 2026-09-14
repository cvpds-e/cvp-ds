# Agent-prepared contributions

Agents may discover gaps, implement prototypes, prepare candidates, run checks, and draft pull-request material. People own lifecycle changes and canonical approval.

## Required sequence

1. Search `components.json` and `patterns.json` and document the closest approved alternatives.
2. Decide whether the unmet requirement is reusable (`candidate`) or product-specific (`local`).
3. Keep provisional code outside the approved public export surface.
4. For a candidate, supply the candidate manifest, implementation, examples, token usage, accessibility contract, interaction tests, and visual fixtures.
5. Run `npm run agent:check` and `npm run build`.
6. Request Design and Engineering review.
7. Record the decision. Approval requires an intentional registry lifecycle change and public-export change in the same reviewed pull request.

## Review gates

- No existing approved asset or composition satisfies the requirement.
- The API expresses product intent without embedding one product's data model.
- Governed values resolve through registered tokens.
- Keyboard, semantics, announcements, focus, contrast, reflow, and reduced motion are addressed.
- Both themes and relevant responsive states have stable evidence.
- Migration impact, ownership, and release notes are present.

Rejection does not invalidate prototype work: the implementation may remain `local`, with the decision and rationale recorded.
