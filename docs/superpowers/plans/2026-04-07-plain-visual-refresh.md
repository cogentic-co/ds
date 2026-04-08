# Plain Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adopt Plain-inspired visual refinements (cool-blue `--focus` accent, tinted page canvas, softened borders, taller inputs, semibold emphasis) across `Button`, `Input`, `Textarea`, `Card`, `Switch`, `Field`, and the `_form.tsx` helper, without breaking any APIs.

**Architecture:** CSS-only changes driven by token edits in `src/styles/globals.css` plus targeted className updates in 7 component files. New `--focus` token slot avoids colliding with the existing `--accent` (which stays as the menu/dropdown hover bg). The `bg-background` → `bg-card` audit happens BEFORE the canvas tint lands so the system stays consistent at every commit.

**Tech Stack:** Tailwind v4 with `@theme inline` tokens, OKLch colour space, CVA for variants, vitest for tests, tsup for package build, Next.js for preview app.

**Spec:** [`docs/superpowers/specs/2026-04-07-plain-visual-refresh-design.md`](../specs/2026-04-07-plain-visual-refresh-design.md)
**Research:** [`docs/notes/plain-design-language.md`](../../notes/plain-design-language.md)

---

## Task 0: Branch setup

**Files:** none

- [ ] **Step 1: Create the branch from main**

```bash
git checkout main && git pull && git checkout -b feat/plain-visual-refresh
```

Expected: switched to a new branch `feat/plain-visual-refresh`

- [ ] **Step 2: Verify clean working tree**

```bash
git status
```

Expected: `nothing to commit, working tree clean`

---

## Task 1: Audit `bg-background` usages

The canvas-tint change in Task 2 will cause anything currently using `bg-background` to pick up the tint. Surfaces (cards, dialogs, sheets, popovers, inputs) need to switch to `bg-card` so they stay white. This task is **the audit and fixes only** — no token changes yet.

**Files to inspect (full list — every `bg-background` in `src/components`):**

Run this first to get the exact list:

```bash
grep -rn "bg-background\b" src/components
```

Expected output: ~25 lines.

**Files:**
- Modify (any of these that match the audit):
  - `src/components/input.tsx`
  - `src/components/textarea.tsx`
  - `src/components/dialog.tsx`
  - `src/components/sheet.tsx`
  - `src/components/popover.tsx` (if present)
  - `src/components/dropdown-menu.tsx` (only the popup surface, not items)
  - `src/components/select.tsx` (only the popup surface)
  - `src/components/combobox.tsx` (popup surface)
  - `src/components/menubar.tsx` (popup surface)
  - `src/components/badge.tsx` (only if used as a container, not as a chip)
  - `src/components/button.tsx` (the `outline` and `toggle` variants)
  - `src/components/sidebar.tsx` (if it uses `bg-background` for the rail surface)
  - `src/components/segmented-control.tsx`
  - `src/components/native-select.tsx`
  - `src/components/file-upload.tsx`
  - `src/blocks/page-cta.tsx` already uses `bg-primary` — leave it
- Test: `src/blocks/__tests__/`, `src/components/__tests__/` (run the existing suite, no new tests for this task)

**Audit decision rule:**

