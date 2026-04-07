import { Separator } from "@/components/ui/separator"

type ColorSwatch = {
  name: string
  variable: string
  className: string
  fgClassName?: string
}

const coreColors: ColorSwatch[] = [
  {
    name: "Background",
    variable: "--background",
    className: "bg-background",
    fgClassName: "text-foreground",
  },
  {
    name: "Foreground",
    variable: "--foreground",
    className: "bg-foreground",
    fgClassName: "text-background",
  },
  {
    name: "Primary",
    variable: "--primary",
    className: "bg-primary",
    fgClassName: "text-primary-foreground",
  },
  {
    name: "Primary Foreground",
    variable: "--primary-foreground",
    className: "bg-primary-foreground",
    fgClassName: "text-primary",
  },
  {
    name: "Secondary",
    variable: "--secondary",
    className: "bg-secondary",
    fgClassName: "text-secondary-foreground",
  },
  {
    name: "Secondary Foreground",
    variable: "--secondary-foreground",
    className: "bg-secondary-foreground",
    fgClassName: "text-secondary",
  },
  {
    name: "Muted",
    variable: "--muted",
    className: "bg-muted",
    fgClassName: "text-muted-foreground",
  },
  {
    name: "Muted Foreground",
    variable: "--muted-foreground",
    className: "bg-muted-foreground",
    fgClassName: "text-muted",
  },
  {
    name: "Accent",
    variable: "--accent",
    className: "bg-accent",
    fgClassName: "text-accent-foreground",
  },
  {
    name: "Accent Foreground",
    variable: "--accent-foreground",
    className: "bg-accent-foreground",
    fgClassName: "text-accent",
  },
  {
    name: "Destructive",
    variable: "--destructive",
    className: "bg-destructive",
    fgClassName: "text-destructive-foreground",
  },
  {
    name: "Destructive Foreground",
    variable: "--destructive-foreground",
    className: "bg-destructive-foreground",
    fgClassName: "text-destructive",
  },
]

const surfaceColors: ColorSwatch[] = [
  { name: "Card", variable: "--card", className: "bg-card", fgClassName: "text-card-foreground" },
  {
    name: "Card Foreground",
    variable: "--card-foreground",
    className: "bg-card-foreground",
    fgClassName: "text-card",
  },
  {
    name: "Popover",
    variable: "--popover",
    className: "bg-popover",
    fgClassName: "text-popover-foreground",
  },
  {
    name: "Popover Foreground",
    variable: "--popover-foreground",
    className: "bg-popover-foreground",
    fgClassName: "text-popover",
  },
]

const borderColors: ColorSwatch[] = [
  { name: "Border", variable: "--border", className: "bg-border" },
  { name: "Border Light", variable: "--border-light", className: "bg-border-light" },
  { name: "Input", variable: "--input", className: "bg-input" },
  { name: "Ring", variable: "--ring", className: "bg-ring" },
]

const brandColors: ColorSwatch[] = [
  { name: "Success", variable: "--success", className: "bg-success" },
  { name: "Cyan", variable: "--cyan", className: "bg-cyan" },
  { name: "Logo Gray", variable: "--logo-gray", className: "bg-logo-gray" },
  { name: "Tagline", variable: "--tagline", className: "bg-tagline" },
]

const chartColors: ColorSwatch[] = [
  { name: "Chart 1", variable: "--chart-1", className: "bg-chart-1" },
  { name: "Chart 2", variable: "--chart-2", className: "bg-chart-2" },
  { name: "Chart 3", variable: "--chart-3", className: "bg-chart-3" },
  { name: "Chart 4", variable: "--chart-4", className: "bg-chart-4" },
  { name: "Chart 5", variable: "--chart-5", className: "bg-chart-5" },
]

const sidebarColors: ColorSwatch[] = [
  {
    name: "Sidebar",
    variable: "--sidebar",
    className: "bg-sidebar",
    fgClassName: "text-sidebar-foreground",
  },
  {
    name: "Sidebar Foreground",
    variable: "--sidebar-foreground",
    className: "bg-sidebar-foreground",
    fgClassName: "text-sidebar",
  },
  {
    name: "Sidebar Primary",
    variable: "--sidebar-primary",
    className: "bg-sidebar-primary",
    fgClassName: "text-sidebar-primary-foreground",
  },
  {
    name: "Sidebar Accent",
    variable: "--sidebar-accent",
    className: "bg-sidebar-accent",
    fgClassName: "text-sidebar-accent-foreground",
  },
  { name: "Sidebar Border", variable: "--sidebar-border", className: "bg-sidebar-border" },
  { name: "Sidebar Ring", variable: "--sidebar-ring", className: "bg-sidebar-ring" },
]

