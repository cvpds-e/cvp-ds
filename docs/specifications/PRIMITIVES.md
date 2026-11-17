# Composable primitives

Import approved primitives from the existing `src/design-system/index.ts` entry
point (the prototype template aliases this to `@cvp/design-system`). This repository
is not yet an independently published npm package. Load `src/styles/index.css` once
for the canonical token graph; importing a primitive loads its scoped CSS.

The [architecture audit](../assessments/DESIGN_SYSTEM_ARCHITECTURE_AUDIT.md) records
the initial inventory, plan, deferred work, and verification limits.

## Finding capabilities in the main system

The main overview embeds the complete catalogue. Use **All Components &
Foundations** (`?page=components`) or the shared navigation search to find all
99 destinations, covering every approved registry asset. The 25 added/elevated
primitive families now have individual pages (`?page=text`, `?page=radio-group`,
`?page=grid`, etc.) with live examples, import snippets, and accessibility
guidance. The original composed gallery remains at `?page=primitives`.

The catalogue also exposes:

- Design Principles and the existing Accessibility requirements.
- Sizing, Iconography, Opacity, Aspect Ratios, Responsive Behaviour, Motion,
  and Layering foundations, using existing semantic tokens.
- Search Field and Sort Control individually, reusing Query Controls examples.
- Native Date Input, Time Input, and File Input through TextInput, not duplicate
  wrappers or an implied upload transport.
- The existing Unsaved Changes Footer pattern, now publicly exported with its
  props type and an interactive save/discard example.

The old interactive sampler remains under **Component Previews**
(`?page=components-preview`). Deferred/deprecated assets retain explicit labels.
Editorial, personalized, and station variants share **Rail Details** rather than
duplicating template documentation. On narrow screens, **Browse design system**
keeps the catalogue reachable when the desktop sidebar is hidden.

Navigation and catalogue cards share
[`designSystemCatalog.ts`](../../src/app/designSystemCatalog.ts). Add new
destinations there and wire their route in
[`App.tsx`](../../src/app/App.tsx); registry-coverage and real-route tests prevent
approved capabilities from becoming undiscoverable or silently falling back to
the overview. Compound parts such as AvatarImage and RadioGroupItem remain
documented with their parent family.

## Hierarchy and naming

Foundations describe principles and scales. Tokens encode decisions. Primitives
are generic building blocks. Components add reusable controls/structures. Patterns
solve recurring workflows. Templates compose pages.

Use the existing names: Pills is a chip, Loader is a spinner, Separator is a divider,
Stack is vertical flex, Inline is horizontal flex, and Label is a form label.
Do not introduce synonyms. Keep Accordion, Tabs, Modal, Toast, Banner, Table,
navigation, card choices, filtering and product rails above the primitive layer.
Registry `layer` records this concept; legacy `classification` remains compatible.

## Content

| API | Contract |
| --- | --- |
| Text | Native span; `tone` primary/secondary/muted/success/error; `truncate` opt-in |
| Heading | Native h1-h6 via `level`; independent `size` title/headline/display |
| Paragraph / Caption | Native p / small, semantic body / supporting typography |
| Link | Native anchor with standard anchor attributes, underlining and focus ring |
| Icon | `icon` is an existing Lucide icon; optional `label`, otherwise decorative; `size` small/medium/large |
| Image | Native img; `alt` required (empty for decorative); responsive intrinsic proportions |
| Label | Existing Radix/native label; associate through `htmlFor` |
| HelperText / ValidationMessage | Native p; supply stable `id` and add it to the control's `aria-describedby`; message defaults to alert |
| Avatar / AvatarImage / AvatarFallback | Existing Radix composition; meaningful image alt and labelled fallback, or decorative treatment when adjacent text supplies identity |

These APIs forward DOM refs and native attributes. Heading level is document
structure, not a visual size choice. Truncation does not supply an accessible
alternative by itself; ensure complete content is available elsewhere. Prefer
wrapping. Image does not invent fallback content or loading semantics.

## Layout

| API | Contract |
| --- | --- |
| Box | div; `padding` none/xs/sm/md/lg/xl, `surface` none/default/raised/sunken |
| Container | div; `size` page/reading; responsive semantic margins/max width |
| Stack | div flex column; semantic stack `gap` none/xs/sm/md/lg/xl |
| Inline | div flex row; semantic inline `gap`; `wrap` true; `align` start/center/end/baseline/stretch; `justify` start/center/end/between |
| Grid | div; auto-fit by default; optional `columns` 1-4; fixed columns become one below 600px |
| Spacer | Decorative flexible div; use only for flexible distribution, not arbitrary spacing |
| ButtonGroup | Inline with required `label`, role group, wrapping and normal Tab order; not a toolbar or roving-focus composite |
| Separator | Existing Radix separator; decorative by default; `decorative={false}` exposes separator semantics; orientation horizontal/vertical |
| AspectRatio | Existing Radix wrapper; numeric `ratio`, default 1; semantic CSS ratio tokens are also available |
| ScrollArea / ScrollBar | Existing Radix wrappers; constrain height; pass `viewportProps` for region/name/tabIndex and `viewportRef` for scrolling |

