import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { Switch } from "../switch"

describe("Switch", () => {
  it("renders correctly", () => {
    render(<Switch aria-label="Toggle notifications" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    render(<Switch aria-label="Toggle notifications" className="custom-class" />)
    expect(screen.getByRole("switch")).toHaveClass("custom-class")
  })

  it("toggles on click", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Toggle notifications" onCheckedChange={onCheckedChange} />)
    const switchEl = screen.getByRole("switch")
    expect(switchEl).not.toBeChecked()

    await user.click(switchEl)
    expect(onCheckedChange).toHaveBeenCalledOnce()
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it("handles disabled state", () => {
    render(<Switch aria-label="Toggle notifications" disabled />)
    const switchEl = screen.getByRole("switch")
    expect(switchEl).toHaveAttribute("aria-disabled", "true")
  })

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Toggle notifications" disabled onCheckedChange={onCheckedChange} />)
    await user.click(screen.getByRole("switch"))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it("renders with data-slot attribute", () => {
    render(<Switch aria-label="Toggle notifications" />)
    expect(screen.getByRole("switch")).toHaveAttribute("data-slot", "switch")
  })

  it("supports size variants", () => {
    const { rerender } = render(<Switch aria-label="Toggle" size="default" />)
    expect(screen.getByRole("switch")).toHaveAttribute("data-size", "default")

    rerender(<Switch aria-label="Toggle" size="sm" />)
    expect(screen.getByRole("switch")).toHaveAttribute("data-size", "sm")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Switch aria-label="Toggle notifications" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
