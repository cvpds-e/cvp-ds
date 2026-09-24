---
assetId: aspect-ratio
classification: component
lifecycle: approved
specificationStatus: draft
---
# AspectRatio

## Purpose

AspectRatio preserves a consistent width-to-height relationship for responsive images, video, and other media while allowing the container to adapt to the available layout width.

## When to use

- Media must retain a predictable shape as its container grows or shrinks.
- A page should reserve the final media area before an image or video loads.
- Repeated cards or previews need consistent media geometry.
- Minimum or maximum width constraints keep the media proportionate within a responsive layout.

Choose the ratio according to the content and placement:

- **16:9:** use for standard widescreen video, landscape imagery, and media players.
- **4:3:** use for traditional video or imagery with a less panoramic frame.
- **1:1:** use for square thumbnails, avatars, and balanced grid content.
- **2:3:** use for portrait artwork, posters, and vertically oriented imagery.
- **Custom:** use another width-to-height ratio only when it reflects the source media or an established product format.

Choose width constraints according to the surrounding layout:

- **Maximum width:** limit expansion when the media should not fill a wider parent container.
- **Minimum width:** prevent the media from collapsing below a usable size, provided the constraint does not cause horizontal overflow.
- **Fluid width:** omit explicit width constraints when the component should follow the width of its responsive parent.

Choose the child content according to the media experience:

- **Image:** ensure the image treatment preserves the intended crop within the ratio container.
- **Video:** retain native or product controls and use a ratio that matches the source presentation.
- **Custom content:** use for previews or embedded content only when every child can safely fill the constrained area.

## When not to use

- The content's intrinsic dimensions should determine its rendered height without a fixed ratio.
- The layout requires explicit fixed width and height values rather than responsive proportional sizing.
- The primary need is image loading, cropping, fallback, or accessibility behavior; use an Image component or media pattern.
- Different breakpoints require unrelated compositions rather than one consistently proportioned container.