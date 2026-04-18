import { Loader2Icon } from "lucide-react"

import { cn } from "../lib/utils"

type SpinnerProps = React.ComponentProps<"svg"> & {
  /** Spinner style. "circle" is a rotating arc, "lines" is radiating line segments. Defaults to "circle". */
  variant?: "circle" | "lines"
}

function LinesSpinner(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
    </svg>
  )
}

function Spinner({ variant = "circle", className, ...props }: SpinnerProps) {
  const Icon = variant === "lines" ? LinesSpinner : Loader2Icon
  return (
    <Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export type { SpinnerProps }
export { Spinner }
