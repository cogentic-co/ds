import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { SettingsCardGrid } from "../settings-card-grid"

// Mock next/link since the test env doesn't have a Next app context
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

const items = [
  {
    icon: <span data-testid="icon-1" />,
    title: "General",
    description: "Configure workspace name, logo, and domain settings",
    href: "/settings/general",
  },
  {
    icon: <span data-testid="icon-2" />,
    title: "Members",
    description: "Add and manage team members and their permissions",
    href: "/settings/members",
  },
]

describe("SettingsCardGrid", () => {
  it("renders each item", () => {
    render(<SettingsCardGrid items={items} />)
    expect(screen.getByText("General")).toBeInTheDocument()
    expect(screen.getByText("Members")).toBeInTheDocument()
  })

  it("renders descriptions", () => {
    render(<SettingsCardGrid items={items} />)
    expect(
      screen.getByText("Configure workspace name, logo, and domain settings"),
    ).toBeInTheDocument()
  })

  it("renders links with correct hrefs", () => {
    render(<SettingsCardGrid items={items} />)
    expect(screen.getByText("General").closest("a")).toHaveAttribute("href", "/settings/general")
    expect(screen.getByText("Members").closest("a")).toHaveAttribute("href", "/settings/members")
  })

  it("renders icons", () => {
    render(<SettingsCardGrid items={items} />)
    expect(screen.getByTestId("icon-1")).toBeInTheDocument()
    expect(screen.getByTestId("icon-2")).toBeInTheDocument()
  })

  it("applies 2-column grid class by default", () => {
    const { container } = render(<SettingsCardGrid items={items} />)
    const grid = container.querySelector('[data-slot="settings-card-grid"]')
    expect(grid).toHaveClass("sm:grid-cols-2")
  })

  it("applies 3-column grid class when columns=3", () => {
    const { container } = render(<SettingsCardGrid items={items} columns={3} />)
    const grid = container.querySelector('[data-slot="settings-card-grid"]')
    expect(grid).toHaveClass("lg:grid-cols-3")
  })

  it("merges className", () => {
    const { container } = render(<SettingsCardGrid items={items} className="custom-class" />)
    const grid = container.querySelector('[data-slot="settings-card-grid"]')
    expect(grid).toHaveClass("custom-class")
  })

  it("has no a11y violations", async () => {
    const { container } = render(<SettingsCardGrid items={items} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
