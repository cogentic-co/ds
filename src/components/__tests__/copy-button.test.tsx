import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { CopyButton } from "../copy-button"

describe("CopyButton", () => {
  it("renders without crashing", () => {
    render(<CopyButton value="test" />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<CopyButton value="test" />)
    expect(container.querySelector("[data-slot='copy-button']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<CopyButton value="test" className="custom-copy" />)
    expect(container.querySelector("[data-slot='copy-button']")).toHaveClass("custom-copy")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<CopyButton value="hello" aria-label="Copy to clipboard" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
