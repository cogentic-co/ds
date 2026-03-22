import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Shimmer } from "../shimmer"

describe("Shimmer", () => {
  it("renders with text content", () => {
    render(<Shimmer>Loading text...</Shimmer>)
    expect(screen.getByText("Loading text...")).toBeInTheDocument()
  })

  it("uses data-slot attribute", () => {
    const { container } = render(<Shimmer>Loading</Shimmer>)
    expect(container.querySelector("[data-slot='shimmer']")).toBeInTheDocument()
  })

  it("has role=status and aria-label", () => {
    render(<Shimmer>Loading</Shimmer>)
    expect(screen.getByRole("status")).toBeInTheDocument()
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading")
  })

  it("renders as custom element via as prop", () => {
    render(<Shimmer as="span">Custom</Shimmer>)
    const el = screen.getByText("Custom")
    expect(el.tagName).toBe("SPAN")
  })

  it("merges custom className", () => {
    render(<Shimmer className="custom">Text</Shimmer>)
    expect(screen.getByText("Text")).toHaveClass("custom")
  })

  it("applies custom animation duration", () => {
    render(<Shimmer duration={3}>Text</Shimmer>)
    expect(screen.getByText("Text")).toHaveStyle({ animationDuration: "3s" })
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Shimmer>Loading content</Shimmer>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
