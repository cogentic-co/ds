import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import type * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/card"
import { cn } from "../lib/utils"

type StatCardProps = React.ComponentProps<typeof Card> & {
  label: string
  value: string | number
  description?: string
  trend?: string
  trendDirection?: "up" | "down" | "neutral"
  icon?: React.ReactNode
}

function StatCard({
  label,
  value,
  description,
  trend,
  trendDirection,
  icon,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card data-slot="stat-card" className={cn("", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-muted-foreground text-sm">{label}</CardTitle>
        {icon && <span className="text-muted-foreground [&>svg]:size-4">{icon}</span>}
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">{value}</div>
        {(description || trend) && (
          <p className="mt-1 flex items-center gap-1 text-muted-foreground text-xs">
            {trend && trendDirection && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-medium",
                  trendDirection === "up" && "text-emerald-600 dark:text-emerald-400",
                  trendDirection === "down" && "text-red-600 dark:text-red-400",
                )}
              >
                {trendDirection === "up" && <TrendingUpIcon className="size-3" />}
                {trendDirection === "down" && <TrendingDownIcon className="size-3" />}
                {trend}
              </span>
            )}
            {description && <span>{description}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export type { StatCardProps }
export { StatCard }
