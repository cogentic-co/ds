import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { LoadingOverlay } from "../loading-overlay"

describe("LoadingOverlay", () => {
  it("renders without crashing", () => {
    const { container } = render(<LoadingOverlay loading={false}>Content</LoadingOverlay>)
    expect(container.querySelector("[data-slot='loading-overlay']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<LoadingOverlay loading={false}>Content</LoadingOverlay>)
    expect(container.querySelector("[data-slot='loading-overlay']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(
      <LoadingOverlay loading={false} className="custom-overlay">
        Content
      </LoadingOverlay>,
    )
    expect(container.querySelector("[data-slot='loading-overlay']")).toHaveClass("custom-overlay")
  })

  it("renders children", () => {
    render(<LoadingOverlay loading={false}>Child content</LoadingOverlay>)
    expect(screen.getByText("Child content")).toBeInTheDocument()
  })

  it("shows spinner when loading is true", () => {
    render(<LoadingOverlay loading>Content</LoadingOverlay>)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("does not show spinner when loading is false", () => {
    render(<LoadingOverlay loading={false}>Content</LoadingOverlay>)
    expect(screen.queryByRole("status")).not.toBeInTheDocument()
  })

  it("shows label when loading with label", () => {
    render(
      <LoadingOverlay loading label="Loading data...">
        Content
      </LoadingOverlay>,
    )
    expect(screen.getByText("Loading data...")).toBeInTheDocument()
  })

  it("does not show label when not loading", () => {
    render(
      <LoadingOverlay loading={false} label="Loading data...">
        Content
      </LoadingOverlay>,
    )
    expect(screen.queryByText("Loading data...")).not.toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<LoadingOverlay loading>Content</LoadingOverlay>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
