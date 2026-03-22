import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../accordion"

function renderAccordion({ className }: { className?: string } = {}) {
  return render(
    <Accordion className={className}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section One</AccordionTrigger>
        <AccordionContent>Content for section one</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section Two</AccordionTrigger>
        <AccordionContent>Content for section two</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section Three</AccordionTrigger>
        <AccordionContent>Content for section three</AccordionContent>
      </AccordionItem>
    </Accordion>,
  )
}

describe("Accordion", () => {
  it("renders all trigger buttons", () => {
    renderAccordion()
    expect(screen.getByRole("button", { name: "Section One" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Section Two" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Section Three" })).toBeInTheDocument()
  })

  it("merges custom className on root", () => {
    const { container } = renderAccordion({ className: "custom-accordion" })
    const root = container.querySelector("[data-slot='accordion']")
    expect(root).toHaveClass("custom-accordion")
  })

  it("expands an item when its trigger is clicked", async () => {
    const user = userEvent.setup()
    renderAccordion()

    const trigger = screen.getByRole("button", { name: "Section One" })
    expect(trigger).toHaveAttribute("aria-expanded", "false")

    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText("Content for section one")).toBeVisible()
  })

  it("collapses an expanded item when its trigger is clicked again", async () => {
    const user = userEvent.setup()
    renderAccordion()

    const trigger = screen.getByRole("button", { name: "Section One" })
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")

    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("allows multiple items to be expanded independently", async () => {
    const user = userEvent.setup()
    render(
      <Accordion multiple>
        <AccordionItem value="a">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>First content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Second</AccordionTrigger>
          <AccordionContent>Second content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    await user.click(screen.getByRole("button", { name: "First" }))
    await user.click(screen.getByRole("button", { name: "Second" }))

    expect(screen.getByRole("button", { name: "First" })).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("button", { name: "Second" })).toHaveAttribute("aria-expanded", "true")
  })

  it("has no accessibility violations in collapsed state", async () => {
    const { container } = renderAccordion()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations in expanded state", async () => {
    const user = userEvent.setup()
    const { container } = renderAccordion()

    await user.click(screen.getByRole("button", { name: "Section One" }))

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
