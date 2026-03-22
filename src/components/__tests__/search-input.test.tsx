import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { SearchInput } from "../search-input"

const mockResults = [
  { id: "1", name: "Alpha Corp" },
  { id: "2", name: "Beta Inc" },
  { id: "3", name: "Gamma Ltd" },
]

const mockSearch = vi.fn(async () => mockResults)

function renderSearchInput(props = {}) {
  return render(
    <SearchInput
      onSearch={mockSearch}
      renderItem={(item: (typeof mockResults)[0]) => <span>{item.name}</span>}
      onSelect={vi.fn()}
      placeholder="Search entities..."
      debounceMs={50}
      {...props}
    />,
  )
}

describe("SearchInput", () => {
  it("renders with placeholder", () => {
    renderSearchInput()
    expect(screen.getByPlaceholderText("Search entities...")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = renderSearchInput()
    expect(container.querySelector("[data-slot='search-input']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = renderSearchInput({ className: "custom-search" })
    expect(container.querySelector("[data-slot='search-input']")).toHaveClass("custom-search")
  })

  it("has combobox role", () => {
    renderSearchInput()
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("calls onSearch after debounce", async () => {
    const user = userEvent.setup()
    renderSearchInput()

    await user.type(screen.getByRole("combobox"), "alp")

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith("alp")
    })
  })

  it("does not search with less than minQueryLength", async () => {
    const search = vi.fn(async () => [])
    const user = userEvent.setup()
    renderSearchInput({ onSearch: search })

    await user.type(screen.getByRole("combobox"), "a")

    // Wait a bit, search should not be called
    await new Promise((r) => setTimeout(r, 100))
    expect(search).not.toHaveBeenCalled()
  })

  it("renders results after search", async () => {
    const user = userEvent.setup()
    renderSearchInput()

    await user.type(screen.getByRole("combobox"), "alpha")

    await waitFor(() => {
      expect(screen.getByText("Alpha Corp")).toBeInTheDocument()
    })
  })

  it("calls onSelect when result clicked", async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    renderSearchInput({ onSelect })

    await user.type(screen.getByRole("combobox"), "alpha")

    await waitFor(() => {
      expect(screen.getByText("Alpha Corp")).toBeInTheDocument()
    })

    await user.click(screen.getByText("Alpha Corp"))
    expect(onSelect).toHaveBeenCalledWith(mockResults[0])
  })

  it("has no accessibility violations", async () => {
    const { container } = renderSearchInput()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
