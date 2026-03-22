import { render } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../resizable"

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe("ResizablePanelGroup", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>Panel A</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Panel B</ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(container.querySelector("[data-slot='resizable-panel-group']")).toBeInTheDocument()
  })

  it("has data-slot attributes on all sub-components", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>A</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>B</ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(container.querySelector("[data-slot='resizable-panel-group']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='resizable-panel']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='resizable-handle']")).toBeInTheDocument()
  })

  it("merges custom className on ResizablePanelGroup", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal" className="custom-group">
        <ResizablePanel>A</ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(container.querySelector("[data-slot='resizable-panel-group']")).toHaveClass(
      "custom-group",
    )
  })

  it("merges custom className on ResizableHandle", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>A</ResizablePanel>
        <ResizableHandle className="custom-handle" />
        <ResizablePanel>B</ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(container.querySelector("[data-slot='resizable-handle']")).toHaveClass("custom-handle")
  })

  it("renders handle indicator when withHandle is true", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>A</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>B</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const handle = container.querySelector("[data-slot='resizable-handle']")
    expect(handle?.querySelector("div")).toBeInTheDocument()
  })

  it("does not render handle indicator by default", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>A</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>B</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const handle = container.querySelector("[data-slot='resizable-handle']")
    expect(handle?.querySelector("div")).not.toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>Panel A</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Panel B</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
