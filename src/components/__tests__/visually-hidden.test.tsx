import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { VisuallyHidden } from "../visually-hidden"

describe("VisuallyHidden", () => {
  it("renders without crashing", () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    expect(screen.getByText("Hidden text")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<VisuallyHidden>Text</VisuallyHidden>)
    expect(container.querySelector("[data-slot='visually-hidden']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<VisuallyHidden className="custom-hidden">Text</VisuallyHidden>)
    expect(container.querySelector("[data-slot='visually-hidden']")).toHaveClass("custom-hidden")
  })

  it("renders as a span", () => {
    render(<VisuallyHidden>Span text</VisuallyHidden>)
    expect(screen.getByText("Span text").tagName).toBe("SPAN")
  })

  it("has visually hidden styles", () => {
    const { container } = render(<VisuallyHidden>Hidden</VisuallyHidden>)
    const el = container.querySelector("[data-slot='visually-hidden']")
    expect(el).toHaveClass("absolute")
    expect(el).toHaveClass("h-px")
    expect(el).toHaveClass("w-px")
    expect(el).toHaveClass("overflow-hidden")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<VisuallyHidden>Screen reader text</VisuallyHidden>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
