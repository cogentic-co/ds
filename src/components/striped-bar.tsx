/**
 * @deprecated Use `<WaffleChart mode="bar" />` instead.
 * StripedBar is now an alias for WaffleChart in bar mode.
 */
import type * as React from "react"
import { WaffleChart, type WaffleChartSegment } from "./waffle-chart"

type StripedBarSegment = WaffleChartSegment

type StripedBarProps = React.ComponentProps<"div"> & {
  /** Segments to display. Remaining percentage renders as muted blocks. */
  segments: StripedBarSegment[]
  /** Total number of columns. Defaults to 60. */
  stripes?: number
  /** Whether to animate blocks filling in. Defaults to true. */
  animated?: boolean
  /** Animation duration in ms. Defaults to 800. */
  duration?: number
}

function StripedBar({
  segments,
  stripes = 60,
  animated = true,
  duration = 800,
  ...props
}: StripedBarProps) {
  return (
    <WaffleChart
      segments={segments}
      mode="bar"
      stripes={stripes}
      animate={animated}
      duration={duration}
      {...props}
    />
  )
}

export { StripedBar }
export type { StripedBarProps, StripedBarSegment }
