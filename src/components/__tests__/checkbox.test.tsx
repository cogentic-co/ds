import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { Checkbox } from "../checkbox"

describe("Checkbox", () => {
  it("renders correctly", () => {
    render(<Checkbox aria-label="Accept terms" />)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    render(<Checkbox aria-label="Accept terms" className="custom-class" />)
    expect(screen.getByRole("checkbox")).toHaveClass("custom-class")
  })

  it("toggles checked state on click", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="Accept terms" onCheckedChange={onCheckedChange} />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(onCheckedChange).toHaveBeenCalledOnce()
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it("handles disabled state", () => {
    render(<Checkbox aria-label="Accept terms" disabled />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveAttribute("aria-disabled", "true")
  })

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="Accept terms" disabled onCheckedChange={onCheckedChange} />)
    await user.click(screen.getByRole("checkbox"))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it("renders with data-slot attribute", () => {
    render(<Checkbox aria-label="Accept terms" />)
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-slot", "checkbox")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Checkbox aria-label="Accept terms" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
