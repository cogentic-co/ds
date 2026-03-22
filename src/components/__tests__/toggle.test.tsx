import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { Toggle } from "../toggle"
import { ToggleGroup, ToggleGroupItem } from "../toggle-group"

describe("Toggle", () => {
  it("renders correctly", () => {
    render(<Toggle aria-label="Toggle bold">B</Toggle>)
    expect(screen.getByRole("button", { name: "Toggle bold" })).toBeInTheDocument()
  })

  it("merges custom className", () => {
    render(
      <Toggle aria-label="Toggle bold" className="custom-class">
        B
      </Toggle>,
    )
    expect(screen.getByRole("button")).toHaveClass("custom-class")
  })

  it("toggles pressed state on click", async () => {
    const user = userEvent.setup()
    const onPressedChange = vi.fn()
    render(
      <Toggle aria-label="Toggle bold" onPressedChange={onPressedChange}>
        B
      </Toggle>,
    )
    const toggle = screen.getByRole("button")
    expect(toggle).toHaveAttribute("aria-pressed", "false")

    await user.click(toggle)
    expect(onPressedChange).toHaveBeenCalledOnce()
    expect(onPressedChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it("handles disabled state", () => {
    render(
      <Toggle aria-label="Toggle bold" disabled>
        B
      </Toggle>,
    )
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup()
    const onPressedChange = vi.fn()
    render(
      <Toggle aria-label="Toggle bold" disabled onPressedChange={onPressedChange}>
        B
      </Toggle>,
    )
    await user.click(screen.getByRole("button"))
    expect(onPressedChange).not.toHaveBeenCalled()
  })

  it("renders with data-slot attribute", () => {
    render(<Toggle aria-label="Toggle bold">B</Toggle>)
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "toggle")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Toggle aria-label="Toggle bold">B</Toggle>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe("ToggleGroup", () => {
  it("renders with items", () => {
    render(
      <ToggleGroup>
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Italic" })).toBeInTheDocument()
  })

  it("merges custom className on group", () => {
    render(
      <ToggleGroup className="custom-group">
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole("group")).toHaveClass("custom-group")
  })

  it("supports single selection mode (default)", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <ToggleGroup onValueChange={onValueChange}>
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
      </ToggleGroup>,
    )

    await user.click(screen.getByRole("button", { name: "Bold" }))
    expect(onValueChange).toHaveBeenCalledWith(["bold"], expect.anything())

    await user.click(screen.getByRole("button", { name: "Italic" }))
    expect(onValueChange).toHaveBeenLastCalledWith(["italic"], expect.anything())
  })

  it("supports multiple selection mode", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <ToggleGroup multiple onValueChange={onValueChange}>
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
      </ToggleGroup>,
    )

    await user.click(screen.getByRole("button", { name: "Bold" }))
    expect(onValueChange).toHaveBeenCalledWith(["bold"], expect.anything())

    await user.click(screen.getByRole("button", { name: "Italic" }))
    expect(onValueChange).toHaveBeenLastCalledWith(["bold", "italic"], expect.anything())
  })

  it("renders items with data-slot attributes", () => {
    render(
      <ToggleGroup>
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole("group")).toHaveAttribute("data-slot", "toggle-group")
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute(
      "data-slot",
      "toggle-group-item",
    )
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ToggleGroup aria-label="Text formatting">
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
      </ToggleGroup>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
