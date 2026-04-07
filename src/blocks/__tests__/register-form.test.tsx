import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { RegisterForm } from "../register-form"

describe("RegisterForm", () => {
  it("renders default title and fields", () => {
    render(<RegisterForm onSubmit={() => {}} />)
    expect(screen.getByText("Create an account")).toBeInTheDocument()
    expect(screen.getByLabelText("Name")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
  })

  it("calls onSubmit with values", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<RegisterForm onSubmit={onSubmit} />)
    await user.type(screen.getByLabelText("Name"), "Jane")
    await user.type(screen.getByLabelText("Email"), "jane@example.com")
    await user.type(screen.getByLabelText("Password"), "verysecret")
    await user.click(screen.getByRole("button", { name: /create account/i }))
    expect(onSubmit).toHaveBeenCalledWith({
      name: "Jane",
      email: "jane@example.com",
      password: "verysecret",
    })
  })

  it("merges className", () => {
    const { container } = render(<RegisterForm onSubmit={() => {}} className="cx" />)
    expect(container.querySelector('[data-slot="register-form"]')).toHaveClass("cx")
  })

  it("has no a11y violations", async () => {
    const { container } = render(<RegisterForm onSubmit={() => {}} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
