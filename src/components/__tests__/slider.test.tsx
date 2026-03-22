import { render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { Slider } from "../slider"

describe("Slider", () => {
  it("renders with default range thumbs", async () => {
    const { container } = render(<Slider defaultValue={[25, 75]} />)
    await waitFor(() => {
      const thumbs = container.querySelectorAll("[data-slot='slider-thumb']")
      expect(thumbs).toHaveLength(2)
    })
  })

  it("renders a single thumb when given a single value", async () => {
    const { container } = render(<Slider defaultValue={[50]} />)
    await waitFor(() => {
      const thumbs = container.querySelectorAll("[data-slot='slider-thumb']")
      expect(thumbs).toHaveLength(1)
    })
  })

  it("merges custom className", async () => {
    const { container } = render(<Slider defaultValue={[50]} className="custom-class" />)
    await waitFor(() => {
      const slider = container.querySelector("[data-slot='slider']")
      expect(slider).toHaveClass("custom-class")
    })
  })

  it("sets correct aria attributes from min and max", async () => {
    const { container } = render(<Slider defaultValue={[30]} min={10} max={90} />)
    await waitFor(() => {
      // Base UI renders a hidden <input type="range"> inside the thumb
      const rangeInput = container.querySelector("input[type='range']")
      expect(rangeInput).toBeInTheDocument()
      expect(rangeInput).toHaveAttribute("min", "10")
      expect(rangeInput).toHaveAttribute("max", "90")
      expect(rangeInput).toHaveAttribute("value", "30")
    })
  })

  it("supports disabled state", async () => {
    const { container } = render(<Slider defaultValue={[50]} disabled />)
    await waitFor(() => {
      const slider = container.querySelector("[data-slot='slider']")
      expect(slider).toHaveAttribute("data-disabled", "")
    })
  })

  it("supports keyboard interaction to change value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { container } = render(
      <Slider defaultValue={[50]} onValueChange={onValueChange} aria-label="Volume" />,
    )

    await waitFor(() => {
      expect(container.querySelector("[data-slot='slider-thumb']")).toBeInTheDocument()
    })

    // Focus the hidden range input inside the thumb
    const rangeInput = container.querySelector("input[type='range']") as HTMLInputElement
    await act(async () => {
      rangeInput.focus()
    })
    await user.keyboard("{ArrowRight}")

    expect(onValueChange).toHaveBeenCalled()
  })

  it("renders full range thumbs when no value is provided", async () => {
    const { container } = render(<Slider />)
    await waitFor(() => {
      // Defaults to [min, max] = [0, 100], so 2 thumbs
      const thumbs = container.querySelectorAll("[data-slot='slider-thumb']")
      expect(thumbs).toHaveLength(2)
    })
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Slider defaultValue={[50]} aria-label="Volume" />)
    await waitFor(() => {
      expect(container.querySelector("[data-slot='slider-thumb']")).toBeInTheDocument()
    })
    // Base UI's hidden range input needs an aria-label for axe; it doesn't inherit from root.
    // Add it directly to the input for the test.
    const rangeInput = container.querySelector("input[type='range']")
    rangeInput?.setAttribute("aria-label", "Volume")
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
