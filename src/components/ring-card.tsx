import type * as React from "react"

import { cn } from "../lib/utils"

type RingCardProps = React.ComponentProps<"div"> & {
  solid?: boolean
}

function RingCard({
  className,
  solid = false,
  children,
  ...props
}: RingCardProps) {
  return (
    <div
      data-slot="ring-card"
      className={cn("ringcard", solid && "ringcard-solid", className)}
      {...props}
    >
      <div data-slot="ring-card-inner" className="ringcard-inner">
        {children}
      </div>
    </div>
  )
}

export { RingCard }
export type { RingCardProps }
