import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu"

function renderDropdownMenu() {
  return render(
    <DropdownMenu>
      <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  )
}

describe("DropdownMenu", () => {
  it("renders the trigger button", () => {
    renderDropdownMenu()
    expect(screen.getByRole("button", { name: "Open Menu" })).toBeInTheDocument()
  })

  it("does not show menu content before opening", () => {
    renderDropdownMenu()
    expect(screen.queryByRole("menuitem", { name: "Edit" })).not.toBeInTheDocument()
  })

  it("opens and shows menu items when trigger is clicked", async () => {
    const user = userEvent.setup()
    renderDropdownMenu()

    await user.click(screen.getByRole("button", { name: "Open Menu" }))

    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument()
    })
    expect(screen.getByRole("menuitem", { name: "Duplicate" })).toBeInTheDocument()
    expect(screen.getByRole("menuitem", { name: "Delete" })).toBeInTheDocument()
  })

  it("renders menu label text", async () => {
    const user = userEvent.setup()
    renderDropdownMenu()

    await user.click(screen.getByRole("button", { name: "Open Menu" }))

    await waitFor(() => {
      expect(screen.getByText("Actions")).toBeInTheDocument()
    })
  })

  it("calls onClick when a menu item is clicked", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onClick}>Action</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    await user.click(screen.getByRole("button", { name: "Menu" }))
    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Action" })).toBeInTheDocument()
    })
    await user.click(screen.getByRole("menuitem", { name: "Action" }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it("merges custom className on DropdownMenuContent", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent className="custom-content">
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    await user.click(screen.getByRole("button", { name: "Menu" }))

    await waitFor(() => {
      const content = document.querySelector("[data-slot='dropdown-menu-content']")
      expect(content).toHaveClass("custom-content")
    })
  })

  it("renders checkbox items and toggles checked state", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={false} onCheckedChange={onCheckedChange}>
            Show Toolbar
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    await user.click(screen.getByRole("button", { name: "Menu" }))

    await waitFor(() => {
      expect(screen.getByRole("menuitemcheckbox", { name: "Show Toolbar" })).toBeInTheDocument()
    })

    await user.click(screen.getByRole("menuitemcheckbox", { name: "Show Toolbar" }))
    expect(onCheckedChange).toHaveBeenCalled()
  })

  it("renders radio items within a radio group", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="small">
            <DropdownMenuRadioItem value="small">Small</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="large">Large</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    await user.click(screen.getByRole("button", { name: "Menu" }))

    await waitFor(() => {
      expect(screen.getByRole("menuitemradio", { name: "Small" })).toBeInTheDocument()
    })
    expect(screen.getByRole("menuitemradio", { name: "Medium" })).toBeInTheDocument()
    expect(screen.getByRole("menuitemradio", { name: "Large" })).toBeInTheDocument()
  })

  it("has no accessibility violations when closed", async () => {
    const { container } = renderDropdownMenu()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup()
    renderDropdownMenu()

    await user.click(screen.getByRole("button", { name: "Open Menu" }))

    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument()
    })

    // Exclude Base UI's internal focus guard elements from axe checks
    // as they use role="button" without accessible names (upstream issue)
    const results = await axe(document.body, {
      rules: {
        // Base UI's internal focus guard elements lack accessible names (upstream issue)
        "aria-command-name": { enabled: false },
        // Portal content renders outside landmarks, expected for dropdown menus
        region: { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
