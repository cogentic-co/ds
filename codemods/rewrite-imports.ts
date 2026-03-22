/**
 * Codemod: Rewrite shadcn/ui imports to @cogentic-co/ds
 *
 * Transforms:
 *   import { Button } from "@/components/ui/button"
 *   import { cn } from "@/lib/utils"
 *   → import { Button, cn } from "@cogentic-co/ds"
 *
 * Usage:
 *   npx jscodeshift -t codemods/rewrite-imports.ts --extensions=tsx,ts src/
 */
import type { API, Collection, FileInfo, JSCodeshift } from "jscodeshift"

const DS_PACKAGE = "@cogentic-co/ds"

// Auto-detect available DS components from src/index.ts
function loadDsComponents(): Set<string> {
  // Use require() since jscodeshift loads transforms via CJS
  const fs = require("node:fs") as typeof import("fs")
  const path = require("node:path") as typeof import("path")
  try {
    const indexPath = path.join(__dirname, "..", "src", "index.ts")
    const indexContent = fs.readFileSync(indexPath, "utf-8")

    const components = new Set<string>()
    // Match: export * from "./components/button"
    const re = /export\s+\*\s+from\s+["']\.\/components\/([a-z][a-z-]*)["']/g
    let match: RegExpExecArray | null = null
    // biome-ignore lint/suspicious/noAssignInExpressions: standard regex exec loop
    while ((match = re.exec(indexContent)) !== null) {
      components.add(match[1])
    }
    return components
  } catch {
    console.log("  ⚠️  Could not read src/index.ts — using no component allowlist")
    return new Set()
  }
}

const DS_COMPONENTS = loadDsComponents()

function extractComponentName(source: string): string | null {
  // @/components/ui/button → button
  // ./button → button
  // ../ui/dialog → dialog
  const match = source.match(/(?:components\/ui\/|\.\/|\.\.\/(?:ui\/)?)([a-z][a-z-]*)$/)
  return match ? match[1] : null
}

function isUiImport(source: string): boolean {
  return source.includes("components/ui/") || /^\.\.?\/[a-z][a-z-]*$/.test(source)
}

function isCnImport(source: string): boolean {
  return source === "@/lib/utils" || source === "../lib/utils" || source === "../../lib/utils"
}

export default function transformer(file: FileInfo, api: API) {
  const j: JSCodeshift = api.jscodeshift
  const root: Collection = j(file.source)

  const dsImportNames: string[] = []
  const importsToRemove: Collection[] = []
  const unmigrated: string[] = []

  // Find all import declarations
  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value as string

    // Handle cn import from @/lib/utils
    if (isCnImport(source)) {
      const specifiers = path.node.specifiers || []
      const cnSpecifier = specifiers.find(
        (s) =>
          s.type === "ImportSpecifier" &&
          s.imported.type === "Identifier" &&
          s.imported.name === "cn",
      )
      if (cnSpecifier) {
        dsImportNames.push("cn")
        // If cn is the only import, remove the whole declaration
        if (specifiers.length === 1) {
          importsToRemove.push(j(path))
        } else {
          // Remove just the cn specifier
          path.node.specifiers = specifiers.filter((s) => s !== cnSpecifier)
        }
      }
      return
    }

    // Handle UI component imports
    if (!isUiImport(source)) return

    const componentName = extractComponentName(source)
    if (!componentName) return

    if (DS_COMPONENTS.has(componentName)) {
      // Collect all named imports from this declaration
      const specifiers = path.node.specifiers || []
      for (const specifier of specifiers) {
        if (specifier.type === "ImportSpecifier" && specifier.imported.type === "Identifier") {
          const imported = specifier.imported.name
          const local = specifier.local?.name
          if (local && local !== imported) {
            // Aliased import: import { Button as Btn }
            dsImportNames.push(`${imported} as ${local}`)
          } else {
            dsImportNames.push(imported)
          }
        }
      }
      importsToRemove.push(j(path))
    } else {
      unmigrated.push(componentName)
    }
  })

  if (dsImportNames.length === 0) {
    return undefined // No changes
  }

  // Remove old imports
  for (const collection of importsToRemove) {
    collection.remove()
  }

  // Check if a DS import already exists
  const existingDsImport = root.find(j.ImportDeclaration, {
    source: { value: DS_PACKAGE },
  })

  if (existingDsImport.length > 0) {
    // Append to existing DS import
    const existing = existingDsImport.get().node
    for (const name of dsImportNames) {
      const alreadyImported = (existing.specifiers || []).some(
        (s: any) => s.type === "ImportSpecifier" && s.imported.name === name,
      )
      if (!alreadyImported) {
        if (name.includes(" as ")) {
          const [imported, local] = name.split(" as ")
          existing.specifiers.push(
            j.importSpecifier(j.identifier(imported.trim()), j.identifier(local.trim())),
          )
        } else {
          existing.specifiers.push(j.importSpecifier(j.identifier(name)))
        }
      }
    }
  } else {
    // Create new DS import
    const specifiers = dsImportNames.map((name) => {
      if (name.includes(" as ")) {
        const [imported, local] = name.split(" as ")
        return j.importSpecifier(j.identifier(imported.trim()), j.identifier(local.trim()))
      }
      return j.importSpecifier(j.identifier(name))
    })

    const dsImport = j.importDeclaration(specifiers, j.literal(DS_PACKAGE))

    // Insert after the last remaining import, or at the top
    const allImports = root.find(j.ImportDeclaration)
    if (allImports.length > 0) {
      allImports.at(-1).insertAfter(dsImport)
    } else {
      // Insert at the very top (after "use client" if present)
      const body = root.find(j.Program).get().node.body
      const firstNonDirective = body.findIndex(
        (node: any) => node.type !== "ExpressionStatement" || !node.directive,
      )
      body.splice(firstNonDirective, 0, dsImport)
    }
  }

  if (unmigrated.length > 0) {
    console.log(`  ⚠️  ${file.path}: ${unmigrated.join(", ")} not in DS — keep local`)
  }

  return root.toSource({ quote: "double" })
}
