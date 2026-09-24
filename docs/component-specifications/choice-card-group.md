---
assetId: choice-card-group
classification: component
lifecycle: approved
specificationStatus: reference
---
# Choice Card Group

## Purpose

Choice Card Group presents a mutually exclusive set of options when a concise label alone does not give people enough information to make a choice. Each option may include an icon, a short parallel description, and a status badge.

## When to use

- One choice must be selected from a small, comparable set.
- Descriptions, badges, or icons materially help a user compare options.
- Two or three columns can be read without truncating the option meaning.

Choose the layout according to the number and density of options:

- **Two columns:** use when options need longer labels or descriptions, or when the available width is constrained.
- **Three columns:** use for three concise, parallel options that remain scannable without truncation.
- **Responsive reflow:** allow the component to reduce columns on narrow screens rather than compressing card content.

Choose the option content according to what improves comparison:

- **Label:** provide a concise, parallel name for every option.
- **Description:** add short parallel descriptions when labels alone do not explain the difference.
- **Icon:** include icons only when they make the options easier to distinguish at a glance.
- **Badge:** use a non-interactive Badge for stable metadata such as a default or live classification.

Account for these group and option states:

- **Selected:** maintain exactly one selected option and expose the persistent radio indicator.
- **Required:** use required state when the workflow cannot proceed without a choice, with helper text when the requirement needs context.
- **Option disabled:** keep one unavailable choice visible when its presence explains the available set.
- **Group disabled:** preserve the complete selection for context while preventing changes to every option.

## When not to use

- Users may select more than one option; use Checkbox or PillsInput.
- Short labels provide enough information to choose; use Select or Segmented Control.
- The option set is too large to compare at once; use Select.
