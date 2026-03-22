import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../breadcrumb"

describe("Breadcrumb", () => {
  it("renders a nav element with breadcrumb aria-label", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )
    expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeInTheDocument()
  })

  it("has data-slot attributes", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )
    expect(container.querySelector("[data-slot='breadcrumb']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='breadcrumb-list']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='breadcrumb-item']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='breadcrumb-page']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='breadcrumb-separator']")).toBeInTheDocument()
  })

  it("renders BreadcrumbLink as anchor", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )
    const link = screen.getByText("Home")
    expect(link.tagName).toBe("A")
    expect(link).toHaveAttribute("href", "/home")
  })

  it("renders BreadcrumbPage with aria-current", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Current Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )
    expect(screen.getByText("Current Page")).toHaveAttribute("aria-current", "page")
  })

  it("renders BreadcrumbEllipsis", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )
    expect(container.querySelector("[data-slot='breadcrumb-ellipsis']")).toBeInTheDocument()
    expect(screen.getByText("More")).toBeInTheDocument()
  })

  it("merges custom className on Breadcrumb", () => {
    const { container } = render(
      <Breadcrumb className="custom-nav">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )
    expect(container.querySelector("[data-slot='breadcrumb']")).toHaveClass("custom-nav")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
