import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "../checkpoint"

describe("Checkpoint", () => {
  it("renders checkpoint with trigger", () => {
    render(
      <Checkpoint>
        <CheckpointIcon />
        <CheckpointTrigger>Resume from here</CheckpointTrigger>
      </Checkpoint>,
    )
    expect(screen.getByRole("button", { name: "Resume from here" })).toBeInTheDocument()
  })

  it("handles click on trigger", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Checkpoint>
        <CheckpointTrigger onClick={onClick}>Click me</CheckpointTrigger>
      </Checkpoint>,
    )
    await user.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("uses data-slot attributes", () => {
    const { container } = render(
      <Checkpoint>
        <CheckpointIcon />
        <CheckpointTrigger>Trigger</CheckpointTrigger>
      </Checkpoint>,
    )
    expect(container.querySelector("[data-slot='checkpoint']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='checkpoint-icon']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='checkpoint-trigger']")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Checkpoint>
        <CheckpointIcon />
        <CheckpointTrigger>Resume here</CheckpointTrigger>
      </Checkpoint>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
