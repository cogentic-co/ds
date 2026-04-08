# Plain-Inspired Visual Refresh (Scope B)

**Status:** Approved
**Date:** 2026-04-07
**Scope reference:** [`docs/notes/plain-design-language.md`](../../notes/plain-design-language.md)

## Goals

1. Adopt the visual signatures of [Plain](https://plain.com)'s UI — tinted page canvas + white cards, cool-blue accent for active states, softer borders, semibold emphasis — without restructuring the design system or breaking any component APIs.
2. Land on `0.9.0` as a visual-only breaking change (no API churn).
3. Stop short of the full visual language overhaul (no `Sidebar` rewrite, no new blocks, no `AppShell` restructuring) — that's scope C territory and a separate, larger project.

## Non-goals

- New components or blocks (`SettingRow`, `SequenceBuilder`, `SettingsCardGrid`, `Empty` compact variant — all deferred).
- `Sidebar` restructuring. The active-state colour will shift via the cascading `--primary` / `--focus` tokens, but no source edits to `Sidebar` itself.
- `AppShell` canvas tinting via a new structural layout. Tinting comes from changing `--background`, not from adding a new structural slot.
- Migrating the auth blocks (`LoginForm` etc.) to use field descriptions. The `_form.tsx` helper will gain the capability; the blocks themselves stay as-is.
- Any change to `Tabs`, `Dialog`, `Popover`, `Sheet`, `Tooltip`, `Toast` — they'll move along with the token cascade and that's it.
- Re-introducing `--cogentic-green` or any brand token. The DS stays brand-agnostic; consuming apps can theme `--primary` if they need a brand colour for the logo.

## Token changes

> **Naming note:** The existing `--accent` token (a near-white pale fill used as the hover background on dropdown / combobox / menubar / select items) is **left unchanged**. To avoid colliding with that established convention, the new saturated cool blue is added under the name `--focus` (with `--focus-foreground` and `--focus-soft` siblings).

### New tokens

```css
:root {
  --focus: oklch(0.58 0.18 245);          /* confident cool blue */
  --focus-foreground: oklch(0.99 0 0);    /* white text on saturated accent */
  --focus-soft: oklch(0.96 0.025 245);    /* pale icy blue, for tinted fills */
}

.dark {
  --focus: oklch(0.65 0.18 245);          /* slightly lighter for dark bg */
  --focus-foreground: oklch(0.10 0 0);    /* near-black text on saturated accent */
  --focus-soft: oklch(0.22 0.04 245);     /* deep cool blue for dark mode tinted fills */
}
```

These join the existing `@theme inline` block in `src/styles/globals.css` so that `bg-accent`, `text-accent-foreground`, `bg-accent-soft` all become real Tailwind utilities.

### Modified tokens

| Token | Before (light) | After (light) | Notes |
|---|---|---|---|
| `--background` | `oklch(98.511% 0.00011 271.152)` (near-white) | `oklch(0.985 0.003 245)` | Faint cool grey — becomes the page canvas |
| `--card` | `oklch(1 0 89.88)` (pure white) | unchanged | Stays white — explicit "content surface" |
| `--border` | (current OKLch neutral grey) | `oklch(0.92 0.005 245)` | Cooler, lighter, less assertive |

| Token | Before (dark) | After (dark) | Notes |
|---|---|---|---|
| `--background` | `oklch(0.23 0.02 265)` | `oklch(0.20 0.015 245)` | Slightly cooler, slightly darker — canvas in dark mode |
| `--card` | `oklch(0.26 0.02 265)` | unchanged | Stays the elevated surface |
| `--border` | (current) | `oklch(0.30 0.01 245)` | Cooler, softer in dark mode too |

### Token rationale

- **`--focus` is a single hue (cool blue, ~245°)** with two lightness variants (`accent` saturated, `accent-soft` pale). This mirrors Plain's "one accent colour, used everywhere" pattern.
- **The cool blue replaces nothing** — it sits alongside `--primary` (which stays as the dark neutral). `--primary` is for "this is the main action", `--focus` is for "this thing is active/focused/on".
- **`--background` becoming tinted is the single highest-leverage change** in this spec. It's what creates the "card lifts off the page" effect that makes Plain feel like Plain.
- **`--card` stays untouched** as the explicit white surface, so any component that uses `bg-card` automatically does the right thing.
- **`--border` softening** is the second-highest leverage change. Plain's borders read as hints, not boundaries; that single property change cascades across every bordered element.

## Component changes

All changes are **CSS-only**. No props change, no logic change, no test changes (existing tests should keep passing).

### `Button` (`src/components/button.tsx`)

| Property | Before | After |
|---|---|---|
| Default size base classes | `h-9 gap-1.5 px-2.5` | `h-10 gap-2 px-3.5` |
| Default radius | `rounded-md` | `rounded-lg` |
| Font weight on root | `font-medium` | `font-semibold` |
| Default variant | `bg-primary text-primary-foreground hover:bg-primary/80` | unchanged structurally — colours come from tokens |
| Outline variant | uses `bg-background` | change to `bg-card` (so outline buttons stay white on tinted canvas) |
| Focus | `focus-visible:ring-3 focus-visible:ring-ring/50` (current) | unchanged for buttons — buttons keep the ring since they don't have a border to thicken |

The other size variants (`xs`, `sm`, `lg`, `xl`, `icon*`) stay numerically the same — only the `default` size grows from 36px to 40px. The radius bump applies across all sizes (consistent with Plain's "everything is `rounded-lg`" rule).

### `Input` (`src/components/input.tsx`)

| Property | Before | After |
|---|---|---|
| Height | `h-9` | `h-11` |
| Radius | (current) | `rounded-lg` |
| Background | `bg-background` if used | change to `bg-card` |
| Padding | (current) | bump horizontal padding to `px-3.5` for breathing room |
| Focus state | ring-based | **2px coloured border**: `focus-visible:border-accent focus-visible:border-2`, **no ring** |
| Border colour | uses `--border` (will be softer automatically) | unchanged structurally |

The 2px-border-instead-of-ring focus pattern is the most distinctive Plain trait. Will need a `-mx-px` or similar to prevent the input shifting by 1px when the border thickens. Alternative: use `outline` instead of `border` for the focus state to avoid layout shift.

### `Textarea` (`src/components/textarea.tsx`)

Same focus-state treatment as `Input`. Same `bg-card` swap. Same softer border (cascading from `--border` token change).

### `Card` (`src/components/card.tsx`)

| Property | Before | After |
|---|---|---|
| Default shadow | (current `shadow-sm` or similar) | drop the shadow entirely |
| Default radius | (current) | `rounded-xl` |
| Background | `bg-card` | unchanged |
| Border | uses `--border` | unchanged structurally (will soften via token) |
| `CardTitle` font weight | `font-medium` (probably) | `font-semibold` |
| `CardDescription` | unchanged |

### `Switch` (`src/components/switch.tsx`)

| Property | Before | After |
|---|---|---|
| On-state background | `bg-primary` | `bg-accent` |
| On-state thumb | `bg-background` | `bg-card` (or `bg-white` to be safe) |
| Off-state | unchanged | unchanged |

This is the single most important "you can immediately tell this is the new design" signal. Switches go from dark-neutral to cool-blue when on.

### `Field` (`src/components/field.tsx`)

| Property | Before | After |
|---|---|---|
| `FieldLabel` font weight | `font-medium` | `font-semibold` |
| `FieldDescription` | unchanged | unchanged |
| `FieldError` | unchanged | unchanged |

### `_form.tsx` helper (`src/blocks/_form.tsx`)

`TextField` gains an optional `description?: string` prop:

```tsx
type TextFieldProps = {
  // ... existing props
  description?: string
}

// rendered between FieldLabel and Input:
<FieldLabel htmlFor={inputId}>{label}</FieldLabel>
{description && (
  <p className="text-sm text-muted-foreground">{description}</p>
)}
<Input ... />
```

No existing call sites pass `description`, so this is purely additive. The auth blocks (`LoginForm` etc.) won't change.

## Audit step

**Before any token edit lands**, grep the codebase for `bg-background` usage and audit each one:

- If the component is a **content surface** (the thing you put stuff *on*), it should use `bg-card`.
- If the component is **the page itself or part of the page chrome**, it should use `bg-background` (and will get the new tint).

Likely candidates that need to change:
- `Input` (currently might use `bg-background` — should be `bg-card`)
- `Button` outline variant
- Popover/dropdown surfaces (they should be `bg-popover`, but worth checking)
- Anything in `Sidebar` that's meant to be white on the tinted canvas
- `Dialog` content
- `Sheet` content

The audit happens once before the token change so we don't ship a half-broken state.

## File-by-file change list

| File | Change |
|---|---|
| `src/styles/globals.css` | Add `--focus`, `--focus-foreground`, `--focus-soft` (light + dark). Modify `--background`, `--border` (light + dark). Add to `@theme inline` block. |
| `src/components/button.tsx` | Default size `h-10`, radius `rounded-lg`, base font `font-semibold`, outline variant uses `bg-card` |
| `src/components/input.tsx` | Height `h-11`, radius `rounded-lg`, padding bump, focus = 2px accent border (no ring), `bg-card` |
| `src/components/textarea.tsx` | Same focus + bg treatment as `Input` |
| `src/components/card.tsx` | Drop default shadow, `rounded-xl`, `CardTitle` → `font-semibold` |
| `src/components/switch.tsx` | On-state → `bg-accent` |
| `src/components/field.tsx` | `FieldLabel` → `font-semibold` |
| `src/blocks/_form.tsx` | `TextField` gains `description` prop, renders between label and input |
| `package.json` | Version bump `0.8.0` → `0.9.0` |
| Audit | Any component using `bg-background` that should be `bg-card` (TBD by grep) |

## Versioning

Bump `0.8.0` → `0.9.0`.

This is a **visual breaking change**: no APIs change, no props change, no behaviour change, but every screenshot of every consuming app will look different. The accent colour, border softness, focus state, font weight, button size, card shadow, and page background all shift simultaneously. Consuming apps with custom theming may need to re-tune their overrides.

Changelog entry should be explicit about:
- New tokens (`--focus`, `--focus-soft`, `--focus-foreground`)
- Modified tokens (`--background` is no longer pure white; `--border` is softer)
- Visual changes per component
- Recommendation to test in light + dark mode after upgrading

## Verification

In order:

1. `pnpm lint` — must pass with 0 errors (existing 7 warnings are tolerated)
2. `pnpm test` — all 1115+ tests must still pass. CSS changes shouldn't break tests; if any do, that's a real signal.
3. `pnpm build:pkg` — ESM + DTS must build cleanly
4. `next build` — preview app must build (lesson learned from the 0.8.0 PR — always run this locally before pushing)
5. **Manual visual check** in `pnpm dev`:
   - Buttons page (every variant + size, light + dark)
   - Inputs page (resting + focused, light + dark)
   - Cards page (light + dark)
   - Switch page (on + off, light + dark)
   - Form blocks (`login-form`, `register-form`, `forgot-password-form`, `select-org-form`, `magic-link-message`)
   - Foundations / colors page — verify the new accent tokens render
   - At least one block that uses lots of components together (e.g. `pricing-table`) to spot interaction bugs
6. Commit, push, PR, Vercel preview check, then merge

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| `bg-background` audit miss — components meant to be white surfaces accidentally pick up the canvas tint | Thorough grep before token change; manual visual check after; commit the audit fixes BEFORE the token change so the system stays consistent at every commit |
| Input focus state causes 1px layout shift when border thickens to 2px | Use `outline` instead of `border` for the focus state, OR pre-allocate the 2px via padding adjustment. Test in the preview app before committing. |
| Dark mode looks broken because I missed a `.dark` counterpart for one of the new tokens | Manual visual check both modes; the spec lists all 4 token edits across both modes explicitly |
| `font-semibold` cascade looks too heavy on dense forms | Already mitigated by selective scope — only buttons, field labels, card titles. Nav and tables stay `font-medium`. |
| Existing visual regression tests (`test:visual` / Playwright) fail because everything looks different | Expected. Update snapshots after manual visual review confirms the new look is intentional. |
| Consuming apps see unexpected breakage | Document in changelog; bump minor (0.9.0) so consumers know to expect visual changes; no API breakage means no migration guide needed |

## Open questions resolved during brainstorming

- **Accent colour:** cool blue, `oklch(0.58 0.18 245)` (Q2 → option B)
- **Brand token:** none — stay green-free, consumers can theme `--primary` for logos (Q3 → option B)
- **Font weight migration:** selective bump (buttons, field labels, card titles only) (Q4 → option B)
- **Canvas tint approach:** use existing `--background` / `--card` separation, no new token (Q5 → user override)
- **Sidebar:** out of scope (Q6 → option C)
- **`_form.tsx` description:** add the prop, additive only (Q7 → option A)
- **Border softening:** modify `--border` directly, system-wide (Q8 → option A)

## Out of scope reminder

When implementing, do **not** also do any of the following just because it'd be nice:

- Don't touch `Sidebar`. Its active-state colour will look slightly off until scope C; that's acceptable.
- Don't add new components.
- Don't refactor anything for "consistency" — only edit the files in the change list.
- Don't migrate the auth blocks to use the new `description` prop. Capability addition only.
- Don't re-add `--cogentic-green`. We made the call last time and it stands.

If during implementation the `bg-background` audit reveals a structural problem that *needs* fixing for the refresh to work, that's a legitimate scope expansion — flag it and pause for confirmation rather than just doing it.
