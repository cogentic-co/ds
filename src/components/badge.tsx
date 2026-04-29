"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import type { MouseEvent } from "react"

import { cn } from "../lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap border border-transparent font-medium transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      // `size` and `shape` come first so explicit `variant` styles can win when
      // they need to (e.g. `tagline` overrides shape with `rounded-full`).
      size: {
        sm: "h-4 px-1.5 text-[10px] [&>svg]:size-2.5!",
        default: "h-5 px-2 py-0.5 text-xs",
        lg: "h-6 px-2.5 py-1 text-sm [&>svg]:size-3.5!",
      },
      shape: {
        pill: "rounded-4xl",
        square: "rounded-[6px]",
      },
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
      size: "default",
      shape: "pill",
    },
  },
)

const dotSizeClass: Record<NonNullable<VariantProps<typeof badgeVariants>["size"]>, string> = {
  sm: "size-1.5",
  default: "size-1.5",
  lg: "size-2",
}

type BadgeOwnProps = VariantProps<typeof badgeVariants> & {
  /**
   * @deprecated Use `shape="square"` instead. Kept for backwards-compat —
   * `square=true` is equivalent to `shape="square"`.
   */
  square?: boolean
  /** Render a leading status dot. Mirrors Figma "Dot=On". */
  dot?: boolean
  /** Show a trailing × button. Mirrors Figma "Show close#578:0". */
  closable?: boolean
  /** Called when the close × is clicked. Implies `closable=true`. */
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void
}

function Badge({
  className,
  variant = "default",
  size = "default",
  shape,
  square,
  dot,
  closable,
  onClose,
  children,
  render,
  ...props
}: useRender.ComponentProps<"span"> & BadgeOwnProps) {
  // Backwards-compat: if `square` is true and no explicit `shape`, treat as square.
  const resolvedShape = shape ?? (square ? "square" : "pill")
  const showClose = closable || !!onClose

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size, shape: resolvedShape }), className),
        children: (
          <>
            {dot && (
              <span
                aria-hidden
                className={cn(
                  "inline-block shrink-0 rounded-full bg-current",
                  dotSizeClass[size ?? "default"],
                )}
              />
            )}
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
      size,
      shape: resolvedShape,
    },
  })
}

export { Badge, badgeVariants }
