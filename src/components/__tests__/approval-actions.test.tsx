import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { ApprovalActions } from "../approval-actions"

describe("ApprovalActions", () => {
  it("renders all three action buttons", () => {
    render(<ApprovalActions onApprove={vi.fn()} onReject={vi.fn()} onEscalate={vi.fn()} />)
    expect(screen.getByRole("button", { name: /approve/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /reject/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /escalate/i })).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ApprovalActions onApprove={vi.fn()} onReject={vi.fn()} onEscalate={vi.fn()} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has data-slot attribute", () => {
    const { container } = render(
      <ApprovalActions onApprove={vi.fn()} onReject={vi.fn()} onEscalate={vi.fn()} />,
    )
    expect(container.querySelector('[data-slot="approval-actions"]')).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(
      <ApprovalActions
        onApprove={vi.fn()}
        onReject={vi.fn()}
        onEscalate={vi.fn()}
        className="custom-class"
      />,
    )
    expect(container.querySelector('[data-slot="approval-actions"]')).toHaveClass("custom-class")
  })

  it("shows disabled state", () => {
    render(<ApprovalActions onApprove={vi.fn()} onReject={vi.fn()} onEscalate={vi.fn()} disabled />)
    for (const button of screen.getAllByRole("button")) {
      expect(button).toBeDisabled()
    }
  })

  it("calls onApprove directly when reason not required", async () => {
    const user = userEvent.setup()
    const onApprove = vi.fn()
    render(<ApprovalActions onApprove={onApprove} />)

    await user.click(screen.getByRole("button", { name: /approve/i }))

    expect(onApprove).toHaveBeenCalledOnce()
  })
})
