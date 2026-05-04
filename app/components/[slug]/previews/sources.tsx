"use client"

import { Source, Sources, SourcesContent, SourcesTrigger } from "@/src/chat"

export default function SourcesPreview() {
  return (
    <Sources defaultOpen>
      <SourcesTrigger>3 sources</SourcesTrigger>
      <SourcesContent>
        <Source
          href="https://example.com/fatf"
          title="FATF Recommendations"
          description="Financial Action Task Force guidelines on AML/CFT"
        />
        <Source
          href="https://example.com/eu-regulation"
          title="EU 6th Anti-Money Laundering Directive"
          description="Directive (EU) 2018/1673 on combating money laundering"
        />
        <Source
          href="https://example.com/fincen"
          title="FinCEN Guidance"
          description="US Financial Crimes Enforcement Network advisory"
        />
      </SourcesContent>
    </Sources>
  )
}
