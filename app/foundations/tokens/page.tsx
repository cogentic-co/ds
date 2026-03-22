import * as fs from "node:fs"
import * as path from "node:path"
import { Separator } from "@/components/ui/separator"

type Token = {
  name: string
  light: string
  dark: string
}

type StaticToken = {
  name: string
  value: string
}

function parseTokens(css: string) {
  const rootMatch = css.match(/:root\s*\{([\s\S]+?)\}/)
  const darkMatch = css.match(/\.dark\s*\{([\s\S]+?)\}/)
  const themeMatch = css.match(/@theme inline\s*\{([\s\S]+?)\}/)

  const parseBlock = (block: string): Record<string, string> => {
    const tokens: Record<string, string> = {}
    for (const line of block.split("\n")) {
      const match = line.match(/^\s*(--.+?):\s*(.+?)\s*;/)
      if (match) tokens[match[1]] = match[2]
    }
    return tokens
  }

  const lightTokens = rootMatch ? parseBlock(rootMatch[1]) : {}
  const darkTokens = darkMatch ? parseBlock(darkMatch[1]) : {}
  const themeTokens = themeMatch ? parseBlock(themeMatch[1]) : {}

  // Group color tokens (those mapped via --color-X in @theme)
  const colorVars = new Set<string>()
  const shadowVars = new Set<string>()
  const radiusVars = new Set<string>()
  const fontVars = new Set<string>()
  const animateVars = new Set<string>()

  for (const [key, value] of Object.entries(themeTokens)) {
    // Extract the referenced variable name from var(--xxx)
    const varRef = value.match(/var\((.+?)\)/)?.[1]
    if (key.startsWith("--color-")) {
      if (varRef) colorVars.add(varRef)
    } else if (key.startsWith("--shadow-")) {
      shadowVars.add(key)
    } else if (key.startsWith("--radius-")) {
      radiusVars.add(key)
    } else if (key.startsWith("--font-")) {
      fontVars.add(key)
    } else if (key.startsWith("--animate-")) {
      animateVars.add(key)
    }
  }

  // Also add --radius base
  if (lightTokens["--radius"]) radiusVars.add("--radius")

  // Hardcoded cyan in theme (not using var())
  const hardcodedColors: Record<string, string> = {}
  for (const [key, value] of Object.entries(themeTokens)) {
    if (key.startsWith("--color-") && !value.startsWith("var(")) {
      const tokenName = key.replace("--color-", "--")
      hardcodedColors[tokenName] = value
    }
  }

  // Build paired tokens (light + dark)
  const pairedTokens: Token[] = []
  for (const name of colorVars) {
    pairedTokens.push({
      name,
      light: lightTokens[name] || hardcodedColors[name] || "—",
      dark: darkTokens[name] || lightTokens[name] || "—",
    })
  }
  // Add hardcoded theme colors not already covered
  for (const [name, value] of Object.entries(hardcodedColors)) {
    if (!colorVars.has(name)) {
      pairedTokens.push({ name, light: value, dark: value })
    }
  }

  const shadowPaired: Token[] = []
  for (const name of shadowVars) {
    const varRef = themeTokens[name]?.match(/var\((.+?)\)/)?.[1] || name
    shadowPaired.push({
      name,
      light: lightTokens[varRef] || themeTokens[name] || "—",
      dark: darkTokens[varRef] || lightTokens[varRef] || "—",
    })
  }

  const radiusStatic: StaticToken[] = []
  for (const name of radiusVars) {
    radiusStatic.push({
      name,
      value: lightTokens[name] || themeTokens[name] || "—",
    })
  }

  const fontStatic: StaticToken[] = []
  for (const name of fontVars) {
    fontStatic.push({
      name,
      value: themeTokens[name] || "—",
    })
  }

  const animateStatic: StaticToken[] = []
  for (const name of animateVars) {
    animateStatic.push({
      name,
      value: themeTokens[name] || "—",
    })
  }

  // Categorize color tokens
  const core = [
    "--background",
    "--foreground",
    "--primary",
    "--primary-foreground",
    "--secondary",
    "--secondary-foreground",
    "--muted",
    "--muted-foreground",
    "--accent",
    "--accent-foreground",
    "--destructive",
    "--destructive-foreground",
  ]
  const surfaces = ["--card", "--card-foreground", "--popover", "--popover-foreground"]
  const borders = ["--border", "--border-light", "--input", "--ring"]
  const brand = ["--cogentic-green", "--success", "--logo-gray", "--tagline", "--cyan"]
  const charts = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"]
  const sidebar = pairedTokens.filter((t) => t.name.startsWith("--sidebar"))

  const categorize = (names: string[]) =>
    names.map((n) => pairedTokens.find((t) => t.name === n)).filter(Boolean) as Token[]

  return {
    core: categorize(core),
    surfaces: categorize(surfaces),
    borders: categorize(borders),
    brand: categorize(brand),
    charts: categorize(charts),
    sidebar,
    shadows: shadowPaired,
    radius: radiusStatic,
    fonts: fontStatic,
    animations: animateStatic,
  }
}

