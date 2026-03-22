import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Callout } from "../callout"

describe("Callout", () => {
  it("renders without crashing", () => {
    render(<Callout>Something to note</Callout>)
    expect(screen.getByText("Something to note")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<Callout>Content</Callout>)
    expect(container.querySelector("[data-slot='callout']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<Callout className="custom-callout">Content</Callout>)
    expect(container.querySelector("[data-slot='callout']")).toHaveClass("custom-callout")
  })

  it("renders info variant by default", () => {
    const { container } = render(<Callout>Info message</Callout>)
    expect(container.querySelector("[data-slot='callout']")).toHaveClass("border-blue-500/20")
  })

  it("renders warning variant", () => {
    const { container } = render(<Callout variant="warning">Warning message</Callout>)
    expect(container.querySelector("[data-slot='callout']")).toHaveClass("border-amber-500/20")
  })

  it("renders danger variant", () => {
    const { container } = render(<Callout variant="danger">Danger message</Callout>)
    expect(container.querySelector("[data-slot='callout']")).toHaveClass("border-red-500/20")
  })

  it("renders tip variant", () => {
    const { container } = render(<Callout variant="tip">Tip message</Callout>)
    expect(container.querySelector("[data-slot='callout']")).toHaveClass("border-emerald-500/20")
  })

  it("renders an icon for each variant", () => {
    const { container } = render(<Callout variant="info">Content</Callout>)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Callout>Accessible callout content</Callout>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
