import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { RichRadioList } from "../rich-radio-list"

const options = [
  {
    value: "owner",
    title: "Owner",
    description: "Has full access to everything",
  },
  {
    value: "admin",
    title: "Admin",
    description: "Has access to everything except billing",
  },
  {
    value: "viewer",
    title: "Viewer",
    description: "Can view threads but not modify them",
  },
]

describe("RichRadioList", () => {
  it("renders each option title", () => {
    render(<RichRadioList options={options} aria-label="Role" />)
    expect(screen.getByText("Owner")).toBeInTheDocument()
    expect(screen.getByText("Admin")).toBeInTheDocument()
    expect(screen.getByText("Viewer")).toBeInTheDocument()
  })

  it("renders descriptions", () => {
    render(<RichRadioList options={options} aria-label="Role" />)
    expect(screen.getByText("Has full access to everything")).toBeInTheDocument()
  })

  it("calls onValueChange when an option is selected", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<RichRadioList options={options} onValueChange={onValueChange} aria-label="Role" />)
    await user.click(screen.getByText("Admin"))
    // Base UI passes (value, event) — assert the first argument only
    expect(onValueChange).toHaveBeenCalledWith("admin", expect.anything())
  })

  it("respects defaultValue", () => {
    render(<RichRadioList options={options} defaultValue="viewer" aria-label="Role" />)
    const viewerRadio = screen.getByRole("radio", { name: /Viewer/ })
    expect(viewerRadio).toHaveAttribute("data-checked")
  })

  it("does not fire onValueChange for disabled options", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const withDisabled = [
      ...options,
      { value: "deactivated", title: "Deactivated", disabled: true },
    ]
    render(<RichRadioList options={withDisabled} onValueChange={onValueChange} aria-label="Role" />)
    await user.click(screen.getByText("Deactivated"))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it("merges className", () => {
    const { container } = render(
      <RichRadioList options={options} className="custom-class" aria-label="Role" />,
    )
    expect(container.querySelector('[data-slot="card"]')).toHaveClass("custom-class")
  })

  it("has no a11y violations", async () => {
    const { container } = render(<RichRadioList options={options} aria-label="Role" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
