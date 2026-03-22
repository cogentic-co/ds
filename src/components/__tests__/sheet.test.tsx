import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet"

function renderSheet({ side }: { side?: "top" | "right" | "bottom" | "left" } = {}) {
  return render(
    <Sheet>
      <SheetTrigger>Open Sheet</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet description text</SheetDescription>
        </SheetHeader>
        <p>Sheet body</p>
        <SheetFooter>Footer content</SheetFooter>
      </SheetContent>
    </Sheet>,
  )
}

describe("Sheet", () => {
  it("renders trigger correctly", () => {
    renderSheet()
    expect(screen.getByText("Open Sheet")).toBeInTheDocument()
  })

  it("does not show content when closed", () => {
    renderSheet()
    expect(screen.queryByText("Sheet Title")).not.toBeInTheDocument()
  })

  it("opens on click and shows content", async () => {
    const user = userEvent.setup()
    renderSheet()
    await user.click(screen.getByText("Open Sheet"))
    expect(screen.getByText("Sheet Title")).toBeInTheDocument()
    expect(screen.getByText("Sheet description text")).toBeInTheDocument()
    expect(screen.getByText("Sheet body")).toBeInTheDocument()
  })

  it("has data-slot attributes when open", async () => {
    const user = userEvent.setup()
    renderSheet()
    await user.click(screen.getByText("Open Sheet"))
    expect(document.querySelector("[data-slot='sheet-content']")).toBeInTheDocument()
    expect(document.querySelector("[data-slot='sheet-header']")).toBeInTheDocument()
    expect(document.querySelector("[data-slot='sheet-title']")).toBeInTheDocument()
    expect(document.querySelector("[data-slot='sheet-description']")).toBeInTheDocument()
    expect(document.querySelector("[data-slot='sheet-footer']")).toBeInTheDocument()
  })

  it("shows close button when open", async () => {
    const user = userEvent.setup()
    renderSheet()
    await user.click(screen.getByText("Open Sheet"))
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument()
  })

  it("renders with right side by default", async () => {
    const user = userEvent.setup()
    renderSheet()
    await user.click(screen.getByText("Open Sheet"))
    const content = document.querySelector("[data-slot='sheet-content']")
    expect(content).toHaveAttribute("data-side", "right")
  })

  it("renders with specified side", async () => {
    const user = userEvent.setup()
    renderSheet({ side: "left" })
    await user.click(screen.getByText("Open Sheet"))
    const content = document.querySelector("[data-slot='sheet-content']")
    expect(content).toHaveAttribute("data-side", "left")
  })

  it("has no accessibility violations when closed", async () => {
    const { container } = renderSheet()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
