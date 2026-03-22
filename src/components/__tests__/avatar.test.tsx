import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../avatar"

describe("Avatar", () => {
  it("renders with data-slot attribute", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JC</AvatarFallback>
      </Avatar>,
    )
    expect(container.querySelector("[data-slot='avatar']")).toBeInTheDocument()
  })

  it("renders fallback text", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    )
    expect(screen.getByText("AB")).toBeInTheDocument()
  })

  it("merges custom className on Avatar", () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>X</AvatarFallback>
      </Avatar>,
    )
    expect(container.querySelector("[data-slot='avatar']")).toHaveClass("custom-avatar")
  })

  it("supports size prop", () => {
    const { container } = render(
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>,
    )
    expect(container.querySelector("[data-slot='avatar']")).toHaveAttribute("data-size", "lg")
  })

  it("defaults to default size", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>D</AvatarFallback>
      </Avatar>,
    )
    expect(container.querySelector("[data-slot='avatar']")).toHaveAttribute("data-size", "default")
  })

  it("renders AvatarImage with data-slot", () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test" />
        <AvatarFallback>T</AvatarFallback>
      </Avatar>,
    )
    expect(container.querySelector("[data-slot='avatar-image']")).toBeInTheDocument()
  })

  it("renders AvatarBadge with data-slot", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>B</AvatarFallback>
        <AvatarBadge />
      </Avatar>,
    )
    expect(container.querySelector("[data-slot='avatar-badge']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="User avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe("AvatarGroup", () => {
  it("renders with data-slot attribute", () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    )
    expect(container.querySelector("[data-slot='avatar-group']")).toBeInTheDocument()
  })

  it("renders AvatarGroupCount", () => {
    const { container } = render(
      <AvatarGroup>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>,
    )
    expect(container.querySelector("[data-slot='avatar-group-count']")).toBeInTheDocument()
    expect(screen.getByText("+3")).toBeInTheDocument()
  })
})
