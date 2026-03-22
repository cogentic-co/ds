"use client"

import type { ConnectionLineComponent } from "@xyflow/react"
import { cva, type VariantProps } from "class-variance-authority"

// ---------------------------------------------------------------------------
// CVA variants for connection line style
// ---------------------------------------------------------------------------

const workflowConnectionVariants = cva("", {
  variants: {
    variant: {
      default: "",
      dotted: "",
      dashed: "",
      animated: "",
    },
  },
  defaultVariants: { variant: "default" },
})

type WorkflowConnectionVariant = NonNullable<
  VariantProps<typeof workflowConnectionVariants>["variant"]
>

// Stroke dash patterns per variant
const strokeDash: Record<WorkflowConnectionVariant, string | undefined> = {
  default: undefined,
  dotted: "2, 6",
  dashed: "12, 6",
  animated: undefined,
}

// ---------------------------------------------------------------------------
// Factory — create a ConnectionLineComponent for a given variant
// ---------------------------------------------------------------------------

function createConnectionLine(variant: WorkflowConnectionVariant): ConnectionLineComponent {
  const ConnectionLine: ConnectionLineComponent = ({ fromX, fromY, toX, toY }) => {
    const dx = Math.abs(toX - fromX)
    const dy = Math.abs(toY - fromY)
    const isVertical = dy > dx

    const path = isVertical
      ? `M${fromX},${fromY} C ${fromX},${fromY + (toY - fromY) * 0.5} ${toX},${fromY + (toY - fromY) * 0.5} ${toX},${toY}`
      : `M${fromX},${fromY} C ${fromX + (toX - fromX) * 0.5},${fromY} ${fromX + (toX - fromX) * 0.5},${toY} ${toX},${toY}`

    return (
      <g>
        <path
          d={path}
          fill="none"
          stroke="var(--color-ring)"
          strokeWidth={2}
          strokeDasharray={strokeDash[variant]}
          strokeLinecap={variant === "dotted" ? "round" : undefined}
        />
        {variant === "animated" && (
          <circle fill="var(--color-primary)" r={3}>
            <animateMotion dur="1s" path={path} repeatCount="indefinite" />
          </circle>
        )}
        <circle
          cx={toX}
          cy={toY}
          fill="var(--color-card)"
          r={4}
          stroke="var(--color-ring)"
          strokeWidth={2}
        />
      </g>
    )
  }
  return ConnectionLine
}

// ---------------------------------------------------------------------------
// Pre-built connection lines
// ---------------------------------------------------------------------------

const WorkflowConnection = createConnectionLine("default")
const WorkflowConnectionDotted = createConnectionLine("dotted")
const WorkflowConnectionDashed = createConnectionLine("dashed")
const WorkflowConnectionAnimated = createConnectionLine("animated")

export {
  WorkflowConnection,
  WorkflowConnectionDotted,
  WorkflowConnectionDashed,
  WorkflowConnectionAnimated,
  workflowConnectionVariants,
  createConnectionLine,
}
export type { WorkflowConnectionVariant }
