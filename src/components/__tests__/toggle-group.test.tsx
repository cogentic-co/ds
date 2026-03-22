import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { ToggleGroup, ToggleGroupItem } from "../toggle-group"

describe("ToggleGroup", () => {
  it("renders with data-slot attribute", () => {
    const { container } = render(
      <ToggleGroup>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(container.querySelector("[data-slot='toggle-group']")).toBeInTheDocument()
  })

  it("renders toggle group items", () => {
    render(
      <ToggleGroup>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByText("Bold")).toBeInTheDocument()
    expect(screen.getByText("Italic")).toBeInTheDocument()
  })

  it("merges custom className on ToggleGroup", () => {
    const { container } = render(
      <ToggleGroup className="custom-group">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(container.querySelector("[data-slot='toggle-group']")).toHaveClass("custom-group")
  })

  it("renders items with data-slot attribute", () => {
    const { container } = render(
      <ToggleGroup>
        <ToggleGroupItem value="x">X</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(container.querySelector("[data-slot='toggle-group-item']")).toBeInTheDocument()
  })

  it("supports variant prop", () => {
    const { container } = render(
      <ToggleGroup variant="outline">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(container.querySelector("[data-slot='toggle-group']")).toHaveAttribute(
      "data-variant",
      "outline",
    )
  })

  it("supports size prop", () => {
    const { container } = render(
      <ToggleGroup size="sm">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(container.querySelector("[data-slot='toggle-group']")).toHaveAttribute("data-size", "sm")
  })

  it("supports vertical orientation", () => {
    const { container } = render(
      <ToggleGroup orientation="vertical">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(container.querySelector("[data-slot='toggle-group']")).toHaveAttribute(
      "data-orientation",
      "vertical",
    )
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ToggleGroup aria-label="Text formatting">
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
      </ToggleGroup>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
