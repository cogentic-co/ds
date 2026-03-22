import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { Input } from "../input"

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Type here" />)
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument()
  })

  it("applies type attribute", () => {
    render(<Input type="email" placeholder="Email" />)
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("type", "email")
  })

  it("merges custom className", () => {
    render(<Input className="custom-input" placeholder="Test" />)
    expect(screen.getByPlaceholderText("Test")).toHaveClass("custom-input")
  })

  it("handles user input", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Input onChange={onChange} placeholder="Type" />)
    await user.type(screen.getByPlaceholderText("Type"), "hello")
    expect(onChange).toHaveBeenCalled()
  })

  it("supports disabled state", () => {
    render(<Input disabled placeholder="Disabled" />)
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled()
  })

  it("has data-slot attribute", () => {
    render(<Input placeholder="Test" />)
    expect(screen.getByPlaceholderText("Test")).toHaveAttribute("data-slot", "input")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Input aria-label="Test input" placeholder="Type here" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
