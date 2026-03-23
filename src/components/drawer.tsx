"use client"

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer"
import { XIcon } from "lucide-react"
import type * as React from "react"

import { cn } from "../lib/utils"
import { Button } from "./button"

type DrawerDirection = "down" | "up" | "left" | "right"

function Drawer({
  swipeDirection = "down",
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & { swipeDirection?: DrawerDirection }) {
  return <DrawerPrimitive.Root data-slot="drawer" swipeDirection={swipeDirection} {...props} />
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Backdrop>) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-300 supports-backdrop-filter:backdrop-blur-xs [&[data-ending-style]]:opacity-0 [&[data-starting-style]]:opacity-0",
        className,
      )}
      {...props}
    />
  )
}

type DrawerContentProps = React.ComponentProps<typeof DrawerPrimitive.Popup> & {
  direction?: DrawerDirection
  showCloseButton?: boolean
  showHandle?: boolean
}

const directionClasses: Record<DrawerDirection, string> = {
  down: [
    "inset-x-0 bottom-0 max-h-[80vh] rounded-t-xl border-t",
    "[&[data-starting-style]]:translate-y-full [&[data-ending-style]]:translate-y-full",
  ].join(" "),
  up: [
    "inset-x-0 top-0 max-h-[80vh] rounded-b-xl border-b",
    "[&[data-starting-style]]:-translate-y-full [&[data-ending-style]]:-translate-y-full",
  ].join(" "),
  left: [
    "inset-y-0 left-0 w-3/4 rounded-r-xl border-r sm:max-w-sm",
    "[&[data-starting-style]]:-translate-x-full [&[data-ending-style]]:-translate-x-full",
  ].join(" "),
  right: [
    "inset-y-0 right-0 w-3/4 rounded-l-xl border-l sm:max-w-sm",
    "[&[data-starting-style]]:translate-x-full [&[data-ending-style]]:translate-x-full",
  ].join(" "),
}

function DrawerContent({
  className,
  children,
  direction = "down",
  showCloseButton = true,
  showHandle,
  ...props
}: DrawerContentProps) {
  const showHandleResolved = showHandle ?? (direction === "down" || direction === "up")
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Viewport>
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          data-direction={direction}
          className={cn(
            "group/drawer-content fixed z-50 flex h-auto flex-col bg-background text-sm transition-transform duration-300 ease-out [&[data-swiping]]:transition-none",
            directionClasses[direction],
            className,
          )}
          {...props}
        >
          {showHandleResolved && (
            <div className="mx-auto mt-4 h-1.5 w-[100px] shrink-0 rounded-full bg-muted" />
          )}
          {children}
          {showCloseButton && (
            <DrawerPrimitive.Close
              data-slot="drawer-close"
              render={<Button variant="ghost" className="absolute top-4 right-4" size="icon-sm" />}
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </DrawerPrimitive.Close>
          )}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[direction=down]/drawer-content:text-center group-data-[direction=up]/drawer-content:text-center md:gap-1.5 md:text-left",
        className,
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
export type { DrawerContentProps, DrawerDirection }
