import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible"

describe("Collapsible", () => {
  it("renders trigger", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    )
    expect(screen.getByRole("button", { name: "Toggle" })).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    )
    expect(container.querySelector("[data-slot='collapsible']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='collapsible-trigger']")).toBeInTheDocument()
  })

  it("content is not visible by default", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    )
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument()
  })

  it("expands content when trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Visible content</CollapsibleContent>
      </Collapsible>,
    )
    await user.click(screen.getByRole("button", { name: "Toggle" }))
    expect(screen.getByText("Visible content")).toBeVisible()
  })

  it("collapses content when trigger is clicked again", async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    )
    await user.click(screen.getByRole("button", { name: "Toggle" }))
    expect(screen.getByText("Content")).toBeVisible()

    await user.click(screen.getByRole("button", { name: "Toggle" }))
    expect(screen.queryByText("Content")).not.toBeInTheDocument()
  })

  it("supports defaultOpen prop", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Initially open</CollapsibleContent>
      </Collapsible>,
    )
    expect(screen.getByText("Initially open")).toBeVisible()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle section</CollapsibleTrigger>
        <CollapsibleContent>Section content</CollapsibleContent>
      </Collapsible>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
