"use client"

// Re-exports pixelarticons as an alternate icon set alongside lucide-react.
// Consumers import from "@cogentic-co/ds/icons/pixel" and get a PixelIcon
// component keyed by icon name. Uses @iconify/react + @iconify-icons/pixelarticons
// (480+ pixel-art icons, 5×7 pixel grid style). Tree-shakable via subpath import.

import { Icon } from "@iconify/react"

type PixelIconProps = React.SVGProps<SVGSVGElement> & {
  name: string
  size?: number | string
}

function PixelIcon({ name, size = 16, className, ...props }: PixelIconProps) {
  return (
    <Icon
      icon={`pixelarticons:${name}`}
      width={size}
      height={size}
      className={className}
      {...(props as object)}
    />
  )
}

export { PixelIcon }
export type { PixelIconProps }
