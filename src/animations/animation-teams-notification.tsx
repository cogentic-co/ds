"use client"

import { motion } from "motion/react"

import { EASE_OUT } from "../lib/animation"
import { cn } from "../lib/utils"

export default function AnimationTeamsNotification({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col bg-[#f5f5f5] p-4", className)}>
      {/* Teams channel header */}
      <div className="flex items-center gap-2 pb-2.5">
        <div className="flex size-5 items-center justify-center rounded bg-[#6264A7]">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 3H9M1 5H6M1 7H7" stroke="white" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-semibold text-[13px] text-gray-900">Compliance Reviews</span>
      </div>

      {/* Adaptive card message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 }}
        className="rounded-lg bg-white shadow-sm"
      >
        {/* Card header with accent */}
        <div className="h-1 rounded-t-lg bg-[#6264A7]" />
        <div className="p-3.5">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded bg-gray-900">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L12 4V10L7 13L2 10V4L7 1Z" stroke="#00D4FF" strokeWidth="1.2" />
              </svg>
            </div>
            <span className="font-bold text-[12px] text-gray-900">Cogentic Compliance</span>
            <span className="text-[10px] text-gray-400">10:42 AM</span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <p className="mt-2.5 font-semibold text-[12px] text-gray-900">
              Transfer requires review
            </p>

            {/* Transfer details grid */}
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {[
                { label: "Transfer", value: "TXN-0847" },
                { label: "Corridor", value: "AU \u2192 SG" },
                { label: "Risk score", value: "72 / 100", highlight: true },
                { label: "Trigger", value: "PEP match" },
              ].map((item) => (
                <div key={item.label}>
                  <span className="font-medium text-[10px] text-gray-400">{item.label}</span>
                  <p
                    className={cn(
                      "font-semibold text-[11px]",
                      item.highlight ? "text-red-500" : "text-gray-800",
                    )}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Jurisdiction badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
              className="mt-2.5 flex items-center gap-2 rounded bg-amber-50 px-2.5 py-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L11 3.5V8.5L6 11L1 8.5V3.5L6 1Z" stroke="#D97706" strokeWidth="1" />
              </svg>
              <span className="font-medium text-[10px] text-amber-700">
                SG jurisdiction requires beneficiary verification within 24h
              </span>
            </motion.div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.1 }}
            className="mt-3 flex gap-2"
          >
            <span className="rounded bg-[#6264A7] px-3 py-1.5 font-semibold text-[11px] text-white">
              Review transfer
            </span>
            <span className="rounded border border-gray-200 px-3 py-1.5 font-semibold text-[11px] text-gray-600">
              Assign reviewer
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
