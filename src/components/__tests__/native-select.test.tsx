import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "../native-select"

describe("NativeSelect", () => {
  it("renders a select element with options", () => {
    render(
      <NativeSelect aria-label="Choose fruit">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>,
    )
    expect(screen.getByRole("combobox", { name: "Choose fruit" })).toBeInTheDocument()
    expect(screen.getByText("Apple")).toBeInTheDocument()
    expect(screen.getByText("Banana")).toBeInTheDocument()
  })

  it("merges custom className on wrapper", () => {
    const { container } = render(
      <NativeSelect className="custom-select" aria-label="Select">
        <NativeSelectOption value="a">A</NativeSelectOption>
      </NativeSelect>,
    )
    expect(container.querySelector("[data-slot='native-select-wrapper']")).toHaveClass(
      "custom-select",
    )
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <NativeSelect aria-label="Select">
        <NativeSelectOption value="a">A</NativeSelectOption>
      </NativeSelect>,
    )
    expect(container.querySelector("[data-slot='native-select-wrapper']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='native-select']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='native-select-icon']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='native-select-option']")).toBeInTheDocument()
  })

  it("supports size prop", () => {
    const { container } = render(
      <NativeSelect size="sm" aria-label="Select">
        <NativeSelectOption value="a">A</NativeSelectOption>
      </NativeSelect>,
    )
    expect(container.querySelector("[data-slot='native-select-wrapper']")).toHaveAttribute(
      "data-size",
      "sm",
    )
    expect(container.querySelector("[data-slot='native-select']")).toHaveAttribute(
      "data-size",
      "sm",
    )
  })

  it("handles user selection", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <NativeSelect aria-label="Fruit" onChange={onChange}>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>,
    )
    await user.selectOptions(screen.getByRole("combobox", { name: "Fruit" }), "banana")
    expect(onChange).toHaveBeenCalled()
  })

  it("renders optgroup", () => {
    const { container } = render(
      <NativeSelect aria-label="Food">
        <NativeSelectOptGroup label="Fruits">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>,
    )
    expect(container.querySelector("[data-slot='native-select-optgroup']")).toBeInTheDocument()
    expect(screen.getByRole("group", { name: "Fruits" })).toBeInTheDocument()
  })

  it("supports disabled state", () => {
    render(
      <NativeSelect disabled aria-label="Select">
        <NativeSelectOption value="a">A</NativeSelectOption>
      </NativeSelect>,
    )
    expect(screen.getByRole("combobox", { name: "Select" })).toBeDisabled()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <NativeSelect aria-label="Choose option">
        <NativeSelectOption value="a">Option A</NativeSelectOption>
        <NativeSelectOption value="b">Option B</NativeSelectOption>
      </NativeSelect>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
