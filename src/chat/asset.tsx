"use client"

import {
  FileArchive,
  FileAudio,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Music,
  Paperclip,
  Pause,
  Play,
} from "lucide-react"
import {
  type ComponentProps,
  type ImgHTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { cn } from "../lib/utils"

// Generic chat-message attachment. Replaces a per-type Image / File / Audio /
// Document component with one slot that picks the right shape from `kind`.

export type AssetKind = "image" | "audio" | "video" | "document" | "file"

type CommonProps = {
  /** What is the attachment? Drives icon and rendering. */
  kind?: AssetKind
  /** URL to the asset. Optional for image when `base64`/`uint8Array` provided. */
  src?: string
  /** Display name (filename, document title, etc.). */
  name?: string
  /** Bytes — formatted as KB/MB on render. */
  size?: number
  /** MIME type — used to refine the icon and (for image) build a data URL. */
  mediaType?: string
  /** Trailing slot — buttons, status chip, etc. */
  actions?: ReactNode
  /** Callback when the user activates the asset (download, open, etc.). */
  onActivate?: () => void
}

type ImageProps = CommonProps & {
  kind?: "image"
  alt?: string
  /** Inline image bytes (base64). Pairs with `mediaType`. */
  base64?: string
  /** Inline image bytes (Uint8Array). Pairs with `mediaType`. */
  uint8Array?: Uint8Array
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">

type NonImageProps = CommonProps &
  Omit<ComponentProps<"a">, "title"> & {
    kind?: Exclude<AssetKind, "image">
  }

export type AssetProps = ImageProps | NonImageProps

const documentIcons: Record<string, typeof FileText> = {
  // text
  "text/plain": FileText,
  "text/markdown": FileText,
  "text/html": FileCode,
  "text/csv": FileSpreadsheet,
  // application
  "application/pdf": FileText,
  "application/zip": FileArchive,
  "application/x-rar-compressed": FileArchive,
  "application/x-7z-compressed": FileArchive,
  "application/json": FileCode,
  "application/javascript": FileCode,
  "application/typescript": FileCode,
  "application/vnd.ms-excel": FileSpreadsheet,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": FileSpreadsheet,
}

function pickIcon(kind: AssetKind, mediaType?: string) {
  if (kind === "image") return FileImage
  if (kind === "audio") return FileAudio
  if (kind === "video") return FileVideo
  if (mediaType && documentIcons[mediaType]) return documentIcons[mediaType]
  if (mediaType?.startsWith("text/")) return FileText
  if (mediaType?.startsWith("application/")) return FileText
  return Paperclip
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

function buildImageSrc({
  src,
  base64,
  mediaType,
}: {
  src?: string
  base64?: string
  mediaType?: string
}) {
  if (src) return src
  if (base64 && mediaType) return `data:${mediaType};base64,${base64}`
  return undefined
}

function Asset(props: AssetProps) {
  const { kind = "file", className } = props as CommonProps & { className?: string }

  if (kind === "image") {
    return <AssetImage {...(props as ImageProps)} className={className} />
  }
  if (kind === "audio") {
    return <AssetAudio {...(props as NonImageProps)} />
  }
  return <AssetDocument {...(props as NonImageProps)} />
}

// ---------------------------------------------------------------------------
// Image
// ---------------------------------------------------------------------------

function AssetImage({
  src,
  base64,
  uint8Array,
  mediaType = "image/png",
  name,
  alt,
  className,
  onActivate,
  ...rest
}: ImageProps) {
  const [objectUrl, setObjectUrl] = useState<string | undefined>()

  useEffect(() => {
    if (uint8Array && mediaType) {
      const blob = new Blob([uint8Array as BlobPart], { type: mediaType })
      const url = URL.createObjectURL(blob)
      setObjectUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setObjectUrl(undefined)
    return
  }, [uint8Array, mediaType])

  const resolvedSrc = buildImageSrc({ src, base64, mediaType }) ?? objectUrl
  const accessibleAlt = alt ?? name ?? "Attachment"

  if (!resolvedSrc) {
    return (
      <div
        data-slot="asset"
        data-kind="image"
        aria-label={accessibleAlt}
        role="img"
        className={cn(
          "h-auto max-w-full animate-pulse overflow-hidden rounded-md bg-muted",
          className,
        )}
      />
    )
  }

  return (
    <button
      type="button"
      data-slot="asset"
      data-kind="image"
      onClick={onActivate}
      className={cn(
        "block overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-ring/50",
        !onActivate && "cursor-default",
        className,
      )}
    >
      {/* biome-ignore lint/a11y/useAltText: alt is supplied via accessibleAlt */}
      <img
        src={resolvedSrc}
        alt={accessibleAlt}
        className="h-auto max-w-full"
        {...(rest as ImgHTMLAttributes<HTMLImageElement>)}
      />
    </button>
  )
}

// ---------------------------------------------------------------------------
// Document / file (icon + meta row)
// ---------------------------------------------------------------------------

function AssetDocument({
  kind = "document",
  src,
  name,
  size,
  mediaType,
  actions,
  onActivate,
  className,
  children,
  ...props
}: NonImageProps & { children?: ReactNode }) {
  const Icon = pickIcon(kind, mediaType)
  const meta = [mediaType, size != null ? formatBytes(size) : null].filter(Boolean).join(" · ")

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium text-sm">
          {name ?? children ?? "Attachment"}
        </span>
        {meta && (
          <span className="block truncate font-mono text-muted-foreground text-xxs uppercase tracking-wider">
            {meta}
          </span>
        )}
      </span>
      {actions && <span className="flex shrink-0 items-center gap-1">{actions}</span>}
    </>
  )

  const baseClass = cn(
    "inline-flex w-full max-w-sm items-center gap-3 rounded-md border border-border bg-card p-2 pr-3 text-left transition-colors",
    onActivate || src ? "hover:border-ring/50 hover:bg-accent/50" : "",
    className,
  )

  if (src) {
    return (
      <a
        data-slot="asset"
        data-kind={kind}
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        {...props}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      type="button"
      data-slot="asset"
      data-kind={kind}
      onClick={onActivate}
      className={baseClass}
      {...(props as ComponentProps<"button">)}
    >
      {inner}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Audio (small inline player)
// ---------------------------------------------------------------------------

function AssetAudio({ src, name, size, mediaType, actions, className }: NonImageProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const meta = [mediaType, size != null ? formatBytes(size) : null].filter(Boolean).join(" · ")

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
  }

  return (
    <div
      data-slot="asset"
      data-kind="audio"
      className={cn(
        "inline-flex w-full max-w-sm items-center gap-3 rounded-md border border-border bg-card p-2 pr-3",
        className,
      )}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Music aria-hidden="true" className="size-3 text-muted-foreground" />
          <span className="block truncate font-medium text-sm">{name ?? "Audio"}</span>
        </div>
        {meta && (
          <div className="truncate font-mono text-muted-foreground text-xxs uppercase tracking-wider">
            {meta}
          </div>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
      {src && (
        <audio
          ref={audioRef}
          src={src}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          preload="none"
        >
          <track kind="captions" />
        </audio>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Group — wraps multiple assets in a row/column for chat message layouts
// ---------------------------------------------------------------------------

function AssetGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="asset-group"
      className={cn("flex flex-wrap items-start gap-2", className)}
      {...props}
    />
  )
}

export { Asset, AssetAudio, AssetDocument, AssetGroup, AssetImage, formatBytes }
