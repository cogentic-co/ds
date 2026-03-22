import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { FadeIn } from "../fade-in"

beforeEach(() => {
  globalThis.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.IntersectionObserver
})

describe("FadeIn", () => {
  it("renders without crashing", () => {
    render(<FadeIn>Hello</FadeIn>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<FadeIn>Content</FadeIn>)
    expect(container.querySelector("[data-slot='fade-in']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<FadeIn className="custom-fade">Text</FadeIn>)
    expect(container.querySelector("[data-slot='fade-in']")).toHaveClass("custom-fade")
  })

  it("renders as div by default", () => {
    const { container } = render(<FadeIn>Default</FadeIn>)
    expect(container.querySelector("[data-slot='fade-in']")?.tagName).toBe("DIV")
  })

  it("renders as custom element via as prop", () => {
    const { container } = render(<FadeIn as="section">Section</FadeIn>)
    expect(container.querySelector("[data-slot='fade-in']")?.tagName).toBe("SECTION")
  })

  it("renders as li element", () => {
    const { container } = render(
      <ul>
        <FadeIn as="li">List item</FadeIn>
      </ul>,
    )
    expect(container.querySelector("[data-slot='fade-in']")?.tagName).toBe("LI")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<FadeIn>Accessible content</FadeIn>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
