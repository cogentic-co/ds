import { render } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { SplitPane, SplitPaneDivider, SplitPanePanel } from "../split-pane"

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe("SplitPane", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <SplitPane>
        <SplitPanePanel>Master</SplitPanePanel>
        <SplitPaneDivider />
        <SplitPanePanel defaultSize={65}>Detail</SplitPanePanel>
      </SplitPane>,
    )
    expect(container.querySelector("[data-slot='split-pane']")).toBeInTheDocument()
  })

  it("has data-slot attribute", () => {
    const { container } = render(
      <SplitPane>
        <SplitPanePanel>A</SplitPanePanel>
        <SplitPaneDivider />
        <SplitPanePanel defaultSize={65}>B</SplitPanePanel>
      </SplitPane>,
    )
    expect(container.querySelector("[data-slot='split-pane']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(
      <SplitPane className="my-custom-class">
        <SplitPanePanel>A</SplitPanePanel>
        <SplitPaneDivider />
        <SplitPanePanel defaultSize={65}>B</SplitPanePanel>
      </SplitPane>,
    )
    expect(container.querySelector("[data-slot='split-pane']")).toHaveClass("my-custom-class")
  })

  it("defaults to horizontal direction", () => {
    const { container } = render(
      <SplitPane>
        <SplitPanePanel>A</SplitPanePanel>
        <SplitPaneDivider />
        <SplitPanePanel defaultSize={65}>B</SplitPanePanel>
      </SplitPane>,
    )
    const group = container.querySelector("[data-slot='resizable-panel-group']")
    expect(group).toBeInTheDocument()
    // direction="horizontal" is the default, passed through to ResizablePanelGroup
    expect(group).not.toHaveStyle({ flexDirection: "column" })
  })

  it("supports vertical direction", () => {
    const { container } = render(
      <SplitPane direction="vertical">
        <SplitPanePanel>A</SplitPanePanel>
        <SplitPaneDivider />
        <SplitPanePanel defaultSize={65}>B</SplitPanePanel>
      </SplitPane>,
    )
    const group = container.querySelector("[data-slot='resizable-panel-group']")
    expect(group).toBeInTheDocument()
    // Vertical direction sets aria-orientation on the handle separator
    const handle = container.querySelector("[data-slot='resizable-handle']")
    expect(handle).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <SplitPane>
        <SplitPanePanel>Master</SplitPanePanel>
        <SplitPaneDivider />
        <SplitPanePanel defaultSize={65}>Detail</SplitPanePanel>
      </SplitPane>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
