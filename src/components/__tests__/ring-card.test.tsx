import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { RingCard } from "../ring-card"

describe("RingCard", () => {
  it("renders children", () => {
    render(<RingCard>Hello</RingCard>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })

  it("applies data-slot on root and inner", () => {
    const { container } = render(<RingCard>x</RingCard>)
    expect(container.querySelector('[data-slot="ring-card"]')).toBeTruthy()
    expect(container.querySelector('[data-slot="ring-card-inner"]')).toBeTruthy()
  })

  it("merges className overrides", () => {
    const { container } = render(<RingCard className="custom-class">x</RingCard>)
    const root = container.querySelector('[data-slot="ring-card"]')
    expect(root?.className).toContain("custom-class")
  })

  it("solid prop adds the ringcard-solid class", () => {
    const { container } = render(<RingCard solid>x</RingCard>)
    const root = container.querySelector('[data-slot="ring-card"]') as HTMLElement
    expect(root.className).toContain("ringcard-solid")
  })

  it("has no a11y violations", async () => {
    const { container } = render(
      <RingCard>
        <h2>Card title</h2>
        <p>Card body</p>
      </RingCard>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
