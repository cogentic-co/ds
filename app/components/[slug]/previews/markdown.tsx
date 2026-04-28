"use client"

import { Markdown, Message, MessageAvatar, MessageContent, MessageResponse } from "@/src/chatbot"

const sample = `## Travel Rule key points

The **Travel Rule** requires VASPs to share originator and beneficiary data on transfers above thresholds set by FATF.

1. Identify the *counterparty VASP*
2. Exchange required data fields
3. Screen against sanctions lists

> Failures in any step can trigger reporting obligations.

| Field | Required | Notes |
|---|---|---|
| Originator name | Yes | Full legal name |
| Wallet address | Yes | On-chain |
| Amount | Yes | In native asset |

Run \`pnpm sync:tokens\` to refresh:

\`\`\`ts
import { syncTokens } from "@cogentic-co/ds/scripts"
await syncTokens({ fileKey: "1FH1KCGLeK5GR222JUS2Iu" })
\`\`\`
`

const streaming = `Analyzing transaction... here is what I found so far:

- Counterparty: \`bc1q...x9y2\`
- Risk tier: **medium**
- Sanctions hits: 0

The remaining checks are still running and the response`

export default function MarkdownPreview() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-background p-4">
        <p className="mb-3 font-medium text-muted-foreground text-xs">Standalone</p>
        <Markdown>{sample}</Markdown>
      </div>

      <div>
        <p className="mb-3 font-medium text-muted-foreground text-xs">
          Inside Message (auto-rendered when children is a string)
        </p>
        <Message from="assistant">
          <MessageAvatar className="bg-primary text-primary-foreground">AI</MessageAvatar>
          <MessageContent>
            <MessageResponse>{sample}</MessageResponse>
          </MessageContent>
        </Message>
      </div>

      <div>
        <p className="mb-3 font-medium text-muted-foreground text-xs">
          Streaming — handles unterminated blocks gracefully
        </p>
        <Message from="assistant">
          <MessageAvatar className="bg-primary text-primary-foreground">AI</MessageAvatar>
          <MessageContent>
            <MessageResponse>{streaming}</MessageResponse>
          </MessageContent>
        </Message>
      </div>
    </div>
  )
}
