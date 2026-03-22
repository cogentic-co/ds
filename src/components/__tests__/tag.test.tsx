import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { Tag } from "../tag"

describe("Tag", () => {
  it("renders without crashing", () => {
    render(<Tag>Label</Tag>)
    expect(screen.getByText("Label")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<Tag>Label</Tag>)
    expect(container.querySelector("[data-slot='tag']")).toBeInTheDocument()
  })

  it("renders as a span", () => {
    render(<Tag>Label</Tag>)
    expect(screen.getByText("Label").closest("[data-slot='tag']")?.tagName).toBe("SPAN")
  })

  it("merges custom className", () => {
    const { container } = render(<Tag className="custom-tag">Label</Tag>)
    expect(container.querySelector("[data-slot='tag']")).toHaveClass("custom-tag")
  })

  it("renders default variant", () => {
    const { container } = render(<Tag>Default</Tag>)
    expect(container.querySelector("[data-slot='tag']")).toHaveClass("border-border")
  })

  it("renders primary variant", () => {
    const { container } = render(<Tag variant="primary">Primary</Tag>)
    expect(container.querySelector("[data-slot='tag']")).toHaveClass("text-primary")
  })

  it("renders destructive variant", () => {
    const { container } = render(<Tag variant="destructive">Error</Tag>)
    expect(container.querySelector("[data-slot='tag']")).toHaveClass("text-destructive")
  })

  it("renders success variant", () => {
    const { container } = render(<Tag variant="success">Success</Tag>)
    expect(container.querySelector("[data-slot='tag']")).toHaveClass("text-emerald-700")
  })

  it("does not show remove button by default", () => {
    render(<Tag>Label</Tag>)
    expect(screen.queryByRole("button", { name: "Remove" })).not.toBeInTheDocument()
  })

  it("shows remove button when onRemove is provided", () => {
    render(<Tag onRemove={() => {}}>Label</Tag>)
    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument()
  })

  it("calls onRemove when remove button is clicked", async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<Tag onRemove={onRemove}>Label</Tag>)
    await user.click(screen.getByRole("button", { name: "Remove" }))
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Tag>Accessible</Tag>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
