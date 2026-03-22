import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Separator } from "../separator"

describe("Separator", () => {
  it("renders a separator element", () => {
    const { container } = render(<Separator />)
    expect(container.querySelector("[data-slot='separator']")).toBeInTheDocument()
  })

  it("defaults to horizontal orientation", () => {
    const { container } = render(<Separator />)
    const el = container.querySelector("[data-slot='separator']")
    expect(el).toHaveAttribute("aria-orientation", "horizontal")
  })

  it("supports vertical orientation", () => {
    const { container } = render(<Separator orientation="vertical" />)
    const el = container.querySelector("[data-slot='separator']")
    expect(el).toHaveAttribute("aria-orientation", "vertical")
  })

  it("merges custom className", () => {
    const { container } = render(<Separator className="custom-sep" />)
    const el = container.querySelector("[data-slot='separator']")
    expect(el).toHaveClass("custom-sep")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Separator />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
