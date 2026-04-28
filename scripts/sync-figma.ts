/**
 * sync-figma.ts
 *
 * Pulls every COMPONENT and COMPONENT_SET from the Figma file and writes
 * `figma-manifest.json` at the repo root, matching each Figma component to
 * its React equivalent in `src/`.
 *
 * Usage:
 *   FIGMA_TOKEN=figd_xxx pnpm sync:figma
 *
 * The manifest schema is documented in CLAUDE.md.
 */

import { readdirSync, statSync, writeFileSync } from "node:fs"
import { extname, join, relative, resolve } from "node:path"

const FILE_KEY = "1FH1KCGLeK5GR222JUS2Iu"
const REPO_ROOT = resolve(__dirname, "..")
const SRC_ROOTS = [
  "src/components",
  "src/blocks",
  "src/charts",
  "src/chatbot",
  "src/compliance",
  "src/layouts",
  "src/workflow",
  "src/workflow-diagram",
]

type ManifestEntry = {
  figmaName: string
  figmaPageName: string
  figmaNodeId: string
  figmaUrl: string
  figmaType: "COMPONENT" | "COMPONENT_SET"
  variantAxes?: Record<string, string[]>
  reactName: string | null
  reactImportPath: string | null
  reactFilePath: string | null
}

type Manifest = {
  fileKey: string
  generatedAt: string
  components: ManifestEntry[]
  unmatchedReact: string[]
}

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

function listSourceFiles(): string[] {
  const files: string[] = []
  for (const dir of SRC_ROOTS) {
    const full = join(REPO_ROOT, dir)
    try {
      walk(full, files)
    } catch {
      // skip missing dirs
    }
  }
  return files
}

function walk(dir: string, out: string[]) {
  for (const name of readdirSync(dir)) {
    if (name === "__tests__" || name.startsWith(".")) continue
    const full = join(dir, name)
    const s = statSync(full)
    if (s.isDirectory()) walk(full, out)
    else if (extname(full) === ".tsx" && !name.endsWith(".test.tsx")) out.push(full)
  }
}

function fileToReactName(filePath: string): string {
  const base = filePath
    .split("/")
    .pop()!
    .replace(/\.tsx$/, "")
  return base
    .split("-")
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join("")
}

function fileToImportPath(_filePath: string): string {
  return "@cogentic-co/ds"
}

function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\/\s*/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function findReactFile(figmaName: string, sourceFiles: string[]): string | null {
  const target = normalize(figmaName)
  // exact match
  for (const f of sourceFiles) {
    const kebab = f
      .split("/")
      .pop()!
      .replace(/\.tsx$/, "")
    if (kebab === target) return f
  }
  // first-segment match (e.g. Figma "Header / case" → src/components/header.tsx)
  const firstSeg = target.split("-")[0]
  for (const f of sourceFiles) {
    const kebab = f
      .split("/")
      .pop()!
      .replace(/\.tsx$/, "")
    if (kebab === firstSeg) return f
  }
  return null
}

type FigmaNode = {
  id: string
  name: string
  type: string
  componentPropertyDefinitions?: Record<
    string,
    { type: string; defaultValue?: unknown; variantOptions?: string[] }
  >
  children?: FigmaNode[]
}

function walkNodes(
  node: FigmaNode,
  pageName: string,
  out: { node: FigmaNode; pageName: string }[],
) {
  if (node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
    if (node.type === "COMPONENT_SET" || (node.type === "COMPONENT" && node.id.indexOf(":") > -1)) {
      // Push only top-level (component sets) or loose components — skip variants nested in sets
      out.push({ node, pageName })
    }
  }
  if (node.children) {
    for (const child of node.children) {
      // Don't descend into a COMPONENT_SET (its children are variants we don't want individually)
      if (node.type === "COMPONENT_SET") continue
      walkNodes(child, pageName, out)
    }
  }
}

async function main() {
  console.log(`Fetching Figma file ${FILE_KEY}...`)
  const file = await figmaGet<{ document: FigmaNode }>(`/files/${FILE_KEY}?depth=2`)

  const collected: { node: FigmaNode; pageName: string }[] = []
  for (const page of file.document.children ?? []) {
    if (page.type !== "CANVAS") continue
    // Re-fetch page with full depth to get component sets and their variants
    const pageData = await figmaGet<{ nodes: Record<string, { document: FigmaNode }> }>(
      `/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(page.id)}`,
    )
    const fullPage = pageData.nodes[page.id]?.document
    if (!fullPage?.children) continue
    for (const child of fullPage.children) {
      walkNodes(child, page.name, collected)
    }
  }

  const sourceFiles = listSourceFiles().map((f) => relative(REPO_ROOT, f))
  const usedFiles = new Set<string>()

  const components: ManifestEntry[] = collected.map(({ node, pageName }) => {
    const reactFilePath = findReactFile(node.name, sourceFiles)
    if (reactFilePath) usedFiles.add(reactFilePath)

    let variantAxes: Record<string, string[]> | undefined
    if (node.type === "COMPONENT_SET" && node.componentPropertyDefinitions) {
      variantAxes = {}
      for (const [key, def] of Object.entries(node.componentPropertyDefinitions)) {
        if (def.variantOptions) variantAxes[key] = def.variantOptions
      }
      if (Object.keys(variantAxes).length === 0) variantAxes = undefined
    }

    return {
      figmaName: node.name,
      figmaPageName: pageName,
      figmaNodeId: node.id,
      figmaUrl: `https://figma.com/design/${FILE_KEY}?node-id=${encodeURIComponent(node.id.replace(":", "-"))}`,
      figmaType: node.type as "COMPONENT" | "COMPONENT_SET",
      variantAxes,
      reactName: reactFilePath ? fileToReactName(reactFilePath) : null,
      reactImportPath: reactFilePath ? fileToImportPath(reactFilePath) : null,
      reactFilePath: reactFilePath ?? null,
    }
  })

  const unmatchedReact = sourceFiles.filter((f) => !usedFiles.has(f))

  const manifest: Manifest = {
    fileKey: FILE_KEY,
    generatedAt: new Date().toISOString(),
    components: components.sort((a, b) => a.figmaName.localeCompare(b.figmaName)),
    unmatchedReact: unmatchedReact.sort(),
  }

  const outPath = join(REPO_ROOT, "figma-manifest.json")
  writeFileSync(outPath, `${JSON.stringify(manifest, null, 2)}\n`)
  const matched = components.filter((c) => c.reactFilePath).length
  console.log(`Wrote ${outPath}`)
  console.log(`  ${components.length} Figma components found`)
  console.log(`  ${matched} matched to React files`)
  console.log(`  ${components.length - matched} Figma components without React match`)
  console.log(`  ${unmatchedReact.length} React files without Figma match`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
