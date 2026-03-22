import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { StatCard } from "../stat-card"

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Total Revenue" value="$12,345" />)
    expect(screen.getByText("Total Revenue")).toBeInTheDocument()
    expect(screen.getByText("$12,345")).toBeInTheDocument()
  })

  it("renders numeric value", () => {
    render(<StatCard label="Active Users" value={1024} />)
    expect(screen.getByText("1024")).toBeInTheDocument()
  })

  it("renders description when provided", () => {
    render(<StatCard label="Revenue" value="$1,000" description="vs last month" />)
    expect(screen.getByText("vs last month")).toBeInTheDocument()
  })

  it("does not render description when omitted", () => {
    render(<StatCard label="Revenue" value="$1,000" />)
    expect(screen.queryByText("vs last month")).not.toBeInTheDocument()
  })

  it("renders trend with up direction", () => {
    render(<StatCard label="Revenue" value="$1,000" trend="+12%" trendDirection="up" />)
    expect(screen.getByText("+12%")).toBeInTheDocument()
  })

  it("renders trend with down direction", () => {
    render(<StatCard label="Revenue" value="$1,000" trend="-5%" trendDirection="down" />)
    expect(screen.getByText("-5%")).toBeInTheDocument()
  })

  it("renders icon when provided", () => {
    render(<StatCard label="Revenue" value="$1,000" icon={<svg aria-label="revenue icon" />} />)
    expect(screen.getByLabelText("revenue icon")).toBeInTheDocument()
  })

  it("does not render icon when omitted", () => {
    render(<StatCard label="Revenue" value="$1,000" />)
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  it("uses data-slot attribute", () => {
    const { container } = render(<StatCard label="Revenue" value="$1,000" />)
    expect(container.querySelector("[data-slot='stat-card']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<StatCard label="Revenue" value="$1,000" className="custom" />)
    expect(container.querySelector("[data-slot='stat-card']")).toHaveClass("custom")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <StatCard
        label="Total Revenue"
        value="$12,345"
        description="vs last month"
        trend="+12%"
        trendDirection="up"
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
