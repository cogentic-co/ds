"use client"

import {
  type ComponentProps,
  forwardRef,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { cn } from "../lib/utils"
import { OptionMenu, type OptionMenuItem } from "./option-menu"

type TextCommandTrigger = "/" | "@"

type TextCommandItem = {
  value: string
  label: string
  description?: string
  icon?: ReactNode
}

type TextCommandPart =
  | { type: "text"; value: string }
  | { type: "command"; value: string; label: string }
  | { type: "mention"; value: string; label: string }

type TextCommandValue = TextCommandPart[]

type TextCommandTriggerState = {
  trigger: TextCommandTrigger
  query: string
}

type TextCommandProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue"> & {
  value?: TextCommandValue
  defaultValue?: TextCommandValue
  onValueChange?: (value: TextCommandValue) => void
  commands?: TextCommandItem[]
  mentions?: TextCommandItem[]
  /**
   * Fires whenever the active trigger menu state changes. Useful for
   * driving server-side mention/command lookups — debounce in the parent
   * if the API is hit per keystroke.
   */
  onTriggerQueryChange?: (state: TextCommandTriggerState | null) => void
  placeholder?: string
  disabled?: boolean
  rows?: number
  /** id forwarded to the editable element (for label-for). */
  inputId?: string
  /** Forwarded to the editable element. */
  ariaLabel?: string
  /**
   * Skip the built-in label/value substring filter — useful when the
   * `commands` / `mentions` props are already filtered by the parent
   * (e.g. results of a server-side search).
   */
  filterItems?: boolean
  /**
   * Fired when the user presses Enter (no Shift) while the menu is closed.
   * Useful for submit-on-Enter prompt patterns. Shift+Enter inserts a
   * newline regardless.
   */
  onSubmit?: () => void
  /**
   * Class names applied to the inner editable element. Use to override
   * the default border / focus ring (e.g. when nesting inside another
   * surface that already provides them).
   */
  editorClassName?: string
}

// ─── helpers ───────────────────────────────────────────────────────

function textCommandToString(parts: TextCommandValue): string {
  return parts
    .map((p) => {
      if (p.type === "text") return p.value
      return `${p.type === "command" ? "/" : "@"}${p.value}`
    })
    .join("")
}

function textCommandToPayload(parts: TextCommandValue) {
  const commands: { value: string; label: string }[] = []
  const mentions: { value: string; label: string }[] = []
  for (const p of parts) {
    if (p.type === "command") commands.push({ value: p.value, label: p.label })
    else if (p.type === "mention") mentions.push({ value: p.value, label: p.label })
  }
  return { text: textCommandToString(parts), commands, mentions }
}

function normalizeParts(parts: TextCommandValue): TextCommandValue {
  const out: TextCommandValue = []
  for (const p of parts) {
    if (p.type === "text") {
      if (!p.value) continue
      const last = out[out.length - 1]
      if (last?.type === "text") {
        last.value += p.value
        continue
      }
    }
    out.push(p)
  }
  return out
}

function partsEqual(a: TextCommandValue, b: TextCommandValue): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    const x = a[i]
    const y = b[i]
    if (x.type !== y.type) return false
    if (x.type === "text") {
      if (y.type !== "text" || x.value !== y.value) return false
    } else {
      if (y.type === "text") return false
      if (x.value !== y.value || x.label !== y.label) return false
    }
  }
  return true
}

// Read the contentEditable DOM into a parts array.
function partsFromDom(root: HTMLElement): TextCommandValue {
  const parts: TextCommandValue = []
  const push = (p: TextCommandPart) => {
    if (p.type === "text") {
      if (!p.value) return
      const last = parts[parts.length - 1]
      if (last?.type === "text") {
        last.value += p.value
        return
      }
    }
    parts.push(p)
  }
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const raw = child.textContent ?? ""
        push({ type: "text", value: raw.replace(/​/g, "") })
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as HTMLElement
        const chipType = el.dataset.chip as "command" | "mention" | undefined
        if (chipType) {
          push({
            type: chipType,
            value: el.dataset.value ?? "",
            label: el.dataset.label ?? "",
          })
        } else if (el.tagName === "BR") {
          push({ type: "text", value: "\n" })
        } else {
          walk(el)
        }
      }
    }
  }
  walk(root)
  return parts
}

