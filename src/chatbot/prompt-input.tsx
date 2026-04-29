"use client"

import { ArrowUp, Paperclip, Square, X } from "lucide-react"
import {
  type ComponentProps,
  createContext,
  type FormEvent,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react"
import { cn } from "../lib/utils"

// ---------------------------------------------------------------------------
// Context for sharing input state
// ---------------------------------------------------------------------------

type PromptInputContextValue = {
  value: string
  setValue: (value: string) => void
  files: File[]
  addFiles: (files: File[]) => void
  removeFile: (index: number) => void
  clearFiles: () => void
  submit: () => void
  isLoading: boolean
}

const PromptInputContext = createContext<PromptInputContextValue | null>(null)

function usePromptInput() {
  const ctx = useContext(PromptInputContext)
  if (!ctx) throw new Error("usePromptInput must be used within <PromptInput>")
  return ctx
}

// ---------------------------------------------------------------------------
// Root — form wrapper with context
// ---------------------------------------------------------------------------

function PromptInput({
  onSubmit,
  isLoading = false,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: Omit<ComponentProps<"form">, "onSubmit"> & {
  onSubmit?: (message: string, files: File[]) => void
  isLoading?: boolean
  /** Controlled value. Omit for uncontrolled. */
  value?: string
  /** Called whenever the textarea value changes. */
  onValueChange?: (value: string) => void
}) {
  const [internalValue, setInternalValue] = useState("")
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue
  const setValue = useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v)
      onValueChange?.(v)
    },
    [isControlled, onValueChange],
  )
  const [files, setFiles] = useState<File[]>([])

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const clearFiles = useCallback(() => setFiles([]), [])

  const submit = useCallback(() => {
    if (!value.trim() && files.length === 0) return
    onSubmit?.(value.trim(), files)
    setValue("")
    setFiles([])
  }, [value, files, onSubmit, setValue])

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      submit()
    },
    [submit],
  )

  return (
    <PromptInputContext.Provider
      value={{ value, setValue, files, addFiles, removeFile, clearFiles, submit, isLoading }}
    >
      <form
        data-slot="prompt-input"
        onSubmit={handleSubmit}
        className={cn(
          "flex flex-col rounded-2xl border border-border bg-card shadow-sm",
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          className,
        )}
        {...props}
      >
        {children}
      </form>
    </PromptInputContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Layout areas
// ---------------------------------------------------------------------------

function PromptInputHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-header"
      className={cn("border-border border-b px-4 py-2", className)}
      {...props}
    />
  )
}

function PromptInputBody({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="prompt-input-body" className={cn("flex-1", className)} {...props} />
}

function PromptInputFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-footer"
      className={cn("flex items-center gap-2 px-3 py-2", className)}
      {...props}
    />
  )
}

/**
 * `PromptInputActions` — row of action buttons (left-aligned utilities,
 * right-aligned submit/voice). Mirrors prompt-kit's API.
 */
function PromptInputActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

/**
 * `PromptInputAction` — a single action with an optional tooltip.
 * Wraps `Tooltip` from `@base-ui/react/tooltip`.
 */
function PromptInputAction({
  tooltip,
  side = "top",
  children,
}: {
  tooltip?: string
  side?: "top" | "bottom" | "left" | "right"
  children: React.ReactElement
}) {
  if (!tooltip) return children
  return (
    <span data-slot="prompt-input-action" title={tooltip} data-side={side}>
      {children}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Textarea — auto-resizing input
// ---------------------------------------------------------------------------

function PromptInputTextarea({ className, onKeyDown, ...props }: ComponentProps<"textarea">) {
  const { value, setValue, submit, isLoading } = usePromptInput()
  const ref = useRef<HTMLTextAreaElement>(null)

  const handleInput = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        if (!isLoading) submit()
      }
      onKeyDown?.(e)
    },
    [submit, isLoading, onKeyDown],
  )

  return (
    <textarea
      ref={ref}
      data-slot="prompt-input-textarea"
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        handleInput()
      }}
      onKeyDown={handleKeyDown}
      placeholder="Type a message..."
      rows={1}
      disabled={isLoading}
      className={cn(
        "w-full resize-none bg-transparent px-4 py-3 text-foreground text-sm",
        "placeholder:text-muted-foreground",
        "focus:outline-none",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Toolbar / tools
// ---------------------------------------------------------------------------

function PromptInputTools({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-tools"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Attach button
// ---------------------------------------------------------------------------

function PromptInputAttachButton({
  accept,
  multiple = true,
  className,
  ...props
}: Omit<ComponentProps<"button">, "onClick"> & {
  accept?: string
  multiple?: boolean
}) {
  const { addFiles } = usePromptInput()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files
      if (fileList) {
        addFiles(Array.from(fileList))
        e.target.value = ""
      }
    },
    [addFiles],
  )

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        data-slot="prompt-input-attach-button"
        type="button"
        onClick={handleClick}
        aria-label="Attach files"
        className={cn(
          "inline-flex items-center justify-center rounded-md p-2",
          "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          className,
        )}
        {...props}
      >
        <Paperclip aria-hidden="true" className="size-4" />
      </button>
    </>
  )
}

// ---------------------------------------------------------------------------
// Submit button
// ---------------------------------------------------------------------------

function PromptInputSubmit({ className, ...props }: ComponentProps<"button">) {
  const { value, files, isLoading } = usePromptInput()
  const hasContent = value.trim().length > 0 || files.length > 0

  return (
    <button
      data-slot="prompt-input-submit"
      type="submit"
      disabled={!hasContent && !isLoading}
      aria-label={isLoading ? "Stop generation" : "Send message"}
      className={cn(
        "ml-auto inline-flex items-center justify-center rounded-full p-2",
        "transition-colors",
        isLoading
          ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
          : hasContent
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-muted text-muted-foreground",
        className,
      )}
      {...props}
    >
      {isLoading ? <Square className="size-4" /> : <ArrowUp className="size-4" />}
    </button>
  )
}

// ---------------------------------------------------------------------------
// File preview list
// ---------------------------------------------------------------------------

function PromptInputFiles({ className, ...props }: ComponentProps<"div">) {
  const { files, removeFile } = usePromptInput()
  if (files.length === 0) return null

  return (
    <div
      data-slot="prompt-input-files"
      className={cn("flex flex-wrap gap-2 px-4 pt-2", className)}
      {...props}
    >
      {files.map((file, i) => (
        <span
          key={`${file.name}-${i}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-2.5 py-1 text-foreground text-xs"
        >
          {file.name}
          <button
            type="button"
            onClick={() => removeFile(i)}
            aria-label={`Remove ${file.name}`}
            className="rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X aria-hidden="true" className="size-3" />
          </button>
        </span>
      ))}
    </div>
  )
}

export {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputAttachButton,
  PromptInputBody,
  PromptInputFiles,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInput,
}