function TokenTable({ tokens }: { tokens: Token[] }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-2.5 text-left font-medium">Variable</th>
            <th className="px-4 py-2.5 text-left font-medium">Light</th>
            <th className="px-4 py-2.5 text-left font-medium">Dark</th>
            <th className="w-20 px-4 py-2.5 text-left font-medium">Preview</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name} className="border-b last:border-0">
              <td className="px-4 py-2.5 font-mono text-xs">{token.name}</td>
              <td className="px-4 py-2.5 font-mono text-muted-foreground text-xs">{token.light}</td>
              <td className="px-4 py-2.5 font-mono text-muted-foreground text-xs">{token.dark}</td>
              <td className="px-4 py-2.5">
                <div
                  className="h-6 w-full rounded border"
                  style={{ backgroundColor: `var(${token.name})` }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StaticTokenTable({ tokens }: { tokens: StaticToken[] }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-2.5 text-left font-medium">Variable</th>
            <th className="px-4 py-2.5 text-left font-medium">Value</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name} className="border-b last:border-0">
              <td className="px-4 py-2.5 font-mono text-xs">{token.name}</td>
              <td className="px-4 py-2.5 font-mono text-muted-foreground text-xs">{token.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TokensPage() {
  const cssPath = path.join(process.cwd(), "src/styles/globals.css")
  const css = fs.readFileSync(cssPath, "utf-8")
  const tokens = parseTokens(css)

  return (
    <div className="max-w-5xl space-y-12">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Tokens</h1>
        <p className="mt-2 text-muted-foreground">
          All design tokens parsed from{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            src/styles/globals.css
          </code>
          . Tokens use OKLch color space with separate light and dark mode values.
        </p>
      </div>

      {tokens.fonts.length > 0 && (
        <>
          <section className="space-y-4">
            <h2 className="font-semibold text-xl">Fonts</h2>
            <StaticTokenTable tokens={tokens.fonts} />
          </section>
          <Separator />
        </>
      )}

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Core Colors</h2>
        <TokenTable tokens={tokens.core} />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Surfaces</h2>
        <TokenTable tokens={tokens.surfaces} />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Borders & Input</h2>
        <TokenTable tokens={tokens.borders} />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Brand</h2>
        <TokenTable tokens={tokens.brand} />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Charts</h2>
        <TokenTable tokens={tokens.charts} />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Sidebar</h2>
        <TokenTable tokens={tokens.sidebar} />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Shadows</h2>
        <TokenTable tokens={tokens.shadows} />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">Border Radius</h2>
        <StaticTokenTable tokens={tokens.radius} />
      </section>

      {tokens.animations.length > 0 && (
        <>
          <Separator />
          <section className="space-y-4">
            <h2 className="font-semibold text-xl">Animations</h2>
            <StaticTokenTable tokens={tokens.animations} />
          </section>
        </>
      )}
    </div>
  )
}
