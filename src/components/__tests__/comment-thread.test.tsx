import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Comment,
  CommentActions,
  CommentAuthor,
  CommentAvatar,
  CommentBody,
  CommentContent,
  CommentHeader,
  CommentThread,
  CommentTime,
} from "../comment-thread"

function renderThread() {
  return render(
    <CommentThread>
      <Comment>
        <CommentAvatar>SC</CommentAvatar>
        <CommentBody>
          <CommentHeader>
            <CommentAuthor>Sarah Chen</CommentAuthor>
            <CommentTime>2 hours ago</CommentTime>
          </CommentHeader>
          <CommentContent>Reviewed and cleared the false positive.</CommentContent>
          <CommentActions>
            <button type="button">Reply</button>
          </CommentActions>
        </CommentBody>
      </Comment>
    </CommentThread>,
  )
}

describe("CommentThread", () => {
  it("renders without crashing", () => {
    renderThread()
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument()
    expect(screen.getByText("Reviewed and cleared the false positive.")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = renderThread()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has data-slot attributes", () => {
    const { container } = renderThread()
    expect(container.querySelector("[data-slot='comment-thread']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='comment']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='comment-avatar']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='comment-body']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='comment-header']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='comment-author']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='comment-time']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='comment-content']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='comment-actions']")).toBeInTheDocument()
  })

  it("applies reply indent", () => {
    const { container } = render(
      <CommentThread>
        <Comment reply>
          <CommentBody>
            <CommentContent>A reply</CommentContent>
          </CommentBody>
        </Comment>
      </CommentThread>,
    )
    expect(container.querySelector("[data-slot='comment']")).toHaveClass("ml-10")
  })

  it("merges custom className on thread", () => {
    const { container } = render(<CommentThread className="my-8" />)
    expect(container.querySelector("[data-slot='comment-thread']")).toHaveClass("my-8")
  })

  it("renders time element", () => {
    renderThread()
    expect(screen.getByText("2 hours ago")).toBeInTheDocument()
  })

  it("renders action buttons", () => {
    renderThread()
    expect(screen.getByRole("button", { name: "Reply" })).toBeInTheDocument()
  })
})
