import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Progress, ProgressLabel, ProgressValue } from "../progress"

describe("Progress", () => {
  it("renders a progressbar element", () => {
    const { container } = render(<Progress value={50} />)
    expect(container.querySelector("[data-slot='progress']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<Progress value={30} />)
    expect(container.querySelector("[data-slot='progress']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='progress-track']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='progress-indicator']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<Progress value={60} className="custom-progress" />)
    expect(container.querySelector("[data-slot='progress']")).toHaveClass("custom-progress")
  })

  it("renders with label and value children", () => {
    const { container } = render(
      <Progress value={75}>
        <ProgressLabel>Loading</ProgressLabel>
        <ProgressValue />
      </Progress>,
    )
    expect(container.querySelector("[data-slot='progress-label']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='progress-value']")).toBeInTheDocument()
  })

  it("applies size variant to track height", () => {
    const { container } = render(<Progress value={50} size="xl" />)
    expect(container.querySelector("[data-slot='progress-track']")).toHaveClass("h-5")
  })

  it("default size remains sm (h-1.5)", () => {
    const { container } = render(<Progress value={50} />)
    expect(container.querySelector("[data-slot='progress-track']")).toHaveClass("h-1.5")
  })

  it("hatched=true sets data-hatched and inline background", () => {
    const { container } = render(<Progress value={50} hatched />)
    const track = container.querySelector("[data-slot='progress-track']") as HTMLElement
    expect(track.getAttribute("data-hatched")).toBe("true")
    expect(track.style.backgroundImage).toContain("repeating-linear-gradient")
  })

  it("hatched=false omits the diagonal pattern", () => {
    const { container } = render(<Progress value={50} />)
    const track = container.querySelector("[data-slot='progress-track']") as HTMLElement
    expect(track.getAttribute("data-hatched")).toBeNull()
    expect(track.style.backgroundImage).toBe("")
  })

  it("variant changes indicator color class", () => {
    const { container, rerender } = render(<Progress value={50} variant="warning" />)
    const indicator = container.querySelector("[data-slot='progress-indicator']") as HTMLElement
    expect(indicator.getAttribute("data-variant")).toBe("warning")

    rerender(<Progress value={50} variant="destructive" />)
    expect(
      container.querySelector("[data-slot='progress-indicator']")?.getAttribute("data-variant"),
    ).toBe("destructive")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Progress value={50} aria-label="Loading progress" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
