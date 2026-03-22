"use client"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { InlineCode } from "@/components/ui/typography"

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="space-y-2">
      {title && <p className="font-medium text-sm">{title}</p>}
      <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
        <code>{children}</code>
      </pre>
    </div>
  )
}

export default function GettingStartedPage() {
  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Getting Started</h1>
        <p className="mt-2 text-muted-foreground">
          Set up <InlineCode>@cogentic/ds</InlineCode> in your Next.js project. The design system is
          published as a public npm package.
        </p>
      </div>

      {/* Installation */}
      <section className="space-y-6">
        <h2 className="font-semibold text-xl">Installation</h2>
        <Card className="space-y-4 p-6">
          <CodeBlock title="Install the package">{`pnpm add @cogentic/ds`}</CodeBlock>
        </Card>
      </section>

      <Separator />

      {/* Tailwind Setup */}
      <section className="space-y-6">
        <h2 className="font-semibold text-xl">Tailwind Setup</h2>
        <p className="text-muted-foreground text-sm">
          Import the design system styles and tell Tailwind to scan the package for class names. Add
          the following to your project's <InlineCode>globals.css</InlineCode>:
        </p>
        <Card className="p-6">
          <CodeBlock>
            {`@import "tailwindcss";
@import "tw-animate-css";
@import "@cogentic/ds/styles.css";

/* Tell Tailwind to scan the package for class names */
@source "../node_modules/@cogentic/ds/dist";`}
          </CodeBlock>
        </Card>
        <p className="text-muted-foreground text-sm">
          If your project uses a monorepo or non-standard layout, adjust the{" "}
          <InlineCode>@source</InlineCode> path to point to the installed package's{" "}
          <InlineCode>dist</InlineCode> directory.
        </p>
      </section>

      <Separator />

      {/* Basic Usage */}
      <section className="space-y-6">
        <h2 className="font-semibold text-xl">Basic Usage</h2>
        <p className="text-muted-foreground text-sm">
          Import components from the package barrel export. All UI components, hooks, animation
          constants, and the <InlineCode>cn()</InlineCode> utility are available from the main entry
          point.
        </p>
        <Card className="p-6">
          <CodeBlock>
            {`import { Button, Card, Input } from "@cogentic/ds"
import "@cogentic/ds/styles.css"  // in layout.tsx or globals.css`}
          </CodeBlock>
        </Card>
        <p className="text-muted-foreground text-sm">
          All components accept a <InlineCode>className</InlineCode> prop for overrides, merged via{" "}
          <InlineCode>cn()</InlineCode>:
        </p>
        <Card className="p-6">
          <CodeBlock>
            {`<Button className="rounded-full px-8">Custom Button</Button>
<Input className="h-11 border-foreground/40" placeholder="Custom input" />`}
          </CodeBlock>
        </Card>
      </section>

      <Separator />

      {/* Code Splitting */}
      <section className="space-y-6">
        <h2 className="font-semibold text-xl">Code Splitting</h2>
        <p className="text-muted-foreground text-sm">
          Animation and block components have separate entry points for code splitting with{" "}
          <InlineCode>next/dynamic</InlineCode>. This keeps the main bundle small and loads heavy
          components only when needed.
        </p>
        <Card className="space-y-4 p-6">
          <CodeBlock title="Animations">
            {`import dynamic from "next/dynamic"

const AnimationAiAnalysis = dynamic(
  () => import("@cogentic/ds/animations/animation-ai-analysis")
    .then(m => m.AnimationAiAnalysis)
)`}
          </CodeBlock>
          <CodeBlock title="Blocks">
            {`const PricingTable = dynamic(
  () => import("@cogentic/ds/blocks/pricing-table")
    .then(m => m.PricingTable)
)`}
          </CodeBlock>
        </Card>
        <p className="text-muted-foreground text-sm">
          Available animation entry points follow the pattern{" "}
          <InlineCode>@cogentic/ds/animations/animation-*</InlineCode>. Available block entry points
          include <InlineCode>pricing-table</InlineCode>, <InlineCode>page-cta</InlineCode>,{" "}
          <InlineCode>article-card</InlineCode>, and <InlineCode>team-card</InlineCode>.
        </p>
      </section>

      <Separator />

      {/* Dark Mode */}
      <section className="space-y-6">
        <h2 className="font-semibold text-xl">Dark Mode</h2>
        <p className="text-muted-foreground text-sm">
          The design system ships with full light and dark mode support. All components and tokens
          respond to the <InlineCode>.dark</InlineCode> class on the root element. Consuming
          projects handle their own theme switching.
        </p>
        <Card className="space-y-4 p-6">
          <CodeBlock title="Toggle dark mode">
            {`// Add or remove the .dark class on <html>
document.documentElement.classList.toggle("dark")`}
          </CodeBlock>
          <p className="text-muted-foreground text-sm">
            Or use a library like <InlineCode>next-themes</InlineCode> for persistence and SSR
            support. The design system does not include a theme provider — this is intentional so
            each project can manage themes in the way that best fits its architecture.
          </p>
        </Card>
      </section>

      <Separator />

      {/* Hooks & Animation Constants */}
      <section className="space-y-6">
        <h2 className="font-semibold text-xl">Hooks & Animation Constants</h2>
        <p className="text-muted-foreground text-sm">
          The package also exports hooks and shared motion constants for building custom animations:
        </p>
        <Card className="p-6">
          <CodeBlock>
            {`import {
  useAnimationTimer,
  useCycleIndex,
  useCarouselState,
  EASE_OUT,
  FADE_UP,
  TRANSITION_DEFAULT,
  VIEWPORT_ONCE,
} from "@cogentic/ds"`}
          </CodeBlock>
        </Card>
      </section>
    </div>
  )
}
