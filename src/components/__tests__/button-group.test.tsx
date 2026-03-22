import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Button } from "../button"
import { ButtonGroup, ButtonGroupSeparator } from "../button-group"

describe("ButtonGroup", () => {
  it("renders children", () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole("button", { name: "First" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Second" })).toBeInTheDocument()
  })

  it("uses data-slot attribute", () => {
    const { container } = render(
      <ButtonGroup>
        <Button>A</Button>
      </ButtonGroup>,
    )
    expect(container.querySelector("[data-slot='button-group']")).toBeInTheDocument()
  })

  it("has role=group", () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(
      <ButtonGroup className="custom-group">
        <Button>A</Button>
      </ButtonGroup>,
    )
    expect(container.querySelector("[data-slot='button-group']")).toHaveClass("custom-group")
  })

  it("supports horizontal orientation (default)", () => {
    const { container } = render(
      <ButtonGroup orientation="horizontal">
        <Button>A</Button>
      </ButtonGroup>,
    )
    expect(container.querySelector("[data-slot='button-group']")).toHaveAttribute(
      "data-orientation",
      "horizontal",
    )
  })

  it("supports vertical orientation", () => {
    const { container } = render(
      <ButtonGroup orientation="vertical">
        <Button>A</Button>
      </ButtonGroup>,
    )
    expect(container.querySelector("[data-slot='button-group']")).toHaveAttribute(
      "data-orientation",
      "vertical",
    )
  })

  it("renders separator", () => {
    const { container } = render(
      <ButtonGroup>
        <Button>A</Button>
        <ButtonGroupSeparator />
        <Button>B</Button>
      </ButtonGroup>,
    )
    expect(container.querySelector("[data-slot='button-group-separator']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Save</Button>
        <Button>Cancel</Button>
      </ButtonGroup>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
