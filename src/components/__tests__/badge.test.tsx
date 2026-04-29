import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Badge } from "../badge"

describe("Badge", () => {
  it("renders with text content", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("renders as a span by default", () => {
    render(<Badge>Tag</Badge>)
    expect(screen.getByText("Tag").tagName).toBe("SPAN")
  })

  it("merges custom className", () => {
    render(<Badge className="custom-badge">Status</Badge>)
    expect(screen.getByText("Status")).toHaveClass("custom-badge")
  })

  it("renders default variant", () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText("Default")).toHaveClass("bg-primary")
  })

  it("renders secondary variant", () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    expect(screen.getByText("Secondary")).toHaveClass("bg-secondary")
  })

  it("renders destructive variant", () => {
    render(<Badge variant="destructive">Error</Badge>)
    expect(screen.getByText("Error")).toHaveClass("text-destructive")
  })

  it("renders outline variant", () => {
    render(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText("Outline")).toHaveClass("border-border")
  })

  it("renders tagline variant", () => {
    render(<Badge variant="tagline">Tagline</Badge>)
    expect(screen.getByText("Tagline")).toHaveClass("rounded-full")
  })

  it("size sm applies smaller height + text", () => {
    render(<Badge size="sm">Sm</Badge>)
    expect(screen.getByText("Sm")).toHaveClass("h-4")
  })

  it("size default applies default height", () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText("Default")).toHaveClass("h-5")
  })

  it("size lg applies larger height + text", () => {
    render(<Badge size="lg">Lg</Badge>)
    expect(screen.getByText("Lg")).toHaveClass("h-6")
  })

  it("shape=square applies square radius", () => {
    render(<Badge shape="square">Square</Badge>)
    expect(screen.getByText("Square")).toHaveClass("rounded-[6px]")
  })

  it("shape=pill applies pill radius", () => {
    render(<Badge shape="pill">Pill</Badge>)
    expect(screen.getByText("Pill")).toHaveClass("rounded-4xl")
  })

  it("legacy `square` prop still maps to shape=square", () => {
    render(<Badge square>Legacy</Badge>)
    expect(screen.getByText("Legacy")).toHaveClass("rounded-[6px]")
  })

  it("dot=true renders a leading status dot", () => {
    const { container } = render(<Badge dot>Live</Badge>)
    expect(container.querySelector("[aria-hidden='true']")).not.toBeNull()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>Accessible</Badge>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
