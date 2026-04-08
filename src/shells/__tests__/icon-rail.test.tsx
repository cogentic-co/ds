import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Bell, Home } from "lucide-react"
import { describe, expect, it, vi } from "vitest"
import { IconRail } from "../icon-rail"

const items = [
  { id: "home", icon: <Home />, label: "Home" },
  { id: "notifs", icon: <Bell />, label: "Notifications" },
]

describe("IconRail", () => {
  it("renders each item with an accessible label", () => {
    render(<IconRail items={items} />)
    expect(screen.getByLabelText("Home")).toBeInTheDocument()
    expect(screen.getByLabelText("Notifications")).toBeInTheDocument()
  })

  it("marks the active item with data-active", () => {
    render(<IconRail items={items} activeId="notifs" />)
    expect(screen.getByLabelText("Notifications")).toHaveAttribute("data-active", "true")
    expect(screen.getByLabelText("Home")).not.toHaveAttribute("data-active")
  })

  it("fires onSelect when an item is clicked", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<IconRail items={items} onSelect={onSelect} />)
    await user.click(screen.getByLabelText("Home"))
    expect(onSelect).toHaveBeenCalledWith("home")
  })

  it("renders as anchors when href is provided", () => {
    const withHref = items.map((i) => ({ ...i, href: `/${i.id}` }))
    render(<IconRail items={withHref} />)
    expect(screen.getByLabelText("Home").tagName).toBe("A")
    expect(screen.getByLabelText("Home")).toHaveAttribute("href", "/home")
  })

  it("renders header and footer slots", () => {
    render(
      <IconRail
        items={items}
        header={<div data-testid="rail-header" />}
        footer={<div data-testid="rail-footer" />}
      />,
    )
    expect(screen.getByTestId("rail-header")).toBeInTheDocument()
    expect(screen.getByTestId("rail-footer")).toBeInTheDocument()
  })
})
