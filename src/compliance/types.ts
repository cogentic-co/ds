export type TransactionDirection = "inbound" | "outbound" | "internal"

export type ComplianceStatus = "pending" | "accepted" | "rejected" | "flagged" | "escalated"

export type TravelRuleStatusValue = "not_required" | "pending" | "sent" | "received" | "expired"

export type ChainNetwork =
  | "ethereum"
  | "bitcoin"
  | "tron"
  | "polygon"
  | "solana"
  | "bnb"
  | (string & {})

export type NetworkCode = "BTC" | "ETH" | "SOL" | "TRON" | "BASE" | "ARB"

export type TxStatus = "verified" | "review" | "blocked" | "pending"

export type Party = {
  lbl: string
  addr: string
  type: string
  verified: boolean
  avatarUrl?: string
}

export type RiskDriver = {
  label: string
  weight: number
  variant: "blush" | "highlight" | "sky" | "lilac"
}

export type ComplianceTimelineEvent = {
  time: string
  title: string
  by: string
  variant: "neutral" | "sky" | "mint" | "blush" | "highlight"
  active?: boolean
}

export type ReviewerNote = {
  who: string
  role: string
  at: string
  body: string
  avatarTone?: "sky" | "mint" | "lilac" | "blush"
}

export type RelatedTx = {
  id: string
  lbl: string
  addr: string
  amt: string
  time: string
}

export type TxDirection = "inbound" | "outbound" | "internal"

export type Transaction = {
  id: string
  ref: string
  dir: TxDirection
  amt: string
  asset: string
  usd: string
  fee: string
  net: NetworkCode
  chainId?: number
  hash: string
  block: number
  confirmations: number
  gasUsed?: number
  nonce?: number
  status: TxStatus
  risk: number
  time: string
  flags: string[]
  from: Party
  to: Party
  travelRule?: TravelRuleStatusValue
  riskDrivers?: RiskDriver[]
  timeline?: ComplianceTimelineEvent[]
  notes?: ReviewerNote[]
  related?: RelatedTx[]
}

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
