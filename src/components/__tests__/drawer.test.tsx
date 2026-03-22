import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }))
})

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer"

function renderDrawer() {
  return render(
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Drawer description text</DrawerDescription>
        </DrawerHeader>
        <p>Drawer body</p>
        <DrawerFooter>
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>,
  )
}

describe("Drawer", () => {
  it("renders trigger correctly", () => {
    renderDrawer()
    expect(screen.getByText("Open Drawer")).toBeInTheDocument()
  })

  it("does not show content when closed", () => {
    renderDrawer()
    expect(screen.queryByText("Drawer Title")).not.toBeInTheDocument()
  })

  it("opens on click and shows content", async () => {
    const user = userEvent.setup()
    renderDrawer()
    await user.click(screen.getByText("Open Drawer"))
    expect(screen.getByText("Drawer Title")).toBeInTheDocument()
    expect(screen.getByText("Drawer description text")).toBeInTheDocument()
    expect(screen.getByText("Drawer body")).toBeInTheDocument()
  })

  it("has data-slot attributes when open", async () => {
    const user = userEvent.setup()
    renderDrawer()
    await user.click(screen.getByText("Open Drawer"))
    expect(document.querySelector("[data-slot='drawer-content']")).toBeInTheDocument()
    expect(document.querySelector("[data-slot='drawer-header']")).toBeInTheDocument()
    expect(document.querySelector("[data-slot='drawer-title']")).toBeInTheDocument()
    expect(document.querySelector("[data-slot='drawer-description']")).toBeInTheDocument()
    expect(document.querySelector("[data-slot='drawer-footer']")).toBeInTheDocument()
  })

  it("has no accessibility violations when closed", async () => {
    const { container } = renderDrawer()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
