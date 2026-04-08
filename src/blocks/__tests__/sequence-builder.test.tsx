import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { SequenceBuilder, type SequenceStep } from "../sequence-builder"

function buildSteps(count: number): SequenceStep[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `step-${i + 1}`,
    title: `Step ${i + 1}`,
    content: <div>Step {i + 1} content</div>,
  }))
}

describe("SequenceBuilder", () => {
  it("renders every step with numbered badges", () => {
    render(<SequenceBuilder steps={buildSteps(3)} onStepsChange={() => {}} />)
    expect(screen.getByText("Step 1")).toBeInTheDocument()
    expect(screen.getByText("Step 2")).toBeInTheDocument()
    expect(screen.getByText("Step 3")).toBeInTheDocument()
    expect(screen.getByText("01")).toBeInTheDocument()
    expect(screen.getByText("02")).toBeInTheDocument()
    expect(screen.getByText("03")).toBeInTheDocument()
  })

  it("renders step content", () => {
    render(<SequenceBuilder steps={buildSteps(2)} onStepsChange={() => {}} />)
    expect(screen.getByText("Step 1 content")).toBeInTheDocument()
    expect(screen.getByText("Step 2 content")).toBeInTheDocument()
  })

  it("renders insert buttons when onAddStep is provided", () => {
    const onAddStep = vi.fn()
    render(<SequenceBuilder steps={buildSteps(2)} onStepsChange={() => {}} onAddStep={onAddStep} />)
    // 2 steps → 3 insert buttons (before first, between, after last)
    const insertButtons = screen.getAllByLabelText("Insert step here")
    expect(insertButtons).toHaveLength(3)
  })

  it("does not render insert buttons without onAddStep", () => {
    render(<SequenceBuilder steps={buildSteps(2)} onStepsChange={() => {}} />)
    expect(screen.queryAllByLabelText("Insert step here")).toHaveLength(0)
  })

  it("calls onAddStep with the correct index", async () => {
    const user = userEvent.setup()
    const onAddStep = vi.fn()
    render(<SequenceBuilder steps={buildSteps(2)} onStepsChange={() => {}} onAddStep={onAddStep} />)
    const insertButtons = screen.getAllByLabelText("Insert step here")
    // Click the middle one (between step 1 and 2) → index should be 1
    await user.click(insertButtons[1])
    expect(onAddStep).toHaveBeenCalledWith(1)
  })

  it("renders remove buttons when onRemoveStep is provided", () => {
    const onRemoveStep = vi.fn()
    render(
      <SequenceBuilder
        steps={buildSteps(2)}
        onStepsChange={() => {}}
        onRemoveStep={onRemoveStep}
      />,
    )
    expect(screen.getByLabelText("Remove step 1")).toBeInTheDocument()
    expect(screen.getByLabelText("Remove step 2")).toBeInTheDocument()
  })

  it("calls onRemoveStep with the step id", async () => {
    const user = userEvent.setup()
    const onRemoveStep = vi.fn()
    render(
      <SequenceBuilder
        steps={buildSteps(2)}
        onStepsChange={() => {}}
        onRemoveStep={onRemoveStep}
      />,
    )
    await user.click(screen.getByLabelText("Remove step 1"))
    expect(onRemoveStep).toHaveBeenCalledWith("step-1")
  })

  it("exposes drag handles with accessible labels", () => {
    render(<SequenceBuilder steps={buildSteps(2)} onStepsChange={() => {}} />)
    expect(screen.getByLabelText("Drag step 1")).toBeInTheDocument()
    expect(screen.getByLabelText("Drag step 2")).toBeInTheDocument()
  })

  it("merges className", () => {
    const { container } = render(
      <SequenceBuilder steps={buildSteps(1)} onStepsChange={() => {}} className="custom-class" />,
    )
    expect(container.querySelector('[data-slot="sequence-builder"]')).toHaveClass("custom-class")
  })

  it("has no a11y violations", async () => {
    const { container } = render(
      <SequenceBuilder
        steps={buildSteps(2)}
        onStepsChange={() => {}}
        onAddStep={() => {}}
        onRemoveStep={() => {}}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
