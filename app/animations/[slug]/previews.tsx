"use client"

import AnimationAiAnalysis from "@/animations/animation-ai-analysis"
import AnimationAuditTrail from "@/animations/animation-audit-trail"
import AnimationComplianceReports from "@/animations/animation-compliance-reports"
import AnimationCustomRules from "@/animations/animation-custom-rules"
import AnimationJiraTicket from "@/animations/animation-jira-ticket"
import AnimationJurisdictionDetection from "@/animations/animation-jurisdiction-detection"
import AnimationMultiProtocol from "@/animations/animation-multi-protocol"
import AnimationPricingPreview from "@/animations/animation-pricing-preview"
import AnimationRealtimeUpdates from "@/animations/animation-realtime-updates"
import AnimationRestApi from "@/animations/animation-rest-api"
import AnimationRiskScoring from "@/animations/animation-risk-scoring"
import AnimationSandbox from "@/animations/animation-sandbox"
import AnimationScheduledReports from "@/animations/animation-scheduled-reports"
import AnimationSecureMessaging from "@/animations/animation-secure-messaging"
import AnimationSlackNotification from "@/animations/animation-slack-notification"
import AnimationSopMapping from "@/animations/animation-sop-mapping"
import AnimationTeamRouting from "@/animations/animation-team-routing"
import AnimationTeamsNotification from "@/animations/animation-teams-notification"
import AnimationVaspIdentification from "@/animations/animation-vasp-identification"
import AnimationWebhooks from "@/animations/animation-webhooks"

function Wrap({ children }: { children: React.ReactNode }) {
  return <div className="h-80 max-w-md overflow-hidden rounded-lg border">{children}</div>
}

export const animationPreviews: Record<string, React.ComponentType> = {
  "animation-ai-analysis": () => (
    <Wrap>
      <AnimationAiAnalysis className="h-full" />
    </Wrap>
  ),
  "animation-audit-trail": () => (
    <Wrap>
      <AnimationAuditTrail className="h-full" />
    </Wrap>
  ),
  "animation-compliance-reports": () => (
    <Wrap>
      <AnimationComplianceReports className="h-full" />
    </Wrap>
  ),
  "animation-custom-rules": () => (
    <Wrap>
      <AnimationCustomRules className="h-full" />
    </Wrap>
  ),
  "animation-jira-ticket": () => (
    <Wrap>
      <AnimationJiraTicket className="h-full" />
    </Wrap>
  ),
  "animation-jurisdiction-detection": () => (
    <Wrap>
      <AnimationJurisdictionDetection className="h-full" />
    </Wrap>
  ),
  "animation-multi-protocol": () => (
    <Wrap>
      <AnimationMultiProtocol className="h-full" />
    </Wrap>
  ),
  "animation-pricing-preview": () => (
    <Wrap>
      <AnimationPricingPreview className="h-full" />
    </Wrap>
  ),
  "animation-realtime-updates": () => (
    <Wrap>
      <AnimationRealtimeUpdates className="h-full" />
    </Wrap>
  ),
  "animation-rest-api": () => (
    <Wrap>
      <AnimationRestApi className="h-full" />
    </Wrap>
  ),
  "animation-risk-scoring": () => (
    <Wrap>
      <AnimationRiskScoring className="h-full" />
    </Wrap>
  ),
  "animation-sandbox": () => (
    <Wrap>
      <AnimationSandbox className="h-full" />
    </Wrap>
  ),
  "animation-scheduled-reports": () => (
    <Wrap>
      <AnimationScheduledReports className="h-full" />
    </Wrap>
  ),
  "animation-secure-messaging": () => (
    <Wrap>
      <AnimationSecureMessaging className="h-full" />
    </Wrap>
  ),
  "animation-slack-notification": () => (
    <Wrap>
      <AnimationSlackNotification className="h-full" />
    </Wrap>
  ),
  "animation-sop-mapping": () => (
    <Wrap>
      <AnimationSopMapping className="h-full" />
    </Wrap>
  ),
  "animation-team-routing": () => (
    <Wrap>
      <AnimationTeamRouting className="h-full" />
    </Wrap>
  ),
  "animation-teams-notification": () => (
    <Wrap>
      <AnimationTeamsNotification className="h-full" />
    </Wrap>
  ),
  "animation-vasp-identification": () => (
    <Wrap>
      <AnimationVaspIdentification className="h-full" />
    </Wrap>
  ),
  "animation-webhooks": () => (
    <Wrap>
      <AnimationWebhooks className="h-full" />
    </Wrap>
  ),
}
