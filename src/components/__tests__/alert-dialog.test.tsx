import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog"

function renderAlertDialog({ contentClassName }: { contentClassName?: string } = {}) {
  return render(
    <AlertDialog>
      <AlertDialogTrigger>Delete Item</AlertDialogTrigger>
      <AlertDialogContent className={contentClassName}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>,
  )
}

describe("AlertDialog", () => {
  it("renders trigger correctly", () => {
    renderAlertDialog()
    expect(screen.getByRole("button", { name: "Delete Item" })).toBeInTheDocument()
  })

  it("does not show content when closed", () => {
    renderAlertDialog()
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument()
  })

  it("opens on click and shows content", async () => {
    const user = userEvent.setup()
    renderAlertDialog()
    await user.click(screen.getByRole("button", { name: "Delete Item" }))
    expect(screen.getByText("Are you sure?")).toBeInTheDocument()
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument()
  })

  it("shows action and cancel buttons when open", async () => {
    const user = userEvent.setup()
    renderAlertDialog()
    await user.click(screen.getByRole("button", { name: "Delete Item" }))
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
  })

  it("closes when cancel is clicked", async () => {
    const user = userEvent.setup()
    renderAlertDialog()
    await user.click(screen.getByRole("button", { name: "Delete Item" }))
    expect(screen.getByText("Are you sure?")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Cancel" }))
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument()
  })

  it("merges custom className on content", async () => {
    const user = userEvent.setup()
    renderAlertDialog({ contentClassName: "custom-alert-class" })
    await user.click(screen.getByRole("button", { name: "Delete Item" }))
    const content = document.querySelector('[data-slot="alert-dialog-content"]')
    expect(content).toHaveClass("custom-alert-class")
  })

  it("has no accessibility violations when closed", async () => {
    const { container } = renderAlertDialog()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup()
    const { container } = renderAlertDialog()
    await user.click(screen.getByRole("button", { name: "Delete Item" }))
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
