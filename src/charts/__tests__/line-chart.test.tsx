import { render } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import type { ChartConfig } from "../../components/chart"
import { LineChart } from "../line-chart"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

const testConfig: ChartConfig = {
  temperature: { label: "Temperature", color: "#ff7300" },
  humidity: { label: "Humidity", color: "#0088fe" },
}

const testData = [
  { day: "Mon", temperature: 22, humidity: 60 },
  { day: "Tue", temperature: 25, humidity: 55 },
  { day: "Wed", temperature: 19, humidity: 70 },
]

function renderLineChart(props: Partial<React.ComponentProps<typeof LineChart>> = {}) {
  return render(
    <LineChart data={testData} config={testConfig} xKey="day" yKeys={["temperature"]} {...props} />,
  )
}

describe("LineChart", () => {
  it("renders without crashing", () => {
    const { container } = renderLineChart()
    expect(container.querySelector("[data-slot='line-chart']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = renderLineChart()
    expect(container.querySelector("[data-slot='line-chart']")).toBeInTheDocument()
  })

  it("renders with multiple yKeys", () => {
    const { container } = renderLineChart({ yKeys: ["temperature", "humidity"] })
    expect(container.querySelector("[data-slot='line-chart']")).toBeInTheDocument()
  })

  it("renders with showGrid disabled", () => {
    const { container } = renderLineChart({ showGrid: false })
    expect(container.querySelector("[data-slot='line-chart']")).toBeInTheDocument()
  })

  it("renders with showYAxis enabled", () => {
    const { container } = renderLineChart({ showYAxis: true })
    expect(container.querySelector("[data-slot='line-chart']")).toBeInTheDocument()
  })

  it("renders with showLegend enabled", () => {
    const { container } = renderLineChart({ showLegend: true })
    expect(container.querySelector("[data-slot='line-chart']")).toBeInTheDocument()
  })

  it("renders with showXAxis disabled", () => {
    const { container } = renderLineChart({ showXAxis: false })
    expect(container.querySelector("[data-slot='line-chart']")).toBeInTheDocument()
  })

  it("renders with showDots disabled", () => {
    const { container } = renderLineChart({ showDots: false })
    expect(container.querySelector("[data-slot='line-chart']")).toBeInTheDocument()
  })

  it("renders with linear curveType", () => {
    const { container } = renderLineChart({ curveType: "linear" })
    expect(container.querySelector("[data-slot='line-chart']")).toBeInTheDocument()
  })

  it("renders with step curveType", () => {
    const { container } = renderLineChart({ curveType: "step" })
    expect(container.querySelector("[data-slot='line-chart']")).toBeInTheDocument()
  })

  it("renders with monotone curveType", () => {
    const { container } = renderLineChart({ curveType: "monotone" })
    expect(container.querySelector("[data-slot='line-chart']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = renderLineChart({ className: "custom-line-chart" })
    expect(container.querySelector("[data-slot='line-chart']")).toHaveClass("custom-line-chart")
  })

  it("has no accessibility violations", async () => {
    const { container } = renderLineChart()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
