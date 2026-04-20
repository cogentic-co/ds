# Cogentic DS — design system reference

This is the authoritative reference for auditing code in `src/`. Extracted from
`src/styles/globals.css` (tokens), `src/lib/tone.ts` (pastels), and the most
frequent patterns in `src/components/` + `src/blocks/`.

## Tokens (from globals.css)

### Colour — semantic

- `--background`, `--foreground` — page
- `--card`, `--card-foreground` — raised surfaces
- `--popover` — overlays
- `--primary`, `--primary-foreground` — default CTA
- `--secondary`, `--secondary-foreground` — neutral actions
- `--muted`, `--muted-foreground` — de-emphasised bg + text
- `--accent`, `--accent-foreground` — subtle tint
- `--focal`, `--focal-foreground`, `--focal-soft` — brand accent (blue)
- `--destructive`, `--destructive-foreground` — error / danger
- `--warning`, `--warning-foreground` — warn (legacy — prefer `highlight` pastel)
- `--success` — success green (legacy token — keep)
- `--border`, `--border-light`, `--border-illustration` — dividers
- `--input`, `--ring` — form focus
- `--risk-high` — specific risk band

### Colour — pastels (the DS-refresh palette)

All pastels come as `{tone}` + `{tone}-ink` pairs. Use Tailwind classes
`bg-{tone}` / `text-{tone}-ink`, or the shared helper `TONE_CLASSES` in
`src/lib/tone.ts`.

- `--highlight`, `--highlight-ink` — warning / attention (yellow-warm)
- `--mint`, `--mint-ink` — positive / verified
- `--sky`, `--sky-ink` — info / in-flight
- `--blush`, `--blush-ink` — destructive-soft / overdue
- `--lilac`, `--lilac-ink` — neutral accent / internal
- `--illustration`, `--border-illustration` — ring-card / backgrounds

**Don't use:** `amber-*`, `emerald-*`, `red-*`, `green-*`, `blue-*`, hex
literals for anything but chain-branded colours (BTC orange, ETH indigo,
etc. — tracked in `src/compliance/network-badge.tsx`).

### Radius

- `--radius: 1rem` (16px)
- `--radius-sm` → `calc(--radius - 8px)` = 8px
- `--radius-md` → `calc(--radius - 4px)` = 12px
- `--radius-lg` → `--radius` = 16px
- `--radius-xl` → `calc(--radius + 4px)` = 20px

**Tailwind aliases available:** `rounded-sm` / `rounded-md` / `rounded-lg` /
`rounded-xl` (preferred) **or** `rounded-[var(--radius-lg)]` explicit form.

- `rounded-full` fine for pills, circles, dots.
- Don't use arbitrary px values (`rounded-[10px]`, `rounded-[6px]`) — pick
  the nearest token.

### Shadow

- `--shadow-card` — default elevated surface (cards, inputs)
- `--shadow-lifted` — overlays / panels (popover, dialog, sheet, hover-card,
  dropdown-menu, context-menu, menubar, side-panels)
- `--shadow-soft`, `--shadow-light` — legacy; prefer `card` / `lifted`

**Don't use:** raw Tailwind `shadow-lg` / `shadow-md` / `shadow-xl` on new
components — use `shadow-[var(--shadow-card)]` or `shadow-[var(--shadow-lifted)]`.

`shadow-xs`, `shadow-sm`, `shadow-none` are fine for subtle cases.

### Typography

- `--font-sans: Mona Sans` (default body)
- `--font-mono: JetBrains Mono` (numbers, hashes, labels)

**Conventions (from claude-design output):**
- **Uppercase meta labels** (FIRST SEEN, TOP COUNTERPARTIES, RISK BREAKDOWN):
  `font-mono font-semibold text-[11px] text-muted-foreground uppercase tracking-[0.08em]`
- **Big numeric values** (KPIs, risk scores): `font-mono font-semibold` with
  `style={{ letterSpacing: "-0.02em" }}` or `tracking-tight`.
- **Row labels** in key-value lists: `text-[13px] text-muted-foreground`.
- **Row values**: `text-[13px] font-medium` (or `font-mono` if numeric).

### Spacing grid

Base **4px**. Tailwind classes `1`, `1.5`, `2`, `2.5`, `3`, `3.5`, `4`, `5`,
`6`, `8`, `10`, `12` map to `4,6,8,10,12,14,16,20,24,32,40,48px`.

**Common scale observed:** `gap-2`, `gap-1`, `gap-3`, `gap-4` dominate.
Custom arbitrary spacing (`pt-[18px]`, `py-[7px]`) OK where the design needs
it, but prefer the scale where possible.

### Motion / animation

Custom keyframes in `globals.css`:

- `fade-up`, `marquee-left`, `marquee-right`, `shimmer`,
  `workflow-running-pulse`, `bar-breathe`, `pulse-dot`

