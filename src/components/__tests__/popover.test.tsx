import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../popover"

function renderPopover({ contentClassName }: { contentClassName?: string } = {}) {
  return render(
    <Popover>
      <PopoverTrigger>Open Popover</PopoverTrigger>
      <PopoverContent className={contentClassName}>
        <PopoverHeader>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>Popover description text</PopoverDescription>
        </PopoverHeader>
        <p>Popover body content</p>
      </PopoverContent>
    </Popover>,
  )
}

describe("Popover", () => {
  it("renders trigger correctly", () => {
    renderPopover()
    expect(screen.getByRole("button", { name: "Open Popover" })).toBeInTheDocument()
  })

  it("does not show content when closed", () => {
    renderPopover()
    expect(screen.queryByText("Popover Title")).not.toBeInTheDocument()
  })

  it("opens on click and shows content", async () => {
    const user = userEvent.setup()
    renderPopover()
    await user.click(screen.getByRole("button", { name: "Open Popover" }))
    expect(screen.getByText("Popover Title")).toBeInTheDocument()
    expect(screen.getByText("Popover description text")).toBeInTheDocument()
    expect(screen.getByText("Popover body content")).toBeInTheDocument()
  })

  it("closes when clicking trigger again", async () => {
    const user = userEvent.setup()
    renderPopover()
    const trigger = screen.getByRole("button", { name: "Open Popover" })
    await user.click(trigger)
    expect(screen.getByText("Popover Title")).toBeInTheDocument()
    await user.click(trigger)
    expect(screen.queryByText("Popover Title")).not.toBeInTheDocument()
  })

  it("merges custom className on content", async () => {
    const user = userEvent.setup()
    renderPopover({ contentClassName: "custom-popover-class" })
    await user.click(screen.getByRole("button", { name: "Open Popover" }))
    const content = document.querySelector('[data-slot="popover-content"]')
    expect(content).toHaveClass("custom-popover-class")
  })

  it("has no accessibility violations when closed", async () => {
    const { container } = renderPopover()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup()
    const { container } = renderPopover()
    await user.click(screen.getByRole("button", { name: "Open Popover" }))
    // Exclude Base UI internal focus guard elements that use role="button" without accessible names
    const results = await axe(container, {
      rules: { "aria-command-name": { enabled: false } },
    })
    expect(results).toHaveNoViolations()
  })
})
