import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Sparkline } from "../sparkline"

describe("Sparkline", () => {
  it("renders svg with a data-slot when enough points", () => {
    const { container } = render(<Sparkline points={[1, 3, 2, 4, 5]} />)
    expect(container.querySelector('[data-slot="sparkline"]')).toBeTruthy()
  })

  it("renders nothing with fewer than 2 points", () => {
    const { container } = render(<Sparkline points={[7]} />)
    expect(container.querySelector('[data-slot="sparkline"]')).toBeNull()
  })

  it("omits the fill path when fill=false", () => {
    const { container } = render(<Sparkline points={[1, 2, 3]} fill={false} />)
    const paths = container.querySelectorAll("path")
    expect(paths.length).toBe(1)
  })

  it("has no a11y violations", async () => {
    const { container } = render(<Sparkline points={[1, 4, 2, 6, 3, 8]} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
