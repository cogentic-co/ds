import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import {
  PromptInput,
  PromptInputAttachButton,
  PromptInputBody,
  PromptInputCommand,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "../prompt-input"

describe("PromptInput", () => {
  it("renders textarea with placeholder", () => {
    render(
      <PromptInput>
        <PromptInputBody>
          <PromptInputTextarea />
        </PromptInputBody>
      </PromptInput>,
    )
    expect(screen.getByPlaceholderText("Type a message...")).toBeInTheDocument()
  })

  it("submit button has aria-label", () => {
    render(
      <PromptInput>
        <PromptInputBody>
          <PromptInputTextarea />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputSubmit />
        </PromptInputFooter>
      </PromptInput>,
    )
    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument()
  })

  it("submit button shows Stop label when loading", () => {
    render(
      <PromptInput isLoading>
        <PromptInputBody>
          <PromptInputTextarea />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputSubmit />
        </PromptInputFooter>
      </PromptInput>,
    )
    expect(screen.getByRole("button", { name: "Working…" })).toBeInTheDocument()
  })

  it("attach button has aria-label", () => {
    render(
      <PromptInput>
        <PromptInputBody>
          <PromptInputTextarea />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputAttachButton />
          </PromptInputTools>
        </PromptInputFooter>
      </PromptInput>,
    )
    expect(screen.getByRole("button", { name: "Attach files" })).toBeInTheDocument()
  })

  it("calls onSubmit with message on Enter", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(
      <PromptInput onSubmit={onSubmit}>
        <PromptInputBody>
          <PromptInputTextarea />
        </PromptInputBody>
      </PromptInput>,
    )
    const textarea = screen.getByPlaceholderText("Type a message...")
    await user.type(textarea, "Hello{Enter}")
    expect(onSubmit).toHaveBeenCalledWith("Hello", [])
  })

  it("does not submit on Shift+Enter", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(
      <PromptInput onSubmit={onSubmit}>
        <PromptInputBody>
          <PromptInputTextarea />
        </PromptInputBody>
      </PromptInput>,
    )
    const textarea = screen.getByPlaceholderText("Type a message...")
    await user.type(textarea, "Hello{Shift>}{Enter}{/Shift}")
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <PromptInput>
        <PromptInputBody>
          <PromptInputTextarea />
        </PromptInputBody>
      </PromptInput>,
    )
    expect(container.querySelector("[data-slot='prompt-input']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='prompt-input-textarea']")).toBeInTheDocument()
  })

  it("PromptInputCommand opens slash menu and submits payload on Enter", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(
      <PromptInput
        onSubmit={onSubmit}
        commands={[{ value: "deploy", label: "deploy" }]}
        mentions={[{ value: "alice", label: "Alice" }]}
      >
        <PromptInputBody>
          <PromptInputCommand placeholder="ask…" />
        </PromptInputBody>
      </PromptInput>,
    )
    const editor = screen.getByRole("combobox")
    editor.focus()
    await user.keyboard("Run /dep")
    await user.click(screen.getByRole("option", { name: /deploy/ }))
    await user.keyboard("{Enter}")
    expect(onSubmit).toHaveBeenCalledTimes(1)
    const [text, files, payload] = onSubmit.mock.calls[0]
    expect(text).toBe("Run /deploy")
    expect(files).toEqual([])
    expect(payload).toEqual({
      commands: [{ value: "deploy", label: "deploy" }],
      mentions: [],
    })
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <PromptInput>
        <PromptInputBody>
          <PromptInputTextarea />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputAttachButton />
          </PromptInputTools>
          <PromptInputSubmit />
        </PromptInputFooter>
      </PromptInput>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
