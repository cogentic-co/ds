"use client"

import type * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "../lib/utils"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./resizable"

type SplitPaneDirection = "horizontal" | "vertical"

interface SplitPaneProps extends Omit<React.ComponentProps<"div">, "dir"> {
  /** Layout direction. @default "horizontal" */
  direction?: SplitPaneDirection
  children: React.ReactNode
}

function SplitPane({ direction = "horizontal", className, children, ...props }: SplitPaneProps) {
  return (
    <div data-slot="split-pane" className={cn("flex h-full w-full", className)} {...props}>
      {/* @ts-expect-error direction type mismatch between react-resizable-panels versions */}
      <ResizablePanelGroup direction={direction}>{children}</ResizablePanelGroup>
    </div>
  )
}

interface SplitPanePanelProps extends ResizablePrimitive.PanelProps {}

function SplitPanePanel({ minSize = 20, defaultSize = 35, ...props }: SplitPanePanelProps) {
  return <ResizablePanel minSize={minSize} defaultSize={defaultSize} {...props} />
}

interface SplitPaneDividerProps
  extends Omit<React.ComponentProps<typeof ResizableHandle>, "withHandle"> {
  /** Show a visible grab indicator. @default true */
  withHandle?: boolean
}

function SplitPaneDivider({ withHandle = true, className, ...props }: SplitPaneDividerProps) {
  return (
    <ResizableHandle
      withHandle={withHandle}
      className={cn("data-[slot=resizable-handle]:bg-border", className)}
      {...props}
    />
  )
}

export { SplitPane, SplitPaneDivider, SplitPanePanel }
export type { SplitPaneDividerProps, SplitPaneDirection, SplitPaneProps, SplitPanePanelProps }
