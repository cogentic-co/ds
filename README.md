# Cogentic Design System

Branded UI component library for all Cogentic projects — auth, app, landing, and POCs.

**Package:** `@cogentic-co/ds`
**Registry:** GitHub Packages (`@cogentic-co` scope)

---

## What's included

- **90+ components** — UI primitives, blocks, charts, chatbot, workflow, shells
- **8 blocks** — HeroSection, FeatureSection, PricingTable, AuthForm, StatCard, ArticleCard, PageCta, TeamCard
- **6 chart variants** — AreaChart, BarChart, LineChart, PieChart, RadialChart + base primitives
- **20 chatbot components** — Message, Conversation, ChainOfThought, PromptInput, and more
- **14 workflow components** — React Flow nodes, edges, controls (requires `@xyflow/react`)
- **7 animation components** — BgShader, FadeIn, Marquee, Typewriter, AnimatedCounter, StreamingCards, SubtleShader
- **20 product animations** — code-split feature animations for onboarding and help
- **10 hooks** — useMobile, useClipboard, useDebounce, useDisclosure, useLocalStorage, and more
- **Design tokens** — OKLch colors, light/dark themes, Geist + JetBrains Mono fonts

### Tech stack

- React 19 (supports 18+) + TypeScript (strict)
- Next.js 15+ (peer dependency)
- Tailwind CSS v4 with `@theme inline` CSS variables
- Base UI (`@base-ui/react`) headless primitives
- Motion (framer-motion) for animations
- CVA for component variants
- Lucide icons
- OKLch color space for all design tokens

---

## Install

```bash
# .npmrc (one-time setup)
@cogentic-co:registry=https://npm.pkg.github.com

# Install
pnpm add @cogentic-co/ds
```

### Styles setup

```css
/* globals.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "@cogentic-co/ds/styles.css";

/* Tell Tailwind to scan the package for class names */
@source "../node_modules/@cogentic-co/ds/dist";
```

### Next.js config

```ts
// next.config.ts
const nextConfig = {
  transpilePackages: ["@cogentic-co/ds"],
}
```

### Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@cogentic-co/ds"

<Card>
  <CardHeader>
    <CardTitle>Hello</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>Click me</Button>
  </CardContent>
</Card>
```

All components accept `className` and merge via `cn()` (clsx + tailwind-merge).

---

## AI Skills

Install DS skills to give your AI assistant full component knowledge:

```bash
npx skills add cogentic-co/ds
```

Works with Claude Code, Cursor, Copilot, Cline, Windsurf, and 30+ other agents.

---

## Entry points

| Import path | Contents |
|---|---|
| `@cogentic-co/ds` | All UI components, hooks, utils, animation constants |
| `@cogentic-co/ds/styles.css` | Design tokens CSS (must be imported) |
| `@cogentic-co/ds/animations/*` | Individual product animations (code-split) |
| `@cogentic-co/ds/blocks/*` | Block components (code-split) |
| `@cogentic-co/ds/charts` | Chart variants (requires recharts) |
| `@cogentic-co/ds/workflow` | Workflow components (requires @xyflow/react) |

---

## Architecture

```
src/
├── components/        # 56 UI components + animation components
├── blocks/            # 8 page-level blocks
├── charts/            # 6 chart variants
├── chatbot/           # 20 conversational UI components
├── shells/            # AppShell full-app layout
├── workflow/          # 14 React Flow components
├── animations/        # 20 product animations (code-split)
├── hooks/             # 10 utility hooks
├── lib/
│   ├── utils.ts       # cn() helper
│   └── animation.ts   # Shared animation constants
├── styles/
│   └── globals.css    # OKLch design tokens, light/dark themes
└── index.ts           # Barrel export
```

### Build & publish

```bash
pnpm build:pkg    # tsup -> ESM + types to dist/
pnpm publish      # Publish to GitHub Packages
```

---

## Development

### Prerequisites

- Node.js 20+
- pnpm

### Setup

```bash
git clone git@github.com:cogentic-co/ds.git
cd ds
pnpm install
pnpm dev          # Preview site at http://localhost:3000
```

### Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Preview site (Next.js + Turbopack) |
| `pnpm build:pkg` | Build package (tsup) |
| `pnpm test` | Run component tests (Vitest) |
| `pnpm test:watch` | Watch mode tests |
| `pnpm lint` | Biome (lint + format) |
| `pnpm lint:fix` | Auto-fix lint/format issues |

### Adding a component

1. Create `src/components/my-component.tsx`
2. Use `data-slot="my-component"` on the root element
3. Named exports: `export { MyComponent }`
4. Use `cn()` from `../lib/utils` for className merging
5. Add export to `src/index.ts`
6. Add test in `src/components/__tests__/my-component.test.tsx`
7. Add preview in `app/components/[slug]/previews.tsx`
8. Update `skills/ds-expert/SKILL.md` with the new component

### Design tokens

All tokens live in `src/styles/globals.css` using OKLch color space with light (`:root`) and dark (`.dark`) modes.

Key tokens:
- **Brand:** `--cogentic-green` -> `bg-cogentic-green`
- **Fonts:** Geist (sans), JetBrains Mono (mono)
- **Radii:** Base `0.625rem` with sm/md/lg/xl variants
- Dark mode via `.dark` class (not `@media`)

---

## Migrating from shadcn/ui

Codemods automate migration from shadcn/ui:

```bash
npx tsx codemods/migrate.ts src/
```

This rewrites imports (`@/components/ui/*` -> `@cogentic-co/ds`) and transforms `asChild` -> `render` prop (Radix -> Base UI).
