"use client"

import { UploadIcon } from "lucide-react"
import type * as React from "react"
import { useCallback, useRef, useState } from "react"
import { cn } from "../lib/utils"

type FileUploadProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  /** Accepted file types (e.g. "image/*,.pdf") */
  accept?: string
  /** Allow multiple files */
  multiple?: boolean
  /** Max file size in bytes */
  maxSize?: number
  /** Called when files are selected */
  onChange?: (files: File[]) => void
  /** Disabled state */
  disabled?: boolean
}

function FileUpload({
  accept,
  multiple = false,
  maxSize,
  onChange,
  disabled = false,
  className,
  children,
  ...props
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    (fileList: FileList) => {
      let files = Array.from(fileList)
      if (maxSize) {
        files = files.filter((f) => f.size <= maxSize)
      }
      onChange?.(files)
    },
    [maxSize, onChange],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      if (disabled) return
      handleFiles(e.dataTransfer.files)
    },
    [disabled, handleFiles],
  )

  return (
    <div
      data-slot="file-upload"
      data-drag-over={isDragOver || undefined}
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors",
        isDragOver && "border-primary bg-primary/5",
        !isDragOver && "border-border hover:border-primary/50",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
      }}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        disabled={disabled}
        tabIndex={-1}
      />
      {children ?? (
        <>
          <UploadIcon className="size-8 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">Drop files here or click to upload</p>
            <p className="mt-1 text-muted-foreground text-xs">
              {accept ? `Accepted: ${accept}` : "Any file type"}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export { FileUpload }
export type { FileUploadProps }
