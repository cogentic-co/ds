import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import {
  Plan,
  PlanAction,
  PlanContent,
  PlanFooter,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
} from "../plan"

describe("Plan", () => {
  it("renders trigger with default text", () => {
    render(
      <Plan defaultOpen={false}>
        <PlanTrigger />
        <PlanContent>Steps</PlanContent>
      </Plan>,
    )
    expect(screen.getByRole("button", { name: /Execution Plan/i })).toBeInTheDocument()
  })

  it("is open by default", () => {
    render(
      <Plan>
        <PlanTrigger />
        <PlanContent>Plan content</PlanContent>
      </Plan>,
    )
    expect(screen.getByText("Plan content")).toBeVisible()
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true")
  })

  it("collapses on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <Plan>
        <PlanTrigger />
        <PlanContent>Content</PlanContent>
      </Plan>,
    )
    await user.click(screen.getByRole("button"))
    expect(screen.queryByText("Content")).not.toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false")
  })

  it("has aria-expanded and aria-controls", () => {
    render(
      <Plan defaultOpen={false}>
        <PlanTrigger />
        <PlanContent>Content</PlanContent>
      </Plan>,
    )
    const trigger = screen.getByRole("button")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).toHaveAttribute("aria-controls")
  })

  it("renders header and title", () => {
    render(
      <Plan>
        <PlanHeader>
          <PlanTitle>My Plan</PlanTitle>
        </PlanHeader>
      </Plan>,
    )
    expect(screen.getByText("My Plan")).toBeInTheDocument()
  })

  it("renders footer with actions", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Plan>
        <PlanContent>Steps</PlanContent>
        <PlanFooter>
          <PlanAction onClick={onClick}>Execute</PlanAction>
        </PlanFooter>
      </Plan>,
    )
    await user.click(screen.getByRole("button", { name: "Execute" }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Plan>
        <PlanTrigger />
        <PlanContent>Content</PlanContent>
      </Plan>,
    )
    expect(container.querySelector("[data-slot='plan']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='plan-trigger']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='plan-content']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Plan>
        <PlanTrigger />
        <PlanContent>Content</PlanContent>
      </Plan>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
