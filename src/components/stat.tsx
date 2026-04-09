import { cva, type VariantProps } from "class-variance-authority"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import type * as React from "react"
import { cn } from "../lib/utils"

function Stat({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="stat" className={cn("space-y-1", className)} {...props} />
}

function StatLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="stat-label"
      className={cn("font-medium text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function StatValue({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="stat-value"
      className={cn("font-bold text-2xl tracking-tight", className)}
      {...props}
    />
  )
}

const trendVariants = cva("inline-flex items-center gap-1 font-medium text-xs", {
  variants: {
    direction: {
      up: "text-emerald-600 dark:text-emerald-400",
      down: "text-red-600 dark:text-red-400",
      neutral: "text-muted-foreground",
    },
  },
  defaultVariants: { direction: "neutral" },
})

type StatTrendProps = React.ComponentProps<"span"> & VariantProps<typeof trendVariants>

function StatTrend({ className, direction, children, ...props }: StatTrendProps) {
  return (
    <span data-slot="stat-trend" className={cn(trendVariants({ direction }), className)} {...props}>
      {direction === "up" && <TrendingUpIcon className="size-3.5" />}
      {direction === "down" && <TrendingDownIcon className="size-3.5" />}
      {children}
    </span>
  )
}

export { Stat, StatLabel, StatValue, StatTrend, trendVariants }
export type { StatTrendProps }
