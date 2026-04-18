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

  it("respects padding variants", () => {
    const { container: sm } = render(<RingCard padding="sm">x</RingCard>)
    expect(sm.querySelector('[data-slot="ring-card-inner"]')?.className).toContain("p-4")

    const { container: lg } = render(<RingCard padding="lg">x</RingCard>)
    expect(lg.querySelector('[data-slot="ring-card-inner"]')?.className).toContain("p-8")
  })

  it("solid prop disables the bottom fade mask", () => {
    const { container } = render(<RingCard solid>x</RingCard>)
    const root = container.querySelector('[data-slot="ring-card"]') as HTMLElement
    expect(root.className).not.toContain("mask-image:linear-gradient")
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
