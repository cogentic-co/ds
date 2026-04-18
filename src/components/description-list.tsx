import type * as React from "react"
import { cn } from "../lib/utils"

function DescriptionList({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="description-list"
      className={cn("divide-y divide-border", className)}
      {...props}
    />
  )
}

function DescriptionListItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="description-list-item"
      className={cn("flex flex-col gap-1 py-3 sm:flex-row sm:gap-4", className)}
      {...props}
    />
  )
}

function DescriptionListTerm({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-list-term"
      className={cn("font-medium text-muted-foreground text-sm sm:w-40 sm:shrink-0", className)}
      {...props}
    />
  )
}

function DescriptionListDetail({ className, ...props }: React.ComponentProps<"dd">) {
  return <dd data-slot="description-list-detail" className={cn("text-sm", className)} {...props} />
}

export { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm }
