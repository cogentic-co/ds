# Cogentic Design System

Public npm package (`@cogentic-co/ds`) providing UI components for building modern compliance applications.

## Architecture

This is a **public npm package**. Components are imported directly — not copied in.

```
src/
├── components/        ← 56 UI components + 6 animation components
├── hooks/             ← use-mobile, use-animation-timer, use-cycle-index, use-carousel-state
├── lib/
│   ├── utils.ts       ← cn() helper
│   └── animation.ts   ← Shared animation constants (easing, transitions, variants)
├── styles/
│   └── globals.css    ← OKLch tokens, fonts, light/dark themes, keyframes
└── index.ts           ← Barrel export
dist/                  ← Built output (tsup → ESM + .d.ts)
app/                   ← Next.js preview site (dev only, not published)
blocks/                ← Product animation blocks from signal-landing (preview only, not in package)
```

### Build & publish flow

1. Author/edit in `src/components/`
2. `pnpm build:pkg` → tsup builds ESM + types to `dist/`
3. `pnpm publish` → publishes to npm (public)
4. Consuming projects: `pnpm add @cogentic/ds`

### Distribution

- **Registry:** npm (public)
- **Scope:** `@cogentic-co`

## Tech Stack

- **Next.js 15+** (peer dep — this is a Next.js project DS)
- **React 19** (peer dep, supports 18+)
- **Tailwind CSS v4** with `@theme inline` CSS variables
- **TypeScript** (strict mode)
- **tsup** for package builds (ESM + declarations)
- **Vitest** + **React Testing Library** for component tests
- **CVA** (class-variance-authority) for component variants
- **Base UI** (`@base-ui/react`) primitives (migrated from Radix)
- **Motion** (framer-motion) for animation components
- **Lucide** icons
- **OKLch** color space for all design tokens
- **pnpm** as package manager

## Consuming the package

### Install
```bash
pnpm add @cogentic/ds
```

### Usage
```tsx
import { Button, Card, Dialog, FadeIn, Marquee } from "@cogentic/ds"
import "@cogentic/ds/styles.css"  // in globals.css or layout

// className overrides work via cn() merging
<Button className="rounded-full px-8">Custom</Button>

// Animation components
<FadeIn delay={200}><Card>Fades in on scroll</Card></FadeIn>
<Marquee duration={30}>{items}</Marquee>
```

### Tailwind setup in consuming project
```css
/* globals.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "@cogentic/ds/styles.css";

/* Tell Tailwind to scan the package for class names */
@source "../node_modules/@cogentic/ds/dist";
```

### AI Skills
```bash
# Install DS skills for your AI agent (Claude Code, Cursor, Copilot, etc.)
npx skills add cogentic-co/ds
```

This gives your AI assistant full knowledge of all DS components, patterns, design tokens, and scaffolding.

## Component Conventions

### File structure
- One component per file in `src/components/`
- Test file alongside: `src/components/__tests__/button.test.tsx`
- Use `data-slot="component-name"` on root elements
- Named exports (not default): `export { Button, buttonVariants }`
- Use `cn()` from `../lib/utils` for className merging

### Variant pattern (CVA)
```tsx
const componentVariants = cva("base-classes", {
  variants: { variant: {}, size: {} },
  defaultVariants: { variant: "default", size: "default" }
})
```

### Props pattern
```tsx
function Component({
  className,
  variant,
  ...props
}: React.ComponentProps<"element"> & VariantProps<typeof componentVariants>)
```

### Imports (within src/)
- Base UI primitives: `import { X } from "@base-ui/react/x"`
- Icons: `import { IconName } from "lucide-react"`
- Utils: `import { cn } from "../lib/utils"`
- Internal components: `import { Button } from "./button"`
- Animation hooks: `import { useAnimationTimer } from "../hooks/use-animation-timer"`

## Design Tokens

All tokens in `src/styles/globals.css`:
- **Colors**: OKLch values from signal-landing, with light (`:root`) / dark (`.dark`) modes
- **Fonts**: Geist (sans), JetBrains Mono (mono)
- **Radii**: Base `0.625rem` with sm/md/lg/xl variants
- **Extras**: `--success`, `--logo-gray`, `--tagline`, `--border-light`, `--cyan`
- Semantic naming: `--primary` → `--color-primary` → `bg-primary`

## Animation Components (exported)

| Component | Description |
|---|---|
| `BgShader` | Canvas dithered animated background, theme-aware |
| `FadeIn` | CSS scroll-triggered fade-up via IntersectionObserver |
| `Marquee` | Infinite horizontal scroll with fade edges |
| `Typewriter` | Line-by-line code/text reveal |
| `AnimatedCounter` | Animated numeric value with easing |
| `StreamingCards` | Sequential card reveal with AnimatePresence |

## Animation Hooks & Constants (exported)

| Export | Description |
|---|---|
| `useAnimationTimer(ms)` | Visibility-gated interval timer |
| `useCycleIndex(length, ms)` | Cycling index with viewport awareness |
| `useCarouselState(count, opts)` | Carousel/slider state management |
| `EASE_OUT`, `FADE_UP`, etc. | Shared motion constants |

