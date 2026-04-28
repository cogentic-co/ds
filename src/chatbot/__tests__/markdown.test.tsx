import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Markdown } from "../markdown"

describe("Markdown", () => {
  it("renders bold and emphasis", () => {
    const { container } = render(<Markdown>Hello **world** and *friends*</Markdown>)
    expect(container.querySelector('[data-streamdown="strong"]')?.textContent).toBe("world")
    expect(container.querySelector("em")?.textContent).toBe("friends")
  })

  it("renders headings and lists", () => {
    render(<Markdown>{`# Title\n\n- one\n- two`}</Markdown>)
    expect(screen.getByRole("heading", { name: "Title", level: 1 })).toBeInTheDocument()
    expect(screen.getAllByRole("listitem")).toHaveLength(2)
  })

  it("renders links (Streamdown wraps in safety button)", () => {
    const { container } = render(
      <Markdown>{`See [Example](https://example.com) for more.`}</Markdown>,
    )
    const link = container.querySelector('[data-streamdown="link"]')
    expect(link?.textContent).toBe("Example")
  })

  it("renders inline and fenced code", () => {
    const { container } = render(
      <Markdown>{`Use \`cn()\` to merge.\n\n\`\`\`ts\nconst x = 1\n\`\`\``}</Markdown>,
    )
    expect(container.querySelector("code")).toBeInTheDocument()
    expect(container.querySelector("pre")).toBeInTheDocument()
  })

  it("merges className overrides", () => {
    const { container } = render(<Markdown className="custom-x">hi</Markdown>)
    expect(container.querySelector("[data-slot='markdown']")).toHaveClass("custom-x")
  })

  it("has no a11y violations", async () => {
    const { container } = render(<Markdown>{`# Title\n\nSome **bold** text.`}</Markdown>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
