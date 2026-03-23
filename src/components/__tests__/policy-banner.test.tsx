import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { PolicyBanner } from "../policy-banner"

describe("PolicyBanner", () => {
  it("renders without crashing", () => {
    render(<PolicyBanner>Test message</PolicyBanner>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(screen.getByText("Test message")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<PolicyBanner>Accessible banner</PolicyBanner>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("applies variant classes", () => {
    const { rerender } = render(<PolicyBanner variant="info">Info</PolicyBanner>)
    expect(screen.getByRole("alert")).toHaveClass("bg-blue-50")

    rerender(<PolicyBanner variant="warning">Warning</PolicyBanner>)
    expect(screen.getByRole("alert")).toHaveClass("bg-amber-50")

    rerender(<PolicyBanner variant="critical">Critical</PolicyBanner>)
    expect(screen.getByRole("alert")).toHaveClass("bg-red-50")
  })

  it("renders icon when provided", () => {
    render(<PolicyBanner icon={<span data-testid="icon">!</span>}>Message</PolicyBanner>)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("renders action when provided", () => {
    render(<PolicyBanner action={<button type="button">Accept</button>}>Message</PolicyBanner>)
    expect(screen.getByRole("button", { name: "Accept" })).toBeInTheDocument()
  })

  it("can be dismissed", async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<PolicyBanner onDismiss={onDismiss}>Dismissible</PolicyBanner>)
    await user.click(screen.getByRole("button", { name: "Dismiss" }))
    expect(onDismiss).toHaveBeenCalledOnce()
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
  })

  it("hides dismiss button when dismissible is false", () => {
    render(<PolicyBanner dismissible={false}>Non-dismissible</PolicyBanner>)
    expect(screen.queryByRole("button", { name: "Dismiss" })).not.toBeInTheDocument()
  })

  it("merges custom className", () => {
    render(<PolicyBanner className="my-4">Message</PolicyBanner>)
    expect(screen.getByRole("alert")).toHaveClass("my-4")
  })

  it("has data-slot attribute", () => {
    render(<PolicyBanner>Message</PolicyBanner>)
    expect(screen.getByRole("alert")).toHaveAttribute("data-slot", "policy-banner")
  })
})