Layout does not reorder, hide, or truncate content. Use native `style`/`className`
escape hatches for exceptional layouts rather than growing product-specific props.
For horizontal scrolling, compose ScrollBar orientation horizontal and ensure
the content genuinely overflows; keep essential controls visible.
Constrain AspectRatio's parent width: Radix's proportional sizing wrapper sits
outside the ref/className-bearing element. Constraining only the inner element
does not change the wrapper's reserved height.

## Selection and progress

```tsx
<Inline>
  <Switch id="notifications" name="notifications" defaultChecked />
  <Label htmlFor="notifications">Notifications</Label>
</Inline>

<RadioGroup name="delivery" aria-label="Delivery" defaultValue="daily">
  <Inline>
    <RadioGroupItem id="daily" value="daily" />
    <Label htmlFor="daily">Daily</Label>
  </Inline>
  <Inline>
    <RadioGroupItem id="weekly" value="weekly" />
    <Label htmlFor="weekly">Weekly</Label>
  </Inline>
</RadioGroup>

<Slider aria-label="Volume" defaultValue={[40]} name="volume" />
<Slider thumbLabels={['Minimum price', 'Maximum price']} defaultValue={[20, 80]} />
<Progress value={25} max={50} aria-label="Completed work" />
<Progress value={null} aria-label="Pending work" />
```

Switch is binary, supports `checked`/`defaultChecked`/`onCheckedChange`, and uses
native form integration through Radix. It is not the deferred Toggle's mixed-state
API. RadioGroup uses `value`/`defaultValue`/`onValueChange`, arrow-key selection,
disabled-item skipping and native form values. A name labels the group; each item
also needs its own name. Required controls must communicate “required” visibly.

Slider uses arrays (`value`/`defaultValue`/`onValueChange`), native min/max/step
constraints, keyboard arrows/Home/End/Page keys and pointer dragging. Its default
is one thumb at min. Name each thumb, especially ranges, with `thumbLabels`.
Disabled sliders omit their named native form values, as disabled controls should.
`aria-describedby`, `aria-invalid`, and accessible naming reach the focusable
thumbs. Use helper/validation text beside it. Read-only is not supported by these
button-based controls; use a read-only text representation rather than inventing
ARIA read-only behaviour. Disabled does not mean read-only.

Progress preserves `value`, `max`, accessible naming and native Radix validation.
Null/undefined is indeterminate; zero is a determinate value. Reduced-motion mode
removes the pending animation, not its accessible meaning. Progress is not a live
region: compose Loader/Status or a dedicated polite announcement for meaningful
asynchronous milestones. Do not announce every numeric update.

## Reuse native input capabilities

```tsx
<TextInput type="date" label="Date" min="2026-01-01" required />
<TextInput type="time" label="Time" step={60} />
<TextInput type="file" label="Attachment" accept="image/*" />
```

No separate DateInput, TimeInput or FileUpload alias is necessary for these native
capabilities. File inputs are uncontrolled: inspect `event.currentTarget.files`;
never supply a non-empty value. Upload transport, progress, validation policy and
drag/drop are a higher-level pattern, not implemented here. Date/time display and
editing remain platform/locale dependent. The separate DatePicker is a component,
not the native date field.

Existing TextInput, Textarea and Checkbox already manage their own label/helper/
error relationships; standalone support primitives are for custom compositions,
not for duplicating those controls' built-in messages.

## Compatibility improvements

- PrimaryButton, SecondaryButton and OutlineButton now forward their native refs;
  their variants, CSS, attributes, loading and disabled contracts are unchanged.
- SearchField forwards its input ref, tracks uncontrolled typing/reset, clears
  uncontrolled DOM content, restores focus, and disables clearing when read-only
  or disabled. Controlled owners still clear their own value through `onClear`.
- MiscInput copies the current native input value (not its initial default),
  supports asynchronous `onCopy`, reports clipboard failures visibly and through
  alerts, announces success, and cleans up the reset timer on unmount.
- Promoted internal wrappers keep original import paths and exports. Their
  framework-default appearance intentionally becomes token-backed CVP styling.
  Slider's previous unspecified two-thumb rendering was inconsistent with its
  internal default value; pass an explicit range to retain two thumbs.
- The personalized mobile Settings pane starts below the persistent global header,
  using its height token. Its close action is no longer covered by the header;
  desktop geometry and portaled Select layering remain unchanged.

## Verification

Use the **Primitives** documentation navigation item or `?page=primitives-full`.
The isolated route supports `theme=dark` / `theme=light` for reproducible review.
Unit tests cover semantics, refs, state, keyboard selection, native form values,
field association and clipboard errors. Playwright tests cover 320/768/1440
layouts, both themes, reduced motion, automated AA rules, targets, focus and
keyboard/pointer interaction. These are acceptance evidence, not WCAG certification.
