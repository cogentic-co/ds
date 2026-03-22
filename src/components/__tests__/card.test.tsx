import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card"

describe("Card", () => {
  it("renders card with all sections", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    )
    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Description")).toBeInTheDocument()
    expect(screen.getByText("Content")).toBeInTheDocument()
    expect(screen.getByText("Footer")).toBeInTheDocument()
  })

  it("merges custom className on Card", () => {
    render(<Card className="custom-card">Content</Card>)
    expect(screen.getByText("Content").closest("[data-slot='card']")).toHaveClass("custom-card")
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>,
    )
    expect(container.querySelector("[data-slot='card']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='card-header']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='card-title']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
      </Card>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
