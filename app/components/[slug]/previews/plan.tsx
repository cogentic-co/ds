"use client"

import { Plan, PlanAction, PlanContent, PlanFooter, PlanTrigger } from "@/src/chatbot"

export default function PlanPreview() {
  return (
    <Plan defaultOpen>
      <PlanTrigger>Implementation Plan</PlanTrigger>
      <PlanContent>
        <div className="space-y-2 text-sm">
          <p>1. Set up KYC verification endpoints</p>
          <p>2. Integrate with screening providers</p>
          <p>3. Configure risk scoring rules</p>
          <p>4. Build transaction monitoring dashboard</p>
          <p>5. Deploy and run integration tests</p>
        </div>
      </PlanContent>
      <PlanFooter>
        <PlanAction>Execute Plan</PlanAction>
      </PlanFooter>
    </Plan>
  )
}
