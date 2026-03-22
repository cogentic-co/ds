import { render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Element.prototype.scrollIntoView = () => {}
})

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../command"

function renderCommand({ className }: { className?: string } = {}) {
  return render(
    <Command className={className}>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            Item One
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
          <CommandItem>Item Two</CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>,
  )
}

describe("Command", () => {
  it("renders without crashing", () => {
    const { container } = renderCommand()
    expect(container.querySelector("[data-slot='command']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = renderCommand()
    expect(container.querySelector("[data-slot='command']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = renderCommand({ className: "custom-command" })
    expect(container.querySelector("[data-slot='command']")).toHaveClass("custom-command")
  })

  it("renders input with placeholder", () => {
    renderCommand()
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument()
  })

  it("renders command items", () => {
    renderCommand()
    expect(screen.getByText("Item One")).toBeInTheDocument()
    expect(screen.getByText("Item Two")).toBeInTheDocument()
  })

  it("renders shortcut text", () => {
    renderCommand()
    expect(screen.getByText("⌘K")).toBeInTheDocument()
  })

  it("has data-slot on sub-components", () => {
    const { container } = renderCommand()
    expect(container.querySelector("[data-slot='command-input']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='command-list']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='command-group']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='command-item']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='command-shortcut']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='command-separator']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup heading="Actions">
            <CommandItem>Item One</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
