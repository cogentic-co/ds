import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../empty"

describe("Empty", () => {
  it("renders with all sections", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyMedia>Icon</EmptyMedia>
          <EmptyTitle>No results</EmptyTitle>
          <EmptyDescription>Try a different search term.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>Action area</EmptyContent>
      </Empty>,
    )
    expect(screen.getByText("No results")).toBeInTheDocument()
    expect(screen.getByText("Try a different search term.")).toBeInTheDocument()
    expect(screen.getByText("Action area")).toBeInTheDocument()
  })

  it("has data-slot attributes", () => {
    const { container } = render(
      <Empty>
        <EmptyHeader>
          <EmptyMedia>Icon</EmptyMedia>
          <EmptyTitle>Title</EmptyTitle>
          <EmptyDescription>Desc</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>Content</EmptyContent>
      </Empty>,
    )
    expect(container.querySelector("[data-slot='empty']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='empty-header']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='empty-icon']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='empty-title']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='empty-description']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='empty-content']")).toBeInTheDocument()
  })

  it("merges custom className on Empty", () => {
    const { container } = render(<Empty className="custom-empty">Content</Empty>)
    expect(container.querySelector("[data-slot='empty']")).toHaveClass("custom-empty")
  })

  it("supports EmptyMedia icon variant", () => {
    const { container } = render(
      <Empty>
        <EmptyMedia variant="icon">Icon</EmptyMedia>
      </Empty>,
    )
    const media = container.querySelector("[data-slot='empty-icon']")
    expect(media).toHaveAttribute("data-variant", "icon")
    expect(media).toHaveClass("bg-muted")
  })

  it("supports EmptyMedia default variant", () => {
    const { container } = render(
      <Empty>
        <EmptyMedia>Icon</EmptyMedia>
      </Empty>,
    )
    const media = container.querySelector("[data-slot='empty-icon']")
    expect(media).toHaveAttribute("data-variant", "default")
    expect(media).toHaveClass("bg-transparent")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Empty state</EmptyTitle>
          <EmptyDescription>No items found</EmptyDescription>
        </EmptyHeader>
      </Empty>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
