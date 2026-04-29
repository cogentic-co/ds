import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Sparkline } from "../sparkline"

describe("Sparkline", () => {
  it("renders svg with a data-slot when enough points", () => {
    const { container } = render(<Sparkline points={[1, 3, 2, 4, 5]} />)
    expect(container.querySelector('[data-slot="sparkline"]')).toBeTruthy()
  })

  it("renders nothing with fewer than 2 points", () => {
    const { container } = render(<Sparkline points={[7]} />)
    expect(container.querySelector('[data-slot="sparkline"]')).toBeNull()
  })

  it("renders only the line path by default (no fill area, no end dot)", () => {
    const { container } = render(<Sparkline points={[1, 2, 3]} />)
    expect(container.querySelectorAll("path").length).toBe(1)
    expect(container.querySelector("circle")).toBeNull()
  })

  it("opt-in fill renders an area path", () => {
    const { container } = render(<Sparkline points={[1, 2, 3]} fill />)
    expect(container.querySelectorAll("path").length).toBe(2)
  })

  it("opt-in showDot renders a circle at the latest point", () => {
    const { container } = render(<Sparkline points={[1, 2, 3]} showDot />)
    expect(container.querySelector("circle")).not.toBeNull()
  })

  it("smooth=true emits cubic bezier commands", () => {
    const { container } = render(<Sparkline points={[1, 2, 3, 4]} smooth />)
    const d = container.querySelector("path")?.getAttribute("d") ?? ""
    expect(d.includes("C")).toBe(true)
  })

  it("has no a11y violations", async () => {
    const { container } = render(<Sparkline points={[1, 4, 2, 6, 3, 8]} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
