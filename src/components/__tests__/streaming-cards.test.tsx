import { render } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { StreamingCards } from "../streaming-cards"

beforeEach(() => {
  globalThis.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.IntersectionObserver

  Element.prototype.scrollTo = () => {}
})

describe("StreamingCards", () => {
  const cards = [<div key="1">Card 1</div>, <div key="2">Card 2</div>, <div key="3">Card 3</div>]

  it("renders without crashing", () => {
    const { container } = render(<StreamingCards>{cards}</StreamingCards>)
    expect(container.querySelector("[data-slot='streaming-cards']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<StreamingCards>{cards}</StreamingCards>)
    expect(container.querySelector("[data-slot='streaming-cards']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(
      <StreamingCards className="custom-streaming">{cards}</StreamingCards>,
    )
    expect(container.querySelector("[data-slot='streaming-cards']")).toHaveClass("custom-streaming")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<StreamingCards>{cards}</StreamingCards>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
