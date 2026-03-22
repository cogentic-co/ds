"use client"

import { motion } from "motion/react"

import { EASE_OUT } from "../lib/animation"
import { cn } from "../lib/utils"

export default function AnimationSlackNotification({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col bg-white p-4", className)}>
      {/* Channel header */}
      <div className="flex items-center gap-2 border-gray-100 border-b pb-2.5">
        <span className="font-bold text-[13px] text-gray-900"># compliance-alerts</span>
        <span className="rounded bg-red-100 px-1.5 py-0.5 font-bold text-[9px] text-red-600">
          3 new
        </span>
      </div>

      {/* Bot message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 }}
        className="mt-3 flex gap-2.5"
      >
        {/* Bot avatar */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-gray-900">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L12 4V10L7 13L2 10V4L7 1Z" stroke="#00D4FF" strokeWidth="1.2" />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-[13px] text-gray-900">Cogentic</span>
            <span className="text-[10px] text-gray-400">APP 10:42 AM</span>
          </div>

          {/* Attachment card */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.6 }}
            className="mt-1.5 rounded-md border-red-400 border-l-[3px] bg-gray-50 px-3 py-2.5"
          >
            <p className="font-semibold text-[12px] text-gray-900">
              Transfer flagged — manual review required
            </p>
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
              <span className="text-[11px] text-gray-500">
                <span className="font-medium text-gray-700">TXN-0847</span> &middot; AU &rarr; SG
              </span>
              <span className="text-[11px] text-gray-500">
                Risk: <span className="font-semibold text-red-500">High (72)</span>
              </span>
            </div>
            <p className="mt-1.5 text-[11px] text-gray-500 leading-relaxed">
              PEP screening match detected. Beneficiary threshold exceeded for SG corridor.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="mt-2 flex gap-1.5"
          >
            {["Review", "Approve", "Escalate"].map((label) => (
              <span
                key={label}
                className="rounded border border-gray-200 bg-white px-2.5 py-1 font-medium text-[11px] text-gray-700"
              >
                {label}
              </span>
            ))}
          </motion.div>

          {/* Thread reply */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 1.3 }}
            className="mt-3 flex items-start gap-2 border-gray-100 border-t pt-2.5"
          >
            <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-[9px] text-emerald-700">
              JC
            </div>
            <div>
              <span className="font-semibold text-[11px] text-gray-900">J. Chen</span>
              <span className="ml-1.5 text-[10px] text-gray-400">10:44 AM</span>
              <p className="mt-0.5 text-[11px] text-gray-600">
                Reviewed. PEP match is a false positive — approved.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
