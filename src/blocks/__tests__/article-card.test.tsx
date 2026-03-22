import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { ArticleCard } from "../article-card"

describe("ArticleCard", () => {
  it("renders title", () => {
    render(<ArticleCard title="Test Article" />)
    expect(screen.getByText("Test Article")).toBeInTheDocument()
  })

  it("renders optional fields when provided", () => {
    render(
      <ArticleCard
        title="Test Article"
        excerpt="A short summary"
        date="2024-01-15"
        category="Technology"
        author="Jane Doe"
      />,
    )
    expect(screen.getByText("A short summary")).toBeInTheDocument()
    expect(screen.getByText("2024-01-15")).toBeInTheDocument()
    expect(screen.getByText("Technology")).toBeInTheDocument()
    expect(screen.getByText("Jane Doe")).toBeInTheDocument()
  })

  it("renders default author when none provided", () => {
    render(<ArticleCard title="Test Article" />)
    expect(screen.getByText("Cogentic Team")).toBeInTheDocument()
  })

  it("renders image when imageUrl provided", () => {
    render(<ArticleCard title="Test Article" imageUrl="https://example.com/image.jpg" />)
    const img = screen.getByRole("img")
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg")
    expect(img).toHaveAttribute("alt", "Test Article")
  })

  it("does not render image when imageUrl not provided", () => {
    render(<ArticleCard title="Test Article" />)
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  it("uses href prop on anchor", () => {
    render(<ArticleCard title="Test Article" href="/articles/test" />)
    expect(screen.getByRole("link")).toHaveAttribute("href", "/articles/test")
  })

  it("defaults href to #", () => {
    render(<ArticleCard title="Test Article" />)
    expect(screen.getByRole("link")).toHaveAttribute("href", "#")
  })

  it("uses data-slot attribute", () => {
    const { container } = render(<ArticleCard title="Test Article" />)
    expect(container.querySelector("[data-slot='article-card']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<ArticleCard title="Test Article" className="custom" />)
    expect(container.querySelector("[data-slot='article-card']")).toHaveClass("custom")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ArticleCard
        title="Test Article"
        excerpt="A short summary of the article"
        date="2024-01-15"
        category="Technology"
        author="Jane Doe"
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
