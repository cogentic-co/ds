import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "../timeline"

function renderTimeline({ className }: { className?: string } = {}) {
  return render(
    <Timeline className={className}>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>
          <TimelineTitle>Event One</TimelineTitle>
          <TimelineTime>2 hours ago</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>
          <TimelineTitle>Event Two</TimelineTitle>
          <TimelineTime>1 day ago</TimelineTime>
        </TimelineContent>
      </TimelineItem>
    </Timeline>,
  )
}

describe("Timeline", () => {
  it("renders without crashing", () => {
    const { container } = renderTimeline()
    expect(container.querySelector("[data-slot='timeline']")).toBeInTheDocument()
  })

  it("has data-slot attributes", () => {
    const { container } = renderTimeline()
    expect(container.querySelector("[data-slot='timeline']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='timeline-item']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='timeline-dot']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='timeline-content']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='timeline-title']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='timeline-time']")).toBeInTheDocument()
  })

  it("merges custom className on Timeline", () => {
    const { container } = renderTimeline({ className: "custom-timeline" })
    expect(container.querySelector("[data-slot='timeline']")).toHaveClass("custom-timeline")
  })

  it("renders timeline items", () => {
    renderTimeline()
    expect(screen.getByText("Event One")).toBeInTheDocument()
    expect(screen.getByText("Event Two")).toBeInTheDocument()
  })

  it("renders time elements", () => {
    renderTimeline()
    expect(screen.getByText("2 hours ago")).toBeInTheDocument()
    expect(screen.getByText("1 day ago")).toBeInTheDocument()
  })

  it("merges custom className on TimelineItem", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem className="custom-item">
          <TimelineContent>
            <TimelineTitle>Test</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    )
    expect(container.querySelector("[data-slot='timeline-item']")).toHaveClass("custom-item")
  })

  it("has no accessibility violations", async () => {
    const { container } = renderTimeline()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
