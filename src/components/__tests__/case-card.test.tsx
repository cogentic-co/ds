import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { CaseCard } from "../case-card"

const baseProps = {
  id: "case-001",
  title: "Suspicious Transaction Pattern",
  entities: ["ACME Corp", "John Doe"],
  sla: "on_track",
  priority: "p2",
  updatedAt: new Date().toISOString(),
}

describe("CaseCard", () => {
  it("renders case ID and title", () => {
    render(<CaseCard {...baseProps} />)
    expect(screen.getByText("CASE-001")).toBeInTheDocument()
    expect(screen.getByText("Suspicious Transaction Pattern")).toBeInTheDocument()
  })

  it("renders entities", () => {
    render(<CaseCard {...baseProps} />)
    expect(screen.getByText("ACME Corp, John Doe")).toBeInTheDocument()
  })

  it("renders SLA badge", () => {
    render(<CaseCard {...baseProps} sla="overdue" />)
    expect(screen.getByText("overdue")).toBeInTheDocument()
  })

  it("renders overdue pulse indicator", () => {
    const { container } = render(<CaseCard {...baseProps} sla="overdue" />)
    expect(container.querySelector(".animate-ping")).toBeInTheDocument()
  })

  it("does not render pulse for non-overdue SLA", () => {
    const { container } = render(<CaseCard {...baseProps} sla="on_track" />)
    expect(container.querySelector(".animate-ping")).not.toBeInTheDocument()
  })

  it("renders priority badge", () => {
    render(<CaseCard {...baseProps} priority="p1" />)
    expect(screen.getByText("P1")).toBeInTheDocument()
  })

  it("renders assignee avatar when provided", () => {
    render(<CaseCard {...baseProps} assignee={{ name: "Sarah Chen" }} />)
    expect(screen.getByText("SC")).toBeInTheDocument()
  })

  it("does not render assignee when omitted", () => {
    const { container } = render(<CaseCard {...baseProps} />)
    expect(container.querySelector(".rounded-full.bg-primary\\/10")).not.toBeInTheDocument()
  })

  it("renders linked alerts count", () => {
    render(
      <CaseCard
        {...baseProps}
        linkedAlerts={[
          { id: "alert-1", severity: "high", trigger: "Threshold Breach", type: "velocity" },
          { id: "alert-2", severity: "medium", trigger: "Pattern Match", type: "behavioral" },
        ]}
      />,
    )
    expect(screen.getByText("2")).toBeInTheDocument()
  })

  it("renders linked transactions count", () => {
    render(
      <CaseCard
        {...baseProps}
        linkedTransactions={[{ id: "tx-1", amount: "5,000", asset: "USDT", direction: "outbound" }]}
      />,
    )
    expect(screen.getByText("1")).toBeInTheDocument()
  })

  it("renders with no linked items", () => {
    const { container } = render(<CaseCard {...baseProps} />)
    expect(container.querySelector("[data-slot='card']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<CaseCard {...baseProps} className="custom-class" />)
    expect(container.querySelector("[data-slot='card']")).toHaveClass("custom-class")
  })

  it("renders SLA with underscore replaced by space", () => {
    render(<CaseCard {...baseProps} sla="at_risk" />)
    expect(screen.getByText("at risk")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CaseCard
        {...baseProps}
        assignee={{ name: "Sarah Chen", role: "Lead Analyst" }}
        linkedAlerts={[
          { id: "alert-1", severity: "critical", trigger: "High Risk Transfer", type: "threshold" },
        ]}
        linkedTransactions={[{ id: "tx-1", amount: "10,000", asset: "BTC", direction: "inbound" }]}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
