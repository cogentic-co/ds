import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Col, Grid } from "../grid"

describe("Grid", () => {
  it("renders as a grid with children", () => {
    render(
      <Grid>
        <Col>Item 1</Col>
        <Col>Item 2</Col>
      </Grid>,
    )
    expect(screen.getByText("Item 1")).toBeInTheDocument()
    expect(screen.getByText("Item 2")).toBeInTheDocument()
  })

  it("applies grid-cols class from numeric cols prop", () => {
    const { container } = render(<Grid cols={3}>Content</Grid>)
    const grid = container.querySelector("[data-slot='grid']")
    expect(grid).toHaveClass("grid", "grid-cols-3")
  })

  it("applies custom string cols value", () => {
    const { container } = render(<Grid cols="grid-cols-[200px_1fr]">Content</Grid>)
    const grid = container.querySelector("[data-slot='grid']")
    expect(grid).toHaveClass("grid", "grid-cols-[200px_1fr]")
  })

  it("applies rows, flow, gap, and auto props", () => {
    const { container } = render(
      <Grid cols={4} rows={2} flow="dense" gap={4} autoCols="fr" autoRows="min">
        Content
      </Grid>,
    )
    const grid = container.querySelector("[data-slot='grid']")
    expect(grid).toHaveClass(
      "grid",
      "grid-cols-4",
      "grid-rows-2",
      "grid-flow-dense",
      "gap-4",
      "auto-cols-fr",
      "auto-rows-min",
    )
  })

  it("applies gapX and gapY independently", () => {
    const { container } = render(
      <Grid cols={2} gapX={4} gapY={8}>
        Content
      </Grid>,
    )
    const grid = container.querySelector("[data-slot='grid']")
    expect(grid).toHaveClass("gap-x-4", "gap-y-8")
  })

  it("merges custom className on Grid", () => {
    const { container } = render(<Grid className="custom-grid">Content</Grid>)
    const grid = container.querySelector("[data-slot='grid']")
    expect(grid).toHaveClass("grid", "custom-grid")
  })
})

describe("Col", () => {
  it("applies col-span class from span prop", () => {
    const { container } = render(<Col span={2}>Content</Col>)
    const col = container.querySelector("[data-slot='col']")
    expect(col).toHaveClass("col-span-2")
  })

  it("applies col-span-full", () => {
    const { container } = render(<Col span="full">Content</Col>)
    const col = container.querySelector("[data-slot='col']")
    expect(col).toHaveClass("col-span-full")
  })

  it("applies start and end props", () => {
    const { container } = render(
      <Col start={2} end={5}>
        Content
      </Col>,
    )
    const col = container.querySelector("[data-slot='col']")
    expect(col).toHaveClass("col-start-2", "col-end-5")
  })

  it("applies row span, start, and end props", () => {
    const { container } = render(
      <Col rowSpan={3} rowStart={1} rowEnd={4}>
        Content
      </Col>,
    )
    const col = container.querySelector("[data-slot='col']")
    expect(col).toHaveClass("row-span-3", "row-start-1", "row-end-4")
  })

  it("merges custom className on Col", () => {
    const { container } = render(<Col className="custom-col">Content</Col>)
    const col = container.querySelector("[data-slot='col']")
    expect(col).toHaveClass("custom-col")
  })

  it("passes through HTML attributes", () => {
    render(
      <Col data-testid="my-col" id="col-1">
        Content
      </Col>,
    )
    const col = screen.getByTestId("my-col")
    expect(col).toHaveAttribute("id", "col-1")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Grid cols={2}>
        <Col>Item 1</Col>
        <Col>Item 2</Col>
      </Grid>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
