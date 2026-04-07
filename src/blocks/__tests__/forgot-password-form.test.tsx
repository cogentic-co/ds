import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { ForgotPasswordForm } from "../forgot-password-form"

describe("ForgotPasswordForm", () => {
  it("renders title and email field", () => {
    render(<ForgotPasswordForm onSubmit={() => {}} />)
    expect(screen.getByText("Forgot password")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
  })

  it("submits with email", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ForgotPasswordForm onSubmit={onSubmit} />)
    await user.type(screen.getByLabelText("Email"), "a@b.co")
    await user.click(screen.getByRole("button", { name: /send reset link/i }))
    expect(onSubmit).toHaveBeenCalledWith({ email: "a@b.co" })
  })

  it("merges className", () => {
    const { container } = render(<ForgotPasswordForm onSubmit={() => {}} className="cx" />)
    expect(container.querySelector('[data-slot="forgot-password-form"]')).toHaveClass("cx")
  })

  it("has no a11y violations", async () => {
    const { container } = render(<ForgotPasswordForm onSubmit={() => {}} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
