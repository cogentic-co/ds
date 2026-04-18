"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "../lib/utils"

interface TypewriterLine {
  text: string
  className?: string
  indent?: number
}

interface TypewriterProps {
  /** Array of lines to reveal sequentially */
  lines: TypewriterLine[]
  /** Milliseconds between each line appearing. Default: 80 */
  speed?: number
  /** Whether to show line numbers. Default: true */
  showLineNumbers?: boolean
  /** Whether to show a blinking cursor while typing. Default: true */
  showCursor?: boolean
  /** Whether to loop the animation. Default: false */
  loop?: boolean
  /** Milliseconds to pause before looping. Default: 3000 */
  loopDelay?: number
  className?: string
}

function Typewriter({
  lines,
  speed = 80,
  showLineNumbers = true,
  showCursor = true,
  loop = false,
  loopDelay = 3000,
  className,
}: TypewriterProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visibleLines < lines.length) {
      const id = setTimeout(() => setVisibleLines((v) => v + 1), speed)
      return () => clearTimeout(id)
    } else if (loop) {
      const id = setTimeout(() => setVisibleLines(0), loopDelay)
      return () => clearTimeout(id)
    }
  }, [visibleLines, lines.length, speed, loop, loopDelay])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [])

  return (
    <div
      ref={scrollRef}
      data-slot="typewriter"
      className={cn("overflow-y-auto font-mono text-sm", className)}
    >
      <div className="space-y-0.5">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex">
            {showLineNumbers && (
              <span className="w-6 shrink-0 select-none text-right text-muted-foreground/40 text-xs">
                {i + 1}
              </span>
            )}
            <span
              className={cn("ml-3 text-xs", line.className ?? "text-foreground/60")}
              style={{ paddingLeft: (line.indent ?? 0) * 16 }}
            >
              {line.text || "\u00A0"}
            </span>
          </div>
        ))}
        {showCursor && visibleLines < lines.length && (
          <div className="flex">
            {showLineNumbers && <span className="w-6" />}
            <span className="ml-3 animate-pulse text-foreground/30 text-xs">{"\u2588"}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export type { TypewriterLine, TypewriterProps }
export { Typewriter }
