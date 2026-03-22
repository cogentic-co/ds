/**
 * Codemod: Transform asChild prop to render prop (Radix → Base UI)
 *
 * Transforms:
 *   <Button asChild>
 *     <Link href="/foo">Click me</Link>
 *   </Button>
 *   →
 *   <Button render={<Link href="/foo" />}>
 *     Click me
 *   </Button>
 *
 * Also handles:
 *   <Button asChild>
 *     <a href="/foo">Click me</a>
 *   </Button>
 *   →
 *   <Button render={<a href="/foo" />}>
 *     Click me
 *   </Button>
 *
 * Usage:
 *   npx jscodeshift -t codemods/aschild-to-render.ts --extensions=tsx,ts src/
 */
import type { API, Collection, FileInfo, JSCodeshift } from "jscodeshift"

export default function transformer(file: FileInfo, api: API) {
  const j: JSCodeshift = api.jscodeshift
  const root: Collection = j(file.source)
  let hasChanges = false

  // Find all JSX elements with an asChild attribute
  root.find(j.JSXElement).forEach((path) => {
    const openingElement = path.node.openingElement
    const asChildIndex = openingElement.attributes?.findIndex(
      (attr) =>
        attr.type === "JSXAttribute" &&
        attr.name.type === "JSXIdentifier" &&
        attr.name.name === "asChild",
    )

    if (asChildIndex === undefined || asChildIndex === -1) return

    // Get the child elements (skip whitespace text nodes)
    const meaningfulChildren = (path.node.children ?? []).filter((child) => {
      if (child.type === "JSXText") {
        return child.value.trim().length > 0
      }
      return true
    })

    // We expect exactly one JSX element child
    const jsxChildren = meaningfulChildren.filter(
      (child) => child.type === "JSXElement" || child.type === "JSXFragment",
    )

    if (jsxChildren.length !== 1 || jsxChildren[0].type !== "JSXElement") {
      const parentName =
        openingElement.name.type === "JSXIdentifier" ? openingElement.name.name : "component"
      console.log(
        `  ⚠️  ${file.path}: <${parentName} asChild> has ${jsxChildren.length} element children — needs manual migration`,
      )
      return
    }

    const childElement = jsxChildren[0] as any
    const childOpening = childElement.openingElement

    // Build a self-closing version of the child element for the render prop
    // e.g., <Link href="/foo" /> from <Link href="/foo">Click me</Link>
    const renderElement = j.jsxElement(
      j.jsxOpeningElement(
        childOpening.name,
        childOpening.attributes || [],
        true, // self-closing
      ),
      null, // no closing element
      [], // no children
    )

    // Create the render={<Element />} attribute
    const renderAttr = j.jsxAttribute(
      j.jsxIdentifier("render"),
      j.jsxExpressionContainer(renderElement),
    )

    // Remove asChild attribute and add render attribute
    openingElement.attributes!.splice(asChildIndex, 1, renderAttr)

    // Move child element's children up to the parent
    // <Button asChild><Link href="/">Click</Link></Button>
    // → <Button render={<Link href="/" />}>Click</Button>
    const grandchildren = childElement.children || []

    // Replace the child JSX element with its own children
    path.node.children = grandchildren

    // If the parent was self-closing, it can't be anymore
    if (openingElement.selfClosing) {
      openingElement.selfClosing = false
      const closingName = openingElement.name
      path.node.closingElement = j.jsxClosingElement(closingName)
    }

    hasChanges = true
  })

  if (!hasChanges) return undefined

  return root.toSource({ quote: "double" })
}
