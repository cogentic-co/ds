import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "../context-menu"

function renderContextMenu() {
  return render(
    <ContextMenu>
      <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Edit <ContextMenuShortcut>Ctrl+E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>,
  )
}

describe("ContextMenu", () => {
  it("renders trigger without crashing", () => {
    renderContextMenu()
    expect(screen.getByText("Right-click me")).toBeInTheDocument()
  })

  it("has data-slot attribute on trigger", () => {
    const { container } = renderContextMenu()
    expect(container.querySelector("[data-slot='context-menu-trigger']")).toBeInTheDocument()
  })

  it("merges custom className on trigger", () => {
    const { container } = render(
      <ContextMenu>
        <ContextMenuTrigger className="custom-trigger">Trigger</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    )
    expect(container.querySelector("[data-slot='context-menu-trigger']")).toHaveClass(
      "custom-trigger",
    )
  })

  it("does not show menu content before opening", () => {
    renderContextMenu()
    expect(screen.queryByText("Edit")).not.toBeInTheDocument()
  })

  it("has no accessibility violations when closed", async () => {
    const { container } = renderContextMenu()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
