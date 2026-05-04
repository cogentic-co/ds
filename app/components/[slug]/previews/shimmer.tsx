"use client"

import { Shimmer } from "@/src/chat"

export default function ShimmerPreview() {
  return (
    <div className="space-y-4">
      <Shimmer>Generating response...</Shimmer>
      <Shimmer as="h3" className="font-bold text-lg" duration={3}>
        Loading analysis
      </Shimmer>
      <Shimmer as="span" className="text-sm">
        Please wait while we process your request
      </Shimmer>
    </div>
  )
}
