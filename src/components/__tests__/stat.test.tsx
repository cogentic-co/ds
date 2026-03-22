import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Stat, StatLabel, StatTrend, StatValue } from "../stat"

describe("Stat", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <Stat>
        <StatLabel>Revenue</StatLabel>
        <StatValue>$12,345</StatValue>
      </Stat>,
    )
    expect(container.querySelector("[data-slot='stat']")).toBeInTheDocument()
  })

  it("has data-slot attributes", () => {
    const { container } = render(
      <Stat>
        <StatLabel>Revenue</StatLabel>
        <StatValue>$12,345</StatValue>
        <StatTrend direction="up">+12%</StatTrend>
      </Stat>,
    )
    expect(container.querySelector("[data-slot='stat']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='stat-label']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='stat-value']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='stat-trend']")).toBeInTheDocument()
  })

  it("merges custom className on Stat", () => {
    const { container } = render(<Stat className="custom-stat">Content</Stat>)
    expect(container.querySelector("[data-slot='stat']")).toHaveClass("custom-stat")
  })

  it("merges custom className on StatLabel", () => {
    render(<StatLabel className="custom-label">Label</StatLabel>)
    expect(screen.getByText("Label")).toHaveClass("custom-label")
  })

  it("merges custom className on StatValue", () => {
    render(<StatValue className="custom-value">100</StatValue>)
    expect(screen.getByText("100")).toHaveClass("custom-value")
  })

  it("renders up trend variant", () => {
    render(<StatTrend direction="up">+5%</StatTrend>)
    const trend = screen.getByText("+5%").closest("[data-slot='stat-trend']")
    expect(trend).toHaveClass("text-emerald-600")
  })

  it("renders down trend variant", () => {
    render(<StatTrend direction="down">-3%</StatTrend>)
    const trend = screen.getByText("-3%").closest("[data-slot='stat-trend']")
    expect(trend).toHaveClass("text-red-600")
  })

  it("renders neutral trend variant", () => {
    render(<StatTrend direction="neutral">0%</StatTrend>)
    const trend = screen.getByText("0%").closest("[data-slot='stat-trend']")
    expect(trend).toHaveClass("text-muted-foreground")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Stat>
        <StatLabel>Revenue</StatLabel>
        <StatValue>$12,345</StatValue>
        <StatTrend direction="up">+12%</StatTrend>
      </Stat>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
