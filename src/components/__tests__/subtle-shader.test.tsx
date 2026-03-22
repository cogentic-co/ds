import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { SubtleShader } from "../subtle-shader"

// Mock matchMedia and requestAnimationFrame
beforeEach(() => {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn(() => 1),
  )
  vi.stubGlobal("cancelAnimationFrame", vi.fn())
})

describe("SubtleShader", () => {
  it("renders a canvas element", () => {
    const { container } = render(<SubtleShader />)
    expect(container.querySelector("canvas")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<SubtleShader />)
    expect(container.querySelector("[data-slot='subtle-shader']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<SubtleShader className="custom-shader" />)
    expect(container.querySelector("canvas")).toHaveClass("custom-shader")
  })

  it("renders with all palette options", () => {
    for (const palette of ["blue", "green", "amber"] as const) {
      const { container } = render(<SubtleShader palette={palette} />)
      expect(container.querySelector("canvas")).toBeInTheDocument()
    }
  })

  it("respects prefers-reduced-motion", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    render(<SubtleShader />)
    expect(requestAnimationFrame).not.toHaveBeenCalled()
  })
})
