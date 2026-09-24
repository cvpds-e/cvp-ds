---
assetId: accordion
classification: component
lifecycle: approved
specificationStatus: draft
---
# Accordion

## Purpose

Accordion progressively reveals related settings or supporting information in vertically stacked sections.

## When to use

- Optional detail should remain available without dominating the page.
- Several related sections need independent expansion.
- Users benefit from comparing content across multiple open sections.

Choose the expansion model according to how people need to review the content:

- **Single expansion:** use when sections are lengthy or opening one section should close the previous section.
- **Multiple expansion:** use for comparison and settings workflows where several sections need to remain open.

Choose the icon treatment according to the information hierarchy:

- **No leading icon:** use for straightforward text headings where another visual cue would add noise.
- **Default icon:** use when an icon helps distinguish sections without adding semantic emphasis.
- **Primary icon:** use the primary color only when the icon needs consistent brand emphasis across the group.

Match the accordion heading to the surrounding document hierarchy:

- **Heading level:** choose level 2 through 6 based on the parent section; do not choose a level for visual size alone.

Account for these availability states:

- **Item disabled:** use when one section is unavailable while the remaining sections can still be expanded.
- **Accordion disabled:** use when the entire group must remain visible for context but cannot be changed.

## When not to use

- The content must always remain visible; use a static section layout.
- The workflow is sequential; use a dedicated step-based flow.
- The design requires deeply nested disclosure; simplify the information hierarchy.
