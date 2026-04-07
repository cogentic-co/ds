import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { MagicLinkMessage } from "../magic-link-message"

describe("MagicLinkMessage", () => {
  it("renders the email", () => {
    render(<MagicLinkMessage email="user@example.com" />)
    expect(screen.getByText("Check your email")).toBeInTheDocument()
    expect(screen.getByText("user@example.com")).toBeInTheDocument()
  })

  it("calls onResend when clicked", async () => {
    const user = userEvent.setup()
    const onResend = vi.fn()
    render(<MagicLinkMessage email="user@example.com" onResend={onResend} />)
    await user.click(screen.getByRole("button", { name: /resend/i }))
    expect(onResend).toHaveBeenCalled()
  })

  it("renders back link when onBack provided", () => {
    render(<MagicLinkMessage email="user@example.com" onBack={() => {}} />)
    expect(screen.getByText("Use a different email")).toBeInTheDocument()
  })

  it("merges className", () => {
    const { container } = render(<MagicLinkMessage email="user@example.com" className="cx" />)
    expect(container.querySelector('[data-slot="magic-link-message"]')).toHaveClass("cx")
  })

  it("has no a11y violations", async () => {
    const { container } = render(<MagicLinkMessage email="user@example.com" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
