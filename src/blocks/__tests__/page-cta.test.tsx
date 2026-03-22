import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { PageCta } from "../page-cta"

vi.mock("next/link", () => ({
  default: ({ children, ...props }: React.ComponentProps<"a">) => <a {...props}>{children}</a>,
}))

describe("PageCta", () => {
  it("renders without crashing", () => {
    const { container } = render(<PageCta />)
    expect(container.querySelector("[data-slot='page-cta']")).toBeInTheDocument()
  })

  it("renders headline when provided", () => {
    render(<PageCta headline="Ready to get started?" />)
    expect(screen.getByText("Ready to get started?")).toBeInTheDocument()
  })

  it("renders subheadline when provided", () => {
    render(<PageCta subheadline="Join thousands of teams" />)
    expect(screen.getByText("Join thousands of teams")).toBeInTheDocument()
  })

  it("does not render headline when omitted", () => {
    render(<PageCta subheadline="Only subheadline" />)
    expect(screen.queryByRole("heading")).not.toBeInTheDocument()
  })

  it("renders primary CTA button", () => {
    render(<PageCta primaryCta={{ label: "Get Started", href: "/signup" }} />)
    const btn = screen.getByRole("button", { name: "Get Started" })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute("href", "/signup")
  })

  it("renders secondary CTA button", () => {
    render(<PageCta secondaryCta={{ label: "Learn More", href: "/about" }} />)
    const btn = screen.getByRole("button", { name: "Learn More" })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute("href", "/about")
  })

  it("renders both CTA buttons", () => {
    render(
      <PageCta
        primaryCta={{ label: "Get Started", href: "/signup" }}
        secondaryCta={{ label: "Learn More", href: "/about" }}
      />,
    )
    expect(screen.getByRole("button", { name: "Get Started" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Learn More" })).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <PageCta>
        <span>Custom content</span>
      </PageCta>,
    )
    expect(screen.getByText("Custom content")).toBeInTheDocument()
  })

  it("uses data-slot attribute", () => {
    const { container } = render(<PageCta />)
    expect(container.querySelector("[data-slot='page-cta']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<PageCta className="custom" />)
    expect(container.querySelector("[data-slot='page-cta']")).toHaveClass("custom")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <PageCta
        headline="Ready to get started?"
        subheadline="Join thousands of teams already using Cogentic"
        primaryCta={{ label: "Get Started", href: "/signup" }}
        secondaryCta={{ label: "Learn More", href: "/about" }}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
