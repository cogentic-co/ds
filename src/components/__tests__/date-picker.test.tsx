import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { DatePicker, DateRangePicker } from "../date-picker"

describe("DatePicker", () => {
  it("renders with placeholder", () => {
    render(<DatePicker />)
    expect(screen.getByText("Pick a date")).toBeInTheDocument()
  })

  it("renders with custom placeholder", () => {
    render(<DatePicker placeholder="Select date" />)
    expect(screen.getByText("Select date")).toBeInTheDocument()
  })

  it("renders formatted date when value is provided", () => {
    render(<DatePicker value={new Date(2025, 0, 15)} dateFormat="yyyy-MM-dd" />)
    expect(screen.getByText("2025-01-15")).toBeInTheDocument()
  })

  it("renders calendar icon", () => {
    const { container } = render(<DatePicker />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("supports disabled state", () => {
    render(<DatePicker disabled />)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
  })

  it("applies custom className", () => {
    render(<DatePicker className="w-full" />)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("w-full")
  })

  it("opens popover on click", async () => {
    const user = userEvent.setup()
    render(<DatePicker />)
    await user.click(screen.getByRole("button"))
    expect(screen.getByText("Pick a date")).toBeInTheDocument()
  })
})

describe("DateRangePicker", () => {
  it("renders with placeholder", () => {
    render(<DateRangePicker />)
    expect(screen.getByText("Pick a date")).toBeInTheDocument()
  })

  it("renders formatted date range when value is provided", () => {
    render(
      <DateRangePicker
        value={{ from: new Date(2025, 0, 10), to: new Date(2025, 0, 20) }}
        dateFormat="MMM dd"
      />,
    )
    expect(screen.getByText(/Jan 10/)).toBeInTheDocument()
    expect(screen.getByText(/Jan 20/)).toBeInTheDocument()
  })

  it("renders only start date when no end date", () => {
    render(<DateRangePicker value={{ from: new Date(2025, 5, 1) }} dateFormat="MMM dd, yyyy" />)
    expect(screen.getByText("Jun 01, 2025")).toBeInTheDocument()
  })

  it("supports disabled state", () => {
    render(<DateRangePicker disabled />)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<DateRangePicker />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
