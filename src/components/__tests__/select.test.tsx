import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select"

function renderSelect({
  placeholder = "Pick one",
  defaultValue,
  disabled,
  label = "Fruit",
}: {
  placeholder?: string
  defaultValue?: string
  disabled?: boolean
  label?: string
} = {}) {
  return render(
    <Select defaultValue={defaultValue}>
      <SelectTrigger disabled={disabled} aria-label={label}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>,
  )
}

describe("Select", () => {
  it("renders the trigger with placeholder", () => {
    renderSelect({ placeholder: "Select a fruit" })
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByText("Select a fruit")).toBeInTheDocument()
  })

  it("merges custom className on trigger", () => {
    render(
      <Select>
        <SelectTrigger className="custom-class" aria-label="Pick">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    )
    expect(screen.getByRole("combobox")).toHaveClass("custom-class")
  })

  it("opens popup and displays items on click", async () => {
    const user = userEvent.setup()
    renderSelect()

    await user.click(screen.getByRole("combobox"))

    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Cherry" })).toBeInTheDocument()
  })

  it("selects an item when clicked", async () => {
    const user = userEvent.setup()
    renderSelect()

    await user.click(screen.getByRole("combobox"))
    const option = await screen.findByRole("option", { name: "Banana" })
    await user.click(option)

    // Wait for the popup to close and the trigger to update
    await screen.findByText("Banana")
  })

  it("renders with a default value", () => {
    renderSelect({ defaultValue: "cherry" })
    // Base UI renders the value string in the trigger when popup is closed
    expect(screen.getByText("cherry")).toBeInTheDocument()
  })

  it("supports disabled state on trigger", () => {
    renderSelect({ disabled: true })
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("has no accessibility violations", async () => {
    const { container } = renderSelect({ label: "Fruit selector" })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
