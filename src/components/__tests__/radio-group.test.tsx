import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { RadioGroup, RadioGroupItem } from "../radio-group"

function renderRadioGroup({ className }: { className?: string } = {}) {
  return render(
    <RadioGroup className={className} aria-label="Favorite fruit">
      <RadioGroupItem value="apple" aria-label="Apple" />
      <RadioGroupItem value="banana" aria-label="Banana" />
      <RadioGroupItem value="cherry" aria-label="Cherry" />
    </RadioGroup>,
  )
}

describe("RadioGroup", () => {
  it("renders all radio options", () => {
    renderRadioGroup()
    const radios = screen.getAllByRole("radio")
    expect(radios).toHaveLength(3)
  })

  it("merges custom className on root", () => {
    const { container } = renderRadioGroup({ className: "custom-radio-group" })
    const root = container.querySelector("[data-slot='radio-group']")
    expect(root).toHaveClass("custom-radio-group")
  })

  it("selects a radio option when clicked", async () => {
    const user = userEvent.setup()
    renderRadioGroup()

    const appleRadio = screen.getByRole("radio", { name: "Apple" })
    await user.click(appleRadio)

    expect(appleRadio).toHaveAttribute("aria-checked", "true")
  })

  it("switches selection when a different option is clicked", async () => {
    const user = userEvent.setup()
    renderRadioGroup()

    const appleRadio = screen.getByRole("radio", { name: "Apple" })
    const bananaRadio = screen.getByRole("radio", { name: "Banana" })

    await user.click(appleRadio)
    expect(appleRadio).toHaveAttribute("aria-checked", "true")

    await user.click(bananaRadio)
    expect(bananaRadio).toHaveAttribute("aria-checked", "true")
    expect(appleRadio).toHaveAttribute("aria-checked", "false")
  })

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup()
    renderRadioGroup()

    const appleRadio = screen.getByRole("radio", { name: "Apple" })
    await user.click(appleRadio)
    expect(appleRadio).toHaveAttribute("aria-checked", "true")

    // Arrow down should move to the next radio
    await user.keyboard("{ArrowDown}")
    const bananaRadio = screen.getByRole("radio", { name: "Banana" })
    expect(bananaRadio).toHaveAttribute("aria-checked", "true")
  })

  it("renders with a default value", () => {
    render(
      <RadioGroup defaultValue="banana" aria-label="Fruit">
        <RadioGroupItem value="apple" aria-label="Apple" />
        <RadioGroupItem value="banana" aria-label="Banana" />
      </RadioGroup>,
    )
    expect(screen.getByRole("radio", { name: "Banana" })).toHaveAttribute("aria-checked", "true")
    expect(screen.getByRole("radio", { name: "Apple" })).toHaveAttribute("aria-checked", "false")
  })

  it("merges custom className on RadioGroupItem", () => {
    const { container } = render(
      <RadioGroup aria-label="Test">
        <RadioGroupItem value="a" className="item-custom" aria-label="Option A" />
      </RadioGroup>,
    )
    const item = container.querySelector("[data-slot='radio-group-item']")
    expect(item).toHaveClass("item-custom")
  })

  it("has no accessibility violations", async () => {
    const { container } = renderRadioGroup()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations with a selected option", async () => {
    const user = userEvent.setup()
    const { container } = renderRadioGroup()

    await user.click(screen.getByRole("radio", { name: "Apple" }))

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
