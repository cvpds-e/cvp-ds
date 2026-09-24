---
assetId: textarea
classification: component
lifecycle: approved
specificationStatus: draft
---
# Textarea

## Purpose

Textarea captures multi-line text while applying the shared field contract for labels, guidance, validation, resizing, and character limits.

## When to use

- Users enter comments, descriptions, or other multi-line content.
- A character limit benefits from a visible count.
- The product needs controlled vertical, horizontal, both-axis, or fixed resizing.
- Long-form input requires helper or validation text.

Choose the resize layout according to the surrounding surface:

- **Vertical:** use by default so users can reveal more content without changing the form width.
- **Horizontal:** use only when horizontal expansion will not disrupt adjacent content.
- **Both axes:** use in unconstrained work areas where users may need control over width and height.
- **None:** use when the layout must remain fixed and the provided height is sufficient for the expected content.

Choose the validation and supporting content according to the field state:

- **Default:** use when the content has no current validation problem.
- **Error:** use for an actionable problem, preserve the entered content, and associate the visible message with the control.
- **Helper text:** provide persistent guidance while the field is valid.
- **Character count:** show the live count only with a meaningful maximum length so the total provides useful context.
- **Required or optional:** identify the expectation explicitly when it helps users complete the form.

Account for these field states:

- **Empty:** provide enough visible rows for the expected response; the default is four rows with a 96px minimum height.
- **Filled:** support controlled and uncontrolled content while keeping the character count accurate.
- **Hover and focus:** retain the shared field boundary and visible focus treatment.
- **Read-only:** keep content available for focus, selection, and copying.
- **Disabled:** use when the content is unavailable and should not be edited or submitted.
- **Invalid:** expose invalid state and its associated error after an appropriate validation event.

## When not to use

- The value fits on one line; use Input.
- The value is numeric; use NumberInput.
- Users choose from predefined options; use Select or PillsInput.