function ColorGrid({ colors, columns = 4 }: { colors: ColorSwatch[]; columns?: number }) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {colors.map((color) => (
        <div key={color.name} className="space-y-2">
          <div className={`${color.className} flex h-20 items-end rounded-lg border p-3`}>
            {color.fgClassName && (
              <span className={`${color.fgClassName} font-medium text-xs`}>Aa</span>
            )}
          </div>
          <div>
            <p className="font-medium text-sm">{color.name}</p>
            <p className="font-mono text-muted-foreground text-xs">{color.className}</p>
            <p className="font-mono text-muted-foreground text-xs">var({color.variable})</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ColorsPage() {
  return (
    <div className="max-w-5xl space-y-12">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Colors</h1>
        <p className="mt-2 text-muted-foreground">
          Design tokens defined in OKLch color space with light and dark mode support. All colors
          are set as CSS custom properties and mapped to Tailwind utilities.
        </p>
      </div>

      {/* Core */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Core</h2>
        <p className="text-muted-foreground text-sm">
          Primary semantic colors used throughout the design system.
        </p>
        <ColorGrid colors={coreColors} />
      </section>

      <Separator />

      {/* Surfaces */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Surfaces</h2>
        <p className="text-muted-foreground text-sm">
          Background colors for elevated surfaces like cards and popovers.
        </p>
        <ColorGrid colors={surfaceColors} />
      </section>

      <Separator />

      {/* Borders & Input */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Borders & Input</h2>
        <p className="text-muted-foreground text-sm">
          Colors used for borders, input outlines, and focus rings.
        </p>
        <ColorGrid colors={borderColors} />
      </section>

      <Separator />

      {/* Brand */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Brand</h2>
        <p className="text-muted-foreground text-sm">
          Cogentic brand colors and special-purpose tokens.
        </p>
        <ColorGrid colors={brandColors} columns={5} />
      </section>

      <Separator />

      {/* Charts */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Charts</h2>
        <p className="text-muted-foreground text-sm">Sequential palette for data visualisations.</p>
        <ColorGrid colors={chartColors} columns={5} />
      </section>

      <Separator />

      {/* Sidebar */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Sidebar</h2>
        <p className="text-muted-foreground text-sm">
          Dedicated tokens for sidebar navigation surfaces.
        </p>
        <ColorGrid colors={sidebarColors} columns={3} />
      </section>

      <Separator />

      {/* Shadows */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Shadows</h2>
        <p className="text-muted-foreground text-sm">Box shadow tokens for elevation.</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex h-24 items-center justify-center rounded-lg border bg-card shadow-soft">
              <span className="text-muted-foreground text-sm">shadow-soft</span>
            </div>
            <div>
              <p className="font-medium text-sm">Soft</p>
              <p className="font-mono text-muted-foreground text-xs">shadow-soft</p>
              <p className="font-mono text-muted-foreground text-xs">var(--shadow-soft)</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex h-24 items-center justify-center rounded-lg border bg-card shadow-light">
              <span className="text-muted-foreground text-sm">shadow-light</span>
            </div>
            <div>
              <p className="font-medium text-sm">Light</p>
              <p className="font-mono text-muted-foreground text-xs">shadow-light</p>
              <p className="font-mono text-muted-foreground text-xs">var(--shadow-light)</p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Radius */}
      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Border Radius</h2>
        <p className="text-muted-foreground text-sm">
          Radius scale based on a configurable base value.
        </p>
        <div className="grid grid-cols-4 gap-6">
          {[
            { name: "rounded-sm", variable: "--radius-sm", desc: "calc(var(--radius) - 4px)" },
            { name: "rounded-md", variable: "--radius-md", desc: "calc(var(--radius) - 2px)" },
            { name: "rounded-lg", variable: "--radius-lg", desc: "var(--radius)" },
            { name: "rounded-xl", variable: "--radius-xl", desc: "calc(var(--radius) + 4px)" },
          ].map((item) => (
            <div key={item.name} className="space-y-2">
              <div
                className={`flex h-20 w-full items-center justify-center border-2 border-primary bg-muted ${item.name}`}
              >
                <span className="text-muted-foreground text-xs">{item.name}</span>
              </div>
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="font-mono text-muted-foreground text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
