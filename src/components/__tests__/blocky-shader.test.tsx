import { render } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { BlockyShader } from "../blocky-shader"

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
  vi.stubGlobal(
    "MutationObserver",
    vi.fn(() => ({ observe: vi.fn(), disconnect: vi.fn() })),
  )
})

describe("BlockyShader", () => {
  it("renders a canvas element", () => {
    const { container } = render(<BlockyShader />)
    expect(container.querySelector("canvas")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<BlockyShader />)
    expect(container.querySelector("[data-slot='blocky-shader']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<BlockyShader className="custom" />)
    expect(container.querySelector("canvas")).toHaveClass("custom")
  })
})
