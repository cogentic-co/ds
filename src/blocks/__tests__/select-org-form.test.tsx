import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { SelectOrgForm } from "../select-org-form"

const orgs = [
  { id: "acme", name: "Acme Inc.", role: "Owner", memberCount: 5 },
  { id: "globex", name: "Globex", role: "Admin", memberCount: 12 },
]

describe("SelectOrgForm", () => {
  it("renders org names in list variant", () => {
    render(<SelectOrgForm organizations={orgs} onSubmit={() => {}} />)
    expect(screen.getByText("Acme Inc.")).toBeInTheDocument()
    expect(screen.getByText("Globex")).toBeInTheDocument()
  })

  it("submits the selected org id", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<SelectOrgForm organizations={orgs} onSubmit={onSubmit} />)
    await user.click(screen.getByText("Acme Inc."))
    await user.click(screen.getByRole("button", { name: /continue/i }))
    expect(onSubmit).toHaveBeenCalledWith({ organizationId: "acme" })
  })

  it("merges className", () => {
    const { container } = render(
      <SelectOrgForm organizations={orgs} onSubmit={() => {}} className="cx" />,
    )
    expect(container.querySelector('[data-slot="select-org-form"]')).toHaveClass("cx")
  })

  it("has no a11y violations", async () => {
    const { container } = render(<SelectOrgForm organizations={orgs} onSubmit={() => {}} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
