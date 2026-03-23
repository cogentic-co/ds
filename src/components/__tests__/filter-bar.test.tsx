import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { FilterBar, FilterChip, FilterClear } from "../filter-bar"

describe("FilterBar", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <FilterBar>
        <FilterChip label="Status" value="Active" />
      </FilterBar>,
    )
    expect(container.querySelector("[data-slot='filter-bar']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FilterBar>
        <FilterChip label="Status" value="Active" onRemove={() => {}} />
        <FilterClear onClick={() => {}} />
      </FilterBar>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("renders filter chips with label and value", () => {
    render(
      <FilterBar>
        <FilterChip label="Status" value="Active" />
        <FilterChip label="Role" value="Admin" />
      </FilterBar>,
    )
    expect(screen.getByText("Status")).toBeInTheDocument()
    expect(screen.getByText("Active")).toBeInTheDocument()
    expect(screen.getByText("Role")).toBeInTheDocument()
    expect(screen.getByText("Admin")).toBeInTheDocument()
  })

  it("calls onRemove when chip X is clicked", async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(
      <FilterBar>
        <FilterChip label="Status" value="Active" onRemove={onRemove} />
      </FilterBar>,
    )
    await user.click(screen.getByRole("button", { name: "Remove Status filter" }))
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it("does not show remove button when onRemove is not provided", () => {
    render(
      <FilterBar>
        <FilterChip label="Status" value="Active" />
      </FilterBar>,
    )
    expect(screen.queryByRole("button", { name: /remove/i })).not.toBeInTheDocument()
  })

  it("calls onClick on clear all", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <FilterBar>
        <FilterClear onClick={onClick} />
      </FilterBar>,
    )
    await user.click(screen.getByText("Clear all"))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("renders custom children in FilterClear", () => {
    render(
      <FilterBar>
        <FilterClear>Reset filters</FilterClear>
      </FilterBar>,
    )
    expect(screen.getByText("Reset filters")).toBeInTheDocument()
  })

  it("has data-slot attributes on all sub-components", () => {
    const { container } = render(
      <FilterBar>
        <FilterChip label="Status" value="Active" />
        <FilterClear />
      </FilterBar>,
    )
    expect(container.querySelector("[data-slot='filter-bar']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='filter-chip']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='filter-clear']")).toBeInTheDocument()
  })

  it("merges custom className on FilterBar", () => {
    const { container } = render(<FilterBar className="custom-bar">content</FilterBar>)
    expect(container.querySelector("[data-slot='filter-bar']")).toHaveClass("custom-bar")
  })

  it("merges custom className on FilterChip", () => {
    const { container } = render(<FilterChip label="X" value="Y" className="custom-chip" />)
    expect(container.querySelector("[data-slot='filter-chip']")).toHaveClass("custom-chip")
  })

  it("merges custom className on FilterClear", () => {
    const { container } = render(<FilterClear className="custom-clear" />)
    expect(container.querySelector("[data-slot='filter-clear']")).toHaveClass("custom-clear")
  })
})
