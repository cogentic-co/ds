"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[10px] border border-transparent bg-clip-padding font-semibold text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[inset_0_-1px_0_rgba(0,0,0,0.2)] hover:bg-primary/85 dark:shadow-[inset_0_-1px_0_rgba(255,255,255,0.06)]",
        outline:
          "border-border bg-card shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline",
        callout: "border bg-tagline shadow-sm hover:bg-primary/90 hover:text-background",
        toggle:
          "rounded-full border border-input bg-card shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default:
          "h-10 gap-2 in-data-[slot=button-group]:rounded-md px-3.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 in-data-[slot=button-group]:rounded-md rounded-[min(var(--radius-md),8px)] px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 in-data-[slot=button-group]:rounded-md rounded-[min(var(--radius-md),10px)] px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xl: "h-12 gap-2 rounded-xl px-6 text-base [&_svg:not([class*='size-'])]:size-5",
        xxl: "h-14 gap-2.5 rounded-xl px-8 text-base [&_svg:not([class*='size-'])]:size-5",
        icon: "size-9",
        "icon-xs":
          "size-6 in-data-[slot=button-group]:rounded-md rounded-[min(var(--radius-md),8px)] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 in-data-[slot=button-group]:rounded-md rounded-[min(var(--radius-md),10px)]",
        "icon-lg": "size-10",
      },
      font: {
        default: "",
        mono: "font-mono font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      font: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  font = "default",
  render,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, font, className }))}
      nativeButton={!render}
      render={render}
      {...props}
    />
  )
}

export { Button, buttonVariants }