CSS classes available without Tailwind prefix:

- `.bar-breathe` — horizontal scaleX pulse for live bars
- `.pulse-dot` — scale + opacity pulse for active dots
- `.bar-diag` — diagonal stripe pattern for unattributed segments
- `.ringcard` + `.ringcard-inner` — stacked glass-ring card (used by
  `RingCard`)

## Patterns

### Button

CVA in `src/components/button.tsx`. Defaults:

- Base: `rounded-[10px]`, `font-semibold`, `text-sm`
- Heights: `xs 6, sm 8, default 10, lg 10, xl 12` (Tailwind units = ×4px)
- Default variant: `bg-primary` with `shadow-[inset_0_-1px_0_rgba(0,0,0,0.2)]`
  (inset bottom shadow for depth)
- Variants: `default | outline | secondary | ghost | destructive | link |
  callout | toggle`

### Card

- Shape: `rounded-[var(--radius-lg)]` + `border border-border` + `bg-card`
  + `shadow-[var(--shadow-card)]`
- Padding: `py-6` default, `p-4` or `p-5` for compact
- Sub-components: `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`,
  `CardContent`, `CardFooter`

### Ring card (DS-refresh specific)

- Use `<RingCard>` from `src/components/ring-card.tsx`
- Applies `.ringcard` + inner `.ringcard-inner` — stacked glass rings behind
  the content, `solid` prop disables the bottom fade
- Used for Dashboard cards (TransactionFlow/RiskExposure/AwaitingReview) and
  RiskScoreHero

### Badge / StatusPill

- `<Badge>` — tight pill, `h-5`, `rounded-full`
- `<StatusPill>` — larger pill (`h-5/h-6/h-7` for `sm/default/lg`), `gap-1.5`,
  `text-xs`
- Variants use pastels: `neutral | mint | sky | blush | lilac | highlight`
  via shared `TONE_CLASSES`

### Input / SearchInput

- Height `h-10` / `h-11`, `rounded-lg`, `border border-input`, `bg-card`
- `shadow-[var(--shadow-card)]` for raised feel
- Focus: `focus-visible:border-focal focus-visible:ring-3 focus-visible:ring-focal/20`

### Overlay primitives (Popover, Dialog, Sheet, HoverCard, DropdownMenu, ContextMenu, Menubar)

- `shadow-[var(--shadow-lifted)]` on the panel
- `border border-border-light`
- `bg-popover` / `bg-card`

### Tables

- Container: `rounded-[var(--radius-lg)] border border-border bg-card
  shadow-[var(--shadow-card)] overflow-hidden`
- Header row: `bg-[color-mix(in_oklab,var(--muted)_50%,transparent)]`
- Header cells: `font-mono font-semibold text-[10px] text-muted-foreground
  uppercase tracking-[0.08em]`
- Row hover: `bg-[color-mix(in_oklab,var(--muted)_60%,transparent)]`
- Selected row: `bg-[color-mix(in_oklab,var(--highlight)_25%,var(--card))]`
  + `shadow-[inset_3px_0_0_var(--highlight-ink)]`

### Transaction direction

Use `DIRECTION_TONE_CLASSES` from `src/lib/tone.ts`:

- inbound → `bg-mint text-mint-ink`
- outbound → `bg-blush text-blush-ink`
- internal → `bg-lilac text-lilac-ink`

## Rules — what to flag

1. **Raw Tailwind palette colours** (`amber-*`, `emerald-*`, `red-*`,
   `green-*`, `blue-*`, `slate-*`, `zinc-*`, …) except the `destructive` /
   `success` / `warning` / chain hexes.
2. **Hex literals** (`#3B50A8`, etc.) except chain-branded (BTC, ETH, SOL,
   TRON, POLYGON, BNB) in `network-badge.tsx`.
3. **Off-grid spacing** — arbitrary `px-[11px]`, `py-[7px]`-type values when
   a scale unit would do.
4. **Raw `shadow-lg` / `shadow-md` / `shadow-xl`** on new components — use
   `shadow-[var(--shadow-card)]` or `shadow-[var(--shadow-lifted)]`.
5. **Arbitrary radius** (`rounded-[10px]`, `rounded-[6px]`, `rounded-2xl`)
   — prefer the `sm/md/lg/xl` scale.
6. **Local tone→class maps** duplicating `TONE_CLASSES` — import from
   `src/lib/tone.ts` instead.
7. **Inline `style={{ background: "var(--X)" }}`** when a Tailwind class
   exists (`bg-X`).
8. **Local `bg-Y text-Y-ink` conditional ladders** — use `TONE_CLASSES[tone]`.
9. **Non-DS typography** (hard-coded `Inter`, `system-ui`) — use
   `font-sans` / `font-mono`.
