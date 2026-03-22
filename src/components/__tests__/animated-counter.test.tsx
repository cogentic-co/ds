import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { AnimatedCounter } from "../animated-counter"

describe("AnimatedCounter", () => {
  it("renders without crashing", () => {
    render(<AnimatedCounter value={42} />)
    expect(document.querySelector("[data-slot='animated-counter']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<AnimatedCounter value={100} />)
    expect(container.querySelector("[data-slot='animated-counter']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<AnimatedCounter value={10} className="custom-class" />)
    expect(container.querySelector("[data-slot='animated-counter']")).toHaveClass("custom-class")
  })

  it("renders prefix and suffix", () => {
    render(<AnimatedCounter value={50} prefix="$" suffix="%" />)
    const el = screen.getByText(/\$.*%/)
    expect(el).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<AnimatedCounter value={42} prefix="$" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
