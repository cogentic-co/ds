import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { NumberInput } from "../number-input"

describe("NumberInput", () => {
  it("renders without crashing", () => {
    const { container } = render(<NumberInput />)
    expect(container.querySelector("[data-slot='number-input']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<NumberInput />)
    expect(container.querySelector("[data-slot='number-input']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<NumberInput className="custom-number" />)
    expect(container.querySelector("[data-slot='number-input']")).toHaveClass("custom-number")
  })

  it("renders decrease and increase buttons", () => {
    render(<NumberInput />)
    expect(screen.getByLabelText("Decrease")).toBeInTheDocument()
    expect(screen.getByLabelText("Increase")).toBeInTheDocument()
  })

  it("renders a number input", () => {
    render(<NumberInput />)
    expect(screen.getByRole("spinbutton")).toBeInTheDocument()
  })

  it("calls onChange when increase is clicked", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput value={5} onChange={onChange} />)
    await user.click(screen.getByLabelText("Increase"))
    expect(onChange).toHaveBeenCalledWith(6)
  })

  it("calls onChange when decrease is clicked", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput value={5} onChange={onChange} />)
    await user.click(screen.getByLabelText("Decrease"))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it("disables decrease button at min", () => {
    render(<NumberInput value={0} min={0} />)
    expect(screen.getByLabelText("Decrease")).toBeDisabled()
  })

  it("disables increase button at max", () => {
    render(<NumberInput value={10} max={10} />)
    expect(screen.getByLabelText("Increase")).toBeDisabled()
  })

  it("supports disabled state", () => {
    render(<NumberInput disabled />)
    expect(screen.getByRole("spinbutton")).toBeDisabled()
    expect(screen.getByLabelText("Decrease")).toBeDisabled()
    expect(screen.getByLabelText("Increase")).toBeDisabled()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<NumberInput aria-label="Quantity" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
