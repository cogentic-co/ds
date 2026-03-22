/**
 * Extracts prop documentation from component source files using react-docgen-typescript.
 * Outputs a JSON file at app/_generated/props.json consumed by the preview app.
 *
 * Usage: npx tsx scripts/generate-props.ts
 */

import * as fs from "node:fs"
import * as path from "node:path"
import { fileURLToPath } from "node:url"
import { withCompilerOptions } from "react-docgen-typescript"
import ts from "typescript"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, "..")
const SRC_COMPONENTS = path.join(ROOT, "src/components")
const SRC_SHELLS = path.join(ROOT, "src/shells")
const SRC_BLOCKS = path.join(ROOT, "src/blocks")
const SRC_ANIMATIONS = path.join(ROOT, "src/animations")
const OUTPUT = path.join(ROOT, "app/_generated/props.json")

const parser = withCompilerOptions(
  {
    esModuleInterop: true,
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2017,
    strict: true,
    skipLibCheck: true,
  },
  {
    savePropValueAsString: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    propFilter: (prop) => {
      // Always include className
      if (prop.name === "className") return true
      // Skip HTML/DOM props inherited from React
      if (prop.declarations && prop.declarations.length > 0) {
        const hasPropAdditionalDescription = prop.declarations.find(
          (declaration) => !declaration.fileName.includes("node_modules"),
        )
        return !!hasPropAdditionalDescription
      }
      return true
    },
  },
)

type PropDoc = {
  name: string
  type: string
  required: boolean
  defaultValue: string | null
  description: string
}

type ComponentDoc = {
  displayName: string
  description: string
  props: PropDoc[]
}

type PropsManifest = Record<string, ComponentDoc[]>

function collectFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx") && !f.includes("__tests__"))
    .map((f) => path.join(dir, f))
}

function slugFromFile(filePath: string): string {
  return path.basename(filePath, ".tsx")
}

function main() {
  const manifest: PropsManifest = {}

  const files = [
    ...collectFiles(SRC_COMPONENTS),
    ...collectFiles(SRC_SHELLS),
    ...collectFiles(SRC_BLOCKS),
    ...collectFiles(SRC_ANIMATIONS),
  ]

  for (const file of files) {
    const slug = slugFromFile(file)
    try {
      const docs = parser.parse(file)
      if (docs.length === 0) continue

      manifest[slug] = docs.map((doc) => ({
        displayName: doc.displayName,
        description: doc.description,
        props: Object.values(doc.props).map((prop) => ({
          name: prop.name,
          type: prop.type.name,
          required: prop.required,
          defaultValue: prop.defaultValue?.value ?? null,
          description: prop.description,
        })),
      }))
    } catch {
      // Skip files that fail to parse
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
  fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2))

  const componentCount = Object.keys(manifest).length
  const totalProps = Object.values(manifest).reduce(
    (sum, docs) => sum + docs.reduce((s, d) => s + d.props.length, 0),
    0,
  )
  console.log(
    `Generated prop docs: ${componentCount} components, ${totalProps} props → ${path.relative(ROOT, OUTPUT)}`,
  )
}

main()
