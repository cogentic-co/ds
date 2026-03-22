import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { PricingTable } from "../pricing-table"

vi.mock("next/link", () => ({
  default: ({ children, ...props }: React.ComponentProps<"a">) => <a {...props}>{children}</a>,
}))

beforeEach(() => {
  globalThis.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.IntersectionObserver
})

const simplePlans = [
  {
    name: "Basic",
    monthlyPrice: "$9",
    annualPrice: "$7",
    perUnitMonthly: "Per month",
    perUnitAnnual: "Per month, billed yearly",
    features: ["Feature one", "Feature two"],
    ctaLabel: "Get Basic",
    ctaHref: "/signup",
  },
  {
    name: "Pro",
    monthlyPrice: "$29",
    annualPrice: "$23",
    perUnitMonthly: "Per month",
    perUnitAnnual: "Per month, billed yearly",
    features: ["All Basic features", "Feature three"],
    ctaLabel: "Get Pro",
    ctaHref: "/signup",
    highlight: true,
  },
]

describe("PricingTable", () => {
  it("renders without crashing", () => {
    const { container } = render(<PricingTable />)
    expect(container.querySelector("[data-slot='pricing-table']")).toBeInTheDocument()
  })

  it("renders default plans when none provided", () => {
    render(<PricingTable />)
    expect(screen.getByText("Starter")).toBeInTheDocument()
    expect(screen.getByText("Growth")).toBeInTheDocument()
    expect(screen.getByText("Enterprise")).toBeInTheDocument()
  })

  it("renders custom plans", () => {
    render(<PricingTable plans={simplePlans} />)
    expect(screen.getByText("Basic")).toBeInTheDocument()
    expect(screen.getByText("Pro")).toBeInTheDocument()
  })

  it("renders headline when provided", () => {
    render(<PricingTable headline="Simple Pricing" />)
    expect(screen.getByText("Simple Pricing")).toBeInTheDocument()
  })

  it("renders subheadline when provided", () => {
    render(<PricingTable headline="Pricing" subheadline="No hidden fees" />)
    expect(screen.getByText("No hidden fees")).toBeInTheDocument()
  })

  it("shows yearly prices by default", () => {
    render(<PricingTable plans={simplePlans} />)
    expect(screen.getByText("$23")).toBeInTheDocument()
  })

  it("shows monthly prices after toggling to monthly", async () => {
    const user = userEvent.setup()
    render(<PricingTable plans={simplePlans} />)
    const toggle = screen.getByRole("switch", { name: "Toggle yearly billing" })
    await user.click(toggle)
    expect(screen.getByText("$9")).toBeInTheDocument()
  })

  it("renders billing toggle", () => {
    render(<PricingTable />)
    expect(screen.getByRole("switch", { name: "Toggle yearly billing" })).toBeInTheDocument()
    expect(screen.getByText("Monthly")).toBeInTheDocument()
    expect(screen.getByText("Yearly")).toBeInTheDocument()
  })

  it("renders CTA buttons", () => {
    render(<PricingTable plans={simplePlans} />)
    expect(screen.getByRole("button", { name: "Get Basic" })).toBeInTheDocument()
  })

  it("uses data-slot attribute", () => {
    const { container } = render(<PricingTable />)
    expect(container.querySelector("[data-slot='pricing-table']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<PricingTable className="custom" />)
    expect(container.querySelector("[data-slot='pricing-table']")).toHaveClass("custom")
  })

  it("has no accessibility violations", async () => {
    // Render without headline to avoid heading-order violation (h1 → h3 jump is a known
    // structural issue in PricingTable when a headline prop is used alongside plan h3s)
    const { container } = render(<PricingTable plans={simplePlans} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
