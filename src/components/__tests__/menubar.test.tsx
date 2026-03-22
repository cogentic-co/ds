import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../menubar"

function renderMenubar() {
  return render(
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>File Actions</MenubarLabel>
          <MenubarSeparator />
          <MenubarItem>
            New <MenubarShortcut>Ctrl+N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Open</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>,
  )
}

describe("Menubar", () => {
  it("renders the menubar", () => {
    const { container } = renderMenubar()
    expect(container.querySelector("[data-slot='menubar']")).toBeInTheDocument()
  })

  it("has menubar role", () => {
    renderMenubar()
    expect(screen.getByRole("menubar")).toBeInTheDocument()
  })

  it("renders trigger as menuitem", () => {
    renderMenubar()
    expect(screen.getByRole("menuitem", { name: "File" })).toBeInTheDocument()
  })

  it("does not show content before opening", () => {
    renderMenubar()
    expect(screen.queryByText("Open")).not.toBeInTheDocument()
  })

  it("opens and shows menu items when trigger is clicked", async () => {
    const user = userEvent.setup()
    renderMenubar()

    await user.click(screen.getByRole("menuitem", { name: "File" }))

    await waitFor(() => {
      expect(screen.getByText("Open")).toBeInTheDocument()
    })
  })

  it("merges custom className on Menubar", () => {
    const { container } = render(
      <Menubar className="custom-menubar">
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    )
    expect(container.querySelector("[data-slot='menubar']")).toHaveClass("custom-menubar")
  })

  it("merges custom className on MenubarTrigger", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="custom-trigger">View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Zoom</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    )
    expect(screen.getByRole("menuitem", { name: "View" })).toHaveClass("custom-trigger")
  })

  it("has no accessibility violations when closed", async () => {
    const { container } = renderMenubar()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup()
    renderMenubar()

    await user.click(screen.getByRole("menuitem", { name: "File" }))

    await waitFor(() => {
      expect(screen.getByText("Open")).toBeInTheDocument()
    })

    const results = await axe(document.body, {
      rules: {
        "aria-command-name": { enabled: false },
        "aria-required-children": { enabled: false },
        region: { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
