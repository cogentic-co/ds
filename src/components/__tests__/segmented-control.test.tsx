import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { SegmentedControl } from "../segmented-control"

const options = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
]

describe("SegmentedControl", () => {
  it("renders without crashing", () => {
    const { container } = render(<SegmentedControl options={options} />)
    expect(container.querySelector("[data-slot='segmented-control']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<SegmentedControl options={options} />)
    expect(container.querySelector("[data-slot='segmented-control']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<SegmentedControl options={options} className="custom-seg" />)
    expect(container.querySelector("[data-slot='segmented-control']")).toHaveClass("custom-seg")
  })

  it("renders all options", () => {
    render(<SegmentedControl options={options} />)
    expect(screen.getByText("Daily")).toBeInTheDocument()
    expect(screen.getByText("Weekly")).toBeInTheDocument()
    expect(screen.getByText("Monthly")).toBeInTheDocument()
  })

  it("has radiogroup role", () => {
    render(<SegmentedControl options={options} />)
    expect(screen.getByRole("radiogroup")).toBeInTheDocument()
  })

  it("renders radio buttons", () => {
    render(<SegmentedControl options={options} />)
    expect(screen.getAllByRole("radio")).toHaveLength(3)
  })

  it("first option is selected by default", () => {
    render(<SegmentedControl options={options} />)
    expect(screen.getByRole("radio", { name: "Daily" })).toHaveAttribute("aria-checked", "true")
  })

  it("selects defaultValue option", () => {
    render(<SegmentedControl options={options} defaultValue="weekly" />)
    expect(screen.getByRole("radio", { name: "Weekly" })).toHaveAttribute("aria-checked", "true")
  })

  it("calls onChange when option is clicked", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SegmentedControl options={options} onChange={onChange} />)
    await user.click(screen.getByRole("radio", { name: "Monthly" }))
    expect(onChange).toHaveBeenCalledWith("monthly")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<SegmentedControl options={options} aria-label="Time range" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