## Codemods

Automated transforms in `codemods/` for migrating a Next.js project from shadcn/ui to `@cogentic-co/ds`.

### Run all codemods

```bash
npx tsx codemods/migrate.ts <target-src-dir>
```

This runs all codemods in sequence, then configures `.npmrc` and `globals.css`.

### Individual codemods

| Codemod | What it does |
|---|---|
| `rewrite-imports.ts` | Rewrites `@/components/ui/*` and `@/lib/utils` imports → `@cogentic-co/ds` |
| `aschild-to-render.ts` | Transforms Radix `asChild` pattern → Base UI `render` prop |
| `strip-classnames.ts` | Removes `className` from DS components; preserves values as JSX comments above |

### What needs manual review after running

- Components not in the DS (the script warns about these)
- Complex `asChild` patterns with spread props or conditional rendering
- Custom variant values that don't exist in the DS
- Local `cn()` usage from non-standard paths

## Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Preview site (Next.js + Turbopack) |
| `pnpm build:pkg` | Build package (tsup → dist/) |
| `pnpm test` | Run component tests (Vitest) |
| `pnpm test:watch` | Watch mode tests |
| `pnpm lint` | Biome (lint + format) |
| `pnpm lint:fix` | Auto-fix lint/format issues |
| `pnpm format` | Format all files |
| `pnpm publish` | Publish to npm |

## Git Conventions

- Do NOT add `Co-Authored-By` lines to commit messages
- Keep commit messages concise — one-line summary, optional body for context

## New Component Checklist

Every new component **must** include all of the following before it's considered complete:

### 1. Component source
- [ ] File in `src/components/` (or `src/charts/`, `src/workflow/`, `src/blocks/`)
- [ ] Named exports, `data-slot` attribute, `cn()` for className merging
- [ ] CVA variants if the component has visual states
- [ ] TypeScript props type exported
- [ ] Light and dark mode support (semantic tokens, no hardcoded colours)
- [ ] Accessible markup — keyboard nav, ARIA attributes, screen reader support
- [ ] Added to barrel export in `src/index.ts` (or relevant sub-barrel)

### 2. Test file
- [ ] Test file at `src/components/__tests__/<name>.test.tsx`
- [ ] Renders without crashing
- [ ] Tests all variants/states
- [ ] Accessibility test with `vitest-axe` (`expect(results).toHaveNoViolations()`)
- [ ] Keyboard interaction tests where applicable
- [ ] `className` override test — verify `cn()` merging works

### 3. Preview (dev app)
- [ ] Preview function in `app/components/[slug]/previews.tsx` (or `app/blocks/[slug]/previews.tsx`)
- [ ] **Interactive controls** via `useControls()` + `<Playground>` for all meaningful props
- [ ] Registered in the `previews` export map
- [ ] Static `<Section>` examples for important states (e.g. disabled, error, loading)

### 4. Sidebar entry
- [ ] Added to the appropriate group in `app/preview-shell.tsx`
- [ ] Correct icon from lucide-react

### 5. Component metadata
- [ ] Entry in `app/component-meta.ts` with:
  - `status` (new/beta/stable)
  - `description`
  - `since` version
  - `importStatement`
  - `dos` and `donts` guidelines
  - `codeExample`

### 6. Build verification
- [ ] `pnpm build:pkg` succeeds (tsup)
- [ ] `pnpm test` passes
- [ ] `pnpm lint` passes
- [ ] `next build` succeeds (preview app)

### 7. Skill update
- [ ] Component added to `skills/ds-expert/SKILL.md` with signature, description, and category
- [ ] If new hook/block/chart: added to the appropriate section in the skill

## Quality Standards

- All components must support light and dark mode
- Use semantic color tokens, never hardcoded colors
- Accessible markup via Base UI primitives
- Components accept `className` prop for overrides (merged via `cn()`)
- Every component needs a test file with a11y checks (vitest-axe)
- Every component needs a preview with interactive controls
- Every component needs metadata (description, guidelines, code example)
- `next/link` used in blocks for client-side navigation (Next.js peer dep)
- `next-themes` removed — consuming projects handle their own theme switching

## Design Philosophy

1. **Brand first** — Geist font, OKLch neutral palette, neutral accent
2. **Composable** — Small primitives over monolithic components
3. **Accessible** — Base UI primitives; keyboard nav, ARIA, screen readers
4. **Dark mode** — Every component works in both modes
5. **Override-friendly** — `className` overrides via `cn()` merging
6. **Next.js-native** — Uses `next/link` in blocks, Next.js as peer dep
7. **Motion-ready** — Animation components for onboarding, help, and landing pages

## Figma source of truth

The Figma file mirrors this package and is the design source of truth. Code is the implementation source of truth. Both should stay in sync.