| Use of `bg-background` | Decision |
|---|---|
| The component is a "page area" or full-screen container | Leave as `bg-background` (it WILL get the tint, that's intentional) |
| The component is a content surface (card, dialog, sheet, popover content, input field, dropdown popup) | Change to `bg-card` |
| The component is a generic chip / pill / inline element | Change to `bg-card` (so it stays white when placed on the tinted canvas) |
| `dark:bg-input/30` or similar `dark:` overrides on inputs | Leave the dark override; only the light-mode `bg-background` changes |

When in doubt, **use `bg-card`**. The number of "this should be tinted" elements is essentially zero in `src/components/` — almost everything in there is a surface.

- [ ] **Step 1: Run the audit grep and capture the list**

```bash
grep -rn "bg-background\b" src/components > /tmp/bg-background-audit.txt && cat /tmp/bg-background-audit.txt
```

Expected: a list of ~25 lines, file paths with line numbers.

- [ ] **Step 2: Walk the list and edit each match**

For each match, open the file at the line number and replace `bg-background` with `bg-card` UNLESS the audit decision rule says otherwise. Use the Edit tool with enough surrounding context to disambiguate (`bg-background` may appear in a long className string).

Example for `src/components/input.tsx:12`:

```tsx
// Before
"h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 ..."
```

`input.tsx` actually uses `bg-transparent` not `bg-background`, so it's a no-op for this file. Skip and move on.

Example for `src/components/dialog.tsx:53`:

```tsx
// Before
"... rounded-xl border border-border-light bg-background p-6 ..."
// After
"... rounded-xl border border-border-light bg-card p-6 ..."
```

- [ ] **Step 3: Re-run the grep to verify only intentional uses remain**

```bash
grep -rn "bg-background\b" src/components
```

Expected: only matches in files that legitimately need `bg-background` (rare — likely none, or 1-2 page-area components).

- [ ] **Step 4: Run the test suite to confirm nothing broke**

```bash
pnpm test
```

Expected: `Test Files 136 passed (136)` and `Tests 1115 passed (1115)`. CSS class changes don't affect tests, but if a test asserts on a className it might.

- [ ] **Step 5: Commit**

```bash
git add src/components
git commit -m "Audit bg-background usages, switch surfaces to bg-card

Prepares for the canvas-tint token change in the next commit.
Components that are content surfaces (dialogs, sheets, popovers,
dropdowns) now use bg-card so they stay white when --background
becomes tinted."
```

---

## Task 2: Token edits in `globals.css`

**Files:**
- Modify: `src/styles/globals.css`
- Test: none (CSS-only change, existing test suite covers regression)

- [ ] **Step 1: Read the current file to find the relevant lines**

```bash
grep -n "@theme inline\|--background\|--card\|--border\b\|--accent\b\|:root\|.dark" src/styles/globals.css
```

Note the line numbers for:
- `@theme inline` block opening
- `--color-accent: var(--accent);` line in the @theme block
- `:root {` block opening
- `--background:` in `:root`
- `--border:` in `:root`
- `.dark {` block opening
- `--background:` in `.dark`
- `--border:` in `.dark`

- [ ] **Step 2: Add `--focus` token mappings to the `@theme inline` block**

Find the existing `--color-accent: var(--accent);` line and add three new lines immediately after it:

```css
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  --color-focus: var(--focus);
  --color-focus-foreground: var(--focus-foreground);
  --color-focus-soft: var(--focus-soft);
```

This makes `bg-focus`, `text-focus-foreground`, `bg-focus-soft`, `border-focus` available as Tailwind utilities.

- [ ] **Step 3: Add the light-mode `--focus` values and edit `--background` + `--border` in `:root`**

In the `:root {` block, find the existing values and edit:

```css
:root {
  --radius: 0.625rem;
  /* CHANGED: was oklch(98.511% 0.00011 271.152) */
  --background: oklch(0.985 0.003 245);
  --foreground: oklch(0.172 0.006 286.3);
  --card: oklch(1 0 89.88);                    /* unchanged — stays white */
  /* ... existing tokens ... */
  /* CHANGED: was oklch(0.924 0.003 255.9) */
  --border: oklch(0.92 0.005 245);
  /* ... existing tokens ... */

  /* ADD AT END OF :root BLOCK, AFTER existing tokens, BEFORE the closing brace: */
  --focus: oklch(0.58 0.18 245);
  --focus-foreground: oklch(0.99 0 0);
  --focus-soft: oklch(0.96 0.025 245);
}
```

Use Edit calls to make each change individually so you don't have to reproduce the whole `:root` block.

- [ ] **Step 4: Add the dark-mode `--focus` values and edit `--background` + `--border` in `.dark`**

```css
.dark {
  /* CHANGED: was oklch(0.23 0.02 265) */
  --background: oklch(0.20 0.015 245);
  --foreground: oklch(0.98 0.01 255);
  --card: oklch(0.26 0.02 265);                /* unchanged */
  /* ... */
  /* CHANGED: was oklch(0.36 0.01 265) */
  --border: oklch(0.30 0.01 245);
  /* ... */

  /* ADD AT END OF .dark BLOCK: */
  --focus: oklch(0.65 0.18 245);
  --focus-foreground: oklch(0.10 0 0);
  --focus-soft: oklch(0.22 0.04 245);
}
```

- [ ] **Step 5: Verify the file parses cleanly via the build**

```bash
pnpm build:pkg 2>&1 | tail -5
```

Expected: `ESM ⚡️ Build success` and `DTS ⚡️ Build success`. CSS isn't compiled by tsup, but a syntax error in the file would also break Next dev mode. Run a Next build as the real check:

```bash
pnpm build 2>&1 | tail -10
```

Expected: `Compiled successfully`. If you get a CSS parse error, the new token block has a typo.

- [ ] **Step 6: Run the test suite**

```bash
pnpm test
```

Expected: 1115 passing (or whatever the current count is — should be unchanged from Task 1).

- [ ] **Step 7: Commit**

```bash
git add src/styles/globals.css
git commit -m "Add --focus token, tint --background, soften --border

Introduces a saturated cool-blue --focus accent (with -foreground
and -soft variants) under a new token name to avoid colliding with
the existing --accent (menu hover bg). --background shifts from
pure white to a faint cool grey to act as the page canvas; --border
softens for less assertive dividers. Both light and dark modes."
```

---

## Task 3: `Button` refresh

**Files:**
- Modify: `src/components/button.tsx`
- Test: `src/components/__tests__/button.test.tsx` (existing — verify still passes)

- [ ] **Step 1: Read the current button file**

```bash
cat src/components/button.tsx
```

Locate:
- The base classes string (line ~9)
- The `default` size in the `size` variants (line ~28-29)
- The `outline` variant
- The `toggle` variant (which currently uses `bg-background`)

- [ ] **Step 2: Update the base classes**

In the `cva()` first argument, find:

```
"focus-visible:border-ring focus-visible:ring-ring/50 ... rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 ..."
```

Change `rounded-md` → `rounded-lg` and `font-medium` → `font-semibold`.

- [ ] **Step 3: Update the `default` size to be taller**

In the `size` variants object, find:

```
default: "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
```

Change to:

```
default: "h-10 gap-2 px-3.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
```

(`h-9` → `h-10`, `gap-1.5` → `gap-2`, `px-2.5` → `px-3.5`)

- [ ] **Step 4: Update the `outline` variant to use `bg-card`**

Find:

```
outline:
  "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs",
```

Change `bg-background` → `bg-card`.

- [ ] **Step 5: Update the `toggle` variant to use `bg-card`**

Find:

```
toggle:
  "border rounded-full border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
```

Change `bg-background` → `bg-card`. Leave `bg-accent` / `text-accent-foreground` alone — those are intentional (menu-style hover, not the focus accent).

- [ ] **Step 6: Run the button tests**

```bash
pnpm test src/components/__tests__/button.test.tsx
```

Expected: all existing button tests pass. If any assert on `h-9` or `rounded-md` they will fail — update them to the new values.

- [ ] **Step 7: Run lint**

```bash
pnpm lint 2>&1 | grep -E "error|button" | head
```

Expected: no errors related to button.tsx.

- [ ] **Step 8: Commit**

```bash
git add src/components/button.tsx src/components/__tests__/button.test.tsx
git commit -m "Refresh Button: rounded-lg, h-10, font-semibold, bg-card surfaces

Default size grows from 36px to 40px. Border radius bumps to lg.
Base font weight is now semibold. Outline and toggle variants use
bg-card so they stay white on the new tinted canvas."
```

---

## Task 4: `Input` refresh

**Files:**
- Modify: `src/components/input.tsx`
- Test: `src/components/__tests__/input.test.tsx` (existing — verify still passes)

- [ ] **Step 1: Read the current file**

```bash
cat src/components/input.tsx
```

The single relevant string is the base classes on line ~12.

- [ ] **Step 2: Update height, radius, padding, focus state**

Find:

```
"h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
```

Apply these changes:
- `h-9` → `h-11`
- `rounded-md` → `rounded-lg`
- `px-2.5` → `px-3.5`
- `bg-transparent` → `bg-card`
- `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50` → `focus-visible:border-focus focus-visible:border-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:-m-px`

The `-m-px` compensates for the 1px → 2px border growth so the field doesn't shift its neighbours by 1px when focused. Test in the preview app — if there's still a shift, switch to `box-shadow` for the focus border instead.

- [ ] **Step 3: Run the input tests**

```bash
pnpm test src/components/__tests__/input.test.tsx
```

Expected: pass. If a test asserts on `h-9`, update it.

- [ ] **Step 4: Visually check in the preview app**

```bash
pnpm dev
```

Open http://localhost:3000/components/input. Click into the input. Verify:
- Field is taller than before
- Focus state is a 2px cool-blue border, no outer ring
- No layout shift on focus

Stop the dev server when done.

- [ ] **Step 5: Commit**

```bash
git add src/components/input.tsx src/components/__tests__/input.test.tsx
git commit -m "Refresh Input: h-11, rounded-lg, focus = 2px focus border

Inputs are taller and rounder. Focus state is a 2px cool-blue
border instead of an outer ring, matching the Plain pattern.
bg-card so inputs stay white on the tinted canvas."
```

---

## Task 5: `Textarea` refresh

**Files:**
- Modify: `src/components/textarea.tsx`
- Test: `src/components/__tests__/textarea.test.tsx` (if it exists)

- [ ] **Step 1: Read the current file**

```bash
cat src/components/textarea.tsx
```

- [ ] **Step 2: Update bg, radius, focus state**

Find:

```
"field-sizing-content flex min-h-16 w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
```

Apply:
- `rounded-md` → `rounded-lg`
- `bg-transparent` → `bg-card`
- `px-2.5` → `px-3.5`
- `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50` → `focus-visible:border-focus focus-visible:border-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:-m-px`

(Same focus treatment as Input.)

- [ ] **Step 3: Run the test suite to confirm**

```bash
pnpm test src/components/__tests__/textarea.test.tsx 2>&1 | tail -5
```

Expected: pass (or "no test files found" — that's fine, the textarea may not have its own test).

- [ ] **Step 4: Commit**

```bash
git add src/components/textarea.tsx
git commit -m "Refresh Textarea: rounded-lg, bg-card, focus = 2px focus border

Same focus treatment as Input. bg-card for canvas consistency."
```

---

## Task 6: `Card` refresh

**Files:**
- Modify: `src/components/card.tsx`
- Test: `src/components/__tests__/card.test.tsx` (existing)

- [ ] **Step 1: Read the current file**

```bash
cat src/components/card.tsx | head -80
```

Locate:
- The `Card` base className on line ~27 (currently has `shadow-xs`)
- The `CardTitle` className on line ~54 (currently has `font-medium`)

- [ ] **Step 2: Drop the default shadow on `Card`**

Find:

```
"group/card flex flex-col gap-6 overflow-hidden rounded-xl border border-border bg-card py-6 text-card-foreground text-sm shadow-xs has-[>img:first-child]:pt-0 ..."
```

Remove `shadow-xs` from the string.

- [ ] **Step 3: Bump `CardTitle` to `font-semibold`**

Find:

```
"font-medium text-base leading-normal group-data-[size=sm]/card:text-sm"
```

Change `font-medium` → `font-semibold`.

- [ ] **Step 4: Run the card tests**

```bash
pnpm test src/components/__tests__/card.test.tsx
```

Expected: pass. If a test asserts on `font-medium` or `shadow-xs` for the title, update it.

- [ ] **Step 5: Commit**

```bash
git add src/components/card.tsx src/components/__tests__/card.test.tsx
git commit -m "Refresh Card: drop default shadow, CardTitle font-semibold

Cards rely on the canvas tint + border for elevation now. No outer
shadow by default. CardTitle bumps to semibold to match the Plain
emphasis pattern."
```

---

## Task 7: `Switch` refresh

**Files:**
- Modify: `src/components/switch.tsx`
- Test: `src/components/__tests__/switch.test.tsx` (existing)

- [ ] **Step 1: Read the current file**

```bash
cat src/components/switch.tsx
```

The relevant line is the root className on line ~19 with `data-checked:bg-primary`.

- [ ] **Step 2: Change the on-state colour**

Find `data-checked:bg-primary` and change to `data-checked:bg-focus`.

If there's an associated `dark:data-checked:bg-primary` or similar, change that too. Inspect carefully — there may also be a thumb colour using `bg-primary-foreground` that should stay as-is (the white circle on the switch).

- [ ] **Step 3: Run the switch tests**

```bash
pnpm test src/components/__tests__/switch.test.tsx
```

Expected: pass. If a test asserts on `bg-primary` for the on-state, update it to `bg-focus`.

- [ ] **Step 4: Commit**

```bash
git add src/components/switch.tsx src/components/__tests__/switch.test.tsx
git commit -m "Refresh Switch: on-state uses --focus accent

Switches now turn cool blue when on, matching the Plain accent
system. Off-state and thumb colours unchanged."
```

---

## Task 8: `Field` refresh

**Files:**
- Modify: `src/components/field.tsx`
- Test: `src/components/__tests__/field.test.tsx` (existing, if present)

- [ ] **Step 1: Read the file**

```bash
cat src/components/field.tsx | head -120
```

Locate the `FieldLabel` function (around line ~95) which currently has no font weight specified — labels inherit from the surrounding text or use the underlying `Label` component.

- [ ] **Step 2: Inspect the `Label` component to see what weight it uses**

```bash
cat src/components/label.tsx
```

If `Label` already uses `font-medium` or no weight, we need to add `font-semibold` either to `FieldLabel` or to `Label` directly. Prefer adding to `FieldLabel` so we don't change the bare `Label` component (which is used standalone too).

- [ ] **Step 3: Add `font-semibold` to `FieldLabel`**

In `field.tsx`, find:

```tsx
function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug ...",
        className,
      )}
      {...props}
    />
  )
}
```

Add `font-semibold` to the start of the className string:

```tsx
"group/field-label peer/field-label flex w-fit gap-2 font-semibold leading-snug ..."
```

- [ ] **Step 4: Run the tests**

```bash
pnpm test src/components/__tests__/field.test.tsx 2>&1 | tail -5
```

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/field.tsx
git commit -m "Refresh Field: FieldLabel font-semibold

Field labels are now semibold to match the Plain emphasis pattern.
Standalone Label component is left untouched."
```

---

## Task 9: `_form.tsx` description prop

**Files:**
- Modify: `src/blocks/_form.tsx`
- Test: existing block tests should still pass; no new test required (purely additive)

- [ ] **Step 1: Read the current file**

```bash
cat src/blocks/_form.tsx
```

Locate the `TextFieldProps` type and the `TextField` function.

- [ ] **Step 2: Add `description` to the props type**

Find:

```tsx
type TextFieldProps = {
  form: AnyForm
  name: string
  label: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  autoComplete?: string
  required?: boolean
  rightSlot?: React.ReactNode
}
```

Add a new line:

```tsx
type TextFieldProps = {
  form: AnyForm
  name: string
  label: string
  description?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  autoComplete?: string
  required?: boolean
  rightSlot?: React.ReactNode
}
```

- [ ] **Step 3: Destructure `description` and render it between label and input**

Find:

```tsx
export function TextField({
  form,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required,
  rightSlot,
}: TextFieldProps) {
```

Add `description`:

```tsx
export function TextField({
  form,
  name,
  label,
  description,
  type = "text",
  placeholder,
  autoComplete,
  required,
  rightSlot,
}: TextFieldProps) {
```

Then in the JSX, find the section that renders the label:

```tsx
<div className="flex items-center justify-between">
  <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
  {rightSlot}
</div>
<Input
  ...
```

Insert the description right after the label div, before the `Input`:

```tsx
<div className="flex items-center justify-between">
  <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
  {rightSlot}
</div>
{description && (
  <p className="text-sm text-muted-foreground">{description}</p>
)}
<Input
  ...
```

- [ ] **Step 4: Run the auth block tests to confirm nothing broke**

```bash
pnpm test src/blocks/__tests__/
```

Expected: all 22 auth block tests still pass (none of them pass `description` so behaviour is unchanged for them).

- [ ] **Step 5: Commit**

```bash
git add src/blocks/_form.tsx
git commit -m "Add optional description prop to TextField helper

Renders between FieldLabel and Input as muted small text. Purely
additive — existing auth blocks don't pass description and behave
identically. Enables the Plain 'description above input' pattern
for future blocks."
```

---

## Task 10: Version bump and full verification

**Files:**
- Modify: `package.json`
- Test: full suite

- [ ] **Step 1: Bump the version**

Read `package.json` line 3:

```json
"version": "0.8.0",
```

Change to:

```json
"version": "0.9.0",
```

- [ ] **Step 2: Run the full test suite**

```bash
pnpm test
```

Expected: `Test Files 136 passed (136)` and `Tests 1115 passed (1115)`. If any test fails, the failure is real — investigate before continuing.

- [ ] **Step 3: Run lint**

```bash
pnpm lint 2>&1 | tail -5
```

Expected: 0 errors. The 7 pre-existing warnings are tolerated.

- [ ] **Step 4: Run the package build**

```bash
pnpm build:pkg 2>&1 | grep -E "success|error" | tail -5
```

Expected: `ESM ⚡️ Build success` and `DTS ⚡️ Build success`.

- [ ] **Step 5: Run the Next preview build (this is the key check)**

```bash
rm -f .next/lock && pnpm build 2>&1 | tail -20
```

Expected: `Compiled successfully` and a route table with all the preview pages. If this fails, it's almost certainly a CSS parse error in `globals.css` from Task 2 or a className that no longer compiles. Fix before continuing.

- [ ] **Step 6: Manual visual check in dev mode**

```bash
pnpm dev
```

Open http://localhost:3000 and walk through:

- [ ] **Buttons page** (`/components/button`): every variant + size, light AND dark mode (toggle via system or the docs theme switcher). Confirm: rounded-lg, h-10 default, font-semibold, no broken contrast.
- [ ] **Inputs page** (`/components/input`): resting state, focused state. Confirm: h-11, 2px cool-blue focus border, no layout shift on focus, no outer ring.
- [ ] **Card page** (`/components/card`): no shadow, rounded-xl, CardTitle is semibold.
- [ ] **Switch page** (`/components/switch`): toggle on. Confirm: cool blue when on, not dark neutral.
- [ ] **Field/form page**: label is semibold.
- [ ] **Auth blocks** (`/blocks/login-form`, `/blocks/register-form`, etc.): all five render cleanly, focus states work, submit buttons render correctly.
- [ ] **A few random other component pages** (`/components/dialog`, `/components/popover`, `/components/dropdown-menu`): confirm popovers and dialogs are still WHITE (the bg-card swap from Task 1 should mean they don't pick up the canvas tint).
- [ ] **Foundations colors page** (`/foundations/colors`): the colour swatches render. The new `--focus` token isn't listed there yet — that's fine.
- [ ] **Page background** in any view: should be a faint cool grey, not pure white. Cards inside should be visibly white, "lifted" off the page.
- [ ] **Dark mode** for all of the above. Most likely place for issues is the `--background` dark value — if cards look indistinguishable from the canvas in dark mode, the dark `--background` value needs more separation from `--card`.

Stop the dev server when done.

- [ ] **Step 7: Commit the version bump**

```bash
git add package.json
git commit -m "Bump version 0.8.0 -> 0.9.0 for visual refresh

Visual breaking change: --focus accent token, tinted canvas,
softer borders, taller inputs, semibold emphasis. No API changes.
See docs/superpowers/specs/2026-04-07-plain-visual-refresh-design.md"
```

- [ ] **Step 8: Push and open the PR**

```bash
git push -u origin feat/plain-visual-refresh
gh pr create --title "Plain visual refresh (v0.9.0)" --body "$(cat <<'EOF'
## Summary

Visual-only refresh aligning the DS with [Plain](https://plain.com)'s design language. No API changes — every component prop and signature is preserved. But every consuming app will look visibly different.

### Token changes
- **New:** \`--focus\`, \`--focus-foreground\`, \`--focus-soft\` (cool blue accent)
- **Modified:** \`--background\` (faint cool grey, was pure white), \`--border\` (softer, cooler)
- **Unchanged:** \`--accent\` (still the existing menu/dropdown hover bg — collision avoided)

### Component changes
- \`Button\`: \`h-10\` default (was h-9), \`rounded-lg\`, \`font-semibold\`
- \`Input\` / \`Textarea\`: \`h-11\` (was h-9), \`rounded-lg\`, focus = 2px cool-blue border (no ring)
- \`Card\`: no default shadow, \`CardTitle\` semibold
- \`Switch\`: on-state uses \`--focus\` (cool blue) not \`--primary\`
- \`Field\`: \`FieldLabel\` semibold
- \`_form.tsx\`: \`TextField\` gains optional \`description\` prop (additive, no behaviour change)
- All \`bg-background\` content surfaces (dialog, sheet, popover, dropdown popups, etc.) switched to \`bg-card\` so they stay white on the tinted canvas

### Out of scope
- \`Sidebar\` (its active state will look slightly off until scope C)
- New blocks (\`SettingRow\`, \`SequenceBuilder\`)
- AppShell restructuring

### Spec
\`docs/superpowers/specs/2026-04-07-plain-visual-refresh-design.md\`

## Test plan
- [x] \`pnpm test\` — 1115 tests passing
- [x] \`pnpm lint\` — 0 errors
- [x] \`pnpm build:pkg\` — green
- [x] \`next build\` — green
- [ ] Manual visual check in light + dark mode (reviewer to confirm)
- [ ] Vercel preview deploy passes
EOF
)"
```

- [ ] **Step 9: Wait for Vercel preview to pass before merging**

```bash
sleep 60 && gh pr view --json mergeStateStatus,statusCheckRollup
```

Expected: `mergeStateStatus: CLEAN` and the Vercel check `state: SUCCESS`. If failing, investigate before merging.

---

## Notes for the executor

**Why the audit (Task 1) goes first, before token changes (Task 2):** If Task 2 lands first, every dropdown and dialog will pick up the canvas tint and look broken until Task 1 completes. Doing the audit first means the system is consistent at every commit.

**The focus state implementation might need iteration.** The `border-2 + -m-px` trick is the cleanest CSS solution, but if it causes any layout shift in practice, fall back to using `box-shadow` or `outline` for the focus indicator. Test in the preview app before committing Task 4.

**No new tests are written in this plan.** Every change is CSS-only. Existing tests that assert on exact className substrings (`h-9`, `font-medium`, `bg-primary` etc.) will fail and need updating to the new values — fix them in the same task that breaks them, not as a separate task.

**Don't expand scope.** If during implementation you notice "the Sidebar would look better with the new accent" or "the Empty component should have a compact variant" — that's scope C. Note it down and don't touch it. The spec is deliberately tight.

**Don't refactor adjacent code for "consistency."** Only edit the files in the change list for each task.
