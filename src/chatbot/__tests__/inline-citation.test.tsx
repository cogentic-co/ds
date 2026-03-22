import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { InlineCitation } from "../inline-citation"

describe("InlineCitation", () => {
  it("renders citation link with index", () => {
    render(
      <InlineCitation index={1} href="https://example.com" title="Example">
        Some text
      </InlineCitation>,
    )
    expect(screen.getByRole("link", { name: "Citation 1: Example" })).toBeInTheDocument()
    expect(screen.getByText("1")).toBeInTheDocument()
  })

  it("links to correct href", () => {
    render(
      <InlineCitation index={1} href="https://example.com" title="Example">
        Text
      </InlineCitation>,
    )
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "https://example.com")
    expect(link).toHaveAttribute("target", "_blank")
  })

  it("shows tooltip card on hover", async () => {
    const user = userEvent.setup()
    render(
      <InlineCitation
        index={1}
        href="https://example.com"
        title="Example Title"
        description="Description"
      >
        Text
      </InlineCitation>,
    )
    const citation = screen.getByText("Text").closest("[data-slot='inline-citation']")!
    await user.hover(citation)
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
    expect(screen.getByText("Example Title")).toBeInTheDocument()
  })

  it("shows tooltip card on focus", async () => {
    const user = userEvent.setup()
    render(
      <InlineCitation index={2} href="https://example.com" title="Focused Title">
        Text
      </InlineCitation>,
    )
    await user.tab()
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
  })

  it("uses data-slot attribute", () => {
    const { container } = render(
      <InlineCitation index={1} href="https://example.com" title="Example">
        Text
      </InlineCitation>,
    )
    expect(container.querySelector("[data-slot='inline-citation']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <InlineCitation index={1} href="https://example.com" title="Example">
        Text
      </InlineCitation>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
