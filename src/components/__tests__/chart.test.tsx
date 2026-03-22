import { render } from "@testing-library/react"
import { Bar, BarChart } from "recharts"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { type ChartConfig, ChartContainer } from "../chart"

const testConfig: ChartConfig = {
  value: {
    label: "Value",
    color: "#8884d8",
  },
}

const testData = [
  { name: "A", value: 100 },
  { name: "B", value: 200 },
]

function renderChart({ className }: { className?: string } = {}) {
  return render(
    <ChartContainer config={testConfig} className={className}>
      <BarChart data={testData}>
        <Bar dataKey="value" />
      </BarChart>
    </ChartContainer>,
  )
}

describe("ChartContainer", () => {
  it("renders without crashing", () => {
    const { container } = renderChart()
    expect(container.querySelector("[data-slot='chart']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = renderChart()
    expect(container.querySelector("[data-slot='chart']")).toBeInTheDocument()
  })

  it("has data-chart attribute", () => {
    const { container } = renderChart()
    const chart = container.querySelector("[data-slot='chart']")
    expect(chart).toHaveAttribute("data-chart")
  })

  it("merges custom className", () => {
    const { container } = renderChart({ className: "custom-chart" })
    expect(container.querySelector("[data-slot='chart']")).toHaveClass("custom-chart")
  })

  it("injects style element for color config", () => {
    const { container } = renderChart()
    const style = container.querySelector("style")
    expect(style).toBeInTheDocument()
  })

  it("does not inject style when no color config", () => {
    const emptyConfig: ChartConfig = {
      value: { label: "Value" },
    }
    const { container } = render(
      <ChartContainer config={emptyConfig}>
        <BarChart data={testData}>
          <Bar dataKey="value" />
        </BarChart>
      </ChartContainer>,
    )
    const chart = container.querySelector("[data-slot='chart']")
    expect(chart?.querySelector("style")).not.toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = renderChart()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
