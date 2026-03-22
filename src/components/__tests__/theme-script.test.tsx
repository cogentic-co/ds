import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { ThemeScript } from "../theme-script"

describe("ThemeScript", () => {
  it("renders a script element", () => {
    const { container } = render(<ThemeScript />)
    const script = container.querySelector("script")
    expect(script).toBeInTheDocument()
  })

  it("injects inline script content", () => {
    const { container } = render(<ThemeScript />)
    const script = container.querySelector("script")
    expect(script?.innerHTML).toBeTruthy()
    expect(script?.innerHTML.length).toBeGreaterThan(0)
  })

  it("script content references document.documentElement", () => {
    const { container } = render(<ThemeScript />)
    const script = container.querySelector("script")
    expect(script?.innerHTML).toContain("document.documentElement")
  })

  it("script content checks prefers-color-scheme:dark", () => {
    const { container } = render(<ThemeScript />)
    const script = container.querySelector("script")
    expect(script?.innerHTML).toContain("prefers-color-scheme")
  })

  it("script content adds and removes .dark class", () => {
    const { container } = render(<ThemeScript />)
    const script = container.querySelector("script")
    expect(script?.innerHTML).toContain("dark")
    expect(script?.innerHTML).toContain("classList")
  })

  it("script listens for change events on matchMedia", () => {
    const { container } = render(<ThemeScript />)
    const script = container.querySelector("script")
    expect(script?.innerHTML).toContain("addEventListener")
    expect(script?.innerHTML).toContain("change")
  })

  it("renders only one script element", () => {
    const { container } = render(<ThemeScript />)
    const scripts = container.querySelectorAll("script")
    expect(scripts).toHaveLength(1)
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<ThemeScript />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
