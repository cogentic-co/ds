import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import {
  TextCommand,
  type TextCommandValue,
  textCommandToPayload,
  textCommandToString,
} from "../text-command"

const commands = [
  { value: "deploy", label: "deploy", description: "Ship to prod" },
  { value: "rollback", label: "rollback", description: "Undo last release" },
]

const mentions = [
  { value: "alice", label: "Alice" },
  { value: "bob", label: "Bob" },
]

describe("TextCommand", () => {
  it("renders an editable combobox", () => {
    render(<TextCommand />)
    const editor = screen.getByRole("combobox")
    expect(editor).toBeInTheDocument()
    expect(editor).toHaveAttribute("contenteditable", "true")
  })

  it("has data-slot attribute on root", () => {
    const { container } = render(<TextCommand />)
    expect(container.querySelector('[data-slot="text-command"]')).not.toBeNull()
  })

  it("renders pre-existing parts including chips", () => {
    const value: TextCommandValue = [
      { type: "text", value: "Deploy " },
      { type: "command", value: "deploy", label: "deploy" },
      { type: "text", value: " with " },
      { type: "mention", value: "alice", label: "Alice" },
    ]
    const { container } = render(<TextCommand value={value} onValueChange={() => {}} />)
    const chips = container.querySelectorAll("[data-chip]")
    expect(chips.length).toBe(2)
    expect(chips[0]).toHaveAttribute("data-chip", "command")
    expect(chips[0]).toHaveAttribute("data-value", "deploy")
    expect(chips[1]).toHaveAttribute("data-chip", "mention")
    expect(chips[1]).toHaveAttribute("data-value", "alice")
  })

  it("opens the slash menu when typing /", async () => {
    const user = userEvent.setup()
    render(<TextCommand commands={commands} />)
    const editor = screen.getByRole("combobox")
    editor.focus()
    await user.keyboard("/")
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(screen.getByRole("option", { name: /deploy/ })).toBeInTheDocument()
  })

  it("opens the mention menu when typing @", async () => {
    const user = userEvent.setup()
    render(<TextCommand mentions={mentions} />)
    screen.getByRole("combobox").focus()
    await user.keyboard("@")
    expect(screen.getByRole("option", { name: /Alice/ })).toBeInTheDocument()
  })

  it("filters by query after the trigger", async () => {
    const user = userEvent.setup()
    render(<TextCommand commands={commands} />)
    screen.getByRole("combobox").focus()
    await user.keyboard("/roll")
    expect(screen.queryByRole("option", { name: /deploy/ })).toBeNull()
    expect(screen.getByRole("option", { name: /rollback/ })).toBeInTheDocument()
  })

  it("inserts an inline chip on selection", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { container } = render(<TextCommand commands={commands} onValueChange={onValueChange} />)
    const editor = screen.getByRole("combobox")
    editor.focus()
    await user.keyboard("/dep")
    await user.click(screen.getByRole("option", { name: /deploy/ }))
    const chips = container.querySelectorAll("[data-chip='command']")
    expect(chips.length).toBe(1)
    expect(chips[0]).toHaveAttribute("data-value", "deploy")
    expect(onValueChange).toHaveBeenCalled()
    const lastCall = onValueChange.mock.calls.at(-1)![0] as TextCommandValue
    expect(lastCall.some((p) => p.type === "command" && p.value === "deploy")).toBe(true)
  })

  it("fires onTriggerQueryChange as the trigger query evolves", async () => {
    const user = userEvent.setup()
    const onTriggerQueryChange = vi.fn()
    render(<TextCommand mentions={mentions} onTriggerQueryChange={onTriggerQueryChange} />)
    screen.getByRole("combobox").focus()
    await user.keyboard("@")
    await user.keyboard("a")
    await user.keyboard("l")
    const calls = onTriggerQueryChange.mock.calls.map((c) => c[0])
    expect(calls).toContainEqual({ trigger: "@", query: "" })
    expect(calls).toContainEqual({ trigger: "@", query: "a" })
    expect(calls).toContainEqual({ trigger: "@", query: "al" })
    await user.keyboard("{Escape}")
    expect(onTriggerQueryChange).toHaveBeenLastCalledWith(null)
  })

  it("filterItems=false skips client-side filtering", async () => {
    const user = userEvent.setup()
    render(<TextCommand mentions={mentions} filterItems={false} />)
    screen.getByRole("combobox").focus()
    await user.keyboard("@zzzzz")
    expect(screen.getByRole("option", { name: /Alice/ })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: /Bob/ })).toBeInTheDocument()
  })

  it("ArrowDown moves the selection to the next item, Enter inserts it", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<TextCommand commands={commands} onValueChange={onValueChange} />)
    screen.getByRole("combobox").focus()
    await user.keyboard("/")
    // Default highlight is first item; ArrowDown should move to "rollback".
    await user.keyboard("{ArrowDown}")
    await user.keyboard("{Enter}")
    const last = onValueChange.mock.calls.at(-1)![0] as TextCommandValue
    expect(last.some((p) => p.type === "command" && p.value === "rollback")).toBe(true)
  })

  it("ArrowUp wraps to the last item from the first", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<TextCommand commands={commands} onValueChange={onValueChange} />)
    screen.getByRole("combobox").focus()
    await user.keyboard("/")
    await user.keyboard("{ArrowUp}")
    await user.keyboard("{Enter}")
    const last = onValueChange.mock.calls.at(-1)![0] as TextCommandValue
    expect(last.some((p) => p.type === "command" && p.value === "rollback")).toBe(true)
  })

  it("Escape closes the menu without inserting", async () => {
    const user = userEvent.setup()
    render(<TextCommand commands={commands} />)
    screen.getByRole("combobox").focus()
    await user.keyboard("/")
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("listbox")).toBeNull()
  })

  it("merges custom className on the root", () => {
    const { container } = render(<TextCommand className="custom-x" />)
    expect(container.querySelector('[data-slot="text-command"]')).toHaveClass("custom-x")
  })

  it("disabled state sets contenteditable false", () => {
    render(<TextCommand disabled />)
    expect(screen.getByRole("combobox")).toHaveAttribute("contenteditable", "false")
  })

  it("has no accessibility violations", async () => {
    const value: TextCommandValue = [
      { type: "text", value: "Hello " },
      { type: "mention", value: "alice", label: "Alice" },
    ]
    const { container } = render(
      <TextCommand
        value={value}
        onValueChange={() => {}}
        commands={commands}
        mentions={mentions}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe("textCommandToString", () => {
  it("joins text and chips into a flat string", () => {
    const value: TextCommandValue = [
      { type: "text", value: "Deploy " },
      { type: "command", value: "deploy", label: "deploy" },
      { type: "text", value: " with " },
      { type: "mention", value: "alice", label: "Alice" },
    ]
    expect(textCommandToString(value)).toBe("Deploy /deploy with @alice")
  })
})

describe("textCommandToPayload", () => {
  it("returns text + structured selections", () => {
    const value: TextCommandValue = [
      { type: "text", value: "Run " },
      { type: "command", value: "deploy", label: "deploy" },
      { type: "text", value: " for " },
      { type: "mention", value: "alice", label: "Alice" },
      { type: "text", value: " and " },
      { type: "mention", value: "bob", label: "Bob" },
    ]
    expect(textCommandToPayload(value)).toEqual({
      text: "Run /deploy for @alice and @bob",
      commands: [{ value: "deploy", label: "deploy" }],
      mentions: [
        { value: "alice", label: "Alice" },
        { value: "bob", label: "Bob" },
      ],
    })
  })
})
