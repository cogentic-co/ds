import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { CodeBlock } from "../code-block"

describe("CodeBlock", () => {
  it("renders without crashing", () => {
    const { container } = render(<CodeBlock code="const x = 1" />)
    expect(container.querySelector("[data-slot='code-block']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<CodeBlock code="hello" />)
    expect(container.querySelector("[data-slot='code-block']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<CodeBlock code="test" className="custom-block" />)
    expect(container.querySelector("[data-slot='code-block']")).toHaveClass("custom-block")
  })

  it("displays code content", () => {
    render(<CodeBlock code="const x = 42" />)
    expect(screen.getByText("const x = 42")).toBeInTheDocument()
  })

  it("shows language label when provided", () => {
    render(<CodeBlock code="x = 1" language="python" />)
    expect(screen.getByText("python")).toBeInTheDocument()
  })

  it("shows copy button by default", () => {
    render(<CodeBlock code="test" />)
    expect(screen.getByText("Copy")).toBeInTheDocument()
  })

  it("hides copy button when showCopy is false", () => {
    render(<CodeBlock code="test" showCopy={false} />)
    expect(screen.queryByText("Copy")).not.toBeInTheDocument()
  })

  it("shows line numbers when showLineNumbers is true", () => {
    render(<CodeBlock code={"line1\nline2\nline3"} showLineNumbers />)
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<CodeBlock code="const a = 1" language="js" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
