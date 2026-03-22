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

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>Accessible</Badge>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
