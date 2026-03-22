import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { Textarea } from "../textarea"

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    render(<Textarea placeholder="Test" />)
    expect(screen.getByPlaceholderText("Test")).toHaveAttribute("data-slot", "textarea")
  })

  it("merges custom className", () => {
    render(<Textarea className="custom-textarea" placeholder="Styled" />)
    expect(screen.getByPlaceholderText("Styled")).toHaveClass("custom-textarea")
  })

  it("handles user input", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Textarea onChange={onChange} placeholder="Type" />)
    await user.type(screen.getByPlaceholderText("Type"), "hello")
    expect(onChange).toHaveBeenCalled()
  })

  it("supports disabled state", () => {
    render(<Textarea disabled placeholder="Disabled" />)
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled()
  })

  it("renders as textarea element", () => {
    render(<Textarea placeholder="Check" />)
    expect(screen.getByPlaceholderText("Check").tagName).toBe("TEXTAREA")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Textarea aria-label="Message" placeholder="Type a message" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
