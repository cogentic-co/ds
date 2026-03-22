import { render } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import type { ChartConfig } from "../../components/chart"
import { RadialChart } from "../radial-chart"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

const testConfig: ChartConfig = {
  performance: { label: "Performance", color: "#8884d8" },
  reliability: { label: "Reliability", color: "#82ca9d" },
}

const testData = [
  { metric: "Speed", performance: 80, reliability: 90 },
  { metric: "Accuracy", performance: 95, reliability: 85 },
  { metric: "Coverage", performance: 70, reliability: 75 },
  { metric: "Latency", performance: 60, reliability: 88 },
]

function renderRadialChart(props: Partial<React.ComponentProps<typeof RadialChart>> = {}) {
  return render(
    <RadialChart
      data={testData}
      config={testConfig}
      angleKey="metric"
      dataKeys={["performance"]}
      {...props}
    />,
  )
}

describe("RadialChart", () => {
  it("renders without crashing", () => {
    const { container } = renderRadialChart()
    expect(container.querySelector("[data-slot='radial-chart']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = renderRadialChart()
    expect(container.querySelector("[data-slot='radial-chart']")).toBeInTheDocument()
  })

  it("renders with multiple dataKeys", () => {
    const { container } = renderRadialChart({ dataKeys: ["performance", "reliability"] })
    expect(container.querySelector("[data-slot='radial-chart']")).toBeInTheDocument()
  })

  it("renders with showLegend enabled", () => {
    const { container } = renderRadialChart({ showLegend: true })
    expect(container.querySelector("[data-slot='radial-chart']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = renderRadialChart({ className: "custom-radial-chart" })
    expect(container.querySelector("[data-slot='radial-chart']")).toHaveClass("custom-radial-chart")
  })

  it("has no accessibility violations", async () => {
    const { container } = renderRadialChart()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
