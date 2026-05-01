import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { Suggestion, Suggestions } from "../suggestion"

describe("Suggestions", () => {
  it("renders suggestions container", () => {
    const { container } = render(
      <Suggestions>
        <Suggestion>Ask a question</Suggestion>
      </Suggestions>,
    )
    expect(container.querySelector("[data-slot='suggestions']")).toBeInTheDocument()
  })

  it("renders suggestion buttons", () => {
    render(
      <Suggestions>
        <Suggestion>Option A</Suggestion>
        <Suggestion>Option B</Suggestion>
      </Suggestions>,
    )
    expect(screen.getAllByRole("button")).toHaveLength(2)
    expect(screen.getByText("Option A")).toBeInTheDocument()
  })

  it("handles click events", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Suggestion onClick={onClick}>Click me</Suggestion>)
    await user.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("merges custom className", () => {
    render(<Suggestion className="custom-pill">Styled</Suggestion>)
    expect(screen.getByRole("button")).toHaveClass("custom-pill")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Suggestions>
        <Suggestion>Suggestion 1</Suggestion>
        <Suggestion>Suggestion 2</Suggestion>
      </Suggestions>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("renders a leading icon when icon prop is set", () => {
    const { container } = render(
      <Suggestion icon={<svg data-testid="icon" />}>Run command</Suggestion>,
    )
    expect(container.querySelector("[data-slot='suggestion-icon']")).toBeInTheDocument()
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })
})
