import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  type ColumnDef,
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
} from "../data-table"

type TestRow = { id: string; name: string; status: string }

const testColumns: ColumnDef<TestRow, unknown>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    meta: { label: "ID" },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    meta: { label: "Name" },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    meta: { label: "Status" },
  },
]

const testData: TestRow[] = [
  { id: "1", name: "Alice", status: "active" },
  { id: "2", name: "Bob", status: "inactive" },
  { id: "3", name: "Charlie", status: "active" },
]

function TestTable({ data = testData, virtual = false }: { data?: TestRow[]; virtual?: boolean }) {
  const { table } = useDataTable({
    data,
    columns: testColumns,
    getRowId: (row) => row.id,
  })

  return (
    <>
      <DataTable table={table} columns={testColumns} virtual={virtual} />
      <DataTablePagination table={table} />
    </>
  )
}

function TestTableWithToolbar({ data = testData }: { data?: TestRow[] }) {
  const { table } = useDataTable({
    data,
    columns: testColumns,
    getRowId: (row) => row.id,
  })

  return (
    <>
      <DataTableToolbar table={table}>
        <input placeholder="Search..." />
      </DataTableToolbar>
      <DataTable table={table} columns={testColumns} />
      <DataTablePagination table={table} />
    </>
  )
}

describe("DataTable", () => {
  it("renders table with headers and rows", () => {
    render(<TestTable />)
    expect(screen.getByText("ID")).toBeInTheDocument()
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Status")).toBeInTheDocument()
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.getByText("Bob")).toBeInTheDocument()
    expect(screen.getByText("Charlie")).toBeInTheDocument()
  })

  it("shows empty state when no data", () => {
    render(<TestTable data={[]} />)
    expect(screen.getByText("No results.")).toBeInTheDocument()
  })

  it("shows custom empty state", () => {
    function EmptyTable() {
      const { table } = useDataTable({
        data: [] as TestRow[],
        columns: testColumns,
      })
      return (
        <DataTable table={table} columns={testColumns} emptyState={<span>Nothing here</span>} />
      )
    }
    render(<EmptyTable />)
    expect(screen.getByText("Nothing here")).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(<TestTable />)
    expect(container.querySelector("[data-slot='data-table']")).toBeInTheDocument()
  })
})

describe("DataTableColumnHeader", () => {
  it("renders non-sortable header without sort button", () => {
    render(<TestTable />)
    // "Status" column has enableSorting: false — no button, just text in the <th>
    const statusHeader = screen.getByText("Status")
    expect(statusHeader.closest("button")).toBeNull()
  })

  it("renders sortable header as button", () => {
    render(<TestTable />)
    // "Name" column is sortable
    const nameButton = screen.getByRole("button", { name: /name/i })
    expect(nameButton).toBeInTheDocument()
  })

  it("toggles sort on click", async () => {
    const user = userEvent.setup()
    render(<TestTable />)
    const nameButton = screen.getByRole("button", { name: /name/i })
    await user.click(nameButton)
    // After clicking, rows should be sorted by name ascending
    const cells = screen.getAllByRole("cell")
    const names = cells.filter((_, i) => i % 3 === 1).map((c) => c.textContent)
    expect(names).toEqual(["Alice", "Bob", "Charlie"])
  })
})

describe("DataTablePagination", () => {
  it("shows row count", () => {
    render(<TestTable />)
    expect(screen.getByText(/Showing 1 to 3 of 3 rows/)).toBeInTheDocument()
  })

  it("shows 'No results' for empty data", () => {
    render(<TestTable data={[]} />)
    expect(screen.getByText("No results")).toBeInTheDocument()
  })

  it("has navigation buttons", () => {
    render(<TestTable />)
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument()
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument()
  })
})

describe("DataTableToolbar", () => {
  it("renders children and view options", () => {
    render(<TestTableWithToolbar />)
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument()
    expect(screen.getByText("View")).toBeInTheDocument()
  })
})

describe("DataTable virtual mode", () => {
  it("renders virtualized table container with headers", () => {
    const { container } = render(<TestTable virtual />)
    // Virtual mode renders the header table and a scroll container
    expect(container.querySelector("[data-slot='data-table']")).toBeInTheDocument()
    expect(screen.getByText("ID")).toBeInTheDocument()
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(container.querySelector(".overflow-auto")).toBeInTheDocument()
  })
})

describe("DataTable accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<TestTable />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
