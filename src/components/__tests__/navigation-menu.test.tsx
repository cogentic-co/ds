import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../navigation-menu"

function renderNavigationMenu() {
  return render(
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>,
  )
}

describe("NavigationMenu", () => {
  it("renders without crashing", () => {
    const { container } = renderNavigationMenu()
    expect(container.querySelector("[data-slot='navigation-menu']")).toBeInTheDocument()
  })

  it("has data-slot attributes", () => {
    const { container } = renderNavigationMenu()
    expect(container.querySelector("[data-slot='navigation-menu']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='navigation-menu-list']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='navigation-menu-item']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='navigation-menu-link']")).toBeInTheDocument()
  })

  it("merges custom className on NavigationMenu", () => {
    const { container } = render(
      <NavigationMenu className="custom-nav">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    )
    expect(container.querySelector("[data-slot='navigation-menu']")).toHaveClass("custom-nav")
  })

  it("renders navigation links", () => {
    renderNavigationMenu()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Docs")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = renderNavigationMenu()
    const results = await axe(container, {
      rules: {
        // Base UI's NavigationMenu.List adds aria-orientation on <ul> (upstream issue)
        "aria-allowed-attr": { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
