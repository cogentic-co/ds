"use client"

import { cn } from "../lib/utils"

type ProtocolItem = {
  name: string
  icon: string
}

const ROW_1: ProtocolItem[] = [
  { name: "TRP", icon: "T" },
  { name: "TRISA", icon: "R" },
  { name: "OpenVASP", icon: "O" },
  { name: "Sygna", icon: "S" },
  { name: "Notabene", icon: "N" },
  { name: "Sumsub", icon: "Su" },
  { name: "Chainalysis", icon: "C" },
  { name: "Elliptic", icon: "E" },
]

const ROW_2: ProtocolItem[] = [
  { name: "Shyft", icon: "Sh" },
  { name: "Coinfirm", icon: "Co" },
  { name: "CipherTrace", icon: "Ci" },
  { name: "VerifyVASP", icon: "V" },
  { name: "Crystal", icon: "Cr" },
  { name: "TRM Labs", icon: "TL" },
  { name: "Merkle", icon: "M" },
  { name: "Scorechain", icon: "Sc" },
]

function MarqueeRow({
  items,
  direction = "left",
  duration = 25,
}: {
  items: ProtocolItem[]
  direction?: "left" | "right"
  duration?: number
}) {
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-card/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-card/40 to-transparent" />

      <div
        className={cn(
          "flex w-max gap-3",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 shadow-sm"
          >
            <div className="flex size-6 items-center justify-center rounded-full bg-gray-100 font-bold text-[10px] text-gray-500">
              {item.icon}
            </div>
            <span className="font-medium text-[12px] text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnimationMultiProtocol({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col justify-center gap-3", className)}>
      <MarqueeRow items={ROW_1} direction="left" duration={30} />
      <MarqueeRow items={ROW_2} direction="right" duration={28} />
    </div>
  )
}
