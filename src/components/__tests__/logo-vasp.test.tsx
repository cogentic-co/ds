import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { LogoVasp } from "../logo-vasp"

describe("LogoVasp", () => {
  it("renders an SVG", () => {
    const { container } = render(<LogoVasp />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<LogoVasp />)
    expect(container.querySelector("[data-slot='logo-vasp']")).toBeInTheDocument()
  })

  it("has aria-label", () => {
    const { container } = render(<LogoVasp />)
    expect(container.querySelector("svg")).toHaveAttribute("aria-label", "VASP Track logo")
  })

  it("merges custom className", () => {
    const { container } = render(<LogoVasp className="custom-logo" />)
    expect(container.querySelector("svg")).toHaveClass("custom-logo")
  })

  it("renders all size variants", () => {
    for (const size of ["sm", "default", "lg"] as const) {
      const { container } = render(<LogoVasp size={size} />)
      expect(container.querySelector("svg")).toBeInTheDocument()
    }
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<LogoVasp />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
