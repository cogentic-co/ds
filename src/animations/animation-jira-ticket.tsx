"use client"

import { motion } from "motion/react"

import { EASE_OUT } from "../lib/animation"
import { cn } from "../lib/utils"

export default function AnimationJiraTicket({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col bg-white p-4", className)}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
        <span>COGENTIC</span>
        <span>/</span>
        <span>Compliance Reviews</span>
        <span>/</span>
        <span className="text-gray-600">COG-847</span>
      </div>

      {/* Issue header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 }}
      >
        <h4 className="mt-2 font-semibold text-[14px] text-gray-900 leading-snug">
          Review: TXN-0847 — High risk corridor
        </h4>

        {/* Status & meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-2.5 flex flex-wrap items-center gap-2"
        >
          <span className="rounded bg-blue-100 px-2 py-0.5 font-bold text-[10px] text-blue-700">
            IN REVIEW
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-500">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 2V5L7 6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" />
            </svg>
            Created 2 min ago
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-500">
            <span className="inline-flex size-4 items-center justify-center rounded-full bg-emerald-100 font-bold text-[7px] text-emerald-700">
              JC
            </span>
            J. Chen
          </span>
          <span className="flex items-center gap-1 rounded bg-red-50 px-1.5 py-0.5 font-semibold text-[10px] text-red-600">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path
                d="M4 1V5M4 6.5V7"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            High
          </span>
        </motion.div>
      </motion.div>

      {/* Description — Cogentic compliance brief */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.7 }}
        className="mt-3 rounded border border-gray-100 bg-gray-50 p-3"
      >
        <p className="font-semibold text-[10px] text-gray-400 uppercase tracking-wider">
          Cogentic compliance brief
        </p>
        <div className="mt-2 space-y-1.5">
          {[
            { label: "Corridor", value: "AU \u2192 SG" },
            { label: "Risk score", value: "72 / 100" },
            { label: "Trigger", value: "PEP screening match, threshold exceeded" },
            { label: "Recommendation", value: "Verify beneficiary identity before clearing" },
          ].map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.9 + i * 0.1 }}
              className="flex gap-2"
            >
              <span className="w-[80px] shrink-0 font-medium text-[10px] text-gray-400">
                {row.label}
              </span>
              <span className="font-medium text-[10px] text-gray-700">{row.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Activity section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.4 }}
        className="mt-3"
      >
        <p className="font-semibold text-[10px] text-gray-400 uppercase tracking-wider">Activity</p>
        <div className="mt-1.5 flex items-start gap-2">
          <div className="mt-0.5 size-1.5 shrink-0 rounded-full bg-blue-400" />
          <p className="text-[10px] text-gray-500">
            <span className="font-medium text-gray-700">Cogentic</span> created this issue from
            flagged transfer TXN-0847
          </p>
        </div>
      </motion.div>
    </div>
  )
}
