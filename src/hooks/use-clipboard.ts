import { useCallback, useState } from "react"

type UseClipboardOptions = {
  /** How long "copied" stays true (ms). Default 2000 */
  timeout?: number
}

function useClipboard({ timeout = 2000 }: UseClipboardOptions = {}) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string) => {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
    },
    [timeout],
  )

  return { copied, copy }
}

export type { UseClipboardOptions }
export { useClipboard }
