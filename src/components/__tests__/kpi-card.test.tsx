import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { KpiCard } from "../kpi-card"

describe("KpiCard", () => {
  it("renders label + value", () => {
    render(<KpiCard label="Volume (24h)" value="$1.2M" />)
    expect(screen.getByText("Volume (24h)")).toBeInTheDocument()
    expect(screen.getByText("$1.2M")).toBeInTheDocument()
  })

  it("renders delta with positive tone by default", () => {
    render(<KpiCard label="vol" value="10" delta="+12%" />)
    const delta = screen.getByText("+12%")
    expect(delta).toBeInTheDocument()
    expect(delta.getAttribute("style")).toContain("var(--success)")
  })

  it("renders sparkline when points provided", () => {
    const { container } = render(<KpiCard label="trend" value="123" sparkline={[1, 2, 3, 4, 5]} />)
    expect(container.querySelector('[data-slot="sparkline"]')).toBeTruthy()
  })

  it("has no a11y violations", async () => {
    const { container } = render(
      <KpiCard label="Volume" value="$1M" delta="+5%" hint="vs 7d avg" />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
