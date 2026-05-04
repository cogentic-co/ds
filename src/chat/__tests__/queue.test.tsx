import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  QueueItem,
  QueueItemContent,
  QueueItemDescription,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionTrigger,
} from "../queue"

describe("Queue", () => {
  it("renders section with trigger", () => {
    render(
      <QueueSection>
        <QueueSectionTrigger>In Progress (2)</QueueSectionTrigger>
        <QueueList>
          <QueueItem>
            <QueueItemContent>Task 1</QueueItemContent>
          </QueueItem>
        </QueueList>
      </QueueSection>,
    )
    expect(screen.getByRole("button", { name: /In Progress/ })).toBeInTheDocument()
    expect(screen.getByText("Task 1")).toBeInTheDocument()
  })

  it("is open by default", () => {
    render(
      <QueueSection>
        <QueueSectionTrigger>Items</QueueSectionTrigger>
        <QueueList>
          <QueueItem>
            <QueueItemContent>Visible</QueueItemContent>
          </QueueItem>
        </QueueList>
      </QueueSection>,
    )
    expect(screen.getByText("Visible")).toBeVisible()
  })

  it("collapses on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <QueueSection>
        <QueueSectionTrigger>Items</QueueSectionTrigger>
        <QueueList>
          <QueueItem>
            <QueueItemContent>Hidden</QueueItemContent>
          </QueueItem>
        </QueueList>
      </QueueSection>,
    )
    await user.click(screen.getByRole("button"))
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument()
  })

  it("has aria-expanded and aria-controls on trigger", () => {
    render(
      <QueueSection>
        <QueueSectionTrigger>Items</QueueSectionTrigger>
        <QueueList>
          <QueueItem>
            <QueueItemContent>Content</QueueItemContent>
          </QueueItem>
        </QueueList>
      </QueueSection>,
    )
    const trigger = screen.getByRole("button")
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(trigger).toHaveAttribute("aria-controls")
  })

  it("renders indicator with status aria-label", () => {
    const { container } = render(
      <QueueItem>
        <QueueItemIndicator status="active" />
        <QueueItemContent>Active task</QueueItemContent>
      </QueueItem>,
    )
    const indicator = container.querySelector("[data-slot='queue-item-indicator']")
    expect(indicator).toHaveAttribute("aria-label", "active")
  })

  it("renders item with description", () => {
    render(
      <QueueItem>
        <QueueItemContent>
          Task name
          <QueueItemDescription>Task details</QueueItemDescription>
        </QueueItemContent>
      </QueueItem>,
    )
    expect(screen.getByText("Task name")).toBeInTheDocument()
    expect(screen.getByText("Task details")).toBeInTheDocument()
  })

  it("queue list has role=list", () => {
    render(
      <QueueList>
        <QueueItem>
          <QueueItemContent>Item</QueueItemContent>
        </QueueItem>
      </QueueList>,
    )
    expect(screen.getByRole("list")).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <QueueSection>
        <QueueSectionTrigger>Items</QueueSectionTrigger>
        <QueueList>
          <QueueItem>
            <QueueItemIndicator />
            <QueueItemContent>Content</QueueItemContent>
          </QueueItem>
        </QueueList>
      </QueueSection>,
    )
    expect(container.querySelector("[data-slot='queue-section']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='queue-item']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='queue-item-indicator']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <QueueSection>
        <QueueSectionTrigger>Items</QueueSectionTrigger>
        <QueueList>
          <QueueItem>
            <QueueItemIndicator status="complete" />
            <QueueItemContent>Task</QueueItemContent>
          </QueueItem>
        </QueueList>
      </QueueSection>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
