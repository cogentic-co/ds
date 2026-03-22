import { render } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import type { ChartConfig } from "../../components/chart"
import { AreaChart } from "../area-chart"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

const testConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "#8884d8" },
  expenses: { label: "Expenses", color: "#82ca9d" },
}

const testData = [
  { month: "Jan", revenue: 400, expenses: 240 },
  { month: "Feb", revenue: 300, expenses: 139 },
  { month: "Mar", revenue: 600, expenses: 380 },
]

function renderAreaChart(props: Partial<React.ComponentProps<typeof AreaChart>> = {}) {
  return render(
    <AreaChart data={testData} config={testConfig} xKey="month" yKeys={["revenue"]} {...props} />,
  )
}

describe("AreaChart", () => {
  it("renders without crashing", () => {
    const { container } = renderAreaChart()
    expect(container.querySelector("[data-slot='area-chart']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = renderAreaChart()
    expect(container.querySelector("[data-slot='area-chart']")).toBeInTheDocument()
  })

  it("renders with multiple yKeys", () => {
    const { container } = renderAreaChart({ yKeys: ["revenue", "expenses"] })
    expect(container.querySelector("[data-slot='area-chart']")).toBeInTheDocument()
  })

  it("renders with stacked option", () => {
    const { container } = renderAreaChart({ stacked: true })
    expect(container.querySelector("[data-slot='area-chart']")).toBeInTheDocument()
  })

  it("renders without gradient", () => {
    const { container } = renderAreaChart({ gradient: false })
    expect(container.querySelector("[data-slot='area-chart']")).toBeInTheDocument()
  })

  it("renders with showGrid disabled", () => {
    const { container } = renderAreaChart({ showGrid: false })
    expect(container.querySelector("[data-slot='area-chart']")).toBeInTheDocument()
  })

  it("renders with showYAxis enabled", () => {
    const { container } = renderAreaChart({ showYAxis: true })
    expect(container.querySelector("[data-slot='area-chart']")).toBeInTheDocument()
  })

  it("renders with showLegend enabled", () => {
    const { container } = renderAreaChart({ showLegend: true })
    expect(container.querySelector("[data-slot='area-chart']")).toBeInTheDocument()
  })

  it("renders with showXAxis disabled", () => {
    const { container } = renderAreaChart({ showXAxis: false })
    expect(container.querySelector("[data-slot='area-chart']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = renderAreaChart({ className: "custom-area-chart" })
    expect(container.querySelector("[data-slot='area-chart']")).toHaveClass("custom-area-chart")
  })

  it("has no accessibility violations", async () => {
    const { container } = renderAreaChart()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
