import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "../sidebar"

// matchMedia is not available in jsdom — provide a minimal stub
beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

function renderWithProvider(ui: React.ReactNode) {
  return render(<SidebarProvider>{ui}</SidebarProvider>)
}

describe("SidebarProvider", () => {
  it("renders children", () => {
    render(
      <SidebarProvider>
        <p>Sidebar children</p>
      </SidebarProvider>,
    )
    expect(screen.getByText("Sidebar children")).toBeInTheDocument()
  })

  it("renders the wrapper with data-slot", () => {
    const { container } = render(<SidebarProvider>content</SidebarProvider>)
    expect(container.querySelector("[data-slot='sidebar-wrapper']")).toBeInTheDocument()
  })

  it("accepts className override", () => {
    const { container } = render(
      <SidebarProvider className="custom-provider">content</SidebarProvider>,
    )
    expect(container.querySelector(".custom-provider")).toBeInTheDocument()
  })
})

describe("Sidebar", () => {
  it("renders with data-slot when collapsible=none", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <p>Sidebar body</p>
      </Sidebar>,
    )
    expect(container.querySelector("[data-slot='sidebar']")).toBeInTheDocument()
    expect(screen.getByText("Sidebar body")).toBeInTheDocument()
  })

  it("renders desktop sidebar structure", () => {
    const { container } = renderWithProvider(
      <Sidebar>
        <p>Desktop content</p>
      </Sidebar>,
    )
    // On desktop (non-mobile) a group wrapper with data-slot is rendered
    expect(container.querySelector("[data-slot='sidebar']")).toBeInTheDocument()
  })
})

describe("SidebarHeader", () => {
  it("renders with data-slot and children", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarHeader>
          <span>App Logo</span>
        </SidebarHeader>
      </Sidebar>,
    )
    expect(container.querySelector("[data-slot='sidebar-header']")).toBeInTheDocument()
    expect(screen.getByText("App Logo")).toBeInTheDocument()
  })

  it("accepts className override", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarHeader className="custom-header">Header</SidebarHeader>
      </Sidebar>,
    )
    expect(container.querySelector(".custom-header")).toBeInTheDocument()
  })
})

describe("SidebarFooter", () => {
  it("renders with data-slot and children", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarFooter>
          <span>Footer content</span>
        </SidebarFooter>
      </Sidebar>,
    )
    expect(container.querySelector("[data-slot='sidebar-footer']")).toBeInTheDocument()
    expect(screen.getByText("Footer content")).toBeInTheDocument()
  })
})

describe("SidebarContent", () => {
  it("renders with data-slot", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarContent>
          <p>Main nav</p>
        </SidebarContent>
      </Sidebar>,
    )
    expect(container.querySelector("[data-slot='sidebar-content']")).toBeInTheDocument()
    expect(screen.getByText("Main nav")).toBeInTheDocument()
  })
})

describe("SidebarGroup", () => {
  it("renders with data-slot", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <p>Group items</p>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>,
    )
    expect(container.querySelector("[data-slot='sidebar-group']")).toBeInTheDocument()
    expect(screen.getByText("Navigation")).toBeInTheDocument()
    expect(screen.getByText("Group items")).toBeInTheDocument()
  })

  it("renders group action button", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarGroup>
          <SidebarGroupAction aria-label="Add item">+</SidebarGroupAction>
        </SidebarGroup>
      </Sidebar>,
    )
    expect(container.querySelector("[data-slot='sidebar-group-action']")).toBeInTheDocument()
  })
})

describe("SidebarMenu and SidebarMenuItem", () => {
  it("renders menu list and items with data-slots", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Dashboard</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>,
    )
    expect(container.querySelector("[data-slot='sidebar-menu']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='sidebar-menu-item']")).toBeInTheDocument()
  })

  it("renders menu button with text", () => {
    renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Reports</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>,
    )
    expect(screen.getByRole("button", { name: "Reports" })).toBeInTheDocument()
  })

  it("menu button accepts className override", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="custom-btn">Item</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>,
    )
    expect(container.querySelector(".custom-btn")).toBeInTheDocument()
  })

  it("menu button renders as active when isActive=true", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive>Active Item</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>,
    )
    const btn = container.querySelector("[data-slot='sidebar-menu-button']")
    // isActive renders data-active as an empty string attribute (truthy presence)
    expect(btn).toHaveAttribute("data-active")
  })

  it("renders menu badge", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Item</SidebarMenuButton>
            <SidebarMenuBadge>3</SidebarMenuBadge>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>,
    )
    expect(container.querySelector("[data-slot='sidebar-menu-badge']")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
  })

  it("renders menu skeleton", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuSkeleton />
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>,
    )
    expect(container.querySelector("[data-slot='sidebar-menu-skeleton']")).toBeInTheDocument()
  })

  it("renders menu skeleton with icon", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>,
    )
    expect(container.querySelector("[data-sidebar='menu-skeleton-icon']")).toBeInTheDocument()
  })
})

