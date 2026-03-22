import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Reasoning, ReasoningContent, ReasoningTrigger } from "../reasoning"

describe("Reasoning", () => {
  it("renders trigger with default text", () => {
    render(
      <Reasoning>
        <ReasoningTrigger />
        <ReasoningContent>Thinking...</ReasoningContent>
      </Reasoning>,
    )
    expect(screen.getByRole("button", { name: "Show reasoning" })).toBeInTheDocument()
  })

  it("content is hidden by default", () => {
    render(
      <Reasoning>
        <ReasoningTrigger />
        <ReasoningContent>Hidden content</ReasoningContent>
      </Reasoning>,
    )
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument()
  })

  it("expands content when trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Reasoning>
        <ReasoningTrigger />
        <ReasoningContent>Visible content</ReasoningContent>
      </Reasoning>,
    )
    await user.click(screen.getByRole("button"))
    expect(screen.getByText("Visible content")).toBeVisible()
  })

  it("updates trigger text when open", async () => {
    const user = userEvent.setup()
    render(
      <Reasoning>
        <ReasoningTrigger />
        <ReasoningContent>Content</ReasoningContent>
      </Reasoning>,
    )
    await user.click(screen.getByRole("button"))
    expect(screen.getByRole("button", { name: "Hide reasoning" })).toBeInTheDocument()
  })

  it("has aria-expanded on trigger", () => {
    render(
      <Reasoning>
        <ReasoningTrigger />
        <ReasoningContent>Content</ReasoningContent>
      </Reasoning>,
    )
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false")
  })

  it("has aria-controls linking trigger to content", async () => {
    const user = userEvent.setup()
    render(
      <Reasoning>
        <ReasoningTrigger />
        <ReasoningContent>Content</ReasoningContent>
      </Reasoning>,
    )
    await user.click(screen.getByRole("button"))
    const trigger = screen.getByRole("button")
    const contentId = trigger.getAttribute("aria-controls")
    expect(contentId).toBeTruthy()
    expect(document.getElementById(contentId!)).toBeInTheDocument()
  })

  it("supports defaultOpen prop", () => {
    render(
      <Reasoning defaultOpen>
        <ReasoningTrigger />
        <ReasoningContent>Initially open</ReasoningContent>
      </Reasoning>,
    )
    expect(screen.getByText("Initially open")).toBeVisible()
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true")
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Reasoning defaultOpen>
        <ReasoningTrigger />
        <ReasoningContent>Content</ReasoningContent>
      </Reasoning>,
    )
    expect(container.querySelector("[data-slot='reasoning']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='reasoning-trigger']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='reasoning-content']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Reasoning>
        <ReasoningTrigger />
        <ReasoningContent>Content</ReasoningContent>
      </Reasoning>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
