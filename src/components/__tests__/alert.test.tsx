import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "../alert"

describe("Alert", () => {
  it("renders with role alert", () => {
    render(<Alert>Alert content</Alert>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    render(<Alert>Content</Alert>)
    expect(screen.getByRole("alert")).toHaveAttribute("data-slot", "alert")
  })

  it("merges custom className", () => {
    render(<Alert className="custom-alert">Content</Alert>)
    expect(screen.getByRole("alert")).toHaveClass("custom-alert")
  })

  it("renders default variant", () => {
    render(<Alert>Default</Alert>)
    expect(screen.getByRole("alert")).toHaveClass("bg-card")
  })

  it("renders warning variant (highlight pastel)", () => {
    render(<Alert variant="warning">Caution</Alert>)
    const el = screen.getByRole("alert")
    expect(el.className).toContain("bg-highlight")
  })

  it("renders destructive variant (blush pastel)", () => {
    render(<Alert variant="destructive">Error</Alert>)
    expect(screen.getByRole("alert").className).toContain("bg-blush")
  })

  it("renders info variant (sky pastel)", () => {
    render(<Alert variant="info">Info</Alert>)
    expect(screen.getByRole("alert").className).toContain("bg-sky")
  })

  it("renders success variant (mint pastel)", () => {
    render(<Alert variant="success">All good</Alert>)
    expect(screen.getByRole("alert").className).toContain("bg-mint")
  })

  it("renders with title and description", () => {
    render(
      <Alert>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>,
    )
    expect(screen.getByText("Warning")).toBeInTheDocument()
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument()
  })

  it("has data-slot on sub-components", () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
        <AlertAction>Action</AlertAction>
      </Alert>,
    )
    expect(container.querySelector("[data-slot='alert-title']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='alert-description']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='alert-action']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>You can add components to your app.</AlertDescription>
      </Alert>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
