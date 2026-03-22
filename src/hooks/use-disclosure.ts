import { useCallback, useState } from "react"

type UseDisclosureReturn = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

function useDisclosure(defaultOpen = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const onOpen = useCallback(() => setIsOpen(true), [])
  const onClose = useCallback(() => setIsOpen(false), [])
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return { isOpen, onOpen, onClose, onToggle }
}

export { useDisclosure }
export type { UseDisclosureReturn }
