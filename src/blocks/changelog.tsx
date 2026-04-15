"use client"

import type { ComponentProps, ReactNode } from "react"
import { Badge } from "../components/badge"
import { cn } from "../lib/utils"

type ChangelogTag = "feature" | "fix" | "improvement" | "breaking" | "security"

type ChangelogEntry = {
  version: string
  /** ISO date string */
  date: string
  title?: string
  tags?: ChangelogTag[]
  children: ReactNode
}

type ChangelogProps = ComponentProps<"div"> & {
  entries: ChangelogEntry[]
}

const TAG_CLASS: Record<ChangelogTag, string> = {
  feature:
    "border-focal/40 bg-focal-soft text-focal",
  fix:
    "border-emerald-700/40 bg-emerald-700/10 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-400/10 dark:text-emerald-400",
  improvement: "border-border bg-muted text-muted-foreground",
  breaking:
    "border-red-700/40 bg-red-700/10 text-red-700 dark:border-red-400/40 dark:bg-red-400/10 dark:text-red-400",
  security:
    "border-amber-700/40 bg-amber-700/10 text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-400",
}

const TAG_LABEL: Record<ChangelogTag, string> = {
  feature: "New",
  fix: "Fix",
  improvement: "Improvement",
  breaking: "Breaking",
  security: "Security",
}

function Changelog({ entries, className, ...props }: ChangelogProps) {
  return (
    <div
      data-slot="changelog"
      className={cn("flex flex-col gap-12", className)}
      {...props}
    >
      {entries.map((entry) => (
        <article key={entry.version} className="flex flex-col gap-3">
          <header className="flex flex-wrap items-center gap-3">
            <h2 className="font-mono font-semibold text-lg">{entry.version}</h2>
            <time
              dateTime={entry.date}
              className="font-mono text-muted-foreground text-xs"
            >
              {new Date(entry.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            {entry.tags?.map((tag) => (
              <Badge
                key={tag}
                square
                variant="outline"
                className={cn("px-1.5 py-0.5 text-[10px] uppercase leading-none", TAG_CLASS[tag])}
              >
                {TAG_LABEL[tag]}
              </Badge>
            ))}
          </header>
          {entry.title && <h3 className="font-semibold text-base">{entry.title}</h3>}
          <div className="prose prose-sm max-w-none text-muted-foreground [&>p]:my-0 [&>ul]:my-0 [&>ul]:pl-5 [&>ul]:list-disc [&>ul>li]:my-1">
            {entry.children}
          </div>
        </article>
      ))}
    </div>
  )
}

export { Changelog }
export type { ChangelogEntry, ChangelogProps, ChangelogTag }
