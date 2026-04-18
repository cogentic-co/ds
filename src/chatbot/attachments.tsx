"use client"

import { File, FileAudio, FileImage, FileVideo, X } from "lucide-react"
import type { ComponentProps } from "react"
import { cn } from "../lib/utils"

function Attachments({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="attachments" className={cn("flex flex-wrap gap-2", className)} {...props} />
  )
}

type AttachmentType = "image" | "video" | "audio" | "file"

const typeIcons: Record<AttachmentType, typeof File> = {
  image: FileImage,
  video: FileVideo,
  audio: FileAudio,
  file: File,
}

function Attachment({
  name,
  type = "file",
  url,
  onRemove,
  className,
  ...props
}: ComponentProps<"div"> & {
  name: string
  type?: AttachmentType
  url?: string
  onRemove?: () => void
}) {
  const Icon = typeIcons[type]

  return (
    <div
      data-slot="attachment"
      className={cn(
        "group/attachment relative flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2",
        "text-sm transition-colors",
        className,
      )}
      {...props}
    >
      {type === "image" && url ? (
        <img src={url} alt={name} className="size-8 rounded object-cover" />
      ) : (
        <Icon className="size-4 shrink-0 text-muted-foreground" />
      )}
      <span className="min-w-0 truncate text-foreground">{name}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className="ml-1 shrink-0 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X aria-hidden="true" className="size-3" />
        </button>
      )}
    </div>
  )
}

export type { AttachmentType }
export { Attachment, Attachments }
