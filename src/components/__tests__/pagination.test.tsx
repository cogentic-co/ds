import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination"

function renderPagination({ className }: { className?: string } = {}) {
  return render(
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>,
  )
}

describe("Pagination", () => {
  it("renders pagination nav", () => {
    renderPagination()
    expect(screen.getByRole("navigation", { name: "pagination" })).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = renderPagination()
    expect(container.querySelector("[data-slot='pagination']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='pagination-content']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='pagination-item']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='pagination-link']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='pagination-ellipsis']")).toBeInTheDocument()
  })

  it("merges custom className on nav", () => {
    const { container } = renderPagination({ className: "custom-pagination" })
    expect(container.querySelector("[data-slot='pagination']")).toHaveClass("custom-pagination")
  })

  it("renders previous and next links", () => {
    renderPagination()
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument()
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument()
  })

  it("marks active page with aria-current", () => {
    renderPagination()
    const activeLink = screen.getByText("1").closest("a")
    expect(activeLink).toHaveAttribute("aria-current", "page")
  })

  it("inactive page has no aria-current", () => {
    renderPagination()
    const inactiveLink = screen.getByText("2").closest("a")
    expect(inactiveLink).not.toHaveAttribute("aria-current")
  })

  it("renders ellipsis with sr-only text", () => {
    renderPagination()
    expect(screen.getByText("More pages")).toBeInTheDocument()
  })

  it("supports custom text on previous/next", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" text="Back" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" text="Forward" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    )
    expect(screen.getByText("Back")).toBeInTheDocument()
    expect(screen.getByText("Forward")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = renderPagination()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
