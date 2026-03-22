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

  it("renders warning variant", () => {
    render(<Alert variant="warning">Caution</Alert>)
    const el = screen.getByRole("alert")
    expect(el).toHaveClass("text-warning-foreground")
    expect(el).toHaveClass("bg-warning/10")
  })

  it("renders destructive variant", () => {
    render(<Alert variant="destructive">Error</Alert>)
    expect(screen.getByRole("alert")).toHaveClass("text-destructive")
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
