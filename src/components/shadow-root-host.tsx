import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

type OwnProps = {
  children: React.ReactNode
  className?: string
  mode?: ShadowRootInit["mode"]
  delegatesFocus?: boolean
  as?: React.ElementType
}

type PolymorphicProps<E extends React.ElementType, P> = P &
  Omit<React.ComponentPropsWithoutRef<E>, keyof P | "ref" | "children"> & {
    as?: E
  }

function ShadowRootHost<E extends React.ElementType = "div">({
  children,
  className,
  mode = "open",
  delegatesFocus = false,
  as,
  ...rest
}: PolymorphicProps<E, OwnProps>) {
  const Tag = (as ?? "div") as any

  const hostRef = useRef<HTMLElement | null>(null)
  const shadowRef = useRef<ShadowRoot | null>(null)
  const [shadowEl, setShadowEl] = useState<ShadowRoot | null>(null)

  const setHostRef = useCallback((node: HTMLElement | null) => {
    hostRef.current = node
  }, [])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const existing = host.shadowRoot
    if (existing) {
      shadowRef.current = existing
      setShadowEl(existing)
      return
    }

    if (!shadowRef.current) {
      const sr = host.attachShadow({ mode, delegatesFocus })
      shadowRef.current = sr
      setShadowEl(sr)
    } else {
      setShadowEl(shadowRef.current)
    }
  }, [mode, delegatesFocus])

  const tagProps = { className, ...rest }

  return (
    <Tag ref={setHostRef} {...(tagProps as any)}>
      {shadowEl ? createPortal(children, shadowEl as unknown as Element) : null}
    </Tag>
  )
}

export { ShadowRootHost }
