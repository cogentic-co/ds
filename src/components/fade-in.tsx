"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "../lib/utils"

type FadeInProps = {
  as?: "div" | "li" | "article" | "section" | "p" | "h2"
  delay?: number
  className?: string
  children: React.ReactNode
}

const prefersReducedMotion =
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false

function FadeIn({ as: Tag = "div", delay = 0, className, children }: FadeInProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "-80px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      data-slot="fade-in"
      className={cn(className, visible ? "animate-[fade-up_0.5s_ease-out_both]" : "opacity-0")}
      style={delay > 0 && visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

export { FadeIn }
