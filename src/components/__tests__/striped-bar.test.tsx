import { render } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { StripedBar } from "../striped-bar"

beforeEach(() => {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.ResizeObserver
})

describe("StripedBar", () => {
  const segments = [
    { value: 40, color: "#6366f1", label: "Used" },
    { value: 20, color: "#22c55e", label: "Free" },
  ]

  it("renders without crashing", () => {
    const { container } = render(<StripedBar segments={segments} />)
    expect(container.querySelector("[data-slot='striped-bar']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<StripedBar segments={segments} />)
    expect(container.querySelector("[data-slot='striped-bar']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<StripedBar segments={segments} className="custom-bar" />)
    expect(container.querySelector("[data-slot='striped-bar']")).toHaveClass("custom-bar")
  })

  it("renders a canvas element", () => {
    const { container } = render(<StripedBar segments={segments} />)
    expect(container.querySelector("canvas")).toBeInTheDocument()
  })

  it("renders with empty segments", () => {
    const { container } = render(<StripedBar segments={[]} />)
    expect(container.querySelector("[data-slot='striped-bar']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<StripedBar segments={segments} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
