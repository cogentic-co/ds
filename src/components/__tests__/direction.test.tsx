import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { DirectionProvider, useDirection } from "../direction"

function DirectionConsumer() {
  const direction = useDirection()
  return <span data-testid="direction">{direction}</span>
}

describe("DirectionProvider", () => {
  it("renders children without crashing", () => {
    render(
      <DirectionProvider direction="ltr">
        <span>Child content</span>
      </DirectionProvider>,
    )
    expect(screen.getByText("Child content")).toBeInTheDocument()
  })

  it("provides ltr direction via useDirection", () => {
    render(
      <DirectionProvider direction="ltr">
        <DirectionConsumer />
      </DirectionProvider>,
    )
    expect(screen.getByTestId("direction")).toHaveTextContent("ltr")
  })

  it("provides rtl direction via useDirection", () => {
    render(
      <DirectionProvider direction="rtl">
        <DirectionConsumer />
      </DirectionProvider>,
    )
    expect(screen.getByTestId("direction")).toHaveTextContent("rtl")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <DirectionProvider direction="ltr">
        <p>Content</p>
      </DirectionProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
