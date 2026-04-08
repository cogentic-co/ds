"use client"

/**
 * PixelIcon — alternate pixel-art icon set powered by the `pixelarticons`
 * package (https://github.com/halfmage/pixelarticons).
 *
 * Consumers opt in by:
 *   pnpm add pixelarticons
 *   import { PixelIcon } from "@cogentic-co/ds/icons/pixel"
 *   <PixelIcon name="Home" className="size-4" />
 *
 * `pixelarticons` is declared as a *peer* dependency on this package so
 * consumers explicitly choose whether to install it. Without the package,
 * importing this module will fail at runtime — the component is gated
 * behind the subpath import so it has zero bundle cost for consumers who
 * don't use it.
 *
 * The `name` prop is the **PascalCase** name of the pixelarticon component
 * (e.g. "Home", "ChevronRight", "Mail"). The full list of ~800 icons lives
 * at https://pixelarticons.com.
 */

// biome-ignore lint/suspicious/noExplicitAny: dynamic import from peer dep
import * as Pixelarticons from "pixelarticons/react"
import type * as React from "react"

type PixelIconProps = React.SVGProps<SVGSVGElement> & {
  /** PascalCase icon name (e.g. "Home", "ChevronRight"). */
  name: string
  /** Convenience size prop — sets width AND height. Default: 16. */
  size?: number | string
}

function PixelIcon({ name, size = 16, ...props }: PixelIconProps) {
  // biome-ignore lint/suspicious/noExplicitAny: dynamic component lookup
  const Component = (Pixelarticons as Record<string, React.ComponentType<any>>)[name]
  if (!Component) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[PixelIcon] Unknown icon name: "${name}"`)
    }
    return null
  }
  return <Component width={size} height={size} {...props} />
}

export { PixelIcon }
export type { PixelIconProps }
