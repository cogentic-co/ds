import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { DeadlineCountdown } from "../deadline-countdown"

const futureDate = (days: number) => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d
}

const pastDate = (days: number) => {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d
}

describe("DeadlineCountdown", () => {
  it("renders without crashing", () => {
    render(<DeadlineCountdown deadline={futureDate(10)} />)
    expect(screen.getByText(/\d+d/)).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<DeadlineCountdown deadline={futureDate(10)} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("shows normal state for far deadlines", () => {
    const { container } = render(<DeadlineCountdown deadline={futureDate(30)} />)
    expect(container.querySelector("[data-slot='deadline-countdown']")).toHaveClass(
      "text-muted-foreground",
    )
  })

  it("shows warning state within warning threshold", () => {
    const { container } = render(<DeadlineCountdown deadline={futureDate(5)} />)
    expect(container.querySelector("[data-slot='deadline-countdown']")).toHaveClass(
      "text-amber-600",
    )
  })

  it("shows critical state within critical threshold", () => {
    const { container } = render(<DeadlineCountdown deadline={futureDate(1)} />)
    expect(container.querySelector("[data-slot='deadline-countdown']")).toHaveClass("text-red-600")
  })

  it("shows overdue state for past deadlines", () => {
    render(<DeadlineCountdown deadline={pastDate(3)} />)
    expect(screen.getByText(/overdue/)).toBeInTheDocument()
  })

  it("respects urgency override", () => {
    const { container } = render(<DeadlineCountdown deadline={futureDate(30)} urgency="critical" />)
    expect(container.querySelector("[data-slot='deadline-countdown']")).toHaveClass("text-red-600")
  })

  it("renders label prefix", () => {
    render(<DeadlineCountdown deadline={futureDate(10)} label="Due in" />)
    expect(screen.getByText("Due in")).toBeInTheDocument()
  })

  it("hides dot when showDot is false", () => {
    const { container } = render(<DeadlineCountdown deadline={futureDate(10)} showDot={false} />)
    expect(container.querySelector(".rounded-full")).not.toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<DeadlineCountdown deadline={futureDate(10)} className="ml-2" />)
    expect(container.querySelector("[data-slot='deadline-countdown']")).toHaveClass("ml-2")
  })

  it("has data-slot attribute", () => {
    const { container } = render(<DeadlineCountdown deadline={futureDate(10)} />)
    expect(container.querySelector("[data-slot='deadline-countdown']")).toBeInTheDocument()
  })
})
