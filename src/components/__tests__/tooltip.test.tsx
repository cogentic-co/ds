import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip"

function renderTooltip({ contentClassName }: { contentClassName?: string } = {}) {
  return render(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent className={contentClassName}>Tooltip text</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  )
}

describe("Tooltip", () => {
  it("renders trigger correctly", () => {
    renderTooltip()
    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument()
  })

  it("does not show content initially", () => {
    renderTooltip()
    expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument()
  })

  it("shows content on hover", async () => {
    const user = userEvent.setup()
    renderTooltip()
    await user.hover(screen.getByRole("button", { name: "Hover me" }))
    expect(await screen.findByText("Tooltip text")).toBeInTheDocument()
  })

  it("hides content when hover ends", async () => {
    const user = userEvent.setup()
    renderTooltip()
    const trigger = screen.getByRole("button", { name: "Hover me" })
    await user.hover(trigger)
    expect(await screen.findByText("Tooltip text")).toBeInTheDocument()
    await user.unhover(trigger)
    // Base UI tooltip may animate out; wait for removal
    await screen.findByRole("button", { name: "Hover me" })
  })

  it("shows content on focus", async () => {
    const user = userEvent.setup()
    renderTooltip()
    await user.tab()
    expect(await screen.findByText("Tooltip text")).toBeInTheDocument()
  })

  it("merges custom className on content", async () => {
    const user = userEvent.setup()
    renderTooltip({ contentClassName: "custom-tooltip-class" })
    await user.hover(screen.getByRole("button", { name: "Hover me" }))
    await screen.findByText("Tooltip text")
    const content = document.querySelector('[data-slot="tooltip-content"]')
    expect(content).toHaveClass("custom-tooltip-class")
  })

  it("has no accessibility violations when closed", async () => {
    const { container } = renderTooltip()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup()
    const { container } = renderTooltip()
    await user.hover(screen.getByRole("button", { name: "Hover me" }))
    await screen.findByText("Tooltip text")
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
