import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Large,
  Lead,
  List,
  Muted,
  P,
  Prose,
  Small,
} from "../typography"

describe("Typography headings", () => {
  it("renders H1 with correct tag and classes", () => {
    render(<H1>Title</H1>)
    const el = screen.getByText("Title")
    expect(el.tagName).toBe("H1")
    expect(el).toHaveClass("text-4xl", "font-extrabold")
  })

  it("renders H2 with border-b", () => {
    render(<H2>Subtitle</H2>)
    const el = screen.getByText("Subtitle")
    expect(el.tagName).toBe("H2")
    expect(el).toHaveClass("border-b")
  })

  it("renders H3 and H4", () => {
    render(
      <>
        <H3>Three</H3>
        <H4>Four</H4>
      </>,
    )
    expect(screen.getByText("Three").tagName).toBe("H3")
    expect(screen.getByText("Four").tagName).toBe("H4")
  })

  it("merges custom className", () => {
    render(<H1 className="text-red-500">Custom</H1>)
    expect(screen.getByText("Custom")).toHaveClass("text-red-500")
  })
})

describe("Typography text", () => {
  it("renders P", () => {
    render(<P>Paragraph</P>)
    expect(screen.getByText("Paragraph").tagName).toBe("P")
    expect(screen.getByText("Paragraph")).toHaveClass("leading-7")
  })

  it("renders Lead with muted color", () => {
    render(<Lead>Lead text</Lead>)
    expect(screen.getByText("Lead text")).toHaveClass("text-xl", "text-muted-foreground")
  })

  it("renders Large", () => {
    render(<Large>Big text</Large>)
    expect(screen.getByText("Big text")).toHaveClass("text-lg", "font-semibold")
  })

  it("renders Small", () => {
    render(<Small>Tiny</Small>)
    expect(screen.getByText("Tiny").tagName).toBe("SMALL")
  })

  it("renders Muted", () => {
    render(<Muted>Helper</Muted>)
    expect(screen.getByText("Helper")).toHaveClass("text-muted-foreground")
  })

  it("renders InlineCode", () => {
    render(<InlineCode>const x</InlineCode>)
    expect(screen.getByText("const x").tagName).toBe("CODE")
    expect(screen.getByText("const x")).toHaveClass("font-mono")
  })

  it("renders Blockquote", () => {
    render(<Blockquote>Quote</Blockquote>)
    expect(screen.getByText("Quote").tagName).toBe("BLOCKQUOTE")
    expect(screen.getByText("Quote")).toHaveClass("border-l-2", "italic")
  })
})

describe("List", () => {
  it("renders unordered list by default", () => {
    const { container } = render(
      <List>
        <li>Item</li>
      </List>,
    )
    expect(container.querySelector("ul")).toBeInTheDocument()
    expect(container.querySelector("ul")).toHaveClass("list-disc")
  })

  it("renders ordered list", () => {
    const { container } = render(
      <List ordered>
        <li>Item</li>
      </List>,
    )
    expect(container.querySelector("ol")).toBeInTheDocument()
    expect(container.querySelector("ol")).toHaveClass("list-decimal")
  })
})

describe("Prose", () => {
  it("renders with default size", () => {
    const { container } = render(
      <Prose>
        <p>Content</p>
      </Prose>,
    )
    const prose = container.querySelector("[data-slot='prose']")
    expect(prose).toBeInTheDocument()
    expect(prose).toHaveClass("text-base")
  })

  it("renders with sm size", () => {
    const { container } = render(
      <Prose size="sm">
        <p>Content</p>
      </Prose>,
    )
    expect(container.querySelector("[data-slot='prose']")).toHaveClass("text-sm")
  })

  it("renders with lg size", () => {
    const { container } = render(
      <Prose size="lg">
        <p>Content</p>
      </Prose>,
    )
    expect(container.querySelector("[data-slot='prose']")).toHaveClass("text-lg")
  })

  it("merges custom className", () => {
    const { container } = render(
      <Prose className="max-w-prose">
        <p>Content</p>
      </Prose>,
    )
    expect(container.querySelector("[data-slot='prose']")).toHaveClass("max-w-prose")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Prose>
        <H1>Title</H1>
        <P>Paragraph text</P>
        <List>
          <li>Item</li>
        </List>
      </Prose>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
