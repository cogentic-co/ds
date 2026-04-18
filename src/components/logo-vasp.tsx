import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const logoVaspVariants = cva("inline-block shrink-0", {
  variants: {
    size: {
      sm: "size-6",
      default: "size-8",
      lg: "size-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

type LogoVaspProps = React.ComponentProps<"svg"> & VariantProps<typeof logoVaspVariants>

function LogoVasp({ size, className, ...props }: LogoVaspProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-slot="logo-vasp"
      className={cn(logoVaspVariants({ size }), className)}
      role="img"
      aria-label="VASP Track logo"
      {...props}
    >
      <path d="M35 65h97l84 190h-97L35 65zM216 65h68v124h-68z" fill="currentColor" />
    </svg>
  )
}

export type { LogoVaspProps }
export { LogoVasp, logoVaspVariants }
