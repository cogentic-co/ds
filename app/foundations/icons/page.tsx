"use client"

import * as LucideAll from "lucide-react"
import * as PixelAll from "pixelarticons/react"
import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VirtualizedGrid } from "@/src/components/virtualized-grid"

type IconEntry = {
  name: string
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

// Filter the namespace import to only real React components (PascalCase name +
// function/forwardRef value). Skips lucide's helper exports (createLucideIcon,
// icons, etc.) and any stray non-component bindings.
function collectIcons(ns: Record<string, unknown>): IconEntry[] {
  const entries: IconEntry[] = []
  for (const [name, value] of Object.entries(ns)) {
    if (!/^[A-Z]/.test(name)) continue
    if (typeof value !== "function" && typeof value !== "object") continue
    if (name === "Icon" || name === "LucideIcon" || name === "createLucideIcon") continue
    entries.push({
      name,
      Component: value as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    })
  }
  return entries.sort((a, b) => a.name.localeCompare(b.name))
}

const LUCIDE_ICONS = collectIcons(LucideAll as unknown as Record<string, unknown>)
const PIXEL_ICONS = collectIcons(PixelAll as unknown as Record<string, unknown>)

export default function IconsPage() {
  const [query, setQuery] = useState("")

  const filteredLucide = useMemo(() => {
    const q = query.toLowerCase()
    return LUCIDE_ICONS.filter((icon) => icon.name.toLowerCase().includes(q))
  }, [query])

  const filteredPixel = useMemo(() => {
    const q = query.toLowerCase()
    return PIXEL_ICONS.filter((icon) => icon.name.toLowerCase().includes(q))
  }, [query])

  function copyImport(text: string) {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-semibold text-3xl">Icons</h1>
        <p className="mt-1 text-muted-foreground">
          Two icon sets are available: <strong>lucide-react</strong> (the default, included in the
          package) and <strong>pixelarticons</strong> (an optional pixel-art alternate). Click any
          icon to copy its import statement.
        </p>
        <Card className="mt-4 p-4">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Using pixelarticons:</strong> install the package
            and import each icon directly. Per-icon imports are tree-shakable — only the icons you
            use end up in your bundle.
          </p>
          <pre className="mt-2 overflow-x-auto rounded-md bg-muted/40 p-3 text-xs">
            <code>{`pnpm add pixelarticons

import { Home } from "pixelarticons/react/Home"

<Home className="size-4" />`}</code>
          </pre>
        </Card>
      </header>

      <Input
        type="search"
        placeholder="Search icons..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Tabs defaultValue="lucide">
        <TabsList>
          <TabsTrigger value="lucide">Lucide ({filteredLucide.length})</TabsTrigger>
          <TabsTrigger value="pixel">Pixelarticons ({filteredPixel.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="lucide">
          <VirtualizedGrid
            items={filteredLucide}
            columns={8}
            rowHeight={84}
            gap={12}
            className="h-[600px]"
            getItemKey={(item) => item.name}
            renderItem={({ name, Component }) => (
              <button
                type="button"
                onClick={() => copyImport(`import { ${name} } from "lucide-react"`)}
                className="group flex size-full flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-focal hover:bg-muted/30"
                aria-label={`Copy import for ${name}`}
              >
                <Component className="size-5" />
                <span className="w-full truncate text-2xs text-muted-foreground group-hover:text-foreground">
                  {name}
                </span>
              </button>
            )}
          />
        </TabsContent>

        <TabsContent value="pixel">
          <VirtualizedGrid
            items={filteredPixel}
            columns={8}
            rowHeight={84}
            gap={12}
            className="h-[600px]"
            getItemKey={(item) => item.name}
            renderItem={({ name, Component }) => (
              <button
                type="button"
                onClick={() => copyImport(`import { ${name} } from "pixelarticons/react/${name}"`)}
                className="group flex size-full flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-focal hover:bg-muted/30"
                aria-label={`Copy import for ${name}`}
              >
                <Component width={20} height={20} />
                <span className="w-full truncate text-2xs text-muted-foreground group-hover:text-foreground">
                  {name}
                </span>
              </button>
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