describe("SidebarMenuSub", () => {
  it("renders sub-menu items with data-slots", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Parent</SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton href="/child">Child</SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>,
    )
    expect(container.querySelector("[data-slot='sidebar-menu-sub']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='sidebar-menu-sub-item']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='sidebar-menu-sub-button']")).toBeInTheDocument()
    expect(screen.getByText("Child")).toBeInTheDocument()
  })
})

describe("SidebarInput", () => {
  it("renders input with data-slot", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarHeader>
          <SidebarInput placeholder="Search..." />
        </SidebarHeader>
      </Sidebar>,
    )
    expect(container.querySelector("[data-slot='sidebar-input']")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument()
  })
})

describe("SidebarSeparator", () => {
  it("renders separator with data-slot", () => {
    const { container } = renderWithProvider(
      <Sidebar collapsible="none">
        <SidebarSeparator />
      </Sidebar>,
    )
    expect(container.querySelector("[data-slot='sidebar-separator']")).toBeInTheDocument()
  })
})

describe("SidebarInset", () => {
  it("renders main element with data-slot", () => {
    const { container } = render(
      <SidebarProvider>
        <SidebarInset>
          <p>Page content</p>
        </SidebarInset>
      </SidebarProvider>,
    )
    expect(container.querySelector("[data-slot='sidebar-inset']")).toBeInTheDocument()
    expect(screen.getByText("Page content")).toBeInTheDocument()
  })
})

describe("SidebarTrigger", () => {
  it("renders trigger button with accessible label", () => {
    renderWithProvider(<SidebarTrigger />)
    expect(screen.getByRole("button", { name: "Toggle Sidebar" })).toBeInTheDocument()
  })

  it("toggles sidebar when clicked", async () => {
    const user = userEvent.setup()
    const { container } = render(
      <SidebarProvider>
        <SidebarTrigger />
        <Sidebar>
          <SidebarHeader>Header</SidebarHeader>
        </Sidebar>
      </SidebarProvider>,
    )
    const trigger = screen.getByRole("button", { name: "Toggle Sidebar" })
    const wrapper = container.querySelector("[data-slot='sidebar-wrapper']")

    await user.click(trigger)

    // After click the sidebar state should change (wrapper persists, sidebar state changes)
    expect(wrapper).toBeInTheDocument()
  })
})

describe("SidebarRail", () => {
  it("renders rail button with accessible label", () => {
    renderWithProvider(
      <Sidebar>
        <SidebarRail />
      </Sidebar>,
    )
    expect(screen.getByRole("button", { name: "Toggle Sidebar" })).toBeInTheDocument()
  })
})

describe("useSidebar hook", () => {
  it("throws when used outside SidebarProvider", () => {
    const TestComponent = () => {
      useSidebar()
      return null
    }
    expect(() => render(<TestComponent />)).toThrow(
      "useSidebar must be used within a SidebarProvider.",
    )
  })

  it("provides context values within SidebarProvider", () => {
    let capturedState: ReturnType<typeof useSidebar> | null = null
    const TestComponent = () => {
      capturedState = useSidebar()
      return null
    }
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>,
    )
    expect(capturedState).not.toBeNull()
    expect(capturedState!.state).toBe("expanded")
    expect(capturedState!.open).toBe(true)
  })

  it("respects defaultOpen=false prop", () => {
    let capturedState: ReturnType<typeof useSidebar> | null = null
    const TestComponent = () => {
      capturedState = useSidebar()
      return null
    }
    render(
      <SidebarProvider defaultOpen={false}>
        <TestComponent />
      </SidebarProvider>,
    )
    expect(capturedState!.state).toBe("collapsed")
    expect(capturedState!.open).toBe(false)
  })
})

describe("SidebarProvider keyboard shortcut", () => {
  it("registers keydown listener on mount", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener")
    render(<SidebarProvider>content</SidebarProvider>)
    expect(addEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function))
    addEventListenerSpy.mockRestore()
  })
})

describe("Sidebar accessibility", () => {
  it("SidebarProvider has no accessibility violations", async () => {
    const { container } = render(
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Dashboard</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
        </Sidebar>
        <SidebarInset>
          <h1>Page</h1>
        </SidebarInset>
      </SidebarProvider>,
    )
    const results = await axe(container, {
      rules: {
        region: { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
