"use client"

import { ArrowUp, Paperclip, X } from "lucide-react"
import {
  type ComponentProps,
  createContext,
  type FormEvent,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"
import { Button } from "../components/button"
import { Spinner } from "../components/spinner"
import {
  TextCommand,
  type TextCommandItem,
  type TextCommandValue,
  textCommandToPayload,
} from "../components/text-command"
import { cn } from "../lib/utils"

// ---------------------------------------------------------------------------
// Context for sharing input state
// ---------------------------------------------------------------------------

type PromptInputCommandPayload = {
  commands: { value: string; label: string }[]
  mentions: { value: string; label: string }[]
}

type PromptInputContextValue = {
  value: string
  setValue: (value: string) => void
  files: File[]
  addFiles: (files: File[]) => void
  removeFile: (index: number) => void
  clearFiles: () => void
  submit: () => void
  isLoading: boolean
  // Rich-text command mode (set when PromptInput has commands/mentions/parts).
  parts: TextCommandValue
  setParts: (parts: TextCommandValue) => void
  commands: TextCommandItem[]
  mentions: TextCommandItem[]
  isRich: boolean
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
  parts: controlledParts,
  defaultParts,
  onPartsChange,
  commands,
  mentions,
  className,
  children,
  ...props
}: Omit<ComponentProps<"form">, "onSubmit"> & {
  onSubmit?: (message: string, files: File[], payload?: PromptInputCommandPayload) => void
  isLoading?: boolean
  /** Controlled string value (plain-text mode). Omit for uncontrolled. */
  value?: string
  /** Called whenever the plain-text value changes. */
  onValueChange?: (value: string) => void
  /** Controlled parts value (rich-text command mode). */
  parts?: TextCommandValue
  /** Default parts (uncontrolled rich-text mode). */
  defaultParts?: TextCommandValue
  /** Called whenever the rich-text parts change. */
  onPartsChange?: (parts: TextCommandValue) => void
  /** Slash-command items. Setting this enables rich-text command mode. */
  commands?: TextCommandItem[]
  /** Mention items. Setting this enables rich-text command mode. */
  mentions?: TextCommandItem[]
}) {
  const [internalValue, setInternalValue] = useState("")
  const isValueControlled = controlledValue !== undefined
  const isPartsControlled = controlledParts !== undefined
  const isRich = Boolean(commands || mentions || controlledParts || defaultParts)

  const [internalParts, setInternalParts] = useState<TextCommandValue>(defaultParts ?? [])
  const parts = isPartsControlled ? (controlledParts as TextCommandValue) : internalParts

  const value = isRich
    ? parts
        .map((p) => (p.type === "text" ? p.value : `${p.type === "command" ? "/" : "@"}${p.value}`))
        .join("")
    : isValueControlled
      ? (controlledValue as string)
      : internalValue

  const setValue = useCallback(
    (v: string) => {
      if (!isValueControlled) setInternalValue(v)
      onValueChange?.(v)
    },
    [isValueControlled, onValueChange],
  )
  const setParts = useCallback(
    (next: TextCommandValue) => {
      if (!isPartsControlled) setInternalParts(next)
      onPartsChange?.(next)
    },
    [isPartsControlled, onPartsChange],
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
    if (isRich) {
      const payload = textCommandToPayload(parts)
      const trimmed = payload.text.trim()
      if (!trimmed && files.length === 0) return
      onSubmit?.(trimmed, files, { commands: payload.commands, mentions: payload.mentions })
      setParts([])
      setFiles([])
      return
    }
    const trimmed = value.trim()
    if (!trimmed && files.length === 0) return
    onSubmit?.(trimmed, files)
    setValue("")
    setFiles([])
  }, [isRich, parts, value, files, onSubmit, setValue, setParts])

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      submit()
    },
    [submit],
  )

  const ctxValue = useMemo<PromptInputContextValue>(
    () => ({
      value,
      setValue,
      files,
      addFiles,
      removeFile,
      clearFiles,
      submit,
      isLoading,
      parts,
      setParts,
      commands: commands ?? [],
      mentions: mentions ?? [],
      isRich,
    }),
    [
      value,
      setValue,
      files,
      addFiles,
      removeFile,
      clearFiles,
      submit,
      isLoading,
      parts,
      setParts,
      commands,
      mentions,
      isRich,
    ],
  )

  return (
    <PromptInputContext.Provider value={ctxValue}>
      <form
        data-slot="prompt-input"
        onSubmit={handleSubmit}
        className={cn(
          "relative flex w-full flex-col rounded-3xl border border-input bg-popover shadow-xs",
          "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
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
// Command-mode editor — TextCommand bound to the prompt context
// ---------------------------------------------------------------------------

/**
 * Drop-in replacement for `PromptInputTextarea` that supports `/slash`
 * commands and `@mentions`. Reads `commands`/`mentions` from the parent
 * `<PromptInput>` and writes structured parts back via context.
 */
function PromptInputCommand({
  className,
  placeholder = "Type / for commands or @ to mention",
  rows = 1,
  onTriggerQueryChange,
  filterItems,
  ariaLabel,
}: {
  className?: string
  placeholder?: string
  rows?: number
  onTriggerQueryChange?: Parameters<typeof TextCommand>[0]["onTriggerQueryChange"]
  filterItems?: boolean
  ariaLabel?: string
}) {
  const { parts, setParts, submit, isLoading, commands, mentions } = usePromptInput()
  return (
    <TextCommand
      value={parts}
      onValueChange={setParts}
      commands={commands}
      mentions={mentions}
      onTriggerQueryChange={onTriggerQueryChange}
      filterItems={filterItems}
      placeholder={placeholder}
      rows={rows}
      disabled={isLoading}
      ariaLabel={ariaLabel}
      onSubmit={isLoading ? undefined : submit}
      data-slot="prompt-input-command"
      className={cn("w-full", className)}
      editorClassName={cn(
        "border-0 bg-transparent px-0 py-0 shadow-none",
        "focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
        "dark:bg-transparent",
      )}
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
      <Button
        data-slot="prompt-input-attach-button"
        type="button"
        variant="outline"
        size="icon"
        onClick={handleClick}
        aria-label="Attach files"
        className={cn("size-9 rounded-full", className)}
        {...props}
      >
        <Paperclip aria-hidden="true" className="size-4" />
      </Button>
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
    <Button
      data-slot="prompt-input-submit"
      type="submit"
      size="icon"
      disabled={!hasContent && !isLoading}
      aria-label={isLoading ? "Working…" : "Send message"}
      className={cn("ml-auto size-9 rounded-full", className)}
      {...props}
    >
      {isLoading ? (
        <Spinner variant="lines" className="size-3" />
      ) : (
        <ArrowUp aria-hidden="true" className="size-4" />
      )}
    </Button>
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

export type { PromptInputCommandPayload }
export {
  PromptInput,
  PromptInputAction,
  PromptInputAttachButton,
  PromptInputBody,
  PromptInputCommand,
  PromptInputFiles,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInput,
}
