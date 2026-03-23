import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { StatusIndicator } from "../status-indicator"

describe("StatusIndicator", () => {
  it("renders without crashing", () => {
    render(<StatusIndicator />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<StatusIndicator variant="online" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("applies variant classes", () => {
    const { rerender } = render(<StatusIndicator variant="online" />)
    expect(screen.getByRole("status")).toHaveClass("bg-emerald-500")

    rerender(<StatusIndicator variant="offline" />)
    expect(screen.getByRole("status")).toHaveClass("bg-muted-foreground/40")

    rerender(<StatusIndicator variant="busy" />)
    expect(screen.getByRole("status")).toHaveClass("bg-destructive")

    rerender(<StatusIndicator variant="away" />)
    expect(screen.getByRole("status")).toHaveClass("bg-amber-500")

    rerender(<StatusIndicator variant="pending" />)
    expect(screen.getByRole("status")).toHaveClass("bg-blue-500")
  })

  it("applies size variants", () => {
    const { rerender } = render(<StatusIndicator size="sm" />)
    expect(screen.getByRole("status")).toHaveClass("size-2")

    rerender(<StatusIndicator size="lg" />)
    expect(screen.getByRole("status")).toHaveClass("size-3.5")
  })

  it("applies pulse animation", () => {
    render(<StatusIndicator variant="online" pulse />)
    expect(screen.getByRole("status")).toHaveClass("animate-pulse")
  })

  it("uses default aria-label based on variant", () => {
    render(<StatusIndicator variant="busy" />)
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Busy")
  })

  it("allows custom label override", () => {
    render(<StatusIndicator variant="online" label="Agent active" />)
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Agent active")
  })

  it("merges custom className", () => {
    render(<StatusIndicator className="ml-2" />)
    expect(screen.getByRole("status")).toHaveClass("ml-2")
  })

  it("has data-slot attribute", () => {
    render(<StatusIndicator />)
    expect(screen.getByRole("status")).toHaveAttribute("data-slot", "status-indicator")
  })
})
