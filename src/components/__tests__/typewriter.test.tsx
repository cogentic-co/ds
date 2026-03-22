import { act, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { Typewriter } from "../typewriter"

const sampleLines = [{ text: "const x = 1" }, { text: "const y = 2" }, { text: "return x + y" }]

describe("Typewriter", () => {
  it("renders without crashing", () => {
    const { container } = render(<Typewriter lines={sampleLines} />)
    expect(container.querySelector("[data-slot='typewriter']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<Typewriter lines={sampleLines} />)
    expect(container.querySelector("[data-slot='typewriter']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<Typewriter lines={sampleLines} className="custom-typewriter" />)
    expect(container.querySelector("[data-slot='typewriter']")).toHaveClass("custom-typewriter")
  })

  it("reveals lines over time", () => {
    vi.useFakeTimers()
    render(<Typewriter lines={sampleLines} speed={100} />)

    // Initially no lines visible
    expect(screen.queryByText("const x = 1")).not.toBeInTheDocument()

    // After one tick, first line appears
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(screen.getByText("const x = 1")).toBeInTheDocument()

    // After second tick, second line appears
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(screen.getByText("const y = 2")).toBeInTheDocument()

    vi.useRealTimers()
  })

  it("shows line numbers by default", () => {
    vi.useFakeTimers()
    render(<Typewriter lines={sampleLines} speed={50} />)

    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(screen.getByText("1")).toBeInTheDocument()

    vi.useRealTimers()
  })

  it("hides line numbers when showLineNumbers is false", () => {
    vi.useFakeTimers()
    render(<Typewriter lines={sampleLines} speed={50} showLineNumbers={false} />)

    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(screen.getByText("const x = 1")).toBeInTheDocument()
    expect(screen.queryByText("1")).not.toBeInTheDocument()

    vi.useRealTimers()
  })

  it("shows blinking cursor while typing", () => {
    render(<Typewriter lines={sampleLines} showCursor />)
    // Cursor is the block character shown while there are still lines to reveal
    expect(screen.getByText("\u2588")).toBeInTheDocument()
  })

  it("hides cursor when showCursor is false", () => {
    render(<Typewriter lines={sampleLines} showCursor={false} />)
    expect(screen.queryByText("\u2588")).not.toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Typewriter lines={sampleLines} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
