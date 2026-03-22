import { Separator } from "@/components/ui/separator"

const sizeScale = [
  { name: "text-xs", class: "text-xs", size: "0.75rem / 12px" },
  { name: "text-sm", class: "text-sm", size: "0.875rem / 14px" },
  { name: "text-base", class: "text-base", size: "1rem / 16px" },
  { name: "text-lg", class: "text-lg", size: "1.125rem / 18px" },
  { name: "text-xl", class: "text-xl", size: "1.25rem / 20px" },
  { name: "text-2xl", class: "text-2xl", size: "1.5rem / 24px" },
  { name: "text-3xl", class: "text-3xl", size: "1.875rem / 30px" },
  { name: "text-4xl", class: "text-4xl", size: "2.25rem / 36px" },
  { name: "text-5xl", class: "text-5xl", size: "3rem / 48px" },
  { name: "text-6xl", class: "text-6xl", size: "3.75rem / 60px" },
]

const weights = [
  { name: "font-thin", class: "font-thin", weight: "100" },
  { name: "font-extralight", class: "font-extralight", weight: "200" },
  { name: "font-light", class: "font-light", weight: "300" },
  { name: "font-normal", class: "font-normal", weight: "400" },
  { name: "font-medium", class: "font-medium", weight: "500" },
  { name: "font-semibold", class: "font-semibold", weight: "600" },
  { name: "font-bold", class: "font-bold", weight: "700" },
  { name: "font-extrabold", class: "font-extrabold", weight: "800" },
  { name: "font-black", class: "font-black", weight: "900" },
]

export default function TypographyPage() {
  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Typography</h1>
        <p className="mt-2 text-muted-foreground">
          Font families, size scale, and weight options used across the design system.
        </p>
      </div>

      {/* Font Families */}
      <section className="space-y-6">
        <h2 className="font-semibold text-xl">Font Families</h2>
        <div className="grid gap-6">
          <div className="rounded-lg border p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="font-medium text-muted-foreground text-sm">Sans — Geist</h3>
              <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs">font-sans</code>
            </div>
            <p className="mt-4 font-sans text-2xl">The quick brown fox jumps over the lazy dog</p>
            <p className="mt-2 font-sans text-base text-muted-foreground">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              CSS variable: <code className="font-mono">--font-sans</code>
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="font-medium text-muted-foreground text-sm">Mono — JetBrains Mono</h3>
              <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs">font-mono</code>
            </div>
            <p className="mt-4 font-mono text-2xl">The quick brown fox jumps over the lazy dog</p>
            <p className="mt-2 font-mono text-base text-muted-foreground">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              CSS variable: <code className="font-mono">--font-mono</code>
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Size Scale */}
      <section className="space-y-6">
        <h2 className="font-semibold text-xl">Size Scale</h2>
        <div className="space-y-0 divide-y rounded-lg border">
          {sizeScale.map((item) => (
            <div key={item.name} className="flex items-baseline gap-6 px-6 py-4">
              <code className="w-20 shrink-0 font-mono text-muted-foreground text-xs">
                {item.name}
              </code>
              <span className="w-32 shrink-0 text-muted-foreground text-xs">{item.size}</span>
              <span className={item.class}>The quick brown fox</span>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Weight Scale */}
      <section className="space-y-6">
        <h2 className="font-semibold text-xl">Weight Scale</h2>
        <div className="space-y-0 divide-y rounded-lg border">
          {weights.map((item) => (
            <div key={item.name} className="flex items-baseline gap-6 px-6 py-4">
              <code className="w-28 shrink-0 font-mono text-muted-foreground text-xs">
                {item.name}
              </code>
              <span className="w-12 shrink-0 text-muted-foreground text-xs">{item.weight}</span>
              <span className={`text-xl ${item.class}`}>
                The quick brown fox jumps over the lazy dog
              </span>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Tracking */}
      <section className="space-y-6">
        <h2 className="font-semibold text-xl">Letter Spacing</h2>
        <div className="space-y-0 divide-y rounded-lg border">
          {[
            { name: "tracking-tighter", desc: "-0.05em" },
            { name: "tracking-tight", desc: "-0.025em" },
            { name: "tracking-normal", desc: "0em" },
            { name: "tracking-wide", desc: "0.025em" },
            { name: "tracking-wider", desc: "0.05em" },
            { name: "tracking-widest", desc: "0.1em" },
          ].map((item) => (
            <div key={item.name} className="flex items-baseline gap-6 px-6 py-4">
              <code className="w-36 shrink-0 font-mono text-muted-foreground text-xs">
                {item.name}
              </code>
              <span className="w-16 shrink-0 text-muted-foreground text-xs">{item.desc}</span>
              <span className={`font-medium text-lg ${item.name}`}>COGENTIC DESIGN SYSTEM</span>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Common Patterns */}
      <section className="space-y-6">
        <h2 className="font-semibold text-xl">Common Patterns</h2>
        <div className="grid gap-6">
          <div className="rounded-lg border p-6">
            <code className="font-mono text-muted-foreground text-xs">
              Page heading — text-3xl font-bold tracking-tight
            </code>
            <p className="mt-3 font-bold text-3xl tracking-tight">Page Heading</p>
          </div>
          <div className="rounded-lg border p-6">
            <code className="font-mono text-muted-foreground text-xs">
              Section heading — text-xl font-semibold
            </code>
            <p className="mt-3 font-semibold text-xl">Section Heading</p>
          </div>
          <div className="rounded-lg border p-6">
            <code className="font-mono text-muted-foreground text-xs">
              Card title — text-base font-medium
            </code>
            <p className="mt-3 font-medium text-base">Card Title</p>
          </div>
          <div className="rounded-lg border p-6">
            <code className="font-mono text-muted-foreground text-xs">
              Body text — text-sm text-muted-foreground
            </code>
            <p className="mt-3 text-muted-foreground text-sm">
              This is body text used for descriptions, paragraphs, and supporting content throughout
              the interface.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <code className="font-mono text-muted-foreground text-xs">
              Code — font-mono text-sm
            </code>
            <p className="mt-3 font-mono text-sm">const config = await loadConfig()</p>
          </div>
          <div className="rounded-lg border p-6">
            <code className="font-mono text-muted-foreground text-xs">
              Label — text-sm font-medium
            </code>
            <p className="mt-3 font-medium text-sm">Form Label</p>
          </div>
          <div className="rounded-lg border p-6">
            <code className="font-mono text-muted-foreground text-xs">
              Caption — text-xs text-muted-foreground
            </code>
            <p className="mt-3 text-muted-foreground text-xs">
              Helper text, timestamps, and metadata
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
