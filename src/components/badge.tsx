"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import type { MouseEvent } from "react"

import { cn } from "../lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-4xl border border-transparent px-2 py-0.5 font-medium text-xs transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        tagline:
          "mx-auto mb-2 flex h-auto rounded-full border-border bg-card px-3 font-semibold text-base text-foreground [a]:hover:bg-accent [a]:hover:text-accent-foreground",
        mint: "bg-mint text-mint-ink",
        sky: "bg-sky text-sky-ink",
        blush: "bg-blush text-blush-ink",
        lilac: "bg-lilac text-lilac-ink",
        highlight: "bg-highlight text-highlight-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

type BadgeOwnProps = VariantProps<typeof badgeVariants> & {
  square?: boolean
  /** Show a trailing × button. Mirrors Figma "Show close#578:0". */
  closable?: boolean
  /** Called when the close × is clicked. Implies `closable=true`. */
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void
}

function Badge({
  className,
  variant = "default",
  square = false,
  closable,
  onClose,
  children,
  render,
  ...props
}: useRender.ComponentProps<"span"> & BadgeOwnProps) {
  const showClose = closable || !!onClose
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), square && "rounded-none", className),
        children: (
          <>
            {children}
            {showClose && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onClose?.(e)
                }}
                aria-label="Remove"
                className="-mr-0.5 ml-0.5 inline-flex cursor-pointer items-center justify-center rounded-sm opacity-70 transition-opacity hover:opacity-100"
              >
                <XIcon className="size-3" />
              </button>
            )}
          </>
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
