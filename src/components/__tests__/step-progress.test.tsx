import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  StepProgress,
  StepProgressConnector,
  StepProgressContent,
  StepProgressDescription,
  StepProgressIndicator,
  StepProgressItem,
  StepProgressTitle,
} from "../step-progress"

function renderSteps() {
  return render(
    <StepProgress>
      <StepProgressItem status="complete">
        <StepProgressIndicator status="complete" step={1} />
        <StepProgressConnector data-complete="true" />
        <StepProgressContent>
          <StepProgressTitle>Identity Verification</StepProgressTitle>
          <StepProgressDescription>Documents verified successfully</StepProgressDescription>
        </StepProgressContent>
      </StepProgressItem>
      <StepProgressItem status="current">
        <StepProgressIndicator status="current" step={2} />
        <StepProgressConnector />
        <StepProgressContent>
          <StepProgressTitle>Sanctions Screening</StepProgressTitle>
          <StepProgressDescription>Checking against global sanctions lists</StepProgressDescription>
        </StepProgressContent>
      </StepProgressItem>
      <StepProgressItem status="upcoming">
        <StepProgressIndicator status="upcoming" step={3} />
        <StepProgressContent>
          <StepProgressTitle>Final Review</StepProgressTitle>
          <StepProgressDescription>Compliance officer sign-off</StepProgressDescription>
        </StepProgressContent>
      </StepProgressItem>
    </StepProgress>,
  )
}

describe("StepProgress", () => {
  it("renders without crashing", () => {
    renderSteps()
    expect(screen.getByText("Identity Verification")).toBeInTheDocument()
    expect(screen.getByText("Sanctions Screening")).toBeInTheDocument()
    expect(screen.getByText("Final Review")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = renderSteps()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has data-slot attributes", () => {
    const { container } = renderSteps()
    expect(container.querySelector("[data-slot='step-progress']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='step-progress-item']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='step-progress-indicator']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='step-progress-content']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='step-progress-title']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='step-progress-description']")).toBeInTheDocument()
  })

  it("sets data-status on items", () => {
    const { container } = renderSteps()
    const items = container.querySelectorAll("[data-slot='step-progress-item']")
    expect(items[0]).toHaveAttribute("data-status", "complete")
    expect(items[1]).toHaveAttribute("data-status", "current")
    expect(items[2]).toHaveAttribute("data-status", "upcoming")
  })

  it("shows check icon for complete steps", () => {
    const { container } = renderSteps()
    const completeIndicator = container.querySelector(
      "[data-status='complete'] [data-slot='step-progress-indicator']",
    )
    expect(completeIndicator?.querySelector("svg")).toBeInTheDocument()
  })

  it("shows step number for non-complete steps", () => {
    renderSteps()
    expect(screen.getByText("2")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<StepProgress className="my-8" />)
    expect(container.querySelector("[data-slot='step-progress']")).toHaveClass("my-8")
  })
})
