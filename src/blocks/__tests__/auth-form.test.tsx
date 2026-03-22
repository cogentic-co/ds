import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { AuthForm } from "../auth-form"

describe("AuthForm", () => {
  it("renders login form by default", () => {
    render(<AuthForm />)
    expect(screen.getByText("Welcome back")).toBeInTheDocument()
    expect(screen.getByText("Enter your credentials to sign in")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument()
  })

  it("renders register form", () => {
    render(<AuthForm variant="register" />)
    expect(screen.getByText("Create an account")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument()
    expect(screen.getByLabelText("Name")).toBeInTheDocument()
  })

  it("renders forgot-password form", () => {
    render(<AuthForm variant="forgot-password" />)
    expect(screen.getByText("Forgot password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Send reset link" })).toBeInTheDocument()
  })

  it("renders email and password fields for login", () => {
    render(<AuthForm variant="login" />)
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
  })

  it("renders only email field for forgot-password", () => {
    render(<AuthForm variant="forgot-password" />)
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.queryByLabelText("Password")).not.toBeInTheDocument()
  })

  it("renders custom title and description", () => {
    render(<AuthForm title="Custom Title" description="Custom description" />)
    expect(screen.getByText("Custom Title")).toBeInTheDocument()
    expect(screen.getByText("Custom description")).toBeInTheDocument()
  })

  it("renders logo when provided", () => {
    render(<AuthForm logo={<img src="/logo.png" alt="Logo" />} />)
    expect(screen.getByRole("img", { name: "Logo" })).toBeInTheDocument()
  })

  it("shows loading state", () => {
    render(<AuthForm loading />)
    expect(screen.getByRole("button", { name: "Loading..." })).toBeDisabled()
  })

  it("renders social buttons when provided", () => {
    render(<AuthForm socialButtons={<button type="button">Sign in with Google</button>} />)
    expect(screen.getByText("Sign in with Google")).toBeInTheDocument()
    expect(screen.getByText("Or continue with")).toBeInTheDocument()
  })

  it("renders footer when provided", () => {
    render(<AuthForm footer={<span>No account? Sign up</span>} />)
    expect(screen.getByText("No account? Sign up")).toBeInTheDocument()
  })

  it("calls onSubmit with FormData on form submission", async () => {
    const onSubmit = vi.fn()
    render(<AuthForm onSubmit={onSubmit} />)
    const form = screen.getByRole("button", { name: "Sign in" }).closest("form")
    form?.dispatchEvent(new Event("submit", { bubbles: true }))
    expect(onSubmit).toHaveBeenCalledOnce()
  })

  it("uses data-slot attribute", () => {
    const { container } = render(<AuthForm />)
    expect(container.querySelector("[data-slot='auth-form']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<AuthForm className="custom" />)
    expect(container.querySelector("[data-slot='auth-form']")).toHaveClass("custom")
  })

  it("has no accessibility violations for login", async () => {
    const { container } = render(<AuthForm variant="login" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations for register", async () => {
    const { container } = render(<AuthForm variant="register" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations for forgot-password", async () => {
    const { container } = render(<AuthForm variant="forgot-password" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
