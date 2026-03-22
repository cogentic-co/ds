import { render } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { AsciiShader } from "../ascii-shader"

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

describe("AsciiShader", () => {
  it("renders a canvas element", () => {
    const { container } = render(<AsciiShader />)
    expect(container.querySelector("canvas")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<AsciiShader />)
    expect(container.querySelector("[data-slot='ascii-shader']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<AsciiShader className="custom" />)
    expect(container.querySelector("canvas")).toHaveClass("custom")
  })
})
