import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Marquee } from "../marquee"

describe("Marquee", () => {
  it("renders without crashing", () => {
    render(
      <Marquee>
        <span>Item 1</span>
      </Marquee>,
    )
    expect(screen.getAllByText("Item 1").length).toBeGreaterThanOrEqual(1)
  })

  it("has data-slot attribute", () => {
    const { container } = render(
      <Marquee>
        <span>Content</span>
      </Marquee>,
    )
    expect(container.querySelector("[data-slot='marquee']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(
      <Marquee className="custom-marquee">
        <span>Content</span>
      </Marquee>,
    )
    expect(container.querySelector("[data-slot='marquee']")).toHaveClass("custom-marquee")
  })

  it("duplicates children for seamless scroll", () => {
    render(
      <Marquee>
        <span>Repeated</span>
      </Marquee>,
    )
    expect(screen.getAllByText("Repeated")).toHaveLength(2)
  })

  it("applies left animation class by default", () => {
    const { container } = render(
      <Marquee>
        <span>Content</span>
      </Marquee>,
    )
    const inner = container.querySelector("[data-slot='marquee'] > .flex.w-max")
    expect(inner).toHaveClass("animate-marquee-left")
  })

  it("applies right animation class when direction is right", () => {
    const { container } = render(
      <Marquee direction="right">
        <span>Content</span>
      </Marquee>,
    )
    const inner = container.querySelector("[data-slot='marquee'] > .flex.w-max")
    expect(inner).toHaveClass("animate-marquee-right")
  })

  it("sets custom animation duration", () => {
    const { container } = render(
      <Marquee duration={20}>
        <span>Content</span>
      </Marquee>,
    )
    const inner = container.querySelector("[data-slot='marquee'] > .flex.w-max")
    expect(inner).toHaveStyle({ animationDuration: "20s" })
  })

  it("renders fade edges by default", () => {
    const { container } = render(
      <Marquee>
        <span>Content</span>
      </Marquee>,
    )
    const gradients = container.querySelectorAll("[data-slot='marquee'] > .pointer-events-none")
    expect(gradients).toHaveLength(2)
  })

  it("does not render fade edges when fadeEdges is false", () => {
    const { container } = render(
      <Marquee fadeEdges={false}>
        <span>Content</span>
      </Marquee>,
    )
    const gradients = container.querySelectorAll("[data-slot='marquee'] > .pointer-events-none")
    expect(gradients).toHaveLength(0)
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Marquee>
        <span>Accessible content</span>
      </Marquee>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
