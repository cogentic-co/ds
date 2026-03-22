import { render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { RiskGauge } from "../risk-gauge"

beforeAll(() => {
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any
})

describe("RiskGauge", () => {
  it("renders without crashing", () => {
    const { container } = render(<RiskGauge score={50} tier="medium" animated={false} />)
    expect(container.querySelector("[data-slot='risk-gauge']")).toBeInTheDocument()
  })

  it("renders the correct number of bars", () => {
    const { container } = render(<RiskGauge score={50} tier="medium" animated={false} />)
    const bars = container.querySelectorAll("[data-slot='risk-gauge'] > div:last-child > div")
    expect(bars).toHaveLength(40)
  })

  it("renders label and score when label is provided", () => {
    render(<RiskGauge score={75} tier="high" label="Risk Level" animated={false} />)
    expect(screen.getByText("Risk Level")).toBeInTheDocument()
    expect(screen.getByText("75/100")).toBeInTheDocument()
  })

  it("does not render label when not provided", () => {
    const { container } = render(<RiskGauge score={50} tier="medium" animated={false} />)
    const children = container.querySelector("[data-slot='risk-gauge']")!.children
    expect(children).toHaveLength(1) // only the bars div
  })

  it("merges custom className", () => {
    const { container } = render(<RiskGauge score={50} tier="medium" className="custom-gauge" />)
    expect(container.querySelector("[data-slot='risk-gauge']")).toHaveClass("custom-gauge")
  })

  it("renders sm size by default", () => {
    const { container } = render(<RiskGauge score={50} tier="medium" animated={false} />)
    const bar = container.querySelector("[data-slot='risk-gauge'] > div:last-child > div")
    expect(bar).toHaveClass("h-4")
  })

  it("renders lg size", () => {
    const { container } = render(<RiskGauge score={50} tier="medium" size="lg" />)
    const bar = container.querySelector("[data-slot='risk-gauge'] > div:last-child > div")
    expect(bar).toHaveClass("h-6")
  })

  it("fills correct number of bars based on score", () => {
    const { container } = render(<RiskGauge score={50} tier="low" animated={false} />)
    const bars = container.querySelectorAll("[data-slot='risk-gauge'] > div:last-child > div")
    const filled = Array.from(bars).filter((b) => b.classList.contains("bg-success"))
    expect(filled).toHaveLength(20)
  })

  it("supports all tier variants", () => {
    for (const tier of [
      "low",
      "medium",
      "high",
      "severe",
      "highTrust",
      "moderateTrust",
      "lowTrust",
      "critical",
    ]) {
      const { container } = render(<RiskGauge score={50} tier={tier} animated={false} />)
      expect(container.querySelector("[data-slot='risk-gauge']")).toBeInTheDocument()
    }
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <RiskGauge score={75} tier="high" label="Risk Score" animated={false} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
