import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Step, Stepper, StepSeparator } from "../stepper"

function renderStepper({ className }: { className?: string } = {}) {
  return render(
    <Stepper className={className}>
      <Step status="complete" index={1}>
        Account
      </Step>
      <StepSeparator />
      <Step status="current" index={2}>
        Details
      </Step>
      <StepSeparator />
      <Step status="upcoming" index={3}>
        Confirm
      </Step>
    </Stepper>,
  )
}

describe("Stepper", () => {
  it("renders without crashing", () => {
    const { container } = renderStepper()
    expect(container.querySelector("[data-slot='stepper']")).toBeInTheDocument()
  })

  it("has data-slot attributes", () => {
    const { container } = renderStepper()
    expect(container.querySelector("[data-slot='stepper']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='step']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='step-separator']")).toBeInTheDocument()
  })

  it("renders as a nav element with aria-label", () => {
    renderStepper()
    expect(screen.getByRole("navigation", { name: "Progress" })).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = renderStepper({ className: "custom-stepper" })
    expect(container.querySelector("[data-slot='stepper']")).toHaveClass("custom-stepper")
  })

  it("renders step labels", () => {
    renderStepper()
    expect(screen.getByText("Account")).toBeInTheDocument()
    expect(screen.getByText("Details")).toBeInTheDocument()
    expect(screen.getByText("Confirm")).toBeInTheDocument()
  })

  it("sets data-status on steps", () => {
    const { container } = renderStepper()
    const steps = container.querySelectorAll("[data-slot='step']")
    expect(steps[0]).toHaveAttribute("data-status", "complete")
    expect(steps[1]).toHaveAttribute("data-status", "current")
    expect(steps[2]).toHaveAttribute("data-status", "upcoming")
  })

  it("renders complete step with primary styles", () => {
    const { container } = renderStepper()
    const completeStep = container.querySelector("[data-status='complete']")
    const circle = completeStep?.querySelector("span")
    expect(circle).toHaveClass("bg-primary")
  })

  it("renders current step with primary border", () => {
    const { container } = renderStepper()
    const currentStep = container.querySelector("[data-status='current']")
    const circle = currentStep?.querySelector("span")
    expect(circle).toHaveClass("border-primary")
  })

  it("renders upcoming step with muted styles", () => {
    const { container } = renderStepper()
    const upcomingStep = container.querySelector("[data-status='upcoming']")
    const label = upcomingStep?.querySelectorAll("span")[1]
    expect(label).toHaveClass("text-muted-foreground")
  })

  it("has separator with aria-hidden", () => {
    const { container } = renderStepper()
    const separator = container.querySelector("[data-slot='step-separator']")
    expect(separator).toHaveAttribute("aria-hidden")
  })

  it("has no accessibility violations", async () => {
    const { container } = renderStepper()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
