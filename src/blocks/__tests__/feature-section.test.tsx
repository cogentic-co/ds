import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { FeatureSection } from "../feature-section"

const baseFeatures = [
  { title: "Fast", description: "Blazing fast performance" },
  { title: "Secure", description: "Enterprise-grade security" },
  { title: "Scalable", description: "Grows with your needs" },
]

describe("FeatureSection", () => {
  it("renders title and features", () => {
    render(<FeatureSection title="Our Features" features={baseFeatures} />)
    expect(screen.getByText("Our Features")).toBeInTheDocument()
    expect(screen.getByText("Fast")).toBeInTheDocument()
    expect(screen.getByText("Blazing fast performance")).toBeInTheDocument()
  })

  it("renders subtitle when provided", () => {
    render(
      <FeatureSection
        title="Our Features"
        subtitle="Everything you need"
        features={baseFeatures}
      />,
    )
    expect(screen.getByText("Everything you need")).toBeInTheDocument()
  })

  it("does not render subtitle when omitted", () => {
    render(<FeatureSection title="Our Features" features={baseFeatures} />)
    expect(screen.queryByText("Everything you need")).not.toBeInTheDocument()
  })

  it("renders all feature titles and descriptions", () => {
    render(<FeatureSection title="Our Features" features={baseFeatures} />)
    for (const feature of baseFeatures) {
      expect(screen.getByText(feature.title)).toBeInTheDocument()
      expect(screen.getByText(feature.description)).toBeInTheDocument()
    }
  })

  it("renders feature icons when provided", () => {
    const featuresWithIcons = [
      { title: "Fast", description: "Fast performance", icon: <svg aria-label="icon" /> },
    ]
    render(<FeatureSection title="Features" features={featuresWithIcons} />)
    expect(screen.getByLabelText("icon")).toBeInTheDocument()
  })

  it("uses data-slot attribute", () => {
    const { container } = render(<FeatureSection title="Features" features={baseFeatures} />)
    expect(container.querySelector("[data-slot='feature-section']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(
      <FeatureSection title="Features" features={baseFeatures} className="custom" />,
    )
    expect(container.querySelector("[data-slot='feature-section']")).toHaveClass("custom")
  })

  it("renders with 2 columns", () => {
    const { container } = render(
      <FeatureSection title="Features" features={baseFeatures} columns={2} />,
    )
    expect(container.querySelector(".md\\:grid-cols-2")).toBeInTheDocument()
  })

  it("renders with 4 columns", () => {
    const { container } = render(
      <FeatureSection title="Features" features={baseFeatures} columns={4} />,
    )
    expect(container.querySelector(".lg\\:grid-cols-4")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FeatureSection
        title="Our Features"
        subtitle="Everything you need"
        features={baseFeatures}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
