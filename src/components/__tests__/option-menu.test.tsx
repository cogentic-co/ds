import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { OptionMenu } from "../option-menu"

const items = [
  { value: "deploy", label: "deploy", description: "Ship", prefix: "/" },
  { value: "rollback", label: "rollback", description: "Undo", prefix: "/" },
]

describe("OptionMenu", () => {
  it("renders nothing when closed", () => {
    const { container } = render(<OptionMenu open={false} items={items} onSelect={() => {}} />)
    expect(container.firstChild).toBeNull()
  })

  it("renders nothing when items list is empty", () => {
    const { container } = render(<OptionMenu open items={[]} onSelect={() => {}} />)
    expect(container.firstChild).toBeNull()
  })

  it("renders a listbox with options when open", () => {
    render(<OptionMenu open heading="Commands" items={items} onSelect={() => {}} />)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(screen.getByRole("option", { name: /deploy/ })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: /rollback/ })).toBeInTheDocument()
  })

  it("marks the selectedValue option as aria-selected", () => {
    render(<OptionMenu open items={items} selectedValue="rollback" onSelect={() => {}} />)
    expect(screen.getByRole("option", { name: /rollback/ })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(screen.getByRole("option", { name: /deploy/ })).toHaveAttribute("aria-selected", "false")
  })

  it("hover updates the selection via onSelectionChange", async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()
    render(
      <OptionMenu
        open
        items={items}
        selectedValue="deploy"
        onSelectionChange={onSelectionChange}
        onSelect={() => {}}
      />,
    )
    await user.hover(screen.getByRole("option", { name: /rollback/ }))
    expect(onSelectionChange).toHaveBeenCalledWith("rollback")
  })

  it("clicking commits the item via onSelect", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<OptionMenu open items={items} onSelect={onSelect} />)
    await user.click(screen.getByRole("option", { name: /deploy/ }))
    expect(onSelect).toHaveBeenCalledWith(items[0])
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <OptionMenu open heading="Commands" items={items} onSelect={() => {}} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
