import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { AgentProgress } from "../agent-progress"

const baseSteps = [
  {
    id: "1",
    title: "Parse transaction",
    status: "done" as const,
    description: "Hash, asset, direction",
  },
  {
    id: "2",
    title: "Resolve counterparties",
    status: "done" as const,
    description: "From / to labels",
  },
  { id: "3", title: "Chainalysis risk score", status: "active" as const, description: "Running…" },
  { id: "4", title: "Typology match", status: "skipped" as const, description: "AUSTRAC patterns" },
]

describe("AgentProgress", () => {
  it("renders title, reference, and state badge", () => {
    const { container } = render(
      <AgentProgress title="Investigation created" reference="INV-104" steps={baseSteps} />,
    )
    expect(screen.getByText("Investigation created")).toBeInTheDocument()
    expect(screen.getByText("INV-104")).toBeInTheDocument()
    expect(container.querySelector('[data-state="running"]')).toBeInTheDocument()
    expect(screen.getAllByText("Running").length).toBeGreaterThan(0)
  })

  it("renders all steps", () => {
    render(<AgentProgress title="Run" steps={baseSteps} />)
    expect(screen.getByText("Parse transaction")).toBeInTheDocument()
    expect(screen.getByText("Resolve counterparties")).toBeInTheDocument()
    expect(screen.getByText("Chainalysis risk score")).toBeInTheDocument()
    expect(screen.getByText("Typology match")).toBeInTheDocument()
  })

  it("shows step descriptions only in detailed density", () => {
    const { rerender } = render(<AgentProgress title="Run" density="compact" steps={baseSteps} />)
    expect(screen.queryByText("Hash, asset, direction")).not.toBeInTheDocument()

    rerender(<AgentProgress title="Run" density="detailed" steps={baseSteps} />)
    expect(screen.getByText("Hash, asset, direction")).toBeInTheDocument()
  })

  it("uses the matching state badge variant", () => {
    const { rerender, container } = render(
      <AgentProgress title="Run" state="completed" steps={baseSteps} />,
    )
    expect(container.querySelector('[data-state="completed"]')).toBeInTheDocument()
    expect(screen.getByText("Completed")).toBeInTheDocument()

    rerender(<AgentProgress title="Run" state="failed" steps={baseSteps} />)
    expect(screen.getByText("Failed")).toBeInTheDocument()
  })

  it("renders progress section when provided", () => {
    render(
      <AgentProgress
        title="Run"
        steps={baseSteps}
        progress={{ value: 48, max: 100, summary: "ETA 2 min" }}
      />,
    )
    expect(screen.getByText("Progress")).toBeInTheDocument()
    expect(screen.getByText("48 / 100")).toBeInTheDocument()
    expect(screen.getByText("48%")).toBeInTheDocument()
    expect(screen.getByText("ETA 2 min")).toBeInTheDocument()
  })

  it("invokes Cancel and Open handlers", async () => {
    const onCancel = vi.fn()
    const onOpen = vi.fn()
    render(<AgentProgress title="Run" steps={baseSteps} onCancel={onCancel} onOpen={onOpen} />)

    screen.getByRole("button", { name: "Cancel" }).click()
    screen.getByRole("button", { name: "Open" }).click()
    expect(onCancel).toHaveBeenCalledOnce()
    expect(onOpen).toHaveBeenCalledOnce()
  })

  it("has no a11y violations", async () => {
    const { container } = render(
      <AgentProgress
        title="Investigation created"
        reference="INV-104"
        description="Wallet risk investigation"
        steps={baseSteps}
        progress={{ value: 48 }}
        meta="Started 4 min ago · ETA 2 min"
        onCancel={() => {}}
        onOpen={() => {}}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
