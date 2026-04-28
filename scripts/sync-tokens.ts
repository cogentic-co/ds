/**
 * sync-tokens.ts
 *
 * Pulls every COLOR variable from the Figma file's `Color` collection and
 * writes:
 *   - Light mode RGB → :root CSS variables in `src/styles/globals.css`
 *   - Dark mode RGB  → .dark CSS variables (same names)
 *
 * Usage:
 *   FIGMA_TOKEN=figd_xxx pnpm sync:tokens
 *
 * The script preserves the rest of `globals.css` and only replaces the two
 * marker blocks (between `/* @figma-tokens light begin *\/` and `end` markers).
 * It writes RGB values in the OKLch format the codebase already uses.
 */

import { readFileSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"

const FILE_KEY = "1FH1KCGLeK5GR222JUS2Iu"
const REPO_ROOT = resolve(__dirname, "..")
const GLOBALS_CSS = join(REPO_ROOT, "src/styles/globals.css")

const figmaToken = process.env.FIGMA_TOKEN
if (!figmaToken) {
  console.error(
    "Missing FIGMA_TOKEN. Get one at https://figma.com/settings → Personal access tokens.",
  )
  process.exit(1)
}

async function figmaGet<T>(path: string): Promise<T> {
  const url = `https://api.figma.com/v1${path}`
  const res = await fetch(url, { headers: { "X-Figma-Token": figmaToken! } })
  if (!res.ok) throw new Error(`Figma ${path} → ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

type ColorRGBA = { r: number; g: number; b: number; a?: number }
type FigmaVariable = {
  id: string
  name: string
  resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN"
  variableCollectionId: string
  valuesByMode: Record<string, ColorRGBA | { type: "VARIABLE_ALIAS"; id: string }>
}
type FigmaCollection = {
  id: string
  name: string
  modes: { modeId: string; name: string }[]
}
type VariablesResponse = {
  meta: {
    variableCollections: Record<string, FigmaCollection>
    variables: Record<string, FigmaVariable>
  }
}

function isAlias(v: unknown): v is { type: "VARIABLE_ALIAS"; id: string } {
  return typeof v === "object" && v !== null && (v as { type?: string }).type === "VARIABLE_ALIAS"
}

function resolveColor(
  variable: FigmaVariable,
  modeId: string,
  variables: Record<string, FigmaVariable>,
  depth = 0,
): ColorRGBA | null {
  if (depth > 8) return null
  const val = variable.valuesByMode[modeId]
  if (!val) return null
  if (isAlias(val)) {
    const target = variables[val.id]
    if (!target) return null
    return resolveColor(target, modeId, variables, depth + 1)
  }
  return val as ColorRGBA
}

// Convert sRGB (0-1) → OKLch
function rgbToOklch({ r, g, b }: ColorRGBA): { l: number; c: number; h: number } {
  // sRGB → linear
  const lin = (u: number) => (u <= 0.04045 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4)
  const lr = lin(r),
    lg = lin(g),
    lb = lin(b)
  // linear → LMS
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb
  const l_ = Math.cbrt(l),
    m_ = Math.cbrt(m),
    s_ = Math.cbrt(s)
  // LMS → Oklab
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
  // Oklab → OKLch
  const C = Math.sqrt(a * a + b2 * b2)
  let H = (Math.atan2(b2, a) * 180) / Math.PI
  if (H < 0) H += 360
  return { l: L, c: C, h: H }
}

function fmtOklch({ l, c, h }: { l: number; c: number; h: number }): string {
  const lp = (l * 100).toFixed(2)
  const cp = c.toFixed(4)
  const hp = c < 0.0001 ? "0" : h.toFixed(2)
  return `oklch(${lp}% ${cp} ${hp})`
}

function variableNameToCssName(name: string): string {
  // Figma name is usually plain like `foreground`, `mint-ink`, or path-like `color/foreground`
  return `--${name.replace(/^color\//, "").replace(/\//g, "-")}`
}

const LIGHT_BEGIN = "/* @figma-tokens light begin */"
const LIGHT_END = "/* @figma-tokens light end */"
const DARK_BEGIN = "/* @figma-tokens dark begin */"
const DARK_END = "/* @figma-tokens dark end */"

function replaceBlock(css: string, beginMarker: string, endMarker: string, body: string): string {
  const start = css.indexOf(beginMarker)
  const end = css.indexOf(endMarker)
  if (start === -1 || end === -1) {
    console.warn(`Markers not found (${beginMarker} / ${endMarker}); appending block`)
    return `${css}\n${beginMarker}\n${body}\n${endMarker}\n`
  }
  return `${css.slice(0, start + beginMarker.length)}\n${body}\n  ${css.slice(end)}`
}

async function main() {
  console.log(`Fetching variables for file ${FILE_KEY}...`)
  const data = await figmaGet<VariablesResponse>(`/files/${FILE_KEY}/variables/local`)
  const collections = Object.values(data.meta.variableCollections)
  const colorColl = collections.find((c) => c.name === "Color")
  if (!colorColl) {
    console.error("No `Color` collection found in file")
    process.exit(1)
  }
  const lightMode = colorColl.modes.find((m) => m.name === "Light")?.modeId
  const darkMode = colorColl.modes.find((m) => m.name === "Dark")?.modeId
  if (!lightMode) {
    console.error("Light mode not found on Color collection")
    process.exit(1)
  }

  const allVars = data.meta.variables
  const colorVars = Object.values(allVars).filter(
    (v) => v.resolvedType === "COLOR" && v.variableCollectionId === colorColl.id,
  )

  const lightLines: string[] = []
  const darkLines: string[] = []
  for (const v of colorVars.sort((a, b) => a.name.localeCompare(b.name))) {
    const cssName = variableNameToCssName(v.name)
    const lightRgb = resolveColor(v, lightMode, allVars)
    if (lightRgb) lightLines.push(`  ${cssName}: ${fmtOklch(rgbToOklch(lightRgb))};`)
    if (darkMode) {
      const darkRgb = resolveColor(v, darkMode, allVars)
      if (darkRgb) darkLines.push(`  ${cssName}: ${fmtOklch(rgbToOklch(darkRgb))};`)
    }
  }

  const css = readFileSync(GLOBALS_CSS, "utf8")
  let next = replaceBlock(css, LIGHT_BEGIN, LIGHT_END, lightLines.join("\n"))
  if (darkMode) next = replaceBlock(next, DARK_BEGIN, DARK_END, darkLines.join("\n"))
  writeFileSync(GLOBALS_CSS, next)
  console.log(`Wrote ${GLOBALS_CSS}`)
  console.log(`  ${lightLines.length} Light tokens`)
  console.log(`  ${darkLines.length} Dark tokens`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
