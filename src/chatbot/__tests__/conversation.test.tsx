import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "../conversation"

describe("Conversation", () => {
  it("renders conversation container", () => {
    const { container } = render(
      <Conversation>
        <ConversationContent>Messages here</ConversationContent>
      </Conversation>,
    )
    expect(container.querySelector("[data-slot='conversation']")).toBeInTheDocument()
    expect(screen.getByText("Messages here")).toBeInTheDocument()
  })

  it("has role=log and aria-live on scroll area", () => {
    const { container } = render(
      <Conversation>
        <ConversationContent>Messages</ConversationContent>
      </Conversation>,
    )
    expect(container.querySelector("[role='log']")).toBeInTheDocument()
    expect(container.querySelector("[aria-live='polite']")).toBeInTheDocument()
  })

  it("renders empty state with defaults", () => {
    render(<ConversationEmptyState />)
    expect(screen.getByText("No messages yet")).toBeInTheDocument()
    expect(screen.getByText("Start a conversation to see messages here")).toBeInTheDocument()
  })

  it("renders empty state with custom text", () => {
    render(<ConversationEmptyState title="No chats" description="Start chatting" />)
    expect(screen.getByText("No chats")).toBeInTheDocument()
    expect(screen.getByText("Start chatting")).toBeInTheDocument()
  })

  it("scroll button has accessible text", () => {
    render(<ConversationScrollButton />)
    expect(screen.getByRole("button", { name: /Scroll to bottom/i })).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Conversation>
        <ConversationContent>Content</ConversationContent>
      </Conversation>,
    )
    expect(container.querySelector("[data-slot='conversation']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='conversation-content']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Conversation>
        <ConversationContent>Some messages</ConversationContent>
      </Conversation>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
