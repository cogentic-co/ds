# Plain Visual Refresh — Scope C (blocks, AppShell, Sidebar)

**Status:** Approved
**Date:** 2026-04-08
**Previous work:** Builds on [`2026-04-07-plain-visual-refresh-design.md`](./2026-04-07-plain-visual-refresh-design.md) (scope B — tokens + component refresh, currently on branch `feat/plain-visual-refresh`, PR #3 open).
**Research:** [`docs/notes/plain-design-language.md`](../../notes/plain-design-language.md)

## Goals

1. Complete the Plain-inspired visual refresh by adding the block-level and structural patterns that scope B deferred: new primitive blocks, a restructured `AppShell`, and a restyled `Sidebar`.
2. Stack on top of the existing `feat/plain-visual-refresh` branch — everything ships as part of v0.9.0 in one big PR.
3. Deliver 7 items: `Empty` compact variant, `SettingRow`, `SettingsCardGrid`, `RichRadioList`, `SequenceBuilder`, Plain-style `AppShell`, restyled `Sidebar`.

## Non-goals

- New token changes — `--focus` / `--focus-soft` / `--background` / `--border` from scope B are all we need. No new tokens in this scope.
- Migrating existing blocks (auth forms, pricing table, etc.) to use the new primitives. The new blocks are additive; existing blocks stay as-is.
- Major navigation or routing changes. `AppShell` restructuring stays inside the existing component boundary.
- Test visual regressions (Playwright) updates — those can happen after visual review.
- Migrating consuming apps. Since this is a breaking visual change, consumers will need to review their layouts, but that's their responsibility, not the scope of this PR.

## Branch strategy

Continue on `feat/plain-visual-refresh` (the existing scope B branch). Do NOT create a new branch. Scope C commits stack on top of the scope B commits. PR #3 is updated in place.

## Version

Stay at `0.9.0`. Scope B already bumped the version; scope C doesn't need another bump since it's the same PR.

## Dependencies to add

```json
"@dnd-kit/core": "^6.1.0",
"@dnd-kit/sortable": "^8.0.0",
"@dnd-kit/utilities": "^3.2.2"
```

Direct dependencies (not peer). Used only by `SequenceBuilder`. Tree-shakable — consumers not using `SequenceBuilder` won't pull them into their bundle thanks to the existing per-component subpath exports in `package.json`.

---

## New components

### 1. `Empty` — compact variant

**File:** `src/components/empty.tsx` (modify existing)

Add a `variant` prop to the existing `Empty` component:

```tsx
type EmptyProps = React.ComponentProps<"div"> & {
  variant?: "default" | "compact"
}
```

**`default`** (current behaviour — no change): large icon, title, description, optional action button. Used as a full empty state for whole pages/cards.

**`compact`** (new): small ghost icon (~16-20px) next to "No data" text in `text-sm text-muted-foreground`, centred in the available space. No title, no description, no action. Designed to sit INSIDE a chart/card where the gridlines or structure should still be visible around it.

API for compact:

```tsx
<Empty
  variant="compact"
  icon={<GhostIcon className="size-4" />}
  message="No data"
/>
```

Props (compact-only):
- `icon?: React.ReactNode` — optional icon (defaults to a small ghost-style lucide icon)
- `message?: string` — defaults to `"No data"`

**Data slot:** `data-slot="empty"` with `data-variant="compact"` attribute.

---

### 2. `SettingRow` block

**File:** `src/blocks/setting-row.tsx` (new)

The "icon + title + description + trailing action" pattern from Plain's settings screens. Designed to be stacked inside a `Card` with hairline dividers between rows.

```tsx
type SettingRowProps = React.ComponentProps<"div"> & {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}
```

**Structure:**

```tsx
<div data-slot="setting-row" className="flex items-start gap-4 p-5">
  {icon && <div className="shrink-0 text-muted-foreground">{icon}</div>}
  <div className="flex-1 min-w-0">
    <div className="font-semibold text-sm">{title}</div>
    {description && (
      <div className="text-sm text-muted-foreground mt-0.5">{description}</div>
    )}
  </div>
  {action && <div className="shrink-0">{action}</div>}
</div>
```

**Usage pattern** (documented in the preview, not as a new component):

```tsx
<Card>
  <SettingRow
    icon={<BellIcon className="size-5" />}
    title="Email notifications"
    description="Get notified when threads you follow get updates"
    action={<Switch />}
  />
  <Separator />
  <SettingRow ... />
</Card>
```

Separator dividers are the user's job to add via `Separator` between rows. Don't bake dividers into `SettingRow` — that'd make it weird to use outside a list.

**Exports:** `SettingRow`, `SettingRowProps`.
**Metadata entry:** `app/_component-meta/groups/new-components.ts`.
**Preview:** `app/blocks/[slug]/previews.tsx` — show 3-4 rows inside a `Card` with switches, selects, and buttons as actions.

---

### 3. `SettingsCardGrid` block

**File:** `src/blocks/settings-card-grid.tsx` (new)

The 2-column tile grid from Plain's settings home page. Each tile is a clickable card with: icon (in a soft-tinted square container), title, 2-line description.

```tsx
type SettingsCardGridItem = {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

type SettingsCardGridProps = React.ComponentProps<"div"> & {
  items: SettingsCardGridItem[]
  columns?: 1 | 2 | 3          // default 2
}
```

**Structure:** a CSS grid with the configured column count, each cell rendering an anchor element styled as a card:

```tsx
<Link
  href={item.href}
  className={cn(
    "group flex items-start gap-4 rounded-lg border border-border bg-card p-5",
    "transition-colors hover:bg-muted/40",
  )}
>
  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-focus-soft text-focus">
    {item.icon}
  </div>
  <div className="flex-1 min-w-0">
    <div className="font-semibold text-base">{item.title}</div>
    <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
  </div>
</Link>
```

**Uses `next/link`** for client-side navigation (consistent with existing blocks like `PageCta`).

**Exports:** `SettingsCardGrid`, `SettingsCardGridProps`, `SettingsCardGridItem`.

---

### 4. `RichRadioList` block

**File:** `src/blocks/rich-radio-list.tsx` (new)

The "list of radio options in one card with hairline dividers" pattern from Plain's role picker. Each option has a title and a description.

```tsx
type RichRadioOption = {
  value: string
  title: string
  description?: string
  disabled?: boolean
}

type RichRadioListProps = {
  options: RichRadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  className?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}
```

**Structure:**

```tsx
<Card className="p-0 overflow-hidden">
  <RadioGroup
    value={value}
    defaultValue={defaultValue}
    onValueChange={onValueChange}
    name={name}
    className="divide-y divide-border"
  >
    {options.map((option, i) => {
      const id = `rich-radio-${name ?? "list"}-${option.value}`
      return (
        <label
          key={option.value}
          htmlFor={id}
          className={cn(
            "flex cursor-pointer items-start gap-3 p-5",
            "transition-colors hover:bg-muted/30",
            option.disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <RadioGroupItem
            id={id}
            value={option.value}
            disabled={option.disabled}
            className="mt-0.5"
            aria-label={option.title}
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm">{option.title}</div>
            {option.description && (
              <div className="mt-0.5 text-sm text-muted-foreground">{option.description}</div>
            )}
          </div>
        </label>
      )
    })}
  </RadioGroup>
</Card>
```

**Uses existing `RadioGroup` / `RadioGroupItem`** primitives — this is a composition, not a new radio implementation.

**Note:** this does NOT replace `SelectOrgForm`'s `list` variant. That's a separate refinement for another PR.

**Exports:** `RichRadioList`, `RichRadioListProps`, `RichRadioOption`.

---

### 5. `SequenceBuilder` block

**File:** `src/blocks/sequence-builder.tsx` (new, the largest new component in this scope)

The reorderable step-list pattern from Plain's escalation-paths screen. Drag handle, numbered badge, header, slot for content, and insert-between `+` buttons to add new steps at any position.

**Dependencies:** `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.

```tsx
type SequenceStep = {
  id: string                    // stable identity for dnd-kit
  title?: React.ReactNode       // optional header text
  content: React.ReactNode      // the step body (inputs, selects, etc.)
}

type SequenceBuilderProps = {
  steps: SequenceStep[]
  onStepsChange: (steps: SequenceStep[]) => void
  onAddStep?: (index: number) => void    // index = where to insert (0 = before first, steps.length = after last)
  onRemoveStep?: (id: string) => void
  addLabel?: string             // default: "Add step"
  className?: string
}
```

**Structure:**

```
[drag handle]  [01]  title                  [trash]
               ┌─────────────────────────────────┐
               │  content (user-provided)        │
               └─────────────────────────────────┘
                            │
                         [ + ]            ← insert between
                            │
[drag handle]  [02]  title                  [trash]
               ┌─────────────────────────────────┐
               │  content                        │
               └─────────────────────────────────┘
```

**Design details:**
- Drag handle: lucide `GripVertical` icon, `text-muted-foreground/50`, `hover:text-muted-foreground`. Positioned OUTSIDE the step card on the left.
- Step number badge: `01`/`02`/`03` in a `size-8 rounded-md bg-muted/50 font-mono text-sm text-muted-foreground` square.
- Trash icon: `size-8` ghost button, `text-muted-foreground/50`, only shown on hover.
- Card around each step: `rounded-lg border border-border bg-card p-4`.
- Insert-between `+` button: `size-9 rounded-md border border-border bg-card shadow-xs` centred between adjacent steps, with a vertical 1px guide line `border-l border-border` connecting cards. Hover state uses `border-focus`.
- `+` buttons also appear above the first step and below the last step so users can insert at any position.

**Drag behaviour:**
- `DndContext` wraps the list
- `SortableContext` with `verticalListSortingStrategy`
- Each step is a `useSortable` item
- Reorder fires `onStepsChange` with the new ordering
- Insert fires `onAddStep(index)`
- Remove fires `onRemoveStep(id)`

**Exports:** `SequenceBuilder`, `SequenceBuilderProps`, `SequenceStep`.

---

## Structural changes

### 6. `AppShell` — Plain-style layout

**File:** `src/shells/app-shell.tsx` (modify existing)

The current `AppShell` is ~371 lines and likely uses a shadcn-style sidebar layout. Read it first to understand the current structure. The change is:

**Current:** whatever layout exists today (likely white canvas + sidebar with accent bg).

**Target:** three-column Plain-style layout:

1. **Icon rail column** — fixed ~64px wide, `bg-card` (white), no border, contains top-level navigation as icon-only buttons. Active item = solid `bg-foreground` square with `text-background` icon. Inactive = stroked lucide icon in `text-muted-foreground`, hover `text-foreground`.

2. **Secondary nav panel** — fixed ~240px wide (collapsible to zero for narrow viewports), `bg-card` (white), with:
   - Header: workspace name (`font-semibold`) + org subtitle + optional right-side actions
   - Scrollable nav list
   - Footer: plain text or optional action (trial CTA, upgrade link, etc.)
   - Vertical `border-r border-border` separator from the main canvas

3. **Main canvas** — flex-1, `bg-background` (which is now the cool-grey canvas tint thanks to scope B). Contains the page content — usually one or more white `<Card>` components that "float" on the canvas.

**Props:**

```tsx
type AppShellProps = {
  iconRail: IconRailItem[]         // top-level icons
  activeRailId?: string
  onRailSelect?: (id: string) => void

  navHeader?: React.ReactNode      // workspace header
  navItems?: NavGroup[]            // secondary nav
  navFooter?: React.ReactNode

  children: React.ReactNode        // main canvas content
}

type IconRailItem = {
  id: string
  icon: React.ReactNode
  label: string                    // for aria-label / tooltip
  href?: string
}

type NavGroup = {
  label?: string                   // optional group header
  items: NavItem[]
}

type NavItem = {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  count?: number
  active?: boolean
  children?: NavItem[]             // for nested items
}
```

**Breaking change:** the props shape is fundamentally different from the current shadcn-style `AppShell`. Consumers will need to migrate. Since we're the only consumer, this is acceptable.

The **current** `AppShell` export will be preserved behind a temporary name (`LegacyAppShell` or similar) so the preview app doesn't break instantly during implementation — consuming pages will be migrated file-by-file in the same PR.

### 7. `Sidebar` — restyle

**File:** `src/components/sidebar.tsx` (modify existing)

The existing shadcn-based `Sidebar` component stays as-is in terms of API and structure — this is **not** a rewrite. The change is the **active state styling**:

- `SidebarMenuButton`'s `data-active=true` state uses `bg-focus-soft text-foreground` instead of the current `bg-sidebar-accent` treatment
- `font-semibold` on the active item (currently `font-medium`)
- `rounded-md` (likely already correct)
- No left-border accent stripe (remove if present)

The new `AppShell` (item 6) does NOT use the existing `Sidebar` component internally — it builds its own simpler icon-rail + nav-panel structure. But the existing `Sidebar` remains exported so any consuming page that uses it directly keeps working (with the new colour treatment).

---

## File-by-file change list

| File | Change |
|---|---|
| `package.json` | Add `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` |
| `tsup.config.ts` | Add entry points for new blocks (`blocks/setting-row`, `blocks/settings-card-grid`, `blocks/rich-radio-list`, `blocks/sequence-builder`) |
| `src/components/empty.tsx` | Add `compact` variant |
| `src/blocks/setting-row.tsx` | NEW |
| `src/blocks/settings-card-grid.tsx` | NEW |
| `src/blocks/rich-radio-list.tsx` | NEW |
| `src/blocks/sequence-builder.tsx` | NEW (with `@dnd-kit` integration) |
| `src/shells/app-shell.tsx` | Restructured to Plain layout |
| `src/components/sidebar.tsx` | Active state uses `--focus-soft` |
| `src/index.ts` | Export new blocks |
| `src/blocks/__tests__/setting-row.test.tsx` | NEW |
| `src/blocks/__tests__/settings-card-grid.test.tsx` | NEW |
| `src/blocks/__tests__/rich-radio-list.test.tsx` | NEW |
| `src/blocks/__tests__/sequence-builder.test.tsx` | NEW |
| `src/shells/__tests__/app-shell.test.tsx` | Update to cover new props shape |
| `src/components/__tests__/empty.test.tsx` | Update to cover compact variant |
| `app/blocks/[slug]/previews.tsx` | Add previews for the 4 new blocks |
| `app/preview-shell.tsx` | Add new blocks to sidebar list, **migrate to new AppShell props shape** |
| `app/_component-meta/groups/new-components.ts` | Add metadata for the new blocks |
| `skills/ds-expert/SKILL.md` | Document new blocks |

## Verification

In order:
1. `pnpm lint` — 0 errors
2. `pnpm test` — all existing tests pass + new tests for the 4 new blocks
3. `pnpm build:pkg` — ESM + DTS green
4. `next build` — preview app builds cleanly (the AppShell migration in `app/preview-shell.tsx` is the biggest risk here)
5. **Manual visual check** in `pnpm dev`:
   - Every component preview page renders correctly (AppShell is used in the shell around them)
   - New block previews render the 4 new blocks
   - Empty compact variant renders inside a chart
   - Sidebar active state shows the cool-blue tinted fill
   - Tinted canvas visible behind white cards
6. Push to PR #3 (existing)

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| AppShell migration breaks the preview app during the transition | Migrate `app/preview-shell.tsx` in the same commit as the AppShell source change, so no intermediate broken state |
| `@dnd-kit` adds bundle size for consumers who don't use SequenceBuilder | Per-component subpath exports in `package.json` already isolate it. Verify after build that `dist/index.js` doesn't pull `@dnd-kit` into the main barrel |
| `SequenceBuilder` dnd wiring is non-trivial and could slip | Build without dnd first, ship the static builder, add dnd as the last step. If dnd blocks the PR, ship with dnd deferred |
| New test files add ~30 minutes of setup each | Use the existing block test pattern (`auth-form` tests as template) — render + a11y axe + className merge |
| `Sidebar` colour change might clash with any existing `bg-sidebar-*` tokens consumers use | Document in changelog. Since we're the only consumer, this is effectively zero-risk |
| Scope C's 7 items = large diff to review | You asked for one big PR. Accepted risk. |

## Execution approach

Given the scope, this will be **subagent-driven** like scope B, but with larger task chunks:

- **Task 1:** Add `@dnd-kit` deps and `Empty` compact variant (small, warm-up)
- **Task 2:** Build `SettingRow` + tests + preview + metadata
- **Task 3:** Build `SettingsCardGrid` + tests + preview + metadata
- **Task 4:** Build `RichRadioList` + tests + preview + metadata
- **Task 5:** Build `SequenceBuilder` (source + dnd wiring)
- **Task 6:** `SequenceBuilder` tests + preview + metadata
- **Task 7:** `Sidebar` active-state restyle
- **Task 8:** `AppShell` restructure (source)
- **Task 9:** `app/preview-shell.tsx` migration to new AppShell API
- **Task 10:** Full verification (lint, test, build, next build, manual visual)

Each task is committed individually so we can roll back if any step breaks the preview app.
