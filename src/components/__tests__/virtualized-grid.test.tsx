import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { VirtualizedGrid } from "../virtualized-grid"

/*
 * Note: jsdom doesn't give scroll containers real dimensions, so
 * @tanstack/react-virtual computes 0 visible rows in the test environment.
 * These tests check the component mounts and structural wiring is right —
 * full render behaviour is verified manually in the preview app.
 */

describe("VirtualizedGrid", () => {
  it("mounts with a scroll container", () => {
    const items = Array.from({ length: 12 }, (_, i) => ({ id: i, label: `Item ${i}` }))
    const { container } = render(
      <VirtualizedGrid
        items={items}
        columns={3}
        rowHeight={40}
        gap={8}
        className="h-[400px]"
        renderItem={(item) => <div>{item.label}</div>}
      />,
    )
    expect(container.querySelector('[data-slot="virtualized-grid"]')).toBeInTheDocument()
  })

  it("renders empty grid when items is empty", () => {
    const { container } = render(
      <VirtualizedGrid
        items={[]}
        columns={4}
        rowHeight={40}
        className="h-[200px]"
        renderItem={() => <div>item</div>}
      />,
    )
    const grid = container.querySelector('[data-slot="virtualized-grid"]')
    expect(grid).toBeInTheDocument()
  })

  it("applies the className to the scroll container", () => {
    const { container } = render(
      <VirtualizedGrid
        items={[{ id: 0 }]}
        columns={1}
        rowHeight={40}
        className="custom-class h-[200px]"
        renderItem={() => <div>item</div>}
      />,
    )
    expect(container.querySelector('[data-slot="virtualized-grid"]')).toHaveClass("custom-class")
  })

  it("accepts a getItemKey prop without error", () => {
    const items = [
      { id: "a", label: "Alpha" },
      { id: "b", label: "Beta" },
    ]
    const { container } = render(
      <VirtualizedGrid
        items={items}
        columns={2}
        rowHeight={40}
        className="h-[200px]"
        getItemKey={(item) => item.id}
        renderItem={(item) => <div>{item.label}</div>}
      />,
    )
    expect(container.querySelector('[data-slot="virtualized-grid"]')).toBeInTheDocument()
  })
})
