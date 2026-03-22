import { render } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import type { ChartConfig } from "../../components/chart"
import { BarChart } from "../bar-chart"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

const testConfig: ChartConfig = {
  sales: { label: "Sales", color: "#8884d8" },
  returns: { label: "Returns", color: "#82ca9d" },
}

const testData = [
  { category: "Q1", sales: 400, returns: 40 },
  { category: "Q2", sales: 300, returns: 30 },
  { category: "Q3", sales: 600, returns: 60 },
]

function renderBarChart(props: Partial<React.ComponentProps<typeof BarChart>> = {}) {
  return render(
    <BarChart data={testData} config={testConfig} xKey="category" yKeys={["sales"]} {...props} />,
  )
}

describe("BarChart", () => {
  it("renders without crashing", () => {
    const { container } = renderBarChart()
    expect(container.querySelector("[data-slot='bar-chart']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = renderBarChart()
    expect(container.querySelector("[data-slot='bar-chart']")).toBeInTheDocument()
  })

  it("renders with multiple yKeys", () => {
    const { container } = renderBarChart({ yKeys: ["sales", "returns"] })
    expect(container.querySelector("[data-slot='bar-chart']")).toBeInTheDocument()
  })

  it("renders with stacked option", () => {
    const { container } = renderBarChart({ stacked: true, yKeys: ["sales", "returns"] })
    expect(container.querySelector("[data-slot='bar-chart']")).toBeInTheDocument()
  })

  it("renders in horizontal layout", () => {
    const { container } = renderBarChart({ horizontal: true })
    expect(container.querySelector("[data-slot='bar-chart']")).toBeInTheDocument()
  })

  it("renders with showGrid disabled", () => {
    const { container } = renderBarChart({ showGrid: false })
    expect(container.querySelector("[data-slot='bar-chart']")).toBeInTheDocument()
  })

  it("renders with showYAxis enabled", () => {
    const { container } = renderBarChart({ showYAxis: true })
    expect(container.querySelector("[data-slot='bar-chart']")).toBeInTheDocument()
  })

  it("renders with showLegend enabled", () => {
    const { container } = renderBarChart({ showLegend: true })
    expect(container.querySelector("[data-slot='bar-chart']")).toBeInTheDocument()
  })

  it("renders with showXAxis disabled", () => {
    const { container } = renderBarChart({ showXAxis: false })
    expect(container.querySelector("[data-slot='bar-chart']")).toBeInTheDocument()
  })

  it("renders with custom radius", () => {
    const { container } = renderBarChart({ radius: 8 })
    expect(container.querySelector("[data-slot='bar-chart']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = renderBarChart({ className: "custom-bar-chart" })
    expect(container.querySelector("[data-slot='bar-chart']")).toHaveClass("custom-bar-chart")
  })

  it("has no accessibility violations", async () => {
    const { container } = renderBarChart()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
