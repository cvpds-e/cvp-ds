# Station Rail Details

## Purpose and composition

Editorial page for managing Station rails in Rail Manager. Compose the existing
Workspace Layout, Header Navigation, Breadcrumb, Base / Content Query Tabs,
form controls, Modal, Banner, Badge, Toast, and Unsaved Changes Footer.
This is a variant of the existing Rail Details showcase, not a separate
design-system navigation page or a new public component.

- Documentation: `?page=rail-details`
- Workspace: `?page=rail-details-full&railEntityType=Station&theme=dark` (also `theme=light`)
- Manager: `?page=rails-list-full`
- Existing rail: append `&id=<rail-id>` to the workspace route.

The former `station-rail-details` documentation route opens the common Rail
Details showcase. The former full-page route remains an alias for old links.

## Consumer preview

Reuse Rail Content Gallery's horizontal scrolling, previous/next buttons,
focus behavior, and responsive tile sizing. Its `mediaVariant="station"` uses
square tiles; `renderMedia` supplies artwork inside the gallery-owned target.
Poster galleries retain their default rendering and aspect ratio.

Station logos are original fictional SVG marks for the sample World News,
Sport+, Family, and Indie identities. Multiple World News channels share a
logo but keep distinct channel labels. Empty/unavailable positions stay in
the rail. Select a logo for station details or an empty tile to add a station.
Manual selection controls sit below the consumer preview instead of replacing it.

All three rail variants use a Settings heading above the configuration tabs.
Rail entity type and Rail behavior use the editorial Base configuration's
disabled read-only Text Input state and lock-label tooltip. Immutable-field
guidance remains visible below each control.
Rail collection and Number of content slots are also read-only in station
details, with the same lock indicators and no required asterisks. Choose these
values during creation; the details view cannot edit them.
The Station indicator uses the same unfilled, uppercase status-tag treatment
as Editorial and Personalized, aligned to the right of the content preview
header rather than repeated in the settings pane. Station deletion uses the
same secondary Text Button and danger styles as the other variants, including
the confirmation dialog.

## RailConfig configuration

Based on the supplied CSPROGRAM-4001 Slack CRUD guidance:

| Surface | Contract |
| --- | --- |
| Entity type | `Station`, required and immutable after creation |
| Behavior | `generic`, immutable; no personalization or hybrid behavior |
| Location | `byLocationId`, Location URI; optional |
| Language | `byLanguage`: `en` or `us` |
| HD / pay per view | `byIsHD` / `byIsPayPerView`: `true` or `false` |
| Listing time | `byListingTime`: `start~end`, ISO-8601 with time zone or epoch seconds |
| Sorting | `channelNumber`, `title`, `callSign`; ascending or descending |
| Manual GUID | ChannelSchedule URI, per the current CRUD contract |

Blank filters are unset, not boolean false. ProgramAvailability query controls
are not offered. Collection configuration does not expose `railEntityType`.
Slot counts must be positive integers; manual selections cannot exceed capacity.
Service limits are shared with ProgramAvailability rails; no separate station
quota is introduced.

## Editorial interactions

Create Station rails in the existing manager modal. Switching to Station resets
behavior to generic and explains why personalization choices are unavailable.
Edit opens the station workspace rather than the program or personalized view.

Browse sample stations or add a GUID. Manual selections are pinned by default.
Reorder, pin/unpin, and remove selections independently of their availability in
the current preview. Duplicate GUIDs are rejected. Save persists in browser
storage; Cancel restores the saved draft. Deletion in the detail view is confirmed.
In Content Query, Clear Query appears in the settings footer, outside the scrolling
form, only when the current draft has a nonempty filter or non-default sorting.
It disappears after clearing or manually restoring all query defaults; base edits
and manual selections alone do not show it. With unsaved changes, the full-width actions are Save changes, Cancel, then
Clear Query; the latter uses the blue link-style Text Button, distinct from
Cancel's Outline Button. Clearing
resets filters and sorting to defaults without changing base settings or manual
selections. It only changes the draft: Save persists the reset, and Cancel restores
the saved configuration. Clear Query is not shown on the Base tab.
Invalid input, missing rails, corrupt storage, and failed storage operations
produce visible errors rather than success feedback.

## Rendering boundary

CSPROGRAM-4114 defines RMS editorial and RAS end-user rendering. This showcase
uses sample data, not either service. It models these selection rules:

- Require availability, no past expiration, and a current or future listing.
- No location filter includes channel-less stations.
- Explicit locations match exactly and exclude channel-less stations.
- `urn:theplatform:tv:location:any` is an exact location, not a wildcard.
- Each associated channel remains a separate entry.
- An end-user location override takes precedence without changing configuration.
- Pinned selections retain positions, including unavailable empty positions.

Production integration must use the confirmed rendering API and return localized
station metadata, thumbnails, and location-specific MediaPID, tuning configuration,
tuning instructions, and price. These payload fields are not simulated here.
The supplied airing-now and schedule screenshots are separate live-rail concepts,
not promised live listing layouts in this station showcase.

The ticket describes Station GUID selection and the Slack guidance mentions a
future LiveStation migration. Current CRUD validation remains ChannelSchedule
until those API contracts are aligned. Do not silently substitute entity URIs.

## Accessibility and verification

Use persistent control labels, associated validation guidance, keyboard-operable
dialogs and selections, visible focus, announced errors/saves, light/dark themes,
and a stacked narrow-screen layout without horizontal page overflow.

- `src/app/components/stationRails.test.ts`: contracts, persistence, rendering rules.
- `src/app/components/StationRailDetails.test.tsx`: save/cancel and manual selection.
- `tests/visual/station-rails.spec.ts`: manager integration, reload persistence,
  desktop/mobile reflow, invalid input, and WCAG A/AA automated checks.

On Node versions exposing experimental native Web Storage, run Vitest with
`NODE_OPTIONS=--no-experimental-webstorage` so jsdom owns browser storage.
