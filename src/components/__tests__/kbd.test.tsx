import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Kbd, KbdGroup } from "../kbd"

describe("Kbd", () => {
  it("renders with text content", () => {
    render(<Kbd>⌘</Kbd>)
    expect(screen.getByText("⌘")).toBeInTheDocument()
  })

  it("renders as a kbd element", () => {
    render(<Kbd>K</Kbd>)
    expect(screen.getByText("K").tagName).toBe("KBD")
  })

  it("has data-slot attribute", () => {
    render(<Kbd>Enter</Kbd>)
    expect(screen.getByText("Enter")).toHaveAttribute("data-slot", "kbd")
  })

  it("merges custom className", () => {
    render(<Kbd className="custom-kbd">Tab</Kbd>)
    expect(screen.getByText("Tab")).toHaveClass("custom-kbd")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Kbd>Esc</Kbd>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe("KbdGroup", () => {
  it("renders children", () => {
    render(
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    )
    expect(screen.getByText("⌘")).toBeInTheDocument()
    expect(screen.getByText("K")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(
      <KbdGroup>
        <Kbd>A</Kbd>
      </KbdGroup>,
    )
    expect(container.querySelector("[data-slot='kbd-group']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(
      <KbdGroup className="custom-group">
        <Kbd>B</Kbd>
      </KbdGroup>,
    )
    expect(container.querySelector("[data-slot='kbd-group']")).toHaveClass("custom-group")
  })
})
