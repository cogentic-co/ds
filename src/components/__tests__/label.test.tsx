import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Label } from "../label"

describe("Label", () => {
  it("renders with text content", () => {
    render(<Label>Email</Label>)
    expect(screen.getByText("Email")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    render(<Label>Name</Label>)
    expect(screen.getByText("Name")).toHaveAttribute("data-slot", "label")
  })

  it("merges custom className", () => {
    render(<Label className="custom-label">Field</Label>)
    expect(screen.getByText("Field")).toHaveClass("custom-label")
  })

  it("renders as a label element", () => {
    render(<Label>Username</Label>)
    expect(screen.getByText("Username").tagName).toBe("LABEL")
  })

  it("supports htmlFor attribute", () => {
    render(<Label htmlFor="email-input">Email</Label>)
    expect(screen.getByText("Email")).toHaveAttribute("for", "email-input")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Label htmlFor="test">Test label</Label>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
