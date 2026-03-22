import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../table"

function renderTable({ className }: { className?: string } = {}) {
  return render(
    <Table className={className}>
      <TableCaption>A list of items</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Item A</TableCell>
          <TableCell>100</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Item B</TableCell>
          <TableCell>200</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>300</TableCell>
        </TableRow>
      </TableFooter>
    </Table>,
  )
}

describe("Table", () => {
  it("renders table with all sections", () => {
    renderTable()
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Value")).toBeInTheDocument()
    expect(screen.getByText("Item A")).toBeInTheDocument()
    expect(screen.getByText("100")).toBeInTheDocument()
    expect(screen.getByText("Total")).toBeInTheDocument()
    expect(screen.getByText("A list of items")).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = renderTable()
    expect(container.querySelector("[data-slot='table-container']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='table']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='table-header']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='table-body']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='table-footer']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='table-row']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='table-head']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='table-cell']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='table-caption']")).toBeInTheDocument()
  })

  it("merges custom className on table", () => {
    const { container } = renderTable({ className: "custom-table" })
    expect(container.querySelector("[data-slot='table']")).toHaveClass("custom-table")
  })

  it("renders correct number of rows", () => {
    renderTable()
    expect(screen.getAllByRole("row")).toHaveLength(4) // 1 header + 2 body + 1 footer
  })

  it("renders column headers", () => {
    renderTable()
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: "Value" })).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = renderTable()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
