"use client"

import { Copy, Download, RotateCcw } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TokenDef = {
  key: string
  label: string
  description?: string
}

const colorTokens: { group: string; tokens: TokenDef[] }[] = [
  {
    group: "Core",
    tokens: [
      { key: "--background", label: "Background", description: "Page background" },
      { key: "--foreground", label: "Foreground", description: "Primary text color" },
      { key: "--primary", label: "Primary", description: "Brand action color" },
      { key: "--primary-foreground", label: "Primary Foreground", description: "Text on primary" },
      { key: "--secondary", label: "Secondary", description: "Secondary surfaces" },
      {
        key: "--secondary-foreground",
        label: "Secondary Foreground",
        description: "Text on secondary",
      },
      { key: "--muted", label: "Muted", description: "Subdued backgrounds" },
      { key: "--muted-foreground", label: "Muted Foreground", description: "Subdued text" },
      { key: "--accent", label: "Accent", description: "Accent highlights" },
      { key: "--accent-foreground", label: "Accent Foreground", description: "Text on accent" },
      { key: "--destructive", label: "Destructive", description: "Error/danger color" },
    ],
  },
  {
    group: "Surfaces",
    tokens: [
      { key: "--card", label: "Card", description: "Card background" },
      { key: "--card-foreground", label: "Card Foreground" },
      { key: "--popover", label: "Popover", description: "Popover/dropdown background" },
      { key: "--popover-foreground", label: "Popover Foreground" },
    ],
  },
  {
    group: "Borders & Input",
    tokens: [
      { key: "--border", label: "Border" },
      { key: "--input", label: "Input Border" },
      { key: "--ring", label: "Focus Ring" },
    ],
  },
]

const _radiusTokens: TokenDef[] = [
  { key: "--radius", label: "Base Radius", description: "All radii derive from this" },
]

function getComputedToken(key: string): string {
  if (typeof window === "undefined") return ""
  return getComputedStyle(document.documentElement).getPropertyValue(key).trim()
}

function oklchToHex(oklch: string): string {
  // Simple fallback — render to canvas to convert
  if (typeof document === "undefined") return "#000000"
  const canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext("2d")
  if (!ctx) return "#000000"
  ctx.fillStyle = oklch
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

function ColorTokenEditor({
  tokenKey,
  label,
  description,
  overrides,
  onOverride,
}: {
  tokenKey: string
  label: string
  description?: string
  overrides: Record<string, string>
  onOverride: (key: string, value: string) => void
}) {
  const [_computed, setComputed] = useState("")
  const [hex, setHex] = useState("#000000")

  useEffect(() => {
    const val = overrides[tokenKey] || getComputedToken(tokenKey)
    setComputed(val)
    if (val) setHex(oklchToHex(val))
  }, [tokenKey, overrides])

  return (
    <div className="flex items-center gap-3 py-2">
      <input
        type="color"
        value={hex}
        onChange={(e) => {
          setHex(e.target.value)
          onOverride(tokenKey, e.target.value)
        }}
        className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <code className="font-medium font-mono text-xs">{label}</code>
          {overrides[tokenKey] && (
            <span className="rounded-full bg-blue-500/15 px-1.5 py-0.5 font-medium text-[10px] text-blue-700 dark:text-blue-400">
              modified
            </span>
          )}
        </div>
        {description && <p className="text-muted-foreground text-xs">{description}</p>}
      </div>
      <code className="hidden text-muted-foreground text-xs sm:block">{tokenKey}</code>
    </div>
  )
}

function RadiusEditor({
  overrides,
  onOverride,
}: {
  overrides: Record<string, string>
  onOverride: (key: string, value: string) => void
}) {
  const [value, setValue] = useState("")

  useEffect(() => {
    setValue(overrides["--radius"] || getComputedToken("--radius") || "0.625rem")
  }, [overrides])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onOverride("--radius", e.target.value)
          }}
          className="w-32"
          placeholder="0.625rem"
        />
        <div className="flex gap-2">
          {["0", "0.375rem", "0.625rem", "1rem"].map((v) => (
            <Button
              key={v}
              variant={value === v ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setValue(v)
                onOverride("--radius", v)
              }}
            >
              {v === "0" ? "None" : v}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        {["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl"].map((cls) => (
          <div key={cls} className={`${cls} h-16 w-16 border-2 border-primary bg-primary/10`} />
        ))}
      </div>
    </div>
  )
}