// Serialize parts back to DOM children.
function renderParts(root: HTMLElement, parts: TextCommandValue) {
  root.innerHTML = ""
  for (const p of parts) {
    if (p.type === "text") {
      root.appendChild(document.createTextNode(p.value))
    } else {
      const span = document.createElement("span")
      span.contentEditable = "false"
      span.dataset.chip = p.type
      span.dataset.value = p.value
      span.dataset.label = p.label
      span.className = chipClassName(p.type)
      span.textContent = `${p.type === "command" ? "/" : "@"}${p.label}`
      root.appendChild(span)
    }
  }
  // Trailing zero-width space so caret can sit after a final chip.
  if (parts.length === 0 || parts[parts.length - 1]?.type !== "text") {
    root.appendChild(document.createTextNode("​"))
  }
}

function chipClassName(type: "command" | "mention"): string {
  const base =
    "mx-0.5 inline-flex h-5 select-none items-center rounded-full px-1.5 align-baseline font-medium text-xs leading-none"
  return type === "command"
    ? `${base} bg-highlight text-highlight-ink`
    : `${base} bg-sky text-sky-ink`
}

type TriggerHit = {
  trigger: TextCommandTrigger
  query: string
  textNode: Text
  /** Offset of the trigger char in the text node (e.g. position of `@`). */
  triggerOffset: number
  /** Caret offset captured at read time (end of the query span). */
  caretOffset: number
}

// Walk to the previous trigger char in the text immediately before caret.
function readTriggerAtCaret(root: HTMLElement): TriggerHit | null {
  const sel = root.ownerDocument.getSelection()
  if (!sel || sel.rangeCount === 0) return null
  const range = sel.getRangeAt(0)
  if (!root.contains(range.startContainer)) return null
  if (range.startContainer.nodeType !== Node.TEXT_NODE) return null
  const textNode = range.startContainer as Text
  const offset = range.startOffset
  const value = textNode.textContent ?? ""
  let i = offset
  while (i > 0) {
    const ch = value.charAt(i - 1)
    if (ch === "/" || ch === "@") {
      const before = i >= 2 ? value.charAt(i - 2) : ""
      const isStart =
        i === 1 && (textNode.previousSibling === null || isChip(textNode.previousSibling))
      if (isStart || /\s/.test(before)) {
        return {
          trigger: ch as TextCommandTrigger,
          query: value.slice(i, offset),
          textNode,
          triggerOffset: i - 1,
          caretOffset: offset,
        }
      }
      return null
    }
    if (/\s/.test(ch)) return null
    i--
  }
  return null
}

function isChip(node: Node | null): boolean {
  if (!node || node.nodeType !== Node.ELEMENT_NODE) return false
  return Boolean((node as HTMLElement).dataset?.chip)
}

function placeCaretAtEnd(root: HTMLElement) {
  const range = root.ownerDocument.createRange()
  range.selectNodeContents(root)
  range.collapse(false)
  const sel = root.ownerDocument.getSelection()
  if (!sel) return
  sel.removeAllRanges()
  sel.addRange(range)
}

// ─── component ─────────────────────────────────────────────────────

