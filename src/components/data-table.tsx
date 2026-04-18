"use client"

import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type RowSelectionState,
  type SortingState,
  type Table as TableInstance,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  PlusCircle,
  Settings2,
} from "lucide-react"
import * as React from "react"

import { cn } from "../lib/utils"
import { Badge } from "./badge"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Separator } from "./separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"

/* ────────────────────────────────────────────────────────────────────────────
 * useDataTable hook
 * ──────────────────────────────────────────────────────────────────────────── */

type UseDataTableOptions<TData> = {
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  getRowId?: (row: TData) => string
  initialSorting?: SortingState
  initialGlobalFilter?: string
  initialFilters?: ColumnFiltersState
  initialVisibility?: VisibilityState
  initialSelection?: RowSelectionState
  enableRowSelection?: boolean
  enablePagination?: boolean
}

function useDataTable<TData>(options: UseDataTableOptions<TData>) {
  const {
    data,
    columns,
    getRowId,
    initialSorting = [],
    initialFilters = [],
    initialGlobalFilter = "",
    initialVisibility = {},
    initialSelection = {},
    enableRowSelection = true,
    enablePagination = true,
  } = options

  const [sorting, setSorting] = React.useState<SortingState>(initialSorting)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initialFilters)
  const [globalFilter, setGlobalFilter] = React.useState<string>(initialGlobalFilter)
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(initialVisibility)
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(initialSelection)

  // Memoize row-model factories so they are stable across renders
  const paginationRowModel = React.useMemo(
    () => (enablePagination ? getPaginationRowModel<TData>() : undefined),
    [enablePagination],
  )

  // Guard against pre-mount state updates from tanstack's pagination init.
  // We buffer setState calls until after mount so React doesn't warn about
  // "state update on a component that hasn't mounted yet".
  const mountedRef = React.useRef(false)
  React.useEffect(() => {
    mountedRef.current = true
  }, [])

  const safeSorting = React.useCallback(
    (updater: SortingState | ((prev: SortingState) => SortingState)) => {
      if (mountedRef.current) setSorting(updater)
    },
    [],
  )
  const safeColumnFilters = React.useCallback(
    (updater: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)) => {
      if (mountedRef.current) setColumnFilters(updater)
    },
    [],
  )
  const safeRowSelection = React.useCallback(
    (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => {
      if (mountedRef.current) setRowSelection(updater)
    },
    [],
  )
  const safeGlobalFilter = React.useCallback((updater: string | ((prev: string) => string)) => {
    if (mountedRef.current) setGlobalFilter(updater)
  }, [])
  const safeColumnVisibility = React.useCallback(
    (updater: VisibilityState | ((prev: VisibilityState) => VisibilityState)) => {
      if (mountedRef.current) setColumnVisibility(updater)
    },
    [],
  )

  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: safeSorting,
    onColumnFiltersChange: safeColumnFilters,
    onRowSelectionChange: safeRowSelection,
    onGlobalFilterChange: safeGlobalFilter,
    onColumnVisibilityChange: safeColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(paginationRowModel && { getPaginationRowModel: paginationRowModel }),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableRowSelection,
    autoResetPageIndex: false,
  })

  return {
    table,
    columnFilters,
    setColumnFilters,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
  }
}

/* ────────────────────────────────────────────────────────────────────────────
 * DataTable — main renderer
 * ──────────────────────────────────────────────────────────────────────────── */

type DataTableProps<TData> = {
  table: TableInstance<TData>
  columns: ColumnDef<TData, unknown>[]
  className?: string
  /** Enable virtual scrolling for large datasets */
  virtual?: boolean
  /** Fixed height for the virtual scroll container (default: 400) */
  virtualHeight?: number
  /** Estimated row height for virtualizer (default: 48) */
  estimateSize?: number
  /** Render function for empty state */
  emptyState?: React.ReactNode
  /** Callback when a row is clicked */
  onRowClick?: (row: TData) => void
}

