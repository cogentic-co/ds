import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { BreathingBar } from "../breathing-bar"

describe("BreathingBar", () => {
  const segments = [
    { value: 40, variant: "mint" as const, label: "Direct" },
    { value: 30, variant: "sky" as const, label: "Organic" },
    { value: 20, variant: "blush" as const, label: "Paid" },
    { value: 10, variant: "unattributed" as const, label: "Unknown" },
  ]

  it("renders all segments", () => {
    const { container } = render(<BreathingBar segments={segments} />)
    const bar = container.querySelector('[role="img"]')
    expect(bar?.children.length).toBe(4)
  })

  it("widths sum to 100%", () => {
    const { container } = render(<BreathingBar segments={segments} />)
    const bar = container.querySelector('[role="img"]') as HTMLElement
    const widths = Array.from(bar.children).map((c) =>
      Number.parseFloat((c as HTMLElement).style.width.replace("%", "")),
    )
    expect(Math.round(widths.reduce((s, x) => s + x, 0))).toBe(100)
  })

  it("renders legend when showLegend=true", () => {
    render(<BreathingBar segments={segments} showLegend format={(n) => `${n}%`} />)
    expect(screen.getByText("Direct")).toBeInTheDocument()
    expect(screen.getByText("40%")).toBeInTheDocument()
  })

  it("omits legend by default", () => {
    render(<BreathingBar segments={segments} />)
    expect(screen.queryByText("Direct")).not.toBeInTheDocument()
  })

  it("applies animated class when animated=true", () => {
    const { container } = render(<BreathingBar segments={segments} animated />)
    expect(container.querySelector('[role="img"]')?.className).toContain("animate-bar-breathe")
  })

  it("merges className", () => {
    const { container } = render(<BreathingBar segments={segments} className="custom" />)
    expect((container.firstChild as HTMLElement).className).toContain("custom")
  })

  it("handles zero-total gracefully", () => {
    const { container } = render(<BreathingBar segments={[{ value: 0 }, { value: 0 }]} />)
    expect(container.firstChild).toBeTruthy()
  })

  it("has no a11y violations", async () => {
    const { container } = render(<BreathingBar segments={segments} showLegend />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