const TextCommand = forwardRef<HTMLDivElement, TextCommandProps>(function TextCommand(
  {
    value,
    defaultValue,
    onValueChange,
    commands = [],
    mentions = [],
    onTriggerQueryChange,
    placeholder = "Type / for commands or @ to mention",
    disabled,
    rows = 3,
    inputId,
    ariaLabel,
    filterItems = true,
    onSubmit,
    editorClassName,
    className,
    ...props
  },
  ref,
) {
  const isControlled = value !== undefined
  const [innerParts, setInnerParts] = useState<TextCommandValue>(() =>
    normalizeParts(defaultValue ?? []),
  )
  const parts = isControlled ? (value as TextCommandValue) : innerParts

  const editorRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => editorRef.current as HTMLDivElement, [])

  const reactId = useId()
  const menuId = `text-command-menu-${reactId}`

  const [trig, setTrig] = useState<TextCommandTriggerState | null>(null)
  const [selectedValue, setSelectedValue] = useState("")

  const lastWrittenRef = useRef<TextCommandValue | null>(null)
  const lastTrigRef = useRef<TextCommandTriggerState | null>(null)
  const onTriggerQueryChangeRef = useRef(onTriggerQueryChange)
  useEffect(() => {
    onTriggerQueryChangeRef.current = onTriggerQueryChange
  }, [onTriggerQueryChange])

  const items = useMemo<TextCommandItem[]>(
    () => (trig ? (trig.trigger === "/" ? commands : mentions) : []),
    [trig, commands, mentions],
  )
  const filtered = useMemo(() => {
    if (!trig) return []
    if (!filterItems) return items
    const q = trig.query.toLowerCase()
    if (!q) return items
    return items.filter(
      (i) => i.label.toLowerCase().includes(q) || i.value.toLowerCase().includes(q),
    )
  }, [trig, items, filterItems])

  // Sync DOM ← parts when controlled value changes from outside (e.g. async
  // resolution). Skip when the change originated from our own onInput.
  useLayoutEffect(() => {
    const el = editorRef.current
    if (!el) return
    if (lastWrittenRef.current && partsEqual(lastWrittenRef.current, parts)) return
    const current = partsFromDom(el)
    if (partsEqual(current, parts)) return
    const sel = el.ownerDocument.getSelection()
    const caretInside = el.contains(sel?.anchorNode ?? null)
    renderParts(el, parts)
    if (!caretInside) placeCaretAtEnd(el)
  }, [parts])

  const setTrigger = useCallback((next: TextCommandTriggerState | null) => {
    const prev = lastTrigRef.current
    const same =
      prev === next ||
      (prev !== null && next !== null && prev.trigger === next.trigger && prev.query === next.query)
    lastTrigRef.current = next
    setTrig(next)
    if (!same) onTriggerQueryChangeRef.current?.(next)
  }, [])

  const writeParts = useCallback(
    (next: TextCommandValue) => {
      const normalized = normalizeParts(next)
      lastWrittenRef.current = normalized
      if (!isControlled) setInnerParts(normalized)
      onValueChange?.(normalized)
    },
    [isControlled, onValueChange],
  )

  const closeMenu = useCallback(() => {
    setTrigger(null)
  }, [setTrigger])

  const updateTriggerFromDom = useCallback(() => {
    const el = editorRef.current
    if (!el) return
    const hit = readTriggerAtCaret(el)
    setTrigger(hit ? { trigger: hit.trigger, query: hit.query } : null)
  }, [setTrigger])

  // Sync selectedValue to the first filtered item whenever the list changes.
  useEffect(() => {
    setSelectedValue(filtered[0]?.value ?? "")
  }, [filtered])

  const handleInput = useCallback(() => {
    const el = editorRef.current
    if (!el) return
    const next = partsFromDom(el)
    if (!partsEqual(next, parts)) {
      writeParts(next)
    }
    updateTriggerFromDom()
  }, [parts, writeParts, updateTriggerFromDom])

  const insertChip = useCallback(
    (item: TextCommandItem) => {
      const el = editorRef.current
      if (!el || !trig) return
      const hit = readTriggerAtCaret(el)
      if (!hit) return

      const node = hit.textNode
      const original = node.textContent ?? ""
      const before = original.slice(0, hit.triggerOffset)
      const after = original.slice(hit.caretOffset)
      node.textContent = before

      const chipKind = hit.trigger === "/" ? "command" : "mention"
      const chipSpan = el.ownerDocument.createElement("span")
      chipSpan.contentEditable = "false"
      chipSpan.dataset.chip = chipKind
      chipSpan.dataset.value = item.value
      chipSpan.dataset.label = item.label
      chipSpan.className = chipClassName(chipKind)
      chipSpan.textContent = `${hit.trigger}${item.label}`

      const trailing = el.ownerDocument.createTextNode(` ${after}`)
      const parent = node.parentNode as Node
      if (node.nextSibling) {
        parent.insertBefore(chipSpan, node.nextSibling)
        parent.insertBefore(trailing, chipSpan.nextSibling)
      } else {
        parent.appendChild(chipSpan)
        parent.appendChild(trailing)
      }

      const range = el.ownerDocument.createRange()
      range.setStart(trailing, 1)
      range.collapse(true)
      const sel = el.ownerDocument.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)

      writeParts(partsFromDom(el))
      closeMenu()
    },
    [trig, writeParts, closeMenu],
  )

  const moveSelection = useCallback(
    (delta: number) => {
      if (filtered.length === 0) return
      const idx = filtered.findIndex((i) => i.value === selectedValue)
      const next = ((idx === -1 ? 0 : idx) + delta + filtered.length) % filtered.length
      setSelectedValue(filtered[next].value)
    },
    [filtered, selectedValue],
  )

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      const menuOpen = trig && filtered.length > 0
      if (menuOpen) {
        if (event.key === "ArrowDown") {
          event.preventDefault()
          moveSelection(1)
          return
        }
        if (event.key === "ArrowUp") {
          event.preventDefault()
          moveSelection(-1)
          return
        }
        if (event.key === "Enter" || event.key === "Tab") {
          event.preventDefault()
          const item = filtered.find((i) => i.value === selectedValue) ?? filtered[0]
          if (item) insertChip(item)
          return
        }
        if (event.key === "Escape") {
          event.preventDefault()
          closeMenu()
          return
        }
      }
      if (onSubmit && event.key === "Enter" && !event.shiftKey) {
        event.preventDefault()
        onSubmit()
      }
    },
    [trig, filtered, selectedValue, moveSelection, insertChip, closeMenu, onSubmit],
  )

  const isEmpty =
    parts.length === 0 || (parts.length === 1 && parts[0].type === "text" && parts[0].value === "")
  const showMenu = trig !== null && filtered.length > 0 && !disabled

  return (
    <div
      data-slot="text-command"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    >
      <div className="relative w-full">
        <div
          ref={editorRef}
          id={inputId}
          role="combobox"
          aria-label={ariaLabel ?? placeholder}
          aria-autocomplete="list"
          aria-expanded={showMenu}
          aria-haspopup="listbox"
          aria-controls={showMenu ? menuId : undefined}
          aria-disabled={disabled}
          contentEditable={!disabled}
          suppressContentEditableWarning
          data-empty={isEmpty || undefined}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onBlur={(event: ReactFocusEvent<HTMLDivElement>) => {
            if (!event.currentTarget.contains(event.relatedTarget)) closeMenu()
          }}
          style={{ minHeight: `${rows * 1.5}rem` }}
          className={cn(
            "field-sizing-content w-full whitespace-pre-wrap break-words rounded-lg border border-input bg-card px-3.5 py-2 text-base shadow-xs outline-none transition-[color,box-shadow]",
            "focus-visible:border-focal focus-visible:ring-3 focus-visible:ring-focal/20",
            "data-[empty]:before:pointer-events-none data-[empty]:before:text-muted-foreground data-[empty]:before:content-[attr(data-placeholder)]",
            disabled && "cursor-not-allowed opacity-50",
            "md:text-sm dark:bg-input/30",
            editorClassName,
          )}
          data-placeholder={placeholder}
        />
        <OptionMenu
          id={menuId}
          open={showMenu}
          heading={trig?.trigger === "/" ? "Commands" : "Mentions"}
          items={filtered.map<OptionMenuItem>((i) => ({
            value: i.value,
            label: i.label,
            description: i.description,
            icon: i.icon,
            prefix: trig?.trigger,
          }))}
          selectedValue={selectedValue}
          onSelectionChange={setSelectedValue}
          onSelect={(item) => {
            const original = filtered.find((i) => i.value === item.value)
            if (original) insertChip(original)
          }}
        />
      </div>
    </div>
  )
})

export type {
  TextCommandItem,
  TextCommandPart,
  TextCommandProps,
  TextCommandTrigger,
  TextCommandValue,
}
export { TextCommand, textCommandToPayload, textCommandToString }
