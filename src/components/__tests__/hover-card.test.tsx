import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card"

function renderHoverCard({ contentClassName }: { contentClassName?: string } = {}) {
  return render(
    <HoverCard>
      <HoverCardTrigger>Hover me</HoverCardTrigger>
      <HoverCardContent className={contentClassName}>Card content here</HoverCardContent>
    </HoverCard>,
  )
}

describe("HoverCard", () => {
  it("renders trigger without crashing", () => {
    renderHoverCard()
    expect(screen.getByText("Hover me")).toBeInTheDocument()
  })

  it("has data-slot attribute on trigger", () => {
    const { container } = renderHoverCard()
    expect(container.querySelector("[data-slot='hover-card-trigger']")).toBeInTheDocument()
  })

  it("does not show content initially", () => {
    renderHoverCard()
    expect(screen.queryByText("Card content here")).not.toBeInTheDocument()
  })

  it("shows content on hover", async () => {
    const user = userEvent.setup()
    renderHoverCard()
    await user.hover(screen.getByText("Hover me"))
    expect(await screen.findByText("Card content here")).toBeInTheDocument()
  })

  it("merges custom className on content", async () => {
    const user = userEvent.setup()
    renderHoverCard({ contentClassName: "custom-hover-content" })
    await user.hover(screen.getByText("Hover me"))
    await screen.findByText("Card content here")
    const content = document.querySelector("[data-slot='hover-card-content']")
    expect(content).toHaveClass("custom-hover-content")
  })

  it("has no accessibility violations when closed", async () => {
    const { container } = renderHoverCard()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup()
    const { container } = renderHoverCard()
    await user.hover(screen.getByText("Hover me"))
    await screen.findByText("Card content here")
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
