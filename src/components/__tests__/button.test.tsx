import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { Button } from "../button"

describe("Button", () => {
  it("renders with text content", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("merges custom className", () => {
    render(<Button className="custom-class">Styled</Button>)
    expect(screen.getByRole("button")).toHaveClass("custom-class")
  })

  it("handles click events", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("supports disabled state", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("renders as link when using render prop", () => {
    render(<Button render={<a href="/test" />}>Link Button</Button>)
    const el = screen.getByRole("button", { name: "Link Button" })
    expect(el).toBeInTheDocument()
    expect(el.tagName).toBe("A")
    expect(el).toHaveAttribute("href", "/test")
  })

  it("renders xl size with larger height class", () => {
    render(<Button size="xl">Big</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-12")
  })

  it("renders xxl size with even larger height class", () => {
    render(<Button size="xxl">Bigger</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-14")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Accessible</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
