"use client"

import { motion, type Variants } from "motion/react"
import type { ReactNode } from "react"
import { cn } from "../lib/utils"

/**
 * Vertical workflow diagram — N stages laid out top-to-bottom, each
 * stage containing 1+ nodes. Edges between adjacent stages are drawn
 * inline (not via ref measurement) using SVG cubic beziers with
 * optional travelling-dot markers.
 *
 * Connector shape is derived from adjacent stage sizes:
 *   1 → N  = fan-out
 *   N → 1  = merge
 *   N → N  = parallel
 *
 * Pass `selectedIndex` on a stage to highlight a single path through a
 * fan-out/merge (downstream for fan-out, upstream for merge). Other
 * branches render dashed + muted.
 *
 * For ref-based connections between two arbitrary DOM nodes, see
 * `AnimatedBeam` in the same module.
 */
type StageTone = "primary" | "success" | "muted"

export interface WorkflowDiagramStage {
  /** Index of the selected/highlighted node in this stage (for branching visuals). */
  selectedIndex?: number
  /** Override the auto-selected tone for the edges leading into this stage. */
  beamTone?: StageTone
  nodes: ReactNode[]
}

export interface WorkflowDiagramProps {
  stages: WorkflowDiagramStage[]
  className?: string
  /** Whether the travelling dot loops. Default: true. */
  pulse?: boolean
  /** Vertical spacing in px for each connector row. Default: 110. */
  edgeHeight?: number
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

const TONE_STROKE: Record<StageTone, string> = {
  primary: "text-primary",
  success: "text-success",
  muted: "text-border",
}

const TONE_FILL: Record<StageTone, string> = {
  primary: "fill-primary",
  success: "fill-success",
  muted: "fill-border",
}

interface StageEdgesProps {
  fromCount: number
  toCount: number
  height?: number
  selectedIndex?: number
  defaultTone: StageTone
  pulse: boolean
}

function evenSpread(count: number, spread: number): number[] {
  if (count === 1) return [0]
  const half = ((count - 1) * spread) / 2
  return Array.from({ length: count }, (_, i) => i * spread - half)
}

function StageEdges({
  fromCount,
  toCount,
  height = 110,
  selectedIndex,
  defaultTone,
  pulse,
}: StageEdgesProps) {
  const nodeSpread = 200
  const fromPositions = evenSpread(fromCount, nodeSpread)
  const toPositions = evenSpread(toCount, nodeSpread)
  const allX = [...fromPositions, ...toPositions]
  const minX = Math.min(...allX)
  const maxX = Math.max(...allX)
  const width = maxX - minX + 60
  const offsetX = -minX + 30

  const edges: Array<{
    from: number
    to: number
    tone: StageTone
    dashed: boolean
    delay: number
  }> = []

  if (fromCount === 1 && toCount > 1) {
    for (let j = 0; j < toCount; j++) {
      const isSkipped = selectedIndex != null && selectedIndex !== j
      const isSelected = selectedIndex === j
      edges.push({
        from: fromPositions[0],
        to: toPositions[j],
        tone: isSelected ? "success" : isSkipped ? "muted" : defaultTone,
        dashed: isSkipped,
        delay: j * 0.3,
      })
    }
  } else if (fromCount > 1 && toCount === 1) {
    for (let j = 0; j < fromCount; j++) {
      const isSkipped = selectedIndex != null && selectedIndex !== j
      const isSelected = selectedIndex === j
      edges.push({
        from: fromPositions[j],
        to: toPositions[0],
        tone: isSelected ? "success" : isSkipped ? "muted" : defaultTone,
        dashed: isSkipped,
        delay: j * 0.4,
      })
    }
  } else {
    const count = Math.min(fromCount, toCount)
    for (let j = 0; j < count; j++) {
      edges.push({
        from: fromPositions[j],
        to: toPositions[j],
        tone: defaultTone,
        dashed: false,
        delay: j * 0.2,
      })
    }
  }

  return (
    <div className="flex justify-center">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        aria-hidden
      >
        {edges.map((e, i) => {
          const fx = e.from + offsetX
          const tx = e.to + offsetX
          const path = `M ${fx} 0 C ${fx} ${height * 0.55}, ${tx} ${height * 0.45}, ${tx} ${height}`
          return (
            <g key={i}>
              <path
                d={path}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray={e.dashed ? "3 3" : undefined}
                className={TONE_STROKE[e.tone]}
              />
              <circle cx={fx} cy={0} r={3} className={TONE_FILL[e.tone]} />
              <circle cx={tx} cy={height} r={3} className={TONE_FILL[e.tone]} />
              {pulse && !e.dashed && (
                <motion.circle r={2.5} className={TONE_FILL[e.tone]} initial={{ opacity: 0 }}>
                  <animateMotion
                    dur="1.6s"
                    begin={`${e.delay}s`}
                    repeatCount="indefinite"
                    path={path}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="1.6s"
                    begin={`${e.delay}s`}
                    repeatCount="indefinite"
                  />
                </motion.circle>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function WorkflowDiagram({
  stages,
  className,
  pulse = true,
  edgeHeight = 110,
}: WorkflowDiagramProps) {
  const elements: ReactNode[] = []

  for (let s = 0; s < stages.length; s++) {
    const stage = stages[s]

    elements.push(
      <motion.div
        key={`stage-${s}`}
        className="flex items-start justify-center gap-6"
        variants={fadeUp}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {stage.nodes.map((node, n) => (
          <div key={n}>{node}</div>
        ))}
      </motion.div>,
    )

    if (s < stages.length - 1) {
      const from = stage
      const to = stages[s + 1]
      const fromCount = from.nodes.length
      const toCount = to.nodes.length

      const defaultTone: StageTone =
        to.beamTone ??
        (fromCount === 1 && toCount > 1
          ? "primary"
          : fromCount > 1 && toCount === 1
            ? "success"
            : "muted")

      const sel =
        fromCount === 1 && toCount > 1
          ? to.selectedIndex
          : fromCount > 1 && toCount === 1
            ? from.selectedIndex
            : undefined

      elements.push(
        <motion.div
          key={`edge-${s}`}
          variants={fadeUp}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <StageEdges
            fromCount={fromCount}
            toCount={toCount}
            height={edgeHeight}
            selectedIndex={sel}
            defaultTone={defaultTone}
            pulse={pulse}
          />
        </motion.div>,
      )
    }
  }

  return (
    <motion.div
      data-slot="workflow-diagram"
      className={cn("flex flex-col items-center", className)}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.12 }}
    >
      {elements}
    </motion.div>
  )
}
