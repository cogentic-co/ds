import { useEffect, useRef, useState } from "react"

type UseIntersectionObserverOptions = {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  /** Only trigger once then disconnect */
  once?: boolean
}

function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {},
) {
  const { threshold = 0, root = null, rootMargin = "0px", once = false } = options
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && once) {
          observer.disconnect()
        }
      },
      { threshold, root, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, root, rootMargin, once])

  return { ref, isIntersecting }
}

export { useIntersectionObserver }
export type { UseIntersectionObserverOptions }