function DataTable<TData>({
  table,
  columns,
  className,
  virtual = false,
  virtualHeight = 400,
  estimateSize = 48,
  emptyState,
  onRowClick,
}: DataTableProps<TData>) {
  const { rows } = table.getRowModel()

  if (virtual) {
    return (
      <DataTableVirtual
        table={table}
        columns={columns}
        className={className}
        virtualHeight={virtualHeight}
        estimateSize={estimateSize}
        emptyState={emptyState}
      />
    )
  }

  return (
    <div
      data-slot="data-table"
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={onRowClick ? "cursor-pointer" : undefined}
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyState ?? "No results."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * DataTableVirtual — virtualized renderer
 * ──────────────────────────────────────────────────────────────────────────── */

type DataTableVirtualProps<TData> = {
  table: TableInstance<TData>
  columns: ColumnDef<TData, unknown>[]
  className?: string
  virtualHeight: number
  estimateSize: number
  emptyState?: React.ReactNode
}

function DataTableVirtual<TData>({
  table,
  columns,
  className,
  virtualHeight,
  estimateSize,
  emptyState,
}: DataTableVirtualProps<TData>) {
  const { rows } = table.getRowModel()
  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 10,
  })

  return (
    <div
      data-slot="data-table"
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      </Table>
      <div ref={parentRef} className="overflow-auto" style={{ height: virtualHeight }}>
        <Table>
          <TableBody>
            {rows.length ? (
              <>
                <tr style={{ height: virtualizer.getVirtualItems()[0]?.start ?? 0 }} />
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const row = rows[virtualRow.index] as Row<TData>
                  return (
                    <TableRow
                      key={row.id}
                      data-index={virtualRow.index}
                      ref={(node) => virtualizer.measureElement(node)}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })}
                <tr
                  style={{
                    height:
                      virtualizer.getTotalSize() - (virtualizer.getVirtualItems().at(-1)?.end ?? 0),
                  }}
                />
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyState ?? "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * DataTableColumnHeader — sortable header
 * ──────────────────────────────────────────────────────────────────────────── */

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>
  title: string
  className?: string
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const canSort = column.getCanSort()
  const sorted = column.getIsSorted()

  if (!canSort) {
    return (
      <span className={cn("flex h-8 items-center font-medium text-foreground text-sm", className)}>
        {title}
      </span>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "flex h-8 items-center gap-2 px-0 font-medium text-foreground text-sm",
        className,
      )}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      <span>{title}</span>
      {sorted === "desc" ? (
        <ArrowDown className="size-4" />
      ) : sorted === "asc" ? (
        <ArrowUp className="size-4" />
      ) : (
        <ChevronsUpDown className="size-4 opacity-50" />
      )}
    </Button>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * DataTablePagination
 * ──────────────────────────────────────────────────────────────────────────── */

type DataTablePaginationProps<TData> = {
  table: TableInstance<TData>
  pageSizeOptions?: number[]
  className?: string
}

function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  className,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalRows = table.getFilteredRowModel().rows.length
  const pageCount = table.getPageCount()

  const startRow = currentPage * pageSize + 1
  const endRow = Math.min((currentPage + 1) * pageSize, totalRows)

  const relevantPageSizes = pageSizeOptions.filter((size) => size <= totalRows || size === pageSize)

  return (
    <div
      data-slot="data-table-pagination"
      className={cn("flex items-center justify-between gap-2 px-2 py-4", className)}
    >
      <div className="text-muted-foreground text-sm">
        <span className="font-medium">
          {totalRows === 0 ? (
            "No results"
          ) : (
            <>
              <span className="lg:hidden">
                {startRow}–{endRow} of {totalRows}
              </span>
              <span className="hidden lg:inline">
                Showing {startRow} to {endRow} of {totalRows} {totalRows === 1 ? "row" : "rows"}
              </span>
            </>
          )}
        </span>
      </div>

      <div className="flex items-center gap-2 lg:gap-6">
        <div className="hidden items-center gap-2 lg:flex">
          <p className="whitespace-nowrap font-medium text-sm">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              if (value) table.setPageSize(Number(value))
            }}
            disabled={totalRows === 0}
          >
            <SelectTrigger className="h-8 w-[70px]" aria-label="Rows per page">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {relevantPageSizes.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden whitespace-nowrap font-medium text-sm lg:block">
            Page {currentPage + 1} of {pageCount}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 xl:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={currentPage === 0 || totalRows === 0}
              aria-label="Go to first page"
            >
              <ChevronsLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Go to previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Go to next page"
            >
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 xl:flex"
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={currentPage === pageCount - 1 || totalRows === 0}
              aria-label="Go to last page"
            >
              <ChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * DataTableViewOptions — column visibility toggle
 * ──────────────────────────────────────────────────────────────────────────── */

type DataTableViewOptionsProps<TData> = {
  table: TableInstance<TData>
  className?: string
}

function DataTableViewOptions<TData>({ table, className }: DataTableViewOptionsProps<TData>) {
  const columns = table.getAllColumns().filter((column) => column.getCanHide())
  const hiddenCount = columns.filter((col) => !col.getIsVisible()).length
  const hasHiddenColumns = hiddenCount > 0

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="sm" className={cn("h-8 gap-2", className)} />}
      >
        <Settings2 className="size-4" />
        <span className="hidden sm:inline">View</span>
        {hasHiddenColumns && (
          <Badge variant="secondary" className="ml-1 size-5 rounded-full p-0 text-xs">
            {hiddenCount}
          </Badge>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Toggle columns</span>
          {hasHiddenColumns && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.resetColumnVisibility()}
              className="h-auto p-1 text-xs"
            >
              Reset
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.length === 0 ? (
          <div className="px-2 py-4 text-center text-muted-foreground text-sm">
            No columns available
          </div>
        ) : (
          columns.map((column) => {
            const label =
              (column.columnDef.meta as { label?: string })?.label ||
              column.id.charAt(0).toUpperCase() + column.id.slice(1).replace(/([A-Z])/g, " $1")

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                className="capitalize"
              >
                {label}
              </DropdownMenuCheckboxItem>
            )
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * DataTableFacetedFilter
 * ──────────────────────────────────────────────────────────────────────────── */

type DataTableFacetedFilterOption = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

type DataTableFacetedFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>
  title?: string
  options: DataTableFacetedFilterOption[]
  className?: string
}

function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  className,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="sm" className={cn("h-8 border-dashed", className)} />
        }
      >
        <PlusCircle />
        {title}
        {selectedValues?.size > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
              {selectedValues.size}
            </Badge>
            <div className="hidden gap-1 lg:flex">
              {selectedValues.size > 2 ? (
                <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                  {selectedValues.size} selected
                </Badge>
              ) : (
                options
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge
                      variant="secondary"
                      key={option.value}
                      className="rounded-sm px-1 font-normal"
                    >
                      {option.label}
                    </Badge>
                  ))
              )}
            </div>
          </>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start" autoFocus={false}>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(filterValues.length ? filterValues : undefined)
                    }}
                  >
                    <Checkbox
                      checked={isSelected}
                      className="pointer-events-none"
                      tabIndex={-1}
                      aria-hidden
                    />
                    {option.icon && <option.icon className="size-4 text-muted-foreground" />}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex size-4 items-center justify-center font-mono text-muted-foreground text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * DataTableToolbar
 * ──────────────────────────────────────────────────────────────────────────── */

type DataTableToolbarProps<TData> = React.ComponentProps<"div"> & {
  table: TableInstance<TData>
  showViewOptions?: boolean
}

function DataTableToolbar<TData>({
  table,
  children,
  className,
  showViewOptions = true,
  ...props
}: DataTableToolbarProps<TData>) {
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn(
        "flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">{children}</div>
      <div className="mb-auto flex sm:mb-0 sm:items-center">
        {showViewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * Exports
 * ──────────────────────────────────────────────────────────────────────────── */

// Re-export TanStack types consumers will need for column definitions
export type {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"

export type {
  DataTableColumnHeaderProps,
  DataTableFacetedFilterOption,
  DataTableFacetedFilterProps,
  DataTablePaginationProps,
  DataTableProps,
  DataTableToolbarProps,
  DataTableViewOptionsProps,
  UseDataTableOptions,
}
export {
  DataTable,
  DataTableColumnHeader,
  DataTableFacetedFilter,
  DataTablePagination,
  DataTableToolbar,
  DataTableViewOptions,
  useDataTable,
}
