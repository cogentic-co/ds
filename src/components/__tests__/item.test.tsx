import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "../item"

describe("Item", () => {
  it("renders item with all sub-components", () => {
    render(
      <Item>
        <ItemMedia>M</ItemMedia>
        <ItemContent>
          <ItemTitle>Title</ItemTitle>
          <ItemDescription>Description</ItemDescription>
        </ItemContent>
        <ItemActions>
          <button type="button">Action</button>
        </ItemActions>
      </Item>,
    )
    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Description")).toBeInTheDocument()
    expect(screen.getByText("Action")).toBeInTheDocument()
  })

  it("renders header and footer", () => {
    render(
      <Item>
        <ItemHeader>Header</ItemHeader>
        <ItemContent>
          <ItemTitle>Title</ItemTitle>
        </ItemContent>
        <ItemFooter>Footer</ItemFooter>
      </Item>,
    )
    expect(screen.getByText("Header")).toBeInTheDocument()
    expect(screen.getByText("Footer")).toBeInTheDocument()
  })

  it("merges custom className on Item", () => {
    const { container } = render(<Item className="custom-item">Content</Item>)
    expect(container.querySelector("[data-slot='item']")).toHaveClass("custom-item")
  })

  it("applies variant classes", () => {
    const { container } = render(<Item variant="outline">Content</Item>)
    const el = container.querySelector("[data-slot='item']")
    expect(el).toHaveClass("border-border")
  })

  it("applies muted variant", () => {
    const { container } = render(<Item variant="muted">Content</Item>)
    const el = container.querySelector("[data-slot='item']")
    expect(el).toHaveClass("bg-muted/50")
  })

  it("applies size classes", () => {
    const { container } = render(<Item size="sm">Content</Item>)
    const el = container.querySelector("[data-slot='item']")
    expect(el).toHaveClass("gap-2.5")
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Item>
        <ItemMedia>M</ItemMedia>
        <ItemContent>
          <ItemTitle>Title</ItemTitle>
          <ItemDescription>Desc</ItemDescription>
        </ItemContent>
        <ItemActions>Actions</ItemActions>
      </Item>,
    )
    expect(container.querySelector("[data-slot='item']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='item-media']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='item-content']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='item-title']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='item-description']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='item-actions']")).toBeInTheDocument()
  })

  it("renders ItemGroup with list role", () => {
    const { container } = render(
      <ItemGroup>
        <Item>One</Item>
        <ItemSeparator />
        <Item>Two</Item>
      </ItemGroup>,
    )
    expect(container.querySelector("[role='list']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='item-separator']")).toBeInTheDocument()
  })

  it("applies media variant classes", () => {
    const { container } = render(
      <Item>
        <ItemMedia variant="icon">Icon</ItemMedia>
      </Item>,
    )
    const media = container.querySelector("[data-slot='item-media']")
    expect(media).toHaveAttribute("data-variant", "icon")
  })

  it("renders as link via render prop", () => {
    const { container } = render(
      <Item render={<a href="/test" />}>
        <ItemContent>
          <ItemTitle>Link Item</ItemTitle>
        </ItemContent>
      </Item>,
    )
    const link = container.querySelector("a[data-slot='item']")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")
  })

  it("has no accessibility violations (standalone)", async () => {
    const { container } = render(
      <Item>
        <ItemMedia variant="icon">M</ItemMedia>
        <ItemContent>
          <ItemTitle>Title</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
        <ItemActions>
          <button type="button">Action</button>
        </ItemActions>
      </Item>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations (in group)", async () => {
    const { container } = render(
      <ItemGroup>
        <Item role="listitem">
          <ItemContent>
            <ItemTitle>First</ItemTitle>
          </ItemContent>
        </Item>
        <Item role="listitem">
          <ItemContent>
            <ItemTitle>Second</ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