- **File key:** `1FH1KCGLeK5GR222JUS2Iu` (https://figma.com/design/1FH1KCGLeK5GR222JUS2Iu)
- **Manifest:** `figma-manifest.json` at repo root maps Figma node IDs ↔ React component file paths

### Page structure (~196 pages, grouped)

`Cover → Getting Started → — Foundations — (Colors / Shadows / Spacing & Radius / Typography) → — Components — (A–Z) → — Charts — → — Compliance Blocks — → — Case Report Editor — → — Dashboard Blocks — → — Transaction Blocks — → — Settings Blocks — → — Workflow Blocks — → — Auth Blocks — → — AI Chatbot — → — Layouts — → — Integrations — → — Prototypes — → Docs`

### Variable collections

- **Color** (modes: Light, Dark) — names without prefix: `foreground`, `mint`, `mint-ink`, `highlight`, `highlight-ink`, `sky`, `sky-ink`, `blush`, `blush-ink`, `lilac`, `lilac-ink`, `destructive`, `success`, `warning`, `card`, `border`, `border-light`, etc.
- **Spacing**, **Radius**, **Typography** — single Value mode

### Text styles (in Geist family)

`Display`, `Heading/H1–H5`, `Body/Default|Medium|Small|SmallMedium|Large`, `Label/Default`, `Caption`, `Caption/Medium`, `Micro`, `Code/Inline|Block|Small|Small/Medium|Xsmall|Micro/Medium`

## Figma work conventions

When working in Figma (via the figma MCP server / `use_figma`), follow these rules — they keep the file consistent with the package.

### Inspect before creating

1. Run `search_design_system` or page traversal first
2. Reuse instances of existing components — never hand-build something the DS already covers
3. Check the Figma manifest (`figma-manifest.json`) to find the React equivalent of any component you reuse

### Reusable components (most-used)

Default to instances of these — don't hand-build:
- **Button** (variant: default/outline/secondary/ghost/destructive/link × size: sm/default/lg)
- **Badge** (tone × shape × size × dot — 96 variants including `ghost` for subtle inline use)
- **Avatar** (size: sm/md/lg × kind: initials/image)
- **Icon Tile** (tone × size × shape — replaces old "Direction"; icon-swap slot)
- **Step** (status: done/active/pending/failed/skipped × size: compact/detailed) — use inside Agent Progress and any agent step list
- **Card**, **Sidebar**, **Section Heading**, **Stat / sm|md|lg**, **Header** (unified, replaces Case/Transaction/Entity Header)
- **Docs / Header** + **Docs / Guideline** — use these on every component page's Guidelines artboard

### Variant naming

Use `Axis=value, Axis=value` format consistently:
- `Tone=success, Shape=pill, Size=sm, Dot=On`
- `Status=done, Size=detailed`

### No hardcoded colors or fonts

- All SOLID fills/strokes must be bound to color variables (use `figma.variables.setBoundVariableForPaint`)
- All text must use a text style (`setTextStyleIdAsync`), never raw `fontSize`/`fontName`
- If you can't find a variable for a hex value, that's a signal to use the closest semantic token, not invent a new one

### Guidelines artboard pattern

Every component / block / layout page has a Guidelines artboard at the bottom containing:
- One `Docs / Header` instance (Title = page name, Description = "When to use X and what to avoid")
- A `Do` column with 3 `Docs / Guideline` `Kind=Do` instances
- A `Don't` column with 3 `Docs / Guideline` `Kind=Dont` instances

## Linking design and code

Code Connect is unavailable in this org, so we maintain the link manually via:

### 1. `figma-manifest.json` (repo root)

A flat manifest mapping every Figma component to its React equivalent. Schema:

```json
{
  "components": [
    {
      "figmaName": "Button",
      "figmaPageName": "Button",
      "figmaNodeId": "21:113",
      "reactName": "Button",
      "reactImportPath": "@cogentic-co/ds",
      "reactFilePath": "src/components/button.tsx",
      "variants": ["default", "outline", "secondary", "ghost", "destructive", "link"],
      "sizes": ["sm", "default", "lg"]
    }
  ]
}
```

Keep this in sync whenever a component is added or renamed in either side. The Figma agent reads this to know which React import to suggest; the code agent reads it to know which Figma component to reference.

### 2. JSDoc `@figma` annotations on each React component

Each component file has a JSDoc tag pointing at its Figma source:

```tsx
/**
 * @figma Button
 * @figmaNode 21:113
 * @figmaUrl https://figma.com/design/1FH1KCGLeK5GR222JUS2Iu?node-id=21-113
 */
export function Button(...) { }
```

This gives IDE hover-context and lets agents jump from code to design without leaving the editor.

### 3. Sync script (planned)

`pnpm sync:figma` (TODO) — reads the Figma file via the MCP server and updates `figma-manifest.json` automatically. Run after design system changes.

### 4. Naming parity

- Figma component name should match the React component name exactly (case-insensitive, `/` → space ok). E.g. Figma `Header / case` maps to React `<Header kind="case">` not a separate component.
- New variants on either side must land on both within the same PR.

### 5. Token sync

- OKLch values in `src/styles/globals.css` should match the resolved Light-mode RGB of each Figma color variable
- A future `pnpm sync:tokens` script can read Figma's color collection and emit the CSS — keeps drift out of the system
