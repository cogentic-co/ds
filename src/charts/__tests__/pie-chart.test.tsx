import { render } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import type { ChartConfig } from "../../components/chart"
import { PieChart } from "../pie-chart"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

const testConfig: ChartConfig = {
  chrome: { label: "Chrome", color: "#4285f4" },
  firefox: { label: "Firefox", color: "#ff7139" },
  safari: { label: "Safari", color: "#0fb5ee" },
}

const testData = [
  { name: "chrome", value: 400 },
  { name: "firefox", value: 200 },
  { name: "safari", value: 150 },
]

const testDataWithFill = [
  { name: "chrome", value: 400, fill: "#4285f4" },
  { name: "firefox", value: 200, fill: "#ff7139" },
  { name: "safari", value: 150, fill: "#0fb5ee" },
]

function renderPieChart(props: Partial<React.ComponentProps<typeof PieChart>> = {}) {
  return render(<PieChart data={testData} config={testConfig} {...props} />)
}

describe("PieChart", () => {
  it("renders without crashing", () => {
    const { container } = renderPieChart()
    expect(container.querySelector("[data-slot='pie-chart']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = renderPieChart()
    expect(container.querySelector("[data-slot='pie-chart']")).toBeInTheDocument()
  })

  it("renders as donut chart", () => {
    const { container } = renderPieChart({ donut: true })
    expect(container.querySelector("[data-slot='pie-chart']")).toBeInTheDocument()
  })

  it("renders donut with center label", () => {
    const { container } = renderPieChart({ donut: true, centerLabel: "Total", centerValue: 750 })
    expect(container.querySelector("[data-slot='pie-chart']")).toBeInTheDocument()
  })

  it("renders donut with only centerValue", () => {
    const { container } = renderPieChart({ donut: true, centerValue: "750" })
    expect(container.querySelector("[data-slot='pie-chart']")).toBeInTheDocument()
  })

  it("renders donut with only centerLabel", () => {
    const { container } = renderPieChart({ donut: true, centerLabel: "Users" })
    expect(container.querySelector("[data-slot='pie-chart']")).toBeInTheDocument()
  })

  it("renders with showLegend enabled", () => {
    const { container } = renderPieChart({ showLegend: true })
    expect(container.querySelector("[data-slot='pie-chart']")).toBeInTheDocument()
  })

  it("renders with explicit fill colors on data", () => {
    const { container } = render(<PieChart data={testDataWithFill} config={testConfig} />)
    expect(container.querySelector("[data-slot='pie-chart']")).toBeInTheDocument()
  })

  it("renders with custom dataKey and nameKey", () => {
    const customData = [
      { label: "A", amount: 100 },
      { label: "B", amount: 200 },
    ]
    const customConfig: ChartConfig = {
      A: { label: "A", color: "#ff0000" },
      B: { label: "B", color: "#00ff00" },
    }
    const { container } = render(
      <PieChart
        data={customData as { name: string; value: number }[]}
        config={customConfig}
        dataKey="amount"
        nameKey="label"
      />,
    )
    expect(container.querySelector("[data-slot='pie-chart']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = renderPieChart({ className: "custom-pie-chart" })
    expect(container.querySelector("[data-slot='pie-chart']")).toHaveClass("custom-pie-chart")
  })

  it("has no accessibility violations", async () => {
    const { container } = renderPieChart()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
