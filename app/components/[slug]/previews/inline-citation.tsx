"use client"

import { InlineCitation } from "@/src/chat"

export default function InlineCitationPreview() {
  return (
    <p className="text-sm leading-relaxed">
      According to the latest regulatory framework,{" "}
      <InlineCitation
        index={1}
        href="https://example.com"
        title="FATF Recommendations 2023"
        description="Updated guidance on virtual asset service providers"
      >
        virtual asset service providers must implement robust KYC procedures
      </InlineCitation>{" "}
      and maintain ongoing monitoring of{" "}
      <InlineCitation
        index={2}
        href="https://example.com/travel-rule"
        title="Travel Rule Implementation"
        description="FATF guidance on the implementation of the Travel Rule"
      >
        cross-border transactions
      </InlineCitation>
      .
    </p>
  )
}
