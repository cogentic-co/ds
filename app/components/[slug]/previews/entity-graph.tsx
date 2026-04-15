"use client"

import { EntityGraph, type EntityNodeData } from "@/src/workflow/entity-graph"

export default function EntityGraphPreview() {
  const nodes = [
    {
      id: "binance",
      type: "entity",
      position: { x: 0, y: 0 },
      data: { label: "Binance", type: "vasp", riskScore: 32, jurisdiction: "SG", description: "Exchange — MAS Licensed" } satisfies EntityNodeData,
    },
    {
      id: "wallet-1",
      type: "entity",
      position: { x: 380, y: -120 },
      data: { label: "0x1a2b...3c4d", type: "unhosted", riskScore: 82, description: "Unhosted wallet" } satisfies EntityNodeData,
    },
    {
      id: "coinbase",
      type: "entity",
      position: { x: 380, y: 120 },
      data: { label: "Coinbase", type: "vasp", riskScore: 8, jurisdiction: "US", description: "Exchange — FinCEN MSB" } satisfies EntityNodeData,
    },
    {
      id: "wallet-2",
      type: "entity",
      position: { x: 760, y: 0 },
      data: { label: "0xabcd...ef12", type: "unknown", riskScore: 92, jurisdiction: "RU", description: "Unidentified" } satisfies EntityNodeData,
    },
  ]

  const edges = [
    { id: "e1", source: "binance", target: "wallet-1", data: { label: "2.5 ETH", active: true } },
    { id: "e2", source: "binance", target: "coinbase", data: { label: "0.5 BTC" } },
    { id: "e3", source: "wallet-1", target: "wallet-2", data: { label: "15 txns", active: true } },
  ]

  return <EntityGraph nodes={nodes} edges={edges} onNodeClick={(id) => console.log(id)} />
}
