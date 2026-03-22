# Codemods

Automated transforms for migrating a Next.js project from shadcn/ui to `@cogentic-co/ds`.

## Quick start (run all)

```bash
npx tsx codemods/migrate.ts src/
```

This runs both codemods in sequence and sets up project config.

## Individual codemods

### 1. Rewrite imports

Rewrites `@/components/ui/*` and `@/lib/utils` imports to `@cogentic-co/ds`.

```bash
npx jscodeshift -t codemods/rewrite-imports.ts --extensions=tsx,ts --parser=tsx src/
```

**Before:**
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
```

**After:**
```tsx
import { Button, Card, CardContent, cn } from "@cogentic-co/ds"
```

### 2. asChild → render prop

Transforms Radix `asChild` pattern to Base UI `render` prop.

```bash
npx jscodeshift -t codemods/aschild-to-render.ts --extensions=tsx,ts --parser=tsx src/
```

**Before:**
```tsx
<Button asChild>
  <Link href="/about">Learn more</Link>
</Button>
```

**After:**
```tsx
<Button render={<Link href="/about" />}>
  Learn more
</Button>
```

## What needs manual review

- Components not in the DS (script will warn about these)
- Complex `asChild` patterns with spread props or conditional rendering
- Custom variant values that don't exist in the DS
- Local `cn()` usage that imports from a non-standard path
