export type TransactionDirection = "inbound" | "outbound" | "internal"

export type ComplianceStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "flagged"
  | "escalated"

export type TravelRuleStatusValue =
  | "not_required"
  | "pending"
  | "sent"
  | "received"
  | "expired"

export type ChainNetwork =
  | "ethereum"
  | "bitcoin"
  | "tron"
  | "polygon"
  | "solana"
  | "bnb"
  | (string & {})

export type TransactionParty = {
  address: string
  label?: string
  vasp?: string
}

export type TransactionData = {
  hash: string
  from: TransactionParty
  to: TransactionParty
  amount: string | number
  asset: string
  network: ChainNetwork
  direction: TransactionDirection
  timestamp: string | Date
  blockNumber?: number
  confirmations?: number
  fee?: string
  fiatValue?: string
  riskScore?: number
  complianceStatus: ComplianceStatus
  travelRuleStatus?: TravelRuleStatusValue
  flags?: string[]
}