function PreviewPanel() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description text</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Text input..." />
            <div className="flex items-center gap-2">
              <Switch />
              <span className="text-sm">Toggle setting</span>
            </div>
            <div className="flex gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ThemeBuilderPage() {
  const [overrides, setOverrides] = useState<Record<string, string>>({})
  const previewRef = useRef<HTMLDivElement>(null)

  const handleOverride = useCallback((key: string, value: string) => {
    setOverrides((prev) => ({ ...prev, [key]: value }))
  }, [])

  // Apply overrides to the document
  useEffect(() => {
    for (const [key, value] of Object.entries(overrides)) {
      document.documentElement.style.setProperty(key, value)
    }
    return () => {
      for (const key of Object.keys(overrides)) {
        document.documentElement.style.removeProperty(key)
      }
    }
  }, [overrides])

  const cssOutput = useMemo(() => {
    if (Object.keys(overrides).length === 0) return ""
    const lines = Object.entries(overrides)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n")
    return `:root {\n${lines}\n}`
  }, [overrides])

  const handleReset = useCallback(() => {
    for (const key of Object.keys(overrides)) {
      document.documentElement.style.removeProperty(key)
    }
    setOverrides({})
  }, [overrides])

  const handleCopy = useCallback(() => {
    if (cssOutput) navigator.clipboard.writeText(cssOutput)
  }, [cssOutput])

  const handleDownload = useCallback(() => {
    if (!cssOutput) return
    const blob = new Blob([cssOutput], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "theme-overrides.css"
    a.click()
    URL.revokeObjectURL(url)
  }, [cssOutput])

  const modifiedCount = Object.keys(overrides).length

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Theme Builder</h1>
        <p className="mt-2 text-muted-foreground">
          Customize design tokens and preview changes in real time. Export overrides as a CSS file
          for your consuming project.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleReset} disabled={modifiedCount === 0}>
          <RotateCcw className="mr-1.5 size-3.5" />
          Reset ({modifiedCount})
        </Button>
        <Button variant="outline" size="sm" onClick={handleCopy} disabled={modifiedCount === 0}>
          <Copy className="mr-1.5 size-3.5" />
          Copy CSS
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload} disabled={modifiedCount === 0}>
          <Download className="mr-1.5 size-3.5" />
          Download
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
        {/* Editor */}
        <div className="space-y-8">
          <Tabs defaultValue="colors">
            <TabsList>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="radius">Radius</TabsTrigger>
              <TabsTrigger value="output">CSS Output</TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="mt-4 space-y-6">
              {colorTokens.map((group) => (
                <div key={group.group}>
                  <h3 className="mb-2 font-medium text-muted-foreground text-sm">{group.group}</h3>
                  <div className="divide-y rounded-lg border px-4">
                    {group.tokens.map((token) => (
                      <ColorTokenEditor
                        key={token.key}
                        tokenKey={token.key}
                        label={token.label}
                        description={token.description}
                        overrides={overrides}
                        onOverride={handleOverride}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="radius" className="mt-4">
              <RadiusEditor overrides={overrides} onOverride={handleOverride} />
            </TabsContent>

            <TabsContent value="output" className="mt-4">
              {cssOutput ? (
                <pre className="overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm">
                  {cssOutput}
                </pre>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground text-sm">
                  No overrides yet. Modify tokens above to generate CSS.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <h3 className="font-medium text-muted-foreground text-sm">Live Preview</h3>
          <div ref={previewRef} className="sticky top-4">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
