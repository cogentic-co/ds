import type * as React from "react"
import { cn } from "../lib/utils"

function CommentThread({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="comment-thread" className={cn("space-y-4", className)} {...props} />
}

type CommentProps = React.ComponentProps<"div"> & {
  /** Whether this is a reply (indented) */
  reply?: boolean
}

function Comment({ reply, className, ...props }: CommentProps) {
  return (
    <div data-slot="comment" className={cn("flex gap-3", reply && "ml-10", className)} {...props} />
  )
}

function CommentAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="comment-avatar"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-xs",
        className,
      )}
      {...props}
    />
  )
}

function CommentBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="comment-body"
      className={cn("min-w-0 flex-1 space-y-1", className)}
      {...props}
    />
  )
}

function CommentHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="comment-header"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function CommentAuthor({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="comment-author" className={cn("font-medium text-sm", className)} {...props} />
  )
}

function CommentTime({ className, ...props }: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="comment-time"
      className={cn("text-muted-foreground text-xs", className)}
      {...props}
    />
  )
}

function CommentContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="comment-content"
      className={cn("text-foreground text-sm", className)}
      {...props}
    />
  )
}

function CommentActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="comment-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

export type { CommentProps }
export {
  Comment,
  CommentActions,
  CommentAuthor,
  CommentAvatar,
  CommentBody,
  CommentContent,
  CommentHeader,
  CommentThread,
  CommentTime,
}
