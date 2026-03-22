import { render } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { BgShader } from "../bg-shader"

beforeEach(() => {
  globalThis.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.IntersectionObserver

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
})

describe("BgShader", () => {
  it("renders without crashing", () => {
    const { container } = render(<BgShader />)
    expect(container.querySelector("[data-slot='bg-shader']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<BgShader />)
    expect(container.querySelector("[data-slot='bg-shader']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<BgShader className="custom-shader" />)
    expect(container.querySelector("[data-slot='bg-shader']")).toHaveClass("custom-shader")
  })

  it("renders a canvas element", () => {
    const { container } = render(<BgShader />)
    expect(container.querySelector("canvas")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<BgShader />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
