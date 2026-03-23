import { render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { ComplianceScore } from "../compliance-score"

beforeAll(() => {
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any
})

describe("ComplianceScore", () => {
  it("renders without crashing", () => {
    const { container } = render(<ComplianceScore score={75} />)
    expect(container.querySelector("[data-slot='compliance-score']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<ComplianceScore score={50} />)
    expect(container.querySelector("[data-slot='compliance-score']")).toBeInTheDocument()
  })

  it("shows score value when showValue is true (default)", () => {
    const { container } = render(<ComplianceScore score={0} />)
    // Score starts at 0 due to animation; the span should exist
    const scoreEl = container.querySelector("[data-slot='compliance-score'] span[aria-label]")
    expect(scoreEl).toBeInTheDocument()
  })

  it("hides score value when showValue is false", () => {
    const { container } = render(<ComplianceScore score={75} showValue={false} />)
    const scoreEl = container.querySelector("[data-slot='compliance-score'] span[aria-label]")
    expect(scoreEl).not.toBeInTheDocument()
  })

  it("renders label when provided", () => {
    render(<ComplianceScore score={50} label="Compliance" />)
    expect(screen.getByText("Compliance")).toBeInTheDocument()
  })

  it("applies sm size variant", () => {
    const { container } = render(<ComplianceScore score={50} size="sm" />)
    expect(container.querySelector("[data-slot='compliance-score']")).toHaveClass("size-20")
  })

  it("applies default size variant", () => {
    const { container } = render(<ComplianceScore score={50} />)
    expect(container.querySelector("[data-slot='compliance-score']")).toHaveClass("size-28")
  })

  it("applies lg size variant", () => {
    const { container } = render(<ComplianceScore score={50} size="lg" />)
    expect(container.querySelector("[data-slot='compliance-score']")).toHaveClass("size-36")
  })

  it("merges custom className", () => {
    const { container } = render(<ComplianceScore score={50} className="custom-class" />)
    expect(container.querySelector("[data-slot='compliance-score']")).toHaveClass("custom-class")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<ComplianceScore score={85} label="Score" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
