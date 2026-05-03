"use client"

import { Lock, ShieldCheck } from "lucide-react"
import { domAnimation, LazyMotion, m } from "motion/react"
import { useEffect, useRef } from "react"

import { useAnimationTimer } from "../hooks/use-animation-timer"

import { cn } from "../lib/utils"

type Message = {
  direction: "sent" | "received"
  label: string
  fields: { key: string; value: string }[]
  encrypted: boolean
}

const MESSAGES: Message[] = [
  {
    direction: "sent",
    label: "Originator data sent",
    fields: [
      { key: "Name", value: "J\u2022\u2022\u2022\u2022\u2022\u2022 S\u2022\u2022\u2022h" },
      { key: "Account", value: "\u2022\u2022\u2022\u2022\u2022\u20227a4f" },
      { key: "Institution", value: "Aqua Exchange" },
    ],
    encrypted: true,
  },
  {
    direction: "received",
    label: "Beneficiary data received",
    fields: [
      { key: "Name", value: "L\u2022\u2022 C\u2022\u2022n" },
      { key: "Account", value: "\u2022\u2022\u2022\u2022\u2022\u2022e81b" },
      { key: "Institution", value: "Atlas Digital" },
    ],
    encrypted: true,
  },
  {
    direction: "sent",
    label: "Verification complete",
    fields: [
      { key: "Status", value: "Both parties verified" },
      { key: "Protocol", value: "TRP v2.0" },
      { key: "Ref", value: "TR-2024-0847" },
    ],
    encrypted: true,
  },
]

export default function AnimationSecureMessaging({ className }: { className?: string }) {
  const [timerRef, tick] = useAnimationTimer(2800)
  // Reset to [0] after showing all messages, then accumulate again
  const cyclePos = tick % (MESSAGES.length + 1)
  const visible =
    cyclePos === 0
      ? [0]
      : Array.from(
          { length: Math.min(cyclePos + 1, MESSAGES.length) },
          (_, i) => i % MESSAGES.length,
        )
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <div ref={timerRef} className={cn("flex flex-col", className)}>
        {/* Header */}
        <div className="flex items-center gap-2 border-gray-100 border-b bg-gray-50/80 px-4 py-2">
          <Lock className="size-3 text-cyan" />
          <span className="font-semibold text-gray-700 text-xxs">Encrypted Channel</span>
          <span className="ml-auto flex items-center gap-1 text-2xs text-emerald-600">
            <ShieldCheck className="size-3" />
            TLS 1.3
          </span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="scrollbar-none flex-1 space-y-3 overflow-y-auto px-4 py-3">
          {visible.map((msgIdx, i) => {
            const msg = MESSAGES[msgIdx]
            const isLatest = i === visible.length - 1
            return (
              <m.div
                key={`${i}-${msgIdx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isLatest ? 1 : 0.5, y: 0 }}
                transition={{ duration: 0.35 }}
                className={cn(
                  "max-w-[85%] rounded-lg border bg-white p-3",
                  msg.direction === "sent" ? "ml-auto border-cyan/20" : "border-gray-100",
                )}
              >
                <div className="flex items-center gap-1.5">
                  <Lock className="size-2.5 text-cyan" />
                  <span className="font-semibold text-2xs text-gray-600">{msg.label}</span>
                </div>
                <div className="mt-2 space-y-1">
                  {msg.fields.map((f) => (
                    <div key={f.key} className="flex items-center justify-between">
                      <span className="text-2xs text-gray-400">{f.key}</span>
                      <span className="font-medium font-mono text-2xs text-gray-700">
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              </m.div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="border-gray-100 border-t bg-gray-50/60 px-4 py-2">
          <p className="text-center text-3xs text-gray-400">
            AES-256 at rest {"\u2022"} TLS 1.3 in transit {"\u2022"} End-to-end encrypted
          </p>
        </div>
      </div>
    </LazyMotion>
  )
}
