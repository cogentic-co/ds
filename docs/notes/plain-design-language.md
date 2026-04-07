# Plain — Design Language Research Notes

**Status:** Research note, not a spec. No code changes implied.
**Date:** 2026-04-07
**Source:** ~12 screenshots of [Plain](https://plain.com) (support tool) provided by James, analysed conversationally.

## Why this exists

We were exploring options to refresh `<Button>` styling and looked at several reference design systems. Plain's UI stood out as the closest fit for Cogentic's aesthetic and target audience (compliance / dev-tool, dense, neutral, considered). Plain doesn't ship a public design system, so this document captures what we learned by reverse-engineering screenshots, so the analysis isn't lost.

The eventual goal — if and when we decide to act on it — would be to align Cogentic's DS with Plain's visual language. This document is the input to that future spec.

---

## TL;DR — what makes Plain feel like Plain

Six rules that, applied together, create the "Plain look":

1. **Tinted canvas, white cards.** Page background is a faint cool grey; all content cards are pure white. Elevation comes from contrast, not shadow.
2. **Hairline borders are the universal divider.** 1px cool-grey strokes on cards, sidebars, inputs, table rows. No drop shadows except on floating popovers.
3. **One accent colour, used everywhere.** A muted lilac/indigo (NOT the brand green) is the single UI accent — active sidebar items, switch on-state, focused input borders, checkbox/radio fills, badges.
4. **Brand colour is identity-only.** The green is reserved for the logo and decorative hero blocks. It never appears in interactive UI.
5. **Three font weights, no more.** `font-semibold` for titles and emphasis, `font-medium` for body labels, `font-normal` for descriptions. That's it.
6. **Restrained interaction.** Hover/focus states are subtle — colour shifts only, no borders growing, no scale, no glows. Focus is a 2px coloured border, not a 4px outer ring.

---

## Visual language — element by element

### Layout shell

**Three-column structure:**

- **Icon rail** (~64px) — pure white, no border, just iconography. Active item is a solid black square with white icon, inactive is a stroked grey icon.
- **Secondary nav panel** (~240px) — also pure white, with header / nav list / footer. Vertical 1px divider against the canvas.
- **Main canvas** — light cool grey (`oklch(~0.97 0.005 280)`-ish, similar to `bg-zinc-50`), with white "page card(s)" floating inside it.

**The inverted dashboard model:** most dashboards have a coloured sidebar and a white canvas. Plain does the opposite — white sidebars, tinted canvas. The result is that content feels "lifted" without needing shadows.

### Border radius scale

| Use | Radius | Tailwind |
|---|---|---|
| Small inline things (sidebar items, badges, step number squares, small buttons) | ~6px | `rounded-md` |
| Buttons, inputs, text fields, selects, inner cards in a list | ~8px | `rounded-lg` |
| Outer wrapper cards (form containers, settings cards) | ~12px | `rounded-xl` |

This is a clear three-tier system. The ratio between the layers is what gives Plain its "everything fits inside everything" feel.

### Colour system

**Brand vs UI separation:**

```
brand green   →  logo, decorative hero blocks, marketing only
near-black    →  primary action buttons, body text, icon containers
lilac/indigo  →  active states, focus, switches, badges, accent
hairline grey →  borders, dividers everywhere
muted grey    →  descriptions, placeholder text, inactive nav items
canvas grey   →  page background only
```

**The accent colour** is consistently one hue with alpha variants:

| Use | Approx value |
|---|---|
| Sidebar active fill | `oklch(0.96 0.02 280)` (~`indigo-50`) |
| Settings card icon container | `oklch(0.96 0.02 280)` (same) |
| Switch on-state, button focus border | `oklch(0.55 0.20 280)` (~`indigo-500`) |
| Step builder `+` focus border, input focus border | same `indigo-500` |
| Badge background | `oklch(0.96 0.02 280)` |

So functionally one colour with two intensities: a soft fill (~95% lightness) and a saturated stroke/fill (~55% lightness).

**The brand green is never used in any of these positions.** This is the most important architectural point in Plain's system.

### Typography

**Three weights, no exceptions:**

- `font-semibold` — titles, field labels, button text, emphasis
- `font-medium` — group headers, navigation items, badges
- `font-normal` — descriptions, helper text, body copy

**Sizes** (approximated from visual inspection):

| Use | Size |
|---|---|
| Page H1 (e.g. "Settings", "Create new label") | `text-3xl` to `text-4xl` |
| Section H2 (e.g. "Workspace", "Workflow") | `text-xl` |
| Card title | `text-base` |
| Field label | `text-base` |
| Body / input text | `text-sm` to `text-base` |
| Description / muted | `text-sm` |
| Tiny labels (above selects, in counts) | `text-xs` |

**Monospace numerics** appear in step badges (`01`, `02`, `03`) and probably elsewhere — JetBrains Mono territory. A nice engineering-y touch.

### Shadows

**Plain uses almost no shadows.** Inventory of where they appear:

- ❌ Cards (form cards, settings cards, content cards) — none
- ❌ Sidebars — none
- ❌ Inputs (resting or focused) — none
- ✅ Standalone buttons (when not inside a card) — `shadow-xs` only
- ✅ Floating popovers (selects, dropdowns) — soft drop shadow
- ✅ Primary button — possible inset top highlight, but no outer shadow

**Buttons inside cards drop their shadow.** Elevation is contextual.

---

## Component-by-component analysis

### Button — primary

- **Background:** dark neutral (~`oklch(0.20 0.01 270)`, slight cool tint, not pure black)
- **Border radius:** `rounded-lg` (~8px)
- **Height:** ~40px (`h-10`)
- **Padding:** generous, ~16-20px horizontal
- **Text:** white, `font-semibold`, `text-sm`
- **Inset top highlight:** very subtle 1px lighter band along the top edge — possibly `shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]`
- **Outer shadow:** soft, `shadow-sm` or `shadow-[0_1px_3px_rgba(0,0,0,0.12)]`
- **Icon:** stroked, ~16-18px, same colour as text, ~8px gap from text (`gap-2`)
- **Hover:** not screenshotted, but presumably a near-imperceptible lighten
- **Disabled:** opacity-50 on the whole element, no colour swap

### Button — secondary

- **Background:** white (`bg-background`)
- **Border:** hairline cool grey (`border-zinc-200`-ish)
- **Border radius:** `rounded-lg`
- **Height:** ~40px
- **Padding:** ~14-16px horizontal
- **Text:** near-black, `font-semibold`, `text-sm`
- **Icon:** stroked, same weight as text
- **Outer shadow:** `shadow-xs` when standalone, **none when inside a card** (contextual elevation)
- **Hover:** background shifts to a very pale grey (`bg-zinc-50` / `bg-muted/40`), border doesn't change

### Button — ghost (in toolbars/headers)

- **Background:** transparent
- **Border:** none
- **Padding:** minimal, sized to content
- **Text:** near-black, `font-semibold`
- **Use:** Filter buttons, display toggles, icon-only actions in headers
- **Sometimes paired with keyboard shortcut text inline** as part of the label (e.g. "Filters F"), not as a `<kbd>` pill

### Input — text

- **Background:** white
- **Border:** hairline cool grey
- **Border radius:** `rounded-md` to `rounded-lg`
- **Height:** ~44-48px (`h-11` or `h-12`) — taller than typical
- **Padding:** ~16px horizontal, generous
- **Placeholder:** `text-muted-foreground`, `font-normal`
- **Spell-check:** browser default (not disabled — they let red squiggles show)

### Input — focus state

- **Border:** indigo, **2px not 1px** (`border-indigo-500/60`-ish)
- **No outer ring** — the border thickening + recolouring is the entire focus indicator
- **No background change**
- **No label colour change**

This is **really restrained** vs typical systems. Most use a 3-4px outer ring; Plain uses a thicker coloured border. The result is much calmer.

### Input — error state

**Plain doesn't appear to have error states for inline validation.** Their model is preventative:

1. Validate as you type
2. Disable submit until the form is valid
3. Show errors only on blur or submit attempt

Their disabled-button-until-valid pattern is the primary error prevention. For server-side errors (e.g. "this name is taken"), they'd presumably show inline text below the field, but I haven't seen that screenshot.

**Implication for Cogentic:** the existing TanStack Form + zod setup in `src/blocks/_form.tsx` is already aligned with this philosophy. We disable the submit button until `formState.isValid`. We just need a minimal text-only error treatment for the post-submission cases.

### Switch

- **Pill shape**, ~24px wide × 14px tall
- **Off:** muted grey background, white circle
- **On:** indigo background (`bg-indigo-500`-ish, the saturated accent), white circle
- **Inline label** to the LEFT of the switch, switch on the RIGHT
- **Label uses muted colour** (`text-muted-foreground`), not full near-black — the switch label is treated as secondary information

### Radio — rich list

The "list of options inside one card" pattern (NOT card-per-option):

- **Single outer card** with hairline border, `rounded-lg`, white bg, no shadow
- **Each option is a row** separated by hairline `border-t` dividers
- **Radio dot** on the LEFT, ~16-18px, outlined when off, indigo-filled when on
- **Title** `font-semibold text-base`, **description** `text-sm text-muted-foreground` to the right of the radio
- **Whole row is the click target**
- **Generous padding** per row (~20px vertical, ~24px horizontal)

This is a **third pattern** sitting between simple radios and card-grid pickers. It works well for 3-6 options where each has a description.

### Select trigger

- Same height/border/radius as text inputs
- Chevron-down on the right
- Visually indistinguishable from inputs except for the chevron — Plain doesn't differentiate "type into" from "click to choose"
- **Compact variant** for toolbar use (~`h-8`, smaller padding)

### Select dropdown (popover)

- Floats below trigger, slightly wider
- White bg, hairline border, `rounded-lg`, **soft drop shadow** (one of the rare shadow uses)
- Items: ~12px vertical, ~16px horizontal padding
- **Selected indicator: checkmark on the RIGHT side**, not a left highlight or filled background
- Items wrap on multiple lines if needed (no truncation)

**Note:** James said he prefers Cogentic's existing Select. The right-side checkmark is the only borrowable detail.

### Card — content

- **White background**
- **Hairline border**, `rounded-xl` (larger than buttons/inputs)
- **No shadow**
- **Generous padding** (~24-32px)
- Often contains nested smaller cards (`rounded-lg`, hairline border, no shadow) — clear hierarchy by radius

### Card — form container

A specialised card with three zones:

- **Header zone:** title text, hairline `border-b` underneath
- **Content zone:** form fields, ~24-32px padding
- **Footer zone:** muted background fill (`bg-muted/30` or `bg-zinc-50/50`), hairline `border-t`, primary submit button right-aligned

Page H1 sits **outside the card**, above it.

### Empty state — inline

The "No data" pattern in chart cards:

- Small ghost icon (~16-20px) in muted grey
- "No data" text in `text-sm text-muted-foreground`
- Centred in the chart area
- **Chart axes / gridlines preserved behind the message** — so users still understand what would be there
- **No surrounding card or border** — message just floats in the existing chart space

This is much better than the typical "big illustration + CTA" empty state pattern. Easy to add as a `compact` variant of your existing `Empty` component.

### Setting row pattern

A reusable list-row pattern that appears across radios, selects-in-rows, and toggles:

- **Icon left** (small, semantic, ~20px, muted)
- **Title + description middle** — `font-semibold` title, `text-sm` muted description
- **Inline control right** — switch, select, button, etc.
- **Single hairline divider between rows** inside one outer card
- **No per-row card** — they're all inside one container

Together with the rich radio list, this is the same primitive: **`<RowList>` of `<Row>`s with optional icon, title, description, and trailing action**.

### Step / list builder

For ordered, reorderable, insertable lists:

- **Drag handle on the far left** (6-dot grip, very faint until hover)
- **Step number badge** — monospace `01`/`02`/`03` in a soft tinted square, `rounded-md`, ~32px
- **Step header** with title + delete trash icon on the right
- **Step content** below the header (an input, a select, etc.)
- **Vertical 1px line + square `+` button** between cards for inserting at any position
- **Focused `+` button** uses the same indigo border as focused inputs

Cogentic doesn't have this component yet. Genuinely new pattern, would slot well into `src/workflow/` or as a new `src/blocks/sequence-builder.tsx`.

### Sidebar — top-level item

- **Active:** soft lilac fill background (`bg-indigo-50/60`-ish), near-black text, `font-semibold`, `rounded-md`
- **Inactive:** no background, `text-zinc-700`-ish, `font-medium`, stroked muted icon
- **Right-side counts** as plain numbers in `text-xs text-muted-foreground` — no badge pill

### Sidebar — group header

- `text-sm text-muted-foreground`, `font-medium`
- Right-side chevron for collapsibility
- Slightly less indented than children

### Sidebar — child item

- Plain text, `text-sm`, normal weight
- Indented ~16px under parent
- **No tree lines / guide rails** — purely typographic hierarchy

### Sidebar — nested child

- Even more indent, smaller text
- Same no-rails approach
- 3 levels of nesting work without visual aids because the type system is so well calibrated

### Page header (settings detail style)

- **H1:** `text-3xl` to `text-4xl`, `font-semibold`, near-black
- **Subtitle:** `text-base text-muted-foreground`, directly below
- **No bottom border** — separation comes from spacing, not a divider
- Sits **outside and above** any content cards

### Section header (within a page)

- **H2:** `text-xl`, `font-semibold`
- **Optional subtitle** below in muted text
- **Optional top divider** for sections that aren't first
- **Inline collapsible chevron** after the heading text (not at the right edge) for collapsible sections

---

## How this maps to Cogentic's current DS

### Easy changes (token tweaks only)

| Token | Current | Plain-aligned |
|---|---|---|
| `--border` | OKLch neutral | Slightly cooler, slightly softer |
| New: `--canvas` | doesn't exist | Light cool grey for page bg |
| New: `--accent` | doesn't exist (we removed `--cogentic-green`) | Saturated indigo |
| New: `--accent-soft` | doesn't exist | Pale lilac (~`indigo-50`) |
| Default font weight on labels/buttons | `font-medium` | `font-semibold` |

### Medium changes (component-level CSS)

| Component | Change |
|---|---|
| `Button` | Default to `rounded-lg` (currently `rounded-md`), `font-semibold`, `h-10` default. Update variant fills. |
| `Input` | `h-11` (currently `h-9`), softer border, larger padding, **2px coloured border on focus** (not ring) |
| `Card` | Drop default shadow, raise border-radius to `rounded-xl` for outer cards |
| `Switch` | Indigo on-state instead of `--primary` |
| `RadioGroup` | Add a "rich list" composition (or a `RadioCard` block) using existing primitives |
| `Empty` | Add a `compact` / `inline` variant for use inside chart cards |
| `Sidebar` | Active item uses lilac fill, not the current treatment |

### Hard changes (structural)

| Component | Change |
|---|---|
| `AppShell` | Tinted canvas + white sidebars (inverted from typical dashboard) |
| Typography | Normalise to three-weight system across the DS |
| New: `SettingRow` block | Icon + title + description + trailing action, in a list |
| New: `SequenceBuilder` block | The step-list-builder pattern |
| New: `SettingsCardGrid` block | The 2-column tile layout from Plain's settings home |

---

## Recommended scope (if/when we act on this)

Three plausible scopes, ordered by ambition:

### Option A — Token-only refresh

Add `--accent`, `--accent-soft`, `--canvas` tokens. Update `Switch` and active-state colours. **Don't touch components.** Lowest risk, maybe 30% of the visual feel.

### Option B — Component refresh (recommended)

Token additions + targeted updates to `Button`, `Input`, `Card`, `Switch`, `Sidebar`. Adopt the three-weight type system. Refactor `_form.tsx` helper to support description-above-input. Adds maybe 70% of the Plain feel for moderate effort.

### Option C — Full visual language refresh

All of B, plus `AppShell` canvas tint, new blocks (`SettingRow`, `SequenceBuilder`, `SettingsCardGrid`), `Empty` compact variant, all radios and form patterns updated. This is a 0.9.0 release and a real design system shift. ~2 weeks of focused work.

**My recommendation: B** as the first move, then evaluate whether C is worth it after living with B for a release.

---

## What's still missing

Genuinely useful screenshots not yet captured:

- Primary button hover state
- Secondary button active/pressed state
- Sheet / drawer
- Tabs (active state)
- Modal / dialog
- Toast (Sonner-style notification)
- Tooltip
- Data table row (hover, density)
- Workspace switcher
- Disabled input
- Server-side error state on a form

None of these would change the **architecture** of a refresh — they'd just fill in details. The core design system is now well-understood from what we have.

---

## Open questions for the eventual spec

1. **Is the indigo accent the right colour for Cogentic?** Plain's specific lilac may not feel right for a compliance tool. Could be any saturated cool hue (teal, blue, violet). Worth picking before any code.
2. **Do we keep `--cogentic-green` as a brand-only token?** We removed it in 0.8.0, but Plain uses their brand green for the logo. We could re-add it as `--brand` (logo-only) without bringing back `bg-cogentic-green` as a utility.
3. **What's the migration path for the `font-medium` → `font-semibold` shift?** Almost every component currently uses `font-medium` for labels. Bumping to `font-semibold` is technically a visual breaking change, even though it's just a CSS edit.
4. **Sidebar active state:** lilac fill vs left-border accent vs solid fill? Plain uses fill, but it's a strong departure from many existing dashboards.
5. **Should the "rich radio list" replace `SelectOrgForm`'s `list` variant?** The current `SelectOrgForm` (added in 0.8.0) wraps each org in a card. Plain's pattern is one card with divided rows. The Plain approach is denser and arguably better for compliance UIs.

---

## Process notes

- **Total screenshots analysed:** 12
- **Time investment:** ~1 conversation session
- **Spec status:** none. This is research only — no code changes, no implementation plan.
- **Next step (when we're ready):** read this doc → invoke `superpowers:writing-plans` → produce a focused implementation plan for whichever scope (A/B/C) we pick.

The biggest insight from this research is **architectural**: Plain's look isn't about button styling at all. It's about (1) splitting brand colour from UI accent, (2) adopting tinted canvas + white cards, (3) standardising the three-weight type system, and (4) ruthlessly removing shadows in favour of borders. Get those four right and the buttons mostly take care of themselves.
