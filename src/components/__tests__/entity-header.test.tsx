import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { EntityHeader } from "../entity-header"

describe("EntityHeader", () => {
  it("renders with name", () => {
    render(<EntityHeader name="Acme Corp" />)
    expect(screen.getByText("Acme Corp")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<EntityHeader name="Acme" />)
    expect(container.querySelector("[data-slot='entity-header']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<EntityHeader name="Acme" className="custom-header" />)
    expect(container.querySelector("[data-slot='entity-header']")).toHaveClass("custom-header")
  })

  it("renders subtitle", () => {
    render(<EntityHeader name="Acme" subtitle="Trading as Acme Inc" />)
    expect(screen.getByText("Trading as Acme Inc")).toBeInTheDocument()
  })

  it("renders description", () => {
    render(<EntityHeader name="Acme" description="A great company." />)
    expect(screen.getByText("A great company.")).toBeInTheDocument()
  })

  it("renders fallback avatar with first character", () => {
    const { container } = render(<EntityHeader name="Acme" />)
    const avatar = container.querySelector("[data-slot='entity-header-avatar']")
    expect(avatar).toHaveTextContent("A")
  })

  it("renders logo when logoUrl provided", () => {
    const { container } = render(
      <EntityHeader name="Acme" logoUrl="https://example.com/logo.png" />,
    )
    const img = container.querySelector("img")
    expect(img).toHaveAttribute("src", "https://example.com/logo.png")
  })

  it("renders emoji when provided", () => {
    render(<EntityHeader name="Acme" emoji="🏢" />)
    expect(screen.getByText("🏢")).toBeInTheDocument()
  })

  it("renders meta items", () => {
    render(
      <EntityHeader
        name="Acme"
        meta={[
          { text: "New York", icon: "📍" },
          { text: "Website", href: "https://example.com", external: true },
        ]}
      />,
    )
    expect(screen.getByText("New York")).toBeInTheDocument()
    expect(screen.getByText("Website")).toBeInTheDocument()
    expect(screen.getByText("Website").closest("a")).toHaveAttribute("target", "_blank")
  })

  it("renders rightCol", () => {
    render(<EntityHeader name="Acme" rightCol={<div data-testid="right">Score</div>} />)
    expect(screen.getByTestId("right")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <EntityHeader name="Acme">
        <div data-testid="child">Extra content</div>
      </EntityHeader>,
    )
    expect(screen.getByTestId("child")).toBeInTheDocument()
  })

  it("renders all size variants", () => {
    for (const size of ["sm", "default", "lg"] as const) {
      const { container } = render(<EntityHeader name="Acme" size={size} />)
      expect(container.querySelector("[data-slot='entity-header']")).toBeInTheDocument()
    }
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <EntityHeader
        name="Acme Corp"
        subtitle="International Ltd"
        description="A leading company."
        meta={[{ text: "Location" }]}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
