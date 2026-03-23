import { render } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { WaffleChart } from "../waffle-chart"

beforeEach(() => {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.ResizeObserver
})

describe("WaffleChart", () => {
  const segments = [
    { value: 40, color: "#6366f1", label: "Used" },
    { value: 20, color: "#22c55e", label: "Free" },
  ]

  it("renders without crashing", () => {
    const { container } = render(<WaffleChart segments={segments} />)
    expect(container.querySelector("[data-slot='waffle-chart']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<WaffleChart segments={segments} />)
    expect(container.querySelector("[data-slot='waffle-chart']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<WaffleChart segments={segments} className="custom-waffle" />)
    expect(container.querySelector("[data-slot='waffle-chart']")).toHaveClass("custom-waffle")
  })

  it("renders a canvas element", () => {
    const { container } = render(<WaffleChart segments={segments} />)
    expect(container.querySelector("canvas")).toBeInTheDocument()
  })

  it("renders with empty segments", () => {
    const { container } = render(<WaffleChart segments={[]} />)
    expect(container.querySelector("[data-slot='waffle-chart']")).toBeInTheDocument()
  })

  it("accepts custom rows and cols", () => {
    const { container } = render(<WaffleChart segments={segments} rows={5} cols={20} />)
    expect(container.querySelector("[data-slot='waffle-chart']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<WaffleChart segments={segments} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  // Bar mode tests
  it("renders in bar mode", () => {
    const { container } = render(<WaffleChart segments={segments} mode="bar" />)
    expect(container.querySelector("[data-slot='waffle-chart']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='waffle-chart']")).toHaveClass("h-10")
  })

  it("accepts stripes prop in bar mode", () => {
    const { container } = render(<WaffleChart segments={segments} mode="bar" stripes={80} />)
    expect(container.querySelector("[data-slot='waffle-chart']")).toBeInTheDocument()
  })

  it("defaults to grid mode with aspect-square", () => {
    const { container } = render(<WaffleChart segments={segments} />)
    expect(container.querySelector("[data-slot='waffle-chart']")).toHaveClass("aspect-square")
  })

  it("supports animate prop", () => {
    const { container } = render(<WaffleChart segments={segments} animate={false} />)
    expect(container.querySelector("[data-slot='waffle-chart']")).toBeInTheDocument()
  })
})
