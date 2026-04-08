import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { SettingRow } from "../setting-row"

describe("SettingRow", () => {
  it("renders title", () => {
    render(<SettingRow title="Email notifications" />)
    expect(screen.getByText("Email notifications")).toBeInTheDocument()
  })

  it("renders description when provided", () => {
    render(
      <SettingRow title="Email notifications" description="Get notified when threads update" />,
    )
    expect(screen.getByText("Get notified when threads update")).toBeInTheDocument()
  })

  it("renders icon when provided", () => {
    const { container } = render(
      <SettingRow icon={<span data-testid="bell-icon" />} title="Email notifications" />,
    )
    expect(container.querySelector('[data-slot="setting-row-icon"]')).toBeInTheDocument()
  })

  it("renders action when provided", () => {
    const { container } = render(
      <SettingRow title="Notifications" action={<button type="button">Toggle</button>} />,
    )
    expect(container.querySelector('[data-slot="setting-row-action"]')).toBeInTheDocument()
  })

  it("merges className", () => {
    const { container } = render(<SettingRow title="Test" className="custom-class" />)
    expect(container.querySelector('[data-slot="setting-row"]')).toHaveClass("custom-class")
  })

  it("has no a11y violations", async () => {
    const { container } = render(
      <SettingRow title="Email notifications" description="Get notified when threads update" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
