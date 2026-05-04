import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { getStatusLabel, Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "../tool"

describe("Tool", () => {
  it("renders header with name and status", () => {
    render(
      <Tool>
        <ToolHeader name="readFile" status="success" />
        <ToolContent>Output</ToolContent>
      </Tool>,
    )
    expect(screen.getByText("readFile")).toBeInTheDocument()
    expect(screen.getByText("Done")).toBeInTheDocument()
  })

  it("content is hidden by default", () => {
    render(
      <Tool>
        <ToolHeader name="test" />
        <ToolContent>Hidden</ToolContent>
      </Tool>,
    )
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument()
  })

  it("expands content when header is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Tool>
        <ToolHeader name="test" />
        <ToolContent>Visible</ToolContent>
      </Tool>,
    )
    await user.click(screen.getByRole("button"))
    expect(screen.getByText("Visible")).toBeVisible()
  })

  it("has aria-expanded and aria-controls", () => {
    render(
      <Tool>
        <ToolHeader name="test" />
        <ToolContent>Content</ToolContent>
      </Tool>,
    )
    const trigger = screen.getByRole("button")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).toHaveAttribute("aria-controls")
  })

  it("renders input and output sections", async () => {
    const user = userEvent.setup()
    render(
      <Tool>
        <ToolHeader name="search" status="success" />
        <ToolContent>
          <ToolInput>{"{ query: 'test' }"}</ToolInput>
          <ToolOutput>{"{ results: [] }"}</ToolOutput>
        </ToolContent>
      </Tool>,
    )
    await user.click(screen.getByRole("button"))
    expect(screen.getByText("Input")).toBeInTheDocument()
    expect(screen.getByText("Output")).toBeInTheDocument()
  })

  it("getStatusLabel returns correct labels", () => {
    expect(getStatusLabel("pending")).toBe("Pending")
    expect(getStatusLabel("running")).toBe("Running")
    expect(getStatusLabel("success")).toBe("Done")
    expect(getStatusLabel("error")).toBe("Error")
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Tool>
        <ToolHeader name="test" />
        <ToolContent>Content</ToolContent>
      </Tool>,
    )
    expect(container.querySelector("[data-slot='tool']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='tool-header']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Tool>
        <ToolHeader name="readFile" status="success" />
        <ToolContent>
          <ToolInput>input</ToolInput>
          <ToolOutput>output</ToolOutput>
        </ToolContent>
      </Tool>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
