/**
 * Codemod: Strip className props from migrated DS components
 *
 * For each JSX element imported from @cogentic-co/ds, removes the className
 * prop and adds a comment above preserving the original value.
 *
 * Transforms:
 *   <Button className="h-7 text-xs px-2 gap-1">Click</Button>
 *   →
 *   {/* className was: "h-7 text-xs px-2 gap-1" *​/}
 *   <Button>Click</Button>
 *
 * Usage:
 *   npx jscodeshift -t codemods/strip-classnames.ts --extensions=tsx,ts --parser=tsx src/
 */
import type { API, Collection, FileInfo, JSCodeshift } from "jscodeshift"

const DS_PACKAGE = "@cogentic-co/ds"

type Replacement = { line: number; classValue: string }

export default function transformer(file: FileInfo, api: API) {
  const j: JSCodeshift = api.jscodeshift
  const root: Collection = j(file.source)

  // Collect all component names imported from the DS package
  const dsComponents = new Set<string>()
  root.find(j.ImportDeclaration, { source: { value: DS_PACKAGE } }).forEach((path) => {
    for (const specifier of path.node.specifiers || []) {
      if (specifier.type === "ImportSpecifier" && specifier.local) {
        dsComponents.add(specifier.local.name as string)
      }
    }
  })

  if (dsComponents.size === 0) return undefined

  // Collect classNames to strip with their line numbers (for comment insertion)
  const replacements: Replacement[] = []

  root.find(j.JSXOpeningElement).forEach((path) => {
    const nameNode = path.node.name
    if (nameNode.type !== "JSXIdentifier") return

    const tagName = nameNode.name
    if (!dsComponents.has(tagName)) return

    const attrs = path.node.attributes || []
    const classNameIndex = attrs.findIndex(
      (attr) =>
        attr.type === "JSXAttribute" &&
        attr.name.type === "JSXIdentifier" &&
        attr.name.name === "className",
    )

    if (classNameIndex === -1) return

    const classNameAttr = attrs[classNameIndex]
    if (classNameAttr.type !== "JSXAttribute") return

    // Extract the className value as a string for the comment
    let classValue: string
    const attrValue = classNameAttr.value
    if (!attrValue) {
      classValue = "true"
    } else if (attrValue.type === "StringLiteral" || attrValue.type === "Literal") {
      classValue = `"${(attrValue as any).value}"`
    } else if (
      attrValue.type === "JSXExpressionContainer" &&
      attrValue.expression.type !== "JSXEmptyExpression"
    ) {
      const start = (attrValue.expression as unknown as { start?: number }).start
      const end = (attrValue.expression as unknown as { end?: number }).end
      if (start != null && end != null) {
        classValue = `{${file.source.slice(start, end)}}`
      } else {
        classValue = "{expression}"
      }
    } else {
      classValue = "{unknown}"
    }

    // Get the line number of the opening tag for comment placement
    const line = path.node.loc?.start.line

    // Remove the className attribute
    attrs.splice(classNameIndex, 1)

    if (line) {
      replacements.push({ line, classValue })
    }
  })

  if (replacements.length === 0) return undefined

  // Generate the source with classNames removed
  const output = root.toSource({ quote: "double" })

  // Insert comments above the elements (process in reverse line order to keep line numbers stable)
  const lines = output.split("\n")
  const sortedReplacements = [...replacements].sort((a, b) => b.line - a.line)

  for (const { line, classValue } of sortedReplacements) {
    // Find the actual line in the output (line numbers may shift slightly)
    // Use 0-indexed, capped to array length
    const idx = Math.min(line - 1, lines.length - 1)
    if (idx >= 0) {
      // Detect indentation of the target line
      const indent = lines[idx].match(/^(\s*)/)?.[1] ?? ""
      const comment = `${indent}{/* className was: ${classValue} */}`
      lines.splice(idx, 0, comment)
    }
  }

  return lines.join("\n")
}
