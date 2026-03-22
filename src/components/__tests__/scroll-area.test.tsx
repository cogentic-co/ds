import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { ScrollArea } from "../scroll-area"

describe("ScrollArea", () => {
  it("renders children", () => {
    render(
      <ScrollArea>
        <p>Scrollable content</p>
      </ScrollArea>,
    )
    expect(screen.getByText("Scrollable content")).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <ScrollArea>
        <p>Content</p>
      </ScrollArea>,
    )
    expect(container.querySelector("[data-slot='scroll-area']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='scroll-area-viewport']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(
      <ScrollArea className="custom-scroll">
        <p>Content</p>
      </ScrollArea>,
    )
    expect(container.querySelector("[data-slot='scroll-area']")).toHaveClass("custom-scroll")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ScrollArea>
        <p>Accessible scrollable content</p>
      </ScrollArea>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
