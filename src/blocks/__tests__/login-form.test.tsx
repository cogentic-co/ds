import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { LoginForm } from "../login-form"

describe("LoginForm", () => {
  it("renders default title and fields", () => {
    render(<LoginForm onSubmit={() => {}} />)
    expect(screen.getByText("Welcome back")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
  })

  it("calls onSubmit with parsed values", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)
    await user.type(screen.getByLabelText("Email"), "a@b.co")
    await user.type(screen.getByLabelText("Password"), "secret")
    await user.click(screen.getByRole("button", { name: /sign in/i }))
    expect(onSubmit).toHaveBeenCalledWith({ email: "a@b.co", password: "secret" })
  })

  it("shows forgot password link when href provided", () => {
    render(<LoginForm onSubmit={() => {}} forgotPasswordHref="/forgot" />)
    expect(screen.getByText("Forgot password?")).toHaveAttribute("href", "/forgot")
  })

  it("merges className", () => {
    const { container } = render(<LoginForm onSubmit={() => {}} className="custom-class" />)
    expect(container.querySelector('[data-slot="login-form"]')).toHaveClass("custom-class")
  })

  it("has no a11y violations", async () => {
    const { container } = render(<LoginForm onSubmit={() => {}} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
