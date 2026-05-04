import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Source, Sources, SourcesContent, SourcesTrigger } from "../sources"

describe("Sources", () => {
  it("renders trigger with default text", () => {
    render(
      <Sources>
        <SourcesTrigger />
        <SourcesContent>
          <Source href="https://example.com" title="Example" />
        </SourcesContent>
      </Sources>,
    )
    expect(screen.getByRole("button", { name: "Show sources" })).toBeInTheDocument()
  })

  it("content is hidden by default", () => {
    render(
      <Sources>
        <SourcesTrigger />
        <SourcesContent>
          <Source href="https://example.com" title="Example" />
        </SourcesContent>
      </Sources>,
    )
    expect(screen.queryByText("Example")).not.toBeInTheDocument()
  })

  it("expands content when trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Sources>
        <SourcesTrigger />
        <SourcesContent>
          <Source href="https://example.com" title="Example Source" />
        </SourcesContent>
      </Sources>,
    )
    await user.click(screen.getByRole("button"))
    expect(screen.getByText("Example Source")).toBeVisible()
  })

  it("has aria-expanded on trigger", () => {
    render(
      <Sources>
        <SourcesTrigger />
        <SourcesContent>Content</SourcesContent>
      </Sources>,
    )
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false")
  })

  it("renders Source as external link", async () => {
    const _user = userEvent.setup()
    render(
      <Sources defaultOpen>
        <SourcesTrigger />
        <SourcesContent>
          <Source href="https://example.com" title="Example" description="A test source" />
        </SourcesContent>
      </Sources>,
    )
    const link = screen.getByRole("link", { name: /Example/ })
    expect(link).toHaveAttribute("href", "https://example.com")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Sources>
        <SourcesTrigger />
        <SourcesContent>
          <Source href="https://example.com" title="Example" />
        </SourcesContent>
      </Sources>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
