"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/utils"

type TocSection = {
  id: string
  label: string
}

function TableOfContents({ sections }: { sections: TocSection[] }) {
  const [activeId, setActiveId] = useState<string>("")
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current?.disconnect()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    )
    observerRef.current = observer

    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sections])

  function handleClick(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setActiveId(id)
    }
  }

  if (sections.length === 0) return null

  return (
    <nav className="hidden xl:block">
      <div className="sticky top-24">
        <p className="mb-3 font-medium text-muted-foreground text-xs">On this page</p>
        <ul className="space-y-1 border-border border-l">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => handleClick(section.id)}
                className={cn(
                  "-ml-px block w-full border-l-2 py-1 pl-3 text-left text-sm transition-colors",
                  activeId === section.id
                    ? "border-primary font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export type { TocSection }
export { TableOfContents }
