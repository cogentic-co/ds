import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs"

function renderTabs({ className }: { className?: string } = {}) {
  return render(
    <Tabs defaultValue="tab1" className={className}>
      <TabsList>
        <TabsTrigger value="tab1">Tab One</TabsTrigger>
        <TabsTrigger value="tab2">Tab Two</TabsTrigger>
        <TabsTrigger value="tab3">Tab Three</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for tab one</TabsContent>
      <TabsContent value="tab2">Content for tab two</TabsContent>
      <TabsContent value="tab3">Content for tab three</TabsContent>
    </Tabs>,
  )
}

describe("Tabs", () => {
  it("renders all tab triggers", () => {
    renderTabs()
    expect(screen.getByRole("tab", { name: "Tab One" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Tab Two" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Tab Three" })).toBeInTheDocument()
  })

  it("merges custom className on root", () => {
    const { container } = renderTabs({ className: "custom-tabs" })
    const root = container.querySelector("[data-slot='tabs']")
    expect(root).toHaveClass("custom-tabs")
  })

  it("shows the default tab content", () => {
    renderTabs()
    expect(screen.getByText("Content for tab one")).toBeVisible()
  })

  it("switches tab content when a different tab is clicked", async () => {
    const user = userEvent.setup()
    renderTabs()

    await user.click(screen.getByRole("tab", { name: "Tab Two" }))

    expect(screen.getByText("Content for tab two")).toBeVisible()
    expect(screen.getByRole("tab", { name: "Tab Two" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tab", { name: "Tab One" })).toHaveAttribute("aria-selected", "false")
  })

  it("supports keyboard navigation between tabs", async () => {
    const user = userEvent.setup()
    renderTabs()

    // Focus the first tab
    await user.click(screen.getByRole("tab", { name: "Tab One" }))
    // Arrow right should move to next tab
    await user.keyboard("{ArrowRight}")

    expect(screen.getByRole("tab", { name: "Tab Two" })).toHaveFocus()
  })

  it("merges custom className on TabsList", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList className="list-custom">
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">A content</TabsContent>
      </Tabs>,
    )
    const list = screen.getByRole("tablist")
    expect(list).toHaveClass("list-custom")
  })

  it("has no accessibility violations", async () => {
    const { container } = renderTabs()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations after switching tabs", async () => {
    const user = userEvent.setup()
    const { container } = renderTabs()

    await user.click(screen.getByRole("tab", { name: "Tab Two" }))

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
