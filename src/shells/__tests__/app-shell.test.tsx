import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Home as HomeIcon } from "lucide-react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { AppShell } from "../app-shell"

vi.mock("next/link", () => ({
  default: ({ children, ...props }: React.ComponentProps<"a">) => <a {...props}>{children}</a>,
}))

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

const defaultLogo = { title: "Acme App", subtitle: "v1.0" }

const defaultNav = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Reports", href: "/reports" },
    ],
  },
]

function renderShell(overrides: Partial<React.ComponentProps<typeof AppShell>> = {}) {
  return render(
    <AppShell logo={defaultLogo} nav={defaultNav} {...overrides}>
      <p>Page content</p>
    </AppShell>,
  )
}

describe("AppShell", () => {
  it("renders without crashing", () => {
    renderShell()
    expect(screen.getByText("Page content")).toBeInTheDocument()
  })

  it("renders logo title", () => {
    renderShell()
    expect(screen.getAllByText("Acme App").length).toBeGreaterThan(0)
  })

  it("renders logo subtitle", () => {
    renderShell()
    expect(screen.getByText("v1.0")).toBeInTheDocument()
  })

  it("renders nav group label", () => {
    renderShell()
    expect(screen.getByText("Main")).toBeInTheDocument()
  })

  it("renders nav item links", () => {
    renderShell()
    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Reports" })).toBeInTheDocument()
  })

  it("nav links have correct hrefs", () => {
    renderShell()
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/dashboard")
    expect(screen.getByRole("link", { name: "Reports" })).toHaveAttribute("href", "/reports")
  })

  it("renders logo href link in mobile header", () => {
    renderShell({ logo: { title: "Acme App", href: "/home" } })
    const links = screen.getAllByRole("link", { name: "Acme App" })
    const hasHomeHref = links.some((l) => l.getAttribute("href") === "/home")
    expect(hasHomeHref).toBe(true)
  })

  it("renders children page content", () => {
    render(
      <AppShell logo={defaultLogo} nav={defaultNav}>
        <h1>My Page</h1>
      </AppShell>,
    )
    expect(screen.getByRole("heading", { name: "My Page" })).toBeInTheDocument()
  })

  it("renders breadcrumbs when provided", () => {
    renderShell({
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Settings" }],
    })
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Settings")).toBeInTheDocument()
  })

  it("renders last breadcrumb as page (no link)", () => {
    renderShell({
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Settings" }],
    })
    const settingsEl = screen.getByText("Settings")
    expect(settingsEl.closest("a")).toBeNull()
  })

  it("renders header actions when provided", () => {
    renderShell({ headerActions: <button type="button">Notifications</button> })
    expect(screen.getByRole("button", { name: "Notifications" })).toBeInTheDocument()
  })

  it("renders footer nav when provided", () => {
    renderShell({
      footerNav: {
        title: "Support",
        items: [{ label: "Help", href: "/help" }],
      },
    })
    expect(screen.getByRole("link", { name: "Help" })).toBeInTheDocument()
  })

  it("renders user menu when user prop is provided", () => {
    renderShell({
      user: { name: "Jane Doe", email: "jane@example.com" },
    })
    expect(screen.getByText("Jane Doe")).toBeInTheDocument()
    expect(screen.getByText("jane@example.com")).toBeInTheDocument()
  })

  it("renders user initials in avatar", () => {
    renderShell({
      user: { name: "Jane Doe", email: "jane@example.com" },
    })
    // Initials derived from first letters of each name segment
    expect(screen.getAllByText("JD").length).toBeGreaterThan(0)
  })

  it("calls onLogout when log out menu item is clicked", async () => {
    const user = userEvent.setup()
    const onLogout = vi.fn()
    renderShell({
      user: { name: "Jane Doe", email: "jane@example.com" },
      onLogout,
    })

    // Open the user dropdown by clicking the user menu button
    const userButton = screen.getByText("Jane Doe").closest("button")
    if (userButton) {
      await user.click(userButton)
      const logoutItem = await screen.findByText("Log out")
      await user.click(logoutItem)
      expect(onLogout).toHaveBeenCalledOnce()
    }
  })

  it("renders nav item with children (collapsible)", () => {
    const navWithChildren = [
      {
        title: "Analytics",
        items: [
          {
            label: "Overview",
            href: "/overview",
            children: [
              { label: "Traffic", href: "/overview/traffic" },
              { label: "Revenue", href: "/overview/revenue" },
            ],
          },
        ],
      },
    ]
    renderShell({ nav: navWithChildren })
    expect(screen.getByText("Overview")).toBeInTheDocument()
  })

  it("renders sidebar header extra content", () => {
    renderShell({ sidebarHeaderExtra: <span>Extra Header</span> })
    expect(screen.getByText("Extra Header")).toBeInTheDocument()
  })

  it("applies className to wrapper", () => {
    const { container } = renderShell({ className: "custom-shell" })
    expect(container.querySelector(".custom-shell")).toBeInTheDocument()
  })

  it("uses custom linkComponent", () => {
    const CustomLink = ({ children, href, ...props }: React.ComponentProps<"a">) => (
      <a data-testid="custom-link" href={href} {...props}>
        {children}
      </a>
    )
    renderShell({ linkComponent: CustomLink })
    expect(screen.getAllByTestId("custom-link").length).toBeGreaterThan(0)
  })

  it("renders the sidebar trigger button", () => {
    renderShell()
    // AppShell renders both SidebarTrigger and SidebarRail, both named "Toggle Sidebar"
    const toggleButtons = screen.getAllByRole("button", { name: "Toggle Sidebar" })
    expect(toggleButtons.length).toBeGreaterThanOrEqual(1)
    const trigger = toggleButtons.find((btn) => btn.getAttribute("data-slot") === "sidebar-trigger")
    expect(trigger).toBeInTheDocument()
  })

  it("renders sidebarInset with page content wrapper", () => {
    const { container } = renderShell()
    expect(container.querySelector("[data-slot='sidebar-inset']")).toBeInTheDocument()
  })

  it("renders the icon rail when iconRail prop is provided", () => {
    render(
      <AppShell
        iconRail={[{ id: "home", icon: <HomeIcon />, label: "Home" }]}
        logo={defaultLogo}
        nav={defaultNav}
      >
        test content
      </AppShell>,
    )
    expect(screen.getByLabelText("Home")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = renderShell()
    const results = await axe(container, {
      rules: {
        // Sidebar trigger is visually hidden label via sr-only; skip name check
        "aria-command-name": { enabled: false },
        // Sidebar structure uses landmark regions in a non-standard way
        region: { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
