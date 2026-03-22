import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Toaster } from "../sonner"

describe("Toaster", () => {
  it("renders without crashing", () => {
    const { container } = render(<Toaster />)
    expect(container).toBeInTheDocument()
  })

  it("exports the Toaster component", () => {
    expect(Toaster).toBeDefined()
    expect(typeof Toaster).toBe("function")
  })

  it("accepts a theme prop without error", () => {
    expect(() => render(<Toaster theme="dark" />)).not.toThrow()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Toaster />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
