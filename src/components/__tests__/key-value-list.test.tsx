import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { KeyValueList } from "../key-value-list"

const items = [
  { label: "Hash", value: "0xabc…123", mono: true },
  { label: "Block", value: "21,394,012", mono: true },
  { label: "Fee", value: "$1.82" },
]

describe("KeyValueList", () => {
  it("renders every row", () => {
    render(<KeyValueList items={items} />)
    expect(screen.getByText("Hash")).toBeInTheDocument()
    expect(screen.getByText("Block")).toBeInTheDocument()
    expect(screen.getByText("Fee")).toBeInTheDocument()
  })

  it("applies mono class on rows marked mono", () => {
    const { container } = render(<KeyValueList items={items} />)
    const valueCells = container.querySelectorAll('[data-slot="key-value-list-row"] > div')
    expect(valueCells[0].className).toContain("font-mono")
    expect(valueCells[2].className).not.toContain("font-mono")
  })

  it("drops the card chrome when bordered=false", () => {
    const { container } = render(<KeyValueList items={items} bordered={false} />)
    const root = container.querySelector('[data-slot="key-value-list"]') as HTMLElement
    expect(root.className).not.toContain("border-border")
  })

  it("merges className", () => {
    const { container } = render(<KeyValueList items={items} className="custom" />)
    expect(container.querySelector('[data-slot="key-value-list"]')?.className).toContain("custom")
  })

  it("has no a11y violations", async () => {
    const { container } = render(<KeyValueList items={items} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
