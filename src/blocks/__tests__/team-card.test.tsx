import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { TeamCard } from "../team-card"

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: React.ComponentProps<"img">) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

describe("TeamCard", () => {
  it("renders name and role", () => {
    render(<TeamCard name="Jane Doe" role="Engineer" />)
    expect(screen.getByText("Jane Doe")).toBeInTheDocument()
    expect(screen.getByText("Engineer")).toBeInTheDocument()
  })

  it("renders initials when no imageUrl provided", () => {
    render(<TeamCard name="Jane Doe" role="Engineer" />)
    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("renders image when imageUrl provided", () => {
    render(<TeamCard name="Jane Doe" role="Engineer" imageUrl="https://example.com/jane.jpg" />)
    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("alt", "Jane Doe")
  })

  it("renders LinkedIn link when linkedinUrl provided", () => {
    render(
      <TeamCard name="Jane Doe" role="Engineer" linkedinUrl="https://linkedin.com/in/janedoe" />,
    )
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "https://linkedin.com/in/janedoe")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("does not render LinkedIn link when linkedinUrl omitted", () => {
    render(<TeamCard name="Jane Doe" role="Engineer" />)
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })

  it("uses data-slot attribute", () => {
    const { container } = render(<TeamCard name="Jane Doe" role="Engineer" />)
    expect(container.querySelector("[data-slot='team-card']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<TeamCard name="Jane Doe" role="Engineer" className="custom" />)
    expect(container.querySelector("[data-slot='team-card']")).toHaveClass("custom")
  })

  it("has no accessibility violations without LinkedIn link", async () => {
    const { container } = render(<TeamCard name="Jane Doe" role="Software Engineer" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
