import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Skeleton } from "../skeleton"

describe("Skeleton", () => {
  it("renders a div element", () => {
    const { container } = render(<Skeleton />)
    expect(container.querySelector("[data-slot='skeleton']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<Skeleton />)
    expect(container.querySelector("[data-slot='skeleton']")).toHaveAttribute(
      "data-slot",
      "skeleton",
    )
  })

  it("has animate-pulse class", () => {
    const { container } = render(<Skeleton />)
    expect(container.querySelector("[data-slot='skeleton']")).toHaveClass("animate-pulse")
  })

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="h-4 w-full" />)
    const el = container.querySelector("[data-slot='skeleton']")
    expect(el).toHaveClass("h-4")
    expect(el).toHaveClass("w-full")
  })

  it("passes additional props", () => {
    const { container } = render(<Skeleton data-testid="skel" />)
    expect(container.querySelector("[data-testid='skel']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Skeleton />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
