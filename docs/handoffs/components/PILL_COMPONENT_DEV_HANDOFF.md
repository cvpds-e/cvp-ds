# Pill

## Purpose

Pill is the compact primitive for a selected value. It is the same selected-value treatment used by Multi Select, separated only so other composed controls can reuse it.

Pills retain their intrinsic content width. They must not stretch to fill a parent container.

## Use

- Supply `onRemove` only when the parent can remove that value. Provide a specific `removeLabel`, for example `Remove Editorial`.

## Composition boundary

Pill owns only the visible value and its optional remove action. The parent control owns selection state, search, menus, limits, validation, and announcements. Do not use Pill as a primary action or substitute it for a status-only badge or tag.

## Accessibility

- The remove action has an explicit accessible name.
- Omit the removal action when the parent cannot remove the value.
- Meaning remains in text; colour is supporting emphasis only.

## Tokens

Use the `--cvp-pill-*` component contract. Do not introduce local colours, sizing, or interaction states for selected values.
