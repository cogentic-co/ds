import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { Task, TaskContent, TaskItem, TaskItemFile, TaskTrigger } from "../task"

describe("Task", () => {
  it("renders trigger with text", () => {
    render(
      <Task>
        <TaskTrigger>Install dependencies</TaskTrigger>
        <TaskContent>Details</TaskContent>
      </Task>,
    )
    expect(screen.getByRole("button", { name: /Install dependencies/i })).toBeInTheDocument()
  })

  it("content is hidden by default", () => {
    render(
      <Task>
        <TaskTrigger>Task</TaskTrigger>
        <TaskContent>Hidden</TaskContent>
      </Task>,
    )
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument()
  })

  it("expands content when trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Task>
        <TaskTrigger>Task</TaskTrigger>
        <TaskContent>Visible</TaskContent>
      </Task>,
    )
    await user.click(screen.getByRole("button"))
    expect(screen.getByText("Visible")).toBeVisible()
  })

  it("has aria-expanded and aria-controls", () => {
    render(
      <Task>
        <TaskTrigger>Task</TaskTrigger>
        <TaskContent>Content</TaskContent>
      </Task>,
    )
    const trigger = screen.getByRole("button")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).toHaveAttribute("aria-controls")
  })

  it("renders task items with status", () => {
    render(
      <Task defaultOpen>
        <TaskTrigger status="running">Running task</TaskTrigger>
        <TaskContent>
          <TaskItem status="complete">Step 1</TaskItem>
          <TaskItem status="running">Step 2</TaskItem>
          <TaskItem status="pending">Step 3</TaskItem>
        </TaskContent>
      </Task>,
    )
    expect(screen.getByText("Step 1")).toBeInTheDocument()
    expect(screen.getByText("Step 2")).toBeInTheDocument()
    expect(screen.getByText("Step 3")).toBeInTheDocument()
  })

  it("renders file reference", () => {
    render(
      <Task defaultOpen>
        <TaskTrigger>Task</TaskTrigger>
        <TaskContent>
          <TaskItem>
            Editing <TaskItemFile filename="index.ts" />
          </TaskItem>
        </TaskContent>
      </Task>,
    )
    expect(screen.getByText("index.ts")).toBeInTheDocument()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Task defaultOpen>
        <TaskTrigger>Task</TaskTrigger>
        <TaskContent>
          <TaskItem>Item</TaskItem>
        </TaskContent>
      </Task>,
    )
    expect(container.querySelector("[data-slot='task']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='task-trigger']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='task-content']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='task-item']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Task>
        <TaskTrigger status="running">Task</TaskTrigger>
        <TaskContent>
          <TaskItem status="complete">Done</TaskItem>
        </TaskContent>
      </Task>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("non-collapsible Task hides chevron and renders content immediately", () => {
    render(
      <Task collapsible={false}>
        <TaskTrigger status="complete">Single task</TaskTrigger>
        <TaskContent>Always visible</TaskContent>
      </Task>,
    )
    const trigger = screen.getByRole("button", { name: /Single task/ })
    expect(trigger).not.toHaveAttribute("aria-expanded")
    expect(screen.getByText("Always visible")).toBeInTheDocument()
  })

  it("complete status applies success tone class", () => {
    render(
      <Task>
        <TaskTrigger status="complete">Done</TaskTrigger>
      </Task>,
    )
    expect(screen.getByRole("button", { name: /Done/ })).toHaveClass("bg-mint/40")
  })

  it("error status applies error tone class", () => {
    render(
      <Task>
        <TaskTrigger status="error">Failed</TaskTrigger>
      </Task>,
    )
    expect(screen.getByRole("button", { name: /Failed/ })).toHaveClass("bg-blush/40")
  })

  it("complete TaskItem text does not have line-through", () => {
    const { container } = render(
      <Task defaultOpen>
        <TaskTrigger>Group</TaskTrigger>
        <TaskContent>
          <TaskItem status="complete">Done</TaskItem>
        </TaskContent>
      </Task>,
    )
    const span = container.querySelector("[data-slot='task-item'] span")
    expect(span).not.toHaveClass("line-through")
  })
})
