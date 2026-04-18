import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../lib/utils"

/* ────────────────────────────────────────────────────────────────────────────
 * Prose — container for rich text / markdown content
 * ──────────────────────────────────────────────────────────────────────────── */

const proseVariants = cva(
  [
    "[&>*+*]:mt-6",
    "[&>h1+*]:mt-4 [&>h2+*]:mt-4 [&>h3+*]:mt-3 [&>h4+*]:mt-3",
    "[&>hr]:my-8 [&>hr]:border-border",
    "[&_a:hover]:text-primary/80 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
    "[&_strong]:font-semibold",
    "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.875em]",
    "[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0",
    "[&_img]:rounded-lg",
    "[&_table]:w-full [&_table]:border-collapse",
    "[&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold",
    "[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "text-sm [&>h1]:text-2xl [&>h2]:text-xl [&>h3]:text-lg [&>h4]:text-base [&_li]:leading-6 [&_p]:leading-6",
        default:
          "text-base [&>h1]:text-4xl [&>h2]:text-3xl [&>h3]:text-2xl [&>h4]:text-xl [&_li]:leading-7 [&_p]:leading-7",
        lg: "text-lg [&>h1]:text-5xl [&>h2]:text-4xl [&>h3]:text-3xl [&>h4]:text-2xl [&_li]:leading-8 [&_p]:leading-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

type ProseProps = React.ComponentProps<"div"> & VariantProps<typeof proseVariants>

function Prose({ className, size, ...props }: ProseProps) {
  return <div data-slot="prose" className={cn(proseVariants({ size }), className)} {...props} />
}

/* ────────────────────────────────────────────────────────────────────────────
 * Heading components
 * ──────────────────────────────────────────────────────────────────────────── */

function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="h1"
      className={cn("scroll-m-20 text-balance font-extrabold text-4xl tracking-tight", className)}
      {...props}
    />
  )
}

function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="h2"
      className={cn(
        "scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  )
}

function H3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="h3"
      className={cn("scroll-m-20 font-semibold text-2xl tracking-tight", className)}
      {...props}
    />
  )
}

function H4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      data-slot="h4"
      className={cn("scroll-m-20 font-semibold text-xl tracking-tight", className)}
      {...props}
    />
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * Text components
 * ──────────────────────────────────────────────────────────────────────────── */

function P({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="p" className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  )
}

function Blockquote({ className, ...props }: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      data-slot="blockquote"
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  )
}

function List({
  className,
  ordered,
  ...props
}: React.ComponentProps<"ul"> & { ordered?: boolean }) {
  const listClassName = cn(
    "my-6 ml-6 [&>li]:mt-2",
    ordered ? "list-decimal" : "list-disc",
    className,
  )

  if (ordered) {
    return (
      <ol data-slot="list" className={listClassName} {...(props as React.ComponentProps<"ol">)} />
    )
  }

  return <ul data-slot="list" className={listClassName} {...props} />
}

function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="lead" className={cn("text-muted-foreground text-xl", className)} {...props} />
  )
}

function Large({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="large" className={cn("font-semibold text-lg", className)} {...props} />
}

function Small({ className, ...props }: React.ComponentProps<"small">) {
  return (
    <small
      data-slot="small"
      className={cn("font-medium text-sm leading-none", className)}
      {...props}
    />
  )
}

function Muted({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="muted" className={cn("text-muted-foreground text-sm", className)} {...props} />
  )
}

function InlineCode({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      data-slot="inline-code"
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm",
        className,
      )}
      {...props}
    />
  )
}

export type { ProseProps }
export { Blockquote, H1, H2, H3, H4, InlineCode, Large, Lead, List, Muted, P, Prose, Small }
