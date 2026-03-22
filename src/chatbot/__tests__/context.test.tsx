import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Context, ContextBody, ContextHeader, ContextUsage } from "../context"

describe("Context", () => {
  it("renders header with default text", () => {
    render(
      <Context>
        <ContextHeader />
      </Context>,
    )
    expect(screen.getByText("Context")).toBeInTheDocument()
  })

  it("renders custom header text", () => {
    render(
      <Context>
        <ContextHeader>Token Usage</ContextHeader>
      </Context>,
    )
    expect(screen.getByText("Token Usage")).toBeInTheDocument()
  })

  it("renders usage with progressbar role", () => {
    render(
      <Context>
        <ContextBody>
          <ContextUsage label="Tokens" used={500} total={1000} />
        </ContextBody>
      </Context>,
    )
    const progressbar = screen.getByRole("progressbar")
    expect(progressbar).toHaveAttribute("aria-valuenow", "500")
    expect(progressbar).toHaveAttribute("aria-valuemin", "0")
    expect(progressbar).toHaveAttribute("aria-valuemax", "1000")
    expect(progressbar).toHaveAttribute("aria-label", "Tokens")
  })

  it("displays formatted usage numbers", () => {
    render(
      <Context>
        <ContextBody>
          <ContextUsage label="Tokens" used={4000} total={8000} />
        </ContextBody>
      </Context>,
    )
    expect(screen.getByText("Tokens")).toBeInTheDocument()
    expect(screen.getByText("4,000 / 8,000")).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Context>
        <ContextHeader />
        <ContextBody>
          <ContextUsage label="Usage" used={50} total={100} />
        </ContextBody>
      </Context>,
    )
    expect(container.querySelector("[data-slot='context']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='context-header']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='context-usage']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Context>
        <ContextHeader />
        <ContextBody>
          <ContextUsage label="Tokens" used={500} total={1000} />
        </ContextBody>
      </Context>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
