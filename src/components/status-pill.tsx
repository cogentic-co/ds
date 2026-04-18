import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const statusPillVariants = cva(
  "inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2.5 font-medium text-xs transition-colors [&>svg]:size-3 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        neutral: "bg-muted text-muted-foreground",
        mint: "bg-mint text-mint-ink",
        sky: "bg-sky text-sky-ink",
        blush: "bg-blush text-blush-ink",
        lilac: "bg-lilac text-lilac-ink",
        highlight: "bg-highlight text-highlight-ink",
      },
      size: {
        sm: "h-5 px-2 text-[11px] [&>svg]:size-2.5",
        default: "h-6 px-2.5 text-xs",
        lg: "h-7 px-3 text-sm [&>svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
    },
  },
)

function StatusPill({
  className,
  variant,
  size,
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof statusPillVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      { className: cn(statusPillVariants({ variant, size }), className) },
      props,
    ),
    render,
    state: { slot: "status-pill", variant, size },
  })
}

export { StatusPill, statusPillVariants }
