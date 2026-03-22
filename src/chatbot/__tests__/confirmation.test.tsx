import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
} from "../confirmation"

describe("Confirmation", () => {
  it("renders with role=alert", () => {
    render(
      <Confirmation>
        <ConfirmationRequest title="Approve action?" />
      </Confirmation>,
    )
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("renders request with title and description", () => {
    render(
      <Confirmation>
        <ConfirmationRequest title="Delete file?" description="This cannot be undone" />
      </Confirmation>,
    )
    expect(screen.getByText("Delete file?")).toBeInTheDocument()
    expect(screen.getByText("This cannot be undone")).toBeInTheDocument()
  })

  it("renders accepted state", () => {
    render(
      <Confirmation status="accepted">
        <ConfirmationAccepted />
      </Confirmation>,
    )
    expect(screen.getByText("Approved")).toBeInTheDocument()
  })

  it("renders rejected state", () => {
    render(
      <Confirmation status="rejected">
        <ConfirmationRejected />
      </Confirmation>,
    )
    expect(screen.getByText("Rejected")).toBeInTheDocument()
  })

  it("renders action buttons", async () => {
    const user = userEvent.setup()
    const onApprove = vi.fn()
    render(
      <Confirmation>
        <ConfirmationRequest title="Approve?" />
        <ConfirmationActions>
          <ConfirmationAction onClick={onApprove}>Approve</ConfirmationAction>
          <ConfirmationAction variant="destructive">Deny</ConfirmationAction>
        </ConfirmationActions>
      </Confirmation>,
    )
    await user.click(screen.getByRole("button", { name: "Approve" }))
    expect(onApprove).toHaveBeenCalledOnce()
  })

  it("uses data-status attribute", () => {
    const { container } = render(
      <Confirmation status="accepted">
        <ConfirmationAccepted />
      </Confirmation>,
    )
    expect(container.querySelector("[data-status='accepted']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Confirmation>
        <ConfirmationRequest title="Approve action?" description="Confirm this" />
        <ConfirmationActions>
          <ConfirmationAction>Approve</ConfirmationAction>
          <ConfirmationAction variant="destructive">Deny</ConfirmationAction>
        </ConfirmationActions>
      </Confirmation>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
