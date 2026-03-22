import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { HeroSection } from "../hero-section"

describe("HeroSection", () => {
  it("renders title", () => {
    render(<HeroSection title="Welcome to Cogentic" />)
    expect(screen.getByText("Welcome to Cogentic")).toBeInTheDocument()
  })

  it("renders subtitle when provided", () => {
    render(<HeroSection title="Hero Title" subtitle="A subtitle here" />)
    expect(screen.getByText("A subtitle here")).toBeInTheDocument()
  })

  it("does not render subtitle when omitted", () => {
    render(<HeroSection title="Hero Title" />)
    expect(screen.queryByText("A subtitle here")).not.toBeInTheDocument()
  })

  it("renders actions when provided", () => {
    render(<HeroSection title="Hero Title" actions={<button type="button">Get Started</button>} />)
    expect(screen.getByRole("button", { name: "Get Started" })).toBeInTheDocument()
  })

  it("renders badge when provided", () => {
    render(<HeroSection title="Hero Title" badge={<span>New</span>} />)
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("renders media when provided in split variant", () => {
    render(
      <HeroSection
        title="Hero Title"
        variant="split"
        media={<img src="/hero.png" alt="Hero image" />}
      />,
    )
    expect(screen.getByRole("img", { name: "Hero image" })).toBeInTheDocument()
  })

  it("uses data-slot attribute", () => {
    const { container } = render(<HeroSection title="Hero Title" />)
    expect(container.querySelector("[data-slot='hero-section']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<HeroSection title="Hero Title" className="custom" />)
    expect(container.querySelector("[data-slot='hero-section']")).toHaveClass("custom")
  })

  it("renders centered variant by default", () => {
    const { container } = render(<HeroSection title="Hero Title" />)
    expect(container.querySelector("[data-slot='hero-section']")).toHaveClass("text-center")
  })

  it("renders split variant layout", () => {
    const { container } = render(<HeroSection title="Hero Title" variant="split" />)
    expect(container.querySelector(".md\\:grid-cols-2")).toBeInTheDocument()
  })

  it("renders full size with min-h-screen", () => {
    const { container } = render(<HeroSection title="Hero Title" size="full" />)
    expect(container.querySelector("[data-slot='hero-section']")).toHaveClass("min-h-screen")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <HeroSection
        title="Welcome to Cogentic"
        subtitle="The compliance platform for modern VASPs"
        actions={<button type="button">Get Started</button>}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
