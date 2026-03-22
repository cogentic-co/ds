import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorSeparator,
  ModelSelectorTrigger,
} from "../model-selector"

function renderModelSelector(props: { value?: string; onValueChange?: (id: string) => void } = {}) {
  return render(
    <ModelSelector {...props}>
      <ModelSelectorTrigger />
      <ModelSelectorContent>
        <ModelSelectorInput />
        <ModelSelectorList>
          <ModelSelectorGroup label="Latest">
            <ModelSelectorItem value="claude-4" name="Claude 4" description="Most capable" />
            <ModelSelectorItem value="claude-3.5" name="Claude 3.5" />
          </ModelSelectorGroup>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>,
  )
}

describe("ModelSelector", () => {
  it("renders trigger with default text", () => {
    renderModelSelector()
    expect(screen.getByRole("button", { name: /Select model/i })).toBeInTheDocument()
  })

  it("trigger has aria-haspopup and aria-expanded", () => {
    renderModelSelector()
    const trigger = screen.getByRole("button")
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("opens dropdown on trigger click", async () => {
    const user = userEvent.setup()
    renderModelSelector()
    await user.click(screen.getByRole("button"))
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true")
  })

  it("renders items with role=option", async () => {
    const user = userEvent.setup()
    renderModelSelector()
    await user.click(screen.getByRole("button"))
    const options = screen.getAllByRole("option")
    expect(options).toHaveLength(2)
  })

  it("selects item on click", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderModelSelector({ onValueChange: onChange })
    await user.click(screen.getByRole("button"))
    await user.click(screen.getByRole("option", { name: /Claude 4/i }))
    expect(onChange).toHaveBeenCalledWith("claude-4")
  })

  it("closes on Escape key", async () => {
    const user = userEvent.setup()
    renderModelSelector()
    await user.click(screen.getByRole("button"))
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("filters items by search", async () => {
    const user = userEvent.setup()
    renderModelSelector()
    await user.click(screen.getByRole("button"))
    const input = screen.getByRole("textbox", { name: "Search models" })
    await user.type(input, "3.5")
    expect(screen.queryByText("Claude 4")).not.toBeInTheDocument()
    expect(screen.getByText("Claude 3.5")).toBeInTheDocument()
  })

  it("shows selected item with aria-selected", async () => {
    const user = userEvent.setup()
    renderModelSelector({ value: "claude-4" })
    await user.click(screen.getByRole("button"))
    const selected = screen.getByRole("option", { name: /Claude 4/i })
    expect(selected).toHaveAttribute("aria-selected", "true")
  })

  it("search input has aria-label", async () => {
    const user = userEvent.setup()
    renderModelSelector()
    await user.click(screen.getByRole("button"))
    expect(screen.getByRole("textbox", { name: "Search models" })).toBeInTheDocument()
  })

  it("separator has role=separator", async () => {
    const user = userEvent.setup()
    const { container } = render(
      <ModelSelector>
        <ModelSelectorTrigger />
        <ModelSelectorContent>
          <ModelSelectorList>
            <ModelSelectorItem value="a" name="A" />
            <ModelSelectorSeparator />
            <ModelSelectorItem value="b" name="B" />
          </ModelSelectorList>
        </ModelSelectorContent>
      </ModelSelector>,
    )
    await user.click(screen.getByRole("button"))
    expect(container.querySelector("[role='separator']")).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = renderModelSelector()
    expect(container.querySelector("[data-slot='model-selector']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='model-selector-trigger']")).toBeInTheDocument()
  })

  it("has no accessibility violations when closed", async () => {
    const { container } = renderModelSelector()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup()
    const { container } = renderModelSelector()
    await user.click(screen.getByRole("button"))
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
