import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { AspectRatio } from "../aspect-ratio"

describe("AspectRatio", () => {
  it("renders with data-slot attribute", () => {
    const { container } = render(<AspectRatio ratio={16 / 9}>Content</AspectRatio>)
    expect(container.querySelector("[data-slot='aspect-ratio']")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(<AspectRatio ratio={4 / 3}>Child content</AspectRatio>)
    expect(screen.getByText("Child content")).toBeInTheDocument()
  })

  it("sets --ratio CSS custom property", () => {
    const { container } = render(<AspectRatio ratio={16 / 9}>Content</AspectRatio>)
    const el = container.querySelector("[data-slot='aspect-ratio']") as HTMLElement
    expect(el.style.getPropertyValue("--ratio")).toBe(String(16 / 9))
  })

  it("merges custom className", () => {
    const { container } = render(
      <AspectRatio ratio={1} className="custom-ratio">
        Content
      </AspectRatio>,
    )
    expect(container.querySelector("[data-slot='aspect-ratio']")).toHaveClass("custom-ratio")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <img src="/test.jpg" alt="Test image" />
      </AspectRatio>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
