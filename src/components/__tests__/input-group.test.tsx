import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../input-group"

describe("InputGroup", () => {
  it("renders input group with input", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Enter text" />
      </InputGroup>,
    )
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <InputGroup>
        <InputGroupAddon>Prefix</InputGroupAddon>
        <InputGroupInput placeholder="Test" />
      </InputGroup>,
    )
    expect(container.querySelector("[data-slot='input-group']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='input-group-addon']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='input-group-control']")).toBeInTheDocument()
  })

  it("merges custom className on root", () => {
    const { container } = render(
      <InputGroup className="custom-group">
        <InputGroupInput placeholder="Test" />
      </InputGroup>,
    )
    expect(container.querySelector("[data-slot='input-group']")).toHaveClass("custom-group")
  })

  it("has role=group on root", () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="Input" placeholder="Test" />
      </InputGroup>,
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("renders addon with different alignments", () => {
    const { container } = render(
      <InputGroup>
        <InputGroupAddon align="inline-start">Start</InputGroupAddon>
        <InputGroupInput placeholder="Test" />
        <InputGroupAddon align="inline-end">End</InputGroupAddon>
      </InputGroup>,
    )
    const addons = container.querySelectorAll("[data-slot='input-group-addon']")
    expect(addons[0]).toHaveAttribute("data-align", "inline-start")
    expect(addons[1]).toHaveAttribute("data-align", "inline-end")
  })

  it("renders InputGroupButton", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Go</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>,
    )
    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument()
  })

  it("renders InputGroupText", () => {
    render(
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Amount" />
      </InputGroup>,
    )
    expect(screen.getByText("$")).toBeInTheDocument()
  })

  it("renders InputGroupTextarea", () => {
    render(
      <InputGroup>
        <InputGroupTextarea placeholder="Enter message" />
      </InputGroup>,
    )
    expect(screen.getByPlaceholderText("Enter message")).toBeInTheDocument()
  })

  it("handles user input in InputGroupInput", async () => {
    const user = userEvent.setup()
    render(
      <InputGroup>
        <InputGroupInput placeholder="Type here" />
      </InputGroup>,
    )
    await user.type(screen.getByPlaceholderText("Type here"), "hello")
    expect(screen.getByPlaceholderText("Type here")).toHaveValue("hello")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>Label</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput aria-label="Input field" placeholder="Enter text" />
      </InputGroup>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
