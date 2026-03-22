import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Spinner } from "../spinner"

describe("Spinner", () => {
  it("renders with status role", () => {
    render(<Spinner />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("has Loading aria-label", () => {
    render(<Spinner />)
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading")
  })

  it("has animate-spin class", () => {
    render(<Spinner />)
    expect(screen.getByRole("status")).toHaveClass("animate-spin")
  })

  it("merges custom className", () => {
    render(<Spinner className="size-8" />)
    expect(screen.getByRole("status")).toHaveClass("size-8")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
