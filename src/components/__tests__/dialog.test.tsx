import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog"

function renderDialog({ contentClassName }: { contentClassName?: string } = {}) {
  return render(
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent className={contentClassName}>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description text</DialogDescription>
        </DialogHeader>
        <p>Dialog body content</p>
      </DialogContent>
    </Dialog>,
  )
}

describe("Dialog", () => {
  it("renders trigger correctly", () => {
    renderDialog()
    expect(screen.getByRole("button", { name: "Open Dialog" })).toBeInTheDocument()
  })

  it("does not show content when closed", () => {
    renderDialog()
    expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument()
  })

  it("opens on click and shows content", async () => {
    const user = userEvent.setup()
    renderDialog()
    await user.click(screen.getByRole("button", { name: "Open Dialog" }))
    expect(screen.getByText("Dialog Title")).toBeInTheDocument()
    expect(screen.getByText("Dialog description text")).toBeInTheDocument()
    expect(screen.getByText("Dialog body content")).toBeInTheDocument()
  })

  it("shows close button when open", async () => {
    const user = userEvent.setup()
    renderDialog()
    await user.click(screen.getByRole("button", { name: "Open Dialog" }))
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument()
  })

  it("closes when close button is clicked", async () => {
    const user = userEvent.setup()
    renderDialog()
    await user.click(screen.getByRole("button", { name: "Open Dialog" }))
    expect(screen.getByText("Dialog Title")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Close" }))
    expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument()
  })

  it("merges custom className on content", async () => {
    const user = userEvent.setup()
    renderDialog({ contentClassName: "custom-dialog-class" })
    await user.click(screen.getByRole("button", { name: "Open Dialog" }))
    const content = document.querySelector('[data-slot="dialog-content"]')
    expect(content).toHaveClass("custom-dialog-class")
  })

  it("has no accessibility violations when closed", async () => {
    const { container } = renderDialog()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup()
    const { container } = renderDialog()
    await user.click(screen.getByRole("button", { name: "Open Dialog" }))
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
