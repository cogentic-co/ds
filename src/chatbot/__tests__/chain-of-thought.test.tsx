import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from "../chain-of-thought"

describe("ChainOfThought", () => {
  it("renders header with default text", () => {
    render(
      <ChainOfThought>
        <ChainOfThoughtHeader />
        <ChainOfThoughtContent>Steps</ChainOfThoughtContent>
      </ChainOfThought>,
    )
    expect(screen.getByRole("button", { name: "Chain of thought" })).toBeInTheDocument()
  })

  it("content is hidden by default", () => {
    render(
      <ChainOfThought>
        <ChainOfThoughtHeader />
        <ChainOfThoughtContent>Hidden</ChainOfThoughtContent>
      </ChainOfThought>,
    )
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument()
  })

  it("expands content when header is clicked", async () => {
    const user = userEvent.setup()
    render(
      <ChainOfThought>
        <ChainOfThoughtHeader />
        <ChainOfThoughtContent>Visible</ChainOfThoughtContent>
      </ChainOfThought>,
    )
    await user.click(screen.getByRole("button"))
    expect(screen.getByText("Visible")).toBeVisible()
  })

  it("has aria-expanded and aria-controls", () => {
    render(
      <ChainOfThought>
        <ChainOfThoughtHeader />
        <ChainOfThoughtContent>Content</ChainOfThoughtContent>
      </ChainOfThought>,
    )
    const trigger = screen.getByRole("button")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).toHaveAttribute("aria-controls")
  })

  it("renders steps with status", () => {
    render(
      <ChainOfThought defaultOpen>
        <ChainOfThoughtHeader />
        <ChainOfThoughtContent>
          <ChainOfThoughtStep step={1} status="complete">
            Search docs
          </ChainOfThoughtStep>
          <ChainOfThoughtStep step={2} status="active">
            Analyze
          </ChainOfThoughtStep>
        </ChainOfThoughtContent>
      </ChainOfThought>,
    )
    expect(screen.getByText("Search docs")).toBeInTheDocument()
    expect(screen.getByText("Analyze")).toBeInTheDocument()
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
  })

  it("renders search results as links", () => {
    render(
      <ChainOfThought defaultOpen>
        <ChainOfThoughtHeader />
        <ChainOfThoughtContent>
          <ChainOfThoughtSearchResults>
            <ChainOfThoughtSearchResult title="Result" url="https://example.com" />
          </ChainOfThoughtSearchResults>
        </ChainOfThoughtContent>
      </ChainOfThought>,
    )
    const link = screen.getByRole("link", { name: /Result/ })
    expect(link).toHaveAttribute("href", "https://example.com")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ChainOfThought>
        <ChainOfThoughtHeader />
        <ChainOfThoughtContent>
          <ChainOfThoughtStep step={1}>Step 1</ChainOfThoughtStep>
        </ChainOfThoughtContent>
      </ChainOfThought>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
