import { PlusCircleIcon, X } from "lucide-react"

import { cn } from "../lib/utils"

function FilterBar({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="filter-bar"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function FilterChip({
  label,
  value,
  onRemove,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  label: string
  value?: string
  onRemove?: () => void
}) {
  return (
    <span
      data-slot="filter-chip"
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-md border border-dashed px-3 text-xs",
        className,
      )}
      {...props}
    >
      <PlusCircleIcon className="size-3.5 text-muted-foreground" />
      <span className="font-medium">{label}</span>
      {value && (
        <>
          <span className="mx-0.5 h-4 w-px bg-border" />
          <span className="rounded-sm bg-secondary px-1.5 py-0.5 font-normal">{value}</span>
        </>
      )}
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${label} filter`}
          onClick={onRemove}
          className="ml-0.5 cursor-pointer rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  )
}

function FilterClear({
  onClick,
  className,
  children = "Clear all",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="filter-clear"
      className={cn("text-muted-foreground text-xs underline-offset-4 hover:underline", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export { FilterBar, FilterChip, FilterClear }
