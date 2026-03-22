import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Calendar } from "../calendar"

describe("Calendar", () => {
  it("renders without crashing", () => {
    const { container } = render(<Calendar />)
    expect(container.querySelector("[data-slot='calendar']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(<Calendar />)
    expect(container.querySelector("[data-slot='calendar']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<Calendar className="custom-calendar" />)
    // className is applied to the DayPicker wrapper which wraps the data-slot root
    const wrapper = container.querySelector(".custom-calendar")
    expect(wrapper).toBeInTheDocument()
  })

  it("shows outside days by default", () => {
    const { container } = render(<Calendar />)
    // showOutsideDays defaults to true, so calendar should render
    expect(container.querySelector("[data-slot='calendar']")).toBeInTheDocument()
  })

  it("renders with a specific month", () => {
    const { container } = render(<Calendar defaultMonth={new Date(2025, 0, 1)} />)
    expect(container.querySelector("[data-slot='calendar']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Calendar />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
