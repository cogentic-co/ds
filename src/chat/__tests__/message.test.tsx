import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import {
  Message,
  MessageAction,
  MessageActions,
  MessageAvatar,
  MessageBranch,
  MessageBranchSelector,
  MessageContent,
  MessageFeedbackActions,
  MessageResponse,
} from "../message"

describe("Message", () => {
  it("renders message with content", () => {
    render(
      <Message>
        <MessageContent>
          <MessageResponse>Hello world</MessageResponse>
        </MessageContent>
      </Message>,
    )
    expect(screen.getByText("Hello world")).toBeInTheDocument()
  })

  it("uses data-role attribute for role", () => {
    const { container } = render(
      <Message from="user">
        <MessageContent>
          <MessageResponse>User message</MessageResponse>
        </MessageContent>
      </Message>,
    )
    expect(container.querySelector("[data-role='user']")).toBeInTheDocument()
  })

  it("renders avatar", () => {
    const { container } = render(
      <Message>
        <MessageAvatar>AI</MessageAvatar>
      </Message>,
    )
    expect(container.querySelector("[data-slot='message-avatar']")).toBeInTheDocument()
    expect(screen.getByText("AI")).toBeInTheDocument()
  })

  it("renders action buttons with tooltip", () => {
    render(
      <Message>
        <MessageActions>
          <MessageAction tooltip="Copy">Copy</MessageAction>
        </MessageActions>
      </Message>,
    )
    expect(screen.getByRole("button", { name: "Copy" })).toHaveAttribute("title", "Copy")
  })

  it("renders feedback actions", () => {
    const onUp = vi.fn()
    const onDown = vi.fn()
    render(
      <Message>
        <MessageActions>
          <MessageFeedbackActions onThumbsUp={onUp} onThumbsDown={onDown} />
        </MessageActions>
      </Message>,
    )
    expect(screen.getByRole("button", { name: "Good response" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Bad response" })).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Message>
        <MessageContent>
          <MessageResponse>Text</MessageResponse>
        </MessageContent>
      </Message>,
    )
    expect(container.querySelector("[data-slot='message']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='message-content']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='message-response']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Message>
        <MessageAvatar>AI</MessageAvatar>
        <MessageContent>
          <MessageResponse>Hello</MessageResponse>
        </MessageContent>
      </Message>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe("MessageBranchSelector", () => {
  it("renders branch navigation with aria-labels", () => {
    render(
      <Message>
        <MessageBranch total={3}>
          <MessageBranchSelector />
        </MessageBranch>
      </Message>,
    )
    expect(screen.getByRole("button", { name: "Previous response" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Next response" })).toBeInTheDocument()
    expect(screen.getByText("1 / 3")).toBeInTheDocument()
  })

  it("navigates between branches", async () => {
    const user = userEvent.setup()
    render(
      <Message>
        <MessageBranch total={3}>
          <MessageBranchSelector />
        </MessageBranch>
      </Message>,
    )
    await user.click(screen.getByRole("button", { name: "Next response" }))
    expect(screen.getByText("2 / 3")).toBeInTheDocument()
  })

  it("disables prev button at first branch", () => {
    render(
      <Message>
        <MessageBranch total={3}>
          <MessageBranchSelector />
        </MessageBranch>
      </Message>,
    )
    expect(screen.getByRole("button", { name: "Previous response" })).toBeDisabled()
  })

  it("does not render with only 1 branch", () => {
    const { container } = render(
      <Message>
        <MessageBranch total={1}>
          <MessageBranchSelector />
        </MessageBranch>
      </Message>,
    )
    expect(container.querySelector("[data-slot='message-branch-selector']")).not.toBeInTheDocument()
  })
})
