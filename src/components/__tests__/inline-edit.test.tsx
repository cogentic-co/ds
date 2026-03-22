import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { InlineEdit } from "../inline-edit"

describe("InlineEdit", () => {
  it("renders without crashing", () => {
    const { container } = render(<InlineEdit value="Hello" onChange={vi.fn()} />)
    expect(container.querySelector("[data-slot='inline-edit']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<InlineEdit value="Test" onChange={vi.fn()} />)
    expect(container.querySelector("[data-slot='inline-edit']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(
      <InlineEdit value="Test" onChange={vi.fn()} className="custom-edit" />,
    )
    expect(container.querySelector("[data-slot='inline-edit']")).toHaveClass("custom-edit")
  })

  it("displays the value text", () => {
    render(<InlineEdit value="My Value" onChange={vi.fn()} />)
    expect(screen.getByText("My Value")).toBeInTheDocument()
  })

  it("shows placeholder when value is empty", () => {
    render(<InlineEdit value="" onChange={vi.fn()} placeholder="Click to edit" />)
    expect(screen.getByText("Click to edit")).toBeInTheDocument()
  })

  it("enters edit mode on click", async () => {
    const user = userEvent.setup()
    render(<InlineEdit value="Editable" onChange={vi.fn()} />)
    await user.click(screen.getByRole("button"))
    expect(screen.getByDisplayValue("Editable")).toBeInTheDocument()
  })

  it("confirms edit on Enter key", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<InlineEdit value="Old" onChange={onChange} />)
    await user.click(screen.getByRole("button"))
    const input = screen.getByDisplayValue("Old")
    await user.clear(input)
    await user.type(input, "New{Enter}")
    expect(onChange).toHaveBeenCalledWith("New")
  })

  it("cancels edit on Escape key", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<InlineEdit value="Original" onChange={onChange} />)
    await user.click(screen.getByRole("button"))
    const input = screen.getByDisplayValue("Original")
    await user.clear(input)
    await user.type(input, "Changed{Escape}")
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getByText("Original")).toBeInTheDocument()
  })

  it("confirms on check button click", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<InlineEdit value="Test" onChange={onChange} />)
    await user.click(screen.getByRole("button"))
    await user.click(screen.getByLabelText("Confirm"))
    expect(onChange).toHaveBeenCalledWith("Test")
  })

  it("cancels on cancel button click", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<InlineEdit value="Test" onChange={onChange} />)
    await user.click(screen.getByRole("button"))
    await user.click(screen.getByLabelText("Cancel"))
    expect(onChange).not.toHaveBeenCalled()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<InlineEdit value="Accessible" onChange={vi.fn()} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
