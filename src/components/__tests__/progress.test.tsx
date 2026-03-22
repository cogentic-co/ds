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

  it("has no accessibility violations", async () => {
    const { container } = render(<Progress value={50} aria-label="Loading progress" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
