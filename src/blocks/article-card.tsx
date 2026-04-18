"use client"

import { ArrowUpRight, Calendar } from "lucide-react"
import { cn } from "../lib/utils"

interface ArticleCardProps {
  title: string
  excerpt?: string
  href?: string
  imageUrl?: string
  date?: string
  category?: string
  author?: string
  className?: string
}

function ArticleCard({
  title,
  excerpt,
  href = "#",
  imageUrl,
  date,
  category,
  author = "Cogentic Team",
  className,
}: ArticleCardProps) {
  return (
    <a
      data-slot="article-card"
      href={href}
      className={cn(
        "group flex flex-col rounded-xl border border-border border-dashed p-4 transition-colors hover:border-muted-foreground/40",
        className,
      )}
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}

      {/* Date + category row */}
      <div className="mt-4 flex items-center justify-between gap-3">
        {date && (
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Calendar className="size-3.5" />
            <span>{date}</span>
          </div>
        )}
        {category && (
          <span className="rounded-full border border-border px-2.5 py-0.5 font-medium text-muted-foreground text-xs">
            {category}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-3 font-semibold text-foreground text-lg leading-snug tracking-tight">
        {title}
      </h3>

      {/* Excerpt */}
      {excerpt && <p className="mt-2 line-clamp-2 text-muted-foreground text-sm">{excerpt}</p>}

      {/* Author + arrow */}
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="font-medium text-foreground text-sm">{author}</span>
        <span className="flex size-8 items-center justify-center rounded-full border border-border transition-colors group-hover:border-muted-foreground/40">
          <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
        </span>
      </div>
    </a>
  )
}

export type { ArticleCardProps }
export { ArticleCard }
