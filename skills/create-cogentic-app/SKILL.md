---
name: create-cogentic-app
description: Scaffold new Next.js applications pre-configured with the Cogentic Design System (@cogentic/ds). Creates AppShell layout, routes, auth pages, and all configuration.
---
# Create Cogentic App

You are a project scaffolder that creates new Next.js applications pre-configured with the Cogentic Design System (`@cogentic/ds`).

When the user asks to create a new app, scaffold the complete project structure with all configuration, the AppShell, and route stubs.

## Scaffolding Steps

### 1. Gather Requirements

Ask the user:
1. **Project name** — e.g. `signal-dashboard`, `compliance-portal`
2. **Routes** — e.g. `dashboard`, `settings`, `canvas`, `reports`, `users`
3. **Auth needed?** — If yes, add login/register pages using `AuthForm` block
4. **Description** — One-line description for package.json

### 2. Create Project Directory

```
<project-name>/
├── .npmrc
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx              ← redirects to first route
│   │   └── (app)/
│   │       ├── layout.tsx        ← AppShell wrapper
│   │       └── <route>/
│   │           └── page.tsx      ← one per requested route
│   └── components/
│       └── app-sidebar-config.ts ← nav config
├── public/
│   └── .gitkeep
└── README.md                     ← only if explicitly requested
```

### 3. File Contents

#### `.npmrc`
```
@cogentic:registry=https://npm.pkg.github.com
```

#### `package.json`
```json
{
  "name": "<project-name>",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@cogentic/ds": "latest",
    "lucide-react": "^0.575.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "typescript": "^5.7.0"
  }
}
```

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### `next.config.ts`
```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@cogentic/ds"],
}

export default nextConfig
```

#### `postcss.config.mjs`
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

export default config
```

#### `src/app/globals.css`
```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@cogentic/ds/styles.css";

@source "../node_modules/@cogentic/ds/dist";
```

#### `src/app/layout.tsx`
```tsx
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "<Project Title>",
  description: "<description>",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

#### `src/app/page.tsx`
```tsx
import { redirect } from "next/navigation"

export default function Home() {
  redirect("/<first-route>")
}
```

#### `src/components/app-sidebar-config.ts`
Generate nav config from the user's requested routes:
```ts
import { Home, Settings, BarChart3, Users, Layout } from "lucide-react"

export const navConfig = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: Home },
      { label: "Reports", href: "/reports", icon: BarChart3 },
      { label: "Users", href: "/users", icon: Users },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
]
```

Choose appropriate Lucide icons for each route based on its name.

#### `src/app/(app)/layout.tsx`
```tsx
"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { AppShell } from "@cogentic/ds"
import { navConfig } from "@/components/app-sidebar-config"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const nav = navConfig.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      isActive: pathname === item.href || pathname.startsWith(item.href + "/"),
    })),
  }))

  return (
    <AppShell
      logo={{ title: "<Project Title>" }}
      nav={nav}
      breadcrumbs={[{ label: getCurrentPageLabel(pathname) }]}
      linkComponent={Link}
    >
      {children}
    </AppShell>
  )
}

function getCurrentPageLabel(pathname: string) {
  for (const group of navConfig) {
    for (const item of group.items) {
      if (pathname === item.href || pathname.startsWith(item.href + "/")) {
        return item.label
      }
    }
  }
  return "Home"
}
```

#### Route pages — `src/app/(app)/<route>/page.tsx`
Each route gets a stub page:
```tsx
import { Card, CardContent, CardHeader, CardTitle, H2 } from "@cogentic/ds"

export default function <RouteName>Page() {
  return (
    <div className="space-y-6">
      <H2><Route Title></H2>
      <Card>
        <CardHeader>
          <CardTitle><Route Title></CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is the <route title> page. Start building here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
```

#### Auth pages (if requested)
Create `src/app/(auth)/login/page.tsx` and `src/app/(auth)/register/page.tsx`:
```tsx
import { AuthForm } from "@cogentic/ds/blocks/auth-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthForm variant="login" onSubmit={(data) => console.log(data)} />
    </div>
  )
}
```

### 4. After Scaffolding

Tell the user:
```
Project scaffolded! To get started:

cd <project-name>
pnpm install
pnpm dev

Routes created:
- /<route1>
- /<route2>
- ...

All routes use the AppShell layout with sidebar navigation.
Edit src/components/app-sidebar-config.ts to customize navigation.
```

## Rules

- Always use `@cogentic/ds` components — never create custom components that duplicate DS functionality
- Use semantic color tokens (`bg-background`, `text-foreground`, etc.) — never hardcode colors
- Use `Link` from `next/link` for all navigation
- Use Lucide icons — pick the most appropriate icon for each route name
- The `(app)` route group wraps all authenticated pages in the AppShell
- The `(auth)` route group is for unauthenticated pages (login, register)
- Keep route pages minimal — just enough structure to show the page works
- Include `transpilePackages: ["@cogentic/ds"]` in next.config.ts
- Include `@source` directive in globals.css for Tailwind to scan DS classes
- Add `geist` font package to dependencies if using GeistSans/GeistMono
